"use client";

import { useState, useMemo } from "react";
import { demoSalaries, popularRoles, formatSalary, type SalaryData } from "@/lib/salaries";

const countries = [
  { code: "", label: "Sve države", flag: "🌍" },
  { code: "SI", label: "Slovenija", flag: "🇸🇮" },
  { code: "HR", label: "Hrvatska", flag: "🇭🇷" },
  { code: "RS", label: "Srbija", flag: "🇷🇸" },
  { code: "BA", label: "BiH", flag: "🇧🇦" },
];

const categories = [
  "Sve kategorije", "Tech", "Financije", "Prodaja", "Logistika",
  "Proizvodnja", "Zdravstvo", "Turizam", "Građevina", "Marketing", "Administracija",
];

const countryNames: Record<string, string> = {
  SI: "Slovenija",
  HR: "Hrvatska",
  RS: "Srbija",
  BA: "BiH",
};

export default function SalariesPage() {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Sve kategorije");
  const [sortBy, setSortBy] = useState<"avg" | "reports" | "title">("reports");
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportForm, setReportForm] = useState({
    job_title: "",
    salary: "",
    country: "HR",
    city: "",
    company: "",
  });

  const filteredSalaries = useMemo(() => {
    let results = [...demoSalaries];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.job_title.toLowerCase().includes(q) ||
          (s.city && s.city.toLowerCase().includes(q))
      );
    }
    if (selectedCountry) {
      results = results.filter((s) => s.country_code === selectedCountry);
    }
    if (selectedCategory !== "Sve kategorije") {
      results = results.filter((s) => s.category === selectedCategory);
    }

    // Sort
    results.sort((a, b) => {
      if (sortBy === "avg") return b.avg_salary - a.avg_salary;
      if (sortBy === "reports") return b.reports_count - a.reports_count;
      return a.job_title.localeCompare(b.job_title);
    });

    return results;
  }, [search, selectedCountry, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">💰 Plaće u regiji</h1>
        <p className="text-gray-500">
          Usporedi plaće po pozicijama i lokacijama. Transparentni podaci temeljeni na anonimnim prijavama zaposlenika.
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Pretraži po poziciji ili gradu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                       focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none 
                       transition-all bg-white dark:bg-gray-800"
          />
        </div>
        <button
          onClick={() => setShowReportForm(true)}
          className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors 
                     font-medium whitespace-nowrap"
        >
          📊 Prijavi svoju plaću
        </button>
      </div>

      {/* Popular Roles Grid */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">🔥 Popularne pozicije</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularRoles.map((role) => (
            <button
              key={role.title}
              onClick={() => setSearch(role.title)}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 
                         dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
            >
              <div className="text-2xl mb-2">{role.icon}</div>
              <h3 className="font-semibold text-sm truncate">{role.title}</h3>
              <p className="text-brand-600 font-bold text-lg">{formatSalary(role.avgSalary)}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">{role.reports} prijava</span>
                <span className={`text-xs font-medium ${
                  role.trend === "up" ? "text-green-500" : role.trend === "down" ? "text-red-500" : "text-gray-400"
                }`}>
                  {role.trend === "up" && "↗"}
                  {role.trend === "down" && "↘"}
                  {role.trend === "stable" && "→"}
                  {" "}{role.trendPct > 0 ? "+" : ""}{role.trendPct}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2">
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
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-800"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "avg" | "reports" | "title")}
          className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-800 ml-auto"
        >
          <option value="reports">Najviše prijava</option>
          <option value="avg">Najviša plaća</option>
          <option value="title">Po nazivu</option>
        </select>
      </div>

      {/* Salary Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-500">Pozicija</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500">Lokacija</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-gray-500">Prosj. plaća</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-gray-500">Raspon</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-500">Prijava</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary) => (
                <tr
                  key={salary.id}
                  className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 
                             dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{salary.job_title}</p>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500">
                        {salary.category}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📍 {salary.city ? `${salary.city}, ` : ""}{countryNames[salary.country_code]}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-bold text-brand-600">{formatSalary(salary.avg_salary)}</span>
                    <span className="text-xs text-gray-400 block">/mjesečno</span>
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-gray-500">
                    {formatSalary(salary.salary_min)} – {formatSalary(salary.salary_max)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-sm text-gray-500">{salary.reports_count}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
          {filteredSalaries.map((salary) => (
            <div key={salary.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{salary.job_title}</p>
                  <p className="text-xs text-gray-500">
                    📍 {salary.city ? `${salary.city}, ` : ""}{countryNames[salary.country_code]}
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500">
                  {salary.category}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-bold text-lg text-brand-600">{formatSalary(salary.avg_salary)}</span>
                  <span className="text-xs text-gray-400"> /mj.</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {formatSalary(salary.salary_min)} – {formatSalary(salary.salary_max)}
                  </p>
                  <p className="text-xs text-gray-400">{salary.reports_count} prijava</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSalaries.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-4">📊</p>
            <p className="text-lg font-medium">Nema podataka</p>
            <p className="text-sm mt-1">Pokušaj s drugačijim pretraživanjem ili filterima.</p>
          </div>
        )}
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-brand-600">8.500+</p>
          <p className="text-sm text-gray-500">Prijava plaća</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-brand-600">120+</p>
          <p className="text-sm text-gray-500">Pozicija</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-brand-600">4</p>
          <p className="text-sm text-gray-500">Države</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-brand-600">100%</p>
          <p className="text-sm text-gray-500">Anonimno</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Znaš li koliko vrijediš? 💪</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Prijavi svoju plaću anonimno i pomozi drugima da pregovaraju bolje uvjete. 
          Zajedno stvaramo transparentnije tržište rada.
        </p>
        <button
          onClick={() => setShowReportForm(true)}
          className="px-8 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors 
                     font-medium text-lg"
        >
          Prijavi plaću — anonimno 🔒
        </button>
      </div>

      {/* Report Salary Modal */}
      {showReportForm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 pt-16 
                     overflow-y-auto"
          onClick={() => setShowReportForm(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 
                           dark:border-gray-700">
              <h2 className="text-xl font-bold">📊 Prijavi svoju plaću</h2>
              <button
                onClick={() => setShowReportForm(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 
                           dark:hover:bg-gray-700 transition-colors text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-sm text-green-700 dark:text-green-400">
                🔒 Tvoji podaci su potpuno <strong>anonimni</strong>. Nitko neće znati tko si.
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Tvoja pozicija *</label>
                <input
                  type="text"
                  placeholder="npr. Software Developer"
                  value={reportForm.job_title}
                  onChange={(e) => setReportForm({ ...reportForm, job_title: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-brand-500 
                             outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Mjesečna neto plaća (€) *</label>
                <input
                  type="number"
                  placeholder="npr. 2500"
                  value={reportForm.salary}
                  onChange={(e) => setReportForm({ ...reportForm, salary: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-brand-500 
                             outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Država *</label>
                  <select
                    value={reportForm.country}
                    onChange={(e) => setReportForm({ ...reportForm, country: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-brand-500 
                               outline-none"
                  >
                    <option value="SI">🇸🇮 Slovenija</option>
                    <option value="HR">🇭🇷 Hrvatska</option>
                    <option value="RS">🇷🇸 Srbija</option>
                    <option value="BA">🇧🇦 BiH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Grad</label>
                  <input
                    type="text"
                    placeholder="npr. Zagreb"
                    value={reportForm.city}
                    onChange={(e) => setReportForm({ ...reportForm, city: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-brand-500 
                               outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Tvrtka (opcionalno)</label>
                <input
                  type="text"
                  placeholder="npr. Infobip d.o.o."
                  value={reportForm.company}
                  onChange={(e) => setReportForm({ ...reportForm, company: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-brand-500 
                             outline-none transition-all"
                />
              </div>

              <button className="w-full py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 
                                transition-colors font-medium mt-2">
                Pošalji prijavu 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
