# GAZDA — Project Roadmap & Business Plan

## Vision
The Glassdoor of the Balkans. Transparent employer reviews, salary data, and the unique GAZDA Score to fight workplace abuse in the region.

## Target Markets (Launch)
- 🇸🇮 Slovenia (HQ & first market)
- 🇭🇷 Croatia
- 🇷🇸 Serbia
- 🇧🇦 Bosnia & Herzegovina

## Phase 1: Foundation (Weeks 1-4)
### Business
- [ ] Register d.o.o. in Slovenia
- [ ] Open business bank account
- [ ] GDPR compliance framework
- [ ] Terms of Service & Privacy Policy (multi-language)
- [ ] Legal review: defamation liability, anonymous review protection

### Tech
- [ ] Choose tech stack (Next.js + Supabase recommended)
- [ ] Set up Git repository (GitHub/GitLab)
- [ ] Domain registration (gazda.io / gazda.si / gazda.hr)
- [ ] CI/CD pipeline
- [ ] Design system & brand guide

## Phase 2: MVP Build (Weeks 5-10)
### Core Features
- [ ] User auth (email + social login)
- [ ] Company profiles (auto-generated from business registries)
- [ ] Anonymous review system with verification
- [ ] GAZDA Score algorithm
- [ ] Salary reporting & aggregation
- [ ] Multi-language support (HR, SI, SR)
- [ ] Search & filtering
- [ ] Responsive mobile-first design

### Infrastructure
- [ ] Database schema & migrations
- [ ] API design (REST or GraphQL)
- [ ] Image/file storage (company logos)
- [ ] Email system (verification, notifications)
- [ ] Rate limiting & spam prevention

## Phase 3: Pre-Launch (Weeks 11-13)
- [ ] Content seeding (initial reviews from network)
- [ ] SEO setup (meta tags, sitemap, structured data)
- [ ] Social media accounts (Instagram, LinkedIn, TikTok)
- [ ] Landing page with waitlist
- [ ] Beta testing with 20-50 users
- [ ] Legal final review
- [ ] Analytics setup (privacy-respecting)

## Phase 4: Launch (Week 14)
- [ ] Public launch in Slovenia first
- [ ] PR push (tech blogs, HR communities)
- [ ] Reddit/social media campaign
- [ ] Roll out to Croatia, Serbia, BiH

## Phase 5: Growth (Months 4-12)
- [ ] Employer dashboard (claim company, respond to reviews)
- [ ] Job posting system (monetization #1)
- [ ] Premium employer profiles (monetization #2)
- [ ] Mobile app (React Native)
- [ ] Review verification system
- [ ] Community features (forums, Q&A)
- [ ] Expansion: North Macedonia, Montenegro, Kosovo

## Revenue Model
1. **Sponsored Job Listings** — employers pay for visibility (€50-200/month)
2. **Premium Employer Profiles** — enhanced pages, review response (€100-300/month)
3. **Recruitment Tools** — access to candidate database (future)
4. **Advertising** — targeted banner ads (future)

## Key Metrics to Track
- Monthly Active Users (MAU)
- Reviews submitted per month
- Companies with 3+ reviews
- Job applications through platform
- Employer sign-ups

## Tech Stack (Recommended)
- **Frontend:** Next.js 14+ (React, SSR for SEO)
- **Backend:** Next.js API routes + Supabase
- **Database:** PostgreSQL (via Supabase)
- **Auth:** Supabase Auth (email, Google, GitHub)
- **Storage:** Supabase Storage (logos, attachments)
- **Hosting:** Vercel (frontend) — free tier to start
- **Domain:** Cloudflare (DNS + protection)
- **Analytics:** Plausible (privacy-first)
- **Email:** Resend or Postmark

## Budget Estimate (Year 1)
- Company registration: €500-1,000
- Domain (3 domains): €100/year
- Hosting (Vercel Pro): €20/month = €240/year
- Database (Supabase Pro): €25/month = €300/year
- Legal (lawyer): €500-1,000
- Marketing: €0-500 (organic first)
- **Total Year 1: ~€1,500-3,000**
