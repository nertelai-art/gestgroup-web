import type { Metadata } from "next";
import { Montserrat, Mulish } from "next/font/google";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["800"], variable: "--font-montserrat", display: "swap" });
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish", display: "swap" });

// L'únic layout arrel és el de /[lang]: les adreces sense idioma vàlid cauen aquí.
export const metadata: Metadata = { title: "404 · Gestgroup", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang={defaultLocale} className={`${montserrat.variable} ${mulish.variable}`}>
      <body>
        <main>
          <NotFoundView locale={defaultLocale} t={getDictionary(defaultLocale)} />
        </main>
      </body>
    </html>
  );
}
