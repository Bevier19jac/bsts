import type { Metadata } from "next";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";
import { DirectContact } from "@/components/marketing/DirectContact";

export const metadata: Metadata = {
  title: "AI & Automation Assessment",
  description:
    "See where AI and automation could save your business time — in under 5 minutes. A plain-language assessment that estimates the hours you could reclaim and shows exactly which tools and automations to put in place first.",
};

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <Atmosphere variant="quiet" />
      <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-20 sm:pt-28">
        <DiagnosticFlow />
        <div className="mt-6 flex items-center gap-4" aria-hidden>
          <span className="h-px flex-1 bg-edge" />
          <span className="text-xs tracking-[0.14em] text-warm-dim uppercase">or</span>
          <span className="h-px flex-1 bg-edge" />
        </div>
        <div className="mt-6">
          <DirectContact />
        </div>
      </div>
    </section>
  );
}
