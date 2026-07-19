"use client";

import { useRef, useState } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";
import { useOs } from "@/lib/os/store";
import { FilterButton, ModuleHeader, OsCard } from "@/components/os/ui";

export function SettingsModule() {
  const { state, dispatch, exportJson, importJson } = useOs();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<{
    kind: "ok" | "error";
    text: string;
  } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  async function onFileChosen(file: File | undefined) {
    if (!file) return;
    const raw = await file.text();
    const result = importJson(raw);
    setImportMessage(
      result.ok
        ? { kind: "ok", text: "Demo state imported and validated." }
        : { kind: "error", text: result.error },
    );
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Settings"
        description="Interface preferences and demo-state management. Everything here operates on fictional data held in this browser tab's memory."
      />

      <OsCard>
        <h2 className="text-sm font-semibold text-warm-white">Interface density</h2>
        <p className="mt-1 text-xs text-warm-dim">
          Compact tightens cards for smaller screens and denser review sessions.
        </p>
        <div className="mt-4 flex gap-2" role="group" aria-label="Interface density">
          {(["Comfortable", "Compact"] as const).map((d) => (
            <FilterButton
              key={d}
              active={state.settings.density === d}
              onClick={() => dispatch({ type: "settings/density", density: d })}
            >
              {d}
            </FilterButton>
          ))}
        </div>
      </OsCard>

      <OsCard>
        <h2 className="text-sm font-semibold text-warm-white">Demo state</h2>
        <p className="mt-1 max-w-xl text-xs leading-relaxed text-warm-dim">
          Export downloads the entire demo workspace as JSON. Import validates
          a previously exported file against the OS schema before loading it —
          invalid files are rejected with a reason. Reset restores the original
          Solara House seed data.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={exportJson} className="btn-primary-form">
            <Download className="h-4 w-4" aria-hidden />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="btn-ghost-form"
          >
            <Upload className="h-4 w-4" aria-hidden />
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            aria-label="Choose a BSTS OS demo-state JSON file"
            onChange={(e) => onFileChosen(e.target.files?.[0])}
          />
          {confirmReset ? (
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "reset" });
                  setConfirmReset(false);
                  setImportMessage({ kind: "ok", text: "Demo data reset to the original seed." });
                }}
                className="btn-ghost-form border-alert/50 text-alert"
              >
                Confirm reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="btn-ghost-form"
              >
                Keep current state
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="btn-ghost-form"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reset demo data
            </button>
          )}
        </div>
        {importMessage ? (
          <p
            role="status"
            className={`mt-4 text-sm ${importMessage.kind === "ok" ? "text-ok" : "text-alert"}`}
          >
            {importMessage.text}
          </p>
        ) : null}
      </OsCard>

      <OsCard>
        <h2 className="text-sm font-semibold text-warm-white">About this demonstration</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-warm-mist">
          <li>· All people, companies, and records are fictional; Solara House is an invented property.</li>
          <li>· Nothing you do here is transmitted anywhere — state lives in this tab&apos;s memory and is gone when you close it.</li>
          <li>· A production BSTS OS deployment adds authentication, a real database, role-based access, and audit logging — deliberately absent from a public demo.</li>
        </ul>
      </OsCard>
    </div>
  );
}
