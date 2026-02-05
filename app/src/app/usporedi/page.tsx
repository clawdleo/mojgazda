"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GazdaScore } from "@/components/ui/GazdaScore";
import { StarRating } from "@/components/ui/StarRating";
import { getAllCompanies, getCompanyBySlug, getCompanyColor } from "@/lib/demo-data";
import type { Review } from "@/types";

function CompareContent() {
  const searchParams = useSearchParams();
  const [company1Slug, setCompany1Slug] = useState(searchParams.get("c1") || "");
  const [company2Slug, setCompany2Slug] = useState(searchParams.get("c2") || "");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);

  const allCompanies = getAllCompanies();

  const suggestions1 = useMemo(() => {
    if (!search1.trim() || company1Slug) return [];
    return allCompanies.filter(c => 
      c.name.toLowerCase().includes(search1.toLowerCase()) && c.slug !== company2Slug
    ).slice(0, 5);
  }, [search1, company1Slug, company2Slug, allCompanies]);

  const suggestions2 = useMemo(() => {
    if (!search2.trim() || company2Slug) return [];
    return allCompanies.filter(c => 
      c.name.toLowerCase().includes(search2.toLowerCase()) && c.slug !== company1Slug
    ).slice(0, 5);
  }, [search2, company2Slug, company1Slug, allCompanies]);

  const company1Data = company1Slug ? getCompanyBySlug(company1Slug) : null;
  const company2Data = company2Slug ? getCompanyBySlug(company2Slug) : null;

  const selectCompany1 = (slug: string, name: string) => {
    setCompany1Slug(slug);
    setSearch1(name);
    setShowSuggestions1(false);
  };

  const selectCompany2 = (slug: string, name: string) => {
    setCompany2Slug(slug);
    setSearch2(name);
    setShowSuggestions2(false);
  };

  const clearCompany1 = () => {
    setCompany1Slug("");
    setSearch1("");
  };

  const clearCompany2 = () => {
    setCompany2Slug("");
    setSearch2("");
  };

  const getWinner = (val1: number, val2: number) => {
    if (val1 > val2) return 1;
    if (val2 > val1) return 2;
    return 0;
  };

  const ratingCategories = [
    { key: "gazda_score", label: "GAZDA Score", max: 10 },
    { key: "avg_rating", label: "Ukupna ocjena", max: 5 },
    { key: "rating_management", label: "Upravljanje", max: 5 },
    { key: "rating_salary", label: "Plaća", max: 5 },
    { key: "rating_worklife", label: "Ravnoteža", max: 5 },
    { key: "rating_culture", label: "Kultura", max: 5 },
    { key: "rating_growth", label: "Razvoj", max: 5 },
  ];

  const getAverageRating = (reviews: Review[] | undefined, key: string) => {
    if (!reviews || reviews.length === 0) return 0;
    const values = reviews
      .map(r => (r as unknown as Record<string, number>)[key])
      .filter((v): v is number => v !== undefined && v > 0);
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  };

  const bothSelected = company1Data && company2Data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Usporedi poslodavce</h1>
        <p className="text-gray-500">Usporedi dvije tvrtke rame uz rame i donesi informiranu odluku</p>
      </div>

      {/* Company Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Company 1 */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2">Prva tvrtka</label>
          {company1Data ? (
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-brand-500">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getCompanyColor(company1Data.company.name) }}
              >
                {company1Data.company.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{company1Data.company.name}</p>
                <p className="text-xs text-gray-500">{company1Data.company.industry}</p>
              </div>
              <button onClick={clearCompany1} className="text-gray-400 hover:text-red-500 p-1">✕</button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Pretraži tvrtku..."
                value={search1}
                onChange={(e) => { setSearch1(e.target.value); setShowSuggestions1(true); }}
                onFocus={() => setShowSuggestions1(true)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                           focus:border-brand-500 outline-none bg-white dark:bg-gray-800"
              />
              {showSuggestions1 && suggestions1.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 
                               dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                  {suggestions1.map(c => (
                    <button
                      key={c.slug}
                      onClick={() => selectCompany1(c.slug, c.name)}
                      className="w-full px-4 py-3 text-left hover:bg-brand-50 dark:hover:bg-brand-900/20 
                                 transition-colors flex items-center gap-3"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: getCompanyColor(c.name) }}
                      >
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium">{c.name}</span>
                        <span className="text-xs text-gray-400 ml-2">{c.industry}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* VS */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* <span className="text-2xl font-bold text-gray-300">VS</span> */}
        </div>

        {/* Company 2 */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2">Druga tvrtka</label>
          {company2Data ? (
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-teal-500">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getCompanyColor(company2Data.company.name) }}
              >
                {company2Data.company.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{company2Data.company.name}</p>
                <p className="text-xs text-gray-500">{company2Data.company.industry}</p>
              </div>
              <button onClick={clearCompany2} className="text-gray-400 hover:text-red-500 p-1">✕</button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Pretraži tvrtku..."
                value={search2}
                onChange={(e) => { setSearch2(e.target.value); setShowSuggestions2(true); }}
                onFocus={() => setShowSuggestions2(true)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                           focus:border-teal-500 outline-none bg-white dark:bg-gray-800"
              />
              {showSuggestions2 && suggestions2.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 
                               dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                  {suggestions2.map(c => (
                    <button
                      key={c.slug}
                      onClick={() => selectCompany2(c.slug, c.name)}
                      className="w-full px-4 py-3 text-left hover:bg-teal-50 dark:hover:bg-teal-900/20 
                                 transition-colors flex items-center gap-3"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: getCompanyColor(c.name) }}
                      >
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium">{c.name}</span>
                        <span className="text-xs text-gray-400 ml-2">{c.industry}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Results */}
      {bothSelected && (
        <div className="space-y-6">
          {/* GAZDA Score Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-center">GAZDA Score</h2>
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <GazdaScore score={company1Data.company.gazda_score} size="lg" showLabel />
                <p className="font-semibold mt-2">{company1Data.company.name}</p>
              </div>
              <div className="text-center text-4xl font-bold text-gray-300">VS</div>
              <div className="text-center">
                <GazdaScore score={company2Data.company.gazda_score} size="lg" showLabel />
                <p className="font-semibold mt-2">{company2Data.company.name}</p>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6">Usporedba ocjena</h2>
            <div className="space-y-4">
              {ratingCategories.map(cat => {
                let val1: number, val2: number;
                if (cat.key === "gazda_score") {
                  val1 = company1Data.company.gazda_score;
                  val2 = company2Data.company.gazda_score;
                } else if (cat.key === "avg_rating") {
                  val1 = company1Data.company.avg_rating;
                  val2 = company2Data.company.avg_rating;
                } else {
                  val1 = getAverageRating(company1Data.reviews, cat.key);
                  val2 = getAverageRating(company2Data.reviews, cat.key);
                }
                const winner = getWinner(val1, val2);

                return (
                  <div key={cat.key} className="grid grid-cols-7 gap-2 items-center">
                    <div className={`col-span-2 text-right ${winner === 1 ? "font-bold text-brand-600" : ""}`}>
                      {val1.toFixed(1)}/{cat.max}
                      {winner === 1 && <span className="ml-1">👑</span>}
                    </div>
                    <div className="col-span-1">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                        <div 
                          className="bg-brand-500 h-full transition-all"
                          style={{ width: `${(val1 / cat.max) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="col-span-1 text-center text-sm font-medium text-gray-500">
                      {cat.label}
                    </div>
                    <div className="col-span-1">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex justify-end">
                        <div 
                          className="bg-teal-500 h-full transition-all"
                          style={{ width: `${(val2 / cat.max) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className={`col-span-2 text-left ${winner === 2 ? "font-bold text-teal-600" : ""}`}>
                      {winner === 2 && <span className="mr-1">👑</span>}
                      {val2.toFixed(1)}/{cat.max}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company 1 Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: getCompanyColor(company1Data.company.name) }}
                >
                  {company1Data.company.name.charAt(0)}
                </div>
                {company1Data.company.name}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Industrija</span>
                  <span className="font-medium">{company1Data.company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Veličina</span>
                  <span className="font-medium">{company1Data.company.company_size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lokacija</span>
                  <span className="font-medium">{company1Data.company.headquarters_city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Recenzija</span>
                  <span className="font-medium">{company1Data.reviews.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Preporučuje</span>
                  <span className="font-medium">
                    {Math.round((company1Data.reviews.filter(r => r.rating_overall >= 4).length / company1Data.reviews.length) * 100) || 0}%
                  </span>
                </div>
              </div>
              <Link 
                href={`/company/${company1Slug}`}
                className="block w-full mt-4 py-2 text-center text-sm font-medium text-brand-600 
                           hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors"
              >
                Pogledaj profil →
              </Link>
            </div>

            {/* Company 2 Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: getCompanyColor(company2Data.company.name) }}
                >
                  {company2Data.company.name.charAt(0)}
                </div>
                {company2Data.company.name}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Industrija</span>
                  <span className="font-medium">{company2Data.company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Veličina</span>
                  <span className="font-medium">{company2Data.company.company_size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lokacija</span>
                  <span className="font-medium">{company2Data.company.headquarters_city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Recenzija</span>
                  <span className="font-medium">{company2Data.reviews.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Preporučuje</span>
                  <span className="font-medium">
                    {Math.round((company2Data.reviews.filter(r => r.rating_overall >= 4).length / company2Data.reviews.length) * 100) || 0}%
                  </span>
                </div>
              </div>
              <Link 
                href={`/company/${company2Slug}`}
                className="block w-full mt-4 py-2 text-center text-sm font-medium text-teal-600 
                           hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
              >
                Pogledaj profil →
              </Link>
            </div>
          </div>

          {/* Overall Winner */}
          {(() => {
            const score1 = company1Data.company.gazda_score + company1Data.company.avg_rating * 2;
            const score2 = company2Data.company.gazda_score + company2Data.company.avg_rating * 2;
            const winner = score1 > score2 ? company1Data : score2 > score1 ? company2Data : null;
            
            if (!winner) {
              return (
                <div className="bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-6 text-center">
                  <span className="text-4xl mb-2 block">🤝</span>
                  <h3 className="text-xl font-bold">Izjednačeno!</h3>
                  <p className="text-gray-500 text-sm">Obje tvrtke imaju slične ocjene</p>
                </div>
              );
            }

            return (
              <div className="bg-gradient-to-r from-brand-500 to-teal-500 rounded-2xl p-6 text-center text-white">
                <span className="text-4xl mb-2 block">🏆</span>
                <h3 className="text-xl font-bold">Pobjednik: {winner.company.name}</h3>
                <p className="text-brand-100 text-sm">Na temelju ukupnih ocjena i GAZDA Score-a</p>
              </div>
            );
          })()}
        </div>
      )}

      {/* Empty State */}
      {!bothSelected && (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <span className="text-5xl mb-4 block">⚖️</span>
          <h3 className="text-xl font-bold mb-2">Odaberi dvije tvrtke za usporedbu</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Usporedi GAZDA Score, ocjene zaposlenika, plaće i benefite rame uz rame
          </p>
        </div>
      )}

      {/* Popular Comparisons */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Popularne usporedbe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { c1: "rimac", c2: "infobip", label: "Rimac vs Infobip" },
            { c1: "konzum", c2: "mercator-dd", label: "Konzum vs Mercator" },
            { c1: "nordeus", c2: "comtrade", label: "Nordeus vs Comtrade" },
          ].map((comparison) => (
            <button
              key={comparison.label}
              onClick={() => {
                selectCompany1(comparison.c1, allCompanies.find(c => c.slug === comparison.c1)?.name || "");
                selectCompany2(comparison.c2, allCompanies.find(c => c.slug === comparison.c2)?.name || "");
              }}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
                         hover:border-brand-400 hover:shadow-md transition-all text-left"
            >
              <p className="font-medium">{comparison.label}</p>
              <p className="text-xs text-gray-500 mt-1">Klikni za usporedbu →</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-400">Učitavanje...</div>}>
      <CompareContent />
    </Suspense>
  );
}
