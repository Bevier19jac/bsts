"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Check,
  Clock,
  Cpu,
  DollarSign,
  Gauge,
  Layers,
  Lightbulb,
  RefreshCw,
  Send,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import type { Answers, Diagnosis } from "@/lib/diagnostic/types";
import {
  DIMENSION_LABELS,
  DIMENSION_NOTE,
  DIMENSION_ORDER,
  GOAL_FRAME,
  INDUSTRY_CONTENT,
  industryLabel,
  topActions,
} from "@/lib/diagnostic/content";
import { detectPatterns, type DetectedPattern, type PatternKind } from "@/lib/diagnostic/patterns";

const WEB3FORMS_ACCESS_KEY = "4a21a788-0e18-450a-a32a-5b3cae2c8986";

function barColor(v: number): string {
  if (v >= 66) return "bg-cyan-core";
  if (v >= 45) return "bg-gold-core";
  return "bg-alert";
}

function ScoreBar({ label, note, value, i }: { label: string; note: string; value: number; i: number }) {
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
      <p className="mt-1 text-xs leading-relaxed text-warm-dim">{note}</p>
    </div>
  );
}

const KIND_LABEL: Record<PatternKind, string> = {
  opportunity: "Opportunity",
  risk: "Watch out",
  strength: "Strength",
};

const KIND_STYLE: Record<
  PatternKind,
  { chip: string; dot: string; icon: typeof Lightbulb }
> = {
  opportunity: { chip: "border-cyan-core/40 bg-cyan-faint text-cyan-soft", dot: "bg-cyan-core", icon: Lightbulb },
  risk: { chip: "border-alert/40 bg-alert/10 text-alert", dot: "bg-alert", icon: ShieldAlert },
  strength: { chip: "border-gold-core/40 bg-gold-core/10 text-gold-soft", dot: "bg-gold-core", icon: Sparkles },
};

function PatternCard({ p, i }: { p: DetectedPattern; i: number }) {
  const style = KIND_STYLE[p.kind];
  const Icon = style.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * i }}
      className="overflow-hidden rounded-2xl border border-edge bg-graphite/60 p-5"
    >
      <div className="flex items-start gap-3">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${style.chip}`}>
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="display text-base leading-tight text-warm-white break-words">{p.name}</div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-block rounded-full border px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] uppercase ${style.chip}`}
            >
              {KIND_LABEL[p.kind]}
            </span>
            {p.payoff ? (
              <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-edge bg-obsidian-deep/50 px-2.5 py-0.5 text-[0.68rem] leading-tight text-warm-mist">
                <span className="text-[0.58rem] font-semibold tracking-[0.1em] text-warm-dim uppercase">Payoff</span>
                <span className="min-w-0 break-words text-cyan-soft">{p.payoff}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-warm-mist break-words">{p.description}</p>
      <div className="mt-3 rounded-xl border border-edge/70 bg-obsidian-deep/40 p-3">
        <div className="text-[0.62rem] font-semibold tracking-[0.14em] text-warm-dim uppercase">
          Why this matters
        </div>
        <p className="mt-1 text-sm leading-relaxed text-warm-mist">{p.why}</p>
      </div>
      <div className="mt-3">
        <div className="text-[0.62rem] font-semibold tracking-[0.14em] text-warm-dim uppercase">
          What BSTS would do
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
    </motion.div>
  );
}

