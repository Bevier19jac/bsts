"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock, Sparkles } from "lucide-react";
import type { Answers } from "@/lib/diagnostic/types";
import { applicableQuestions, diagnose, isComplete, nextUnanswered } from "@/lib/diagnostic/engine";
import { QUESTION_BY_ID } from "@/lib/diagnostic/questions";
import { DiagnosticReport } from "./DiagnosticReport";

export function DiagnosticFlow() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [stepId, setStepId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Keep the current question (or the report) snapped to the top of the
  // viewport, just below the fixed header — so it always feels like one
  // question at a time, especially on phones.
  useEffect(() => {
    if (!started) return;
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [stepId, done, started]);

  const applicable = applicableQuestions(answers);
  const total = applicable.length;
  const currentIndex = stepId ? Math.max(0, applicable.findIndex((q) => q.id === stepId)) : 0;
  const pct = Math.min(100, Math.round((currentIndex / Math.max(total, 1)) * 100));

  const q = stepId ? QUESTION_BY_ID[stepId] : null;

  function begin() {
    setStarted(true);
    setStepId(nextUnanswered({})?.id ?? null);
  }

  function advance(na: Answers) {
    if (isComplete(na)) {
      setTimeout(() => setDone(true), 200);
      return;
    }
    const next = nextUnanswered(na);
    if (next) setStepId(next.id);
    else setTimeout(() => setDone(true), 200);
  }

  function setSingle(qid: string, value: string) {
    setAnswers((a) => ({ ...a, [qid]: [value] }));
  }

  function toggleMulti(qid: string, value: string) {
    setAnswers((a) => {
      const cur = (a[qid] ?? []).filter((v) => v !== "__skip__");
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      return { ...a, [qid]: next };
    });
  }

  function setText(qid: string, value: string) {
    setAnswers((a) => ({ ...a, [qid]: [value] }));
  }

  function onContinue() {
    if (!q) return;
    if (q.type === "multi") {
      setAnswers((prev) => {
        const real = (prev[q.id] ?? []).filter((v) => v !== "__skip__");
        const na: Answers = { ...prev, [q.id]: real.length ? real : ["__skip__"] };
        advance(na);
        return na;
      });
      return;
    }
    if (q.type === "text") {
      setAnswers((prev) => {
        const raw = (prev[q.id]?.[0] ?? "").trim();
        const na: Answers = { ...prev, [q.id]: raw ? [raw] : ["__skip__"] };
        advance(na);
        return na;
      });
      return;
    }
    advance(answers); // single — selection already stored
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
    const answeredQs = applicable.filter((x) => (answers[x.id]?.length ?? 0) > 0 && x.id !== stepId);
    const last = answeredQs[answeredQs.length - 1];
    if (!last) {
      setStarted(false);
      setStepId(null);
      return;
    }
    setAnswers((a) => {
      const c = { ...a };
      delete c[last.id];
      return c;
    });
    setStepId(last.id);
  }

  function restart() {
    setAnswers({});
    setDone(false);
    setStarted(true);
    setStepId(nextUnanswered({})?.id ?? null);
  }

  // ── Intro ──────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="surface rounded-[2rem] p-8 text-center sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-core/40 bg-cyan-faint px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-cyan-soft uppercase">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> AI &amp; Automation Assessment
        </span>
        <h2 className="display mt-6 text-3xl leading-tight text-warm-white sm:text-4xl">
          See where AI and automation could save your business time — in under 5 minutes.
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-warm-mist">
          A few plain questions about how your business runs today. Your answers steer which
          questions come next, so you only answer what fits you. At the end you&apos;ll see roughly
          how many hours a week you could win back, which tools and automations would help, and
          where to start. No jargon, no account.
        </p>
        <button
          type="button"
          onClick={begin}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-core px-7 py-3.5 text-base font-semibold text-obsidian-deep transition-colors hover:bg-cyan-soft"
        >
          Start the assessment <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-warm-dim">
          <Clock className="h-3.5 w-3.5" aria-hidden /> ~10–12 questions · about 3 minutes
        </p>
      </div>
    );
  }

  // ── Report ─────────────────────────────────────────────────────
  if (done) {
    return (
      <div ref={topRef} className="scroll-mt-24">
        <DiagnosticReport diagnosis={diagnose(answers)} answers={answers} onRestart={restart} />
      </div>
    );
  }

  // ── Question ───────────────────────────────────────────────────
  if (!q) return null;
  const chosen = (answers[q.id] ?? []).filter((v) => v !== "__skip__");
  const singleValue = q.type === "single" ? chosen[0] ?? "" : "";
  const textValue = q.type === "text" ? answers[q.id]?.[0]?.replace("__skip__", "") ?? "" : "";
  const canContinue =
    q.type === "text"
      ? q.optional || textValue.trim().length > 0
      : q.type === "multi"
        ? true
        : singleValue.length > 0;

  return (
    <div ref={topRef} className="surface scroll-mt-24 rounded-[2rem] p-6 sm:p-9">
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
          Question {currentIndex + 1} of {total}
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
          <h2 className="display text-2xl leading-snug text-warm-white sm:text-[1.7rem]">{q.text}</h2>
          {q.description ? (
            <p className="mt-2 text-sm leading-relaxed text-warm-mist">{q.description}</p>
          ) : null}

          {/* Single-select → dropdown */}
          {q.type === "single" ? (
            <div className="relative mt-6">
              <select
                value={singleValue}
                onChange={(e) => setSingle(q.id, e.target.value)}
                className="w-full appearance-none rounded-2xl border border-edge bg-graphite px-5 py-4 pr-12 text-[1rem] text-warm-white focus:border-cyan-core/70 focus:outline-none"
              >
                <option value="" disabled>
                  Select an answer…
                </option>
                {q.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2 text-warm-dim"
                aria-hidden
              />
            </div>
          ) : null}

          {/* Multi-select → checkbox list */}
          {q.type === "multi" ? (
            <div className="mt-6 grid grid-cols-1 gap-3">
              {q.options.map((o, i) => {
                const active = chosen.includes(o.value);
                return (
                  <motion.button
                    key={o.value}
                    type="button"
                    onClick={() => toggleMulti(q.id, o.value)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.2 }}
                    className={`group flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left transition-all ${
                      active
                        ? "border-cyan-core/70 bg-cyan-faint"
                        : "border-edge bg-graphite/60 hover:border-cyan-core/50 hover:bg-graphite-2"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                        active
                          ? "border-cyan-core bg-cyan-core text-obsidian-deep"
                          : "border-edge text-transparent group-hover:border-cyan-core/60"
                      }`}
                      aria-hidden
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span
                      className={`text-[0.98rem] leading-snug ${
                        active ? "text-warm-white" : "text-warm-mist group-hover:text-warm-white"
                      }`}
                    >
                      {o.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ) : null}

          {/* Free text → input */}
          {q.type === "text" ? (
            <textarea
              value={textValue}
              onChange={(e) => setText(q.id, e.target.value)}
              placeholder={q.placeholder}
              rows={3}
              className="mt-6 w-full resize-none rounded-2xl border border-edge bg-graphite px-5 py-4 text-[1rem] text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none"
            />
          ) : null}

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-xs text-warm-dim">
              {q.type === "multi"
                ? "Pick all that apply — or none."
                : q.type === "text" && q.optional
                  ? "Optional — skip if you like."
                  : " "}
            </p>
            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-core px-6 py-3 text-sm font-semibold text-obsidian-deep transition-colors hover:bg-cyan-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              {q.type === "text" && q.optional && !textValue.trim() ? "Skip" : "Continue"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
