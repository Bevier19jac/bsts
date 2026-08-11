import { describe, expect, it } from "vitest";
import {
  acquisition,
  federalContactDisplay,
  federalContactEmail,
  formationStatus,
  site,
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
    const wording =
      `${vetCert.badge} ${vetCert.heading} ${vetCert.short} ${vetCert.explanation}`.toLowerCase();
    if (vetCertStatus !== "certified") {
      expect(wording).not.toContain("certified small business");
      expect(wording).not.toContain("sba-certified");
      expect(wording).not.toMatch(/\bsdvosb\b(?! certification will be pursued)/);
      // Approved ownership wording — veteran-owned AND operated.
      expect(wording).toContain("veteran-owned & operated");
      expect(wording).toContain("veteran-owned and operated");
    }
  });

  it("never claims the application is filed before it is", () => {
    // "in process" / "in progress" both imply a filing exists. Only the
    // "submitted" and "certified" states may imply an active application.
    const wording =
      `${vetCert.badge} ${vetCert.short} ${vetCert.explanation}`.toLowerCase();
    if (vetCertStatus === "planned") {
      expect(wording).not.toMatch(/in process|in progress|pending|submitted|under review/);
      expect(wording).toContain("planned");
    }
  });

  it("maps each status to the mandated public phrasing", () => {
    if (vetCertStatus === "planned") {
      expect(vetCert.badge).toBe(
        "Service-Disabled Veteran-Owned & Operated · SBA VetCert application planned",
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

  it("exposes a short ownership label for compact surfaces", () => {
    expect(vetCert.short.length).toBeGreaterThan(10);
    // The short label must never carry certification status wording unless
    // the certificate is actually in hand.
    if (vetCertStatus !== "certified") {
      expect(vetCert.short.toLowerCase()).not.toContain("certified");
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

describe("formation status → public labeling", () => {
  it("uses a valid configured status", () => {
    expect(["pre_formation", "formed"]).toContain(formationStatus);
  });

  it("labels the company correctly for the current status", () => {
    const nameField = acquisition.fields[0];
    if (formationStatus === "pre_formation") {
      expect(nameField.label).toBe("Company name");
      expect(nameField.value).toBe(site.name);
      // No LLC claim and no legal-entity label before the filing is approved.
      expect(nameField.value).not.toMatch(/\bLLC\b/i);
      for (const f of visibleAcquisitionFields()) {
        expect(f.label).not.toBe("Legal business name");
        expect(f.value).not.toMatch(/\bLLC\b/i);
      }
      expect(acquisition.statusLine.length).toBeGreaterThan(10);
    } else {
      expect(nameField.label).toBe("Legal business name");
      expect(nameField.value).toBe(site.legalName);
    }
  });
});

describe("federal contact display", () => {
  it("never prints the personal address when no federal email is configured", () => {
    if (!federalContactEmail) {
      expect(federalContactDisplay).toBe(
        `${site.url.replace("https://", "")}/government`,
      );
      const contact = visibleAcquisitionFields().find((f) => f.label === "Contact");
      expect(contact?.value).toBe(federalContactDisplay);
      expect(contact?.value).not.toContain("@gmail.com");
    } else {
      expect(federalContactDisplay).toBe(federalContactEmail);
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
