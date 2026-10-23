"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

/** «Soporte 24/7»: com viatja una incidència pel seu helpdesk, i què hi ha darrere. */
export function Support({ t }: { t: Dictionary }) {
  const s = t.support;
  return (
    <section id="soporte" aria-labelledby="soporte-title" className="band relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="eyebrow reveal text-pink-light">{s.eyebrow}</p>
            <h2 id="soporte-title" className="display reveal mt-4 text-[clamp(2rem,5vw,3.75rem)]">
              {s.title}
            </h2>
          </div>
          <p className="reveal text-lg text-[var(--band-ink-soft)] md:pb-2">{s.text}</p>
        </div>

        <TicketFlow t={t} />

        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {s.features.map((feature, i) => (
            <li key={feature.title} className="reveal border-l-2 border-[var(--band-line)] pl-5" style={{ "--i": i % 3 } as React.CSSProperties}>
              <h3 className="display text-lg">{feature.title}</h3>
              <p className="mt-1.5 text-[var(--band-ink-soft)]">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * El recorregut d'un tiquet pels tres passos del seu helpdesk (Problema → Soporte → Solventado), com el
 * «Procesando ticket…» de la seva web. Es mou sol, en bucle, només mentre és a la pantalla.
 */
function TicketFlow({ t }: { t: Dictionary }) {
  const s = t.support;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => element.toggleAttribute("data-run", Boolean(entry?.isIntersecting)), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="ticket-flow reveal mt-14 rounded-[1.75rem] border border-[var(--band-line)] bg-[var(--band-2)] p-5 md:p-10">
      <ol className="relative grid gap-5 md:grid-cols-3 md:gap-8">
        <span aria-hidden className="absolute left-[16%] right-[16%] top-[1.75rem] hidden h-0.5 bg-[var(--band-line)] md:block">
          <span className="ticket-rail block h-full origin-left bg-[image:var(--brand-gradient)]" />
        </span>
        {s.flow.map((step, i) => (
          <li key={step.title} className="ticket-step relative flex gap-4 md:flex-col md:items-center md:text-center">
            <span className="ticket-dot display relative z-10 grid size-14 shrink-0 place-items-center rounded-full text-base">{i + 1}</span>
            <div>
              <h3 className="display text-xl">{step.title}</h3>
              <p className="mt-1.5 text-[var(--band-ink-soft)]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div aria-hidden className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-[var(--band-line)] bg-[var(--band)] px-4 py-3 text-sm">
        <span className="flex items-center gap-3">
          <span className="ticket-spinner size-4 rounded-full border-2 border-[var(--band-line)] border-t-cyan" />
          <span className="font-semibold">
            {s.ticket} #<span className="num">2406</span>
          </span>
        </span>
        <span className="relative h-5 w-44 overflow-hidden text-right font-bold">
          <span className="ticket-status-a absolute inset-0 text-[var(--band-ink-soft)]">{s.processing}</span>
          <span className="ticket-status-b absolute inset-0 text-cyan">✓ {s.resolved}</span>
        </span>
      </div>
    </div>
  );
}
