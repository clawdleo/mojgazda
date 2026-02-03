import Link from "next/link";

export function Header() {
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

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/companies" className="text-gray-600 hover:text-brand-600 transition-colors font-medium">
              Tvrtke
            </Link>
            <Link href="/jobs" className="text-gray-600 hover:text-brand-600 transition-colors font-medium">
              Poslovi
            </Link>
            <Link href="/salaries" className="text-gray-600 hover:text-brand-600 transition-colors font-medium">
              Plaće
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/review"
              className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium text-sm"
            >
              Napiši recenziju
            </Link>
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              🇭🇷
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
