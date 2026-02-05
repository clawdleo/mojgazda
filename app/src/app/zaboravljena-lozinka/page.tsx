"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

export default function ZaboravljenaLozinkaPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email adresa je obavezna.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Unesite ispravnu email adresu.");
      return;
    }
    setError("");
    setIsLoading(true);
    // TODO: connect to real auth
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-bold mb-2">
            moj<span className="text-brand-500">gazda</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Zaboravljena lozinka?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Nema problema. Unesite email i poslat ćemo vam upute za resetiranje.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          {sent ? (
            /* Success state */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Provjerite svoj inbox
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Ako račun s emailom <strong className="text-gray-700 dark:text-gray-200">{email}</strong> postoji, 
                poslali smo vam upute za resetiranje lozinke. Provjerite i spam folder.
              </p>
              <Link
                href="/prijava"
                className="inline-block px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors"
              >
                Natrag na prijavu
              </Link>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Email adresa
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    error
                      ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-brand-500 focus:border-brand-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 transition-colors`}
                  placeholder="ime@email.com"
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>

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
                    Slanje u tijeku...
                  </span>
                ) : (
                  "Pošalji upute za resetiranje"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Back to login */}
        {!sent && (
          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            Sjećaš se lozinke?{" "}
            <Link href="/prijava" className="text-brand-500 hover:text-brand-600 font-semibold">
              Prijavi se
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
