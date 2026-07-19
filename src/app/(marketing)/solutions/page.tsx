import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { pillars } from "@/lib/content/pillars";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Five lanes of work — keep, connect, automate, build, secure. Stack assessment, systems integration, intelligent automation, custom software with responsible AI, and NIST-aligned security.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <SectionHeading
            eyebrow="Solutions"
            title="Five lanes of work, one honest sentence."
            lede={site.promise}
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-6 pb-10">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          const flip = i % 2 === 1;
          return (
            <section
              key={pillar.slug}
              id={pillar.slug}
              aria-labelledby={`${pillar.slug}-title`}
              className="scroll-mt-28"
            >
              <Reveal delay={staggerDelay(Math.min(i, 2))}>
                <Surface
                  blob={(["a", "b", "c"] as const)[i % 3]}
                  className="grid grid-cols-1 gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]"
                >
                  <div className={flip ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-cyan-faint p-2.5">
                        <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                      </span>
                      <p className="text-xs tracking-[0.16em] text-gold-soft uppercase">
                        {pillar.promiseLine}
                      </p>
                    </div>
                    <h2
                      id={`${pillar.slug}-title`}
                      className="display mt-5 text-2xl text-warm-white sm:text-3xl"
                    >
                      {pillar.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-warm-mist">{pillar.detail}</p>
                  </div>
                  <div className={flip ? "lg:order-1" : ""}>
                    <div className="surface-quiet blob-c h-full p-6">
                      <h3 className="text-xs font-semibold tracking-[0.18em] text-warm-dim uppercase">
                        Typical work in this lane
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {pillar.examples.map((ex) => (
                          <li
                            key={ex}
                            className="flex gap-3 text-sm leading-relaxed text-warm-mist"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core"
                            />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Surface>
              </Reveal>
            </section>
          );
        })}
      </div>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <SectionHeading
          center
          eyebrow="Where to begin"
          title="Every lane starts from the same assessment."
          lede="Ten minutes of honest answers about how your operation runs. We map them to the lanes above and tell you — in writing — what we would keep, connect, automate, build, and secure."
        />
        <Reveal delay={0.12}>
          <div className="mt-9">
            <LinkButton href="/contact">
              Start the assessment <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
