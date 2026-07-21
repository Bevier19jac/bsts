import type { Question } from "./types";

/**
 * The diagnostic question bank. Questions are plain data — the engine
 * (engine.ts) assembles an adaptive queue from these based on the detected
 * stage, so a user only sees the ~9–12 questions relevant to them.
 *
 * `stages` scopes a question to a branch. Questions with no `stages` are asked
 * on every path. Each option carries weighted score deltas (`d`) and
 * founder-archetype affinities (`a`); some options also set the stage.
 */

export const QUESTIONS: Question[] = [
  // ── 1. Stage selector (everyone) ───────────────────────────────
  {
    id: "stage",
    text: "Where are you with this business today?",
    description: "Be honest about where you actually are — it changes everything that follows.",
    type: "single",
    category: "profile",
    required: true,
    options: [
      { value: "idea", label: "I have an idea I haven't built yet", stage: "idea", d: { health: 8, execution: 6 } },
      { value: "validation", label: "I'm validating demand — talking to potential customers", stage: "validation", d: { health: 20, execution: 14, marketing: 8 } },
      { value: "prototype", label: "I'm building a prototype / first version", stage: "prototype", d: { health: 30, execution: 26 } },
      { value: "mvp", label: "I have an MVP or early product live", stage: "mvp", d: { health: 42, execution: 40 } },
      { value: "early_revenue", label: "I have paying customers", stage: "early_revenue", d: { health: 58, execution: 52, finance: 30, sales: 30 } },
      { value: "growth", label: "I have consistent, growing revenue", stage: "growth", d: { health: 70, execution: 62, finance: 45, sales: 45, marketing: 30 } },
      { value: "scale", label: "I'm scaling an established business", stage: "scale", d: { health: 78, execution: 70, finance: 55, operations: 40, leadership: 30 } },
    ],
  },

  // ── 2. Business type (everyone) — strong archetype signal ──────
  {
    id: "btype",
    text: "What kind of business is it?",
    type: "single",
    category: "profile",
    required: true,
    options: [
      { value: "saas", label: "SaaS / software platform", a: { builder: 3, ai_native: 2, strategist: 1 } },
      { value: "ai", label: "AI product", a: { ai_native: 4, builder: 2 } },
      { value: "ecommerce", label: "E-commerce / DTC", a: { operator: 3, creative: 2 } },
      { value: "local_service", label: "Local service business", a: { operator: 3, consultant: 1 } },
      { value: "agency", label: "Agency / studio", a: { consultant: 3, creative: 2 } },
      { value: "consulting", label: "Consulting / coaching", a: { consultant: 4, strategist: 1 } },
      { value: "mobile", label: "Mobile app", a: { builder: 3, ai_native: 1 } },
      { value: "physical", label: "Physical product / hardware", a: { inventor: 4, operator: 1 } },
      { value: "content", label: "Media / content / community", a: { community: 4, creative: 2 } },
      { value: "other", label: "Something else", a: {} },
    ],
  },

  // ── EARLY branch: idea + validation ────────────────────────────
  {
    id: "validation_level",
    text: "How far have you validated that people actually want this?",
    type: "single",
    category: "health",
    stages: ["idea", "validation"],
    required: true,
    options: [
      { value: "none", label: "Haven't talked to anyone yet", d: { health: -6, marketing: -4 } },
      { value: "friends", label: "Just friends & family", d: { health: 2 } },
      { value: "interviews", label: "Interviewed real potential customers", d: { health: 14, marketing: 8 }, stage: "validation" },
      { value: "preorders", label: "People have pre-committed or signed up", d: { health: 24, sales: 12, marketing: 10 }, stage: "validation" },
      { value: "sold", label: "I've taken money for it", d: { health: 34, sales: 22, finance: 12 }, stage: "early_revenue" },
    ],
  },
  {
    id: "customer_clarity",
    text: "How clearly do you know who your customer is?",
    type: "single",
    category: "marketing",
    stages: ["idea", "validation"],
    options: [
      { value: "no", label: "Not really", d: { marketing: -6 }, a: { builder: 1, inventor: 1 } },
      { value: "kind", label: "A rough idea", d: { marketing: 4 } },
      { value: "yes", label: "A specific, named ideal customer", d: { marketing: 16, sales: 8 }, a: { strategist: 2 } },
    ],
  },
  {
    id: "idea_obstacle",
    text: "What's the single biggest thing standing in your way?",
    type: "single",
    category: "founder",
    stages: ["idea", "validation"],
    options: [
      { value: "start", label: "I don't know where to start", d: { execution: -6, founder: -4 }, a: { corporate: 2, strategist: 1 } },
      { value: "funding", label: "Funding", d: { finance: -8 }, a: { strategist: 1 } },
      { value: "technical", label: "I can't build it myself", d: { execution: -6 }, a: { strategist: 2, consultant: 1, corporate: 1 } },
      { value: "fear", label: "Fear of failing / commitment", d: { founder: -8 }, a: { corporate: 2 } },
      { value: "time", label: "Time", d: { execution: -4 }, a: { corporate: 1, consultant: 1 } },
    ],
  },

  // ── BUILD branch: prototype + mvp ──────────────────────────────
  {
    id: "product_state",
    text: "How far along is the product itself?",
    type: "single",
    category: "execution",
    stages: ["prototype", "mvp"],
    required: true,
    options: [
      { value: "concept", label: "Mostly mockups / concept", d: { execution: -4 }, a: { strategist: 1 } },
      { value: "partial", label: "Partly built, not usable yet", d: { execution: 6 }, a: { builder: 1 } },
      { value: "works", label: "It works — real people could use it", d: { execution: 18 }, a: { builder: 2 }, stage: "mvp" },
      { value: "polished", label: "Live and reasonably polished", d: { execution: 26, health: 8 }, a: { builder: 2 }, stage: "mvp" },
    ],
  },
  {
    id: "testers",
    text: "How many real users have actually tried it?",
    type: "single",
    category: "health",
    stages: ["prototype", "mvp"],
    options: [
      { value: "none", label: "None yet", d: { health: -8, marketing: -6 }, a: { builder: 2, inventor: 2 } },
      { value: "handful", label: "A handful", d: { health: 6 } },
      { value: "dozens", label: "Dozens", d: { health: 16, marketing: 8 } },
      { value: "hundreds", label: "Hundreds or more", d: { health: 26, marketing: 14 }, stage: "early_revenue" },
    ],
  },
  {
    id: "launch_blocker",
    text: "What's really keeping you from launching (or growing)?",
    type: "single",
    category: "execution",
    stages: ["prototype", "mvp"],
    options: [
      { value: "build", label: "Still building / technical work", d: { execution: 4 }, a: { builder: 2 } },
      { value: "polish", label: "It's never 'ready' enough", d: { execution: -4 }, a: { builder: 3, inventor: 2 } },
      { value: "marketing", label: "I don't know how to get users", d: { marketing: -8 }, a: { builder: 2, strategist: 1 } },
      { value: "funding", label: "Funding", d: { finance: -8 } },
      { value: "confidence", label: "Confidence / fear it isn't good enough", d: { founder: -6 }, a: { corporate: 1, creative: 1 } },
    ],
  },

  // ── REVENUE branch: early_revenue + growth ─────────────────────
  {
    id: "mrr",
    text: "Roughly what's your current monthly revenue?",
    type: "single",
    category: "finance",
    stages: ["early_revenue", "growth"],
    required: true,
    options: [
      { value: "0", label: "Effectively $0 right now", d: { finance: -6, health: -4 } },
      { value: "u1k", label: "Under $1,000", d: { finance: 4 } },
      { value: "1-5k", label: "$1k–$5k", d: { finance: 14, health: 8 } },
      { value: "5-10k", label: "$5k–$10k", d: { finance: 22, health: 12 } },
      { value: "10-50k", label: "$10k–$50k", d: { finance: 34, health: 20 }, stage: "growth" },
      { value: "50-250k", label: "$50k–$250k", d: { finance: 46, health: 30, operations: 14 }, stage: "growth" },
      { value: "250k+", label: "$250k+", d: { finance: 56, health: 38, operations: 20 }, stage: "scale" },
    ],
  },
  {
    id: "customers",
    text: "How many active customers do you have?",
    type: "single",
    category: "health",
    stages: ["early_revenue", "growth"],
    options: [
      { value: "1-10", label: "1–10", d: { health: 6 } },
      { value: "11-50", label: "11–50", d: { health: 14, marketing: 8 } },
      { value: "51-250", label: "51–250", d: { health: 22, marketing: 14 } },
      { value: "250+", label: "250+", d: { health: 30, marketing: 20, operations: 10 } },
    ],
  },
  {
    id: "acquisition",
    text: "How do most customers find you today?",
    type: "single",
    category: "marketing",
    stages: ["early_revenue", "growth"],
    options: [
      { value: "none", label: "They mostly don't — it's a struggle", d: { marketing: -8, sales: -4 } },
      { value: "wom", label: "Word of mouth / referrals", d: { marketing: 6, sales: 6 } },
      { value: "outbound", label: "Cold outreach / me hustling", d: { sales: 10 }, a: { consultant: 1, strategist: 1 } },
      { value: "organic", label: "Content / SEO / social", d: { marketing: 16 }, a: { creative: 2, community: 1 } },
      { value: "paid", label: "Paid ads", d: { marketing: 14, finance: -2 }, a: { growth_leader: 2 } },
      { value: "multi", label: "A repeatable mix of channels", d: { marketing: 24, sales: 12 }, a: { growth_leader: 3 } },
    ],
  },
  {
    id: "rev_bottleneck",
    text: "What's the biggest thing capping your revenue?",
    type: "single",
    category: "sales",
    stages: ["early_revenue", "growth"],
    options: [
      { value: "leads", label: "Not enough leads", d: { marketing: -6 }, a: { builder: 1 } },
      { value: "convert", label: "Turning interest into sales", d: { sales: -6 }, a: { builder: 2, inventor: 1 } },
      { value: "product", label: "Product gaps / retention", d: { health: -4 } },
      { value: "delivery", label: "Delivering it all myself", d: { operations: -8 }, a: { consultant: 3, operator: 1 } },
      { value: "team", label: "Not enough team / capacity", d: { operations: -6, leadership: -4 } },
      { value: "systems", label: "Messy, manual systems", d: { operations: -8, automation: -6 }, a: { operator: 1 } },
    ],
  },

  // ── SCALE branch ───────────────────────────────────────────────
  {
    id: "team",
    text: "How big is your team?",
    type: "single",
    category: "leadership",
    stages: ["scale"],
    required: true,
    options: [
      { value: "solo", label: "Just me", d: { leadership: -4, operations: -4 }, a: { consultant: 2 } },
      { value: "2-5", label: "2–5 people", d: { leadership: 10, operations: 8 } },
      { value: "6-20", label: "6–20", d: { leadership: 20, operations: 16 } },
      { value: "21+", label: "21+", d: { leadership: 30, operations: 24 } },
    ],
  },
  {
    id: "sops",
    text: "How documented are your processes?",
    type: "single",
    category: "operations",
    stages: ["scale"],
    options: [
      { value: "head", label: "Mostly in my head", d: { operations: -10 }, a: { consultant: 1 } },
      { value: "some", label: "A few things written down", d: { operations: 6 } },
      { value: "most", label: "Most key processes are SOPs", d: { operations: 20, automation: 8 }, a: { operator: 3 } },
      { value: "full", label: "Fully documented & followed", d: { operations: 30, automation: 14 }, a: { operator: 4 } },
    ],
  },
  {
    id: "delegation",
    text: "How much of the work runs without you?",
    type: "single",
    category: "leadership",
    stages: ["scale"],
    options: [
      { value: "none", label: "Almost nothing — I'm the bottleneck", d: { leadership: -10 }, a: { consultant: 2, builder: 1 } },
      { value: "some", label: "Some things", d: { leadership: 8 } },
      { value: "most", label: "Most day-to-day runs without me", d: { leadership: 22, operations: 10 }, a: { operator: 2, growth_leader: 2 } },
      { value: "lead", label: "I lead — I rarely do the doing", d: { leadership: 32 }, a: { growth_leader: 3, operator: 1 } },
    ],
  },

  // ── CROSS-CUTTING (everyone) — archetype + readiness ───────────
  {
    id: "tech",
    text: "How would you describe your technical ability?",
    type: "single",
    category: "execution",
    options: [
      { value: "beginner", label: "Non-technical", d: { execution: -2, ai: -4 }, a: { strategist: 2, consultant: 2, corporate: 2, creative: 1 } },
      { value: "nocode", label: "Comfortable with no-code tools", d: { execution: 8, ai: 6, automation: 8 }, a: { ai_native: 2, operator: 2 } },
      { value: "intermediate", label: "I can build some things", d: { execution: 14, ai: 8 }, a: { builder: 1 } },
      { value: "developer", label: "I'm a software developer", d: { execution: 24, ai: 12 }, a: { builder: 4 } },
      { value: "technical_founder", label: "Deeply technical — I architect systems", d: { execution: 30, ai: 16 }, a: { builder: 5, ai_native: 1 } },
    ],
  },
  {
    id: "sales_conf",
    text: "How do you feel about sales & marketing?",
    type: "single",
    category: "sales",
    options: [
      { value: "avoid", label: "I avoid it — not my thing", d: { sales: -8, marketing: -6 }, a: { builder: 3, inventor: 2 } },
      { value: "learning", label: "Learning, but it's a struggle", d: { sales: -2, marketing: -2 }, a: { builder: 1, corporate: 1 } },
      { value: "decent", label: "I hold my own", d: { sales: 10, marketing: 8 } },
      { value: "strong", label: "I'm good at it", d: { sales: 20, marketing: 16 }, a: { strategist: 2, creative: 1 } },
      { value: "superpower", label: "It's my superpower", d: { sales: 28, marketing: 24 }, a: { strategist: 3, creative: 2, community: 1 } },
    ],
  },
  {
    id: "ai_use",
    text: "How do you use AI in the business right now?",
    type: "single",
    category: "ai",
    options: [
      { value: "none", label: "I don't", d: { ai: -6, automation: -4 }, a: { corporate: 1, inventor: 1 } },
      { value: "sometimes", label: "Occasionally, for odd tasks", d: { ai: 8, automation: 4 } },
      { value: "weekly", label: "Weekly — it helps real work", d: { ai: 18, automation: 12 } },
      { value: "daily", label: "Daily — woven into how I work", d: { ai: 28, automation: 20 }, a: { ai_native: 3 } },
      { value: "core", label: "AI runs core parts of the business", d: { ai: 38, automation: 30 }, a: { ai_native: 5 } },
    ],
  },
  {
    id: "superpower",
    text: "When you're at your best, what are you actually doing?",
    description: "Pick the one that feels most like you.",
    type: "single",
    category: "founder",
    required: true,
    options: [
      { value: "building", label: "Building the product / solving technical problems", d: { execution: 10, founder: 6 }, a: { builder: 5, ai_native: 2, inventor: 2 } },
      { value: "strategy", label: "Strategy, vision, and closing deals", d: { sales: 8, founder: 8 }, a: { strategist: 5, growth_leader: 1 } },
      { value: "systems", label: "Designing systems and making things run", d: { operations: 12, founder: 6 }, a: { operator: 5, growth_leader: 2 } },
      { value: "brand", label: "Brand, design, content, storytelling", d: { marketing: 12, founder: 6 }, a: { creative: 5, community: 2 } },
      { value: "serving", label: "Working directly with clients", d: { sales: 8, founder: 4 }, a: { consultant: 5 } },
      { value: "audience", label: "Building an audience / community", d: { marketing: 10, founder: 6 }, a: { community: 5, creative: 1 } },
    ],
  },
  {
    id: "work_mgmt",
    text: "How do you run day-to-day operations?",
    type: "single",
    category: "operations",
    stages: ["early_revenue", "growth", "scale"],
    options: [
      { value: "head", label: "Mostly memory & notes", d: { operations: -8, automation: -6 } },
      { value: "sheets", label: "Spreadsheets", d: { operations: 4 } },
      { value: "pm", label: "Notion / Trello / Asana", d: { operations: 12, automation: 6 } },
      { value: "pro", label: "ClickUp / Jira / real workflows", d: { operations: 20, automation: 12 }, a: { operator: 2 } },
      { value: "custom", label: "Custom / automated systems", d: { operations: 26, automation: 22 }, a: { builder: 2, operator: 2, ai_native: 1 } },
    ],
  },

  // ── FINAL (everyone) ───────────────────────────────────────────
  {
    id: "focus",
    text: "If we could fix one thing for you this quarter, what would move the needle most?",
    type: "single",
    category: "profile",
    required: true,
    options: [
      { value: "strategy", label: "Clear strategy & direction", d: { founder: 4 } },
      { value: "validation", label: "Proving demand", d: { health: 4 } },
      { value: "product", label: "The product itself", d: { execution: 4 } },
      { value: "marketing", label: "Getting seen / marketing", d: { marketing: 4 } },
      { value: "sales", label: "Closing more sales", d: { sales: 4 } },
      { value: "operations", label: "Operations & delivery", d: { operations: 4 } },
      { value: "automation", label: "Automation & AI", d: { automation: 4, ai: 2 } },
      { value: "hiring", label: "Team & hiring", d: { leadership: 4 } },
      { value: "finance", label: "Money & margins", d: { finance: 4 } },
    ],
  },
];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
);
