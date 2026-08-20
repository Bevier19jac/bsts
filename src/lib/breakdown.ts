/**
 * The Bevier Breakdown — Lite.
 *
 * A short, adaptive routing assessment. Every routing decision here is
 * deterministic: the same answers always produce the same result, and the
 * result carries the scoring that produced it. AI is not involved at runtime.
 *
 * Scoring, eligibility gates, overlays and confidence follow the AssessAnswer
 * Phase 4 rule set. This is the public "lite" path — the facilitated Tier 1
 * assessment asks the deeper questions.
 */

export type Choice = { value: string; label: string; hint?: string };

export type Question = {
  id: string;
  section: string;
  prompt: string;
  help?: string;
  kind: "one" | "many";
  choices: Choice[];
  /** Only asked when this returns true. */
  when?: (a: Answers) => boolean;
};

export type Answers = Record<string, string | string[] | undefined>;

const AI_IN_USE = ["informal", "pilot", "embedded", "production"];

export const questions: Question[] = [
  {
    id: "org",
    section: "Your organization",
    prompt: "What does your organization do?",
    kind: "one",
    choices: [
      { value: "field_service", label: "Field or trade services", hint: "HVAC, electrical, landscaping, restoration" },
      { value: "professional_services", label: "Professional services", hint: "Consulting, accounting, legal, design" },
      { value: "regulated_practice", label: "Healthcare or licensed practice" },
      { value: "tech_services", label: "Technology or software services", hint: "SaaS, hosted, or managed services" },
      { value: "government_contractor", label: "Government contractor" },
      { value: "public_sector", label: "Government agency or public sector" },
      { value: "other_smb", label: "Something else" },
    ],
  },
  {
    id: "goal",
    section: "Your goal",
    prompt: "What do you want technology or AI to help you achieve right now?",
    help: "Pick the closest. You can add detail at the end.",
    kind: "one",
    choices: [
      { value: "grow_capacity", label: "Grow capacity without adding headcount" },
      { value: "reduce_manual_work", label: "Reduce manual, repetitive work" },
      { value: "fix_fragmentation", label: "Get our systems working together" },
      { value: "adopt_ai_safely", label: "Adopt AI safely" },
      { value: "meet_requirement", label: "Meet a requirement", hint: "An audit, customer, or contract" },
      { value: "reduce_risk", label: "Reduce risk" },
      { value: "not_sure", label: "Not sure yet" },
    ],
  },
  {
    id: "pain",
    section: "Where it hurts",
    prompt: "Where does work get stuck most today?",
    kind: "one",
    choices: [
      { value: "delay", label: "Things take too long" },
      { value: "repetition", label: "The same information gets entered more than once" },
      { value: "fragmentation", label: "Information is scattered across systems or people" },
      { value: "risk_errors", label: "Mistakes or risky handling" },
      { value: "visibility", label: "We can't see status or numbers when we need them" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "base",
    section: "Your systems",
    prompt: "What does your team use for everyday email and documents?",
    help: "Microsoft 365 is Outlook, Word, Teams, OneDrive. Google Workspace is Gmail, Docs, Drive, Meet.",
    kind: "one",
    choices: [
      { value: "m365", label: "Microsoft 365" },
      { value: "google", label: "Google Workspace" },
      { value: "both", label: "Both" },
      { value: "neither", label: "Neither" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "platforms",
    section: "Your systems",
    prompt: "Which business systems do you run?",
    help: "Pick any that apply. “None” and “not sure” are real answers.",
    kind: "many",
    choices: [
      { value: "crm", label: "A CRM", hint: "Salesforce, HubSpot, Zoho" },
      { value: "accounting", label: "Accounting or invoicing", hint: "QuickBooks, Xero" },
      { value: "field", label: "Field-service or job software", hint: "ServiceTitan, Jobber, Housecall" },
      { value: "erp", label: "ERP or inventory" },
      { value: "projects", label: "Project or task tracking" },
      { value: "cloud", label: "Cloud infrastructure we manage" },
      { value: "none", label: "None of these" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "connected",
    section: "Your systems",
    prompt: "How well do those systems work together?",
    help: "“Work together” means information moves without anyone retyping it.",
    kind: "one",
    when: (a) => a.base !== "neither" || hasReal(a.platforms),
    choices: [
      { value: "siloed", label: "Separate — we retype or re-upload between them" },
      { value: "partial", label: "Some are connected" },
      { value: "integrated", label: "Mostly connected and automatic" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "ai",
    section: "AI today",
    prompt: "Is anyone in your organization using AI today?",
    help: "Individual use counts — someone drafting emails with ChatGPT is using AI.",
    kind: "one",
    choices: [
      { value: "none", label: "No" },
      { value: "informal", label: "A few people use it on their own" },
      { value: "pilot", label: "We're running pilots" },
      { value: "embedded", label: "It's built into tools we already pay for", hint: "Copilot, Gemini" },
      { value: "production", label: "It's part of our regular workflows" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "accounts",
    section: "AI today",
    prompt: "Are those AI tools on company accounts, or personal ones?",
    help: "Personal accounts can put business information outside your control.",
    kind: "one",
    when: (a) => AI_IN_USE.includes(String(a.ai)),
    choices: [
      { value: "managed", label: "Company-managed accounts" },
      { value: "personal", label: "Personal accounts" },
      { value: "mixed", label: "A mix" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "rules",
    section: "AI today",
    prompt: "Are there written rules for how AI can be used?",
    kind: "one",
    when: (a) => AI_IN_USE.includes(String(a.ai)),
    choices: [
      { value: "documented", label: "Documented and followed" },
      { value: "partial", label: "Partly written" },
      { value: "verbal", label: "Verbal understandings only" },
      { value: "none", label: "None" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "data",
    section: "Your information",
    prompt: "Which kinds of information does your organization handle?",
    help: "Categories only — never enter the information itself. This routes your result; it is not a compliance or legal determination.",
    kind: "many",
    choices: [
      { value: "internal", label: "Internal business information" },
      { value: "pii", label: "Personal information about customers or staff" },
      { value: "financial", label: "Financial information" },
      { value: "payment_card", label: "Payment-card information" },
      { value: "phi", label: "Health information" },
      { value: "fci", label: "Federal Contract Information" },
      { value: "cui", label: "Controlled Unclassified Information" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "driver",
    section: "Pressure",
    prompt: "Is anything creating a deadline or formal requirement?",
    kind: "many",
    choices: [
      { value: "questionnaire", label: "A customer security questionnaire" },
      { value: "audit", label: "An upcoming audit" },
      { value: "bid", label: "A contract bid" },
      { value: "regulatory", label: "A regulatory deadline" },
      { value: "incident", label: "Something already went wrong" },
      { value: "none", label: "Nothing right now" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
];

function hasReal(v: unknown): boolean {
  return Array.isArray(v) && v.some((x) => x !== "none" && x !== "not_sure");
}

export function visibleQuestions(a: Answers): Question[] {
  return questions.filter((q) => !q.when || q.when(a));
}

/* ------------------------------------------------------------------ */
/* Routing                                                             */
/* ------------------------------------------------------------------ */

export type Condition = "C1" | "C2" | "C3" | "C4" | "C5";

export type Breakdown = {
  points: Record<Condition, number>;
  trace: string[];
  eligible: Condition[];
  primary: Condition | null;
  secondary: Condition | null;
  coPrimary: boolean;
  overlay: "controlled" | "heightened" | "none";
  confidence: "High" | "Medium" | "Low";
  unknowns: number;
  platforms: string[];
  gaps: string[];
  moves: string[];
  service: string;
  engagement: string;
  priceLine: string;
};

const PLATFORM_LABEL: Record<string, string> = {
  crm: "your CRM",
  accounting: "your accounting system",
  field: "your field-service software",
  erp: "your ERP",
  projects: "your project tracker",
  cloud: "your cloud infrastructure",
};

export const CONDITION_TITLE: Record<Condition, string> = {
  C1: "Foundation first",
  C2: "Good tools, disconnected execution",
  C3: "Ready for secure automation",
  C4: "AI is moving faster than the rules around it",
  C5: "You have a requirement to satisfy",
};

export const CONDITION_BODY: Record<Condition, string> = {
  C1: "You're running the business on people and habit more than systems. That isn't a failure — it means the next dollar has unusual leverage, because you get to build the base correctly the first time.",
  C2: "You've already bought good tools. The gap isn't software — it's that your systems don't talk to each other, so your people are the integration. That's where the hours are going.",
  C3: "You have a foundation to build on and you can name the repetitive work. That's the profile where secure automation tends to pay back fastest, because we'd automate a process you already understand.",
  C4: "AI is already in your business. Whether to allow it was decided for you by whoever started using it. The open question is whether there are rules, an owner, and review around it.",
  C5: "Something outside your business is asking you to prove how you operate. That reorders the work: evidence and documentation move ahead of new capability.",
};

export function route(a: Answers): Breakdown {
  const points: Record<Condition, number> = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0 };
  const trace: string[] = [];
  const add = (c: Condition, n: number, why: string) => {
    points[c] += n;
    trace.push(`${c} ${n > 0 ? "+" : ""}${n}  ${why}`);
  };

  const goal = String(a.goal ?? "");
  const pain = String(a.pain ?? "");
  const base = String(a.base ?? "");
  const conn = String(a.connected ?? "");
  const ai = String(a.ai ?? "");
  const accounts = String(a.accounts ?? "");
  const rules = String(a.rules ?? "");
  const platforms = (Array.isArray(a.platforms) ? a.platforms : []).filter(
    (p) => p !== "none" && p !== "not_sure",
  );
  const data = (Array.isArray(a.data) ? a.data : []).filter((d) => d !== "not_sure");
  const drivers = (Array.isArray(a.driver) ? a.driver : []).filter(
    (d) => d !== "none" && d !== "not_sure",
  );

  const GOAL: Record<string, Array<[Condition, number]>> = {
    grow_capacity: [["C3", 1], ["C2", 1]],
    reduce_manual_work: [["C3", 2]],
    fix_fragmentation: [["C2", 2]],
    adopt_ai_safely: [["C4", 2]],
    meet_requirement: [["C5", 2]],
    reduce_risk: [["C4", 1], ["C5", 1]],
  };
  (GOAL[goal] ?? []).forEach(([c, n]) => add(c, n, "your stated goal"));

  const PAIN: Record<string, Array<[Condition, number]>> = {
    delay: [["C3", 1], ["C2", 1]],
    repetition: [["C3", 2]],
    fragmentation: [["C2", 3]],
    risk_errors: [["C4", 2]],
    visibility: [["C2", 2]],
  };
  (PAIN[pain] ?? []).forEach(([c, n]) => add(c, n, "where work gets stuck"));

  if (base === "neither" && platforms.length === 0) add("C1", 3, "no platform base in place");
  if (conn === "siloed") {
    add("C2", 3, "systems are separate");
    if (platforms.length > 0 || base !== "neither") add("C2", 3, "workflow fragmentation confirmed");
  }
  if (conn === "partial") {
    add("C2", 2, "systems only partly connected");
    if (platforms.length > 1) add("C2", 2, "partial fragmentation across systems");
  }
  if (conn === "integrated") add("C2", -2, "counter-evidence: systems already connected");
  if (platforms.length >= 3) add("C2", 2, "several systems in use");

  if (ai === "informal") add("C4", 1, "individual AI use");
  if (ai === "pilot" || ai === "embedded") {
    add("C4", 1, "AI adoption underway");
    add("C3", 1, "AI adoption underway");
  }
  if (ai === "production") add("C4", 2, "AI in regular workflows");
  if (accounts === "personal" || accounts === "mixed") add("C4", 2, "AI running on personal accounts");
  if (rules === "none") add("C4", 3, "no written AI rules");
  if (rules === "verbal") add("C4", 2, "AI rules are verbal only");
  if (rules === "partial") add("C4", 1, "AI rules only partly written");
  if (rules === "documented") add("C4", -2, "counter-evidence: AI rules documented and followed");

  if (data.includes("pii")) {
    add("C4", 1, "you handle personal information");
    add("C5", 1, "you handle personal information");
  }
  if (data.includes("financial")) {
    add("C4", 1, "you handle financial information");
    add("C5", 1, "you handle financial information");
  }
  if (data.includes("phi")) add("C5", 2, "you handle health information");

  const DRIVER: Record<string, number> = {
    questionnaire: 3,
    audit: 3,
    bid: 2,
    regulatory: 2,
    incident: 2,
  };
  drivers.forEach((d) => add(d === "incident" ? "C4" : "C5", DRIVER[d] ?? 0, "an external driver"));

  if (platforms.length > 0 && (conn === "siloed" || conn === "partial"))
    add("C3", 2, "information moved by hand between systems");
  if ((pain === "repetition" || pain === "delay") && (platforms.length > 0 || base === "neither"))
    add("C3", 2, "repetitive work you can point at");

  // Eligibility gates — points alone never classify.
  const gates: Record<Condition, boolean> = {
    C1: base === "neither" && platforms.length === 0,
    C2: (base !== "" && base !== "neither") || platforms.length > 0
      ? conn === "siloed" || conn === "partial"
      : false,
    C3: (platforms.length > 0 || base === "neither") && ["repetition", "delay", "fragmentation"].includes(pain),
    C4: AI_IN_USE.includes(ai),
    C5: drivers.length > 0,
  };

  const eligible = (Object.keys(points) as Condition[])
    .filter((c) => gates[c] && points[c] >= 4)
    .sort((x, y) => points[y] - points[x]);

  const primary = eligible[0] ?? null;
  const runnerUp = eligible[1] ?? null;
  const secondary =
    primary && runnerUp && points[runnerUp] >= points[primary] * 0.5 ? runnerUp : null;
  const coPrimary = !!(primary && secondary && points[secondary] >= points[primary] * 0.85);

  const controlled = data.includes("cui");
  const heightened =
    !controlled &&
    (data.includes("fci") ||
      data.includes("phi") ||
      data.includes("payment_card") ||
      (["regulated_practice", "government_contractor", "public_sector"].includes(String(a.org)) &&
        data.length > 0));

  const unknownAnswers = [goal, pain, base, conn, ai, rules].filter((v) => v === "not_sure").length +
    ((Array.isArray(a.data) ? a.data : []).includes("not_sure") ? 1 : 0);

  let confidence: Breakdown["confidence"] =
    unknownAnswers >= 2 ? "Low" : unknownAnswers === 1 || coPrimary || controlled ? "Medium" : "High";
  if (!primary) confidence = "Low";

  const gaps: string[] = [];
  if (accounts === "personal" || accounts === "mixed")
    gaps.push("AI is running on personal accounts, so business information may sit outside your control");
  if (rules === "none" || rules === "verbal")
    gaps.push("No written rules for AI use, and no named owner if an output goes wrong");
  if (conn === "siloed") gaps.push("Your people are the integration between your systems");
  if (drivers.length > 0) gaps.push("An external requirement is running on someone else's clock");
  if (controlled || data.includes("fci"))
    gaps.push("Contract-controlled information needs its handling boundary confirmed against the contract itself");
  if (gaps.length === 0)
    gaps.push("Nothing blocking surfaced at this level of detail — depth comes from discovery");

  const moves: string[] = [];
  if (rules !== "documented" && AI_IN_USE.includes(ai))
    moves.push("Name one accountable owner for AI use and set interim guidance while the formal rules are validated");
  if (conn === "siloed")
    moves.push("Pick the single worst re-entry point and map it end to end before automating anything");
  if (primary === "C1")
    moves.push("Move the business onto its own domain and controlled accounts — everything else depends on it");
  if (drivers.length > 0)
    moves.push("Get the actual requirement in front of someone who can read it against how you really operate");
  if (moves.length === 0)
    moves.push("Document the one process everyone works around — that is usually the real constraint");

  const SERVICE: Record<Condition, string> = {
    C1: "Secure AI & Automation",
    C2: "Secure AI & Automation",
    C3: "Secure AI & Automation",
    C4: "AI Security & Governance",
    C5: "SOC 2 & Compliance Readiness",
  };
  const ENGAGEMENT: Record<Condition, string> = {
    C1: "AI, Security & Automation Assessment",
    C2: "AI, Security & Automation Assessment",
    C3: "AI, Security & Automation Assessment. The 30-Day Secure Automation Sprint may be a candidate next step, subject to validation during the facilitated assessment.",
    C4: "AI, Security & Automation Assessment with a governance emphasis",
    C5: "AI, Security & Automation Assessment, routing toward the Governance & Assurance Program",
  };
  const PRICE: Record<Condition, string> = {
    C1: "Typical engagements begin at $1,500.",
    C2: "Typical engagements begin at $1,500.",
    C3: "Typical engagements begin at $1,500; typical sprint projects begin at $5,000.",
    C4: "Typical engagements begin at $1,500.",
    C5: "Typical engagements begin at $1,500; the program is scoped following an assessment.",
  };

  return {
    points,
    trace,
    eligible,
    primary,
    secondary,
    coPrimary,
    overlay: controlled ? "controlled" : heightened ? "heightened" : "none",
    confidence,
    unknowns: unknownAnswers,
    platforms: platforms.map((p) => PLATFORM_LABEL[p] ?? p),
    gaps,
    moves,
    service: primary ? SERVICE[primary] : "Determined in discovery",
    engagement: controlled
      ? "A formal discovery conversation"
      : primary
        ? ENGAGEMENT[primary]
        : "A short discovery conversation",
    priceLine: controlled ? "Scoped after that conversation." : primary ? PRICE[primary] : "",
  };
}

/** Plain-text summary used for the email / copy / download actions. */
export function summarize(a: Answers, r: Breakdown, contact: { name: string; email: string; organization: string; note?: string }): string {
  const lines: string[] = [
    "THE BEVIER BREAKDOWN — preliminary result",
    "",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Organization: ${contact.organization}`,
    "",
    "ANSWERS",
  ];
  for (const q of visibleQuestions(a)) {
    const v = a[q.id];
    const label = (val: string) => q.choices.find((c) => c.value === val)?.label ?? val;
    const shown = Array.isArray(v) ? v.map(label).join(", ") : v ? label(String(v)) : "—";
    lines.push(`- ${q.prompt} ${shown}`);
  }
  lines.push("", "PRELIMINARY READ");
  lines.push(`Starting condition: ${r.primary ? CONDITION_TITLE[r.primary] : "Not enough signal to route"}`);
  if (r.secondary) lines.push(`Also true: ${CONDITION_TITLE[r.secondary]}`);
  if (r.overlay !== "none")
    lines.push(`Handling overlay: ${r.overlay === "controlled" ? "Controlled environment — formal discovery" : "Heightened handling"}`);
  lines.push(`Confidence: ${r.confidence}`);
  lines.push(`Suggested next step: ${r.engagement}`);
  lines.push("", "SCORING TRACE");
  r.trace.forEach((t) => lines.push(`  ${t}`));
  lines.push(`  totals ${(Object.keys(r.points) as Condition[]).map((c) => `${c}:${r.points[c]}`).join("  ")}`);
  if (contact.note) lines.push("", "THEIR NOTE", contact.note);
  lines.push(
    "",
    "This is a preliminary result generated from the respondent's own answers. It is not an audit, a compliance determination, or a price.",
  );
  return lines.join("\n");
}
