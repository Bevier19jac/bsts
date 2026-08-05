# Changelog

All notable changes to the BSTS site + BSTS OS project.

## [0.1.0] — 2026-07-19

Initial same-day build.

### Added

- **Marketing site** (static export, dark organic design system):
  `/`, `/solutions`, `/industries`, `/industries/hospitality`, `/method`,
  `/security`, `/about`, `/insights` (+3 complete original articles),
  `/contact`, `/privacy`, `/terms`, custom 404.
- **Solara House** fictional hospitality concept demonstration, labeled
  "CONCEPT DEMONSTRATION — NOT A CLIENT CASE STUDY" everywhere it appears.
- **Multi-step technology assessment form** — React Hook Form + Zod,
  progress indicator, review step, copyable summary, JSON download,
  optional `mailto:` handoff via `NEXT_PUBLIC_CONTACT_EMAIL`; fully
  functional with zero environment variables and honest messaging in
  local/demo mode.
- **BSTS OS MVP** at `/os` — 11 modules (Overview, Prospects, Clients,
  Assessments, Roadmaps, Projects, Risks, Automations, Documents,
  Decisions, Settings), fictional Solara House engagement data, in-memory
  editing (stage/status changes, task toggles, add task, add roadmap
  recommendation), filters on prospects and projects, assessment and
  project detail views, Zod-validated JSON export/import, seed reset,
  density toggle, mobile navigation, permanent demonstration-environment
  banner.
- **Design system** — obsidian/graphite tokens, warm-white type
  (self-hosted Inter + Fraunces variable fonts), restrained cyan and gold
  accents, organic asymmetric radii, curved section dividers, atmospheric
  CSS glow fields, scroll reveals and pointer halo with full
  reduced-motion support.
- **Quality gates** — ESLint, strict TypeScript, Vitest suite (22 tests)
  including an automated claims audit, static production build.
- **SEO/metadata** — per-route metadata, sitemap.xml, robots.txt,
  Organization and Article JSON-LD.
- **Documentation** — README, DEPLOY_CLOUDFLARE, SECURITY,
  CLAIMS_REGISTER, BUILD_STATUS, BUILD_REPORT, `.env.example`,
  `public/badges/README.md`.

### Security

- Zero-secret architecture: no backend, no cookies, no persistent browser
  storage, schema-validated JSON import, no third-party runtime scripts.

## [0.2.0] — 2026-08-03

### Changed

- Restructured as a **single-page landing experience**: one page with five
  tabs (Overview, Services, How we work, About, Assessment) and the
  technology assessment inline. Header and footer navigate via tab anchors
  (e.g. `/#assessment`); deep links land on the right tab.
- Sitemap trimmed to the landing page, BSTS OS demo, and legal pages.
- Former standalone routes remain live and shareable but are no longer in
  primary navigation.

## [0.3.0] — 2026-08-04

### Added

- **Veteran identity system**: founder's Abrams render in the hero;
  APFSDS firing sequence on page load (muzzle flash → tracer directly off
  the gun tube underlining the company name → discarding sabot petals
  after SOLUTIONS → BSTS revealed atop a finned lawn-dart penetrator with
  impact flash); tracer-rule motif under panel headings; service-photo
  gallery ("From the physical battlefield to the digital battleplan");
  professional founder headshot; SDVOSB star block with precise
  "certification in progress" wording (claims-audit enforced).
- **Direct assessment delivery**: one-click "Send to BSTS" via Web3Forms
  (free tier) with sending/sent/error states; mailto fallback;
  copy/download retained. No secrets — the access key is a public
  routing token.
- "How we work" restored as a standalone page; landing tabs reduced to
  Overview / Services / About / Assessment.

### Changed

