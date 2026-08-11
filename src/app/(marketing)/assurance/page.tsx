import type { Metadata } from "next";
import { ArrowRight, ArrowRight as Arrow, Check, X } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { TracerRule } from "@/components/ui/TracerRule";
import {
  assuranceProblem,
  assurancePipeline,
  assuranceRoadmapNote,
  assuranceVision,
  commonControl,
  soc2Boundary,
} from "@/lib/content/positioning";
import { frameworkDisclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Continuous Assurance",
  description:
    "Moving compliance from periodic evidence collection toward continuous control assurance — validating controls against actual system evidence instead of questionnaires, spreadsheets, and screenshots taken the week before the audit.",
  keywords: [
    "continuous compliance",
    "continuous control monitoring",
    "compliance automation",
    "control validation",
    "audit evidence automation",
    "common control framework",
  ],
};

export default function AssurancePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-14">
          <SectionHeading
            as="h1"
            eyebrow="The BSTS point of view"
            title={assuranceVision}
            lede={assuranceProblem.body}
          />
        </div>
      </section>

      {/* The problem, stated as a contrast */}
      <section className="mx-auto max-w-6xl px-6 pb-16" aria-labelledby="problem-heading">
        <Reveal>
          <h2 id="problem-heading" className="display text-2xl text-warm-white sm:text-3xl">
            {assuranceProblem.heading}
          </h2>
          <TracerRule />
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {assuranceProblem.contrast.map((c, i) => (
            <Reveal as="li" key={c.from} delay={staggerDelay(i % 2)}>
              <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-6">
                <div className="flex gap-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-alert/80" aria-hidden />
                  <p className="text-sm leading-relaxed text-warm-dim line-through decoration-warm-dim/40">
                    {c.from}
                  </p>
                </div>
                <div className="mt-3 flex gap-3 border-t border-edge/50 pt-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                  <p className="text-sm leading-relaxed text-warm-white">{c.to}</p>
                </div>
              </Surface>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The pipeline */}
      <section className="mx-auto max-w-6xl px-6 pb-16" aria-labelledby="pipeline-heading">
        <div className="text-center">
          <p className="eyebrow">The model</p>
          <h2
            id="pipeline-heading"
            className="display mt-3 text-3xl text-warm-white sm:text-4xl"
          >
            From system evidence to audit-ready evidence.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
            Six steps, each feeding the next. The interesting property is that
            the last step stops being a project — the evidence an examination
            needs becomes a by-product of operating the control correctly.
          </p>
        </div>

        <ol className="mt-10 space-y-3">
          {assurancePipeline.map((s, i) => {
            const Icon = s.icon;
            const last = i === assurancePipeline.length - 1;
            return (
              <Reveal as="li" key={s.step} delay={staggerDelay(Math.min(i, 3))}>
                <Surface
                  blob={(["a", "b", "c"] as const)[i % 3]}
                  className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7 ${
                    last ? "border-cyan-core/40" : ""
                  }`}
                >
                  <div className="flex shrink-0 items-center gap-4 sm:w-64">
                    <span
                      className={`rounded-full p-2.5 ${
                        last ? "bg-cyan-faint" : "bg-gold-faint"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${last ? "text-cyan-core" : "text-gold-core"}`}
                        aria-hidden
                      />
                    </span>
                    <div>
                      <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-warm-dim uppercase">
                        Step {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-base font-semibold text-warm-white">{s.step}</h3>
                    </div>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-warm-mist">{s.body}</p>
                </Surface>
              </Reveal>
            );
          })}
        </ol>

        {/* The honesty note — this is a direction, not a product. */}
        <Reveal delay={0.08}>
          <Surface quiet className="mt-8 border-gold-core/35 p-6 sm:p-7">
            <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-soft uppercase">
              Where this stands today
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">
              {assuranceRoadmapNote}
            </p>
          </Surface>
        </Reveal>
      </section>

      {/* Common control framework */}
      <section
        className="mx-auto max-w-6xl px-6 pb-16"
        aria-labelledby="common-control-heading"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Common control framework</p>
            <h2
              id="common-control-heading"
              className="display mt-3 text-3xl text-warm-white sm:text-4xl"
            >
              {commonControl.heading}
            </h2>
            <TracerRule />
            <p className="mt-5 leading-relaxed text-warm-mist">{commonControl.body}</p>
            <p className="mt-4 leading-relaxed text-warm-mist">{commonControl.approach}</p>

            {/* The one-to-many diagram, in text form so it survives print
                and screen readers without a separate description. */}
            <Surface quiet blob="a" className="mt-7 p-6">
              <p className="text-center text-[0.62rem] font-semibold tracking-[0.16em] text-warm-dim uppercase">
                One organizational control
              </p>
              <p className="mt-2 text-center text-sm font-semibold text-warm-white">
                &ldquo;Access to production is granted by role, reviewed
                quarterly, and revoked within 24 hours of departure.&rdquo;
              </p>
              <div className="mt-4 flex justify-center" aria-hidden>
                <span className="h-6 w-px bg-gradient-to-b from-gold-core/60 to-transparent" />
              </div>
              <ul className="flex flex-wrap justify-center gap-2">
                {["SOC 2", "NIST CSF 2.0", "ISO 27001", "HIPAA", "CMMC"].map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-cyan-core/35 bg-cyan-faint px-3 py-1 text-xs font-medium text-cyan-soft"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-center text-xs leading-relaxed text-warm-dim">
                Mapped once. Evidenced once. Answered everywhere it is asked —
                with genuinely unique requirements kept separate rather than
                forced into the overlap.
              </p>
            </Surface>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] text-gold-soft uppercase">
              Frameworks we help clients map and prepare against
            </h3>
            <ul className="mt-5 space-y-2.5">
              {commonControl.frameworks.map((f, i) => (
                <Reveal as="li" key={f.name} delay={staggerDelay(Math.min(i, 4), 0.04)}>
                  <div className="rounded-2xl border border-edge/60 bg-obsidian/40 p-4">
                    <p className="text-sm font-semibold text-warm-white">{f.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-warm-dim">{f.note}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-warm-dim">
              {commonControl.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* SOC 2 boundary */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <Reveal>
          <Surface className="border-gold-core/35 p-7 sm:p-8">
            <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-soft uppercase">
              An important distinction
            </p>
            <p className="mt-3 leading-relaxed text-warm-mist">
              {soc2Boundary}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-warm-mist">
              BSTS prepares organizations for that examination: scoping, control
              inventory and mapping, gap assessment, remediation tracking,
              evidence preparation, and coordination with control owners. Where
              your systems support it, we automate the evidence collection so
              the next cycle costs less than the last one.
            </p>
          </Surface>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20 text-center">
        <SectionHeading
          center
          eyebrow="Start here"
          title="Find out what you could actually prove today."
          lede="The assessment includes a control and evidence review — which controls you operate, which you could demonstrate on request, and which currently exist only as intentions."
        />
        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/#assessment">
              Start with an assessment <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <a href="/government/" className="btn-ghost-form">
              Government &amp; federal
              <Arrow className="h-4 w-4" aria-hidden />
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
