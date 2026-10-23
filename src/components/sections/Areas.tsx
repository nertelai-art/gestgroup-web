"use client";

import { useRef, useSyncExternalStore } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { useReducedMotion, useScrollProgress } from "../scroll/scroll";
import { AREAS, hubState, nodePoint } from "./hub-phases";

// Icones de línia (quadrícula de 24) per a les sis àrees que revisa Gestor Global.
const icons: Record<string, React.ReactNode> = {
  communications: (
    <>
      <path d="M12 20v-7" />
      <circle cx="12" cy="11" r="1.6" />
      <path d="M8.2 14.8a5.4 5.4 0 0 1 0-7.6M15.8 7.2a5.4 5.4 0 0 1 0 7.6M5.3 17.7a9.5 9.5 0 0 1 0-13.4M18.7 4.3a9.5 9.5 0 0 1 0 13.4" />
    </>
  ),
  hardware: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </>
  ),
  software: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9.5 13.5 7.5 15.5l2 2M14.5 13.5l2 2-2 2" />
    </>
  ),
  licenses: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12 20 3M16.5 6.5l2.5 2.5M14 9l2 2" />
    </>
  ),
  databases: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </>
  ),
  staff: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.2c2.8.3 5 2.6 5 5.8" />
    </>
  ),
};

/** Geometria de l'esquema (viewBox 400 × 400). */
const RING = 140;
const NODE = 30;
const CENTER = 52;
const noop = () => () => {};

/**
 * «Gestor Global · CIO as a Service». La seva empresa al centre i les sis àrees al voltant: amb el scroll
 * es dibuixa una línia fins a cada àrea, s'encén i, al costat, s'explica què hi fa Gestgroup. Al final,
 * totes connectades: un sol interlocutor. Sense JS o amb moviment reduït, l'esquema surt complet i
 * les sis explicacions en llista (data-mode absent).
 */
export function Areas({ t }: { t: Dictionary }) {
  const a = t.areas;
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const scrollMode = hydrated && !reduced;
  const section = useRef<HTMLElement>(null);
  const lines = useRef<(SVGPathElement | null)[]>([]);
  const nodes = useRef<(SVGGElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useScrollProgress(section, (progress) => {
    if (!scrollMode) return;
    const state = hubState(progress);
    state.lines.forEach((line, i) => {
      lines.current[i]?.style.setProperty("stroke-dashoffset", String(1 - line));
      nodes.current[i]?.toggleAttribute("data-lit", line >= 0.98);
      nodes.current[i]?.toggleAttribute("data-active", i === state.active && state.done < 1);
      cards.current[i]?.toggleAttribute("data-active", i === state.active);
    });
    section.current?.style.setProperty("--done", state.done.toFixed(3));
  });

  return (
    <section ref={section} id="gestor-global" aria-labelledby="areas-title" data-mode={scrollMode ? "scroll" : undefined} className="hub band relative">
      <div className="hub-sticky">
        <div className="container-x grid h-full items-center gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-14">
          {/* Text: què és un CIO as a Service i l'àrea que s'encén. */}
          <div className="max-md:order-2">
            <p className="eyebrow text-pink-light">{a.eyebrow}</p>
            <h2 id="areas-title" className="display mt-3 text-[clamp(1.6rem,3.8vw,3.25rem)]">
              {a.title}
            </h2>
            <p className="hub-intro mt-4 max-w-xl text-[var(--band-ink-soft)] md:text-lg">{a.text}</p>

            <div className="hub-cards mt-6 md:mt-8">
              {a.items.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  data-active={i === 0 ? "" : undefined}
                  className="hub-card rounded-2xl border border-[var(--band-line)] bg-[var(--band-2)] p-5 md:p-6"
                >
                  <p className="num display text-sm text-[var(--band-ink-soft)]">
                    0{i + 1} <span className="opacity-60">/ 0{AREAS}</span>
                  </p>
                  <h3 className="display gradient-text mt-1 w-fit text-2xl md:text-3xl">{item.name}</h3>
                  <p className="mt-2 text-[var(--band-ink-soft)] md:text-lg">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="hub-done display mt-4 text-base md:mt-5 md:text-xl">{a.done}</p>
            <a href="#factura" className="mt-4 inline-flex items-center gap-2 font-bold text-sky-light hover:underline max-md:hidden">
              {a.cta} <span aria-hidden>↓</span>
            </a>
          </div>

          {/* L'esquema. */}
          <div className="relative mx-auto w-[min(80vw,34svh)] max-md:order-1 md:w-[min(44vw,74svh,36rem)]">
            <svg viewBox="0 0 400 400" className="w-full overflow-visible" role="img" aria-label={`${a.hub}: ${a.items.map((item) => item.name).join(", ")}`}>
              <defs>
                <linearGradient id="hub-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#00bded" />
                  <stop offset="0.5" stopColor="#4d46c0" />
                  <stop offset="1" stopColor="#b00080" />
                </linearGradient>
              </defs>
              {/* Òrbita de fons. */}
              <circle cx="200" cy="200" r={RING} fill="none" stroke="var(--band-line)" strokeWidth="1.5" strokeDasharray="2 8" className="hub-orbit" />
              {a.items.map((item, i) => {
                const from = nodePoint(i, CENTER + 6);
                const to = nodePoint(i, RING - NODE - 6);
                return (
                  <path
                    key={`line-${item.id}`}
                    ref={(el) => {
                      lines.current[i] = el;
                    }}
                    d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                    stroke="url(#hub-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1"
                    style={{ strokeDashoffset: 0 }}
                  />
                );
              })}
              {/* Centre: la seva empresa, amb Gestgroup com a CIO. */}
              <g className="hub-center">
                <circle cx="200" cy="200" r={CENTER} fill="var(--band-2)" stroke="url(#hub-gradient)" strokeWidth="3" />
                <text x="200" y="198" textAnchor="middle" className="fill-[var(--band-ink)] font-[family-name:var(--font-display)] text-[14px] font-extrabold">
                  {a.hub}
                </text>
                <text x="200" y="215" textAnchor="middle" className="fill-[var(--band-ink-soft)] text-[9.5px] font-semibold">
                  {a.hubRole}
                </text>
              </g>
              {a.items.map((item, i) => {
                const p = nodePoint(i, RING);
                const labelY = i === 0 ? p.y - NODE - 12 : p.y + NODE + 21;
                return (
                  <g
                    key={item.id}
                    ref={(el) => {
                      nodes.current[i] = el;
                    }}
                    data-lit=""
                    className="hub-node"
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  >
                    <circle cx={p.x} cy={p.y} r={NODE} className="hub-node-bg" />
                    <svg x={p.x - 12} y={p.y - 12} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="hub-node-icon">
                      {icons[item.id]}
                    </svg>
                    <text x={p.x} y={labelY} textAnchor="middle" className="hub-node-label text-[13px] font-bold">
                      {item.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
