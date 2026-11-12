import { describe, expect, it, vi } from "vitest";
import type { ContactInput } from "./contact";
import { contactMail, mailConfig, sendContactMail, type MailConfig } from "./contact-mail";

const input: ContactInput = {
  name: "Marta Puig",
  company: "Exemple, S.L.",
  email: "marta@exemple.cat",
  phone: "",
  interests: ["costs", "support"],
  message: "Volem revisar la telefonia.",
  privacy: true,
};

const env = { RESEND_API_KEY: "re_prova", MAIL_FROM: "Web Gestgroup <web@nertel.ai>", MAIL_TO: "gestgroup@gestgroup.es" };

describe("mailConfig", () => {
  it("sense clau, remitent i destinatari, no hi ha enviament", () => {
    expect(mailConfig({})).toBeNull();
    expect(mailConfig({ ...env, MAIL_TO: "" })).toBeNull();
    expect(mailConfig({ ...env, RESEND_API_KEY: "" })).toBeNull();
  });

  it("amb les tres, envia", () => {
    expect(mailConfig(env)).toEqual({ apiKey: "re_prova", from: "Web Gestgroup <web@nertel.ai>", to: "gestgroup@gestgroup.es" });
  });
});

describe("contactMail", () => {
  const mail = contactMail(input, { from: "Web Gestgroup <web@nertel.ai>", to: "gestgroup@gestgroup.es" });

  it("arriba a la bústia de Gestgroup i, en respondre, contesta a qui ha escrit", () => {
    expect(mail.from).toBe("Web Gestgroup <web@nertel.ai>");
    expect(mail.to).toBe("gestgroup@gestgroup.es");
    expect(mail.replyTo).toBe("Marta Puig <marta@exemple.cat>");
  });

  it("porta l'empresa a l'assumpte i totes les dades al cos, en castellà", () => {
    expect(mail.subject).toBe("Solicitud de análisis gratuito: Exemple, S.L.");
    expect(mail.text).toContain("Quiere revisar: Facturas y costes IT, Soporte 24/7");
    expect(mail.text).toContain("Teléfono: —");
    expect(mail.text).toContain("Volem revisar la telefonia.");
  });

  it("un nom amb cometes o angles no pot trencar l'adreça de resposta", () => {
    expect(contactMail({ ...input, name: 'Hack" <x@y.z>' }, { from: "a@b.c", to: "d@e.f" }).replyTo).toBe("Hack x@y.z <marta@exemple.cat>");
  });
});

describe("sendContactMail", () => {
  it("envia el correu amb la configuració", async () => {
    const config = mailConfig(env) as MailConfig;
    const deliver = vi.fn().mockResolvedValue(undefined);
    await sendContactMail(input, config, deliver);
    expect(deliver).toHaveBeenCalledWith(expect.objectContaining({ subject: "Solicitud de análisis gratuito: Exemple, S.L." }), config);
  });
});
