import type { Metadata } from "next";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";

export const metadata: Metadata = {
  title: "Contact — Technology Assessment",
  description:
    "Start the BSTS technology assessment: ten minutes of honest answers about how your operation runs, processed entirely in your browser until you choose to send.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-12">
          <SectionHeading
            eyebrow="Contact"
            title="The technology assessment."
            lede="Ten minutes, no jargon required. Your answers are processed in your browser and are not transmitted anywhere until you explicitly choose to send them. Even if we never speak, answering these questions tends to clarify what your stack actually needs."
          />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        <Reveal>
          <AssessmentForm />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-xs leading-relaxed text-warm-dim">
            Prefer plain email? Every option above ends in an ordinary message —
            there is no CRM, no tracking pixel, and no drip campaign on the
            other side of this form.
          </p>
        </Reveal>
      </div>
    </>
  );
}
