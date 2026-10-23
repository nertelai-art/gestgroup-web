"use client";

import { useRef, useSyncExternalStore } from "react";
import { invoiceLines } from "@/data/invoice";
import type { Dictionary } from "@/i18n/dictionaries";
import { useReducedMotion, useScrollProgress } from "../scroll/scroll";
import { activePanel, trackPosition } from "./services-phases";

const PANELS = 3;
const noop = () => () => {};

/** Barra de dalt de cada panell: un tram del degradat del logotip. */
const accents = ["linear-gradient(90deg,#00bded,#3593cb)", "linear-gradient(90deg,#3593cb,#4d46c0)", "linear-gradient(90deg,#9c25b6,#b00080)"];

/**
 * «Qué hacemos»: la secció queda fixa i els tres serveis passen en horitzontal amb el scroll. Cada
 * panell explica el seu servei amb una peça animada que s'activa quan arriba: les barres de cost que
 * s'escurcen, el tiquet que es resol i el flux de dades que s'automatitza.
 * Sense JS o amb moviment reduït, els panells surten un sota l'altre i sencers (data-mode absent).
 */
export function Services({ t }: { t: Dictionary }) {
  const s = t.services;
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const counter = useRef<HTMLSpanElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  // El mode horitzontal només un cop hidratat (hi ha JS) i amb moviment permès.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const scrollMode = hydrated && !reduced;

  useScrollProgress(section, (progress) => {
    if (!scrollMode) return;
    section.current?.style.setProperty("--pos", trackPosition(progress, PANELS).toFixed(4));
    // Sempre, i no només quan canvia: un nou pintat de React pot haver tornat els atributs a l'estat inicial.
    const active = activePanel(progress, PANELS);
    panels.current.forEach((panel, i) => panel?.toggleAttribute("data-active", i === active));
    bars.current.forEach((bar, i) => bar?.toggleAttribute("data-active", i <= active));
    if (counter.current) counter.current.textContent = `0${active + 1}`;
  });

  return (
    <section
      ref={section}
      id="servicios"
      aria-labelledby="servicios-title"
      data-mode={scrollMode ? "scroll" : undefined}
      className="svc relative"
    >
      <div className="svc-sticky">
        <header className="container-x svc-head">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <p className="eyebrow text-sky-light">{s.eyebrow}</p>
              <h2 id="servicios-title" className="display mt-3 max-w-3xl text-[clamp(1.6rem,3.6vw,3rem)]">
                {s.title}
              </h2>
            </div>
            {/* Comptador i barres de progrés (només en mode horitzontal). */}
            <div className="svc-progress items-center gap-4" aria-hidden>
              <span className="num display text-sm text-slate">
                <span ref={counter} className="text-snow">
                  01
                </span>{" "}
                {s.of} 0{PANELS}
              </span>
              <span className="flex gap-1.5">
                {s.items.map((item, i) => (
                  <span
                    key={item.id}
                    ref={(el) => {
                      bars.current[i] = el;
                    }}
                    data-active={i === 0 ? "" : undefined}
                    className="h-1 w-10 rounded-full bg-line transition-colors duration-500 data-[active]:bg-[image:var(--brand-gradient)]"
                  />
                ))}
              </span>
            </div>
          </div>
        </header>

        <div className="svc-viewport">
          <div className="svc-track">
            {s.items.map((item, i) => (
              <article
                key={item.id}
                ref={(el) => {
                  panels.current[i] = el;
                }}
                data-active={!scrollMode || i === 0 ? "" : undefined}
                aria-labelledby={`svc-${item.id}`}
                className="svc-panel"
              >
                <div className="container-x grid h-full items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14">
                  <div className="svc-copy">
                    <span aria-hidden className="block h-1.5 w-16 rounded-full" style={{ background: accents[i] }} />
                    <p className="eyebrow mt-5 text-pink-light">{item.tag}</p>
                    <h3 id={`svc-${item.id}`} className="display mt-3 text-[clamp(1.6rem,3.4vw,2.9rem)]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-slate max-md:hidden md:text-lg">{item.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.points.map((point) => (
                        <li key={point} className="rounded-full border border-line bg-night-2 px-3 py-1.5 text-xs font-semibold md:text-sm">
                          {point}
                        </li>
                      ))}
                    </ul>
                    <a href={item.href} className="group mt-6 inline-flex items-center gap-2 font-bold text-sky-light md:mt-8">
                      {item.id === "innova" ? s.innovaCta : s.more}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        {item.id === "innova" ? "→" : "↓"}
                      </span>
                    </a>
                  </div>
                  <div className="svc-visual">
                    {item.id === "global" ? <CostBars t={t} /> : item.id === "help" ? <TicketCard t={t} /> : <AutomationFlow t={t} />}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Gestor Global: el cost de cada àrea s'escurça i el tros que sobra queda ratllat (la factura d'exemple). */
function CostBars({ t }: { t: Dictionary }) {
  const v = t.services.visual;
  const max = Math.max(...invoiceLines.map((line) => line.before));
  // Els noms curts de les àrees (els mateixos de l'esquema de Gestor Global), no els de la factura.
  const areaNames: Record<string, string> = Object.fromEntries(t.areas.items.map((area) => [area.id, area.name]));
  return (
    <div className="rounded-[1.75rem] border border-line bg-night-2 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] md:p-7">
      <ul className="grid gap-3.5 md:gap-4">
        {invoiceLines.map((line, i) => (
          <li key={line.id} className="grid grid-cols-[7.75rem_1fr] items-center gap-3 md:grid-cols-[9.5rem_1fr]">
            <span className="truncate text-xs font-semibold md:text-sm">{areaNames[line.id]}</span>
            <span className="svc-bar relative h-3 rounded-full bg-line md:h-3.5" style={{ "--i": i } as React.CSSProperties}>
              <span className="svc-bar-ghost absolute inset-y-0 left-0 rounded-full" style={{ width: `${(line.before / max) * 100}%` }} />
              <span
                className="svc-bar-fill absolute inset-y-0 left-0 rounded-full bg-[image:var(--brand-gradient)]"
                style={{ "--before": `${(line.before / max) * 100}%`, "--after": `${(line.after / max) * 100}%` } as React.CSSProperties}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-slate">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-6 rounded-full bg-[image:var(--brand-gradient)]" aria-hidden />
          {v.kept}
        </span>
        <span className="flex items-center gap-2">
          <span className="svc-stripes h-2.5 w-6 rounded-full" aria-hidden />
          {v.trimmed}
        </span>
        <span className="ml-auto italic">{v.example}</span>
      </div>
    </div>
  );
}

/** Soporte: un tiquet que passa d'obert a resolt, i el tècnic en remot o in situ. */
function TicketCard({ t }: { t: Dictionary }) {
  const v = t.services.visual;
  return (
    <div className="rounded-[1.75rem] border border-line bg-night-2 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] md:p-7">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <span className="font-semibold">
          {t.support.ticket} #<span className="num">2406</span>
        </span>
        <span className="svc-sla rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">✓ {v.ticketSla}</span>
      </div>
      <ol className="mt-5 grid gap-4">
        {v.ticketStates.map((state, i) => (
          <li key={state} className="svc-state flex items-center gap-4" style={{ "--i": i } as React.CSSProperties}>
            <span className="svc-state-dot relative grid size-9 shrink-0 place-items-center rounded-full border border-line text-sm font-bold">
              <span className="svc-state-check absolute inset-0 grid place-items-center rounded-full bg-[image:var(--brand-gradient)] text-white">✓</span>
              <span className="num text-slate">{i + 1}</span>
            </span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
              <span className="svc-state-bar block h-full rounded-full bg-[image:var(--brand-gradient)]" />
            </span>
            <span className="w-24 text-right text-sm font-semibold">{state}</span>
          </li>
        ))}
      </ol>
      <div className="svc-where relative mt-6 grid grid-cols-2 rounded-full border border-line p-1 text-center text-sm font-semibold" aria-hidden>
        <span className="svc-where-pill absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[image:var(--brand-gradient)]" />
        <span className="svc-where-a relative z-10 py-2">{v.remote}</span>
        <span className="svc-where-b relative z-10 py-2">{v.onsite}</span>
      </div>
    </div>
  );
}

/** Innovació: dades, aplicacions i equips que passen per l'automatització i en surten informes i processos. */
function AutomationFlow({ t }: { t: Dictionary }) {
  const v = t.services.visual;
  const sourcesY = [50, 130, 210];
  const outputsY = [90, 170];
  return (
    <div className="rounded-[1.75rem] border border-line bg-night-2 p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] md:p-6">
      <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label={`${v.sources.join(", ")} → ${v.engine} → ${v.outputs.join(", ")}`}>
        <defs>
          <linearGradient id="svc-flow" x1="0" x2="1">
            <stop offset="0" stopColor="#00bded" />
            <stop offset="0.5" stopColor="#4d46c0" />
            <stop offset="1" stopColor="#b00080" />
          </linearGradient>
        </defs>
        {sourcesY.map((y, i) => (
          <path key={`in-${i}`} d={`M112 ${y} C 160 ${y}, 160 130, 200 130`} className="svc-flow-line" style={{ "--i": i } as React.CSSProperties} />
        ))}
        {outputsY.map((y, i) => (
          <path key={`out-${i}`} d={`M260 130 C 300 130, 300 ${y}, 300 ${y}`} className="svc-flow-line" style={{ "--i": i + 3 } as React.CSSProperties} />
        ))}
        {sourcesY.map((y, i) => (
          <g key={`src-${i}`} className="svc-node" style={{ "--i": i } as React.CSSProperties}>
            <rect x="12" y={y - 18} width="100" height="36" rx="10" className="fill-night-3 stroke-line" />
            <text x="62" y={y + 5} textAnchor="middle" className="fill-snow text-[13px] font-semibold">
              {v.sources[i]}
            </text>
          </g>
        ))}
        <g className="svc-engine">
          <circle cx="230" cy="130" r="34" fill="url(#svc-flow)" />
          <path d="M222 118 L216 130 L228 130 L222 142 M236 118 L244 130 L236 142" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="230" y="186" textAnchor="middle" className="fill-snow text-[13px] font-bold">
            {v.engine}
          </text>
        </g>
        {outputsY.map((y, i) => (
          <g key={`dst-${i}`} className="svc-node" style={{ "--i": i + 3 } as React.CSSProperties}>
            <rect x="300" y={y - 18} width="90" height="36" rx="10" className="fill-night-3 stroke-line" />
            <text x="345" y={y + 5} textAnchor="middle" className="fill-snow text-[13px] font-semibold">
              {v.outputs[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
