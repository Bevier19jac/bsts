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

/**
 * Whether this route identified a technical foundation at all.
 *
 * This is deliberately a separate axis from the condition scoring. A
 * respondent can describe a real process problem while identifying no
 * platform and no system of record — and that combination must never be
 * read as readiness to automate.
 *
 *  present_unvalidated  at least one platform or business system was named.
 *                       Named, not verified: nothing here is validated.
 *  absent_or_unidentified  "Neither" for everyday email/documents AND
 *                       "None of these" for business systems.
 *  unknown              the relevant answers were "Not sure". Unknown is
 *                       not the same as none and must not be treated as it.
 */
export type FoundationState =
  | "present_unvalidated"
  | "absent_or_unidentified"
  | "unknown";

export type Breakdown = {
  foundationState: FoundationState;
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
  /** Result heading, already resolved for the foundation-state variants. */
  title: string;
  /** Result summary, already resolved for the foundation-state variants. */
  body: string;
  /**
   * Why the immediate priority matters. Deliberately a separate field from
   * `gaps` — the result page previously showed gaps[0] under both "What's in
   * the way" and "Why it matters", so the same sentence appeared twice.
   */
  why: string;
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
  C1: "Start with the process and technical foundation",
  C2: "Good tools, disconnected execution",
  C3: "A candidate for secure automation",
  C4: "AI is moving faster than the rules around it",
  // Generic fallback: used when C5 is the co-primary/secondary condition,
  // where the more specific incident/sensitive-data-only/deadline-driven
  // titles below (see route()) are not resolved. Deliberately neutral so it
  // is accurate whether the trigger was a sensitive-data category, a real
  // external deadline, or both.
  C5: "Sensitive information or an external requirement also applies",
};

