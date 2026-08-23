"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { PointerHalo } from "@/components/marketing/PointerHalo";
import { IdentityLockup } from "@/components/brand/IdentityLockup";
import { TracerRule } from "@/components/ui/TracerRule";
import { BevierBreakdown } from "@/components/assessment/BevierBreakdown";
import {
  breakdownLayers,
  breakdownRelationship,
  capabilityStrip,
  engagementNote,
  engagementStages,
  serviceAreas,
  strategicSummary,
  triggers,
  trustPoints,
} from "@/lib/content/positioning";
import {
  discoveryCta,
  federalDisclaimer,
  frameworkDisclaimer,
  site,
  vetCert,
} from "@/lib/site";

const TABS = [
  { id: "overview", label: "Overview" },
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
          {/* What BSTS actually does, before any call to action. */}
          <Reveal delay={0.24}>
            <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
              {capabilityStrip.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-edge/80 bg-graphite/60 px-3.5 py-1.5 text-[0.72rem] font-medium tracking-[0.02em] text-warm-mist"
                >
                  {c}
                </li>
              ))}
            </ul>
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
              <Link href={discoveryCta.href} className="btn-ghost-form px-7 py-3 text-base">
                {discoveryCta.label}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.31}>
            <p className="mt-3.5 text-sm text-warm-dim">
              Or{" "}
              <Link
                href="/services"
                className="text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
              >
                explore capabilities
              </Link>{" "}
              first.
            </p>
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
            {tab === "assessment" ? <AssessmentPanel /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

/* ---------------------------- Shared blocks ---------------------------- */

/** The three service areas as primary cards — the 10-second explanation. */
function ServiceCards() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {serviceAreas.map((a, i) => {
        const Icon = a.icon;
        const accent = AREA_ACCENT[i];
        return (
          <Reveal key={a.slug} delay={staggerDelay(i)}>
            <Link
              href={`/services#${["build", "secure", "prove"][i] ?? "discover"}`}
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
            </Link>
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
          Three sentences start almost every engagement.
        </p>
      </div>

      <ul className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {triggers.slice(0, 3).map((t, i) => (
          <Reveal as="li" key={t.quote} delay={staggerDelay(i)}>
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
function PanelCta({
  select,
  label = "Start the Bevier Breakdown",
}: {
  select: (id: TabId) => void;
  label?: string;
}) {
  return (
    <div className="mt-12 text-center">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => select("assessment")}
          className="btn-primary-form px-7 py-3 text-base"
        >
          {label} <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
        <Link href={discoveryCta.href} className="btn-ghost-form px-7 py-3 text-base">
          {discoveryCta.label}
        </Link>
      </div>
      <p className="mt-3.5 text-xs text-warm-dim">
        The Breakdown takes a few minutes and stays in your browser. A discovery
        conversation connects you with a person.
      </p>
    </div>
  );
}

/* ------------------------------ Overview ------------------------------ */

/**
 * Trust, built only from the founder record and how the practice operates.
 * No client logos, case studies, metrics, or corporate past performance —
 * BSTS has none yet, and inventing them is the one thing this section must
 * never do. The veteran-ownership block is folded in here so ownership,
 * qualifications and operating commitments read as one argument.
 */
function TrustSection() {
  return (
    <section className="mt-16" aria-labelledby="trust-heading">
      <div className="text-center">
        <p className="eyebrow">Why believe any of this</p>
        <h2 id="trust-heading" className="display mt-3 text-3xl text-warm-white sm:text-4xl">
          {trustPoints.heading}
        </h2>
        <TracerRule className="mx-auto mt-4 max-w-[16rem]" />
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
          {trustPoints.lede}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <Surface quiet blob="a" className="h-full p-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-cyan-soft uppercase">
              Qualifications
            </p>
            <ul className="mt-4 space-y-2.5">
              {trustPoints.qualifications.map((q) => (
                <li key={q} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                  {q}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-warm-dim">
              {trustPoints.qualificationsNote}
            </p>
            <ul className="mt-5 space-y-2.5 border-t border-edge/50 pt-5">
              {trustPoints.background.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-warm-dim">{federalDisclaimer}</p>
          </Surface>
        </Reveal>

        <Reveal delay={0.06}>
          <Surface quiet blob="b" className="h-full border-gold-core/30 p-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold-soft uppercase">
              How the practice operates
            </p>
            <ul className="mt-4 space-y-2.5">
              {trustPoints.operating.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-core" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-4 border-t border-edge/50 pt-5">
              <span aria-hidden className="display text-3xl text-gold-soft">
                ★
              </span>
              <div>
                <p className="text-sm font-semibold tracking-[0.12em] text-gold-soft uppercase">
                  {vetCert.heading}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-warm-mist">
                  {vetCert.explanation}
                </p>
              </div>
            </div>
          </Surface>
        </Reveal>
      </div>
    </section>
  );
}
function OverviewPanel({ select }: { select: (id: TabId) => void }) {
  return (
    <div>
      {/* 2. Three core outcomes. */}
      <ServiceCards />

      <div aria-hidden className="tracer-divider mx-auto mt-16 max-w-3xl" />

      {/* 3. How BSTS works — the recognition triggers, compressed to the
             three sentences a referral partner can actually recognize, then
             the engagement ladder itself. The long-form versions of both
             (the eight-quote grid, the ideal-client panel and the
             force-multiplier essay) said the same thing three more times and
             now live on /services and /method. */}
      <TriggerSection />
      <EngagementLadder />

      <div aria-hidden className="tracer-divider mx-auto mt-16 max-w-3xl" />

      {/* 4. Credibility and proof. */}
      <TrustSection />

      {/* 5. One decisive call to action. */}
      <PanelCta select={select} />

      {/* The single quiet pointer to the supporting category — deliberately
          not a fourth pillar. */}
      <p className="mt-10 text-center text-sm text-warm-dim">
        <Link href="/services#digital-foundations" className="underline-offset-4 hover:underline">
          Additional implementation and digital-foundation services
        </Link>
      </p>
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

      {/* Two layers of one assessment architecture — not the same product. */}
      <section className="mt-16" aria-labelledby="layers-heading">
        <div className="text-center">
          <p className="eyebrow">Two layers, one model</p>
          <h2 id="layers-heading" className="display mt-3 text-2xl text-warm-white sm:text-3xl">
            What this free version is, and is not.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-warm-mist">
            {breakdownRelationship}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {[breakdownLayers.publicLayer, breakdownLayers.facilitatedLayer].map(
            (layer, i) => (
              <Reveal key={layer.name} delay={staggerDelay(i)}>
                <Surface
                  quiet={i === 0}
                  blob={i === 0 ? "a" : "b"}
                  className={`h-full p-7 ${i === 1 ? "border-gold-core/30" : ""}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-warm-white">{layer.name}</h3>
                    <span
                      className={`text-xs font-semibold tracking-[0.12em] uppercase ${
                        i === 0 ? "text-cyan-soft" : "text-gold-soft"
                      }`}
                    >
                      {layer.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-warm-mist">{layer.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {layer.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                        <span
                          aria-hidden
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                            i === 0 ? "bg-cyan-core" : "bg-gold-core"
                          }`}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Surface>
              </Reveal>
            ),
          )}
        </div>
      </section>

      <p className="mt-10 text-center text-xs leading-relaxed text-warm-dim">
        {frameworkDisclaimer}
      </p>
    </div>
  );
}
