import type { Archetype, Diagnosis, Dimension, Stage } from "./types";

export const DIMENSION_LABELS: Record<Dimension, string> = {
  founder: "Founder Readiness",
  health: "Business Health",
  execution: "Execution",
  ai: "AI Readiness",
  automation: "Automation",
  marketing: "Marketing Maturity",
  sales: "Sales Maturity",
  operations: "Operational Maturity",
  finance: "Financial Readiness",
  leadership: "Leadership Readiness",
};

/** Order dimensions are shown in the report. */
export const DIMENSION_ORDER: Dimension[] = [
  "health",
  "execution",
  "sales",
  "marketing",
  "finance",
  "operations",
  "ai",
  "automation",
  "leadership",
  "founder",
];

interface StageContent {
  label: string;
  headline: string;
  timeToNext: string;
  d30: string[];
  d60: string[];
  d90: string[];
  quickWins: string[];
}

export const STAGE_CONTENT: Record<Stage, StageContent> = {
  idea: {
    label: "Idea",
    headline: "You have a spark. The job now is proof — talk to people before you build anything.",
    timeToNext: "≈ 30–60 days to Validation",
    d30: [
      "Write a one-sentence value proposition",
      "Interview 10 target customers about the problem",
      "Define the exact problem you solve and for whom",
    ],
    d60: [
      "Publish a simple landing page that explains the offer",
      "Collect 25+ emails from genuinely interested people",
      "Map 3 competitors and where your wedge is",
    ],
    d90: [
      "Pre-sell to 3 people (a real, paid commitment)",
      "Scope the smallest version worth building",
      "Decide with evidence: build, pivot, or shelve",
    ],
    quickWins: ["A one-sentence pitch", "10 customer conversations", "A waitlist landing page"],
  },
  validation: {
    label: "Validation",
    headline: "You're testing demand — the right move. Push toward paid signals, not just nice feedback.",
    timeToNext: "≈ 45–75 days to a working MVP",
    d30: [
      "Run 15 problem interviews and log the patterns",
      "Stand up a landing page with one clear call-to-action",
      "Name your single ideal customer precisely",
    ],
    d60: [
      "Drive 100 visitors and measure the signup rate",
      "Get 5 pre-orders or paid pilots",
      "Write the spec for a no-frills MVP",
    ],
    d90: [
      "Build the MVP (no-code wherever possible)",
      "Onboard your first 5 real users",
      "Pick one success metric to watch weekly",
    ],
    quickWins: ["A landing page with a CTA", "5 paid pilots", "One tracked metric"],
  },
  prototype: {
    label: "Prototype",
    headline: "You're building. Guard against perfectionism — get it in real hands fast.",
    timeToNext: "≈ 30–60 days to a live MVP",
    d30: [
      "Cut scope to the single core action that matters",
      "Get 10 people using the prototype this month",
      "Instrument one key usage metric",
    ],
    d60: [
      "Ship a usable v1 to a small waitlist",
      "Run 10 structured feedback sessions",
      "Add a simple way to charge money",
    ],
    d90: [
      "Convert 3–5 users to paying",
      "Fix the top 3 drop-off points",
      "Write a first-run onboarding flow",
    ],
    quickWins: ["10 active testers", "One usage metric", "A way to charge"],
  },
  mvp: {
    label: "MVP",
    headline: "You've shipped. Now prove people will pay and stay — charge money and watch retention.",
    timeToNext: "≈ 60–90 days to Early Revenue",
    d30: [
      "Define your activation 'aha' moment and measure it",
      "Charge money — even a small price validates value",
      "Talk to every user who churns",
    ],
    d60: [
      "Get to 10 paying customers",
      "Pick ONE acquisition channel and go deep",
      "Automate your onboarding emails",
    ],
    d90: [
      "Reach $1k+ in monthly recurring revenue",
      "Turn what works into a repeatable playbook",
      "Cut features nobody uses",
    ],
    quickWins: ["First paying customers", "One channel", "Automated onboarding"],
  },
  early_revenue: {
    label: "Early Revenue",
    headline: "Money is coming in — real signal. The work now is making it repeatable and less manual.",
    timeToNext: "≈ 90–120 days to Growth",
    d30: [
      "Pin down your CAC and retention numbers",
      "Double down on your best-performing channel",
      "Raise prices or add a higher tier",
    ],
    d60: [
      "Build a repeatable sales & onboarding motion",
      "Automate your top 3 manual tasks",
      "Grow to 30–50 customers",
    ],
    d90: [
      "String together 3 months of MRR growth",
      "Document delivery as SOPs",
      "Bring on your first support/ops help",
    ],
    quickWins: ["Known CAC & retention", "A pricing bump", "Top 3 tasks automated"],
  },
  growth: {
    label: "Growth",
    headline: "You're growing consistently. Leverage is the game now — systems, a second channel, and your first key hire.",
    timeToNext: "≈ 2–4 quarters to Scale",
    d30: [
      "Stand up a weekly KPI dashboard",
      "Find your #1 growth lever and fund it",
      "Map every manual bottleneck in the business",
    ],
    d60: [
      "Add a second reliable acquisition channel",
      "Automate reporting and reconciliation",
      "Document core processes as SOPs",
    ],
    d90: [
      "Make your first strategic hire",
      "Deploy AI/automation on repetitive ops",
      "Build a 12-month roadmap with real targets",
    ],
    quickWins: ["A KPI dashboard", "A second channel", "SOPs for the core"],
  },
  scale: {
    label: "Scale",
    headline: "You run a real business. The job is removing yourself as the bottleneck and compounding through systems and team.",
    timeToNext: "Optimizing for efficient scale",
    d30: [
      "Audit exactly where you're still the bottleneck",
      "Assign an owner and a KPI to every function",
      "Ship one high-leverage automation",
    ],
    d60: [
      "Fully delegate two recurring responsibilities",
      "Run a weekly leadership & metrics cadence",
      "Systemize hiring and onboarding",
    ],
    d90: [
      "Remove yourself from daily delivery",
      "Deploy AI across a full workflow end-to-end",
      "Set 4-quarter OKRs with the team",
    ],
    quickWins: ["One big automation", "Two delegated duties", "A metrics cadence"],
  },
};

