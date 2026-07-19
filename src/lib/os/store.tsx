"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { createSeedState } from "./seed";
import {
  osStateSchema,
  type OsState,
  type Prospect,
  type Project,
  type Risk,
  type Automation,
  type RoadmapItem,
  type Task,
  type Decision,
} from "./types";

/**
 * In-memory demo store. Deliberately NOT persisted to browser storage:
 * this is a demonstration environment and holding state in memory only is
 * a privacy feature. JSON export/import provides manual persistence.
 */

type Action =
  | { type: "reset" }
  | { type: "import"; state: OsState }
  | { type: "prospect/stage"; id: string; stage: Prospect["stage"] }
  | { type: "project/status"; id: string; status: Project["status"] }
  | { type: "project/toggleTask"; projectId: string; taskId: string }
  | { type: "project/addTask"; projectId: string; task: Task }
  | { type: "risk/status"; id: string; status: Risk["status"] }
  | { type: "automation/status"; id: string; status: Automation["status"] }
  | { type: "roadmap/add"; item: RoadmapItem }
  | { type: "decision/status"; id: string; status: Decision["status"] }
  | { type: "settings/density"; density: OsState["settings"]["density"] };

function reducer(state: OsState, action: Action): OsState {
  switch (action.type) {
    case "reset":
      return createSeedState();
    case "import":
      return action.state;
    case "prospect/stage":
      return {
        ...state,
        prospects: state.prospects.map((p) =>
          p.id === action.id ? { ...p, stage: action.stage } : p,
        ),
      };
    case "project/status":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.id ? { ...p, status: action.status } : p,
        ),
      };
    case "project/toggleTask":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? {
                ...p,
                tasks: p.tasks.map((t) =>
                  t.id === action.taskId ? { ...t, done: !t.done } : t,
                ),
              }
            : p,
        ),
      };
    case "project/addTask":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, tasks: [...p.tasks, action.task] }
            : p,
        ),
      };
    case "risk/status":
      return {
        ...state,
        risks: state.risks.map((r) =>
          r.id === action.id ? { ...r, status: action.status } : r,
        ),
      };
    case "automation/status":
      return {
        ...state,
        automations: state.automations.map((a) =>
          a.id === action.id ? { ...a, status: action.status } : a,
        ),
      };
    case "roadmap/add":
      return { ...state, roadmapItems: [...state.roadmapItems, action.item] };
    case "decision/status":
      return {
        ...state,
        decisions: state.decisions.map((d) =>
          d.id === action.id ? { ...d, status: action.status } : d,
        ),
      };
    case "settings/density":
      return { ...state, settings: { ...state.settings, density: action.density } };
  }
}

type OsStore = {
  state: OsState;
  dispatch: React.Dispatch<Action>;
  exportJson: () => void;
  importJson: (raw: string) => { ok: true } | { ok: false; error: string };
};

const OsContext = createContext<OsStore | null>(null);

let idCounter = 0;
/** Collision-safe demo id — unique within a browser session. */
export function demoId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

export function OsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createSeedState);

  const store = useMemo<OsStore>(
    () => ({
      state,
      dispatch,
      exportJson: () => {
        const blob = new Blob([JSON.stringify(state, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bsts-os-demo-state.json";
        a.click();
        URL.revokeObjectURL(url);
      },
      importJson: (raw: string) => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(raw);
        } catch {
          return { ok: false as const, error: "That file is not valid JSON." };
        }
        const result = osStateSchema.safeParse(parsed);
        if (!result.success) {
          const first = result.error.issues[0];
          return {
            ok: false as const,
            error: `Not a valid BSTS OS demo-state file (${first?.path.join(".") || "root"}: ${first?.message || "schema mismatch"}).`,
          };
        }
        dispatch({ type: "import", state: result.data });
        return { ok: true as const };
      },
    }),
    [state],
  );

  return <OsContext.Provider value={store}>{children}</OsContext.Provider>;
}

export function useOs(): OsStore {
  const ctx = useContext(OsContext);
  if (!ctx) throw new Error("useOs must be used inside <OsProvider>");
  return ctx;
}
