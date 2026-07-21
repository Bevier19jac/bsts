import type { Answers, Archetype, Diagnosis, Scores, Stage } from "./types";

/**
 * BSTS Intelligence Layer.
 *
 * Patterns read RELATIONSHIPS across answers, not isolated scores — the hidden
 * reasoning layer that lets BSTS "think". Patterns are composable: a business
 * can trigger several at once. Each is a pure predicate returning a confidence
 * (0 = not present). Add new patterns by appending to PATTERNS — no engine
 * change required.
 */

export type PatternKind = "risk" | "opportunity" | "strength";

export interface Pattern {
  id: string;
  name: string;
  kind: PatternKind;
  description: string;
  /** Why it matters (the reasoning shown to the founder). */
  why: string;
  actions: string[];
  aiRecs?: string[];
  detect: (c: PatternContext) => number; // 0–100 confidence; 0 = no match
}

export interface PatternContext {
  s: Scores;
  stage: Stage;
  archetype: Archetype;
  secondary: Archetype;
  overall: number;
  /** first selected value for a question id, or undefined if not asked */
  a: (qid: string) => string | undefined;
}

export interface DetectedPattern extends Omit<Pattern, "detect"> {
  confidence: number;
}

const EARLY: Stage[] = ["idea", "validation", "prototype", "mvp"];
const REVENUE: Stage[] = ["early_revenue", "growth", "scale"];

