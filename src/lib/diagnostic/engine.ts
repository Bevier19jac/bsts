import type {
  Answers,
  Diagnosis,
  Dimension,
  Goal,
  Industry,
  Question,
  Scores,
} from "./types";
import { QUESTIONS, QUESTION_BY_ID } from "./questions";

const ALL_DIMENSIONS: Dimension[] = ["ai", "automation", "operations", "tools", "security"];

function selected(answers: Answers, qid: string): string[] {
  return answers[qid] ?? [];
}

function firstValue(answers: Answers, qid: string): string | undefined {
  return selected(answers, qid)[0];
}

/** The questions that currently apply, honoring each question's showIf. */
export function applicableQuestions(answers: Answers): Question[] {
  return QUESTIONS.filter((q) => (q.showIf ? q.showIf(answers) : true));
}

export function totalQuestions(answers: Answers): number {
  return applicableQuestions(answers).length;
}

export function nextUnanswered(answers: Answers): Question | null {
  for (const q of applicableQuestions(answers)) {
    if (selected(answers, q.id).length === 0) return q;
  }
  return null;
}

export function isComplete(answers: Answers): boolean {
  // Must have started, and have no remaining applicable questions.
  return selected(answers, "biz").length > 0 && nextUnanswered(answers) === null;
}

function clamp(n: number, lo = 2, hi = 99): number {
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

export function computeScores(answers: Answers): Scores {
  const raw: Record<Dimension, number> = Object.fromEntries(
    ALL_DIMENSIONS.map((d) => [d, 50]),
  ) as Record<Dimension, number>;

  for (const q of applicableQuestions(answers)) {
    for (const v of selected(answers, q.id)) {
      const opt = q.options.find((o) => o.value === v);
      if (!opt?.d) continue;
      for (const [dim, delta] of Object.entries(opt.d)) {
        raw[dim as Dimension] += delta as number;
      }
    }
  }

  return Object.fromEntries(
    ALL_DIMENSIONS.map((d) => [d, clamp(raw[d])]),
  ) as unknown as Scores;
}

const SIZE_MULTIPLIER: Record<string, number> = {
  solo: 0.7,
  small: 1.5,
  mid: 3.2,
  large: 5.5,
};

/** Estimated weekly hours reclaimable — sums the manual-hours tagged on every
 *  answered option across all applicable questions, then scales by team size.
 *  The module answers now capture manual work in detail, so the estimate comes
 *  straight from what they told us is done by hand. */
export function computeHours(answers: Answers): number {
  let base = 0;
  for (const q of applicableQuestions(answers)) {
    for (const v of selected(answers, q.id)) {
      const opt = q.options.find((o) => o.value === v);
      base += opt?.hours ?? 0;
    }
  }

  const sizeMult = SIZE_MULTIPLIER[firstValue(answers, "size") ?? "small"] ?? 1.5;
  const hours = base * sizeMult;
  // Reclaimable ≈ 55% of the manual time is realistically automatable.
  return Math.min(80, Math.round(hours * 0.55));
}

/** Blended labor cost of that time, annualized (conservative $38/hr blended). */
export function computeAnnualCost(hoursPerWeek: number): number {
  return Math.round((hoursPerWeek * 52 * 38) / 100) * 100;
}

function readinessScore(s: Scores): number {
  return clamp(
    0.3 * s.automation + 0.26 * s.ai + 0.22 * s.operations + 0.14 * s.tools + 0.08 * s.security,
    5,
    98,
  );
}

function industryOf(answers: Answers): Industry {
  const v = firstValue(answers, "biz");
  const opt = QUESTION_BY_ID["biz"]?.options.find((o) => o.value === v);
  return opt?.industry ?? "other";
}

function goalOf(answers: Answers): Goal {
  const v = firstValue(answers, "goal");
  const opt = QUESTION_BY_ID["goal"]?.options.find((o) => o.value === v);
  return opt?.goal ?? "save_time";
}

function dataSensitivityOf(answers: Answers): Diagnosis["dataSensitivity"] {
  switch (firstValue(answers, "data")) {
    case "regulated":
      return "regulated";
    case "sensitive":
      return "sensitive";
    case "standard":
      return "standard";
    default:
      return "unknown";
  }
}

function teamSizeOf(answers: Answers): Diagnosis["teamSize"] {
  const v = firstValue(answers, "size");
  if (v === "solo" || v === "small" || v === "mid" || v === "large") return v;
  return "small";
}

function confidenceScore(answered: number): number {
  return clamp(66 + answered * 3, 66, 96);
}

export function diagnose(answers: Answers): Diagnosis {
  const scores = computeScores(answers);
  const questions = applicableQuestions(answers);
  const answered = questions.filter((q) => selected(answers, q.id).length > 0).length;

  const hoursPerWeek = computeHours(answers);
  const annualCost = computeAnnualCost(hoursPerWeek);

  const opportunities = [...ALL_DIMENSIONS].sort((a, b) => scores[a] - scores[b]);
  const strengths = [...ALL_DIMENSIONS].sort((a, b) => scores[b] - scores[a]).slice(0, 3);

  return {
    overall: readinessScore(scores),
    scores,
    hoursPerWeek,
    annualCost,
    opportunities,
    strengths,
    industry: industryOf(answers),
    goal: goalOf(answers),
    dataSensitivity: dataSensitivityOf(answers),
    teamSize: teamSizeOf(answers),
    confidence: confidenceScore(answered),
    answered,
  };
}
