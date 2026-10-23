import { NextResponse } from "next/server";
import { parseContact, validateContact } from "@/lib/contact";

/**
 * Sol·licitud d'anàlisi gratuïta. Valida igual que el navegador.
 * PENDENT: encara no s'envia enlloc (correu o CRM de Gestgroup per decidir). Mentre no hi sigui, la
 * resposta diu `delivered: false` perquè ningú no es pensi que ha arribat a algú.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const input = parseContact(body);
  if (!input) return NextResponse.json({ ok: false }, { status: 400 });
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) return NextResponse.json({ ok: false, errors }, { status: 422 });
  return NextResponse.json({ ok: true, delivered: false });
}
