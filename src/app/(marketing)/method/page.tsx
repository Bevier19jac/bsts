import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { MethodTabs } from "@/components/marketing/MethodTabs";

export const metadata: Metadata = {
  title: "The BSTS Method",
  description:
    "Listen, Map, Prove, Build, Steward — five public stages from first conversation to steady state, with a working pilot in production by week six.",
};

export default function MethodPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <SectionHeading
            eyebrow="The BSTS Method"
            title="A method public enough to be held against us."
            lede="Technology consulting fails most often in the gap between the strategy deck and the first working thing. The BSTS Method closes that gap on a schedule: by week six of a standard engagement, something real is running in production and you have judged it."
          />
        </div>
      </section>

      <div className="relative mx-auto max-w-4xl px-6 pb-8">
        <MethodTabs />
      </div>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <SectionHeading
          center
          eyebrow="Stage zero"
          title="The method starts with listening. Listening starts here."
          lede="The technology assessment on this site is the same instrument we use inside engagements — answering it is genuinely stage one of the work."
        />
        <Reveal delay={0.12}>
          <div className="mt-9">
            <LinkButton href="/contact">
              Begin the assessment <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
