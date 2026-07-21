import type { Answers, Dimension, Industry, Question } from "./types";

/**
 * BSTS AI & Automation Opportunity Assessment — branching question bank.
 *
 * The bank is large (~60 questions), but each person only answers ~10–12:
 * their answers open only the branch that applies to them. Everyone answers a
 * short core (industry, size, cross-cutting tech questions, goal). The industry
 * they pick opens a module of questions tailored to how THAT kind of business
 * actually runs, and a few "manual" answers open a deeper follow-up. Nothing
 * else in the bank is shown.
 *
 * Adding a new branch is just appending questions with a `showIf` — no engine
 * change required.
 */

function has(a: Answers, qid: string, value: string): boolean {
  return (a[qid] ?? []).includes(value);
}

function isIndustry(a: Answers, ind: Industry): boolean {
  return has(a, "biz", ind);
}

/**
 * Standard "how is <workflow> handled?" question: by hand → partly → automated
 * → (optionally) with AI. Manual answers carry the estimated weekly hours that
 * feed the "time reclaimable" number.
 */
function wf(cfg: {
  id: string;
  industry: Industry;
  text: string;
  description?: string;
  hours: number;
  manual: string;
  partly: string;
  done: string;
  ai?: string;
  cat?: Dimension;
}): Question {
  const cat: Dimension = cfg.cat ?? "automation";
  const options = [
    { value: "manual", label: cfg.manual, hours: cfg.hours, d: { [cat]: -9, operations: -3 } },
    { value: "partly", label: cfg.partly, hours: Math.round(cfg.hours * 0.5), d: { [cat]: -2 } },
    { value: "done", label: cfg.done, d: { [cat]: 10, operations: 3 } },
  ];
  if (cfg.ai) {
    options.push({ value: "ai", label: cfg.ai, d: { [cat]: 8, ai: 10, operations: 2 } });
  }
  return {
    id: cfg.id,
    text: cfg.text,
    description: cfg.description,
    type: "single",
    category: cat,
    options,
    showIf: (a) => isIndustry(a, cfg.industry),
  };
}

/** A volume follow-up shown only when the linked workflow is done "by hand". */
function volume(id: string, linkedId: string, text: string, hoursHi: number): Question {
  return {
    id,
    text,
    description: "This helps size how much time is on the table.",
    type: "single",
    category: "automation",
    showIf: (a) => has(a, linkedId, "manual"),
    options: [
      { value: "low", label: "Just a handful", hours: Math.round(hoursHi * 0.3) },
      { value: "med", label: "A steady flow", hours: Math.round(hoursHi * 0.6) },
      { value: "high", label: "Constantly — it's a lot", hours: hoursHi },
    ],
  };
}

