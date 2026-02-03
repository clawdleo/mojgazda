-- =============================================
-- MojGazda — Initial Database Schema
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS (extends Supabase auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  country_code CHAR(2),
  preferred_language CHAR(2) DEFAULT 'hr',
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'employer', 'moderator', 'admin')),
  is_verified_employee BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- COMPANIES
-- =============================================
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  legal_name TEXT,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  company_size TEXT CHECK (company_size IN ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
  founded_year INTEGER,
  headquarters_city TEXT,
  headquarters_country CHAR(2),
  description_hr TEXT,
  description_sl TEXT,
  description_sr TEXT,
  registry_id TEXT,
  countries_active CHAR(2)[] DEFAULT '{}',
  is_claimed BOOLEAN DEFAULT FALSE,
  claimed_by UUID REFERENCES public.profiles(id),
  gazda_score NUMERIC(3,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  avg_rating NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_slug ON public.companies(slug);
CREATE INDEX idx_companies_country ON public.companies(headquarters_country);
CREATE INDEX idx_companies_industry ON public.companies(industry);
CREATE INDEX idx_companies_gazda_score ON public.companies(gazda_score DESC);
CREATE INDEX idx_companies_name_search ON public.companies USING gin(to_tsvector('simple', name));

-- =============================================
-- REVIEWS
-- =============================================
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating_overall INTEGER NOT NULL CHECK (rating_overall BETWEEN 1 AND 5),
  rating_management INTEGER CHECK (rating_management BETWEEN 1 AND 5),
  rating_salary INTEGER CHECK (rating_salary BETWEEN 1 AND 5),
  rating_worklife INTEGER CHECK (rating_worklife BETWEEN 1 AND 5),
  rating_culture INTEGER CHECK (rating_culture BETWEEN 1 AND 5),
  rating_growth INTEGER CHECK (rating_growth BETWEEN 1 AND 5),
  gazda_rating INTEGER NOT NULL CHECK (gazda_rating BETWEEN 1 AND 10),
  title TEXT NOT NULL CHECK (length(title) >= 5),
  pros TEXT NOT NULL CHECK (length(pros) >= 30),
  cons TEXT NOT NULL CHECK (length(cons) >= 30),
  advice_to_management TEXT,
  job_title TEXT,
  department TEXT,
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'intern', 'freelance')),
  employment_status TEXT CHECK (employment_status IN ('current', 'former')),
  years_at_company TEXT CHECK (years_at_company IN ('<1', '1-3', '3-5', '5-10', '10+')),
  location_city TEXT,
  country_code CHAR(2),
  language CHAR(2) DEFAULT 'hr',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderation_note TEXT,
  moderated_by UUID REFERENCES public.profiles(id),
  moderated_at TIMESTAMPTZ,
  helpful_count INTEGER DEFAULT 0,
  report_count INTEGER DEFAULT 0,
  employer_response TEXT,
  employer_response_at TIMESTAMPTZ,
  employer_response_by UUID REFERENCES public.profiles(id),
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_company ON public.reviews(company_id);
CREATE INDEX idx_reviews_status ON public.reviews(status);
CREATE INDEX idx_reviews_created ON public.reviews(created_at DESC);
CREATE INDEX idx_reviews_approved ON public.reviews(company_id) WHERE status = 'approved';

-- =============================================
-- SALARIES
-- =============================================
CREATE TABLE public.salaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  department TEXT,
  seniority TEXT CHECK (seniority IN ('intern', 'junior', 'mid', 'senior', 'lead', 'manager', 'director', 'executive')),
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'freelance')),
  base_salary_monthly NUMERIC(10,2),
  currency CHAR(3) DEFAULT 'EUR',
  bonus_annual NUMERIC(10,2),
  has_stock_options BOOLEAN DEFAULT FALSE,
  benefits TEXT[] DEFAULT '{}',
  country_code CHAR(2),
  city TEXT,
  years_experience TEXT CHECK (years_experience IN ('<1', '1-3', '3-5', '5-10', '10+')),
  years_at_company TEXT CHECK (years_at_company IN ('<1', '1-3', '3-5', '5-10', '10+')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_salaries_company ON public.salaries(company_id);
CREATE INDEX idx_salaries_approved ON public.salaries(company_id) WHERE status = 'approved';

-- =============================================
-- JOBS
-- =============================================
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  posted_by UUID NOT NULL REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'intern', 'freelance')),
  seniority TEXT CHECK (seniority IN ('intern', 'junior', 'mid', 'senior', 'lead', 'manager', 'director')),
  remote_policy TEXT CHECK (remote_policy IN ('onsite', 'hybrid', 'remote')),
  salary_min NUMERIC(10,2),
  salary_max NUMERIC(10,2),
  salary_currency CHAR(3) DEFAULT 'EUR',
  show_salary BOOLEAN DEFAULT TRUE,
  city TEXT,
  country_code CHAR(2),
  language CHAR(2) DEFAULT 'hr',
  is_promoted BOOLEAN DEFAULT FALSE,
  promotion_expires_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'closed', 'expired')),
  application_url TEXT,
  application_email TEXT,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jobs_company ON public.jobs(company_id);
