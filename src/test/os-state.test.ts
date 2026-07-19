import { describe, expect, it } from "vitest";
import { createSeedState } from "@/lib/os/seed";
import { osStateSchema } from "@/lib/os/types";

describe("BSTS OS seed state", () => {
  it("validates against the OS state schema (import round-trip safe)", () => {
    const seed = createSeedState();
    const roundTripped = JSON.parse(JSON.stringify(seed));
    expect(osStateSchema.safeParse(roundTripped).success).toBe(true);
  });

  it("has globally unique ids across every collection", () => {
    const seed = createSeedState();
    const ids = [
      ...seed.prospects,
      ...seed.clients,
      ...seed.assessments,
      ...seed.roadmapItems,
      ...seed.projects,
      ...seed.risks,
      ...seed.automations,
      ...seed.documents,
      ...seed.decisions,
      ...seed.assessments.flatMap((a) => a.findings),
      ...seed.projects.flatMap((p) => p.tasks),
    ].map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps referential integrity: roadmap items and projects point at real clients", () => {
    const seed = createSeedState();
    const clientIds = new Set(seed.clients.map((c) => c.id));
    for (const item of seed.roadmapItems) {
      expect(clientIds.has(item.clientId)).toBe(true);
    }
    for (const project of seed.projects) {
      expect(clientIds.has(project.clientId)).toBe(true);
    }
    const subjectIds = new Set([
      ...seed.prospects.map((p) => p.id),
      ...seed.clients.map((c) => c.id),
    ]);
    for (const assessment of seed.assessments) {
      expect(subjectIds.has(assessment.subjectId)).toBe(true);
    }
  });

  it("labels every person and company as fictional (no real PII)", () => {
    const seed = createSeedState();
    for (const p of seed.prospects) {
      expect(p.name.toLowerCase()).toContain("fictional");
      expect(p.contactName.toLowerCase()).toContain("fictional");
    }
    for (const c of seed.clients) {
      expect(c.name.toLowerCase()).toContain("fictional");
    }
  });

  it("rejects malformed imports with a schema error", () => {
    expect(osStateSchema.safeParse({ kind: "something-else" }).success).toBe(false);
    const seed = createSeedState();
    const tampered = {
      ...seed,
      projects: [
        { ...seed.projects[0], status: "Definitely Not A Status" },
        ...seed.projects.slice(1),
      ],
    };
    expect(osStateSchema.safeParse(tampered).success).toBe(false);
  });

  it("rejects a file with the wrong version marker", () => {
    const seed = { ...createSeedState(), version: 2 };
    expect(osStateSchema.safeParse(seed).success).toBe(false);
  });
});
