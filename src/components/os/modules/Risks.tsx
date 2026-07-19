"use client";

import { useOs } from "@/lib/os/store";
import { riskStatuses, type Risk } from "@/lib/os/types";
import { ModuleHeader, OsCard, StatusPill, osSelectClass } from "@/components/os/ui";

export function Risks() {
  const { state, dispatch } = useOs();

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Risks"
        description="Named, sized, and owned — a risk register in plain language, because a risk nobody can explain is a risk nobody is managing."
      />
      <ul className="grid grid-cols-1 gap-4">
        {state.risks.map((r) => (
          <li key={r.id}>
            <OsCard>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="font-medium text-warm-white">{r.title}</h2>
                <div className="flex gap-2">
                  <span className="text-[0.65rem] text-warm-dim">Severity</span>
                  <StatusPill value={r.severity} />
                  <span className="text-[0.65rem] text-warm-dim">Likelihood</span>
                  <StatusPill value={r.likelihood} />
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-warm-mist">{r.context}</p>
              <p className="mt-2 text-sm leading-relaxed text-warm-mist">
                <span className="text-warm-dim">Mitigation: </span>
                {r.mitigation}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-edge/40 pt-3.5">
                <label htmlFor={`risk-${r.id}`} className="text-xs text-warm-dim">
                  Status
                </label>
                <select
                  id={`risk-${r.id}`}
                  value={r.status}
                  onChange={(e) =>
                    dispatch({
                      type: "risk/status",
                      id: r.id,
                      status: e.target.value as Risk["status"],
                    })
                  }
                  className={osSelectClass}
                >
                  {riskStatuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <StatusPill value={r.status} />
              </div>
            </OsCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
