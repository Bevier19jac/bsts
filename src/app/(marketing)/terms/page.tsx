import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { frameworkDisclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the BSTS website and the BSTS OS demonstration environment.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-8 pb-20">
      <SectionHeading
        eyebrow="Legal"
        title="Terms of Use"
        lede="The rules for using this website and its demonstration environment, stated as plainly as we can manage."
      />
      <p className="mt-6 text-sm text-warm-dim">
        Effective date: July 19, 2026 · These terms are pending formal legal
        review and may be updated.
      </p>

      <div className="prose-bsts mt-10">
        <h2>1. Who we are</h2>
        <p>
          This website is operated by Bevier Strategic Technology Solutions
          (&quot;BSTS,&quot; &quot;we,&quot; &quot;us&quot;). By using the
          site, you agree to these terms.
        </p>

        <h2>2. Informational content only</h2>
        <p>
          Content on this site — including articles, methodology descriptions,
          and the Solara House demonstration — is general information, not
          professional advice for your specific situation. Engagements with
          BSTS are governed by separate written agreements, and nothing on this
          site creates a client relationship.
        </p>

        <h2>3. The Solara House demonstration</h2>
        <p>
          Solara House is a fictional property created by BSTS for
          demonstration purposes. It is not a client, a case study, or a
          reference to any real business. Any resemblance to a real property is
          coincidental. No measured results are claimed for it.
        </p>

        <h2>4. The BSTS OS demonstration environment</h2>
        <p>
          The demonstration at /os is provided for evaluation of our approach.
          It is populated with fictional data and is clearly labeled:
          demonstration environment — do not enter real client or sensitive
          information. You use it at your own discretion; data you enter is
          held in your browser&apos;s memory and is not received by us. The
          demonstration is provided &quot;as is,&quot; without warranty, and
          may change or be withdrawn at any time.
        </p>

        <h2>5. Security and framework references</h2>
        <p>{frameworkDisclaimer}</p>

        <h2>6. Intellectual property</h2>
        <p>
          The BSTS name, mark, site design, and original content are our
          property. You may quote reasonable excerpts with attribution; you may
          not republish substantial portions, present our content as your own,
          or use our marks to imply affiliation.
        </p>

        <h2>7. Acceptable use</h2>
        <ul>
          <li>Do not attempt to disrupt, probe, or overload the site or its hosting.</li>
          <li>Do not use the site to transmit unlawful content or malware.</li>
          <li>Do not misrepresent output of the demonstration environment as a production BSTS system.</li>
        </ul>

        <h2>8. No warranties; limitation of liability</h2>
        <p>
          The site and demonstration are provided &quot;as is&quot; and
          &quot;as available.&quot; To the fullest extent permitted by law,
          BSTS disclaims implied warranties and is not liable for indirect,
          incidental, or consequential damages arising from use of this site.
          Some jurisdictions do not allow certain limitations, so parts of
          this section may not apply to you.
        </p>

        <h2>9. Changes</h2>
        <p>
          We may update these terms; the effective date above will change when
          we do. Continued use after an update constitutes acceptance.
        </p>

        <h2>10. Contact</h2>
        <p>Questions about these terms can be sent through the contact page.</p>
      </div>
    </div>
  );
}
