# BSTS production test checklist (manual)

Run this after any deploy that touches the assessment, contact behavior, or
business facts. Takes ~10 minutes. The live site is the Cloudflare Pages
deployment of `main` (see `src/lib/site.ts` → `site.url`).

## 1. Contact delivery (the one that matters)

- [ ] Open the live site → Assessment tab.
- [ ] Fill all four steps with obviously-test data ("TEST — please ignore").
- [ ] Check the consent box and press **Send to BSTS**.
- [ ] Confirm the green success message appears.
- [ ] Confirm the email actually arrives in the BSTS inbox (Web3Forms →
      configured address). If it does not arrive, the success message is a
      lie and must be fixed before anything else.
- [ ] Reply-to on the received email should be the tester's address.

## 2. Failure honesty

- [ ] With devtools open, block `api.web3forms.com` (Network request
      blocking) and press Send again — the red failure message must appear,
      and copy/download must still work.

## 3. First-viewport check

- [ ] On a 1366×768 laptop: headline and "Start Your Technology Assessment"
      button visible without scrolling.
- [ ] On a phone: tank visible and uncropped, name centered, no horizontal
      scrolling anywhere.

## 4. Claims spot-check (after any wording edit)

- [ ] The words "SDVOSB certified" and "certification in progress" appear
      nowhere on the public site while `vetCertStatus` is `"planned"`.
- [ ] Degree wording reads "Bachelor of Science in Computer Science with a
      Cybersecurity major, Magna Cum Laude" everywhere it appears.
- [ ] `npm test` passes locally (the claims audit runs there).

## 5. Business facts (single source of truth: `src/lib/site.ts`)

| Fact | Where | Current action needed |
| --- | --- | --- |
| VetCert status | `vetCertStatus` | Change to `"submitted"` only after the SBA VetCert application is actually filed; `"certified"` only after issuance. |
| Legal entity name | `site.legalName` | Update when the LLC registration completes. |
| Production URL | `site.url` | Change once when the custom domain goes live; update Cloudflare Pages custom domain at the same time. |
| Contact email | `NEXT_PUBLIC_CONTACT_EMAIL` env var (fallback in `site.ts`) | **Done** — `contact@bevierstrategic.com`, routed to the business mailbox and delivery-tested. |
| Scheduling URL | `site.schedulingUrl` | Add a Calendly/Cal.com link when one exists. |
| Response promise | `site.responsePromise` | Only promise what you can honor. |
| Pricing language | `pricing` | One edit updates all three offers. |
