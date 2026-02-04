export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero / Mission */}
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Zašto <span className="text-brand-500">MojGazda</span>?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Jer svaki radnik zaslužuje znati u što se upušta <strong>prije</strong> nego potpiše ugovor.
          MojGazda donosi transparentnost na radna mjesta u Sloveniji, Hrvatskoj, Srbiji i BiH.
        </p>
      </section>

      {/* The Problem */}
      <section className="py-12">
        <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">⚠️ Problem</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Na Balkanu se o radnim uvjetima šuti. Plaće su tabu tema, nepravedni šefovi su 
              &quot;normalni&quot;, a radnička prava se krše svakodnevno — od neplaćenih prekovremenih 
              do mobbinga i zastrašivanja.
            </p>
            <p>
              Radnici prihvaćaju poslove naslijepo, bez uvida u stvarnu kulturu tvrtke. 
              Google recenzije pokazuju što misle kupci, ali <strong>ne i zaposlenici</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-red-500">67%</p>
                <p className="text-sm text-gray-500 mt-1">radnika u regiji ne zna koliko zarađuju njihovi kolege</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-red-500">43%</p>
                <p className="text-sm text-gray-500 mt-1">je doživjelo neetično ponašanje na poslu</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-red-500">72%</p>
                <p className="text-sm text-gray-500 mt-1">bi mijenjalo posao da ima bolje informacije</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">💡 Rješenje: MojGazda platforma</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-bold mb-2">Anonimne recenzije</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Podijeli iskustvo bez straha. Svaka recenzija je potpuno anonimna — 
              poslodavac nikada neće saznati tko si. Moderacija osigurava kvalitetu.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-lg font-bold mb-2">Transparentne plaće</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Usporedi svoju plaću s kolegama u istom gradu i industriji. Prosječne plaće, 
              rasponi i trendovi — sve što trebaš za pregovaranje.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-lg font-bold mb-2">GAZDA Score</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Naš jedinstveni sustav ocjenjivanja šefova. Od 1 do 10, zaposlenici ocjenjuju 
              ponašanje uprave — upravljanje, komunikaciju, pravednost. Jedinstven za regiju.
            </p>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">🌍 Pokrivamo cijelu regiju</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { flag: "🇸🇮", name: "Slovenija", companies: "620+", status: "Aktivno" },
            { flag: "🇭🇷", name: "Hrvatska", companies: "980+", status: "Aktivno" },
            { flag: "🇷🇸", name: "Srbija", companies: "540+", status: "Aktivno" },
            { flag: "🇧🇦", name: "BiH", companies: "360+", status: "Aktivno" },
          ].map((country) => (
            <div
              key={country.name}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 
                         dark:border-gray-700 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-5xl mb-3">{country.flag}</div>
              <h3 className="font-bold text-lg">{country.name}</h3>
              <p className="text-brand-600 font-semibold">{country.companies}</p>
              <p className="text-xs text-gray-400">tvrtki</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/20 
                              text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                {country.status}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          🔜 Uskoro: 🇲🇪 Crna Gora · 🇲🇰 Sjeverna Makedonija · 🇽🇰 Kosovo · 🇦🇱 Albanija
        </p>
      </section>

      {/* How to Contribute */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">🤝 Kako možeš pomoći?</h2>
        <div className="space-y-4">
          {[
            {
              num: "1",
              title: "Napiši recenziju",
              desc: "Podijeli iskustvo sa svojim poslodavcem — 5 minuta tvog vremena pomaže tisućama radnika.",
              icon: "✍️",
            },
            {
              num: "2",
              title: "Prijavi svoju plaću",
              desc: "Anonimno dodaj informaciju o plaći. Zajedno razbijamo tabu o razgovorima o plaćama.",
              icon: "💰",
            },
            {
              num: "3",
              title: "Podijeli s prijateljima",
              desc: "Što više ljudi koristi MojGazda, to su podaci bolji za sve. Pošalji link kolegama!",
              icon: "📢",
            },
            {
              num: "4",
              title: "Daj nam feedback",
              desc: "Imaš ideju kako poboljšati platformu? Javi nam se — gradimo ovo zajedno.",
              icon: "💡",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm 
                         border border-gray-100 dark:border-gray-700"
            >
              <div className="shrink-0 w-10 h-10 bg-brand-500 text-white rounded-full flex items-center 
                             justify-center font-bold">
                {step.num}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {step.icon} {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Plans */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">🚀 Što dolazi?</h2>
        <div className="bg-gradient-to-br from-brand-50 to-teal-50 dark:from-brand-900/20 dark:to-teal-900/20 
                       rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Mobilna aplikacija",
                desc: "iOS i Android app za recenzije u pokretu.",
                status: "Q1 2026",
                icon: "📱",
              },
              {
                title: "Interview iskustva",
                desc: "Podijeli kako je izgledao intervju u nekoj tvrtki.",
                status: "Q2 2026",
                icon: "🎤",
              },
              {
                title: "Employer branding",
                desc: "Alati za poslodavce koji žele privući top talente.",
                status: "Q2 2026",
                icon: "🏢",
              },
              {
                title: "AI analiza trendova",
                desc: "Uvidi u trendove plaća i radnih uvjeta po industrijama.",
                status: "Q3 2026",
                icon: "🤖",
              },
              {
                title: "Provjera radnih prava",
                desc: "Alat koji ti pomaže provjeriti krše li se tvoja prava.",
                status: "Q3 2026",
                icon: "⚖️",
              },
              {
                title: "Proširenje na cijeli Balkan",
                desc: "Crna Gora, Makedonija, Kosovo, Albanija.",
                status: "Q4 2026",
                icon: "🌍",
              },
            ].map((plan) => (
              <div key={plan.title} className="flex items-start gap-3">
                <span className="text-2xl">{plan.icon}</span>
                <div>
                  <h3 className="font-semibold">{plan.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{plan.desc}</p>
                  <span className="inline-block mt-1 text-xs text-brand-600 font-medium">{plan.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 text-center">
        <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">
            Vrijeme je da radnici progovore. 🎤
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            MojGazda nije samo platforma — to je pokret za transparentnost na radnom mjestu 
            u cijeloj regiji. Pridruži nam se.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/review"
              className="px-8 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors 
                        font-medium text-lg"
            >
              Napiši recenziju ✍️
            </a>
            <a
              href="/salaries"
              className="px-8 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors 
                        font-medium text-lg"
            >
              Prijavi plaću 💰
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
