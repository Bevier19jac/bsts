import type { Metadata } from "next";
import Link from "next/link";
import { StartRedirect } from "./redirect";

/**
 * QR landing route. The brochures' QR codes encode
 * https://bevierstrategic.pages.dev/start — a short, stable address that
 * forwards into the discovery assessment. Keeping it as its own route means
 * a future custom domain or a different landing experience only changes
 * this file, never the printed codes.
 *
 * noindex: this is a forwarding page, not content — search engines should
 * only ever index the destination.
 */
export const metadata: Metadata = {
  title: "Start a discovery conversation",
  robots: { index: false, follow: false },
};

export default function StartPage() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <StartRedirect />
      <p className="text-warm-mist">Taking you to the discovery assessment…</p>
      <p className="mt-4 text-sm text-warm-dim">
        Not redirected?{" "}
        <Link
          href="/#assessment"
          className="text-cyan-soft underline underline-offset-4"
        >
          Start the assessment
        </Link>
        .
      </p>
    </main>
  );
}
