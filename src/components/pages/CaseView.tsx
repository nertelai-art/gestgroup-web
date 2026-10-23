import Link from "next/link";
import { Counter } from "@/components/sections/Counter";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** El cas d'èxit del seu blog (maig 2025), sencer. */
export function CaseView({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.caseStudy;
  return (
    <article className="pb-24 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
      <header className="container-x">
        <Link href={`/${locale}/empresa`} className="text-sm font-semibold text-slate hover:text-snow">
          ← {c.back}
        </Link>
        <p className="eyebrow mt-8 text-pink-light">
          {c.category} · <time dateTime="2025-05-16">{c.date}</time>
        </p>
        <h1 className="display mt-4 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)]">{c.title}</h1>
        <p className="mt-4 text-xl text-sky-light">{c.subtitle}</p>
        <ul className="mt-12 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
          {t.case.stats.map((stat) => (
            <li key={stat.label}>
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} className="display gradient-text block text-5xl" />
              <p className="mt-1 text-sm text-slate">{stat.label}</p>
            </li>
          ))}
        </ul>
      </header>

      <div className="container-x mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="legal-body max-w-3xl text-lg">
          <p className="text-xl text-snow">{c.intro}</p>
          {c.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p className="!mt-1 text-sky-light">{section.subtitle}</p>
              {"text" in section && section.text ? <p>{section.text}</p> : null}
              {section.list.length > 0 ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-line bg-night-2 p-6">
            <h2 className="display text-xl">{c.closingTitle}</h2>
            <p className="mt-3 text-sm text-slate">{c.closingText}</p>
            <dl className="mt-5 grid gap-2 text-sm">
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="font-bold text-sky-light hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Tel.</dt>
                <dd>
                  <a href={site.phoneHref} className="num font-bold hover:text-sky-light">
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>
            <Link href={`/${locale}#contacto`} className="btn btn-primary mt-6 w-full">
              {t.hero.cta}
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
