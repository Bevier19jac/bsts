import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { commercialSolutions } from "@/lib/content/commercial";
import { site, assessmentCta, discoveryCta } from "@/lib/site";

const source = (path: string) => readFileSync(join(__dirname, "..", path), "utf8");

describe("commercial clarity without a rebrand", () => {
  it("preserves the exact approved slogan", () => {
    expect(site.tagline).toBe("Secure the data. Enable the AI. Prove the controls.");
  });
  it("offers four distinct, explicitly scoped solution paths", () => {
    expect(commercialSolutions).toHaveLength(4);
    expect(new Set(commercialSolutions.map(s => s.slug)).size).toBe(4);
    for (const solution of commercialSolutions) expect(solution.href).toBe(`/services#${solution.slug}`);
    expect(source("app/(marketing)/services/page.tsx")).toContain("<SolutionsOverview />");
  });
  it("keeps conversation and assessment separate", () => {
    expect(discoveryCta.href).toBe("/contact");
    expect(assessmentCta.href).toBe("/#assessment");
    expect(assessmentCta.label).toBe("Start the Assessment");
    const landing = source("components/landing/Landing.tsx");
    expect(landing).toContain("href={discoveryCta.href}");
    expect(landing).toContain('select("assessment")');
    expect(landing).toContain('<IdentityLockup size="hero" priority />');
    expect(landing).toContain("<StrategicLine />");
  });
  it("uses the verified business contacts", () => {
    expect(site.founderEmail).toBe("jacob@bevierstrategic.com");
    expect(site.phone).toBe("(404) 618-2346");
    expect(site.phoneHref).toBe("tel:+14046182346");
    expect(source("components/marketing/Footer.tsx")).toContain("<BusinessContact />");
    expect(source("app/(marketing)/contact/page.tsx")).toContain("<BusinessContact />");
  });
});
