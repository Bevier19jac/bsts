"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { PointerHalo } from "@/components/marketing/PointerHalo";
import { SystemsDiagram } from "@/components/marketing/SystemsDiagram";
import { FiringSequence } from "@/components/marketing/FiringSequence";
import { IdentityLockup } from "@/components/brand/IdentityLockup";
import { TracerRule } from "@/components/ui/TracerRule";
import { BevierBreakdown } from "@/components/assessment/BevierBreakdown";
import { founder } from "@/lib/content/founder";
import { solara, solaraLabel } from "@/lib/content/solara";
import {
  aiApproach,
  assuranceVision,
  engagementNote,
  engagementStages,
  forceMultiplier,
  idealClient,
  serviceAreas,
  soc2Boundary,
  strategicSummary,
  triggers,
} from "@/lib/content/positioning";
import {
  federalDisclaimer,
  frameworkDisclaimer,
  offers,
  site,
  vetCert,
} from "@/lib/site";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "What we do" },
  { id: "about", label: "About" },
  { id: "assessment", label: "The Breakdown" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function isTabId(v: string): v is TabId {
  return TABS.some((t) => t.id === v);
}

/**
 * Accent rotation for the three service areas — cyan, gold, cyan.
 * Class strings are written out in full (never composed at runtime) so
 * Tailwind's static scanner generates every variant used here.
 */
const AREA_ACCENT = [
  {
    text: "text-cyan-core",
    soft: "text-cyan-soft",
    bg: "bg-cyan-faint",
    dot: "bg-cyan-core",
    hover: "hover:border-cyan-core/50",
    radius: "blob-a",
  },
  {
    text: "text-gold-core",
    soft: "text-gold-soft",
    bg: "bg-gold-faint",
    dot: "bg-gold-core",
    hover: "hover:border-gold-core/50",
    radius: "blob-b",
  },
  {
    text: "text-cyan-core",
    soft: "text-cyan-soft",
    bg: "bg-cyan-faint",
    dot: "bg-cyan-core",
    hover: "hover:border-cyan-core/50",
    radius: "blob-c",
  },
] as const;

export function Landing() {
  const [tab, setTab] = useState<TabId>("overview");
  const panelRef = useRef<HTMLDivElement>(null);
  // Non-sticky scroll anchor: the tab bar itself is position:sticky, so its
  // rect sits near the viewport top once stuck and scrollIntoView on it
  // becomes a no-op — leaving the visitor stranded mid-page on tab switch.
  const anchorRef = useRef<HTMLDivElement>(null);

  // Scroll to the top of the tab panel — but only AFTER the newly selected
  // panel has been committed and laid out. Scrolling synchronously in the
  // click handler raced the re-render: switching from a long panel to a
  // shorter one collapsed the page height mid-scroll, the browser clamped
  // the position to the new maximum, and the visitor landed at the bottom
  // of the page instead of the top of the panel. Two animation frames put
  // us safely on the far side of React's commit and the browser's layout.
  const scrollToPanel = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        anchorRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    });
  }, []);

  // Sync with the URL hash so header/footer links and shared URLs land on
  // the right tab (e.g. /#assessment).
  useEffect(() => {
    const applyHash = (scroll: boolean) => {
      const h = window.location.hash.replace("#", "");
      if (h === "method") {
        // "How we work" lives on its own page now.
        window.location.replace("/method/");
        return;
      }
      if (isTabId(h)) {
        setTab(h);
        if (scroll) {
          scrollToPanel();
        }
      }
    };
    applyHash(false);
    const onHashChange = () => applyHash(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [scrollToPanel]);

  const select = useCallback((id: TabId) => {
    setTab(id);
    // Keep the URL shareable without adding history entries per click.
    window.history.replaceState(null, "", `#${id}`);
    // replaceState doesn't fire hashchange — notify listeners (header nav
    // highlights the active section from this).
    window.dispatchEvent(new Event("hashchange"));
    scrollToPanel();
  }, [scrollToPanel]);

  return (
    <>
      <PointerHalo />

      {/* Compact hero */}
      <section className="relative isolate overflow-hidden">
        <Atmosphere />
        <div className="relative mx-auto max-w-6xl px-6 pt-5 pb-8 text-center sm:pt-6 lg:pt-3">
          <Reveal>
            <p className="eyebrow">{site.subline}</p>
          </Reveal>
          {/* The printed cover, on screen. Geometry and provenance live in
              components/brand/lockup.ts. */}
          <Reveal delay={0.04}>
            <div className="mt-2 sm:mt-3">
              <IdentityLockup size="hero" priority />
            </div>
          </Reveal>

          {/* The strategic line — the company in three sentences. */}
          <Reveal delay={0.16}>
            <h1 className="display mx-auto mt-2 max-w-3xl text-[1.9rem] leading-[1.08] sm:text-[2.5rem] lg:text-[2.75rem]">
              <span className="block text-warm-white">Secure the data.</span>
              <span className="block text-cyan-soft">Enable the AI.</span>
              <span className="block text-gold-soft">Prove the controls.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-warm-mist sm:text-[1.0625rem]">
              {strategicSummary}
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => select("assessment")}
                className="btn-primary-form px-7 py-3 text-base"
              >
                Start the Bevier Breakdown <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={() => select("services")} className="btn-ghost-form">
                Explore Capabilities
              </button>
            </div>
          </Reveal>
          {/* The veteran line sits under the calls to action, where the
              brochure back panel puts it — credibility that supports the
              offer rather than competing with the identity block. */}
          <Reveal delay={0.34}>
            <p className="mt-5 inline-block rounded-full border border-gold-core/45 bg-gold-faint px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] text-gold-soft uppercase">
              {vetCert.badge}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Non-sticky scroll target for tab switches */}
      <div ref={anchorRef} aria-hidden className="h-0 scroll-mt-24" />
      {/* Tab bar — sits flush under the header when stuck, with an
          unmistakable filled pill on the active section. */}
      <div ref={panelRef} className="sticky top-[4.35rem] z-40 px-4">
        <div
          role="tablist"
          aria-label="Page sections"
          className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-1.5 rounded-full border border-edge/70 bg-obsidian/90 p-1.5 shadow-[0_10px_34px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => {
                // Roving-focus arrow navigation per the WAI-ARIA tabs pattern.
                const order = TABS.map((x) => x.id);
                let target: TabId | null = null;
                if (e.key === "ArrowRight") target = order[(i + 1) % order.length];
                if (e.key === "ArrowLeft")
                  target = order[(i - 1 + order.length) % order.length];
                if (e.key === "Home") target = order[0];
                if (e.key === "End") target = order[order.length - 1];
                if (target) {
                  e.preventDefault();
                  select(target);
                  document.getElementById(`tab-${target}`)?.focus();
                }
              }}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                tab === t.id
                  ? "bg-cyan-core font-semibold text-obsidian-deep"
                  : "text-warm-mist hover:text-warm-white"
              }`}
            >
              {t.label}
            </button>
          ))}
          <a
            href="/method/"
            className="rounded-full px-4 py-2 text-sm text-warm-mist transition-colors hover:text-warm-white"
          >
            How we work
          </a>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tab === "overview" ? <OverviewPanel select={select} /> : null}
            {tab === "services" ? <ServicesPanel select={select} /> : null}
            {tab === "about" ? <AboutPanel select={select} /> : null}
            {tab === "assessment" ? <AssessmentPanel /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

/* ---------------------------- Shared blocks ---------------------------- */

/** The three service areas as primary cards — the 10-second explanation. */
function ServiceCards({ select }: { select: (id: TabId) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {serviceAreas.map((a, i) => {
        const Icon = a.icon;
        const accent = AREA_ACCENT[i];
        return (
          <Reveal key={a.slug} delay={staggerDelay(i)}>
            <button
              type="button"
              onClick={() => select("services")}
              className={`surface ${accent.radius} ${accent.hover} flex h-full w-full flex-col p-7 text-left transition-colors`}
            >
              <span className={`w-fit rounded-full ${accent.bg} p-2.5`}>
                <Icon className={`h-6 w-6 ${accent.text}`} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-warm-white">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-warm-mist">
                {a.cardLine}
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${accent.soft}`}
              >
                What this looks like
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}

