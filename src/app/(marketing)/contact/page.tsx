import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { DiscoveryForm } from "@/components/marketing/DiscoveryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Discovery Conversation",
  description:
    "Talk to BSTS directly about securing AI adoption, automating high-value work, connecting existing systems, or preparing defensible controls and evidence.",
};

/**
 * The discovery-conversation path — a person, not a triage tool.
 *
 * The public Bevier Breakdown lives on the landing page at /#assessment and
 * is reached from the printed brochure QR codes via /start/. This page is
 * the alternative for a visitor who would rather just talk.
 */
const paths = [
  {
    title: "Commercial discovery",
    body: "You run the organization, or you own the problem inside it. Start here for AI adoption, automation, integration, security, or compliance readiness work.",
  },
  {
    title: "Government capability briefing",
    body: "Agency, prime, or program office. See the capability statement first if you need something to circulate internally.",
    href: "/government",
    linkLabel: "Government capabilities",
  },
  {
    title: "Teaming or subcontracting",
    body: "You hold a vehicle or a prime position and need secure-AI, automation, or compliance-readiness capability on a team.",
  },
  {
    title: "Advisor or referral introduction",
    body: "You advise organizations that keep hitting these problems and want to know what BSTS does before you put your name on an introduction.",
    href: "/advisors",
    linkLabel: "How the advisor path works",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-10">
          <SectionHeading
            as="h1"
            eyebrow="Discovery conversation"
            title="Start a discovery conversation."
            lede="No pitch deck and no obligation. Tell us roughly what prompted this and you'll get a direct reply — including an honest answer if BSTS is not the right fit."
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-warm-dim">
              Prefer to see something first? The{" "}
              <Link
                href="/#assessment"
                className="text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
              >
                Bevier Breakdown
              </Link>{" "}
              is a free set of plain questions that runs entirely in your
              browser and shows its own reasoning. Nothing is transmitted from
              it unless you choose to send it.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-16 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <DiscoveryForm />
        </Reveal>

        <div className="space-y-4">
          {paths.map((p, i) => (
            <Reveal key={p.title} delay={staggerDelay(Math.min(i, 3))}>
              <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="p-6">
                <h2 className="font-semibold text-warm-white">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-warm-mist">{p.body}</p>
                {"href" in p && p.href ? (
                  <Link
                    href={p.href}
                    className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
                  >
                    {p.linkLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
              </Surface>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <Surface quiet blob="b" className="p-6">
              <h2 className="font-semibold text-warm-white">Rather use email?</h2>
              <p className="mt-2 text-sm leading-relaxed text-warm-mist">
                Write to{" "}
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="text-cyan-soft underline underline-offset-4 hover:text-cyan-core"
                >
                  {site.contactEmail}
                </a>
                . {site.responsePromise}
              </p>
            </Surface>
          </Reveal>
        </div>
      </div>
    </>
  );
}
