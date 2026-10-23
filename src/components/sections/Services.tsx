"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Words } from "./Words";

const chapters = ["global", "help", "innova"] as const;
type Chapter = (typeof chapters)[number];

/**
 * «Qué hacemos»: tres capítols amb el contingut real de les tres pàgines de servei de Gestgroup.
 * A l'esquerra, un índex fix que marca el capítol que es llegeix; a la dreta, cada servei amb la seva
 * peça: les sis àrees de Gestor Global (desplegables), el recorregut d'un tiquet i l'R+D+i.
 */
export function Services({ t }: { t: Dictionary }) {
  const s = t.services;
  const [active, setActive] = useState<Chapter>("global");
  const refs = useRef<Partial<Record<Chapter, HTMLElement | null>>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id.replace("servicio-", "") as Chapter);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of chapters) {
      const element = refs.current[id];
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="band relative py-24 md:py-32">
      <div className="container-x">
        <p className="eyebrow reveal text-ocean dark:text-sky-light">{s.eyebrow}</p>
        <h2 id="servicios-title" className="display reveal-words mt-4 max-w-4xl text-[clamp(2rem,5vw,4rem)]">
          <Words text={s.title} />
        </h2>
        <p className="reveal mt-6 max-w-2xl text-lg text-[var(--band-ink-soft)]">{s.lead}</p>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          {/* Índex fix. */}
          <nav aria-label={s.navLabel} className="hidden md:block">
            <ol className="sticky top-28 grid gap-1">
              {chapters.map((id, i) => (
                <li key={id}>
                  <a
                    href={`#servicio-${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className="group flex items-baseline gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[var(--band-line)] aria-[current]:bg-[var(--band-2)]"
                  >
                    <span className="num display text-sm text-[var(--band-ink-soft)] group-aria-[current]:gradient-text">0{i + 1}</span>
                    <span className="display text-lg group-aria-[current]:text-[var(--band-ink)] text-[var(--band-ink-soft)]">{s[id].short}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-24 md:gap-32">
            {/* 01 · Gestor Global */}
            <article
              id="servicio-global"
              ref={(el) => {
                refs.current.global = el;
              }}
              aria-labelledby="servicio-global-title"
              className="scroll-mt-28"
            >
              <ChapterHead index={1} tag={s.global.tag} title={s.global.title} id="servicio-global-title" text={s.global.text} />
              <div className="reveal mt-10 border-t border-[var(--band-line)]">
                {s.global.areas.map((area, i) => (
                  <details key={area.name} name="areas" open={i === 0} className="area group border-b border-[var(--band-line)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-baseline gap-4">
                        <span className="num text-sm text-[var(--band-ink-soft)]">0{i + 1}</span>
                        <span className="display text-[clamp(1.4rem,3vw,2.25rem)] transition-colors group-open:gradient-text">{area.name}</span>
                      </span>
                      <span
                        aria-hidden
                        className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--band-line)] transition-transform duration-500 group-open:rotate-45"
                      >
                        <svg viewBox="0 0 16 16" className="size-4">
                          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-6 pl-10 text-[var(--band-ink-soft)] md:text-lg">{area.text}</p>
                  </details>
                ))}
              </div>
              <a href="#factura" className="reveal mt-8 inline-flex items-center gap-2 font-bold text-ocean hover:underline dark:text-sky-light">
                {s.global.cta} <span aria-hidden>↓</span>
              </a>
            </article>

            {/* 02 · Soporte */}
            <article
              id="servicio-help"
              ref={(el) => {
                refs.current.help = el;
              }}
              aria-labelledby="servicio-help-title"
              className="scroll-mt-28"
            >
              <ChapterHead index={2} tag={s.help.tag} title={s.help.title} id="servicio-help-title" text={s.help.text} />
              <TicketFlow t={t} />
              <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {s.help.features.map((feature, i) => (
                  <li key={feature.title} className="reveal border-l-2 border-[var(--band-line)] pl-4" style={{ "--i": i % 3 } as React.CSSProperties}>
                    <h4 className="display text-base">{feature.title}</h4>
                    <p className="mt-1 text-sm text-[var(--band-ink-soft)]">{feature.text}</p>
                  </li>
                ))}
              </ul>
            </article>

            {/* 03 · Innovación */}
            <article
              id="servicio-innova"
              ref={(el) => {
                refs.current.innova = el;
              }}
              aria-labelledby="servicio-innova-title"
              className="scroll-mt-28"
            >
              <ChapterHead index={3} tag={s.innova.tag} title={s.innova.title} id="servicio-innova-title" text={s.innova.text} />
              <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-[var(--band-line)] bg-[var(--band-line)] md:grid-cols-3">
                {s.innova.pillars.map((pillar, i) => (
                  <li key={pillar.title} className="reveal bg-[var(--band-2)] p-7" style={{ "--i": i } as React.CSSProperties}>
                    <span className="num display gradient-text text-4xl">0{i + 1}</span>
                    <h4 className="display mt-4 text-xl">{pillar.title}</h4>
                    <p className="mt-2 text-[var(--band-ink-soft)]">{pillar.text}</p>
                  </li>
                ))}
              </ol>
              <ul className="reveal mt-6 flex flex-wrap gap-2">
                {s.innova.areas.map((area) => (
                  <li key={area} className="rounded-full border border-[var(--band-line)] bg-[var(--band-2)] px-4 py-2 text-sm font-semibold">
                    {area}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterHead({ index, tag, title, id, text }: { index: number; tag: string; title: string; id: string; text: string }) {
  return (
    <header>
      <p className="eyebrow reveal flex items-center gap-3 text-magenta dark:text-pink-light">
        <span className="num md:hidden">0{index}</span>
        {tag}
      </p>
      <h3 id={id} className="display reveal mt-3 max-w-3xl text-[clamp(1.75rem,4vw,3rem)]">
        {title}
      </h3>
      <p className="reveal mt-5 max-w-2xl text-[var(--band-ink-soft)] md:text-lg">{text}</p>
    </header>
  );
}

/**
 * El recorregut d'un tiquet pels tres passos del seu helpdesk (Problema → Soporte → Solventado), com el
 * «Procesando ticket…» de la seva web. Es mou sol, en bucle, només mentre és a la pantalla.
 */
function TicketFlow({ t }: { t: Dictionary }) {
  const h = t.services.help;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => element.toggleAttribute("data-run", Boolean(entry?.isIntersecting)), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="ticket-flow reveal mt-10 rounded-3xl border border-[var(--band-line)] bg-[var(--band-2)] p-5 md:p-8">
      <ol className="relative grid gap-4 md:grid-cols-3 md:gap-6">
        {/* Carril per on passa el tiquet. */}
        <span aria-hidden className="absolute left-[16%] right-[16%] top-[1.6rem] hidden h-0.5 bg-[var(--band-line)] md:block">
          <span className="ticket-rail block h-full origin-left bg-[image:var(--brand-gradient)]" />
        </span>
        {h.flow.map((step, i) => (
          <li key={step.title} className="ticket-step relative flex gap-4 md:flex-col md:items-center md:text-center" style={{ "--n": i } as React.CSSProperties}>
            <span className="ticket-dot relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-[var(--band-line)] bg-[var(--band)] display text-sm">
              {i + 1}
            </span>
            <div>
              <h4 className="display text-lg">{step.title}</h4>
              <p className="mt-1 text-sm text-[var(--band-ink-soft)]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div aria-hidden className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[var(--band-line)] bg-[var(--band)] px-4 py-3 text-sm">
        <span className="flex items-center gap-3">
          <span className="ticket-spinner size-4 rounded-full border-2 border-[var(--band-line)] border-t-cyan" />
          <span className="font-semibold">
            {h.ticket} #<span className="num">2406</span>
          </span>
        </span>
        <span className="ticket-status relative h-5 w-40 overflow-hidden text-right font-bold">
          <span className="ticket-status-a absolute inset-0 text-[var(--band-ink-soft)]">{h.processing}</span>
          <span className="ticket-status-b absolute inset-0 text-cyan">✓ {h.resolved}</span>
        </span>
      </div>
    </div>
  );
}
