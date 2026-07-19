import type { Metadata } from "next";
import { Documents } from "@/components/os/modules/Documents";

export const metadata: Metadata = { title: "Documents" };

export default function Page() {
  return <Documents />;
}
