import type { Metadata } from "next";
import { ArrowRight, Award, Compass } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CurveDivider } from "@/components/ui/CurveDivider";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { founder } from "@/lib/content/founder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "BSTS is a strategic technology transformation and secure AI implementation firm founded by Jacob Bevier — MS in Artificial Intelligence, BS in Cybersecurity (Magna Cum Laude), U.S. Army veteran with federal cybersecurity experience.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="gold" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <SectionHeading
            eyebrow="About BSTS"
            title="Focused on purpose. Principal-led by design."
            lede={site.description}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6" aria-labelledby="founder-story">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal>
              <h2 id="founder-story" className="display text-2xl text-warm-white sm:text-3xl">
                {founder.name}
                <span className="mt-1 block text-base font-normal text-warm-dim">
                  {founder.role}
                </span>
              </h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {founder.narrative.map((para, i) => (
                <Reveal key={i} delay={staggerDelay(i, 0.06)}>
                  <p className="leading-relaxed text-warm-mist">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <Surface blob="a" className="h-fit p-8">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-gold-soft" aria-hidden />
                <h3 className="text-xs font-semibold tracking-[0.18em] text-warm-dim uppercase">
                  Education & certifications
                </h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {founder.credentials.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex items-center gap-3">
                <Compass className="h-5 w-5 text-cyan-soft" aria-hidden />
                <h3 className="text-xs font-semibold tracking-[0.18em] text-warm-dim uppercase">
                  Background
                </h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {founder.experience.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-edge/50 pt-4 text-xs leading-relaxed text-warm-dim">
                Federal experience described here does not imply endorsement by
                any government agency.
              </p>
            </Surface>
          </Reveal>
        </div>
      </section>

      <section className="relative mt-16" aria-labelledby="principles-heading">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              id="principles-heading"
              eyebrow="Operating principles"
              title="Four commitments we are content to be quoted on."
            />
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {founder.principles.map((p, i) => (
                <Reveal key={p.title} delay={staggerDelay(i % 2)}>
                  <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-8">
                    <p className="display text-xl text-gold-soft">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-lg font-semibold text-warm-white">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-warm-mist">{p.body}</p>
                  </Surface>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <SectionHeading
          center
          eyebrow="Work with us"
          title="One principal. One engagement at a time done well."
          lede="If the fit is wrong, we will say so early and point you somewhere better. If it is right, you will know by week six — because something will be running."
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
