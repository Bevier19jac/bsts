import type { Metadata } from "next";
import { Projects } from "@/components/os/modules/Projects";

export const metadata: Metadata = { title: "Projects" };

export default function Page() {
  return <Projects />;
}
