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
      "Organization roles of owner, advisor, and member; a separate role on each individual vault; and visibility grants that keep advisor-private material away from staff who should not read it. A coach demoted at the organization level is narrowed at the database level too, not merely hidden in the interface.",
  },
  {
    icon: KeySquare,
    title: "Two sharing models, chosen by the firm",
    body:
      "A firm can run in explicit mode, where every vault is shared deliberately with named people, or in shared-coaches mode, where active coaches are added to new vaults automatically. Which mode a firm is in is recorded on the organization, and every membership row records why it exists — created, granted by policy, or added by hand.",
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
    title: "Google Calendar scheduling from inside a vault",
    body:
      "Booking a client meeting without leaving that client's vault, and seeing the meetings already on the calendar in context. Designed and specified. No Google connection exists in the software today — see the disclosure below.",
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
 * PLANNED integration. Every claim here is checkable against the code:
 * the scope registry in the product names exactly these two scopes, the
 * authorization entry point has no callers, and the credentials the flow
 * requires are unset — so the connection genuinely cannot be initiated.
 *
 * The matching section in src/app/(marketing)/privacy/page.tsx must not
 * disagree with this. src/test/vaultiq.test.ts checks that both exist.
 */
export const googleDisclosure = {
  heading: "Google Calendar integration — planned, not active",
  status:
    "VaultIQ does not connect to Google today. It requests no Google permissions, receives no Google user data, and stores no Google user data. There is no live authorization flow in the software, and the credentials such a flow would require are not configured.",
  scopeIntro:
    "When the integration is enabled, VaultIQ will request the narrowest permissions that let it do the job, and only at the moment a coach chooses to connect their own calendar:",
  scopes: [
    {
      scope: "https://www.googleapis.com/auth/calendar.events.readonly",
      purpose:
        "Read events on the calendar of the coach who connected it, so their upcoming client meetings can be shown in context inside that client's vault.",
    },
    {
      scope: "https://www.googleapis.com/auth/calendar.events",
      purpose:
        "Create and update meetings that the coach schedules from inside a client vault, so scheduling does not require leaving the vault and re-typing the details.",
    },
  ],
  notRequested: [
    "Gmail — no mail scope is requested, and no mailbox is read",
    "Google Drive — no Drive scope is requested, and no files are read",
    "Google Contacts, Google Chat, and every other Workspace service",
    "Any calendar other than the one belonging to the coach who connects",
  ],
  handling: [
    "Each coach connects their own Google account. Connecting is a choice, never a condition of using VaultIQ, and a firm can run the product with no Google connection at all.",
    "Authorization tokens are encrypted with AES-256-GCM before they are written to storage, and each record is readable only by the account that created it, enforced by row-level security in the database rather than by application code alone.",
    "A coach can disconnect at any time from their Google account permissions page or from within VaultIQ. Disconnection is recorded, and the stored authorization stops being usable.",
    "Calendar information is shown to the coaches entitled to see that client, under the same vault permissions that govern every other record. It is not shown across firms, and vault isolation applies to it exactly as it applies to documents.",
  ],
  limitedUse:
    "Use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. Google user data will not be used for advertising, will not be sold or transferred except as required to provide the feature the coach asked for or as required by law, will not be read by humans except with the coach's explicit permission, for security purposes, to comply with law, or on data that has been aggregated and made anonymous, and will not be used to develop, improve, or train generalized artificial-intelligence or machine-learning models.",
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
