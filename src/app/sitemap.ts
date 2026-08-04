import type { MetadataRoute } from "next";
import { articles } from "@/lib/content/articles";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site: the landing page carries all primary content in tabs.
  const staticRoutes = [
    "",
    "/method",
    "/government",
    "/government/capability-statement",
    "/os",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}/`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/government" ? 0.9 : 0.7,
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
