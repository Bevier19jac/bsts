/**
 * Solara House — a FICTIONAL boutique hotel used to demonstrate the BSTS
 * approach. It is not a client, and no real property is referenced.
 * Every page using this content must carry the concept-demonstration label.
 */
export const solaraLabel =
  "CONCEPT DEMONSTRATION — NOT A CLIENT CASE STUDY";

export const solara = {
  name: "Solara House",
  descriptor:
    "A fictional 28-room boutique hotel on a coastal town square, invented by BSTS to show — concretely — what keep, connect, automate, build, and secure look like in hospitality.",
  before: {
    title: "The stack Solara House starts with",
    systems: [
      { name: "Property management system", note: "Solid, staff knows it cold — kept" },
      { name: "Point of sale (restaurant & bar)", note: "Reliable, but an island — kept, connected" },
      { name: "Booking engine + two OTA channels", note: "Rates updated by hand in three places" },
      { name: "Spreadsheet guest-preference log", note: "Maintained by one veteran front-desk lead" },
      { name: "Shared inbox", note: "Where special requests go to be forgotten" },
    ],
    frictions: [
      "A reservation is touched by hand up to four times before check-in",
      "Guest preferences survive only if the right person is on shift",
      "The nightly report takes 40 minutes of copy-paste after close",
      "No one can say which packages actually sell without an afternoon of digging",
    ],
  },
  moves: [
    {
      lane: "Keep",
      title: "The PMS and POS stay",
      body: "Both systems work and the staff is fluent in them. Replacing either would burn a year of muscle memory for zero guest-visible gain. They are documented, secured, and kept.",
    },
    {
      lane: "Connect",
      title: "One guest record, everywhere",
      body: "The PMS, POS, and booking engine are joined through their existing APIs. A dietary note captured at booking now appears on the restaurant's seating sheet automatically.",
    },
    {
      lane: "Automate",
      title: "The repetitive middle of the guest journey",
      body: "Confirmation, pre-arrival, and post-stay messages compose themselves from the unified record and go out on schedule. The nightly report assembles itself at close. Staff review, they no longer re-key.",
    },
    {
      lane: "Build",
      title: "A small AI concierge assistant — drafts only",
      body: "An assistant drafts replies to routine guest emails from house knowledge: hours, parking, late checkout policy. Every draft waits for a human send. It never invents policy and never touches payment data.",
    },
    {
      lane: "Secure",
      title: "A baseline informed by NIST CSF 2.0",
      body: "Access review, least privilege on guest data, encrypted backups, and a one-page incident plan the whole team has read. Security sized to a 28-room operation, not a compliance theater production.",
    },
  ],
  after: {
    title: "What changes for the team",
    outcomes: [
      "A reservation is entered once and flows to every system that needs it",
      "Guest preferences belong to the house, not to whoever is on shift",
      "The nightly report is waiting at close instead of costing 40 minutes",
      "Routine email is drafted by software and approved by people",
      "The owner can see package performance without an afternoon of digging",
    ],
    honesty:
      "Because Solara House is a demonstration, we attach no invented numbers to it — no fictional revenue lift, no imaginary satisfaction score. It shows the shape of the work, and the shape is real.",
  },
} as const;
