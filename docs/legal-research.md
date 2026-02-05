# GAZDA — Legal Research: Anonymous Review Platforms in the EU/Balkans

*Compiled: 2026-02-05 by Leo*

## Executive Summary

Running an anonymous employer review platform in the EU is legally viable — Glassdoor operates across 25+ EU countries. However, EU law is stricter than US law (no Section 230 blanket immunity). GAZDA must comply with GDPR, the Digital Services Act, and local defamation laws in all 4 target markets. The key is: **proper moderation, transparent policies, and a good lawyer in Slovenia.**

---

## 1. EU Platform Liability Framework

### Digital Services Act (DSA) 2022
The DSA is the primary EU law governing online platforms. As a "hosting service," GAZDA benefits from **conditional liability protection**:

- ✅ **Not liable** for user-generated reviews *as long as* you don't have actual knowledge of illegal content
- ⚠️ **Must act expeditiously** to remove/disable illegal content once notified
- 📋 **Must have** a transparent notice-and-action mechanism
- 📋 **Must have** a complaints/appeals process for content moderation decisions
- 📋 **Must publish** content moderation reports (annually for platforms with <45M users)
- 📋 **Must provide** clear Terms of Service explaining moderation policies
- 🚫 **No obligation** to proactively monitor all content (no general monitoring obligation)

### Key Difference from US (Section 230)
- US: Near-absolute immunity for platforms → "safe harbor"
- EU: Conditional immunity → "notice-and-takedown" model
- EU platforms lose protection the moment they have knowledge of illegal content and don't act

### What This Means for GAZDA
- We CAN host anonymous reviews
- We MUST have a reporting mechanism (company can flag a review as defamatory)
- We MUST have a moderation team/process to review flagged content
- We MUST remove genuinely defamatory content promptly after being notified
- We SHOULD document all moderation decisions

---

## 2. Defamation Law by Country

### 🇸🇮 Slovenia
- **Civil defamation** under Obligacijski zakonik (Code of Obligations)
- Criminal defamation exists under Kazenski zakonik (Criminal Code), Art. 158-162
- Truth is generally a defense
- Reviews of companies (legal persons) have **lower protection** than reviews of individuals
- Slovenian Information Commissioner (IP RS) is the data protection authority
- **Risk level: MEDIUM** — Slovenia has strong EU alignment, generally business-friendly

### 🇭🇷 Croatia
- **Civil + Criminal defamation** under Kazneni zakon, čl. 149 (insult), čl. 147 (defamation)
- Criminal penalties include fines (rarely imprisonment in modern practice)
- Companies can sue for reputational damage
- AZOP is the data protection authority
- **Risk level: MEDIUM** — similar to Slovenia, but courts can be slower

### 🇷🇸 Serbia
- **Civil + Criminal defamation** under Krivični zakonik, čl. 170-172
- Criminal defamation was decriminalized in 2012, then partially reinstated
- Press and media have some additional protections
- Poverenik za zaštitu podataka is the data protection authority
- **Risk level: MEDIUM-HIGH** — less predictable court outcomes, weaker rule of law metrics

### 🇧🇦 Bosnia & Herzegovina
- **Civil + Criminal defamation** — varies by entity (FBiH vs. RS vs. Brčko)
- Defamation was decriminalized in FBiH (2002) and RS (2003) — civil only now
- AZLP (FBiH) and AzZLP (RS) for data protection
- **Risk level: MEDIUM-HIGH** — fragmented legal system, less predictable

### Key Takeaway
- **Truth is always a defense** — honest reviews based on real experiences are protected
- **Opinions are generally protected** — "The management is terrible" is opinion, not defamation
- **False statements of fact** are the risk — "The company commits tax fraud" without evidence
- GAZDA Score (1-10 rating) is opinion/aggregated data → well-protected

---

## 3. GDPR Compliance

### Data We Collect & Legal Basis

| Data | Subject | Legal Basis | Retention |
|------|---------|-------------|-----------|
| Reviewer email | Reviewer | Consent (Art. 6(1)(a)) | Until account deletion |
| Reviewer IP address | Reviewer | Legitimate interest (anti-abuse) | 90 days max |
| Review content | Reviewer + Company | Legitimate interest (public interest in workplace transparency) | Until review deleted |
| Company name, industry, location | Company (legal entity) | Legitimate interest | Indefinitely (public info) |
| Salary data (aggregated) | Reviewer | Consent | Anonymized immediately after aggregation |

### Key GDPR Requirements
1. **Privacy Policy** — must explain all data processing, available in HR/SI/SR
2. **Cookie consent** — required under ePrivacy Directive (analytics, ads)
3. **Right to erasure (Art. 17)** — reviewers can delete their reviews; BUT:
   - Exception: "freedom of expression and information" (Art. 17(3)(a))
   - Companies CANNOT force deletion of honest reviews under GDPR
4. **Data minimization** — only collect what's necessary
5. **Data Processing Records** — maintain Art. 30 records
6. **Data Protection Officer** — recommended (required if large-scale processing)
7. **Data breach notification** — 72 hours to DPA, without undue delay to users

