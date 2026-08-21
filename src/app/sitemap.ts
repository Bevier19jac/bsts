import type { MetadataRoute } from "next";
import { articles } from "@/lib/content/articles";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site: the landing page carries all primary content in tabs.
  const staticRoutes = [
    "",
    "/method",
    "/assurance",
    "/advisors",
    "/government",
    "/government/capability-statement",
    "/solutions",
    "/solutions/build",
    "/contact",
    "/insights",
    "/os",
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
