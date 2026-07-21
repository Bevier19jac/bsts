/**
 * Founder credentials — exact language mandated by the claims policy.
 * Do not edit phrasing without updating CLAIMS_REGISTER.md.
 */
export const founder = {
  name: "Jacob Bevier",
  role: "Founder & Principal",
  credentials: [
    "Master of Science in Artificial Intelligence",
    "Bachelor of Science in Cybersecurity, Magna Cum Laude",
    "CompTIA Security+",
    "AWS Certified AI Practitioner",
  ],
  experience: [
    "Federal cybersecurity experience",
    "U.S. Army veteran and senior operational leader",
    "M1A2 SEP v3 Abrams Tank Master Gunner",
  ],
  narrative: [
    "BSTS exists because most small and mid-sized organizations are told they have two options: keep struggling with disconnected tools, or sign up for a rip-and-replace project that consumes a year and a budget. Neither is true.",
    "Jacob founded BSTS to offer a third path — engagements that start from what already works, connect it, automate around it, and secure it. His formal training spans both sides of the modern technology question: a Master of Science in Artificial Intelligence and a Bachelor of Science in Cybersecurity, earned Magna Cum Laude. That pairing is deliberate. AI implemented without security discipline is a liability; security that blocks useful automation is a tax. BSTS practices both together.",
    "Before founding BSTS, Jacob served as a U.S. Army senior operational leader and worked in federal cybersecurity — environments where systems must work under pressure, documentation is not optional, and trust is earned through verification. He holds CompTIA Security+ and AWS Certified AI Practitioner certifications.",
    "BSTS is deliberately focused. Every engagement is led by the principal, scoped in writing, and measured against criteria agreed before work begins.",
  ],
  principles: [
    {
      title: "Precision over promises",
      body: "We say NIST-aligned, not NIST certified. We say SOC 2 readiness support, not SOC 2 compliant. If a claim cannot survive an audit of its wording, we do not make it.",
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
