import { Bot, Compass, Database, Hammer, Layers, Radar, ScrollText, Wrench } from "lucide-react";

/** Commercial examples, not a catalog of generally available products. */
export const commercialSummary =
  "BSTS designs, builds, and manages secure custom software around the way your business works. Automate repetitive tasks, connect your tools, and make business information easier to use.";

export const commercialCapabilities = [
  "Custom business software",
  "Workflow automation",
  "Prospecting engines",
  "Client intelligence",
  "Secure AI and knowledge systems",
] as const;

export const commercialSolutions = [
  {
    slug: "workflow-automation",
    href: "/services/#workflow-automation",
    icon: Bot,
    title: "Workflow automation & integrations",
    cardLine: "Connect intake, approvals, follow-ups, and reporting without entering the same information twice. Keep human review where decisions need it.",
    details: "Map the handoffs, connect the systems that already matter, and keep approvals visible. For example: a lead intake flow that creates tasks, routes review, sends follow-ups, and updates reporting without duplicate entry.",
  },
  {
    slug: "prospecting-sales",
    href: "/services/#prospecting-sales",
    icon: Radar,
    title: "Prospecting & sales systems",
    cardLine: "Bring company research, opportunity tracking, outreach preparation, and follow-up into a workflow built around how you win business.",
    details: "Structure the research, scoring, outreach preparation, and next-step tracking around your actual sales motion. For example: a prospect brief that turns company signals into prioritized accounts and prepared follow-up.",
  },
  {
    slug: "client-intelligence",
    href: "/services/#client-intelligence",
    icon: Database,
    title: "Client intelligence & knowledge systems",
    cardLine: "Make relevant history easier to find across documents, meetings, notes, and authorized communications—with access boundaries designed in.",
    details: "Organize client history, permissions, and retrieval so teams can find the right context without opening everything to everyone. For example: a searchable client knowledge base with role-based access and source links.",
  },
  {
    slug: "custom-software",
    href: "/services/#custom-software",
    icon: Layers,
    title: "Custom business software",
    cardLine: "Build the portal, dashboard, internal tool, or application your process needs instead of forcing the process into software that does not fit.",
    details: "Define the workflow, data model, controls, and acceptance tests before building the tool around them. For example: an internal dashboard that combines requests, status, documents, and decisions in one place.",
  },
] as const;

export const commercialTriggers = [
  { quote: "We keep entering the same information in different places.", area: "Workflow automation & integrations" },
  { quote: "Research and follow-up keep slipping between everything else.", area: "Prospecting & sales systems" },
  { quote: "The information exists. Finding it is the hard part.", area: "Client intelligence & knowledge systems" },
] as const;

export const commercialStages = [
  { key: "discover", icon: Compass, title: "Discover", oneLine: "Find the problem worth solving.", body: "Walk through the work, the tools you already use, and the information involved. Agree on what success would look like before choosing a solution." },
  { key: "implement", icon: Hammer, title: "Implement", oneLine: "Build and test the right solution.", body: "A focused automation, integration, or custom application. Scope and acceptance criteria come first; security and human checkpoints belong in the design." },
  { key: "govern", icon: ScrollText, title: "Govern", oneLine: "Keep people in control.", body: "Define who can access information, who approves consequential actions, and who owns the system. Keep those responsibilities clear as the business changes." },
  { key: "assure", icon: Wrench, title: "Assure", oneLine: "Maintain it and prove it works.", body: "Managed service can cover operation, integration maintenance, monitoring, and agreed improvements. Control evidence and compliance support remain available where the engagement requires them." },
] as const;
