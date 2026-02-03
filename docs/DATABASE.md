# GAZDA — Database Schema Design

## Overview
PostgreSQL via Supabase. Designed for multi-country, multi-language employer review platform.

## Core Tables

### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  display_name TEXT,                    -- public name (can be pseudonym)
  avatar_url TEXT,
  country_code CHAR(2),                -- SI, HR, RS, BA
  preferred_language CHAR(2),          -- hr, sl, sr
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'employer', 'moderator', 'admin')),
  is_verified_employee BOOLEAN DEFAULT FALSE,  -- verified via work email
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `companies`
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,            -- URL-friendly: "jysk-slovenia"
  name TEXT NOT NULL,
  legal_name TEXT,                      -- official registered name
  logo_url TEXT,
  website TEXT,
  industry TEXT,                        -- e.g., 'retail', 'tech', 'manufacturing'
  company_size TEXT CHECK (company_size IN ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
  founded_year INTEGER,
  headquarters_city TEXT,
  headquarters_country CHAR(2),
  description_hr TEXT,                  -- Croatian description
  description_sl TEXT,                  -- Slovenian description
  description_sr TEXT,                  -- Serbian description
  registry_id TEXT,                     -- business registry number
  countries_active CHAR(2)[],          -- array: ['SI', 'HR', 'RS', 'BA']
  is_claimed BOOLEAN DEFAULT FALSE,     -- employer has claimed this profile
  claimed_by UUID REFERENCES users(id),
  gazda_score NUMERIC(3,1) DEFAULT 0,  -- 1.0-10.0, calculated
  total_reviews INTEGER DEFAULT 0,
  avg_rating NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_country ON companies(headquarters_country);
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_companies_gazda_score ON companies(gazda_score DESC);
```

### `reviews`
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  
  -- Ratings (1-5 stars)
  rating_overall INTEGER NOT NULL CHECK (rating_overall BETWEEN 1 AND 5),
  rating_management INTEGER CHECK (rating_management BETWEEN 1 AND 5),
  rating_salary INTEGER CHECK (rating_salary BETWEEN 1 AND 5),
  rating_worklife INTEGER CHECK (rating_worklife BETWEEN 1 AND 5),
  rating_culture INTEGER CHECK (rating_culture BETWEEN 1 AND 5),
  rating_growth INTEGER CHECK (rating_growth BETWEEN 1 AND 5),
  
  -- GAZDA-specific ratings
  gazda_rating INTEGER NOT NULL CHECK (gazda_rating BETWEEN 1 AND 10),  -- the boss score!
  
  -- Content
  title TEXT NOT NULL,
  pros TEXT NOT NULL,                   -- min 50 chars
  cons TEXT NOT NULL,                   -- min 50 chars  
  advice_to_management TEXT,
  
  -- Context
  job_title TEXT,
  department TEXT,
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'intern', 'freelance')),
  employment_status TEXT CHECK (employment_status IN ('current', 'former')),
  years_at_company TEXT CHECK (years_at_company IN ('<1', '1-3', '3-5', '5-10', '10+')),
  location_city TEXT,
  country_code CHAR(2),
  language CHAR(2) DEFAULT 'hr',        -- review written in
  
  -- Moderation
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderation_note TEXT,
  moderated_by UUID REFERENCES users(id),
  moderated_at TIMESTAMPTZ,
  
  -- Engagement
  helpful_count INTEGER DEFAULT 0,
  report_count INTEGER DEFAULT 0,
  
  -- Employer response
  employer_response TEXT,
  employer_response_at TIMESTAMPTZ,
  employer_response_by UUID REFERENCES users(id),
  
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_company ON reviews(company_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);
CREATE INDEX idx_reviews_company_approved ON reviews(company_id) WHERE status = 'approved';
```

### `salaries`
```sql
CREATE TABLE salaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  
  job_title TEXT NOT NULL,
  department TEXT,
  seniority TEXT CHECK (seniority IN ('intern', 'junior', 'mid', 'senior', 'lead', 'manager', 'director', 'executive')),
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'freelance')),
  
  -- Compensation
  base_salary_monthly NUMERIC(10,2),    -- gross monthly in EUR
  currency CHAR(3) DEFAULT 'EUR',
  bonus_annual NUMERIC(10,2),           -- annual bonus
  has_stock_options BOOLEAN DEFAULT FALSE,
  
  -- Benefits
  benefits TEXT[],                       -- array: ['health', 'pension', 'transport', 'meals', 'remote']
  
  country_code CHAR(2),
  city TEXT,
  years_experience TEXT CHECK (years_experience IN ('<1', '1-3', '3-5', '5-10', '10+')),
  years_at_company TEXT CHECK (years_at_company IN ('<1', '1-3', '3-5', '5-10', '10+')),
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_salaries_company ON salaries(company_id);
CREATE INDEX idx_salaries_title ON salaries(job_title);
CREATE INDEX idx_salaries_country ON salaries(country_code);
```

### `jobs` (monetization: employer-posted jobs)
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  posted_by UUID NOT NULL REFERENCES users(id),
  
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
  
  -- Multi-language
  language CHAR(2) DEFAULT 'hr',
  
  -- Monetization
  is_promoted BOOLEAN DEFAULT FALSE,    -- paid promotion
  promotion_expires_at TIMESTAMPTZ,
  
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'closed', 'expired')),
  application_url TEXT,                 -- external application link
  application_email TEXT,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jobs_company ON jobs(company_id);
