"use client";

import type { Review } from "@/types";

interface RedFlagsProps {
  reviews: Review[];
  companyName: string;
}

interface RedFlag {
  id: string;
  title: string;
  description: string;
  severity: "warning" | "danger";
  count: number;
}

const flagPatterns = [
  {
    id: "low-salary",
    keywords: ["niska plaća", "niske plaće", "prenizka", "minimalna", "minimalac", "slaba plaća", "loša plaća"],
    title: "Niske plaće",
    description: "Više zaposlenika navodi nezadovoljstvo plaćama",
    severity: "warning" as const,
  },
  {
    id: "overtime",
    keywords: ["prekovremeni", "prekovremeno", "previše sati", "noćne smjene", "vikendi obavezni", "rad vikendom"],
    title: "Prekomjerni sati",
    description: "Recenzije spominju česte prekovremene ili rad vikendom",
    severity: "warning" as const,
  },
  {
    id: "bad-management",
    keywords: ["loš šef", "loše vodstvo", "mikroupravljanje", "mikromenadžment", "gazda mentalitet", "autoritarno", "nema poštovanja"],
    title: "Problematično vodstvo",
    description: "Zaposlenici prijavljuju probleme s upravljanjem",
    severity: "danger" as const,
  },
  {
    id: "no-growth",
    keywords: ["nema napredovanja", "nema razvoja", "stagnacija", "mrtva točka", "nema perspektive", "bez perspektive"],
    title: "Ograničen razvoj",
    description: "Nedostatak mogućnosti za profesionalni rast",
    severity: "warning" as const,
  },
  {
    id: "toxic-culture",
    keywords: ["toksično", "mobbing", "zlostavljanje", "stres", "pritisak", "zastrašivanje", "diskriminacija"],
    title: "Toksična kultura",
    description: "Prijavljeni problemi s radnom atmosferom",
    severity: "danger" as const,
  },
  {
    id: "instability",
    keywords: ["restrukturiranje", "otpuštanja", "nesigurno", "propada", "kriza", "kaos", "nestabilno"],
    title: "Nestabilnost",
    description: "Znakovi poslovne nesigurnosti",
    severity: "warning" as const,
  },
  {
    id: "unpaid",
    keywords: ["neplaćeni", "ne plaćaju", "kasni plaća", "kašnjenje plaće", "bez bonusa"],
    title: "Problemi s isplatama",
    description: "Prijavljeni problemi s isplatom plaća ili bonusa",
    severity: "danger" as const,
  },
];

export function RedFlags({ reviews, companyName }: RedFlagsProps) {
  // Analyze reviews for red flags
  const detectedFlags: RedFlag[] = [];

  flagPatterns.forEach(pattern => {
    let count = 0;
    reviews.forEach(review => {
      const text = `${review.cons || ""} ${review.title || ""} ${review.advice_to_management || ""}`.toLowerCase();
      if (pattern.keywords.some(keyword => text.includes(keyword))) {
        count++;
      }
    });

    // Only show flag if mentioned in at least 2 reviews or 30%+ of reviews
    const threshold = Math.max(2, Math.floor(reviews.length * 0.3));
    if (count >= threshold) {
      detectedFlags.push({
        id: pattern.id,
        title: pattern.title,
        description: pattern.description,
        severity: pattern.severity,
        count,
      });
    }
  });

  // Also check for overall low ratings
  const lowRatedReviews = reviews.filter(r => r.rating_overall <= 2).length;
  if (lowRatedReviews >= 2 && lowRatedReviews >= reviews.length * 0.4) {
    detectedFlags.push({
      id: "low-ratings",
      title: "Većina nezadovoljna",
      description: "Značajan broj zaposlenika daje niske ocjene",
      severity: "danger",
      count: lowRatedReviews,
    });
  }

  if (detectedFlags.length === 0) return null;

  const dangerCount = detectedFlags.filter(f => f.severity === "danger").length;
  const warningCount = detectedFlags.filter(f => f.severity === "warning").length;

  return (
    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">⚠️</span>
        <h3 className="font-bold text-red-700 dark:text-red-400">
          Upozorenja ({detectedFlags.length})
        </h3>
      </div>
      
      <p className="text-sm text-red-600 dark:text-red-400 mb-4">
        Na temelju recenzija zaposlenika uočeni su potencijalni problemi u <strong>{companyName}</strong>:
      </p>

      <div className="space-y-3">
        {detectedFlags.map(flag => (
          <div
            key={flag.id}
            className={`flex items-start gap-3 p-3 rounded-lg ${
              flag.severity === "danger" 
                ? "bg-red-100 dark:bg-red-900/20" 
                : "bg-amber-100 dark:bg-amber-900/20"
            }`}
          >
            <span className="text-lg flex-shrink-0">
              {flag.severity === "danger" ? "🚨" : "⚡"}
            </span>
            <div>
              <p className={`font-semibold text-sm ${
                flag.severity === "danger" 
                  ? "text-red-700 dark:text-red-400" 
                  : "text-amber-700 dark:text-amber-400"
              }`}>
                {flag.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                {flag.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Spomenuto u {flag.count} recenzija
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
        <p className="text-xs text-gray-500">
          ℹ️ Upozorenja se generiraju automatski na temelju ključnih riječi u recenzijama. 
          Preporučujemo da pročitate sve recenzije za punu sliku.
        </p>
      </div>
    </div>
  );
}
