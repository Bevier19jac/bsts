import { z } from "zod";

/**
 * BSTS OS domain model. Every collection is Zod-described so demo-state
 * JSON import can be validated strictly before it touches the store.
 */

export const prospectStages = [
  "Lead",
  "Conversation",
  "Assessment",
  "Proposal",
  "Won",
  "Passed",
] as const;

export const lanes = ["Keep", "Connect", "Automate", "Build", "Secure"] as const;

export const projectStatuses = [
  "Discovery",
  "Active",
  "In review",
  "Paused",
  "Done",
] as const;

export const riskLevels = ["Low", "Medium", "High"] as const;
export const riskStatuses = ["Open", "Mitigating", "Accepted", "Closed"] as const;
export const automationStatuses = ["Running", "Paused", "Draft"] as const;
export const documentKinds = ["Statement of work", "Assessment report", "Policy", "Architecture note", "Runbook"] as const;
export const documentStatuses = ["Draft", "In review", "Final"] as const;
export const decisionStatuses = ["Proposed", "Accepted", "Superseded"] as const;
export const assessmentStatuses = ["In progress", "Delivered"] as const;
export const clientStatuses = ["Active engagement", "Stewardship", "Wrapped"] as const;

const id = z.string().min(1);

export const prospectSchema = z.object({
  id,
  name: z.string().min(1),
  industry: z.string().min(1),
  stage: z.enum(prospectStages),
  contactName: z.string().min(1),
  contactRole: z.string().min(1),
  note: z.string(),
  addedOn: z.string().min(1),
});

export const clientSchema = z.object({
  id,
  name: z.string().min(1),
  industry: z.string().min(1),
  status: z.enum(clientStatuses),
  summary: z.string(),
  since: z.string().min(1),
});

export const assessmentFindingSchema = z.object({
  id,
  lane: z.enum(lanes),
  finding: z.string().min(1),
  recommendation: z.string().min(1),
});

export const assessmentSchema = z.object({
  id,
  subject: z.string().min(1),
  subjectId: id,
  status: z.enum(assessmentStatuses),
  conductedOn: z.string().min(1),
  problem: z.string(),
  systems: z.array(z.string()),
  findings: z.array(assessmentFindingSchema),
});

export const roadmapItemSchema = z.object({
  id,
  clientId: id,
  title: z.string().min(1),
  lane: z.enum(lanes),
  priority: z.enum(["Now", "Next", "Later"]),
  effort: z.enum(["S", "M", "L"]),
  rationale: z.string(),
});

export const taskSchema = z.object({
  id,
  title: z.string().min(1),
  done: z.boolean(),
});

export const projectSchema = z.object({
  id,
  clientId: id,
  name: z.string().min(1),
  lane: z.enum(lanes),
  status: z.enum(projectStatuses),
  description: z.string(),
  tasks: z.array(taskSchema),
});

export const riskSchema = z.object({
  id,
  title: z.string().min(1),
  context: z.string(),
  severity: z.enum(riskLevels),
  likelihood: z.enum(riskLevels),
  status: z.enum(riskStatuses),
  mitigation: z.string(),
});

export const automationSchema = z.object({
  id,
  name: z.string().min(1),
  trigger: z.string().min(1),
  action: z.string().min(1),
  status: z.enum(automationStatuses),
  lastRun: z.string(),
  healthNote: z.string(),
});

export const documentSchema = z.object({
  id,
  title: z.string().min(1),
  kind: z.enum(documentKinds),
  status: z.enum(documentStatuses),
  updatedOn: z.string().min(1),
  note: z.string(),
});

export const decisionSchema = z.object({
  id,
  title: z.string().min(1),
  context: z.string(),
  decision: z.string().min(1),
  status: z.enum(decisionStatuses),
  decidedOn: z.string().min(1),
});

export const settingsSchema = z.object({
  density: z.enum(["Comfortable", "Compact"]),
});

export const osStateSchema = z.object({
  kind: z.literal("bsts-os-demo-state"),
  version: z.literal(1),
  prospects: z.array(prospectSchema),
  clients: z.array(clientSchema),
  assessments: z.array(assessmentSchema),
  roadmapItems: z.array(roadmapItemSchema),
  projects: z.array(projectSchema),
  risks: z.array(riskSchema),
  automations: z.array(automationSchema),
  documents: z.array(documentSchema),
  decisions: z.array(decisionSchema),
  settings: settingsSchema,
});

export type Prospect = z.infer<typeof prospectSchema>;
export type Client = z.infer<typeof clientSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export type AssessmentFinding = z.infer<typeof assessmentFindingSchema>;
export type RoadmapItem = z.infer<typeof roadmapItemSchema>;
export type Task = z.infer<typeof taskSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Risk = z.infer<typeof riskSchema>;
export type Automation = z.infer<typeof automationSchema>;
export type DocumentItem = z.infer<typeof documentSchema>;
export type Decision = z.infer<typeof decisionSchema>;
export type OsSettings = z.infer<typeof settingsSchema>;
export type OsState = z.infer<typeof osStateSchema>;
