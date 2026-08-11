import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Handshake, Quote } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { TracerRule } from "@/components/ui/TracerRule";
import {
  advisors,
  serviceAreas,
  soc2Boundary,
  triggers,
} from "@/lib/content/positioning";
import { frameworkDisclaimer, vetCert } from "@/lib/site";

export const metadata: Metadata = {
  title: "For Advisors & Referral Partners",
  description:
    "A field guide for consultants, fractional executives, CPAs, MSPs, and attorneys: how to recognize when a client has a problem sitting between AI, security, automation, and compliance — and what happens after an introduction to BSTS.",
  keywords: [
    "technology referral partner",
    "consultant referral",
    "fractional CFO technology advisor",
    "MSP compliance partner",
    "CPA SOC 2 readiness referral",
  ],
};

export default function AdvisorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="gold" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-14">
          <SectionHeading
            as="h1"
            gold
            eyebrow="For advisors & referral partners"
            title={advisors.headline}
            lede={advisors.body}
          />
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-3">
              {advisors.audiences.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-edge/70 bg-obsidian/50 px-3.5 py-1.5 text-xs text-warm-mist"
                >
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The triggers — the centerpiece of this page */}
      <section
        className="mx-auto max-w-6xl px-6 pb-16"
        aria-labelledby="advisor-triggers-heading"
      >
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">The recognition list</p>
            <h2
              id="advisor-triggers-heading"
              className="display mt-3 text-3xl text-warm-white sm:text-4xl"
            >
              When your client says…
            </h2>
            <TracerRule className="mx-auto mt-4 max-w-[16rem]" />
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warm-mist">
              You do not need to understand AI engineering to spot these. Each
              one is a sentence a client says out loud, usually in the middle of
              a conversation about something else entirely.
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {triggers.map((t, i) => (
            <Reveal as="li" key={t.quote} delay={staggerDelay(i % 2)}>
              <Surface
                quiet
                blob={(["a", "b", "c"] as const)[i % 3]}
                className="flex h-full gap-4 p-6"
              >
                <Quote className="mt-0.5 h-5 w-5 shrink-0 text-gold-core/70" aria-hidden />
                <div>
                  <p className="leading-relaxed text-warm-white">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-xs font-semibold tracking-[0.12em] text-cyan-soft uppercase">
                    → {t.area}
                  </p>
                </div>
              </Surface>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="display mt-10 text-center text-2xl text-gold-soft sm:text-3xl">
            That&apos;s a BSTS conversation.
          </p>
        </Reveal>
      </section>

      {/* What BSTS would actually do for their client */}
      <section
        className="mx-auto max-w-6xl px-6 pb-16"
        aria-labelledby="what-we-do-heading"
      >
        <Reveal>
          <h2
            id="what-we-do-heading"
            className="display text-2xl text-warm-white sm:text-3xl"
          >
            What we would actually do for them.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-mist">
            So you can describe it accurately without having to represent us.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {serviceAreas.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.slug} delay={staggerDelay(i)}>
                <Surface blob={(["a", "b", "c"] as const)[i]} className="h-full p-7">
                  <span
                    className={`w-fit rounded-full p-2.5 ${
                      i === 1 ? "bg-gold-faint" : "bg-cyan-faint"
                    } inline-block`}
                  >
                    <Icon
                      className={`h-5 w-5 ${i === 1 ? "text-gold-core" : "text-cyan-core"}`}
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-warm-white">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-mist">
                    {a.cardLine}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-edge/50 pt-4">
                    {a.work.slice(0, 4).map((w) => (
                      <li
                        key={w}
                        className="flex gap-2.5 text-xs leading-relaxed text-warm-dim"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-core"
                        />
                        {w}
                      </li>
                    ))}
                  </ul>
                </Surface>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* What happens after an introduction */}
      <section
        className="mx-auto max-w-6xl px-6 pb-16"
        aria-labelledby="after-intro-heading"
      >
        <div className="text-center">
          <p className="eyebrow">After an introduction</p>
          <h2
            id="after-intro-heading"
            className="display mt-3 text-3xl text-warm-white sm:text-4xl"
          >
            Four steps, and none of them cost you anything.
          </h2>
        </div>
        <ol className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advisors.howItWorks.map((s, i) => (
            <Reveal as="li" key={s.title} delay={staggerDelay(i)}>
              <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-6">
                <p className="display text-2xl text-gold-soft">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-warm-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-mist">{s.body}</p>
              </Surface>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-warm-dim">
            {advisors.note}
          </p>
        </Reveal>
      </section>

      {/* How BSTS complements rather than replaces */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <Reveal>
          <Surface className="border-gold-core/35 p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gold-faint p-2.5">
                <Handshake className="h-5 w-5 text-gold-core" aria-hidden />
              </span>
              <h2 className="display text-2xl text-warm-white">
                We complement your relationship. We do not compete with it.
              </h2>
            </div>
            <ul className="mt-6 space-y-3.5">
              {[
                "BSTS does not provide accounting, audit, legal, or tax services, and does not attempt to. Your client keeps you for what you do.",
                "BSTS does not resell licenses or take vendor commissions, so there is no hidden product agenda behind a recommendation.",
                "BSTS works alongside an existing MSP or IT provider rather than displacing them — most of our work sits above the layer they operate.",
                "You keep the relationship and the credit. We keep you informed at whatever level your client is comfortable with.",
                "If BSTS is not the right fit, we say so quickly and directly rather than stretching a scope to fill a gap.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core"
                  />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-edge/50 pt-5 text-xs leading-relaxed text-warm-dim">
              {soc2Boundary} If your client needs the examination itself, we
              will help them prepare for it and work alongside the CPA firm they
              select.
            </p>
          </Surface>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20 text-center">
        <SectionHeading
          center
          gold
          eyebrow="Next step"
          title="Have a client who might fit?"
          lede="Start with a conversation. No agreement to sign, no portal to join, and no obligation on your client's part."
        />
        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/#assessment">
              Start a discovery conversation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <Link href="/#services" className="btn-ghost-form">
              See the full capability set
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 text-xs tracking-[0.14em] text-gold-soft uppercase">
            {vetCert.short}
          </p>
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-warm-dim">
          {frameworkDisclaimer}
        </p>
      </section>
    </>
  );
}
