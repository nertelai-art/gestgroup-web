import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyView } from "@/components/pages/CompanyView";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/empresa">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { company } = getDictionary(lang);
  return { title: company.meta.title, description: company.meta.description, alternates: { canonical: `/${lang}/empresa` } };
}

export default async function Page({ params }: PageProps<"/[lang]/empresa">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <CompanyView locale={lang} t={getDictionary(lang)} />;
}
