import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { pillars } from "@/lib/content/pillars";
import { frameworkDisclaimer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inside the Work",
  description:
    "The delivery detail beneath the three BSTS service areas: Secure AI & Automation, AI Security & Governance, and SOC 2 & Compliance Readiness.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-10">
          <SectionHeading
            as="h1"
            eyebrow="Inside the work"
            title="What the work actually involves."
            lede={site.promise}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-warm-mist">
              This is the detail underneath the three things BSTS is engaged
              to do —{" "}
              <Link
                href="/#services"
                className="text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
              >
                Secure AI &amp; Automation, AI Security &amp; Governance, and
                SOC 2 &amp; Compliance Readiness
              </Link>{" "}
              are the engagements. What follows is how the building actually
              gets organized inside them.
            </p>
          </Reveal>
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
                    {pillar.slug === "build" ? (
                      <Link
                        href="/solutions/build"
                        className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
                      >
                        See the range, and the test every build has to pass
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    ) : null}
                  </div>
                  <div className={flip ? "lg:order-1" : ""}>
                    <div className="surface-quiet blob-c h-full p-6">
                      <h3 className="text-xs font-semibold tracking-[0.18em] text-warm-dim uppercase">
                        Typical work
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
          title="All three service areas start from the same assessment."
          lede="Ten minutes of honest answers about how your operation runs. We map them to the three service areas and tell you — in writing — what we would secure, automate, govern, and prepare for examination."
        />
        <Reveal delay={0.12}>
          <div className="mt-9">
            <LinkButton href="/#assessment">
              Start the assessment <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </div>
        </Reveal>
        <p className="mx-auto mt-10 max-w-3xl text-left text-xs leading-relaxed text-warm-dim">
          {frameworkDisclaimer}
        </p>
      </section>
    </>
  );
}
