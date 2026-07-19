import type { Metadata } from "next";
import { Prospects } from "@/components/os/modules/Prospects";

export const metadata: Metadata = { title: "Prospects" };

export default function Page() {
  return <Prospects />;
}
