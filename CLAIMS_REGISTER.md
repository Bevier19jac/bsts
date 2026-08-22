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
| Bachelor of Science in Computer Science with a Cybersecurity major, Magna Cum Laude | Verified credential | Exact wording mandated by the founder. Never shorten to "BS in Cybersecurity" — test-enforced. |
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
| "U.S. Army Veteran-Owned & Led" | Founder experience | Factual ownership statement. |
| "Service-Disabled Veteran-Owned & Operated · SBA VetCert application planned" | Current status | The SBA VetCert application has NOT yet been filed (LLC registration pending), so "in process"/"in progress"/"pending" language is prohibited — all three imply a filing exists. Status is centralized as vetCertStatus in src/lib/site.ts — change it to "submitted" only after the application is actually filed, and to "certified" only after issuance. Test-enforced in `federal.test.ts`. |
| "SDVOSB certified" / "Certified SDVOSB" / "SDVOSB certification in progress" | Prohibited claims (until the corresponding milestone) | Never appear affirmatively before the milestone is real; test-enforced. |
| "NIST certified" | Prohibited claim | Never appears affirmatively; test-enforced. |
| "SOC 2 certified" / "SOC 2 compliant" | Prohibited claim | Appears only inside disavowals/educational corrections; test-enforced. |
| "ISO certified" | Prohibited claim | Never appears; test-enforced. |
| "Official partner" | Prohibited claim | Never appears; test-enforced. |
| "Government approved" | Prohibited claim | Never appears; test-enforced. |
| "Guaranteed secure" | Prohibited claim | Never appears; test-enforced. |
| Invented testimonials, client logos, revenue, or metrics | Prohibited claim | None exist anywhere on the site; Solara House carries no invented numbers. |

## Repositioning additions (v0.6.0 — Secure the data / Enable the AI / Prove the controls)

| Claim | Classification | Rule |
| --- | --- | --- |
| "BSTS does not issue SOC 2 reports. SOC 2 examinations and attestation reports are performed by qualified independent CPA firms." | Mandatory boundary | Centralized as `soc2Boundary` in `src/lib/content/positioning.ts`. **Every page that markets SOC 2 work must render this boundary** (directly, or via `frameworkDisclaimer`, which contains it) — test-enforced. |
| "SOC 2 readiness", "control mapping", "evidence preparation", "gap assessment", "remediation tracking" | Permitted service language | Describes preparation work only. Never "audit", "attestation", "certification", or "opinion". |
| "We issue SOC 2" / "our SOC 2 audit" / "SOC 2 auditor" / "we certify" / "BSTS certifies" | Prohibited claim | Test-enforced. |
| "NIST AI RMF alignment" | Framework informing methodology | Alignment describes methodology. NIST does not certify against the AI RMF; "NIST AI RMF certified" is prohibited and test-enforced. |
| "HIPAA compliant" / "ISO 27001 certified" / "GDPR certified" | Prohibited claim | BSTS provides mapping and implementation support only; these phrases are test-enforced prohibitions. |
| Framework list (SOC 2, NIST CSF 2.0, NIST SP 800-53, NIST AI RMF, ISO/IEC 27001, HIPAA, NIST SP 800-171, CMMC, CJIS, FedRAMP-related) | Framework informing methodology | Every entry must be qualified with readiness / mapping / alignment / implementation-support / preparation language — test-enforced. Accompanied by an explicit "BSTS is not an accreditation body, a certification body, or an audit firm" disclaimer. |
| Continuous assurance platform (system evidence → control validation → framework mapping → drift detection → remediation → audit-ready evidence) | Future objective | A product **direction**, never described in the present tense. The public page must carry `assuranceRoadmapNote` ("not a product available today") — test-enforced. Present-tense platform phrasing ("our platform monitors", "our SaaS platform") is a prohibited claim. |
| SBIR / STTR research direction | Future objective | Stated as an intent to compete when eligible. Must carry the explicit disclaimer that BSTS **has not received an SBIR or STTR award**, is not performing under any federal innovation program, and that no agency has reviewed or endorsed the research direction — test-enforced. |
| "SBIR award" / "SBIR-funded" / "awarded SBIR" / "Phase I award" | Prohibited claim | Test-enforced. |
| Three primary service areas (Secure AI & Automation, AI Security & Governance, SOC 2 & Compliance Readiness) | Positioning | Structure is test-enforced so the three-pillar hierarchy cannot silently drift. |
| Four-stage engagement model (Discover, Implement, Govern, Assure) | Positioning | Test-enforced. |
| Abrams firing sequence as brand identity | Brand | The four stages (M1 Abrams / Main-gun firing / Fin-stabilized flight / Tracer to target → Disciplined system / Precise action / Controlled delivery / Measurable effect) are test-enforced so the identity is not quietly dropped in a future edit. |

## Standing disclaimer (verbatim, shipped in the footer and legal pages)

> References to security and AI frameworks such as SOC 2, NIST CSF 2.0,
> NIST SP 800-53, the NIST AI Risk Management Framework, ISO/IEC 27001,
> HIPAA, and CMMC describe the practices that inform our methodology and the
> requirements we help clients prepare for. They do not imply certification,
> accreditation, endorsement, or an audit opinion. BSTS does not issue SOC 2
> reports — SOC 2 examinations and attestation reports are performed by
> qualified independent CPA firms.

## Change control

Any new public claim must be added to this register with a classification
before it ships. Any change to founder-credential wording requires updating
`src/lib/content/founder.ts` and this file together — the automated test
checks the mandated phrases exist.

## Federal / Government page additions (v0.5.0)

| Claim | Status | Rule |
| --- | --- | --- |
| Federal capabilities (AI governance, knowledge systems, evidence automation, workflow automation) | Capability descriptions | Presented as capabilities and representative deliverables — never as past performance or contract history. |
| Founder military/federal background | Founder experience | Always labeled founder experience; never "BSTS past performance". No unit insignia, seals, or endorsement implied. |
| Acquisition identifiers (SAM, UEI, CAGE, NAICS, PSC) | Unissued — hidden | Empty config values are hidden from the public page; no placeholder text permitted (test-enforced). |
| "Guaranteed award", "prequalified", "cleared company", "FedRAMP certified", "CMMC certified", "sole-source provider", "contract-ready", "preferred government vendor" | Prohibited | Banned site-wide by the automated claims audit. |
| "SBA-certified…" / "eligible for SDVOSB set-aside" | Config-gated | Exist only in the certified-state branch of src/lib/site.ts; appear publicly only when vetCertStatus === "certified" (test-enforced). |

## v0.5.1 corrective pass

| Claim | Status | Rule |
| --- | --- | --- |
| "More than 16 years serving federal missions through military leadership and civilian cybersecurity work." | Approved experience statement | The ONLY permitted experience-duration wording. "17+ years" / "17 years" / "federal experience as a civilian" are test-banned. Military and civilian service are described together without implying all years were civilian federal employment. |
| "Company name: Bevier Strategic Technology Solutions" | Pre-formation label | While formationStatus = "pre_formation", the public label is "Company name" and no "LLC" appears. "Legal business name" + the exact registered name appear only after the filing is approved and formationStatus = "formed" (test-enforced). |
| Federal contact display | Config-driven | Until NEXT_PUBLIC_FEDERAL_CONTACT_EMAIL is set, federal surfaces show "Contact: bevierstrategic.pages.dev/government" instead of printing a personal address prominently. |
