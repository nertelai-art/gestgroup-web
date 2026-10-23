import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ContactForm } from "./ContactForm";

export function Contact({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[70%] bg-[image:radial-gradient(ellipse_at_top,rgba(77,70,192,0.35),transparent_65%)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow reveal text-sky-light">{t.contact.eyebrow}</p>
          <h2 id="contacto-title" className="display reveal mt-4 text-[clamp(2.2rem,5.5vw,4.25rem)]">
            {t.contact.title}
          </h2>
          <p className="reveal mt-6 max-w-md text-lg text-slate">{t.contact.lead}</p>

          <dl className="reveal mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="eyebrow text-slate">{t.contact.callTitle}</dt>
              <dd className="mt-2">
                <a href={site.phoneHref} className="display num text-3xl transition-colors hover:text-sky-light">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-slate">{t.contact.visitTitle}</dt>
              <dd className="mt-2">
                <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="group inline-block text-snow/90 hover:text-snow">
                  {site.street}
                  <br />
                  {site.postalCode} {site.city} <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="reveal">
          <ContactForm locale={locale} t={t} />
        </div>
      </div>
    </section>
  );
}
