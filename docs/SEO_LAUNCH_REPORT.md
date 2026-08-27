# SEO launch report — bevierstrategic.com

*27 August 2026. Pre-deployment. Nothing has been pushed.*

---

## A. Executive summary

The site was already in good technical condition. This was not a rescue.

Every public route already had an intentional, unique `<title>`, a written meta
description, a correct canonical, complete Open Graph and Twitter metadata, a
branded favicon and icon set, a valid manifest, exactly one `<h1>`, alt text on
every image, and `ProfessionalService` JSON-LD sitewide with `Article` markup on
the three insight pieces. `robots.txt` allows crawling and declares the sitemap.
There are no orphaned pages and no broken internal links. Retired routes redirect
with 301s that are individually explained in `public/_redirects`.

**One genuine defect was found**, and it is the kind that would have shown up as a
red error in Search Console within days of submitting the sitemap: two pages that
send `robots: noindex` were listed in the sitemap. That contradiction is fixed,
and a test now makes it impossible to reintroduce silently.

The structured data was correct but thin. It has been extended.

The most consequential findings are not code at all: the Google Business Profile
category Google suggested is wrong for this business, and the profile is about to
publish a residential address unless it is explicitly configured not to.

---

## B. What was already correct

Listed so the work is not misattributed. None of this was done here.

| Area | Existing state |
|---|---|
| Rendering | Next.js 16 static export, `trailingSlash: true`, images unoptimized — correct for Cloudflare Pages. All content in initial HTML; nothing critical hidden behind client-side interaction. |
| Canonicals | Relative `alternates: { canonical: "./" }` resolved against `metadataBase`. This is why moving the domain was a one-line change. Every route resolves correctly. |
| Titles | Unique and intentional on all 19 built pages, with a sensible `%s — BSTS` template. |
| Descriptions | Written per page. No duplicates, no boilerplate. |
| robots.txt | `Allow: /`, sitemap declared, nothing over-blocked. No CSS or JS blocked. |
| Structured data | `ProfessionalService` sitewide, `Article` on all three insight pages. |
| Open Graph | Complete — title, description, url, type, `og:image` 1200×630 with descriptive alt, `summary_large_image` Twitter card. |
| Icons | Branded SVG favicon, 180×180 apple-touch, 192/512 PNG, maskable 512, valid webmanifest. Not framework defaults. |
| Headings | Exactly one `<h1>` on every content page. |
| Images | 3 `<img>` elements, 3 with meaningful alt text. Zero missing. |
| Internal linking | Zero orphaned routes, zero links to non-existent routes. |
| Redirects | Six retired paths 301 to sensible replacements, each with a written reason. |
| noindex discipline | `/start/` and `/government/capability-statement/` correctly marked — deliberate, documented decisions. |
| SOC 2 accuracy | `src/test/claims.test.ts` enforces the CPA-firm boundary in canonical wording and blocks forbidden phrases. Already stronger than most firms manage. |
| Canonical domain | Zero `pages.dev`, `github.io`, `localhost` or staging references in production output. |

---

## C. What was changed

### 1. Sitemap listed two `noindex` pages — fixed

`/start/` (`noindex, nofollow`) and `/government/capability-statement/`
(`noindex, follow`) were both in `sitemap.xml`.

A sitemap is a request to index. `noindex` is a request not to. Sending both for
the same URL is not untidy — Search Console reports it as **"Submitted URL marked
'noindex'"** and counts it as an error against the property. It also wastes crawl
budget on a new domain that has very little.

Both routes were removed from the sitemap. **Neither page changed.** `/start/` is
still served, still forwards into the Bevier Breakdown, and the printed QR codes
still resolve — the only thing removed was the false claim that Google should
index it.

Sitemap went from 17 URLs to 15.

### 2. A test now guards that invariant

`src/test/sitemap.test.ts` — new, 7 tests.

The important one walks `src/app`, reads each route's `page.tsx`, extracts the
`robots` directive, and fails if any route in the sitemap sets `index: false`. It
does not trust a hardcoded list; it derives the answer from the pages themselves.

This failure mode is quiet. Someone adds a route to the sitemap array — the
obvious thing to do when adding a page — without noticing the page also sets
`noindex`. Nothing breaks, the build passes, and the error surfaces inside Search
Console weeks later.