CREATE INDEX idx_jobs_active ON public.jobs(status) WHERE status = 'active';

-- =============================================
-- REVIEW VOTES & REPORTS
-- =============================================
CREATE TABLE public.review_votes (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, review_id)
);

CREATE TABLE public.review_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  reported_by UUID NOT NULL REFERENCES public.profiles(id),
  reason TEXT NOT NULL CHECK (reason IN ('fake', 'defamatory', 'harassment', 'spam', 'confidential', 'other')),
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'action_taken', 'dismissed')),
  reviewed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COMPANY FOLLOWS
-- =============================================
CREATE TABLE public.company_follows (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, company_id)
);

-- =============================================
-- GAZDA SCORE CALCULATION
-- =============================================
CREATE OR REPLACE FUNCTION public.calculate_gazda_score(p_company_id UUID)
RETURNS NUMERIC AS $$
DECLARE
  v_score NUMERIC;
  v_count INTEGER;
BEGIN
  SELECT 
    COUNT(*),
    ROUND(
      SUM(
        (
          (r.gazda_rating::NUMERIC / 10.0 * 5.0) * 0.40 +
          COALESCE(r.rating_management, r.rating_overall)::NUMERIC * 0.20 +
          COALESCE(r.rating_culture, r.rating_overall)::NUMERIC * 0.15 +
          COALESCE(r.rating_worklife, r.rating_overall)::NUMERIC * 0.10 +
          COALESCE(r.rating_salary, r.rating_overall)::NUMERIC * 0.10 +
          COALESCE(r.rating_growth, r.rating_overall)::NUMERIC * 0.05
        ) * CASE 
          WHEN r.created_at > NOW() - INTERVAL '1 year' THEN 1.5
          WHEN r.created_at > NOW() - INTERVAL '2 years' THEN 1.0
          ELSE 0.5
        END
      ) / NULLIF(SUM(
        CASE 
          WHEN r.created_at > NOW() - INTERVAL '1 year' THEN 1.5
          WHEN r.created_at > NOW() - INTERVAL '2 years' THEN 1.0
          ELSE 0.5
        END
      ), 0) * 2.0,
    1)
  INTO v_count, v_score
  FROM public.reviews r
  WHERE r.company_id = p_company_id
    AND r.status = 'approved';
  
  UPDATE public.companies 
  SET gazda_score = COALESCE(v_score, 0),
      total_reviews = v_count,
      avg_rating = (
        SELECT ROUND(AVG(rating_overall)::NUMERIC, 2) 
        FROM public.reviews 
        WHERE company_id = p_company_id AND status = 'approved'
      ),
      updated_at = NOW()
  WHERE id = p_company_id;
  
  RETURN v_score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: recalculate on review changes
CREATE OR REPLACE FUNCTION public.trigger_recalculate_gazda_score()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM public.calculate_gazda_score(OLD.company_id);
    RETURN OLD;
  ELSE
    PERFORM public.calculate_gazda_score(NEW.company_id);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.trigger_recalculate_gazda_score();

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Companies
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Companies publicly readable" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Admins manage companies" ON public.companies FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved reviews public" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Users read own reviews" ON public.reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users edit pending reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Mods manage reviews" ON public.reviews FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Salaries
ALTER TABLE public.salaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved salaries public" ON public.salaries FOR SELECT USING (status = 'approved');
CREATE POLICY "Users submit salaries" ON public.salaries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Jobs
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active jobs public" ON public.jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Employers manage jobs" ON public.jobs FOR ALL USING (auth.uid() = posted_by);

-- Review votes
ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Votes readable" ON public.review_votes FOR SELECT USING (true);
CREATE POLICY "Users vote" ON public.review_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update vote" ON public.review_votes FOR UPDATE USING (auth.uid() = user_id);

-- Review reports
ALTER TABLE public.review_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users report" ON public.review_reports FOR INSERT WITH CHECK (auth.uid() = reported_by);
CREATE POLICY "Mods read reports" ON public.review_reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Company follows
ALTER TABLE public.company_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage follows" ON public.company_follows FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
