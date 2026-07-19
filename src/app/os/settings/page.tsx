import type { Metadata } from "next";
import { SettingsModule } from "@/components/os/modules/SettingsModule";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return <SettingsModule />;
}
