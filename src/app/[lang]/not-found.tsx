"use client";

import { usePathname } from "next/navigation";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// L'idioma surt de l'adreça (/ca/...), al client: llegir capçaleres aquí faria dinàmiques totes les pàgines.
export default function NotFound() {
  const segment = usePathname().split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;
  return <NotFoundView locale={locale} t={getDictionary(locale)} />;
}
