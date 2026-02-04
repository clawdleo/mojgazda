export interface SalaryData {
  id: string;
  job_title: string;
  avg_salary: number;
  salary_min: number;
  salary_max: number;
  reports_count: number;
  country_code: string;
  city?: string;
  currency: string;
  category: string;
}

export const demoSalaries: SalaryData[] = [
  // Tech
  {
    id: "sal-1",
    job_title: "Software Developer",
    avg_salary: 2800,
    salary_min: 1500,
    salary_max: 5500,
    reports_count: 342,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Tech",
  },
  {
    id: "sal-2",
    job_title: "Software Developer",
    avg_salary: 3200,
    salary_min: 1800,
    salary_max: 6000,
    reports_count: 287,
    country_code: "SI",
    city: "Ljubljana",
    currency: "EUR",
    category: "Tech",
  },
  {
    id: "sal-3",
    job_title: "Software Developer",
    avg_salary: 2200,
    salary_min: 1000,
    salary_max: 4500,
    reports_count: 198,
    country_code: "RS",
    city: "Beograd",
    currency: "EUR",
    category: "Tech",
  },
  {
    id: "sal-4",
    job_title: "Software Developer",
    avg_salary: 1800,
    salary_min: 900,
    salary_max: 3500,
    reports_count: 89,
    country_code: "BA",
    city: "Sarajevo",
    currency: "EUR",
    category: "Tech",
  },
  {
    id: "sal-5",
    job_title: "Data Analyst",
    avg_salary: 2400,
    salary_min: 1400,
    salary_max: 4000,
    reports_count: 124,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Tech",
  },
  {
    id: "sal-6",
    job_title: "DevOps Engineer",
    avg_salary: 3100,
    salary_min: 2000,
    salary_max: 5000,
    reports_count: 87,
    country_code: "RS",
    city: "Beograd",
    currency: "EUR",
    category: "Tech",
  },
  {
    id: "sal-7",
    job_title: "UX/UI Designer",
    avg_salary: 2500,
    salary_min: 1200,
    salary_max: 4200,
    reports_count: 156,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Tech",
  },
  {
    id: "sal-8",
    job_title: "QA Engineer",
    avg_salary: 2100,
    salary_min: 1200,
    salary_max: 3500,
    reports_count: 93,
    country_code: "SI",
    city: "Maribor",
    currency: "EUR",
    category: "Tech",
  },
  // Financije
  {
    id: "sal-9",
    job_title: "Računovođa",
    avg_salary: 1400,
    salary_min: 900,
    salary_max: 2200,
    reports_count: 267,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Financije",
  },
  {
    id: "sal-10",
    job_title: "Računovođa",
    avg_salary: 1800,
    salary_min: 1200,
    salary_max: 2800,
    reports_count: 198,
    country_code: "SI",
    city: "Ljubljana",
    currency: "EUR",
    category: "Financije",
  },
  {
    id: "sal-11",
    job_title: "Računovođa",
    avg_salary: 900,
    salary_min: 600,
    salary_max: 1500,
    reports_count: 145,
    country_code: "RS",
    city: "Beograd",
    currency: "EUR",
    category: "Financije",
  },
  {
    id: "sal-12",
    job_title: "Financijski analitičar",
    avg_salary: 2200,
    salary_min: 1500,
    salary_max: 3800,
    reports_count: 78,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Financije",
  },
  // Prodaja
  {
    id: "sal-13",
    job_title: "Prodajni predstavnik",
    avg_salary: 1100,
    salary_min: 700,
    salary_max: 2500,
    reports_count: 312,
    country_code: "HR",
    currency: "EUR",
    category: "Prodaja",
  },
  {
    id: "sal-14",
    job_title: "Voditelj prodaje",
    avg_salary: 2000,
    salary_min: 1300,
    salary_max: 3500,
    reports_count: 134,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Prodaja",
  },
  {
    id: "sal-15",
    job_title: "Prodajni predstavnik",
    avg_salary: 1400,
    salary_min: 900,
    salary_max: 2800,
    reports_count: 223,
    country_code: "SI",
    city: "Ljubljana",
    currency: "EUR",
    category: "Prodaja",
  },
  // Skladište / Logistika
  {
    id: "sal-16",
    job_title: "Skladištar",
    avg_salary: 900,
    salary_min: 700,
    salary_max: 1300,
    reports_count: 456,
    country_code: "HR",
    currency: "EUR",
    category: "Logistika",
  },
  {
    id: "sal-17",
    job_title: "Skladištar",
    avg_salary: 1200,
    salary_min: 900,
    salary_max: 1600,
    reports_count: 334,
    country_code: "SI",
    currency: "EUR",
    category: "Logistika",
  },
  {
    id: "sal-18",
    job_title: "Vozač — dostava",
    avg_salary: 1000,
    salary_min: 750,
    salary_max: 1400,
    reports_count: 389,
    country_code: "HR",
    currency: "EUR",
    category: "Logistika",
  },
  {
    id: "sal-19",
    job_title: "Vozač — dostava",
    avg_salary: 1300,
    salary_min: 1000,
    salary_max: 1800,
    reports_count: 278,
    country_code: "SI",
    currency: "EUR",
    category: "Logistika",
  },
  {
    id: "sal-20",
    job_title: "Logistički koordinator",
    avg_salary: 1300,
    salary_min: 900,
    salary_max: 2000,
    reports_count: 112,
    country_code: "RS",
    city: "Beograd",
    currency: "EUR",
    category: "Logistika",
  },
  // Proizvodnja
  {
    id: "sal-21",
    job_title: "Operater u proizvodnji",
    avg_salary: 1000,
    salary_min: 750,
    salary_max: 1400,
    reports_count: 523,
    country_code: "HR",
    currency: "EUR",
    category: "Proizvodnja",
  },
  {
    id: "sal-22",
    job_title: "Operater u proizvodnji",
    avg_salary: 1350,
    salary_min: 1000,
    salary_max: 1800,
    reports_count: 412,
    country_code: "SI",
    currency: "EUR",
    category: "Proizvodnja",
  },
  {
    id: "sal-23",
    job_title: "CNC operater",
    avg_salary: 1500,
    salary_min: 1100,
    salary_max: 2200,
    reports_count: 187,
    country_code: "SI",
    city: "Celje",
    currency: "EUR",
    category: "Proizvodnja",
  },
  {
    id: "sal-24",
    job_title: "Inženjer kvalitete",
    avg_salary: 1800,
    salary_min: 1200,
    salary_max: 2800,
    reports_count: 98,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Proizvodnja",
  },
  // Zdravstvo
  {
    id: "sal-25",
    job_title: "Medicinska sestra",
    avg_salary: 1300,
    salary_min: 900,
    salary_max: 1800,
    reports_count: 367,
    country_code: "HR",
    currency: "EUR",
    category: "Zdravstvo",
  },
  {
    id: "sal-26",
    job_title: "Medicinska sestra",
    avg_salary: 1700,
    salary_min: 1300,
    salary_max: 2300,
    reports_count: 298,
    country_code: "SI",
    currency: "EUR",
    category: "Zdravstvo",
  },
  {
    id: "sal-27",
    job_title: "Farmaceut",
    avg_salary: 2100,
    salary_min: 1500,
    salary_max: 3000,
    reports_count: 134,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Zdravstvo",
  },
  // Turizam / Ugostiteljstvo
  {
    id: "sal-28",
    job_title: "Konobar",
    avg_salary: 800,
    salary_min: 500,
    salary_max: 1200,
    reports_count: 678,
    country_code: "HR",
    currency: "EUR",
    category: "Turizam",
  },
  {
    id: "sal-29",
    job_title: "Kuhar",
    avg_salary: 1000,
    salary_min: 700,
    salary_max: 1800,
    reports_count: 445,
    country_code: "HR",
    currency: "EUR",
    category: "Turizam",
  },
  {
    id: "sal-30",
    job_title: "Recepcionista u hotelu",
    avg_salary: 900,
    salary_min: 650,
    salary_max: 1300,
    reports_count: 234,
    country_code: "HR",
    city: "Dubrovnik",
    currency: "EUR",
    category: "Turizam",
  },
  // Građevina
  {
    id: "sal-31",
    job_title: "Građevinski inženjer",
    avg_salary: 1800,
    salary_min: 1200,
    salary_max: 2800,
    reports_count: 156,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Građevina",
  },
  {
    id: "sal-32",
    job_title: "Elektroinstalater",
    avg_salary: 1200,
    salary_min: 800,
    salary_max: 1800,
    reports_count: 234,
    country_code: "HR",
    currency: "EUR",
    category: "Građevina",
  },
  // Marketing
  {
    id: "sal-33",
    job_title: "Marketing manager",
    avg_salary: 2000,
    salary_min: 1300,
    salary_max: 3500,
    reports_count: 112,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Marketing",
  },
  {
    id: "sal-34",
    job_title: "Community Manager",
    avg_salary: 1200,
    salary_min: 800,
    salary_max: 1800,
    reports_count: 167,
    country_code: "RS",
    city: "Beograd",
    currency: "EUR",
    category: "Marketing",
  },
  // Admin
  {
    id: "sal-35",
    job_title: "Administrativni asistent",
    avg_salary: 900,
    salary_min: 600,
    salary_max: 1300,
    reports_count: 345,
    country_code: "HR",
    currency: "EUR",
    category: "Administracija",
  },
  {
    id: "sal-36",
    job_title: "HR Specijalist",
    avg_salary: 1500,
    salary_min: 1000,
    salary_max: 2500,
    reports_count: 123,
    country_code: "HR",
    city: "Zagreb",
    currency: "EUR",
    category: "Administracija",
  },
];

