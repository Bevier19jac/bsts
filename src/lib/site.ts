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
  url: "https://bsts.pages.dev",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  description:
    "BSTS is a strategic technology transformation and secure AI implementation firm. We build around the systems you already run — secure AI, intelligent automation, and connected digital experiences.",
} as const;

export const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/method", label: "Method" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/os", label: "BSTS OS" },
] as const;

export const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/method", label: "The BSTS Method" },
    { href: "/security", label: "Security" },
    { href: "/insights", label: "Insights" },
  ],
  work: [
    { href: "/solutions", label: "Solutions" },
    { href: "/industries", label: "Industries" },
    { href: "/industries/hospitality", label: "Hospitality" },
    { href: "/os", label: "BSTS OS" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/** Compliance-safe disclaimer used wherever frameworks are referenced. */
export const frameworkDisclaimer =
  "References to security frameworks such as NIST CSF 2.0, SOC 2, and OWASP describe the practices that inform our methodology. They do not imply certification, accreditation, endorsement, or an audit opinion.";
