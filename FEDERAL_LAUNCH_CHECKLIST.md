# Federal launch checklist (private — founder actions)

The public Government page hides every identifier below until a real,
verified value is entered in `src/lib/site.ts` (`acquisition.fields`).
Nothing on the public site says "TBD" or "pending" — fields simply appear
when the values are filled in.

## Business formation

- [ ] LLC registration filed and approved (state)
- [ ] Update `site.legalName` in `src/lib/site.ts` with the exact legal name (e.g. "Bevier Strategic Technology Solutions LLC")
- [ ] EIN obtained (IRS)
- [ ] Business bank account opened
- [ ] Professional domain purchased; update `site.url` + Cloudflare Pages custom domain
- [ ] Business-domain email (e.g. jacob@…); update `NEXT_PUBLIC_CONTACT_EMAIL` and the "Business contact" acquisition field

## Federal registrations (in order)

- [ ] SAM.gov entity registration → when ACTIVE, set "SAM registration" field to "Active"
- [ ] UEI issued (comes with SAM) → fill "UEI" field
- [ ] CAGE code assigned → fill "CAGE code" field
- [ ] Verify NAICS selection (candidates to confirm: 541511 custom programming, 541512 systems design, 541519 other computer services, 541690 technical consulting, 541611 admin management consulting) → fill "Primary NAICS"
- [ ] Select PSC codes (candidates: DA01 business systems support, DA10 IT management support, R408 program management support, R425 engineering support) → fill "PSC codes"
- [ ] SBA VetCert application submitted → change `vetCertStatus` to `"submitted"` in `src/lib/site.ts`
- [ ] SBA VetCert certificate issued → change `vetCertStatus` to `"certified"` (ONLY after the certificate is in hand)
- [ ] SBA Small Business Search (DSBS) profile completed
- [ ] Remove/blank `acquisition.statusLine` once SAM/UEI/CAGE are displayed

## Controlled production submission test (do once after each deploy that touches forms)

1. Open https://bevierstrategic.pages.dev/government in a private/incognito window.
2. Fill the federal inquiry form with clearly-marked test data ("TEST — please ignore"), org type "Other", opportunity type "General inquiry".
3. Press **Send inquiry** once. Confirm the green success message appears.
4. Confirm the email arrives in the private delivery inbox within a few minutes. If the success message showed but no email arrived, STOP — the form is lying and must be fixed before any outreach.
5. Repeat once on a phone to confirm mobile behavior.

## Configuration flips (single source of truth: src/lib/site.ts)

- [ ] LLC approved → set formationStatus = "formed" AND update site.legalName to the exact registered name (label switches to "Legal business name" automatically)
- [ ] Federal business email live → set NEXT_PUBLIC_FEDERAL_CONTACT_EMAIL in Cloudflare Pages env (capability statement and acquisition profile switch from the /government contact line to the address automatically)

## Marketing readiness

- [ ] Review the capability statement (/government/capability-statement) and print a copy — one page, letter
- [ ] Send a live test through the federal contact form; confirm it arrives in the inbox
- [ ] Build a prime-contractor outreach list (target primes with SDVOSB subcontracting goals in your capability areas)
- [ ] Prepare a briefing deck version of the capability statement (optional)

## Standing rules

- Never flip `vetCertStatus` early — every public page and test derives from it.
- Never type SAM/UEI/CAGE values anywhere except `src/lib/site.ts`.
- `npm test` enforces the claims rules — run it after any wording change.
