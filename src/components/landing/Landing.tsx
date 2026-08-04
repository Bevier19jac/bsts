"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { PointerHalo } from "@/components/marketing/PointerHalo";
import { SystemsDiagram } from "@/components/marketing/SystemsDiagram";
import { TankEmblem } from "@/components/ui/TankEmblem";
import { TracerRule } from "@/components/ui/TracerRule";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";
import { pillars } from "@/lib/content/pillars";
import { methodStages } from "@/lib/content/method";
import { founder } from "@/lib/content/founder";
import { solara, solaraLabel } from "@/lib/content/solara";
import { frameworkDisclaimer, site } from "@/lib/site";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "method", label: "How we work" },
  { id: "about", label: "About" },
  { id: "assessment", label: "Assessment" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function isTabId(v: string): v is TabId {
  return TABS.some((t) => t.id === v);
}

export function Landing() {
  const [tab, setTab] = useState<TabId>("overview");
  const panelRef = useRef<HTMLDivElement>(null);

  // Sync with the URL hash so header/footer links and shared URLs land on
  // the right tab (e.g. /#assessment).
  useEffect(() => {
    const applyHash = (scroll: boolean) => {
      const h = window.location.hash.replace("#", "");
      if (isTabId(h)) {
        setTab(h);
        if (scroll) {
          panelRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
        }
      }
    };
    applyHash(false);
    const onHashChange = () => applyHash(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const select = useCallback((id: TabId) => {
    setTab(id);
    // Keep the URL shareable without adding history entries per click.
    window.history.replaceState(null, "", `#${id}`);
    panelRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  return (
    <>
      <PointerHalo />

      {/* Compact hero */}
      <section className="relative isolate overflow-hidden">
        <Atmosphere />
        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-10 text-center sm:pt-14">
          <Reveal>
            <p className="eyebrow">Boutique technology transformation · Secure AI</p>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="mt-4 inline-block rounded-full border border-gold-core/45 bg-gold-faint px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] text-gold-soft">
              U.S. ARMY VETERAN-OWNED &amp; LED · SDVOSB CERTIFICATION IN PROGRESS
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mx-auto mt-5 max-w-3xl text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Technology built around{" "}
              <span className="text-cyan-soft">your business.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-warm-mist">
              {site.subline} One page tells the whole story — and the
              assessment that starts the work is right here on it.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gold-soft">
              {site.promise}
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            {/* The tank fires; its tracer becomes the rule under the headline. */}
            <div className="mx-auto mt-7 flex max-w-2xl items-start px-2">
              <TankEmblem className="h-16 w-auto shrink-0" />
              <div className="tracer-line mt-[26px] min-w-0 flex-1" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={() => select("assessment")} className="btn-primary-form px-7 py-3 text-base">
                Start the assessment <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={() => select("services")} className="btn-ghost-form">
                See what we do
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tab bar */}
      <div ref={panelRef} className="sticky top-20 z-40 scroll-mt-24 px-4">
        <div
          role="tablist"
          aria-label="Page sections"
          className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-1.5 rounded-full border border-edge/70 bg-obsidian/85 p-1.5 backdrop-blur-xl"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => select(t.id)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                tab === t.id
                  ? t.id === "assessment"
                    ? "bg-cyan-core font-medium text-obsidian-deep"
                    : "bg-graphite-2 text-cyan-soft"
                  : "text-warm-mist hover:text-warm-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "overview" ? <OverviewPanel select={select} /> : null}
            {tab === "services" ? <ServicesPanel select={select} /> : null}
            {tab === "method" ? <MethodPanel select={select} /> : null}
            {tab === "about" ? <AboutPanel select={select} /> : null}
            {tab === "assessment" ? <AssessmentPanel /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function PanelCta({
  select,
  label = "Start the assessment",
}: {
  select: (id: TabId) => void;
  label?: string;
}) {
  return (
    <div className="mt-12 text-center">
      <button
        type="button"
        onClick={() => select("assessment")}
        className="btn-primary-form px-7 py-3 text-base"
      >
        {label} <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

/* ------------------------------ Overview ------------------------------ */

function OverviewPanel({ select }: { select: (id: TabId) => void }) {
  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="display text-3xl text-warm-white sm:text-4xl">
            Your existing systems are an asset, not an embarrassment.
          </h2>
          <TracerRule />
          <p className="mt-5 leading-relaxed text-warm-mist">
            Most consultancies earn their keep by convincing you to start
            over. We earn ours by making what you already own work harder —
            connecting it, automating around it, and securing it. Replacement
            is a last resort, recommended only with a written reason.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "No rip-and-replace reflex — every recommendation carries a reason",
              "Connection and automation land in weeks, not quarters",
              "No licenses sold, no vendor commissions taken",
            ].map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <Surface blob="a" className="grain relative overflow-hidden p-6 sm:p-8">
          <SystemsDiagram className="h-auto w-full" />
        </Surface>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.slug} delay={staggerDelay(i)}>
              <button
                type="button"
                onClick={() => select("services")}
                className="surface-quiet blob-b block h-full w-full p-5 text-left transition-colors hover:border-cyan-core/50"
              >
                <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-warm-white">{p.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-warm-dim">
                  {p.promiseLine}
                </p>
              </button>
            </Reveal>
          );
        })}
      </div>

      <PanelCta select={select} />
    </div>
  );
}

/* ------------------------------ Services ------------------------------ */

function ServicesPanel({ select }: { select: (id: TabId) => void }) {
  return (
    <div>
      <div className="space-y-6">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.slug} delay={staggerDelay(Math.min(i, 2))}>
              <Surface blob={(["a", "b", "c"] as const)[i % 3]} className="grid grid-cols-1 gap-6 p-7 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-cyan-faint p-2">
                      <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                    </span>
                    <h2 className="text-lg font-semibold text-warm-white">{p.title}</h2>
                  </div>
                  <p className="mt-1.5 text-xs tracking-[0.14em] text-gold-soft uppercase">
                    {p.promiseLine}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-warm-mist">{p.detail}</p>
                </div>
                <div className="surface-quiet rounded-3xl p-5">
                  <h3 className="text-[0.65rem] font-semibold tracking-[0.16em] text-warm-dim uppercase">
                    Typical work
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {p.examples.map((ex) => (
                      <li key={ex} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </Surface>
            </Reveal>
          );
        })}
      </div>

      {/* Solara concept — labeled */}
      <Reveal delay={0.1}>
        <div className="mt-12">
          <p className="inline-block rounded-full border border-gold-core/40 bg-gold-faint px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-gold-soft">
            {solaraLabel}
          </p>
          <Surface quiet blob="c" className="mt-4 p-7 sm:p-8">
            <h2 className="display text-2xl text-warm-white">
              What it looks like in practice: {solara.name}.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-warm-mist">
              {solara.descriptor}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {solara.moves.map((m) => (
                <div key={m.lane} className="rounded-2xl border border-edge/50 p-4">
                  <span className="rounded-full bg-cyan-faint px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.14em] text-cyan-soft uppercase">
                    {m.lane}
                  </span>
                  <p className="mt-2 text-sm font-medium text-warm-white">{m.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-warm-dim">{m.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-warm-dim">{solara.after.honesty}</p>
          </Surface>
        </div>
      </Reveal>

      <PanelCta select={select} />
    </div>
  );
}

/* ------------------------------ Method + Security ------------------------------ */

function MethodPanel({ select }: { select: (id: TabId) => void }) {
  return (
    <div>
      <h2 className="display text-3xl text-warm-white sm:text-4xl">
        Five stages. A working pilot by week six.
      </h2>
      <TracerRule />
      <p className="mt-4 max-w-3xl leading-relaxed text-warm-mist">
        No black-box discovery phases, no strategy decks that never ship. The
        method is public because we are happy to be held to it — and the
        assessment on this page is genuinely stage one.
      </p>

      <ol className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-5">
        {methodStages.map((stage, i) => (
          <Reveal as="li" key={stage.number} delay={staggerDelay(i)}>
            <div className="surface-quiet blob-b h-full p-6">
              <p className="display text-2xl text-gold-soft">{stage.number}</p>
              <h3 className="mt-2 font-semibold text-warm-white">{stage.name}</h3>
              <p className="text-xs text-warm-dim">{stage.duration}</p>
              <p className="mt-3 text-sm leading-relaxed text-warm-mist">{stage.summary}</p>
              <p className="mt-4 border-t border-edge/40 pt-3 text-xs leading-relaxed text-warm-dim">
                <span className="font-semibold text-gold-soft">You receive: </span>
                {stage.deliverable}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="display text-2xl text-warm-white sm:text-3xl">
            Security first, honestly stated.
          </h2>
          <p className="mt-4 leading-relaxed text-warm-mist">
            Our practice is NIST-aligned and informed by NIST CSF 2.0, OWASP
            secure-development guidance, and Zero Trust principles. For teams
            headed toward SOC 2, we provide readiness support — and we are
            precise that readiness is not certification.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Identity, access, and least-privilege review on every engagement",
              "Encryption in transit and at rest as a default, not an upsell",
              "A written incident-response starting point your team has actually read",
              "Responsible AI boundaries: private data stays private, humans approve actions",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Surface blob="c" className="h-fit p-7">
          <h3 className="text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase">
            Plain-language claims policy
          </h3>
          <dl className="mt-4 space-y-4 text-sm">
            {[
              ["We say", "NIST-aligned · SOC 2 readiness support · OWASP-informed"],
              ["We never say", "certified · compliant · government approved · guaranteed secure"],
              ["Because", "framework references describe our methodology — they do not imply certification, endorsement, or an audit opinion."],
            ].map(([term, def]) => (
              <div key={term}>
                <dt className="font-semibold text-gold-soft">{term}</dt>
                <dd className="mt-1 leading-relaxed text-warm-mist">{def}</dd>
              </div>
            ))}
          </dl>
        </Surface>
      </div>

      <PanelCta select={select} label="Start stage one now" />
    </div>
  );
}

/* ------------------------------ About ------------------------------ */

function AboutPanel({ select }: { select: (id: TabId) => void }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="display text-3xl text-warm-white sm:text-4xl">
            Led by a practitioner, not a sales team.
          </h2>
          <TracerRule />
          <div className="mt-6 space-y-5">
            {founder.narrative.map((para, i) => (
              <Reveal key={i} delay={staggerDelay(i, 0.06)}>
                <p className="leading-relaxed text-warm-mist">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Surface blob="a" className="h-fit p-7">
          <p className="font-semibold text-warm-white">{founder.name}</p>
          <p className="text-sm text-warm-dim">{founder.role}</p>
          <ul className="mt-4 space-y-2.5">
            {[...founder.credentials, ...founder.experience].map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-edge/50 pt-4 text-xs leading-relaxed text-warm-dim">
            Federal experience described here does not imply endorsement by any
            government agency.
          </p>
        </Surface>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {founder.principles.map((p, i) => (
          <Reveal key={p.title} delay={staggerDelay(i % 2)}>
            <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-7">
              <p className="display text-lg text-gold-soft">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-semibold text-warm-white">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">{p.body}</p>
            </Surface>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-sm text-warm-dim">
          Curious how we run engagements internally?{" "}
          <Link href="/os" className="text-cyan-soft underline underline-offset-4 hover:text-cyan-core">
            Explore the BSTS OS demo
          </Link>{" "}
          — fictional data, fully interactive.
        </p>
      </Reveal>

      <PanelCta select={select} />
    </div>
  );
}

/* ------------------------------ Assessment ------------------------------ */

function AssessmentPanel() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="display text-center text-3xl text-warm-white sm:text-4xl">
        The technology assessment.
      </h2>
      <TracerRule className="mx-auto mt-4 max-w-[14rem]" />
      <p className="mt-4 text-center leading-relaxed text-warm-mist">
        Ten minutes, no jargon required. Your answers are processed in your
        browser and are not transmitted anywhere until you explicitly choose
        to send them. Even if we never speak, answering these questions tends
        to clarify what your stack actually needs.
      </p>
      <div className="mt-8">
        <AssessmentForm />
      </div>
      <p className="mt-6 text-center text-xs leading-relaxed text-warm-dim">
        {frameworkDisclaimer}
      </p>
    </div>
  );
}
