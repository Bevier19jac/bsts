"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ClipboardCopy, Mail } from "lucide-react";
import { federalSensitiveNotice, site } from "@/lib/site";

const formKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "4a21a788-0e18-450a-a32a-5b3cae2c8986";

export const organizationTypes = [
  "Federal agency",
  "Prime contractor",
  "Small-business teaming partner",
  "State/local government",
  "Regulated commercial organization",
  "Other",
] as const;

export const opportunityTypes = [
  "Capability briefing",
  "Subcontracting",
  "Teaming",
  "Sources sought",
  "RFI",
  "Pilot or prototype",
  "Direct requirement",
  "General inquiry",
] as const;

const nextSteps = [
  "Schedule a capability briefing",
  "Reply by email",
  "Send the capability statement",
] as const;

export const federalInquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name."),
  email: z.string().trim().email("Please enter a valid work email."),
  organization: z.string().trim().min(2, "Please name the organization."),
  orgType: z.enum(organizationTypes, { message: "Please choose the closest fit." }),
  opportunityType: z.enum(opportunityTypes, {
    message: "Please choose an opportunity type.",
  }),
  dueDate: z.string().trim().max(80, "Please keep this short.").optional().or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(20, "A sentence or two helps us respond usefully (20+ characters).")
    .max(2000, "Please keep this under 2000 characters."),
  nextStep: z.enum(nextSteps, { message: "Please choose a next step." }),
});

export type FederalInquiry = z.infer<typeof federalInquirySchema>;

export function formatFederalInquiry(d: FederalInquiry): string {
  return [
    "BSTS Federal Inquiry",
    "====================",
    `Name: ${d.name}`,
    `Work email: ${d.email}`,
    `Organization: ${d.organization}`,
    `Organization type: ${d.orgType}`,
    `Opportunity type: ${d.opportunityType}`,
    `Response/due date: ${d.dueDate || "—"}`,
    "",
    "Description (unclassified):",
    d.description,
    "",
    `Preferred next step: ${d.nextStep}`,
  ].join("\n");
}

const inputClass =
  "w-full rounded-2xl border border-edge bg-graphite px-4 py-3 text-warm-white placeholder:text-warm-dim/70 focus:border-cyan-core/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-core";

export function FederalContactForm() {
  const [copied, setCopied] = useState(false);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FederalInquiry>({
    resolver: zodResolver(federalInquirySchema),
    mode: "onTouched",
    defaultValues: { dueDate: "" },
  });

  async function submit() {
    const ok = await trigger(undefined, { shouldFocus: true });
    if (!ok) return;
    const honeypot = document.getElementById(
      "bsts-fed-website",
    ) as HTMLInputElement | null;
    if (honeypot?.value) {
      setSendState("sent");
      return;
    }
    const data = getValues();
    setSendState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: formKey,
          subject: `Federal inquiry — ${data.opportunityType} — ${data.organization}`,
          from_name: data.name,
          email: data.email,
          message: formatFederalInquiry(data),
          botcheck: false,
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      setSendState(res.ok && json.success ? "sent" : "error");
    } catch {
      setSendState("error");
    }
  }

  async function copySummary() {
    const ok = await trigger(undefined, { shouldFocus: true });
    if (!ok) return;
    try {
      await navigator.clipboard.writeText(formatFederalInquiry(getValues()));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable; fields remain selectable.
    }
  }

  return (
    <div className="surface rounded-[2rem] p-6 sm:p-9">
      <p className="rounded-2xl border border-gold-core/35 bg-gold-faint p-4 text-xs leading-relaxed text-warm-mist">
        {federalSensitiveNotice}
      </p>

      <form noValidate onSubmit={(e) => e.preventDefault()} className="mt-6">
        {/* Honeypot — hidden from people and assistive tech. */}
        <input
          type="text"
          id="bsts-fed-website"
          name="bsts-fed-website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="fed-name" label="Name" error={errors.name?.message}>
            <input id="fed-name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} {...register("name")} />
          </Field>
          <Field id="fed-email" label="Work email" error={errors.email?.message}>
            <input id="fed-email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} {...register("email")} />
          </Field>
          <Field id="fed-org" label="Organization" error={errors.organization?.message}>
            <input id="fed-org" autoComplete="organization" className={inputClass} aria-invalid={!!errors.organization} {...register("organization")} />
          </Field>
          <Field id="fed-orgtype" label="Organization type" error={errors.orgType?.message}>
            <select id="fed-orgtype" className={inputClass} defaultValue="" aria-invalid={!!errors.orgType} {...register("orgType")}>
              <option value="" disabled>Choose…</option>
              {organizationTypes.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field id="fed-opptype" label="Opportunity type" error={errors.opportunityType?.message}>
            <select id="fed-opptype" className={inputClass} defaultValue="" aria-invalid={!!errors.opportunityType} {...register("opportunityType")}>
              <option value="" disabled>Choose…</option>
              {opportunityTypes.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field
            id="fed-due"
            label="Response or due date (optional)"
            error={errors.dueDate?.message}
          >
            <input id="fed-due" placeholder="e.g. 2026-09-15" className={inputClass} aria-invalid={!!errors.dueDate} {...register("dueDate")} />
          </Field>
        </div>

        <div className="mt-5">
          <Field
            id="fed-desc"
            label="Short unclassified description"
            hint="Plain language, no sensitive details — enough for us to respond usefully."
            error={errors.description?.message}
          >
            <textarea id="fed-desc" rows={5} className={inputClass} aria-invalid={!!errors.description} {...register("description")} />
          </Field>
        </div>

        <div className="mt-5">
          <Field id="fed-next" label="Preferred next step" error={errors.nextStep?.message}>
            <select id="fed-next" className={inputClass} defaultValue="" aria-invalid={!!errors.nextStep} {...register("nextStep")}>
              <option value="" disabled>Choose…</option>
              {nextSteps.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submit}
            disabled={sendState === "sending" || sendState === "sent"}
            className="btn-primary-form disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {sendState === "sending"
              ? "Sending…"
              : sendState === "sent"
                ? "Sent to BSTS"
                : "Send inquiry"}
          </button>
          <button type="button" onClick={copySummary} className="btn-ghost-form">
            {copied ? <Check className="h-4 w-4" aria-hidden /> : <ClipboardCopy className="h-4 w-4" aria-hidden />}
            {copied ? "Copied" : "Copy summary"}
          </button>
        </div>

        {sendState === "sent" ? (
          <p role="status" className="mt-4 text-sm font-medium text-ok">
            Your inquiry is in our inbox. {site.responsePromise}
          </p>
        ) : null}
        {sendState === "error" ? (
          <p role="alert" className="mt-4 text-sm text-alert">
            That didn&apos;t go through. Please try again in a moment — or use
            Copy summary and send it via the email option on the Assessment
            page.
          </p>
        ) : null}
        <p className="mt-5 text-xs leading-relaxed text-warm-dim">
          &quot;Send inquiry&quot; delivers your answers directly to our inbox
          over an encrypted connection. Nothing is transmitted until you press
          it, and we never display a success message unless delivery was
          confirmed.
        </p>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
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
