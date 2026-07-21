import type { Metadata } from "next";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";

export const metadata: Metadata = {
  title: "AI & Automation Assessment",
  description:
    "See where AI and automation could save your business time — in under 5 minutes. A plain-language assessment that estimates the hours you could reclaim and shows exactly which tools and automations to put in place first.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-8">
          <SectionHeading
            eyebrow="AI & Automation Assessment"
            title="Where could AI and automation help your business?"
            lede="A few plain questions about how your business runs today. At the end you'll see roughly how many hours a week you could win back, exactly which tools and automations would help, and where to start. Everything runs in your browser; nothing is sent until you choose to."
          />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        <Reveal>
          <DiagnosticFlow />
        </Reveal>
      </div>
    </>
  );
}
