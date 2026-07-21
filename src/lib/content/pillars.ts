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
  summary: string;
  detail: string;
  examples: string[];
};

/**
 * The five solution pillars map one-to-one to the BSTS core promise:
 * keep, connect, automate, build, secure.
 */
export const pillars: Pillar[] = [
  {
    slug: "keep",
    icon: Boxes,
    title: "Keep what works",
    promiseLine: "Stack assessment & modernization strategy",
    summary:
      "Most technology projects fail by replacing too much. We start by mapping what you already run, what it costs, and what it quietly does well — then we protect it.",
    detail:
      "A BSTS engagement never opens with a rebuild pitch. It opens with an honest inventory: the system you run your operation on, your point of sale or billing, your scheduling and job tracking, your spreadsheets, your inbox rules — whether you run a clinic, a job site, a storefront, or a services firm. We document how work actually flows through them, identify the systems that are earning their keep, and design around them instead of over them. The result is a modernization strategy measured in weeks of disruption avoided, not licenses sold.",
    examples: [
      "Full-stack inventory and data-flow mapping",
      "Cost-of-ownership and contract review",
      "Modernize-vs-replace decision records for every core system",
    ],
  },
  {
    slug: "connect",
    icon: Cable,
    title: "Connect what is disconnected",
    promiseLine: "Integration & data unification",
    summary:
      "Re-keying the same customer record into three systems is not a staffing problem — it is an integration problem. We make your existing systems talk to each other.",
    detail:
      "Disconnected systems tax every shift: double entry, version conflicts, reporting by copy-paste. We build the connective tissue — secure APIs, event syncs, and shared data models — so a record entered once appears everywhere it is needed. Where vendors expose APIs we use them; where they do not, we design resilient, auditable bridges rather than brittle hacks.",
    examples: [
      "Your core systems synchronized — CRM, billing, scheduling, inventory",
      "One unified customer, client, or patient profile across tools",
      "Reporting pipelines that end copy-paste consolidation",
    ],
  },
  {
    slug: "automate",
    icon: Workflow,
    title: "Automate what is repetitive",
    promiseLine: "Intelligent workflow automation",
    summary:
      "If a task is performed the same way every day, software should perform it. We automate the repetitive middle of your operation and leave judgment to your people.",
    detail:
      "We identify the workflows your team performs on autopilot — confirmations, reconciliations, schedule builds, status chasing — and convert them into monitored, reversible automations. Every automation ships with a clear owner, a visible audit trail, and a manual override. Automation at BSTS means your staff does more meaningful work, not that your operation runs unattended.",
    examples: [
      "Customer, lead, and patient communication sequences",
      "Nightly reconciliation and exception reports",
      "Task routing with human review at every decision point",
    ],
  },
  {
    slug: "build",
    icon: Sparkles,
    title: "Build what is missing",
    promiseLine: "Custom software & secure AI implementation",
    summary:
      "When the market genuinely lacks the tool you need, we build it — small, sharp, and secured from the first commit. This includes responsible, well-scoped AI.",
    detail:
      "Custom software is a last resort we happen to be very good at. Where AI is the right answer — drafting responses, summarizing operational data, surfacing anomalies — we implement it with guardrails: private data boundaries, human approval on outbound actions, and honest documentation of what the model can and cannot do. Where AI is the wrong answer, we say so.",
    examples: [
      "Purpose-built internal tools and portals",
      "AI-assisted drafting and summarization with human review",
      "Decision-support dashboards fed by your unified data",
    ],
  },
  {
    slug: "secure",
    icon: ShieldCheck,
    title: "Secure the foundation",
    promiseLine: "Security architecture & readiness",
    summary:
      "Security is the floor the rest stands on. Our practice is informed by NIST CSF 2.0, OWASP secure-development guidance, and Zero Trust principles.",
    detail:
      "Every BSTS engagement includes a security baseline: identity and access review, least-privilege by default, encrypted data in transit and at rest, and a written incident-response starting point. For organizations pursuing SOC 2, we provide readiness support — controls mapping, evidence habits, and gap remediation. We are precise about language: readiness support is not certification, and we never claim otherwise.",
    examples: [
      "NIST-aligned security baseline and gap assessment",
      "Identity, access, and least-privilege review",
      "SOC 2 readiness support and evidence-collection habits",
    ],
  },
];
