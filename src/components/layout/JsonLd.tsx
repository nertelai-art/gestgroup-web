import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Dades estructurades del negoci i de les preguntes freqüents (cercadors i assistents). */
export function JsonLd({ locale, t }: { locale: Locale; t: Dictionary }) {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: site.name,
      description: t.meta.description,
      url: `${site.url}/${locale}`,
      telephone: "+34 931 156 344",
      logo: `${site.url}/icon.svg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.street,
        postalCode: site.postalCode,
        addressLocality: site.city,
        addressRegion: site.region,
        addressCountry: site.country,
      },
      areaServed: "ES",
      sameAs: [site.linkedin],
      knowsAbout: ["IT cost optimization", "Telecom expense management", "IT helpdesk", "LeanIT", "Microsoft Intune"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
