import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BSTS handles information on this site: no advertising trackers, no data sale, assessment data stays in your browser unless you choose to send it. Includes the Google Workspace and Google API data disclosure for VaultIQ.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-8 pb-20">
      <SectionHeading
            as="h1"
        eyebrow="Legal"
        title="Privacy Policy"
        lede="This policy describes how the website operates, how submitted information is handled today, and how VaultIQ handles Google user data."
      />
      <p className="mt-6 text-sm text-warm-dim">
        Effective date: September 15, 2026. Previous version: July 19, 2026. The
        practices described here are accurate as written.
      </p>
      <p className="mt-2 text-sm text-warm-dim">
        This policy covers the BSTS website and, in the section titled{" "}
        <a href="#google-workspace">Google Workspace and Google API Data</a>, the
        handling of Google user data by VaultIQ — software built and operated by
        BSTS.
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
        <p>
          Separately, BSTS builds and operates{" "}
          <Link href="/vaultiq/">VaultIQ</Link>, client-vault software used by
          advisory firms. VaultIQ does not connect to Google today. The section{" "}
          <a href="#google-workspace">Google Workspace and Google API Data</a>{" "}
          below states what it would request, why, and what it would never do
          with it.
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

        <h2 id="google-workspace">Google Workspace and Google API Data</h2>
        <p>
          This section applies to <Link href="/vaultiq/">VaultIQ</Link>, the
          client-vault software built and operated by BSTS. It does not describe
          the BSTS website, which requests no Google permissions of any kind.
        </p>

        <h3>Current status</h3>
        <p>
          <strong>
            VaultIQ does not connect to Google today. It requests no Google
            permissions, receives no Google user data, and stores no Google user
            data.
          </strong>{" "}
          There is no live Google authorization flow in the software, and the
          credentials such a flow would require are not configured. Everything
          below describes a planned Google Calendar integration and takes effect
          only if and when that integration is enabled. This policy will carry a
          new effective date before that happens.
        </p>

        <h3>What VaultIQ will request</h3>
        <p>
          When the integration is enabled, a user may choose to connect their
          own Google account. VaultIQ will request only the two Google Calendar
          scopes below, and only at the moment the user chooses to connect:
        </p>
        <ul>
          <li>
            <strong>
              https://www.googleapis.com/auth/calendar.events.readonly
            </strong>{" "}
            — to read events on the connecting user&apos;s own calendar, so their
            upcoming client meetings can be shown in context inside that
            client&apos;s vault.
          </li>
          <li>
            <strong>https://www.googleapis.com/auth/calendar.events</strong> —
            to create and update meetings that the user schedules from inside a
            client vault.
          </li>
        </ul>
        <p>
          VaultIQ will not request access to Gmail, Google Drive, Google
          Contacts, Google Chat, or any other Google service, and it will not
          request access to any calendar other than the one belonging to the
          person who connects. Connecting a Google account will always be
          optional: VaultIQ is fully usable with no Google connection.
        </p>

        <h3>How Google user data will be used</h3>
        <p>
          Calendar information will be used for one purpose — showing and
          scheduling that user&apos;s client meetings inside VaultIQ. It will be
          visible only to the people already entitled to see that client under
          the firm&apos;s own vault permissions, and it is subject to the same
          isolation between firms that governs every other record in the system.
        </p>

        <h3>How Google user data will be stored and protected</h3>
        <ul>
          <li>
            Google authorization tokens are encrypted with AES-256-GCM before
            they are written to storage. They are never stored in plain text and
            never written to logs.
          </li>
          <li>
            Each stored authorization is readable only by the account that
            created it. That restriction is enforced by row-level security in
            the database, not by application code alone.
          </li>
          <li>
            Records are held in a managed PostgreSQL database operated by
            Supabase, with encryption in transit and at rest under that
            provider&apos;s published protections.
          </li>
          <li>
            Google user data is retained only while the connection is active and
            only for as long as the client organization&apos;s own retention
            settings allow.
          </li>
        </ul>

        <h3>Revoking access and deletion</h3>
        <p>
          A user can disconnect at any time, either from within VaultIQ or from
          the Google Account permissions page at{" "}
          <a href="https://myaccount.google.com/permissions">
            myaccount.google.com/permissions
          </a>
          . On disconnection the stored authorization stops being usable, the
          revocation is recorded, and any Google-derived calendar information
          held for that connection is deleted. A request to delete Google-derived
          data can also be sent to us using the contact details on the{" "}
          <Link href="/contact/">contact page</Link>.
        </p>

        <h3>Artificial intelligence</h3>
        <p>
          Google user data is not used to develop, improve, or train generalized
          artificial-intelligence or machine-learning models, whether our own or
          anyone else&apos;s. No Google user data is sent to any third-party
          artificial-intelligence provider today, because VaultIQ holds no Google
          user data. If a future VaultIQ feature would send Google user data to
          an artificial-intelligence provider in order to produce something for
          the user who connected the account, that processing will be described
          in this policy, and it will remain bound by the Limited Use
          requirements below, before the feature is enabled.
        </p>

        <h3>Limited Use</h3>
        <p>
          VaultIQ&apos;s use of information received from Google APIs will adhere
          to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. Specifically, Google user
          data will not be used for advertising; will not be sold; will not be
          transferred to others except as necessary to provide or improve the
          feature the user asked for, to comply with applicable law, or as part
          of a merger, acquisition, or sale of assets with notice to users; will
          not be read by humans except with the user&apos;s explicit permission
          for specific messages, where necessary for security purposes such as
          investigating abuse, to comply with applicable law, or where the data
          has been aggregated and made anonymous; and will not be used to
          develop, improve, or train generalized artificial-intelligence or
          machine-learning models.
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