**The guard was verified by breaking it deliberately.** Re-adding `/start` made
the test fail with the route named:

```
AssertionError: These routes are in the sitemap but send robots noindex...
  expected [ '/start' ] to deeply equal []
```

It also checks: no duplicate URLs, every URL on the canonical origin, every URL
trailing-slashed to match the export (a missing slash is a redirect hop for the
crawler on every URL), the business-critical pages are still present, and
`robots.txt` still allows crawling and points at the production sitemap.

### 3. Structured data extended

The existing `ProfessionalService` node was correct but missing signals Google
uses to resolve an entity. Added:

| Field | Value | Why |
|---|---|---|
| `@id` | `.../#organization` | Anchors the node so other nodes can reference it |
| `legalName` | `Bevier Strategic Technology Solutions LLC` | Connects the brand name to the registered entity |
| `email` | `contact@bevierstrategic.com` | A reachable contact is a corroborating signal — and it now exists and is verified |
| `logo` | `ImageObject`, `/icon-512.png`, 512×512 | Google wants an explicit logo for knowledge-panel eligibility |
| `image` | `/og.png` | Primary representative image |

And a second node, `WebSite`, with `@id`, `inLanguage: en-US`, and
`publisher: { "@id": ".../#organization" }` linking it to the organization.

Emitting two unlinked blobs leaves Google to infer they describe the same company.
The `@id` reference says so outright.

No `potentialAction`/SearchAction was added — the site has no search function, and
claiming one would be false markup.

**Deliberately not added, and documented in a code comment so it is not
"forgotten" and added later by someone who does not know why:**

- **`address` / `location`** — BSTS is a service-area business run from a home.
  The address is on the state filing because the law requires it; putting it in
  structured data publishes it to Maps and to every scraper that reads schema.
- **`telephone`** — `site.phone` is empty. An unanswered number is worse than none.
- **`sameAs`** — no verified profile URLs exist. A guessed LinkedIn slug that 404s
  actively damages entity resolution.
- **`aggregateRating` / `review`** — there are no customer reviews. Inventing them
  is fraud and carries a Google manual action.

---

## D. Files changed

**Modified (2)**

```
src/app/sitemap.ts     +22 −3    removed two noindex routes; documented why
src/app/layout.tsx     +48 −0    schema: @id, legalName, email, logo, image, WebSite node
```

**Added (5)**

```
src/test/sitemap.test.ts            7 tests guarding the sitemap/noindex invariant
docs/BSTS_ENTITY_STANDARD.md        canonical entity facts for every external platform
docs/GOOGLE_BUSINESS_PROFILE.md     exact GBP values with rationale
docs/GOOGLE_SEARCH_CONSOLE.md       setup, priority indexing order, 24h/7d/30d checks
docs/SEO_LAUNCH_REPORT.md           this file
```

**Not touched:** every page component, all content, all copy, the brand lockup,
the tank imagery, `lockup.ts` geometry, the Bevier Breakdown, assessment scoring,
gates, precedence, routing logic, `_redirects`, `robots.ts`, icons, the manifest,
`next.config.ts`, and all pre-existing tests.

---

## E. Content changes

**None.** No user-facing copy was altered anywhere on the site.

Everything changed is machine-facing: a sitemap URL list, JSON-LD fields, a test
file and documentation. A visitor cannot tell the difference between the current
deployed site and the one this produces.

The only new prose written is in `docs/`, which is not published.

---

## F. Canonical domain

```
https://bevierstrategic.com
```

Verified in the built output: **zero** occurrences of `pages.dev`, `github.io`,
`localhost` or `127.0.0.1` across all 100 files. Every `<link rel="canonical">`,
`og:url`, sitemap `<loc>` and JSON-LD `url` resolves to that origin.

The one surviving `pages.dev` string in source is inside a comment in
`src/lib/site.ts` explaining that Cloudflare keeps serving the old subdomain so
printed QR codes still work. That is accurate documentation and stays.

`CHANGELOG.md` and `BUILD_REPORT.md` retain historical `pages.dev` references by
design — they record what was true at the time.

---

## G. Sitemap

