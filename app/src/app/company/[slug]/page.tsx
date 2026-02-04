"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { GazdaScore } from "@/components/ui/GazdaScore";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewCard } from "@/components/review/ReviewCard";
import { getCompanyBySlug, getCompanyColor } from "@/lib/demo-data";
import { demoJobs } from "@/lib/jobs";

type Tab = "reviews" | "salaries" | "jobs" | "about";
type ReviewSort = "newest" | "highest" | "lowest" | "helpful";

const countryNames: Record<string, string> = {
  SI: "Slovenija",
  HR: "Hrvatska",
  RS: "Srbija",
  BA: "Bosna i Hercegovina",
};

export default function CompanyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tab, setTab] = useState<Tab>("reviews");
  const [reviewSort, setReviewSort] = useState<ReviewSort>("newest");

  const data = getCompanyBySlug(slug);

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">🤷</p>
        <h1 className="text-2xl font-bold mb-2">Tvrtka nije pronađena</h1>
        <p className="text-gray-500 mb-6">Ne postoji tvrtka s tim identifikatorom.</p>
        <Link href="/companies" className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium">
          ← Natrag na tvrtke
        </Link>
      </div>
    );
  }

  const { company, reviews, salaries } = data;
  const color = getCompanyColor(company.name);

  // Rating breakdown from real reviews
  const ratingBreakdown = useMemo(() => {
    if (reviews.length === 0) return [];
    const avg = (key: string) => {
      const vals = reviews
        .map((r) => (r as unknown as Record<string, unknown>)[key] as number | undefined)
        .filter((v): v is number => v !== undefined && v > 0);
      return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    };
    return [
      { label: "Upravljanje", value: parseFloat(avg("rating_management").toFixed(1)) },
      { label: "Plaća", value: parseFloat(avg("rating_salary").toFixed(1)) },
      { label: "Ravnoteža", value: parseFloat(avg("rating_worklife").toFixed(1)) },
      { label: "Kultura", value: parseFloat(avg("rating_culture").toFixed(1)) },
      { label: "Razvoj", value: parseFloat(avg("rating_growth").toFixed(1)) },
    ];
  }, [reviews]);

  // Recommend percentage
  const recommendPct = useMemo(() => {
    if (reviews.length === 0) return 0;
    const positive = reviews.filter((r) => r.rating_overall >= 4).length;
    return Math.round((positive / reviews.length) * 100);
  }, [reviews]);

  // Sorted reviews
  const sortedReviews = useMemo(() => {
    const r = [...reviews];
    switch (reviewSort) {
      case "newest":
        r.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "highest":
        r.sort((a, b) => b.rating_overall - a.rating_overall);
        break;
      case "lowest":
        r.sort((a, b) => a.rating_overall - b.rating_overall);
        break;
      case "helpful":
        r.sort((a, b) => b.helpful_count - a.helpful_count);
        break;
    }
    return r;
  }, [reviews, reviewSort]);

  // Jobs for this company
  const companyJobs = useMemo(() => {
    return demoJobs.filter((j) => j.company_slug === slug);
  }, [slug]);

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "reviews", label: "📝 Recenzije", count: reviews.length },
    { key: "salaries", label: "💰 Plaće", count: salaries.length },
    { key: "jobs", label: "💼 Poslovi", count: companyJobs.length },
    { key: "about", label: "ℹ️ O firmi" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600">Početna</Link>
        <span className="mx-2">/</span>
        <Link href="/companies" className="hover:text-brand-600">Tvrtke</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-white">{company.name}</span>
      </nav>

      {/* Company Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            {company.name.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold">{company.name}</h1>
              {company.is_claimed && (
                <span className="px-2 py-0.5 bg-brand-100 text-brand-700 rounded-full text-xs font-medium">
                  ✓ Verificirano
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
              <span>🏢 {company.industry}</span>
              <span>📍 {company.headquarters_city}, {countryNames[company.headquarters_country] ?? company.headquarters_country}</span>
              <span>👥 {company.company_size} zaposlenih</span>
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">
                  🌐 Web
                </a>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {(company as { description_hr?: string }).description_hr}
            </p>
          </div>

          <div className="flex flex-col items-center flex-shrink-0">
            <GazdaScore score={company.gazda_score} size="lg" showLabel />
            <p className="text-xs text-gray-400 mt-2">{reviews.length} recenzija</p>
            <div className="flex items-center gap-1 mt-1">
              <StarRating rating={company.avg_rating} size="sm" />
              <span className="text-sm font-medium text-gray-600">{company.avg_rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mt-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? "text-brand-600 border-brand-500"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                tab === t.key ? "bg-brand-100 text-brand-700" : "bg-gray-100 text-gray-500"
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reviews Tab */}
          {tab === "reviews" && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recenzije ({reviews.length})</h2>
                <select
                  className="text-sm border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700"
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value as ReviewSort)}
                >
                  <option value="newest">Najnovije</option>
                  <option value="highest">Najviša ocjena</option>
                  <option value="lowest">Najniža ocjena</option>
                  <option value="helpful">Najkorisnije</option>
                </select>
              </div>

              {sortedReviews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">📝</p>
                  <p className="text-gray-500">Još nema recenzija za ovu tvrtku.</p>
                  <Link
                    href={`/review?company=${slug}`}
                    className="inline-block mt-4 px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                  >
                    Budi prvi/a — napiši recenziju
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Salaries Tab */}
          {tab === "salaries" && (
            <>
              <h2 className="text-xl font-bold">💰 Plaće u {company.name}</h2>
              {salaries.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">💰</p>
                  <p className="text-gray-500">Još nema podataka o plaćama za ovu tvrtku.</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3">Pozicija</th>
                        <th className="px-6 py-3">Razina</th>
                        <th className="px-6 py-3 text-right">Mjesečna plaća</th>
                        <th className="px-6 py-3 text-right hidden sm:table-cell">Prijava</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {salaries.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium">{s.job_title}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              s.seniority === "senior" ? "bg-purple-100 text-purple-700" :
                              s.seniority === "mid" ? "bg-blue-100 text-blue-700" :
                              "bg-gray-100 text-gray-600"
                            }`}>
                              {s.seniority === "senior" ? "Senior" : s.seniority === "mid" ? "Mid" : "Junior"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-sm">
                            €{s.base_salary_monthly.toLocaleString("hr-HR")}
                          </td>
                          <td className="px-6 py-4 text-right text-xs text-gray-400 hidden sm:table-cell">
                            {s.reports_count} prijava
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Jobs Tab */}
          {tab === "jobs" && (
            <>
              <h2 className="text-xl font-bold">💼 Otvorene pozicije</h2>
              {companyJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">💼</p>
                  <p className="text-gray-500">Trenutno nema otvorenih pozicija u {company.name}.</p>
                  <Link href="/jobs" className="inline-block mt-4 text-brand-500 hover:underline text-sm">
                    Pogledaj sve poslove →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {companyJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2 text-xs">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">📍 {job.city}</span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                              {job.job_type === "full-time" ? "Puno radno vrijeme" : "Part-time"}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                              {job.remote_policy === "remote" ? "🏠 Remote" : job.remote_policy === "hybrid" ? "🔄 Hybrid" : "🏢 Ured"}
                            </span>
                          </div>
                        </div>
                        {job.salary_min && job.salary_max && (
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-brand-600">
                              €{job.salary_min.toLocaleString()}-{job.salary_max.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400">mjesečno</p>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">{job.description}</p>
                      {job.is_promoted && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">⭐ Promoviran oglas</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* About Tab */}
          {tab === "about" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">ℹ️ O tvrtki {company.name}</h2>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {(company as { description_hr?: string }).description_hr}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="text-xs text-gray-500">Industrija</p>
                      <p className="font-medium">{company.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-xs text-gray-500">Sjedište</p>
                      <p className="font-medium">{company.headquarters_city}, {countryNames[company.headquarters_country]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="text-xs text-gray-500">Veličina tvrtke</p>
                      <p className="font-medium">{company.company_size} zaposlenih</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <p className="text-xs text-gray-500">Aktivna tržišta</p>
                      <p className="font-medium">{company.countries_active.join(", ")}</p>
                    </div>
                  </div>
                  {company.website && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg sm:col-span-2">
                      <span className="text-2xl">🌐</span>
                      <div>
                        <p className="text-xs text-gray-500">Web stranica</p>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-500 hover:underline">
                          {company.website}
                        </a>
                      </div>
                    </div>
                  )}
                  {company.legal_name && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg sm:col-span-2">
                      <span className="text-2xl">📋</span>
                      <div>
                        <p className="text-xs text-gray-500">Puni naziv</p>
                        <p className="font-medium">{company.legal_name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rating Breakdown */}
          {ratingBreakdown.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold mb-4">📊 Ocjene po kategoriji</h3>
              <div className="space-y-3">
                {ratingBreakdown.map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-24">{r.label}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-brand-500 h-2 rounded-full transition-all"
                        style={{ width: `${(r.value / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold mb-4">👍 Preporučuju li gazdu?</h3>
            <div className="flex items-center gap-3">
              <div className={`text-3xl font-bold ${recommendPct >= 60 ? "text-green-500" : recommendPct >= 40 ? "text-amber-500" : "text-red-500"}`}>
                {recommendPct}%
              </div>
              <p className="text-sm text-gray-500">zaposlenika preporučuje ovog poslodavca prijatelju</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div
                className={`h-2 rounded-full transition-all ${
                  recommendPct >= 60 ? "bg-green-500" : recommendPct >= 40 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${recommendPct}%` }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 text-center">
            <p className="font-medium mb-3">Radiš ili si radio/la u {company.name}?</p>
            <Link
              href={`/review?company=${slug}`}
              className="block w-full px-4 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium text-center"
            >
              Napiši anonimnu recenziju ✍️
            </Link>
          </div>

          {/* Quick salary peek */}
          {salaries.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold mb-4">💰 Raspon plaća</h3>
              <div className="space-y-2">
                {salaries.slice(0, 3).map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300 truncate mr-2">{s.job_title}</span>
                    <span className="font-semibold text-brand-600 whitespace-nowrap">€{s.base_salary_monthly.toLocaleString("hr-HR")}</span>
                  </div>
                ))}
              </div>
              {salaries.length > 3 && (
                <button
                  onClick={() => setTab("salaries")}
                  className="text-sm text-brand-500 hover:underline mt-3"
                >
                  Pogledaj sve plaće →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
