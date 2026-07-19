import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { industries } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "BSTS works with boutique hospitality, professional services, local commerce, field services, health-adjacent practices, and nonprofits — operations with enterprise problems and small-team budgets.",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <SectionHeading
            eyebrow="Industries"
            title="Small teams. Enterprise-shaped problems."
            lede="The pattern repeats across sectors: capable people, decent tools, and no connective tissue between them. We bring the same keep-connect-automate-build-secure discipline to each industry — translated into its vocabulary."
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const featured = ind.status === "featured";
            const card = (
              <Surface
                blob={(["a", "b", "c"] as const)[i % 3]}
                quiet={!featured}
                className={`h-full p-8 transition-colors ${
                  featured ? "border-gold-core/40 hover:border-gold-core/70" : "hover:border-cyan-core/40"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className={`h-6 w-6 ${featured ? "text-gold-soft" : "text-cyan-core"}`} aria-hidden />
                  {featured ? (
                    <span className="rounded-full border border-gold-core/40 bg-gold-faint px-3 py-1 text-[0.62rem] font-semibold tracking-[0.14em] text-gold-soft uppercase">
                      Featured focus
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-warm-white">{ind.name}</h2>
                <p className="mt-1 text-sm text-warm-dim">{ind.headline}</p>
                <p className="mt-4 text-sm leading-relaxed text-warm-mist">{ind.summary}</p>
                <h3 className="mt-5 text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase">
                  Frictions we see
                </h3>
                <ul className="mt-3 space-y-2">
                  {ind.pains.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core/80" />
                      {p}
                    </li>
                  ))}
                </ul>
                {featured ? (
                  <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-soft">
                    Explore the hospitality demonstration
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </p>
                ) : null}
              </Surface>
            );
            return (
              <Reveal as="li" key={ind.slug} delay={staggerDelay(i % 2)}>
                {featured ? (
                  <Link href="/industries/hospitality" className="block h-full rounded-[2rem]">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>

      <section className="mx-auto max-w-4xl px-6 pb-16 text-center">
        <SectionHeading
          center
          eyebrow="Not on the list?"
          title="The method transfers. The vocabulary is the only thing that changes."
          lede="If your operation runs on disconnected systems and repetitive work, the assessment will translate it into a map we can act on — whatever the industry."
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
