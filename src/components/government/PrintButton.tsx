"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-primary-form">
      <Printer className="h-4 w-4" aria-hidden />
      Print / Save as PDF
    </button>
  );
}
