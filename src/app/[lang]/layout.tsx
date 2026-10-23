import type { Metadata, Viewport } from "next";
import { Montserrat, Mulish, Ubuntu } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/layout/JsonLd";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { DemoBadge } from "@/demo-kit/DemoBadge";
import { DemoTracker } from "@/demo-kit/DemoTracker";
import { site } from "@/data/site";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

// Montserrat i Mulish (abans «Muli") són les dues lletres de la web actual de Gestgroup.
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], weight: ["700", "800"], variable: "--font-montserrat", display: "swap" });
const mulish = Mulish({ subsets: ["latin", "latin-ext"], variable: "--font-mulish", display: "swap" });
// Només per al nom del logotip: és la lletra oberta més propera a la del seu logo.
const ubuntu = Ubuntu({ subsets: ["latin"], weight: "500", variable: "--font-ubuntu", display: "swap", preload: false });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));
export const viewport: Viewport = { themeColor: "#0a0e1c", colorScheme: "dark" };

/** El web no s'indexa mentre no sigui al domini del client. */
const indexable = process.env.SITE_INDEXABLE === "true";

export async function generateMetadata({ params }: Pick<LayoutProps<"/[lang]">, "params">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    robots: indexable ? undefined : { index: false, follow: false },
    alternates: {
      canonical: `/${lang}`,
      languages: { "es-ES": "/es", "ca-ES": "/ca", "x-default": `/${defaultLocale}` },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "ca" ? "ca_ES" : "es_ES",
      siteName: "Gestgroup",
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <html lang={lang} className={`${montserrat.variable} ${mulish.variable} ${ubuntu.variable}`}>
      <body>
        <a href="#contenido" className="skip-link">
          {t.skip}
        </a>
        <Header locale={lang} t={t} />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={lang} t={t} />
        <RevealObserver />
        <DemoTracker site="gestgroup" />
        <DemoBadge site="gestgroup" locale={lang} />
        <JsonLd locale={lang} t={t} />
      </body>
    </html>
  );
}
