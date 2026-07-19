import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { methodStages } from "@/lib/content/method";

export const metadata: Metadata = {
  title: "The BSTS Method",
  description:
    "Listen, Map, Prove, Build, Steward — five public stages from first conversation to steady state, with a working pilot in production by week six.",
};

export default function MethodPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <SectionHeading
            eyebrow="The BSTS Method"
            title="A method public enough to be held against us."
            lede="Technology consulting fails most often in the gap between the strategy deck and the first working thing. The BSTS Method closes that gap on a schedule: by week six of a standard engagement, something real is running in production and you have judged it."
          />
        </div>
      </section>

      <div className="relative mx-auto max-w-4xl px-6 pb-8">
        <ol className="relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-[1.35rem] before:hidden before:w-px before:bg-edge sm:before:block">
          {methodStages.map((stage, i) => (
            <Reveal as="li" key={stage.number} delay={staggerDelay(Math.min(i, 3))}>
              <div className="relative sm:pl-16">
                <span
                  aria-hidden
                  className="display absolute top-6 left-0 hidden h-11 w-11 items-center justify-center rounded-full border border-gold-core/50 bg-obsidian text-sm text-gold-soft sm:flex"
                >
                  {stage.number}
                </span>
                <Surface blob={(["a", "b", "c"] as const)[i % 3]} className="p-7 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="display text-2xl text-warm-white">
                      <span className="text-gold-soft sm:hidden">{stage.number} · </span>
                      {stage.name}
                    </h2>
                    <p className="text-xs tracking-[0.14em] text-cyan-soft uppercase">
                      {stage.duration}
                    </p>
                  </div>
                  <p className="mt-3 leading-relaxed text-warm-mist">{stage.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {stage.activities.map((a) => (
                      <li key={a} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-edge/50 pt-4 text-sm text-warm-dim">
                    <span className="font-semibold text-gold-soft">You receive: </span>
                    {stage.deliverable}
                  </p>
                </Surface>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <SectionHeading
          center
          eyebrow="Stage zero"
          title="The method starts with listening. Listening starts here."
          lede="The technology assessment on this site is the same instrument we use inside engagements — answering it is genuinely stage one of the work."
        />
        <Reveal delay={0.12}>
          <div className="mt-9">
            <LinkButton href="/contact">
              Begin the assessment <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
