import Link from "next/link";
import { ArrowRight, Lock, MonitorCog, Puzzle } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CurveDivider } from "@/components/ui/CurveDivider";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { PointerHalo } from "@/components/marketing/PointerHalo";
import { SystemsDiagram } from "@/components/marketing/SystemsDiagram";
import { pillars } from "@/lib/content/pillars";
import { methodStages } from "@/lib/content/method";
import { solara, solaraLabel } from "@/lib/content/solara";
import { founder } from "@/lib/content/founder";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <PointerHalo />

      {/* 1 — Hero */}
      <section className="relative isolate overflow-hidden">
        <Atmosphere />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 pt-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-24">
          <div>
            <Reveal>
              <p className="eyebrow">Boutique technology transformation · Secure AI</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display mt-6 text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
                Technology built around{" "}
                <span className="text-cyan-soft">your business.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm-mist">
                {site.subline} BSTS is a boutique firm for organizations that
                want their technology transformed — not replaced.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <LinkButton href="/contact">
                  Start your assessment <ArrowRight className="h-4 w-4" aria-hidden />
                </LinkButton>
                <LinkButton href="/method" variant="ghost">
                  See how we work
                </LinkButton>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="mt-10 max-w-xl text-sm leading-relaxed text-warm-dim">
                {site.promise}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="relative">
            <Surface blob="a" className="grain relative overflow-hidden p-6 sm:p-8">
              <SystemsDiagram className="h-auto w-full" />
            </Surface>
          </Reveal>
        </div>
      </section>

      {/* 2 — Existing-foundation proposition */}
      <section className="relative" aria-labelledby="foundation-heading">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              id="foundation-heading"
              eyebrow="The BSTS difference"
              title="Your existing systems are an asset, not an embarrassment."
              lede="Most consultancies earn their keep by convincing you to start over. We earn ours by making what you already own work harder. The fluency your team has in its current tools is real operational capital — we protect it, connect around it, and replace things only when replacement genuinely wins."
            />
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "No rip-and-replace reflex",
                  body: "Every recommendation carries a written reason. A system that works, integrates, and is secure enough to keep — stays.",
                },
                {
                  title: "Weeks of disruption avoided",
                  body: "Connection and automation projects land in weeks and leave muscle memory intact. Migration is the last resort, not the opening offer.",
                },
                {
                  title: "No licenses, no commissions",
                  body: "BSTS resells nothing. Our only incentive is the one you set: an operation that runs smoother than it did last quarter.",
                },
              ].map((card, i) => (
                <Reveal key={card.title} delay={staggerDelay(i)}>
                  <Surface quiet blob={(["a", "b", "c"] as const)[i % 3]} className="h-full p-7">
                    <h3 className="text-lg font-semibold text-warm-white">{card.title}</h3>
                    <p className="mt-3 leading-relaxed text-warm-mist">{card.body}</p>
                  </Surface>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* 3 — Solution pillars */}
      <section className="relative mx-auto max-w-6xl px-6 py-16" aria-labelledby="pillars-heading">
        <SectionHeading
          id="pillars-heading"
          eyebrow="Five lanes, one promise"
          title="Everything we do fits one honest sentence."
          lede={site.promise}
        />
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal as="li" key={pillar.slug} delay={staggerDelay(i)}>
                <Link
                  href={`/solutions#${pillar.slug}`}
                  className="surface group block h-full rounded-[2rem] p-7 transition-colors hover:border-cyan-core/50"
                >
                  <Icon className="h-6 w-6 text-cyan-core" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-warm-white group-hover:text-cyan-soft">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs tracking-wide text-gold-soft uppercase">
                    {pillar.promiseLine}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-warm-mist">
                    {pillar.summary}
                  </p>
                </Link>
              </Reveal>
            );
          })}
          <Reveal as="li" delay={staggerDelay(5)}>
            <div className="flex h-full flex-col justify-center rounded-[2rem] border border-dashed border-edge p-7">
              <p className="text-sm leading-relaxed text-warm-dim">
                Not sure which lane your problem lives in? That is normal — most
                problems live in two.
              </p>
              <Link
                href="/solutions"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-soft hover:text-cyan-core"
              >
                Explore all solutions <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </ul>
      </section>

      {/* 4 — The BSTS Method */}
      <section className="relative" aria-labelledby="method-heading">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              id="method-heading"
              eyebrow="The BSTS Method"
              title="Five stages. A working pilot by week six."
              lede="No black-box discovery phases, no strategy decks that never ship. The method is public because we are happy to be held to it."
            />
            <ol className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-5">
              {methodStages.map((stage, i) => (
                <Reveal as="li" key={stage.number} delay={staggerDelay(i)}>
                  <div className="surface-quiet blob-b h-full p-6">
                    <p className="display text-2xl text-gold-soft">{stage.number}</p>
                    <h3 className="mt-2 font-semibold text-warm-white">{stage.name}</h3>
                    <p className="text-xs text-warm-dim">{stage.duration}</p>
                    <p className="mt-3 text-sm leading-relaxed text-warm-mist">
                      {stage.summary}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2} className="mt-8">
              <Link
                href="/method"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-soft hover:text-cyan-core"
              >
                Read the full method <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* 5 — Hospitality concept demonstration */}
      <section className="relative mx-auto max-w-6xl px-6 py-16" aria-labelledby="solara-heading">
        <Reveal>
          <p className="inline-block rounded-full border border-gold-core/40 bg-gold-faint px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-gold-soft">
            {solaraLabel}
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Hospitality, made concrete"
              title={`${solara.name}: a fictional hotel, a real approach.`}
              lede={solara.descriptor}
              gold
            />
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3">
                {solara.before.frictions.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-alert/80" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8">
                <LinkButton href="/industries/hospitality" variant="gold">
                  Walk through the full demonstration
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </LinkButton>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 content-start gap-4">
            {solara.moves.map((move, i) => (
              <Reveal key={move.lane} delay={staggerDelay(i)}>
                <Surface quiet blob={(["a", "b", "c"] as const)[i % 3]} className="p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="rounded-full bg-cyan-faint px-3 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-cyan-soft uppercase">
                      {move.lane}
                    </span>
                    <h3 className="font-semibold text-warm-white">{move.title}</h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">{move.body}</p>
                </Surface>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Security-first */}
      <section className="relative" aria-labelledby="security-heading">
        <CurveDivider />
        <div className="grain relative bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <SectionHeading
                  id="security-heading"
                  eyebrow="Security first, honestly stated"
                  title="A foundation you can describe to your insurer without flinching."
                  lede="Our practice is NIST-aligned and informed by NIST CSF 2.0, OWASP secure-development guidance, and Zero Trust principles. For teams headed toward SOC 2, we provide readiness support — and we are precise that readiness is not certification."
                />
                <Reveal delay={0.15}>
                  <ul className="mt-8 space-y-3">
                    {[
                      "Identity, access, and least-privilege review on every engagement",
                      "Encryption in transit and at rest as a default, not an upsell",
                      "A written incident-response starting point your team has actually read",
                      "Responsible AI boundaries: private data stays private, humans approve actions",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.22}>
                  <div className="mt-8">
                    <LinkButton href="/security" variant="ghost">
                      Our security posture <ArrowRight className="h-4 w-4" aria-hidden />
                    </LinkButton>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.15}>
                <Surface blob="c" className="p-8">
                  <h3 className="text-sm font-semibold tracking-[0.16em] text-warm-dim uppercase">
                    Plain-language claims policy
                  </h3>
                  <dl className="mt-5 space-y-4 text-sm">
                    {[
                      ["We say", "NIST-aligned · SOC 2 readiness support · OWASP-informed"],
                      ["We never say", "certified · compliant · government approved · guaranteed secure"],
                      ["Because", "framework references describe our methodology — they do not imply certification, endorsement, or an audit opinion."],
                    ].map(([term, def]) => (
                      <div key={term}>
                        <dt className="font-semibold text-gold-soft">{term}</dt>
                        <dd className="mt-1 leading-relaxed text-warm-mist">{def}</dd>
                      </div>
                    ))}
                  </dl>
                </Surface>
              </Reveal>
            </div>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* 7 — Existing-stack customization */}
      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="stack-heading">
        <SectionHeading
          id="stack-heading"
          eyebrow="Built to fit"
          title="We customize around your stack — whatever your stack is."
          lede="Property systems, point of sale, practice management, spreadsheets with ten years of institutional memory: we meet your tools where they are. Integration through real APIs where they exist, resilient auditable bridges where they do not."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Puzzle,
              title: "Adapters, not ultimatums",
              body: "Your vendors do not have to change for your systems to cooperate. We build the adapter layer that makes cooperation possible.",
            },
            {
              icon: MonitorCog,
              title: "Your vocabulary, your workflows",
              body: "Tools we build use the words your team already uses. Software that fights its users gets routed around — so we design with the people on shift.",
            },
            {
              icon: Lock,
              title: "Portable by design",
              body: "Everything we deliver is documented and handover-ready. If we ever part ways, your stack remains yours — connected, automated, and understood.",
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={staggerDelay(i)}>
                <Surface quiet blob={(["b", "c", "a"] as const)[i % 3]} className="h-full p-7">
                  <Icon className="h-6 w-6 text-cyan-core" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-warm-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-warm-mist">{card.body}</p>
                </Surface>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 8 — Founder authority */}
      <section className="relative" aria-labelledby="founder-heading">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div>
                <SectionHeading
                  id="founder-heading"
                  eyebrow="Who you work with"
                  title="Led by a practitioner, not a sales team."
                  lede="Every BSTS engagement is led by founder Jacob Bevier — trained in both artificial intelligence and cybersecurity, and shaped by environments where systems have to work under pressure."
                  gold
                />
                <Reveal delay={0.15}>
                  <div className="mt-8">
                    <LinkButton href="/about" variant="ghost">
                      About the founder <ArrowRight className="h-4 w-4" aria-hidden />
                    </LinkButton>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.1}>
                <Surface blob="a" className="p-8">
                  <p className="font-semibold text-warm-white">{founder.name}</p>
                  <p className="text-sm text-warm-dim">{founder.role}</p>
                  <ul className="mt-5 space-y-2.5">
                    {[...founder.credentials, ...founder.experience].map((c) => (
                      <li key={c} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-core" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </Surface>
              </Reveal>
            </div>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* 9 — BSTS OS preview */}
      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="os-heading">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              id="os-heading"
              eyebrow="BSTS OS"
              title="The operating system behind every engagement."
              lede="Assessments, roadmaps, projects, risks, automations, and decisions — one connected workspace, the same discipline we bring to your stack applied to our own. Explore the interactive demonstration with fictional data."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton href="/os">
                  Open the OS demo <ArrowRight className="h-4 w-4" aria-hidden />
                </LinkButton>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 text-xs leading-relaxed text-warm-dim">
                Demonstration environment — do not enter real client or
                sensitive information.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Surface blob="b" className="grain relative overflow-hidden p-6">
              {/* Stylized OS preview — honest miniature, not a fake dashboard screenshot */}
              <div aria-hidden className="rounded-[1.5rem] border border-edge/70 bg-obsidian-deep p-4">
                <div className="flex items-center justify-between border-b border-edge/50 pb-3">
                  <span className="text-[0.65rem] tracking-[0.2em] text-cyan-soft">BSTS OS · DEMO</span>
                  <span className="h-2 w-2 rounded-full bg-ok/80" />
                </div>
                <div className="mt-4 grid grid-cols-[86px_1fr] gap-4">
                  <div className="space-y-2">
                    {["Overview", "Prospects", "Projects", "Risks", "Decisions"].map((m, i) => (
                      <div
                        key={m}
                        className={`rounded-full px-3 py-1.5 text-[0.6rem] ${
                          i === 0 ? "bg-cyan-faint text-cyan-soft" : "text-warm-dim"
                        }`}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="blob-c surface-quiet h-16 p-3">
                      <div className="h-2 w-24 max-w-full rounded-full bg-warm-dim/40" />
                      <div className="mt-2 h-2 w-32 max-w-full rounded-full bg-cyan-core/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="blob-a surface-quiet h-14 p-3">
                        <div className="h-2 w-16 max-w-full rounded-full bg-warm-dim/40" />
                        <div className="mt-2 h-2 w-10 max-w-full rounded-full bg-gold-core/60" />
                      </div>
                      <div className="blob-b surface-quiet h-14 p-3">
                        <div className="h-2 w-14 max-w-full rounded-full bg-warm-dim/40" />
                        <div className="mt-2 h-2 w-16 max-w-full rounded-full bg-cyan-core/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Surface>
          </Reveal>
        </div>
      </section>

      {/* 10 — Final assessment CTA */}
      <section className="relative overflow-hidden" aria-labelledby="cta-heading">
        <Atmosphere variant="gold" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <SectionHeading
            id="cta-heading"
            center
            eyebrow="Start here"
            title="Tell us how your operation actually runs."
            lede="The BSTS technology assessment takes about ten minutes. It costs nothing, commits you to nothing, and even if we never speak again, the act of answering it tends to clarify what your stack needs."
          />
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <LinkButton href="/contact" className="px-8 py-3.5 text-base">
                Begin the assessment <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
              <LinkButton href="/insights" variant="ghost">
                Read our thinking first
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
