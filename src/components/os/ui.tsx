"use client";

import type { ReactNode } from "react";

/** Shared visual atoms for BSTS OS modules. */

export function ModuleHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="display text-2xl text-warm-white">{title}</h1>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-warm-dim">
          {description}
        </p>
      </div>
      {children ? <div className="flex flex-wrap gap-3">{children}</div> : null}
    </header>
  );
}

export function OsCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`os-card rounded-[1.4rem] border border-edge/60 bg-graphite/70 ${className}`}
    >
      {children}
    </div>
  );
}

const toneByValue: Record<string, string> = {
  // stages
  Lead: "text-warm-mist border-edge",
  Conversation: "text-cyan-soft border-cyan-core/40",
  Assessment: "text-cyan-soft border-cyan-core/40",
  Proposal: "text-gold-soft border-gold-core/40",
  Won: "text-ok border-ok/40",
  Passed: "text-warm-dim border-edge",
  // project statuses
  Discovery: "text-warm-mist border-edge",
  Active: "text-cyan-soft border-cyan-core/40",
  "In review": "text-gold-soft border-gold-core/40",
  Paused: "text-warm-dim border-edge",
  Done: "text-ok border-ok/40",
  // risk
  Low: "text-ok border-ok/40",
  Medium: "text-warn border-warn/40",
  High: "text-alert border-alert/40",
  Open: "text-alert border-alert/40",
  Mitigating: "text-warn border-warn/40",
  Accepted: "text-warm-mist border-edge",
  Closed: "text-ok border-ok/40",
  // automations
  Running: "text-ok border-ok/40",
  Draft: "text-warm-dim border-edge",
  // documents
  Final: "text-ok border-ok/40",
  // decisions
  Proposed: "text-cyan-soft border-cyan-core/40",
  Superseded: "text-warm-dim border-edge",
  // assessments / clients
  "In progress": "text-cyan-soft border-cyan-core/40",
  Delivered: "text-ok border-ok/40",
  "Active engagement": "text-cyan-soft border-cyan-core/40",
  Stewardship: "text-gold-soft border-gold-core/40",
  Wrapped: "text-warm-dim border-edge",
};

export function StatusPill({ value }: { value: string }) {
  const tone = toneByValue[value] ?? "text-warm-mist border-edge";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.68rem] font-medium tracking-wide whitespace-nowrap ${tone}`}
    >
      {value}
    </span>
  );
}

export function LanePill({ lane }: { lane: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-cyan-faint px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.1em] text-cyan-soft uppercase">
      {lane}
    </span>
  );
}

export const osSelectClass =
  "rounded-full border border-edge bg-obsidian px-3 py-1.5 text-xs text-warm-white focus:border-cyan-core/70 focus:outline-none";

export function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
        active
          ? "border-cyan-core/60 bg-cyan-faint text-cyan-soft"
          : "border-edge text-warm-mist hover:text-warm-white"
      }`}
    >
      {children}
    </button>
  );
}
