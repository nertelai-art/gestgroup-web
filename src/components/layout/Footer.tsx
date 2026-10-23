import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "./Logo";

export function Footer({ t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-night">
      <div aria-hidden className="h-px w-full bg-[image:var(--brand-gradient)] opacity-70" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-lg" />
          <p className="display mt-5 max-w-xs text-2xl">{t.footer.tagline}</p>
        </div>
        <address className="not-italic text-slate">
          <p>{site.street}</p>
          <p>
            {site.postalCode} {site.city}
          </p>
          <a href={site.phoneHref} className="num mt-3 inline-block font-bold text-snow hover:text-sky-light">
            {site.phone}
          </a>
        </address>
        <div className="flex flex-col items-start gap-3 text-slate">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-snow">
            {t.footer.linkedin} ↗
          </a>
          <a href="#top" className="hover:text-snow">
            {t.footer.top} ↑
          </a>
        </div>
      </div>
      <div className="container-x border-t border-line py-6 text-xs text-slate">
        © {site.copyrightYear} Gestgroup. {t.footer.rights}
      </div>
    </footer>
  );
}
