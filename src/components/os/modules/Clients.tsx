"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useOs } from "@/lib/os/store";
import { ModuleHeader, OsCard, StatusPill } from "@/components/os/ui";

export function Clients() {
  const { state } = useOs();

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Clients"
        description="Won engagements and what is live for each — the summary an owner should be able to read in thirty seconds."
      />

      <ul className="grid grid-cols-1 gap-4">
        {state.clients.map((c) => {
          const projects = state.projects.filter((p) => p.clientId === c.id);
          const roadmap = state.roadmapItems.filter((r) => r.clientId === c.id);
          return (
            <li key={c.id}>
              <OsCard>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-medium text-warm-white">{c.name}</h2>
                    <p className="mt-0.5 text-xs text-warm-dim">
                      {c.industry} · client since {c.since}
                    </p>
                  </div>
                  <StatusPill value={c.status} />
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-mist">
                  {c.summary}
                </p>
                <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-edge/40 pt-4 text-sm">
                  <div>
                    <dt className="text-xs text-warm-dim">Projects</dt>
                    <dd className="text-warm-white">{projects.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-warm-dim">Roadmap items</dt>
                    <dd className="text-warm-white">{roadmap.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-warm-dim">Open tasks</dt>
                    <dd className="text-warm-white">
                      {projects.reduce(
                        (n, p) => n + p.tasks.filter((t) => !t.done).length,
                        0,
                      )}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  <Link href="/os/projects" className="inline-flex items-center gap-1.5 text-cyan-soft">
                    View projects <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                  <Link href="/os/roadmaps" className="inline-flex items-center gap-1.5 text-cyan-soft">
                    View roadmap <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </OsCard>
            </li>
          );
        })}
      </ul>

      <p className="text-xs leading-relaxed text-warm-dim">
        One client is deliberate: BSTS OS demonstrates a focused practice, and
        Solara House (fictional) carries the full engagement story — assessment
        → roadmap → projects → decisions.
      </p>
    </div>
  );
}
