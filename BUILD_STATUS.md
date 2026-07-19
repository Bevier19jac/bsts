# BSTS Build Status

> Checklist for the BSTS site + BSTS OS build. **All items complete** — see
> `BUILD_REPORT.md` for the completion report.

**Note on source-of-truth documents:** the `/docs` folder referenced by the master
execution prompt (`README_FIRST.md`, `BSTS_MASTER_PLAN.md`, etc.) was not present in
this workspace at build time. Per the stated precedence order, the master execution
prompt itself is the highest-priority requirement source and has been treated as the
sole binding specification.

## Phase 1 — Foundation
- [x] Inspect workspace; confirm `/docs` absent, master prompt is binding spec
- [x] Initialize Next.js (App Router, TypeScript strict, Tailwind v4, ESLint, npm)
- [x] Install framer-motion, lucide-react, zod, react-hook-form, @hookform/resolvers
- [x] Install vitest + testing-library toolchain
- [x] Static-export config for Cloudflare Pages (`output: "export"`)
- [x] Design tokens (obsidian/graphite, warm white, cyan + gold, large radii)
- [x] Self-hosted variable fonts (Inter + Fraunces via @fontsource — Google Fonts
      CDN unreachable at build time; self-hosting is also the more portable choice)
- [x] Motion primitives (scroll reveals, pointer halo, reduced-motion safe)
- [x] Surface primitives (organic asymmetric radii, curved dividers, glow fields)

## Phase 2 — Marketing site
- [x] Root layout: fonts, metadata, skip link, Organization JSON-LD
- [x] `/` homepage (all 10 required sections)
- [x] `/solutions` (five pillars, full detail)
- [x] `/industries` (six industries, hospitality featured)
- [x] `/industries/hospitality` (Solara House concept demonstration, labeled)
- [x] `/method` (five stages with deliverables)
- [x] `/security` (accurate claims, text-based credential components, disclaimer)
- [x] `/about` (exact founder credentials, no-endorsement note)
- [x] `/insights` + 3 complete original articles with Article JSON-LD
- [x] `/contact` (multi-step assessment form)
- [x] `/privacy`, `/terms` (honest, usable, marked pending legal review)
- [x] Custom 404
- [x] sitemap.xml, robots.txt

## Phase 3 — BSTS OS MVP
- [x] OS shell (distinct visual system, sidebar, mobile nav, density toggle)
- [x] 11 modules: Overview, Prospects, Clients, Assessments, Roadmaps, Projects,
      Risks, Automations, Documents, Decisions, Settings
- [x] Permanent banner: "Demonstration environment — do not enter real client or
      sensitive information."
- [x] In-memory editing: prospect stage, project status, risk status, decision
      status, automation pause/resume, task toggle/add, roadmap recommendation add
- [x] Filters on Prospects (stage) and Projects (status)
- [x] Assessment detail view and project detail view
- [x] JSON export / Zod-validated import (with error reasons) / two-step reset
- [x] Solara House fictional engagement seed; every person/company labeled fictional

## Phase 4 — Quality & docs
- [x] Vitest suite: 22 tests across 4 files (schema, OS state integrity,
      claims audit, form accessibility/behavior)
- [x] `.env.example`, `README.md`, `DEPLOY_CLOUDFLARE.md`, `SECURITY.md`,
      `CLAIMS_REGISTER.md`, `CHANGELOG.md`, `/public/badges/README.md`
- [x] `npm run lint` — passes, zero warnings
- [x] `npm run typecheck` — passes
- [x] `npm run test` — 22/22 pass
- [x] `npm run build` — 29 static routes exported
- [x] Claims audit — automated test + manual grep (no prohibited language,
      no "Wander" references)
- [x] 320px overflow check — all 23 representative routes clean (verified in
      headless Chromium)
- [x] Visual verification screenshots (desktop + mobile)
- [x] `BUILD_REPORT.md`
