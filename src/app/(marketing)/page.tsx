import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  FileText,
  Lock,
  MessagesSquare,
  RefreshCw,
  Workflow,
} from "lucide-react";
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
          {/* Hero content renders immediately (no scroll-reveal) so the LCP
              headline is never gated behind JS. */}
          <div>
            <p className="eyebrow">
              Service-Disabled Veteran-Owned · Secure AI &amp; Automation
            </p>
            <h1 className="display mt-6 text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Technology built around{" "}
              <span className="text-cyan-soft">your business.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm-mist">
              We automate the busywork, connect the tools that don&apos;t talk to
              each other, and secure the whole thing — without ripping out what
              already works.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <LinkButton href="/contact">
                Start your assessment <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
              <LinkButton href="/method" variant="ghost">
                See how we work
              </LinkButton>
            </div>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-warm-dim">
              {site.promise}
            </p>
          </div>
          <div className="relative">
            <Surface blob="a" className="grain relative overflow-hidden p-6 sm:p-8">
              <SystemsDiagram className="h-auto w-full" />
            </Surface>
          </div>
        </div>
      </section>

      {/* 2 — The BSTS difference */}
      <section className="relative" aria-labelledby="difference-heading">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              id="difference-heading"
              eyebrow="The BSTS difference"
              title="We make what you already own work harder."
              lede="Most firms earn their keep convincing you to start over. We earn ours by right-sizing the fix — connecting, automating, and securing the systems your team already knows, and replacing something only when replacement genuinely wins."
            />
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "No rip-and-replace reflex",
                  body: "Every recommendation carries a written reason. A system that works, integrates, and is secure enough to keep — stays. We right-size the fix; target overkill is just wasted rounds.",
                },
                {
                  title: "No licenses, no commissions",
                  body: "BSTS resells nothing. Our only incentive is the one you set: an operation that runs smoother than it did last quarter.",
                },
                {
                  title: "Portable by design",
                  body: "Everything we deliver is documented and handover-ready. If we ever part ways, your stack stays yours — connected, automated, and understood.",
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

      {/* 3 — What we build */}
      <section className="relative mx-auto max-w-6xl px-6 py-16" aria-labelledby="automations-heading">
        <SectionHeading
          id="automations-heading"
          eyebrow="AI that does the work, not the talking"
          title="The automations we actually build."
          lede="Working systems, not slideware — each one keeping a human at the decision point where judgment matters."
        />
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {pillars.map((p) => (
              <Link
                key={p.slug}
                href={`/solutions#${p.slug}`}
                className="rounded-full border border-edge px-4 py-1.5 text-sm text-warm-mist transition-colors hover:border-cyan-core/50 hover:text-cyan-soft"
              >
                {p.title}
              </Link>
            ))}
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 px-2 text-sm font-medium text-cyan-soft hover:text-cyan-core"
            >
              All five lanes <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: MessagesSquare,
              title: "AI request triage",
              body: "An AI layer reads incoming email, forms, and messages — routes them, drafts replies, and flags only what needs you.",
              replaces: "Replaces: the inbox that eats your morning",
            },
            {
              icon: FileText,
              title: "AI documents & quotes",
              body: "Turn a short intake into finished proposals, quotes, and contracts in your own template — in seconds, not hours.",
              replaces: "Replaces: rebuilding the same doc every time",
            },
            {
              icon: Bot,
              title: "AI assistant on your knowledge",
              body: "A private assistant that answers staff and customer questions from your own policies, manuals, and past work — 24/7.",
              replaces: "Replaces: answering the same question twice",
            },
            {
              icon: RefreshCw,
              title: "Connected data flow",
              body: "Stop re-typing. A record entered once appears everywhere it is needed, automatically, with an audit trail.",
              replaces: "Replaces: copy-paste between systems",
            },
            {
              icon: BarChart3,
              title: "Reports that build themselves",
              body: "Live dashboards assembled from your systems, plus alerts the moment a number crosses a line you care about.",
              replaces: "Replaces: the Monday spreadsheet ritual",
            },
            {
              icon: Workflow,
              title: "Follow-up on autopilot",
              body: "Every lead, invoice, and hand-off gets a timely, automated nudge — so nothing quietly slips through the cracks.",
              replaces: "Replaces: revenue lost to 'we forgot'",
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={staggerDelay(i % 3)}>
                <Surface quiet blob={(["a", "b", "c"] as const)[i % 3]} className="h-full p-6">
                  <Icon className="h-6 w-6 text-cyan-core" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-warm-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-warm-mist">{card.body}</p>
                  <p className="mt-4 text-xs font-medium tracking-wide text-gold-soft">
                    {card.replaces}
                  </p>
                </Surface>
              </Reveal>
            );
          })}
        </div>
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
              lede="You judge us on shipped software, not a strategy deck — with a fixed, written scope agreed before work begins, and no lock-in, ever."
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

      {/* 5 — Founder authority + Master Gunner standard */}
      <section className="relative mx-auto max-w-6xl px-6 py-16" aria-labelledby="founder-heading">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              id="founder-heading"
              eyebrow="Who you work with"
              title="Led by a practitioner, not a sales team."
              lede="A Master Gunner is the soldier who certifies the tank's weapon system works before the crew stakes their lives on it. Jacob Bevier brought that bar home — trained in both AI and cybersecurity, he signs off on every BSTS engagement personally."
              gold
            />
            <Reveal delay={0.12}>
              <blockquote className="mt-8 border-l-2 border-gold-core/50 pl-5 text-lg leading-relaxed text-warm-white">
                Zero rounds fired without a verified target. Zero systems shipped
                without a verified control.
              </blockquote>
            </Reveal>
            <Reveal delay={0.18}>
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
      </section>

      {/* 6 — Security trust strip */}
      <section className="relative" aria-labelledby="security-heading">
        <CurveDivider />
        <div className="grain bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow">Security is half the name</p>
                <h2 className="display mt-3 text-2xl text-warm-white sm:text-3xl">
                  A foundation you can hand your insurer without flinching.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-warm-mist">
                  NIST-aligned and informed by NIST CSF 2.0, OWASP secure development,
                  and Zero Trust. We say what we are — and never say certified,
                  compliant, or guaranteed secure.
                </p>
                <div className="mt-6">
                  <LinkButton href="/security" variant="ghost">
                    Our security posture <ArrowRight className="h-4 w-4" aria-hidden />
                  </LinkButton>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:max-w-md">
                {[
                  "Least-privilege access review on every engagement",
                  "Encryption in transit and at rest by default",
                  "Humans approve consequential AI actions",
                  "Private data stays inside agreed boundaries",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* 7 — Final assessment CTA */}
      <section className="relative overflow-hidden" aria-labelledby="cta-heading">
        <Atmosphere variant="gold" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <SectionHeading
            id="cta-heading"
            center
            eyebrow="Start here"
            title="See what you could reclaim — free, in about five minutes."
            lede="The BSTS technology assessment costs nothing and commits you to nothing. Even if we never speak again, the act of answering it tends to clarify what your stack needs."
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
