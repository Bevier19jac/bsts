# Google Business Profile — setup sheet

Everything to enter, in the order Google asks for it. Copy values verbatim.

Canonical values come from `docs/BSTS_ENTITY_STANDARD.md`. If the two ever
disagree, the entity standard wins and this file is stale.

---

## Business name

```
Bevier Strategic Technology Solutions
```

Trade name, **without** the `LLC`. Google's naming policy says to use the name
customers actually see, and the legal suffix is not it. `LLC` belongs on the bank
account, the tax return and SAM.gov.

**Do not add keywords.** `... | AI & Cybersecurity Consulting` violates policy and
is one of the most common causes of profile suspension. Categories exist to carry
that meaning; the name field does not.

---

## Primary category

```
Computer consultant
```

**Google will suggest "Computer support and services". Decline it.**

That category is where consumers land when a laptop will not boot. Taking it
trains Google to surface BSTS for break/fix and residential IT queries, which
brings the wrong calls and — worse — teaches the ranking system the wrong thing
about the business. Category is the strongest single signal on a profile; it is
worth being deliberate.

`Computer consultant` is the closest available match to what BSTS actually does:
advise organizations on what technology should exist, how it should be secured,
and how it should be governed.

**Why not the alternatives as primary:**

| Category | Why not primary |
|---|---|
| Computer support and services | Consumer break/fix intent. Actively wrong. |
| Computer security service | Accurate for part of the work, but reads as managed security monitoring or physical security integration. Correct as a *secondary*. |
| Business management consultant | Too broad — pulls BSTS into general management consulting, away from the technical credibility that is the actual differentiator. Correct as a *secondary*. |
| Software company | BSTS implements and integrates; it is not primarily a product company. The continuous-assurance platform does not exist yet, and `claims.test.ts` explicitly forbids implying it does. Weak secondary at best. |
| Consultant | So generic it carries no signal at all. |

## Secondary categories

Add in this order:

```
1. Computer security service
2. Business management consultant
3. Software company
```

Add only these. Every irrelevant category dilutes the primary signal, and Google
weights the primary far more heavily than the rest combined. Three is enough.

---

## Business description

Paste exactly. **750 characters — the maximum.** Any edit will need re-counting.

```
Bevier Strategic Technology Solutions helps growing organizations adopt AI securely, automate the work that eats the week, and build the controls and evidence that earn customer trust.

Services span secure AI adoption and governance, intelligent workflow automation, cybersecurity assessment and hardening, and compliance readiness. Work runs in six stages — Digital Foundations, Discover, Build, Secure, Prove and Maintain — and each stands on its own, so you are never committing to the whole path to get value from the first one.

On SOC 2 we prepare the environment and assemble the evidence; the examination and attestation report are performed by an independent CPA firm.

Service-disabled veteran-owned and operated. Based in Tyrone, Georgia.
```

Notes on what this deliberately does and does not do:

- **The SOC 2 sentence is not optional.** `src/test/claims.test.ts` enforces that
  boundary on the website. It cannot enforce it here. This is the likeliest place
  in the whole business for the claim to drift, and BSTS sells compliance
  credibility — being caught overstating your own credential is unrecoverable.
- **No URL.** Google strips or rejects links in the description field.
- **No phone number, no superlatives, no "#1" or "best".** All are review triggers.
- The six stage names match `src/lib/content/services.ts` exactly, so a visitor
  who reads the profile and then clicks through gets the same story.

---

## Services

Enter all nine. These match the entity standard and the site.

```
AI Consulting
Secure AI Implementation
AI Governance
AI Risk Assessment
Cybersecurity Consulting
Security & Compliance Readiness
SOC 2 Readiness
Business Process Automation
Technology Strategy Consulting
```

**Review of the proposed list — one change, one confirmation.**

- *AI Consulting* and *Secure AI Implementation* are **not** redundant, and both
  should stay. The first is advisory — what should we do with AI at all. The
  second is delivery under security constraints. They attract different searches
  and represent different engagements. Keep both.
- *AI Risk Assessment* moved up next to the other AI services so the grouping
  reads coherently. No wording change.
- *SOC 2 Readiness* stays as its own entry rather than being folded into
  *Security & Compliance Readiness*. It is the highest-intent term on the list —
  people search that exact phrase — and the word **Readiness** is doing load-
  bearing work. Never shorten it to "SOC 2".

