"use client";

import { useState } from "react";
import { StarRating } from "@/components/ui/StarRating";

export default function WriteReviewPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    company: "",
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Napiši recenziju</h1>
      <p className="text-gray-500 mb-8">Tvoja recenzija je potpuno anonimna.</p>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-brand-500" : "bg-gray-200"}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">1. Odaberi tvrtku</h2>
          <input
            type="text"
            placeholder="Pretraži tvrtku..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 outline-none"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />

          <h2 className="text-xl font-semibold mt-8">O tvom zaposlenju</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pozicija</label>
              <input
                type="text"
                placeholder="npr. Prodajni savjetnik"
                className="w-full px-4 py-2 border rounded-lg"
                value={form.job_title}
                onChange={(e) => setForm({ ...form, job_title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={form.employment_status}
                onChange={(e) => setForm({ ...form, employment_status: e.target.value })}
              >
                <option value="current">Trenutno zaposlen/a</option>
                <option value="former">Bivši zaposlenik</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 font-medium mt-4"
          >
            Dalje →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">2. Ocijeni</h2>

          {/* GAZDA Rating - the star feature */}
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
            { key: "rating_overall", label: "Ukupna ocjena" },
            { key: "rating_management", label: "Upravljanje" },
            { key: "rating_salary", label: "Plaća i benefiti" },
            { key: "rating_worklife", label: "Ravnoteža posao/život" },
            { key: "rating_culture", label: "Kultura tvrtke" },
            { key: "rating_growth", label: "Mogućnosti razvoja" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium">{label}</span>
              <StarRating
                rating={(form as any)[key]}
                interactive
                onChange={(v) => setForm({ ...form, [key]: v })}
                size="lg"
              />
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
            >
              ← Natrag
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 font-medium"
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
            <label className="block text-sm font-medium mb-2">Naslov recenzije</label>
            <input
              type="text"
              placeholder="npr. Dobar posao, ali previše prekovremenih"
              className="w-full px-4 py-2 border rounded-lg"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">✅ Prednosti (min. 30 znakova)</label>
            <textarea
              rows={3}
              placeholder="Što je dobro kod ovog poslodavca?"
              className="w-full px-4 py-2 border rounded-lg resize-none"
              value={form.pros}
              onChange={(e) => setForm({ ...form, pros: e.target.value })}
            />
            <span className="text-xs text-gray-400">{form.pros.length}/30 min</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">❌ Nedostaci (min. 30 znakova)</label>
            <textarea
              rows={3}
              placeholder="Što bi moglo biti bolje?"
              className="w-full px-4 py-2 border rounded-lg resize-none"
              value={form.cons}
              onChange={(e) => setForm({ ...form, cons: e.target.value })}
            />
            <span className="text-xs text-gray-400">{form.cons.length}/30 min</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">💡 Savjet upravi (opcionalno)</label>
            <textarea
              rows={2}
              placeholder="Što bi preporučio/la da se promijeni?"
              className="w-full px-4 py-2 border rounded-lg resize-none"
              value={form.advice}
              onChange={(e) => setForm({ ...form, advice: e.target.value })}
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-500">
            🔒 Tvoja recenzija je potpuno <strong>anonimna</strong>. Poslodavac nikada neće znati tko si.
            Recenzija prolazi moderaciju prije objave.
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
            >
              ← Natrag
            </button>
            <button className="flex-1 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 font-medium">
              Objavi recenziju 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
