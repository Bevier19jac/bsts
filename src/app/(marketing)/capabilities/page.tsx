import type { Metadata } from "next";
import { ArrowRight, Award, Download, ShieldCheck, Cpu, Cable, Workflow, Boxes } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { founder } from "@/lib/content/founder";

export const metadata: Metadata = {
  title: "Capability Statement",
  description:
    "BSTS — a Service-Disabled Veteran-Owned Small Business delivering secure AI, intelligent automation, and systems integration. Core competencies, differentiators, and company data for government and enterprise buyers.",
};

const competencies = [
  {
    icon: Cpu,
    title: "Secure AI implementation",
    body: "Responsible, well-scoped AI — drafting, summarization, retrieval, and decision support — with private-data boundaries and human approval on consequential actions.",
  },
  {
    icon: Workflow,
    title: "Intelligent automation",
    body: "Monitored, reversible automations for repetitive operational work, each with a clear owner, an audit trail, and a manual override.",
  },
  {
    icon: Cable,
    title: "Systems integration & data unification",
    body: "Secure APIs, event syncs, and shared data models so a record entered once appears everywhere it is needed — no brittle hacks.",
  },
  {
    icon: Boxes,
    title: "Custom software",
    body: "Purpose-built internal tools, portals, and decision-support dashboards — small, sharp, and secured from the first commit.",
  },
  {
    icon: ShieldCheck,
    title: "Security architecture & readiness",
    body: "Baselines informed by NIST CSF 2.0, Zero Trust principles, and OWASP guidance; SOC 2 readiness support (readiness, not certification).",
  },
];

const differentiators = [
  "Service-Disabled Veteran-Owned Small Business — principal-led by a founder trained in both AI and cybersecurity.",
  "Precise, audit-safe claims: NIST-aligned, not certified; SOC 2 readiness support, not compliant.",
  "No licenses, no vendor commissions, no lock-in — every deliverable documented and handover-ready.",
  "Security treated as a property of every engagement, not a phase bolted on at the end.",
  "A working pilot in production by week six — judged on shipped software, not slideware.",
];

// Standard service classifications BSTS performs under. Confirm/adjust against
// your SAM.gov registration before distributing to procurement.
const naics = [
  ["541511", "Custom Computer Programming Services"],
  ["541512", "Computer Systems Design Services"],
  ["541519", "Other Computer Related Services"],
  ["541611", "Administrative & General Management Consulting"],
  ["541690", "Other Scientific & Technical Consulting Services"],
  ["518210", "Computing Infrastructure & Data Processing"],
];

export default function CapabilitiesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="gold" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-8">
          <SectionHeading
            eyebrow="Capability Statement · SDVOSB"
            title="Secure AI and automation, veteran-owned."
            lede="BSTS (Bevier Strategic Technology Solutions) is a Service-Disabled Veteran-Owned Small Business delivering secure AI, intelligent automation, and systems integration for government and commercial organizations — built around the systems you already run."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/BSTS-Capability-Statement.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-cyan-core px-6 py-3 text-sm font-medium text-obsidian-deep transition-colors hover:bg-cyan-soft"
              >
                <Download className="h-4 w-4" aria-hidden /> Download PDF capability statement
              </a>
              <LinkButton href="/contact" variant="ghost">
                Start the assessment <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core competencies */}
      <section className="mx-auto max-w-6xl px-6 py-12" aria-labelledby="cap-competencies">
        <SectionHeading id="cap-competencies" eyebrow="Core competencies" title="What we deliver." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={staggerDelay(i % 3)}>
                <Surface quiet blob={(["a", "b", "c"] as const)[i % 3]} className="h-full p-6">
                  <Icon className="h-6 w-6 text-cyan-core" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-warm-white">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-warm-mist">{c.body}</p>
                </Surface>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Differentiators + company data */}
      <section className="mx-auto max-w-6xl px-6 py-12" aria-labelledby="cap-diff">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionHeading id="cap-diff" eyebrow="Differentiators" title="Why buyers choose BSTS." gold />
            <ul className="mt-8 space-y-3">
              {differentiators.map((d) => (
                <li key={d} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1}>
            <Surface blob="a" className="h-fit p-8">
              <h3 className="text-xs font-semibold tracking-[0.18em] text-warm-dim uppercase">
                Company snapshot
              </h3>
              <dl className="mt-5 space-y-3.5 text-sm">
                {[
                  ["Business type", "Service-Disabled Veteran-Owned Small Business (SDVOSB)"],
                  ["Structure", "Principal-led; every engagement led by the founder"],
                  ["Leadership", `${founder.name}, ${founder.role}`],
                  ["Credentials", "MS Artificial Intelligence · BS Cybersecurity (Magna Cum Laude) · CompTIA Security+ · AWS Certified AI Practitioner"],
                  ["Frameworks", "NIST CSF 2.0 · Zero Trust · OWASP · SOC 2 readiness support"],
                  ["Website", "bsts.pages.dev"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-semibold text-gold-soft">{k}</dt>
                    <dd className="mt-0.5 leading-relaxed text-warm-mist">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-edge/50 pt-4 text-xs leading-relaxed text-warm-dim">
                SAM.gov UEI and CAGE code available on request. Federal experience referenced
                here does not imply endorsement by any government agency.
              </p>
            </Surface>
          </Reveal>
        </div>
      </section>

      {/* NAICS */}
      <section className="mx-auto max-w-6xl px-6 pt-4 pb-16" aria-labelledby="cap-naics">
        <SectionHeading id="cap-naics" eyebrow="Classifications" title="NAICS codes we perform under." />
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {naics.map(([code, label]) => (
            <div key={code} className="rounded-2xl border border-edge bg-graphite/60 p-4">
              <div className="display text-lg text-warm-white">{code}</div>
              <div className="mt-1 text-sm leading-snug text-warm-mist">{label}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-warm-dim">
          Small-business set-aside and SDVOSB sole-source vehicles welcomed. For teaming,
          subcontracting, or a tailored capability statement, start the assessment or reach out.
        </p>
      </section>
    </>
  );
}
