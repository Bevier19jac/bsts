import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { frameworkDisclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the BSTS website.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-8 pb-20">
      <SectionHeading
            as="h1"
        eyebrow="Legal"
        title="Terms of Use"
        lede="These terms describe how this website may be used today."
      />
      <p className="mt-6 text-sm text-warm-dim">
        Effective date: July 19, 2026. The terms described here are accurate as
        written.
      </p>
      <p className="mt-2 text-sm text-warm-dim">
        Formal legal review is pending. These terms may be updated following
        that review.
      </p>

      <div className="prose-bsts mt-10">
        <h2>1. Who we are</h2>
        <p>
          This website is operated by Bevier Strategic Technology Solutions
          LLC (&quot;BSTS,&quot; &quot;we,&quot; &quot;us&quot;). By using the
          site, you agree to these terms.
        </p>

        <h2>2. Informational content only</h2>
        <p>
          Content on this site — including articles and methodology descriptions —
          is general information, not
          professional advice for your specific situation. Engagements with
          BSTS are governed by separate written agreements, and nothing on this
          site creates a client relationship.
        </p>

        <h2>3. Security and framework references</h2>
        <p>{frameworkDisclaimer}</p>

        <h2>4. Intellectual property</h2>
        <p>
          The BSTS name, mark, site design, and original content are our
          property. You may quote reasonable excerpts with attribution; you may
          not republish substantial portions, present our content as your own,
          or use our marks to imply affiliation.
        </p>

        <h2>5. Acceptable use</h2>
        <ul>
          <li>Do not attempt to disrupt, probe, or overload the site or its hosting.</li>
          <li>Do not use the site to transmit unlawful content or malware.</li>
          <li>Do not misrepresent output of the demonstration environment as a production BSTS system.</li>
        </ul>

        <h2>6. No warranties; limitation of liability</h2>
        <p>
          The site and demonstration are provided &quot;as is&quot; and
          &quot;as available.&quot; To the fullest extent permitted by law,
          BSTS disclaims implied warranties and is not liable for indirect,
          incidental, or consequential damages arising from use of this site.
          Some jurisdictions do not allow certain limitations, so parts of
          this section may not apply to you.
        </p>

        <h2>7. Changes</h2>
        <p>
          We may update these terms; the effective date above will change when
          we do. Continued use after an update constitutes acceptance.
        </p>

        <h2>8. Contact</h2>
        <p>Questions about these terms can be sent through the contact page.</p>
      </div>
    </div>
  );
}
