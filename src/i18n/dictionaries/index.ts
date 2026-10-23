import type { Locale } from "../config";
import ca from "./ca";
import es, { type Dictionary } from "./es";

const dictionaries: Record<Locale, Dictionary> = { es, ca };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
