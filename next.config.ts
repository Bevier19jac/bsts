import type { NextConfig } from "next";

/**
 * BSTS — static-export configuration for zero-cost Cloudflare Pages deployment.
 * The site and the BSTS OS demonstration are fully static at the edge;
 * all interactivity is client-side (typed local data, JSON import/export).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // No image-optimization server exists in a static export.
    unoptimized: true,
  },
};

export default nextConfig;
