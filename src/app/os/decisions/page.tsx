import type { Metadata } from "next";
import { Decisions } from "@/components/os/modules/Decisions";

export const metadata: Metadata = { title: "Decisions" };

export default function Page() {
  return <Decisions />;
}
