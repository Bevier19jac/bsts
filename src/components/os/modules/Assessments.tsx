"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useOs } from "@/lib/os/store";
import { LanePill, ModuleHeader, OsCard, StatusPill } from "@/components/os/ui";

export function Assessments() {
  const { state } = useOs();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = state.assessments.find((a) => a.id === selectedId);

  if (selected) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex items-center gap-2 text-sm text-warm-dim transition-colors hover:text-cyan-soft"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All assessments
        </button>

        <ModuleHeader
          title={selected.subject}
          description={`Technology assessment · conducted ${selected.conductedOn}`}
        >
          <StatusPill value={selected.status} />
        </ModuleHeader>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <OsCard>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-warm-dim uppercase">
              Primary operating problem
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-warm-mist">
              {selected.problem}
            </p>
          </OsCard>
          <OsCard>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-warm-dim uppercase">
              Systems inventoried
            </h2>
            <ul className="mt-3 space-y-2">
              {selected.systems.map((s) => (
                <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-warm-mist">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core/80" />
                  {s}
                </li>
              ))}
            </ul>
          </OsCard>
        </div>

        <OsCard>
          <h2 className="text-xs font-semibold tracking-[0.14em] text-warm-dim uppercase">
            Findings & recommendations
          </h2>
          {selected.findings.length === 0 ? (
            <p className="mt-3 text-sm text-warm-dim">
              Findings land here once the assessment is delivered.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-edge/40">
              {selected.findings.map((f) => (
                <li key={f.id} className="py-4 first:pt-0 last:pb-0">
                  <LanePill lane={f.lane} />
                  <p className="mt-2 text-sm font-medium text-warm-white">{f.finding}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-warm-mist">
                    <span className="text-warm-dim">Recommendation: </span>
                    {f.recommendation}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </OsCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Assessments"
        description="The listening instrument. Each assessment maps an operation into keep, connect, automate, build, and secure — open one to see the full detail."
      />
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {state.assessments.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => setSelectedId(a.id)}
              className="w-full text-left"
            >
              <OsCard className="h-full transition-colors hover:border-cyan-core/50">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-medium text-warm-white">{a.subject}</h2>
                  <StatusPill value={a.status} />
                </div>
                <p className="mt-1 text-xs text-warm-dim">Conducted {a.conductedOn}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-warm-mist">
                  {a.problem}
                </p>
                <p className="mt-3 text-xs text-cyan-soft">
                  {a.findings.length > 0
                    ? `${a.findings.length} findings — open detail`
                    : "In progress — open detail"}
                </p>
              </OsCard>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
