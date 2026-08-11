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
  // Experience wording: only the approved 16-year statement is permitted.
  "17+ years",
  "17 years",
  "federal experience as a civilian",
  // Federal claims that must never appear anywhere.
  "guaranteed award",
  "guaranteed delivery",
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
  // SOC 2 attestation boundary: BSTS prepares, a CPA firm examines and
  // issues the report. Nothing may suggest BSTS performs or signs it.
  "we issue soc 2",
  "we perform the soc 2",
  "our soc 2 audit",
  "bsts audits",
  "bsts will audit",
  "soc 2 auditor",
  "we are your auditor",
  "soc 2 attestation services",
  "issue your soc 2",
  "we certify",
  "bsts certifies",
  // AI governance: alignment is not certification or accreditation.
  "nist ai rmf certified",
  "ai rmf certified",
  "iso 27001 certified",
  "hipaa certified",
  "hipaa compliant",
  "gdpr certified",
  // Federal innovation programs: no award exists.
  "sbir award",
  "sbir-funded",
  "sbir funded",
  "awarded sbir",
  "sttr award",
  "our sbir",
  "phase i award",
  // The continuous assurance platform does not exist yet.
  "our platform monitors",
  "our platform automatically",
  "our saas platform",
  "the bsts platform provides",
  "bsts platform continuously",
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
    expect(founderSource).toContain(
      "More than 16 years serving federal missions through military leadership and civilian cybersecurity work.",
    );
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

/* ------------------------------------------------------------------ */
/* Repositioning guards — SOC 2 boundary, AI governance, R&D, platform */
/* ------------------------------------------------------------------ */

describe("SOC 2 attestation boundary", () => {
  const root = join(__dirname, "..");

  it("states the CPA-firm boundary in the canonical wording", () => {
    const src = readFileSync(join(root, "lib/content/positioning.ts"), "utf8");
    expect(src).toContain(
      "SOC 2 examinations and attestation reports are performed by qualified independent CPA firms",
    );
    expect(src).toContain("BSTS does not issue SOC 2 reports");
  });

  it("carries the boundary in the global framework disclaimer", () => {
    const siteSrc = readFileSync(join(root, "lib/site.ts"), "utf8");
    expect(siteSrc).toContain("BSTS does not issue SOC 2 reports");
  });

  /**
   * Any page that markets SOC 2 work must also render the boundary. The
   * boundary is centralized as `soc2Boundary`, so importing it is the
   * accepted way to satisfy this — a page may not describe SOC 2 services
   * while staying silent about who actually performs the examination.
   */
  it("shows the boundary on every page that markets SOC 2 work", () => {
    const pageFiles = collectSourceFiles(join(root, "app")).filter((f) =>
      f.endsWith("page.tsx"),
    );
    const offenders: string[] = [];
    for (const file of pageFiles) {
      const text = readFileSync(file, "utf8");
      const marketsSoc2 =
        /SOC 2 (readiness|preparation|&|and) /i.test(text) ||
        text.includes("soc2-readiness");
      if (!marketsSoc2) continue;
      const showsBoundary =
        text.includes("soc2Boundary") ||
        text.includes("frameworkDisclaimer") ||
        text.includes("does not issue SOC 2 reports");
      if (!showsBoundary) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });
});

describe("framework references never imply certification", () => {
  const root = join(__dirname, "..");

  it("describes frameworks as readiness/mapping/alignment work only", () => {
    const src = readFileSync(join(root, "lib/content/positioning.ts"), "utf8");
    expect(src).toContain(
      "BSTS is not an accreditation body, a certification body, or an audit firm",
    );
    // Every framework entry must be qualified with support-style language.
    const allowed =
      /readiness|mapping|alignment|implementation support|preparation|support/i;
    const block = src.slice(
      src.indexOf("frameworks: ["),
      src.indexOf("disclaimer:", src.indexOf("frameworks: [")),
    );
    const notes = [...block.matchAll(/note:\s*"([^"]+)"/g)].map((m) => m[1]);
    expect(notes.length).toBeGreaterThan(5);
    for (const n of notes) expect(n).toMatch(allowed);
  });
});

describe("federal R&D direction claims no award", () => {
  const root = join(__dirname, "..");

  it("explicitly disclaims any SBIR/STTR award or program participation", () => {
    const src = readFileSync(join(root, "lib/content/positioning.ts"), "utf8");
    expect(src).toContain("has not received an SBIR or STTR award");
    expect(src).toContain("no federal agency has reviewed or endorsed");
  });
});

describe("continuous assurance platform is a direction, not a product", () => {
  const root = join(__dirname, "..");

  it("states plainly that the platform is not available today", () => {
    const src = readFileSync(join(root, "lib/content/positioning.ts"), "utf8");
    expect(src).toContain("not a product available today");
  });

  it("renders the not-yet-available note on the assurance page", () => {
    const page = readFileSync(
      join(root, "app/(marketing)/assurance/page.tsx"),
      "utf8",
    );
    expect(page).toContain("assuranceRoadmapNote");
  });
});

describe("positioning integrity", () => {
  const root = join(__dirname, "..");

  it("keeps exactly three primary service areas", () => {
    const src = readFileSync(join(root, "lib/content/positioning.ts"), "utf8");
    // Scope to the serviceAreas array — trigger entries carry a `slug` too,
    // pointing at the area each one maps to.
    const start = src.indexOf("export const serviceAreas");
    const end = src.indexOf("export const soc2Boundary");
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    const block = src.slice(start, end);
    const slugs = [...block.matchAll(/^\s{4}slug: "([a-z0-9-]+)",$/gm)].map(
      (m) => m[1],
    );
    expect(slugs).toEqual([
      "secure-ai-automation",
      "ai-governance",
      "soc2-readiness",
    ]);
  });

  it("keeps the four-stage engagement model intact", () => {
    const src = readFileSync(join(root, "lib/content/positioning.ts"), "utf8");
    const keys = [...src.matchAll(/^\s{4}key: "([a-z]+)",$/gm)].map((m) => m[1]);
    expect(keys).toEqual(["discover", "implement", "govern", "assure"]);
  });

  it("preserves the Abrams firing sequence as brand identity", () => {
    const src = readFileSync(join(root, "lib/content/positioning.ts"), "utf8");
    for (const stage of [
      "M1 Abrams",
      "Main-gun firing",
      "Sabot separation",
      "Tracer to target",
    ]) {
      expect(src).toContain(stage);
    }
    for (const meaning of [
      "Disciplined system",
      "Precise action",
      "Controlled delivery",
      "Measurable effect",
    ]) {
      expect(src).toContain(meaning);
    }
  });
});
