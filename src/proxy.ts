import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { demoGate } from "@/demo-kit/gate";
import { pickLocale } from "@/i18n/config";

/**
 * Dues coses, en aquest ordre:
 * - La porta de la demo (vegeu `src/demo-kit`): sense enllaç personal, la pàgina de bloqueig de Nertel.
 * - L'arrel porta a l'idioma que demana el navegador; cada idioma té la seva adreça. Si s'hi arriba
 *   amb l'enllaç, la redirecció s'emporta les galetes que el recorden (i el codi ja no surt a l'adreça).
 */
export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const gate = await demoGate(request, event);
  if (gate && !gate.ok) return gate;
  if (request.nextUrl.pathname !== "/") return gate;

  const locale = pickLocale(request.headers.get("accept-language"));
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  for (const cookie of gate?.headers.getSetCookie() ?? []) response.headers.append("set-cookie", cookie);
  return response;
}

// Literal: Next el llegeix sense executar el fitxer. És el `demoMatcher` del kit, més `images/`:
// l'optimitzador de Next demana les fotos des del servidor, sense galetes, i la porta li tornaria 403.
export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon\\.ico|icon\\.svg|apple-icon|robots\\.txt|opengraph-image|twitter-image).*)"],
};
