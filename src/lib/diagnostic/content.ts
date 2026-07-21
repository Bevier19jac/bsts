import type { Diagnosis, Dimension, Goal, Industry } from "./types";

export const DIMENSION_LABELS: Record<Dimension, string> = {
  ai: "AI Adoption",
  automation: "Automation Maturity",
  operations: "Process & Workflow",
  tools: "Systems & Data",
  security: "Data & Security",
};

export const DIMENSION_ORDER: Dimension[] = [
  "automation",
  "ai",
  "operations",
  "tools",
  "security",
];

/** One-line plain-English read of what each dimension score means. */
export const DIMENSION_NOTE: Record<Dimension, string> = {
  ai: "How much AI is actually doing work for you today.",
  automation: "How much runs on its own versus by hand.",
  operations: "How smooth and reliable your day-to-day workflow is.",
  tools: "Whether your systems are connected or scattered.",
  security: "How ready your data handling is for what you carry.",
};

interface IndustryContent {
  label: string;
  /** Where AI & automation most often pay off in this industry. */
  aiFit: string[];
  /** Common highest-ROI automations for this industry. */
  automations: string[];
  /** Recommended tool foundation. */
  tools: string[];
}

export const INDUSTRY_CONTENT: Record<Industry, IndustryContent> = {
  professional_services: {
    label: "Professional services",
    aiFit: [
      "AI drafting for proposals, reports, and client emails",
      "An AI assistant that answers from your own documents and past work",
      "AI meeting notes that turn calls into action items automatically",
    ],
    automations: [
      "Auto-generate proposals and contracts from a template",
      "Automated client onboarding and intake",
      "Invoicing and payment reminders on autopilot",
    ],
    tools: ["A real CRM (HubSpot/Pipedrive)", "Proposal + e-sign tool", "An automation layer (Make/Zapier)"],
  },
  ecommerce_retail: {
    label: "E-commerce / retail",
    aiFit: [
      "AI customer support that handles the repetitive questions",
      "AI product descriptions and marketing copy at scale",
      "AI-driven inventory and demand forecasting",
    ],
    automations: [
      "Order, shipping, and returns status updates",
      "Abandoned-cart and post-purchase follow-up",
      "Inventory sync across your sales channels",
    ],
    tools: ["Connected store + inventory system", "Email/SMS automation (Klaviyo)", "A help desk with AI"],
  },
  hospitality: {
    label: "Hospitality",
    aiFit: [
      "AI answering booking and FAQ questions 24/7",
      "AI review responses and reputation management",
      "AI-personalized guest communications",
    ],
    automations: [
      "Automated booking confirmations and reminders",
      "Guest intake, check-in, and follow-up flows",
      "Scheduling and shift coordination",
    ],
    tools: ["Booking/PMS system", "A messaging + review platform", "An automation layer"],
  },
  healthcare: {
    label: "Healthcare / wellness",
    aiFit: [
      "AI intake and appointment reminders (privacy-safe)",
      "AI drafting of notes and documentation",
      "AI answering common patient questions",
    ],
    automations: [
      "Automated scheduling and reminders (fewer no-shows)",
      "Intake forms that flow straight into your system",
      "Billing and insurance follow-up",
    ],
    tools: ["HIPAA-ready scheduling & records", "Secure forms + messaging", "Compliant automation setup"],
  },
  manufacturing: {
    label: "Manufacturing / trades / logistics",
    aiFit: [
      "AI for quotes, job specs, and documentation",
      "AI-assisted scheduling and dispatch",
      "AI reading and routing inbound orders/emails",
    ],
    automations: [
      "Job, inventory, and order tracking in one place",
      "Automated quotes and work orders",
      "Status updates to customers without phone tag",
    ],
    tools: ["Job/inventory management system", "Quote + invoice automation", "An automation layer"],
  },
  government: {
    label: "Government contracting",
    aiFit: [
      "AI to draft and search proposals and compliance docs",
      "AI assistants trained on your past performance and capabilities",
      "AI to monitor opportunities and shape responses",
    ],
    automations: [
      "Proposal assembly and compliance-matrix workflows",
      "Document control and audit-ready records",
      "Capture and pipeline tracking",
    ],
    tools: ["Compliant (CMMC/NIST-aware) systems", "Secure document management", "Controlled automation layer"],
  },
  tech_saas: {
    label: "Software / tech",
    aiFit: [
      "AI support agent over your docs and tickets",
      "AI in your product (a feature customers feel)",
      "AI for internal ops, QA, and reporting",
    ],
    automations: [
      "Onboarding, billing, and lifecycle emails",
      "Support triage and routing",
      "Internal reporting and alerting",
    ],
    tools: ["Product analytics + CRM", "Support desk with AI", "Workflow automation / internal tooling"],
  },
  nonprofit: {
    label: "Nonprofit / association",
    aiFit: [
      "AI drafting for grants, appeals, and communications",
      "AI answering member and donor questions",
      "AI summarizing reports for the board",
    ],
    automations: [
      "Donor and member follow-up sequences",
      "Event registration and reminders",
      "Reporting and receipts on autopilot",
    ],
    tools: ["A CRM/donor system", "Email automation", "An automation layer"],
  },
  other: {
    label: "Your business",
    aiFit: [
      "AI drafting for your most common written work",
      "An AI assistant that answers from your own information",
      "AI handling repetitive questions and requests",
    ],
    automations: [
      "Automate your single most-repeated manual task",
      "Connect the tools that don't talk to each other",
      "Automated follow-up so nothing slips",
    ],
    tools: ["A connected core system (CRM or equivalent)", "An automation layer (Make/Zapier)", "AI drafting tools"],
  },
};

/** Framing tied to what the person said matters most. */
export const GOAL_FRAME: Record<Goal, { label: string; line: string }> = {
  save_time: {
    label: "Win back time",
    line: "Your fastest wins are automating the repetitive work that eats the week.",
  },
  cut_costs: {
    label: "Cut costs",
    line: "The cheapest cost to cut is the labor hours buried in manual busywork.",
  },
  grow_revenue: {
    label: "Grow revenue",
    line: "Automating follow-up and freeing your team to sell is where growth hides.",
  },
  scale_no_hire: {
    label: "Do more without hiring",
    line: "Automation and AI are how you add capacity without adding headcount.",
  },
  reduce_errors: {
    label: "Stop errors",
    line: "Every manual hand-off is where mistakes creep in — automation removes them.",
  },
  security: {
    label: "Lock down security",
    line: "Getting your data handling right protects the business and opens bigger doors.",
  },
};

export function dimensionLabel(d: Dimension): string {
  return DIMENSION_LABELS[d];
}

export function industryLabel(i: Industry): string {
  return INDUSTRY_CONTENT[i].label;
}

/** Priority actions blend the biggest opportunity, the goal, and quick wins. */
export function topActions(dx: Diagnosis): string[] {
  const ind = INDUSTRY_CONTENT[dx.industry];
  const out: string[] = [];
  out.push(ind.automations[0]);
  if (dx.scores.ai < 55) out.push(ind.aiFit[0]);
  out.push(ind.automations[1] ?? ind.automations[0]);
  if (dx.scores.tools < 50) out.push(ind.tools[0]);
  if (dx.dataSensitivity === "regulated" || dx.dataSensitivity === "sensitive") {
    out.push("Get a security & compliance review before scaling anything up");
  }
  // De-dupe, keep 5.
  return [...new Set(out)].slice(0, 5);
}