function usd(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function noteOf(answers: Answers): string {
  const raw = (answers["notes"]?.[0] ?? "").replace("__skip__", "").trim();
  return raw;
}

function summaryText(dx: Diagnosis, answers: Answers): string {
  const s = dx.scores;
  const patterns = detectPatterns(dx, answers).slice(0, 8);
  const ind = INDUSTRY_CONTENT[dx.industry];
  const note = noteOf(answers);
  const lines = [
    `BSTS AI & Automation Opportunity Assessment`,
    ``,
    `Industry: ${industryLabel(dx.industry)}`,
    `Goal: ${GOAL_FRAME[dx.goal].label}`,
    note ? `In their words: "${note}"` : ``,
    `AI & Automation Readiness: ${dx.overall}/100 (rules-based estimate)`,
    `Estimated time reclaimable: ~${dx.hoursPerWeek} hrs/week (rough est. ≈ ${usd(dx.annualCost)}/yr at ~$38/hr blended)`,
    `Data sensitivity: ${dx.dataSensitivity}`,
    ``,
    `Maturity:`,
    ...DIMENSION_ORDER.map((d) => `  ${DIMENSION_LABELS[d]}: ${s[d]}`),
    ``,
    `Opportunities & risks detected:`,
    ...patterns.map((p) => `  [${KIND_LABEL[p.kind]}] ${p.name} — ${p.description}`),
    ``,
    `Recommended AI fit:`,
    ...ind.aiFit.map((t) => `  • ${t}`),
    ``,
    `Where to start:`,
    ...topActions(dx).map((a, i) => `  ${i + 1}. ${a}`),
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
  const ind = INDUSTRY_CONTENT[dx.industry];
  const goal = GOAL_FRAME[dx.goal];
  const patterns = detectPatterns(dx, answers);
  const topPatterns = patterns.slice(0, 6);
  const actions = topActions(dx);
  const note = noteOf(answers);
  const showSecurity = dx.dataSensitivity === "regulated" || dx.dataSensitivity === "sensitive";

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
          subject: `Assessment — ${industryLabel(dx.industry)} — ~${dx.hoursPerWeek}h/wk — ${org || name}`,
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
      {/* Header: readiness + the two big numbers */}
      <div className="surface overflow-hidden rounded-[2rem] p-7 sm:p-9">
        <p className="text-xs tracking-[0.2em] text-cyan-soft uppercase">
          {industryLabel(dx.industry)} · AI & Automation read
        </p>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex items-center gap-5">
            <div className="relative grid h-24 w-24 place-items-center rounded-full border border-cyan-core/40 bg-cyan-faint">
              <div className="text-center">
                <div className="display text-3xl leading-none text-warm-white">{dx.overall}</div>
                <div className="text-[0.6rem] tracking-wide text-warm-dim uppercase">/ 100</div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm text-warm-dim">
                <Gauge className="h-4 w-4 text-cyan-core" aria-hidden /> Readiness
              </div>
              <div className="display text-xl text-warm-white">AI &amp; Automation</div>
              <div className="mt-1 text-xs text-warm-dim">a rules-based read of your answers</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-core/30 bg-cyan-faint/60 p-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-warm-dim uppercase">
                <Clock className="h-4 w-4 text-cyan-core" aria-hidden /> Time reclaimable
              </div>
              <div className="display mt-1.5 text-2xl text-warm-white">~{dx.hoursPerWeek} hrs/week</div>
              <div className="mt-1 text-xs text-warm-dim">with automation &amp; AI</div>
            </div>
            <div className="rounded-2xl border border-gold-core/30 bg-gold-core/10 p-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-warm-dim uppercase">
                <DollarSign className="h-4 w-4 text-gold-soft" aria-hidden /> That&apos;s worth
              </div>
              <div className="display mt-1.5 text-2xl text-warm-white">≈ {usd(dx.annualCost)}/yr</div>
              <div className="mt-1 text-xs text-warm-dim">rough estimate · ~$38/hr blended</div>
            </div>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-warm-mist">
          <span className="text-warm-white">{goal.label}:</span> {goal.line}{" "}
          These are rough estimates from your answers — assuming a blended ~$38/hr and that about
          half of manual time is realistically automatable. A starting picture, not a bill. Here&apos;s
          where the time is hiding and what to do about it.
        </p>
        {note ? (
          <div className="mt-5 rounded-2xl border border-edge bg-graphite/60 p-4">
            <div className="text-[0.62rem] font-semibold tracking-[0.14em] text-warm-dim uppercase">
              In your words
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-warm-mist">&ldquo;{note}&rdquo;</p>
          </div>
        ) : null}
      </div>

      {/* Maturity breakdown */}
      <div className="surface rounded-[2rem] p-7">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
          <Layers className="h-4 w-4 text-cyan-core" aria-hidden /> Where you stand today
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {DIMENSION_ORDER.map((d, i) => (
            <ScoreBar
              key={d}
              label={DIMENSION_LABELS[d]}
              note={DIMENSION_NOTE[d]}
              value={dx.scores[d]}
              i={i}
            />
          ))}
        </div>
      </div>

      {/* Opportunities & risks — the intelligence layer */}
      {topPatterns.length > 0 ? (
        <div className="surface rounded-[2rem] p-7">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
            <Sparkles className="h-4 w-4 text-cyan-core" aria-hidden /> What we spotted
          </div>
          <p className="mt-2 text-sm leading-relaxed text-warm-mist">
            We matched your answers against the patterns we see most often across businesses like
            yours. Several can be true at once — each is ranked by how strongly your answers match it.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {topPatterns.map((p, i) => (
              <PatternCard key={p.id} p={p} i={i} />
            ))}
          </div>
        </div>
      ) : null}

      {/* Where AI fits */}
      <div className="surface rounded-[2rem] p-7">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
          <Cpu className="h-4 w-4 text-cyan-core" aria-hidden /> Where AI fits in {industryLabel(dx.industry).toLowerCase()}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-edge bg-graphite/60 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-cyan-soft uppercase">
              <Bot className="h-4 w-4" aria-hidden /> AI that would help
            </div>
            <ul className="mt-3 space-y-2">
              {ind.aiFit.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-edge bg-graphite/60 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-gold-soft uppercase">
              <Wrench className="h-4 w-4" aria-hidden /> Automations to put in place
            </div>
            <ul className="mt-3 space-y-2">
              {ind.automations.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Security & compliance note (only when relevant) */}
      {showSecurity ? (
        <div className="rounded-[2rem] border border-alert/25 bg-alert/[0.06] p-7">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-alert uppercase">
            <Shield className="h-4 w-4" aria-hidden /> Because you handle sensitive data
          </div>
          <p className="mt-3 leading-relaxed text-warm-mist">
            You told us you handle{" "}
            {dx.dataSensitivity === "regulated" ? "regulated" : "sensitive client"} data. That raises
            the stakes on every automation — it has to be built to protect that information, not just
            move it faster. As a service-disabled veteran-owned firm, security hardening and
            compliance readiness (HIPAA, NIST/CMMC, SOC 2, PCI) are core to how BSTS works, so
            speed and safety come together rather than trading off.
          </p>
        </div>
      ) : null}

      {/* Where to start */}
      <div className="surface rounded-[2rem] p-7">
        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-warm-dim uppercase">
          <Target className="h-4 w-4 text-cyan-core" aria-hidden /> Where to start
        </div>
        <ol className="mt-4 space-y-3">
          {actions.map((a, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan-core/40 text-xs font-semibold text-cyan-core">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-warm-mist">{a}</span>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-2">
          {ind.tools.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-graphite/60 px-3 py-1 text-xs text-warm-mist"
            >
              <Wrench className="h-3 w-3 text-warm-dim" aria-hidden /> {t}
            </span>
          ))}
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
              Your results are on their way to BSTS. We&apos;ll turn this into a concrete plan —
              what to automate first, where AI fits, and the ROI — and reply, usually within one
              business day.
            </p>
          </div>
        ) : (
          <>
            <h3 className="display text-xl text-warm-white">
              Get the plan to reclaim those {dx.hoursPerWeek} hours.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-warm-mist">
              Send your results and BSTS will map the exact automations and AI to put in place, in
              priority order, with the payoff for each. No obligation.
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
            <p className="mt-4 text-xs leading-relaxed text-warm-dim">
              Your results and details go straight to BSTS via our form provider (Web3Forms) — used
              only to reply to you, never sold or shared further. Nothing leaves your browser until
              you choose to send.
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}
