"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { demoId, useOs } from "@/lib/os/store";
import { lanes, type RoadmapItem } from "@/lib/os/types";
import { LanePill, ModuleHeader, OsCard, osSelectClass } from "@/components/os/ui";

const priorities = ["Now", "Next", "Later"] as const;
const efforts = ["S", "M", "L"] as const;

export function Roadmaps() {
  const { state, dispatch } = useOs();
  const client = state.clients[0];
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [lane, setLane] = useState<RoadmapItem["lane"]>("Connect");
  const [priority, setPriority] = useState<RoadmapItem["priority"]>("Next");
  const [effort, setEffort] = useState<RoadmapItem["effort"]>("M");
  const [rationale, setRationale] = useState("");
  const [error, setError] = useState("");

  function addItem() {
    if (title.trim().length < 4) {
      setError("Give the recommendation a title of at least 4 characters.");
      return;
    }
    dispatch({
      type: "roadmap/add",
      item: {
        id: demoId("rm"),
        clientId: client?.id ?? "cl-solara",
        title: title.trim(),
        lane,
        priority,
        effort,
        rationale: rationale.trim() || "Added in demo session.",
      },
    });
    setTitle("");
    setRationale("");
    setError("");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Roadmaps"
        description={`Prioritized recommendations for ${client?.name ?? "the demo client"} — every item carries its lane, effort, and the reason it exists.`}
      >
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="btn-primary-form"
          aria-expanded={showForm}
        >
          <Plus className="h-4 w-4" aria-hidden />
          Add recommendation
        </button>
      </ModuleHeader>

      {showForm ? (
        <OsCard>
          <h2 className="text-sm font-semibold text-warm-white">
            New demo recommendation
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="rm-title" className="text-xs text-warm-dim">
                Title
              </label>
              <input
                id="rm-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-edge bg-obsidian px-4 py-2.5 text-sm text-warm-white focus:border-cyan-core/70 focus:outline-none"
                placeholder="e.g. Import preference spreadsheet into unified record"
              />
              {error ? (
                <p role="alert" className="mt-1.5 text-xs text-alert">
                  {error}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-xs text-warm-dim">
                Lane
                <select
                  value={lane}
                  onChange={(e) => setLane(e.target.value as RoadmapItem["lane"])}
                  className={osSelectClass}
                >
                  {lanes.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 text-xs text-warm-dim">
                Priority
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as RoadmapItem["priority"])}
                  className={osSelectClass}
                >
                  {priorities.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 text-xs text-warm-dim">
                Effort
                <select
                  value={effort}
                  onChange={(e) => setEffort(e.target.value as RoadmapItem["effort"])}
                  className={osSelectClass}
                >
                  {efforts.map((ef) => (
                    <option key={ef}>{ef}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="rm-rationale" className="text-xs text-warm-dim">
                Rationale (optional)
              </label>
              <textarea
                id="rm-rationale"
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                rows={2}
                className="mt-1.5 w-full rounded-2xl border border-edge bg-obsidian px-4 py-2.5 text-sm text-warm-white focus:border-cyan-core/70 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={addItem} className="btn-primary-form">
                Add to roadmap
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-ghost-form"
              >
                Cancel
              </button>
            </div>
          </div>
        </OsCard>
      ) : null}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {priorities.map((p) => {
          const items = state.roadmapItems.filter((i) => i.priority === p);
          return (
            <section key={p} aria-labelledby={`col-${p}`}>
              <h2
                id={`col-${p}`}
                className="px-1 text-xs font-semibold tracking-[0.16em] text-warm-dim uppercase"
              >
                {p} · {items.length}
              </h2>
              <ul className="mt-3 space-y-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <OsCard>
                      <div className="flex items-center justify-between gap-3">
                        <LanePill lane={item.lane} />
                        <span className="text-[0.65rem] text-warm-dim">
                          Effort {item.effort}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm font-medium text-warm-white">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-warm-dim">
                        {item.rationale}
                      </p>
                    </OsCard>
                  </li>
                ))}
                {items.length === 0 ? (
                  <li className="rounded-[1.4rem] border border-dashed border-edge p-6 text-center text-xs text-warm-dim">
                    Nothing in {p.toLowerCase()} yet.
                  </li>
                ) : null}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
