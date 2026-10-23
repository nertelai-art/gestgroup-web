"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "./Logo";

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Amb l'idioma davant: així també funcionen des de les pàgines que no són la portada.
  const links = [
    { href: `/${locale}#servicios`, label: t.nav.services },
    { href: `/${locale}#metodo`, label: t.nav.method },
    { href: `/${locale}/empresa`, label: t.nav.company },
    { href: `/${locale}#caso`, label: t.nav.case },
    { href: `/${locale}#preguntas`, label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? "border-b border-line bg-night/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={`/${locale}`} className="text-[0.95rem]" aria-label="Gestgroup">
          <Logo />
        </Link>

        <nav aria-label={t.nav.label} className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate transition-colors hover:text-snow">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch locale={locale} label={t.nav.language} className="hidden sm:flex" />
          <Link href={`/${locale}#contacto`} className="btn btn-primary hidden min-h-10 px-5 py-2 text-sm sm:inline-flex">
            {t.nav.cta}
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobil"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-snow transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-snow transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="menu-mobil" hidden={!open} className="container-x h-[calc(100dvh-var(--header-h))] pb-10 pt-6 lg:hidden">
        <nav aria-label={t.nav.label} className="flex flex-col gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="display border-b border-line py-4 text-3xl">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href={`/${locale}#contacto`} onClick={() => setOpen(false)} className="btn btn-primary">
            {t.nav.cta}
          </Link>
          <LanguageSwitch locale={locale} label={t.nav.language} className="flex" />
        </div>
      </div>
    </header>
  );
}

function LanguageSwitch({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  // Canvia només l'idioma i es queda a la mateixa pàgina (/es/empresa → /ca/empresa).
  const rest = usePathname().split("/").slice(2).join("/");
  return (
    <nav aria-label={label} className={`items-center gap-1 rounded-full border border-line p-1 text-xs font-bold uppercase ${className ?? ""}`}>
      {locales.map((code) => (
        <Link
          key={code}
          href={rest ? `/${code}/${rest}` : `/${code}`}
          hrefLang={code}
          lang={code}
          aria-current={code === locale ? "true" : undefined}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${code === locale ? "bg-snow text-night" : "text-slate hover:text-snow"}`}
        >
          {code}
        </Link>
      ))}
    </nav>
  );
}
