import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Claims audit as an executable test. The claims policy prohibits certain
 * certification/endorsement language anywhere in shipped source. Allowed
 * exceptions are the explicit "we never say" educations on the security page
 * and founder principles, which quote the prohibited phrases to disavow them.
 */

const PROHIBITED = [
  "nist certified",
  "nist-certified",
  "soc 2 certified",
  "soc 2 compliant",
  "soc 2-certified",
  "iso certified",
  "iso-certified",
  "official partner",
  "government approved",
  "government-approved",
  "guaranteed secure",
  "graduate-level completion",
  "graduate-level coursework",
  // SDVOSB language: no certified designation before SBA VetCert issuance,
  // and no "in progress" phrasing before the application is actually filed.
  // Public wording derives from vetCertStatus in src/lib/site.ts only.
  "sdvosb certified",
  "sdvosb-certified",
  "certified sdvosb",
  "sdvosb certification in progress",
  "certification in progress",
  // Absolute delivery-time claims are replaced by qualified language.
  "weeks, not quarters",
  "weeks — not quarters",
  // Degree wording: the verified credential is "Bachelor of Science in
  // Computer Science with a Cybersecurity major" — never the shorthand.
  "bachelor of science in cybersecurity,",
  // Federal claims that must never appear anywhere.
  "guaranteed award",
  "preferred government vendor",
  "prequalified",
  "sole-source provider",
  "cleared company",
  "contract-ready",
  "fedramp certified",
  "fedramp-certified",
  "fedramp authorized",
  "cmmc certified",
  "cmmc-certified",
];

/**
 * Phrases allowed ONLY inside src/lib/site.ts (the certified-state config
 * branch). Anywhere else they would hard-code certification status.
 */
const PROHIBITED_OUTSIDE_CONFIG = [
  "sba-certified",
  "sba certified",
  "vetcert certified",
  "vetcert-certified",
  "eligible for sdvosb set-aside",
];

/** Lines that quote prohibited phrases in order to disavow them. */
const DISAVOWAL_MARKERS = [
  "never say",
  "we do not make it",
  "not currently",
  "prohibited",
  "do not use",
  // The SOC 2 readiness article quotes misused phrases to correct them:
  "no such thing",
  "actual status",
];

function collectSourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      collectSourceFiles(full, acc);
    } else if (/\.(tsx?|md)$/.test(entry) && !full.includes("/test/")) {
      acc.push(full);
    }
  }
  return acc;
}

describe("claims audit", () => {
  const root = join(__dirname, "..");
  const files = collectSourceFiles(root);

  it("finds source files to audit", () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it("contains no prohibited certification or endorsement claims", () => {
    const violations: string[] = [];
    for (const file of files) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, idx) => {
        const lower = line.toLowerCase();
        for (const phrase of PROHIBITED) {
          if (!lower.includes(phrase)) continue;
          const context = lines
            .slice(Math.max(0, idx - 2), idx + 3)
            .join(" ")
            .toLowerCase();
          const disavowed = DISAVOWAL_MARKERS.some((m) => context.includes(m));
          if (!disavowed) {
            violations.push(`${file}:${idx + 1} — "${phrase}"`);
          }
        }
      });
    }
    expect(violations).toEqual([]);
  });

  it("uses the exact mandated founder credential wording", () => {
    const founderSource = readFileSync(
      join(root, "lib/content/founder.ts"),
      "utf8",
    );
    expect(founderSource).toContain("Master of Science in Artificial Intelligence");
    expect(founderSource).toContain(
      "Bachelor of Science in Computer Science with a Cybersecurity major, Magna Cum Laude",
    );
    expect(founderSource).toContain("CompTIA Security+");
    expect(founderSource).toContain("AWS Certified AI Practitioner");
  });

  it("keeps certified-state wording confined to the site.ts config branch", () => {
    const offenders: string[] = [];
    for (const file of files) {
      if (file.endsWith("lib/site.ts")) continue;
      const text = readFileSync(file, "utf8").toLowerCase();
      for (const phrase of PROHIBITED_OUTSIDE_CONFIG) {
        if (text.includes(phrase)) offenders.push(`${file} — "${phrase}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("shows no public placeholder identifiers", () => {
    // Word-bounded so code comments explaining the rule don't trip it, but
    // any rendered string value would.
    const placeholders = [/["'>]\s*tbd\s*["'<]/, /\[insert/, /xxxxx/, /000000/, /coming soon/];
    const offenders: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, "utf8").toLowerCase();
      for (const p of placeholders) {
        if (p.test(text)) offenders.push(`${file} — ${p}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("keeps SDVOSB / VetCert public wording centralized in site.ts", () => {
    // Outside site.ts (the single source of truth) and this test, source
    // files must not hand-roll SDVOSB status wording.
    const offenders = files.filter((f) => {
      if (f.endsWith("lib/site.ts")) return false;
      const text = readFileSync(f, "utf8").toLowerCase();
      return (
        text.includes("vetcert application") ||
        text.includes("sdvosb certification will be pursued") ||
        text.includes("sba vetcert certified")
      );
    });
    expect(offenders).toEqual([]);
  });

  it("labels the Solara House demonstration as not a client case study", () => {
    const solaraSource = readFileSync(join(root, "lib/content/solara.ts"), "utf8");
    expect(solaraSource).toContain(
      "CONCEPT DEMONSTRATION — NOT A CLIENT CASE STUDY",
    );
  });
});
