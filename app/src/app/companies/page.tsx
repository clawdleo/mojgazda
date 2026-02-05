"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GazdaScore } from "@/components/ui/GazdaScore";
import { StarRating } from "@/components/ui/StarRating";
import { getAllCompanies, getCompanyReviews, getCompanyColor } from "@/lib/demo-data";

type SortKey = "score" | "reviews" | "name" | "rating";

export default function CompaniesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">Učitavanje...</div>}>
      <CompaniesContent />
    </Suspense>
  );
}

function CompaniesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [search, setSearch] = useState(initialQuery);
  const [country, setCountry] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [sort, setSort] = useState<SortKey>("score");

  useEffect(() => {
    if (initialQuery) setSearch(initialQuery);
  }, [initialQuery]);

  const companies = getAllCompanies();

  const countries = [
    { code: "all", label: "Sve države", flag: "🌍" },
    { code: "SI", label: "Slovenija", flag: "🇸🇮" },
    { code: "HR", label: "Hrvatska", flag: "🇭🇷" },
    { code: "RS", label: "Srbija", flag: "🇷🇸" },
    { code: "BA", label: "BiH", flag: "🇧🇦" },
  ];

  const industries = useMemo(() => {
    const set = new Set(companies.map((c) => c.industry));
    return ["all", ...Array.from(set).sort()];
  }, [companies]);

  const filtered = useMemo(() => {
    let result = [...companies];

    if (country !== "all") {
      result = result.filter((c) => c.headquarters_country === country);
    }
    if (industry !== "all") {
      result = result.filter((c) => c.industry === industry);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.headquarters_city.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "score":
        result.sort((a, b) => b.gazda_score - a.gazda_score);
        break;
      case "reviews":
        result.sort((a, b) => {
          const ra = getCompanyReviews(a.slug).length;
          const rb = getCompanyReviews(b.slug).length;
          return rb - ra;
        });
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result.sort((a, b) => b.avg_rating - a.avg_rating);
        break;
    }

    return result;
  }, [companies, country, industry, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Istraži tvrtke</h1>
        <p className="text-gray-500">Pronađi i usporedi poslodavce diljem Balkana</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Pretraži po imenu, industriji ili gradu..."
          className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                     focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none 
                     transition-all bg-white dark:bg-gray-800 text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Country buttons */}
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => setCountry(c.code)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                country === c.code
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-400 text-gray-700 dark:text-gray-300"
              }`}
            >
              {c.flag} {c.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 ml-auto">
          {/* Industry dropdown */}
          <select
            className="px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 outline-none focus:border-brand-500"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="all">Sve industrije</option>
            {industries.filter((i) => i !== "all").map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>

          {/* Sort dropdown */}
          <select
            className="px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 outline-none focus:border-brand-500"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            <option value="score">GAZDA Score ↓</option>
            <option value="rating">Ocjena ↓</option>
            <option value="reviews">Broj recenzija ↓</option>
            <option value="name">Ime A-Z</option>
          </select>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 mb-4">
        {filtered.length} {filtered.length === 1 ? "tvrtka pronađena" : "tvrtki pronađeno"}
      </p>

      {/* Company Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500 text-lg">Nema rezultata za zadane filtere.</p>
          <button
            onClick={() => { setSearch(""); setCountry("all"); setIndustry("all"); }}
            className="mt-4 px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
          >
            Resetiraj filtere
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((company) => {
            const reviewCount = getCompanyReviews(company.slug).length;
            const color = getCompanyColor(company.name);
            return (
              <Link
                key={company.slug}
                href={`/company/${company.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md 
                          hover:-translate-y-0.5 transition-all border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <GazdaScore score={company.gazda_score} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        {company.name.charAt(0)}
                      </div>
                      <h3 className="font-semibold text-lg truncate">{company.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">{company.industry}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      📍 {company.headquarters_city}, {company.headquarters_country === "SI" ? "Slovenija" : company.headquarters_country === "HR" ? "Hrvatska" : company.headquarters_country === "RS" ? "Srbija" : "BiH"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <StarRating rating={company.avg_rating} size="sm" />
                      <span className="text-xs text-gray-400">{reviewCount} recenzija</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">👥 {company.company_size}</span>
                      {company.is_claimed && (
                        <span className="text-xs text-brand-600 font-medium">✓ Verificirano</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
