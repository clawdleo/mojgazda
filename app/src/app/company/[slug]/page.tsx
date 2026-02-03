import { GazdaScore } from "@/components/ui/GazdaScore";
import { StarRating } from "@/components/ui/StarRating";

interface PageProps {
  params: { slug: string };
}

export default function CompanyPage({ params }: PageProps) {
  // TODO: Replace with actual Supabase data fetching
  const company = {
    name: "Example d.o.o.",
    industry: "Tech",
    headquarters_city: "Ljubljana",
    headquarters_country: "SI",
    company_size: "51-200",
    gazda_score: 7.8,
    avg_rating: 3.9,
    total_reviews: 47,
    website: "https://example.com",
    description_hr: "Tehnološka tvrtka specijalizirana za razvoj softvera.",
  };

  const ratingBreakdown = [
    { label: "Upravljanje", value: 3.8 },
    { label: "Plaća", value: 3.5 },
    { label: "Ravnoteža", value: 4.1 },
    { label: "Kultura", value: 3.9 },
    { label: "Razvoj", value: 3.6 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Company Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-3xl font-bold text-gray-400">
            {company.name.charAt(0)}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{company.name}</h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
              <span>🏢 {company.industry}</span>
              <span>📍 {company.headquarters_city}, {company.headquarters_country}</span>
              <span>👥 {company.company_size} zaposlenih</span>
              {company.website && <a href={company.website} className="text-brand-500 hover:underline">🌐 Web</a>}
            </div>
            <p className="text-gray-600 dark:text-gray-300">{company.description_hr}</p>
          </div>

          <div className="flex flex-col items-center">
            <GazdaScore score={company.gazda_score} size="lg" showLabel />
            <p className="text-xs text-gray-400 mt-2">{company.total_reviews} recenzija</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recenzije ({company.total_reviews})</h2>
            <select className="text-sm border rounded-lg px-3 py-2 bg-white dark:bg-gray-800">
              <option>Najnovije</option>
              <option>Najviša ocjena</option>
              <option>Najniža ocjena</option>
              <option>Najkorisnije</option>
            </select>
          </div>
          <div className="text-center py-12 text-gray-400">
            Recenzije se učitavaju...
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold mb-4">Ocjene po kategoriji</h3>
            <div className="space-y-3">
              {ratingBreakdown.map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-24">{r.label}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-brand-500 h-2 rounded-full" style={{ width: `${(r.value / 5) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium w-8">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold mb-4">Preporučuju li gazdu?</h3>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-green-500">72%</div>
              <p className="text-sm text-gray-500">zaposlenika preporučuje ovog poslodavca prijatelju</p>
            </div>
          </div>

          <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 text-center">
            <p className="font-medium mb-3">Radiš ili si radio/la ovdje?</p>
            <button className="w-full px-4 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium">
              Napiši anonimnu recenziju
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
