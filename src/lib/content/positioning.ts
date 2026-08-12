import {
  Activity,
  BadgeCheck,
  Bot,
  ClipboardCheck,
  Compass,
  Database,
  FileSearch,
  GitBranch,
  Hammer,
  Layers,
  Radar,
  ScrollText,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * BSTS strategic position.
 *
 *   SECURE THE DATA. ENABLE THE AI. PROVE THE CONTROLS.
 *
 * Everything in this file supports that lifecycle. The three service areas,
 * the buyer-language triggers, the engagement ladder, and the assurance
 * roadmap are all defined here so the site, the capability statement, and
 * the printed brochure stay in sync from one source.
 *
 * CLAIMS RULES ENFORCED BY src/test/claims.test.ts:
 *  - BSTS prepares organizations for SOC 2. BSTS never performs the
 *    examination and never issues the report — a qualified independent CPA
 *    firm does. That boundary must appear wherever SOC 2 is described.
 *  - Framework references describe alignment, mapping, and readiness work.
 *    They never imply certification, accreditation, or endorsement.
 *  - The continuous assurance platform is a product direction, not a
 *    shipping product. Never describe it in the present tense.
 */

/* ------------------------------------------------------------------ */
/* The strategic line                                                  */
/* ------------------------------------------------------------------ */

export const strategicLine = ["Secure the data.", "Enable the AI.", "Prove the controls."] as const;

export const strategicSummary =
  "BSTS helps growing organizations securely adopt AI, automate high-value workflows, and build the controls and evidence needed to earn customer trust.";

export const strategicExpanded =
  "Security is not a phase at the end of an AI project. Data protection, governance, and evidence get designed in from the first conversation — because retrofitting them after the automation is live costs more and proves less.";

/* ------------------------------------------------------------------ */
/* Who this is for                                                     */
/* ------------------------------------------------------------------ */

export const idealClient = {
  headline: "Built for organizations between 20 and 250 people.",
  body:
    "Big enough that manual process is now expensive and customers are starting to ask security questions. Small enough that there is no internal AI team, no security team, and no compliance department to absorb the work.",
  signals: [
    "Growing faster than internal process can keep up",
    "Handling customer, financial, or otherwise sensitive information",
    "Employees already experimenting with generative AI tools",
    "Starting to receive customer security questionnaires",
    "Moving upmarket, into regulated industries, or into government work",
    "Anticipating SOC 2 or another framework in the next 12–24 months",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* The three service areas                                             */
/* ------------------------------------------------------------------ */

export type ServiceArea = {
  slug: string;
  icon: LucideIcon;
  /** Short label used in cards and the brochure. */
  title: string;
  /** The customer's own words for the problem. */
  customerProblem: string;
  /** One line, plain language, for the homepage card. */
  cardLine: string;
  /** The positioning claim — what makes this different. */
  positioning: string;
  /** Body copy for the detailed view. */
  detail: string;
  /** Concrete work, in the buyer's vocabulary. */
  work: string[];
  /** The discipline applied before anything gets built. */
  discipline?: { heading: string; items: string[] };
  /** Honest boundary — what BSTS does not do in this area. */
  boundary?: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "secure-ai-automation",
    icon: Bot,
    title: "Secure AI & Automation",
    customerProblem: "Our people spend too much time doing repetitive work.",
    cardLine: "Automate repetitive work without losing control of your data.",
    positioning: "Secure AI by design — not AI with security bolted on afterward.",
    detail:
      "We find the workflows that consume the most hours for the least judgment, and we automate them. Document processing, email handling, CRM updates, recurring reporting, internal knowledge retrieval, customer operations, integrations between systems that were never designed to talk. Where an AI model genuinely improves the outcome, we use one. Where a deterministic script is the better answer, we say so and build that instead.",
    work: [
      "Document and form processing",
      "Email and inbox workflows",
      "CRM and record synchronization",
      "Recurring reporting and reconciliation",
      "Internal knowledge retrieval and AI-assisted research",
      "Retrieval systems built on your own documents",
      "Workflow orchestration across disconnected applications",
      "AI agents, where the task and the guardrails both justify one",
    ],
    discipline: {
      heading: "Answered before a single line ships",
      items: [
        "What data does this workflow touch?",
        "Where does that data travel, and which provider or model sees it?",
        "What is retained, and can any of it be used for model training?",
        "Who has access, and how is that access reviewed?",
        "What requires human approval before it takes effect?",
        "What gets logged, and could we reconstruct what happened?",
        "Which regulatory or contractual obligations apply?",
        "What happens when the model is wrong — and how would we know?",
      ],
    },
    boundary:
      "If a workflow does not have a measurable cost, we will tell you it is not worth automating yet.",
  },
  {
    slug: "ai-governance",
    icon: ShieldCheck,
    title: "AI Security & Governance",
    customerProblem:
      "Our employees are already using AI. We don't know what they're putting into it.",
    cardLine:
      "Know where AI is being used, what it touches, and what guardrails belong around it.",
    positioning: "Enable AI safely. Prohibition does not work — it just moves the usage out of sight.",
    detail:
      "Generative AI arrived in most organizations through individual employees, not through procurement. That means the exposure is real but undocumented: nobody can say with confidence which tools are in use, what information has been pasted into them, or what the vendor does with it. We start by finding out, then we build the smallest set of controls that lets useful work continue safely.",
    work: [
      "AI use-case inventory across the organization",
      "Shadow AI discovery and readiness review",
      "Data classification review",
      "Approved AI use policy and acceptable-use guidance",
      "Vendor and model risk review",
      "AI data-flow analysis",
      "Access-control and data-loss-prevention recommendations",
      "Human-in-the-loop requirements for consequential decisions",
      "High-risk use-case identification and an AI risk register",
      "An AI governance roadmap, aligned to the NIST AI Risk Management Framework where useful",
    ],
    discipline: {
      heading: "The order of operations",
      items: [
        "Value — does this use of AI create real business value?",
        "Risk — what could go wrong, and how badly?",
        "Controls — what guardrails make the value safe to capture?",
        "Assurance — can we demonstrate the controls actually work?",
      ],
    },
    boundary:
      "Alignment to a framework is not certification by it. NIST does not certify consultancies or the organizations they advise.",
  },
  {
    slug: "soc2-readiness",
    icon: ClipboardCheck,
    title: "SOC 2 & Compliance Readiness",
    customerProblem: "A customer just asked for our SOC 2 report.",
    cardLine:
      "Build defensible controls, organize evidence, close gaps, and stay ready for the audit.",
    positioning:
      "Readiness done properly, with a clear line between preparation and attestation.",
    detail:
      "Most organizations meet SOC 2 the same way: a large customer asks for the report, and suddenly a deadline exists. The work that follows is mostly unglamorous — deciding what is in scope, writing down the controls you actually operate, finding the gaps, fixing them, and organizing evidence so the examination does not consume a quarter. That is the work we do with you.",
    work: [
      "Readiness assessment and scoping support",
      "Control inventory and control mapping",
      "Gap assessment and remediation tracking",
      "Evidence requirements and PBC list preparation",
      "Evidence organization and control-owner coordination",
      "Policy and procedure alignment",
      "Audit preparation and auditor-facing coordination",
      "Evidence automation opportunities",
      "Ongoing audit-readiness support between cycles",
    ],
    boundary:
      "BSTS does not issue SOC 2 reports. SOC 2 examinations and attestation reports are performed by qualified independent CPA firms. We prepare you for that examination; we are not a party to its opinion.",
  },
];

/** The single sentence that must accompany every SOC 2 reference. */
export const soc2Boundary =
  "BSTS does not issue SOC 2 reports. SOC 2 examinations and attestation reports are performed by qualified independent CPA firms.";

/* ------------------------------------------------------------------ */
/* "You may need BSTS if…" — buyer-language triggers                   */
/* ------------------------------------------------------------------ */

export type Trigger = {
  /** Said in the client's own voice. */
  quote: string;
  /** The BSTS service area it maps to. */
  area: string;
  /** Slug of the service area, for linking. */
  slug: string;
};

/**
 * These are deliberately written the way a business owner would actually
 * say them. A referral partner who does not understand AI engineering
 * should still recognize the moment when it happens in front of them.
 */
export const triggers: Trigger[] = [
  {
    quote:
      "Our employees are already using ChatGPT, Copilot, Claude, or Gemini with company information.",
    area: "AI Security & Governance",
    slug: "ai-governance",
  },
  {
    quote: "A customer just asked for our SOC 2 report.",
    area: "SOC 2 & Compliance Readiness",
    slug: "soc2-readiness",
  },
  {
    quote:
      "We're spending hundreds of hours a year on repetitive administrative work.",
    area: "Secure AI & Automation",
    slug: "secure-ai-automation",
  },
  {
    quote: "The security questionnaires are getting harder to answer honestly.",
    area: "SOC 2 & Compliance Readiness",
    slug: "soc2-readiness",
  },
  {
    quote:
      "We know AI could help, but we're not comfortable exposing customer data to it.",
    area: "Secure AI & Automation",
    slug: "secure-ai-automation",
  },
  {
    quote:
      "We have security policies, but I'm not confident we could actually prove the controls work.",
    area: "SOC 2 & Compliance Readiness",
    slug: "soc2-readiness",
  },
  {
    quote:
      "We're moving into larger customers, regulated industries, or government work.",
    area: "SOC 2 & Compliance Readiness",
    slug: "soc2-readiness",
  },
  {
    quote: "We have multiple systems that don't talk to each other.",
    area: "Secure AI & Automation",
    slug: "secure-ai-automation",
  },
];

/* ------------------------------------------------------------------ */
/* VALUE → RISK → CONTROLS → ASSURANCE                                 */
/* ------------------------------------------------------------------ */

export const aiApproach = [
  {
    step: "Value",
    question: "Does it create real business value?",
    body: "If a workflow does not cost measurable time, money, or accuracy today, automating it is a hobby. We start by proving the problem is worth solving.",
  },
  {
    step: "Risk",
    question: "What could go wrong?",
    body: "What data is involved, who sees it, what happens if the model is wrong, and what obligation — contractual or regulatory — is attached to it.",
  },
  {
    step: "Controls",
    question: "How do we secure and govern it?",
    body: "Data boundaries, access control, retention limits, human approval on consequential actions, logging, and a documented owner.",
  },
  {
    step: "Assurance",
    question: "Can we prove the controls work?",
    body: "A control nobody can demonstrate is an intention. We build the evidence path at the same time we build the automation.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Engagement model — DISCOVER → IMPLEMENT → GOVERN → ASSURE           */
/* ------------------------------------------------------------------ */

export type Stage = {
  key: string;
  icon: LucideIcon;
  title: string;
  oneLine: string;
  body: string;
  outputs: string[];
};

export const engagementStages: Stage[] = [
  {
    key: "discover",
    icon: Compass,
    title: "Discover",
    oneLine: "Understand the business before recommending any technology.",
    body: "A structured assessment of how work actually flows: the processes, the systems, the data, the risks, the compliance obligations, and the automation opportunities hiding inside all of it. You leave with a prioritized roadmap whether or not you continue with us.",
    outputs: [
      "Workflow and systems map",
      "Data-flow and risk observations",
      "Compliance obligations in scope",
      "Prioritized roadmap with effort and impact",
    ],
  },
  {
    key: "implement",
    icon: Hammer,
    title: "Implement",
    oneLine: "Build one high-value thing and put it into production.",
    body: "A focused sprint against the highest-value item on the roadmap — a secure automation, an integration, an internal tool, or targeted security remediation. Scoped in writing, tested before it touches real data, documented, and handed off to your team.",
    outputs: [
      "One working solution in production",
      "Security boundaries tested before live data",
      "Documentation and staff handoff",
      "Post-launch support window",
    ],
  },
  {
    key: "govern",
    icon: ScrollText,
    title: "Govern",
    oneLine: "Write down how it is supposed to work.",
    body: "Policies, control definitions, AI acceptable-use guidance, access model, and security architecture documentation. This is the layer most organizations skip, and it is the reason their next audit is painful.",
    outputs: [
      "Security and AI use policies",
      "Control definitions with named owners",
      "Access model and review cadence",
      "Architecture and data-flow documentation",
    ],
  },
  {
    key: "assure",
    icon: BadgeCheck,
    title: "Assure",
    oneLine: "Prove it works, on an ongoing basis.",
    body: "Validate the controls, organize the evidence, automate collection where the systems allow it, and stay ready between audit cycles instead of scrambling before each one.",
    outputs: [
      "Control validation and gap closure",
      "Organized, current evidence",
      "Automated collection where feasible",
      "Readiness maintained between cycles",
    ],
  },
];

export const engagementNote =
  "BSTS does not push AI into organizations that do not need it. Technology should solve a measurable business problem, and sometimes the honest recommendation is a better process rather than a new system.";

/* ------------------------------------------------------------------ */
/* The differentiator — continuous assurance                           */
/* ------------------------------------------------------------------ */

export const assuranceProblem = {
  heading: "Compliance is still mostly asking people whether things are true.",
  body:
    "The standard model is a questionnaire, a spreadsheet, a folder of screenshots, and a point-in-time assessment. It tells you what someone believed was true on the day they were asked. It does not tell you whether the control held for the eleven months in between.",
  contrast: [
    { from: "A questionnaire asking whether MFA is enabled", to: "The actual configuration, read from the system" },
    { from: "A screenshot taken the week before the audit", to: "Evidence collected continuously, with a timestamp" },
    { from: "A point-in-time assessment", to: "Drift detected when the control changes, not months later" },
    { from: "Evidence reassembled every cycle", to: "Evidence that is already organized when the auditor asks" },
  ],
} as const;

/** The conceptual pipeline. Presented as direction of travel, not a shipped product. */
export const assurancePipeline = [
  {
    icon: Database,
    step: "System evidence",
    body: "Configuration and activity read from the systems themselves, rather than described by the person who administers them.",
  },
  {
    icon: FileSearch,
    step: "Control validation",
    body: "Compare what the system actually reports against what the control says should be true.",
  },
  {
    icon: Layers,
    step: "Framework mapping",
    body: "One validated control satisfies its corresponding requirement in every framework that asks for it.",
  },
  {
    icon: Radar,
    step: "Drift detection",
    body: "When a control stops holding, that is a finding on the day it happens — not a surprise during fieldwork.",
  },
  {
    icon: Wrench,
    step: "Remediation",
    body: "A tracked, owned path back to the intended state, with the fix itself recorded as evidence.",
  },
  {
    icon: Activity,
    step: "Audit-ready evidence",
    body: "The artifact the examination needs, assembled as a by-product of operating the control.",
  },
] as const;

export const assuranceVision =
  "Moving compliance from periodic evidence collection toward continuous control assurance.";

/**
 * IMPORTANT: this is a product direction. It is described in the future
 * tense everywhere it appears, and the site never implies the platform is
 * available today. Where BSTS can automate evidence collection now, it does
 * so inside consulting engagements using the client's existing systems.
 */
export const assuranceRoadmapNote =
  "This is the direction BSTS is building toward, not a product available today. In current engagements we apply the same thinking manually and automate evidence collection where a client's existing systems support it.";

/* ------------------------------------------------------------------ */
/* Common control framework                                            */
/* ------------------------------------------------------------------ */

export const commonControl = {
  heading: "One control. Many frameworks.",
  body:
    "Organizations that treat every framework as a separate program end up maintaining several overlapping security programs at once — duplicated policies, duplicated evidence, duplicated effort, and a different answer depending on who you ask.",
  approach:
    "The alternative is to define the control once, at the organizational level, then map it to each framework that asks for it. Where requirements genuinely differ, they stay separate. Where they overlap — and most access, logging, encryption, and change-management requirements overlap heavily — the work is done once.",
  /** Frameworks BSTS can help map and prepare against. Never certification claims. */
  frameworks: [
    { name: "SOC 2", note: "Trust Services Criteria readiness and evidence preparation" },
    { name: "NIST CSF 2.0", note: "Alignment across Govern, Identify, Protect, Detect, Respond, Recover" },
    { name: "NIST SP 800-53", note: "Control mapping and implementation support" },
    { name: "NIST AI RMF", note: "AI risk management alignment" },
    { name: "ISO/IEC 27001", note: "Control mapping and readiness support" },
    { name: "HIPAA", note: "Safeguard mapping and implementation support" },
    { name: "NIST SP 800-171", note: "Control implementation support for CUI environments" },
    { name: "CMMC", note: "Readiness and control-implementation support" },
    { name: "CJIS", note: "Policy-area mapping support" },
    { name: "FedRAMP-related environments", note: "Control-mapping support" },
  ],
  disclaimer:
    "BSTS provides readiness, mapping, alignment, implementation support, control validation, and evidence preparation. BSTS is not an accreditation body, a certification body, or an audit firm, and references to these frameworks do not imply certification, accreditation, or endorsement by any of their governing organizations.",
} as const;

/* ------------------------------------------------------------------ */
/* Advisors & referral partners                                        */
/* ------------------------------------------------------------------ */

export const advisors = {
  headline:
    "When your client has a technology problem that sits between AI, security, automation, and compliance — bring in BSTS.",
  body:
    "Most of these problems arrive disguised as something else. A client mentions a security questionnaire in passing. Someone complains about manual work. A CFO wonders aloud what the team is pasting into ChatGPT. Each of those is the start of a BSTS conversation.",
  /** Who this page is for. */
  audiences: [
    "Business and management consultants",
    "Fractional CFOs, COOs, and CTOs",
    "CPAs and accounting firms",
    "Managed service providers",
    "Attorneys advising on data, privacy, or contracts",
    "Technology and ERP consultants",
  ],
  howItWorks: [
    {
      title: "You hear one of the triggers",
      body: "In a board meeting, a planning session, or an offhand comment during other work.",
    },
    {
      title: "You make an introduction",
      body: "An email introduction is enough. No forms, no portal, no partner agreement to sign first.",
    },
    {
      title: "We have a discovery conversation",
      body: "A scoped, no-obligation conversation with your client. If BSTS is not the right fit, we say so directly and quickly.",
    },
    {
      title: "You stay informed",
      body: "You keep the relationship. We keep you in the loop at whatever level your client is comfortable with.",
    },
  ],
  note:
    "There is no formal partner program yet, and no referral paperwork to complete. If this is useful to your clients, start with a conversation.",
} as const;

/* ------------------------------------------------------------------ */
/* Federal R&D direction (Government page)                             */
/* ------------------------------------------------------------------ */

/**
 * Presented strictly as a research direction BSTS intends to pursue.
 * There is no award, no funding, and no program participation to claim.
 */
export const rdThesis = {
  heading: "Research direction",
  thesis:
    "Continuous cybersecurity compliance validation using actual system evidence rather than relying solely on questionnaires and spreadsheets.",
  body:
    "Federal compliance regimes generate enormous volumes of attestation and very little continuously verified evidence. BSTS intends to pursue this problem through federal small-business innovation research programs such as SBIR and STTR when the company is eligible to compete for them.",
  disclaimer:
    "This describes a planned area of research. BSTS has not received an SBIR or STTR award, is not currently performing under any federal innovation program, and no federal agency has reviewed or endorsed this research direction.",
} as const;

/* ------------------------------------------------------------------ */
/* Delivery philosophy — preserved from the original positioning       */
/* ------------------------------------------------------------------ */

/**
 * The force-multiplier idea survives the repositioning: BSTS improves the
 * systems a client already runs rather than defaulting to replacement.
 */
export const forceMultiplier = {
  heading: "The security and AI team you do not have to hire.",
  body:
    "Most organizations at this size have no AI team, no cybersecurity team, and no compliance function — and no realistic path to hiring all three. They do not need a new stack either. They need the one they have connected, secured, governed, and freed from the repetitive work consuming their people. Replacement is a last resort, and it comes with a written reason.",
  commitments: [
    "No rip-and-replace reflex — every recommendation carries a reason",
    "No licenses sold and no vendor commissions taken",
    "Security designed in from the start, not added at the end",
    "Every engagement scoped in writing before work begins",
  ],
} as const;

/** Icon used for the common-control diagram. */
export const commonControlIcon: LucideIcon = GitBranch;

/* ------------------------------------------------------------------ */
/* Brand identity — the firing sequence                                */
/* ------------------------------------------------------------------ */

/**
 * The Abrams, the main gun, the sabot, and the tracer are the BSTS mark.
 * They are not military decoration and they are not about aggression —
 * they encode how the firm works, and the last stage of the sequence is
 * the same thing as the last line of the positioning: prove the controls.
 *
 * Physical sequence:
 *   M1 Abrams → main-gun firing → sabot separation → tracer → effect
 * What it communicates:
 *   Disciplined system → precise action → controlled delivery → measurable effect
 */
export const brandSequence = {
  eyebrow: "The mark",
  heading: "Why a tank.",
  lede:
    "The Abrams on this site is not decoration, and it is not about force. A tank crew is one of the most procedure-bound technical systems in the military: nothing is improvised, every action is checked, and the round either hits or it does not. That is the standard BSTS applies to technology work — and the sequence maps almost exactly onto how an engagement runs.",
  stages: [
    {
      physical: "M1 Abrams",
      meaning: "Disciplined system",
      body: "A crew-served weapon system runs on documented procedure, not improvisation. Engagements are scoped in writing before anything moves.",
    },
    {
      physical: "Main-gun firing",
      meaning: "Precise action",
      body: "One target at a time, deliberately chosen. We build the highest-value thing first rather than spreading effort across everything at once.",
    },
    {
      physical: "Sabot separation",
      meaning: "Controlled delivery",
      body: "The sabot exists to carry the penetrator, then falls away. Scope works the same way — everything that is not doing real work gets discarded in flight.",
    },
    {
      physical: "Tracer to target",
      meaning: "Measurable effect",
      body: "The tracer exists so the effect can be observed. That is the whole argument of this company: a control you cannot demonstrate is an intention, not a control.",
    },
  ],
  closing:
    "Secure the data. Enable the AI. Prove the controls. The tracer is the third line.",
} as const;
