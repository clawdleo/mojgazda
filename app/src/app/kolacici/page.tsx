import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika kolačića — MojGazda",
  description: "Saznajte koje kolačiće koristi MojGazda i kako njima upravljati.",
};

export default function KolaciciPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Politika kolačića
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Datum stupanja na snagu: 1. svibnja 2026.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 sm:p-10">
          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Što su kolačići?
              </h2>
              <p>
                Kolačići (cookies) su male tekstualne datoteke koje se pohranjuju na vašem uređaju 
                (računalu, tabletu ili mobilnom telefonu) kada posjetite web stranicu. Kolačići 
                omogućuju stranici da zapamti vaše radnje i postavke (npr. prijavu, jezik, veličinu 
                fonta i druge postavke prikaza) tijekom određenog razdoblja, tako da ih ne morate 
                ponovno unositi svaki put kad posjetite stranicu ili prelazite s jedne stranice na drugu.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. Kako koristimo kolačiće
              </h2>
              <p>
                MojGazda koristi kolačiće za sljedeće svrhe:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Omogućavanje osnovnog funkcioniranja stranice</li>
                <li>Pamćenje vaše prijave i postavki</li>
                <li>Analiza korištenja stranice i poboljšanje korisničkog iskustva</li>
                <li>Zaštita od zlouporabe i prijevara</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Vrste kolačića koje koristimo
              </h2>

              {/* Essential */}
              <div className="mt-4 mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                  Neophodni (essential) kolačići
                </h3>
                <p className="text-sm mb-3">
                  Ovi kolačići su nužni za rad stranice i ne mogu se isključiti. Postavljaju se 
                  samo kao odgovor na vaše radnje (npr. prijava, postavljanje postavki privatnosti).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-white">Kolačić</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-white">Svrha</th>
                        <th className="text-left py-2 font-medium text-gray-900 dark:text-white">Trajanje</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">session_id</td>
                        <td className="py-2 pr-4">Identifikacija korisničke sesije</td>
                        <td className="py-2">Sesija</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">csrf_token</td>
                        <td className="py-2 pr-4">Zaštita od CSRF napada</td>
                        <td className="py-2">Sesija</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">cookie_consent</td>
                        <td className="py-2 pr-4">Pohrana vaših preferencija za kolačiće</td>
                        <td className="py-2">1 godina</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">auth_token</td>
                        <td className="py-2 pr-4">Pamćenje prijave (&quot;zapamti me&quot;)</td>
                        <td className="py-2">30 dana</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" />
                  Analitički kolačići
                </h3>
                <p className="text-sm mb-3">
                  Ovi kolačići nam pomažu razumjeti kako posjetitelji koriste našu stranicu, 
                  što nam omogućuje poboljšanje sadržaja i funkcionalnosti. Svi podaci su 
                  anonimizirani i agregirani.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-white">Kolačić</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-white">Svrha</th>
                        <th className="text-left py-2 font-medium text-gray-900 dark:text-white">Trajanje</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                        <td className="py-2 pr-4">Google Analytics — razlikovanje posjetitelja</td>
                        <td className="py-2">2 godine</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                        <td className="py-2 pr-4">Google Analytics 4 — pohrana stanja sesije</td>
                        <td className="py-2">2 godine</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">_gid</td>
                        <td className="py-2 pr-4">Google Analytics — razlikovanje posjetitelja</td>
                        <td className="py-2">24 sata</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-500 rounded-full inline-block" />
                  Funkcionalni kolačići
                </h3>
                <p className="text-sm mb-3">
                  Ovi kolačići omogućuju dodatne funkcionalnosti poput pamćenja vaših preferencija 
                  (jezik, regija) i personalizacije sadržaja.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-white">Kolačić</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-white">Svrha</th>
                        <th className="text-left py-2 font-medium text-gray-900 dark:text-white">Trajanje</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">locale</td>
                        <td className="py-2 pr-4">Odabrani jezik sučelja</td>
                        <td className="py-2">1 godina</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">region</td>
                        <td className="py-2 pr-4">Odabrana regija (SI/HR/RS/BA)</td>
                        <td className="py-2">1 godina</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">theme</td>
                        <td className="py-2 pr-4">Odabrana tema (svijetla/tamna)</td>
                        <td className="py-2">1 godina</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Kolačići trećih strana
              </h2>
              <p>
                Neki kolačići postavljaju treće strane čije usluge koristimo (npr. Google Analytics). 
                Mi ne kontroliramo te kolačiće i preporučujemo da provjerite politike privatnosti 
                tih pružatelja usluga:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  <strong>Google Analytics</strong> —{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600">
                    Politika privatnosti
                  </a>
                </li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Kako upravljati kolačićima
              </h2>
              <p className="mb-3">
                Možete kontrolirati i/ili obrisati kolačiće na nekoliko načina:
              </p>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
                5.1. Postavke preglednika
              </h3>
              <p className="text-sm mb-2">
                Većina preglednika omogućuje upravljanje kolačićima kroz postavke. Evo kako to 
                učiniti u najpopularnijim preglednicima:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Chrome:</strong> Postavke → Privatnost i sigurnost → Kolačići</li>
                <li><strong>Firefox:</strong> Postavke → Privatnost i sigurnost → Kolačići i podaci stranica</li>
                <li><strong>Safari:</strong> Postavke → Privatnost → Upravljanje podacima stranica</li>
                <li><strong>Edge:</strong> Postavke → Kolačići i dozvole za stranice</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
                5.2. Naše postavke kolačića
              </h3>
              <p className="text-sm">
                Prilikom prvog posjeta našoj stranici, prikazat ćemo vam obavijest o kolačićima 
                gdje možete odabrati koje kategorije kolačića prihvaćate. Svoje izbore možete 
                promijeniti u bilo kojem trenutku klikom na &quot;Postavke kolačića&quot; u podnožju stranice.
              </p>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>⚠️ Napomena:</strong> Blokiranje nekih vrsta kolačića može utjecati na vaše 
                  iskustvo na stranici. Neophodni kolačići ne mogu se isključiti jer su nužni za 
                  osnovni rad stranice.
                </p>
              </div>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                6. Promjene ove Politike
              </h2>
              <p>
                Možemo povremeno ažurirati ovu Politiku kolačića kako bismo odrazili promjene u 
                tehnologiji ili regulativi. Datum posljednje izmjene uvijek je naveden na vrhu 
                dokumenta.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                7. Kontakt
              </h2>
              <p>
                Ako imate pitanja o našoj upotrebi kolačića, kontaktirajte nas:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-3 text-sm">
                <p className="font-medium text-gray-900 dark:text-white">MojGazda d.o.o.</p>
                <p>Email: <a href="mailto:info@mojgazda.com" className="text-brand-500 hover:text-brand-600">info@mojgazda.com</a></p>
                <p>Web: <a href="https://mojgazda.com" className="text-brand-500 hover:text-brand-600">mojgazda.com</a></p>
              </div>
            </section>

          </div>
        </div>

        {/* Related links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/privatnost" className="text-brand-500 hover:text-brand-600 font-medium">
            Politika privatnosti →
          </Link>
          <Link href="/uvjeti" className="text-brand-500 hover:text-brand-600 font-medium">
            Uvjeti korištenja →
          </Link>
        </div>
      </div>
    </div>
  );
}