export const CONDITION_BODY: Record<Condition, string> = {
  C1: "You identified work that may be worth improving, but this route did not identify the systems that currently support it. Before recommending automation, BSTS would map the process, identify where records live, determine what tools are actually in use, and establish the minimum technical foundation.",
  C2: "You've already bought good tools. The gap isn't software — it's that your systems don't talk to each other, so your people are the integration. That's where the hours are going.",
  C3: "You identified a process worth examining and at least one existing system that may support the work. A facilitated assessment would confirm how the process actually operates, where the data travels, and whether the current tools can support an automation securely.",
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

  /* ---------------------------------------------------------------- *
   * Foundation state — computed before any scoring.                   *
   *                                                                   *
   * "Neither" for everyday email/documents is the ABSENCE of a base    *
   * platform. It was previously treated as evidence FOR automation     *
   * readiness in both the C3 scoring rule and the C3 gate, which is    *
   * how a respondent with no platform and no system of record was      *
   * told they were ready for secure automation.                        *
   * ---------------------------------------------------------------- */
  const rawPlatforms = Array.isArray(a.platforms) ? a.platforms : [];
  const basePresent = ["m365", "google", "both"].includes(base);
  const baseAbsent = base === "neither";
  const platformsNone = rawPlatforms.includes("none");
  const foundationState: FoundationState =
    platforms.length > 0 || basePresent
      ? "present_unvalidated"
      : baseAbsent && platformsNone
        ? "absent_or_unidentified"
        : "unknown";
  const foundationIdentified = foundationState === "present_unvalidated";
  trace.push(`foundation_state = ${foundationState}`);

  /* Higher-priority conditions that must be able to outrank a generic
     automation result. None of these is a legal or compliance
     determination — they change what leads the result, nothing more. */
  const sensitiveData =
    data.includes("cui") ||
    data.includes("fci") ||
    data.includes("payment_card") ||
    data.includes("phi");
  const aiGovernanceRisk =
    AI_IN_USE.includes(ai) &&
    (accounts === "personal" ||
      accounts === "mixed" ||
      rules === "none" ||
      rules === "verbal");


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

  if (foundationState === "absent_or_unidentified")
    add("C1", 5, "no collaboration platform and no business system identified");
  if (foundationState === "unknown")
    add("C1", 4, "the systems currently in place were not established");
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
  if (data.includes("payment_card")) add("C5", 2, "you handle payment-card information");
  if (data.includes("fci")) add("C5", 2, "you handle Federal Contract Information");
  if (data.includes("cui")) add("C5", 3, "you handle Controlled Unclassified Information");

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
  // Repetitive work only counts toward automation readiness when a system
  // that could carry the automation was actually identified.
  if ((pain === "repetition" || pain === "delay") && foundationIdentified)
    add("C3", 2, "repetitive work you can point at, on a system you named");

  // Split at the driver level: an incident is not an external deadline, and
  // an external deadline is not an incident. Everything downstream — gates,
  // hard triggers, precedence, and result copy — reads one of these two,
  // never the raw `drivers` array, so the two cannot bleed into each other.
  const incidentDriver = drivers.includes("incident");
  const deadlineDriver = drivers.some((d) => d !== "incident");

  // Eligibility gates — points alone never classify.
  const gates: Record<Condition, boolean> = {
    C1: foundationState !== "present_unvalidated",
    C2: foundationIdentified ? conn === "siloed" || conn === "partial" : false,
    // Automation candidacy REQUIRES an identified system. Without one there
    // is nothing for an automation to run on and nothing to validate against.
    C3: foundationIdentified && ["repetition", "delay", "fragmentation"].includes(pain),
    // "Something already went wrong" must be reachable whether or not AI is
    // in use — an incident is not conditioned on AI. Previously this gate
    // required AI_IN_USE, which made the incident override structurally
    // unreachable for a respondent who reported no AI use at all.
    C4: AI_IN_USE.includes(ai) || incidentDriver,
    // A real external driver (questionnaire/audit/bid/regulatory) or a
    // sensitive-data category can promote C5. "Something already went
    // wrong" is not a C5 driver — it belongs to C4 and must not trivially
    // satisfy this gate the way `drivers.length > 0` previously did.
    C5: deadlineDriver || sensitiveData,
  };

  /* Hard triggers bypass the points floor.
     A contract-controlled data category or a live external deadline is not
     a narrative competing for weight against other narratives — it is a
     condition that exists whether or not the rest of the answers happen to
     accumulate four points. FCI alone previously scored 2 and therefore
     never became eligible, which meant the override had nothing to promote
     and a generic automation result led instead. */
  const hardTrigger: Record<Condition, boolean> = {
    C1: foundationState !== "present_unvalidated",
    C2: false,
    C3: false,
    C4: aiGovernanceRisk || incidentDriver,
    C5: sensitiveData || deadlineDriver,
  };

  const eligible = (Object.keys(points) as Condition[])
    .filter((c) => gates[c] && (points[c] >= 4 || hardTrigger[c]))
    .sort((x, y) => points[y] - points[x]);

  /* ---------------------------------------------------------------- *
   * Override precedence.                                              *
   *                                                                   *
   * A generic automation result must never lead when a security,      *
   * governance, or formal-requirement condition is also present. The  *
   * automation opportunity can still appear as the secondary result;  *
   * only what LEADS changes here.                                     *
   * ---------------------------------------------------------------- */
  const precedence: Condition[] = [];
  // An incident outranks everything else, including a sensitive-data or
  // deadline-driven C5 result. When both are present, C5 stays visible as
  // the secondary/eligible condition — it just does not lead.
  if (incidentDriver) precedence.push("C4");
  if (sensitiveData) precedence.push("C5");
  if (deadlineDriver) precedence.push("C5");
  if (aiGovernanceRisk) precedence.push("C4");
  const promoted = precedence.filter((c, i) => precedence.indexOf(c) === i && eligible.includes(c));
  if (promoted.length) {
    trace.push(`override: ${promoted.join(", ")} outranks a generic automation result`);
  }
  const ordered = [...promoted, ...eligible.filter((c) => !promoted.includes(c))];

  const primary = ordered[0] ?? null;
  const runnerUp = ordered[1] ?? null;
  const secondary =
    primary && runnerUp && points[runnerUp] >= points[primary] * 0.5 ? runnerUp : null;
  // A promoted condition leads on precedence, not on points, so it must not
  // then be presented as merely co-equal with what it outranked.
  const coPrimary =
    !promoted.length &&
    !!(primary && secondary && points[secondary] >= points[primary] * 0.85);

  const controlled = data.includes("cui");
  const heightened =
    !controlled &&
    (data.includes("fci") ||
      data.includes("phi") ||
      data.includes("payment_card") ||
      (["regulated_practice", "government_contractor", "public_sector"].includes(String(a.org)) &&
        data.length > 0));

  /* ---------------------------------------------------------------- *
   * Result-family flags used to pick copy, not just to rank.          *
   *                                                                   *
   * incidentLed:        C4 led because something already happened —   *
   *                      never because of AI, whether or not AI is    *
   *                      also in use. Incident copy makes no claim    *
   *                      about AI either way.                         *
   * sensitiveDataOnly:   C5 led on a sensitive-data category alone,    *
   *                      with no real external driver selected. The   *
   *                      "requirement running on someone else's       *
   *                      clock" language is only true when a real     *
   *                      driver (questionnaire/audit/bid/regulatory)  *
   *                      was actually reported.                       *
   * noPricedSprint:      routes that must not auto-recommend or price *
   *                      a sprint — a formal discovery/scoping        *
   *                      conversation instead.                        *
   * ---------------------------------------------------------------- */
  const incidentLed = primary === "C4" && incidentDriver;
  const sensitiveDataOnly = primary === "C5" && sensitiveData && !deadlineDriver;
  const noPricedSprint = controlled || sensitiveDataOnly;

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
  if (incidentDriver)
    gaps.push(
      "You reported that something already went wrong; its current status, impact, containment, and documentation were not established by this assessment.",
    );
  if (deadlineDriver) gaps.push("An external requirement is running on someone else's clock");
  if (controlled || data.includes("fci"))
    gaps.push("Contract-controlled information needs its handling boundary confirmed against the contract itself");
  if (data.includes("payment_card"))
    gaps.push("Payment-card information may introduce specific handling requirements that must be confirmed before implementation");
  if (data.includes("phi"))
    gaps.push("Health information may introduce specific handling obligations that must be confirmed before implementation");
  if (foundationState === "absent_or_unidentified") {
    gaps.push("No primary collaboration or document platform identified");
    gaps.push("No business system or system of record identified");
    gaps.push("The current workflow and record locations must be mapped before an automation path can be recommended");
  }
  if (foundationState === "unknown")
    gaps.push("Which platforms and business systems are actually in use was not established on this route");
  if (gaps.length === 0)
    gaps.push(
      foundationIdentified
        ? "This short route did not surface a blocker. It also did not verify anything you reported — that is what a facilitated assessment is for."
        : "This short route did not surface an urgent external deadline, but it also did not establish how the work or information is currently managed.",
    );

  const moves: string[] = [];
  // Incident containment leads the list when it applies — nothing else
  // (including AI-governance follow-up) is more immediate than it.
  if (incidentLed)
    moves.push(
      "Confirm the current status, impact, containment, and documentation before adding new automation or tooling.",
    );
  if (rules !== "documented" && AI_IN_USE.includes(ai))
    moves.push("Name one accountable owner for AI use and set interim guidance while the formal rules are validated");
  if (conn === "siloed")
    moves.push("Pick the single worst re-entry point and map it end to end before automating anything");
  if (foundationState === "absent_or_unidentified")
    moves.push(
      "Map the process from trigger to completion, including who performs each step, where information is stored, and which record — if any — is authoritative",
    );
  if (foundationState === "unknown")
    moves.push(
      "Build a short systems inventory: what is actually in use, who administers it, and which record is treated as authoritative",
    );
  if (deadlineDriver)
    moves.push("Get the actual requirement in front of someone who can read it against how you really operate");
  if (sensitiveData)
    moves.push("Establish where that information lives and who can reach it before any new tooling touches it");
  if (moves.length === 0)
    moves.push("Document the one process everyone works around — that is usually the real constraint");

  /* C5 splits into two copy paths that must never blend. A sensitive-data
     category (CUI/FCI/PHI/payment-card) is true whether or not anything is
     actually due on a deadline; "an external requirement runs on someone
     else's clock" is only true when a real driver — questionnaire, audit,
     bid, or regulatory deadline — was reported. */
  const C5_TITLE = sensitiveDataOnly
    ? "Sensitive or contract-controlled information changes the next step"
    : "You reported an external requirement to address";
  const C5_BODY = sensitiveDataOnly
    ? "Sensitive or contract-controlled information changes how this gets handled, independent of any deadline. Before automation or new tooling touches it, its handling boundary — what it is, where it lives, and who can reach it — needs to be established. This identifies a data category from your own answers; it is not a determination that CMMC, NIST SP 800-171, HIPAA, PCI DSS, SOC 2, or any other framework applies to you."
    : CONDITION_BODY.C5;
  const C5_WHY = sensitiveDataOnly
    ? "Sensitive or contract-controlled information can change the appropriate handling boundary, independent of any deadline. Confirm the applicable obligations from the information, systems, contracts, and operating context before new capability is layered on top."
    : "An external requirement runs on someone else's clock. Evidence gathered in a hurry is the version that fails, so this reorders everything behind it.";

  /* Incident copy is deliberately status-neutral: the respondent only
     reported that something went wrong, not whether it is active, contained,
     documented, resolved, a breach, a security incident, a legal violation,
     or reportable. It makes no claim about AI either way. */
  const INCIDENT_TITLE = "Address what happened before adding new capability";
  const INCIDENT_BODY =
    "You indicated that something has already gone wrong. That answer changes the order of work: establish what happened, its current status, and what has already been done before recommending new capability or automation. This is a routing signal from your response—not a determination that an incident remains active, that a breach or legal violation occurred, or that reporting is required.";
  const INCIDENT_WHY =
    "When something may have gone wrong, changing systems before its status and impact are understood can make review and recovery harder. Confirm the current state first; then determine what work is appropriate.";

  /* Headline and summary. C1 covers two distinct situations — a foundation
     that is genuinely absent, and one that simply was not established on
     this route — and they must not read the same. */
  const title =
    primary === "C1" && foundationState === "unknown"
      ? "Establish what is currently in place"
      : incidentLed
        ? INCIDENT_TITLE
        : primary === "C5"
          ? C5_TITLE
          : primary
            ? CONDITION_TITLE[primary]
            : "We don't have enough to route you yet";
  const body =
    primary === "C1" && foundationState === "unknown"
      ? "This route did not establish which platforms or business systems you use, and “not sure” is not the same as “none”. The honest next step is a short systems inventory and a workflow map — not a readiness conclusion in either direction."
      : incidentLed
        ? INCIDENT_BODY
        : primary === "C5"
          ? C5_BODY
          : primary
            ? CONDITION_BODY[primary]
            : "That is a useful result, not a dead end — it means the honest next step is a conversation rather than a generated roadmap.";

  /* Why the immediate priority matters — distinct from the blocker list. */
  let why: string;
  if (foundationState === "absent_or_unidentified")
    why =
      "An automation has to run on something and write somewhere. Without a known platform or system of record, any recommendation would be a guess about tools you may not have, and the first thing it would produce is rework.";
  else if (foundationState === "unknown")
    why =
      "Recommending change on top of an unknown environment is how projects arrive at the wrong problem. Establishing what is actually in place costs little and prevents the expensive version of that mistake.";
  else if (incidentLed) why = INCIDENT_WHY;
  else if (primary === "C4")
    why =
      "AI already touching business information without a named owner or written rules means the exposure exists now, and nobody is accountable for an output that goes wrong.";
  else if (primary === "C5") why = C5_WHY;
  else if (primary === "C2")
    why =
      "When systems do not exchange records, your people are the integration. That cost is paid every day and it compounds quietly as volume grows.";
  else if (primary === "C3")
    why =
      "Repetitive work on a system you already own is where automation pays back fastest — but only once the process and its data path are confirmed to be what you think they are.";
  else
    why =
      "This route did not gather enough to name a single priority with confidence. A short conversation is a more honest next step than a generated roadmap.";

  const SERVICE: Record<Condition, string> = {
    C1: "Secure AI & Automation",
    C2: "Secure AI & Automation",
    C3: "Secure AI & Automation",
    C4: "AI Security & Governance",
    C5: "SOC 2 & Compliance Readiness",
  };
  const ENGAGEMENT: Record<Condition, string> = {
    C1: "AI, Security & Automation Assessment. Implementation should not be recommended until the operating process and technical foundation are validated.",
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

  // Incident and sensitive-data-only routes must not auto-recommend or
  // price a sprint — the candidate next step is discovery/scoping, and a
  // priced figure would contradict the copy above it. The incident
  // engagement also must not solicit incident detail through an ordinary
  // web form — that is not what this form is for and not something BSTS
  // has represented itself as equipped to intake.
  const engagement = incidentLed
    ? "A short discovery conversation to determine the appropriate next step. Do not submit incident details or sensitive information through this form."
    : noPricedSprint
      ? "Formal discovery and information-handling scoping before implementation"
      : primary
        ? ENGAGEMENT[primary]
        : "A short discovery conversation";
  const priceLine = incidentLed || noPricedSprint ? "" : primary ? PRICE[primary] : "";

  return {
    foundationState,
    points,
    trace,
    eligible: ordered,
    primary,
    secondary,
    coPrimary,
    why,
    title,
    body,
    overlay: controlled ? "controlled" : heightened ? "heightened" : "none",
    confidence,
    unknowns: unknownAnswers,
    platforms: platforms.map((p) => PLATFORM_LABEL[p] ?? p),
    gaps,
    moves,
    // Deliberately NOT a named service. BSTS has not established itself as
    // an incident-response, recovery, forensics, or breach-coaching
    // provider, and an incident-led route must not read as one.
    service: incidentLed ? "Determined in discovery" : primary ? SERVICE[primary] : "Determined in discovery",
    engagement,
    priceLine,
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
  // Use the fully-resolved title, not the generic per-condition map — the
  // resolved title carries the incident/sensitive-data-only/foundation-state
  // copy variants, and the emailed summary must not diverge from what the
  // page itself said.
  lines.push(`Starting condition: ${r.title}`);
  if (r.secondary) lines.push(`Also true: ${CONDITION_TITLE[r.secondary]}`);
  if (r.overlay !== "none")
    lines.push(`Handling overlay: ${r.overlay === "controlled" ? "Controlled environment — formal discovery" : "Heightened handling"}`);
  lines.push(`Response confidence: ${r.confidence}`);
  lines.push(`Foundation state: ${r.foundationState}`);
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
