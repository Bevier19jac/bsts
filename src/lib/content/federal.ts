import { BookOpenCheck, FileSearch, ShieldCheck, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Federal (Government page) content. Claims rules apply here with extra
 * force: founder experience is presented as founder experience, never as
 * BSTS corporate past performance; no certification or endorsement is
 * implied; deliverables are stated as capabilities, not contract history.
 */

export type FederalCapability = {
  slug: string;
  icon: LucideIcon;
  title: string;
  outcome: string;
  summary: string;
  deliverables: string[];
  /** Additional deliverables revealed via disclosure. */
  moreDeliverables: string[];
  /** Honest boundary statement rendered with the capability. */
  boundary: string;
};

export const federalCapabilities: FederalCapability[] = [
  {
    slug: "ai-readiness",
    icon: FileSearch,
    title: "AI readiness & governance",
    outcome:
      "Move from AI interest to approved, documented, and testable use cases.",
    summary:
      "Agencies and contractors rarely lack AI ideas — they lack an inventory of appropriate use cases, documented boundaries, and a defensible path to approval. BSTS builds that path with the people who own the mission.",
    deliverables: [
      "AI-use-case inventory, discovery, and prioritization",
      "Risk and impact classification with human-oversight requirements",
      "Acceptable-use boundaries and data-access documentation",
      "Testing and evaluation plans before deployment",
    ],
    moreDeliverables: [
      "Model and vendor evaluation support",
      "AI governance playbooks",
      "Executive and workforce briefings",
    ],
    boundary:
      "BSTS helps implement governance practices and documentation. BSTS does not provide legal opinions and does not grant or substitute for agency authorization decisions.",
  },
  {
    slug: "knowledge-systems",
    icon: BookOpenCheck,
    title: "Secure knowledge systems",
    outcome:
      "Help personnel find authoritative information without turning sensitive documents into an uncontrolled chatbot.",
    summary:
      "Retrieval-augmented systems built on approved document boundaries: answers carry source citations, access follows roles, and a human reviews consequential output. Evaluation happens before deployment, not after an incident.",
    deliverables: [
      "Retrieval-augmented generation over controlled policy and procedure libraries",
      "Source citations and traceability on every answer",
      "Role-based access design and human-review workflows",
      "Hallucination and failure-mode testing with evaluation datasets",
    ],
    moreDeliverables: [
      "Technical-manual assistants",
      "Knowledge-base organization",
      "Usage documentation and training",
    ],
    boundary:
      "No AI system can be promised never to hallucinate. BSTS designs for traceable sources, bounded document sets, human supervision, and measured failure rates — and documents the limitations honestly.",
  },
  {
    slug: "evidence-automation",
    icon: ShieldCheck,
    title: "Cybersecurity & evidence automation",
    outcome:
      "Reduce the administrative burden of maintaining security evidence and corrective actions.",
    summary:
      "Security teams drown in evidence collection, POA&M tracking, and questionnaire responses. BSTS automates the administrative layer so the humans can work the actual findings.",
    deliverables: [
      "NIST-informed control mapping and security-evidence workflows",
      "POA&M and corrective-action tracking",
      "Security-questionnaire and vendor-risk documentation workflows",
      "Audit-readiness organization and security reporting dashboards",
    ],
    moreDeliverables: [
      "Policy-review schedules",
      "FedRAMP-readiness workflow support",
      "SOC 2 readiness support for government-facing vendors",
    ],
    boundary:
      "BSTS does not issue SOC 2 attestations, is not a FedRAMP authorization body, and does not perform CMMC assessments. Framework references describe methodology, not certification.",
  },
  {
    slug: "mission-automation",
    icon: Workflow,
    title: "Mission workflow automation",
    outcome:
      "Reduce repetitive coordination work while preserving ownership, review, and accountability.",
    summary:
      "Intake queues, approval chains, status reporting, and corrective-action tracking consume mission hours. BSTS converts them into monitored automations with a named owner, manual override, and an audit trail — integrating the systems you already run before proposing anything new.",
    deliverables: [
      "Intake, request routing, and approval workflows",
      "Status and executive dashboards",
      "Document-generation and stakeholder-notification workflows",
      "Data synchronization between approved systems",
    ],
    moreDeliverables: [
      "Incident-coordination support",
      "Training-management, logistics, and readiness tracking",
      "Corrective-action tracking and lessons-learned repositories",
    ],
    boundary:
      "Every automation ships with a named process owner, manual override, human review at consequential decision points, documentation, and measurable acceptance criteria agreed before work begins.",
  },
];

export const federalPositioning = {
  central:
    "BSTS operationalizes secure AI and automates high-friction work for government-facing and regulated organizations.",
  full: "Bevier Strategic Technology Solutions is a service-disabled veteran-owned secure AI and technology-modernization company. BSTS helps agencies and federal contractors identify appropriate AI use cases, automate document-heavy workflows, connect existing systems, and implement human-supervised AI with security, governance, testing, and documentation built in.",
  primes:
    "BSTS offers federal prime contractors a technically credible, principal-led teaming partner with capabilities spanning secure AI implementation, AI governance, cybersecurity documentation, knowledge systems, workflow automation, and operational leadership.",
} as const;

export const federalWhy = {
  lede: "Jacob Bevier combines senior military operational leadership, federal cybersecurity experience, enterprise stakeholder engagement, and graduate-level AI expertise. That combination allows BSTS to approach modernization as an operational mission — not merely a software installation.",
  points: [
    {
      title: "Operational leadership",
      body: "U.S. Army combat veteran; former First Sergeant, Senior Instructor, and Abrams Tank Master Gunner. High-consequence environments teach requirements discipline, rehearsal, and accountability — habits BSTS applies to delivery.",
    },
    {
      title: "Technical depth",
      body: "Master of Science in Artificial Intelligence; Bachelor of Science in Computer Science with a Cybersecurity major, Magna Cum Laude; CompTIA Security+; AWS Certified AI Practitioner.",
    },
    {
      title: "Federal fluency",
      body: "More than 16 years serving federal missions through military leadership and civilian cybersecurity work. Add enterprise stakeholder experience, and BSTS speaks both program-office and engineering.",
    },
    {
      title: "Honest engineering",
      body: "Human-supervised AI, security and documentation from project initiation, no vendor commissions, and no automatic rip-and-replace recommendation. If a claim cannot survive an audit of its wording, BSTS does not make it.",
    },
  ],
} as const;

export const federalEngagements = [
  {
    title: "Subcontracting & teaming",
    audience: "For established primes",
    body: "A technically credible, principal-led partner for secure AI expertise, AI governance support, cybersecurity documentation, workflow-automation implementation, specialized technical leadership, and proposal or task-order support.",
    note: "BSTS is service-disabled veteran-owned and led; SBA VetCert certification status is stated precisely elsewhere on this page. Planned certification does not satisfy current SDVOSB subcontracting goals — we say so plainly.",
  },
  {
    title: "Pilots & defined work packages",
    audience: "For program teams that want proof first",
    body: "Examples of well-bounded starting packages: an AI-use-case inventory, a governance documentation package, a controlled knowledge-assistant prototype, an evidence-tracking workflow, a process-automation pilot, an operational dashboard, or a technical discovery and roadmap.",
    note: "These are examples of scoped work packages — not current contract vehicles.",
  },
  {
    title: "Direct federal opportunities",
    audience: "For agencies conducting market research",
    body: "BSTS welcomes market research conversations, sources-sought and RFI responses, simplified acquisitions, and task-order or teaming opportunities. Following SBA VetCert certification, BSTS intends to pursue SDVOSB set-asides and appropriate sole-source discussions.",
    note: "Eligibility always depends on registrations, certifications, solicitation requirements, and contracting-officer determinations.",
  },
] as const;
