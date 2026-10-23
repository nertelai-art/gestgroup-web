"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { useReducedMotion, useScrollProgress } from "../scroll/scroll";
import { chaos, heroState, SHEETS } from "./hero-phases";
import { Words } from "./Words";

/**
 * Primera pantalla: una pila desordenada de factures de paper, una per cada àrea que Gestgroup revisa.
 * En baixar, l'auditor hi marca en magenta el que sobra, les factures s'ordenen en una sola pila i hi
 * cau el segell «Bajo control». L'HTML porta la pila desordenada (el que es veu en arribar); amb
 * moviment reduït es pinta directament ordenada i segellada.
 */
export function Hero({ t }: { t: Dictionary }) {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sheets = useRef<(HTMLDivElement | null)[]>([]);
  const copy = useRef<HTMLDivElement>(null);
  const startWords = t.hero.titleStart.split(" ").length;
  const highlightWords = t.hero.titleHighlight.split(" ").length;

  const parts = { sheets, stage, copy };
  useScrollProgress(section, (progress) => paint(parts, reduced ? 1 : progress));
  // Si el moviment reduït es coneix després de la primera pintada, es posa l'estat final sense esperar el scroll.
  useEffect(() => {
    if (reduced) paint({ sheets, stage, copy }, 1);
  }, [reduced]);

  // Inclinació suau de tota la pila amb el ratolí (només amb punter fi i si es permet moviment).
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const element = stage.current;
    if (!element) return;
    const move = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      element.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced]);

  return (
    <section ref={section} id="inicio" aria-labelledby="hero-title" className="relative h-[200svh]">
      <div className="sticky top-0 flex h-svh min-h-[36rem] items-center overflow-hidden">
        {/* Una sola llum suau damunt de la pila: res de taques de colors. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_72%_55%,rgba(255,255,255,0.07),transparent_70%)] max-md:bg-[radial-gradient(ellipse_90%_45%_at_50%_75%,rgba(255,255,255,0.07),transparent_70%)]" />

        <div className="container-x relative grid h-full grid-rows-[auto_minmax(0,1fr)] gap-2 pb-4 pt-[calc(var(--header-h)+1.5rem)] md:grid-rows-1 md:items-center md:gap-10 md:pb-0 md:pt-[var(--header-h)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div ref={copy}>
            <p className="eyebrow reveal text-sky-light">{t.hero.eyebrow}</p>
            <h1 id="hero-title" className="display reveal-words mt-5 text-[clamp(2.5rem,7vw,5.75rem)]">
              <Words text={t.hero.titleStart} />
              <Words text={t.hero.titleHighlight} offset={startWords} className="gradient-text pb-[0.08em]" />
              <Words text={t.hero.titleEnd} offset={startWords + highlightWords} />
            </h1>
            <p className="reveal mt-6 max-w-[34rem] text-lg text-slate md:text-xl" style={{ "--i": 3 } as React.CSSProperties}>
              {t.hero.lead}
            </p>
            <div className="reveal mt-8 flex flex-wrap items-center gap-3" style={{ "--i": 4 } as React.CSSProperties}>
              <a href="#contacto" className="btn btn-primary">
                {t.hero.cta} <span className="arrow" aria-hidden>→</span>
              </a>
              <a href={site.phoneHref} className="btn btn-ghost">
                {t.hero.call} · <span className="num">{site.phone}</span>
              </a>
            </div>
          </div>

          {/* La pila de factures. */}
          <div
            ref={stage}
            role="img"
            aria-label={t.hero.pileLabel}
            className="hero-stage relative h-full max-h-[44rem] min-h-[14rem]"
            style={{ "--stamp": reduced ? 1 : 0 } as React.CSSProperties}
          >
            <div aria-hidden className="hero-tilt absolute inset-0">
              {t.hero.sheets.map((sheet, i) => {
                const pose = chaos[i]!;
                return (
                  <div key={sheet.label} className="hero-drop absolute left-1/2 top-1/2" style={{ "--i": i } as React.CSSProperties}>
                    <div
                      ref={(el) => {
                        sheets.current[i] = el;
                      }}
                      className="hero-sheet"
                      style={
                        {
                          "--x": pose.x,
                          "--y": pose.y,
                          "--z": pose.z,
                          "--rx": `${pose.rx}deg`,
                          "--ry": `${pose.ry}deg`,
                          "--rz": `${pose.rz}deg`,
                          "--mark": 0,
                        } as React.CSSProperties
                      }
                    >
                      <Sheet label={sheet.label} finding={sheet.finding} invoice={t.hero.invoice} total={t.hero.total} seed={i} />
                      {i === SHEETS - 1 ? <Stamp text={t.hero.stamp} /> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Parts = {
  sheets: React.RefObject<(HTMLDivElement | null)[]>;
  stage: React.RefObject<HTMLDivElement | null>;
  copy: React.RefObject<HTMLDivElement | null>;
};

/** Escriu l'estat del progrés al DOM (variables CSS); mai passa per l'estat de React. */
function paint({ sheets, stage, copy }: Parts, progress: number) {
  const state = heroState(progress);
  state.sheets.forEach((pose, i) => {
    const sheet = sheets.current[i];
    if (!sheet) return;
    sheet.style.setProperty("--x", pose.x.toFixed(2));
    sheet.style.setProperty("--y", pose.y.toFixed(2));
    sheet.style.setProperty("--z", pose.z.toFixed(2));
    sheet.style.setProperty("--rx", `${pose.rx.toFixed(2)}deg`);
    sheet.style.setProperty("--ry", `${pose.ry.toFixed(2)}deg`);
    sheet.style.setProperty("--rz", `${pose.rz.toFixed(2)}deg`);
    sheet.style.setProperty("--mark", state.marks[i]!.toFixed(3));
  });
  stage.current?.style.setProperty("--stamp", state.stamp.toFixed(3));
  if (copy.current) copy.current.style.opacity = String(1 - state.fade);
}

/** Amplades (en %) de les línies de cada factura: fixes, perquè cada full sigui diferent però estable. */
const lineWidths = [
  [72, 58, 80, 46, 64],
  [60, 84, 52, 70, 44],
  [78, 50, 66, 58, 74],
  [54, 76, 62, 82, 48],
  [68, 44, 74, 56, 80],
  [82, 62, 48, 72, 58],
];
/** Quina línia de cada factura marca l'auditor. */
const markedLine = [1, 3, 2, 0, 4, 2];

function Sheet({ label, finding, invoice, total, seed }: { label: string; finding: string; invoice: string; total: string; seed: number }) {
  const widths = lineWidths[seed % lineWidths.length]!;
  const marked = markedLine[seed % markedLine.length]!;
  return (
    <div className="hero-paper">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="hero-mono text-[0.55em] tracking-[0.2em] text-[#8a8f9c]">{invoice}</p>
          <p className="display mt-[0.25em] text-[1.05em] leading-tight text-[#141a2e]">{label}</p>
        </div>
        <span className="hero-mono mt-[0.1em] text-[0.55em] text-[#8a8f9c]">Nº {String(104 + seed * 37).padStart(6, "0")}</span>
      </div>
      <ul className="mt-[1.1em] grid gap-[0.7em]">
        {widths.map((width, line) => (
          <li key={line} className="relative flex items-center justify-between gap-[0.8em]">
            <span className="h-[0.42em] rounded-full bg-[#e3e6ee]" style={{ width: `${width}%` }} />
            <span className="h-[0.42em] w-[16%] shrink-0 rounded-full bg-[#d5d9e3]" />
            {line === marked ? (
              <>
                <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="hero-mark pointer-events-none absolute -inset-x-[0.5em] -inset-y-[0.55em] h-[calc(100%+1.1em)] w-[calc(100%+1em)]" aria-hidden>
                  <path d="M10 22 C 12 6, 70 3, 120 5 S 196 10, 193 22 S 150 38, 96 37 S 4 34, 14 16" pathLength={1} />
                </svg>
                <span className="hero-finding hero-mono absolute -right-[0.6em] top-[-1.7em] rounded-[0.3em] bg-magenta px-[0.5em] py-[0.2em] text-[0.62em] font-bold uppercase tracking-wide text-white shadow-sm">
                  {finding}
                </span>
              </>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="mt-[1.1em] flex items-center justify-between border-t border-dashed border-[#d5d9e3] pt-[0.8em]">
        <span className="hero-mono text-[0.55em] font-bold tracking-[0.2em] text-[#4d5672]">{total}</span>
        <span className="h-[0.6em] w-[30%] rounded-full bg-[#141a2e]/80" />
      </div>
    </div>
  );
}

function Stamp({ text }: { text: string }) {
  return (
    <div className="hero-stamp pointer-events-none absolute left-[60%] top-[68%] grid aspect-square w-[56%] place-items-center rounded-full border-[0.22em] border-magenta text-magenta" aria-hidden>
      <div className="absolute inset-[0.35em] rounded-full border-[0.08em] border-magenta/80" />
      <span className="display px-[0.6em] text-center text-[1.05em] uppercase leading-[1.05] tracking-[0.04em]">{text}</span>
    </div>
  );
}
