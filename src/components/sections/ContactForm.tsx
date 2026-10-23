"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { interestIds, validateContact, type ContactErrors, type ContactField, type ContactInput, type InterestId } from "@/lib/contact";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; name: string } | { kind: "error" };

const fieldOrder: ContactField[] = ["name", "company", "email", "phone", "privacy"];

export function ContactForm({ locale, t }: { locale: Locale; t: Dictionary }) {
  const f = t.contact.form;
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function read(): ContactInput {
    const data = new FormData(form.current ?? undefined);
    const text = (key: string) => String(data.get(key) ?? "");
    return {
      name: text("name"),
      company: text("company"),
      email: text("email"),
      phone: text("phone"),
      interests: data.getAll("interests").map(String).filter((id): id is InterestId => interestIds.includes(id as InterestId)),
      message: text("message"),
      privacy: data.get("privacy") === "on",
    };
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = read();
    const found = validateContact(input);
    setErrors(found);
    const first = fieldOrder.find((field) => found[field]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus({ kind: "sent", name: input.name.trim().split(" ")[0] ?? "" });
    } catch {
      setStatus({ kind: "error" });
    }
  }

  /** Treu l'error d'un camp quan es corregeix, sense esperar a enviar. */
  function revalidate(field: ContactField) {
    if (!errors[field]) return;
    const found = validateContact(read());
    if (!found[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="grid min-h-[28rem] place-items-center rounded-[1.75rem] border border-line bg-night-2 p-8 text-center">
        <div>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[image:var(--brand-gradient)]">
            <svg viewBox="0 0 24 24" className="size-8 text-white" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="display mx-auto mt-6 max-w-sm text-2xl">{f.success.replace("{name}", status.name)}</p>
          <button
            type="button"
            className="btn btn-ghost mt-8"
            onClick={() => {
              setStatus({ kind: "idle" });
              setErrors({});
            }}
          >
            {f.again}
          </button>
        </div>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form ref={form} noValidate onSubmit={submit} className="grid gap-5 rounded-[1.75rem] border border-line bg-night-2/90 p-6 backdrop-blur md:p-9" aria-busy={sending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label={f.name} autoComplete="name" error={errors.name ? f.errors.name : undefined} onInput={() => revalidate("name")} required />
        <Field
          name="company"
          label={f.company}
          autoComplete="organization"
          error={errors.company ? f.errors.company : undefined}
          onInput={() => revalidate("company")}
          required
        />
        <Field name="email" type="email" label={f.email} autoComplete="email" error={errors.email ? f.errors.email : undefined} onInput={() => revalidate("email")} required />
        <Field
          name="phone"
          type="tel"
          label={f.phone}
          hint={f.optional}
          autoComplete="tel"
          error={errors.phone ? f.errors.phone : undefined}
          onInput={() => revalidate("phone")}
        />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">{f.interests}</legend>
        <div className="flex flex-wrap gap-2">
          {interestIds.map((id) => (
            <label key={id} className="cursor-pointer">
              <input type="checkbox" name="interests" value={id} className="peer sr-only" defaultChecked={id === "costs"} />
              <span className="inline-block rounded-full border border-line px-4 py-2 text-sm text-slate transition-colors peer-checked:border-transparent peer-checked:bg-[image:var(--brand-gradient)] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan hover:border-snow/50">
                {f.interestOptions[id]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="text-sm font-semibold">
          {f.message} <span className="font-normal text-slate">({f.optional})</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={4000}
          className="mt-2 w-full resize-y rounded-xl border border-line bg-night px-4 py-3 text-snow placeholder:text-slate/60 focus:border-cyan focus:outline-none"
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate">
          <input
            type="checkbox"
            name="privacy"
            className="mt-0.5 size-5 shrink-0 accent-[#b00080]"
            aria-invalid={errors.privacy || undefined}
            aria-describedby={errors.privacy ? "privacy-error" : undefined}
            onChange={() => revalidate("privacy")}
          />
          <span>
            {f.privacy}{" "}
            <Link href={`/${locale}/privacidad`} target="_blank" className="font-semibold text-sky-light underline underline-offset-4">
              {f.privacyLink}
            </Link>
          </span>
        </label>
        {errors.privacy ? (
          <p id="privacy-error" className="mt-2 text-sm font-semibold text-pink-light">
            {f.errors.privacy}
          </p>
        ) : null}
      </div>

      {status.kind === "error" ? (
        <p role="alert" className="rounded-xl border border-magenta/50 bg-magenta/10 px-4 py-3 text-sm font-semibold text-pink-light">
          {f.errors.server}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary w-full sm:w-auto sm:justify-self-start" disabled={sending}>
        {sending ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
            {f.sending}
          </>
        ) : (
          <>
            {f.submit} <span className="arrow" aria-hidden>→</span>
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  hint,
  error,
  required,
  autoComplete,
  onInput,
}: {
  name: string;
  label: string;
  type?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  onInput: () => void;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">
        {label} {hint ? <span className="font-normal text-slate">({hint})</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onInput={onInput}
        className={`mt-2 h-12 w-full rounded-xl border bg-night px-4 text-snow transition-colors focus:outline-none ${
          error ? "border-pink-light" : "border-line focus:border-cyan"
        }`}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm font-semibold text-pink-light">
          {error}
        </p>
      ) : null}
    </div>
  );
}
