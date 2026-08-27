# BSTS Entity Standard

**The canonical source of truth for how Bevier Strategic Technology Solutions is
represented anywhere outside this repository.**

Google, Bing, LinkedIn, SAM.gov, SBA VetCert, directories, partner profiles and
vendor forms all build a picture of the company from what they find. When those
sources disagree — a different name here, a different description there — none of
them is trusted fully. Consistency is not tidiness; it is the mechanism by which
an entity becomes recognisable.

**Before entering BSTS information into any external system, copy it from this
file.** When something here changes, change it here first, then propagate.

*Last verified: 27 August 2026.*

---

## 1. Identity

| Field | Value | Source of truth |
|---|---|---|
| **Legal business name** | `Bevier Strategic Technology Solutions LLC` | GA Certificate of Organization; IRS CP 575G |
| **Brand name** | `Bevier Strategic Technology Solutions` | `site.name` |
| **Abbreviation** | `BSTS` | `site.shortName` |
| **Canonical website** | `https://bevierstrategic.com` | `site.url` |
| **Entity type** | Georgia domestic limited liability company | Articles of Organization |
| **State** | Georgia | — |
| **Formed** | 20 August 2026 | Certificate of Organization |
| **GA control number** | `26183356` | Certificate of Organization |
| **EIN** | `42-4746563` | IRS Notice CP 575G |
| **IRS name control** | `BEVI` | IRS Notice CP 575G |
| **Ownership** | Jacob Benjamin Bevier, 100%, sole member | Operating Agreement §2.1 |
| **Management** | Member-managed | Operating Agreement §5.1 |

### Which name goes where

Getting this wrong is the single most common way a small company confuses the
systems it is trying to register with.

- **`Bevier Strategic Technology Solutions LLC`** — anywhere legal or financial:
  bank records, tax filings, contracts, insurance certificates, SAM.gov, VetCert,
  government registrations. Character for character. This is what SAM.gov matches
  against the IRS and the bank.
- **`Bevier Strategic Technology Solutions`** — the trade name. Google Business
  Profile, LinkedIn, directories, marketing. Google's own guidelines say to use
  the name customers see on signage and materials, not the legal suffix.
- **`BSTS`** — an *alternate* name only. Never the primary listing name on any
  platform. It goes in an "also known as" field where one exists.

**Never** append keywords to the business name on any platform. `Bevier Strategic
Technology Solutions | AI & Cybersecurity Consulting` violates Google Business
Profile policy and is a common cause of suspension.

---

## 2. Descriptions

### Short — one line, ≤ 100 characters

```
Secure AI adoption, automation, cybersecurity and compliance readiness for growing organizations.
```

### Medium — ≤ 300 characters

```
BSTS is a veteran-owned technology consultancy helping growing organizations adopt AI securely,
automate high-value work, and build the controls and evidence that customer security reviews and
SOC 2 readiness demand. Discovery first — we find out what is actually true before recommending anything.
```

### Long — Google Business Profile, 743 characters against a 750 limit

```
Bevier Strategic Technology Solutions helps growing organizations adopt AI securely, automate high-value workflows, and build the controls and evidence that earn customer trust.

Services span secure AI adoption and governance, intelligent workflow automation, cybersecurity assessment and hardening, and compliance readiness. Work runs in six stages — Digital Foundations, Discover, Build, Secure, Prove and Maintain — and each stands on its own, so you are never committing to the whole path to get value from the first one.

On SOC 2 we prepare the environment and assemble the evidence; the examination and attestation report are performed by an independent CPA firm.

Service-disabled veteran-owned and operated. Based in Tyrone, Georgia.
```

### Positioning line

```
Secure the data. Enable the AI. Prove the controls.
```

Use as a tagline, never as the business name.

---

## 3. Contact

| Field | Value | Notes |
|---|---|---|
| **Public email** | `contact@bevierstrategic.com` | Cloudflare Email Routing → business mailbox. Verified by delivered test message, 27 Aug 2026. **Receive only** — replies leave from the mailbox behind it. |
| **Phone** | **NEEDS OWNER INPUT** | `site.phone` is empty and the site hides phone references when it is. Google Business Profile effectively requires one. Decide before publishing the profile: a dedicated business number, or a call-forwarding number. Do not publish a personal mobile you will not answer as the company. |
| **Website** | `https://bevierstrategic.com` | Always with `https://`, no `www`, no trailing path |
| **Engagement URL** | `https://bevierstrategic.com/start/` | The printed QR destination. Forwards into the Bevier Breakdown. |
| **Contact page** | `https://bevierstrategic.com/contact/` | Use this for "Contact" fields; use `/start/` for "Appointment" or "Get quote" fields |

---

## 4. Location and service area

BSTS is a **service-area business**, not a customer-facing office.

| Field | Value |
|---|---|
| Registered / principal office | 105 Pendleton Trail, Tyrone, GA 30290 |
| Public address display | **Hidden.** Never publish. |
| Service area | Fayette County, Coweta County, Fulton County, Clayton County and the greater Atlanta metropolitan area; remote engagements nationwide |
| `areaServed` in structured data | `US` |

**The address rule.** The street address appears on the Georgia state filing
because the law requires a registered office, and that filing is public. That is
not a reason to repeat it. Publishing it to Google Maps, structured data and
directory listings takes a record nobody looks up and turns it into a pin on a
map with photos attached, tied to a residence.

On every platform: enter the address only where verification requires it, and
set the listing to hide it. Do **not** substitute a virtual office, mailbox
service or UPS Store address — Google treats those as ineligible locations and
suspends listings that use them.

---

