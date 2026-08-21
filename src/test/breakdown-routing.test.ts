import { describe, expect, it } from "vitest";
import {
  route,
  summarize,
  visibleQuestions,
  CONDITION_TITLE,
  CONDITION_BODY,
  type Answers,
} from "@/lib/breakdown";

/**
 * Regression suite for the public Bevier Breakdown routing engine.
 *
 * These exist because a live route produced "Ready for secure automation"
 * for a respondent who identified no collaboration platform and no business
 * system. The engine had zero test coverage at the time. Every scenario
 * below is a real answer set, not a synthetic unit fixture.
 *
 * The invariant that must never regress: automation candidacy requires an
 * identified system. Self-reported, unvalidated — but identified.
 */

const A = {
  noFoundation: {
    org: "field_service",
    goal: "reduce_manual_work",
    pain: "delay",
    base: "neither",
    platforms: ["none"],
    ai: "none",
    data: ["internal"],
    driver: ["none"],
  },
  systemsAndIntegrationPain: {
    org: "tech_services",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "accounting"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "pii"],
    driver: ["none"],
  },
  foundationUnknown: {
    org: "professional_services",
    goal: "not_sure",
    pain: "fragmentation",
    base: "not_sure",
    platforms: ["not_sure"],
    ai: "not_sure",
    data: ["internal"],
    driver: ["none"],
  },
  shadowAi: {
    org: "professional_services",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "google",
    platforms: ["crm", "accounting"],
    connected: "siloed",
    ai: "informal",
    accounts: "personal",
    rules: "none",
    data: ["pii", "financial"],
    driver: ["none"],
  },
  formalRequirement: {
    org: "tech_services",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "accounting"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "pii"],
    driver: ["questionnaire"],
  },
  fci: {
    org: "government_contractor",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "projects"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "fci"],
    driver: ["none"],
  },
  cui: {
    org: "government_contractor",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "projects"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "cui"],
    driver: ["none"],
  },
  incidentNoAi: {
    org: "field_service",
    goal: "reduce_risk",
    pain: "risk_errors",
    base: "m365",
    platforms: ["field"],
    connected: "siloed",
    ai: "none",
    data: ["internal"],
    driver: ["incident"],
  },
  incidentWithShadowAi: {
    org: "professional_services",
    goal: "reduce_risk",
    pain: "risk_errors",
    base: "google",
    platforms: ["crm"],
    connected: "siloed",
    ai: "informal",
    accounts: "personal",
    rules: "none",
    data: ["internal", "pii"],
    driver: ["incident"],
  },
  paymentCardNoDeadline: {
    org: "tech_services",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "accounting"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "payment_card"],
    driver: ["none"],
  },
  healthInfoNoDeadline: {
    org: "regulated_practice",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "m365",
    platforms: ["crm"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "phi"],
    driver: ["none"],
  },
  fciNoDeadline: {
    org: "government_contractor",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "projects"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "fci"],
    driver: ["none"],
  },
  cuiNoDeadline: {
    org: "government_contractor",
    goal: "reduce_manual_work",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "projects"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "cui"],
    driver: ["none"],
  },
  questionnaireNoSensitiveInfo: {
    org: "tech_services",
    goal: "meet_requirement",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "accounting"],
    connected: "siloed",
    ai: "none",
    data: ["internal"],
    driver: ["questionnaire"],
  },
  incidentWithCuiAndQuestionnaire: {
    org: "government_contractor",
    goal: "meet_requirement",
    pain: "repetition",
    base: "m365",
    platforms: ["crm", "projects"],
    connected: "siloed",
    ai: "none",
    data: ["internal", "cui"],
    driver: ["incident", "questionnaire"],
  },
} satisfies Record<string, Answers>;

const text = (r: ReturnType<typeof route>) =>
  [r.title, r.body, r.why, ...r.gaps, ...r.moves, r.engagement].join(" \n ");

