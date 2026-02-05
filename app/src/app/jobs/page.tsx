"use client";

import { useState, useMemo } from "react";
import { GazdaScore } from "@/components/ui/GazdaScore";
import { demoJobs, type JobWithCompany } from "@/lib/jobs";

const countries = [
  { code: "", label: "Sve države", flag: "🌍" },
  { code: "SI", label: "Slovenija", flag: "🇸🇮" },
  { code: "HR", label: "Hrvatska", flag: "🇭🇷" },
  { code: "RS", label: "Srbija", flag: "🇷🇸" },
  { code: "BA", label: "BiH", flag: "🇧🇦" },
];

const industries = [
  "Sve industrije", "Tech", "Farmacija", "Automotive", "Gaming",
  "Retail", "Financije", "Telekomunikacije", "Logistika", "Proizvodnja", "Transport",
];

const jobTypes = [
  { value: "", label: "Svi tipovi" },
  { value: "full-time", label: "Puno radno vrijeme" },
  { value: "part-time", label: "Pola radnog vremena" },
  { value: "contract", label: "Ugovor" },
];

const remotePolicies: Record<string, string> = {
  remote: "🏠 Remote",
  hybrid: "🔄 Hybrid",
  onsite: "U uredu",
};

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Danas";
  if (diffDays === 1) return "Jučer";
  if (diffDays < 7) return `Prije ${diffDays} dana`;
  if (diffDays < 30) return `Prije ${Math.floor(diffDays / 7)} tj.`;
  return `Prije ${Math.floor(diffDays / 30)} mj.`;
}

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("Sve industrije");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [salaryMin, setSalaryMin] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [selectedJob, setSelectedJob] = useState<JobWithCompany | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    let results = [...demoJobs];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company_name.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
      );
    }
    if (locationSearch) {
      const q = locationSearch.toLowerCase();
      results = results.filter((j) => j.city.toLowerCase().includes(q));
    }
    if (selectedCountry) {
      results = results.filter((j) => j.country_code === selectedCountry);
    }
    if (selectedIndustry !== "Sve industrije") {
      results = results.filter((j) => j.company_industry === selectedIndustry);
    }
    if (selectedJobType) {
      results = results.filter((j) => j.job_type === selectedJobType);
    }
    if (salaryMin > 0) {
      results = results.filter((j) => j.salary_max && j.salary_max >= salaryMin);
    }
    if (minRating > 0) {
      results = results.filter((j) => j.company_score >= minRating);
    }

    // Promoted jobs first, then by date
    results.sort((a, b) => {
      if (a.is_promoted && !b.is_promoted) return -1;
      if (!a.is_promoted && b.is_promoted) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return results;
  }, [search, locationSearch, selectedCountry, selectedIndustry, selectedJobType, salaryMin, minRating]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pronađi posao</h1>
        <p className="text-gray-500">
          Pregledaj oglase s transparentnim ocjenama poslodavaca — znaš što te čeka prije nego se prijaviš.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></span>
          <input
            type="text"
            placeholder="Pozicija, tvrtka ili ključna riječ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                       focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none 
                       transition-all bg-white dark:bg-gray-800"
          />
        </div>
        <div className="relative sm:w-64">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📍</span>
          <input
            type="text"
            placeholder="Grad ili lokacija..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                       focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none 
                       transition-all bg-white dark:bg-gray-800"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden px-4 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-600 
                     hover:border-brand-500 transition-colors"
        >
          ⚙️ Filteri
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className={`lg:w-64 shrink-0 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
          {/* Country */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">🌍 Država</h3>
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCountry(c.code)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                    ${selectedCountry === c.code
                      ? "bg-brand-500 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-400"
                    }`}
                >
                  {c.flag} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Industry */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Industrija</h3>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800"
            >
              {industries.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tip posla</h3>
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800"
            >
              {jobTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Min Salary */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Min. plaća: {salaryMin > 0 ? `€${salaryMin}` : "Sve"}
            </h3>
            <input
              type="range"
              min="0"
              max="5000"
              step="250"
              value={salaryMin}
              onChange={(e) => setSalaryMin(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Sve</span>
              <span>€5.000+</span>
            </div>
          </div>

          {/* Min Rating */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              ⭐ Min. GAZDA Score: {minRating > 0 ? minRating.toFixed(1) : "Sve"}
            </h3>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Sve</span>
              <span>10.0</span>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setSearch("");
              setLocationSearch("");
              setSelectedCountry("");
              setSelectedIndustry("Sve industrije");
              setSelectedJobType("");
              setSalaryMin(0);
              setMinRating(0);
            }}
            className="w-full py-2 text-sm text-brand-600 hover:text-brand-700 font-medium 
                       border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors"
          >
            Poništi sve filtere
          </button>
        </aside>

        {/* Job Listings */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {filteredJobs.length} {filteredJobs.length === 1 ? "posao" : filteredJobs.length < 5 ? "posla" : "poslova"}
            </p>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <button
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`w-full text-left bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm 
                           hover:shadow-md hover:-translate-y-0.5 transition-all border 
                           ${job.is_promoted
                             ? "border-amber-300 dark:border-amber-600 ring-1 ring-amber-200 dark:ring-amber-700"
                             : "border-gray-100 dark:border-gray-700"
                           }`}
              >
                {job.is_promoted && (
                  <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold 
                                   rounded-full mb-3">
                    ⭐ Istaknuti oglas
                  </span>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="shrink-0">
                    <GazdaScore score={job.company_score} size="sm" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{job.title}</h3>
                    <p className="text-brand-600 font-medium text-sm">{job.company_name}</p>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        📍 {job.city}, {job.country_code}
                      </span>
                      <span className="flex items-center gap-1">
                        {remotePolicies[job.remote_policy] || job.remote_policy}
                      </span>
                      {job.salary_min && job.salary_max && (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          €{job.salary_min.toLocaleString()} - €{job.salary_max.toLocaleString()}/mj.
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-xs text-gray-400">{getTimeAgo(job.created_at)}</span>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        {job.company_industry}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-4"></p>
                <p className="text-lg font-medium">Nema rezultata</p>
                <p className="text-sm mt-1">Pokušaj s drugačijim filterima ili ključnim riječima.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 pt-16 
                     overflow-y-auto"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] 
                       overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 
                           dark:border-gray-700 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <GazdaScore score={selectedJob.company_score} size="sm" />
                <div>
                  <h2 className="font-bold text-xl">{selectedJob.title}</h2>
                  <p className="text-brand-600 font-medium text-sm">{selectedJob.company_name}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 
                           dark:hover:bg-gray-700 transition-colors text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  📍 {selectedJob.city}, {selectedJob.country_code}
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  {remotePolicies[selectedJob.remote_policy]}
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  {selectedJob.company_industry}
                </span>
                {selectedJob.salary_min && selectedJob.salary_max && (
                  <span className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 
                                   dark:text-green-400 rounded-full text-sm font-medium">
                    €{selectedJob.salary_min.toLocaleString()} - €{selectedJob.salary_max.toLocaleString()}/mj.
                  </span>
                )}
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  📅 {getTimeAgo(selectedJob.created_at)}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Opis posla</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Zahtjevi</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-brand-500 mt-0.5">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Što nudimo</h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((ben, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-amber-500 mt-0.5">★</span>
                        {ben}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* GAZDA Score Info */}
              <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <GazdaScore score={selectedJob.company_score} size="sm" />
                  <div>
                    <p className="font-semibold text-sm">GAZDA Score: {selectedJob.company_score}/10</p>
                    <p className="text-xs text-gray-500">
                      Ocjena temeljena na recenzijama zaposlenika na Gazda platformi.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 
                                  transition-colors font-medium text-center">
                  Prijavi se za posao 🚀
                </button>
                <button className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                                  hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-center">
                  💾 Spremi oglas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
