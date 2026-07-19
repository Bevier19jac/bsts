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
      "Bachelor of Science in Cybersecurity, Magna Cum Laude",
    );
    expect(founderSource).toContain("CompTIA Security+");
    expect(founderSource).toContain("AWS Certified AI Practitioner");
  });

  it("labels the Solara House demonstration as not a client case study", () => {
    const solaraSource = readFileSync(join(root, "lib/content/solara.ts"), "utf8");
    expect(solaraSource).toContain(
      "CONCEPT DEMONSTRATION — NOT A CLIENT CASE STUDY",
    );
  });
});
