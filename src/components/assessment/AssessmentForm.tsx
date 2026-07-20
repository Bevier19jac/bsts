"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCopy,
  Download,
  Mail,
  Send,
} from "lucide-react";
import {
  assessmentSchema,
  budgetOptions,
  formatSummary,
  industryOptions,
  steps,
  timelineOptions,
  type AssessmentData,
} from "@/lib/assessment";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

/**
 * Web3Forms access key. This is a public, client-side key (it only identifies
 * which inbox receives submissions — it cannot read mail or data).
 */
const WEB3FORMS_ACCESS_KEY = "4a21a788-0e18-450a-a32a-5b3cae2c8986";
const canSubmit = WEB3FORMS_ACCESS_KEY.length > 10 && !WEB3FORMS_ACCESS_KEY.startsWith("__");

const inputClass =
  "w-full rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-core";

export function AssessmentForm() {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [sendState, setSendState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<AssessmentData>({
    resolver: zodResolver(assessmentSchema),
    mode: "onTouched",
    defaultValues: { budget: "Prefer not to say yet", website: "" },
  });

  const isReview = step === steps.length - 1;

  // Recomputed whenever the step changes; answers are frozen while on review
  // (editing requires going back, which changes `step` and re-renders).
  let summary = "";
  if (isReview) {
    try {
      summary = formatSummary(getValues());
    } catch {
      summary = "";
    }
  }

  async function next() {
    const valid = await trigger(steps[step].fields, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function copySummary() {
    const ok = await trigger();
    if (!ok) return;
    try {
      await navigator.clipboard.writeText(formatSummary(getValues()));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable (permissions); the textarea below remains selectable.
    }
  }

  async function downloadJson() {
    const ok = await trigger();
    if (!ok) return;
    const data = getValues();
    const blob = new Blob(
      [JSON.stringify({ kind: "bsts-assessment", version: 1, data }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bsts-technology-assessment.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function submitToBsts() {
    const ok = await trigger();
    if (!ok) return;
    const data = getValues();
    setSendState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Technology assessment — ${data.organization}`,
          from_name: data.name,
          email: data.email,
          message: formatSummary(data),
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      setSendState(json.success ? "sent" : "error");
    } catch {
      setSendState("error");
    }
  }

  async function openMailto() {
    const ok = await trigger();
    if (!ok) return;
    const data = getValues();
    const subject = encodeURIComponent(
      `Technology assessment — ${data.organization}`,
    );
    const body = encodeURIComponent(formatSummary(data));
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="surface rounded-[2rem] p-6 sm:p-9">
      {/* Progress indicator */}
      <ol className="flex items-center gap-2" aria-label="Assessment progress">
        {steps.map((s, i) => {
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <li key={s.title} className="flex flex-1 flex-col gap-2">
              <span
                className={`h-1.5 rounded-full transition-colors ${
                  state === "done"
                    ? "bg-cyan-core"
                    : state === "current"
                      ? "bg-cyan-core/60"
                      : "bg-edge"
                }`}
              />
              <span
                className={`hidden text-[0.65rem] tracking-wide uppercase sm:block ${
                  state === "current" ? "text-cyan-soft" : "text-warm-dim"
                }`}
                aria-current={state === "current" ? "step" : undefined}
              >
                {i + 1}. {s.title}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm text-warm-dim sm:hidden" aria-live="polite">
        Step {step + 1} of {steps.length}: {steps[step].title}
      </p>

      <form noValidate onSubmit={(e) => e.preventDefault()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.fieldset
            key={step}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22 }}
            className="mt-7"
          >
            <legend className="sr-only">{steps[step].title}</legend>
            <h2 className="display text-xl text-warm-white">{steps[step].title}</h2>
            <p className="mt-1 text-sm text-warm-dim">{steps[step].description}</p>

            {step === 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-5">
                <Field label="Your name" error={errors.name?.message} id="name">
                  <input
                    id="name"
                    autoComplete="name"
                    className={inputClass}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                </Field>
                <Field label="Email" error={errors.email?.message} id="email">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                </Field>
                <Field
                  label="Organization"
                  error={errors.organization?.message}
                  id="organization"
                >
                  <input
                    id="organization"
                    autoComplete="organization"
                    className={inputClass}
                    aria-invalid={!!errors.organization}
                    aria-describedby={
                      errors.organization ? "organization-error" : undefined
                    }
                    {...register("organization")}
                  />
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="mt-6 grid grid-cols-1 gap-5">
                <Field label="Industry" error={errors.industry?.message} id="industry">
                  <select
                    id="industry"
                    className={inputClass}
                    aria-invalid={!!errors.industry}
                    aria-describedby={errors.industry ? "industry-error" : undefined}
                    defaultValue=""
                    {...register("industry")}
                  >
                    <option value="" disabled>
                      Choose the closest fit…
                    </option>
                    {industryOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Website (optional)"
                  error={errors.website?.message}
                  id="website"
                >
                  <input
                    id="website"
                    inputMode="url"
                    placeholder="example.com"
                    className={inputClass}
                    aria-invalid={!!errors.website}
                    aria-describedby={errors.website ? "website-error" : undefined}
                    {...register("website")}
                  />
                </Field>
                <Field
                  label="What is the primary operating problem?"
                  hint="The thing that costs the most time, money, or sleep. Plain language beats jargon."
                  error={errors.problem?.message}
                  id="problem"
                >
                  <textarea
                    id="problem"
                    rows={5}
                    className={inputClass}
                    aria-invalid={!!errors.problem}
                    aria-describedby={errors.problem ? "problem-error" : "problem-hint"}
                    {...register("problem")}
                  />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mt-6 grid grid-cols-1 gap-5">
                <Field
                  label="What systems do you run today?"
                  hint="Name the tools if you can; describe them if you can't. Spreadsheets and inboxes count."
                  error={errors.systems?.message}
                  id="systems"
                >
                  <textarea
                    id="systems"
                    rows={4}
                    className={inputClass}
                    aria-invalid={!!errors.systems}
                    aria-describedby={errors.systems ? "systems-error" : "systems-hint"}
                    {...register("systems")}
                  />
                </Field>
                <Field
                  label="What does a good outcome look like?"
                  error={errors.outcome?.message}
                  id="outcome"
                >
                  <textarea
                    id="outcome"
                    rows={3}
                    className={inputClass}
                    aria-invalid={!!errors.outcome}
                    aria-describedby={errors.outcome ? "outcome-error" : undefined}
                    {...register("outcome")}
                  />
                </Field>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Timeline" error={errors.timeline?.message} id="timeline">
                    <select
                      id="timeline"
                      className={inputClass}
                      aria-invalid={!!errors.timeline}
                      aria-describedby={errors.timeline ? "timeline-error" : undefined}
                      defaultValue=""
                      {...register("timeline")}
                    >
                      <option value="" disabled>
                        Choose…
                      </option>
                      {timelineOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Budget range (optional)"
                    error={errors.budget?.message}
                    id="budget"
                  >
                    <select id="budget" className={inputClass} {...register("budget")}>
                      {budgetOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>
            ) : null}

            {isReview ? (
              <div className="mt-6">
                <label htmlFor="summary" className="text-sm font-medium text-warm-mist">
                  Your answers, ready to send
                </label>
                <textarea
                  id="summary"
                  readOnly
                  rows={12}
                  value={summary || "Complete the earlier steps to see your summary."}
                  className={`${inputClass} mt-2 font-mono text-xs leading-relaxed`}
                />

                <div className="mt-5 flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#63c7c2]"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "consent-error" : "consent-hint"}
                    {...register("consent")}
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed text-warm-mist">
                    I understand this form runs in my browser: nothing is
                    transmitted until I choose an option below, and BSTS may use
                    what I send to respond to this inquiry.
                  </label>
                </div>
                {errors.consent ? (
                  <p id="consent-error" role="alert" className="mt-2 text-sm text-alert">
                    {errors.consent.message}
                  </p>
                ) : (
                  <p id="consent-hint" className="sr-only">
                    Consent is required before sending.
                  </p>
                )}

                {sendState === "sent" ? (
                  <div
                    className="mt-7 rounded-2xl border border-cyan-core/40 bg-cyan-core/10 px-5 py-4 text-sm leading-relaxed text-warm-white"
                    role="status"
                  >
                    <span className="font-medium">Sent — thank you.</span> Your
                    assessment is on its way to BSTS. We&apos;ll reply to the
                    email you provided, usually within one business day.
                  </div>
                ) : null}

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {canSubmit && sendState !== "sent" ? (
                    <button
                      type="button"
                      onClick={submitToBsts}
                      disabled={sendState === "sending"}
                      className="btn-primary-form disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" aria-hidden />
                      {sendState === "sending" ? "Sending…" : "Send to BSTS"}
                    </button>
                  ) : null}
                  {contactEmail && !canSubmit ? (
                    <button type="button" onClick={openMailto} className="btn-primary-form">
                      <Mail className="h-4 w-4" aria-hidden />
                      Open in your email app
                    </button>
                  ) : null}
                  <button type="button" onClick={copySummary} className="btn-ghost-form">
                    {copied ? (
                      <Check className="h-4 w-4" aria-hidden />
                    ) : (
                      <ClipboardCopy className="h-4 w-4" aria-hidden />
                    )}
                    {copied ? "Copied" : "Copy summary"}
                  </button>
                  <button type="button" onClick={downloadJson} className="btn-ghost-form">
                    <Download className="h-4 w-4" aria-hidden />
                    Download JSON
                  </button>
                </div>

                {sendState === "error" ? (
                  <p role="alert" className="mt-3 text-sm text-alert">
                    Sending didn&apos;t go through — please try again, or use
                    &quot;Copy summary&quot; and email it to us directly.
                  </p>
                ) : null}

                <p className="mt-5 text-xs leading-relaxed text-warm-dim" aria-live="polite">
                  {canSubmit ? (
                    <>
                      &quot;Send to BSTS&quot; transmits only the answers shown
                      above, directly to the BSTS inbox. Prefer not to send from
                      the browser? Copy or download your answers instead.
                    </>
                  ) : contactEmail ? (
                    <>
                      &quot;Open in your email app&quot; composes a message to{" "}
                      <span className="text-warm-mist">{contactEmail}</span> using
                      your own mail application — nothing is sent until you press
                      send there.
                    </>
                  ) : (
                    <>
                      This site is running in local/demo mode with no contact
                      email configured, so nothing can be transmitted from here.
                      Copy or download your answers to share them another way.
                    </>
                  )}
                </p>
              </div>
            ) : null}
          </motion.fieldset>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-edge/50 pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="btn-ghost-form disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          {!isReview ? (
            <button type="button" onClick={next} className="btn-primary-form">
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  id,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-warm-mist">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-warm-dim">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
