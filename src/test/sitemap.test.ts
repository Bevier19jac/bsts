import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import sitemap from "@/app/sitemap";
import robotsRoute from "@/app/robots";
import { site } from "@/lib/site";

/**
 * A sitemap is a request to index. A `noindex` directive is a request not to.
 * Sending both for the same URL is not a stylistic inconsistency — Google
 * Search Console reports it as "Submitted URL marked noindex" and counts it as
 * an error against the property.
 *
 * Two routes were shipping in exactly that state: /start, the forwarding page
 * behind the printed QR codes, and /government/capability-statement, which is
 * deliberately linkable but deliberately not indexed. Both were removed from
 * the sitemap. Neither page changed; only the claim that Google should index
 * them did.
 *
 * The failure mode this guards against is quiet. Someone adds a route to the
 * sitemap array — the obvious thing to do when adding a page — without noticing
 * the page also sets robots.index = false. Nothing breaks, the build passes,
 * and the error only ever appears inside Search Console weeks later.
 */

const APP = join(__dirname, "..", "app");

/** Walk src/app and map each public route to whether its page sets noindex. */
function routeIndexability(): Map<string, boolean> {
  const out = new Map<string, boolean>();

  function walk(dir: string, route: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (!statSync(full).isDirectory()) continue;

      // Route groups like (marketing) organise files without adding a segment.
      const isGroup = entry.startsWith("(") && entry.endsWith(")");
      // Dynamic segments are covered by the article branch of the sitemap.
      const isDynamic = entry.startsWith("[");
      const next = isGroup ? route : `${route}/${entry}`;

      const page = join(full, "page.tsx");
      let source = "";
      try {
        source = readFileSync(page, "utf8");
      } catch {
        source = "";
      }

      if (source && !isDynamic) {
        // Matches `robots: { index: false, ... }` in the exported metadata.
        // `[^}]*` already spans newlines, so no dotAll flag is needed — and
        // the `s` flag would require an es2018 target this project does not set.
        const noindex = /robots:\s*\{[^}]*index:\s*false/.test(source);
        out.set(next === "" ? "/" : next, noindex);
      }

      walk(full, next);
    }
  }

  walk(APP, "");
  return out;
}

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("lists no route that sets robots noindex", () => {
    const indexability = routeIndexability();
    const offenders: string[] = [];

    for (const url of urls) {
      const path = url.replace(site.url, "").replace(/\/$/, "") || "/";
      if (indexability.get(path) === true) offenders.push(path);
    }

    expect(
      offenders,
      `These routes are in the sitemap but send robots noindex. A sitemap is a ` +
        `request to index; noindex is a request not to. Remove them from ` +
        `src/app/sitemap.ts, or make the page indexable — but do not ship both.`,
    ).toEqual([]);
  });

  it("keeps the two deliberately unindexed routes out", () => {
    // Named explicitly so that re-adding either one is a conscious act.
    expect(urls).not.toContain(`${site.url}/start/`);
    expect(urls).not.toContain(`${site.url}/government/capability-statement/`);
  });

  it("uses the canonical production origin for every entry", () => {
    for (const url of urls) {
      expect(url.startsWith("https://bevierstrategic.com/")).toBe(true);
    }
  });

  it("contains no duplicates", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("ends every URL with a trailing slash, matching the export", () => {
    // next.config.ts sets trailingSlash: true. A sitemap entry without the
    // slash would be a redirect hop for the crawler on every single URL.
    for (const url of urls) expect(url.endsWith("/")).toBe(true);
  });

  it("still lists the pages that carry the business", () => {
    for (const path of ["", "/services", "/method", "/government", "/contact"]) {
      expect(urls).toContain(`${site.url}${path}/`);
    }
  });
});

describe("robots", () => {
  const robots = robotsRoute();

  it("allows crawling and points at the production sitemap", () => {
    expect(robots.sitemap).toBe("https://bevierstrategic.com/sitemap.xml");
    const rules = Array.isArray(robots.rules) ? robots.rules[0] : robots.rules;
    expect(rules?.allow).toBe("/");
    expect(rules?.disallow).toBeUndefined();
  });
});