describe("Scenario A — no technical foundation identified", () => {
  const r = route(A.noFoundation);

  it("classifies the foundation as absent, not present", () => {
    expect(r.foundationState).toBe("absent_or_unidentified");
  });

  it("does not route to automation readiness", () => {
    expect(r.primary).not.toBe("C3");
    expect(r.eligible).not.toContain("C3");
  });

  it("never says ready for secure automation or foundation to build on", () => {
    expect(text(r)).not.toMatch(/ready for secure automation/i);
    expect(text(r)).not.toMatch(/foundation to build on/i);
  });

  it("never claims nothing is blocking", () => {
    expect(text(r)).not.toMatch(/nothing blocking/i);
  });

  it("names the missing platform and the missing system of record", () => {
    const gaps = r.gaps.join(" ").toLowerCase();
    expect(gaps).toContain("no primary collaboration or document platform identified");
    expect(gaps).toContain("no business system or system of record identified");
  });

  it("recommends mapping the process before anything is automated", () => {
    expect(r.moves.join(" ")).toMatch(/map the process from trigger to completion/i);
    expect(r.engagement).toMatch(/should not be recommended until/i);
  });

  it("gives a reason distinct from the blocker list", () => {
    expect(r.why).not.toBe(r.gaps[0]);
    expect(r.why.length).toBeGreaterThan(40);
  });
});

describe("Scenario B — existing systems and integration pain", () => {
  const r = route(A.systemsAndIntegrationPain);

  it("identifies a foundation without claiming it is verified", () => {
    expect(r.foundationState).toBe("present_unvalidated");
  });

  it("routes to an automation or integration condition", () => {
    expect(["C2", "C3"]).toContain(r.primary);
  });

  it("describes the sprint only as a candidate subject to validation", () => {
    const all = text(r);
    if (/sprint/i.test(all)) {
      expect(all).toMatch(/candidate next step, subject to validation/i);
    }
    expect(all).not.toMatch(/implementation[- ]ready|verified/i);
  });

  it("carries the reported platforms forward", () => {
    expect(r.platforms.join(", ")).toMatch(/CRM/i);
  });
});

describe("Scenario C — foundation unknown", () => {
  const r = route(A.foundationUnknown);

  it("treats not sure as unknown, never as none", () => {
    expect(r.foundationState).toBe("unknown");
    expect(r.foundationState).not.toBe("absent_or_unidentified");
  });

  it("asks for an inventory rather than declaring readiness or absence", () => {
    expect(r.title).toBe("Establish what is currently in place");
    expect(r.moves.join(" ")).toMatch(/systems inventory/i);
    expect(text(r)).not.toMatch(/ready for secure automation/i);
  });

  it("does not assert that no systems exist", () => {
    expect(r.gaps.join(" ")).not.toMatch(/no business system or system of record identified/i);
  });
});

describe("Scenario D — shadow AI governance override", () => {
  const r = route(A.shadowAi);

  it("puts AI governance ahead of the automation opportunity", () => {
    expect(r.primary).toBe("C4");
  });

  it("still surfaces the automation or integration opportunity behind it", () => {
    expect(r.eligible.length).toBeGreaterThan(1);
  });

  it("recommends a named owner and interim guidance", () => {
    expect(r.moves.join(" ")).toMatch(/name one accountable owner/i);
  });

  it("makes no legal or compliance determination", () => {
    expect(text(r)).not.toMatch(/you are (non-)?compliant|violat|illegal|required by law/i);
  });
});

describe("Scenario E — formal requirement override", () => {
  const r = route(A.formalRequirement);

  it("puts the external requirement ahead of generic automation", () => {
    expect(r.primary).toBe("C5");
  });

  it("says the actual requirement must be read first", () => {
    expect(r.moves.join(" ")).toMatch(/get the actual requirement in front of someone/i);
  });

  it("claims no compliance", () => {
    expect(text(r)).not.toMatch(/we are compliant|you are compliant|certified/i);
  });
});

