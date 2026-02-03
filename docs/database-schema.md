# GAZDA — Database Schema (v1.0 Draft)

## Design Principles
- **Privacy-first:** Reviews are anonymous — no direct link between user and review in public data
- **Multi-language:** All user-facing text stored with language codes (hr, sl, sr)
- **Multi-country:** Companies tagged by country, reviews by country context
- **Audit trail:** Soft deletes, moderation history, edit tracking
- **Performance:** Denormalized scores on company profiles for fast reads

---

## Core Tables

### `users`
Primary user accounts. Email verified, optional social login.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| email | text | unique, encrypted at rest |
| password_hash | text | bcrypt |
| display_name | text | public-facing, NOT real name |
| avatar_url | text | nullable |
| language | text | preferred language (hr/sl/sr/en) |
| country | text | SI/HR/RS/BA |
| email_verified | boolean | default false |
| is_employer | boolean | default false |
| created_at | timestamptz | |
| updated_at | timestamptz | |
| deleted_at | timestamptz | soft delete |

### `companies`
Employer profiles. Can be auto-created from reviews or claimed by employers.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | text | official company name |
| slug | text | unique, URL-friendly |
| logo_url | text | nullable |
| website | text | nullable |
| industry_id | uuid | FK → industries |
| size_category | enum | micro/small/medium/large/enterprise |
| founded_year | int | nullable |
| headquarters_country | text | SI/HR/RS/BA |
| headquarters_city | text | |
| description | jsonb | {hr: "...", sl: "...", sr: "..."} |
| is_claimed | boolean | employer claimed this profile |
| claimed_by | uuid | FK → users, nullable |
| claimed_at | timestamptz | nullable |
| gazda_score | decimal(3,1) | denormalized, 1.0-10.0 |
| total_reviews | int | denormalized count |
| avg_salary_satisfaction | decimal(3,1) | denormalized |
| avg_work_life_balance | decimal(3,1) | denormalized |
| avg_management | decimal(3,1) | denormalized |
| avg_culture | decimal(3,1) | denormalized |
| avg_growth | decimal(3,1) | denormalized |
| is_verified | boolean | verified real company |
| registry_id | text | business registry number |
| countries_active | text[] | array of country codes |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `reviews`
The core of the platform. Anonymous employer reviews.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| company_id | uuid | FK → companies |
| user_id | uuid | FK → users (NOT exposed publicly) |
| anonymous_id | text | hashed identifier for "same reviewer" without revealing identity |
| relationship | enum | current_employee/former_employee/intern/contractor |
| job_title | text | generalized (e.g., "Software Developer", not "Senior Backend Dev at X team") |
| department | text | nullable |
| employment_duration_months | int | approximate |
| country | text | which country location |
| city | text | nullable |
| language | text | review language (hr/sl/sr) |
| title | text | review headline |
| pros | text | what's good |
| cons | text | what's bad |
| advice_to_management | text | nullable |
| rating_overall | int | 1-10 (the GAZDA Score input) |
| rating_salary | int | 1-10 |
| rating_work_life | int | 1-10 |
| rating_management | int | 1-10 |
| rating_culture | int | 1-10 |
| rating_growth | int | 1-10 |
| would_recommend | boolean | |
| is_current_employee | boolean | |
| status | enum | pending/approved/flagged/rejected/removed |
| moderation_notes | text | internal |
| moderated_by | uuid | FK → users (admin), nullable |
| moderated_at | timestamptz | nullable |
| helpful_count | int | default 0, denormalized |
| report_count | int | default 0, denormalized |
| created_at | timestamptz | |
| updated_at | timestamptz | |
| deleted_at | timestamptz | soft delete |

**Privacy note:** The `user_id` column is NEVER exposed via API. The `anonymous_id` is a one-way hash that allows detecting "same person reviewed twice" without revealing who.

### `review_responses`
Employer responses to reviews (only for claimed companies).

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| review_id | uuid | FK → reviews |
| company_id | uuid | FK → companies |
| responder_id | uuid | FK → users (employer account) |
| body | text | response text |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `salaries`
Anonymous salary reports, separate from reviews.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| company_id | uuid | FK → companies |
| user_id | uuid | FK → users (NOT exposed) |
| job_title | text | standardized where possible |
| department | text | nullable |
| country | text | SI/HR/RS/BA |
| city | text | nullable |
| salary_gross_monthly | decimal(10,2) | in EUR |
| salary_net_monthly | decimal(10,2) | in EUR, nullable |
| currency | text | default 'EUR' |
| bonus_annual | decimal(10,2) | nullable |
| experience_years | int | |
| employment_type | enum | full_time/part_time/contract/intern |
| is_current | boolean | |
| year_reported | int | which year this salary is from |
| status | enum | pending/approved/rejected |
| created_at | timestamptz | |

