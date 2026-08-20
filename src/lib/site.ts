import { soc2Boundary } from "@/lib/content/positioning";

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
  { badge: string; heading: string; explanation: string; short: string }
> = {
  planned: {
    badge:
      "Service-Disabled Veteran-Owned & Operated · SBA VetCert application planned",
    heading: "Service-Disabled Veteran-Owned & Operated",
    short: "Service-Disabled Veteran-Owned & Operated",
    explanation:
      "BSTS is service-disabled veteran-owned and operated, and is led day to day by its founder. Federal SDVOSB certification will be pursued through SBA VetCert following company registration.",
  },
  submitted: {
    badge:
      "Service-Disabled Veteran-Owned & Operated · SBA VetCert application pending",
    heading: "Service-Disabled Veteran-Owned & Operated",
    short: "Service-Disabled Veteran-Owned & Operated",
    explanation:
      "BSTS is service-disabled veteran-owned and operated. An application for federal SDVOSB certification has been submitted through SBA VetCert and is pending review.",
  },
  certified: {
    badge: "SBA-certified Service-Disabled Veteran-Owned Small Business",
    heading: "SDVOSB",
    short: "SBA-certified Service-Disabled Veteran-Owned Small Business",
    explanation:
      "BSTS is an SBA-certified Service-Disabled Veteran-Owned Small Business, eligible for SDVOSB set-aside and sole-source federal contracting.",
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
  tagline: "Secure the data. Enable the AI. Prove the controls.",
  subline:
    "Secure AI · Intelligent Automation · Cybersecurity · Compliance Readiness",
  promise:
    "Secure the data. Enable the AI. Prove the controls. Keep what already works, connect what is disconnected, and automate what is repetitive — without giving up control of company information.",
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
    "BSTS is a veteran-owned consultancy at the intersection of AI, automation, cybersecurity, and compliance. We help growing organizations adopt AI securely, automate high-value workflows, govern how AI touches sensitive data, and build the controls and evidence that customer security reviews and SOC 2 readiness demand.",
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
    name: "AI, Security & Automation Assessment",
    stage: "Discover",
    positioning: "Know what to automate, what to secure, and in what order.",
    deliverables: [
      "Workflow map, systems inventory, and data-flow review",
      "AI use-case and shadow-AI review with risk observations",
      "Compliance obligations in scope and control gaps identified",
      "Prioritized 90-day roadmap, budget ranges, and an executive briefing",
    ],
    priceLine: pricing.assessment,
  },
  {
    slug: "sprint-offer",
    name: "30-Day Secure Automation Sprint",
    stage: "Implement",
    positioning: "Move one high-value process from manual to operational.",
    deliverables: [
      "One defined workflow built as a working automation, integration, or internal tool",
      "Data boundaries and security testing before it touches real records",
      "Human approval on consequential actions, with logging built in",
      "Documentation, staff handoff, and a post-launch support window",
    ],
    priceLine: pricing.sprint,
  },
  {
    slug: "transformation-offer",
    name: "Governance & Assurance Program",
    stage: "Govern & Assure",
    positioning:
      "For organizations facing SOC 2, a customer security review, or AI adoption at scale.",
    deliverables: [
      "AI governance and security policy set with named control owners",
      "Control inventory mapped across the frameworks that apply to you",
      "Gap remediation tracking and evidence organization",
      "Audit-readiness maintained between cycles, with evidence automated where systems allow",
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
  { href: "/#services", label: "What we do" },
  { href: "/assurance", label: "Continuous assurance" },
  { href: "/government", label: "Government" },
  { href: "/advisors", label: "For advisors" },
] as const;

export const footerLinks = {
  explore: [
    { href: "/#overview", label: "Overview" },
    { href: "/#services", label: "What we do" },
    { href: "/method", label: "How we work" },
    { href: "/assurance", label: "Continuous assurance" },
    { href: "/#assessment", label: "The Bevier Breakdown" },
  ],
  more: [
    { href: "/government", label: "Government" },
    { href: "/advisors", label: "For advisors" },
    { href: "/security", label: "Security practice" },
    { href: "/#about", label: "About" },
    { href: "/insights", label: "Insights" },
    { href: "/os", label: "BSTS Lab — OS demonstration" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

/** Compliance-safe disclaimer used wherever frameworks are referenced. */
export const frameworkDisclaimer =
  `References to security and AI frameworks such as SOC 2, NIST CSF 2.0, NIST SP 800-53, the NIST AI Risk Management Framework, ISO/IEC 27001, HIPAA, and CMMC describe the practices that inform our methodology and the requirements we help clients prepare for. They do not imply certification, accreditation, endorsement, or an audit opinion. ${soc2Boundary}`;

/** Federal-experience disclaimer used near veteran/federal references. */
export const federalDisclaimer =
  "Military and federal experience described here does not imply endorsement by the U.S. Army, the Department of Defense, the SBA, or any government agency.";

/** Primary call-to-action target — the assessment tab on the landing page. */
export const assessmentCta = {
  href: "/#assessment",
  label: "Start the Bevier Breakdown",
} as const;

/**
 * Secondary call to action — a person, not a form-driven triage. Points at
 * the discovery-conversation page. No scheduling link is invented here: if
 * site.schedulingUrl is ever set, that becomes the destination instead.
 */
export const discoveryCta = {
  href: "/contact",
  label: "Start a Discovery Conversation",
} as const;

/**
 * Routing options on the discovery-conversation page. Values are submitted
 * verbatim so the inbound reason is unambiguous.
 */
export const discoveryReasons = [
  "Commercial discovery — my own organization",
  "Government capability briefing",
  "Teaming or subcontracting",
  "Advisor or referral introduction",
  "Something else",
] as const;

/**
 * The note shown with the assessment: what visitors should NOT enter.
 * Kept central so the wording stays consistent everywhere it appears.
 */
export const sensitiveDataNotice =
  "Please describe systems and workflows in plain language only. Do not include passwords, API keys, security secrets, classified or controlled unclassified information, protected health information, payment-card data, or confidential customer records.";

/* ------------------------------------------------------------------ */
/* Federal / government-business configuration                         */
/* ------------------------------------------------------------------ */

/** Sensitive-information warning for the federal contact form. */
export const federalSensitiveNotice =
  "Do not submit classified information, controlled unclassified information, procurement-sensitive information, source-selection information, passwords, credentials, protected health information, or other sensitive records through this form.";

/** Full federal disclaimer for the Government page and capability statement. */
export const federalDisclaimerFull =
  "Military and federal experience described on this site reflects the founder's individual background and does not imply endorsement by the U.S. Army, Department of Defense, Department of Transportation, Small Business Administration, or any government agency. References to federal acquisition programs and security frameworks describe potential engagement paths and methodology; eligibility depends on current registrations, certifications, solicitation requirements, and contracting-officer determinations.";

/**
 * Business-formation status. Update to "formed" ONLY after the state filing
 * is approved and the exact legal entity name is confirmed — the public
 * label and displayed name switch automatically.
 */
export type FormationStatus = "pre_formation" | "formed";
export const formationStatus: FormationStatus = "pre_formation";

/**
 * Federal-facing contact. Until a verified business-domain email exists,
 * this stays empty and public federal surfaces point to the Government
 * contact page instead of printing a personal address prominently. The
 * private form-delivery destination is configured server-side at the form
 * provider and is not exposed here.
 */
export const federalContactEmail =
  process.env.NEXT_PUBLIC_FEDERAL_CONTACT_EMAIL ?? "";
export const federalContactDisplay =
  federalContactEmail ||
  `${site.url.replace("https://", "")}/government`;

/**
 * Acquisition profile. PUBLIC RULE: fields with empty values are HIDDEN on
 * the public site — never rendered as placeholder text of any kind.
 * Fill each value only when the real identifier is issued and verified
 * (see FEDERAL_LAUNCH_CHECKLIST.md for the founder's action list).
 */
export const acquisition = {
  fields: [
    // Pre-formation: "Company name" — the legal-entity label appears only
    // once the filing is approved and site.legalName is verified.
    {
      pre_formation: { label: "Company name", value: site.name },
      formed: { label: "Legal business name", value: site.legalName },
    }[formationStatus],
    {
      label: "Business status",
      value: "Service-Disabled Veteran-Owned & Operated",
    },
    { label: "Service area", value: "United States · remote-capable delivery" },
    { label: "SAM registration", value: "" }, // e.g. "Active" — only when true
    { label: "UEI", value: "" },
    { label: "CAGE code", value: "" },
    { label: "Primary NAICS", value: "" }, // e.g. "541511, 541512, 541519, 541690"
    { label: "PSC codes", value: "" },
    { label: "Contact", value: federalContactDisplay },
  ],
  /**
   * Honest high-level status line shown while identifiers above are unissued.
   * Remove (set to "") once SAM/UEI/CAGE are live and displayed.
   */
  statusLine:
    "Business formation and federal registrations are in progress. Verified identifiers will be published as they are issued.",
} as const;

/** Only the acquisition fields that have real values — for public rendering. */
export function visibleAcquisitionFields() {
  return acquisition.fields.filter((f) => f.value.trim() !== "");
}

/** Capability statement route (print-friendly; browser print → PDF). */
export const capabilityStatementPath = "/government/capability-statement";