describe("Scenario F — federal and controlled information", () => {
  const fci = route(A.fci);
  const cui = route(A.cui);

  it("outranks generic automation for FCI", () => {
    expect(fci.primary).toBe("C5");
  });

  it("treats CUI as more than ordinary internal information", () => {
    expect(cui.overlay).toBe("controlled");
    expect(route({ ...A.cui, data: ["internal"] }).overlay).not.toBe("controlled");
  });

  it("routes CUI to formal discovery and scoping, not a priced sprint", () => {
    expect(cui.engagement).toMatch(/formal discovery and information-handling scoping/i);
    expect(cui.priceLine).not.toMatch(/\$5,000/);
    expect(cui.priceLine).toBe("");
  });

  it("does not decide that any framework legally applies", () => {
    for (const r of [fci, cui]) {
      expect(text(r)).not.toMatch(/CMMC (applies|is required)|800-171 (applies|is required)/i);
    }
  });
});

describe("Scenario G — incident override reachable without AI", () => {
  const r = route(A.incidentNoAi);

  it("is eligible and primary on C4 even though no AI is in use", () => {
    expect(r.eligible).toContain("C4");
    expect(r.primary).toBe("C4");
  });

  it("uses the incident-specific heading, not the AI heading", () => {
    expect(r.title).toBe("Address what happened before adding new capability");
  });

  it("makes no claim that AI is in use", () => {
    expect(text(r)).not.toMatch(/AI is moving faster|AI already touching|AI already in your business/i);
    expect(text(r)).not.toMatch(/\bAI\b/);
  });

  it("makes no affirmative claim of breach, legal violation, or a compliance requirement", () => {
    const t = text(r);
    // The result may name these categories only to disclaim them, never to
    // assert them.
    expect(t).not.toMatch(
      /this (is|was) a breach|constitutes a (breach|violation)|you (are|were) in violation|required by law to report|must report this|is illegal|was illegal/i,
    );
    expect(t).toMatch(
      /not a determination that an incident remains active, that a breach or legal violation occurred, or that reporting is required/i,
    );
  });

  it("stays status-neutral — never assumes the event is unresolved, uncontained, or undocumented", () => {
    const t = text(r);
    expect(t).not.toMatch(/\bunresolved\b/i);
    expect(t).not.toMatch(/not yet (been )?contained/i);
    expect(t).not.toMatch(/not yet (been )?documented/i);
  });

  it("leads with confirming current status as the first move, not an assumption of active harm", () => {
    expect(r.moves[0]).toMatch(/confirm the current status, impact, containment, and documentation/i);
  });

  it("is not presented as a named incident-response service", () => {
    expect(r.service).toBe("Determined in discovery");
    expect(text(r)).not.toMatch(/incident response|recovery scoping|forensics|breach coaching/i);
  });

  it("does not invite incident detail through the form", () => {
    expect(r.engagement).toMatch(/do not submit incident details or sensitive information through this form/i);
  });

  it("shows no automatic price", () => {
    expect(r.priceLine).toBe("");
  });
});

describe("Scenario H — incident with shadow AI", () => {
  const r = route(A.incidentWithShadowAi);

  it("lets the incident lead over the AI-governance concern", () => {
    expect(r.primary).toBe("C4");
    expect(r.title).toBe("Address what happened before adding new capability");
    expect(r.moves[0]).toMatch(/confirm the current status, impact, containment, and documentation/i);
  });

  it("keeps the AI-governance concern visible behind it", () => {
    expect(r.gaps.join(" ")).toMatch(/personal accounts/i);
    expect(r.gaps.join(" ")).toMatch(/no written rules for AI use/i);
    expect(r.moves.join(" ")).toMatch(/name one accountable owner/i);
  });

  it("does not let generic automation lead", () => {
    expect(r.primary).not.toBe("C3");
  });
});

