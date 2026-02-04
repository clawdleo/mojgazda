"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveJob } from "@/lib/demo-data";

export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "preview" | "success">("form");

  const [form, setForm] = useState({
    company_name: "",
    title: "",
    country: "HR",
    city: "",
    job_type: "full-time",
    salary_min: "",
    salary_max: "",
    description: "",
    requirements: "",
    benefits: "",
    contact_email: "",
  });

  const countryOptions = [
    { code: "SI", label: "🇸🇮 Slovenija" },
    { code: "HR", label: "🇭🇷 Hrvatska" },
    { code: "RS", label: "🇷🇸 Srbija" },
    { code: "BA", label: "🇧🇦 Bosna i Hercegovina" },
  ];

  const jobTypes = [
    { value: "full-time", label: "Puno radno vrijeme" },
    { value: "part-time", label: "Nepuno radno vrijeme" },
    { value: "contract", label: "Ugovor o djelu" },
    { value: "internship", label: "Praksa / Stažiranje" },
  ];

  const canPreview =
    form.company_name.trim() &&
    form.title.trim() &&
    form.city.trim() &&
    form.description.trim() &&
    form.contact_email.trim();

  const handlePublish = () => {
    saveJob({
      company_name: form.company_name,
      title: form.title,
      country_code: form.country,
      city: form.city,
      job_type: form.job_type,
      salary_min: form.salary_min ? parseInt(form.salary_min) : undefined,
      salary_max: form.salary_max ? parseInt(form.salary_max) : undefined,
      description: form.description,
      requirements: form.requirements,
      benefits: form.benefits,
      contact_email: form.contact_email,
    });
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-bounce text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4 text-brand-600">Oglas je objavljen!</h1>
        <p className="text-gray-500 text-lg mb-6">
          Vaš oglas za posao je spremljen. Kandidati ga mogu vidjeti na stranici s poslovima.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/jobs")}
            className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
          >
            Pogledaj poslove →
          </button>
          <button
            onClick={() => {
              setForm({
                company_name: "", title: "", country: "HR", city: "", job_type: "full-time",
                salary_min: "", salary_max: "", description: "", requirements: "", benefits: "", contact_email: "",
              });
              setStep("form");
            }}
            className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            Objavi još jedan
          </button>
        </div>
      </div>
    );
  }

  if (step === "preview") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">👁️ Pregled oglasa</h1>
        <p className="text-gray-500 mb-8">Provjerite podatke prije objave.</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{form.title}</h2>
            <p className="text-brand-600 font-medium">{form.company_name}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              📍 {form.city}, {countryOptions.find((c) => c.code === form.country)?.label}
            </span>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              {jobTypes.find((j) => j.value === form.job_type)?.label}
            </span>
            {form.salary_min && form.salary_max && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                💰 €{form.salary_min} — €{form.salary_max} mjesečno
              </span>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-1">Opis</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{form.description}</p>
          </div>

          {form.requirements && (
            <div>
              <h3 className="font-semibold text-sm text-gray-500 uppercase mb-1">Zahtjevi</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{form.requirements}</p>
            </div>
          )}

          {form.benefits && (
            <div>
              <h3 className="font-semibold text-sm text-gray-500 uppercase mb-1">Benefiti</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{form.benefits}</p>
            </div>
          )}

          <div className="text-xs text-gray-400">
            Kontakt: {form.contact_email}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setStep("form")}
            className="flex-1 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
          >
            ← Uredi
          </button>
          <button
            onClick={handlePublish}
            className="flex-1 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 font-medium transition-colors"
          >
            Objavi oglas 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">💼 Objavi oglas za posao</h1>
      <p className="text-gray-500 mb-6">Pronađite najbolje talente u regiji.</p>

      {/* Sponsored note */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8 text-sm">
        <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">⭐ Želite istaknut oglas?</p>
        <p className="text-amber-700 dark:text-amber-400">
          Promovirani oglasi su 5x vidljiviji. Kontaktirajte nas na{" "}
          <span className="font-medium">oglasi@mojgazda.com</span> za detalje.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2">Naziv tvrtke *</label>
            <input
              type="text"
              placeholder="npr. Infobip d.o.o."
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2">Naziv pozicije *</label>
            <input
              type="text"
              placeholder="npr. Senior Frontend Developer"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Država *</label>
            <select
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            >
              {countryOptions.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Grad *</label>
            <input
              type="text"
              placeholder="npr. Zagreb"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Vrsta zaposlenja</label>
            <select
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={form.job_type}
              onChange={(e) => setForm({ ...form, job_type: e.target.value })}
            >
              {jobTypes.map((j) => (
                <option key={j.value} value={j.value}>{j.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-2">Min plaća (€)</label>
              <input
                type="number"
                placeholder="1500"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                value={form.salary_min}
                onChange={(e) => setForm({ ...form, salary_min: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max plaća (€)</label>
              <input
                type="number"
                placeholder="3000"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                value={form.salary_max}
                onChange={(e) => setForm({ ...form, salary_max: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Opis posla *</label>
          <textarea
            rows={5}
            placeholder="Opišite poziciju, odgovornosti i što kandidat može očekivati..."
            className="w-full px-4 py-2 border rounded-lg resize-none dark:bg-gray-800 dark:border-gray-700"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Zahtjevi (opcionalno)</label>
          <textarea
            rows={3}
            placeholder="Potrebne kvalifikacije, iskustvo, znanja..."
            className="w-full px-4 py-2 border rounded-lg resize-none dark:bg-gray-800 dark:border-gray-700"
            value={form.requirements}
            onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Benefiti (opcionalno)</label>
          <textarea
            rows={3}
            placeholder="Što nudite zaposleniku? Fleksibilno radno vrijeme, edukacija, zdravstveno..."
            className="w-full px-4 py-2 border rounded-lg resize-none dark:bg-gray-800 dark:border-gray-700"
            value={form.benefits}
            onChange={(e) => setForm({ ...form, benefits: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kontakt email *</label>
          <input
            type="email"
            placeholder="hr@vasafirma.com"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            value={form.contact_email}
            onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
          />
        </div>

        <button
          onClick={() => canPreview && setStep("preview")}
          disabled={!canPreview}
          className={`w-full py-3 rounded-xl font-medium mt-4 transition-colors ${
            canPreview
              ? "bg-brand-500 text-white hover:bg-brand-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Pregledaj oglas →
        </button>
      </div>
    </div>
  );
}
