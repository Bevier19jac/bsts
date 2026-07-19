import type { Metadata } from "next";
import { Clients } from "@/components/os/modules/Clients";

export const metadata: Metadata = { title: "Clients" };

export default function Page() {
  return <Clients />;
}
