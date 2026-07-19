import type { Metadata } from "next";
import { Assessments } from "@/components/os/modules/Assessments";

export const metadata: Metadata = { title: "Assessments" };

export default function Page() {
  return <Assessments />;
}
