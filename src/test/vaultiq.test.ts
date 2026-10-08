import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { footerLinks, site } from "@/lib/site";
import {
  googleDisclosure,
  planned,
  shipped,
  vaultiqAvailability,
} from "@/lib/content/vaultiq";

/**
 * VaultIQ page guards.
 *
 * This page is not only marketing. It is the OAuth application homepage that
 * Google reads during sensitive-scope verification, and the privacy policy it
 * points at is the document Google compares against the consent screen. The
 * failure mode these tests exist for is a quiet one: someone edits the copy,
 * the build stays green, and the site now claims a Google permission the
 * software does not request — or requests one the site never disclosed.
 *
 * Every assertion below maps to a published Google requirement or to a
 * statement of fact about the product that must not drift.
 */

const src = (p: string) => readFileSync(join(__dirname, "..", p), "utf8");

const PAGE = "app/(marketing)/vaultiq/page.tsx";
const PRIVACY = "app/(marketing)/privacy/page.tsx";

describe("VaultIQ page — Google OAuth homepage requirements", () => {
  const page = src(PAGE);

  it("uses the exact approved title", () => {
    expect(page).toContain(
      'title: { absolute: "VaultIQ | Secure Client Intelligence | BSTS" }',
    );
  });

  it("is indexable rather than hidden from crawlers", () => {
    expect(/robots:\s*\{[^}]*index:\s*false/.test(page)).toBe(false);
    expect(page).toContain("robots: { index: true, follow: true }");
  });

  it("carries a visible link to the privacy policy and the terms", () => {
    expect(page).toContain('href="/privacy/"');
    expect(page).toContain('href="/terms/"');
    expect(page).toContain('href="/privacy/#google-workspace"');
  });

  it("gives a reader a route to a human", () => {
    expect(page).toContain('href="/contact');
  });

  it("names the operating legal entity", () => {
    expect(page).toContain("site.legalName");
  });

  it("is reachable from the site-wide footer", () => {
    expect(footerLinks.more.map((l) => l.href)).toContain("/vaultiq");
  });

  it("is listed in the sitemap under the canonical origin", () => {
    expect(sitemap().map((e) => e.url)).toContain(`${site.url}/vaultiq/`);
  });
});

describe("VaultIQ content — built and not-built stay separated", () => {
  it("publishes both lists, neither of them empty", () => {
    expect(shipped.length).toBeGreaterThan(3);
    expect(planned.length).toBeGreaterThan(0);
  });

  it("renders the not-built section on the page, not only in the data", () => {
    const page = src(PAGE);
    expect(page).toContain("Designed, not built");
    expect(page).toContain("What VaultIQ does not do yet.");
  });

  it("states availability plainly rather than implying a product on sale", () => {
    const page = src(PAGE);
    expect(page).toContain("vaultiqAvailability");
    expect(vaultiqAvailability).toContain("not generally available");
  });
});

describe("Google Calendar disclosure", () => {
  it("states the live, read-only connection and that VaultIQ never writes", () => {
    expect(googleDisclosure.status).toContain("asks for read-only access");
    expect(googleDisclosure.status).toContain(
      "never creates, changes, or deletes calendar events",
    );
  });

  it("requests exactly the one read-only calendar scope VaultIQ offers", () => {
    // Mirrors OFFERED_GOOGLE_CAPABILITIES = ["calendar_read"] in VaultIQ.
    expect(googleDisclosure.scopes.map((s) => s.scope)).toEqual([
      "https://www.googleapis.com/auth/calendar.events.readonly",
    ]);
  });

  it("explains the shared Google sign-in with the Prospecting Engine", () => {
    expect(googleDisclosure.sharedSignIn).toContain(
      "ActionCOACH Prospecting Engine",
    );
    expect(googleDisclosure.sharedSignIn).toContain(
      "VaultIQ itself never requests either permission",
    );
    expect(src(PAGE)).toContain("googleDisclosure.sharedSignIn");
  });

  it("says no calendar data reaches an AI provider, matching the policy", () => {
    expect(googleDisclosure.handling).toContain(
      "No Google Calendar data is sent to an artificial-intelligence provider.",
    );
  });

  it("never advertises a Gmail or Drive scope anywhere in public content", () => {
    // Naming Gmail and Drive in order to disclaim them is correct and expected.
    // Publishing their OAuth SCOPE STRINGS would tell a reviewer the app asks
    // for them. Those strings must not appear.
    for (const file of [PAGE, PRIVACY, "lib/content/vaultiq.ts"]) {
      // The one exception: the privacy policy discloses the ActionCOACH
      // Prospecting Engine's send-only Gmail permission, which that app really
      // requests under the same Google project. Any other Gmail scope fails.
      const text =
        file === PRIVACY
          ? src(file).replaceAll("https://www.googleapis.com/auth/gmail.send", "")
          : src(file);
      expect(text).not.toContain("auth/gmail.");
      expect(text).not.toContain("auth/drive.");
    }
  });

  it("carries the Limited Use commitment in Google's required terms", () => {
    const lu = googleDisclosure.limitedUse;
    expect(lu).toContain("Google API Services User Data Policy");
    expect(lu).toContain("Limited Use requirements");
    expect(lu).toContain("never used or sold for advertising");
    expect(lu).toContain("only after the user's explicit prior consent");
    expect(lu).toContain("aggregated and used for internal operations");
    expect(lu).toContain(
      "develop, improve, or train generalized artificial-intelligence",
    );
  });
});

