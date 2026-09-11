#!/usr/bin/env python3
"""Apply exact, approved copy changes; preserve branding and assessment rules."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
pending: dict[Path, str] = {}

def patch(path: str, old: str, new: str) -> None:
    file = ROOT / path
    text = pending.get(file, file.read_text(encoding="utf-8"))
    count = text.count(old)
    if new in text and (count == 0 or old in new):
        return
    if count != 1:
        raise RuntimeError(f"{path}: expected one exact match, found {count}; no files written")
    pending[file] = text.replace(old, new, 1)

site = "src/lib/site.ts"
patch(site, '"Secure AI · Intelligent Automation · Cybersecurity · Compliance Readiness"', '"Custom software · Secure AI · Workflow automation"')
patch(site, '  /** Optional: public phone number. Empty hides phone references. */\n  phone: "",', '  /** Verified public business contacts. */\n  founderEmail: "jacob@bevierstrategic.com",\n  phone: "(404) 618-2346",\n  phoneHref: "tel:+14046182346",')
patch(site, '"BSTS is a veteran-owned consultancy at the intersection of AI, automation, cybersecurity, and compliance. We help growing organizations adopt AI securely, automate high-value workflows, govern how AI touches sensitive data, and build the controls and evidence that customer security reviews and SOC 2 readiness demand."', '"BSTS designs, builds, and manages secure custom software, workflow automation, prospecting engines, client intelligence, and AI-powered knowledge systems. Built around your business, with security and human oversight designed in."')
patch(site, '{ href: "/start", label: "Start a conversation" }', '{ href: "/contact", label: "Discuss your workflow" }')
patch(site, 'label: "Start the Bevier Breakdown",', 'label: "Start the Assessment",')
patch(site, 'label: "Start a Discovery Conversation",', 'label: "Discuss Your Workflow",')
patch(site, 'process.env.NEXT_PUBLIC_FEDERAL_CONTACT_EMAIL ?? ""', 'process.env.NEXT_PUBLIC_FEDERAL_CONTACT_EMAIL ?? "contact@bevierstrategic.com"')
f = ROOT / site
t = pending.get(f, f.read_text(encoding="utf-8"))
if '   * THE single public contact address' in t:
    start = t.index('  /**\n   * THE single public contact address')
    end = t.index('  contactEmail:', start)
    pending[f] = t[:start] + '  /** Public general contact. Provider-side form delivery is configured separately. */\n' + t[end:]

landing = "src/components/landing/Landing.tsx"
patch(landing, '  capabilityStrip,\n  engagementNote,\n  engagementStages,\n  serviceAreas,\n  strategicSummary,\n  triggers,', '  engagementNote,')
patch(landing, 'import {\n  federalDisclaimer,', 'import {\n  commercialCapabilities as capabilityStrip,\n  commercialStages as engagementStages,\n  commercialSolutions as serviceAreas,\n  commercialSummary as strategicSummary,\n  commercialTriggers as triggers,\n} from "@/lib/content/commercial";\nimport {\n  discoveryCta,\n  federalDisclaimer,')
patch(landing, '{ id: "assessment", label: "The Breakdown" }', '{ id: "assessment", label: "Assessment" }')
patch(landing, '          <Reveal delay={0.2}>\n            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-warm-mist sm:text-[1.0625rem]">', '          <Reveal delay={0.2}>\n            <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-snug text-warm-white sm:text-xl">\n              Custom software and intelligent automation. Built around your business.\n            </p>\n            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-warm-mist sm:text-[1.0625rem]">')
patch(landing, '            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">\n              <button', '            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">\n              <Link href={discoveryCta.href} className="btn-primary-form px-7 py-3 text-base">\n                {discoveryCta.label} <ArrowRight className="h-4 w-4" aria-hidden />\n              </Link>\n              <button')
patch(landing, '                className="btn-primary-form px-7 py-3 text-base"\n              >\n                Start the Bevier Breakdown <ArrowRight className="h-4 w-4" aria-hidden />', '                className="btn-ghost-form px-7 py-3 text-base"\n              >\n                Start the Assessment <ArrowRight className="h-4 w-4" aria-hidden />')
patch(landing, '    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">\n      {serviceAreas.map', '    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">\n      {serviceAreas.map')
patch(landing, 'const accent = AREA_ACCENT[i];', 'const accent = AREA_ACCENT[i % AREA_ACCENT.length];')
patch(landing, 'href={`/services#${["build", "secure", "prove"][i] ?? "discover"}`}', 'href={a.href}')
patch(landing, 'Three sentences start almost every engagement.', 'A few familiar problems can point to useful places to start.')
patch(landing, '  label = "Start the Bevier Breakdown",', '  label = "Start the Assessment",')
patch(landing, '      <div className="flex flex-wrap items-center justify-center gap-4">\n        <button', '      <div className="flex flex-wrap items-center justify-center gap-4">\n        <Link href={discoveryCta.href} className="btn-primary-form px-7 py-3 text-base">\n          {discoveryCta.label} <ArrowRight className="h-4 w-4" aria-hidden />\n        </Link>\n        <button')
patch(landing, '          className="btn-primary-form px-7 py-3 text-base"\n        >\n          {label}', '          className="btn-ghost-form px-7 py-3 text-base"\n        >\n          {label}')
patch(landing, '        It takes a few minutes, asks about your workflows and systems in plain\n        language, and stays in your browser until you choose to send it.', '        The assessment is free. See your preliminary results before sharing\n        contact details, or start a conversation without taking it.')
patch(landing, '          The Bevier Breakdown.\n        </h2>', '          Find the work worth automating.\n        </h2>')
patch(landing, '          A few plain questions — no jargon. Every answer changes what we ask\n          next, and the result shows its own reasoning. Nothing leaves your\n          browser unless you choose to send it.', '          The Bevier Breakdown is a free self-assessment of your workflows,\n          systems, and information. See what could improve, what needs checking,\n          and where to start. Results are preliminary; nothing is sent unless\n          you choose to share it.')
patch(landing, '        <Link href="/services#digital-foundations" className="underline-offset-4 hover:underline">', '        Security architecture, AI governance, SOC 2 readiness, and government\n        capabilities remain available through our services and government pages.\n        {" "}\n        <Link href="/services#digital-foundations" className="underline-offset-4 hover:underline">')

footer = "src/components/marketing/Footer.tsx"
patch(footer, 'import { StrategicLine } from "@/components/brand/StrategicLine";', 'import { StrategicLine } from "@/components/brand/StrategicLine";\nimport { BusinessContact } from "@/components/marketing/BusinessContact";')
patch(footer, '              {site.name}. {site.subline}\n            </p>', '              {site.name}. {site.subline}\n            </p>\n            <BusinessContact />')

contact = "src/app/(marketing)/contact/page.tsx"
patch(contact, 'import { site } from "@/lib/site";', 'import { site } from "@/lib/site";\nimport { BusinessContact } from "@/components/marketing/BusinessContact";')
patch(contact, 'title: "Start a Discovery Conversation",', 'title: "Discuss Your Workflow",')
patch(contact, 'title="Start a discovery conversation."', 'title="Tell us what you want to make easier."')
patch(contact, 'eyebrow="Discovery conversation"', 'eyebrow="Discuss your workflow"')
patch(contact, 'Rather use email?</h2>', 'Prefer to call or email?</h2>\n              <BusinessContact />')
patch(contact, '"Talk to BSTS directly about securing AI adoption, automating high-value work, connecting existing systems, or preparing defensible controls and evidence."', '"Talk with Jacob about custom software, workflow automation, prospecting systems, client intelligence, or secure AI. No assessment required to start a conversation."')
patch(contact, 'Write to{" "}', 'General inquiries can also go to{" "}')

services_page = "src/app/(marketing)/services/page.tsx"
patch(services_page, 'import { pricing } from "@/lib/site";', 'import { pricing } from "@/lib/site";\nimport Link from "next/link";\nimport { SolutionsOverview } from "@/components/marketing/SolutionsOverview";')
patch(services_page, 'title="One engagement system, five stages."', 'title="Software built around the way you work."')
patch(services_page, 'lede="Every organization arrives at a different point in this sequence, and each stage stands on its own. Most start with an assessment and decide from there."', 'lede="Custom applications, connected workflows, prospecting systems, and secure business knowledge. Start with the problem; we will work through the right solution together."')
patch(services_page, '      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-6">', '      <SolutionsOverview />\n      <div className="mx-auto max-w-6xl px-6 pb-7">\n        <h2 className="display text-2xl text-warm-white">How we deliver and support the work</h2>\n        <p className="mt-3 text-sm leading-relaxed text-warm-mist">Each stage stands on its own. Security is designed in from the start—not deferred until after the build.</p>\n      </div>\n      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-6">')
patch(services_page, '            <div className="mt-7 flex justify-center">\n              <LinkButton href="/#assessment">\n                Start the Bevier Breakdown <ArrowRight className="h-4 w-4" aria-hidden />\n              </LinkButton>\n            </div>', '            <div className="mt-7 flex flex-wrap justify-center gap-4">\n              <LinkButton href="/contact">\n                Discuss Your Workflow <ArrowRight className="h-4 w-4" aria-hidden />\n              </LinkButton>\n              <Link href="/#assessment" className="btn-ghost-form px-6 py-3">Start the Assessment</Link>\n            </div>')

services = "src/lib/content/services.ts"
patch(services, 'navLine: "Keep the controls true after the project ends.",', 'navLine: "Keep your software useful, secure, and maintained.",')
patch(services, '"Evidence goes stale, vendors change, staff turn over, and the automation nobody owns quietly drifts out of alignment with how the business now runs."', '"Your software needs an owner after launch. Integrations change, workflows evolve, and somebody must maintain the system—not just deliver it and disappear."')
patch(services, '    work: [\n      "Continuous assurance",', '    work: [\n      "Managed operation of the agreed software environment",\n      "Integration maintenance and operational monitoring",\n      "Agreed improvements as workflows change",\n      "Continuous assurance",')
patch(services, '"Audit-readiness maintained between cycles, evidence automated where the systems allow it, and a quarterly roadmap that keeps the next decision in front of you."', '"An agreed managed-service scope for operating, maintaining, and improving the system. Security, governance, and audit-readiness support can be included where relevant; responsibilities, usage limits, and service expectations are defined in writing."')

for file, text in pending.items():
    file.write_text(text, encoding="utf-8")
print(f"Applied the clarity pass to {len(pending)} files.")
