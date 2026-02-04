-- GAZDA Database Schema v1.0
-- Supabase/PostgreSQL Migration
-- Created: 2026-02-04

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- ENUM TYPES
-- =============================================

CREATE TYPE company_size AS ENUM ('micro', 'small', 'medium', 'large', 'enterprise');
CREATE TYPE employment_relationship AS ENUM ('current_employee', 'former_employee', 'intern', 'contractor');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'flagged', 'rejected', 'removed');
CREATE TYPE salary_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'intern');
CREATE TYPE job_status AS ENUM ('active', 'expired', 'removed');
CREATE TYPE report_reason AS ENUM ('fake', 'defamatory', 'inappropriate', 'spam', 'other');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'dismissed', 'actioned');
CREATE TYPE country_code AS ENUM ('SI', 'HR', 'RS', 'BA');

-- =============================================
-- CORE TABLES
-- =============================================

-- Industries / Sectors
CREATE TABLE industries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name JSONB NOT NULL DEFAULT '{}',  -- {hr: "IT", sl: "IT", sr: "IT", en: "IT"}
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES industries(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Users (Supabase auth.users extension)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  language TEXT DEFAULT 'hr' CHECK (language IN ('hr', 'sl', 'sr', 'en')),
  country country_code,
  is_employer BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website TEXT,
  industry_id UUID REFERENCES industries(id) ON DELETE SET NULL,
  size_category company_size,
  founded_year INT CHECK (founded_year > 1800 AND founded_year <= EXTRACT(YEAR FROM now()) + 1),
  headquarters_country country_code NOT NULL,
  headquarters_city TEXT NOT NULL,
  description JSONB DEFAULT '{}',  -- {hr: "...", sl: "...", sr: "..."}
  
  -- Claimed/verified status
  is_claimed BOOLEAN DEFAULT false,
  claimed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  claimed_at TIMESTAMPTZ,
  is_verified BOOLEAN DEFAULT false,
  registry_id TEXT,  -- business registry number
  
  -- Denormalized scores (updated by trigger/function)
  gazda_score DECIMAL(3,1) DEFAULT 0.0 CHECK (gazda_score >= 0 AND gazda_score <= 10),
  total_reviews INT DEFAULT 0,
  avg_overall DECIMAL(3,1) DEFAULT 0.0,
  avg_salary DECIMAL(3,1) DEFAULT 0.0,
  avg_work_life DECIMAL(3,1) DEFAULT 0.0,
  avg_management DECIMAL(3,1) DEFAULT 0.0,
  avg_culture DECIMAL(3,1) DEFAULT 0.0,
  avg_growth DECIMAL(3,1) DEFAULT 0.0,
  recommend_pct DECIMAL(5,2) DEFAULT 0.0,  -- % who would recommend
  
  countries_active country_code[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews (the core feature)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  anonymous_id TEXT NOT NULL,  -- SHA-256(user_id + company_id + salt) for dedup
  
  -- Employment context
  relationship employment_relationship NOT NULL,
  job_title TEXT NOT NULL,
  department TEXT,
  employment_duration_months INT CHECK (employment_duration_months > 0),
  country country_code NOT NULL,
  city TEXT,
  
  -- Review content
  language TEXT NOT NULL DEFAULT 'hr' CHECK (language IN ('hr', 'sl', 'sr')),
  title TEXT NOT NULL CHECK (length(title) >= 5 AND length(title) <= 200),
  pros TEXT NOT NULL CHECK (length(pros) >= 20 AND length(pros) <= 5000),
  cons TEXT NOT NULL CHECK (length(cons) >= 20 AND length(cons) <= 5000),
  advice_to_management TEXT CHECK (length(advice_to_management) <= 2000),
  
  -- Ratings (1-10 scale)
  rating_overall INT NOT NULL CHECK (rating_overall BETWEEN 1 AND 10),
  rating_salary INT NOT NULL CHECK (rating_salary BETWEEN 1 AND 10),
  rating_work_life INT NOT NULL CHECK (rating_work_life BETWEEN 1 AND 10),
  rating_management INT NOT NULL CHECK (rating_management BETWEEN 1 AND 10),
  rating_culture INT NOT NULL CHECK (rating_culture BETWEEN 1 AND 10),
  rating_growth INT NOT NULL CHECK (rating_growth BETWEEN 1 AND 10),
  would_recommend BOOLEAN NOT NULL,
  
  -- Moderation
  status review_status NOT NULL DEFAULT 'pending',
  moderation_notes TEXT,
  moderated_by UUID REFERENCES profiles(id),
  moderated_at TIMESTAMPTZ,
  
  -- Engagement (denormalized)
  helpful_count INT DEFAULT 0,
  report_count INT DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ  -- soft delete
);

-- Employer responses to reviews
CREATE TABLE review_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  responder_id UUID NOT NULL REFERENCES profiles(id),
  body TEXT NOT NULL CHECK (length(body) >= 10 AND length(body) <= 3000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(review_id)  -- only one response per review
);

-- Anonymous salary reports
CREATE TABLE salaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  department TEXT,
  country country_code NOT NULL,
  city TEXT,
  salary_gross_monthly DECIMAL(10,2) NOT NULL CHECK (salary_gross_monthly > 0),
  salary_net_monthly DECIMAL(10,2) CHECK (salary_net_monthly > 0),
  currency TEXT DEFAULT 'EUR',
  bonus_annual DECIMAL(10,2),
  experience_years INT CHECK (experience_years >= 0 AND experience_years <= 50),
  employment_type employment_type NOT NULL,
  is_current BOOLEAN DEFAULT true,
  year_reported INT NOT NULL CHECK (year_reported >= 2020),
  status salary_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Job postings
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  posted_by UUID NOT NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  description JSONB DEFAULT '{}',
  requirements JSONB DEFAULT '{}',
  country country_code NOT NULL,
  city TEXT NOT NULL,
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  employment_type employment_type NOT NULL,
  is_remote BOOLEAN DEFAULT false,
  is_sponsored BOOLEAN DEFAULT false,
  application_url TEXT,
  application_email TEXT,
  views_count INT DEFAULT 0,
  applications_count INT DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  status job_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- SUPPORTING TABLES
-- =============================================

-- Review helpfulness votes
CREATE TABLE review_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Review reports (flagging)
CREATE TABLE review_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL REFERENCES profiles(id),
  reason report_reason NOT NULL,
  details TEXT,
  status report_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Company follows
CREATE TABLE company_follows (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, company_id)
);

