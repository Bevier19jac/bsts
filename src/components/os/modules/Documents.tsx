"use client";

import { FileText } from "lucide-react";
import { useOs } from "@/lib/os/store";
import { ModuleHeader, OsCard, StatusPill } from "@/components/os/ui";

export function Documents() {
  const { state } = useOs();

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Documents"
        description="The paper trail of an honest engagement — assessments, statements of work, policies, and architecture notes, written as the work happens."
      />
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {state.documents.map((d) => (
          <li key={d.id}>
            <OsCard className="h-full">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-cyan-core" aria-hidden />
                  <div>
                    <h2 className="font-medium text-warm-white">{d.title}</h2>
                    <p className="mt-0.5 text-xs text-warm-dim">
                      {d.kind} · updated {d.updatedOn}
                    </p>
                  </div>
                </div>
                <StatusPill value={d.status} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-warm-mist">{d.note}</p>
            </OsCard>
          </li>
        ))}
      </ul>
      <p className="text-xs leading-relaxed text-warm-dim">
        In the demo, documents are records rather than files — no downloads
        here. In a live engagement each row links to the source document in
        the client&apos;s own storage.
      </p>
    </div>
  );
}
