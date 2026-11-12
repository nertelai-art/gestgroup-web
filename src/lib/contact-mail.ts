import { getDictionary } from "@/i18n/dictionaries";
import type { ContactInput } from "./contact";
import { sendWithResend } from "./email/resend";

/**
 * Enviament del formulari per correu a Gestgroup. Sense configuració no s'envia res i la resposta ho
 * diu (`delivered: false`).
 */
export type MailConfig = {
  apiKey: string;
  /** Remitent: ha de ser d'un domini verificat al proveïdor de correu. */
  from: string;
  /** On arriben les sol·licituds. Pot ser una llista separada per comes. */
  to: string;
};

export type Mail = { from: string; to: string; replyTo: string; subject: string; text: string };

type Env = Readonly<Record<string, string | undefined>>;

export function mailConfig(env: Env = process.env): MailConfig | null {
  const { RESEND_API_KEY: apiKey, MAIL_FROM: from, MAIL_TO: to } = env;
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to };
}

/** El correu que rep Gestgroup: en castellà, amb el que ha escrit qui demana l'anàlisi, i «Responder» li contesta a ell. */
export function contactMail(input: ContactInput, config: Pick<MailConfig, "from" | "to">): Mail {
  const labels = getDictionary("es").contact.form.interestOptions;
  const lines = [
    `Nombre: ${input.name.trim()}`,
    `Empresa: ${input.company.trim()}`,
    `Email: ${input.email.trim()}`,
    `Teléfono: ${input.phone.trim() || "—"}`,
    `Quiere revisar: ${input.interests.map((id) => labels[id]).join(", ") || "—"}`,
    "",
    input.message.trim() || "(Sin mensaje)",
    "",
    "—",
    "Enviado desde el formulario de análisis gratuito de la web.",
  ];
  return {
    from: config.from,
    to: config.to,
    replyTo: `${input.name.trim().replace(/[<>"]/g, "")} <${input.email.trim()}>`,
    subject: `Solicitud de análisis gratuito: ${input.company.trim()}`,
    text: lines.join("\n"),
  };
}

export type Send = (mail: Mail, config: MailConfig) => Promise<unknown>;

const send: Send = (mail, config) => sendWithResend(mail, config.apiKey);

export async function sendContactMail(input: ContactInput, config: MailConfig, deliver: Send = send) {
  await deliver(contactMail(input, config), config);
}
