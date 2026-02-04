"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StarRating } from "@/components/ui/StarRating";
import { getAllCompanies, addReview, getCompanyBySlug } from "@/lib/demo-data";

export default function WriteReviewPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-8 text-center text-gray-400">Učitavanje...</div>}>
      <ReviewContent />
    </Suspense>
  );
}

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get("company");

  const [step, setStep] = useState(1);
  const [companySearch, setCompanySearch] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    rating_overall: 0,
    gazda_rating: 5,
    rating_management: 0,
    rating_salary: 0,
    rating_worklife: 0,
    rating_culture: 0,
    rating_growth: 0,
    title: "",
    pros: "",
    cons: "",
    advice: "",
    job_title: "",
    employment_type: "full-time",
    employment_status: "current",
    years: "",
  });

  const allCompanies = getAllCompanies();

  // Prefill company if query param exists
  useEffect(() => {
    if (preselectedSlug) {
      const data = getCompanyBySlug(preselectedSlug);
      if (data) {
        setSelectedSlug(preselectedSlug);
        setCompanySearch(data.company.name);
      }
    }
  }, [preselectedSlug]);

  const suggestions = useMemo(() => {
    if (!companySearch.trim() || selectedSlug) return [];
    const q = companySearch.toLowerCase();
    return allCompanies
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [companySearch, selectedSlug, allCompanies]);

  const selectCompany = useCallback((slug: string, name: string) => {
    setSelectedSlug(slug);
    setCompanySearch(name);
    setShowSuggestions(false);
  }, []);

  const handleSubmit = () => {
    if (!selectedSlug) return;
    const company = getCompanyBySlug(selectedSlug);
    if (!company) return;

    addReview({
      company_id: company.company.id,
      company_slug: selectedSlug,
      rating_overall: form.rating_overall,
      rating_management: form.rating_management || undefined,
      rating_salary: form.rating_salary || undefined,
      rating_worklife: form.rating_worklife || undefined,
      rating_culture: form.rating_culture || undefined,
      rating_growth: form.rating_growth || undefined,
      gazda_rating: form.gazda_rating,
      title: form.title,
      pros: form.pros,
      cons: form.cons,
      advice_to_management: form.advice || undefined,
      job_title: form.job_title || undefined,
      employment_type: form.employment_type,
      employment_status: form.employment_status,
      years_at_company: form.years || undefined,
      location_city: company.company.headquarters_city,
      country_code: company.company.headquarters_country,
      language: "hr",
    });

    setSubmitted(true);

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push(`/company/${selectedSlug}`);
    }, 3000);
  };

  // Success state
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-bounce text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4 text-brand-600">Recenzija objavljena!</h1>
        <p className="text-gray-500 text-lg mb-2">
          Hvala što si podijelio/la svoje iskustvo. Tvoja recenzija pomaže drugima.
        </p>
        <p className="text-sm text-gray-400">
          Preusmjeravamo te na profil tvrtke za 3 sekunde...
        </p>
        <div className="mt-8">
          <button
            onClick={() => router.push(`/company/${selectedSlug}`)}
            className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
          >
            Pogledaj profil tvrtke →
          </button>
        </div>
      </div>
    );
  }

  const canProceedStep1 = selectedSlug && form.job_title.trim();
  const canProceedStep2 = form.rating_overall > 0;
  const canSubmit = form.title.trim() && form.pros.length >= 30 && form.cons.length >= 30;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">✍️ Napiši recenziju</h1>
      <p className="text-gray-500 mb-8">Tvoja recenzija je potpuno anonimna. 🔒</p>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              s <= step ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">1. Odaberi tvrtku</h2>

          {/* Company search with autocomplete */}
          <div className="relative">
            <input
              type="text"
              placeholder="Pretraži tvrtku..."
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                         focus:border-brand-500 outline-none bg-white dark:bg-gray-800"
              value={companySearch}
              onChange={(e) => {
                setCompanySearch(e.target.value);
                setSelectedSlug("");
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            {selectedSlug && (
              <span className="absolute right-3 top-3.5 text-brand-500 text-sm font-medium">✓ Odabrano</span>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                {suggestions.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => selectCompany(c.slug, c.name)}
                    className="w-full px-4 py-3 text-left hover:bg-brand-50 dark:hover:bg-brand-900/20 
                               transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-xs text-gray-400">
                      {c.industry} · {c.headquarters_city}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold mt-8">O tvom zaposlenju</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pozicija *</label>
              <input
                type="text"
                placeholder="npr. Prodajni savjetnik"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                value={form.job_title}
                onChange={(e) => setForm({ ...form, job_title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                value={form.employment_status}
                onChange={(e) => setForm({ ...form, employment_status: e.target.value })}
              >
                <option value="current">Trenutno zaposlen/a</option>
                <option value="former">Bivši zaposlenik</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Vrsta zaposlenja</label>
              <select
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                value={form.employment_type}
                onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
              >
                <option value="full-time">Puno radno vrijeme</option>
                <option value="part-time">Nepuno radno vrijeme</option>
                <option value="contract">Ugovor o djelu</option>
                <option value="internship">Praksa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Godine u tvrtki</label>
              <input
                type="text"
                placeholder="npr. 3"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                value={form.years}
                onChange={(e) => setForm({ ...form, years: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={() => canProceedStep1 && setStep(2)}
            disabled={!canProceedStep1}
            className={`w-full py-3 rounded-xl font-medium mt-4 transition-colors ${
              canProceedStep1
                ? "bg-brand-500 text-white hover:bg-brand-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Dalje →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">2. Ocijeni</h2>

          {/* GAZDA Rating */}
          <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6">
            <label className="block text-lg font-semibold mb-2">
              🏆 GAZDA Score — Kakav je tvoj šef?
            </label>
            <p className="text-sm text-gray-500 mb-4">Ocijeni ponašanje šefa/uprave od 1 do 10</p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                value={form.gazda_rating}
                onChange={(e) => setForm({ ...form, gazda_rating: parseInt(e.target.value) })}
                className="flex-1 accent-brand-500"
              />
              <span className="text-3xl font-bold text-brand-600 w-12 text-center">
                {form.gazda_rating}
              </span>
            </div>
          </div>

          {/* Star ratings */}
          {[
            { key: "rating_overall", label: "Ukupna ocjena *" },
            { key: "rating_management", label: "Upravljanje" },
            { key: "rating_salary", label: "Plaća i benefiti" },
            { key: "rating_worklife", label: "Ravnoteža posao/život" },
            { key: "rating_culture", label: "Kultura tvrtke" },
            { key: "rating_growth", label: "Mogućnosti razvoja" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium">{label}</span>
              <StarRating
                rating={(form as unknown as Record<string, number>)[key]}
                interactive
                onChange={(v) => setForm({ ...form, [key]: v })}
                size="lg"
              />
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
            >
              ← Natrag
            </button>
            <button
              onClick={() => canProceedStep2 && setStep(3)}
              disabled={!canProceedStep2}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                canProceedStep2
                  ? "bg-brand-500 text-white hover:bg-brand-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Dalje →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">3. Napiši recenziju</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Naslov recenzije *</label>
            <input
              type="text"
              placeholder="npr. Dobar posao, ali previše prekovremenih"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">✅ Prednosti (min. 30 znakova) *</label>
            <textarea
              rows={3}
              placeholder="Što je dobro kod ovog poslodavca?"
              className="w-full px-4 py-2 border rounded-lg resize-none dark:bg-gray-800 dark:border-gray-700"
              value={form.pros}
              onChange={(e) => setForm({ ...form, pros: e.target.value })}
            />
            <span className={`text-xs ${form.pros.length >= 30 ? "text-green-500" : "text-gray-400"}`}>
              {form.pros.length}/30 min {form.pros.length >= 30 && "✓"}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">❌ Nedostaci (min. 30 znakova) *</label>
            <textarea
              rows={3}
              placeholder="Što bi moglo biti bolje?"
              className="w-full px-4 py-2 border rounded-lg resize-none dark:bg-gray-800 dark:border-gray-700"
              value={form.cons}
              onChange={(e) => setForm({ ...form, cons: e.target.value })}
            />
            <span className={`text-xs ${form.cons.length >= 30 ? "text-green-500" : "text-gray-400"}`}>
              {form.cons.length}/30 min {form.cons.length >= 30 && "✓"}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">💡 Savjet upravi (opcionalno)</label>
            <textarea
              rows={2}
              placeholder="Što bi preporučio/la da se promijeni?"
              className="w-full px-4 py-2 border rounded-lg resize-none dark:bg-gray-800 dark:border-gray-700"
              value={form.advice}
              onChange={(e) => setForm({ ...form, advice: e.target.value })}
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-500">
            🔒 Tvoja recenzija je potpuno <strong>anonimna</strong>. Poslodavac nikada neće znati tko si.
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
            >
              ← Natrag
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                canSubmit
                  ? "bg-brand-500 text-white hover:bg-brand-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Objavi recenziju 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