interface ArchetypeContent {
  label: string;
  summary: string;
  strengths: string[];
  blindSpots: string[];
  risks: string[];
  decisionStyle: string;
  leadershipStyle: string;
  idealCofounder: string;
  firstHire: string;
  aiTools: string[];
  stack: string[];
  skills: string[];
}

export const ARCHETYPE_CONTENT: Record<Archetype, ArchetypeContent> = {
  builder: {
    label: "Technical Builder",
    summary:
      "You can build almost anything — your real risk is building in a cave. Your growth comes from shipping sooner and marketing louder.",
    strengths: ["Ships real product fast", "Solves hard technical problems", "Low build costs"],
    blindSpots: ["Over-polishing before launch", "Undervalues marketing & sales", "Talks to code more than customers"],
    risks: ["A great product nobody hears about"],
    decisionStyle: "Analytical, first-principles, evidence-driven",
    leadershipStyle: "Leads by building; hands-on",
    idealCofounder: "A commercial, sales-driven Strategist",
    firstHire: "A marketer or growth generalist — not another engineer",
    aiTools: ["Cursor / Copilot for build speed", "An LLM API for one smart feature", "An AI support agent"],
    stack: ["Next.js + your database", "Stripe for payments", "A lightweight CRM/pipeline"],
    skills: ["Customer interviewing", "Positioning & copywriting", "One paid acquisition channel"],
  },
  strategist: {
    label: "Business Strategist",
    summary:
      "Strong vision and deal instincts; your gap is technical execution. Partner or productize to turn strategy into shipped value.",
    strengths: ["Vision & positioning", "Selling and partnerships", "Sees the whole board"],
    blindSpots: ["Depends on others to build", "Can over-plan and under-ship", "Underrates operational detail"],
    risks: ["A great pitch deck with no product behind it"],
    decisionStyle: "Big-picture, opportunity-driven",
    leadershipStyle: "Visionary; rallies people to a mission",
    idealCofounder: "A Technical Builder",
    firstHire: "A technical lead or a strong dev contractor",
    aiTools: ["AI research & drafting", "An AI SDR for outbound", "No-code builders to prototype"],
    stack: ["A no-code / low-code MVP", "HubSpot or Pipedrive CRM", "Stripe"],
    skills: ["Enough technical literacy to scope well", "Financial modeling", "Hiring & managing builders"],
  },
  operator: {
    label: "Operator",
    summary:
      "You make things run. Your edge is turning a working business into a scalable, systemized machine — just make sure demand is proven first.",
    strengths: ["Process & systems", "Reliable execution", "Scaling mindset"],
    blindSpots: ["Can over-systemize too early", "May undervalue brand & vision", "Perfection over speed"],
    risks: ["Optimizing something that hasn't found demand"],
    decisionStyle: "Metrics- and process-driven",
    leadershipStyle: "Structured; clear ownership and accountability",
    idealCofounder: "A Creative or Strategist for demand generation",
    firstHire: "A marketer or a sales closer",
    aiTools: ["AI workflow automation (Make/Zapier + LLM)", "AI reporting & dashboards", "An AI operations assistant"],
    stack: ["ClickUp/Notion + SOPs", "A real CRM", "An automation layer (Make/Zapier)"],
    skills: ["Demand generation", "Storytelling & brand", "Fundraising, if scaling fast"],
  },
  creative: {
    label: "Creative Founder",
    summary:
      "You build brand, story, and audience. The opportunity is turning that attention into product and repeatable revenue systems.",
    strengths: ["Brand & storytelling", "Content & audience", "Strong design taste"],
    blindSpots: ["Weak on systems & ops", "Monetization lags the audience", "Avoids the numbers"],
    risks: ["An audience with no business model under it"],
    decisionStyle: "Intuitive, audience-led",
    leadershipStyle: "Inspiring; culture- and taste-first",
    idealCofounder: "An Operator or Builder",
    firstHire: "An operations manager",
    aiTools: ["AI content creation & repurposing", "AI image/video tools", "An AI community assistant"],
    stack: ["A store/checkout (Stripe/Shopify)", "Email/CRM (Beehiiv/Klaviyo)", "Notion for ops"],
    skills: ["Basic financial literacy", "Offer & funnel design", "Delegation & systems"],
  },
  consultant: {
    label: "Consultant / Service Provider",
    summary:
      "You trade time for money and it works — the leap is productizing so revenue isn't capped by your hours.",
    strengths: ["Deep client trust", "Real-world expertise", "Sells outcomes, not features"],
    blindSpots: ["Revenue capped by your time", "Everything runs through you", "Under-invests in systems"],
    risks: ["Building a job that owns you"],
    decisionStyle: "Client- and outcome-driven",
    leadershipStyle: "Player-coach",
    idealCofounder: "An Operator or Builder to help productize",
    firstHire: "A delivery associate or ops/VA to offload you",
    aiTools: ["AI to templatize your deliverables", "An AI intake & qualifier", "An AI knowledge base of your method"],
    stack: ["A CRM + proposals tool", "SOPs in Notion", "Automated client onboarding"],
    skills: ["Productization & packaging", "Delegation", "Recurring-revenue offers"],
  },
  corporate: {
    label: "Corporate Professional",
    summary:
      "Experienced and risk-aware, making the leap to founder. Your edge is discipline; your risk is over-planning and never shipping.",
    strengths: ["Professional discipline", "Deep domain expertise", "Sharp risk awareness"],
    blindSpots: ["Analysis paralysis", "Perfection over launch", "Comfort-zone bias"],
    risks: ["Waiting for a permission that never comes"],
    decisionStyle: "Careful, risk-managed",
    leadershipStyle: "Structured and experienced",
    idealCofounder: "A scrappy Builder or Creative",
    firstHire: "A doer / generalist who creates momentum",
    aiTools: ["AI to move fast on a first version", "AI market research", "No-code to prototype without engineers"],
    stack: ["A no-code MVP", "A landing page + waitlist", "Stripe"],
    skills: ["Bias to action — ship small", "Customer discovery", "Comfort with imperfect launches"],
  },
  inventor: {
    label: "Inventor",
    summary:
      "You create novel products. The path to a business is commercialization: customers, distribution, and a repeatable model.",
    strengths: ["Genuine innovation", "Deep product knowledge", "IP potential"],
    blindSpots: ["Product-first, market-later", "Undervalues go-to-market", "Long build cycles"],
    risks: ["A brilliant product with no buyers"],
    decisionStyle: "Product- and possibility-driven",
    leadershipStyle: "Visionary maker",
    idealCofounder: "A Strategist or Operator for go-to-market",
    firstHire: "A commercial / business-development lead",
    aiTools: ["AI market & competitor research", "AI to spec and simulate", "An AI landing page & demo"],
    stack: ["A simple storefront / preorder page", "A CRM", "Analytics"],
    skills: ["Customer discovery", "Distribution & GTM", "Pricing"],
  },
  ai_native: {
    label: "AI-Native Founder",
    summary:
      "You build AI-first and automate by instinct. Your edge is leverage — make sure a real, defensible business sits under the automation.",
    strengths: ["High leverage per person", "AI & automation fluency", "Fast iteration"],
    blindSpots: ["Tech-forward, distribution-light", "Thin moats", "Novelty over genuine need"],
    risks: ["A clever wrapper with no durable edge"],
    decisionStyle: "Experimental, leverage-seeking",
    leadershipStyle: "Small, automated, high-output",
    idealCofounder: "A Strategist or Growth Leader for distribution",
    firstHire: "A growth / distribution lead",
    aiTools: ["Agentic workflows for operations", "Evals & guardrails for your AI", "AI-driven analytics"],
    stack: ["Your app + LLM APIs", "A vector DB / automation layer", "Stripe + analytics"],
    skills: ["Distribution & positioning", "Moat / defensibility thinking", "Unit economics"],
  },
  community: {
    label: "Community Builder",
    summary:
      "You've built an audience — a rare, valuable asset. The opportunity is systems and offers that monetize it durably.",
    strengths: ["Audience & trust", "A real content engine", "Distribution built in"],
    blindSpots: ["Weak monetization & systems", "Reliant on one platform", "Ops as an afterthought"],
    risks: ["Big reach, small revenue"],
    decisionStyle: "Audience-signal-driven",
    leadershipStyle: "Community-first",
    idealCofounder: "An Operator or Builder",
    firstHire: "An operations manager",
    aiTools: ["AI content repurposing", "An AI community assistant/mod", "AI offer & product testing"],
    stack: ["An owned email list", "A product / checkout", "Light CRM + automation"],
    skills: ["Offer & funnel design", "Systems & ops", "Diversifying platforms"],
  },
  growth_leader: {
    label: "Growth Leader",
    summary:
      "You run a real business and want to optimize and scale. The work now is leverage: systems, delegation, and AI on the true bottlenecks.",
    strengths: ["Proven execution", "Real team & revenue", "Growth focus"],
    blindSpots: ["Still holding key bottlenecks", "Manual where automation could win", "Optimizing locally, not systemically"],
    risks: ["Growth that outruns the systems beneath it"],
    decisionStyle: "Data- and ROI-driven",
    leadershipStyle: "Delegating executive",
    idealCofounder: "A specialist executive (COO / CMO)",
    firstHire: "A senior operator or a function head",
    aiTools: ["AI across a full workflow", "AI analytics & forecasting", "Automation on repetitive ops"],
    stack: ["An integrated CRM + data warehouse", "An automation layer", "BI dashboards"],
    skills: ["Delegation & leadership", "Systems design", "Capital allocation"],
  },
};

export function stageLabel(s: Stage): string {
  return STAGE_CONTENT[s].label;
}

export function archetypeLabel(a: Archetype): string {
  return ARCHETYPE_CONTENT[a].label;
}

/** Top 5 priorities — blends the stage's immediate actions, the primary
 *  bottleneck, and the archetype's most important skill to develop. */
export function topPriorities(dx: Diagnosis): string[] {
  const stage = STAGE_CONTENT[dx.stage];
  const arch = ARCHETYPE_CONTENT[dx.archetype];
  const primary = dx.bottlenecks[0];
  const out: string[] = [];
  out.push(...stage.d30.slice(0, 3));
  if (primary) out.push(`Close your biggest gap: ${DIMENSION_LABELS[primary]}`);
  if (arch.skills[0]) out.push(`As a ${arch.label}, develop: ${arch.skills[0]}`);
  return out.slice(0, 5);
}
