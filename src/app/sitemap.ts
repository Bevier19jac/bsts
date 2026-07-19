import type { MetadataRoute } from "next";
import { articles } from "@/lib/content/articles";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/solutions",
    "/industries",
    "/industries/hospitality",
    "/method",
    "/security",
    "/about",
    "/insights",
    "/contact",
    "/os",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}/`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${site.url}/insights/${a.slug}/`,
    lastModified: a.published,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
