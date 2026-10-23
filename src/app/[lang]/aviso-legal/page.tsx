import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalView } from "@/components/pages/LegalView";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/aviso-legal">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: `${getDictionary(lang).legal.notice} · Gestgroup`, alternates: { canonical: `/${lang}/aviso-legal` } };
}

export default async function Page({ params }: PageProps<"/[lang]/aviso-legal">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalView slug="aviso-legal" locale={lang} t={getDictionary(lang)} />;
}
