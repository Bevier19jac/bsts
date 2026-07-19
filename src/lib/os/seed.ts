import type { OsState } from "./types";

/**
 * Demo seed data. Every person, company, and detail here is FICTIONAL and
 * clearly labeled. Solara House is the same invented boutique hotel used in
 * the marketing site's concept demonstration. No real PII appears anywhere.
 */
export function createSeedState(): OsState {
  return {
    kind: "bsts-os-demo-state",
    version: 1,

    prospects: [
      {
        id: "pr-solara",
        name: "Solara House (fictional)",
        industry: "Boutique hospitality",
        stage: "Won",
        contactName: "Avery Solano (fictional)",
        contactRole: "General Manager",
        note: "28-room coastal property. Entered via the hospitality assessment; the keep/connect map sold itself. Now an active client — see Clients.",
        addedOn: "Demo · day 1",
      },
      {
        id: "pr-meridian",
        name: "Meridian Ledger Group (fictional)",
        industry: "Professional services",
        stage: "Assessment",
        contactName: "Rowan Ashe (fictional)",
        contactRole: "Managing Partner",
        note: "Small accounting practice; intake scattered across three inboxes. Assessment scheduled — expects strong Connect findings.",
        addedOn: "Demo · day 9",
      },
      {
        id: "pr-copperline",
        name: "Copperline Outfitters (fictional)",
        industry: "Local commerce & retail",
        stage: "Conversation",
        contactName: "Jules Ferrant (fictional)",
        contactRole: "Owner",
        note: "Two storefronts, one webshop, three inventory truths. Wants unified stock before the fall season.",
        addedOn: "Demo · day 14",
      },
      {
        id: "pr-northbay",
        name: "North Bay Wellness Studio (fictional)",
        industry: "Health-adjacent practice",
        stage: "Lead",
        contactName: "Sam Okafor (fictional)",
        contactRole: "Practice Director",
        note: "Referred by a fictional colleague. Sensitive-data boundaries will be the first conversation, not the last.",
        addedOn: "Demo · day 21",
      },
    ],

    clients: [
      {
        id: "cl-solara",
        name: "Solara House (fictional)",
        industry: "Boutique hospitality",
        status: "Active engagement",
        summary:
          "Keep the PMS and POS; connect the stack around one guest record; automate the repetitive middle; add a drafts-only AI assistant; secure the foundation.",
        since: "Demo · week 2",
      },
    ],

    assessments: [
      {
        id: "as-solara",
        subject: "Solara House (fictional)",
        subjectId: "pr-solara",
        status: "Delivered",
        conductedOn: "Demo · week 1",
        problem:
          "A reservation is touched by hand up to four times before check-in. Guest preferences live in one veteran's spreadsheet. The nightly report costs 40 minutes of copy-paste after close.",
        systems: [
          "Property management system (solid, staff fluent)",
          "Restaurant & bar point of sale (reliable, an island)",
          "Booking engine + two OTA channels (rates updated by hand)",
          "Guest-preference spreadsheet (one maintainer)",
          "Shared inbox (special requests go to be forgotten)",
        ],
        findings: [
          {
            id: "af-1",
            lane: "Keep",
            finding: "PMS and POS both pass the keep test: reliable, integrable, secure enough, and loved.",
            recommendation: "Retain both; document configuration and access; build around them.",
          },
          {
            id: "af-2",
            lane: "Connect",
            finding: "PMS, POS, and booking engine each hold a partial guest record; none share it.",
            recommendation: "Join the three through existing APIs into one guest record with the PMS as source of truth.",
          },
          {
            id: "af-3",
            lane: "Automate",
            finding: "Confirmations, pre-arrival notes, and the nightly report are identical every day and fully rule-shaped.",
            recommendation: "Automate all three with human review queues and full audit trails.",
          },
          {
            id: "af-4",
            lane: "Build",
            finding: "Routine guest email (parking, hours, late checkout) is 60% of inbox volume.",
            recommendation: "Drafts-only AI assistant grounded in house policy; every send requires a human.",
          },
          {
            id: "af-5",
            lane: "Secure",
            finding: "Shared logins at the front desk; backups untested; no written incident starting point.",
            recommendation: "Individual accounts with least privilege, tested encrypted backups, one-page incident plan.",
          },
        ],
      },
      {
        id: "as-meridian",
        subject: "Meridian Ledger Group (fictional)",
        subjectId: "pr-meridian",
        status: "In progress",
        conductedOn: "Demo · scheduled",
        problem:
          "Client intake arrives by email, referral call, and a web form that feeds a mailbox nobody owns. Engagement letters are assembled by copy-paste from old ones.",
        systems: [
          "Practice management suite (aging but functional)",
          "Three partner inboxes acting as intake queues",
          "Document templates in a shared drive",
        ],
        findings: [],
      },
    ],

    roadmapItems: [
      {
        id: "rm-1",
        clientId: "cl-solara",
        title: "Unified guest record across PMS, POS, booking engine",
        lane: "Connect",
        priority: "Now",
        effort: "M",
        rationale: "Every downstream automation depends on one trustworthy record. Ships first.",
      },
      {
        id: "rm-2",
        clientId: "cl-solara",
        title: "Security baseline: accounts, backups, incident one-pager",
        lane: "Secure",
        priority: "Now",
        effort: "S",
        rationale: "Cheap, fast, and a precondition for touching guest data at all.",
      },
      {
        id: "rm-3",
        clientId: "cl-solara",
        title: "Automated nightly operations report",
        lane: "Automate",
        priority: "Next",
        effort: "S",
        rationale: "40 staff-minutes per night; the unified record makes it nearly free.",
      },
      {
        id: "rm-4",
        clientId: "cl-solara",
        title: "Guest communication sequences (confirm, pre-arrival, post-stay)",
        lane: "Automate",
        priority: "Next",
        effort: "M",
        rationale: "Composed from the unified record; each message reviewed until trust is earned.",
      },
      {
        id: "rm-5",
        clientId: "cl-solara",
        title: "Drafts-only AI email assistant on house knowledge",
        lane: "Build",
        priority: "Later",
        effort: "M",
        rationale: "Deliberately last: it inherits the unified record, the review culture, and the security baseline.",
      },
    ],

    projects: [
      {
        id: "pj-guest-record",
        clientId: "cl-solara",
        name: "One Guest Record",
        lane: "Connect",
        status: "Active",
        description:
          "Join PMS, POS, and booking engine into a single guest record with the PMS as source of truth. Dietary notes and preferences flow to the restaurant seating sheet automatically.",
        tasks: [
          { id: "t-1", title: "Map fields across the three systems", done: true },
          { id: "t-2", title: "Read-only sync running in staging", done: true },
          { id: "t-3", title: "Write-back rules agreed with front desk", done: false },
          { id: "t-4", title: "Two-week parallel run with manual spot checks", done: false },
        ],
      },
      {
        id: "pj-security-baseline",
        clientId: "cl-solara",
        name: "Security Baseline",
        lane: "Secure",
        status: "In review",
        description:
          "Individual accounts with least privilege, tested encrypted backups, and a one-page incident-response starting point the whole team has read.",
        tasks: [
          { id: "t-5", title: "Retire shared front-desk login", done: true },
          { id: "t-6", title: "Backup restore test (documented)", done: true },
          { id: "t-7", title: "Incident one-pager reviewed with GM", done: false },
        ],
      },
      {
        id: "pj-night-report",
        clientId: "cl-solara",
        name: "Nightly Report Automation",
        lane: "Automate",
        status: "Discovery",
        description:
          "The nightly operations report assembles itself at close from the unified record. Staff review it; they no longer build it.",
        tasks: [
          { id: "t-8", title: "Inventory every number in the current report", done: true },
          { id: "t-9", title: "Confirm each source in the unified record", done: false },
        ],
      },
    ],

    risks: [
      {
        id: "rk-1",
        title: "Booking-engine API rate limits during peak season",
        context: "Sync frequency may need to drop during sell-out weekends.",
        severity: "Medium",
        likelihood: "Medium",
        status: "Mitigating",
        mitigation: "Queue with backoff; PMS remains source of truth so a delayed sync degrades gracefully.",
      },
      {
        id: "rk-2",
        title: "Single point of knowledge: preference spreadsheet owner",
        context: "One veteran staffer holds years of guest knowledge informally.",
        severity: "High",
        likelihood: "Medium",
        status: "Open",
        mitigation: "Import the spreadsheet into the unified record early, with her as reviewer — capture the knowledge while honoring its source.",
      },
      {
        id: "rk-3",
        title: "AI assistant drafts could drift from house policy",
        context: "Policy changes (e.g. pet rules) must reach the assistant's knowledge base.",
        severity: "Medium",
        likelihood: "Low",
        status: "Open",
        mitigation: "Single-source policy doc feeds the assistant; drafts-only mode means a human catches drift before a guest does.",
      },
    ],

    automations: [
      {
        id: "au-1",
        name: "Nightly ops report",
        trigger: "Daily at close (property time)",
        action: "Assemble report from unified record; deliver to management channel for review",
        status: "Draft",
        lastRun: "Not yet live",
        healthNote: "Awaiting One Guest Record write-back rules.",
      },
      {
        id: "au-2",
        name: "Reservation confirmation",
        trigger: "New booking synced",
        action: "Compose confirmation from guest record; queue for staff review and send",
        status: "Running",
        lastRun: "Demo · today, 09:14",
        healthNote: "Healthy. 100% of sends passed human review this demo-week.",
      },
      {
        id: "au-3",
        name: "Rate-parity anomaly flag",
        trigger: "Hourly channel scan",
        action: "Flag rate gaps between booking engine and OTA channels to ops channel",
        status: "Paused",
        lastRun: "Demo · yesterday, 17:00",
        healthNote: "Paused during OTA contract renegotiation (fictional).",
      },
    ],

    documents: [
      {
        id: "dc-1",
        title: "Solara House — Assessment Report",
        kind: "Assessment report",
        status: "Final",
        updatedOn: "Demo · week 1",
        note: "The delivered keep/connect/automate/build/secure map. Source for the roadmap.",
      },
      {
        id: "dc-2",
        title: "Statement of Work — Phase 1 (Connect + Secure)",
        kind: "Statement of work",
        status: "Final",
        updatedOn: "Demo · week 2",
        note: "Fixed scope: unified guest record and security baseline, with success criteria in writing.",
      },
      {
        id: "dc-3",
        title: "AI Assistant Boundary Document",
        kind: "Policy",
        status: "In review",
        updatedOn: "Demo · week 4",
        note: "What the assistant sees, what it may do, who approves what, what happens when it is wrong.",
      },
      {
        id: "dc-4",
        title: "Unified Guest Record — Architecture Note",
        kind: "Architecture note",
        status: "Draft",
        updatedOn: "Demo · week 3",
        note: "Field mapping, sync direction, conflict rules. PMS is source of truth.",
      },
    ],

    decisions: [
      {
        id: "de-1",
        title: "Keep the existing PMS",
        context: "Vendor pitched a cloud migration mid-assessment (fictional).",
        decision:
          "The PMS passes all four keep tests. Migration would burn a year of staff fluency for no guest-visible gain. Revisit only if vendor support lapses.",
        status: "Accepted",
        decidedOn: "Demo · week 1",
      },
      {
        id: "de-2",
        title: "PMS is the single source of truth for guest data",
        context: "Three systems each held partial, conflicting guest records.",
        decision:
          "All syncs treat the PMS as authoritative. Conflicts resolve toward the PMS; other systems are projections.",
        status: "Accepted",
        decidedOn: "Demo · week 2",
      },
      {
        id: "de-3",
        title: "AI assistant ships drafts-only, indefinitely",
        context: "Vendor default was auto-send with confidence thresholds.",
        decision:
          "Every outbound guest message requires a human send. This is a product property, not a rollout phase.",
        status: "Accepted",
        decidedOn: "Demo · week 4",
      },
      {
        id: "de-4",
        title: "Defer loyalty-program integration",
        context: "Tempting scope; weak current value for a 28-room property.",
        decision: "Proposed for the Later column pending season data. Not in Phase 1 or 2.",
        status: "Proposed",
        decidedOn: "Demo · week 5",
      },
    ],

    settings: {
      density: "Comfortable",
    },
  };
}
