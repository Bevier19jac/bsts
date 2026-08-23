import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BSTS handles information on this site: no advertising trackers, no data sale, assessment data stays in your browser unless you choose to send it.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-8 pb-20">
      <SectionHeading
            as="h1"
        eyebrow="Legal"
        title="Privacy Policy"
        lede="This policy describes how the website operates and how submitted information is handled today."
      />
      <p className="mt-6 text-sm text-warm-dim">
        Effective date: July 19, 2026. The practices described here are accurate
        as written.
      </p>
      <p className="mt-2 text-sm text-warm-dim">
        Formal legal review is pending. This policy may be updated following
        that review.
      </p>

      <div className="prose-bsts mt-10">
        <h2>The short version</h2>
        <p>
          This website is a static site. It runs no advertising trackers, sets
          no marketing cookies, and sells no data. The technology assessment
          processes your answers in your browser while you work through it, and
          nothing is transmitted to us until you press &quot;Send to BSTS.&quot;
          When you press it, what you submitted is sent over an encrypted
          connection to a third-party form-delivery service, which forwards it
          to us.
        </p>

        <h2>Information we collect through this site</h2>
        <p>
          <strong>Assessment form.</strong> The multi-step technology assessment
          runs in your browser. Your answers are processed on your device as you
          work through the questions, and nothing is transmitted anywhere until
          you press &quot;Send to BSTS.&quot;
        </p>
        <p>
          When you press &quot;Send to BSTS,&quot; the information you submitted
          is transmitted over HTTPS to Web3Forms, a third-party form-delivery
          service, which forwards the inquiry to us. That submission can include
          your name, email address, organization, your assessment responses, and
          anything you add in the optional note. We use it to respond to your
          inquiry. We do not add you to marketing lists without your consent.
        </p>
        <p>
          Copying your summary or downloading it as a file stays entirely on
          your own device — the text is created locally in your browser and
          nothing is transmitted when you use those buttons.
        </p>
        <p>
          <strong>Email you send us.</strong> If you email us, we receive what
          you send, and we use it to respond to you. We do not add you to
          marketing lists without your consent.
        </p>
        <p>
          <strong>Hosting logs.</strong> Our hosting provider (Cloudflare
          Pages) may record standard technical request data — IP address,
          user-agent, requested URL — for security and operational purposes
          under its own policies. We do not enrich, resell, or use this data
          for advertising.
        </p>

        <h2>Cookies and local storage</h2>
        <p>
          We do not set advertising or analytics cookies, and we do not track
          you across sessions.
        </p>

        <h2>Sharing</h2>
        <p>
          We do not sell, rent, or trade personal information. We disclose
          information only if required by law, or to the service providers that
          make this site work — our hosting provider (Cloudflare Pages) and
          Web3Forms, which delivers assessment submissions to our inbox. Both
          act under their own published protections.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>You can use every page of this site without submitting any personal information.</li>
          <li>You can request deletion of any correspondence you have sent us by emailing us.</li>
          <li>You can review your assessment answers before anything is submitted — nothing is sent silently.</li>
        </ul>

        <h2>Changes</h2>
        <p>
          If our practices change — for example, if we add privacy-respecting
          analytics — this policy will be updated before the change takes
          effect, with a new effective date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent through the contact page or
          to the email address published there.
        </p>
      </div>
    </div>
  );
}
