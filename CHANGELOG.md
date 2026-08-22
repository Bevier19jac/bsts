# Changelog

All notable changes to the BSTS site + BSTS OS project.

## [0.6.2] — 2026-08-22

### Fixed

- Muzzle flash no longer buries the end of the gun tube toward the bore
  evacuator on any surface (homepage hero, both brochure covers and the
  brochures' inside-spread band, and the Open Graph share card). The
  blast bitmaps' "attach point" — the fraction of each bitmap's own width
  pinned to the tank's measured muzzle — was a spot already fully opaque
  in the bitmap's own alpha, which buried a solid slab of fire over the
  gun tube. A first pass moved the attach point to each bitmap's own
  first column with any alpha above 20/255; that stopped the burial but
  the flash was too faint there to read as fire, so composited against
  the tank's own masked, anti-aliased muzzle tip it left a visible dark
  notch between metal and flame instead of one continuous shot. The
  attach point is now where each bitmap's own peak-alpha-per-column ramp
  clears roughly a third of full opacity — verified empirically by
  compositing tank and blast at that fraction and confirming no
  near-background row separates them, on every affected surface. Only
  the combustion's own already-substantial edge touches the muzzle now:
  not the bare, near-invisible haze the first pass left, and not the
  fully-opaque slab the original bug buried the tube in. The Open Graph
  card additionally had its own, independently-tuned attach point (27.06%
  of its blast bitmap, deeper into the fireball than either the hero or
  the brochures ever used) brought onto the same measured standard. The
  dart's position on every affected surface shifted with its blast by the
  same horizontal amount, so it stays correctly seated on the tracer;
  its own vertical centreline was independently re-verified against the
  bore axis on every surface after each shift. `qa-lockup.mjs`'s two
  checks that previously required the dense fire to begin measurably
  behind the bore exit now require the opposite: dense fire at or just
  past the bore exit, never buried and never floating clear of it.

## [0.6.1] — 2026-08-21

### Changed

- Removed sabot-petal and separation-event visual language from the active
  website and brochure systems, replacing it with a single intact
  fin-stabilized dart while preserving the established tank and
  muzzle-flash treatment. Historical changelog entries and previously
  approved print deliverables remain unchanged.

## [0.6.0] — 2026-08-11

Strategic repositioning: **Secure the data. Enable the AI. Prove the controls.**

BSTS is no longer presented as a general AI automation consultancy. The site
now positions the firm at the intersection of AI, automation, cybersecurity,
AI governance, compliance, and continuous assurance, aimed at organizations
of roughly 20–250 people.

### Added

- `src/lib/content/positioning.ts` — single source for the three service
  areas, buyer-language triggers, the four-stage engagement model, the
  Value/Risk/Controls/Assurance gate, the continuous assurance pipeline, the
  common control framework, advisor referral content, the federal R&D
  thesis, and the Abrams firing-sequence brand definition.
- `/assurance` — the differentiator page. Contrast against questionnaire-and-
  screenshot compliance, the six-step evidence pipeline, the common control
  framework (one control mapped to many frameworks), and an explicit note
  that the platform is a direction rather than a shipping product.
- `/advisors` — referral field guide for consultants, fractional executives,
  CPAs, MSPs, and attorneys: the recognition list, what BSTS would do for
  their client, what happens after an introduction, and how BSTS complements
  rather than competes with their relationship.
- **"You may need BSTS if…"** section on the homepage — eight triggers written
  in the client's own voice, each mapped to a service area.
- **The firing sequence as explained brand identity** (`FiringSequence.tsx`
  plus `.sequence-rail` CSS): M1 Abrams → main-gun firing → sabot separation
  → tracer to target, communicating disciplined system → precise action →
  controlled delivery → measurable effect. The tracer terminates in the
  cyan "proof" accent, tying the mark to the third line of the positioning.
- `founder.arc` — the technology → cybersecurity → AI → governance → secure
  implementation path, rendered on the About tab.
- 12 new automated claims tests (41 → 53 total).

### Changed

- Homepage hero is now the strategic line, color-coded across three lines,
  with the Abrams/wordmark/tracer lockup preserved pixel-for-pixel.
- Three primary service areas replace the five pillars as the top-level
  hierarchy; the five delivery lanes survive as implementation detail on
  `/method` and `/solutions`.
- `/method` restructured around Discover → Implement → Govern → Assure.
- `/government` gains a federal continuous-assurance section and an SBIR/STTR
  research direction that explicitly disclaims any award.
- Veteran wording moves to "Service-Disabled Veteran-Owned & Operated"
  throughout, still driven by `vetCertStatus`.
- Navigation, footer (now four columns), sitemap, metadata, and JSON-LD
  updated for the new page set and keyword set.
- Offers reframed to Discover / Implement / Govern & Assure.

### Fixed

- Capability-statement sheet no longer forces horizontal scroll on phones:
  `.cs-badge` nowrap (which keeps the VetCert badge on one line at letter
  width) is now released below 640px. Print geometry is unaffected.

### Claims

- New mandatory boundary: **BSTS does not issue SOC 2 reports.** Enforced by
  a test that fails any page marketing SOC 2 work without rendering it.
- New prohibitions: SOC 2 attestation/auditor language, framework
  certification claims, SBIR/STTR award claims, and present-tense continuous
  assurance platform claims.
- "In process" / "in progress" VetCert wording is prohibited while the status
  is `planned`, because both imply a filing that does not yet exist.

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