-- Admin audit log
CREATE TABLE admin_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES profiles(id),
  action_type TEXT NOT NULL,
  target_type TEXT NOT NULL,  -- review/company/user/salary
  target_id UUID NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- INDEXES
-- =============================================

-- Company lookups
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_country ON companies(headquarters_country);
CREATE INDEX idx_companies_industry ON companies(industry_id);
CREATE INDEX idx_companies_gazda_score ON companies(gazda_score DESC) WHERE total_reviews >= 3;
CREATE INDEX idx_companies_total_reviews ON companies(total_reviews DESC);

-- Review queries
CREATE INDEX idx_reviews_company ON reviews(company_id, status, created_at DESC);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_user ON reviews(user_id);  -- internal only
CREATE INDEX idx_reviews_anonymous ON reviews(anonymous_id);  -- dedup check

-- Salary queries
CREATE INDEX idx_salaries_company ON salaries(company_id, status);
CREATE INDEX idx_salaries_title_country ON salaries(job_title, country) WHERE status = 'approved';

-- Job queries
CREATE INDEX idx_jobs_company ON jobs(company_id, status);
CREATE INDEX idx_jobs_active ON jobs(status, country, created_at DESC) WHERE status = 'active';
CREATE INDEX idx_jobs_expires ON jobs(expires_at) WHERE status = 'active';

-- Full text search
CREATE INDEX idx_companies_search ON companies USING gin(to_tsvector('simple', name));
CREATE INDEX idx_reviews_search ON reviews USING gin(to_tsvector('simple', title || ' ' || pros || ' ' || cons));
CREATE INDEX idx_jobs_search ON jobs USING gin(to_tsvector('simple', title));

-- =============================================
-- FUNCTIONS
-- =============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER tr_profiles_updated BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_companies_updated BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_reviews_updated BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_jobs_updated BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Recalculate company scores when a review is approved
CREATE OR REPLACE FUNCTION recalculate_company_scores()
RETURNS TRIGGER AS $$
DECLARE
  v_company_id UUID;
