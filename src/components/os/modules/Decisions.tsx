"use client";

import { useOs } from "@/lib/os/store";
import { decisionStatuses, type Decision } from "@/lib/os/types";
import { ModuleHeader, OsCard, StatusPill, osSelectClass } from "@/components/os/ui";

export function Decisions() {
  const { state, dispatch } = useOs();

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Decisions"
        description="A decision record for every consequential choice — what was decided, why, and what would cause us to revisit it. Institutional memory, on purpose."
      />
      <ul className="grid grid-cols-1 gap-4">
        {state.decisions.map((d) => (
          <li key={d.id}>
            <OsCard>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-medium text-warm-white">{d.title}</h2>
                  <p className="mt-0.5 text-xs text-warm-dim">Decided {d.decidedOn}</p>
                </div>
                <StatusPill value={d.status} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-warm-mist">
                <span className="text-warm-dim">Context: </span>
                {d.context}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-warm-mist">
                <span className="text-warm-dim">Decision: </span>
                {d.decision}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-edge/40 pt-3.5">
                <label htmlFor={`dec-${d.id}`} className="text-xs text-warm-dim">
                  Status
                </label>
                <select
                  id={`dec-${d.id}`}
                  value={d.status}
                  onChange={(e) =>
                    dispatch({
                      type: "decision/status",
                      id: d.id,
                      status: e.target.value as Decision["status"],
                    })
                  }
                  className={osSelectClass}
                >
                  {decisionStatuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </OsCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
