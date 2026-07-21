import type { Answers, Question } from "./types";

/**
 * BSTS AI & Automation Opportunity Assessment — question bank.
 *
 * Plain-language, one-at-a-time. Everything is framed around the business and
 * its work — never around the person. Answers feed a technology read: where
 * time goes, what's still manual, how much AI/automation is in play, and how
 * sensitive the data is.
 */

function has(answers: Answers, qid: string, value: string): boolean {
  return (answers[qid] ?? []).includes(value);
}

export const QUESTIONS: Question[] = [
  {
    id: "biz",
    text: "What kind of business is this?",
    description: "So the recommendations fit your world, not a generic template.",
    type: "single",
    category: "profile",
    options: [
      { value: "professional_services", label: "Professional / consulting services", industry: "professional_services" },
      { value: "ecommerce_retail", label: "E-commerce or retail", industry: "ecommerce_retail" },
      { value: "hospitality", label: "Hospitality (hotel, restaurant, venue)", industry: "hospitality" },
      { value: "healthcare", label: "Healthcare or wellness", industry: "healthcare" },
      { value: "manufacturing", label: "Manufacturing, trades, or logistics", industry: "manufacturing" },
      { value: "government", label: "Government contracting / public sector", industry: "government" },
      { value: "tech_saas", label: "Software or tech", industry: "tech_saas" },
      { value: "nonprofit", label: "Nonprofit or association", industry: "nonprofit" },
      { value: "other", label: "Something else", industry: "other" },
    ],
  },
  {
    id: "size",
    text: "How many people does the work run through?",
    description: "Including you, employees, and regular contractors.",
    type: "single",
    category: "profile",
    options: [
      { value: "solo", label: "Just me" },
      { value: "small", label: "2–10 people" },
      { value: "mid", label: "11–50 people" },
      { value: "large", label: "50+ people" },
    ],
  },
  {
    id: "time_sink",
    text: "Where does most of the team's time actually go each week?",
    description: "The work that eats the day — not the work that grows the business.",
    type: "single",
    category: "operations",
    options: [
      { value: "admin", label: "Admin, email, and busywork", d: { operations: -10 } },
      { value: "data_entry", label: "Data entry and moving info between tools", d: { operations: -12, automation: -8 } },
      { value: "scheduling", label: "Scheduling and coordination", d: { operations: -8 } },
      { value: "reporting", label: "Reports, spreadsheets, and paperwork", d: { operations: -8, tools: -6 } },
      { value: "customer", label: "Answering the same customer questions", d: { operations: -8 } },
      { value: "delivery", label: "Actually delivering the work/product", d: { operations: 4 } },
      { value: "sales", label: "Chasing leads and following up", d: { operations: -6 } },
    ],
  },
  {
    id: "manual_tasks",
    text: "Which of these are still done by hand today?",
    description: "Pick all that apply — this is where the hours hide.",
    type: "multi",
    category: "automation",
    options: [
      { value: "data_entry", label: "Typing the same data into multiple places", hours: 5, d: { automation: -8 } },
      { value: "invoicing", label: "Invoicing, billing, or payment chasing", hours: 3, d: { automation: -5 } },
      { value: "scheduling", label: "Booking and scheduling", hours: 3, d: { automation: -5 } },
      { value: "reporting", label: "Building reports from scratch", hours: 4, d: { automation: -6, tools: -4 } },
      { value: "followup", label: "Customer or lead follow-up", hours: 4, d: { automation: -6 } },
      { value: "onboarding", label: "Onboarding new customers or staff", hours: 3, d: { automation: -4 } },
      { value: "documents", label: "Creating documents, quotes, or contracts", hours: 4, d: { automation: -5 } },
      { value: "support", label: "Answering repetitive questions / support", hours: 5, d: { automation: -6, ai: -6 } },
      { value: "inventory", label: "Tracking inventory, orders, or jobs", hours: 3, d: { automation: -4 } },
    ],
  },
  {
    id: "manual_level",
    text: "Overall, how much of the day-to-day runs on manual work?",
    description: "Be honest — this sets how much time there is to win back.",
    type: "single",
    category: "automation",
    options: [
      { value: "mostly_manual", label: "Almost everything is manual", d: { automation: -18, operations: -8 } },
      { value: "half", label: "About half manual, half automated", d: { automation: -4 } },
      { value: "mostly_auto", label: "Mostly automated, some manual", d: { automation: 12 } },
      { value: "highly_auto", label: "Highly automated already", d: { automation: 22, operations: 8 } },
    ],
  },
  {
    id: "ai_use",
    text: "How much are you using AI today?",
    description: "Tools like ChatGPT, Copilot, or AI built into your software.",
    type: "single",
    category: "ai",
    options: [
      { value: "none", label: "Not really using it", d: { ai: -22 } },
      { value: "sometimes", label: "I dabble with ChatGPT now and then", d: { ai: -6 } },
      { value: "few_tools", label: "A few AI tools in the workflow", d: { ai: 12 } },
      { value: "integrated", label: "AI is built into how we work", d: { ai: 24, automation: 6 } },
    ],
  },
  {
    id: "tools",
    text: "What are you running the business on?",
    description: "Your core systems — where the work and information live.",
    type: "single",
    category: "tools",
    options: [
      { value: "paper", label: "Paper, spreadsheets, and email", d: { tools: -20, automation: -8 } },
      { value: "some_saas", label: "A handful of separate apps that don't talk to each other", d: { tools: -6, automation: -6 } },
      { value: "connected", label: "A connected set of tools (CRM, etc.)", d: { tools: 12 } },
      { value: "custom", label: "Integrated or custom-built systems", d: { tools: 22, automation: 8 } },
    ],
  },
  {
    id: "errors",
    text: "Do manual steps ever cause errors, delays, or things slipping through?",
    type: "single",
    category: "operations",
    options: [
      { value: "often", label: "Yes — regularly, and it costs us", d: { operations: -14 } },
      { value: "sometimes", label: "Sometimes, here and there", d: { operations: -4 } },
      { value: "rarely", label: "Rarely — we've got it tight", d: { operations: 10 } },
    ],
  },
  {
    id: "data",
    text: "Do you handle sensitive or regulated information?",
    description: "Health records, payment data, government or client-confidential info.",
    type: "single",
    category: "security",
    options: [
      { value: "regulated", label: "Yes — regulated data (health, government, financial)", d: { security: -6 } },
      { value: "sensitive", label: "Sensitive client data, but not formally regulated", d: { security: -2 } },
      { value: "standard", label: "Standard business information", d: { security: 8 } },
      { value: "unknown", label: "Not sure", d: { security: -8 } },
    ],
  },
  {
    id: "compliance",
    text: "Which of these are on your plate?",
    description: "Standards or frameworks you have to meet (or are being asked about).",
    type: "multi",
    category: "security",
    showIf: (a) =>
      has(a, "data", "regulated") ||
      has(a, "data", "unknown") ||
      has(a, "biz", "healthcare") ||
      has(a, "biz", "government"),
    options: [
      { value: "hipaa", label: "HIPAA (health data)", d: { security: -6 } },
      { value: "cmmc", label: "CMMC / NIST 800-171 (government / defense)", d: { security: -6 } },
      { value: "pci", label: "PCI (card payments)", d: { security: -4 } },
      { value: "soc2", label: "SOC 2 (clients are asking for it)", d: { security: -4 } },
      { value: "none_sure", label: "None / not sure", d: { security: -6 } },
    ],
  },
  {
    id: "goal",
    text: "If we could fix one thing first, what matters most to you?",
    type: "single",
    category: "profile",
    options: [
      { value: "save_time", label: "Win back time from busywork", goal: "save_time" },
      { value: "cut_costs", label: "Cut costs and overhead", goal: "cut_costs" },
      { value: "grow_revenue", label: "Grow revenue", goal: "grow_revenue" },
      { value: "scale_no_hire", label: "Handle more without hiring", goal: "scale_no_hire" },
      { value: "reduce_errors", label: "Stop errors and things slipping", goal: "reduce_errors" },
      { value: "security", label: "Lock down security and compliance", goal: "security" },
    ],
  },
];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
);
