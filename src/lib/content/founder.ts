import { vetCert } from "@/lib/site";

/**
 * Founder credentials — exact language mandated by the claims policy.
 * Do not edit phrasing without updating CLAIMS_REGISTER.md.
 *
 * Degree wording is verified language. Never shorten the bachelor's degree
 * to "Bachelor of Science in Cybersecurity" — the verified wording is
 * "Bachelor of Science in Computer Science with a Cybersecurity major".
 */
export const founder = {
  name: "Jacob Bevier",
  role: "Founder & Principal",
  credentials: [
    "Master of Science in Artificial Intelligence",
    "Bachelor of Science in Computer Science with a Cybersecurity major, Magna Cum Laude",
    "CompTIA Security+",
    "AWS Certified AI Practitioner",
  ],
  experience: [
    "U.S. Army veteran — Army leadership experience including Master Gunner and First Sergeant responsibilities",
    "Federal information-security and cybersecurity-coordination experience",
    vetCert.badge,
  ],
  narrative: [
    "Most organizations adopting AI right now are being served by one of two kinds of firm: automation shops that can build the workflow but have not thought hard about the data moving through it, or security and compliance practices that can write the policy but cannot build anything. The gap between them is where the expensive mistakes happen.",
    "Jacob founded BSTS to work in that gap. His formal training deliberately spans both sides: a Master of Science in Artificial Intelligence and a Bachelor of Science in Computer Science with a Cybersecurity major, earned Magna Cum Laude. AI implemented without security discipline is a liability. Security that blocks useful automation is a tax. Doing both well requires understanding both, and most people specialize in one.",
    "Before founding BSTS, Jacob served in the U.S. Army in senior leadership roles — including Master Gunner and First Sergeant responsibilities — then moved into federal information security. Those are environments where systems have to work under pressure, where documentation is not optional, and where nobody takes your word for it: a control counts when you can demonstrate it. That standard is the one BSTS applies to commercial work.",
    "For a client, the background translates into specifics: requirements in writing before work begins, honest risk calls even when they shrink the engagement, data-flow questions asked before implementation rather than after, documentation and training delivered as part of the work — and a bias toward finishing the mission rather than extending the contract.",
    "BSTS is deliberately lean and principal-led. Every engagement is run by the founder, scoped in writing, and measured against criteria agreed before work begins.",
  ],
  /**
   * The path that produced the positioning. Each step is factual and
   * derives from the credentials and experience listed above — no new
   * claims are introduced here.
   */
  arc: {
    heading: "Technology → cybersecurity → AI → governance → secure implementation",
    steps: [
      {
        label: "Technical systems",
        body: "Military technical and gunnery systems, where precision and repeatable procedure are the job.",
      },
      {
        label: "Cybersecurity",
        body: "Federal cybersecurity work and a Computer Science degree with a Cybersecurity major.",
      },
      {
        label: "Artificial intelligence",
        body: "A Master of Science in Artificial Intelligence, plus hands-on AI development.",
      },
      {
        label: "Risk & governance",
        body: "Security-framework exposure and risk management across federal and enterprise stakeholders.",
      },
      {
        label: "Secure implementation",
        body: "Building the thing — with the data boundaries, controls, and evidence designed in.",
      },
    ],
  },
  principles: [
    {
      title: "Precision over promises",
      body: "We say NIST-aligned, not NIST certified. We say SOC 2 readiness support, not SOC 2 compliant — and we say plainly that a CPA firm, not BSTS, performs the examination. If a claim cannot survive an audit of its wording, we do not make it.",
    },
    {
      title: "Working software over slideware",
      body: "The third stage of every engagement is a working pilot in production. Strategy that never ships is a document, not a transformation.",
    },
    {
      title: "Your stack, not our resale margin",
      body: "BSTS sells no licenses and takes no vendor commissions. When we recommend keeping a system, it is because keeping it is right.",
    },
    {
      title: "AI with a human in the loop",
      body: "Every AI implementation we ship keeps a person in control of consequential actions and is documented honestly — including what the model cannot do.",
    },
  ],
} as const;
