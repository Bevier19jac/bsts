# Google Search Console — setup and first 30 days

Canonical production domain: **`bevierstrategic.com`**

This is a manual owner task. None of it can be automated from the repository, and
none of it changes the site.

---

## 1. Add a Domain property — not a URL-prefix property

Go to [search.google.com/search-console](https://search.google.com/search-console)
and choose **Add property → Domain**. Enter:

```
bevierstrategic.com
```

No `https://`, no `www`, no trailing slash. Domain properties take the bare host.

**Why Domain and not URL prefix.** A URL-prefix property covers exactly one
origin. `https://bevierstrategic.com` and `https://www.bevierstrategic.com` would
be two separate properties reporting two separate halves of the same site, and
`http://` variants a third and fourth. Both hostnames currently resolve to the
Cloudflare Pages project, so a URL-prefix property would silently under-report
from day one. A Domain property covers every subdomain and both protocols in one.

## 2. Verify by DNS

Google will show a TXT record like:

```
google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

DNS for `bevierstrategic.com` is at Cloudflare, so:

> Cloudflare dashboard → **bevierstrategic.com** → **DNS** → **Records** →
> **Add record** → Type `TXT`, Name `@`, Content = the string Google gave you →
> **Save**

Then click **Verify** in Search Console. Cloudflare DNS propagates in seconds;
if it fails, wait two minutes and retry rather than adding a second record.

Cloudflare may also offer a one-click Search Console integration under the domain's
integrations. Either path works — the TXT record is the same either way.

**Leave the TXT record in place permanently.** Deleting it after verification
un-verifies the property, and Google re-checks periodically.

## 3. Confirm Google sees the right host

Once verified, run **URL Inspection** on:

```
https://bevierstrategic.com/
```

Confirm the reported canonical is `https://bevierstrategic.com/` and not a
`pages.dev` address. It should be — the canonical tags were moved with the domain
— but this is the cheapest possible check on the most expensive possible mistake.

---

## 4. Submit the sitemap

**Sitemaps → Add a new sitemap →** enter:

```
sitemap.xml
```

Full URL for reference:

```
https://bevierstrategic.com/sitemap.xml
```

Expect **Success** and **15 discovered URLs**. If it reports a different count,
the deployed build is not the one this document describes.

`robots.txt` already declares it:

```
User-Agent: *
Allow: /

Sitemap: https://bevierstrategic.com/sitemap.xml
```

---

## 5. Request indexing — priority order

**URL Inspection → paste the URL → Test Live URL → Request Indexing.**

Requests are rate-limited to roughly a dozen a day. Spend them in this order and
stop after the first five on day one:

| # | URL | Why this rank |
|---|---|---|
| 1 | `https://bevierstrategic.com/` | Establishes the entity. Everything else is discovered from here. |
| 2 | `https://bevierstrategic.com/services/` | Highest commercial intent — the full service menu and pricing |
| 3 | `https://bevierstrategic.com/method/` | Discover → Implement → Govern → Assure. The differentiator. |
| 4 | `https://bevierstrategic.com/contact/` | Conversion endpoint |
| 5 | `https://bevierstrategic.com/who-we-help/` | Audience qualification |
| 6 | `https://bevierstrategic.com/government/` | Distinct audience, distinct search intent |
| 7 | `https://bevierstrategic.com/insights/soc-2-readiness-is-not-soc-2-certification/` | The strongest single piece of content on the site — high-intent query, genuinely useful, and it demonstrates the SOC 2 boundary rather than just asserting it |
| 8 | `https://bevierstrategic.com/assurance/` | Continuous assurance positioning |
| 9 | `https://bevierstrategic.com/advisors/` | Referral-partner audience |
| 10 | `https://bevierstrategic.com/insights/` | Hub for the articles |

**Do not request** `/start/` or `/government/capability-statement/`. Both are
deliberately `noindex`; requesting them wastes quota and asks Google for something
the pages themselves refuse.

**Do not re-request an unchanged URL.** Repeated requests for the same URL do not
speed anything up and are explicitly discouraged by Google. Request once, then
wait. Re-request only after the page's content actually changes.

---

## 6. What to check, and when

### After 24 hours

- **Sitemaps** — status `Success`, 15 URLs discovered
- **URL Inspection** on the homepage — "URL is on Google" for at least the
  homepage is common within a day of a manual request
- **Page Indexing** will still be mostly empty. That is normal, not a problem.

### After 7 days

- **Page Indexing** — expect most of the 15 sitemap URLs to be indexed or at
  least "Discovered". Read the exclusion reasons rather than the totals:
  - *Crawled – currently not indexed* — Google saw it and chose to wait. Common
    for new domains. Not an error. Do not re-request; get a real inbound link.
  - *Discovered – currently not indexed* — queued. Wait.
  - *Duplicate, Google chose different canonical* — **investigate.** On this site
    it would most likely mean a `pages.dev` URL is still competing.
  - *Excluded by 'noindex' tag* — expected for `/start/`,
    `/government/capability-statement/` and the 404. Correct, not a defect.
  - *Submitted URL marked 'noindex'* — **should never appear.** If it does, the
    sitemap and a page's robots directive disagree. `src/test/sitemap.test.ts`
    exists to make that impossible; a sighting means the deployed build predates
    that test.
- **HTTPS** report — expect all HTTPS. Cloudflare handles the certificate.

### After 30 days

- **Performance** — first impressions should be appearing. Expect brand queries
  ("BSTS", "Bevier Strategic") before service queries. Service queries for a
  one-month-old domain with no backlinks are unrealistic.
- **Core Web Vitals** — needs 28 days of field data and enough traffic. It may
  still read "Not enough data", which is not a fault.
- **Links** — will be near-empty. This is the real constraint on a new domain,
  and no amount of Search Console activity substitutes for it. One legitimate
  inbound link from a LinkedIn company page does more for crawl frequency than
  ten indexing requests.

---

## 7. Bing — worth the ten minutes

[bing.com/webmasters](https://www.bing.com/webmasters) supports **Import from
Google Search Console**, which carries the property and sitemap across in one
click.

Bing matters more than its search share suggests: its index feeds DuckDuckGo and
ChatGPT search. For a company selling AI services, being absent from the index
that AI assistants read is a specific kind of own goal.

### IndexNow via Cloudflare

> Cloudflare dashboard → **bevierstrategic.com** → **Caching** → **Configuration**
> → enable **Crawler Hints**

Free on all plans. Cloudflare then notifies IndexNow whenever content changes,
so Bing, Yandex and Seznam learn about a deploy within minutes instead of waiting
for a crawl.

**Google does not participate in IndexNow.** Enable it for what it does, not for
what it does not. For Google, the sitemap plus manual requests remain the levers.

---

## 8. What not to do

- No paid backlinks, link exchanges or directory-blast services. Google's link
  spam systems handle these, and a manual action on a one-month-old domain is a
  hole that takes months to climb out of.
- No "instant indexing" services. The Indexing API is limited to job posting and
  live-stream markup; anything claiming otherwise for a marketing site is selling
  nothing.
- No re-requesting the same unchanged URL daily.
- No keyword-stuffed pages built to rank. The site's credibility is the product.

The honest summary: a new domain with no inbound links takes weeks to index fully
no matter what is done in Search Console. The setup above removes every avoidable
delay. The remaining delay is Google deciding the site is worth its crawl budget,
and the only real lever on that is legitimate links and genuinely useful content —
of which `/insights/` already has three pieces.