## 5. Categories

For Google Business Profile and any directory that asks.

| | |
|---|---|
| **Primary** | Computer consultant |
| **Secondary** | Computer security service · Business management consultant · Software company |

Rationale is in `GOOGLE_BUSINESS_PROFILE.md`. The short version: BSTS advises on
what technology should exist and how it should be governed. It is not a repair
shop, and **"Computer support and services" — Google's initial suggestion —
should be declined**, because it is the category consumers reach for when a
laptop will not boot.

---

## 6. Services

The canonical list. Use these exact strings; do not invent variants per platform.

1. AI Consulting
2. Secure AI Implementation
3. AI Governance
4. AI Risk Assessment
5. Cybersecurity Consulting
6. Security & Compliance Readiness
7. SOC 2 Readiness
8. Business Process Automation
9. Technology Strategy Consulting

Engagement lifecycle, as the site presents it: **Digital Foundations · Discover ·
Build · Secure · Prove · Maintain.** Operating model: **Discover → Implement →
Govern → Assure.**

---

## 7. The SOC 2 boundary — non-negotiable

This is the one place where a careless word does real damage, because BSTS sells
compliance credibility.

**BSTS may say it provides:** SOC 2 readiness · readiness and gap assessments ·
control design and implementation · remediation · evidence preparation and
organisation · continuous readiness · preparation for independent examination.

**BSTS may never say or imply:** that it issues SOC 2 reports · performs SOC 2
audits, examinations or attestations · certifies anyone as SOC 2 compliant · is a
SOC 2 certification body. The examination and the attestation report are performed
by an appropriately qualified **independent CPA firm**.

The canonical sentence, already enforced on the website by
`src/test/claims.test.ts`:

> SOC 2 examinations and attestation reports are performed by qualified
> independent CPA firms.

That test guards the site. **It does not guard Google Business Profile, LinkedIn,
a directory listing or a proposal.** Those are exactly where the boundary gets
crossed, because nothing fails a build when it does. Carry the sentence manually.

Also never claim: "SOC 2 certified", "SOC 2 compliant" as a BSTS credential, or
any implication that BSTS holds a certification it does not.

---

## 8. Veteran status

| Claim | Status |
|---|---|
| Service-disabled veteran-owned and operated | **True.** State it plainly. |
| SDVOSB certification (SBA VetCert) | **Not yet held.** Application not started as of 27 Aug 2026. |

Say **"service-disabled veteran-owned and operated"** — a statement of ownership.
Do **not** say "certified SDVOSB", "SDVOSB-certified" or use the certification
mark until VetCert is actually granted. In federal contracting, an uncertified
SDVOSB claim is not a marketing exaggeration; it carries real consequences.

---

## 9. Brand assets

| Asset | File | Use |
|---|---|---|
| Favicon | `src/app/icon.svg` | Browser tab. The approved BSTS lockup. |
| Logo (raster) | `public/icon-512.png` | Structured data `logo`, directory listings, profile logo slots |
| Maskable icon | `public/icon-maskable-512.png` | Android home screen |
| Apple touch icon | `public/apple-touch-icon.png` | iOS home screen, 180×180 |
| Share / cover image | `public/og.png` | 1200×630. Open Graph, Twitter, GBP cover |

Colours: obsidian `#0b0e13` · ink `#10161D` · teal `#2E7D78` · cyan `#63C7C2` ·
gold `#C9A869` · warm white `#F2EFE8`.

**Do not recreate, recolour or regenerate these.** The tank bitmap in particular
is measured, not eyeballed — `src/components/brand/lockup.ts` positions the muzzle
blast off fractions of the image and `src/test/brand.test.ts` guards the geometry.

---

## 10. Social and external profiles

| Platform | URL | Status |
|---|---|---|
| LinkedIn (company page) | **NEEDS OWNER INPUT** | Not verified. Highest-value next listing — it is also the fastest legitimate inbound link for a new domain. |
| LinkedIn (founder) | **NEEDS OWNER INPUT** | — |
| SAM.gov | Pending registration | Unblocked as of 27 Aug 2026 |
| UEI | Not yet issued | Follows SAM.gov |
| CAGE code | Not yet issued | Follows SAM.gov |
| NAICS codes | **NEEDS OWNER INPUT** | Required for SAM.gov. Likely candidates: 541512 Computer Systems Design Services · 541519 Other Computer Related Services · 541611 Administrative Management Consulting. Confirm before registering — they affect set-aside eligibility. |
| SBA VetCert | Not started | Follows SAM.gov |

**Nothing goes in `sameAs` structured data until a URL is verified live.** A
profile link that 404s degrades entity resolution rather than helping it.

---

## 11. Never publish

Recorded so it does not have to be re-litigated:

- Reviews, ratings or testimonials that were not actually given
- Client names or case studies without written permission
- Certifications, awards, memberships or partnerships not actually held
- Office locations, suites or virtual addresses that are not real premises
- Employee counts, revenue figures or founding dates that are not accurate
- Any SOC 2 claim crossing the boundary in §7
- The residential street address, on any public-facing profile
- A phone number that will not be answered as the company

---

## 12. Change control

When a fact here changes: update this file, then propagate to Google Business
Profile, LinkedIn, Bing Places, SAM.gov and any directory listing — and note the
date in the compliance register at
`_Corporate Records/BSTS_Formation_and_Compliance_Register.md`.

Facts that live in code (`src/lib/site.ts`) change there first; this document
records them, it does not own them. The ones that matter: `site.name`,
`site.legalName`, `site.shortName`, `site.url`, `site.contactEmail`, `site.phone`.
