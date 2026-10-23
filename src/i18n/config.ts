export const locales = ["es", "ca"] as const;
export type Locale = (typeof locales)[number];

/** El castellà va primer: és l'idioma de la web actual de Gestgroup i del seu públic fora de Catalunya. */
export const defaultLocale: Locale = "es";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Tria l'idioma a partir de la capçalera `Accept-Language`; si no n'hi ha cap que coincideixi, el per defecte. */
export function pickLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0] ?? "", q: q ? Number(q.slice(2)) : 1 };
    })
    .filter((entry) => entry.lang && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);
  return ranked.map((entry) => entry.lang).find(isLocale) ?? defaultLocale;
}
