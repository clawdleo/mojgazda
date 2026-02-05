export interface InterviewExperience {
  id: string;
  company_id: string;
  company_slug: string;
  company_name: string;
  job_title: string;
  department?: string;
  interview_date: string;
  difficulty: "easy" | "medium" | "hard";
  experience: "positive" | "neutral" | "negative";
  got_offer: boolean | null;
  accepted_offer: boolean | null;
  application_method: "online" | "recruiter" | "referral" | "job_fair" | "other";
  interview_process: string;
  questions: string[];
  tips: string;
  duration_days: number;
  helpful_count: number;
  created_at: string;
  country_code: string;
  city: string;
}

export const demoInterviews: InterviewExperience[] = [
  // RIMAC
  {
    id: "int-rim-1",
    company_id: "comp-rimac",
    company_slug: "rimac",
    company_name: "Rimac Technology",
    job_title: "Embedded Software Engineer",
    department: "Engineering",
    interview_date: "2025-05-15",
    difficulty: "hard",
    experience: "positive",
    got_offer: true,
    accepted_offer: true,
    application_method: "online",
    interview_process: "Proces je trajao oko 3 tjedna. Počeo sam s online prijavom, zatim HR screening call. Nakon toga slijedi tehnički intervju s voditeljem tima gdje sam morao riješiti live coding zadatak. Zadnji krug bio je onsite u Rimac Campusu - prezentacija projekta i upoznavanje tima.",
    questions: [
      "Objasni razliku između CAN i LIN protokola",
      "Kako bi optimizirao memory usage u embedded sustavu?",
      "Live coding: implementiraj circular buffer u C",
      "Opiši projekt iz portfolija na koji si najponosniji",
    ],
    tips: "Pripremite portfolio s konkretnim projektima. Oni vole vidjeti passion za automobile i tehnologiju. Budite iskreni - ako ne znate nešto, kažite. Pitanja su zahtjevna ali fer.",
    duration_days: 21,
    helpful_count: 47,
    created_at: "2025-06-01T10:00:00Z",
    country_code: "HR",
    city: "Zagreb",
  },
  {
    id: "int-rim-2",
    company_id: "comp-rimac",
    company_slug: "rimac",
    company_name: "Rimac Technology",
    job_title: "Mechanical Engineer",
    department: "Vehicle Engineering",
    interview_date: "2025-04-10",
    difficulty: "hard",
    experience: "positive",
    got_offer: true,
    accepted_offer: true,
    application_method: "referral",
    interview_process: "Kolega me preporučio. Prvo sam imao razgovor s HR-om, zatim tehnički intervju s lead inženjerom. Dobio sam home assignment - dizajnirati bracket za specifičnu komponentu. Na kraju onsite prezentacija rješenja.",
    questions: [
      "Koji CAD softver koristiš i zašto?",
      "Kako pristupaš FEA analizi?",
      "Kako bi riješio problem pregrijavanja baterije?",
      "Prezentiraj svoj home assignment",
    ],
    tips: "Home assignment je ključan - uložite vrijeme. Oni gledaju proces razmišljanja, ne samo finalni rezultat. Pokažite da razumijete automotive standarde.",
    duration_days: 28,
    helpful_count: 32,
    created_at: "2025-05-10T14:00:00Z",
    country_code: "HR",
    city: "Zagreb",
  },

  // INFOBIP
  {
    id: "int-info-1",
    company_id: "comp-infobip",
    company_slug: "infobip",
    company_name: "Infobip",
    job_title: "Senior Backend Developer",
    department: "Engineering",
    interview_date: "2025-06-01",
    difficulty: "medium",
    experience: "positive",
    got_offer: true,
    accepted_offer: true,
    application_method: "recruiter",
    interview_process: "Recruiter me kontaktirao na LinkedInu. Nakon inicijalnog razgovora, imao sam tehnički intervju preko Zooma s dvojicom developera. Pitanja su bila kombinacija teorije i praktičnog razmišljanja. Zatim kulturni fit razgovor s hiring managerom.",
    questions: [
      "Objasni kako radi event-driven arhitektura",
      "Kako bi skalirao sustav s milijardama poruka dnevno?",
      "System design: dizajniraj notification service",
      "Kako pristupaš code reviewu?",
    ],
    tips: "Fokusirajte se na scalability - to je srž njihovog posla. Raspitajte se o timu u koji idete jer kvaliteta ovisi o timu. Atmosfera je opuštena, ne morate biti u odijelu.",
    duration_days: 14,
    helpful_count: 38,
    created_at: "2025-06-20T09:00:00Z",
    country_code: "HR",
    city: "Zagreb",
  },
  {
    id: "int-info-2",
    company_id: "comp-infobip",
    company_slug: "infobip",
    company_name: "Infobip",
    job_title: "Product Manager",
    department: "Product",
    interview_date: "2025-03-20",
    difficulty: "medium",
    experience: "neutral",
    got_offer: false,
    accepted_offer: null,
    application_method: "online",
    interview_process: "Standardna prijava kroz njihov portal. HR screening, zatim case study zadatak koji sam morao prezentirati. Na kraju razgovor s Head of Product. Nisam dobio ponudu ali feedback je bio konstruktivan.",
    questions: [
      "Kako bi prioritizirao feature backlog?",
      "Case study: Lansiraš novi proizvod na tržište BiH - strategija?",
      "Kako mjeriš uspjeh proizvoda?",
      "Opiši konflikt s engineering timom i kako si ga riješio",
    ],
    tips: "Case study je ključan - pripremite se za pitanja o metrikama i prioritizaciji. Budite spremni braniti svoje odluke. I ako ne prođete, tražite feedback - daju ga rado.",
    duration_days: 18,
    helpful_count: 22,
    created_at: "2025-04-15T11:00:00Z",
    country_code: "HR",
    city: "Vodnjan",
  },

  // NORDEUS
  {
    id: "int-nord-1",
    company_id: "comp-nordeus",
    company_slug: "nordeus",
    company_name: "Nordeus",
    job_title: "Game Developer",
    department: "Game Development",
    interview_date: "2025-05-01",
    difficulty: "hard",
    experience: "positive",
    got_offer: true,
    accepted_offer: true,
    application_method: "online",
    interview_process: "Prijavio sam se online. Prvo je bio coding test online (HackerRank stil). Zatim tehnički intervju s lead developerom - puno pitanja o Unity i C#. Na kraju cultural fit i game design diskusija.",
    questions: [
      "Implementiraj A* pathfinding algoritam",
      "Kako optimiziraš mobilnu igru za starije uređaje?",
      "Zašto je Top Eleven uspješan?",
      "Dizajniraj novu feature za mobile game",
    ],
    tips: "Morate pokazati strast za igre! Igrajte Top Eleven prije intervjua. Coding test je zahtjevan - vježbajte algoritme. Ured je fenomenalan, dođite ranije da ga vidite.",
    duration_days: 25,
    helpful_count: 41,
    created_at: "2025-06-05T15:00:00Z",
    country_code: "RS",
    city: "Beograd",
  },

  // KONZUM
  {
    id: "int-konz-1",
    company_id: "comp-konzum",
    company_slug: "konzum",
    company_name: "Konzum",
    job_title: "IT Specialist",
    department: "IT",
    interview_date: "2025-04-01",
    difficulty: "easy",
    experience: "neutral",
    got_offer: true,
    accepted_offer: false,
    application_method: "online",
    interview_process: "Klasična prijava, HR poziv, jedan tehnički intervju. Ništa komplicirano - standardna pitanja o iskustvu i tehnologijama. Dobio ponudu ali plaća je bila preniska.",
    questions: [
      "Koje tehnologije koristiš?",
      "Imaš li iskustva s ERP sustavima?",
      "Kako bi pristupio migraciji legacy sustava?",
      "Zašto želiš raditi u Konzumu?",
    ],
    tips: "Intervju je jednostavan ali pregovarajte za plaću jer počinju s niskim ponudama. Pitajte o projektima - neki su zanimljivi (e-commerce), neki dosadni (održavanje starih sustava).",
    duration_days: 10,
    helpful_count: 18,
    created_at: "2025-04-20T10:00:00Z",
    country_code: "HR",
    city: "Zagreb",
  },

  // KRKA
  {
    id: "int-krka-1",
    company_id: "comp-krka",
    company_slug: "krka-dd",
    company_name: "Krka d.d.",
    job_title: "QA Specialist",
    department: "Quality Assurance",
    interview_date: "2025-05-20",
    difficulty: "medium",
    experience: "positive",
    got_offer: true,
    accepted_offer: true,
    application_method: "job_fair",
    interview_process: "Upoznao sam recruitera na job fairu u Ljubljani. Poslao CV, dobio poziv na intervju. Dva kruga - HR i stručni s voditeljem QA odjela. Pitanja fokusirana na GMP standarde i farmaceutsku industriju.",
    questions: [
      "Što znate o GMP standardima?",
      "Kako bi pristupio validaciji procesa?",
      "Opišite situaciju kada ste otkrili problem kvalitete",
      "Zašto farmaceutska industrija?",
    ],
    tips: "Naučite osnove GMP-a prije intervjua. Krka cijeni preciznost i sistematičnost. Budite spremni na relokaciju u Novo Mesto ako niste lokalni.",
    duration_days: 16,
    helpful_count: 25,
    created_at: "2025-06-10T09:00:00Z",
    country_code: "SI",
    city: "Novo Mesto",
  },

  // BH TELECOM
  {
    id: "int-bht-1",
    company_id: "comp-bh-telecom",
    company_slug: "bh-telecom",
    company_name: "BH Telecom",
    job_title: "Network Engineer",
    department: "Network Operations",
    interview_date: "2025-03-01",
    difficulty: "medium",
    experience: "negative",
    got_offer: false,
    accepted_offer: null,
    application_method: "online",
    interview_process: "Prijava preko konkursa na stranici. Dugo sam čekao odgovor (skoro 2 mjeseca). Intervju je bio formalan, komisija od 3 osobe. Nisam dobio feedback zašto nisam prošao.",
    questions: [
      "Opišite OSI model",
      "Iskustvo s Cisco opremom?",
      "Kako bi rješavali network outage?",
      "Zašto BH Telecom?",
    ],
    tips: "Proces je spor i birokratski. Pitanja su tehnički OK ali atmosfera je formalna. Veze pomažu za zapošljavanje - to je javna tajna. Ako nemate strpljenja za čekanje, tražite drugdje.",
    duration_days: 55,
    helpful_count: 31,
    created_at: "2025-04-01T12:00:00Z",
    country_code: "BA",
    city: "Sarajevo",
  },

  // COMTRADE
  {
    id: "int-com-1",
    company_id: "comp-comtrade",
    company_slug: "comtrade",
    company_name: "Comtrade",
    job_title: "Java Developer",
    department: "Development",
    interview_date: "2025-06-10",
    difficulty: "medium",
    experience: "positive",
    got_offer: true,
    accepted_offer: true,
    application_method: "recruiter",
    interview_process: "Recruiter me našao na LinkedInu. Standardni proces: HR screening, tehnički intervju (Java, Spring, baze), cultural fit. Sve završeno u 2 tjedna.",
    questions: [
      "Razlika između HashMap i TreeMap",
      "Objasni Spring dependency injection",
      "Kako optimiziraš SQL upite?",
      "Projekt iz prošlosti koji te izazivao",
    ],
    tips: "Solidna firma za učenje. Intervju nije pretežak ako imate osnovno Java iskustvo. Pitajte na kojem projektu biste radili - kvaliteta varira ovisno o klijentu.",
    duration_days: 14,
    helpful_count: 19,
    created_at: "2025-07-01T10:00:00Z",
    country_code: "RS",
    city: "Beograd",
  },
];

export function getInterviewsByCompany(slug: string): InterviewExperience[] {
  return demoInterviews.filter(i => i.company_slug === slug);
}

export function getAllInterviews(): InterviewExperience[] {
  return demoInterviews;
}

export function getInterviewStats() {
  const total = demoInterviews.length;
  const positive = demoInterviews.filter(i => i.experience === "positive").length;
  const gotOffer = demoInterviews.filter(i => i.got_offer === true).length;
  const avgDuration = Math.round(demoInterviews.reduce((sum, i) => sum + i.duration_days, 0) / total);
  
  return {
    total,
    positiveRate: Math.round((positive / total) * 100),
    offerRate: Math.round((gotOffer / total) * 100),
    avgDuration,
  };
}