/**
 * "You may need BSTS if…" — the recognition section.
 *
 * This is written entirely in the client's voice on purpose. A referral
 * partner who does not understand AI engineering should still be able to
 * recognize one of these sentences when a client says it out loud.
 */
function TriggerSection() {
  return (
    <section className="mt-16" aria-labelledby="triggers-heading">
      <div className="text-center">
        <p className="eyebrow">Recognize the moment</p>
        <h2
          id="triggers-heading"
          className="display mt-3 text-3xl text-warm-white sm:text-4xl"
        >
          You may need BSTS if…
        </h2>
        <TracerRule className="mx-auto mt-4 max-w-[16rem]" />
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
          These are the sentences that start almost every engagement. If one of
          them sounds like something you have said in the last six months,
          there is a conversation worth having.
        </p>
      </div>

      <ul className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
        {triggers.map((t, i) => (
          <Reveal as="li" key={t.quote} delay={staggerDelay(i % 2)}>
            <div className="surface-quiet flex h-full gap-4 rounded-[1.75rem] p-6">
              <Quote
                className="mt-0.5 h-5 w-5 shrink-0 text-gold-core/70"
                aria-hidden
              />
              <div>
                <p className="leading-relaxed text-warm-white">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-3 text-xs font-semibold tracking-[0.12em] text-cyan-soft uppercase">
                  {t.area}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <p className="text-sm text-warm-dim">
          Advising businesses like these?{" "}
          <Link
            href="/advisors"
            className="text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
          >
            The advisor field guide
          </Link>{" "}
          covers the same triggers from your side of the table.
        </p>
      </div>
    </section>
  );
}

/** DISCOVER → IMPLEMENT → GOVERN → ASSURE */
function EngagementLadder() {
  return (
    <section className="mt-16" aria-labelledby="engagement-heading">
      <div className="text-center">
        <p className="eyebrow">How engagements work</p>
        <h2
          id="engagement-heading"
          className="display mt-3 text-3xl text-warm-white sm:text-4xl"
        >
          Discover. Implement. Govern. Assure.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
          Each stage stands on its own. Most organizations start with the first
          one and decide from there — nothing here requires committing to the
          whole ladder up front.
        </p>
      </div>

      <ol className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {engagementStages.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal as="li" key={s.key} delay={staggerDelay(i)}>
              <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="display text-2xl text-gold-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-[0.1em] text-warm-white uppercase">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cyan-soft">{s.oneLine}</p>
                <p className="mt-3 text-sm leading-relaxed text-warm-mist">{s.body}</p>
              </Surface>
            </Reveal>
          );
        })}
      </ol>

      <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-warm-dim">
        {engagementNote}
      </p>
    </section>
  );
}

