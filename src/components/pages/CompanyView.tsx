import Image from "next/image";
import Link from "next/link";
import { Clients } from "@/components/sections/Clients";
import { Counter } from "@/components/sections/Counter";
import { Words } from "@/components/sections/Words";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** «Compañía»: el contingut de quienes-somos.php, amb la foto de l'Albert i el seu cas d'èxit. */
export function CompanyView({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.company;
  return (
    <>
      {/* Filosofia. */}
      <section aria-labelledby="empresa-title" className="relative overflow-hidden pb-20 pt-[calc(var(--header-h)+4rem)] md:pb-28 md:pt-[calc(var(--header-h)+7rem)]">
        <div className="container-x">
          <p className="eyebrow reveal text-sky-light">{c.eyebrow}</p>
          <h1 id="empresa-title" className="display reveal-words mt-5 max-w-5xl text-[clamp(2.5rem,7vw,6rem)]">
            <Words text={c.title} />
          </h1>
          <p className="reveal mt-8 max-w-3xl text-lg text-slate md:text-xl" style={{ "--i": 3 } as React.CSSProperties}>
            {c.text}
          </p>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {c.pillars.map((pillar, i) => (
              <li key={pillar.title} className="reveal bg-night p-7 md:p-9" style={{ "--i": i } as React.CSSProperties}>
                <h2 className="display gradient-text w-fit text-3xl md:text-4xl">{pillar.title}</h2>
                <p className="mt-3 text-slate">{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* +25 anys. */}
      <section aria-labelledby="empresa-anys" className="band py-20 md:py-28">
        <div className="container-x grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="reveal">
            <Counter value={c.about.value} prefix={c.about.prefix} className="display gradient-text block text-[clamp(6rem,16vw,12rem)] leading-[0.85]" />
            <h2 id="empresa-anys" className="display mt-4 text-2xl md:text-3xl">
              {c.about.label}
            </h2>
          </div>
          <div className="grid gap-5 text-[var(--band-ink-soft)] md:text-lg">
            {c.about.paragraphs.map((paragraph, i) => (
              <p key={i} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Història. */}
      <section aria-labelledby="empresa-historia" className="py-20 md:py-28">
        <div className="container-x">
          <p className="eyebrow reveal text-sky-light">{c.history.eyebrow}</p>
          <h2 id="empresa-historia" className="display reveal mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)]">
            {c.history.title}
          </h2>
          <ol className="history reveal relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden className="history-line absolute left-[1.15rem] top-2 h-[calc(100%-1rem)] w-0.5 bg-[image:var(--brand-gradient)] md:left-0 md:top-[1.15rem] md:h-0.5 md:w-full" />
            {c.history.items.map((item, i) => (
              <li key={item.title} className="relative pl-14 md:pl-0 md:pt-14">
                <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-line bg-night-2 md:left-0">
                  <span className="size-3 rounded-full bg-[image:var(--brand-gradient)]" />
                </span>
                <p className="num display gradient-text w-fit text-3xl">{item.when}</p>
                <h3 className="display mt-2 text-xl">{item.title}</h3>
                <p className="mt-3 text-slate">{item.text}</p>
                <span className="sr-only">{i + 1}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Valors: l'Albert. */}
      <section aria-labelledby="empresa-valors" className="band overflow-hidden py-20 md:py-28">
        <div className="container-x grid items-center gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
          <figure className="reveal relative mx-auto w-full max-w-sm">
            <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-[image:var(--brand-gradient)] opacity-80 blur-[2px]" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-white">
              <Image src={site.ceo.photo} alt={c.values.photoAlt} width={350} height={525} className="h-auto w-full" sizes="(min-width: 768px) 24rem, 90vw" />
            </div>
          </figure>
          <div>
            <p className="eyebrow reveal text-ocean dark:text-sky-light">{c.values.eyebrow}</p>
            <h2 id="empresa-valors" className="display reveal mt-4 text-[clamp(2rem,4.5vw,3.5rem)]">
              {c.values.title}
            </h2>
            <blockquote className="reveal mt-8 border-l-2 border-magenta pl-6 text-lg leading-relaxed md:text-xl">“{c.values.quote}”</blockquote>
            <div className="reveal mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p>
                <span className="display block text-lg">{site.ceo.name}</span>
                <span className="text-sm text-[var(--band-ink-soft)]">{c.values.role}</span>
              </p>
              <a href={site.ceo.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-ocean underline-offset-4 hover:underline dark:text-sky-light">
                {c.values.linkedin} ↗
              </a>
            </div>
            <figure className="reveal mt-10 rounded-2xl border border-[var(--band-line)] bg-[var(--band-2)] p-5">
              <blockquote className="italic">«{c.values.ellison}»</blockquote>
              <figcaption className="mt-2 text-sm text-[var(--band-ink-soft)]">— {c.values.ellisonAuthor}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Casos d'èxit. */}
      <section aria-labelledby="empresa-casos" className="py-20 md:py-28">
        <div className="container-x">
          <p className="eyebrow reveal text-sky-light">{c.cases.eyebrow}</p>
          <h2 id="empresa-casos" className="display reveal mt-4 text-[clamp(2rem,4.5vw,3.5rem)]">
            {c.cases.title}
          </h2>
          <Link
            href={`/${locale}/casos/mdm-intune-samsung`}
            className="glow-card reveal group mt-10 grid gap-8 overflow-hidden p-7 [--band-2:var(--color-night-2)] [--band-line:var(--color-line)] md:grid-cols-[1.1fr_0.9fr] md:p-10"
          >
            <div>
              <p className="eyebrow text-pink-light">
                {t.caseStudy.category} · {t.caseStudy.date}
              </p>
              <h3 className="display mt-3 text-2xl md:text-3xl">{t.caseStudy.title}</h3>
              <p className="mt-4 text-slate">{t.caseStudy.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-sky-light">
                {c.cases.read} <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
            <ul className="grid content-center gap-4 sm:grid-cols-3 md:grid-cols-1">
              {t.case.stats.map((stat) => (
                <li key={stat.label} className="border-l-2 border-line pl-4">
                  <span className="num display gradient-text text-4xl">
                    {stat.prefix}
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <p className="text-sm text-slate">{stat.label}</p>
                </li>
              ))}
            </ul>
          </Link>
        </div>
      </section>

      <Clients t={t} />

      {/* Crida final. */}
      <section aria-labelledby="empresa-cta" className="py-20 md:py-28">
        <div className="container-x text-center">
          <h2 id="empresa-cta" className="display reveal mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)]">
            {c.cta.title}
          </h2>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}#contacto`} className="btn btn-primary">
              {c.cta.button} <span className="arrow" aria-hidden>→</span>
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              <span className="num">{site.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
