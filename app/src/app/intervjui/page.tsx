"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllInterviews, getInterviewStats, type InterviewExperience } from "@/lib/interviews";
import { getCompanyColor } from "@/lib/demo-data";

const countries = [
  { code: "", label: "Sve države", flag: "🌍" },
  { code: "SI", label: "Slovenija", flag: "🇸🇮" },
  { code: "HR", label: "Hrvatska", flag: "🇭🇷" },
  { code: "RS", label: "Srbija", flag: "🇷🇸" },
  { code: "BA", label: "BiH", flag: "🇧🇦" },
];

const difficultyLabels: Record<string, { label: string; color: string }> = {
  easy: { label: "Lako", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  medium: { label: "Srednje", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  hard: { label: "Teško", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

const experienceLabels: Record<string, { label: string; icon: string; color: string }> = {
  positive: { label: "Pozitivno", icon: "😊", color: "text-green-600" },
  neutral: { label: "Neutralno", icon: "😐", color: "text-amber-600" },
  negative: { label: "Negativno", icon: "😞", color: "text-red-600" },
};

const applicationMethods: Record<string, string> = {
  online: "Online prijava",
  recruiter: "Recruiter",
  referral: "Preporuka",
  job_fair: "Job fair",
  other: "Ostalo",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("hr-HR", { year: "numeric", month: "long" });
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 7) return `Prije ${diffDays} dana`;
  if (diffDays < 30) return `Prije ${Math.floor(diffDays / 7)} tj.`;
  if (diffDays < 365) return `Prije ${Math.floor(diffDays / 30)} mj.`;
  return `Prije ${Math.floor(diffDays / 365)} god.`;
}

export default function InterviewsPage() {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const allInterviews = getAllInterviews();
  const stats = getInterviewStats();
  
  const filteredInterviews = useMemo(() => {
    let results = [...allInterviews];
    
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        i => i.company_name.toLowerCase().includes(q) ||
             i.job_title.toLowerCase().includes(q)
      );
    }
    if (selectedCountry) {
      results = results.filter(i => i.country_code === selectedCountry);
    }
    if (selectedExperience) {
      results = results.filter(i => i.experience === selectedExperience);
    }
    if (selectedDifficulty) {
      results = results.filter(i => i.difficulty === selectedDifficulty);
    }
    
    // Sort by date
    results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return results;
  }, [allInterviews, search, selectedCountry, selectedExperience, selectedDifficulty]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Iskustva s intervjua</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Saznaj kako izgleda proces zapošljavanja u tvrtkama diljem regije. 
          Pravi ljudi dijele stvarna iskustva.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-3xl font-bold text-brand-600">{stats.total}</p>
          <p className="text-sm text-gray-500">Iskustva</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-3xl font-bold text-green-600">{stats.positiveRate}%</p>
          <p className="text-sm text-gray-500">Pozitivnih</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-3xl font-bold text-brand-600">{stats.offerRate}%</p>
          <p className="text-sm text-gray-500">Dobilo ponudu</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-3xl font-bold text-amber-600">{stats.avgDuration}</p>
          <p className="text-sm text-gray-500">Prosj. dana</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Pretraži po tvrtki ili poziciji..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                     focus:border-brand-500 outline-none bg-white dark:bg-gray-800"
        />

        <div className="flex flex-wrap gap-3">
          {/* Country */}
          <div className="flex gap-2">
            {countries.map(c => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCountry === c.code
                    ? "bg-brand-500 text-white"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-400"
                }`}
              >
                {c.flag} {c.label}
              </button>
            ))}
          </div>

          {/* Experience filter */}
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800"
          >
            <option value="">Sva iskustva</option>
            <option value="positive">😊 Pozitivna</option>
            <option value="neutral">😐 Neutralna</option>
            <option value="negative">😞 Negativna</option>
          </select>

          {/* Difficulty filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800"
          >
            <option value="">Sve težine</option>
            <option value="easy">Lako</option>
            <option value="medium">Srednje</option>
            <option value="hard">Teško</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {filteredInterviews.length} {filteredInterviews.length === 1 ? "iskustvo" : "iskustava"}
      </p>

      {/* Interview Cards */}
      <div className="space-y-4">
        {filteredInterviews.map((interview) => (
          <div
            key={interview.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 
                       dark:border-gray-700 overflow-hidden hover:shadow-md transition-all"
          >
            {/* Card Header */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Company Avatar */}
                <Link href={`/company/${interview.company_slug}`}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white 
                               font-bold text-lg flex-shrink-0 hover:scale-105 transition-transform"
                    style={{ backgroundColor: getCompanyColor(interview.company_name) }}
                  >
                    {interview.company_name.charAt(0)}
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link 
                        href={`/company/${interview.company_slug}`}
                        className="font-bold text-lg hover:text-brand-600 transition-colors"
                      >
                        {interview.company_name}
                      </Link>
                      <p className="text-brand-600 font-medium">{interview.job_title}</p>
                    </div>
                    <span className={`text-2xl ${experienceLabels[interview.experience].color}`}>
                      {experienceLabels[interview.experience].icon}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyLabels[interview.difficulty].color}`}>
                      {difficultyLabels[interview.difficulty].label}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                      📍 {interview.city}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                      ⏱️ {interview.duration_days} dana
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                      {applicationMethods[interview.application_method]}
                    </span>
                    {interview.got_offer && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full text-xs text-green-700 dark:text-green-400">
                        ✓ Dobio/la ponudu
                      </span>
                    )}
                    {interview.got_offer === false && (
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded-full text-xs text-red-700 dark:text-red-400">
                        ✕ Bez ponude
                      </span>
                    )}
                  </div>

                  {/* Preview of process */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">
                    {interview.interview_process}
                  </p>
                </div>
              </div>

              {/* Expand/Collapse Button */}
              <button
                onClick={() => setExpandedId(expandedId === interview.id ? null : interview.id)}
                className="mt-4 text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
              >
                {expandedId === interview.id ? "Sakrij detalje ↑" : "Prikaži detalje ↓"}
              </button>
            </div>

            {/* Expanded Content */}
            {expandedId === interview.id && (
              <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-4">
                {/* Full Process */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Proces intervjua
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {interview.interview_process}
                  </p>
                </div>

                {/* Questions */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Primjeri pitanja
                  </h4>
                  <ul className="space-y-2">
                    {interview.questions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-brand-500 mt-0.5">❓</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-4">
                  <h4 className="font-semibold text-sm text-brand-700 dark:text-brand-400 mb-2">
                    💡 Savjeti za kandidate
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {interview.tips}
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                  <span>Intervju održan: {formatDate(interview.interview_date)}</span>
                  <span>👍 {interview.helpful_count} korisno</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredInterviews.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold mb-2">Nema rezultata</h3>
            <p className="text-gray-500">Pokušaj s drugačijim filterima</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-brand-500 to-teal-500 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Prošao/la si intervju?</h2>
        <p className="text-brand-100 mb-6 max-w-lg mx-auto">
          Podijeli svoje iskustvo i pomozi drugima da se bolje pripreme. 
          Tvoje iskustvo je potpuno anonimno.
        </p>
        <Link
          href="/review"
          className="inline-block px-8 py-3 bg-white text-brand-600 rounded-xl hover:bg-gray-100 
                     transition-colors font-medium"
        >
          Podijeli iskustvo
        </Link>
      </div>
    </div>
  );
}
