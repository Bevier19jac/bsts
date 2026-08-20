"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { discoveryReasons, sensitiveDataNotice, site } from "@/lib/site";

/**
 * Discovery-conversation form.
 *
 * Uses the same Web3Forms delivery path already configured for the rest of
 * the site — no second provider, no new dependency. The access key is a
 * public, submit-only identifier by design and is the same one the
 * assessment and federal forms use.
 *
 * Nothing is transmitted until the visitor presses Send. There is no
 * scheduling integration, so this form is the secure alternative rather
 * than a calendar link that does not exist.
 */
const formKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "4a21a788-0e18-450a-a32a-5b3cae2c8986";

const field =
  "w-full rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-core";

const labelClass = "text-sm font-medium text-warm-mist";

type State = "idle" | "sending" | "sent" | "error";

export function DiscoveryForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    reason: discoveryReasons[0],
    note: "",
  });
  const [state, setState] = useState<State>("idle");
  const [problem, setProblem] = useState("");

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return fail("Please add your name.");
    if (!form.company.trim()) return fail("Please add your company or organization.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return fail("Please add a valid email address.");

    setProblem("");
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: formKey,
          subject: `Discovery conversation — ${form.company}`,
          from_name: form.name,
          email: form.email,
          message: [
            `Name: ${form.name}`,
            `Company: ${form.company}`,
            `Email: ${form.email}`,
            `Reason: ${form.reason}`,
            "",
            "NOTE",
            form.note || "(none)",
          ].join("\n"),
          botcheck: false,
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      setState(res.ok && json.success ? "sent" : "error");
      if (!(res.ok && json.success)) setProblem("That didn't go through.");
    } catch {
      setState("error");
      setProblem("That didn't go through.");
    }
  }

  function fail(msg: string) {
    setProblem(msg);
    setState("error");
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="surface rounded-[2rem] border-cyan-core/40 p-8 text-center sm:p-10"
      >
        <Check className="mx-auto h-8 w-8 text-cyan-core" aria-hidden />
        <h2 className="display mt-4 text-2xl text-warm-white">Received.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-warm-mist">
          {site.responsePromise} You&apos;ll get a reply from Jacob directly —
          including an honest answer if BSTS is the wrong fit for what you
          described.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="surface rounded-[2rem] p-6 sm:p-9" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="df-name">
            Name
          </label>
          <input
            id="df-name"
            className={`${field} mt-1.5`}
            value={form.name}
            autoComplete="name"
            onChange={(e) => set("name")(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="df-company">
            Company or organization
          </label>
          <input
            id="df-company"
            className={`${field} mt-1.5`}
            value={form.company}
            autoComplete="organization"
            onChange={(e) => set("company")(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="df-email">
          Company email
        </label>
        <input
          id="df-email"
          type="email"
          className={`${field} mt-1.5`}
          value={form.email}
          autoComplete="email"
          onChange={(e) => set("email")(e.target.value)}
        />
      </div>

      <fieldset className="mt-6">
        <legend className={labelClass}>What is this about?</legend>
        <div className="mt-2.5 space-y-2">
          {discoveryReasons.map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-sm leading-relaxed transition-colors ${
                form.reason === r
                  ? "border-cyan-core/60 bg-cyan-faint text-warm-white"
                  : "border-edge text-warm-mist hover:border-cyan-core/40"
              }`}
            >
              <input
                type="radio"
                name="df-reason"
                value={r}
                checked={form.reason === r}
                onChange={() => set("reason")(r)}
                className="mt-1 h-4 w-4 accent-[#3ec8c0]"
              />
              {r}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label className={labelClass} htmlFor="df-note">
          Anything you want to add{" "}
          <span className="text-warm-dim">(optional)</span>
        </label>
        <textarea
          id="df-note"
          className={`${field} mt-1.5 min-h-[6rem]`}
          value={form.note}
          onChange={(e) => set("note")(e.target.value)}
          placeholder="Plain language is fine. A sentence or two about what prompted this."
        />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-gold-soft">
        {sensitiveDataNotice}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-primary-form px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {state === "sending" ? "Sending…" : "Send"}
        </button>
        <span className="text-xs text-warm-dim">
          Nothing is sent until you press Send.
        </span>
      </div>

      {problem ? (
        <p role="alert" className="mt-4 text-sm text-alert">
          {problem} Please try again, or email{" "}
          <a
            className="underline underline-offset-4"
            href={`mailto:${site.contactEmail}`}
          >
            {site.contactEmail}
          </a>{" "}
          directly.
        </p>
      ) : null}
    </form>
  );
}
