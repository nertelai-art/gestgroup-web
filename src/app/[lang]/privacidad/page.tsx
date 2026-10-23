import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalView } from "@/components/pages/LegalView";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacidad">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: `${getDictionary(lang).legal.privacy} · Gestgroup`, alternates: { canonical: `/${lang}/privacidad` } };
}

export default async function Page({ params }: PageProps<"/[lang]/privacidad">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalView slug="privacidad" locale={lang} t={getDictionary(lang)} />;
}
