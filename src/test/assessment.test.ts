import { describe, expect, it } from "vitest";
import {
  assessmentSchema,
  formatSummary,
  preliminaryRead,
  steps,
  type AssessmentData,
} from "@/lib/assessment";

const validData: AssessmentData = {
  name: "Avery Example",
  email: "avery@example.com",
  organization: "Example Logistics Co.",
  industry: "Transportation & logistics",
  website: "example.com",
  problem:
    "Jobs are re-keyed across three systems and dispatch details live in one spreadsheet.",
  systems: "CRM, accounting platform, dispatch spreadsheet, shared inbox",
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
    expect(summary).toContain("Example Logistics Co.");
    expect(summary).toContain("Transportation & logistics");
    expect(summary).toContain("Within 3 months");
    expect(summary).toContain(validData.problem);
  });

  it("renders a dash for a blank website", () => {
    expect(formatSummary({ ...validData, website: "" })).toContain("Website: —");
  });
});

describe("preliminaryRead", () => {
  it("identifies integration as the opportunity for re-keying answers", () => {
    const read = preliminaryRead(validData);
    expect(read.opportunity).toMatch(/Integration/);
    expect(read.path).toMatch(/Assessment/);
    expect(read.nextStep.length).toBeGreaterThan(10);
  });

  it("flags security when compliance pressure appears", () => {
    const read = preliminaryRead({
      ...validData,
      problem:
        "We face a compliance audit and our access reviews are handled from memory across tools.",
      systems: "Ticketing system, HR platform, audit evidence folder",
      outcome: "Pass the audit with a written security baseline.",
    });
    expect(read.consideration).toMatch(/boundaries|compliance/i);
  });

  it("suggests a larger path when budget and timeline support it", () => {
    const read = preliminaryRead({
      ...validData,
      budget: "$75k+",
      timeline: "As soon as practical",
    });
    expect(read.path).toMatch(/Transformation/);
  });

  it("falls back to clarity-first when no signal is present", () => {
    const read = preliminaryRead({
      ...validData,
      problem: "Things feel slower than they should be lately overall.",
      systems: "A few tools we can list on a call together.",
      outcome: "General improvement across the board this year.",
    });
    expect(read.opportunity).toMatch(/Clarity first/);
  });
});
