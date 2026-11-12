import type { Locale } from "@/i18n/config";

// D'on ve la visita, per a l'analítica de nertel.ai. El mateix format a totes les webs de clients.
// Ara és el host de Vercel: quan el web passi al domini del client, canvia-ho a «gestgroup.es».
const SOURCE = "gestgroup-web.vercel.app";

/** nertel.ai té `es` i `ca`, els dos idiomes d'aquest web: cada pàgina hi porta en el seu. */
export function nertelCreditUrl(locale: Locale) {
  return `https://nertel.ai/${locale}?utm_source=${SOURCE}&utm_medium=credit`;
}
