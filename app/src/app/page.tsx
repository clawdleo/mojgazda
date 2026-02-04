"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GazdaScore } from "@/components/ui/GazdaScore";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewCard } from "@/components/review/ReviewCard";
import {
  getTopCompanies,
  getWorstCompanies,
  getRecentReviews,
  getStats,
  getCompanyColor,
} from "@/lib/demo-data";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const stats = getStats();
  const topCompanies = getTopCompanies(6);
  const worstCompanies = getWorstCompanies(3);
  const recentReviews = getRecentReviews(4);

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/companies?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Upoznaj svog{" "}
          <span className="text-brand-500 relative">
            gazdu
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
              <path d="M1 5.5Q50 1 100 5T199 3" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Anonimne recenzije poslodavaca, plaće i GAZDA Score —
          sve što trebaš znati prije nego prihvatiš posao. 🇸🇮 🇭🇷 🇷🇸 🇧🇦
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Pretraži tvrtku ili poziciju..."
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200
                         focus:border-brand-500 focus:ring-2 focus:ring-brand-200
                         outline-none transition-all dark:bg-gray-800 dark:border-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 px-6 py-2 bg-brand-500 text-white
                              rounded-lg hover:bg-brand-600 transition-colors font-medium"
            >
              Traži
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-12 mt-12 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-600">{stats.totalCompanies}</div>
            <div className="text-gray-500 text-sm">Tvrtki</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-600">{stats.totalReviews}</div>
            <div className="text-gray-500 text-sm">Recenzija</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-600">{stats.totalSalaries}</div>
            <div className="text-gray-500 text-sm">Plaća</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-600">{stats.countries}</div>
            <div className="text-gray-500 text-sm">Države</div>
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">🏆 Najbolje ocjenjeni gazde</h2>
          <Link href="/companies" className="text-brand-500 hover:underline text-sm font-medium">
            Pogledaj sve →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCompanies.map((company) => {
            const color = getCompanyColor(company.name);
            return (
              <Link
                key={company.slug}
                href={`/company/${company.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm
                          hover:shadow-md hover:-translate-y-0.5 transition-all border border-gray-100
                          dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <GazdaScore score={company.gazda_score} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        {company.name.charAt(0)}
                      </div>
                      <h3 className="font-semibold text-lg truncate">{company.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">{company.industry}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={company.avg_rating} size="sm" />
                      <span className="text-xs text-gray-400">
                        📍 {company.headquarters_city}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Worst Rated — Transparency! */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">⚠️ Najgore ocjenjeni gazde</h2>
            <p className="text-gray-500 text-sm mt-1">Transparentnost je naša misija — i loši poslodavci zaslužuju biti vidljivi.</p>
          </div>
          <Link href="/companies" className="text-brand-500 hover:underline text-sm font-medium">
            Pogledaj sve →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {worstCompanies.map((company) => {
            const color = getCompanyColor(company.name);
            return (
              <Link
                key={company.slug}
                href={`/company/${company.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm
                          hover:shadow-md hover:-translate-y-0.5 transition-all border border-red-100
                          dark:border-red-900/30"
              >
                <div className="flex items-center gap-4">
                  <GazdaScore score={company.gazda_score} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        {company.name.charAt(0)}
                      </div>
                      <h3 className="font-semibold text-lg truncate">{company.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">{company.industry}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      📍 {company.headquarters_city}, {company.headquarters_country}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">📝 Najnovije recenzije</h2>
          <Link href="/review" className="text-brand-500 hover:underline text-sm font-medium">
            Napiši svoju →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentReviews.map((review) => (
            <Link key={review.id} href={`/company/${review.company_slug}`}>
              <ReviewCard review={review} showCompany companyName={review.company_name} />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-brand-50 dark:bg-brand-900/20 rounded-2xl my-12 px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Imaš iskustvo? Podijeli ga anonimno. 🤫
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Pomozi drugima da donesu bolju odluku o zaposlenju.
          Tvoja recenzija je potpuno anonimna i može promijeniti nečiji život.
        </p>
        <Link
          href="/review"
          className="inline-block px-8 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600
                    transition-colors font-medium text-lg"
        >
          Napiši recenziju ✍️
        </Link>
      </section>

      {/* For Employers */}
      <section className="py-12 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">🏢 Za poslodavce</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Vaša reputacija kao poslodavca je važna. MojGazda vam pomaže razumjeti što zaposlenici
                misle, odgovoriti na recenzije i privući najbolje talente u regiji.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <li>✅ Besplatan profil tvrtke</li>
                <li>✅ Odgovarajte na recenzije zaposlenika</li>
                <li>✅ Objavite oglase za posao</li>
                <li>✅ Analitika i izvještaji o employer brandu</li>
              </ul>
              <Link
                href="/post-job"
                className="inline-block px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg
                          hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
              >
                Objavi oglas za posao →
              </Link>
            </div>
            <div className="text-center">
              <div className="text-8xl">🎯</div>
              <p className="text-gray-500 text-sm mt-4">Pronađite najbolje ljude za vaš tim</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
