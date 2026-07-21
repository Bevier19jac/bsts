/**
 * BSTS AI & Automation Opportunity Assessment — type system.
 *
 * This is a TECHNOLOGY read, not business or leadership coaching. It looks at
 * where a business is losing time to manual work, how many hours a week that
 * could reclaim, exactly which automations and AI would help, and what tools
 * to use. Nothing here labels the person or gives strategy advice — it stays
 * in the technology / AI / automation lane BSTS actually operates in.
 *
 * New dimensions, questions, industries, and opportunity patterns can all be
 * added by extending these unions and the data tables — no engine refactor
 * required.
 */

/** Scored technology-maturity dimensions (each normalised to 0–100). */
export type Dimension =
  | "ai" // AI adoption
  | "automation" // Automation maturity
  | "operations" // Process & workflow maturity
  | "tools" // Systems & data foundation
  | "security"; // Data & security readiness

/** Industry buckets — drive tailored recommendations and security relevance. */
export type Industry =
  | "professional_services"
  | "ecommerce_retail"
  | "hospitality"
  | "healthcare"
  | "manufacturing"
  | "government"
  | "tech_saas"
  | "nonprofit"
  | "other";

/** What the person most wants to get out of technology. */
export type Goal =
  | "save_time"
  | "cut_costs"
  | "grow_revenue"
  | "scale_no_hire"
  | "reduce_errors"
  | "security";

export type QuestionType = "single" | "multi" | "text";

export interface Option {
  value: string;
  label: string;
  /** Dimension score deltas contributed by choosing this option. */
  d?: Partial<Record<Dimension, number>>;
  /** Estimated weekly hours of manual effort this answer implies (per person). */
  hours?: number;
  /** Tags the answer sets (industry, goal, dataSensitivity, etc.). */
  industry?: Industry;
  goal?: Goal;
  helpText?: string;
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  type: QuestionType;
  category: Dimension | "profile";
  options: Option[];
  /** Only shown when this predicate returns true (undefined = always shown). */
  showIf?: (answers: Answers) => boolean;
  /** For text questions: placeholder + whether it can be left blank. */
  placeholder?: string;
  optional?: boolean;
  helpText?: string;
}

export type Answers = Record<string, string[]>;

export interface Scores {
  ai: number;
  automation: number;
  operations: number;
  tools: number;
  security: number;
}

export interface Diagnosis {
  /** Headline AI & Automation Readiness score, 0–100. */
  overall: number;
  scores: Scores;
  /** Estimated hours per week the business could reclaim with automation/AI. */
  hoursPerWeek: number;
  /** Estimated annual labor cost of that manual time (USD). */
  annualCost: number;
  /** Dimensions with the most opportunity (lowest first). */
  opportunities: Dimension[];
  /** Dimensions the business is already strong in (highest first). */
  strengths: Dimension[];
  industry: Industry;
  goal: Goal;
  /** Whether the business handles regulated/sensitive data. */
  dataSensitivity: "regulated" | "sensitive" | "standard" | "unknown";
  teamSize: "solo" | "small" | "mid" | "large";
  confidence: number; // 0–100
  answered: number;
}