BEGIN
  -- Get the affected company
  IF TG_OP = 'DELETE' THEN
    v_company_id := OLD.company_id;
  ELSE
    v_company_id := NEW.company_id;
  END IF;

  -- Recalculate all denormalized fields
  UPDATE companies SET
    total_reviews = (
      SELECT COUNT(*) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ),
    avg_overall = COALESCE((
      SELECT ROUND(AVG(rating_overall)::numeric, 1) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ), 0),
    avg_salary = COALESCE((
      SELECT ROUND(AVG(rating_salary)::numeric, 1) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ), 0),
    avg_work_life = COALESCE((
      SELECT ROUND(AVG(rating_work_life)::numeric, 1) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ), 0),
    avg_management = COALESCE((
      SELECT ROUND(AVG(rating_management)::numeric, 1) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ), 0),
    avg_culture = COALESCE((
      SELECT ROUND(AVG(rating_culture)::numeric, 1) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ), 0),
    avg_growth = COALESCE((
      SELECT ROUND(AVG(rating_growth)::numeric, 1) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ), 0),
    recommend_pct = COALESCE((
      SELECT ROUND(
        (COUNT(*) FILTER (WHERE would_recommend = true)::numeric / 
         NULLIF(COUNT(*)::numeric, 0)) * 100, 1
      ) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ), 0),
    -- GAZDA Score: weighted average with management emphasis
    gazda_score = COALESCE((
      SELECT ROUND((
        AVG(rating_overall) * 0.30 +
        AVG(rating_management) * 0.25 +
        AVG(rating_culture) * 0.20 +
        AVG(rating_work_life) * 0.15 +
        AVG(rating_growth) * 0.10
      )::numeric, 1) FROM reviews 
      WHERE company_id = v_company_id AND status = 'approved' AND deleted_at IS NULL
    ), 0)
  WHERE id = v_company_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger: recalculate on review changes
CREATE TRIGGER tr_review_scores AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION recalculate_company_scores();

-- Update helpful_count when votes change
CREATE OR REPLACE FUNCTION update_review_helpful_count()
RETURNS TRIGGER AS $$
DECLARE
  v_review_id UUID;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_review_id := OLD.review_id;
  ELSE
    v_review_id := NEW.review_id;
  END IF;

  UPDATE reviews SET helpful_count = (
    SELECT COUNT(*) FROM review_votes 
    WHERE review_id = v_review_id AND is_helpful = true
  ) WHERE id = v_review_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_vote_count AFTER INSERT OR UPDATE OR DELETE ON review_votes
  FOR EACH ROW EXECUTE FUNCTION update_review_helpful_count();

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies (public read, employer update for claimed)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Companies are viewable by everyone" ON companies
  FOR SELECT USING (true);
CREATE POLICY "Employers can update claimed company" ON companies
  FOR UPDATE USING (auth.uid() = claimed_by);

-- Reviews (public read for approved, own write)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved reviews are public" ON reviews
  FOR SELECT USING (status = 'approved' AND deleted_at IS NULL);
CREATE POLICY "Users can read own reviews" ON reviews
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pending reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- Salaries (public read for approved, own write)
ALTER TABLE salaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved salaries are public" ON salaries
  FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can read own salaries" ON salaries
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create salaries" ON salaries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Jobs (public read for active)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active jobs are public" ON jobs
  FOR SELECT USING (status = 'active');
CREATE POLICY "Employers can manage own jobs" ON jobs
  FOR ALL USING (auth.uid() = posted_by);

-- Review votes
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Votes are viewable" ON review_votes
  FOR SELECT USING (true);
CREATE POLICY "Users can manage own votes" ON review_votes
  FOR ALL USING (auth.uid() = user_id);

-- Company follows
ALTER TABLE company_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own follows" ON company_follows
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- SEED DATA: Industries
-- =============================================

