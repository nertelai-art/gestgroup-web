import { notFound } from "next/navigation";
import { Case } from "@/components/sections/Case";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { CycleScene } from "@/components/sections/CycleScene";
import { Faq } from "@/components/sections/Faq";
import { Figures } from "@/components/sections/Figures";
import { Founder } from "@/components/sections/Founder";
import { Hero } from "@/components/sections/Hero";
import { InvoiceScene } from "@/components/sections/InvoiceScene";
import { Services } from "@/components/sections/Services";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <Hero t={t} />
      <Clients t={t} />
      <InvoiceScene locale={lang} t={t} />
      <Services t={t} />
      <CycleScene t={t} />
      <Figures t={t} />
      <Case t={t} />
      <Founder t={t} />
      <Faq t={t} />
      <Contact t={t} />
    </>
  );
}
