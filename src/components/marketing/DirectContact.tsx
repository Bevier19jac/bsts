"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "4a21a788-0e18-450a-a32a-5b3cae2c8986";

/**
 * A low-friction "just talk to a person" path for buyers who don't want to
 * run the full assessment. Sends through the same Web3Forms endpoint.
 */
export function DirectContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function send() {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Direct note from ${name}`,
          from_name: name,
          email,
          message,
        }),
      });
      const j = (await res.json()) as { success?: boolean };
      setState(j.success ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="surface rounded-[2rem] p-7 sm:p-9">
      {state === "sent" ? (
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-cyan-core/50 bg-cyan-faint">
            <Check className="h-6 w-6 text-cyan-core" aria-hidden />
          </div>
          <h3 className="display mt-4 text-xl text-warm-white">Got it — talk soon.</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-warm-mist">
            Your note is on its way to BSTS. Jacob will reply personally, usually within one
            business day.
          </p>
        </div>
      ) : (
        <>
          <h3 className="display text-xl text-warm-white">Prefer to just talk to a person?</h3>
          <p className="mt-2 text-sm leading-relaxed text-warm-mist">
            Skip the assessment and send a note — it goes straight to the founder. No sales team,
            no bots.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              autoComplete="email"
              className="rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none"
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            rows={3}
            className="mt-3 w-full resize-none rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={send}
              disabled={state === "sending" || !name.trim() || !email.trim() || !message.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-core px-6 py-3 text-sm font-semibold text-obsidian-deep transition-colors hover:bg-cyan-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden />
              {state === "sending" ? "Sending…" : "Send a note"}
            </button>
            {state === "error" ? (
              <span className="text-sm text-alert" role="alert">
                Something went wrong — please try again.
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
