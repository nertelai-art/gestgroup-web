import Link from "next/link";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "./Logo";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const legal = [
    { href: `/${locale}/aviso-legal`, label: t.legal.notice },
    { href: `/${locale}/privacidad`, label: t.legal.privacy },
    { href: `/${locale}/cookies`, label: t.legal.cookies },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-line bg-night">
      <div aria-hidden className="h-px w-full bg-[image:var(--brand-gradient)] opacity-70" />
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-lg" />
          <p className="display mt-5 max-w-xs text-2xl">{t.footer.tagline}</p>
        </div>
        <address className="not-italic text-slate">
          <p>{site.street}</p>
          <p>
            {site.postalCode} {site.city}
          </p>
          <a href={site.phoneHref} className="num mt-3 block font-bold text-snow hover:text-sky-light">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="mt-1 block text-snow/90 hover:text-sky-light">
            {site.email}
          </a>
        </address>
        <nav aria-label={t.footer.company} className="flex flex-col items-start gap-3 text-slate">
          <Link href={`/${locale}/empresa`} className="hover:text-snow">
            {t.footer.company}
          </Link>
          <Link href={`/${locale}/casos/mdm-intune-samsung`} className="hover:text-snow">
            {t.company.cases.eyebrow}
          </Link>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-snow">
            {t.footer.linkedin} ↗
          </a>
        </nav>
        <nav aria-label={t.footer.legal} className="flex flex-col items-start gap-3 text-slate">
          {legal.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-snow">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container-x flex flex-wrap justify-between gap-3 border-t border-line py-6 text-xs text-slate">
        <span>
          © {site.copyrightYear} {site.legal.name}. {t.footer.rights}
        </span>
        <a href="#top" className="hover:text-snow">
          {t.footer.top} ↑
        </a>
      </div>
    </footer>
  );
}
