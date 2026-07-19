export type MethodStage = {
  number: string;
  name: string;
  duration: string;
  summary: string;
  activities: string[];
  deliverable: string;
};

/**
 * The BSTS Method — five stages from first conversation to steady state.
 */
export const methodStages: MethodStage[] = [
  {
    number: "01",
    name: "Listen",
    duration: "Week 1",
    summary:
      "We learn how your operation actually runs — not how the org chart says it runs. Shadowing real workflows beats reading vendor brochures.",
    activities: [
      "Structured technology assessment (the same one on this site)",
      "Interviews with the people who touch the systems daily",
      "Inventory of every tool, license, integration, and workaround",
    ],
    deliverable: "A plain-language map of your current state, in your vocabulary.",
  },
  {
    number: "02",
    name: "Map",
    duration: "Weeks 2–3",
    summary:
      "Every finding lands in one of five lanes: keep, connect, automate, build, or secure. Nothing is recommended without a reason attached.",
    activities: [
      "Keep / connect / automate / build / secure classification of every system",
      "Security baseline informed by NIST CSF 2.0",
      "Effort-versus-impact scoring for every candidate initiative",
    ],
    deliverable:
      "A prioritized transformation roadmap with honest effort estimates.",
  },
  {
    number: "03",
    name: "Prove",
    duration: "Weeks 4–6",
    summary:
      "Before any large commitment, we ship one small, high-visibility win. You judge us on working software, not slideware.",
    activities: [
      "One narrowly scoped pilot — an integration, an automation, or a tool",
      "Success criteria agreed in writing before work begins",
      "Security review of the pilot before it touches real data",
    ],
    deliverable: "A working pilot in production, with measured results.",
  },
  {
    number: "04",
    name: "Build",
    duration: "Roadmap-paced",
    summary:
      "Roadmap items ship in short cycles with demos at every step. You always know what is live, what is next, and what it costs.",
    activities: [
      "Two-week delivery cycles with a demo at the end of each",
      "OWASP-informed secure development practices throughout",
      "Documentation and handover written as we go, not after",
    ],
    deliverable: "Shipped increments, each one independently valuable.",
  },
  {
    number: "05",
    name: "Steward",
    duration: "Ongoing, optional",
    summary:
      "Technology drifts. We offer ongoing stewardship — monitoring, tuning, security review — or a clean handover to your team. Your call.",
    activities: [
      "Quarterly roadmap and security posture reviews",
      "Automation health monitoring and tuning",
      "Advisory access for new vendor and AI decisions",
    ],
    deliverable:
      "A technology estate that stays coherent as your business changes.",
  },
];
