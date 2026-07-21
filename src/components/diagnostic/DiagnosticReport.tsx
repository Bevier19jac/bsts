"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  Bot,
  Check,
  Compass,
  Layers,
  Lightbulb,
  Quote,
  RefreshCw,
  Send,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import type { Answers, Diagnosis } from "@/lib/diagnostic/types";
import {
  ARCHETYPE_CONTENT,
  DIMENSION_LABELS,
  DIMENSION_ORDER,
  STAGE_CONTENT,
  archetypeLabel,
  stageLabel,
  topPriorities,
} from "@/lib/diagnostic/content";
import { detectPatterns, type DetectedPattern, type PatternKind } from "@/lib/diagnostic/patterns";
import { buildAdvisor } from "@/lib/diagnostic/advisor";

const WEB3FORMS_ACCESS_KEY = "4a21a788-0e18-450a-a32a-5b3cae2c8986";

function barColor(v: number): string {
  if (v >= 66) return "bg-cyan-core";
  if (v >= 40) return "bg-gold-core";
  return "bg-alert";
}

function ScoreBar({ label, value, i }: { label: string; value: number; i: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-warm-mist">{label}</span>
        <span className="font-semibold text-warm-white tabular-nums">{value}</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-edge">
        <motion.div
          className={`h-full rounded-full ${barColor(value)}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const KIND_LABEL: Record<PatternKind, string> = {
  risk: "Risk",
  opportunity: "Opportunity",
  strength: "Strength",
};

function ucFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const KIND_STYLE: Record<
  PatternKind,
  { chip: string; dot: string; icon: typeof ShieldAlert; label: string }
> = {
  risk: {
    chip: "border-alert/40 bg-alert/10 text-alert",
    dot: "bg-alert",
    icon: ShieldAlert,
    label: "Risk",
  },
  opportunity: {
    chip: "border-gold-core/40 bg-gold-core/10 text-gold-soft",
    dot: "bg-gold-core",
    icon: Lightbulb,
    label: "Opportunity",
  },
  strength: {
    chip: "border-cyan-core/40 bg-cyan-faint text-cyan-soft",
    dot: "bg-cyan-core",
    icon: Award,
    label: "Strength",
  },
};

function PatternCard({ p, i }: { p: DetectedPattern; i: number }) {
  const style = KIND_STYLE[p.kind];
  const Icon = style.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * i }}
      className="rounded-2xl border border-edge bg-graphite/60 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${style.chip}`}>
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <div className="display text-base leading-tight text-warm-white">{p.name}</div>
            <span
              className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] uppercase ${style.chip}`}
            >
              {style.label}
            </span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[0.6rem] tracking-wide text-warm-dim uppercase">Confidence</div>
          <div className="display text-lg text-warm-white tabular-nums">{p.confidence}%</div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-warm-mist">{p.description}</p>
      <div className="mt-3 rounded-xl border border-edge/70 bg-obsidian-deep/40 p-3">
        <div className="text-[0.62rem] font-semibold tracking-[0.14em] text-warm-dim uppercase">
          Why this matters
        </div>
        <p className="mt-1 text-sm leading-relaxed text-warm-mist">{p.why}</p>
      </div>
      <div className="mt-3">
        <div className="text-[0.62rem] font-semibold tracking-[0.14em] text-warm-dim uppercase">
          What to do
        </div>
        <ul className="mt-2 space-y-1.5">
          {p.actions.map((a) => (
            <li key={a} className="flex gap-2 text-sm leading-relaxed text-warm-mist">
              <span aria-hidden className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
              {a}
            </li>
          ))}
        </ul>
      </div>
      {p.aiRecs && p.aiRecs.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.aiRecs.map((r) => (
            <span
              key={r}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-core/25 bg-cyan-faint px-3 py-1 text-xs text-cyan-soft"
            >
              <Bot className="h-3 w-3" aria-hidden /> {r}
            </span>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}

function summaryText(dx: Diagnosis, answers: Answers): string {
  const s = dx.scores;
  const patterns = detectPatterns(dx, answers).slice(0, 6);
  const advisor = buildAdvisor(dx, answers);
  const lines = [
    `BSTS Business Diagnostic`,
    ``,
    `Business Readiness Score: ${dx.overall}/100 (confidence ${dx.confidence}%)`,
    `Business Stage: ${stageLabel(dx.stage)}`,
    `Founder Archetype: ${archetypeLabel(dx.archetype)} (secondary: ${archetypeLabel(dx.secondaryArchetype)})`,
    ``,
    `Primary constraint: ${DIMENSION_LABELS[dx.bottlenecks[0]]}`,
    dx.bottlenecks[1] ? `Secondary constraint: ${DIMENSION_LABELS[dx.bottlenecks[1]]}` : ``,
    ``,
    `Scores:`,
    ...DIMENSION_ORDER.map((d) => `  ${DIMENSION_LABELS[d]}: ${s[d]}`),
    ``,
    `Signals detected:`,
    ...patterns.map((p) => `  [${KIND_LABEL[p.kind]} · ${p.confidence}%] ${p.name} — ${p.description}`),
    ``,
    `Top priorities:`,
    ...topPriorities(dx).map((p, i) => `  ${i + 1}. ${p}`),
    ``,
    `The one decision that matters most: ${advisor.oneDecision}`,
    `Biggest mistake to avoid: ${advisor.biggestMistake}`,
    `Fastest path forward: ${advisor.fastestPath}`,
  ];
  return lines.filter((l) => l !== undefined).join("\n");
}

export function DiagnosticReport({
  diagnosis,
  answers,
  onRestart,
}: {
  diagnosis: Diagnosis;
  answers: Answers;
  onRestart: () => void;
}) {
  const dx = diagnosis;
  const stage = STAGE_CONTENT[dx.stage];
  const arch = ARCHETYPE_CONTENT[dx.archetype];
  const secondary = ARCHETYPE_CONTENT[dx.secondaryArchetype];
  const priorities = topPriorities(dx);
  const patterns = detectPatterns(dx, answers);
  const advisor = buildAdvisor(dx, answers);
  const topPatterns = patterns.slice(0, 6);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function send() {
    if (!name.trim() || !email.trim()) return;
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Diagnostic — ${stageLabel(dx.stage)} / ${archetypeLabel(dx.archetype)} — ${org || name}`,
          from_name: name,
          email,
          message: `${org ? `Organization: ${org}\n\n` : ""}${summaryText(dx, answers)}`,
        }),
      });
      const j = (await res.json()) as { success?: boolean };
      setState(j.success ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      {/* Header: readiness score + dual diagnosis */}
      <div className="surface overflow-hidden rounded-[2rem] p-7 sm:p-9">
        <p className="text-xs tracking-[0.2em] text-cyan-soft uppercase">Your diagnosis</p>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex items-center gap-5">
            <div className="relative grid h-24 w-24 place-items-center rounded-full border border-cyan-core/40 bg-cyan-faint">
              <div className="text-center">
                <div className="display text-3xl leading-none text-warm-white">{dx.overall}</div>
                <div className="text-[0.6rem] tracking-wide text-warm-dim uppercase">/ 100</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-warm-dim">Business Readiness</div>
              <div className="display text-xl text-warm-white">Score {dx.overall}</div>
              <div className="mt-1 text-xs text-cyan-soft">Confidence {dx.confidence}%</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-edge bg-graphite/60 p-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-warm-dim uppercase">
                <TrendingUp className="h-4 w-4 text-cyan-core" aria-hidden /> Business Stage
              </div>
              <div className="display mt-1.5 text-lg text-warm-white">{stageLabel(dx.stage)}</div>
              <div className="mt-1 text-xs text-warm-dim">{stage.timeToNext}</div>
            </div>
            <div className="rounded-2xl border border-edge bg-graphite/60 p-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-warm-dim uppercase">
                <Compass className="h-4 w-4 text-gold-soft" aria-hidden /> Founder Archetype
              </div>
              <div className="display mt-1.5 text-lg text-warm-white">{arch.label}</div>
              <div className="mt-1 text-xs text-warm-dim">Secondary: {secondary.label}</div>
            </div>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-warm-mist">{stage.headline}</p>
        <p className="mt-3 leading-relaxed text-warm-mist">{arch.summary}</p>
      </div>

      {/* Constraints */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="surface rounded-[2rem] p-6">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
            <AlertTriangle className="h-4 w-4 text-alert" aria-hidden /> Primary constraint
          </div>
          <div className="display mt-2 text-xl text-warm-white">
            {DIMENSION_LABELS[dx.bottlenecks[0]]}
          </div>
          {dx.bottlenecks[1] ? (
            <p className="mt-3 text-sm text-warm-mist">
              Secondary: <span className="text-warm-white">{DIMENSION_LABELS[dx.bottlenecks[1]]}</span>
            </p>
          ) : null}
        </div>
        <div className="surface rounded-[2rem] p-6">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
            <Award className="h-4 w-4 text-cyan-core" aria-hidden /> Your strengths
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dx.strengths.map((s) => (
              <li
                key={s}
                className="rounded-full border border-cyan-core/30 bg-cyan-faint px-3 py-1 text-xs text-cyan-soft"
              >
                {DIMENSION_LABELS[s]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Maturity scores */}
      <div className="surface rounded-[2rem] p-7">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
          <Layers className="h-4 w-4 text-cyan-core" aria-hidden /> Maturity breakdown
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {DIMENSION_ORDER.map((d, i) => (
            <ScoreBar key={d} label={DIMENSION_LABELS[d]} value={dx.scores[d]} i={i} />
          ))}
        </div>
      </div>

      {/* Signals we detected — the intelligence layer */}
      {topPatterns.length > 0 ? (
        <div className="surface rounded-[2rem] p-7">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
            <Sparkles className="h-4 w-4 text-cyan-core" aria-hidden /> Signals we detected
          </div>
          <p className="mt-2 text-sm leading-relaxed text-warm-mist">
            These are the patterns BSTS read across your answers — not single scores, but the
            relationships between them. Several can be true at once; each is ranked by how
            confident we are it applies to you.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {topPatterns.map((p, i) => (
              <PatternCard key={p.id} p={p} i={i} />
            ))}
          </div>
        </div>
      ) : null}

      {/* If I were your advisor — the narrative voice */}
      <div className="relative overflow-hidden rounded-[2rem] border border-gold-core/25 bg-gradient-to-b from-gold-core/10 to-transparent p-7 sm:p-9">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-gold-soft uppercase">
          <Quote className="h-4 w-4 text-gold-soft" aria-hidden /> If I were your advisor
        </div>
        <div className="mt-5 space-y-4">
          {advisor.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              className="leading-relaxed text-warm-mist"
            >
              {para}
            </motion.p>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(
            [
              ["The one decision", advisor.oneDecision, Target],
              ["Biggest mistake to avoid", advisor.biggestMistake, AlertTriangle],
              ["Fastest path forward", advisor.fastestPath, TrendingUp],
            ] as const
          ).map(([k, v, Icon]) => (
            <div key={k} className="rounded-2xl border border-edge bg-graphite/60 p-4">
              <div className="flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.12em] text-gold-soft uppercase">
                <Icon className="h-3.5 w-3.5" aria-hidden /> {k}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-warm-mist">{ucFirst(v)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top priorities */}
      <div className="surface rounded-[2rem] p-7">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
          <Target className="h-4 w-4 text-cyan-core" aria-hidden /> Top priorities
        </div>
        <ol className="mt-4 space-y-3">
          {priorities.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan-core/40 text-xs font-semibold text-cyan-core">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-warm-mist">{p}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 30/60/90 roadmap */}
      <div className="surface rounded-[2rem] p-7">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
          <Compass className="h-4 w-4 text-gold-soft" aria-hidden /> Your 90-day roadmap
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {(
            [
              ["First 30 days", stage.d30],
              ["Days 31–60", stage.d60],
              ["Days 61–90", stage.d90],
            ] as const
          ).map(([title, items]) => (
            <div key={title} className="rounded-2xl border border-edge bg-graphite/60 p-5">
              <div className="text-xs font-semibold tracking-[0.14em] text-cyan-soft uppercase">
                {title}
              </div>
              <ul className="mt-3 space-y-2.5">
                {items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Founder profile */}
      <div className="surface rounded-[2rem] p-7">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
          <Compass className="h-4 w-4 text-gold-soft" aria-hidden /> Founder profile — {arch.label}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold text-warm-white">Blind spots to watch</h4>
            <ul className="mt-2 space-y-2">
              {arch.blindSpots.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-alert/80" />
                  {b}
                </li>
              ))}
            </ul>
            <h4 className="mt-5 text-sm font-semibold text-warm-white">Skills to develop next</h4>
            <ul className="mt-2 space-y-2">
              {arch.skills.map((s) => (
                <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 text-sm">
            {(
              [
                ["Decision-making", arch.decisionStyle],
                ["Leadership style", arch.leadershipStyle],
                ["Ideal co-founder", arch.idealCofounder],
                ["Recommended first hire", arch.firstHire],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-edge bg-graphite/60 p-4">
                <div className="text-xs tracking-[0.12em] text-warm-dim uppercase">{k}</div>
                <div className="mt-1 leading-relaxed text-warm-mist">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI tools + stack */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="surface rounded-[2rem] p-6">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
            <Bot className="h-4 w-4 text-cyan-core" aria-hidden /> Recommended AI automations
          </div>
          <ul className="mt-3 space-y-2">
            {arch.aiTools.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface rounded-[2rem] p-6">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
            <Layers className="h-4 w-4 text-gold-soft" aria-hidden /> Recommended stack
          </div>
          <ul className="mt-3 space-y-2">
            {arch.stack.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lead capture */}
      <div className="rounded-[2rem] border border-cyan-core/30 bg-gradient-to-b from-cyan-faint to-transparent p-7">
        {state === "sent" ? (
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-cyan-core/50 bg-cyan-faint">
              <Check className="h-6 w-6 text-cyan-core" aria-hidden />
            </div>
            <h3 className="display mt-4 text-xl text-warm-white">Sent — talk soon.</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-warm-mist">
              Your diagnostic is on its way to BSTS. We&apos;ll turn it into a concrete
              plan and reply, usually within one business day.
            </p>
          </div>
        ) : (
          <>
            <h3 className="display text-xl text-warm-white">
              Turn this into a plan with BSTS.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-warm-mist">
              Send your results and get a tailored next-steps reply — built around your
              stage and your archetype. No obligation.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                autoComplete="email"
                className="rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none"
              />
              <input
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="Business (optional)"
                autoComplete="organization"
                className="rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={send}
                disabled={state === "sending" || !name.trim() || !email.trim()}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-core px-6 py-3 text-sm font-semibold text-obsidian-deep transition-colors hover:bg-cyan-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden />
                {state === "sending" ? "Sending…" : "Send my results to BSTS"}
              </button>
              <button
                type="button"
                onClick={onRestart}
                className="inline-flex items-center gap-2 rounded-full border border-edge px-5 py-3 text-sm text-warm-mist transition-colors hover:text-warm-white"
              >
                <RefreshCw className="h-4 w-4" aria-hidden /> Retake
              </button>
            </div>
            {state === "error" ? (
              <p className="mt-3 text-sm text-alert" role="alert">
                Something went wrong sending that. Please try again in a moment.
              </p>
            ) : null}
          </>
        )}
      </div>
    </motion.div>
  );
}