describe("Scenario I — payment-card information without a deadline", () => {
  const r = route(A.paymentCardNoDeadline);

  it("routes to the sensitive-data-only result, not the requirement result", () => {
    expect(r.primary).toBe("C5");
    expect(r.title).toBe("Sensitive or contract-controlled information changes the next step");
  });

  it("never uses external-clock or 'outside your business' language", () => {
    expect(text(r)).not.toMatch(/someone else's clock|outside your business is asking/i);
  });

  it("routes to formal discovery and information-handling scoping, not a priced sprint", () => {
    expect(r.engagement).toMatch(/formal discovery and information-handling scoping/i);
    expect(r.priceLine).toBe("");
  });

  it("does not declare that PCI DSS applies", () => {
    expect(text(r)).not.toMatch(/PCI DSS (applies|is required)/i);
  });

  it("softens the handling-obligation claim to 'may introduce', not a definite claim", () => {
    expect(r.gaps.join(" ")).toMatch(/payment-card information may introduce specific handling requirements/i);
  });
});

describe("Scenario J — health information without a deadline", () => {
  const r = route(A.healthInfoNoDeadline);

  it("routes to the sensitive-data-only result", () => {
    expect(r.primary).toBe("C5");
    expect(r.title).toBe("Sensitive or contract-controlled information changes the next step");
  });

  it("never uses external-clock language", () => {
    expect(text(r)).not.toMatch(/someone else's clock|outside your business is asking/i);
  });

  it("does not declare that HIPAA applies", () => {
    expect(text(r)).not.toMatch(/HIPAA (applies|is required)/i);
  });

  it("does not auto-recommend or price a sprint", () => {
    expect(text(r)).not.toMatch(/\$5,000/);
    expect(r.priceLine).toBe("");
  });

  it("softens the handling-obligation claim to 'may introduce', not a definite claim", () => {
    expect(r.gaps.join(" ")).toMatch(/health information may introduce specific handling obligations/i);
  });
});

describe("Scenario K — Federal Contract Information without a deadline", () => {
  const r = route(A.fciNoDeadline);

  it("routes to the sensitive-data-only result", () => {
    expect(r.primary).toBe("C5");
    expect(r.title).toBe("Sensitive or contract-controlled information changes the next step");
  });

  it("never uses external-clock language", () => {
    expect(text(r)).not.toMatch(/someone else's clock|outside your business is asking/i);
  });

  it("does not declare that CMMC or NIST SP 800-171 applies", () => {
    expect(text(r)).not.toMatch(/CMMC (applies|is required)|800-171 (applies|is required)/i);
  });

  it("does not auto-recommend or price a sprint", () => {
    expect(r.priceLine).toBe("");
  });
});

describe("Scenario L — Controlled Unclassified Information without a deadline", () => {
  const r = route(A.cuiNoDeadline);

  it("routes to the sensitive-data-only result", () => {
    expect(r.primary).toBe("C5");
    expect(r.title).toBe("Sensitive or contract-controlled information changes the next step");
  });

  it("never uses external-clock language", () => {
    expect(text(r)).not.toMatch(/someone else's clock|outside your business is asking/i);
  });

  it("does not declare that CMMC or NIST SP 800-171 applies", () => {
    expect(text(r)).not.toMatch(/CMMC (applies|is required)|800-171 (applies|is required)/i);
  });
});

describe("Scenario M — customer questionnaire with no sensitive-data category", () => {
  const r = route(A.questionnaireNoSensitiveInfo);

  it("routes to the requirement result, not the sensitive-data-only result", () => {
    expect(r.primary).toBe("C5");
    expect(r.title).toBe("You reported an external requirement to address");
    expect(r.title).not.toBe("Sensitive or contract-controlled information changes the next step");
  });

  it("uses requirement-specific language because a real driver was selected", () => {
    expect(text(r)).toMatch(/external requirement/i);
  });

  it("does not route to the no-price scoping path meant for sensitive data alone", () => {
    expect(r.priceLine).not.toBe("");
    expect(r.engagement).not.toMatch(/information-handling scoping/i);
  });
});

describe("Scenario N — incident outranks a coexisting sensitive-data and deadline signal", () => {
  const r = route(A.incidentWithCuiAndQuestionnaire);

  it("leads with the incident-specific result, not C5", () => {
    expect(r.primary).toBe("C4");
    expect(r.title).toBe("Address what happened before adding new capability");
  });

  it("keeps C5 visible as an additional eligible condition", () => {
    expect(r.eligible).toContain("C5");
  });

  it("preserves the controlled handling overlay", () => {
    expect(r.overlay).toBe("controlled");
  });

  it("shows no automatic price", () => {
    expect(r.priceLine).toBe("");
  });

  it("leads with confirming incident status as the first move", () => {
    expect(r.moves[0]).toMatch(/confirm the current status, impact, containment, and documentation/i);
  });

  it("declares no framework applicability", () => {
    expect(text(r)).not.toMatch(/CMMC (applies|is required)|800-171 (applies|is required)/i);
  });
});

describe("engine invariants", () => {
  it("never awards automation candidacy without an identified system", () => {
    for (const pain of ["repetition", "delay", "fragmentation"]) {
      for (const goal of ["reduce_manual_work", "grow_capacity", "fix_fragmentation"]) {
        const r = route({
          org: "other_smb",
          goal,
          pain,
          base: "neither",
          platforms: ["none"],
          ai: "none",
          data: ["internal"],
          driver: ["none"],
        });
        expect(r.eligible, `${goal}/${pain}`).not.toContain("C3");
      }
    }
  });

  it("is deterministic", () => {
    expect(route(A.shadowAi)).toEqual(route(A.shadowAi));
  });

  it("keeps the route dynamic — question count varies with answers", () => {
    const short = visibleQuestions(A.noFoundation).length;
    const long = visibleQuestions(A.shadowAi).length;
    expect(long).toBeGreaterThan(short);
  });

  it("labels confidence as a response measure in the exported summary", () => {
    const s = summarize(A.systemsAndIntegrationPain, route(A.systemsAndIntegrationPain), {
      name: "Test",
      email: "t@example.com",
      organization: "Example",
      note: "",
    });
    expect(s).toMatch(/Response confidence:/);
    expect(s).not.toMatch(/^Confidence:/m);
  });

  it("keeps every result preliminary", () => {
    const s = summarize(A.noFoundation, route(A.noFoundation), {
      name: "Test",
      email: "t@example.com",
      organization: "Example",
      note: "",
    });
    expect(s).toMatch(/preliminary result/i);
    expect(s).toMatch(/not an audit, a compliance determination, or a price/i);
  });

  /* ------------------------------------------------------------------ *
   * Invariants added for the incident-without-AI and                    *
   * sensitive-data-vs-deadline corrections.                              *
   * ------------------------------------------------------------------ */

  it("invariant 1 — incidentDriver alone is enough to make C4 eligible and primary, with no AI reported", () => {
    for (const ai of ["none", "not_sure"]) {
      const r = route({
        org: "other_smb",
        goal: "reduce_risk",
        pain: "risk_errors",
        base: "m365",
        platforms: ["crm"],
        connected: "siloed",
        ai,
        data: ["internal"],
        driver: ["incident"],
      });
      expect(r.eligible, `ai=${ai}`).toContain("C4");
      expect(r.primary, `ai=${ai}`).toBe("C4");
    }
  });

  it("invariant 2 — sensitive-data-only results never use external-clock or 'outside your business' language", () => {
    for (const r of [
      route(A.paymentCardNoDeadline),
      route(A.healthInfoNoDeadline),
      route(A.fciNoDeadline),
      route(A.cuiNoDeadline),
    ]) {
      expect(text(r)).not.toMatch(/someone else's clock|outside your business is asking/i);
    }
  });

  it("invariant 3 — the requirement-specific heading only appears when a real driver was selected", () => {
    for (const r of [
      route(A.paymentCardNoDeadline),
      route(A.healthInfoNoDeadline),
      route(A.fciNoDeadline),
      route(A.cuiNoDeadline),
    ]) {
      expect(r.title).not.toBe("You reported an external requirement to address");
    }
    expect(route(A.questionnaireNoSensitiveInfo).title).toBe("You reported an external requirement to address");
    expect(route(A.formalRequirement).title).toBe("You reported an external requirement to address");
  });

  it("invariant 4 — AI-specific title and body only appear when AI is reported in use", () => {
    const incidentOnly = route(A.incidentNoAi); // ai: "none"
    expect(incidentOnly.primary).toBe("C4");
    expect(incidentOnly.title).not.toBe(CONDITION_TITLE.C4);
    expect(incidentOnly.body).not.toBe(CONDITION_BODY.C4);

    const genuineAi = route(A.shadowAi); // ai: "informal", no incident driver
    expect(genuineAi.primary).toBe("C4");
    expect(genuineAi.title).toBe(CONDITION_TITLE.C4);
    expect(genuineAi.body).toBe(CONDITION_BODY.C4);
  });

  it("invariant 5 — generic automation never leads over incident, sensitive-data, AI-governance, or external-requirement triggers", () => {
    const automationFriendlyBase = {
      org: "tech_services",
      goal: "reduce_manual_work",
      pain: "repetition",
      base: "m365",
      platforms: ["crm", "accounting"],
      connected: "siloed",
      ai: "none",
      data: ["internal"],
      driver: ["none"],
    } satisfies Answers;

    const variants: Array<[string, Answers]> = [
      ["incident", { ...automationFriendlyBase, driver: ["incident"] }],
      ["sensitiveData", { ...automationFriendlyBase, data: ["internal", "cui"] }],
      [
        "aiGovernanceRisk",
        { ...automationFriendlyBase, ai: "informal", accounts: "personal", rules: "none" },
      ],
      ["deadlineDriver", { ...automationFriendlyBase, driver: ["questionnaire"] }],
    ];

    for (const [label, answers] of variants) {
      const r = route(answers);
      expect(r.eligible, label).toContain("C3");
      expect(r.primary, label).not.toBe("C3");
    }
  });

  it("invariant 6 — no result declares a breach, legal violation, reporting duty, framework applicability, or an active incident", () => {
    const fixtures: Array<[string, Answers]> = [
      ["incidentNoAi", A.incidentNoAi],
      ["incidentWithShadowAi", A.incidentWithShadowAi],
      ["incidentWithCuiAndQuestionnaire", A.incidentWithCuiAndQuestionnaire],
      ["paymentCardNoDeadline", A.paymentCardNoDeadline],
      ["healthInfoNoDeadline", A.healthInfoNoDeadline],
      ["fciNoDeadline", A.fciNoDeadline],
      ["cuiNoDeadline", A.cuiNoDeadline],
      ["questionnaireNoSensitiveInfo", A.questionnaireNoSensitiveInfo],
      ["formalRequirement", A.formalRequirement],
      ["shadowAi", A.shadowAi],
    ];
    // These patterns target affirmative claims, not the disclaiming
    // sentences the copy deliberately uses (e.g. "...it is not a
    // determination that an incident remains active, that a breach or
    // legal violation occurred, or that reporting is required.").
    for (const [label, answers] of fixtures) {
      const t = text(route(answers));
      expect(t, label).not.toMatch(
        /this (is|was) a breach|constitutes a (breach|violation)|you (are|were) in violation|required by law to report|you must report|mandatory reporting applies|is illegal|was illegal/i,
      );
      expect(t, label).not.toMatch(
        /CMMC (applies|is required)|800-171 (applies|is required)|HIPAA (applies|is required)|PCI DSS (applies|is required)|SOC 2 (applies|is required)/i,
      );
      expect(t, label).not.toMatch(/this is an active incident|the incident is currently active/i);
    }
  });
});
