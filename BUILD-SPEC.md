# GAZDA — Build Specification

## What Is This?
A Glassdoor/Indeed-style employment platform for the Balkans region. The name "Gazda" means "boss/owner" in Balkan languages — it's a power word that bad bosses make employees use. We're reclaiming it to give workers transparency and power.

## Mission
Stop abusive workplace practices in the Balkans by giving workers a platform to anonymously rate and review companies and bosses. Job seekers can make informed decisions before accepting offers.

## Indeed's Business Model (Reference)
**How Indeed makes money:**
1. **Sponsored Jobs (Pay-per-click)** — Employers pay to boost job listings visibility ($0.10-$5+ per click)
2. **Premium Job Postings** — Enhanced listings with company branding ($250-$500/month)
3. **Resume Database Access** — Employers pay to search/contact candidates ($100-$300/month)
4. **Indeed Hire** — Full recruitment service (15-25% of first-year salary)
5. **Company Pages** — Branded employer profiles (premium feature)

**Indeed's key features:**
- Job search with location/keyword filters
- Company reviews & ratings (1-5 stars)
- Salary comparisons by role/location
- Resume upload & job applications
- Employer dashboard for posting/managing jobs

**Gazda's revenue model (to show on the site):**
1. Sponsored job listings (employers pay for visibility)
2. Premium employer profiles (enhanced company pages)
3. Recruitment tools (resume access)
4. Advertising (banner ads, job alerts)

