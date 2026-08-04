"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { PointerHalo } from "@/components/marketing/PointerHalo";
import { SystemsDiagram } from "@/components/marketing/SystemsDiagram";
import { TracerRule } from "@/components/ui/TracerRule";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";
import { pillars } from "@/lib/content/pillars";
import { founder } from "@/lib/content/founder";
import { solara, solaraLabel } from "@/lib/content/solara";
import {
  federalDisclaimer,
  frameworkDisclaimer,
  offers,
  sensitiveDataNotice,
  site,
  vetCert,
} from "@/lib/site";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
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
      if (h === "method") {
        // "How we work" lives on its own page now.
        window.location.replace("/method/");
        return;
      }
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
        <div className="relative mx-auto max-w-6xl px-6 pt-6 pb-8 text-center sm:pt-8 lg:pt-4">
          <Reveal>
            <p className="eyebrow">Secure AI · Intelligent Automation · Connected Systems</p>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="mt-3 inline-block rounded-full border border-gold-core/45 bg-gold-faint px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] text-gold-soft uppercase">
              {vetCert.badge}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            {/* Volley stage: symmetric — the tank's visible left inset from
                the stage edge equals the dart tip's right inset. Geometry
                verified against rendered pixel measurements. */}
            <div className="relative mt-3 hidden h-72 lg:block" aria-hidden="true">
              <Image
                src="/abrams.webp"
                alt=""
                width={1280}
                height={731}
                priority
                className="absolute top-0 left-[-16rem] h-72 w-auto max-w-none"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 50%, black 55%, transparent 98%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 50%, black 55%, transparent 98%)",
                }}
              />
              <p
                className="brand-wordmark absolute top-[70px] right-0 left-0 text-center whitespace-nowrap uppercase"
                style={{ fontSize: "clamp(1rem, 2vw, 1.65rem)" }}
              >
                Bevier Strategic Technology Solutions
              </p>
              <div className="tracer-shot top-[123px] right-[11.5rem] left-[11.4rem]">
                <span className="muzzle-ember" />
                <span className="sabot-petal petal-a" />
                <span className="sabot-petal petal-b" />
                <span className="sabot-petal petal-c" />
                <span className="impact-pop" />
              </div>
              <span className="bsts-burst absolute top-[96px] right-4 flex flex-col items-center">
                <span className="display text-lg leading-none font-bold tracking-[0.22em] text-gold-soft">
                  BSTS
                </span>
                <span className="relative mt-1.5">
                  <span className="bsts-dart" />
                  <span className="dart-motion">
                    <i />
                  </span>
                </span>
              </span>
            </div>
            <p className="sr-only">Bevier Strategic Technology Solutions — BSTS</p>
            {/* Mobile & tablet: compact static composition — the same tank,
                wordmark, and round, without the animation surface. */}
            <div className="mt-5 lg:hidden" aria-hidden="true">
              <Image
                src="/abrams.webp"
                alt=""
                width={1280}
                height={731}
                priority
                className="mx-auto h-32 w-auto sm:h-40"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 50%, black 55%, transparent 98%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 50%, black 55%, transparent 98%)",
                }}
              />
              <p className="brand-wordmark mt-2 text-[0.72rem] uppercase sm:text-[0.85rem]">
                Bevier Strategic Technology Solutions
              </p>
              <span className="mx-auto mt-2 flex max-w-[15rem] items-center gap-2 sm:max-w-[18rem]">
                <span className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-gold-soft/70 to-gold-soft/25" />
                <span className="display text-[0.7rem] font-bold tracking-[0.22em] text-gold-soft">
                  BSTS
                </span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <h1 className="display mx-auto mt-5 max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:-mt-16">
              A force multiplier for the team{" "}
              <span className="text-cyan-soft">you already have.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-warm-mist sm:text-lg">
              BSTS helps growing and regulated organizations connect
              disconnected systems, automate repetitive work, and implement
              secure AI — without replacing the tools and teams that already
              work.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gold-soft">
              {site.promise}
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={() => select("assessment")} className="btn-primary-form px-7 py-3 text-base">
                Start Your Technology Assessment <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={() => select("services")} className="btn-ghost-form">
                See What We Do
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
                  ? t.id === "assessment"
                    ? "bg-cyan-core font-medium text-obsidian-deep"
                    : "bg-graphite-2 text-cyan-soft"
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

/** The three commercial entry points — professional, not a price menu. */
function EngagementOffers({ select }: { select: (id: TabId) => void }) {
  return (
    <section className="mt-14" aria-labelledby="offers-heading">
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
                {i === 0 ? "Start here" : i === 1 ? "First win" : "Full engagement"}
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
              <button
                type="button"
                onClick={() => select("assessment")}
                className="btn-ghost-form mt-4 justify-center"
              >
                {i === 2 ? "Begin with the assessment" : "Start the conversation"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </Surface>
          </Reveal>
        ))}
      </div>
    </section>
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
            The whole idea is amplification, not replacement. We make your
            existing people and tools measurably more capable — keeping what
            works, connecting what&apos;s siloed, and taking the repetitive
            busywork off your team&apos;s plate. Replacement is a last resort,
            recommended only with a written reason.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "No rip-and-replace reflex — every recommendation carries a reason",
              "Focused automations can often be delivered in weeks, with scope and dependencies defined upfront",
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

      {/* Veteran-ownership block — wording derives from the centralized
          VetCert status in site.ts and upgrades automatically. */}
      <Reveal delay={0.08}>
        <Surface blob="b" className="mt-12 grid grid-cols-1 items-center gap-6 border-gold-core/35 p-7 sm:p-8 lg:grid-cols-[auto_1fr]">
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

      <EngagementOffers select={select} />

      <PanelCta select={select} label="Start Your Technology Assessment" />
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
                  <p className="mt-3 text-sm font-medium leading-relaxed text-cyan-soft">
                    {p.outcome}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-warm-mist">{p.detail}</p>
                  <p className="mt-3 text-sm leading-relaxed text-warm-dim">
                    <span className="font-semibold text-warm-mist">For example: </span>
                    {p.example}
                  </p>
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
                  {/* Native disclosure: keyboard- and touch-operable, correct
                      expanded/collapsed semantics, nothing essential hidden. */}
                  <details className="group mt-4 border-t border-edge/50 pt-3">
                    <summary className="cursor-pointer list-none rounded-lg text-sm font-medium text-cyan-soft transition-colors hover:text-cyan-core focus-visible:outline-2 focus-visible:outline-cyan-core">
                      <span aria-hidden className="mr-1.5 inline-block transition-transform duration-200 group-open:rotate-90">
                        ›
                      </span>
                      Good fit when…
                    </summary>
                    <ul className="mt-2.5 space-y-2">
                      {p.goodFit.map((g) => (
                        <li key={g} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core" />
                          {g}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => select("assessment")}
                      className="mt-3 text-sm text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
                    >
                      Sound familiar? Start the assessment
                    </button>
                  </details>
                </div>
              </Surface>
            </Reveal>
          );
        })}
      </div>

      <EngagementOffers select={select} />

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

      {/* Service record — personal archive, treated to match the theme */}
      <Reveal delay={0.08}>
        <div className="mt-12">
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
      <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed text-warm-dim">
        {sensitiveDataNotice}
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
