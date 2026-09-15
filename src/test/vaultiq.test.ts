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
  it("states that no Google connection exists today", () => {
    expect(googleDisclosure.status).toContain(
      "VaultIQ does not connect to Google today",
    );
    expect(googleDisclosure.status).toContain("stores no Google user data");
  });

  it("requests exactly the two calendar scopes and no others", () => {
    expect(googleDisclosure.scopes.map((s) => s.scope)).toEqual([
      "https://www.googleapis.com/auth/calendar.events.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ]);
  });

  it("never advertises a Gmail or Drive scope anywhere in public content", () => {
    // Naming Gmail and Drive in order to disclaim them is correct and expected.
    // Publishing their OAuth SCOPE STRINGS would tell a reviewer the app asks
    // for them. Those strings must not appear.
    for (const file of [PAGE, PRIVACY, "lib/content/vaultiq.ts"]) {
      const text = src(file);
      expect(text).not.toContain("auth/gmail.");
      expect(text).not.toContain("auth/drive.");
    }
  });

  it("carries the Limited Use commitment in Google's required terms", () => {
    const lu = googleDisclosure.limitedUse;
    expect(lu).toContain("Google API Services User Data Policy");
    expect(lu).toContain("Limited Use requirements");
    expect(lu).toContain("will not be used for advertising");
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
    expect(privacy).toContain("Effective date: September 15, 2026");
    expect(privacy).toContain("Previous version: July 19, 2026");
  });

  it("states the current-status fact, the storage protection, and revocation", () => {
    expect(privacy).toContain("VaultIQ does not connect to Google today");
    expect(privacy).toContain("AES-256-GCM");
    expect(privacy).toContain("row-level security");
    expect(privacy).toContain("myaccount.google.com/permissions");
  });

  it("states the Limited Use commitment in the policy itself", () => {
    expect(privacy).toContain("Google API Services User Data Policy");
    expect(privacy).toContain("Limited Use requirements");
  });

  it("does not claim Google data is sent to an AI provider today", () => {
    expect(privacy).toContain(
      "No Google user data is sent to any third-party",
    );
  });
});
