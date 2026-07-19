"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useOs } from "@/lib/os/store";
import { LanePill, ModuleHeader, OsCard, StatusPill } from "@/components/os/ui";

export function Overview() {
  const { state } = useOs();

  const openRisks = state.risks.filter((r) => r.status === "Open" || r.status === "Mitigating");
  const activeProjects = state.projects.filter((p) => p.status !== "Done");
  const pipeline = state.prospects.filter((p) => p.stage !== "Won" && p.stage !== "Passed");
  const running = state.automations.filter((a) => a.status === "Running");

  const stats = [
    { label: "Open pipeline", value: pipeline.length, href: "/os/prospects" },
    { label: "Active clients", value: state.clients.length, href: "/os/clients" },
    { label: "Projects in motion", value: activeProjects.length, href: "/os/projects" },
    { label: "Open risks", value: openRisks.length, href: "/os/risks" },
    { label: "Automations running", value: running.length, href: "/os/automations" },
    { label: "Decisions on record", value: state.decisions.length, href: "/os/decisions" },
  ];

  return (
    <div className="space-y-8">
      <ModuleHeader
        title="Overview"
        description="The whole practice at a glance — pipeline, delivery, risk, and the records that keep an engagement honest."
      />

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <li key={s.label}>
            <Link href={s.href} className="block">
              <OsCard className="transition-colors hover:border-cyan-core/50">
                <p className="display text-3xl text-cyan-soft">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-warm-dim">{s.label}</p>
              </OsCard>
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OsCard>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-warm-dim uppercase">
              Projects in motion
            </h2>
            <Link href="/os/projects" className="inline-flex items-center gap-1.5 text-xs text-cyan-soft">
              All projects <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-edge/40">
            {activeProjects.map((p) => {
              const done = p.tasks.filter((t) => t.done).length;
              return (
                <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-warm-white">{p.name}</p>
                    <p className="mt-0.5 text-xs text-warm-dim">
                      {done}/{p.tasks.length} tasks · <LanePill lane={p.lane} />
                    </p>
                  </div>
                  <StatusPill value={p.status} />
                </li>
              );
            })}
          </ul>
        </OsCard>

        <OsCard>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-warm-dim uppercase">
              Risk watchlist
            </h2>
            <Link href="/os/risks" className="inline-flex items-center gap-1.5 text-xs text-cyan-soft">
              All risks <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-edge/40">
            {openRisks.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-4 py-3">
                <p className="min-w-0 truncate text-sm text-warm-mist">{r.title}</p>
                <div className="flex shrink-0 gap-2">
                  <StatusPill value={r.severity} />
                  <StatusPill value={r.status} />
                </div>
              </li>
            ))}
          </ul>
        </OsCard>
      </div>

      <OsCard>
        <h2 className="text-sm font-semibold tracking-[0.14em] text-warm-dim uppercase">
          Pipeline glance
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {state.prospects.map((p) => (
            <li key={p.id} className="rounded-2xl border border-edge/50 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-warm-white">{p.name}</p>
                <StatusPill value={p.stage} />
              </div>
              <p className="mt-1.5 text-xs text-warm-dim">{p.industry}</p>
            </li>
          ))}
        </ul>
      </OsCard>
    </div>
  );
}
