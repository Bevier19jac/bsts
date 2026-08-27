import type { MetadataRoute } from "next";
import { articles } from "@/lib/content/articles";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Every route listed here must be indexable.
 *
 * A sitemap is a request to index. Listing a page that also sends
 * `robots: noindex` asks Google for two opposite things at once, and Search
 * Console reports it as "Submitted URL marked noindex" — an error against the
 * property, not a note. Two routes were doing exactly that and have been
 * removed:
 *
 *   /start                            noindex, nofollow — a forwarding page
 *                                     for the printed QR codes, not content.
 *                                     Still served, still works, just no
 *                                     longer advertised for indexing.
 *   /government/capability-statement  noindex, follow — deliberately reachable
 *                                     and linkable, deliberately not indexed.
 *
 * `src/test/sitemap.test.ts` enforces this: it reads the robots directive out
 * of every route's page module and fails if a noindexed one appears below.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/method",
    "/who-we-help",
    "/government",
    "/advisors",
    "/assurance",
    "/contact",
    "/insights",
    "/security",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}/`,
    changeFrequency: "monthly" as const,
    priority:
      path === ""
        ? 1
        : path === "/government" || path === "/assurance"
          ? 0.9
          : path === "/advisors" || path === "/method"
            ? 0.8
            : 0.7,
  }));

  // Article pages still exist and remain linkable/sharable.
  const articleRoutes = articles.map((a) => ({
    url: `${site.url}/insights/${a.slug}/`,
    lastModified: a.published,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