/** The three commercial entry points — professional, not a price menu. */
function EngagementOffers() {
  return (
    <section className="mt-16" aria-labelledby="offers-heading">
      <h2 id="offers-heading" className="display text-center text-2xl text-warm-white sm:text-3xl">
        Three ways to begin.
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-warm-mist">
        Every engagement is scoped in writing, principal-led, and measured
        against criteria agreed before work begins.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {offers.map((o, i) => (
          <Reveal key={o.slug} delay={staggerDelay(i)}>
            <Surface
              quiet
              blob={(["a", "b", "c"] as const)[i]}
              className={`flex h-full flex-col p-7 ${i === 0 ? "border-cyan-core/40" : ""}`}
            >
              <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-warm-dim uppercase">
                {o.stage}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-warm-white">{o.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cyan-soft">
                {o.positioning}
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {o.deliverables.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-edge/50 pt-4 text-sm text-gold-soft">
                {o.priceLine}
              </p>
              <Link
                href={["/method", "/solutions", "/assurance"][i] ?? "/method"}
                className="btn-ghost-form mt-4 justify-center"
              >
                How this works
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Surface>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PanelCta({
  select,
  label = "Start the Bevier Breakdown",
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
      {/* Three pillars, immediately. */}
      <ServiceCards select={select} />

      {/* Who it's for */}
      <Reveal delay={0.06}>
        <Surface quiet blob="b" className="mt-12 grid grid-cols-1 gap-6 p-7 sm:p-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h2 className="display text-2xl text-warm-white sm:text-3xl">
              {idealClient.headline}
            </h2>
            <TracerRule />
            <p className="mt-5 text-sm leading-relaxed text-warm-mist">
              {idealClient.body}
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-2.5 self-center">
            {idealClient.signals.map((s) => (
              <li key={s} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </Surface>
      </Reveal>

      <div aria-hidden className="tracer-divider mx-auto mt-16 max-w-3xl" />
      {/* The recognition section */}
      <TriggerSection />

      <div aria-hidden className="tracer-divider mx-auto mt-16 max-w-3xl" />
      {/* Force multiplier — the preserved brand idea */}
      <section className="mt-16" aria-labelledby="approach-heading">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 id="approach-heading" className="display text-3xl text-warm-white sm:text-4xl">
              {forceMultiplier.heading}
            </h2>
            <TracerRule />
            <p className="mt-5 leading-relaxed text-warm-mist">{forceMultiplier.body}</p>
            <ul className="mt-6 space-y-3">
              {forceMultiplier.commitments.map((line) => (
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
      </section>

      {/* Veteran-ownership block — wording derives from the centralized
          VetCert status in site.ts and upgrades automatically. */}
      <Reveal delay={0.08}>
        <Surface blob="b" className="mt-14 grid grid-cols-1 items-center gap-6 border-gold-core/35 p-7 sm:p-8 lg:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-4">
            <span aria-hidden className="display text-4xl text-gold-soft">★</span>
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-gold-soft uppercase">
                {vetCert.heading}
              </p>
              <p className="text-xs text-warm-dim">Principal-led · U.S.-based</p>
            </div>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-warm-mist">
              {vetCert.explanation} Discipline earned in service, applied to
              your technology.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-warm-dim">
              {federalDisclaimer}
            </p>
          </div>
        </Surface>
      </Reveal>

      <div aria-hidden className="tracer-divider mx-auto mt-16 max-w-3xl" />
      {/* The mark, explained — the tank is brand identity, not decoration. */}
      <FiringSequence />

      {/* Engagement ladder */}
      <EngagementLadder />

      <div aria-hidden className="tracer-divider mx-auto mt-16 max-w-3xl" />
      {/* Continuous assurance teaser → dedicated page */}
      <Reveal delay={0.08}>
        <Surface
          blob="c"
          className="mt-16 border-cyan-core/30 p-8 text-center sm:p-10"
        >
          <p className="eyebrow">Where this is going</p>
          <h2 className="display mx-auto mt-3 max-w-3xl text-2xl text-warm-white sm:text-3xl">
            {assuranceVision}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
            Most compliance still runs on questionnaires, spreadsheets, and
            screenshots taken the week before the audit. We think the evidence
            should come from the systems themselves — and we build toward that
            in every engagement.
          </p>
          <Link href="/assurance" className="btn-ghost-form mt-6 inline-flex">
            Where this is going: continuous assurance
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Surface>
      </Reveal>

      <EngagementOffers />

      <PanelCta select={select} />
    </div>
  );
}

/* ------------------------------ Services ------------------------------ */

function ServicesPanel({ select }: { select: (id: TabId) => void }) {
  return (
    <div>
      <div className="text-center">
        <p className="eyebrow">What we do</p>
        <h2 className="display mt-3 text-3xl text-warm-white sm:text-4xl">
          Three problems. One lifecycle.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
          Secure the data. Enable the AI. Prove the controls. These are not
          three separate products — they are the order in which the work has to
          happen for any of it to hold up.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {serviceAreas.map((a, i) => {
          const Icon = a.icon;
          const accent = AREA_ACCENT[i];
          return (
            <Reveal key={a.slug} delay={staggerDelay(Math.min(i, 2))}>
              <Surface
                id={a.slug}
                blob={(["a", "b", "c"] as const)[i % 3]}
                className="scroll-mt-32 grid grid-cols-1 gap-6 p-7 sm:p-8 lg:grid-cols-[1.2fr_1fr]"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full ${accent.bg} p-2`}>
                      <Icon className={`h-5 w-5 ${accent.text}`} aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-warm-white">{a.title}</h3>
                  </div>
                  {/* The problem in the client's own words. */}
                  <p className="mt-4 border-l-2 border-gold-core/50 pl-4 text-sm leading-relaxed text-warm-white italic">
                    &ldquo;{a.customerProblem}&rdquo;
                  </p>
                  <p className={`mt-4 text-sm font-medium leading-relaxed ${accent.soft}`}>
                    {a.positioning}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-warm-mist">{a.detail}</p>

                  {a.discipline ? (
                    <div className="mt-5 rounded-2xl border border-edge/60 bg-obsidian/40 p-5">
                      <h4 className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-soft uppercase">
                        {a.discipline.heading}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {a.discipline.items.map((q) => (
                          <li
                            key={q}
                            className="flex gap-2.5 text-sm leading-relaxed text-warm-mist"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core"
                            />
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {a.boundary ? (
                    <p className="mt-4 text-xs leading-relaxed text-warm-dim">
                      <span className="font-semibold text-warm-mist">
                        Where the line is:{" "}
                      </span>
                      {a.boundary}
                    </p>
                  ) : null}
                </div>

                <div className="surface-quiet h-fit rounded-3xl p-5">
                  <h4 className="text-[0.65rem] font-semibold tracking-[0.16em] text-warm-dim uppercase">
                    Typical work
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {a.work.map((w) => (
                      <li key={w} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                        <span
                          aria-hidden
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
                        />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </Surface>
            </Reveal>
          );
        })}
      </div>

      {/* VALUE → RISK → CONTROLS → ASSURANCE */}
      <section className="mt-16" aria-labelledby="ai-approach-heading">
        <div className="text-center">
          <p className="eyebrow">How we approach AI</p>
          <h2
            id="ai-approach-heading"
            className="display mt-3 text-3xl text-warm-white sm:text-4xl"
          >
            Value. Risk. Controls. Assurance.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
            Every AI use case runs this gate before anything reaches production.
            Skipping a step does not make the project faster — it moves the cost
            to a worse moment.
          </p>
        </div>
        <ol className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiApproach.map((s, i) => (
            <Reveal as="li" key={s.step} delay={staggerDelay(i)}>
              <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-6">
                <p className="display text-3xl text-gold-soft">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-[0.12em] text-warm-white uppercase">
                  {s.step}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-cyan-soft">
                  {s.question}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">{s.body}</p>
              </Surface>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* SOC 2 boundary, stated plainly and unmissably. */}
      <Reveal delay={0.06}>
        <Surface quiet className="mt-10 border-gold-core/30 p-6 sm:p-7">
          <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-soft uppercase">
            An important distinction
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">
            {soc2Boundary} BSTS prepares your organization for that
            examination — scoping, controls, gaps, remediation, and evidence.
            We are not a party to the auditor&apos;s opinion, and we will tell
            you plainly which parts of the process we can and cannot influence.
          </p>
        </Surface>
      </Reveal>

      <EngagementOffers />

      {/* Solara concept — labeled */}
      <Reveal delay={0.1}>
        <div className="mt-14">
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

/* ------------------------------ About ------------------------------ */

function AboutPanel({ select }: { select: (id: TabId) => void }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="display text-3xl text-warm-white sm:text-4xl">
            An unusual intersection, built on purpose.
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
          <Image
            src="/founder.webp"
            alt="Jacob Bevier, Founder & Principal of BSTS, in a navy suit"
            width={760}
            height={785}
            className="blob-b w-full border border-gold-core/30 object-cover"
          />
          <p className="mt-5 font-semibold text-warm-white">{founder.name}</p>
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

      {/* The path — technology → cybersecurity → AI → governance */}
      <Reveal delay={0.06}>
        <div className="mt-14">
          <h3 className="text-center text-xs font-semibold tracking-[0.18em] text-gold-soft uppercase">
            {founder.arc.heading}
          </h3>
          <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {founder.arc.steps.map((s, i) => (
              <li
                key={s.label}
                className="surface-quiet rounded-2xl p-5"
              >
                <p className="display text-lg text-cyan-soft">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-warm-white">{s.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-warm-dim">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
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

      {/* Service record — personal archive, treated to match the theme */}
      <Reveal delay={0.08}>
        <div className="mt-14">
          <h3 className="text-center text-xs font-semibold tracking-[0.18em] text-gold-soft uppercase">
            From the physical battlefield to the digital battleplan
          </h3>
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-start justify-center gap-6">
            {[
              { src: "/service/crew.webp", alt: "Jacob Bevier's tank crew seated in front of an M1 Abrams" },
              { src: "/service/gun-tube.webp", alt: "Jacob Bevier seated on the main gun tube of an Abrams tank in the desert" },
              { src: "/service/winter-tank.webp", alt: "Jacob Bevier on an Abrams tank in falling snow" },
            ].map((ph, i) => (
              <figure key={ph.src} className="w-[13rem]">
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  width={412}
                  height={412}
                  className={`${["blob-a", "blob-b", "blob-c"][i]} w-full border border-edge/70 object-cover`}
                />
              </figure>
            ))}
          </div>
          <p className="mt-4 text-center text-[0.68rem] text-warm-dim">
            Personal service archive — U.S. Army, armor.
          </p>
        </div>
      </Reveal>

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
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-3xl">
        <h2 className="display text-center text-3xl text-warm-white sm:text-4xl">
          The Bevier Breakdown.
        </h2>
        <TracerRule className="mx-auto mt-4 max-w-[14rem]" />
        <p className="mt-4 text-center leading-relaxed text-warm-mist">
          A few plain questions — no jargon. Every answer changes what we ask
          next, and the result shows its own reasoning. Nothing leaves your
          browser unless you choose to send it.
        </p>
      </div>
      <div className="mt-8">
        <BevierBreakdown />
      </div>
      <p className="mt-6 text-center text-xs leading-relaxed text-warm-dim">
        {frameworkDisclaimer}
      </p>
    </div>
  );
}