INSERT INTO industries (name, slug) VALUES
  ('{"hr":"Informacijske tehnologije","sl":"Informacijska tehnologija","sr":"Informacione tehnologije","en":"Information Technology"}', 'it'),
  ('{"hr":"Maloprodaja","sl":"Maloprodaja","sr":"Maloprodaja","en":"Retail"}', 'retail'),
  ('{"hr":"Farmacija","sl":"Farmacija","sr":"Farmacija","en":"Pharmaceuticals"}', 'pharma'),
  ('{"hr":"Proizvodnja","sl":"Proizvodnja","sr":"Proizvodnja","en":"Manufacturing"}', 'manufacturing'),
  ('{"hr":"Energetika","sl":"Energetika","sr":"Energetika","en":"Energy"}', 'energy'),
  ('{"hr":"Telekomunikacije","sl":"Telekomunikacije","sr":"Telekomunikacije","en":"Telecommunications"}', 'telecom'),
  ('{"hr":"Financije i bankarstvo","sl":"Finance in bančništvo","sr":"Finansije i bankarstvo","en":"Finance & Banking"}', 'finance'),
  ('{"hr":"Ugostiteljstvo i turizam","sl":"Gostinstvo in turizem","sr":"Ugostiteljstvo i turizam","en":"Hospitality & Tourism"}', 'hospitality'),
  ('{"hr":"Građevinarstvo","sl":"Gradbeništvo","sr":"Građevinarstvo","en":"Construction"}', 'construction'),
  ('{"hr":"Prehrambena industrija","sl":"Prehrambena industrija","sr":"Prehrambena industrija","en":"Food & Beverage"}', 'food'),
  ('{"hr":"Autoindustrija","sl":"Avtomobilska industrija","sr":"Automobilska industrija","en":"Automotive"}', 'automotive'),
  ('{"hr":"Tekstilna industrija","sl":"Tekstilna industrija","sr":"Tekstilna industrija","en":"Textiles"}', 'textiles'),
  ('{"hr":"Logistika i transport","sl":"Logistika in transport","sr":"Logistika i transport","en":"Logistics & Transport"}', 'logistics'),
  ('{"hr":"Obrazovanje","sl":"Izobraževanje","sr":"Obrazovanje","en":"Education"}', 'education'),
  ('{"hr":"Zdravstvo","sl":"Zdravstvo","sr":"Zdravstvo","en":"Healthcare"}', 'healthcare'),
  ('{"hr":"Mediji i marketing","sl":"Mediji in marketing","sr":"Mediji i marketing","en":"Media & Marketing"}', 'media'),
  ('{"hr":"Poljoprivreda","sl":"Kmetijstvo","sr":"Poljoprivreda","en":"Agriculture"}', 'agriculture'),
  ('{"hr":"Igre i zabava","sl":"Igre in zabava","sr":"Igre i zabava","en":"Gaming & Entertainment"}', 'gaming'),
  ('{"hr":"Distribucija","sl":"Distribucija","sr":"Distribucija","en":"Distribution"}', 'distribution'),
  ('{"hr":"Ostalo","sl":"Ostalo","sr":"Ostalo","en":"Other"}', 'other');

-- =============================================
-- HELPER VIEWS
-- =============================================

-- Public company list with scores (no sensitive data)
CREATE OR REPLACE VIEW public_companies AS
SELECT 
  c.id, c.name, c.slug, c.logo_url, c.website,
  i.name AS industry_name, i.slug AS industry_slug,
  c.size_category, c.founded_year,
  c.headquarters_country, c.headquarters_city,
  c.description, c.is_verified,
  c.gazda_score, c.total_reviews,
  c.avg_overall, c.avg_salary, c.avg_work_life,
  c.avg_management, c.avg_culture, c.avg_growth,
  c.recommend_pct, c.countries_active
FROM companies c
LEFT JOIN industries i ON c.industry_id = i.id;

-- Public review list (NO user_id exposed!)
CREATE OR REPLACE VIEW public_reviews AS
SELECT 
  r.id, r.company_id, r.anonymous_id,
  r.relationship, r.job_title, r.department,
  r.employment_duration_months, r.country, r.city,
  r.language, r.title, r.pros, r.cons, r.advice_to_management,
  r.rating_overall, r.rating_salary, r.rating_work_life,
  r.rating_management, r.rating_culture, r.rating_growth,
  r.would_recommend, r.helpful_count,
  r.created_at,
  resp.body AS employer_response,
  resp.created_at AS response_date
FROM reviews r
LEFT JOIN review_responses resp ON r.id = resp.review_id
WHERE r.status = 'approved' AND r.deleted_at IS NULL;

-- Salary aggregation (min 3 reports before showing)
CREATE OR REPLACE VIEW salary_aggregates AS
SELECT 
  company_id, job_title, country,
  COUNT(*) AS report_count,
  ROUND(AVG(salary_gross_monthly)::numeric, 0) AS avg_gross,
  ROUND(MIN(salary_gross_monthly)::numeric, 0) AS min_gross,
  ROUND(MAX(salary_gross_monthly)::numeric, 0) AS max_gross,
  ROUND(AVG(salary_net_monthly)::numeric, 0) AS avg_net,
  ROUND(AVG(experience_years)::numeric, 1) AS avg_experience
FROM salaries
WHERE status = 'approved'
GROUP BY company_id, job_title, country
HAVING COUNT(*) >= 3;  -- privacy: only show when 3+ reports