If Google offers a free-text description per service, keep each to one sentence
and reuse the site's own language rather than writing new copy.

---

## Hours

```
Monday      8:00 AM – 5:00 PM
Tuesday     8:00 AM – 5:00 PM
Wednesday   8:00 AM – 5:00 PM
Thursday    8:00 AM – 5:00 PM
Friday      8:00 AM – 5:00 PM
Saturday    Closed
Sunday      Closed
```

Keep as proposed. Standard business hours are right for B2B consulting — clients
are at work when you are. Do not list extended or weekend hours to appear more
available; hours on a profile are a promise, and Google surfaces "Open now" as a
ranking and display signal. A profile that says open when nobody answers is worse
than one with narrower hours.

---

## Service area — set this carefully

**Do not publish the street address.**

When Google asks whether customers visit you at your address, answer **no**. That
converts the listing to a service-area business, and the address is used only for
verification, never displayed.

Service areas to enter:

```
Fayette County, Georgia
Coweta County, Georgia
Fulton County, Georgia
Clayton County, Georgia
Atlanta, Georgia
```

**Why this matters more than the ranking it costs.** 105 Pendleton Trail is on the
Georgia state filing because a registered office is legally required, and that
filing is public. A Google Business Profile is different in kind: it puts a pin on
Maps, invites photos, invites drive-bys, and attaches a residence to a searchable
business record. The local-pack visibility gained by displaying it is not worth
that, particularly for a firm whose product is security judgement.

**Never** substitute a virtual office, mailbox service or UPS Store address.
Google classifies those as ineligible and suspends listings that use them.

---

## Website and links

| Field | Value |
|---|---|
| Website | `https://bevierstrategic.com` |
| Appointment / Get quote | `https://bevierstrategic.com/start/` |
| Contact | `https://bevierstrategic.com/contact/` |

`/start/` is the right appointment link — it is the existing production route
behind the printed QR codes and it forwards into the Bevier Breakdown, which is
the actual first step of an engagement. It is `noindex` by design, which does not
matter here: Google Business Profile follows the link, it does not need to index
it.

Do not invent a `/book` or `/schedule` route. Neither exists.

---

## Photos

Google shows profiles with photos considerably more often than those without.
Upload in this order:

| Slot | File | Notes |
|---|---|---|
| Logo | `public/icon-512.png` | 512×512, already square |
| Cover | `public/og.png` | 1200×630, the tank composition with the wordmark |
| Additional | `brochures/assets/abrams-hero.png` | Brand imagery |
| Team | A real headshot of Jacob | **Owner to supply.** A real founder photo materially increases contact rate for a solo consultancy — people hire a person. |

**Do not upload:** stock office photography, stock "team meeting" images, AI-
generated offices, or anything implying a staffed public location. Beyond being
against Google's guidelines, a security consultancy caught staging a fake office
has damaged the only thing it sells.

There is no customer-facing office. Photograph nothing that suggests otherwise.

---

## Verification

Google will offer postcard, phone, email or video verification. For a service-area
business run from home, video verification is common — you may be asked to show
business activity, equipment and something proving the address.

Have ready: the Certificate of Organization, the IRS CP 575G, and the Chase
business account paperwork. They are filed under `_Corporate Records/`.

Verify under the **business** account, not a personal Google account, if you have
a business Workspace identity. Ownership of the profile should be transferable.

---

## After the profile is live

1. **Do not edit repeatedly in the first week.** Rapid successive edits to name,
   category or address are a suspension trigger on new profiles.
2. Turn **messaging off** unless you will answer within a day. Google measures
   response rate and displays it.
3. Add the first **Post** after a week — an insight article from
   `/insights/` is ideal and creates a legitimate link back to the site.
4. **Do not solicit reviews from anyone who is not a real client.** Fabricated
   reviews are the fastest route to permanent removal, and for a compliance firm
   they are an integrity problem, not just a policy one.
5. Once verified, add the profile URL to `docs/BSTS_ENTITY_STANDARD.md` §10.

---

## Owner decisions still open

| Decision | Why it is blocking |
|---|---|
| **Phone number** | Google effectively requires one. `site.phone` is empty and the site hides phone references when it is. Decide: a dedicated business line, a forwarding number, or the personal mobile — but only if it will be answered as the company. |
| **Founder photo** | Not required, materially helpful. |
| **Service-area breadth** | The five areas above are a reasonable start. Narrower ranks better locally; broader reaches further. Adjustable later without penalty. |
