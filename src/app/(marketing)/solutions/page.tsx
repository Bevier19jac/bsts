import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { SolutionTabs } from "@/components/marketing/SolutionTabs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Five lanes of work — keep, connect, automate, build, secure. Stack assessment, systems integration, intelligent automation, custom software with responsible AI, and NIST-aligned security.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <SectionHeading
            eyebrow="Solutions"
            title="Five lanes of work, one honest sentence."
            lede={site.promise}
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-10">
        <SolutionTabs />
      </div>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <SectionHeading
          center
          eyebrow="Where to begin"
          title="Every lane starts from the same assessment."
          lede="About five minutes of honest answers about how your operation runs. We map them to the lanes above and tell you — in writing — what we would keep, connect, automate, build, and secure."
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
