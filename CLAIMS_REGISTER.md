# Claims Register

Every public credential, framework, and experience claim made by this site,
classified per the BSTS claims policy. This register is the source of truth
for copy audits; the prohibited list is additionally enforced by an
automated test (`src/test/claims.test.ts`).

## Classifications

- **Verified credential** — a credential actually held; state it exactly.
- **Founder experience** — factual background; no endorsement implied.
- **Framework informing methodology** — practices we follow; never claimed
  as certification.
- **Future objective** — may be pursued; never stated as current.
- **Prohibited claim** — must never appear as an affirmative claim.

## Register

| Claim (public wording) | Classification | Notes |
| --- | --- | --- |
| Master of Science in Artificial Intelligence | Verified credential | Exact wording mandated. Never "graduate-level completion/coursework". |
| Bachelor of Science in Cybersecurity, Magna Cum Laude | Verified credential | Exact wording mandated. |
| CompTIA Security+ | Verified credential | Founder-held. Text display only until badge verification (see `public/badges/README.md`). |
| AWS Certified AI Practitioner | Verified credential | Founder-held. Text display only until badge verification. |
| Federal cybersecurity experience | Founder experience | Site carries an explicit "does not imply federal endorsement" note (About page). |
| U.S. Army veteran and senior operational leader | Founder experience | Factual background statement. |
| "NIST-aligned" / "informed by NIST CSF 2.0" | Framework informing methodology | Site states NIST does not certify consultancies. |
| "OWASP-informed secure development" | Framework informing methodology | Practice description only. |
| "Zero Trust principles" | Framework informing methodology | Practice description only. |
| "SOC 2 readiness support" | Framework informing methodology | Explicitly distinguished from certification on /security and in the Insights article. |
| "Responsible AI" | Framework informing methodology | Backed by concrete boundary commitments on /security. |
| A future SOC 2 attestation for BSTS itself | Future objective | Not claimed anywhere; would require an independent CPA firm. |
| Client case studies with measured results | Future objective | None exist; Solara House is labeled "CONCEPT DEMONSTRATION — NOT A CLIENT CASE STUDY" everywhere it appears. |
| "NIST certified" | Prohibited claim | Never appears affirmatively; test-enforced. |
| "SOC 2 certified" / "SOC 2 compliant" | Prohibited claim | Appears only inside disavowals/educational corrections; test-enforced. |
| "ISO certified" | Prohibited claim | Never appears; test-enforced. |
| "Official partner" | Prohibited claim | Never appears; test-enforced. |
| "Government approved" | Prohibited claim | Never appears; test-enforced. |
| "Guaranteed secure" | Prohibited claim | Never appears; test-enforced. |
| Invented testimonials, client logos, revenue, or metrics | Prohibited claim | None exist anywhere on the site; Solara House carries no invented numbers. |

## Standing disclaimer (verbatim, shipped in the footer and legal pages)

> References to security frameworks such as NIST CSF 2.0, SOC 2, and OWASP
> describe the practices that inform our methodology. They do not imply
> certification, accreditation, endorsement, or an audit opinion.

## Change control

Any new public claim must be added to this register with a classification
before it ships. Any change to founder-credential wording requires updating
`src/lib/content/founder.ts` and this file together — the automated test
checks the mandated phrases exist.
