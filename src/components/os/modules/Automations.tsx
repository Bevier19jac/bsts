"use client";

import { Pause, Play } from "lucide-react";
import { useOs } from "@/lib/os/store";
import { ModuleHeader, OsCard, StatusPill } from "@/components/os/ui";

export function Automations() {
  const { state, dispatch } = useOs();

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Automations"
        description="Every automation has a trigger, an action, an owner, and an off switch. If it cannot be explained in one row, it does not run."
      />
      <ul className="grid grid-cols-1 gap-4">
        {state.automations.map((a) => (
          <li key={a.id}>
            <OsCard>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-medium text-warm-white">{a.name}</h2>
                  <p className="mt-0.5 text-xs text-warm-dim">Last run: {a.lastRun}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill value={a.status} />
                  {a.status !== "Draft" ? (
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "automation/status",
                          id: a.id,
                          status: a.status === "Running" ? "Paused" : "Running",
                        })
                      }
                      className="btn-ghost-form !px-3.5 !py-1.5 text-xs"
                    >
                      {a.status === "Running" ? (
                        <>
                          <Pause className="h-3.5 w-3.5" aria-hidden /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" aria-hidden /> Resume
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-edge/40 pt-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-warm-dim">Trigger</dt>
                  <dd className="mt-0.5 leading-relaxed text-warm-mist">{a.trigger}</dd>
                </div>
                <div>
                  <dt className="text-xs text-warm-dim">Action</dt>
                  <dd className="mt-0.5 leading-relaxed text-warm-mist">{a.action}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-warm-dim">
                Health: {a.healthNote}
              </p>
            </OsCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
