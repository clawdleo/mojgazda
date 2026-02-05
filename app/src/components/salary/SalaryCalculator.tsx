"use client";

import { useState, useMemo } from "react";
import { demoSalaries, formatSalary } from "@/lib/salaries";

interface CalculatorResult {
  percentile: number;
  avgSalary: number;
  minSalary: number;
  maxSalary: number;
  sampleSize: number;
  verdict: "underpaid" | "fair" | "above" | "top";
  difference: number;
  differencePercent: number;
}

export function SalaryCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    role: "",
    salary: "",
    country: "HR",
    experience: "mid",
  });
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const roles = useMemo(() => {
    const uniqueRoles = Array.from(new Set(demoSalaries.map(s => s.job_title)));
    return uniqueRoles.sort();
  }, []);

  const countries = [
    { code: "SI", name: "Slovenija", flag: "🇸🇮" },
    { code: "HR", name: "Hrvatska", flag: "🇭🇷" },
    { code: "RS", name: "Srbija", flag: "🇷🇸" },
    { code: "BA", name: "BiH", flag: "🇧🇦" },
  ];

  const experienceLevels = [
    { value: "junior", label: "Junior (0-2 god.)" },
    { value: "mid", label: "Mid (2-5 god.)" },
    { value: "senior", label: "Senior (5+ god.)" },
  ];

  const calculate = () => {
    const userSalary = parseFloat(form.salary);
    if (isNaN(userSalary) || !form.role) return;

    // Find relevant salaries
    let relevantSalaries = demoSalaries.filter(s => 
      s.job_title.toLowerCase().includes(form.role.toLowerCase()) ||
      form.role.toLowerCase().includes(s.job_title.toLowerCase())
    );

    // Filter by country if we have data
    const countryFiltered = relevantSalaries.filter(s => s.country_code === form.country);
    if (countryFiltered.length >= 3) {
      relevantSalaries = countryFiltered;
    }

    if (relevantSalaries.length === 0) {
      // Fallback: use category matching or all data with adjustment
      relevantSalaries = demoSalaries.slice(0, 10);
    }

    // Calculate stats
    const allSalaries = relevantSalaries.flatMap(s => {
      // Generate sample distribution
      const samples = [];
      for (let i = 0; i < s.reports_count; i++) {
        const variance = (Math.random() - 0.5) * (s.salary_max - s.salary_min);
        samples.push(s.avg_salary + variance * 0.5);
      }
      return samples;
    });

    const sortedSalaries = allSalaries.sort((a, b) => a - b);
    const avgSalary = sortedSalaries.reduce((a, b) => a + b, 0) / sortedSalaries.length;
    const minSalary = sortedSalaries[0];
    const maxSalary = sortedSalaries[sortedSalaries.length - 1];

    // Calculate percentile
    const belowCount = sortedSalaries.filter(s => s < userSalary).length;
    const percentile = Math.round((belowCount / sortedSalaries.length) * 100);

    // Determine verdict
    let verdict: CalculatorResult["verdict"];
    if (percentile < 25) verdict = "underpaid";
    else if (percentile < 50) verdict = "fair";
    else if (percentile < 75) verdict = "above";
    else verdict = "top";

    const difference = userSalary - avgSalary;
    const differencePercent = Math.round((difference / avgSalary) * 100);

    setResult({
      percentile,
      avgSalary,
      minSalary,
      maxSalary,
      sampleSize: relevantSalaries.reduce((sum, s) => sum + s.reports_count, 0),
      verdict,
      difference,
      differencePercent,
    });

    setStep(3);
  };

  const getVerdictContent = (verdict: CalculatorResult["verdict"]) => {
    switch (verdict) {
      case "underpaid":
        return {
          emoji: "😰",
          title: "Ispod prosjeka",
          color: "text-red-600",
          bg: "bg-red-50 dark:bg-red-900/20",
          message: "Tvoja plaća je ispod prosjeka za tvoju poziciju. Razmisli o pregovaranju ili traženju boljih prilika.",
        };
      case "fair":
        return {
          emoji: "😐",
          title: "U prosjeku",
          color: "text-amber-600",
          bg: "bg-amber-50 dark:bg-amber-900/20",
          message: "Tvoja plaća je u skladu s prosjekom tržišta. Ima prostora za rast!",
        };
      case "above":
        return {
          emoji: "😊",
          title: "Iznad prosjeka",
          color: "text-green-600",
          bg: "bg-green-50 dark:bg-green-900/20",
          message: "Zarađuješ više od većine kolega na sličnim pozicijama. Odličan posao!",
        };
      case "top":
        return {
          emoji: "🤑",
          title: "Top zarada!",
          color: "text-brand-600",
          bg: "bg-brand-50 dark:bg-brand-900/20",
          message: "Spadaš u 25% najbolje plaćenih na svojoj poziciji. Svaka čast!",
        };
    }
  };

  const reset = () => {
    setStep(1);
    setResult(null);
    setForm({ role: "", salary: "", country: "HR", experience: "mid" });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-brand-500 to-teal-500 text-white rounded-2xl p-6 
                   hover:from-brand-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl 
                   hover:-translate-y-1"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-xl font-bold mb-1">Jesam li potplaćen/a?</h3>
            <p className="text-brand-100 text-sm">Usporedi svoju plaću s tržištem u 30 sekundi</p>
          </div>
          <span className="text-4xl">💰</span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-500 to-teal-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Kalkulator plaće</h3>
            <p className="text-brand-100 text-sm">Jesam li potplaćen/a?</p>
          </div>
          <button
            onClick={() => { setIsOpen(false); reset(); }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center 
                       justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tvoja pozicija</label>
              <input
                type="text"
                list="roles"
                placeholder="npr. Software Developer"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 
                           outline-none transition-all dark:bg-gray-700 dark:border-gray-600"
              />
              <datalist id="roles">
                {roles.map(r => <option key={r} value={r} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Država</label>
              <div className="grid grid-cols-4 gap-2">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setForm({ ...form, country: c.code })}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      form.country === c.code
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-brand-300"
                    }`}
                  >
                    <span className="text-xl">{c.flag}</span>
                    <p className="text-xs mt-1">{c.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Iskustvo</label>
              <div className="grid grid-cols-3 gap-2">
                {experienceLevels.map((exp) => (
                  <button
                    key={exp.value}
                    type="button"
                    onClick={() => setForm({ ...form, experience: exp.value })}
                    className={`p-3 rounded-xl border-2 text-center text-sm transition-all ${
                      form.experience === exp.value
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-brand-300"
                    }`}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => form.role && setStep(2)}
              disabled={!form.role}
              className={`w-full py-3 rounded-xl font-medium transition-colors ${
                form.role
                  ? "bg-brand-500 text-white hover:bg-brand-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Dalje →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tvoja mjesečna neto plaća (EUR)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">€</span>
                <input
                  type="number"
                  placeholder="1500"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  className="w-full pl-10 pr-4 py-4 text-2xl font-bold border-2 border-gray-200 rounded-xl 
                             focus:border-brand-500 outline-none transition-all dark:bg-gray-700 
                             dark:border-gray-600"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Neto iznos - koliko ti sjedne na račun
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>{form.role}</strong> u {countries.find(c => c.code === form.country)?.name}
                <br />
                <span className="text-gray-400">{experienceLevels.find(e => e.value === form.experience)?.label}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl 
                           hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                ← Natrag
              </button>
              <button
                onClick={calculate}
                disabled={!form.salary}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                  form.salary
                    ? "bg-brand-500 text-white hover:bg-brand-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Izračunaj 🔍
              </button>
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div className="space-y-6">
            {/* Main Result */}
            <div className={`${getVerdictContent(result.verdict).bg} rounded-2xl p-6 text-center`}>
              <span className="text-5xl mb-3 block">{getVerdictContent(result.verdict).emoji}</span>
              <h3 className={`text-2xl font-bold ${getVerdictContent(result.verdict).color}`}>
                {getVerdictContent(result.verdict).title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {getVerdictContent(result.verdict).message}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-brand-600">{result.percentile}%</p>
                <p className="text-xs text-gray-500">percentil</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className={`text-3xl font-bold ${result.difference >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {result.difference >= 0 ? "+" : ""}{formatSalary(Math.abs(result.difference))}
                </p>
                <p className="text-xs text-gray-500">vs prosjek ({result.differencePercent >= 0 ? "+" : ""}{result.differencePercent}%)</p>
              </div>
            </div>

            {/* Salary Range */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm font-medium mb-3">Raspon plaća za {form.role}</p>
              <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <div 
                  className="absolute h-full bg-gradient-to-r from-red-400 via-amber-400 via-green-400 to-brand-500 rounded-full"
                  style={{ width: "100%" }}
                />
                <div 
                  className="absolute w-4 h-4 bg-white border-4 border-brand-500 rounded-full -top-1 
                             transform -translate-x-1/2 shadow-lg"
                  style={{ left: `${result.percentile}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>{formatSalary(result.minSalary)}</span>
                <span>Prosjek: {formatSalary(result.avgSalary)}</span>
                <span>{formatSalary(result.maxSalary)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Bazirano na {result.sampleSize} prijava
              </p>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3 border-2 border-brand-500 text-brand-600 rounded-xl 
                           hover:bg-brand-50 dark:hover:bg-brand-900/20 font-medium transition-colors"
              >
                Nova provjera
              </button>
              <a
                href="/salaries"
                className="flex-1 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 
                           font-medium transition-colors text-center"
              >
                Sve plaće →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
