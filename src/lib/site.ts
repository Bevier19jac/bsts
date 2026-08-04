/**
 * Central site configuration. No secrets live here — NEXT_PUBLIC_CONTACT_EMAIL
 * is optional and the site operates fully without it (demo/local mode).
 */
export const site = {
  name: "Bevier Strategic Technology Solutions",
  shortName: "BSTS",
  tagline: "Technology built around your business.",
  subline: "Secure AI. Intelligent automation. Connected digital experiences.",
  promise:
    "Keep what works. Connect what is disconnected. Automate what is repetitive. Build what is missing. Secure the foundation.",
  url: "https://bevierstrategic.pages.dev",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  description:
    "BSTS is a boutique technology transformation and secure AI implementation firm. We build around the systems you already run — secure AI, intelligent automation, and connected digital experiences.",
} as const;

/**
 * The site is a single landing page with tabs; navigation points at tab
 * anchors on "/" rather than separate routes.
 */
export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#method", label: "How we work" },
  { href: "/#about", label: "About" },
] as const;

export const footerLinks = {
  explore: [
    { href: "/#overview", label: "Overview" },
    { href: "/#services", label: "Services" },
    { href: "/#method", label: "How we work" },
    { href: "/#about", label: "About" },
    { href: "/#assessment", label: "Assessment" },
    { href: "/os", label: "BSTS OS demo" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

/** Compliance-safe disclaimer used wherever frameworks are referenced. */
export const frameworkDisclaimer =
  "References to security frameworks such as NIST CSF 2.0, SOC 2, and OWASP describe the practices that inform our methodology. They do not imply certification, accreditation, endorsement, or an audit opinion.";

/** Primary call-to-action target — the assessment tab on the landing page. */
export const assessmentCta = { href: "/#assessment", label: "Start an assessment" } as const;
