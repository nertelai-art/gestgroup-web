import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";

/**
 * nertel.ai té `es` i `ca`, els dos idiomes d'aquest web: cada pàgina hi porta en el seu.
 * `utm_source` és el host del web (el mateix format a totes les webs de clients), per a l'analítica de
 * nertel.ai: surt de l'adreça pública, així que canvia sol quan el web passa a gestgroup.es.
 */
export function nertelCreditUrl(locale: Locale, siteUrl: string = site.url) {
  return `https://nertel.ai/${locale}?utm_source=${new URL(siteUrl).host}&utm_medium=credit`;
}