## Tech Requirements
- **100% static site** — HTML + CSS + JavaScript only
- **Single Page Application** using hash routing (#/home, #/companies, #/jobs, etc.)
- **All in ONE index.html file** (inline CSS + JS) for easy deployment
- **localStorage** for persisting user-submitted reviews and data
- **Responsive** — must look great on mobile (Alen checks on phone)
- **No external dependencies** — no CDN links, no frameworks, everything self-contained
- **Demo data** pre-loaded with realistic Balkan companies

## Color Theme
- **Primary:** Deep Teal `#0D7377` (trust, fresh, different from Indeed's blue)
- **Secondary:** Warm Amber `#F5A623` (energy, warmth, call-to-action)
- **Accent:** Coral Red `#E74C3C` (warnings, bad ratings)
- **Success:** Green `#27AE60`
- **Background:** Light gray `#F8F9FA`
- **Text:** Dark `#2C3E50`
- **Cards:** White `#FFFFFF` with subtle shadows

## Language Support
Three languages with a switcher in the header:
- 🇭🇷 **Hrvatski** (Croatian) — default, also covers Bosnian
- 🇸🇮 **Slovenščina** (Slovenian)
- 🇷🇸 **Srpski** (Serbian, Latin script)

Implement a `translations` object in JS. All visible text must come from this object. Language stored in localStorage.

## Pages/Routes

### 1. HOME (#/home or #/)
**Layout:**
- **Hero section:** Large search bar with "Pronađi firmu ili posao" (Find company or job), location dropdown (Ljubljana, Zagreb, Beograd, Sarajevo + more cities), Search button
- **Tagline:** "Saznaj istinu prije nego prihvatiš posao" (Know the truth before you accept the job)
- **Stats bar:** "15,847 recenzija | 3,241 tvrtki | 4 države" (animated counters)
- **How it works:** 3-step section with icons (1. Search company 2. Read reviews 3. Decide)
- **Recently reviewed companies:** 6 cards showing company name, rating, industry, recent review snippet
- **Top rated companies:** Horizontal carousel/scroll of best-rated companies
- **"Worst rated" section:** "Kompanije s najgorim ocjenama" — 3 cards showing lowest-rated companies (this is the Gazda differentiator — transparency about bad employers)
- **CTA section:** "Podijeli svoje iskustvo" (Share your experience) — button to write review
- **Footer:** Links, countries, languages, about, contact

### 2. COMPANIES (#/companies)
**Layout:**
- **Filter bar:** Country dropdown, City dropdown, Industry dropdown, Rating filter (1-5), Sort by (rating/reviews/newest)
- **Search bar:** Search by company name
- **Company cards grid (3 columns, responsive):**
  - Company name + logo placeholder (colored circle with initials)
  - Overall rating (stars + number)
  - Industry tag
  - Location (city, country)
  - Number of reviews
  - One-line recent review excerpt
  - "Pogledaj profil" (View profile) button
- **Pagination** at bottom

### 3. COMPANY PROFILE (#/company/:id)
**Layout — tabs:**
- **Header:** Company name, logo placeholder, industry, location, overall rating (large), "Napiši recenziju" (Write review) button
- **Rating breakdown:**
  - Overall: ★★★★☆ 3.8
  - Upravljanje (Management): ★★★☆☆ 3.2
  - Kultura (Culture): ★★★★☆ 3.7
  - Plaća (Salary): ★★★☆☆ 2.9
  - Ravnoteža (Work-life balance): ★★★★☆ 3.5
  - Razvoj (Career growth): ★★★☆☆ 3.0
  - **GAZDA SCORE:** Special big badge 1-10 — "Kako se gazda ponaša?" (How does the boss behave?)
    - 1-3: Red badge "IZBJEGAVAJ" (Avoid)
    - 4-5: Orange badge "OPREZ" (Caution)
    - 6-7: Yellow badge "OK"
    - 8-10: Green badge "PREPORUČENO" (Recommended)
- **Tab: Recenzije (Reviews)** — List of anonymous reviews with:
  - Title, date, rating stars
  - Pros (Prednosti), Cons (Nedostaci), Advice to management (Savjet upravi)
  - "Helpful" button with count
  - Position held + employment status (current/former)
- **Tab: Plaće (Salaries)** — Salary ranges by position
- **Tab: Poslovi (Jobs)** — Active job listings at this company
- **Tab: O firmi (About)** — Company info (size, year founded, industry, website)

### 4. JOBS (#/jobs)
**Layout:**
- **Search bar:** Job title/keyword + Location
- **Filters sidebar:** Country, City, Industry, Job type (Full-time/Part-time/Contract), Salary range, Company rating (minimum), Posted date
- **Job listing cards:**
  - Job title
  - Company name + rating badge
  - Location
  - Salary range (if available)
  - Job type
  - Posted date
  - Short description (2 lines)
  - "Prijavi se" (Apply) button
- **Job detail modal/page:** Full description, requirements, benefits, company widget with rating

### 5. SALARIES (#/salaries)
**Layout:**
- **Search:** Role title search + location
- **Popular roles grid:** Cards showing average salary for common positions
- **Salary comparison table:** Role, Average salary, Range (min-max), Number of reports, Location
- **"Prijavi plaću" (Report salary) button** — form to anonymously submit salary data

### 6. WRITE REVIEW (#/review)
**Layout — multi-step form:**
- **Step 1:** Select or search company (autocomplete from demo data)
- **Step 2:** Your position, employment status (current/former), employment dates
- **Step 3:** Ratings — 6 categories (Management, Culture, Salary, Work-life balance, Career growth, Overall) + GAZDA SCORE (1-10 slider)
- **Step 4:** Written review — Title, Pros, Cons, Advice to management
- **Step 5:** Confirm + Submit (stores to localStorage)
- Show success message: "Hvala! Tvoja recenzija pomaže drugima." (Thanks! Your review helps others.)

### 7. POST JOB (#/post-job) — Employer side
**Layout:**
- Form: Company name, Job title, Location, Job type, Salary range, Description, Requirements, Benefits, Contact email
- Preview before posting
- Stores to localStorage
- Note: "Sponzorirani oglas? Kontaktirajte nas za premium vidljivost." (Sponsored ad? Contact us for premium visibility.)

### 8. ABOUT (#/about)
**Layout:**
- **Mission statement:** Why Gazda exists — fighting workplace abuse in the Balkans
- **The problem:** Companies playing by their own rules, unpaid overtime, abusive bosses, workers with no voice
- **The solution:** Transparent reviews, salary data, boss ratings
- **Countries:** 🇸🇮 Slovenia 🇭🇷 Croatia 🇷🇸 Serbia 🇧🇦 Bosnia & Herzegovina
- **How to contribute:** Write a review, report salary, share with friends
- **Future plans:** Mobile app, more countries, verified reviews

## Navigation Bar
- Logo: "GAZDA" in bold font + flame/shield icon (CSS-only)
- Links: Početna (Home) | Tvrtke (Companies) | Poslovi (Jobs) | Plaće (Salaries) | Napiši recenziju (Write Review)
- Right side: Language switcher (HR/SI/SR) | Za poslodavce (For Employers)
- Sticky header, white background, subtle bottom shadow
- Mobile: hamburger menu

## Demo Data Requirements
Create realistic demo data with 20+ companies across all 4 countries:

**Slovenia:**
- Mercator d.d. (retail), Ljubljana — rating 3.2
- Krka d.d. (pharma), Novo Mesto — rating 4.1
- Gorenje (appliances), Velenje — rating 3.5
- Petrol d.d. (energy), Ljubljana — rating 3.8
- Lek d.d. (pharma), Ljubljana — rating 4.0

**Croatia:**
- Konzum (retail), Zagreb — rating 2.8
- Rimac (automotive), Zagreb — rating 4.5
- Infobip (tech), Zagreb — rating 4.2
- Podravka (food), Koprivnica — rating 3.6
- Đuro Đaković (industrial), Slavonski Brod — rating 2.4

**Serbia:**
- Telekom Srbija, Beograd — rating 2.9
- Nelt Group (distribution), Beograd — rating 3.4
- Nordeus (gaming), Beograd — rating 4.3
- Comtrade (tech), Beograd — rating 3.7
- MK Group (agri), Novi Sad — rating 3.1

**Bosnia & Herzegovina:**
- BH Telecom, Sarajevo — rating 3.0
- ASA Group (auto), Sarajevo — rating 3.3
- Prevent Group (textile), Visoko — rating 2.6
- Bekto Precisa (manufacturing), Goražde — rating 3.8
- Bingo (retail), Tuzla — rating 2.7

Each company needs:
- 3-5 reviews with realistic text (in the local language variant)
- Salary data for 3-5 positions
- 1-2 job listings
- All rating categories filled
- Gazda Score

**Review examples should include:**
- Realistic Balkan workplace issues: unpaid overtime, nepotism, "gazda" mentality, favoritism
- Also positive reviews: good companies exist too (Rimac, Infobip, Nordeus)
- Written in natural Croatian/Serbian/Slovenian (not Google Translate quality)

## Demo Job Listings (15+)
Mix of positions across countries: developers, accountants, sales reps, warehouse workers, drivers, marketing managers, etc.

## Visual Design Notes
- **Modern, clean, professional** — not a template look
- Cards with `border-radius: 12px`, subtle `box-shadow`
- Smooth transitions on hover states
- Star ratings in gold `#F5A623`
- Rating badges: colored pills (green for good, red for bad)
- Gazda Score: large circular badge, color-coded
- Company "logos": Colored circles with company initials (CSS-generated)
- Icons: Use Unicode/emoji for icons (🏢 📊 💰 ⭐ 📍 etc.)
- Smooth scroll behavior
- Loading skeletons would be nice but not required

## Important Details
- **Anonymous reviews only** — no login required to read, localStorage "session" for writing
- **All text from translations object** — no hardcoded Croatian/Slovenian/Serbian strings in HTML
- **The GAZDA SCORE is the star feature** — make it visually prominent and unique
- **Mobile-first responsive** — looks perfect on phone screens
- **Search must work** — filtering and searching companies/jobs must function
- **Language switching must work** — changing language updates ALL text on the page immediately
- **Reviews saved to localStorage** — writing a review adds it to the company's review list
- **Country flags** in dropdowns and filters: 🇸🇮 🇭🇷 🇷🇸 🇧🇦

## File Output
Write everything to: `/home/clawd/clawd/projects/gazda/index.html`
Single file, all CSS and JS inlined.
Target size: whatever it takes to be complete and functional. Quality > size.

## Quality Checklist
- [ ] All 8 routes work and display correct content
- [ ] Language switcher changes ALL text
- [ ] Company search/filter works
- [ ] Job search/filter works
- [ ] Write Review form works and saves to localStorage
- [ ] Company profile shows reviews, ratings, Gazda Score
- [ ] Responsive: looks good at 375px (phone), 768px (tablet), 1200px+ (desktop)
- [ ] No JavaScript errors in console
- [ ] Demo data is realistic and in correct languages
- [ ] Color theme is consistent throughout
- [ ] Navigation works on all pages
- [ ] Back/forward browser buttons work with hash routing
