import type { Mail } from "@/lib/contact-mail";

// Frontera amb el proveïdor de correu: l'únic fitxer que coneix Resend. API REST amb `fetch`, sense SDK.
// https://resend.com/docs/api-reference/emails/send-email
export async function sendWithResend(mail: Mail, apiKey: string, fetcher: typeof fetch = fetch) {
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: mail.from,
      to: mail.to.split(",").map((address) => address.trim()).filter(Boolean),
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend: ${response.status} ${detail.slice(0, 200)}`);
  }
}