export const QUESTIONS: Question[] = [
  // ── Core (everyone) ──────────────────────────────────────────
  {
    id: "biz",
    text: "What kind of business is this?",
    description: "This opens a set of questions tailored to how your business actually runs.",
    type: "single",
    category: "profile",
    options: [
      { value: "professional_services", label: "Professional / consulting services", industry: "professional_services" },
      { value: "ecommerce_retail", label: "E-commerce or retail", industry: "ecommerce_retail" },
      { value: "hospitality", label: "Hospitality (hotel, restaurant, venue)", industry: "hospitality" },
      { value: "healthcare", label: "Healthcare or wellness", industry: "healthcare" },
      { value: "manufacturing", label: "Manufacturing, trades, or logistics", industry: "manufacturing" },
      { value: "government", label: "Government contracting / public sector", industry: "government" },
      { value: "tech_saas", label: "Software or tech", industry: "tech_saas" },
      { value: "nonprofit", label: "Nonprofit or association", industry: "nonprofit" },
      { value: "other", label: "Something else", industry: "other" },
    ],
  },
  {
    id: "size",
    text: "How many people does the work run through?",
    description: "Including you, employees, and regular contractors.",
    type: "single",
    category: "profile",
    options: [
      { value: "solo", label: "Just me" },
      { value: "small", label: "2–10 people" },
      { value: "mid", label: "11–50 people" },
      { value: "large", label: "50+ people" },
    ],
  },

  // ── Professional services module ─────────────────────────────
  wf({
    id: "ps_proposals",
    industry: "professional_services",
    text: "How are proposals and contracts created?",
    hours: 4,
    manual: "From scratch, by hand each time",
    partly: "From templates I fill in",
    done: "Generated automatically from a system",
    ai: "AI drafts them for me",
  }),
  volume("ps_proposals_vol", "ps_proposals", "How often are you writing proposals or contracts?", 5),
  wf({
    id: "ps_intake",
    industry: "professional_services",
    text: "How do new clients get onboarded?",
    hours: 3,
    manual: "Manually, step by step",
    partly: "I run a checklist",
    done: "An automated onboarding flow handles it",
  }),
  wf({
    id: "ps_billing",
    industry: "professional_services",
    text: "How does invoicing and payment follow-up work?",
    hours: 3,
    manual: "Manual invoices, and I chase payments",
    partly: "Software, but I chase manually",
    done: "Automated invoicing and reminders",
  }),
  {
    id: "ps_knowledge",
    text: "Where does your team's know-how live?",
    description: "The answers, templates, and past work people need to find.",
    type: "single",
    category: "tools",
    options: [
      { value: "heads", label: "Mostly in people's heads", d: { tools: -12, ai: -6 } },
      { value: "scattered", label: "Scattered across files and email", d: { tools: -6 } },
      { value: "organized", label: "Organized shared docs", d: { tools: 8 } },
      { value: "searchable", label: "A searchable / AI-assisted knowledge base", d: { tools: 10, ai: 10 } },
    ],
    showIf: (a) => isIndustry(a, "professional_services"),
  },

  // ── E-commerce / retail module ───────────────────────────────
  wf({
    id: "ec_orders",
    industry: "ecommerce_retail",
    text: "How are orders processed and fulfilled?",
    hours: 4,
    manual: "Lots of manual steps",
    partly: "Partly automated",
    done: "Fully automated end to end",
  }),
  wf({
    id: "ec_inventory",
    industry: "ecommerce_retail",
    text: "How is inventory tracked across channels?",
    hours: 3,
    manual: "By hand / spreadsheets",
    partly: "One system, updated manually",
    done: "Synced automatically across channels",
  }),
  wf({
    id: "ec_support",
    industry: "ecommerce_retail",
    text: "How are customer questions handled?",
    hours: 5,
    manual: "One by one, by hand",
    partly: "Templates and a help desk",
    done: "Automated where possible",
    ai: "An AI assistant handles common ones",
  }),
  volume("ec_support_vol", "ec_support", "How much customer messaging comes in?", 6),
  {
    id: "ec_marketing",
    text: "How do marketing emails and promos go out?",
    type: "single",
    category: "automation",
    options: [
      { value: "manual", label: "Manual blasts when I get to it", hours: 3, d: { automation: -8, ai: -4 } },
      { value: "scheduled", label: "Scheduled by hand", hours: 1, d: { automation: -2 } },
      { value: "flows", label: "Automated flows (cart, welcome, etc.)", d: { automation: 10 } },
      { value: "ai", label: "Automated and AI-personalized", d: { automation: 8, ai: 10 } },
    ],
    showIf: (a) => isIndustry(a, "ecommerce_retail"),
  },

  // ── Hospitality module ───────────────────────────────────────
  wf({
    id: "ho_booking",
    industry: "hospitality",
    text: "How are reservations and bookings handled?",
    hours: 4,
    manual: "Phone / by hand",
    partly: "A booking tool, managed manually",
    done: "Self-serve booking, fully automated",
  }),
  wf({
    id: "ho_guest",
    industry: "hospitality",
    text: "How do you communicate with guests before and after?",
    hours: 3,
    manual: "Manually, when we can",
    partly: "Some templates",
    done: "Automated confirmations and follow-ups",
    ai: "Automated and AI-personalized",
  }),
  {
    id: "ho_reviews",
    text: "How do you handle reviews and reputation?",
    type: "single",
    category: "ai",
    options: [
      { value: "ignore", label: "We don't really keep up", d: { ai: -6, operations: -4 } },
      { value: "manual", label: "Reply by hand when we see them", hours: 2, d: { automation: -4 } },
      { value: "tool", label: "A tool prompts and tracks them", d: { automation: 8 } },
      { value: "ai", label: "AI-assisted responses and monitoring", d: { ai: 10, automation: 6 } },
    ],
    showIf: (a) => isIndustry(a, "hospitality"),
  },
  wf({
    id: "ho_scheduling",
    industry: "hospitality",
    text: "How is staff scheduling handled?",
    hours: 3,
    manual: "Spreadsheets / by hand",
    partly: "A tool, adjusted manually",
    done: "Automated scheduling",
  }),

  // ── Healthcare module ────────────────────────────────────────
  wf({
    id: "hc_scheduling",
    industry: "healthcare",
    text: "How are appointments and reminders handled?",
    hours: 4,
    manual: "By hand — and no-shows hurt",
    partly: "Software, reminders sent manually",
    done: "Automated scheduling and reminders",
  }),
  wf({
    id: "hc_intake",
    industry: "healthcare",
    text: "How do patients complete intake and forms?",
    hours: 3,
    manual: "Paper / manual entry",
    partly: "Digital forms, entered by staff",
    done: "Digital forms that flow into the system",
  }),
  wf({
    id: "hc_notes",
    industry: "healthcare",
    text: "How is documentation and notes handled?",
    hours: 4,
    manual: "Written up by hand after visits",
    partly: "Templates in the system",
    done: "Streamlined in the EHR",
    ai: "AI-assisted notes / scribing",
  }),
  wf({
    id: "hc_billing",
    industry: "healthcare",
    text: "How is insurance and billing handled?",
    hours: 4,
    manual: "Manual claims and follow-up",
    partly: "Software, with manual follow-up",
    done: "Automated billing workflow",
  }),
  {
    id: "hc_records",
    text: "Where do patient records live?",
    type: "single",
    category: "security",
    options: [
      { value: "paper", label: "Paper or basic files", d: { tools: -12, security: -10 } },
      { value: "basic", label: "Basic software", d: { tools: -2, security: -2 } },
      { value: "ehr", label: "A proper EHR", d: { tools: 8, security: 4 } },
      { value: "secure", label: "Integrated, security-hardened EHR", d: { tools: 10, security: 12 } },
    ],
    showIf: (a) => isIndustry(a, "healthcare"),
  },

  // ── Manufacturing / trades / logistics module ────────────────
  wf({
    id: "mf_intake",
    industry: "manufacturing",
    text: "How do orders and jobs come in and get logged?",
    hours: 4,
    manual: "Phone, email, paper — keyed in by hand",
    partly: "A system, entered manually",
    done: "Captured automatically",
  }),
  wf({
    id: "mf_quotes",
    industry: "manufacturing",
    text: "How are quotes and work orders created?",
    hours: 3,
    manual: "From scratch each time",
    partly: "From templates",
    done: "Generated from a system",
  }),
  wf({
    id: "mf_inventory",
    industry: "manufacturing",
    text: "How are inventory and materials tracked?",
    hours: 4,
    manual: "By hand / spreadsheets",
    partly: "A system, updated manually",
    done: "Tracked automatically",
  }),
  volume("mf_inventory_vol", "mf_inventory", "How much are you tracking by hand?", 5),
  wf({
    id: "mf_status",
    industry: "manufacturing",
    text: "How do customers get status updates?",
    hours: 2,
    manual: "They call and we check",
    partly: "We update them manually",
    done: "Automated status notifications",
    ai: "Automated, with an AI assistant",
  }),

  // ── Government contracting module ────────────────────────────
  wf({
    id: "gv_proposals",
    industry: "government",
    text: "How are proposals and bids assembled?",
    hours: 6,
    manual: "Rebuilt largely from scratch each time",
    partly: "From past docs, copy-paste",
    done: "From a managed content library",
    ai: "AI-assisted drafting and search",
  }),
  volume("gv_proposals_vol", "gv_proposals", "How many proposals / bids are in flight?", 6),
  {
    id: "gv_compliance",
    text: "How do you manage compliance documentation?",
    type: "single",
    category: "security",
    options: [
      { value: "manual", label: "Scattered — it's a scramble at audit time", d: { security: -12, operations: -4 } },
      { value: "drive", label: "A shared drive, organized by hand", d: { security: -4 } },
      { value: "system", label: "A document management system", d: { security: 6, tools: 6 } },
      { value: "controlled", label: "Controlled, audit-ready, and current", d: { security: 12, tools: 6 } },
    ],
    showIf: (a) => isIndustry(a, "government"),
  },
  {
    id: "gv_capture",
    text: "How do you track opportunities and capture?",
    type: "single",
    category: "operations",
    options: [
      { value: "manual", label: "Spreadsheets / memory", hours: 3, d: { operations: -8, tools: -6 } },
      { value: "crm", label: "A CRM, updated by hand", d: { operations: 2 } },
      { value: "system", label: "A capture system with a real pipeline", d: { operations: 10, tools: 6 } },
    ],
    showIf: (a) => isIndustry(a, "government"),
  },
  {
    id: "gv_pastperf",
    text: "How do you reuse past performance and boilerplate?",
    type: "single",
    category: "ai",
    options: [
      { value: "rewrite", label: "Rewrite it each time", hours: 3, d: { ai: -8, tools: -6 } },
      { value: "copy", label: "Hunt through old files and copy-paste", hours: 2, d: { tools: -4 } },
      { value: "library", label: "A maintained content library", d: { tools: 8 } },
      { value: "ai", label: "AI-assisted search across past work", d: { ai: 12, tools: 6 } },
    ],
    showIf: (a) => isIndustry(a, "government"),
  },

  // ── Software / tech module ───────────────────────────────────
  wf({
    id: "ts_support",
    industry: "tech_saas",
    text: "How is customer support handled?",
    hours: 5,
    manual: "One by one, by hand",
    partly: "A help desk with macros",
    done: "Automated triage and routing",
    ai: "An AI agent over your docs and tickets",
  }),
  wf({
    id: "ts_onboard",
    industry: "tech_saas",
    text: "How are new customers onboarded?",
    hours: 3,
    manual: "Hands-on every time",
    partly: "Some automated emails",
    done: "A self-serve, automated flow",
  }),
  wf({
    id: "ts_billing",
    industry: "tech_saas",
    text: "How is billing and subscriptions handled?",
    hours: 2,
    manual: "Manual invoices / tracking",
    partly: "A tool, managed by hand",
    done: "Fully automated subscription billing",
  }),
  {
    id: "ts_internal",
    text: "How do internal reports and metrics get made?",
    type: "single",
    category: "tools",
    options: [
      { value: "manual", label: "Pulled together by hand", hours: 3, d: { tools: -8, automation: -4 } },
      { value: "spreadsheets", label: "Spreadsheets, updated manually", hours: 1, d: { tools: -2 } },
      { value: "dashboards", label: "Live dashboards", d: { tools: 10 } },
      { value: "auto", label: "Automated dashboards with alerts", d: { tools: 10, automation: 8 } },
    ],
    showIf: (a) => isIndustry(a, "tech_saas"),
  },
  {
    id: "ts_product_ai",
    text: "How much AI is in your product today?",
    type: "single",
    category: "ai",
    options: [
      { value: "none", label: "None yet", d: { ai: -10 } },
      { value: "exploring", label: "Exploring it", d: { ai: -2 } },
      { value: "one", label: "One real AI feature shipped", d: { ai: 10 } },
      { value: "core", label: "AI is core to the product", d: { ai: 16 } },
    ],
    showIf: (a) => isIndustry(a, "tech_saas"),
  },

  // ── Nonprofit module ─────────────────────────────────────────
  wf({
    id: "np_donors",
    industry: "nonprofit",
    text: "How are donors / members managed and thanked?",
    hours: 3,
    manual: "Spreadsheets and manual thank-yous",
    partly: "A CRM, updated by hand",
    done: "Automated acknowledgments and tracking",
    ai: "Automated and AI-personalized",
  }),
  wf({
    id: "np_grants",
    industry: "nonprofit",
    text: "How are grants and reports written?",
    hours: 5,
    manual: "From scratch each time",
    partly: "From past templates",
    done: "From a managed content library",
    ai: "AI-assisted drafting",
  }),
  volume("np_grants_vol", "np_grants", "How much grant / report writing is on your plate?", 5),
  wf({
    id: "np_events",
    industry: "nonprofit",
    text: "How is event registration handled?",
    hours: 3,
    manual: "By hand / spreadsheets",
    partly: "A tool, managed manually",
    done: "Automated registration and reminders",
  }),
  {
    id: "np_reporting",
    text: "How is impact and board reporting done?",
    type: "single",
    category: "tools",
    options: [
      { value: "manual", label: "Assembled by hand", hours: 2, d: { tools: -8 } },
      { value: "spreadsheets", label: "Spreadsheets", hours: 1, d: { tools: -2 } },
      { value: "dashboards", label: "Dashboards", d: { tools: 10 } },
    ],
    showIf: (a) => isIndustry(a, "nonprofit"),
  },

  // ── "Something else" module (generic) ────────────────────────
  {
    id: "ot_repeat",
    text: "Which of these eat the most time each week?",
    description: "Pick any that are still done by hand.",
    type: "multi",
    category: "automation",
    options: [
      { value: "data_entry", label: "Typing the same data into multiple places", hours: 5, d: { automation: -8 } },
      { value: "invoicing", label: "Invoicing, billing, or payment chasing", hours: 3, d: { automation: -5 } },
      { value: "scheduling", label: "Booking and scheduling", hours: 3, d: { automation: -5 } },
      { value: "reporting", label: "Building reports from scratch", hours: 4, d: { automation: -6, tools: -4 } },
      { value: "followup", label: "Customer or lead follow-up", hours: 4, d: { automation: -6 } },
      { value: "support", label: "Answering repetitive questions", hours: 5, d: { automation: -6, ai: -6 } },
      { value: "documents", label: "Creating documents, quotes, or contracts", hours: 4, d: { automation: -5 } },
    ],
    showIf: (a) => isIndustry(a, "other"),
  },
  wf({
    id: "ot_followup",
    industry: "other",
    text: "How is customer / lead follow-up handled?",
    hours: 4,
    manual: "By hand, when we remember",
    partly: "Some reminders",
    done: "Automated follow-up sequences",
    ai: "Automated and AI-assisted",
  }),
  {
    id: "ot_reporting",
    text: "How do reports get made?",
    type: "single",
    category: "tools",
    options: [
      { value: "manual", label: "By hand", hours: 3, d: { tools: -8 } },
      { value: "spreadsheets", label: "Spreadsheets", hours: 1, d: { tools: -2 } },
      { value: "dashboards", label: "Live dashboards", d: { tools: 10 } },
    ],
    showIf: (a) => isIndustry(a, "other"),
  },

  // ── Cross-cutting (everyone) ─────────────────────────────────
  {
    id: "ai_use",
    text: "How much are you using AI today?",
    description: "Tools like ChatGPT, Copilot, or AI built into your software.",
    type: "single",
    category: "ai",
    options: [
      { value: "none", label: "Not really using it", d: { ai: -22 } },
      { value: "sometimes", label: "I dabble with ChatGPT now and then", d: { ai: -6 } },
      { value: "few_tools", label: "A few AI tools in the workflow", d: { ai: 12 } },
      { value: "integrated", label: "AI is built into how we work", d: { ai: 24, automation: 6 } },
    ],
  },
  {
    id: "tools",
    text: "What are you running the business on?",
    description: "Your core systems — where the work and information live.",
    type: "single",
    category: "tools",
    options: [
      { value: "paper", label: "Paper, spreadsheets, and email", d: { tools: -18, automation: -8 } },
      { value: "some_saas", label: "A handful of separate apps that don't talk to each other", d: { tools: -6, automation: -6 } },
      { value: "connected", label: "A connected set of tools (CRM, etc.)", d: { tools: 12 } },
      { value: "custom", label: "Integrated or custom-built systems", d: { tools: 20, automation: 8 } },
    ],
  },
  {
    id: "data",
    text: "Do you handle sensitive or regulated information?",
    description: "Health records, payment data, government or client-confidential info.",
    type: "single",
    category: "security",
    options: [
      { value: "regulated", label: "Yes — regulated data (health, government, financial)", d: { security: -6 } },
      { value: "sensitive", label: "Sensitive client data, but not formally regulated", d: { security: -2 } },
      { value: "standard", label: "Standard business information", d: { security: 8 } },
      { value: "unknown", label: "Not sure", d: { security: -8 } },
    ],
  },
  {
    id: "compliance",
    text: "Which of these are on your plate?",
    description: "Standards you have to meet (or are being asked about).",
    type: "multi",
    category: "security",
    showIf: (a) =>
      has(a, "data", "regulated") ||
      has(a, "data", "unknown") ||
      isIndustry(a, "healthcare") ||
      isIndustry(a, "government"),
    options: [
      { value: "hipaa", label: "HIPAA (health data)", d: { security: -6 } },
      { value: "cmmc", label: "CMMC / NIST 800-171 (government / defense)", d: { security: -6 } },
      { value: "pci", label: "PCI (card payments)", d: { security: -4 } },
      { value: "soc2", label: "SOC 2 (clients are asking for it)", d: { security: -4 } },
      { value: "none_sure", label: "None / not sure", d: { security: -6 } },
    ],
  },
  {
    id: "goal",
    text: "If we could fix one thing first, what matters most to you?",
    type: "single",
    category: "profile",
    options: [
      { value: "save_time", label: "Win back time from busywork", goal: "save_time" },
      { value: "cut_costs", label: "Cut costs and overhead", goal: "cut_costs" },
      { value: "grow_revenue", label: "Grow revenue", goal: "grow_revenue" },
      { value: "scale_no_hire", label: "Handle more without hiring", goal: "scale_no_hire" },
      { value: "reduce_errors", label: "Stop errors and things slipping", goal: "reduce_errors" },
      { value: "security", label: "Lock down security and compliance", goal: "security" },
    ],
  },
  {
    id: "notes",
    text: "Anything specific you're hoping to fix?",
    description: "Optional — a sentence in your own words helps BSTS tailor the plan.",
    type: "text",
    category: "profile",
    placeholder: "e.g. we lose hours every week reconciling orders by hand…",
    optional: true,
    options: [],
  },
];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
);
