import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/lib/site";
// Self-hosted variable fonts (no external font CDN, zero-cost, portable).
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.tagline}`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "secure AI consulting",
    "AI automation consulting",
    "AI governance consulting",
    "cybersecurity consulting",
    "SOC 2 readiness",
    "SOC 2 preparation",
    "compliance automation",
    "NIST cybersecurity consulting",
    "AI risk management",
    "secure workflow automation",
    "veteran-owned technology firm",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.shortName} — ${site.tagline}`,
    description: site.subline,
    url: site.url,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — the BSTS monogram over the full company name, above an Abrams tank firing, with the tagline "${site.tagline}"`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — ${site.tagline}`,
    description: site.subline,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  // Home-screen icons are the tank composition; the browser favicon stays the
  // approved BSTS lockup.
  //
  // `icon` has to be restated here even though src/app/icon.svg is unchanged:
  // declaring ANY key under `icons` replaces Next's auto-detected set wholesale
  // rather than merging with it, so adding `apple` alone silently dropped
  // <link rel="icon"> from every page. Keep both entries together.
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "BSTS",
    statusBarStyle: "black-translucent",
  },
  // Relative canonical: each statically exported page resolves its own URL
  // against metadataBase, so moving to a custom domain is a one-line change.
  alternates: { canonical: "./" },
};

export const viewport: Viewport = {
  themeColor: "#0b0e13",
  width: "device-width",
  initialScale: 1,
};

/**
 * One linked graph rather than a lone Organization node.
 *
 * Google resolves an entity by corroborating signals: the site, the legal
 * name, the logo, a reachable contact. Emitting ProfessionalService and
 * WebSite as separate top-level blobs leaves it to infer they describe the
 * same company. @id anchors and a publisher reference say so outright.
 *
 * Deliberately absent, and not to be added without evidence:
 *
 *   address / location   BSTS is a service-area business run from a home.
 *                        The address is on the state filing because the law
 *                        requires it; putting it in structured data would
 *                        publish it to Maps and every scraper that reads
 *                        schema. Not worth a local-pack ranking.
 *   telephone            site.phone is empty. An unanswered number is worse
 *                        than none.
 *   sameAs               Needs verified profile URLs. Guessing a LinkedIn
 *                        slug that 404s actively damages entity resolution.
 *   aggregateRating      There are no customer reviews. Inventing them is
 *                        fraud, and Google has a manual action for it.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  alternateName: site.shortName,
  description: site.description,
  url: site.url,
  slogan: site.tagline,
  email: site.contactEmail,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${site.url}/og.png`,
  founder: { "@type": "Person", name: "Jacob Bevier" },
  knowsAbout: [
    "Secure AI implementation",
    "AI security and governance",
    "AI risk management",
    "Intelligent workflow automation",
    "Cybersecurity consulting",
    "SOC 2 readiness and evidence preparation",
    "Continuous control assurance",
    "Security framework control mapping",
  ],
  areaServed: "US",
  serviceType: [
    "Secure AI & Automation",
    "AI Security & Governance",
    "SOC 2 & Compliance Readiness",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  alternateName: site.shortName,
  description: site.description,
  inLanguage: "en-US",
  publisher: { "@id": `${site.url}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-obsidian text-warm-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
