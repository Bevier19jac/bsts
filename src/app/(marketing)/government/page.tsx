import type { Metadata } from "next";
import { ArrowRight, FileText, Star } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { CurveDivider } from "@/components/ui/CurveDivider";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { TracerRule } from "@/components/ui/TracerRule";
import { FederalContactForm } from "@/components/government/FederalContactForm";
import {
  federalCapabilities,
  federalEngagements,
  federalPositioning,
  federalWhy,
} from "@/lib/content/federal";
import {
  acquisition,
  capabilityStatementPath,
  federalDisclaimerFull,
  vetCert,
  visibleAcquisitionFields,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Government | Secure AI, Automation & Cybersecurity | BSTS" },
  description:
    "BSTS supports federal agencies and government contractors with secure AI implementation, AI governance, workflow automation, knowledge systems, cybersecurity documentation, and principal-led modernization.",
};

export default function GovernmentPage() {
  return (
    <>
      {/* Federal hero */}
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="gold" />
        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-12 text-center sm:pt-12">
          <Reveal quick>
            <p className="eyebrow eyebrow-gold">
              Federal Missions · Secure AI · Operational Modernization
            </p>
          </Reveal>
          <Reveal quick delay={0.04}>
            <p className="mt-4 inline-block rounded-full border border-gold-core/45 bg-gold-faint px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] text-gold-soft uppercase">
              {vetCert.badge}
            </p>
          </Reveal>
          <Reveal quick delay={0.08}>
            <h1 className="display mx-auto mt-6 max-w-3xl text-4xl leading-[1.1] sm:text-5xl">
              Secure AI and automation built for{" "}
              <span className="text-cyan-soft">mission execution.</span>
            </h1>
          </Reveal>
          <Reveal quick delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-warm-mist">
              BSTS helps federal agencies and government contractors identify
              responsible AI use cases, automate document-heavy workflows,
              connect existing systems, and implement human-supervised
              technology with security, governance, and documentation built
              in.
            </p>
          </Reveal>
          <Reveal quick delay={0.16}>
            <p className="mx-auto mt-3 max-w-2xl text-sm tracking-[0.08em] text-gold-soft uppercase">
              Operational discipline. Technical depth. Principal-led delivery.
            </p>
          </Reveal>
          <Reveal quick delay={0.2}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <LinkButton href="#federal-contact">
                Request a Capability Briefing <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
              <LinkButton href="#federal-contact" variant="ghost">
                Discuss a Teaming Opportunity
              </LinkButton>
              <LinkButton href="#capabilities" variant="gold">
                View Core Capabilities
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Positioning */}
      <section className="mx-auto max-w-6xl px-6" aria-labelledby="positioning-heading">
        <Surface blob="a" className="grain relative overflow-hidden p-7 sm:p-10">
          <h2 id="positioning-heading" className="display max-w-3xl text-2xl text-warm-white sm:text-3xl">
            {federalPositioning.central}
          </h2>
          <TracerRule />
          <p className="mt-5 max-w-3xl leading-relaxed text-warm-mist">
            {federalPositioning.full}
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-warm-mist">
            <span className="font-semibold text-warm-white">For prime contractors: </span>
            {federalPositioning.primes}
          </p>
        </Surface>
      </section>

      {/* Core capabilities */}
      <section id="capabilities" className="mx-auto mt-16 max-w-6xl scroll-mt-28 px-6" aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading" className="display text-center text-3xl text-warm-white sm:text-4xl">
          Federal core capabilities.
        </h2>
        <TracerRule className="mx-auto mt-4 max-w-[14rem]" />
        <div className="mt-10 space-y-6">
          {federalCapabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.slug} delay={staggerDelay(Math.min(i, 2))}>
                <Surface blob={(["a", "b", "c", "a"] as const)[i]} className="grid grid-cols-1 gap-6 p-7 sm:p-8 lg:grid-cols-[1.15fr_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-cyan-faint p-2">
                        <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                      </span>
                      <h3 className="text-lg font-semibold text-warm-white">{c.title}</h3>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-cyan-soft">
                      {c.outcome}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-warm-mist">{c.summary}</p>
                    <p className="mt-4 rounded-2xl border border-edge/60 bg-graphite/60 p-4 text-xs leading-relaxed text-warm-dim">
                      {c.boundary}
                    </p>
                  </div>
                  <div className="surface-quiet rounded-3xl p-5">
                    <h4 className="text-[0.65rem] font-semibold tracking-[0.16em] text-warm-dim uppercase">
                      Representative deliverables
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {c.deliverables.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <details className="group mt-4 border-t border-edge/50 pt-3">
                      <summary className="cursor-pointer list-none rounded-lg text-sm font-medium text-cyan-soft transition-colors hover:text-cyan-core focus-visible:outline-2 focus-visible:outline-cyan-core">
                        <span aria-hidden className="mr-1.5 inline-block transition-transform duration-200 group-open:rotate-90">›</span>
                        More deliverables
                      </summary>
                      <ul className="mt-2.5 space-y-2">
                        {c.moreDeliverables.map((d) => (
                          <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </Surface>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Why BSTS */}
      <section className="relative mt-16" aria-labelledby="why-heading">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 id="why-heading" className="display text-3xl text-warm-white sm:text-4xl">
              Why BSTS.
            </h2>
            <TracerRule />
            <p className="mt-5 max-w-3xl leading-relaxed text-warm-mist">{federalWhy.lede}</p>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {federalWhy.points.map((p, i) => (
                <Reveal key={p.title} delay={staggerDelay(i % 2)}>
                  <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-7">
                    <p className="display text-lg text-gold-soft">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-semibold text-warm-white">{p.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">{p.body}</p>
                  </Surface>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-warm-dim">
              Founder experience is presented as founder experience — not as
              BSTS corporate past performance. Founder experience includes
              federal cybersecurity coordination, enterprise stakeholder
              engagement, operational leadership, technical instruction,
              automation development, dashboards, and technology
              implementation.
            </p>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* Engagement paths */}
      <section className="mx-auto mt-4 max-w-6xl px-6" aria-labelledby="engage-heading">
        <h2 id="engage-heading" className="display text-center text-3xl text-warm-white sm:text-4xl">
          Three ways to engage.
        </h2>
        <TracerRule className="mx-auto mt-4 max-w-[14rem]" />
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {federalEngagements.map((e, i) => (
            <Reveal key={e.title} delay={staggerDelay(i)}>
              <Surface quiet blob={(["a", "b", "c"] as const)[i]} className="flex h-full flex-col p-7">
                <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-warm-dim uppercase">
                  {e.audience}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-warm-white">{e.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-warm-mist">{e.body}</p>
                <p className="mt-4 border-t border-edge/50 pt-4 text-xs leading-relaxed text-warm-dim">
                  {e.note}
                </p>
              </Surface>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Acquisition profile */}
      <section id="acquisition" className="mx-auto mt-16 max-w-6xl scroll-mt-28 px-6" aria-labelledby="acquisition-heading">
        <Surface blob="b" className="border-gold-core/35 p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-gold-soft" aria-hidden />
              <h2 id="acquisition-heading" className="display text-2xl text-warm-white">
                Acquisition profile.
              </h2>
            </div>
            <LinkButton href={capabilityStatementPath} variant="gold">
              <FileText className="h-4 w-4" aria-hidden /> View Capability Statement
            </LinkButton>
          </div>
          <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {visibleAcquisitionFields().map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5 border-b border-edge/40 pb-3">
                <dt className="text-[0.65rem] font-semibold tracking-[0.16em] text-warm-dim uppercase">
                  {f.label}
                </dt>
                <dd className="text-sm text-warm-white">{f.value}</dd>
              </div>
            ))}
          </dl>
          {acquisition.statusLine ? (
            <p className="mt-5 text-xs leading-relaxed text-warm-dim">
              {acquisition.statusLine}
            </p>
          ) : null}
        </Surface>
      </section>

      {/* Federal contact */}
      <section id="federal-contact" className="mx-auto mt-16 max-w-4xl scroll-mt-28 px-6" aria-labelledby="fedcontact-heading">
        <h2 id="fedcontact-heading" className="display text-center text-3xl text-warm-white sm:text-4xl">
          Start the conversation.
        </h2>
        <TracerRule className="mx-auto mt-4 max-w-[14rem]" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-warm-mist">
          Request a capability briefing, discuss a teaming or subcontracting
          opportunity, share a sources-sought or RFI, or ask for the
          capability statement.
        </p>
        <div className="mt-8">
          <FederalContactForm />
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto mt-16 max-w-4xl px-6 pb-4 text-center">
        <h2 className="display text-3xl text-warm-white sm:text-4xl">
          Bring BSTS into the mission early.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-warm-mist">
          Whether you are conducting market research, assembling a proposal
          team, evaluating an AI use case, or defining a focused modernization
          requirement, BSTS can help turn the objective into a secure and
          executable work package.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <LinkButton href="#federal-contact">
            Request a Capability Briefing <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
          <LinkButton href="#federal-contact" variant="ghost">
            Discuss a Teaming Opportunity
          </LinkButton>
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-left text-xs leading-relaxed text-warm-dim">
          {federalDisclaimerFull}
        </p>
      </section>
    </>
  );
}