- All BSTS self-descriptions de-boutiqued ("veteran-owned technology
  transformation and secure AI implementation firm"); hero eyebrow now
  "Secure AI · Intelligent Automation · Connected Systems".
- Experience credential (superseded in v0.5.1): "more than 16 years serving federal missions" (formerly worded as civilian
  and senior operational leader."

## 0.4.0 — Production-quality final pass

- Hero compressed ~30%: headline and primary CTA now inside the first
  viewport at 1366×768; tank repositioned hard-left so the centered
  wordmark is fully underlined by the tracer from the muzzle; new
  intentional mobile composition (uncropped tank + centered lockup).
- Brand repetition reduced: header carries the compact BSTS mark only; the
  hero holds the single full-name treatment.
- SDVOSB language corrected and centralized: `vetCertStatus` in
  src/lib/site.ts ("planned" / "submitted" / "certified") drives all public
  wording; "certification in progress" is now a prohibited phrase until an
  application is actually filed (claims-audit enforced).
- Founder credentials exact: "Bachelor of Science in Computer Science with
  a Cybersecurity major, Magna Cum Laude"; combat veteran, First Sergeant,
  Senior Instructor, Abrams Tank Master Gunner; buyer-benefit framing.
- Services rewritten cross-industry (CRM, ERP, ticketing, approval
  workflows, compliance evidence); hospitality detail lives only inside the
  labeled Solara House demonstration; per-pillar outcome line, realistic
  example, and accessible "Good fit when…" disclosures.
- Three commercial engagement offers (Assessment / 30-Day Sprint / Secure
  AI Transformation) with centralized pricing language.
- Assessment: sensitive-data notice, honeypot anti-spam, browser-computed
  preliminary read on review (labeled as preliminary), centralized
  response-time promise, broader industry list.
- Timeline claims qualified ("can often be delivered in weeks, with scope
  and dependencies defined upfront"); claims audit extended.
- Accessibility: one logical H1 on every page, roving-focus arrow-key tab
  navigation, native disclosures, favicon added, canonical URLs.
- New LAUNCH_CHECKLIST.md manual production test checklist.

## 0.5.0 — Government / federal business development section

- New "Government" navigation entry (desktop, mobile, footer, sitemap) and
  a dedicated /government page: federal hero, positioning for agencies and
  primes, four core capabilities (AI readiness & governance, secure
  knowledge systems, cybersecurity & evidence automation, mission workflow
  automation) each with outcome, representative deliverables, disclosure
  for more, and an honest boundary statement.
- "Why BSTS" founder-value section, three federal engagement paths, and a
  configuration-driven Acquisition Profile that HIDES unissued identifiers
  (no public placeholders) with an honest status line.
- Print-friendly one-page capability statement at
  /government/capability-statement (browser print → PDF; letter-sized,
  verified single page).
- Federal contact form: organization/opportunity types, CUI/classified
  warning, honeypot, honest delivery states.
- Claims audit extended: certified-state wording confined to site.ts,
  federal prohibited phrases (guaranteed award, prequalified, cleared
  company, FedRAMP/CMMC certified, …), public-placeholder scan; 11 new
  tests (38 total).
- Share card (og.png) recomposed: fully centered lockup.
- FEDERAL_LAUNCH_CHECKLIST.md documents every founder action (LLC, EIN,
  SAM, UEI, CAGE, VetCert, NAICS/PSC) and where each value gets entered.

## 0.5.1 — Corrective QA pass

- Experience wording corrected everywhere to the approved statement:
  "More than 16 years serving federal missions through military
  leadership and civilian cybersecurity work." Old "17+ years" phrasing
  is now test-banned.
- Formation status centralized (formationStatus: pre_formation | formed).
  Pre-formation shows "Company name" with no LLC claim; "Legal business
  name" appears only once the filing is approved (test-enforced).
- Federal contact display centralized: until a business-domain email is
  configured, the capability statement and acquisition profile show
  "Contact: bevierstrategic.pages.dev/government" instead of a personal
  Gmail address; the federal form's failure text no longer prints it.
- Government hero entrance sped up (quick reveal variant): H1 readable
  ~750ms from navigation start including hydration, CTAs ~880ms.
  Homepage animations untouched.
- Reduced motion now snaps all Reveal content to visible instantly (no
  0.7s fade).
- 41 unit tests, 27 browser QA checks, one-page print verified in both
  browser-margin modes.
