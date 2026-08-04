import { describe, expect, it } from "vitest";
import {
  acquisition,
  vetCert,
  vetCertStatus,
  visibleAcquisitionFields,
} from "@/lib/site";
import {
  federalInquirySchema,
  formatFederalInquiry,
} from "@/components/government/FederalContactForm";

describe("VetCert status → public language mapping", () => {
  it("uses a valid configured status", () => {
    expect(["planned", "submitted", "certified"]).toContain(vetCertStatus);
  });

  it("never uses certified wording unless the status is certified", () => {
    const wording = `${vetCert.badge} ${vetCert.heading} ${vetCert.explanation}`.toLowerCase();
    if (vetCertStatus !== "certified") {
      expect(wording).not.toContain("certified small business");
      expect(wording).not.toContain("sba-certified");
      expect(wording).not.toMatch(/\bsdvosb\b(?! certification will be pursued)/);
      expect(wording).toContain("veteran-owned and led");
    }
  });

  it("maps each status to the mandated public phrasing", () => {
    if (vetCertStatus === "planned") {
      expect(vetCert.badge).toBe(
        "Service-disabled veteran-owned and led · SBA VetCert application planned",
      );
    }
    if (vetCertStatus === "submitted") {
      expect(vetCert.badge).toContain("application pending");
    }
    if (vetCertStatus === "certified") {
      expect(vetCert.badge).toBe(
        "SBA-certified Service-Disabled Veteran-Owned Small Business",
      );
    }
  });
});

describe("acquisition profile hides unissued fields", () => {
  it("filters empty values out of the public list", () => {
    const visible = visibleAcquisitionFields();
    expect(visible.every((f) => f.value.trim() !== "")).toBe(true);
    // Unissued identifiers stay hidden until real values are configured.
    const labels = visible.map((f) => f.label);
    for (const f of acquisition.fields) {
      if (f.value.trim() === "") {
        expect(labels).not.toContain(f.label);
      }
    }
  });

  it("contains no placeholder-looking values", () => {
    for (const f of visibleAcquisitionFields()) {
      expect(f.value.toLowerCase()).not.toMatch(/tbd|insert|pending|xxxx|000000/);
    }
  });
});

describe("federal inquiry form", () => {
  const valid = {
    name: "Pat Example",
    email: "pat@example.gov",
    organization: "Example Agency",
    orgType: "Federal agency" as const,
    opportunityType: "Capability briefing" as const,
    dueDate: "",
    description:
      "Market research for workflow automation supporting an unclassified administrative process.",
    nextStep: "Schedule a capability briefing" as const,
  };

  it("accepts a valid inquiry", () => {
    expect(federalInquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a missing organization type", () => {
    expect(
      federalInquirySchema.safeParse({ ...valid, orgType: "" }).success,
    ).toBe(false);
  });

  it("rejects a too-short description", () => {
    expect(
      federalInquirySchema.safeParse({ ...valid, description: "short" }).success,
    ).toBe(false);
  });

  it("formats every answer into the summary", () => {
    const s = formatFederalInquiry(valid);
    expect(s).toContain("Pat Example");
    expect(s).toContain("Example Agency");
    expect(s).toContain("Capability briefing");
    expect(s).toContain("Schedule a capability briefing");
  });
});