export interface PopularRole {
  title: string;
  avgSalary: number;
  reports: number;
  icon: string;
  trend: "up" | "down" | "stable";
  trendPct: number;
}

export const popularRoles: PopularRole[] = [
  { title: "Software Developer", avgSalary: 2800, reports: 916, icon: "💻", trend: "up", trendPct: 12 },
  { title: "Računovođa", avgSalary: 1400, reports: 610, icon: "📊", trend: "stable", trendPct: 2 },
  { title: "Prodajni predstavnik", avgSalary: 1200, reports: 535, icon: "🤝", trend: "down", trendPct: -3 },
  { title: "Skladištar", avgSalary: 1050, reports: 790, icon: "📦", trend: "up", trendPct: 5 },
  { title: "Vozač — dostava", avgSalary: 1100, reports: 667, icon: "🚛", trend: "up", trendPct: 8 },
  { title: "Medicinska sestra", avgSalary: 1500, reports: 665, icon: "🏥", trend: "up", trendPct: 6 },
  { title: "Konobar", avgSalary: 800, reports: 678, icon: "🍽️", trend: "stable", trendPct: 1 },
  { title: "Operater u proizvodnji", avgSalary: 1150, reports: 935, icon: "🏭", trend: "up", trendPct: 4 },
];

export function getSalaries(filters?: {
  search?: string;
  country?: string;
  category?: string;
}): SalaryData[] {
  let results = [...demoSalaries];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (s) =>
        s.job_title.toLowerCase().includes(q) ||
        (s.city && s.city.toLowerCase().includes(q))
    );
  }
  if (filters?.country) {
    results = results.filter((s) => s.country_code === filters.country);
  }
  if (filters?.category) {
    results = results.filter((s) => s.category === filters.category);
  }

  return results;
}

export function formatSalary(amount: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
