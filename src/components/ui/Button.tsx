import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-cyan-core";

const styles = {
  primary:
    "bg-cyan-core text-obsidian-deep hover:bg-cyan-soft border border-transparent",
  ghost:
    "border border-edge text-warm-white hover:border-cyan-core/60 hover:text-cyan-soft bg-transparent",
  gold: "border border-gold-core/50 text-gold-soft hover:bg-gold-faint bg-transparent",
} as const;

export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={`${base} ${styles[variant]} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
