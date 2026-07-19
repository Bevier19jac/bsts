import { describe, expect, it } from "vitest";
import {
  assessmentSchema,
  formatSummary,
  steps,
  type AssessmentData,
} from "@/lib/assessment";

const validData: AssessmentData = {
  name: "Avery Example",
  email: "avery@example.com",
  organization: "Example House",
  industry: "Boutique hospitality",
  website: "example.com",
  problem:
    "Reservations are re-keyed across three systems and preferences live in one spreadsheet.",
  systems: "PMS, POS, booking engine, spreadsheets",
  outcome: "One record entered once, flowing everywhere it is needed.",
  timeline: "Within 3 months",
  budget: "Prefer not to say yet",
  consent: true,
};

describe("assessment schema", () => {
  it("accepts a complete, valid submission", () => {
    expect(assessmentSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects an invalid email with a helpful message", () => {
    const result = assessmentSchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "email")).toBe(true);
    }
  });

  it("requires consent to be literally true", () => {
    const result = assessmentSchema.safeParse({ ...validData, consent: false });
    expect(result.success).toBe(false);
  });

  it("allows the website to be blank but rejects garbage", () => {
    expect(assessmentSchema.safeParse({ ...validData, website: "" }).success).toBe(true);
    expect(
      assessmentSchema.safeParse({ ...validData, website: "not a url at all" }).success,
    ).toBe(false);
  });

  it("rejects a too-short problem statement", () => {
    const result = assessmentSchema.safeParse({ ...validData, problem: "help" });
    expect(result.success).toBe(false);
  });
});

describe("assessment steps", () => {
  it("covers every schema field exactly once across steps", () => {
    const allFields = steps.flatMap((s) => s.fields).sort();
    const schemaFields = Object.keys(assessmentSchema.shape).sort();
    expect(allFields).toEqual(schemaFields);
  });
});

describe("formatSummary", () => {
  it("includes every answer in the plain-text summary", () => {
    const summary = formatSummary(validData);
    expect(summary).toContain("Avery Example");
    expect(summary).toContain("avery@example.com");
    expect(summary).toContain("Example House");
    expect(summary).toContain("Boutique hospitality");
    expect(summary).toContain("Within 3 months");
    expect(summary).toContain(validData.problem);
  });

  it("renders a dash for a blank website", () => {
    expect(formatSummary({ ...validData, website: "" })).toContain("Website: —");
  });
});
