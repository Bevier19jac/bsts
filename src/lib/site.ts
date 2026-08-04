/**
 * Central site + business configuration. No secrets live here —
 * NEXT_PUBLIC_CONTACT_EMAIL is optional and the site operates fully
 * without it (demo/local mode).
 *
 * FOUNDER: this file is the single place to update business facts.
 * Public wording elsewhere derives from these values automatically.
 */

/* ------------------------------------------------------------------ */
/* Veteran-ownership / SBA VetCert status                              */
/* ------------------------------------------------------------------ */

/**
 * Update this single value as the certification progresses:
 *  - "planned":   LLC registration underway; VetCert application not yet filed
 *  - "submitted": SBA VetCert application filed and actively pending
 *  - "certified": SBA VetCert issued (only after the certificate is in hand)
 * All public language updates automatically and stays legally accurate.
 */
export type VetCertStatus = "planned" | "submitted" | "certified";
export const vetCertStatus: VetCertStatus = "planned";

const vetCertCopy: Record<
  VetCertStatus,
  { badge: string; heading: string; explanation: string }
> = {
  planned: {
    badge: "Service-disabled veteran-owned and led · SBA VetCert application planned",
    heading: "Veteran-owned & led",
    explanation:
      "BSTS is service-disabled veteran-owned and led. Federal SDVOSB certification will be pursued through SBA VetCert following company registration.",
  },
  submitted: {
    badge: "Service-disabled veteran-owned and led · SBA VetCert application pending",
    heading: "Veteran-owned & led",
    explanation:
      "BSTS is service-disabled veteran-owned and led. An application for federal SDVOSB certification has been submitted through SBA VetCert and is pending review.",
  },
  certified: {
    badge: "Service-Disabled Veteran-Owned Small Business · SBA VetCert certified",
    heading: "SDVOSB",
    explanation:
      "BSTS is an SBA VetCert-certified Service-Disabled Veteran-Owned Small Business, eligible for SDVOSB set-aside and sole-source federal contracting.",
  },
};

export const vetCert = vetCertCopy[vetCertStatus];

/* ------------------------------------------------------------------ */
/* Core identity                                                       */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Bevier Strategic Technology Solutions",
  shortName: "BSTS",
  /** Legal entity — update when the LLC registration completes. */
  legalName: "Bevier Strategic Technology Solutions",
  tagline: "Technology built around your business.",
  subline: "Secure AI. Intelligent automation. Connected digital experiences.",
  promise:
    "Keep what works. Connect what is disconnected. Automate what is repetitive. Build what is missing. Secure the foundation.",
  /** Production URL — change once when moving to the custom domain. */
  url: "https://bevierstrategic.pages.dev",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "bevier19jacob@gmail.com",
  /** Optional: public scheduling link (e.g. Calendly). Empty hides scheduling CTAs. */
  schedulingUrl: "",
  /** Optional: public phone number. Empty hides phone references. */
  phone: "",
  /** Response-time promise shown after a successful submission. Keep honest. */
  responsePromise: "We typically reply within two business days.",
  description:
    "BSTS is a veteran-owned technology consultancy for growing and regulated organizations — secure AI implementation, intelligent automation, and connected systems, built around the tools and teams that already work.",
} as const;

/* ------------------------------------------------------------------ */
/* Engagement offers — the three commercial entry points               */
/* ------------------------------------------------------------------ */

/** Pricing language lives here so one edit updates the whole site. */
export const pricing = {
  assessment: "Typical engagements begin at $1,500.",
  sprint: "Typical projects begin at $5,000.",
  transformation: "Scoped following an assessment.",
} as const;

export const offers = [
  {
    slug: "assessment-offer",
    name: "AI & Automation Assessment",
    positioning: "Know what to automate before you invest.",
    deliverables: [
      "Workflow map and technology inventory",
      "AI and automation opportunity analysis with risk observations",
      "Prioritized recommendations and a 90-day roadmap",
      "Budget ranges and an executive briefing",
    ],
    priceLine: pricing.assessment,
  },
  {
    slug: "sprint-offer",
    name: "30-Day Automation Sprint",
    positioning: "Move one high-value process from manual to operational.",
    deliverables: [
      "One defined workflow, built as a working automation, integration, or internal tool",
      "Security boundaries and testing before it touches real data",
      "Documentation and staff handoff",
      "Post-launch support window",
    ],
    priceLine: pricing.sprint,
  },
  {
    slug: "transformation-offer",
    name: "Secure AI Transformation",
    positioning:
      "For organizations requiring multiple integrations, AI capabilities, governance controls, or phased modernization.",
    deliverables: [
      "Assessment-led roadmap across keep, connect, automate, build, and secure",
      "Phased delivery in short cycles with a demo at every step",
      "Governance, documentation, and security review throughout",
    ],
    priceLine: pricing.transformation,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

/**
 * The site is a single landing page with tabs; navigation points at tab
 * anchors on "/" rather than separate routes.
 */
export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/method", label: "How we work" },
  { href: "/#about", label: "About" },
] as const;

export const footerLinks = {
  explore: [
    { href: "/#overview", label: "Overview" },
    { href: "/#services", label: "Services" },
    { href: "/method", label: "How we work" },
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

/** Federal-experience disclaimer used near veteran/federal references. */
export const federalDisclaimer =
  "Military and federal experience described here does not imply endorsement by the U.S. Army, the Department of Defense, the SBA, or any government agency.";

/** Primary call-to-action target — the assessment tab on the landing page. */
export const assessmentCta = {
  href: "/#assessment",
  label: "Start your assessment",
} as const;

/**
 * The note shown with the assessment: what visitors should NOT enter.
 * Kept central so the wording stays consistent everywhere it appears.
 */
export const sensitiveDataNotice =
  "Please describe systems and workflows in plain language only. Do not include passwords, API keys, security secrets, classified or controlled unclassified information, protected health information, payment-card data, or confidential customer records.";
