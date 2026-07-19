import type { Metadata } from "next";
import { Automations } from "@/components/os/modules/Automations";

export const metadata: Metadata = { title: "Automations" };

export default function Page() {
  return <Automations />;
}
