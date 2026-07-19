import type { Metadata } from "next";
import { OsShell } from "@/components/os/OsShell";

export const metadata: Metadata = {
  title: {
    default: "BSTS OS — Demo",
    template: "%s — BSTS OS Demo",
  },
  description:
    "Interactive demonstration of BSTS OS — the workspace behind every BSTS engagement. Fictional data only; state lives in your browser's memory.",
  robots: { index: true, follow: true },
};

export default function OsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <OsShell>{children}</OsShell>;
}
