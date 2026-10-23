import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    alternates: { languages: Object.fromEntries(locales.map((other) => [other, `${site.url}/${other}`])) },
  }));
}