CREATE INDEX idx_jobs_country ON jobs(country_code);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_promoted ON jobs(is_promoted) WHERE is_promoted = TRUE;
```

### `review_votes` (helpful/not helpful)
```sql
CREATE TABLE review_votes (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, review_id)
);
```

### `review_reports` (flag inappropriate content)
```sql
CREATE TABLE review_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  reported_by UUID NOT NULL REFERENCES users(id),
  reason TEXT NOT NULL CHECK (reason IN ('fake', 'defamatory', 'harassment', 'spam', 'confidential', 'other')),
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'action_taken', 'dismissed')),
  reviewed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `company_follows` (users following companies)
```sql
CREATE TABLE company_follows (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, company_id)
);
```

## GAZDA Score Algorithm

The signature feature. Calculated from:

```sql
-- Weighted formula:
-- 40% gazda_rating (boss behavior — our unique value prop)
-- 20% rating_management 
-- 15% rating_culture
-- 10% rating_worklife
-- 10% rating_salary
-- 5%  rating_growth
-- Recency bias: reviews < 1 year weighted 1.5x, 1-2 years 1.0x, 2+ years 0.5x
-- Minimum 3 reviews to display score

CREATE OR REPLACE FUNCTION calculate_gazda_score(p_company_id UUID)
RETURNS NUMERIC AS $$
DECLARE
  v_score NUMERIC;
BEGIN
  SELECT 
    ROUND(
      SUM(
        (
          (r.gazda_rating / 10.0 * 5) * 0.40 +
          COALESCE(r.rating_management, r.rating_overall) * 0.20 +
          COALESCE(r.rating_culture, r.rating_overall) * 0.15 +
          COALESCE(r.rating_worklife, r.rating_overall) * 0.10 +
          COALESCE(r.rating_salary, r.rating_overall) * 0.10 +
          COALESCE(r.rating_growth, r.rating_overall) * 0.05
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
      ), 0) * 2,  -- scale to 1-10
    1)
  INTO v_score
  FROM reviews r
  WHERE r.company_id = p_company_id
    AND r.status = 'approved';
  
  UPDATE companies 
  SET gazda_score = COALESCE(v_score, 0),
      total_reviews = (SELECT COUNT(*) FROM reviews WHERE company_id = p_company_id AND status = 'approved'),
      avg_rating = (SELECT ROUND(AVG(rating_overall), 2) FROM reviews WHERE company_id = p_company_id AND status = 'approved'),
      updated_at = NOW()
  WHERE id = p_company_id;
  
  RETURN v_score;
END;
$$ LANGUAGE plpgsql;
```

## Row Level Security (RLS) — Supabase

```sql
-- Users can read all approved reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own pending reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- Companies are publicly readable
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read companies" ON companies FOR SELECT USING (true);

-- Salaries publicly readable when approved
ALTER TABLE salaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read approved salaries" ON salaries FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can submit salaries" ON salaries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Jobs publicly readable when active
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active jobs" ON jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Employers can manage own jobs" ON jobs FOR ALL USING (auth.uid() = posted_by);
```

## Supabase Edge Functions Needed
1. `calculate-gazda-score` — trigger on review approve/delete
2. `moderate-review` — AI-assisted content check (profanity, PII detection)
3. `seed-companies` — import from business registries (AJPES.si, sudski-registar.hr)
