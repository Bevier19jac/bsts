export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  published: string; // ISO date
  disclaimer?: string;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "you-probably-do-not-need-to-replace-your-stack",
    title: "You Probably Do Not Need to Replace Your Entire Technology Stack",
    description:
      "The rip-and-replace pitch is the most expensive sentence in small-business technology. Here is a calmer way to decide what stays, what connects, and what actually needs to change.",
    readingTime: "7 min read",
    published: "2026-06-02",
    body: [
      {
        type: "p",
        text: "There is a sentence that has cost small and mid-sized businesses more money than any breach, outage, or bad hire: “We recommend a full platform migration.” It arrives in a well-designed proposal, it is delivered with confidence, and it is usually wrong.",
      },
      {
        type: "p",
        text: "Not always wrong. Some systems genuinely reach the end of their useful life — the vendor folds, the security model was never real, the last person who understood the customizations retires. But in our experience, the honest fraction of stacks that need wholesale replacement is small. What most organizations actually have is a connection problem wearing a replacement problem's clothes.",
      },
      { type: "h2", text: "Why the replacement pitch keeps winning" },
      {
        type: "p",
        text: "Replacement is easy to sell because it is easy to imagine. A single new platform, one login, one invoice, one throat to choke. The pitch flatters everyone: the buyer gets a fresh start, the vendor gets a multi-year contract, and nobody has to do the unglamorous archaeology of understanding how the current systems really work.",
      },
      {
        type: "p",
        text: "The costs arrive later, and they arrive in kinds the proposal never priced. Muscle memory: your team is fluent in the old system, and fluency is throughput. Edge cases: a decade of workarounds encodes real business rules nobody wrote down. Migration risk: data never moves as cleanly as the demo implies. And opportunity cost: the year you spend migrating is a year you are not improving anything a customer can feel.",
      },
      { type: "h2", text: "The four questions that actually matter" },
      {
        type: "p",
        text: "Before any system is condemned, it deserves four questions answered in writing:",
      },
      {
        type: "ul",
        items: [
          "Does it still do its core job reliably? Not elegantly — reliably.",
          "Can it exchange data with the systems around it, through an API, an export, or even a scheduled file drop?",
          "Is it secure enough to keep, or can it be made so with access controls and patching rather than replacement?",
          "Does anyone on your team love it? Fluency and affection are operational assets with real dollar value.",
        ],
      },
      {
        type: "p",
        text: "A system that passes three of these four almost never justifies replacement. What it usually justifies is connection — building the missing bridges so the data it holds stops being an island — and automation around its edges, so the humans who use it stop performing courier duty between screens.",
      },
      { type: "h2", text: "What “keep and connect” looks like in practice" },
      {
        type: "p",
        text: "Consider a common pattern we see in boutique hospitality and professional services alike: a core operational system that works, a billing or point-of-sale system that works, and a staff that spends hours daily re-keying between them. The replacement pitch says: unify on one platform. The keep-and-connect answer says: the two systems already expose enough of an interface to synchronize the records that matter, and the re-keying disappears in weeks — not quarters — for a fraction of the cost and none of the retraining.",
      },
      {
        type: "p",
        text: "Connection work is less photogenic than a new platform. There is no launch day, no new logo on the login screen. There is just a Tuesday when the double entry quietly stops. We consider that the best kind of technology outcome: the kind your team notices as absence of friction.",
      },
      { type: "h2", text: "When replacement genuinely is the answer" },
      {
        type: "p",
        text: "Intellectual honesty requires the other list. Replace a system when the vendor has abandoned it and security patches have stopped. Replace it when it cannot exchange data by any means and it sits in the middle of your operation. Replace it when the license cost exceeds the cost of a better tool including migration. And replace it when it forces your business to work in a shape that loses you customers.",
      },
      {
        type: "p",
        text: "Notice what is not on that list: age, unfashionable interfaces, or a salesperson's roadmap slide. Old software that works is not technical debt. It is often the most tested, most understood asset you own.",
      },
      { type: "h2", text: "How to run this decision yourself" },
      {
        type: "p",
        text: "You do not need a consultant to start. Take one afternoon. List every system you pay for or depend on, including the spreadsheets. For each, answer the four questions above. Mark each system keep, connect, automate-around, or replace-candidate. Then — and this is the discipline — require that every replace-candidate carry a written reason tied to one of the genuine replacement conditions, not to a feeling of staleness.",
      },
      {
        type: "p",
        text: "Most organizations that run this exercise discover their stack is better than they were told. What it lacks is not modernity. It is connective tissue, a layer of automation for the repetitive middle, and a security baseline that lets everyone sleep. Those are all buildable — around what you already own.",
      },
      {
        type: "callout",
        text: "BSTS engagements begin with exactly this exercise, performed rigorously and delivered as a written keep/connect/automate/build/secure map. If a system should stay, we will tell you — we sell no licenses and earn nothing from churn.",
      },
    ],
  },
  {
    slug: "where-ai-actually-belongs-in-a-boutique-hotel",
    title: "Where AI Actually Belongs in a Boutique Hotel",
    description:
      "Not at the front desk, and not writing your brand voice unsupervised. A field guide to the narrow places where AI earns its keep in independent hospitality — and the places it should never touch.",
    readingTime: "8 min read",
    published: "2026-06-16",
    disclaimer:
      "Examples in this article, including any reference to Solara House, are illustrative concepts — not client case studies or measured results.",
    body: [
      {
        type: "p",
        text: "The boutique hotel is a strange candidate for artificial intelligence. Its entire premise is the opposite of automation: a human remembers your name, your table, your view preference. Guests do not book a 28-room house on a town square because they want to talk to software. So when AI vendors arrive promising a “guest experience revolution,” independent hoteliers are right to be suspicious.",
      },
      {
        type: "p",
        text: "And yet. Behind the front desk of that same hotel is a back office drowning in exactly the kind of work machines do well: repetitive, textual, pattern-shaped, and endless. The interesting question is not whether AI belongs in a boutique hotel. It is where the line runs.",
      },
      { type: "h2", text: "The rule: AI drafts, humans decide" },
      {
        type: "p",
        text: "Every appropriate use of AI in a small hospitality operation shares one property: a person remains between the model and the guest. The model prepares; the human approves. The moment software speaks to a guest without review, you have outsourced your brand voice to a system that does not know your house, cannot smell smoke, and will confidently invent a late-checkout policy you do not have.",
      },
      {
        type: "p",
        text: "This is not a temporary caution to be relaxed once the technology matures. In a property whose product is human attention, the human-in-the-loop is not overhead — it is the product surviving contact with automation.",
      },
      { type: "h2", text: "Where it earns its keep" },
      {
        type: "p",
        text: "Within that rule, four applications consistently justify themselves:",
      },
      {
        type: "ul",
        items: [
          "Drafting routine correspondence. Sixty percent of a hospitality inbox is the same twelve questions — parking, hours, pets, early arrival. An assistant grounded in your actual house policies can draft accurate replies in your tone for a human to review and send. Minutes become seconds, and nothing leaves unreviewed.",
          "Summarizing the operational day. Night audit notes, maintenance logs, and guest feedback condensed into a morning briefing a manager reads in two minutes. The model summarizes; it does not decide.",
          "Surfacing anomalies. A booking pattern that looks like fraud, a rate parity gap between channels, a room blocked longer than any maintenance ticket explains. AI is a tireless reader of boring data — flagging, never acting.",
          "Internal knowledge search. New staff asking “how do we handle a wine allergy at the tasting?” and getting the house answer from house documents, instead of interrupting the one veteran who knows.",
        ],
      },
      { type: "h2", text: "Where it does not belong" },
      {
        type: "p",
        text: "The prohibited list matters more than the permitted one. No unsupervised guest-facing chat — the reputational downside of one confidently wrong answer outweighs a thousand deflected emails. No AI decisions on pricing without human review — dynamic pricing models tuned on big-chain data will happily discount the exact scarcity a boutique property sells. No processing of payment data or identity documents through general-purpose AI tools — that is a data-boundary question, and the answer is no. And no synthetic guest reviews or AI-written “testimonials,” which are somewhere between dishonest and illegal depending on jurisdiction.",
      },
      {
        type: "p",
        text: "We would add one more, gently: do not use AI to simulate warmth you do not staff for. Guests forgive a slow reply from a small team. They do not forgive discovering that the personal note in their confirmation was written by no one.",
      },
      { type: "h2", text: "A concrete shape: the Solara House concept" },
      {
        type: "p",
        text: "In our fictional demonstration property, Solara House, the AI footprint is deliberately narrow: an assistant that drafts replies to routine email from a curated house-knowledge base, a nightly self-assembling operations report, and anomaly flags on channel rates. Every outbound word passes a human. Payment and identity data are structurally out of the model's reach — not policy-excluded, architecture-excluded.",
      },
      {
        type: "p",
        text: "That footprint sounds modest, and it is. It is also, by our estimate, the majority of the real value available — captured at a small fraction of the risk of the “AI concierge” pitch. In hospitality AI, ambition and value are not the same axis.",
      },
      { type: "h2", text: "How to start without regret" },
      {
        type: "p",
        text: "Start with one workflow, in drafts-only mode, measured over one month. Write down before you begin what the model is allowed to see, and confirm your data does not train someone else's product — in most commercial AI tools this is a setting, and it matters. Tell your team what the assistant does; software that staff route around delivers nothing. Then, only after the first workflow has earned trust, consider the second.",
      },
      {
        type: "callout",
        text: "This article describes concepts, not client results. Solara House is a fictional property created by BSTS for demonstration. If you want the version of this thinking applied to your actual stack, that conversation starts with an assessment, not a purchase order.",
      },
    ],
  },
  {
    slug: "soc-2-readiness-is-not-soc-2-certification",
    title: "SOC 2 Readiness Is Not the Same as SOC 2 Certification",
    description:
      "The two phrases get blurred constantly — sometimes innocently, sometimes not. What each one actually means, why the distinction is legally and commercially important, and how to buy readiness help without being misled.",
    readingTime: "6 min read",
    published: "2026-07-01",
    disclaimer:
      "This article is general information about security frameworks, not legal or audit advice. BSTS provides readiness support and is not a CPA firm or audit body.",
    body: [
      {
        type: "p",
        text: "If you buy technology services long enough, you will meet a vendor whose website says “SOC 2 compliant” in the footer, whose sales deck says “SOC 2 certified,” and whose actual status is that someone on the team once read the Trust Services Criteria. The gap between those statements is not pedantry. It determines what you can legally rely on.",
      },
      { type: "h2", text: "What SOC 2 actually is" },
      {
        type: "p",
        text: "SOC 2 is a reporting framework from the AICPA — the American Institute of Certified Public Accountants — under which an independent, licensed CPA firm examines a service organization's controls against the Trust Services Criteria: security, and optionally availability, processing integrity, confidentiality, and privacy. The output is not a certificate. It is an attestation report — an auditor's written opinion, bound to a scope and a time frame.",
      },
      {
        type: "ul",
        items: [
          "A Type I report opines on the design of controls at a single point in time.",
          "A Type II report opines on both design and operating effectiveness over a period, typically three to twelve months — which is why sophisticated buyers ask for Type II specifically.",
        ],
      },
      {
        type: "p",
        text: "Strictly speaking, then, there is no such thing as being “SOC 2 certified.” There are organizations holding a current attestation report with an unqualified opinion, and there is everyone else. The phrase “SOC 2 compliant” is looser still — SOC 2 is not a pass/fail standard you comply with, it is an examination you undergo.",
      },
      { type: "h2", text: "What readiness actually is" },
      {
        type: "p",
        text: "Readiness work is everything an organization does before the auditors arrive: mapping existing practices to the Trust Services Criteria, closing gaps, writing the policies the audit will ask for, standing up evidence collection so proof accumulates as a byproduct of operations rather than a quarterly scramble, and often a readiness assessment — a rehearsal performed by a consultant.",
      },
      {
        type: "p",
        text: "Readiness is real, valuable work. A well-run readiness engagement is the difference between a smooth audit and an expensive one. But it produces preparation, not opinion. A consultant who prepared you cannot also attest you; independence rules exist precisely so the person grading the exam is not the person who coached for it.",
      },
      { type: "h2", text: "Why the wording is worth policing" },
      {
        type: "p",
        text: "For buyers: a vendor's SOC 2 claim is only as good as the report behind it. Ask for the actual report under NDA. Check the period, the scope — which services and locations were examined — and the opinion. A report from three years ago, or one scoped to a product you do not use, tells you little.",
      },
      {
        type: "p",
        text: "For sellers: overstating status is not a marketing rounding error. Claiming a certification you do not hold invites regulatory attention for deceptive practices, breaches warranties you have probably signed in customer contracts, and — most practically — detonates trust at the exact moment a real prospect's security team asks for the report you implied exists.",
      },
      { type: "h2", text: "The honest ladder" },
      {
        type: "p",
        text: "There is language for every honest rung, and using the right rung costs nothing:",
      },
      {
        type: "ul",
        items: [
          "“Our security practices are informed by the SOC 2 Trust Services Criteria” — legitimate from day one.",
          "“We are pursuing SOC 2 readiness” — legitimate once the work has genuinely begun.",
          "“We have completed a readiness assessment and are engaging an audit firm” — legitimate at that stage, and impressive in its precision.",
          "“We hold a current SOC 2 Type II report, available under NDA” — the top rung, and the only rung that means an independent opinion exists.",
        ],
      },
      {
        type: "p",
        text: "Buyers reward the precision more than sellers expect. A small firm that says exactly where it stands on that ladder signals more security maturity than a large one with a vague badge.",
      },
      {
        type: "callout",
        text: "BSTS provides SOC 2 readiness support — controls mapping, gap remediation, and evidence habits — and we describe it as exactly that. We are not a CPA firm, we do not issue attestation reports, and we will never describe readiness work as certification. The same discipline applies to every framework we reference, including NIST CSF 2.0.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
