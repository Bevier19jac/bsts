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
        eyebrow="Legal"
        title="Privacy Policy"
        lede="Plain-language first, legally reviewed later. This policy describes how this website actually behaves today."
      />
      <p className="mt-6 text-sm text-warm-dim">
        Effective date: July 19, 2026 · This policy is pending formal legal
        review and may be updated. The practices it describes are accurate as
        written.
      </p>

      <div className="prose-bsts mt-10">
        <h2>The short version</h2>
        <p>
          This website is a static site. It runs no advertising trackers, sets
          no marketing cookies, and sells no data. The technology assessment
          form processes your answers entirely in your browser; nothing you
          type is transmitted to us unless you explicitly choose to send it by
          email. The BSTS OS demonstration stores its fictional data in your
          browser&apos;s memory only.
        </p>

        <h2>Information we collect through this site</h2>
        <p>
          <strong>Assessment form.</strong> The multi-step technology assessment
          on our contact page runs client-side. Your answers stay on your
          device. If you choose &quot;send by email,&quot; your device&apos;s
          own mail application composes a message from your answers — we
          receive it only if you press send in your mail app. If you download
          your answers as a file, that file is created locally and never
          touches our infrastructure.
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

        <h2>The BSTS OS demonstration</h2>
        <p>
          The OS demonstration at /os is populated with fictional data and
          holds any edits you make in browser memory only. It is labeled a
          demonstration environment; please do not enter real client or
          sensitive information into it. Data you export from it downloads
          directly to your device.
        </p>

        <h2>Cookies and local storage</h2>
        <p>
          We do not set advertising or analytics cookies. Preferences within
          the OS demonstration (such as interface density) live in memory for
          your visit and are not tracked across sessions.
        </p>

        <h2>Sharing</h2>
        <p>
          We do not sell, rent, or trade personal information. We disclose
          information only if required by law, or to service providers (such
          as our hosting provider) acting under their own published
          protections.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>You can use every page of this site without submitting any personal information.</li>
          <li>You can request deletion of any correspondence you have sent us by emailing us.</li>
          <li>You can review your assessment answers before any email is composed — nothing is sent silently.</li>
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
