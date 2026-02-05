import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika privatnosti - Gazda",
  description: "Saznajte kako Gazda prikuplja, koristi i štiti vaše osobne podatke.",
};

export default function PrivatnostPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Politika privatnosti
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Datum stupanja na snagu: 1. svibnja 2026.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 sm:p-10 prose-gray dark:prose-invert max-w-none">
          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Uvod
              </h2>
              <p>
                Gazda d.o.o. (&quot;mi&quot;, &quot;nas&quot;, &quot;Gazda&quot;) posvećen je zaštiti vaše privatnosti. 
                Ova Politika privatnosti objašnjava kako prikupljamo, koristimo, pohranjujemo i štitimo 
                vaše osobne podatke kada koristite našu web stranicu gazda.si (&quot;Usluga&quot;) i sve 
                povezane servise.
              </p>
              <p>
                Korištenjem naše Usluge pristajete na obradu vaših podataka u skladu s ovom Politikom. 
                Preporučujemo da pažljivo pročitate cijeli dokument.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. Voditelj obrade podataka
              </h2>
              <p>
                Voditelj obrade vaših osobnih podataka je:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-2 text-sm">
                <p className="font-medium text-gray-900 dark:text-white">Gazda d.o.o.</p>
                <p>Email: <a href="mailto:info@gazda.si" className="text-brand-500 hover:text-brand-600">info@gazda.si</a></p>
              </div>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Koje podatke prikupljamo
              </h2>
              <p className="mb-3">Prikupljamo sljedeće kategorije osobnih podataka:</p>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
                3.1. Podaci o računu
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ime i prezime (ili pseudonim)</li>
                <li>Email adresa</li>
                <li>Lozinka (pohranjena u šifriranom obliku)</li>
                <li>Datum registracije</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
                3.2. Recenzije i sadržaj
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tekst recenzija poslodavaca</li>
                <li>Ocjene (upravljanje, plaća, kultura, ravnoteža i dr.)</li>
                <li>Naziv radnog mjesta i odjela</li>
                <li>Trajanje zaposlenja (okvirno)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
                3.3. Podaci o plaćama
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Iznos plaće (bruto/neto)</li>
                <li>Radno mjesto i razina iskustva</li>
                <li>Lokacija zaposlenja</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
                3.4. Tehnički podaci
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP adresa</li>
                <li>Vrsta preglednika i operativnog sustava</li>
                <li>Stranice koje posjećujete i vrijeme posjeta</li>
                <li>Kolačići i slične tehnologije (vidi <Link href="/kolacici" className="text-brand-500 hover:text-brand-600">Politiku kolačića</Link>)</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Jamstvo anonimnosti
              </h2>
              <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg p-4">
                <p className="font-medium text-brand-700 dark:text-brand-300 mb-2">
                  🔒 Vaše recenzije su anonimne.
                </p>
                <p className="text-sm">
                  Gazda nikada neće javno povezati vaš korisnički račun s vašim recenzijama, 
                  ocjenama ili podacima o plaćama. Vaš identitet nikada neće biti otkriven poslodavcima 
                  ili trećim stranama. Recenzije se prikazuju isključivo s generičkim oznakama 
                  (npr. &quot;Bivši zaposlenik&quot;, &quot;Trenutni zaposlenik&quot;) bez ikakvih podataka koji bi 
                  mogli otkriti vaš identitet.
                </p>
              </div>
              <p className="mt-3">
                Interno pohranjujemo vezu između računa i recenzija isključivo u svrhu:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Sprječavanja zlouporabe (višestruke lažne recenzije)</li>
                <li>Omogućavanja vama da uredite ili obrišete vlastite recenzije</li>
                <li>Odgovaranja na zakonske zahtjeve (samo uz sudski nalog)</li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Kako koristimo vaše podatke
              </h2>
              <p className="mb-2">Vaše podatke koristimo za sljedeće svrhe:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pružanje i poboljšanje naše Usluge</li>
                <li>Kreiranje i upravljanje vašim korisničkim računom</li>
                <li>Prikazivanje anonimiziranih recenzija i statistika o plaćama</li>
                <li>Sprječavanje prijevara, zlouporabe i kršenja naših Uvjeta</li>
                <li>Slanje obavijesti vezanih uz vaš račun (potvrdni emailovi, promjene lozinke)</li>
                <li>Analiza korištenja za poboljšanje korisničkog iskustva</li>
                <li>Ispunjavanje zakonskih obveza</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                6. Pravna osnova obrade (GDPR)
              </h2>
              <p className="mb-2">
                Kao tvrtka sa sjedištem u Europskoj uniji, obrađujemo vaše podatke na temelju 
                sljedećih pravnih osnova iz Opće uredbe o zaštiti podataka (GDPR):
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Izvršenje ugovora</strong> (čl. 6(1)(b) GDPR) - obrada je nužna za pružanje Usluge kojoj pristupate registracijom.</li>
                <li><strong>Privola</strong> (čl. 6(1)(a) GDPR) - za neobavezne kolačiće i marketinšku komunikaciju.</li>
                <li><strong>Legitimni interes</strong> (čl. 6(1)(f) GDPR) - za sprječavanje zlouporabe, poboljšanje Usluge i analitiku.</li>
                <li><strong>Zakonska obveza</strong> (čl. 6(1)(c) GDPR) - za ispunjavanje pravnih zahtjeva.</li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                7. Dijeljenje podataka s trećim stranama
              </h2>
              <p className="mb-2">Vaše osobne podatke ne prodajemo. Možemo ih dijeliti sa:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Pružatelji usluga</strong> - hosting, email servisi, analitika (npr. Vercel, Google Analytics) koji obrađuju podatke u naše ime uz ugovorne obveze zaštite.</li>
                <li><strong>Pravna tijela</strong> - samo kada to zahtijeva zakon, sudski nalog ili u slučaju zaštite naših prava.</li>
                <li><strong>Poslodavci</strong> - nikada ne dobivaju pristup vašim osobnim podacima. Vide samo anonimizirane, agregirane podatke.</li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                8. Pohrana i sigurnost podataka
              </h2>
              <p>
                Vaši podaci pohranjeni su na sigurnim poslužiteljima unutar Europske unije. 
                Primjenjujemo industrije standardne mjere sigurnosti uključujući:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>SSL/TLS enkripcija svih prijenosa podataka</li>
                <li>Šifriranje lozinki (bcrypt hashing)</li>
                <li>Ograničeni pristup zaposlenika osobnim podacima</li>
                <li>Redovite sigurnosne revizije</li>
              </ul>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                9. Zadržavanje podataka
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Podaci o računu</strong> - pohranjujemo dok ne zatražite brisanje računa.</li>
                <li><strong>Recenzije</strong> - ostaju vidljive nakon brisanja računa, ali se potpuno anonimiziraju (ukida se svaka interna veza s računom).</li>
                <li><strong>Tehnički podaci</strong> - brišu se nakon 26 mjeseci.</li>
                <li><strong>Komunikacija</strong> - čuvamo do 3 godine od zadnjeg kontakta.</li>
              </ul>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                10. Vaša prava (GDPR)
              </h2>
              <p className="mb-2">Pod GDPR-om imate sljedeća prava:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Pravo pristupa</strong> - možete zatražiti kopiju svih podataka koje imamo o vama.</li>
                <li><strong>Pravo ispravka</strong> - možete zatražiti ispravku netočnih podataka.</li>
                <li><strong>Pravo brisanja (&quot;pravo na zaborav&quot;)</strong> - možete zatražiti brisanje svojih osobnih podataka.</li>
                <li><strong>Pravo ograničenja obrade</strong> - možete zatražiti ograničenje načina na koji koristimo vaše podatke.</li>
                <li><strong>Pravo prenosivosti</strong> - možete zatražiti da vam pošaljemo vaše podatke u strojno čitljivom formatu.</li>
                <li><strong>Pravo prigovora</strong> - možete prigovoriti obradi podataka na temelju legitimnog interesa.</li>
                <li><strong>Pravo povlačenja privole</strong> - možete u svakom trenutku povući privolu bez utjecaja na zakonitost dotadašnje obrade.</li>
              </ul>
              <p className="mt-3">
                Za ostvarivanje bilo kojeg prava kontaktirajte nas na{" "}
                <a href="mailto:info@gazda.si" className="text-brand-500 hover:text-brand-600">
                  info@gazda.si
                </a>
                . Odgovoriti ćemo u roku od 30 dana.
              </p>
              <p className="mt-2">
                Također imate pravo podnijeti pritužbu nadležnom nadzornom tijelu za zaštitu osobnih podataka.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                11. Kolačići i analitika
              </h2>
              <p>
                Koristimo kolačiće i slične tehnologije za rad naše stranice i analizu prometa. 
                Detaljne informacije o kolačićima koje koristimo, njihovoj svrsi i načinu upravljanja 
                njima možete pronaći u našoj{" "}
                <Link href="/kolacici" className="text-brand-500 hover:text-brand-600">
                  Politici kolačića
                </Link>.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                12. Djeca
              </h2>
              <p>
                Naša Usluga nije namijenjena osobama mlađim od 16 godina. Ne prikupljamo 
                svjesno podatke od djece. Ako saznamo da smo prikupili podatke djeteta, 
                odmah ćemo ih obrisati.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                13. Promjene ove Politike
              </h2>
              <p>
                Možemo povremeno ažurirati ovu Politiku privatnosti. O značajnim promjenama 
                obavijestit ćemo vas putem emaila ili istaknutom obavijesti na našoj web stranici. 
                Datum zadnje izmjene uvijek je naveden na vrhu dokumenta.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                14. Kontakt
              </h2>
              <p>
                Ako imate pitanja o ovoj Politici privatnosti ili želite ostvariti svoja prava, 
                kontaktirajte nas:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-3 text-sm">
                <p className="font-medium text-gray-900 dark:text-white">Gazda d.o.o.</p>
                <p>Email: <a href="mailto:info@gazda.si" className="text-brand-500 hover:text-brand-600">info@gazda.si</a></p>
                <p>Web: <a href="https://gazda.si" className="text-brand-500 hover:text-brand-600">gazda.si</a></p>
              </div>
            </section>

          </div>
        </div>

        {/* Related links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/uvjeti" className="text-brand-500 hover:text-brand-600 font-medium">
            Uvjeti korištenja →
          </Link>
          <Link href="/kolacici" className="text-brand-500 hover:text-brand-600 font-medium">
            Politika kolačića →
          </Link>
        </div>
      </div>
    </div>
  );
}
