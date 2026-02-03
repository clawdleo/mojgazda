export interface Company {
  id: string;
  slug: string;
  name: string;
  legal_name?: string;
  logo_url?: string;
  website?: string;
  industry: string;
  company_size: string;
  headquarters_city: string;
  headquarters_country: string;
  countries_active: string[];
  gazda_score: number;
  total_reviews: number;
  avg_rating: number;
  is_claimed: boolean;
}

export interface Review {
  id: string;
  company_id: string;
  rating_overall: number;
  rating_management?: number;
  rating_salary?: number;
  rating_worklife?: number;
  rating_culture?: number;
  rating_growth?: number;
  gazda_rating: number;
  title: string;
  pros: string;
  cons: string;
  advice_to_management?: string;
  job_title?: string;
  employment_type: string;
  employment_status: string;
  years_at_company?: string;
  department?: string;
  location_city?: string;
  country_code?: string;
  language?: string;
  is_anonymous: boolean;
  helpful_count: number;
  employer_response?: string;
  created_at: string;
}

export interface Salary {
  id: string;
  company_id: string;
  job_title: string;
  seniority: string;
  base_salary_monthly: number;
  currency: string;
  country_code: string;
  city?: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  job_type: string;
  remote_policy: string;
  salary_min?: number;
  salary_max?: number;
  city: string;
  country_code: string;
  is_promoted: boolean;
  created_at: string;
}

export type GazdaScoreLevel = "excellent" | "decent" | "average" | "poor" | "terrible";
