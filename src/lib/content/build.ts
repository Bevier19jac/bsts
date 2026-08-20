import {
  Boxes,
  Database,
  Gauge,
  LayoutDashboard,
  Search,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Depth content for the "Build what is missing" pillar.
 *
 * Positioning rule for this page: it demonstrates range without becoming an
 * open invitation. BSTS decides whether a build is warranted; the client does
 * not specify the solution. Every entry therefore carries both a "warranted
 * when" and an explicit boundary.
 *
 * Deliberately absent: delivery-time promises, invented case studies, named
 * clients, and anything implying work has been performed that has not been.
 * Scope is expressed as shape and size, never as a schedule commitment.
 */

/** The questions that must all fail before building is the right answer. */
export const buildTest = [
  {
    q: "Does something you already pay for do this?",
    a: "Most operations own more capability than they use. Unused modules in an existing CRM, accounting platform or ticketing tool close a surprising number of gaps at no additional license cost.",
  },
  {
    q: "Can the systems you own be connected instead?",
    a: "A great many problems described as missing software are really missing integration. If two systems already hold the data, the answer is usually a sync, not a new application.",
  },
  {
    q: "Can it be automated inside a tool already in place?",
    a: "Workflow, scripting and rules engines inside existing platforms handle a lot of what people assume requires custom development.",
  },
  {
    q: "Does the market sell it?",
    a: "If a well-supported product fits the workflow, buying it beats building it. We will tell you that even though it ends the conversation.",
  },
  {
    q: "Will anyone still own it in two years?",
    a: "Custom software is a long-term commitment, not a delivery. If there is no plan for who maintains it, building it is a liability rather than an asset.",
  },
] as const;

export type BuildClass = {
  slug: string;
  icon: LucideIcon;
  title: string;
  what: string;
  warranted: string;
  /** Shape and size, expressed structurally — never as a schedule promise. */
  scope: string;
  /** What this explicitly is not, stated plainly. */
  boundary: string;
};

export const buildClasses: BuildClass[] = [
  {
    slug: "internal-tools",
    icon: Boxes,
    title: "Internal operational tools",
    what: "A purpose-built application for the one workflow your team runs constantly and no product fits — intake, scheduling, review queues, field capture, inspection records.",
    warranted:
      "A capable person is holding an operation together inside a spreadsheet that has outgrown itself, and the off-the-shelf options each miss the part that matters.",
    scope:
      "Usually one workflow, one primary data store, and a small number of roles. Deliberately narrow — the first version does the thing that hurts, and nothing else.",
    boundary:
      "Not a replacement for a working system of record. If your CRM or ERP already holds the data, the tool reads from it rather than duplicating it.",
  },
  {
    slug: "dashboards",
    icon: LayoutDashboard,
    title: "Decision-support dashboards",
    what: "One screen that answers the questions leadership currently gets by asking someone — built on unified data so the numbers agree with the source.",
    warranted:
      "Weekly status meetings are spent reconstructing what happened, and two reports on the same subject disagree.",
    scope:
      "Sits on top of connective work rather than replacing it. Scope is set by how many systems have to agree before a number can be trusted.",
    boundary:
      "A dashboard cannot fix data nobody maintains. Where a measure is not currently reliable, it is labeled that way rather than displayed with false confidence.",
  },
  {
    slug: "integration",
    icon: Database,
    title: "Integration and sync layers",
    what: "The connective tissue between systems that were never designed to speak — built to be auditable and reversible, with failures that surface instead of hiding.",
    warranted:
      "No vendor connector exists for the pair of systems you actually run, and the manual bridge between them is a person retyping records.",
    scope:
      "Set by how many record types must stay in agreement and in which direction. One-way mirroring is materially simpler than two-way reconciliation.",
    boundary:
      "Where a vendor's own connector does the job, we configure that instead and say so. Custom integration is what happens when the supported path genuinely does not exist.",
  },
  {
    slug: "retrieval",
    icon: Search,
    title: "Retrieval over your own documents",
    what: "Ask a question of your policies, procedures, contracts or operating history and get an answer with citations back to the source document.",
    warranted:
      "The knowledge exists in writing but nobody can find it quickly, and the cost of someone acting on an outdated version is real.",
    scope:
      "Driven by the size and cleanliness of the document set and by how tightly access must follow role. Evaluation against a test set happens before deployment, not after.",
    boundary:
      "Answers carry sources and a person reviews anything consequential. This is not an unattended chatbot, and it is not pointed at documents whose handling rules are unresolved.",
  },
  {
    slug: "portals",
    icon: Users,
    title: "Client and customer portals",
    what: "A controlled outside view of the record — status, documents, approvals, requests — so people stop asking by email for information that already exists.",
    warranted:
      "Staff spend meaningful time answering status questions, or sensitive documents are moving as email attachments because there is nowhere better to put them.",
    scope:
      "Determined mostly by identity and permissions rather than by screens. Who may see what is the hard part; the interface is comparatively straightforward.",
    boundary:
      "Anything customer-facing raises the security floor. Authentication, access review and data-handling design are part of the build, not a later phase.",
  },
  {
    slug: "migration",
    icon: Gauge,
    title: "Migration and consolidation utilities",
    what: "Purpose-written tooling to move, reconcile and verify data when it has to leave one system for another without losing history.",
    warranted:
      "A platform change is already decided and the risk sits in the data — duplicates, partial records, and no reliable way to prove the move was clean.",
    scope:
      "Governed by how bad the source data is. Reconciliation and verification are usually larger than the transfer itself.",
    boundary:
      "This supports a migration decision already made on its merits. It is not an argument for making one.",
  },
];

/** The refusals. This section is the point of the page. */
export const willNotBuild = [
  {
    title: "A replacement for something that works",
    body: "If a core system is earning its keep, we design around it. Rebuilding a working platform is the most common and most expensive failure in this field.",
  },
  {
    title: "Anything an owned tool already does",
    body: "Where a module you already license meets the requirement, we will configure that and tell you the build is unnecessary — including when we would rather not.",
  },
  {
    title: "AI that speaks without review",
    body: "No model sends to a customer, commits a transaction, or takes a consequential action without a person approving it. Drafting and summarizing, yes. Acting unattended, no.",
  },
  {
    title: "Something nobody can maintain",
    body: "If there is no realistic answer to who owns this in two years, the honest recommendation is not to build it. Software without an owner becomes a hazard.",
  },
  {
    title: "Scope specified before it is understood",
    body: "We do not take a finished specification and quote it. What gets built is decided by discovery, written down, and agreed before development starts.",
  },
] as const;

/** How a build is actually run — mapped to the existing engagement model. */
export const buildDiscipline = [
  {
    title: "Secured from the first commit",
    body: "Least privilege, encrypted transport and storage, dependency review, and no secrets in source. Security is part of building rather than a pass at the end.",
  },
  {
    title: "Narrow first version",
    body: "The first release does the single thing that hurts most, so it can be judged against reality rather than against a plan. Breadth is earned.",
  },
  {
    title: "Documented for someone else",
    body: "Written so an engineer who has never met us can pick it up: architecture notes, decision records, and a plain-language operating description. No black boxes.",
  },
  {
    title: "Reversible and observable",
    body: "Failures surface rather than passing silently, and there is a way back. Anything automated ships with an owner, an audit trail and a manual override.",
  },
] as const;

export const buildClosing =
  "Custom software is a last resort we happen to be very good at. The range on this page exists so you know what is possible — not so you can order from it. What gets built, if anything gets built, is decided by what discovery finds.";
