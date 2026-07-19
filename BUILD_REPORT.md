# BSTS Build Report

**Date:** July 19, 2026 · **Version:** 0.1.0 · **Status:** Definition of done met

## What was built

One repository containing two connected products, exactly as specified:

1. **The BSTS public commercial website** — 13 routes (12 pages + custom 404),
   fully written final copy, dark organic design system, static-exported.
2. **BSTS OS MVP** — an 11-module interactive demonstration workspace at `/os`,
   seeded with the fictional Solara House hospitality engagement, with
   in-memory editing and Zod-validated JSON export/import/reset.

## Definition-of-done verification

| Requirement | Status | Evidence |
| --- | --- | --- |
| All required routes render | ✅ | 29 static routes in `out/`; every route smoke-tested over HTTP (200s, 404 for unknown paths) |
| Navigation works | ✅ | Desktop nav, mobile menu, OS sidebar + mobile drawer; active states via pathname |
| Mobile layout works | ✅ | Headless-Chromium check: zero horizontal overflow at 320px across 23 representative routes |
| Core copy complete | ✅ | No lorem ipsum, no "coming soon"; all copy centralized in `src/lib/content` |
| Hospitality demonstration interactive | ✅ | Full Solara House walk-through page + the same engagement living in BSTS OS (assessment → roadmap → projects → risks → decisions) |
| Security claims accurate | ✅ | Automated claims audit test + `CLAIMS_REGISTER.md`; disclaimer in footer, /security, and /terms |
| Contact flow works in zero-secret mode | ✅ | Form fully client-side; without `NEXT_PUBLIC_CONTACT_EMAIL` it offers copy + JSON download and states plainly that nothing can be transmitted |
| BSTS OS navigable and interactive | ✅ | 11 modules; stage/status edits, task add/toggle, roadmap add, filters, detail views, density toggle |
| JSON export/import/reset works | ✅ | Export downloads full state; import strictly Zod-validated with human-readable rejection reasons; reset is two-step (no accidental wipes) |
| No real client data | ✅ | Every person/company labeled "(fictional)"; enforced by a unit test |
| No paid dependency | ✅ | No backend, no APIs, no keys; fonts self-hosted; deploys to Cloudflare Pages free tier |
| Lint passes | ✅ | `npm run lint` — zero errors, zero warnings |
| Typecheck passes | ✅ | `npm run typecheck` — strict mode, no `any`/`@ts-ignore` |
| Tests pass | ✅ | `npm run test` — 22/22 (schemas, OS state integrity, claims audit, form behavior/accessibility) |
| Production build passes | ✅ | `npm run build` — static export, 29 routes |
| Deployment guide exists | ✅ | `DEPLOY_CLOUDFLARE.md` (Git-connected and direct-upload paths) |
| Build report exists | ✅ | This file |

## Decisions worth knowing about

- **Source-of-truth docs absent.** The `/docs` folder the prompt references was
  not in the workspace. Per the prompt's own precedence order, the master prompt
  served as the sole binding spec. Noted in `BUILD_STATUS.md`.
- **Static export over server runtime.** `output: "export"` guarantees free,
  portable Cloudflare Pages deployment with zero credentials. All dynamism is
  client-side, exactly as the spec's fallback clause allows.
- **Self-hosted fonts.** Google Fonts was unreachable from the build
  environment; `@fontsource-variable/inter` + `fraunces` are bundled instead —
  which also removes a third-party runtime dependency permanently.
- **OS state is memory-only on purpose.** No localStorage: closing the tab
  destroys demo state, which is the right privacy posture for a public
  demonstration labeled "do not enter real information."
- **The claims policy is executable.** `src/test/claims.test.ts` fails the
  build pipeline if prohibited certification language ever enters shipped
  source outside an explicit disavowal context.
- **No invented numbers anywhere.** Solara House carries no fictional revenue
  lifts or satisfaction scores; the demonstration shows the shape of the work
  and says so explicitly.

## What the founder still has to do (genuinely external)

1. Push the repository to GitHub and connect it to Cloudflare Pages
   (`DEPLOY_CLOUDFLARE.md`, ~5 minutes, no card).
2. After first deploy, set the real `*.pages.dev` URL in `src/lib/site.ts`.
3. Optionally set `NEXT_PUBLIC_CONTACT_EMAIL` in Pages settings to enable the
   form's email handoff.
4. Have counsel review `/privacy` and `/terms` (both are honest and usable
   today and marked as pending review).
5. If desired later: add verified Credly badge assets per
   `public/badges/README.md`.

## Verification artifacts

- Quality gates: lint ✅ · typecheck ✅ · test 22/22 ✅ · build ✅
- HTTP smoke test of all routes and required labels (concept-demonstration
  label, OS demo banner, skip link, sitemap, robots)
- 320px overflow scan across 23 routes — clean
- Desktop and mobile screenshots reviewed
