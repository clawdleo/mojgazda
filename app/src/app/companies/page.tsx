import { GazdaScore } from "@/components/ui/GazdaScore";
import { StarRating } from "@/components/ui/StarRating";
import Link from "next/link";

export default function CompaniesPage() {
  const countries = [
    { code: "all", label: "Sve države", flag: "🌍" },
    { code: "SI", label: "Slovenija", flag: "🇸🇮" },
    { code: "HR", label: "Hrvatska", flag: "🇭🇷" },
    { code: "RS", label: "Srbija", flag: "🇷🇸" },
    { code: "BA", label: "BiH", flag: "🇧🇦" },
  ];

  const industries = [
    "Sve industrije", "Tech", "Retail", "Proizvodnja", "Financije",
    "Zdravstvo", "Građevina", "Telekomunikacije", "Turizam", "Logistika",
  ];

  // TODO: Replace with actual data
  const companies = [
    { slug: "lek-dd", name: "Lek d.d.", industry: "Farmacija", city: "Ljubljana", country: "SI", score: 8.7, reviews: 234, rating: 4.3 },
    { slug: "infobip", name: "Infobip", industry: "Tech", city: "Zagreb", country: "HR", score: 8.4, reviews: 189, rating: 4.1 },
    { slug: "pipistrel", name: "Pipistrel", industry: "Letalstvo", city: "Ajdovščina", country: "SI", score: 8.2, reviews: 67, rating: 4.0 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Istraži tvrtke</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex gap-2">
          {countries.map((c) => (
            <button
              key={c.code}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-500 transition-colors"
            >
              {c.flag} {c.label}
            </button>
          ))}
        </div>
        <select className="px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {industries.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Link
            key={company.slug}
            href={`/company/${company.slug}`}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md 
                      hover:-translate-y-0.5 transition-all border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <GazdaScore score={company.score} size="sm" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{company.name}</h3>
                <p className="text-gray-500 text-sm">{company.industry}</p>
                <p className="text-gray-400 text-xs mt-1">
                  📍 {company.city}, {company.country}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={company.rating} size="sm" />
                  <span className="text-xs text-gray-400">{company.reviews} recenzija</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
