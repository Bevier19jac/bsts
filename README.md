# BSTS — Site + BSTS OS

The public website and interactive operations-workspace demonstration for
**Bevier Strategic Technology Solutions (BSTS)**, a boutique technology
transformation and secure AI implementation firm.

> **Keep what works. Connect what is disconnected. Automate what is
> repetitive. Build what is missing. Secure the foundation.**

## What is in this repository

| Area | Path | Description |
| --- | --- | --- |
| Marketing site | `src/app/(marketing)` | 12 fully written public routes + custom 404, dark organic design system |
| Assessment form | `src/components/assessment` | Multi-step technology assessment (RHF + Zod, client-only, zero-secret) |
| BSTS OS demo | `src/app/os`, `src/components/os`, `src/lib/os` | 11-module interactive workspace with fictional Solara House engagement data |
| Content library | `src/lib/content` | All copy centralized: pillars, method, industries, articles, founder, Solara House |
| Tests | `src/test` | Vitest suite incl. automated claims audit |

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Quality gates (all must pass)

```bash
npm run lint       # ESLint
npm run typecheck  # strict TypeScript
npm run test       # Vitest (22 tests, incl. claims audit)
npm run build      # static export → out/
```

## Zero-dollar architecture

The project is a **static export** (`output: "export"`): no server runtime,
no database, no auth, no paid services, no credentials of any kind. All
interactivity — the assessment form and the entire BSTS OS demo — is
client-side with typed local data and JSON import/export. Fonts are
self-hosted. Deployment target is Cloudflare Pages' free tier
(see `DEPLOY_CLOUDFLARE.md`); the `out/` folder is portable to any static
host.

## Honesty constraints (load-bearing)

- **Solara House is fictional.** Every appearance is labeled
  "CONCEPT DEMONSTRATION — NOT A CLIENT CASE STUDY". No invented metrics.
- **Claims are precise.** "NIST-aligned", "SOC 2 readiness support",
  "OWASP-informed" — never "certified", "compliant", or "approved".
  See `CLAIMS_REGISTER.md`; enforced by `src/test/claims.test.ts`.
- **The OS demo is labeled a demonstration environment** and holds state in
  browser memory only.
- **The contact form never claims delivery it cannot verify** — in
  zero-config mode it says so plainly and offers copy/download instead.

## Key documents

- `DEPLOY_CLOUDFLARE.md` — free deployment, step by step
- `SECURITY.md` — posture, practices, vulnerability reporting
- `CLAIMS_REGISTER.md` — every public claim, classified
- `BUILD_STATUS.md` / `BUILD_REPORT.md` — build checklist and completion report
- `CHANGELOG.md` — release history
- `public/badges/README.md` — how to add verified credential badges later

## Stack

Next.js (App Router, static export) · TypeScript strict · Tailwind CSS v4 ·
Framer Motion · Lucide · Zod · React Hook Form · Vitest · npm
