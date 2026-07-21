/**
 * BSTS Business Diagnostic — type system.
 *
 * Two independent diagnostic layers:
 *  1. Business Stage  — where the business is.
 *  2. Founder Archetype — who the founder is.
 *
 * Both are inferred from weighted answers, never asked directly. New stages,
 * archetypes, dimensions, questions, and recommendations can all be added by
 * extending these unions and the data tables — no engine refactor required.
 */

export type Stage =
  | "idea"
  | "validation"
  | "prototype"
  | "mvp"
  | "early_revenue"
  | "growth"
  | "scale";

export type Archetype =
  | "builder" // Technical Builder
  | "strategist" // Business Strategist
  | "operator" // Operator
  | "creative" // Creative Founder
  | "consultant" // Consultant / Service Provider
  | "corporate" // Corporate Professional
  | "inventor" // Inventor
  | "ai_native" // AI-Native Founder
  | "community" // Community Builder
  | "growth_leader"; // Growth Leader

/** Scored maturity dimensions (each normalised to 0–100). */
export type Dimension =
  | "founder"
  | "health"
  | "execution"
  | "ai"
  | "automation"
  | "marketing"
  | "sales"
  | "operations"
  | "finance"
  | "leadership";

export type QuestionType = "single" | "multi";

export interface Option {
  value: string;
  label: string;
  /** Dimension score deltas contributed by choosing this option. */
  d?: Partial<Record<Dimension, number>>;
  /** Founder-archetype affinity deltas. */
  a?: Partial<Record<Archetype, number>>;
  /** If this option should set/nudge the detected stage. */
  stage?: Stage;
  helpText?: string;
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  type: QuestionType;
  category: Dimension | "profile";
  options: Option[];
  /** Only asked when the detected stage is in this list (undefined = always). */
  stages?: Stage[];
  required?: boolean;
  helpText?: string;
}

export type Answers = Record<string, string[]>;

export interface Scores {
  founder: number;
  health: number;
  execution: number;
  ai: number;
  automation: number;
  marketing: number;
  sales: number;
  operations: number;
  finance: number;
  leadership: number;
}

export interface ArchetypeResult {
  key: Archetype;
  score: number;
}

export interface Diagnosis {
  stage: Stage;
  archetype: Archetype;
  secondaryArchetype: Archetype;
  confidence: number; // 0–100
  scores: Scores;
  overall: number; // headline Business Readiness Score 0–100
  strengths: Dimension[];
  bottlenecks: Dimension[]; // lowest maturity dims, primary first
  answered: number;
}
