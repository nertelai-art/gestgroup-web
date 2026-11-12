import { createTransport } from "nodemailer";
import { getDictionary } from "@/i18n/dictionaries";
import type { ContactInput } from "./contact";

/**
 * Enviament del formulari per correu, per SMTP: amb la bústia que doni Gestgroup (la del seu
 * allotjament o la de Microsoft 365), com feia la seva web vella. Sense configuració no s'envia res i
 * la resposta ho diu (`delivered: false`).
 */
export type MailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  /** Remitent: ha de ser una adreça de gestgroup.es que el servidor SMTP deixi fer servir. */
  from: string;
  /** On arriben les sol·licituds. Pot ser una llista separada per comes. */
  to: string;
};

export type Mail = { from: string; to: string; replyTo: string; subject: string; text: string };

type Env = Readonly<Record<string, string | undefined>>;

export function mailConfig(env: Env = process.env): MailConfig | null {
  const { CONTACT_SMTP_HOST: host, CONTACT_SMTP_USER: user, CONTACT_SMTP_PASS: pass, CONTACT_MAIL_TO: to } = env;
  if (!host || !user || !pass || !to) return null;
  return { host, port: Number(env.CONTACT_SMTP_PORT) || 587, user, pass, from: env.CONTACT_MAIL_FROM || user, to };
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
    from: `Web Gestgroup <${config.from}>`,
    to: config.to,
    replyTo: `${input.name.trim().replace(/[<>"]/g, "")} <${input.email.trim()}>`,
    subject: `Solicitud de análisis gratuito: ${input.company.trim()}`,
    text: lines.join("\n"),
  };
}

export type Send = (mail: Mail, config: MailConfig) => Promise<unknown>;

const smtpSend: Send = (mail, config) =>
  createTransport({ host: config.host, port: config.port, secure: config.port === 465, auth: { user: config.user, pass: config.pass } }).sendMail(mail);

export async function sendContactMail(input: ContactInput, config: MailConfig, send: Send = smtpSend) {
  await send(contactMail(input, config), config);
}
