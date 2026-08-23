import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { pricing } from "@/lib/site";
import { soc2Boundary } from "@/lib/content/positioning";
import {
  lifecycle,
  digitalFoundations,
  foundationsPricing,
  foundationsExclusions,
  progression,
  pricingRules,
  finalScopeNote,
} from "@/lib/content/services";
import type { ServiceStage } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "The complete BSTS service menu across one engagement lifecycle — Discover, Build, Secure, Prove, Maintain — plus Digital Foundations. Public starting prices, and the boundary on what BSTS does and does not issue.",
};

/** Public price sentence for a stage, resolved from the canonical source. */
function priceLine(stage: ServiceStage): string | null {
  switch (stage.price) {
    case "assessment":
      return pricing.assessment;
    case "sprint":
      return pricing.sprint;
    case "program":
      return pricing.transformation;
    case "foundations":
      return null;
    default:
      return null;
  }
}

function StageCard({ stage, index }: { stage: ServiceStage; index: number }) {
  const Icon = stage.icon;
  const price = priceLine(stage);
  return (
    <Reveal>
      <section id={stage.slug} className="scroll-mt-28">
        <Surface blob={(["a", "b", "c"] as const)[index % 3]} className="p-7 sm:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <Icon className="h-6 w-6 text-cyan-core" aria-hidden />
            <h2 className="display text-2xl text-warm-white sm:text-[1.75rem]">{stage.name}</h2>
            {price ? (
              <span className="ml-auto rounded-full border border-cyan-core/30 bg-cyan-faint px-3.5 py-1.5 text-xs font-medium text-cyan-soft">
                {price}
              </span>
            ) : (
              <span className="ml-auto rounded-full border border-edge/70 px-3.5 py-1.5 text-xs text-warm-dim">
                Scoped after discovery
              </span>
            )}
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-warm-mist">{stage.problem}</p>

          <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase">
                What BSTS does
              </h3>
              <ul className="mt-3.5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {stage.work.map((w) => (
                  <li key={w} className="flex gap-2.5 text-sm leading-snug text-warm-mist">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core/80"
                    />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase">
                  What you are left holding
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">{stage.deliverable}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase">
                  Engagement format
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">{stage.format}</p>
              </div>
            </div>
          </div>

          {stage.boundary ? (
            <p className="mt-7 border-l-2 border-gold-core/50 pl-4 text-sm leading-relaxed text-gold-soft">
              {stage.boundary}
            </p>
          ) : null}
        </Surface>
      </section>
    </Reveal>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-10">
          <SectionHeading
            as="h1"
            eyebrow="Services & pricing"
            title="One engagement system, five stages."
            lede="Every organization arrives at a different point in this sequence, and each stage stands on its own. Most start with an assessment and decide from there."
          />

          <Reveal delay={0.08}>
            <ol className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
              {lifecycle.map((stage, i) => (
                <li key={stage.slug} className="flex items-center gap-2">
                  <a
                    href={`#${stage.slug}`}
                    className="rounded-full border border-edge/70 px-4 py-2 text-warm-mist transition-colors hover:border-cyan-core/50 hover:text-cyan-soft"
                  >
                    {stage.name}
                  </a>
                  {i < lifecycle.length - 1 ? (
                    <ArrowRight className="h-3.5 w-3.5 text-warm-dim" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-6">
        {lifecycle.map((stage, i) => (
          <StageCard key={stage.slug} stage={stage} index={i} />
        ))}
      </div>

      {/* ------------------------ Digital Foundations ------------------------ */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase">
            Supporting category
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-warm-dim">
            Digital Foundations is the infrastructure layer underneath the work above — secure,
            dependable, and maintained. It is not the centre of what BSTS does.
          </p>
        </Reveal>
        <div className="mt-5">
          <StageCard stage={digitalFoundations} index={5} />
        </div>

        <Reveal>
          <Surface quiet className="mt-6 p-7 sm:p-8">
            <h3 className="text-sm font-semibold text-warm-white">Digital Foundations pricing</h3>
            <ul className="mt-4 divide-y divide-edge/40">
              {foundationsPricing.map((f) => (
                <li
                  key={f.item}
                  className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-sm text-warm-mist">{f.item}</span>
                  <span className="text-sm font-medium text-cyan-soft">{f.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-warm-dim">{foundationsExclusions}</p>
          </Surface>
        </Reveal>
      </div>

      {/* ----------------------------- How pricing works ---------------------- */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <Surface quiet blob="b" className="p-7 sm:p-9">
            <h2 className="display text-xl text-warm-white">How pricing works here</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-warm-mist">{progression}</p>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {pricingRules.map((rule) => (
                <li key={rule} className="flex gap-2.5 text-sm leading-snug text-warm-mist">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core/80"
                  />
                  {rule}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-medium text-gold-soft">{finalScopeNote}</p>
            <p className="mt-4 text-xs leading-relaxed text-warm-dim">{soc2Boundary}</p>
          </Surface>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <h2 className="display text-2xl text-warm-white">Start where it makes sense.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-warm-mist">
              The Bevier Breakdown is a short self-assessment — plain language, nothing sensitive,
              and nothing is transmitted until you choose to send it.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <LinkButton href="/#assessment">
                Start the Bevier Breakdown <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
              <LinkButton href="/start" variant="ghost">
                Start a Discovery Conversation
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
