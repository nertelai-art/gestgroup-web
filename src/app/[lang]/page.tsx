import { notFound } from "next/navigation";
import { Areas } from "@/components/sections/Areas";
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
import { Support } from "@/components/sections/Support";
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
      <Services t={t} />
      <Areas t={t} />
      <InvoiceScene locale={lang} t={t} />
      <CycleScene t={t} />
      <Support t={t} />
      <Figures t={t} />
      <Case locale={lang} t={t} />
      <Founder locale={lang} t={t} />
      <Faq t={t} />
      <Contact locale={lang} t={t} />
    </>
  );
}
