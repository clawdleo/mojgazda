"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/companies", label: "Tvrtke" },
    { href: "/jobs", label: "Poslovi" },
    { href: "/salaries", label: "Plaće" },
    { href: "/about", label: "O nama" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              moj<span className="text-brand-500">gazda</span>
            </span>
          </Link>

          {/* Navigation — desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-brand-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/review"
              className="hidden sm:inline-block px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium text-sm"
            >
              Napiši recenziju
            </Link>
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              🇭🇷
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Otvori izbornik"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-brand-50 
                           dark:hover:bg-brand-900/20 hover:text-brand-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/review"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 mt-2 bg-brand-500 text-white rounded-lg text-center font-medium"
            >
              Napiši recenziju ✍️
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
