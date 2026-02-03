import { GazdaScore } from "@/components/ui/GazdaScore";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Upoznaj svog <span className="text-brand-500">gazdu</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Anonimne recenzije poslodavaca, plaće i GAZDA Score — 
          sve što trebaš znati prije nego prihvatiš posao.
        </p>
        
        {/* Search */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Pretraži tvrtku ili poziciju..."
              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 
                         focus:border-brand-500 focus:ring-2 focus:ring-brand-200 
                         outline-none transition-all dark:bg-gray-800 dark:border-gray-700"
            />
            <button className="absolute right-2 top-2 px-6 py-2 bg-brand-500 text-white 
                              rounded-lg hover:bg-brand-600 transition-colors font-medium">
              Traži
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 mt-12 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-600">2,500+</div>
            <div className="text-gray-500 text-sm">Tvrtki</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-600">15,000+</div>
            <div className="text-gray-500 text-sm">Recenzija</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-600">4</div>
            <div className="text-gray-500 text-sm">Države</div>
          </div>
        </div>
      </section>

      {/* Featured GAZDA Scores */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8">🏆 Najbolje ocjenjeni gazde</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder cards */}
          {[
            { name: "Lek d.d.", score: 8.7, reviews: 234, industry: "Farmacija" },
            { name: "Infobip", score: 8.4, reviews: 189, industry: "Tech" },
            { name: "Pipistrel", score: 8.2, reviews: 67, industry: "Letalstvo" },
          ].map((company) => (
            <div
              key={company.name}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm 
                        hover:shadow-md hover:-translate-y-0.5 transition-all border border-gray-100 
                        dark:border-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <GazdaScore score={company.score} size="sm" />
                <div>
                  <h3 className="font-semibold text-lg">{company.name}</h3>
                  <p className="text-gray-500 text-sm">{company.industry}</p>
                  <p className="text-gray-400 text-xs">{company.reviews} recenzija</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-brand-50 dark:bg-brand-900/20 rounded-2xl my-12 px-8">
        <h2 className="text-2xl font-bold mb-4">Imaš iskustvo? Podijeli ga anonimno.</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Pomozi drugima da donesu bolju odluku o zaposlenju.
        </p>
        <button className="px-8 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 
                          transition-colors font-medium text-lg">
          Napiši recenziju
        </button>
      </section>
    </div>
  );
}
