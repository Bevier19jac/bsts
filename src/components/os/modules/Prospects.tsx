"use client";

import { useState } from "react";
import { useOs } from "@/lib/os/store";
import { prospectStages, type Prospect } from "@/lib/os/types";
import {
  FilterButton,
  ModuleHeader,
  OsCard,
  StatusPill,
  osSelectClass,
} from "@/components/os/ui";

export function Prospects() {
  const { state, dispatch } = useOs();
  const [stageFilter, setStageFilter] = useState<"All" | Prospect["stage"]>("All");

  const visible =
    stageFilter === "All"
      ? state.prospects
      : state.prospects.filter((p) => p.stage === stageFilter);

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Prospects"
        description="Every conversation that might become an engagement, with its stage set by hand — no automated scoring of humans here."
      />

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter prospects by stage">
        <FilterButton active={stageFilter === "All"} onClick={() => setStageFilter("All")}>
          All ({state.prospects.length})
        </FilterButton>
        {prospectStages.map((s) => (
          <FilterButton key={s} active={stageFilter === s} onClick={() => setStageFilter(s)}>
            {s}
          </FilterButton>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visible.map((p) => (
          <li key={p.id}>
            <OsCard className="h-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium text-warm-white">{p.name}</h2>
                  <p className="mt-0.5 text-xs text-warm-dim">
                    {p.industry} · added {p.addedOn}
                  </p>
                </div>
                <StatusPill value={p.stage} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-warm-mist">{p.note}</p>
              <p className="mt-3 text-xs text-warm-dim">
                Contact: {p.contactName} — {p.contactRole}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-edge/40 pt-3.5">
                <label htmlFor={`stage-${p.id}`} className="text-xs text-warm-dim">
                  Stage
                </label>
                <select
                  id={`stage-${p.id}`}
                  value={p.stage}
                  onChange={(e) =>
                    dispatch({
                      type: "prospect/stage",
                      id: p.id,
                      stage: e.target.value as Prospect["stage"],
                    })
                  }
                  className={osSelectClass}
                >
                  {prospectStages.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </OsCard>
          </li>
        ))}
        {visible.length === 0 ? (
          <li className="rounded-[1.4rem] border border-dashed border-edge p-8 text-center text-sm text-warm-dim lg:col-span-2">
            No prospects in this stage right now.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