### `jobs`
Job postings (monetization — paid by employers).

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| company_id | uuid | FK → companies |
| posted_by | uuid | FK → users (employer) |
| title | text | job title |
| description | jsonb | {hr: "...", sl: "...", sr: "..."} |
| requirements | jsonb | multilingual |
| country | text | |
| city | text | |
| salary_min | decimal(10,2) | nullable |
| salary_max | decimal(10,2) | nullable |
| employment_type | enum | full_time/part_time/contract/intern |
| is_remote | boolean | |
| is_sponsored | boolean | paid promotion |
| application_url | text | external link |
| application_email | text | nullable |
| views_count | int | default 0 |
| applications_count | int | default 0 |
| expires_at | timestamptz | |
| status | enum | active/expired/removed |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `industries`
Industry/sector classification.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | jsonb | {hr: "IT", sl: "IT", sr: "IT", en: "IT"} |
| slug | text | unique |
| parent_id | uuid | FK → industries, nullable (for sub-industries) |

---

## Supporting Tables

### `review_votes`
Helpful/not helpful votes on reviews.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| review_id | uuid | FK → reviews |
| user_id | uuid | FK → users |
| is_helpful | boolean | |
| created_at | timestamptz | |

**Unique constraint:** (review_id, user_id)

### `review_reports`
Flag inappropriate reviews.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| review_id | uuid | FK → reviews |
| reporter_id | uuid | FK → users |
| reason | enum | fake/defamatory/inappropriate/spam/other |
| details | text | nullable |
| status | enum | pending/reviewed/dismissed/actioned |
| reviewed_by | uuid | FK → users (admin), nullable |
| created_at | timestamptz | |

### `email_verifications`
Verify users work/worked at a company (optional, boosts review credibility).

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → users |
| company_id | uuid | FK → companies |
| work_email | text | encrypted — company domain email |
| verification_code | text | |
| verified | boolean | default false |
| expires_at | timestamptz | |
| created_at | timestamptz | |

### `company_follows`
Users following companies for updates.

| Column | Type | Notes |
|--------|------|-------|
| user_id | uuid | FK → users |
| company_id | uuid | FK → companies |
| created_at | timestamptz | |

**PK:** (user_id, company_id)

### `admin_actions`
Audit log for all moderation/admin actions.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| admin_id | uuid | FK → users |
| action_type | text | review_approved/review_rejected/company_verified/etc |
| target_type | text | review/company/user/salary |
| target_id | uuid | |
| details | jsonb | action-specific data |
| created_at | timestamptz | |

---

## Key Indexes

```sql
-- Fast company lookup
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_country ON companies(headquarters_country);
CREATE INDEX idx_companies_industry ON companies(industry_id);
CREATE INDEX idx_companies_gazda_score ON companies(gazda_score DESC);

-- Fast review queries
CREATE INDEX idx_reviews_company ON reviews(company_id, status, created_at DESC);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_user ON reviews(user_id); -- internal only

-- Salary queries
CREATE INDEX idx_salaries_company ON salaries(company_id, status);
CREATE INDEX idx_salaries_title ON salaries(job_title, country);

-- Job queries
CREATE INDEX idx_jobs_company ON jobs(company_id, status);
CREATE INDEX idx_jobs_country ON jobs(country, status, created_at DESC);
CREATE INDEX idx_jobs_active ON jobs(status, expires_at) WHERE status = 'active';

-- Full text search
CREATE INDEX idx_companies_name_search ON companies USING gin(to_tsvector('simple', name));
CREATE INDEX idx_reviews_text_search ON reviews USING gin(to_tsvector('simple', title || ' ' || pros || ' ' || cons));
```

---

## GAZDA Score Algorithm (v1)

The GAZDA Score is the platform's signature metric — a 1-10 rating of "boss behavior."

```
gazda_score = weighted_average(
  rating_overall     × 0.30,
  rating_management  × 0.25,
  rating_culture     × 0.20,
  rating_work_life   × 0.15,
  rating_growth      × 0.10
) × recency_factor × volume_factor
```

**Recency factor:** Reviews from last 12 months weighted 1.0, 12-24 months = 0.7, older = 0.4
**Volume factor:** <3 reviews = score shown as "provisional", 3-10 = normal, 10+ = "verified score"

This emphasizes management quality (the "gazda" in GAZDA) while factoring in overall culture and growth.

---

## Row Level Security (Supabase/PostgreSQL)

```sql
-- Users can only read their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY users_self ON users FOR ALL USING (auth.uid() = id);

-- Reviews: anyone can read approved, only author can edit pending
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY reviews_read ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY reviews_own ON reviews FOR ALL USING (auth.uid() = user_id);

-- Salaries: anyone can read approved
ALTER TABLE salaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY salaries_read ON salaries FOR SELECT USING (status = 'approved');
CREATE POLICY salaries_own ON salaries FOR ALL USING (auth.uid() = user_id);

-- CRITICAL: user_id is NEVER returned in API responses for reviews/salaries
-- This is enforced at the API layer, not just RLS
```

---

## Notes & Decisions
- **EUR as base currency** — even for RS/BA where local currencies exist. Conversion shown in UI.
- **Soft deletes everywhere** — legal compliance requires we can recover/produce data if subpoenaed
- **Anonymous ID** — SHA-256(user_id + company_id + salt) — same user reviewing same company is detectable, but identity stays hidden
- **Multilingual content** — stored as JSONB with language keys, not separate rows. Simpler queries.
- **No real names in reviews** — content moderation must flag any personally identifying info about individuals (names of managers, etc.)
