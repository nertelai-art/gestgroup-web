import { describe, expect, it, vi } from "vitest";
import { sendWithResend } from "./resend";

const mail = {
  from: "Web Gestgroup <web@nertel.ai>",
  to: "gestgroup@gestgroup.es, albert.giro@gestgroup.es",
  replyTo: "Marta <marta@exemple.cat>",
  subject: "Solicitud",
  text: "Hola",
};

describe("sendWithResend", () => {
  it("crida l'API amb la clau i el correu, amb els destinataris en llista", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('{"id":"1"}', { status: 200 }));
    await sendWithResend(mail, "re_prova", fetcher);
    const [url, init] = fetcher.mock.calls[0]!;
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.authorization).toBe("Bearer re_prova");
    expect(JSON.parse(init.body)).toEqual({
      from: mail.from,
      to: ["gestgroup@gestgroup.es", "albert.giro@gestgroup.es"],
      reply_to: mail.replyTo,
      subject: "Solicitud",
      text: "Hola",
    });
  });

  it("si Resend no l'accepta, falla amb el motiu", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('{"message":"domain not verified"}', { status: 403 }));
    await expect(sendWithResend(mail, "re_prova", fetcher)).rejects.toThrow("Resend: 403");
  });
});
