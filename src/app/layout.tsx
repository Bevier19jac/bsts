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
  // Relative canonical: each statically exported page resolves its own URL
  // against metadataBase, so moving to a custom domain is a one-line change.
  alternates: { canonical: "./" },
};

export const viewport: Viewport = {
  themeColor: "#0b0e13",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: site.shortName,
  description: site.description,
  url: site.url,
  slogan: site.tagline,
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
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
