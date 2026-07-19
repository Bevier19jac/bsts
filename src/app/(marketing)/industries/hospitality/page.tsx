import type { Metadata } from "next";
import { ArrowRight, Sunrise } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CurveDivider } from "@/components/ui/CurveDivider";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { solara, solaraLabel } from "@/lib/content/solara";

export const metadata: Metadata = {
  title: "Hospitality — Solara House concept demonstration",
  description:
    "A fictional 28-room boutique hotel, walked through the BSTS approach end to end: keep the PMS, connect the stack, automate the repetitive middle, add a drafts-only AI assistant, and secure the foundation.",
};

export default function HospitalityPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="gold" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <Reveal>
            <p className="inline-block rounded-full border border-gold-core/40 bg-gold-faint px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-gold-soft">
              {solaraLabel}
            </p>
          </Reveal>
          <div className="mt-6 flex items-start gap-4">
            <Sunrise className="mt-3 hidden h-9 w-9 shrink-0 text-gold-soft sm:block" aria-hidden />
            <SectionHeading
              eyebrow="Boutique hospitality"
              title={`${solara.name}: one fictional hotel, the whole approach.`}
              lede={solara.descriptor}
              gold
            />
          </div>
        </div>
      </section>

      {/* Before */}
      <section className="mx-auto max-w-6xl px-6 pb-6" aria-labelledby="before-heading">
        <SectionHeading
          id="before-heading"
          eyebrow="Before"
          title={solara.before.title}
          lede="Nothing here is broken, exactly. Everything is simply alone."
        />
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <Surface blob="a" className="p-8">
              <h3 className="text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase">
                The systems
              </h3>
              <ul className="mt-4 divide-y divide-edge/40">
                {solara.before.systems.map((s) => (
                  <li key={s.name} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-medium text-warm-white">{s.name}</span>
                    <span className="text-sm text-warm-dim">{s.note}</span>
                  </li>
                ))}
              </ul>
            </Surface>
          </Reveal>
          <Reveal delay={0.1}>
            <Surface quiet blob="c" className="h-full p-8">
              <h3 className="text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase">
                The daily frictions
              </h3>
              <ul className="mt-4 space-y-3.5">
                {solara.before.frictions.map((f) => (
                  <li key={f} className="flex gap-3 leading-relaxed text-warm-mist">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-alert/80" />
                    {f}
                  </li>
                ))}
              </ul>
            </Surface>
          </Reveal>
        </div>
      </section>

      {/* The five moves */}
      <section className="relative mt-10" aria-labelledby="moves-heading">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              id="moves-heading"
              eyebrow="The engagement"
              title="Five moves, in the order the method demands."
              lede="Keep first — always. What survives the keep decision defines what connect, automate, build, and secure have to work with."
            />
            <ol className="mt-12 space-y-5">
              {solara.moves.map((move, i) => (
                <Reveal as="li" key={move.lane} delay={staggerDelay(Math.min(i, 3))}>
                  <Surface quiet blob={(["a", "b", "c"] as const)[i % 3]} className="grid grid-cols-1 gap-4 p-7 sm:grid-cols-[10rem_1fr]">
                    <div>
                      <span className="rounded-full bg-cyan-faint px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-cyan-soft uppercase">
                        {String(i + 1).padStart(2, "0")} · {move.lane}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-warm-white">{move.title}</h3>
                      <p className="mt-2 leading-relaxed text-warm-mist">{move.body}</p>
                    </div>
                  </Surface>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* After */}
      <section className="mx-auto max-w-6xl px-6 py-10" aria-labelledby="after-heading">
        <SectionHeading
          id="after-heading"
          eyebrow="After"
          title={solara.after.title}
          lede="The guest never sees the plumbing. The team feels it every shift."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Surface blob="b" className="p-8">
              <ul className="space-y-3.5">
                {solara.after.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 leading-relaxed text-warm-mist">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ok/80" />
                    {o}
                  </li>
                ))}
              </ul>
            </Surface>
          </Reveal>
          <Reveal delay={0.1}>
            <Surface quiet blob="a" className="h-full p-8">
              <h3 className="text-xs font-semibold tracking-[0.16em] text-gold-soft uppercase">
                A note on honesty
              </h3>
              <p className="mt-3 leading-relaxed text-warm-mist">{solara.after.honesty}</p>
            </Surface>
          </Reveal>
        </div>
      </section>

      {/* See it in the OS + CTA */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <SectionHeading
          center
          eyebrow="Go deeper"
          title="Solara House lives inside BSTS OS, too."
          lede="The demonstration data in our operating system — prospect record, assessment, roadmap, projects, risks, and decisions — is this same fictional hotel. Explore it interactively, or start the assessment for your own property."
        />
        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/os" variant="gold">
              Open the OS demo <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <LinkButton href="/contact">
              Start your assessment <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
