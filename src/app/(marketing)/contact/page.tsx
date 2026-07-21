import type { Metadata } from "next";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";

export const metadata: Metadata = {
  title: "Business Diagnostic",
  description:
    "Discover your Business Stage, Founder Archetype, and AI Readiness in under 5 minutes. An adaptive diagnostic that narrows to your exact bottlenecks and the highest-ROI next moves.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-8">
          <SectionHeading
            eyebrow="BSTS Diagnostic"
            title="Where is your business, really?"
            lede="An adaptive diagnostic — not a survey. Every answer narrows the next question until BSTS can pinpoint your stage, your founder archetype, your biggest constraints, and the exact next moves. Everything runs in your browser; nothing is sent until you choose to."
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
