import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Web app manifest — drives Android/Chrome "Add to Home Screen".
 *
 * The home-screen icon is the tank composition (see scripts/build-app-icons.mjs),
 * not the browser favicon. Phones render this icon far larger than a favicon
 * tab, which is where the tank reads and a bare wordmark does not.
 *
 * `purpose: "any"` and `purpose: "maskable"` are declared as SEPARATE entries
 * on purpose. Declaring one icon as "any maskable" makes the launcher assume it
 * is safe to crop to any shape, which would clip the gun tube; the maskable
 * file is composed tighter precisely so it survives that crop.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BSTS",
    short_name: "BSTS",
    description:
      "Bevier Strategic Technology Solutions — Secure the data. Enable the AI. Prove the controls.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0e13",
    theme_color: "#0b0e13",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
