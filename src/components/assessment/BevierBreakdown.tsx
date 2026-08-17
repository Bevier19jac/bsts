"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ClipboardCopy, Download, Mail, RotateCcw } from "lucide-react";
import {
  CONDITION_BODY,
  CONDITION_TITLE,
  route,
  summarize,
  visibleQuestions,
  type Answers,
} from "@/lib/breakdown";
import { site, sensitiveDataNotice } from "@/lib/site";
import { soc2Boundary } from "@/lib/content/positioning";

const contactEmail = site.contactEmail;
const formKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "4a21a788-0e18-450a-a32a-5b3cae2c8986";

const field =
  "w-full rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-core";

type Stage = "questions" | "review" | "result";

export function BevierBreakdown() {
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("questions");
  const [contact, setContact] = useState({ name: "", email: "", organization: "", note: "" });
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const asked = useMemo(() => visibleQuestions(answers), [answers]);
  const result = useMemo(() => route(answers), [answers]);
  const current = asked[Math.min(index, asked.length - 1)];
  const learned = useMemo(
    () =>
      asked
        .filter((q) => answers[q.id] !== undefined)
        .map((q) => {
          const v = answers[q.id];
          const label = (val: string) => q.choices.find((c) => c.value === val)?.label ?? val;
          const shown = Array.isArray(v) ? v.map(label).join(", ") : label(String(v));
          const unsure = Array.isArray(v) ? v.includes("not_sure") : v === "not_sure";
          return { id: q.id, section: q.section, shown, unsure };
        }),
    [answers, asked],
  );

  function choose(qid: string, value: string, kind: "one" | "many") {
    setAnswers((prev) => {
      if (kind === "one") return { ...prev, [qid]: value };
      const cur = Array.isArray(prev[qid]) ? (prev[qid] as string[]) : [];
      let next: string[];
      if (value === "none" || value === "not_sure") next = cur.includes(value) ? [] : [value];
      else
        next = cur.includes(value)
          ? cur.filter((x) => x !== value)
          : [...cur.filter((x) => x !== "none" && x !== "not_sure"), value];
      return { ...prev, [qid]: next };
    });
  }

  const answered = current ? answers[current.id] !== undefined &&
    (!Array.isArray(answers[current.id]) || (answers[current.id] as string[]).length > 0) : false;

  const summary = () => summarize(answers, result, contact);

  async function send() {
    if (!contact.name.trim() || !/^\S+@\S+\.\S+$/.test(contact.email) || !contact.organization.trim()) {
      setSendState("error");
      return;
    }
    setSendState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: formKey,
          subject: `Bevier Breakdown — ${contact.organization}`,
          from_name: contact.name,
          email: contact.email,
          message: summary(),
          botcheck: false,
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      setSendState(res.ok && json.success ? "sent" : "error");
    } catch {
      setSendState("error");
    }
  }

  function download() {
    const blob = new Blob([summary()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "your-bevier-breakdown.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copy() {
    await navigator.clipboard.writeText(summary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setStage("questions");
    setSendState("idle");
  }

  /* ------------------------------------------------------------------ */

  const progress =
    stage === "questions"
      ? Math.round((index / (asked.length + 1)) * 100)
      : stage === "review"
        ? 92
        : 100;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
      <div className="surface rounded-[2rem] p-6 sm:p-9">
        <div className="h-1.5 overflow-hidden rounded-full bg-edge/60" aria-hidden>
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-core to-gold-core transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          {stage === "questions" && current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-7"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-gold-core uppercase">
                {current.section} · {index + 1} of {asked.length}
              </p>
              <h3 className="mt-2 text-2xl leading-snug text-warm-white sm:text-3xl">
                {current.prompt}
              </h3>
              {current.help ? (
                <p className="mt-3 text-sm leading-relaxed text-warm-dim">{current.help}</p>
              ) : null}

              <div className="mt-6 flex flex-col gap-2.5">
                {current.choices.map((c) => {
                  const v = answers[current.id];
                  const on = Array.isArray(v) ? v.includes(c.value) : v === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => choose(current.id, c.value, current.kind)}
                      aria-pressed={on}
                      className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                        on
                          ? "border-gold-core/80 bg-gold-core/10 text-warm-white"
                          : "border-edge bg-graphite text-warm-mist hover:border-cyan-core/60 hover:text-warm-white"
                      }`}
                    >
                      <span className="block text-[0.975rem] leading-snug">{c.label}</span>
                      {c.hint ? (
                        <span className="mt-1 block text-xs text-warm-dim">{c.hint}</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => (index === 0 ? undefined : setIndex(index - 1))}
                  disabled={index === 0}
                  className="btn-ghost-form disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                </button>
                <button
                  type="button"
                  disabled={!answered}
                  onClick={() =>
                    index + 1 >= asked.length ? setStage("review") : setIndex(index + 1)
                  }
                  className="btn-primary-form px-6 py-3 disabled:opacity-40"
                >
                  {index + 1 >= asked.length ? "See what we found" : "Continue"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
                <span className="text-xs text-warm-dim">
                  {current.kind === "many" ? "Choose any that apply" : "Choose one"}
                </span>
              </div>
            </motion.div>
          )}

          {stage === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-7"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-gold-core uppercase">
                Before we show you anything
              </p>
              <h3 className="mt-2 text-2xl leading-snug text-warm-white sm:text-3xl">
                Here&rsquo;s what we understood. Fix anything we got wrong.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-dim">
                Confirming means we heard you correctly. It is not verification by BSTS.
              </p>
              <ul className="mt-6 space-y-2.5">
                {learned.map((l, i) => (
                  <li
                    key={l.id}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-edge bg-graphite px-5 py-3.5"
                  >
                    <div>
                      <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-warm-dim uppercase">
                        {l.section}
                      </p>
                      <p className="mt-0.5 text-sm text-warm-white">{l.shown}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIndex(i);
                        setStage("questions");
                      }}
                      className="shrink-0 rounded-full border border-edge px-3 py-1 text-xs text-cyan-soft hover:border-cyan-core/70"
                    >
                      Change
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIndex(asked.length - 1);
                    setStage("questions");
                  }}
                  className="btn-ghost-form"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                </button>
                <button type="button" onClick={() => setStage("result")} className="btn-primary-form px-6 py-3">
                  That&rsquo;s right — show my Breakdown
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </motion.div>
          )}

          {stage === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-7"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-cyan-core/15 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-cyan-soft uppercase">
                  Your Bevier Breakdown
                </span>
                {result.overlay === "controlled" && (
                  <span className="rounded-full bg-gold-core/20 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-gold-soft uppercase">
                    Controlled environment
                  </span>
                )}
                {result.overlay === "heightened" && (
                  <span className="rounded-full bg-gold-core/15 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-gold-soft uppercase">
                    Heightened handling
                  </span>
                )}
                <span className="rounded-full border border-edge px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-warm-dim uppercase">
                  Confidence {result.confidence}
                </span>
              </div>

              <h3 className="mt-4 text-3xl leading-tight text-warm-white">
                {result.coPrimary
                  ? "Two things are true about your organization"
                  : result.primary
                    ? CONDITION_TITLE[result.primary]
                    : "We don't have enough to route you yet"}
              </h3>

              <div className="mt-4 space-y-4 text-[0.975rem] leading-relaxed text-warm-mist">
                {result.primary ? (
                  <p>{CONDITION_BODY[result.primary]}</p>
                ) : (
                  <p>
                    That is a useful result, not a dead end — it means the honest next step is a
                    conversation rather than a generated roadmap.
                  </p>
                )}
                {result.coPrimary && result.secondary ? (
                  <p>{CONDITION_BODY[result.secondary]}</p>
                ) : null}
              </div>

              {result.overlay === "controlled" && (
                <p className="mt-5 rounded-2xl border border-gold-core/40 bg-gold-core/5 px-5 py-4 text-sm leading-relaxed text-gold-soft">
                  You reported controlled information, so this stops short of a self-service roadmap
                  on purpose. Nothing here is guidance for handling that information — the next step
                  is a formal discovery conversation, with your contract in hand.
                </p>
              )}
              {result.overlay === "heightened" && (
                <p className="mt-5 rounded-2xl border border-gold-core/30 bg-gold-core/5 px-5 py-4 text-sm leading-relaxed text-gold-soft">
                  Your environment may require additional data-handling, access and requirement
                  validation before implementation recommendations are finalized.
                </p>
              )}

              {result.platforms.length > 0 && (
                <Block title="What you already have that we'd reuse">
                  <p className="text-sm leading-relaxed text-warm-mist">
                    We would look at {result.platforms.join(", ")} before recommending anything new.
                    The question is whether what you own can securely and reasonably support the
                    work — not whether something newer exists.
                  </p>
                </Block>
              )}

              <Block title="What's in the way">
                <ul className="space-y-2">
                  {result.gaps.map((g) => (
                    <li key={g} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core" />
                      {g}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Practical first moves">
                <ul className="space-y-2">
                  {result.moves.map((m) => (
                    <li key={m} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core" />
                      {m}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Your preliminary roadmap">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Discover", "Confirm what's actually true — systems, access, ownership, information."],
                    ["Implement", "Build or connect only what discovery justifies, with human checkpoints."],
                    ["Govern", "Rules, owners, and review that survive you being busy."],
                    ["Assure", "Evidence you can hand to a customer, auditor, or regulator."],
                  ].map(([t, d]) => (
                    <div key={t} className="rounded-2xl border border-edge bg-graphite p-4">
                      <p className="text-sm font-semibold text-warm-white">{t}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-warm-dim">{d}</p>
                    </div>
                  ))}
                </div>
              </Block>

              <Block title="Recommended next step">
                <p className="text-sm leading-relaxed text-warm-white">{result.engagement}</p>
                <p className="mt-1.5 text-sm text-gold-soft">
                  {result.priceLine} &ldquo;Begins at&rdquo; is a floor, not an estimate.
                </p>
              </Block>

              <details className="mt-6 rounded-2xl border border-edge bg-graphite/60 p-5">
                <summary className="cursor-pointer text-sm font-semibold text-cyan-soft">
                  Why you got this result
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-warm-dim">
                  Every result is traceable. This is the scoring that ran — no black box.
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-4 text-[0.7rem] leading-relaxed text-warm-dim">
{result.trace.join("\n")}
{"\n"}{"—".repeat(34)}
{"\n"}totals   {(Object.keys(result.points) as Array<keyof typeof result.points>).map((c) => `${c}:${result.points[c]}`).join("   ")}
{"\n"}eligible {result.eligible.join(", ") || "none — insufficient evidence to route"}
                </pre>
              </details>

              {/* Contact — asked only here, and only if they want a reply */}
              <div className="mt-8 rounded-[1.5rem] border border-edge bg-graphite/70 p-6">
                <h4 className="text-lg text-warm-white">Want a human reaction to this?</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-warm-dim">
                  Nothing has been sent. Send it over and you&rsquo;ll get a short, concrete reply —
                  including whether BSTS is the wrong fit.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <input
                    className={field}
                    placeholder="Your name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  />
                  <input
                    className={field}
                    placeholder="Email"
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                  <input
                    className={field}
                    placeholder="Organization"
                    value={contact.organization}
                    onChange={(e) => setContact({ ...contact, organization: e.target.value })}
                  />
                </div>
                <textarea
                  className={`${field} mt-3 min-h-[5rem]`}
                  placeholder="Anything you want to add? (optional)"
                  value={contact.note}
                  onChange={(e) => setContact({ ...contact, note: e.target.value })}
                />
                <p className="mt-2 text-xs leading-relaxed text-warm-dim">{sensitiveDataNotice}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={send} className="btn-primary-form px-6 py-3">
                    {sendState === "sending" ? "Sending…" : sendState === "sent" ? "Sent" : "Send to BSTS"}
                    {sendState === "sent" ? (
                      <Check className="h-4 w-4" aria-hidden />
                    ) : (
                      <Mail className="h-4 w-4" aria-hidden />
                    )}
                  </button>
                  <button type="button" onClick={copy} className="btn-ghost-form">
                    <ClipboardCopy className="h-4 w-4" aria-hidden /> {copied ? "Copied" : "Copy"}
                  </button>
                  <button type="button" onClick={download} className="btn-ghost-form">
                    <Download className="h-4 w-4" aria-hidden /> Download
                  </button>
                  <button type="button" onClick={restart} className="btn-ghost-form">
                    <RotateCcw className="h-4 w-4" aria-hidden /> Start over
                  </button>
                </div>
                {sendState === "error" && (
                  <p className="mt-3 text-sm text-gold-soft">
                    That didn&rsquo;t go through. Check the three fields above, or email{" "}
                    <a className="underline underline-offset-4" href={`mailto:${contactEmail}`}>
                      {contactEmail}
                    </a>{" "}
                    directly.
                  </p>
                )}
                {sendState === "sent" && (
                  <p className="mt-3 text-sm text-cyan-soft">
                    Got it. You&rsquo;ll hear back from Jacob directly.
                  </p>
                )}
              </div>

              <p className="mt-6 text-xs leading-relaxed text-warm-dim">
                <strong className="text-warm-mist">This is a preliminary result.</strong> It reflects
                what you told us in a few minutes — not an audit, not a compliance determination, and
                not a price. It must be validated before implementation, pricing, or compliance
                decisions. {soc2Boundary}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* What we've learned */}
      <aside className="surface-quiet rounded-[1.75rem] p-6 lg:sticky lg:top-32">
        <h4 className="text-xs font-semibold tracking-[0.16em] text-cyan-soft uppercase">
          What we&rsquo;ve learned
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-warm-dim">
          Builds as you answer. Nothing is guessed.
        </p>
        <ul className="mt-4 space-y-2.5">
          {learned.length === 0 ? (
            <li className="text-xs leading-relaxed text-warm-dim">
              Your first answer starts the picture.
            </li>
          ) : (
            learned.map((l) => (
              <li
                key={l.id}
                className={`rounded-r-xl border-l-2 py-2 pl-3 ${
                  l.unsure ? "border-gold-core bg-gold-core/5" : "border-cyan-core/70 bg-cyan-core/5"
                }`}
              >
                <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-warm-dim uppercase">
                  {l.section}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-warm-mist">{l.shown}</p>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h4 className="text-xs font-semibold tracking-[0.16em] text-gold-core uppercase">{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}
