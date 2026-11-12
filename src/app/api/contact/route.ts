import { NextResponse } from "next/server";
import { isTrapped, parseContact, validateContact } from "@/lib/contact";
import { mailConfig, sendContactMail } from "@/lib/contact-mail";

/**
 * Sol·licitud d'anàlisi gratuïta. Valida igual que el navegador i l'envia per correu a Gestgroup
 * (`src/lib/contact-mail.ts`). Sense la bústia configurada no s'envia enlloc, i la resposta diu
 * `delivered: false` perquè ningú no es pensi que ha arribat a algú.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const input = parseContact(body);
  if (!input) return NextResponse.json({ ok: false }, { status: 400 });
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) return NextResponse.json({ ok: false, errors }, { status: 422 });
  if (isTrapped(body)) return NextResponse.json({ ok: true, delivered: false });

  const config = mailConfig();
  if (!config) return NextResponse.json({ ok: true, delivered: false });
  try {
    await sendContactMail(input, config);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    // Al registre de Vercel, sense les dades de qui escriu.
    console.error("contact: no s'ha pogut enviar el correu", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