export const PATTERNS: Pattern[] = [
  {
    id: "builders_trap",
    name: "Builder's Trap",
    kind: "risk",
    description: "Strong technical ability, but building in isolation without real customers or validated demand.",
    why: "You can build faster than you can sell — so the product keeps advancing while demand stays unproven. That's the single most common way capable founders waste 6–18 months.",
    actions: [
      "Stop adding features for 2 weeks; talk to 10 potential buyers instead",
      "Put a paid offer in front of real people before building more",
      "Set a hard 'launch by' date and cut scope to hit it",
    ],
    aiRecs: ["Use AI to draft outreach and interview scripts so selling feels less foreign"],
    detect: (c) => {
      const tech = ["developer", "technical_founder", "intermediate"].includes(c.a("tech") ?? "");
      const weakSales = ["avoid", "learning"].includes(c.a("sales_conf") ?? "");
      const unproven = c.s.health < 48 && EARLY.includes(c.stage);
      if (tech && unproven && (weakSales || c.s.marketing < 45)) {
        return clamp(58 + (48 - c.s.health) + (weakSales ? 12 : 0));
      }
      return 0;
    },
  },
  {
    id: "ops_bottleneck",
    name: "Operations Bottleneck",
    kind: "risk",
    description: "Demand is working, but manual, undocumented operations are capping growth.",
    why: "When revenue grows faster than your systems, delivery quality and your own sanity become the ceiling. The next dollar is trapped behind process, not marketing.",
    actions: [
      "Document your 3 most-repeated processes as SOPs this month",
      "Automate the single most time-consuming manual task",
      "Assign one owner (even part-time) to operations",
    ],
    aiRecs: ["Deploy an AI + Make/Zapier workflow on your most repetitive back-office task"],
    detect: (c) => {
      if (c.s.finance > 55 && c.s.operations < 52 && (c.s.marketing > 55 || c.s.sales > 55)) {
        return clamp(60 + (55 - c.s.operations));
      }
      if (c.a("rev_bottleneck") === "systems" || c.a("work_mgmt") === "head") return 66;
      return 0;
    },
  },
  {
    id: "technical_founder_gap",
    name: "Technical–Commercial Gap",
    kind: "risk",
    description: "Strong on product and AI, weak on sales and distribution.",
    why: "Great technology loses to good distribution every time. Your edge is real, but it's invisible until you build a repeatable way to reach and convert buyers.",
    actions: [
      "Pick ONE acquisition channel and commit to it for 90 days",
      "Write a plain, benefit-led value proposition (no jargon)",
      "Book 5 sales conversations this week",
    ],
    aiRecs: ["Use an AI SDR/assistant to research prospects and draft outbound"],
    detect: (c) => {
      if (c.s.ai > 58 && c.s.sales < 46) return clamp(55 + (c.s.ai - 58) + (46 - c.s.sales));
      return 0;
    },
  },
  {
    id: "perfectionism",
    name: "Perfectionism Loop",
    kind: "risk",
    description: "Polishing endlessly instead of shipping to real users.",
    why: "The market can't reward a product it hasn't seen. Every extra week of polish is a week of learning you don't get — and confidence you never build.",
    actions: [
      "Define 'good enough to charge' and ship the moment you hit it",
      "Get 10 real users on the current version this week",
      "Replace opinions with one measured usage metric",
    ],
    detect: (c) => {
      if (c.a("launch_blocker") === "polish") return 74;
      if (c.a("product_state") === "polished" && c.a("testers") === "none") return 70;
      return 0;
    },
  },
  {
    id: "time_for_money",
    name: "Time-for-Money Ceiling",
    kind: "risk",
    description: "Revenue is capped by your personal hours — everything runs through you.",
    why: "A service that only works when you're in the room is a job, not a scalable business. The unlock is productizing your expertise so revenue isn't 1:1 with your time.",
    actions: [
      "Package your service into a fixed-scope, fixed-price offer",
      "Document your delivery method so someone else could run 80% of it",
      "Hire or contract a delivery associate to offload you",
    ],
    aiRecs: ["Turn your repeatable deliverables into AI-assisted templates"],
    detect: (c) => {
      if (c.archetype === "consultant" && REVENUE.includes(c.stage)) return 68;
      if (c.a("rev_bottleneck") === "delivery") return 72;
      return 0;
    },
  },
  {
    id: "ghost_product",
    name: "Ghost Product",
    kind: "risk",
    description: "A built product almost nobody has actually used.",
    why: "Until real users touch it, you're guessing. Usage — not features — tells you what to build, fix, and charge for next.",
    actions: [
      "Get the product into 10 real users' hands in the next 14 days",
      "Watch 3 people use it live, silently, and take notes",
      "Instrument one activation metric",
    ],
    detect: (c) => {
      if (["prototype", "mvp"].includes(c.stage) && c.a("testers") === "none") return 71;
      return 0;
    },
  },
  {
    id: "leaky_bucket",
    name: "Leaky Bucket",
    kind: "risk",
    description: "Acquiring customers, but retention/product health is weak underneath.",
    why: "Pouring acquisition into a leaky product just spends money faster. Fixing retention is almost always cheaper than buying more customers to replace the ones you lose.",
    actions: [
      "Interview 5 churned or inactive customers this week",
      "Fix the top drop-off point before spending more on acquisition",
      "Define and track your activation moment",
    ],
    detect: (c) => {
      if (REVENUE.includes(c.stage) && c.s.marketing > 55 && c.s.health < 55 && c.a("rev_bottleneck") === "product")
        return 66;
      return 0;
    },
  },
  {
    id: "one_channel_risk",
    name: "Single-Channel Fragility",
    kind: "risk",
    description: "Most customers come from one source you don't fully control.",
    why: "One channel is one algorithm change away from a revenue cliff. Durable growth needs a second reliable way in before the first one wobbles.",
    actions: [
      "Name your current #1 channel and its biggest single risk",
      "Stand up a second channel experiment this quarter",
      "Build an owned asset (email list) you fully control",
    ],
    detect: (c) => {
      const ch = c.a("acquisition");
      if (REVENUE.includes(c.stage) && ch && ["wom", "outbound", "organic", "paid"].includes(ch)) return 58;
      return 0;
    },
  },
  {
    id: "founder_bottleneck",
    name: "Founder-as-Bottleneck",
    kind: "risk",
    description: "The business can't run without you touching everything.",
    why: "At your stage, you scale by removing yourself from the work, not by working more hours. Every decision routed through you is a ceiling on the whole company.",
    actions: [
      "List everything only you can do; delegate two of them this month",
      "Document the decisions you make so others can make them",
      "Install a weekly metrics review so you can lead, not do",
    ],
    detect: (c) => {
      if (c.stage === "scale" && (c.a("delegation") === "none" || c.a("delegation") === "some")) return 70;
      if (c.a("rev_bottleneck") === "team") return 60;
      return 0;
    },
  },
  {
    id: "sop_debt",
    name: "Systemization Debt",
    kind: "risk",
    description: "Scaling on processes that live in your head.",
    why: "Undocumented processes can't be delegated, automated, or improved — they just break under load and take you down with them.",
    actions: [
      "Document your 5 most critical processes as SOPs",
      "Turn one SOP into an automation",
      "Make 'if you did it twice, write it down' a rule",
    ],
    aiRecs: ["Use AI to draft SOPs from a quick voice walk-through of each process"],
    detect: (c) => {
      if (c.stage === "scale" && c.a("sops") === "head") return 68;
      return 0;
    },
  },
  {
    id: "undifferentiated",
    name: "Fuzzy Customer",
    kind: "risk",
    description: "Not yet clear exactly who this is for.",
    why: "If you can't name your one ideal customer, your marketing talks to everyone and lands on no one. Precision here makes every later step easier.",
    actions: [
      "Write a one-line description of your single ideal customer",
      "Interview 5 people who match it",
      "Rewrite your homepage headline to speak only to them",
    ],
    detect: (c) => {
      if (EARLY.includes(c.stage) && c.a("customer_clarity") === "no") return 64;
      return 0;
    },
  },
  {
    id: "pricing_left",
    name: "Money Left on the Table",
    kind: "opportunity",
    description: "Signs your pricing is below what the market would bear.",
    why: "Underpricing is the fastest, cheapest lever you have — it drops straight to the bottom line with no new customers required. Most early businesses are 20–50% underpriced.",
    actions: [
      "Test a 15–25% price increase on new customers",
      "Add a premium tier for your best customers",
      "Reframe pricing around outcomes, not hours or features",
    ],
    detect: (c) => {
      const mrr = c.a("mrr");
      const cust = c.a("customers");
      if (c.stage === "early_revenue" && ["u1k", "1-5k"].includes(mrr ?? "") && ["51-250", "250+"].includes(cust ?? ""))
        return 66;
      if (REVENUE.includes(c.stage) && c.s.finance < 55) return 52;
      return 0;
    },
  },
  {
    id: "ai_underuse",
    name: "AI Left Unused",
    kind: "opportunity",
    description: "Real work is being done manually that AI could handle now.",
    why: "You already have the raw material for leverage — repetitive, text-shaped work — and you're doing it by hand. This is the highest-ROI, lowest-risk upgrade available to you today.",
    actions: [
      "List your 5 most repetitive weekly tasks",
      "Automate the top one with AI this month",
      "Set a rule: every recurring task gets an AI-first attempt",
    ],
    aiRecs: ["Start with AI drafting (emails, content, summaries) — fastest payback, lowest risk"],
    detect: (c) => {
      const use = c.a("ai_use");
      if (["none", "sometimes"].includes(use ?? "") && !EARLY.slice(0, 2).includes(c.stage))
        return clamp(58 + (60 - c.s.ai) / 2);
      return 0;
    },
  },
  {
    id: "automation_gap",
    name: "Automation Gap",
    kind: "opportunity",
    description: "Manual operations where automation would compound.",
    why: "Manual steps don't just cost time — they cost errors, delays, and your attention. Automating them buys back the scarcest resource you have.",
    actions: [
      "Map every manual hand-off in your core workflow",
      "Automate the highest-frequency one first",
      "Add an automation layer (Make/Zapier) over your existing tools",
    ],
    detect: (c) => {
      if (REVENUE.includes(c.stage) && c.s.automation < 48) return clamp(56 + (48 - c.s.automation));
      return 0;
    },
  },
  {
    id: "validation_debt",
    name: "Validation Debt",
    kind: "risk",
    description: "Moving forward without proof anyone will pay.",
    why: "Every step you take on an unvalidated idea multiplies the cost of being wrong. Cheap proof now beats expensive regret later.",
    actions: [
      "Run 10 problem interviews before building more",
      "Get one person to pre-commit money",
      "Write the one-sentence problem you're solving",
    ],
    detect: (c) => {
      if (["idea", "validation"].includes(c.stage) && ["none", "friends"].includes(c.a("validation_level") ?? ""))
        return 68;
      return 0;
    },
  },
  {
    id: "confidence_block",
    name: "Confidence Block",
    kind: "risk",
    description: "Fear or self-doubt — not capability — is the real blocker.",
    why: "The gap here isn't skill, it's permission. The antidote to fear is a small, concrete action with a deadline, not more preparation.",
    actions: [
      "Ship one tiny public thing this week, imperfect on purpose",
      "Set a single, dated commitment and tell someone",
      "Separate 'it failed' from 'I failed' — they're not the same",
    ],
    detect: (c) => {
      if (c.a("idea_obstacle") === "fear" || c.a("launch_blocker") === "confidence") return 66;
      return 0;
    },
  },
  {
    id: "analysis_paralysis",
    name: "Analysis Paralysis",
    kind: "risk",
    description: "Over-planning and researching instead of shipping.",
    why: "Your professional instinct is to be fully prepared — but startups reward action over certainty. You'll learn more from one imperfect launch than ten more weeks of planning.",
    actions: [
      "Set a 2-week deadline to put something real in front of customers",
      "Cut your plan to the one experiment that matters",
      "Trade one research task for one customer conversation",
    ],
    detect: (c) => {
      if (c.archetype === "corporate" && EARLY.includes(c.stage)) return 62;
      if (c.a("idea_obstacle") === "start") return 58;
      return 0;
    },
  },
  {
    id: "gtm_gap",
    name: "Go-to-Market Gap",
    kind: "risk",
    description: "A strong product without a plan to reach buyers.",
    why: "Invention is only half the business. Without distribution, even a superior product stays a secret — and secrets don't pay.",
    actions: [
      "Define your first 100 customers and where they already gather",
      "Build a preorder/landing page to test demand",
      "Bring on a commercial partner or first sales hire",
    ],
    detect: (c) => {
      if (c.archetype === "inventor" && c.s.marketing < 50) return 62;
      return 0;
    },
  },
  {
    id: "monetization_gap",
    name: "Under-Monetized Audience",
    kind: "opportunity",
    description: "A real audience that isn't yet turned into durable revenue.",
    why: "Attention is the hard part, and you already have it. The opportunity is building offers and systems that convert that trust into predictable income.",
    actions: [
      "Launch one clear paid offer to your audience",
      "Move your audience onto an owned email list",
      "Design a simple funnel from content to purchase",
    ],
    detect: (c) => {
      if (c.archetype === "community" && c.s.finance < 52) return 60;
      return 0;
    },
  },
  {
    id: "cash_fragility",
    name: "Cash-Flow Fragility",
    kind: "risk",
    description: "Thin financial footing relative to the stage.",
    why: "Most businesses don't die from bad ideas — they die from running out of cash. Runway and margin discipline buy you the time to get everything else right.",
    actions: [
      "Build a simple 6-month cash forecast",
      "Cut or renegotiate your 3 biggest costs",
      "Prioritize revenue that lands this quarter, not next year",
    ],
    detect: (c) => {
      if (!["idea"].includes(c.stage) && c.s.finance < 42) return clamp(56 + (42 - c.s.finance));
      return 0;
    },
  },
  {
    id: "invisible_marketing",
    name: "Invisible Business",
    kind: "risk",
    description: "A working offer that almost no one can find.",
    why: "Revenue exists but discovery doesn't — you're relying on luck and word of mouth. A predictable acquisition channel converts a good business into a growing one.",
    actions: [
      "Choose one channel your customers actually use and go deep",
      "Publish consistently for 90 days on that channel",
      "Track leads → conversations → customers weekly",
    ],
    detect: (c) => {
      if (REVENUE.includes(c.stage) && (c.a("acquisition") === "none" || c.s.marketing < 42)) return 63;
      return 0;
    },
  },
  {
    id: "conversion_gap",
    name: "Conversion Gap",
    kind: "risk",
    description: "Interest is coming in but not turning into sales.",
    why: "Leads without conversion is a sales problem, not a traffic problem — and it's usually the cheaper of the two to fix. Small process changes here move revenue fast.",
    actions: [
      "Write a simple, repeatable sales script and follow it",
      "Add clear next-steps and follow-up to every lead",
      "Ask 5 people who didn't buy exactly why",
    ],
    detect: (c) => {
      if (c.a("rev_bottleneck") === "convert") return 64;
      return 0;
    },
  },
  {
    id: "capacity_ceiling",
    name: "Capacity Ceiling",
    kind: "risk",
    description: "Demand exceeds your ability to deliver.",
    why: "Being maxed out is a good problem hiding a real risk: quality slips, you burn out, and growth stalls. Capacity and systems are the unlock, not more sales.",
    actions: [
      "Systemize delivery so it doesn't all depend on you",
      "Make your first support/ops hire",
      "Automate or template the highest-volume delivery step",
    ],
    detect: (c) => {
      if (["team", "delivery"].includes(c.a("rev_bottleneck") ?? "")) return 58;
      return 0;
    },
  },
  {
    id: "poised_to_scale",
    name: "Poised to Scale",
    kind: "strength",
    description: "Demand, systems, and execution are aligned — you're ready to press.",
    why: "This is rare: your marketing works, your operations hold, and your fundamentals are strong at the same time. The move now is to invest behind the momentum, not tinker.",
    actions: [
      "Identify your #1 growth lever and fund it aggressively",
      "Make the strategic hire that removes your biggest bottleneck",
      "Deploy AI/automation to compound your operating leverage",
    ],
    detect: (c) => {
      if (["growth", "scale"].includes(c.stage) && c.s.operations > 60 && c.s.marketing > 58 && c.overall > 72)
        return 74;
      return 0;
    },
  },
  {
    id: "strong_fundamentals",
    name: "Strong Fundamentals",
    kind: "strength",
    description: "The core of the business is genuinely healthy.",
    why: "Your fundamentals are ahead of most at your stage. That's earned optionality — you can afford to make bigger, bolder bets than a shakier business could.",
    actions: [
      "Pick one ambitious 90-day bet and go all-in",
      "Protect what's working — don't over-tinker",
      "Reinvest strength into your single biggest constraint",
    ],
    detect: (c) => {
      if (c.overall > 76) return 70;
      return 0;
    },
  },
  {
    id: "ai_native_edge",
    name: "AI-Native Edge",
    kind: "strength",
    description: "You operate with AI leverage most competitors don't have.",
    why: "You get more done per person than teams 5x your size. Protect that edge by pairing it with real distribution and a defensible reason customers stay.",
    actions: [
      "Turn your AI leverage into a visible customer benefit",
      "Invest the time you save into distribution",
      "Build one durable moat (data, workflow lock-in, brand)",
    ],
    detect: (c) => {
      if (c.s.ai > 70 && c.s.automation > 60) return 66;
      return 0;
    },
  },
];

function clamp(n: number, lo = 20, hi = 97): number {
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

export function detectPatterns(dx: Diagnosis, answers: Answers): DetectedPattern[] {
  const ctx: PatternContext = {
    s: dx.scores,
    stage: dx.stage,
    archetype: dx.archetype,
    secondary: dx.secondaryArchetype,
    overall: dx.overall,
    a: (qid) => answers[qid]?.[0],
  };
  return PATTERNS.map((p) => {
    const { detect, ...rest } = p;
    return { ...rest, confidence: detect(ctx) };
  })
    .filter((p) => p.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);
}
