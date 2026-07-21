import type { Answers, Diagnosis } from "./types";
import { ARCHETYPE_CONTENT, DIMENSION_LABELS, STAGE_CONTENT } from "./content";
import { detectPatterns, type DetectedPattern } from "./patterns";

/**
 * BSTS Advisor Voice.
 *
 * Generates the "If I were your advisor…" narrative — a personalized, honest
 * read of the business that references the diagnosed stage, founder archetype,
 * the highest-confidence detected patterns, the primary constraint, and the
 * founder's real strengths. Encouraging but candid: what they do well, what
 * they avoid, the one decision that matters most, the biggest mistake to avoid,
 * and the fastest path forward.
 *
 * The output is deterministic (no randomness) so the same answers always
 * produce the same advisor read — assessments become comparable snapshots.
 */

export interface AdvisorNarrative {
  /** 4–6 short paragraphs, ~300–500 words total. */
  paragraphs: string[];
  /** The single highest-leverage decision, surfaced separately. */
  oneDecision: string;
  /** The most important mistake to avoid. */
  biggestMistake: string;
  /** The fastest concrete path forward (a first move). */
  fastestPath: string;
  /** Word count, for QA. */
  words: number;
}

function firstName(name?: string): string {
  const n = (name ?? "").trim().split(/\s+/)[0];
  return n && /^[a-zA-Z][a-zA-Z'-]*$/.test(n) ? n : "";
}

/** Warm, human opener that situates them without flattery. */
function opener(dx: Diagnosis, addr: string): string {
  const stage = STAGE_CONTENT[dx.stage];
  const arch = ARCHETYPE_CONTENT[dx.archetype];
  const you = addr ? `${addr}, here` : "Here";
  return `${you}'s how I'd read your situation if I were sitting across the table from you. You're ${article(arch.label)} ${arch.label} at the ${stage.label} stage, with an overall Business Readiness of ${dx.overall} out of 100 — and I say that with real confidence (${dx.confidence}%), because your answers were consistent. That combination tells me a lot about both what you're capable of and where you'll quietly get stuck.`;
}

/** What they're genuinely doing well — strengths + strength patterns. */
function whatsWorking(dx: Diagnosis, strengthPatterns: DetectedPattern[]): string {
  const arch = ARCHETYPE_CONTENT[dx.archetype];
  const topStrengths = dx.strengths
    .slice(0, 2)
    .map((d) => DIMENSION_LABELS[d])
    .join(" and ");
  const sp = strengthPatterns[0];
  const lead = sp
    ? `The strongest signal I see is "${sp.name}": ${lc(sp.description.replace(/\.$/, ""))}. `
    : "";
  return `First, what's genuinely working. ${lead}Your ${topStrengths} are ahead of most founders at your stage, and your instinct as ${article(arch.label)} ${arch.label} — ${lc(arch.strengths[0])} — is a real asset, not a nice-to-have. Don't discount this. A lot of the plan below only works because you already have this foundation to build on.`;
}

/** What they're avoiding — the honest part, drawn from risk patterns + blind spots. */
function whatYoureAvoiding(dx: Diagnosis, riskPatterns: DetectedPattern[]): string {
  const arch = ARCHETYPE_CONTENT[dx.archetype];
  const primary = DIMENSION_LABELS[dx.bottlenecks[0]].toLowerCase();
  const top = riskPatterns[0];
  if (top) {
    return `Now the honest part — the thing you're probably avoiding. ${top.why} That shows up in your numbers as ${primary} being your tightest constraint right now. It's not a character flaw; it's the predictable blind spot of ${article(arch.label)} ${arch.label} (${lc(arch.blindSpots[0])}). But naming it is the whole game, because almost nobody fixes the constraint they won't look at.`;
  }
  return `Now the honest part. Your tightest constraint right now is ${primary}, and the classic ${arch.label} trap here is ${lc(arch.blindSpots[0])}. It's not a character flaw — it's just the predictable blind spot of how you're wired. But naming it is the whole game, because almost nobody fixes the constraint they won't look at.`;
}

/** The one decision that matters most, right now. */
function decisionParagraph(oneDecision: string): string {
  return `If you do one thing after reading this, make it this decision: ${oneDecision} Everything else on your list is downstream of it. Founders who get this one right tend to compound; the ones who defer it tend to stay busy without moving.`;
}

/** Biggest mistake + fastest path, closing on momentum. */
function closer(biggestMistake: string, fastestPath: string): string {
  return `The biggest mistake I'd watch for: ${biggestMistake} And the fastest path forward is smaller than you think — ${fastestPath} You don't need a new plan; you need to run the next 30 days with unusual focus. Pick the constraint, commit to the decision above, and let the rest wait. That's what I'd tell you if I had skin in your game.`;
}

function deriveOneDecision(dx: Diagnosis, riskPatterns: DetectedPattern[]): string {
  const primaryDim = DIMENSION_LABELS[dx.bottlenecks[0]].toLowerCase();
  const top = riskPatterns[0];
  if (top && top.actions[0]) {
    return `commit to your ${primaryDim} constraint by doing this first — ${lc(top.actions[0])}.`;
  }
  const stage = STAGE_CONTENT[dx.stage];
  return `commit fully to closing your ${primaryDim} gap, starting with: ${lc(stage.d30[0])}.`;
}

function deriveBiggestMistake(dx: Diagnosis, riskPatterns: DetectedPattern[]): string {
  const arch = ARCHETYPE_CONTENT[dx.archetype];
  const top = riskPatterns[0];
  if (top) {
    return `letting "${top.name}" run unchecked — staying in your comfort zone (${arch.blindSpots[0].toLowerCase()}) while the constraint quietly gets worse.`;
  }
  return `staying in your comfort zone — ${arch.blindSpots[0].toLowerCase()} — while the real constraint quietly gets worse.`;
}

function deriveFastestPath(dx: Diagnosis, riskPatterns: DetectedPattern[]): string {
  const top = riskPatterns.find((p) => p.actions.length > 0);
  const stage = STAGE_CONTENT[dx.stage];
  const move = top?.actions[0] ?? stage.quickWins[0] ?? stage.d30[0];
  return `${lc(move)}, this week.`;
}

function lc(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** Correct indefinite article for a following word. */
function article(next: string): string {
  return /^[aeiou]/i.test(next.trim()) ? "an" : "a";
}

function countWords(paras: string[]): number {
  return paras.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

export function buildAdvisor(
  dx: Diagnosis,
  answers: Answers,
  name?: string,
): AdvisorNarrative {
  const patterns = detectPatterns(dx, answers);
  const riskPatterns = patterns.filter((p) => p.kind === "risk");
  const strengthPatterns = patterns.filter((p) => p.kind === "strength");

  const oneDecision = deriveOneDecision(dx, riskPatterns);
  const biggestMistake = deriveBiggestMistake(dx, riskPatterns);
  const fastestPath = deriveFastestPath(dx, riskPatterns);
  const addr = firstName(name);

  const paragraphs = [
    opener(dx, addr),
    whatsWorking(dx, strengthPatterns),
    whatYoureAvoiding(dx, riskPatterns),
    decisionParagraph(oneDecision),
    closer(biggestMistake, fastestPath),
  ];

  return {
    paragraphs,
    oneDecision,
    biggestMistake,
    fastestPath,
    words: countWords(paragraphs),
  };
}
