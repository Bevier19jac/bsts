import type {
  Answers,
  Archetype,
  ArchetypeResult,
  Diagnosis,
  Dimension,
  Question,
  Scores,
  Stage,
} from "./types";
import { QUESTIONS, QUESTION_BY_ID } from "./questions";

const STAGE_RANK: Stage[] = [
  "idea",
  "validation",
  "prototype",
  "mvp",
  "early_revenue",
  "growth",
  "scale",
];

const ALL_DIMENSIONS: Dimension[] = [
  "founder",
  "health",
  "execution",
  "ai",
  "automation",
  "marketing",
  "sales",
  "operations",
  "finance",
  "leadership",
];

const ALL_ARCHETYPES: Archetype[] = [
  "builder",
  "strategist",
  "operator",
  "creative",
  "consultant",
  "corporate",
  "inventor",
  "ai_native",
  "community",
  "growth_leader",
];

/** Which dimensions can legitimately be "the bottleneck" at each stage. */
const BOTTLENECK_CANDIDATES: Record<Stage, Dimension[]> = {
  idea: ["marketing", "sales", "health", "founder"],
  validation: ["marketing", "sales", "health", "execution"],
  prototype: ["execution", "marketing", "health"],
  mvp: ["execution", "marketing", "sales", "health"],
  early_revenue: ["marketing", "sales", "operations", "automation"],
  growth: ["sales", "operations", "automation", "leadership"],
  scale: ["operations", "leadership", "automation", "marketing"],
};

function selected(answers: Answers, qid: string): string[] {
  return answers[qid] ?? [];
}

/** Stage that decides which branch of questions to show (from Q1 only, stable). */
export function branchStage(answers: Answers): Stage | null {
  const q = QUESTION_BY_ID["stage"];
  const chosen = selected(answers, "stage")[0];
  const opt = q?.options.find((o) => o.value === chosen);
  return opt?.stage ?? null;
}

/**
 * The adaptive queue: every non-scoped question, plus only the scoped
 * questions that match the chosen branch. Order follows the bank.
 */
export function orderedQuestions(answers: Answers): Question[] {
  const bs = branchStage(answers);
  return QUESTIONS.filter((q) => {
    if (!q.stages) return true;
    if (!bs) return false; // hide branch questions until stage is chosen
    return q.stages.includes(bs);
  });
}

export function totalQuestions(answers: Answers): number {
  // Before a stage is picked we can't know the exact count; estimate ~11.
  return branchStage(answers) ? orderedQuestions(answers).length : 11;
}

export function nextUnanswered(answers: Answers): Question | null {
  for (const q of orderedQuestions(answers)) {
    if (selected(answers, q.id).length === 0) return q;
  }
  return null;
}

export function isComplete(answers: Answers): boolean {
  return branchStage(answers) !== null && nextUnanswered(answers) === null;
}

/** Final diagnosed stage: never below the self-reported stage; evidence can raise it. */
export function finalStage(answers: Answers): Stage {
  let rank = 0;
  for (const q of orderedQuestions(answers)) {
    for (const v of selected(answers, q.id)) {
      const opt = q.options.find((o) => o.value === v);
      if (opt?.stage) rank = Math.max(rank, STAGE_RANK.indexOf(opt.stage));
    }
  }
  return STAGE_RANK[rank];
}

function clamp(n: number, lo = 2, hi = 99): number {
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

export function computeScores(answers: Answers): Scores {
  const raw: Record<Dimension, number> = Object.fromEntries(
    ALL_DIMENSIONS.map((d) => [d, 48]),
  ) as Record<Dimension, number>;

  for (const q of orderedQuestions(answers)) {
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

export function computeArchetypes(answers: Answers): ArchetypeResult[] {
  const raw: Record<Archetype, number> = Object.fromEntries(
    ALL_ARCHETYPES.map((a) => [a, 0]),
  ) as Record<Archetype, number>;

  for (const q of orderedQuestions(answers)) {
    for (const v of selected(answers, q.id)) {
      const opt = q.options.find((o) => o.value === v);
      if (!opt?.a) continue;
      for (const [arch, delta] of Object.entries(opt.a)) {
        raw[arch as Archetype] += delta as number;
      }
    }
  }

  return ALL_ARCHETYPES.map((a) => ({ key: a, score: raw[a] })).sort(
    (x, y) => y.score - x.score,
  );
}

function overallScore(s: Scores): number {
  return clamp(
    0.26 * s.health +
      0.22 * s.execution +
      0.16 * s.finance +
      0.14 * s.sales +
      0.1 * s.marketing +
      0.06 * s.operations +
      0.06 * s.founder,
    5,
    98,
  );
}

function confidenceScore(answered: number, arche: ArchetypeResult[]): number {
  const gap = (arche[0]?.score ?? 0) - (arche[1]?.score ?? 0);
  return clamp(70 + answered * 1.6 + gap * 1.8, 62, 97);
}

export function diagnose(answers: Answers): Diagnosis {
  const stage = finalStage(answers);
  const scores = computeScores(answers);
  const arche = computeArchetypes(answers);
  const questions = orderedQuestions(answers);
  const answered = questions.filter((q) => selected(answers, q.id).length > 0).length;

  const candidates = BOTTLENECK_CANDIDATES[stage];
  const bottlenecks = [...candidates]
    .sort((a, b) => scores[a] - scores[b])
    .slice(0, 2);

  const strengths = [...ALL_DIMENSIONS]
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 3);

  return {
    stage,
    archetype: arche[0]?.key ?? "strategist",
    secondaryArchetype: arche[1]?.key ?? "operator",
    confidence: confidenceScore(answered, arche),
    scores,
    overall: overallScore(scores),
    strengths,
    bottlenecks,
    answered,
  };
}
