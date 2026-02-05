"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

export default function RegistracijaPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Ime i prezime je obavezno.";
    if (!form.email.trim()) {
      e.email = "Email adresa je obavezna.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Unesite ispravnu email adresu.";
    }
    if (!form.password) {
      e.password = "Lozinka je obavezna.";
    } else if (form.password.length < 8) {
      e.password = "Lozinka mora imati najmanje 8 znakova.";
    }
    if (!form.confirmPassword) {
      e.confirmPassword = "Potvrdite lozinku.";
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = "Lozinke se ne podudaraju.";
    }
    if (!form.acceptTerms) {
      e.acceptTerms = "Morate prihvatiti uvjete korištenja.";
    }
    return e;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setIsLoading(true);
    // TODO: connect to real auth
    setTimeout(() => setIsLoading(false), 1500);
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-lg border ${
      errors[field]
        ? "border-red-400 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 dark:border-gray-600 focus:ring-brand-500 focus:border-brand-500"
    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 transition-colors`;

  // password strength
  const strength = form.password.length === 0
    ? 0
    : form.password.length < 6
      ? 1
      : form.password.length < 10
        ? 2
        : 3;
  const strengthLabels = ["", "Slaba", "Srednja", "Jaka"];
  const strengthColors = ["", "bg-red-500", "bg-yellow-500", "bg-green-500"];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-bold mb-2">
            moj<span className="text-brand-500">gazda</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kreiraj besplatan račun
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Pridruži se tisućama zaposlenika koji dijele iskustva.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          {/* Social signup */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm text-gray-700 dark:text-gray-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Registriraj se s Google računom
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm text-gray-700 dark:text-gray-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Registriraj se s LinkedIn računom
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-400">
                ili se registriraj s emailom
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Ime i prezime
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass("name")}
                placeholder="Ivan Horvat"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email adresa
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass("email")}
                placeholder="ime@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Lozinka
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className={inputClass("password") + " pr-12"}
                  placeholder="Najmanje 8 znakova"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
                >
                  {showPassword ? "Sakrij" : "Prikaži"}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              {/* Strength bar */}
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${strengthColors[strength]}`}
                      style={{ width: `${(strength / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[50px]">
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Potvrdi lozinku
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className={inputClass("confirmPassword") + " pr-12"}
                  placeholder="Ponovi lozinku"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
                >
                  {showConfirm ? "Sakrij" : "Prikaži"}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Accept terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => update("acceptTerms", e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Prihvaćam{" "}
                  <Link href="/uvjeti" className="text-brand-500 hover:text-brand-600 underline">
                    Uvjete korištenja
                  </Link>{" "}
                  i{" "}
                  <Link href="/privatnost" className="text-brand-500 hover:text-brand-600 underline">
                    Politiku privatnosti
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && <p className="mt-1 text-sm text-red-500">{errors.acceptTerms}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors focus:ring-4 focus:ring-brand-500/30"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registracija u tijeku...
                </span>
              ) : (
                "Kreiraj račun"
              )}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          Već imaš račun?{" "}
          <Link href="/prijava" className="text-brand-500 hover:text-brand-600 font-semibold">
            Prijavi se
          </Link>
        </p>
      </div>
    </div>
  );
}
