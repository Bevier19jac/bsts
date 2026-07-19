/**
 * Atmospheric background layer — soft drifting glow fields on obsidian.
 * Pure CSS animation (disabled automatically under reduced motion).
 * Server component; zero JS cost.
 */
export function Atmosphere({ variant = "default" }: { variant?: "default" | "gold" | "quiet" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`glow-cyan animate-drift absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full ${
          variant === "quiet" ? "opacity-40" : "opacity-70"
        }`}
      />
      <div
        className={`${variant === "gold" ? "glow-gold" : "glow-cyan"} animate-drift-slow absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full opacity-50`}
      />
      <div className="glow-gold animate-drift absolute -bottom-52 left-1/4 h-[30rem] w-[30rem] rounded-full opacity-40" />
    </div>
  );
}
