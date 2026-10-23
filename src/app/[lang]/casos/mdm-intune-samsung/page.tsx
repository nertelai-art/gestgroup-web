import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseView } from "@/components/pages/CaseView";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/casos/mdm-intune-samsung">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { caseStudy } = getDictionary(lang);
  return { title: caseStudy.meta.title, description: caseStudy.meta.description, alternates: { canonical: `/${lang}/casos/mdm-intune-samsung` } };
}

export default async function Page({ params }: PageProps<"/[lang]/casos/mdm-intune-samsung">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <CaseView locale={lang} t={getDictionary(lang)} />;
}
