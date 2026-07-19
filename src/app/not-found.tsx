import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Atmosphere } from "@/components/ui/Atmosphere";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative isolate overflow-hidden pt-24">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center">
          <Compass className="h-10 w-10 text-cyan-core" aria-hidden />
          <p className="eyebrow mt-6">404 — Not found</p>
          <h1 className="display mt-4 text-4xl text-warm-white sm:text-5xl">
            This page is one of the disconnected things.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-warm-mist">
            Connecting what is disconnected is our whole job — but this address
            leads nowhere. Let us route you somewhere real.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-core px-6 py-3 text-sm font-medium text-obsidian-deep transition-colors hover:bg-cyan-soft"
            >
              Back to the homepage <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3 text-sm text-warm-white transition-colors hover:border-cyan-core/60 hover:text-cyan-soft"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
