import {
  Compass,
  Hammer,
  ShieldCheck,
  ClipboardCheck,
  RefreshCw,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { soc2Boundary } from "./positioning";

/**
 * THE BSTS service menu — one connected engagement system, not a catalog.
 *
 * Every service BSTS offers sits in one of five lifecycle stages, in the order
 * a client actually moves through them:
 *
 *     Discover -> Build -> Secure -> Prove -> Maintain
 *
 * plus Digital Foundations, a SUPPORTING implementation category. It is
 * deliberately last and deliberately framed as infrastructure: it is not a
 * fourth pillar of the BSTS identity and must never be presented as one.
 *
 * PRICING PROVENANCE — read before editing a number.
 *
 * The core figures are not chosen here. They come from the authoritative
 * sources, which agree with each other:
 *
 *   - Business Plan §03  — assessment floor $1,500, sprint floor $5,000,
 *     program scoped after assessment and recurring.
 *   - Master Sales & Positioning Playbook §8 + Appendix G — identical floors,
 *     plus the rules of engagement reproduced in `pricingRules` below.
 *
 * `src/lib/site.ts` holds the canonical price sentences; this module imports
 * them rather than restating them, so there is one place to edit.
 *
 * The Digital Foundations ranges are the exception: they appear in NO existing
 * BSTS document and were set directly by the founder. They are new public
 * commitments rather than figures reconciled from the business plan.
 *
 * There is no paid-stage credit scheme in any BSTS source document, and none
 * is invented here. What the sources do describe — and what `progression`
 * below states — is that each stage stands alone and the discovery roadmap is
 * the client's to keep regardless of whether they continue.
 */

export type ServiceStage = {
  slug: string;
  name: string;
  icon: LucideIcon;
  /** One line for the navigation dropdown. */
  navLine: string;
  /** The business problem, in the client's words. */
  problem: string;
  /** What BSTS actually does. */
  work: string[];
  /** What the client is left holding. */
  deliverable: string;
  /** How the engagement runs. */
  format: string;
  /** Public pricing treatment, or null where quoting before scope is wrong. */
  price: string | null;
  /** Optional boundary/disclaimer shown with the stage. */
  boundary?: string;
};

export const lifecycle: ServiceStage[] = [
  {
    slug: "discover",
    name: "Discover",
    icon: Compass,
    navLine: "Find out what to fix, and in what order.",
    problem:
      "You know the operation should run better, and you may be under pressure to “do something with AI,” but nobody has mapped where the hours and the risk actually go.",
    work: [
      "The Bevier Breakdown — structured discovery of workflows and systems",
      "Business and technology discovery with the people doing the work",
      "Workflow and process assessment",
      "AI opportunity assessment — including where AI is the wrong answer",
      "Security and compliance gap assessment",
      "Existing platform and tool inventory",
      "Data-flow discovery — where sensitive information actually travels",
      "Prioritized implementation roadmap",
    ],
    deliverable:
      "A written roadmap ranked by cost and risk, a systems and data-flow map, and an executive briefing. Yours to keep and act on — with us or without us.",
    format: "A facilitated engagement, typically two to three weeks.",
    price: "assessment",
    boundary:
      "Discovery comes first, always. No forced AI, and no solution looking for a problem — sometimes the honest recommendation is a better process rather than new software.",
  },
  {
    slug: "build",
    name: "Build",
    icon: Hammer,
    navLine: "Put one high-value process into production.",
    problem:
      "The same information gets typed into three systems. Reports are assembled by copy-paste. Approvals get chased through inboxes, and the work scales by adding people.",
    work: [
      "Secure AI implementation",
      "Intelligent workflow automation",
      "Business-process automation",
      "System and application integration",
      "Secure RAG and knowledge systems",
      "AI assistants and agents with guardrails",
      "Reporting and reconciliation workflows",
      "Document and form processing",
      "Email and inbox workflows",
      "Workflow orchestration",
      "Deterministic scripts where AI is unnecessary",
    ],
    deliverable:
      "A working system in production — not a slide deck — with data boundaries tested before it touches live records, human approval on consequential actions, logging, documentation and staff handoff.",
    format: "A fixed-scope sprint, typically 30 days, with acceptance criteria agreed in writing first.",
    price: "sprint",
    boundary:
      "BSTS does not recommend AI where a simpler, safer automation does the job. A deterministic script that runs the same way every time often beats a model, and we will say so.",
  },
  {
    slug: "secure",
    name: "Secure",
    icon: ShieldCheck,
    navLine: "Put guardrails around AI before it becomes exposure.",
    problem:
      "People are already pasting company information into AI tools, and nobody can say which tools, which data, or under what rules.",
    work: [
      "AI security architecture",
      "AI governance program development",
      "AI use-case inventory — including shadow AI",
      "Approved-use and acceptable-use policies",
      "Data classification",
      "Data-flow review",
      "Access-control recommendations",
      "DLP recommendations",
      "Human-in-the-loop design",
      "Vendor and model risk review",
      "Platform risk review",
      "Logging and evidence requirements",
      "Responsible-use and oversight controls",
      "NIST AI RMF alignment where useful",
    ],
    deliverable:
      "A governance and security policy set with named control owners, a use-case inventory, and architecture decisions that put payment and identity data structurally out of a model’s reach — excluded by design, not by policy alone.",
    format: "Scoped from the discovery roadmap; delivered alongside or after implementation.",
    price: null,
  },
  {
    slug: "prove",
    name: "Prove",
    icon: ClipboardCheck,
    navLine: "Demonstrate the controls hold, on the record.",
    problem:
      "A large customer has asked for your SOC 2 report, security questionnaires keep getting harder, and controls that exist informally cannot be demonstrated.",
    work: [
      "SOC 2 readiness",
      "Security and compliance readiness assessments",
      "Control inventory and control mapping",
      "Gap analysis",
      "Remediation tracking",
      "Evidence requirements and evidence organization",
      "Policy and procedure alignment",
      "Security questionnaire support",
      "Audit-readiness support",
      "NIST CSF 2.0 · NIST SP 800-53 · ISO 27001",
      "CJIS · HIPAA · CMMC",
      "FedRAMP-related environments where applicable",
    ],
    deliverable:
      "A control inventory mapped to the frameworks that actually apply to you, a tracked remediation list, and evidence organized so an examination is a retrieval exercise rather than a scramble.",
    format: "Scoped following an assessment; often runs as a program rather than a project.",
    price: null,
    // The boundary has exactly one wording site-wide, enforced by
    // src/test/claims.test.ts. Compose around it; never paraphrase it.
    boundary: `BSTS prepares organizations for audits and is not a party to the auditor's opinion. ${soc2Boundary}`,
  },
  {
    slug: "maintain",
    name: "Maintain",
    icon: RefreshCw,
    navLine: "Keep the controls true after the project ends.",
    problem:
      "Evidence goes stale, vendors change, staff turn over, and the automation nobody owns quietly drifts out of alignment with how the business now runs.",
    work: [
      "Continuous assurance",
      "Ongoing control monitoring",
      "Evidence-refresh support",
      "Policy and documentation maintenance",
      "Vendor reassessment",
      "Platform reassessment",
      "AI-governance reviews",
      "Workflow performance reviews",
      "Maintenance of implemented automations",
      "Change-impact reviews and control reviews",
      "Security and compliance advisory support",
    ],
    deliverable:
      "Audit-readiness maintained between cycles, evidence automated where the systems allow it, and a quarterly roadmap that keeps the next decision in front of you.",
    format: "A recurring retainer. Deliberately capped so delivery quality holds.",
    price: "program",
  },
];

export const digitalFoundations: ServiceStage = {
  slug: "digital-foundations",
  name: "Digital Foundations",
  icon: Globe,
  navLine: "Secure, dependable business infrastructure.",
  problem:
    "The website is slow, unmaintained or quietly broken; the domain, email and forms were set up years ago by someone who has since left; and nobody is watching whether any of it is still up.",
  work: [
    "Secure website creation",
    "Website modernization",
    "Website repair",
    "Managed website maintenance",
    "Website security monitoring",
    "Uptime monitoring",
    "Backup and recovery",
    "Domain and DNS configuration",
    "Business email setup",
    "Secure forms",
    "Lead-routing workflows",
    "Privacy-conscious analytics",
    "Accessibility remediation",
    "Performance improvements",
    "Basic business-system connections",
  ],
  deliverable:
    "Infrastructure that stays up, stays patched, stays backed up, and routes enquiries to a person instead of a mailbox nobody owns.",
  format: "Project work, or a monthly managed arrangement.",
  price: "foundations",
};

/** The four Digital Foundations figures, set by the founder. See note above. */
export const foundationsPricing = [
  { item: "Secure website build", price: "$2,500 – $7,500" },
  { item: "Website refresh or repair", price: "$1,250 – $4,000" },
  { item: "Managed maintenance and security", price: "$175 – $500 per month" },
  { item: "Domain, email, forms and analytics setup", price: "Starting at $750" },
] as const;

/**
 * What Digital Foundations is NOT. Kept in code because the boundary is the
 * point: BSTS is a technology consultancy that builds secure infrastructure,
 * not a marketing agency.
 */
export const foundationsExclusions =
  "Not offered: paid advertising, social-media management, content campaigns, generic SEO packages, logo creation, branding packages, or general marketing-agency services.";

/** How paid stages relate to one another. Stated in the Business Plan and Playbook. */
export const progression =
  "Each stage stands on its own. Nothing requires committing to the whole sequence up front, and the roadmap discovery produces is yours to keep whether or not you continue. Most organizations start with an assessment and decide from there.";

/** The pricing rules, verbatim in substance from the Playbook’s Appendix G. */
export const pricingRules = [
  "Published starting prices are floors, and floors are never discounted — when budget is tight, scope shrinks instead.",
  "No final price is quoted before scope is agreed in writing, with acceptance criteria.",
  "The recurring program is never quoted before an assessment.",
  "No hourly rates, and no return-on-investment guarantees.",
] as const;

export const finalScopeNote =
  "Final scope and pricing follow a discovery conversation.";