describe("privacy policy — Google Workspace section", () => {
  const privacy = src(PRIVACY);

  it("exposes the anchor the VaultIQ page links to", () => {
    expect(privacy).toContain('<h2 id="google-workspace">');
    expect(privacy).toContain("Google Workspace and Google API Data");
  });

  it("keeps the pre-existing website disclosures intact", () => {
    // The policy was updated, not replaced. These sections predate VaultIQ and
    // must survive every future edit to it.
    for (const kept of [
      "Web3Forms",
      "Cloudflare\n          Pages",
      "Cookies and local storage",
      "Your choices",
      "Formal legal review is pending",
    ]) {
      expect(privacy).toContain(kept);
    }
  });

  it("carries a new effective date and preserves the previous one", () => {
    expect(privacy).toContain("Effective date: October 7, 2026");
    expect(privacy).toContain("Previous version: September 15, 2026");
  });

  it("states the storage protection and revocation", () => {
    expect(privacy).toContain("AES-256-GCM");
    expect(privacy).toContain("row-level security");
    expect(privacy).toContain("myaccount.google.com/permissions");
  });

  it("states the Limited Use commitment in Google's terms, without a broad sharing exception", () => {
    expect(privacy).toContain("Google API Services User Data Policy");
    expect(privacy).toContain("Limited Use requirements");
    // Mergers need explicit prior consent, not notice; feature transfers need consent.
    expect(privacy).toContain("only after obtaining the\n            user&apos;s explicit prior consent");
    expect(privacy).not.toContain("with notice to users");
    // Human reading: affirmative agreement for specific data and people, and
    // the internal-operations condition for aggregated data.
    expect(privacy).toContain("affirmative agreement for specific data to be viewed by\n            specific people");
    expect(privacy).toContain("internal operations");
    expect(privacy).not.toMatch(/shared through the product/i);
  });

  it("says VaultIQ keeps calendar data private and shared records use the client record", () => {
    expect(privacy).toContain("Shared records do not use calendar data.");
    expect(privacy).not.toContain("which can come from that coach&apos;s calendar");
  });

  it("acknowledges the calendar-derived records from before 7 October 2026 instead of claiming 'never'", () => {
    // Verified 7 Oct 2026: 29 Sep – 7 Oct an earlier version copied calendar dates into
    // shared agendas, weekly sheets and audit rows; agendas redacted, the rest held.
    expect(privacy).toContain("<strong>Records from before 7 October 2026.</strong>");
    expect(privacy).toContain("in use from 29 September to 7 October 2026");
    expect(privacy).not.toContain("Shared records never use calendar data.");
    expect(privacy).not.toMatch(/and is never\s+saved/);
    expect(privacy).not.toContain("VaultIQ never puts calendar data into any");
    // The engine's earlier Google addresses on team records are disclosed too.
    expect(privacy).toContain("Before 7 October 2026, the Prospecting Engine also");
    // No calendar-derived date reached an AI provider (weekly sheets: built-in drafter).
    expect(privacy).toContain("were never sent to an\n          artificial-intelligence provider");
  });

  it("says engine team records name the member, not their Google address", () => {
    expect(privacy).toContain("records the rest of the team can see name the team member, not their\n          Google address");
    expect(privacy).not.toContain("the Google account it was sent from");
  });

  it("says no Google user data reaches an AI provider", () => {
    expect(privacy).toContain(
      "Neither product\n          sends Google user data to any artificial-intelligence provider.",
    );
  });

  it("does not claim the Prospecting Engine encrypts tokens or revokes at Google", () => {
    // Verified 7 Oct 2026: engine tokens are stored without application-level
    // encryption, and disconnect deletes the row without calling Google.
    const engine = privacy.slice(
      privacy.indexOf('id="google-prospecting-engine"'),
      privacy.indexOf("Deletion requests"),
    );
    expect(engine).toContain("does not add its own encryption");
    expect(engine).toContain("does\n          not withdraw the permission on Google&apos;s side");
    expect(engine).not.toContain("AES-256");
  });

  it("discloses each app's Google permissions, and only those", () => {
    // VaultIQ: read-only calendar. Prospecting Engine: send-only Gmail and
    // event creation. These must match what each OAuth client requests.
    const vaultiq = privacy.slice(
      privacy.indexOf('id="google-vaultiq"'),
      privacy.indexOf('id="google-prospecting-engine"'),
    );
    const engine = privacy.slice(
      privacy.indexOf('id="google-prospecting-engine"'),
      privacy.indexOf("Deletion requests"),
    );
    expect(vaultiq).toContain("auth/calendar.events.readonly");
    expect(vaultiq).not.toMatch(/auth\/calendar\.events(?!\.readonly)/);
    expect(engine).toContain("https://www.googleapis.com/auth/gmail.send");
    expect(engine).toContain("https://www.googleapis.com/auth/calendar.events");
    expect(engine).not.toContain("calendar.events.readonly");
  });
});
