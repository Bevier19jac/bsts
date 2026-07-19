import type { ReactNode } from "react";

type Blob = "a" | "b" | "c" | "round";

/**
 * Rounded organic surface primitive — layered translucent panel with
 * asymmetric radii so the layout never reads as a wall of rectangles.
 */
export function Surface({
  children,
  blob = "round",
  quiet = false,
  className = "",
}: {
  children: ReactNode;
  blob?: Blob;
  quiet?: boolean;
  className?: string;
}) {
  const radius = blob === "round" ? "rounded-[2rem]" : `blob-${blob}`;
  return (
    <div className={`${quiet ? "surface-quiet" : "surface"} ${radius} ${className}`}>
      {children}
    </div>
  );
}
