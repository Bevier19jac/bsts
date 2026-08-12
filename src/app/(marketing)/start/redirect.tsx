"use client";

import { useEffect } from "react";

/**
 * /start is the printed QR destination. It forwards straight into the
 * assessment tab on the landing page. location.replace keeps the redirect
 * out of history, so Back from the assessment does not bounce through
 * this page again.
 */
export function StartRedirect() {
  useEffect(() => {
    window.location.replace("/#assessment");
  }, []);
  return null;
}
