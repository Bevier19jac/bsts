/**
 * Organic curved transition between page sections.
 * Decorative only — hidden from assistive technology.
 */
export function CurveDivider({
  flip = false,
  tone = "graphite",
}: {
  flip?: boolean;
  tone?: "graphite" | "obsidian";
}) {
  const fill = tone === "graphite" ? "var(--color-graphite)" : "var(--color-obsidian)";
  return (
    <svg
      aria-hidden="true"
      className={`curve-divider ${flip ? "rotate-180" : ""}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,64 C240,110 480,14 720,44 C960,74 1200,118 1440,58 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  );
}
