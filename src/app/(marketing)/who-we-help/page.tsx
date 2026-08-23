import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Landmark, Handshake } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { industries } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "Who We Help",
  description:
    "BSTS works with growing organizations, government and public-sector programs, and the advisors who refer them — one method, three routes in.",
};

const audiences = [
  {
    href: null,
    icon: Building2,
    name: "Businesses",
    line: "Small-to-mid-size organizations",
    body: "Big enough that manual process is expensive and customers are asking security questions; small enough that there is no internal AI team, no security team, and no compliance function. That gap is the whole reason BSTS exists.",
  },
  {
    href: "/government",
    icon: Landmark,
    name: "Government",
    line: "Federal and public-sector delivery",
    body: "Contractors and agencies squeezed between compliance overhead and delivery. We automate the administrative layer — evidence collection, tracking, questionnaire responses, status reporting — so people work the findings instead of the paperwork.",
    cta: "Government capability",
  },
  {
    href: "/advisors",
    icon: Handshake,
    name: "Advisors & referral partners",
    line: "Accountants, consultants, fractional executives, MSPs",
    body: "You find the operational problems; BSTS builds the technical fixes without breaking what you have set up. Make the introduction, stay in the loop at whatever level your client wants, and take the credit.",
    cta: "Advisor field guide",
  },
] as const;

export default function WhoWeHelpPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="gold" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-10">
          <SectionHeading
            as="h1"
            eyebrow="Who we help"
            title="One method. Three routes in."
            lede="The work is the same shape whether it arrives through a business, a government program, or an advisor who already has the client's trust."
            gold
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-14">
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {audiences.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal as="li" key={a.name} delay={staggerDelay(i)}>
                <Surface
                  blob={(["a", "b", "c"] as const)[i % 3]}
                  className="flex h-full flex-col p-8"
                >
                  <Icon className="h-6 w-6 text-cyan-core" aria-hidden />
                  <h2 className="mt-4 text-xl font-semibold text-warm-white">{a.name}</h2>
                  <p className="mt-1 text-xs tracking-[0.12em] text-warm-dim uppercase">{a.line}</p>
                  <p className="mt-4 text-sm leading-relaxed text-warm-mist">{a.body}</p>
                  {a.href ? (
                    <Link
                      href={a.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-soft hover:text-cyan-core"
                    >
                      {a.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : null}
                </Surface>
              </Reveal>
            );
          })}
        </ul>
      </div>

      {/* Industries, merged in from the former /industries route. */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <SectionHeading
          eyebrow="Where this shows up"
          title="Sectors we see most often."
          lede="The method transfers. The vocabulary is the only thing that changes."
        />
        <ul className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <Reveal as="li" key={ind.slug} delay={staggerDelay(i % 3)}>
                <Surface quiet className="h-full p-6">
                  <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold text-warm-white">{ind.name}</h3>
                  <p className="mt-1 text-sm text-warm-dim">{ind.headline}</p>
                </Surface>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-12 text-center">
          <LinkButton href="/#assessment">
            Start the Bevier Breakdown <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </div>
    </>
  );
}
