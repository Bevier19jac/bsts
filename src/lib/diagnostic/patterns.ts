import type { Answers, Diagnosis, Goal, Industry, Scores } from "./types";

/**
 * BSTS Opportunity Intelligence.
 *
 * Patterns read RELATIONSHIPS across the answers — not single scores — to
 * surface concrete technology opportunities and risks. Every pattern stays in
 * the AI / automation / systems / security lane. A business can trigger several
 * at once; each is a pure predicate returning a confidence (0 = not present).
 * Add new patterns by appending to PATTERNS — no engine change required.
 */

export type PatternKind = "opportunity" | "risk" | "strength";

export interface Pattern {
  id: string;
  name: string;
  kind: PatternKind;
  description: string;
  /** Why it matters — the plain-English reasoning shown to the reader. */
  why: string;
  actions: string[];
  /** Rough payoff framing (e.g. "Reclaim ~4 hrs/week"). */
  payoff?: string;
  detect: (c: PatternContext) => number; // 0–100 confidence; 0 = no match
}

export interface PatternContext {
  s: Scores;
  overall: number;
  industry: Industry;
  goal: Goal;
  hoursPerWeek: number;
  dataSensitivity: Diagnosis["dataSensitivity"];
  /** first selected value for a question id */
  a: (qid: string) => string | undefined;
  /** whether a multi-select answer contains a value */
  has: (qid: string, value: string) => boolean;
  /** whether any of these questions was answered "by hand" (value "manual") */
  manual: (qids: string[]) => boolean;
}

export interface DetectedPattern extends Omit<Pattern, "detect"> {
  confidence: number;
}