### Anonymity vs. Accountability
- Glassdoor switched to requiring email verification (July 2024) — good practice
- We should require email verification but display reviews anonymously
- Store hashed emails for: duplicate prevention, moderation contact, legal subpoenas
- IP logging for: rate limiting, anti-spam, legal compliance (90-day retention)

### Cross-Border Data (4 countries)
- All 4 target countries have GDPR or GDPR-equivalent laws
- Slovenia & Croatia: EU members → full GDPR
- Serbia: Law on Personal Data Protection (2018) — modeled on GDPR
- Bosnia: Law on Protection of Personal Data (FBiH & RS) — partially aligned
- **Recommendation:** Treat all data as GDPR-compliant → covers all bases

---

## 4. How Glassdoor Handles Legal Challenges

### Their Approach
1. **User verification** — email required, identity not publicly shown
2. **Review screening** — reject ~20% of submissions (spam, fake, policy violations)
3. **Employer response** — companies can publicly respond to reviews (free)
4. **Enhanced Profiles** — paid tier for employers to add their own content (revenue)
5. **Legal defense of anonymity** — actively fights subpoenas to protect reviewer identity
6. **Community Guidelines** — clear rules about what's allowed
7. **Flagging system** — employers can flag reviews for policy violations

### Lawsuits Glassdoor Has Faced
- Multiple defamation suits from companies → mostly won on intermediary immunity
- Subpoenas to reveal reviewer identity → fought aggressively, often won
- GDPR complaints → adapted by requiring more verification in EU

### What We Should Copy
- Email verification (prevents spam, provides accountability)
- Employer response feature (reduces defamation risk — they can give their side)
- Clear Community Guidelines (sets expectations)
- Flagging + moderation pipeline (demonstrates good faith)
- Legal page bundle (ToS, Privacy, Content Policy)

---

## 5. Required Legal Pages

### Must-Have (MVP Launch)
1. **Terms of Service (Uvjeti korištenja)** — user obligations, liability limitations, content ownership
2. **Privacy Policy (Politika privatnosti)** — GDPR compliant, all data processing explained
3. **Cookie Policy (Politika kolačića)** — ePrivacy compliance
4. **Community Guidelines (Pravila zajednice)** — what's allowed, what's not, consequences
5. **Content Moderation Policy** — DSA requirement, how we handle reports
6. **Legal Notice / Imprint (Impressum)** — company registration, contact info (required in EU)

### Nice-to-Have (Phase 2)
7. **Copyright/DMCA Policy** — for image/content takedowns
8. **Employer FAQ** — how to claim profile, respond to reviews, report violations
9. **Law Enforcement Guidelines** — how we handle government/court requests

### All pages must be available in:
- 🇭🇷 Croatian (default)
- 🇸🇮 Slovenian
- 🇷🇸 Serbian (Latin script)

---

## 6. Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Defamation lawsuit from employer | HIGH | MEDIUM | Moderation, notice-and-takedown, employer response feature |
| GDPR complaint from reviewer | LOW | LOW | Proper privacy policy, deletion mechanism |
| GDPR complaint from company | MEDIUM | MEDIUM | Legitimate interest defense, only public company data |
| Fake/malicious reviews | HIGH | HIGH | Email verification, moderation, employment verification |
| Court order to reveal reviewer identity | MEDIUM | MEDIUM | Legal counsel, fight where possible, comply where required |
| Regulatory investigation (DPA) | LOW | HIGH | Full GDPR compliance from day 1 |

---

## 7. Recommended Actions

### Before Launch
1. ⚖️ **Hire a lawyer** in Slovenia specializing in internet/media law or e-commerce
   - Budget: €500-1,000 for initial consultation + legal page drafting
   - Look for: Law firms in Ljubljana with EU digital law experience
2. 📋 **Draft legal pages** (ToS, Privacy Policy, Community Guidelines) — lawyer reviews
3. 🔐 **Implement moderation system** — flag, review, decide, appeal pipeline
4. 📧 **Require email verification** for review submission
5. 🏢 **Build employer response feature** — reduces legal risk significantly
6. 📊 **Set up data processing records** (Art. 30 GDPR)
7. 🔔 **Register with Slovenian DPA** (IP RS) if required

### Company Registration
- **d.o.o. in Slovenia** is the right choice (cheapest, simplest in the region)
- Minimum capital: €7,500 (can be paid in installments)
- Registration at AJPES (Agency of the Republic of Slovenia for Public Legal Records)
- Consider using e-VEM portal (one-stop-shop for company registration)

### Ongoing
- Regular moderation review (at least weekly at launch)
- Annual DSA transparency report (if applicable)
- Keep privacy policy updated with any new data processing
- Monitor legal developments in all 4 markets

---

## 8. Bottom Line

**GAZDA is legally viable.** The EU provides a workable framework for review platforms. The main risks are manageable with proper moderation, transparent policies, and legal counsel. Glassdoor has proven the model works across 25+ EU countries.

**Cost to get legal right: ~€1,000-2,000** (lawyer consultation + legal page drafting)

**Biggest legal advantage:** Employer reviews serve the public interest (workplace transparency), which gives strong legal protection under both GDPR (legitimate interest) and defamation law (public interest defense).
