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
