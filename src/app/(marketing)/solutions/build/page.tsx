import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, XCircle } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TracerRule } from "@/components/ui/TracerRule";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import {
  buildClasses,
  buildClosing,
  buildDiscipline,
  buildTest,
  willNotBuild,
} from "@/lib/content/build";

export const metadata: Metadata = {
  title: "What We Can Build",
  description:
    "The range of custom software BSTS builds when the market genuinely lacks the tool — and the test every build has to pass before a line of code is written.",
};

export default function BuildPage() {
  return (
    <>
      {/* ------------------------------- hero ------------------------------ */}
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-10">
          <SectionHeading
            as="h1"
            eyebrow="Inside the work · Build what is missing"
            title="The tool the market doesn't sell."
            lede="Custom software is a last resort we happen to be very good at. This page shows what we can build, so the ceiling is clear — and the test every build has to fail its way through before we write anything."
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-warm-dim">
              Part of{" "}
              <Link
                href="/solutions#build"
                className="text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
              >
                Build what is missing
              </Link>
              , the fourth of five BSTS solution pillars.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- the test ----------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <SectionHeading
          eyebrow="Before anything gets built"
          title="Five questions that have to fail first."
          lede="Every one of these is cheaper than custom software. We work through them in order, and a yes to any of them ends the build conversation."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {buildTest.map((t, i) => (
            <Reveal key={t.q} delay={staggerDelay(Math.min(i, 3))}>
              <Surface className="h-full p-6">
                <p className="text-base font-semibold text-warm-white">{t.q}</p>
                <p className="mt-3 text-sm leading-relaxed text-warm-mist">
                  {t.a}
                </p>
              </Surface>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------- the range ----------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <SectionHeading
          eyebrow="The range"
          title="What we build when building is warranted."
          lede="Classes of work rather than a menu. Each carries the condition that justifies it and the boundary that keeps it honest."
        />
        <div className="mt-10 space-y-6">
          {buildClasses.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.slug} delay={staggerDelay(Math.min(i, 2))}>
                <Surface
                  blob={(["a", "b", "c"] as const)[i % 3]}
                  id={b.slug}
                  className="scroll-mt-28 grid grid-cols-1 gap-7 p-7 sm:p-9 lg:grid-cols-[1.15fr_1fr]"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-cyan-faint p-2.5">
                        <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                      </span>
                      <h2 className="text-xl font-semibold text-warm-white">
                        {b.title}
                      </h2>
                    </div>
                    <p className="mt-4 leading-relaxed text-warm-mist">
                      {b.what}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-cyan-soft">
                      <span className="font-semibold">Warranted when — </span>
                      {b.warranted}
                    </p>
                  </div>
                  <div className="surface-quiet blob-c h-full p-6">
                    <h3 className="text-xs font-semibold tracking-[0.18em] text-warm-dim uppercase">
                      What sets the size
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-warm-mist">
                      {b.scope}
                    </p>
                    <h3 className="mt-6 text-xs font-semibold tracking-[0.18em] text-warm-dim uppercase">
                      Where it stops
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-warm-mist">
                      {b.boundary}
                    </p>
                  </div>
                </Surface>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* -------------------------- what we won't -------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <SectionHeading
          gold
          eyebrow="The other half of the answer"
          title="What we will not build."
          lede="A firm that builds anything you ask for is not protecting you from the most expensive mistake in this field. These are refusals, not caveats."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {willNotBuild.map((w, i) => (
            <Reveal key={w.title} delay={staggerDelay(Math.min(i, 3))}>
              <Surface className="h-full p-6">
                <div className="flex items-start gap-3">
                  <XCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-core"
                    aria-hidden
                  />
                  <div>
                    <p className="font-semibold text-warm-white">{w.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-warm-mist">
                      {w.body}
                    </p>
                  </div>
                </div>
              </Surface>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------- discipline ---------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <SectionHeading
          eyebrow="How a build is run"
          title="The parts that are not negotiable."
          lede="These hold regardless of what is being built or how small it is."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {buildDiscipline.map((d, i) => (
            <Reveal key={d.title} delay={staggerDelay(Math.min(i, 3))}>
              <Surface className="h-full p-6">
                <Sparkles className="h-5 w-5 text-cyan-core" aria-hidden />
                <p className="mt-4 font-semibold text-warm-white">{d.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-warm-mist">
                  {d.body}
                </p>
              </Surface>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------- closing ----------------------------- */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <TracerRule className="mx-auto mb-10 max-w-[14rem]" />
        <Reveal>
          <p className="text-lg leading-relaxed text-warm-mist">
            {buildClosing}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-9">
            <LinkButton href="/#assessment">
              Start the assessment{" "}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
