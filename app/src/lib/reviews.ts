import { supabase } from "./supabase";

interface CreateReviewInput {
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
  department?: string;
  employment_type: string;
  employment_status: string;
  years_at_company?: string;
  location_city?: string;
  country_code?: string;
  language?: string;
}

export async function createReview(input: CreateReviewInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Must be logged in to write a review");

  // Check: user hasn't reviewed this company in last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data: existing } = await supabase
    .from("reviews")
    .select("id")
    .eq("company_id", input.company_id)
    .eq("user_id", user.id)
    .gte("created_at", sixMonthsAgo.toISOString())
    .limit(1);

  if (existing && existing.length > 0) {
    throw new Error("Već ste napisali recenziju za ovu tvrtku u zadnjih 6 mjeseci");
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      ...input,
      user_id: user.id,
      status: "pending",
      is_anonymous: true,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function voteReview(reviewId: string, isHelpful: boolean) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Must be logged in to vote");

  const { error } = await supabase
    .from("review_votes")
    .upsert({
      user_id: user.id,
      review_id: reviewId,
      is_helpful: isHelpful,
    });

  if (error) throw error;

  // Update helpful count
  const { count } = await supabase
    .from("review_votes")
    .select("*", { count: "exact", head: true })
    .eq("review_id", reviewId)
    .eq("is_helpful", true);

  await supabase
    .from("reviews")
    .update({ helpful_count: count || 0 })
    .eq("id", reviewId);
}

export async function reportReview(reviewId: string, reason: string, details?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Must be logged in to report");

  const { error } = await supabase
    .from("review_reports")
    .insert({
      review_id: reviewId,
      reported_by: user.id,
      reason,
      details,
    });

  if (error) throw error;

  // Increment report count
  await supabase.rpc("increment_report_count", { review_id: reviewId });
}

export async function getRecentReviews(limit = 10) {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      companies:company_id (name, slug, industry, logo_url)
    `)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
