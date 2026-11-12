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

const env = {
  CONTACT_SMTP_HOST: "smtp.exemple.test",
  CONTACT_SMTP_USER: "web@gestgroup.es",
  CONTACT_SMTP_PASS: "x",
  CONTACT_MAIL_TO: "gestgroup@gestgroup.es",
};

describe("mailConfig", () => {
  it("sense servidor, usuari, contrasenya i destinatari, no hi ha enviament", () => {
    expect(mailConfig({})).toBeNull();
    expect(mailConfig({ ...env, CONTACT_MAIL_TO: "" })).toBeNull();
  });

  it("per defecte, port 587 i el remitent és l'usuari", () => {
    expect(mailConfig(env)).toMatchObject({ port: 587, from: "web@gestgroup.es", to: "gestgroup@gestgroup.es" });
    expect(mailConfig({ ...env, CONTACT_SMTP_PORT: "465", CONTACT_MAIL_FROM: "noreply@gestgroup.es" })).toMatchObject({ port: 465, from: "noreply@gestgroup.es" });
  });
});

describe("contactMail", () => {
  const mail = contactMail(input, { from: "web@gestgroup.es", to: "gestgroup@gestgroup.es" });

  it("surt de la bústia de Gestgroup i, en respondre, contesta a qui ha escrit", () => {
    expect(mail.from).toBe("Web Gestgroup <web@gestgroup.es>");
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
    const send = vi.fn().mockResolvedValue(undefined);
    await sendContactMail(input, config, send);
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ subject: "Solicitud de análisis gratuito: Exemple, S.L." }), config);
  });
});
