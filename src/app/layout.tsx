import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { NetworkBackground } from "@/components/ui/NetworkBackground";
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
    "secure AI implementation",
    "technology transformation",
    "intelligent automation",
    "systems integration",
    "strategic technology consulting",
    "NIST-aligned security",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.shortName} — ${site.tagline}`,
    description: site.subline,
    url: site.url,
    images: [
      {
        url: "/share-card.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — with an M1 Abrams tank representing hardened security.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — ${site.tagline}`,
    description: site.subline,
    images: ["/share-card.png"],
  },
  robots: { index: true, follow: true },
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
    "Technology transformation",
    "Systems integration",
    "Intelligent automation",
    "Cybersecurity",
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
        <NetworkBackground />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
