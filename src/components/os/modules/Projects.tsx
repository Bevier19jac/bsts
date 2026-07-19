"use client";

import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { demoId, useOs } from "@/lib/os/store";
import { projectStatuses, type Project } from "@/lib/os/types";
import {
  FilterButton,
  LanePill,
  ModuleHeader,
  OsCard,
  StatusPill,
  osSelectClass,
} from "@/components/os/ui";

export function Projects() {
  const { state, dispatch } = useOs();
  const [statusFilter, setStatusFilter] = useState<"All" | Project["status"]>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");
  const [taskError, setTaskError] = useState("");

  const selected = state.projects.find((p) => p.id === selectedId);

  if (selected) {
    const done = selected.tasks.filter((t) => t.done).length;
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex items-center gap-2 text-sm text-warm-dim transition-colors hover:text-cyan-soft"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All projects
        </button>

        <ModuleHeader title={selected.name} description={selected.description}>
          <LanePill lane={selected.lane} />
          <label className="flex items-center gap-2 text-xs text-warm-dim">
            Status
            <select
              value={selected.status}
              onChange={(e) =>
                dispatch({
                  type: "project/status",
                  id: selected.id,
                  status: e.target.value as Project["status"],
                })
              }
              className={osSelectClass}
            >
              {projectStatuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </ModuleHeader>

        <OsCard>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-warm-dim uppercase">
              Tasks · {done}/{selected.tasks.length} complete
            </h2>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={selected.tasks.length}
            aria-valuenow={done}
            aria-label="Task completion"
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-edge/60"
          >
            <div
              className="h-full rounded-full bg-cyan-core transition-all"
              style={{
                width: `${selected.tasks.length ? (done / selected.tasks.length) * 100 : 0}%`,
              }}
            />
          </div>
          <ul className="mt-4 divide-y divide-edge/40">
            {selected.tasks.map((t) => (
              <li key={t.id} className="py-2.5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() =>
                      dispatch({
                        type: "project/toggleTask",
                        projectId: selected.id,
                        taskId: t.id,
                      })
                    }
                    className="mt-0.5 h-4 w-4 accent-[#63c7c2]"
                  />
                  <span
                    className={`text-sm leading-relaxed ${
                      t.done ? "text-warm-dim line-through" : "text-warm-mist"
                    }`}
                  >
                    {t.title}
                  </span>
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-edge/40 pt-4">
            <label htmlFor="new-task" className="text-xs text-warm-dim">
              Add a demo task
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="new-task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTask();
                  }
                }}
                placeholder="e.g. Walk night team through the review queue"
                className="w-full rounded-full border border-edge bg-obsidian px-4 py-2 text-sm text-warm-white placeholder:text-warm-dim/60 focus:border-cyan-core/70 focus:outline-none"
              />
              <button type="button" onClick={addTask} className="btn-primary-form shrink-0">
                <Plus className="h-4 w-4" aria-hidden />
                Add
              </button>
            </div>
            {taskError ? (
              <p role="alert" className="mt-2 text-xs text-alert">
                {taskError}
              </p>
            ) : null}
          </div>
        </OsCard>
      </div>
    );

    function addTask() {
      if (newTask.trim().length < 4) {
        setTaskError("Tasks need at least 4 characters.");
        return;
      }
      dispatch({
        type: "project/addTask",
        projectId: selected!.id,
        task: { id: demoId("t"), title: newTask.trim(), done: false },
      });
      setNewTask("");
      setTaskError("");
    }
  }

  const visible =
    statusFilter === "All"
      ? state.projects
      : state.projects.filter((p) => p.status === statusFilter);

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Projects"
        description="Short delivery cycles, each independently valuable. Open a project to work its task list."
      />

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by status">
        <FilterButton active={statusFilter === "All"} onClick={() => setStatusFilter("All")}>
          All ({state.projects.length})
        </FilterButton>
        {projectStatuses.map((s) => (
          <FilterButton key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
            {s}
          </FilterButton>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visible.map((p) => {
          const done = p.tasks.filter((t) => t.done).length;
          return (
            <li key={p.id}>
              <button type="button" onClick={() => setSelectedId(p.id)} className="w-full text-left">
                <OsCard className="h-full transition-colors hover:border-cyan-core/50">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-medium text-warm-white">{p.name}</h2>
                    <StatusPill value={p.status} />
                  </div>
                  <p className="mt-1 text-xs text-warm-dim">
                    <LanePill lane={p.lane} />
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-warm-mist">
                    {p.description}
                  </p>
                  <p className="mt-3 text-xs text-cyan-soft">
                    {done}/{p.tasks.length} tasks — open detail
                  </p>
                </OsCard>
              </button>
            </li>
          );
        })}
        {visible.length === 0 ? (
          <li className="rounded-[1.4rem] border border-dashed border-edge p-8 text-center text-sm text-warm-dim lg:col-span-2">
            No projects with this status.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
