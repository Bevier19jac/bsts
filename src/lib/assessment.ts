import { z } from "zod";

export const industryOptions = [
  "Boutique hospitality",
  "Professional services",
  "Local commerce & retail",
  "Field & trade services",
  "Health-adjacent practice",
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
