import { z } from "zod";

export const industryOptions = [
  "Government contracting / government-facing software",
  "Professional services",
  "Transportation & logistics",
  "Healthcare-adjacent technology",
  "Software & technology",
  "Manufacturing",
  "Hospitality",
  "Local commerce & retail",
  "Field & trade services",
  "Nonprofit / civic",
  "Other",
] as const;

export const timelineOptions = [
  "As soon as practical",
  "Within 3 months",
  "Within 6 months",
  "Exploring for later this year",
  "Just researching",
] as const;

export const budgetOptions = [
  "Prefer not to say yet",
  "Under $10k",
  "$10k – $25k",
  "$25k – $75k",
  "$75k+",
] as const;

export const assessmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name (at least 2 characters).")
    .max(120, "Names longer than 120 characters get suspicious."),
  email: z.string().trim().email("Please enter a valid email address."),
  organization: z
    .string()
    .trim()
    .min(2, "Please tell us the organization's name.")
    .max(160, "Please keep this under 160 characters."),
  industry: z.enum(industryOptions, {
    message: "Please choose the closest industry.",
  }),
  website: z
    .string()
    .trim()
    .max(200, "Please keep this under 200 characters.")
    .refine(
      (v) => v === "" || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v),
      "That does not look like a web address — or leave it blank.",
    )
    .optional()
    .or(z.literal("")),
  problem: z
    .string()
    .trim()
    .min(20, "Give us at least a sentence or two (20+ characters) — it genuinely helps.")
    .max(2000, "Please keep this under 2000 characters."),
  systems: z
    .string()
    .trim()
    .min(10, "List at least the main tools you run (10+ characters). Spreadsheets count.")
    .max(2000, "Please keep this under 2000 characters."),
  outcome: z
    .string()
    .trim()
    .min(10, "A sentence about what better looks like (10+ characters).")
    .max(2000, "Please keep this under 2000 characters."),
  timeline: z.enum(timelineOptions, {
    message: "Please choose a rough timeline.",
  }),
  budget: z.enum(budgetOptions).optional(),
  consent: z.literal(true, {
    message: "Please confirm you are comfortable with how this form works.",
  }),
});

export type AssessmentData = z.infer<typeof assessmentSchema>;

export type AssessmentStepField = keyof AssessmentData;

export const steps: Array<{
  title: string;
  description: string;
  fields: AssessmentStepField[];
}> = [
  {
    title: "About you",
    description: "Who we are talking with, and how to reach you.",
    fields: ["name", "email", "organization"],
  },
  {
    title: "Your operation",
    description: "The shape of the business and the problem that brought you here.",
    fields: ["industry", "website", "problem"],
  },
  {
    title: "Systems & goals",
    description: "What you run today, and what better looks like.",
    fields: ["systems", "outcome", "timeline", "budget"],
  },
  {
    title: "Review & send",
    description: "Check your answers, then choose how to deliver them.",
    fields: ["consent"],
  },
];

/* ------------------------------------------------------------------ */
/* Preliminary read — computed in the browser from the answers.        */
/* Clearly labeled as preliminary, never as a completed assessment.    */
/* ------------------------------------------------------------------ */

export type PreliminaryRead = {
  opportunity: string;
  path: string;
  consideration: string;
  nextStep: string;
};

const SIGNALS: Array<{ key: string; patterns: RegExp; opportunity: string }> = [
  {
    key: "connect",
    patterns:
      /re-?key|re-?typ|double entry|copy[- ]?paste|disconnect|doesn'?t talk|don'?t talk|sync|silo|export|spread across|three systems|two systems/i,
    opportunity:
      "Integration — your answers point at disconnected systems taxing daily work. Connecting existing tools is usually the highest-leverage first move.",
  },
  {
    key: "automate",
    patterns:
      /manual|repetitive|every (day|week|month)|by hand|chas(e|ing)|remind|follow[- ]?up|reconcil|schedul|approval|status update|data entry/i,
    opportunity:
      "Automation — a repetitive, rule-following workflow shows up in your answers. That is the classic candidate for a monitored, reversible automation.",
  },
  {
    key: "ai",
    patterns: /\bai\b|assistant|draft|summar|chatbot|knowledge base|llm|gpt/i,
    opportunity:
      "Secure AI — you're describing work that AI can assist with. The implementation question is boundaries: what data it sees and who approves its output.",
  },
  {
    key: "secure",
    patterns:
      /secur|complian|audit|hipaa|cmmc|soc ?2|nist|fedramp|cui\b|phi\b|breach|access review|password|permission/i,
    opportunity:
      "Security foundation — compliance or security pressure appears in your answers. A written baseline usually needs to precede new automation or AI.",
  },
];

/**
 * A deterministic, client-side preliminary read of the answers. This is a
 * useful orientation, not a professional assessment — the UI labels it so.
 */
export function preliminaryRead(data: AssessmentData): PreliminaryRead {
  const text = `${data.problem} ${data.systems} ${data.outcome}`;
  const scores = SIGNALS.map((s) => ({
    s,
    hits: (text.match(new RegExp(s.patterns.source, "gi")) ?? []).length,
  })).sort((a, b) => b.hits - a.hits);

  const top = scores[0];
  const opportunity =
    top.hits > 0
      ? top.s.opportunity
      : "Clarity first — your answers don't point at a single obvious lever yet, which is exactly what a structured assessment is for.";

  const researching = data.timeline === "Just researching";
  const budget = data.budget ?? "Prefer not to say yet";
  let path: string;
  if (researching || budget === "Prefer not to say yet" || budget === "Under $10k") {
    path =
      "AI & Automation Assessment — map the workflows and technology first, so any build that follows is aimed at the right target.";
  } else if (budget === "$10k – $25k") {
    path =
      "AI & Automation Assessment, likely followed by a 30-Day Automation Sprint on the highest-value workflow it identifies.";
  } else {
    path =
      "An assessment-led Secure AI Transformation — phased delivery across the keep / connect / automate / build / secure lanes.";
  }

  const securityHits = scores.find((x) => x.s.key === "secure")?.hits ?? 0;
  const consideration =
    securityHits > 0
      ? "Data boundaries and compliance obligations should be written down before any new integration or AI touches production data."
      : /spreadsheet|excel|inbox|email/i.test(data.systems)
        ? "Spreadsheets and inboxes are workable sources of truth, but their data hygiene usually needs attention before automation is layered on."
        : "Whether your current vendors expose usable APIs will shape the effort — that's one of the first things an assessment verifies.";

  return {
    opportunity,
    path,
    consideration,
    nextStep:
      "Send your answers and we'll reply with a short, concrete reaction — including whether BSTS is the right fit at all.",
  };
}

/** Human-readable plain-text summary — used for clipboard and mailto body. */
export function formatSummary(data: AssessmentData): string {
  return [
    "BSTS Technology Assessment",
    "==========================",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Organization: ${data.organization}`,
    `Industry: ${data.industry}`,
    `Website: ${data.website || "—"}`,
    "",
    "Primary operating problem:",
    data.problem,
    "",
    "Existing systems:",
    data.systems,
    "",
    "Desired outcome:",
    data.outcome,
    "",
    `Timeline: ${data.timeline}`,
    `Budget range: ${data.budget ?? "Prefer not to say yet"}`,
  ].join("\n");
}
