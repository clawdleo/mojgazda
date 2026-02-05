import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">
              <span className="text-brand-400">Gazda</span>
            </h3>
            <p className="text-sm">
              Transparentnost na radnom mjestu za Balkan.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Istraži</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/companies" className="hover:text-white transition-colors">Tvrtke</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition-colors">Poslovi</Link></li>
              <li><Link href="/salaries" className="hover:text-white transition-colors">Plaće</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Za poslodavce</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/employers" className="hover:text-white transition-colors">Besplatan profil</Link></li>
              <li><Link href="/employers/premium" className="hover:text-white transition-colors">Premium</Link></li>
              <li><Link href="/post-job" className="hover:text-white transition-colors">Objavi posao</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Pravne informacije</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">O nama</Link></li>
              <li><Link href="/privatnost" className="hover:text-white transition-colors">Politika privatnosti</Link></li>
              <li><Link href="/uvjeti" className="hover:text-white transition-colors">Uvjeti korištenja</Link></li>
              <li><Link href="/kolacici" className="hover:text-white transition-colors">Politika kolačića</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex justify-between items-center text-xs">
          <p>© 2026 Gazda d.o.o. Sva prava pridržana.</p>
          <div className="flex gap-3">
            <span>🇸🇮 Slovenija</span>
            <span>🇭🇷 Hrvatska</span>
            <span>🇷🇸 Srbija</span>
            <span>🇧🇦 BiH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
