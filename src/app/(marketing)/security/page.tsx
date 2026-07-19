import type { Metadata } from "next";
import { ArrowRight, FileCheck2, KeyRound, Radar, ShieldCheck } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CurveDivider } from "@/components/ui/CurveDivider";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { frameworkDisclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "NIST-aligned practice informed by NIST CSF 2.0, OWASP secure development, and Zero Trust principles. SOC 2 readiness support, responsible AI boundaries, and honest language about all of it.",
};

const practices = [
  {
    icon: Radar,
    title: "Informed by NIST CSF 2.0",
    body: "Our assessments and baselines follow the six functions of the NIST Cybersecurity Framework 2.0 — Govern, Identify, Protect, Detect, Respond, Recover — scaled to the size of your operation. NIST-aligned means the framework shapes our methodology. It does not mean certification, and NIST does not certify consultancies.",
  },
  {
    icon: KeyRound,
    title: "Zero Trust principles",
    body: "Access is granted to identities, not networks; verified continuously, not assumed; and scoped to least privilege by default. In a small organization this is less about products and more about discipline — reviewed access lists, strong authentication everywhere, and no shared logins.",
  },
  {
    icon: ShieldCheck,
    title: "OWASP-informed secure development",
    body: "Software we build follows OWASP guidance: input validation at the boundary, dependencies audited and pinned, secrets kept out of code, and security review before anything touches production data. Our own site and demo environment are built the same way.",
  },
  {
    icon: FileCheck2,
    title: "SOC 2 readiness support",
    body: "For organizations heading toward a SOC 2 examination, we provide readiness support: mapping controls to the Trust Services Criteria, closing gaps, and building evidence-collection habits. Readiness is preparation for an audit performed by an independent CPA firm — it is not the audit, and it is not certification.",
  },
];

const aiCommitments = [
  "Private data stays inside agreed boundaries — models never see what they do not need",
  "A human approves consequential actions; AI drafts and flags, people decide",
  "Capabilities and limits documented honestly, including what a model cannot do",
  "No client data used to train third-party models without explicit written agreement",
];

export default function SecurityPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <SectionHeading
            eyebrow="Security"
            title="The foundation everything else stands on."
            lede="Security at BSTS is not a service tier — it is a property of every engagement. Here is what that means in practice, in language precise enough to survive an audit of its wording."
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {practices.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={staggerDelay(i % 2)}>
                <Surface blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-8">
                  <Icon className="h-6 w-6 text-cyan-core" aria-hidden />
                  <h2 className="mt-4 text-xl font-semibold text-warm-white">{p.title}</h2>
                  <p className="mt-3 leading-relaxed text-warm-mist">{p.body}</p>
                </Surface>
              </Reveal>
            );
          })}
        </div>
      </div>

      <section className="relative mt-16" aria-labelledby="rai-heading">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
              <SectionHeading
                id="rai-heading"
                eyebrow="Responsible AI"
                title="AI with boundaries you can write down."
                lede="Secure AI implementation is half our name and all of our caution. Every AI system we deliver comes with a one-page boundary document: what it sees, what it may do, who approves what, and what happens when it is wrong."
              />
              <Reveal delay={0.1}>
                <Surface quiet blob="b" className="p-8">
                  <ul className="space-y-3.5">
                    {aiCommitments.map((c) => (
                      <li key={c} className="flex gap-3 leading-relaxed text-warm-mist">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </Surface>
              </Reveal>
            </div>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* Credential components — text-based, no copied logos */}
      <section className="mx-auto max-w-6xl px-6 py-10" aria-labelledby="cred-heading">
        <SectionHeading
          id="cred-heading"
          eyebrow="Credentials, stated plainly"
          title="What we hold, and what we merely follow."
          lede="We display credentials as text because precision beats badges. Certifications named below are held by the founder personally; frameworks are practices that inform our work."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { kind: "Held certification", name: "CompTIA Security+", detail: "Founder-held, industry security certification" },
            { kind: "Held certification", name: "AWS Certified AI Practitioner", detail: "Founder-held, cloud AI certification" },
            { kind: "Framework", name: "NIST CSF 2.0", detail: "Informs our assessment and baseline methodology" },
            { kind: "Framework", name: "OWASP · Zero Trust", detail: "Inform our development and access practices" },
          ].map((c, i) => (
            <Reveal key={c.name} delay={staggerDelay(i)}>
              <div className="surface-quiet blob-c h-full p-6">
                <p className={`text-[0.62rem] font-semibold tracking-[0.16em] uppercase ${c.kind === "Framework" ? "text-cyan-soft" : "text-gold-soft"}`}>
                  {c.kind}
                </p>
                <p className="mt-2 font-semibold text-warm-white">{c.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-warm-dim">{c.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-warm-dim">
            {frameworkDisclaimer} BSTS does not display third-party certification
            logos; where official badge programs permit verified display, assets
            may be added after verification (see the repository&apos;s badge
            documentation).
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <SectionHeading
          center
          eyebrow="Questions welcome"
          title="Ask us the hard security questions first."
          lede="Vendor security questionnaires, data-boundary questions, AI-policy concerns — we would rather answer them before an engagement than after. The assessment includes room for all of it."
        />
        <Reveal delay={0.12}>
          <div className="mt-9">
            <LinkButton href="/contact">
              Start the conversation <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
