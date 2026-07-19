# Security

This document describes the security posture of the BSTS website and the
BSTS OS demonstration in this repository.

## Architecture (and why it is the security story)

The deployed product is a **fully static site** (`next build` with
`output: "export"`). There is no server runtime, no database, no
authentication system, no API endpoints, and no secrets in the deployment.
The attack surface is correspondingly small: static assets served from a CDN
(Cloudflare Pages).

- **No secrets exist in this project.** The only environment variable,
  `NEXT_PUBLIC_CONTACT_EMAIL`, is public by design and optional.
- **The assessment form is client-only.** Answers are validated with Zod in
  the browser and are never transmitted unless the visitor explicitly opens
  their own mail client (`mailto:`), copies text, or downloads a local file.
- **The BSTS OS demo holds state in memory only.** Nothing is written to
  cookies, localStorage, or any backend. Closing the tab destroys the state.
  JSON import is validated strictly against a Zod schema before it touches
  the store; malformed files are rejected with a reason.
- **No third-party runtime calls.** Fonts are self-hosted
  (`@fontsource-variable/*`); there are no analytics trackers, no external
  scripts, no CDN JavaScript.

## Secure development practices (OWASP-informed)

- TypeScript `strict` throughout; no `any`, no `@ts-ignore`.
- All external input paths (form fields, JSON import) are schema-validated
  at the boundary with Zod before use.
- No `dangerouslySetInnerHTML` with user-supplied content — the only usages
  render build-time JSON-LD literals generated from typed constants.
- Dependencies are limited to a small, mainstream set; `npm audit` is part
  of routine maintenance.
- ESLint (including React hooks rules) runs clean as a release gate.

## Honest-claims note

References in the site and in this repository to NIST CSF 2.0, SOC 2, OWASP,
and Zero Trust describe practices that **inform** the methodology. They do
not imply certification, accreditation, endorsement, or an audit opinion.
See `CLAIMS_REGISTER.md` — the claims policy is also enforced by an
automated test (`src/test/claims.test.ts`).

## Reporting a vulnerability

If you find a security issue in this site or the demo:

1. Please do not open a public issue with exploit details.
2. Contact BSTS through the contact page on the deployed site.
3. Include reproduction steps and the URL/commit affected.

You will receive an acknowledgment, and a fix will be prioritized ahead of
feature work. There is no bug bounty program at this time; credit will be
given gladly unless you prefer otherwise.
