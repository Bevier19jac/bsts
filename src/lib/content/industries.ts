import {
  Briefcase,
  ConciergeBell,
  HeartPulse,
  Landmark,
  Store,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Industry = {
  slug: string;
  icon: LucideIcon;
  name: string;
  status: "featured" | "active";
  headline: string;
  summary: string;
  pains: string[];
};

export const industries: Industry[] = [
  {
    slug: "hospitality",
    icon: ConciergeBell,
    name: "Boutique hospitality",
    status: "featured",
    headline: "Independent hotels competing on experience, not headcount",
    summary:
      "Boutique hotels run on a patchwork of PMS, POS, booking engines, and channel managers that rarely speak to each other. We connect that stack, automate the repetitive middle of the guest journey, and keep the human touch where it matters — at the front desk, not the back office.",
    pains: [
      "Reservations re-keyed across systems",
      "Guest preferences trapped in staff memory",
      "Nightly reporting assembled by copy-paste",
      "AI curiosity without a safe place to start",
    ],
  },
  {
    slug: "professional-services",
    icon: Briefcase,
    name: "Professional services",
    status: "active",
    headline: "Firms whose product is expertise and whose enemy is admin",
    summary:
      "Law, accounting, consulting, and design practices lose billable hours to intake, scheduling, and document wrangling. We automate the administrative connective tissue and implement AI-assisted drafting with the confidentiality boundaries these professions require.",
    pains: [
      "Client intake spread across email, forms, and phone notes",
      "Engagement documents living in five versions",
      "Time capture that leaks revenue",
    ],
  },
  {
    slug: "local-commerce",
    icon: Store,
    name: "Local commerce & retail",
    status: "active",
    headline: "Independent retailers with enterprise problems and small-team budgets",
    summary:
      "Inventory in one system, e-commerce in another, loyalty in a third. We unify the data so owners see one true picture of stock, sales, and customers — and automate the reorder and outreach work that keeps shelves and relationships full.",
    pains: [
      "Stock counts that disagree between floor and website",
      "Customer history scattered across platforms",
      "Marketing that depends on someone remembering",
    ],
  },
  {
    slug: "field-services",
    icon: Wrench,
    name: "Field & trade services",
    status: "active",
    headline: "Crews in the field, paperwork in the truck",
    summary:
      "Scheduling, dispatch, invoicing, and compliance records still travel by text message and clipboard in much of the trades. We connect scheduling to invoicing to records so jobs close the day the work finishes, not the week after.",
    pains: [
      "Jobs finished but not invoiced",
      "Compliance documents assembled under deadline pressure",
      "Dispatch decisions made without location or history context",
    ],
  },
  {
    slug: "health-adjacent",
    icon: HeartPulse,
    name: "Health-adjacent practices",
    status: "active",
    headline: "Wellness, dental, and therapy practices with sensitive data",
    summary:
      "Practices handling sensitive personal information need automation with strong data boundaries. We design integrations and AI assistance with privacy as a structural constraint, not a checkbox — and we are candid about what should never be automated.",
    pains: [
      "Reminder and rebooking work consuming front-desk hours",
      "Sensitive data scattered across consumer-grade tools",
      "Uncertainty about what AI use is appropriate",
    ],
  },
  {
    slug: "civic-nonprofit",
    icon: Landmark,
    name: "Nonprofits & civic organizations",
    status: "active",
    headline: "Mission-driven teams doing enterprise work on donated time",
    summary:
      "Donor records, volunteer scheduling, grant reporting — nonprofits run real operations on improvised stacks. We bring the same keep-connect-automate discipline at a scope sized to nonprofit budgets, with security appropriate to donor data.",
    pains: [
      "Donor and volunteer data in disconnected spreadsheets",
      "Grant reporting rebuilt from scratch each cycle",
      "Institutional knowledge held by one volunteer",
    ],
  },
];
