import type { Metadata } from "next";
import { Roadmaps } from "@/components/os/modules/Roadmaps";

export const metadata: Metadata = { title: "Roadmaps" };

export default function Page() {
  return <Roadmaps />;
}
