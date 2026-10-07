import {
  Building2,
  CalendarClock,
  FileStack,
  Fingerprint,
  KeySquare,
  Layers,
  ScrollText,
  Timer,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * VaultIQ — public product page content.
 *
 * EDITING RULE, and the reason this file exists at all.
 *
 * This page is the OAuth application homepage Google reads during sensitive-
 * scope verification. Google compares three things: what this page says the
 * software does, what the privacy policy says happens to Google user data, and
 * what the software actually requests at the consent screen. A sentence here
 * that runs ahead of the build is not marketing enthusiasm — it is a
 * verification failure, and it is also simply untrue.
 *
 * So the two lists below are load-bearing:
 *
 *   `shipped`  — behaviour that exists in the frozen pilot build and has been
 *                exercised against the hosted deployment. Every line is
 *                something a reviewer could be shown.
 *   `planned`  — designed, specified, NOT BUILT. Nothing here may be described
 *                anywhere on this site in the present tense.
 *
 * Moving a line from `planned` to `shipped` is a deliberate act that happens
 * only after the capability is running in the hosted product. It is not a
 * copy edit.
 */

/** The single sentence the product is organised around. */
export const vaultiqDoctrine = "Automate the retrieval, never the relationship.";

export const vaultiqIntro = {
  eyebrow: "Product",
  title: "VaultIQ",
  lede:
    "A private client vault for advisory firms. Every document, note, and meeting record for a client in one place, isolated at the database level, searchable by the people entitled to see it — and by nobody else.",
} as const;

/**
 * Availability. Stated plainly and early, because the alternative is letting a
 * reader assume they can buy this today.
 */
export const vaultiqAvailability =
  "VaultIQ is in a private pilot with one client organization. It is not generally available, it is not sold on this website, and there is no public sign-up. This page exists so that the people evaluating it — clients, partners, and platform reviewers — can read an accurate account of what the software does.";

export type VaultiqCapability = {
  icon: LucideIcon;
  title: string;
  body: string;
};

/* ------------------------------------------------------------------ */
/* SHIPPED — in the pilot build today                                  */
/* ------------------------------------------------------------------ */

export const shipped: VaultiqCapability[] = [
  {
    icon: Building2,
    title: "One vault per client, isolated in the database",
    body:
      "Each client gets a vault. Separation is enforced by row-level security in Postgres rather than by application code alone, so a query that forgets its filter returns nothing rather than someone else's client. The isolation is exercised by an automated suite against the hosted database, not only against a local copy.",
  },
  {
    icon: UsersRound,
    title: "Access that mirrors how a firm actually works",
    body:
      "Organization roles of owner, advisor, and member; a separate role on each individual vault; and visibility grants that keep advisor-private material away from staff who should not read it. An advisor demoted at the organization level is narrowed at the database level too, not merely hidden in the interface.",
  },
  {
    icon: KeySquare,
    title: "Two sharing models, chosen by the firm",
    body:
      "A firm can run in explicit mode, where every vault is shared deliberately with named people, or in a shared mode, where every active advisor in the firm is added to new vaults automatically. Which mode a firm is in is recorded on the organization, and every membership row records why it exists — created, granted by policy, or added by hand.",
  },
  {
    icon: FileStack,
    title: "Document intake and retrieval",
    body:
      "PDF, plain-text, Markdown, and CSV sources are ingested and their text extracted for retrieval. Other formats are stored and tracked but not yet read; that gap is listed below rather than glossed over.",
  },
  {
    icon: ScrollText,
    title: "Meetings, facts, and an audit trail",
    body:
      "Meeting records, meeting items, and durable client facts live alongside the documents. Access and connector changes are written to an audit log, so the question of who saw what has an answer that does not depend on memory.",
  },
  {
    icon: CalendarClock,
    title: "The next session, from the coach's own calendar",
    body:
      "A coach can choose to connect their own Google Calendar, read-only. VaultIQ then finds the next session with a client on that calendar and shows its date in the preparation view, and the coach sees their own upcoming events on the Connections page. It never creates, changes, or deletes events — see the disclosure below.",
  },
  {
    icon: Timer,
    title: "Retention and export the client controls",
    body:
      "Retention periods are set by the client organization rather than assumed, and a full tenant export is available to the owner. A pilot cannot begin until the owner has approved real data, acknowledged key custody, and set retention — the software refuses to treat those as defaults.",
  },
];

/* ------------------------------------------------------------------ */
/* PLANNED — designed, not built                                       */
/* ------------------------------------------------------------------ */

export const planned: VaultiqCapability[] = [
  {
    icon: CalendarClock,
    title: "Scheduling from inside a vault",
    body:
      "Booking a client meeting without leaving that client's vault. Designed and specified. Not built: VaultIQ's Google connection is read-only today and requests no permission to create or change events.",
  },
  {
    icon: Layers,
    title: "Meeting-recording intake",
    body:
      "Bringing recorded meeting summaries into the right client vault automatically, with the association verified before anything is filed. Specified, including the signature-verification scheme. Not built.",
  },
  {
    icon: Fingerprint,
    title: "Bulk onboarding and source routing",
    body:
      "Creating many client vaults at once from an existing client list, and routing a large batch of mixed documents to the right vault with a confidence threshold and a human review queue for anything ambiguous. Specified. Not built.",
  },
  {
    icon: FileStack,
    title: "Text extraction for office formats",
    body:
      "Word, Excel, and PowerPoint files are stored today but their text is not extracted, so they are not yet retrievable by content. Closing that gap is on the post-pilot list.",
  },
];

/* ------------------------------------------------------------------ */
/* Google Calendar disclosure — mirrored by the privacy policy          */
/* ------------------------------------------------------------------ */

/**
 * LIVE integration, read-only. Every claim here was checked against VaultIQ
 * main (ffa81a7) on 7 Oct 2026: OFFERED_GOOGLE_CAPABILITIES is
 * ["calendar_read"] (calendar.events.readonly), the Google provider's write
 * methods throw, events are read from the connecting user's primary calendar
 * and not persisted, and the only calendar-derived value saved is the
 * next-session date on agendas and weekly action sheets.
 *
 * The matching section in src/app/(marketing)/privacy/page.tsx must not
 * disagree with this. src/test/vaultiq.test.ts checks that both exist.
 */
export const googleDisclosure = {
  heading: "Google Calendar connection — read-only",
  status:
    "VaultIQ connects to Google Calendar only when a coach chooses to connect their own calendar, and it asks for read-only access. It reads that coach's upcoming events to find the next session with a client. It never creates, changes, or deletes calendar events, and it does not copy calendar events into its database.",
  scopeIntro:
    "VaultIQ requests one Google permission, the narrowest that does the job, and only at the moment someone chooses to connect their own calendar:",
  scopes: [
    {
      scope: "https://www.googleapis.com/auth/calendar.events.readonly",
      purpose:
        "Read events on the primary calendar of the person who connected it, so VaultIQ can show the date of their next session with a client and list their own upcoming events on their Connections page.",
    },
  ],
  notRequested: [
    "Gmail — no mail scope is requested, and no mailbox is read",
    "Google Drive — no Drive scope is requested, and no files are read",
    "Permission to create, change, or delete calendar events",
    "Google Contacts, Google Chat, and every other Workspace service",
    "Any calendar other than the one belonging to the person who connects",
  ],
  handling: [
    "Each user connects their own Google account. Connecting is a choice, never a condition of using VaultIQ, and a firm can run the product with no Google connection at all.",
    "Authorization tokens are encrypted with AES-256-GCM before they are written to storage, and each record is readable only by the account that created it, enforced by row-level security in the database rather than by application code alone.",
    "Calendar events are read when needed and are not saved. The one calendar-derived item VaultIQ keeps is the date and time of a client's next session, saved with a session agenda or weekly action sheet the coach builds. Saved agendas are visible to the advisors on that client under the firm's vault permissions, and a weekly action sheet is a document shared with the client.",
    "No Google Calendar data is sent to an artificial-intelligence provider.",
    "A user can disconnect at any time from VaultIQ's Connections page or from their Google Account permissions page. Disconnecting in VaultIQ asks Google to revoke access and marks the stored authorization revoked so VaultIQ can no longer use it; the encrypted record and an audit entry are kept.",
  ],
  sharedSignIn:
    "VaultIQ's Google sign-in application is also used by the ActionCOACH Prospecting Engine, a separate BSTS product with its own sign-in client. When a team member connects Google in the Prospecting Engine, Google's consent screen also shows the name \"VaultIQ\", and it lists that product's own permissions: sending an email the team member has written (send-only, no access to read mail) and creating appointments on their own calendar. VaultIQ itself never requests either permission.",
  limitedUse:
    "Use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. Google user data will not be used for advertising, will not be sold or transferred except as required to provide the feature the user asked for or as required by law, will not be read by humans except with the user's explicit permission, for security purposes, to comply with law, or on data that has been aggregated and made anonymous, and will not be used to develop, improve, or train generalized artificial-intelligence or machine-learning models.",
} as const;

/* ------------------------------------------------------------------ */
/* Security posture — factual, no certification language                */
/* ------------------------------------------------------------------ */

export const vaultiqSecurity = [
  "Tenant isolation enforced in the database by row-level security, with an automated suite that runs against the hosted database and fails the build rather than the client.",
  "Least-privilege permissions requested per capability, never a blanket connection to an account.",
  "Secrets held in managed environment configuration; credentials are never committed to source control.",
  "An audit log of access and connector changes, retained under the client organization's own retention settings.",
  "Human approval on consequential actions, consistent with how BSTS builds everything else.",
] as const;

/** Where the reader goes next. No pricing is published for a product in pilot. */
export const vaultiqContactNote =
  "VaultIQ is built and operated by Bevier Strategic Technology Solutions LLC. Questions about the product, the pilot, or how it handles data can be sent through the contact page.";
