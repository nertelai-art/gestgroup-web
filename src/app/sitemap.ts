import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/empresa", "/casos/mdm-intune-samsung", "/aviso-legal", "/privacidad", "/cookies"];
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      alternates: { languages: Object.fromEntries(locales.map((other) => [other, `${site.url}/${other}${path}`])) },
    })),
  );
}
