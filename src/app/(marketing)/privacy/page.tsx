import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BSTS handles information on this site: no advertising trackers, no data sale, assessment data stays in your browser unless you choose to send it. Includes the Google Workspace and Google API data disclosure for VaultIQ and the ActionCOACH Prospecting Engine.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-8 pb-20">
      <SectionHeading
            as="h1"
        eyebrow="Legal"
        title="Privacy Policy"
        lede="This policy describes how the website operates, how submitted information is handled today, and how VaultIQ and the ActionCOACH Prospecting Engine handle Google user data."
      />
      <p className="mt-6 text-sm text-warm-dim">
        Effective date: October 7, 2026. Previous version: September 15, 2026. The
        practices described here are accurate as written.
      </p>
      <p className="mt-2 text-sm text-warm-dim">
        This policy covers the BSTS website and, in the section titled{" "}
        <a href="#google-workspace">Google Workspace and Google API Data</a>, the
        handling of Google user data by VaultIQ and by the ActionCOACH
        Prospecting Engine — software built and operated by BSTS.
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
          advisory firms, and the ActionCOACH Prospecting Engine,
          business-development software used by ActionCOACH Peachtree. Each can
          connect to a user&apos;s own Google account when that user chooses
          to. The section{" "}
          <a href="#google-workspace">Google Workspace and Google API Data</a>{" "}
          below states exactly what each requests, why, and what each never
          does with it.
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
          This section applies to two pieces of software that BSTS builds and
          operates: <Link href="/vaultiq/">VaultIQ</Link>, and the ActionCOACH
          Prospecting Engine. It does not describe the BSTS website, which
          requests no Google permissions of any kind.
        </p>
        <p>
          Both use the same Google sign-in application, so Google&apos;s
          consent screen shows the name &quot;VaultIQ&quot; for each. Each has
          its own sign-in client and asks only for the permissions listed for
          it below. Connecting a Google account is always optional, and each
          person connects only their own account.
        </p>

        <h3 id="google-vaultiq">VaultIQ</h3>
        <p>
          <strong>What it requests.</strong> VaultIQ asks for one Google
          permission, and only when a coach chooses to connect:
        </p>
        <ul>
          <li>
            <strong>
              https://www.googleapis.com/auth/calendar.events.readonly
            </strong>{" "}
            — to read events on the connecting coach&apos;s own calendar, so
            VaultIQ can find the next session with a client.
          </li>
        </ul>
        <p>
          VaultIQ never creates, changes, or deletes calendar events. It does
          not request access to Gmail, Google Drive, Google Contacts, Google
          Chat, or any other Google service, and it reads only the calendar of
          the person who connects.
        </p>
        <p>
          <strong>How it uses the data.</strong> What VaultIQ reads from a
          coach&apos;s calendar is shown only to that coach, live, and is never
          saved. The Connections page lists the coach&apos;s own upcoming
          events, and the coach&apos;s own preparation view for a client can
          show a private note — labelled as visible only to them — with the
          date of the next event on their calendar that plainly belongs to that
          client (by its title, a name on the client&apos;s profile, or an
          invited address on that profile). Calendar events, including their
          titles, attendees, and descriptions, are not copied into
          VaultIQ&apos;s database.
        </p>
        <p>
          Shared records never use calendar data. Session agendas, weekly
          action sheets, and VaultIQ&apos;s audit trail use the next-session
          date kept on the client&apos;s record, never a coach&apos;s calendar,
          so no coach&apos;s calendar information is shown to other advisors or
          to the client.
        </p>
        <p>
          <strong>How it stores and protects the connection.</strong>
        </p>
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
            BSTS keeps backups of VaultIQ&apos;s database. They include the
            encrypted authorizations.
          </li>
        </ul>
        <p>
          <strong>Disconnecting.</strong> A coach can disconnect at any time
          from VaultIQ&apos;s Connections page, or from the Google Account
          permissions page at{" "}
          <a href="https://myaccount.google.com/permissions">
            myaccount.google.com/permissions
          </a>
          . When a coach disconnects in VaultIQ, VaultIQ asks Google to revoke
          the authorization and marks its stored copy revoked so VaultIQ can
          never use it again. The encrypted copy is kept, together with an
          audit-trail entry recording when the connection was made (with the
          permissions granted) and when it was revoked.
        </p>

        <h3 id="google-prospecting-engine">ActionCOACH Prospecting Engine</h3>
        <p>
          The Prospecting Engine is business-development software that BSTS
          builds and operates for ActionCOACH Peachtree.
        </p>
        <p>
          <strong>What it requests.</strong> The Prospecting Engine asks for
          these Google permissions only, and only when a team member chooses to
          connect their own Google account:
        </p>
        <ul>
          <li>
            <strong>https://www.googleapis.com/auth/gmail.send</strong> — to
            send an email the team member has written and reviewed, from their
            own Gmail account, when they press Send.
          </li>
          <li>
            <strong>https://www.googleapis.com/auth/calendar.events</strong> —
            to create an appointment the team member sets up on their own
            calendar, and to invite the attendees they choose.
          </li>
          <li>
            <strong>openid</strong> and <strong>email</strong> — to show which
            Google account is connected.
          </li>
        </ul>
        <p>
          <strong>What it never does.</strong> It does not read, search, list,
          modify, or delete email. It does not read, list, or change existing
          calendar events. It does not access Google Drive, Google Contacts, or
          any other Google service.
        </p>
        <p>
          <strong>What it stores.</strong> For each connected team member, it
          stores the Google account&apos;s email address, the permissions that
          were granted, and the authorization tokens Google issues, so it can
          send or schedule on that member&apos;s behalf. That email address is
          kept with the member&apos;s own connection and shown only to them;
          records the rest of the team can see name the team member, not their
          Google address. Those tokens are held
          in its database, which is operated by Supabase with encryption at
          rest under that provider&apos;s published protections; the
          Prospecting Engine does not add its own encryption to them.
          Row-level security limits each signed-in team member to their own
          connection, and the server and BSTS&apos;s database administrators
          can also access it to operate the service.
        </p>
        <p>
          For each email sent, it keeps a record of the recipient, subject, send
          time, the name of the team member who sent it in the Prospecting
          Engine, and Google&apos;s message identifiers. The recipient is recorded just before the email is handed
          to Google, so a failed attempt is recorded too. It does not keep the
          message body on its servers. If a team member has to reconnect Google
          while writing an email, the unsent draft is kept in that browser
          tab&apos;s temporary storage so it is not lost. It is cleared the next
          time the page loads or when the tab is closed, it is offered back only
          within 30 minutes, and it is not sent to our servers.
          For each appointment, it keeps the title, time, time zone,
          attendees, the name of the team member who created it, and
          Google&apos;s event identifiers and link.
          These records form part of the business&apos;s activity history, are
          visible to the team members who use the Prospecting Engine for that
          business, and are kept after a team member disconnects.
        </p>
        <p>
          <strong>Disconnecting.</strong> A team member can disconnect at any
          time from the app&apos;s header. Disconnecting deletes the stored
          authorization from the Prospecting Engine&apos;s database. It does
          not withdraw the permission on Google&apos;s side; to do that, remove
          the app at{" "}
          <a href="https://myaccount.google.com/permissions">
            myaccount.google.com/permissions
          </a>
          . The stored authorization is also deleted automatically if Google
          reports it is no longer valid. Records of emails already sent and
          appointments already created stay in the activity history.
        </p>

        <h3>Deletion requests</h3>
        <p>
          A request to delete Google-derived data held by either product can be
          sent to us using the contact details on the{" "}
          <Link href="/contact/">contact page</Link>.
        </p>

        <h3>Artificial intelligence</h3>
        <p>
          Google user data is not used to develop, improve, or train generalized
          artificial-intelligence or machine-learning models. Neither product
          sends Google user data to any artificial-intelligence provider. The
          Prospecting Engine&apos;s research feature sends an
          artificial-intelligence provider details about the business being
          researched and the reason a team member gave for the request, never
          email or calendar records. VaultIQ never puts calendar data into any
          document, so none of it can reach an artificial-intelligence
          provider.
        </p>

        <h3>Limited Use</h3>
        <p>
          VaultIQ&apos;s and the ActionCOACH Prospecting Engine&apos;s use and
          transfer of information received from Google APIs will adhere to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. Specifically:
        </p>
        <ul>
          <li>
            We use Google user data only to provide or improve the user-facing
            features described above, which are prominent in each
            product&apos;s interface.
          </li>
          <li>
            We do not transfer Google user data to others except: as necessary
            to provide or improve those user-facing features, and only with the
            user&apos;s consent; for security purposes, such as investigating
            abuse; to comply with applicable law; or as part of a merger,
            acquisition, or sale of assets, and only after obtaining the
            user&apos;s explicit prior consent.
          </li>
          <li>
            We do not use, transfer, or sell Google user data for serving ads,
            including retargeting, personalized, or interest-based advertising;
            we do not transfer or sell it to advertising platforms, data
            brokers, or information resellers; and we do not use it to determine
            credit-worthiness or for lending purposes.
          </li>
          <li>
            We do not allow humans to read Google user data unless: the user has
            given affirmative agreement for specific data to be viewed by
            specific people, for example by confirming that a particular item
            may be shown to the people the product names before it is shared;
            it is necessary for security purposes, such as investigating a bug
            or abuse; it is necessary to comply with applicable law; or the
            data, including anything derived from it, is aggregated and used for
            internal operations in accordance with applicable privacy and other
            legal requirements.
          </li>
          <li>
            We do not use Google user data to develop, improve, or train
            generalized artificial-intelligence or machine-learning models.
          </li>
        </ul>

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
