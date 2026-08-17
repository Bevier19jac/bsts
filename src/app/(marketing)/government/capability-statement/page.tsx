import type { Metadata } from "next";
import { PrintButton } from "@/components/government/PrintButton";
import { federalCapabilities, federalPositioning } from "@/lib/content/federal";
import { founder } from "@/lib/content/founder";
import {
  acquisition,
  federalContactDisplay,
  federalContactEmail,
  federalDisclaimerFull,
  site,
  vetCert,
  visibleAcquisitionFields,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Capability Statement",
  description:
    "One-page BSTS capability statement: secure AI implementation, AI governance, knowledge systems, cybersecurity documentation, and mission workflow automation.",
  robots: { index: false, follow: true },
};

const DIFFERENTIATORS = [
  `${vetCert.short} · principal-led delivery`,
  "Secure AI by design — data boundaries, access, and logging decided before implementation",
  "Federal cybersecurity and enterprise stakeholder experience",
  "Control mapping and evidence preparation across the frameworks that apply",
  "No vendor commissions · no automatic rip-and-replace recommendation",
];

export default function CapabilityStatementPage() {
  return (
    <div className="cs-page mx-auto max-w-4xl px-6 pt-6 pb-16">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm leading-relaxed text-warm-mist">
          Letter-sized, one page. Use your browser&apos;s print dialog to save
          it as a PDF.
        </p>
        <PrintButton />
      </div>

      {/* The printable sheet — light document, self-contained styling. */}
      <article className="capstat">
        <div className="cs-head">
          <div>
            <p className="cs-mark">BSTS</p>
            <h1 className="cs-name">{site.name}</h1>
            <p className="cs-badge">{vetCert.badge}</p>
          </div>
          <div className="cs-contact">
            <p>Contact: {federalContactDisplay}</p>
            {federalContactEmail ? <p>{site.url.replace("https://", "")}</p> : null}
          </div>
        </div>

        <section>
          <h2 className="cs-h2">Federal positioning</h2>
          <p className="cs-body">{federalPositioning.full}</p>
        </section>

        <section>
          <h2 className="cs-h2">Core capabilities</h2>
          <div className="cs-grid">
            {federalCapabilities.map((c) => (
              <div key={c.slug} className="cs-cap">
                <h3 className="cs-h3">{c.title}</h3>
                <ul className="cs-list">
                  {c.deliverables.slice(0, 3).map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="cs-cols">
          <section>
            <h2 className="cs-h2">Differentiators</h2>
            <ul className="cs-list">
              {DIFFERENTIATORS.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="cs-h2">Founder qualifications</h2>
            <ul className="cs-list">
              {founder.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="cs-cols">
          <section>
            <h2 className="cs-h2">Engagement types</h2>
            <ul className="cs-list">
              <li>Subcontracting and teaming with established primes</li>
              <li>Pilots and defined work packages</li>
              <li>Market research, sources-sought, and RFI responses</li>
            </ul>
          </section>
          <section>
            <h2 className="cs-h2">Acquisition profile</h2>
            <ul className="cs-list">
              {visibleAcquisitionFields().map((f) => (
                <li key={f.label}>
                  <strong>{f.label}:</strong> {f.value}
                </li>
              ))}
            </ul>
            {acquisition.statusLine ? (
              <p className="cs-note">{acquisition.statusLine}</p>
            ) : null}
          </section>
        </div>

        <div className="cs-foot">
          <p>{federalDisclaimerFull}</p>
        </div>
      </article>
    </div>
  );
}
