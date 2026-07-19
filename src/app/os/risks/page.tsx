import type { Metadata } from "next";
import { Risks } from "@/components/os/modules/Risks";

export const metadata: Metadata = { title: "Risks" };

export default function Page() {
  return <Risks />;
}