```
https://bevierstrategic.com/sitemap.xml
```

15 URLs, valid XML, all on the canonical origin, all trailing-slashed, no
duplicates, no `noindex` pages.

---

## H. robots.txt

```
https://bevierstrategic.com/robots.txt
```

```
User-Agent: *
Allow: /

Sitemap: https://bevierstrategic.com/sitemap.xml
```

No disallow rules. No blocked CSS or JS. Nothing that could accidentally
de-index the site.

---

## I. Structured data

| Type | Location | Scope |
|---|---|---|
| `ProfessionalService` | `src/app/layout.tsx` | Every page |
| `WebSite` | `src/app/layout.tsx` | Every page — **new** |
| `Article` | `src/app/(marketing)/insights/[slug]/page.tsx` | The three insight articles |

All blocks parse as valid JSON in the built output and carry linked `@id`s.

`ProfessionalService` was retained rather than switched to `LocalBusiness` or bare
`Organization`. It is a subtype of `LocalBusiness` that does not require an
address, which fits a service-area consultancy exactly — and switching types on an
established page for no functional gain risks resetting whatever entity
association Google has already formed.

---

## J. Google Business Profile — final recommendation

Full detail in `docs/GOOGLE_BUSINESS_PROFILE.md`.

| Field | Value |
|---|---|
| **Name** | `Bevier Strategic Technology Solutions` (no `LLC`, no keywords) |
| **Primary category** | **Computer consultant** |
| **Secondary** | Computer security service · Business management consultant · Software company |
| **Hours** | Mon–Fri 8:00 AM – 5:00 PM, Sat/Sun closed — as proposed, unchanged |
| **Website** | `https://bevierstrategic.com` |
| **Appointment URL** | `https://bevierstrategic.com/start/` |
| **Contact URL** | `https://bevierstrategic.com/contact/` |
| **Service area** | Fayette, Coweta, Fulton, Clayton counties + Atlanta. **Address hidden.** |
| **Services** | The nine in the entity standard, `AI Risk Assessment` regrouped with the AI entries |
| **Description** | The 750-character text in the GBP doc |

**Decline "Computer support and services"**, which Google suggested. It is the
category consumers use for laptop repair. Taking it teaches the ranking system
the wrong thing about the business and brings the wrong calls. Category is the
strongest single signal on a profile.

On the services list: *AI Consulting* and *Secure AI Implementation* were flagged
as possible duplication. They are not — advisory versus delivery-under-security-
constraints, different searches, different engagements. Both stay. *SOC 2
Readiness* stays separate from *Security & Compliance Readiness* because it is the
highest-intent phrase on the list and the word "Readiness" is load-bearing.

---

## K. Google Search Console — your manual steps

1. Add a **Domain** property for `bevierstrategic.com` (not URL-prefix)
2. Verify by DNS TXT at Cloudflare → DNS → Records, name `@`
3. URL-inspect `https://bevierstrategic.com/` and confirm the reported canonical
4. Submit sitemap: `sitemap.xml` — expect Success, 15 URLs
5. Request indexing for the first five priority URLs in §L
6. Import the property into Bing Webmaster Tools
7. Enable Cloudflare **Crawler Hints** (Caching → Configuration) for IndexNow

Leave the verification TXT record in place permanently.

---

## L. Priority indexing URLs, in order

```
1.  https://bevierstrategic.com/
2.  https://bevierstrategic.com/services/
3.  https://bevierstrategic.com/method/
4.  https://bevierstrategic.com/contact/
5.  https://bevierstrategic.com/who-we-help/
6.  https://bevierstrategic.com/government/
7.  https://bevierstrategic.com/insights/soc-2-readiness-is-not-soc-2-certification/
8.  https://bevierstrategic.com/assurance/
9.  https://bevierstrategic.com/advisors/
10. https://bevierstrategic.com/insights/
```

Stop after five on day one — requests are rate-limited. **Do not request**
`/start/` or `/government/capability-statement/`; both are deliberately `noindex`.
Do not re-request an unchanged URL.

---

## M. Test results

```
lint         PASS   (eslint, no warnings)
typecheck    PASS   (tsc --noEmit)
tests        PASS   162/162 across 11 files   (was 155/155 across 10)
build        PASS   23 routes, static export
```

