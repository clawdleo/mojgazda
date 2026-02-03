import { supabase } from "./supabase";
import type { Company } from "@/types";

export async function getCompanies({
  country,
  industry,
  search,
  sort = "gazda_score",
  limit = 20,
  offset = 0,
}: {
  country?: string;
  industry?: string;
  search?: string;
  sort?: "gazda_score" | "total_reviews" | "name" | "created_at";
  limit?: number;
  offset?: number;
} = {}) {
  let query = supabase
    .from("companies")
    .select("*", { count: "exact" })
    .order(sort, { ascending: sort === "name" })
    .range(offset, offset + limit - 1);

  if (country) query = query.eq("headquarters_country", country);
  if (industry) query = query.eq("industry", industry);
  if (search) query = query.ilike("name", `%${search}%`);

  const { data, error, count } = await query;
  if (error) throw error;
  return { companies: data as Company[], total: count || 0 };
}

export async function getCompanyBySlug(slug: string) {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as Company;
}

export async function getCompanyReviews(companyId: string, limit = 10, offset = 0) {
  const { data, error, count } = await supabase
    .from("reviews")
    .select("*", { count: "exact" })
    .eq("company_id", companyId)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { reviews: data, total: count || 0 };
}

export async function getCompanySalaries(companyId: string) {
  const { data, error } = await supabase
    .from("salaries")
    .select("*")
    .eq("company_id", companyId)
    .eq("status", "approved")
    .order("base_salary_monthly", { ascending: false });

  if (error) throw error;
  return data;
}

export async function searchCompanies(query: string) {
  const { data, error } = await supabase
    .from("companies")
    .select("id, slug, name, industry, headquarters_country, gazda_score, total_reviews")
    .ilike("name", `%${query}%`)
    .order("total_reviews", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}
