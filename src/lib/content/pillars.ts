import {
  Boxes,
  Cable,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Pillar = {
  slug: string;
  icon: LucideIcon;
  title: string;
  promiseLine: string;
  /** One-sentence outcome, in the buyer's terms. */
  outcome: string;
  summary: string;
  detail: string;
  examples: string[];
  /** A realistic, non-client illustrative example. */
  example: string;
  /** "Good fit when…" guidance, revealed via disclosure. */
  goodFit: string[];
};

/**
 * The five solution pillars map one-to-one to the BSTS core promise:
 * keep, connect, automate, build, secure.
 *
 * Examples are deliberately cross-industry (CRM, ERP, ticketing, compliance
 * evidence). Hospitality-specific detail lives inside the clearly labeled
 * Solara House concept demonstration only.
 */
export const pillars: Pillar[] = [
  {
    slug: "keep",
    icon: Boxes,
    title: "Keep what works",
    promiseLine: "Stack assessment & modernization strategy",
    outcome:
      "A defensible modernize-vs-replace decision for every core system, before any money moves.",
    summary:
      "Most technology projects fail by replacing too much. We start by mapping what you already run, what it costs, and what it quietly does well — then we protect it.",
    detail:
      "A BSTS engagement never opens with a rebuild pitch. It opens with an honest inventory: your CRM, your accounting or ERP platform, your document repository, your ticketing and scheduling tools, your shared inboxes, your spreadsheets. We document how work actually flows through them, identify the systems that are earning their keep, and design around them instead of over them. The result is a modernization strategy measured in disruption avoided, not licenses sold.",
    examples: [
      "Full-stack inventory and data-flow mapping",
      "Cost-of-ownership and contract review",
      "Modernize-vs-replace decision records for every core system",
    ],
    example:
      "A professional-services firm keeps its trusted accounting platform and document repository; only the brittle reporting layer between them is rebuilt.",
    goodFit: [
      "You suspect a vendor's replacement pitch is bigger than your actual problem",
      "Nobody has a current inventory of tools, licenses, and integrations",
      "Leadership wants a modernization plan with reasons, not slogans",
    ],
  },
  {
    slug: "connect",
    icon: Cable,
    title: "Connect what is disconnected",
    promiseLine: "Integration & data unification",
    outcome:
      "A record entered once appears everywhere it is needed — no re-keying, no version conflicts.",
    summary:
      "Re-keying the same record into three systems is not a staffing problem — it is an integration problem. We make your existing systems talk to each other.",
    detail:
      "Disconnected systems tax every day of operations: double entry between the CRM and the accounting platform, approval workflows living in inboxes, reporting by copy-paste from four tools into one spreadsheet. We build the connective tissue — secure APIs, event syncs, and shared data models — so a record entered once appears everywhere it is needed. Where vendors expose APIs we use them; where they do not, we design resilient, auditable bridges rather than brittle hacks.",
    examples: [
      "CRM ↔ accounting/ERP ↔ operations synchronization",
      "A single customer, client, or asset record across tools",
      "Reporting pipelines that end copy-paste consolidation",
    ],
    example:
      "A logistics operator's dispatch spreadsheet, invoicing system, and customer portal share one synchronized job record instead of three retyped versions.",
    goodFit: [
      "Staff retype the same data into two or more systems",
      "Reports are assembled by copy-paste and go stale immediately",
      "Customers or field teams see different versions of the same record",
    ],
  },
  {
    slug: "automate",
    icon: Workflow,
    title: "Automate what is repetitive",
    promiseLine: "Intelligent workflow automation",
    outcome:
      "The repetitive middle of your operation runs monitored and reversible — judgment stays with your people.",
    summary:
      "If a task is performed the same way every day, software should perform it. We automate the repetitive middle of your operation and leave judgment to your people.",
    detail:
      "We identify the workflows your team performs on autopilot — confirmations, reconciliations, schedule builds, approval chasing, status updates, compliance-evidence collection — and convert them into monitored, reversible automations. Every automation ships with a clear owner, a visible audit trail, and a manual override. Automation at BSTS means your staff does more meaningful work, not that your operation runs unattended.",
    examples: [
      "Customer and client communication sequences",
      "Nightly reconciliation and exception reports",
      "Approval routing and status chasing with human review at every decision point",
    ],
    example:
      "A ticketing queue that once needed an hour of morning triage routes itself by rule, with exceptions flagged for a human before anything is sent.",
    goodFit: [
      "A capable person spends hours weekly on work a script could do",
      "Approvals stall in shared inboxes and get chased by hand",
      "Evidence for audits or compliance is gathered manually every cycle",
    ],
  },
  {
    slug: "build",
    icon: Sparkles,
    title: "Build what is missing",
    promiseLine: "Custom software & secure AI implementation",
    outcome:
      "The one tool the market doesn't sell — small, sharp, documented, and secured from the first commit.",
    summary:
      "When the market genuinely lacks the tool you need, we build it — small, sharp, and secured from the first commit. This includes responsible, well-scoped AI.",
    detail:
      "Custom software is a last resort we happen to be very good at. Where AI is the right answer — drafting responses, summarizing operational data, surfacing anomalies in a knowledge base — we implement it with guardrails: private data boundaries, human approval on outbound actions, and honest documentation of what the model can and cannot do. Where AI is the wrong answer, we say so.",
    examples: [
      "Purpose-built internal tools and customer portals",
      "AI-assisted drafting and summarization with human review",
      "Decision-support dashboards fed by your unified data",
    ],
    example:
      "A compliance-heavy team gets an internal portal that drafts recurring reports from their own operational data — every draft reviewed by a person before it leaves.",
    goodFit: [
      "You've outgrown spreadsheets but off-the-shelf tools don't fit the workflow",
      "You want AI capability without customer data leaving your boundary",
      "A dashboard everyone trusts would end weekly status-meeting archaeology",
    ],
  },
  {
    slug: "secure",
    icon: ShieldCheck,
    title: "Secure the foundation",
    promiseLine: "Security architecture & readiness",
    outcome:
      "A written security baseline your organization can act on, aligned to recognized frameworks.",
    summary:
      "Security is the floor the rest stands on. Our practice is informed by NIST CSF 2.0, OWASP secure-development guidance, and Zero Trust principles.",
    detail:
      "Every BSTS engagement includes a security baseline: identity and access review, least-privilege by default, encrypted data in transit and at rest, and a written incident-response starting point. For organizations pursuing SOC 2, we provide readiness support — controls mapping, evidence habits, and gap remediation. We are precise about language: readiness support is not certification, and we never claim otherwise.",
    examples: [
      "NIST-aligned security baseline and gap assessment",
      "Identity, access, and least-privilege review",
      "SOC 2 readiness support and evidence-collection habits",
    ],
    example:
      "A government-facing software company gets a controls map and evidence-collection routine before its first SOC 2 readiness conversation with an auditor.",
    goodFit: [
      "Customers or partners are starting to ask security questions you can't answer in writing",
      "Access reviews and offboarding are handled from memory",
      "Compliance pressure is rising faster than headcount",
    ],
  },
];