The 7 new tests are the sitemap guard. All 155 pre-existing tests still pass —
including `brand.test.ts` (lockup geometry), `claims.test.ts` (SOC 2 boundary),
`federal.test.ts`, and the Bevier Breakdown suites.

Built-output verification:

```
sitemap entries                15
noindex pages                   4
sitemap ∩ noindex               0      ← was 2
pages.dev in output             0
JSON-LD blocks (homepage)       2      valid JSON, linked @ids
orphaned routes                 0
links to non-existent routes    0
images missing alt              0
pages with ≠1 <h1>              1      (/start/, a noindex redirect page)
```

---

## N. Owner decisions

| # | Decision | Notes |
|---|---|---|
| 1 | **Phone number for GBP** | Google effectively requires one. `site.phone` is empty. Dedicated line, forwarding number, or personal mobile — but only if answered as the company. |
| 2 | **Service-area breadth** | Five areas recommended. Narrower ranks better locally, broader reaches further. Changeable later. |
| 3 | **LinkedIn company page** | Not verified to exist. It is the fastest legitimate inbound link for a new domain, and the single highest-value non-code action available. |
| 4 | **NAICS codes** | Needed for SAM.gov. Candidates: 541512, 541519, 541611. They affect set-aside eligibility — confirm before registering. |
| 5 | **Founder photo for GBP** | Optional, materially increases contact rate for a solo consultancy. |
| 6 | **Homepage `<title>`** | Currently `BSTS — Secure the data. Enable the AI. Prove the controls.` Brand-forward and good copy, but it leads with the slogan and uses only the abbreviation. A more discovery-oriented alternative would be `Bevier Strategic Technology Solutions — Secure AI & Compliance`. **Not changed** — it is approved brand copy on the most visible surface of the site, and the full name already appears in the `<h1>` area, `og:site_name` and the JSON-LD. Flagged rather than altered. |

---

## O. Risks and unresolved

1. **A new domain takes weeks to index regardless.** Everything above removes
   avoidable delay; it cannot manufacture crawl budget. The real lever is
   legitimate inbound links, of which there are currently zero.
2. **`bevierstrategic.pages.dev` still serves the same content.** Cloudflare does
   not switch it off. Canonicals now point at the custom domain so Google should
   consolidate, but if Search Console ever reports *"Duplicate, Google chose
   different canonical"*, add a Cloudflare Bulk Redirect from the pages.dev host
   to `bevierstrategic.com` (301, preserve path and query). Not done pre-emptively
   because it is a dashboard change, not a code change, and the printed QR codes
   currently resolve through that host.
3. **`/start/` has no `<h1>`.** It is a two-line `noindex` forwarding page. Adding
   a heading would be visually intrusive for a page that exists for two seconds.
   Considered and declined; no SEO impact since it is not indexed.
4. **The GBP description is exactly 750 characters.** Any edit needs re-counting.
5. **`claims.test.ts` guards the website, not the world.** The SOC 2 boundary is
   enforced in code but nothing enforces it on Google Business Profile, LinkedIn,
   a directory listing or a proposal. That is precisely where it will drift.
6. **Core Web Vitals cannot be assessed yet** — needs 28 days of field data.
   No obvious performance defects were found: images carry explicit dimensions,
   fonts are self-hosted (no external CDN), and there is no render-blocking
   third-party script.

---

## P. Deployment plan

On approval:

1. Commit the 2 modified and 5 added files as one commit
2. Generate patch `0020` against the current remote
3. Update `PUSH_IT.bat` with the new base and expected tree hash
4. Deliver patch + script + `APPLY_THIS.md` to `_Website Patch`
5. **You** run `PUSH_IT.bat`, which re-clones, verifies the base commit, applies
   the patch, checks the resulting tree hash, confirms a clean working tree,
   then runs lint + typecheck + tests + production build, and pushes only if
   every gate passes

**Live effect of deploying:** the sitemap drops from 17 to 15 URLs, and two extra
JSON-LD fields plus one new JSON-LD block appear in the page head. Nothing visible
changes. No route changes. No copy changes.

**Nothing has been pushed.** Awaiting approval.
