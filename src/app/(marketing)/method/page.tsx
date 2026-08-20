import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { TracerRule } from "@/components/ui/TracerRule";
import {
  aiApproach,
  engagementNote,
  engagementStages,
  forceMultiplier,
} from "@/lib/content/positioning";
import { pillars } from "@/lib/content/pillars";
import { frameworkDisclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Discover, Implement, Govern, Assure — the four stages of a BSTS engagement, and the Value / Risk / Controls / Assurance gate every AI use case passes before it reaches production.",
  keywords: [
    "AI implementation process",
    "secure automation methodology",
    "AI governance process",
    "compliance readiness process",
  ],
};

export default function MethodPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-14">
          <SectionHeading
            as="h1"
            eyebrow="How we work"
            title="Discover. Implement. Govern. Assure."
            lede="Four stages, each of which stands on its own. Most organizations begin with the first and decide from there — nothing here requires committing to the full arc up front, and we would be suspicious of a firm that asked you to."
          />
        </div>
      </section>

      {/* The four stages */}
      <div className="relative mx-auto max-w-4xl px-6 pb-12">
        <ol className="relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-[1.35rem] before:hidden before:w-px before:bg-edge sm:before:block">
          {engagementStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <Reveal as="li" key={stage.key} delay={staggerDelay(Math.min(i, 3))}>
                <div className="relative sm:pl-16">
                  <span
                    aria-hidden
                    className="display absolute top-6 left-0 hidden h-11 w-11 items-center justify-center rounded-full border border-gold-core/50 bg-obsidian text-sm text-gold-soft sm:flex"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Surface blob={(["a", "b", "c"] as const)[i % 3]} className="p-7 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-cyan-core" aria-hidden />
                      <h2 className="display text-2xl text-warm-white">
                        <span className="text-gold-soft sm:hidden">
                          {String(i + 1).padStart(2, "0")} ·{" "}
                        </span>
                        {stage.title}
                      </h2>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-cyan-soft">
                      {stage.oneLine}
                    </p>
                    <p className="mt-3 leading-relaxed text-warm-mist">{stage.body}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-edge/50 pt-5">
                      {stage.outputs.map((o) => (
                        <li
                          key={o}
                          className="flex gap-3 text-sm leading-relaxed text-warm-mist"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core"
                            aria-hidden
                          />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </Surface>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={0.08}>
          <Surface quiet className="mt-8 border-gold-core/35 p-6 sm:p-7">
            <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-soft uppercase">
              Worth saying plainly
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">
              {engagementNote}
            </p>
          </Surface>
        </Reveal>
      </div>

      {/* VALUE → RISK → CONTROLS → ASSURANCE */}
      <section
        className="mx-auto max-w-6xl px-6 pb-16"
        aria-labelledby="ai-gate-heading"
      >
        <div className="text-center">
          <p className="eyebrow">The AI gate</p>
          <h2 id="ai-gate-heading" className="display mt-3 text-3xl text-warm-white sm:text-4xl">
            Value. Risk. Controls. Assurance.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
            Every AI use case passes this gate before it reaches production.
            Skipping a step does not make a project faster — it relocates the
            cost to a worse moment, usually a customer security review or an
            incident.
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

      {/* What "Implement" actually means — the preserved delivery discipline */}
      <section
        className="mx-auto max-w-6xl px-6 pb-16"
        aria-labelledby="delivery-heading"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow">Inside implementation</p>
            <h2
              id="delivery-heading"
              className="display mt-3 text-3xl text-warm-white sm:text-4xl"
            >
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
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal as="li" key={p.slug} delay={staggerDelay(Math.min(i, 3), 0.05)}>
                  <div className="surface-quiet h-full rounded-2xl p-5">
                    <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                    <p className="mt-3 text-sm font-semibold text-warm-white">{p.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-warm-dim">
                      {p.promiseLine}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20 text-center">
        <SectionHeading
          center
          eyebrow="Stage one"
          title="It starts with discovery. Discovery starts here."
          lede="The public Bevier Breakdown is built from the same assessment model used in BSTS engagements. A facilitated assessment adds deeper branching, evidence validation, control analysis, and a prioritized implementation roadmap. You keep the output of the free version whether or not we continue."
        />
        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/#assessment">
              Begin the assessment <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <a href="/assurance/" className="btn-ghost-form">
              Where this leads: continuous assurance
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-warm-dim">
          {frameworkDisclaimer}
        </p>
      </section>
    </>
  );
}
