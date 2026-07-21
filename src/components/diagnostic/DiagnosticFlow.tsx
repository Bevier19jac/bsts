"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import type { Answers } from "@/lib/diagnostic/types";
import {
  branchStage,
  diagnose,
  isComplete,
  nextUnanswered,
  orderedQuestions,
  totalQuestions,
} from "@/lib/diagnostic/engine";
import { DiagnosticReport } from "./DiagnosticReport";

export function DiagnosticFlow() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const current = useMemo(
    () => (done ? null : nextUnanswered(answers)),
    [answers, done],
  );

  const answeredCount = useMemo(
    () => orderedQuestions(answers).filter((q) => (answers[q.id]?.length ?? 0) > 0).length,
    [answers],
  );
  const total = totalQuestions(answers);
  const pct = Math.min(100, Math.round((answeredCount / Math.max(total, 1)) * 100));

  function choose(qid: string, value: string) {
    const na: Answers = { ...answers, [qid]: [value] };
    setAnswers(na);
    if (isComplete(na)) {
      // brief pause so the selection registers before the reveal
      setTimeout(() => setDone(true), 260);
    }
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
    const answeredQs = orderedQuestions(answers).filter(
      (q) => (answers[q.id]?.length ?? 0) > 0,
    );
    const last = answeredQs[answeredQs.length - 1];
    if (!last) {
      setStarted(false);
      return;
    }
    setAnswers((a) => {
      const c = { ...a };
      delete c[last.id];
      return c;
    });
  }

  function restart() {
    setAnswers({});
    setDone(false);
    setStarted(true);
  }

  // ── Intro ──────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="surface rounded-[2rem] p-8 text-center sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-core/40 bg-cyan-faint px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-cyan-soft uppercase">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> BSTS Diagnostic
        </span>
        <h2 className="display mt-6 text-3xl leading-tight text-warm-white sm:text-4xl">
          Discover your Business Stage, Founder Archetype, and AI Readiness — in
          under 5 minutes.
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-warm-mist">
          This isn&apos;t a survey. Every answer narrows the next question, the way
          a seasoned consultant would — until BSTS can tell you exactly where you
          are, what&apos;s holding you back, and the highest-ROI moves to make next.
        </p>
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-core px-7 py-3.5 text-base font-semibold text-obsidian-deep transition-colors hover:bg-cyan-soft"
        >
          Start the diagnostic <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
        <p className="mt-4 text-xs text-warm-dim">
          8–12 questions · adaptive · no account required
        </p>
      </div>
    );
  }

  // ── Report ─────────────────────────────────────────────────────
  if (done) {
    return (
      <DiagnosticReport
        diagnosis={diagnose(answers)}
        answers={answers}
        onRestart={restart}
      />
    );
  }

  // ── Questions ──────────────────────────────────────────────────
  const q = current;
  if (!q) return null;
  const chosen = answers[q.id]?.[0];
  const stageKnown = branchStage(answers) !== null;

  return (
    <div className="surface rounded-[2rem] p-6 sm:p-9">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-1.5 text-sm text-warm-dim transition-colors hover:text-warm-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back
        </button>
        <span className="text-xs tracking-[0.14em] text-warm-dim uppercase">
          {stageKnown ? `Question ${answeredCount + 1} of ${total}` : "Let's begin"}
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-edge">
        <motion.div
          className="h-full rounded-full bg-cyan-core"
          initial={false}
          animate={{ width: `${Math.max(pct, 6)}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mt-8"
        >
          <h2 className="display text-2xl leading-snug text-warm-white sm:text-[1.7rem]">
            {q.text}
          </h2>
          {q.description ? (
            <p className="mt-2 text-sm leading-relaxed text-warm-mist">{q.description}</p>
          ) : null}

          <div className="mt-6 grid grid-cols-1 gap-3">
            {q.options.map((o, i) => {
              const active = chosen === o.value;
              return (
                <motion.button
                  key={o.value}
                  type="button"
                  onClick={() => choose(q.id, o.value)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.22 }}
                  className={`group flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${
                    active
                      ? "border-cyan-core/70 bg-cyan-faint"
                      : "border-edge bg-graphite/60 hover:border-cyan-core/50 hover:bg-graphite-2"
                  }`}
                >
                  <span
                    className={`text-[0.98rem] leading-snug ${
                      active ? "text-warm-white" : "text-warm-mist group-hover:text-warm-white"
                    }`}
                  >
                    {o.label}
                  </span>
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
                      active
                        ? "border-cyan-core bg-cyan-core text-obsidian-deep"
                        : "border-edge text-transparent group-hover:border-cyan-core/60"
                    }`}
                    aria-hidden
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