export const PATTERNS: Pattern[] = [
  {
    id: "data_entry_drain",
    name: "Copy-Paste Tax",
    kind: "opportunity",
    description: "The same information is being typed into more than one place by hand.",
    why: "Re-keying data is pure lost time and a top source of errors. It's also the single easiest thing to automate — the tools to connect your systems already exist and pay for themselves fast.",
    actions: [
      "Map every place the same data gets entered twice",
      "Connect those tools so data flows once, automatically",
      "Start with the highest-volume hand-off",
    ],
    payoff: "Often reclaims 3–6 hrs/week",
    detect: (c) => {
      if (c.has("ot_repeat", "data_entry") || c.manual(["mf_intake", "ec_inventory", "hc_intake"])) return 78;
      return 0;
    },
  },
  {
    id: "ai_untapped",
    name: "AI Sitting on the Shelf",
    kind: "opportunity",
    description: "Repetitive, text-shaped work is being done by hand that AI could handle today.",
    why: "You already have the raw material for AI leverage — repetitive writing, answering, and summarizing. It's the highest-return, lowest-risk upgrade available right now, and most competitors haven't done it yet.",
    actions: [
      "List your 5 most repetitive weekly tasks",
      "Put AI drafting on the top one this month",
      "Make 'try AI first' the default for recurring work",
    ],
    payoff: "Fast payback, low risk",
    detect: (c) => {
      const use = c.a("ai_use");
      if (use === "none") return 82;
      if (use === "sometimes") return 64;
      return 0;
    },
  },
  {
    id: "support_load",
    name: "Answering the Same Thing Twice",
    kind: "opportunity",
    description: "A lot of time goes to repetitive customer questions.",
    why: "The same questions asked over and over are exactly what an AI assistant handles well — instantly, 24/7, from your own information. It frees your team for the work only people can do.",
    actions: [
      "Collect your 20 most-asked questions",
      "Stand up an AI assistant trained on your answers",
      "Route only the genuinely new questions to a human",
    ],
    payoff: "Often reclaims 4–6 hrs/week",
    detect: (c) => {
      if (c.has("ot_repeat", "support") || c.manual(["ec_support", "ts_support"])) return 74;
      return 0;
    },
  },
  {
    id: "followup_leak",
    name: "Follow-Up Falling Through",
    kind: "opportunity",
    description: "Customer and lead follow-up is handled by hand.",
    why: "Manual follow-up is where revenue quietly leaks — people get missed when things get busy. Automated, well-timed follow-up captures money you're already earning the right to.",
    actions: [
      "Automate a simple follow-up sequence for every new lead",
      "Add reminders so nothing sits untouched",
      "Track leads → conversations → customers automatically",
    ],
    payoff: "Protects revenue you already earned",
    detect: (c) => {
      if (c.has("ot_repeat", "followup") || c.manual(["ot_followup", "np_donors", "ho_guest"])) return 68;
      return 0;
    },
  },
  {
    id: "scattered_tools",
    name: "Tools That Don't Talk",
    kind: "risk",
    description: "The business runs on separate apps (or spreadsheets) that don't connect.",
    why: "Disconnected tools force people to be the glue — copying between systems, reconciling by hand, and chasing what's current. Connecting them is usually the unlock that makes everything else easier.",
    actions: [
      "Draw the 5 core tools and where data moves between them",
      "Add an automation layer to connect them",
      "Make one system the source of truth",
    ],
    payoff: "Compounds across every workflow",
    detect: (c) => {
      const t = c.a("tools");
      if (t === "paper") return 76;
      if (t === "some_saas") return 66;
      return 0;
    },
  },
  {
    id: "manual_reporting",
    name: "Reports Built by Hand",
    kind: "opportunity",
    description: "Reports and spreadsheets are assembled manually.",
    why: "Hand-built reports are slow, easy to get wrong, and out of date the moment they're done. Automated dashboards give you the number the instant you need it, with none of the assembly.",
    actions: [
      "List the reports you rebuild regularly",
      "Automate the top one into a live dashboard",
      "Pull the data straight from the source, not by hand",
    ],
    payoff: "Often reclaims 2–4 hrs/week",
    detect: (c) => {
      if (c.has("ot_repeat", "reporting") || c.manual(["ts_internal", "np_reporting", "ot_reporting"])) return 66;
      return 0;
    },
  },
  {
    id: "scheduling_manual",
    name: "Scheduling Ping-Pong",
    kind: "opportunity",
    description: "Booking and scheduling are coordinated by hand.",
    why: "Back-and-forth scheduling is a small tax paid many times a day. Automated booking and reminders remove the coordination and cut no-shows at the same time.",
    actions: [
      "Put self-serve booking in front of customers",
      "Automate confirmations and reminders",
      "Sync it to your calendar and systems",
    ],
    payoff: "Fewer no-shows, less coordination",
    detect: (c) => {
      if (c.has("ot_repeat", "scheduling") || c.manual(["hc_scheduling", "ho_scheduling", "ho_booking"])) return 62;
      return 0;
    },
  },
  {
    id: "invoicing_manual",
    name: "Chasing Invoices by Hand",
    kind: "opportunity",
    description: "Invoicing, billing, or payment reminders are manual.",
    why: "Manual billing delays cash and eats admin time. Automated invoicing and reminders get you paid faster with zero chasing — a direct win for cash flow.",
    actions: [
      "Automate invoice creation from completed work",
      "Turn on automatic payment reminders",
      "Connect billing to your bookkeeping",
    ],
    payoff: "Gets you paid faster",
    detect: (c) => {
      if (c.has("ot_repeat", "invoicing") || c.manual(["ps_billing", "hc_billing", "ts_billing"])) return 58;
      return 0;
    },
  },
  {
    id: "error_prone",
    name: "Errors Slipping Through",
    kind: "risk",
    description: "Manual steps are regularly causing mistakes, delays, or dropped balls.",
    why: "Every manual hand-off is a place for something to go wrong — and errors cost far more than the time to prevent them. Automation makes the reliable path the default path.",
    actions: [
      "Find the manual step where errors happen most",
      "Automate or add a check at that exact point",
      "Standardize it so it doesn't depend on memory",
    ],
    payoff: "Protects quality and reputation",
    detect: (c) => {
      if (c.s.operations < 40) return 66;
      if (c.s.operations < 48) return 42;
      return 0;
    },
  },
  {
    id: "mostly_manual",
    name: "Running on Manual",
    kind: "opportunity",
    description: "Most of the day-to-day still runs by hand.",
    why: "When almost everything is manual, the opportunity is enormous — this is exactly the situation where a focused automation effort buys back real time in weeks, not years.",
    actions: [
      "Pick the three most-repeated manual tasks",
      "Automate them one at a time, biggest first",
      "Reinvest the reclaimed time into growth",
    ],
    payoff: "The biggest time win available to you",
    detect: (c) => {
      if (c.s.automation < 38) return 70;
      if (c.s.automation < 46) return 55;
      return 0;
    },
  },
  {
    id: "security_gap",
    name: "Security & Compliance Gap",
    kind: "risk",
    description: "You handle sensitive or regulated data without a clear security footing.",
    why: "Carrying regulated or sensitive data raises the stakes: a gap is a real business and legal risk, and increasingly it's the thing that wins or loses bigger contracts. Getting it right is both protection and an unlock.",
    actions: [
      "Map exactly what sensitive data you hold and where",
      "Run a security & compliance review against your framework",
      "Harden data handling before you scale it up",
    ],
    payoff: "Protects the business, opens bigger doors",
    detect: (c) => {
      if (c.dataSensitivity === "regulated") return 74;
      if (c.dataSensitivity === "unknown") return 60;
      if (c.dataSensitivity === "sensitive") return 48;
      return 0;
    },
  },
  {
    id: "compliance_named",
    name: "A Named Standard to Meet",
    kind: "risk",
    description: "You're on the hook for a specific compliance framework.",
    why: "Frameworks like HIPAA, CMMC/NIST, PCI, or SOC 2 aren't optional once they apply — and clients increasingly ask for proof. Treating readiness as a project (not a scramble) is what keeps deals and avoids penalties.",
    actions: [
      "Confirm exactly which framework(s) apply and the current gap",
      "Build a prioritized readiness plan",
      "Put the controls and documentation in place",
    ],
    payoff: "Wins contracts, avoids penalties",
    detect: (c) => {
      if (
        c.has("compliance", "hipaa") ||
        c.has("compliance", "cmmc") ||
        c.has("compliance", "pci") ||
        c.has("compliance", "soc2")
      )
        return 70;
      return 0;
    },
  },
  {
    id: "scale_without_hire",
    name: "Capacity Without Hiring",
    kind: "opportunity",
    description: "You want to handle more, and automation is the lever — not headcount.",
    why: "Adding people is the slow, expensive way to add capacity. Automating the repetitive load lets the team you already have do noticeably more, which is exactly what you said you're after.",
    actions: [
      "Identify the work that grows with volume",
      "Automate that work first so growth doesn't mean hiring",
      "Layer AI onto the parts that need judgment",
    ],
    payoff: "More output, same team",
    detect: (c) => {
      if (c.goal === "scale_no_hire" && c.s.automation < 60) return 66;
      return 0;
    },
  },
  {
    id: "strong_foundation",
    name: "Strong Foundation",
    kind: "strength",
    description: "Your systems and automation are already ahead of most at your size.",
    why: "You've got a real base to build on — connected tools and automation in place. That means the next moves are about leverage and AI, not fixing basics, and you can move faster than most.",
    actions: [
      "Layer AI onto the workflows you've already automated",
      "Push into forecasting and smarter decisions",
      "Protect the edge — don't let systems drift",
    ],
    payoff: "Ready for the next level",
    detect: (c) => {
      if (c.s.automation > 62 && c.s.tools > 60) return 70;
      return 0;
    },
  },
  {
    id: "ai_forward",
    name: "AI-Forward Already",
    kind: "strength",
    description: "You're already putting AI to work — ahead of the curve.",
    why: "Most businesses your size haven't started with AI. You have, which is a genuine advantage. The play now is to widen the lead: more workflows, deeper integration, real defensibility.",
    actions: [
      "Take AI from a few tasks to a full workflow",
      "Connect AI to your data for sharper results",
      "Turn the time you save into growth",
    ],
    payoff: "Compound your head start",
    detect: (c) => {
      if (c.s.ai > 66) return 66;
      return 0;
    },
  },
];

function clampC(n: number, lo = 25, hi = 96): number {
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

export function detectPatterns(dx: Diagnosis, answers: Answers): DetectedPattern[] {
  const ctx: PatternContext = {
    s: dx.scores,
    overall: dx.overall,
    industry: dx.industry,
    goal: dx.goal,
    hoursPerWeek: dx.hoursPerWeek,
    dataSensitivity: dx.dataSensitivity,
    a: (qid) => answers[qid]?.[0],
    has: (qid, value) => (answers[qid] ?? []).includes(value),
    manual: (qids) => qids.some((id) => answers[id]?.[0] === "manual"),
  };
  return PATTERNS.map((p) => {
    const { detect, ...rest } = p;
    const c = detect(ctx);
    return { ...rest, confidence: c > 0 ? clampC(c) : 0 };
  })
    .filter((p) => p.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);
}
