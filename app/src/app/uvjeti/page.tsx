import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uvjeti korištenja - Gazda",
  description: "Uvjeti korištenja platforme Gazda za recenzije poslodavaca.",
};

export default function UvjetiPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Uvjeti korištenja
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
                1. O usluzi
              </h2>
              <p>
                Gazda (&quot;Usluga&quot;, &quot;Platforma&quot;) je online platforma koju pruža Gazda d.o.o. 
                (&quot;mi&quot;, &quot;nas&quot;, &quot;Gazda&quot;) koja omogućuje zaposlenicima i bivšim zaposlenicima da 
                anonimno dijele recenzije, ocjene i podatke o plaćama svojih poslodavaca u regiji 
                Slovenije, Hrvatske, Srbije i Bosne i Hercegovine.
              </p>
              <p className="mt-2">
                Korištenjem naše Usluge pristajete na ove Uvjete korištenja. Ako se ne slažete 
                s bilo kojim dijelom, nemojte koristiti Uslugu.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. Registracija i korisnički račun
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Za korištenje određenih funkcionalnosti (pisanje recenzija, pristup detaljnim podacima o plaćama) potrebna je registracija.</li>
                <li>Morate imati najmanje 16 godina za kreiranje računa.</li>
                <li>Odgovorni ste za čuvanje sigurnosti svojih pristupnih podataka.</li>
                <li>Možete imati samo jedan korisnički račun.</li>
                <li>Zadržavamo pravo suspendiranja ili brisanja računa koji krše ove Uvjete.</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Obveze korisnika - pisanje recenzija
              </h2>
              <p className="mb-3">
                Objavljivanjem recenzije na Gazda platformi jamčite i obvezujete se da:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Istinitost</strong> - vaša recenzija temelji se na stvarnom iskustvu rada kod 
                  navedenog poslodavca. Recenzija odražava vaše iskreno mišljenje i stvarno iskustvo.
                </li>
                <li>
                  <strong>Aktualnost</strong> - jasno naznačujete jeste li trenutni ili bivši zaposlenik 
                  i okvirno razdoblje zaposlenja.
                </li>
                <li>
                  <strong>Bez klevete i laži</strong> - nećete objavljivati namjerno lažne, zlonamjerne 
                  ili klevetnički sadržaj. Konstruktivna kritika je dobrodošla; lažne optužbe nisu.
                </li>
                <li>
                  <strong>Bez osobnih podataka</strong> - nećete otkrivati imena kolega, menadžera ili 
                  drugih osoba bez njihove privole. Koristite generičke opise (npr. &quot;moj nadređeni&quot;).
                </li>
                <li>
                  <strong>Bez poslovnih tajni</strong> - nećete otkrivati povjerljive poslovne informacije, 
                  poslovne tajne ili zaštićene podatke.
                </li>
                <li>
                  <strong>Jedna recenzija po poslodavcu</strong> - možete napisati jednu recenziju po 
                  poslodavcu, s mogućnošću ažuriranja postojeće.
                </li>
              </ol>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Prava poslodavaca
              </h2>
              <p className="mb-3">Poslodavci koji su navedeni na platformi imaju sljedeća prava:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Besplatan profil</strong> - svaki poslodavac može besplatno zatražiti upravljanje 
                  profilom svoje tvrtke (ažuriranje opisa, logotipa, osnovnih informacija).
                </li>
                <li>
                  <strong>Odgovor na recenzije</strong> - poslodavci mogu javno odgovoriti na pojedine 
                  recenzije. Odgovori su jasno označeni kao &quot;Odgovor poslodavca&quot;.
                </li>
                <li>
                  <strong>Prijava neprimjerenog sadržaja</strong> - poslodavci mogu prijaviti recenzije 
                  za koje smatraju da krše ove Uvjete. Svaka prijava se ručno pregledava.
                </li>
                <li>
                  <strong>Poslodavci ne mogu</strong> - zahtijevati identitet recenzenta, plaćati za 
                  uklanjanje negativnih recenzija, niti na bilo koji način utjecati na sustav ocjenjivanja.
                </li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Moderiranje sadržaja
              </h2>
              <p className="mb-3">
                Gazda provodi aktivno moderiranje kako bi osigurao kvalitetu i pouzdanost 
                sadržaja na platformi:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Automatska provjera</strong> - sve recenzije prolaze automatsku provjeru 
                  za otkrivanje spam sadržaja, uvredljivog jezika i potencijalno klevetnički sadržaja.
                </li>
                <li>
                  <strong>Ručna provjera</strong> - prijavljene recenzije ručno pregledava naš tim moderatora.
                </li>
                <li>
                  <strong>Uklanjanje sadržaja</strong> - zadržavamo pravo ukloniti sadržaj koji krši ove 
                  Uvjete, uključujući ali ne ograničavajući se na:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Klevetnički ili namjerno lažan sadržaj</li>
                    <li>Govor mržnje, diskriminacija ili prijetnje</li>
                    <li>Otkrivanje osobnih podataka trećih osoba</li>
                    <li>Reklamni ili spam sadržaj</li>
                    <li>Sadržaj koji krši zakon</li>
                  </ul>
                </li>
                <li>
                  <strong>Žalba</strong> - ako je vaša recenzija uklonjena, imate pravo na žalbu putem 
                  emaila na info@gazda.si. Žalba se razmatra u roku od 14 radnih dana.
                </li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                6. Intelektualno vlasništvo
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Naš sadržaj</strong> - logotip Gazda, dizajn platforme, algoritmi ocjenjivanja 
                  i sav prateći softver vlasništvo su Gazda d.o.o. Zabranjeno je kopiranje, 
                  distribucija ili preinaka bez pisanog dopuštenja.
                </li>
                <li>
                  <strong>Vaš sadržaj</strong> - zadržavate autorska prava na svoje recenzije. 
                  Objavljivanjem sadržaja na platformi dajete nam neekskluzivnu, besplatnu, 
                  trajnu i globalnu licencu za prikazivanje, distribuiranje i korištenje vašeg sadržaja 
                  u sklopu Usluge.
                </li>
                <li>
                  <strong>Agregirani podaci</strong> - imamo pravo koristiti agregirane, anonimizirane 
                  podatke (prosječne ocjene, statistike plaća) u komercijalnim izvještajima i analizama.
                </li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                7. Zabranjena upotreba
              </h2>
              <p className="mb-2">Zabranjeno je:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Kreiranje lažnih računa ili lažnih recenzija</li>
                <li>Automatsko prikupljanje podataka (scraping) bez pisanog dopuštenja</li>
                <li>Pokušaji otkrivanja identiteta anonimnih recenzenata</li>
                <li>Korištenje platforme u svrhe ucjene ili prijetnji prema poslodavcima</li>
                <li>Ometanje rada platforme (DDoS napadi, injektiranje koda i sl.)</li>
                <li>Lažno predstavljanje kao zaposlenik tvrtke u kojoj nikada niste radili</li>
                <li>Plaćeno pisanje recenzija (pozitivnih ili negativnih) za treće strane</li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                8. Ograničenje odgovornosti
              </h2>
              <p>
                Gazda je platforma za dijeljenje korisničkog sadržaja. Ne jamčimo za istinitost, 
                točnost ili potpunost korisničkih recenzija i podataka o plaćama.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  Usluga se pruža &quot;kakva jest&quot; (as-is) bez ikakvih jamstava, izričitih ili 
                  implicitnih.
                </li>
                <li>
                  Nismo odgovorni za odluke koje donesete na temelju informacija s platforme 
                  (npr. prihvaćanje ili odbijanje posla).
                </li>
                <li>
                  Naša ukupna odgovornost prema vama ograničena je na iznos koji ste nam 
                  platili u posljednjih 12 mjeseci (za besplatne korisnike: 0 EUR).
                </li>
                <li>
                  Ne odgovaramo za privremenu nedostupnost Usluge, gubitak podataka uslijed 
                  tehničkih problema ili djelovanja više sile.
                </li>
              </ul>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                9. Obeštećenje
              </h2>
              <p>
                Pristajete da ćete Gazda d.o.o. obeštetiti i braniti od svih zahtjeva, 
                odgovornosti, šteta i troškova (uključujući razumne odvjetničke naknade) koji 
                proizlaze iz vašeg korištenja Usluge, kršenja ovih Uvjeta ili kršenja prava 
                trećih strana.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                10. Prekid korištenja
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Možete u svakom trenutku zatvoriti svoj račun iz postavki profila ili kontaktiranjem naše podrške.</li>
                <li>Zadržavamo pravo suspendirati ili zatvoriti vaš račun u slučaju kršenja ovih Uvjeta, uz obavijest i obrazloženje.</li>
                <li>Nakon brisanja računa, vaše recenzije ostaju na platformi u anonimiziranom obliku, osim ako izričito ne zatražite njihovo uklanjanje.</li>
              </ul>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                11. Mjerodavno pravo i nadležnost
              </h2>
              <p>
                Na ove Uvjete primjenjuje se pravo Republike Slovenije. Za sve sporove koji 
                proizlaze iz korištenja Usluge nadležan je stvarno i mjesno nadležni sud u 
                Ljubljani, Republika Slovenija.
              </p>
              <p className="mt-2">
                Za korisnike iz Republike Hrvatske, sporovi se mogu voditi i pred nadležnim 
                sudom u Zagrebu, Republika Hrvatska, u skladu s primjenjivim propisima o 
                zaštiti potrošača.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                12. Promjene Uvjeta
              </h2>
              <p>
                Zadržavamo pravo izmjene ovih Uvjeta u bilo kojem trenutku. O značajnim 
                promjenama obavijestit ćemo vas najmanje 30 dana unaprijed putem emaila 
                ili istaknutom obavijesti na platformi. Nastavak korištenja Usluge nakon 
                izmjena smatra se prihvaćanjem novih Uvjeta.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                13. Razdvojivost
              </h2>
              <p>
                Ako se bilo koja odredba ovih Uvjeta proglasi nevažećom ili neprovedivom, 
                preostale odredbe ostaju na snazi u punom opsegu.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                14. Kontakt
              </h2>
              <p>
                Za sva pitanja vezana uz ove Uvjete korištenja:
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
          <Link href="/privatnost" className="text-brand-500 hover:text-brand-600 font-medium">
            Politika privatnosti →
          </Link>
          <Link href="/kolacici" className="text-brand-500 hover:text-brand-600 font-medium">
            Politika kolačića →
          </Link>
        </div>
      </div>
    </div>
  );
}
