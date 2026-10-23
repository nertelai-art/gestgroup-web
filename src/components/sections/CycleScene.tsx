"use client";

import { useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { useReducedMotion, useScrollProgress } from "../scroll/scroll";
import { cycleState, GAP, PHASES, pointAt, segmentFill, segmentStart, tipAngle } from "./cycle-phases";

// Colors de cada segment: el degradat de l'anell del logotip, repartit en quatre trams.
const segmentColors = [
  ["#00bded", "#3593cb"],
  ["#3593cb", "#4d46c0"],
  ["#4d46c0", "#9c25b6"],
  ["#9c25b6", "#b00080"],
] as const;

function arcPath(index: number, radius = 84) {
  const start = segmentStart(index);
  const end = start + 360 / PHASES - GAP;
  const a = pointAt(start, radius);
  const b = pointAt(end, radius);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${radius} ${radius} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

/**
 * Mètode LeanIT + Kaizen. Un dial de quatre segments, un per fase, que s'omple amb el scroll; una llum
 * marca la punta. El nom de la fase va al centre del dial i l'explicació a la llista del costat: res de
 * text damunt del traç. L'HTML porta el dial ple i l'última fase.
 */
export function CycleScene({ t }: { t: Dictionary }) {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const arcs = useRef<(SVGPathElement | null)[]>([]);
  const tip = useRef<SVGGElement>(null);
  const centers = useRef<(HTMLDivElement | null)[]>([]);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  const last = useRef(-1);
  const phases = t.method.phases;
  const end = pointAt(tipAngle(1));

  useScrollProgress(section, (progress) => {
    if (reduced) return;
    const state = cycleState(progress);
    arcs.current.forEach((arc, i) => {
      const fill = segmentFill(state.draw, i);
      arc?.style.setProperty("stroke-dashoffset", String(1 - fill));
      // Amb fill 0, l'extrem arrodonit del traç encara pintaria un punt: s'amaga.
      arc?.style.setProperty("opacity", fill > 0 ? "1" : "0");
    });
    if (tip.current) {
      const point = pointAt(tipAngle(state.draw));
      tip.current.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
      tip.current.style.opacity = state.draw > 0 ? "1" : "0";
    }
    if (state.active !== last.current) {
      last.current = state.active;
      centers.current.forEach((center, i) => center?.toggleAttribute("data-active", i === state.active));
      steps.current.forEach((step, i) => {
        step?.toggleAttribute("data-active", i === state.active);
        step?.toggleAttribute("data-done", i < state.active);
      });
    }
  });

  return (
    <section ref={section} id="metodo" aria-labelledby="metodo-title" className="relative h-[340svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-[var(--header-h)]">
        <div className="container-x grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          {/* El dial. */}
          <div
            className="relative mx-auto aspect-square w-[min(68vw,34svh)] md:w-[min(42vw,68svh,36rem)]"
            role="img"
            aria-label={`${t.method.cycle}: ${phases.map((p) => p.title).join(" → ")}`}
          >
            <svg viewBox="0 0 200 200" className="absolute inset-0 size-full overflow-visible" aria-hidden>
              <defs>
                {segmentColors.map(([from, to], i) => {
                  const a = pointAt(segmentStart(i));
                  const b = pointAt(segmentStart(i) + 360 / PHASES - GAP);
                  return (
                    <linearGradient key={i} id={`dial-${i}`} gradientUnits="userSpaceOnUse" x1={a.x} y1={a.y} x2={b.x} y2={b.y}>
                      <stop offset="0" stopColor={from} />
                      <stop offset="1" stopColor={to} />
                    </linearGradient>
                  );
                })}
                <radialGradient id="dial-glow">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="0.35" stopColor="#7cc4ee" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#7cc4ee" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Marques de rellotge a l'interior: el ritme de la millora contínua. */}
              <g stroke="currentColor" className="text-snow/15">
                {Array.from({ length: 48 }, (_, i) => {
                  const a = pointAt(i * 7.5, 70);
                  const b = pointAt(i * 7.5, i % 12 === 0 ? 63 : 67);
                  return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={i % 12 === 0 ? 1.2 : 0.6} />;
                })}
              </g>
              {[0, 1, 2, 3].map((i) => (
                <path key={`track-${i}`} d={arcPath(i)} fill="none" stroke="var(--color-line)" strokeWidth="9" strokeLinecap="round" />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={`fill-${i}`}
                  ref={(el) => {
                    arcs.current[i] = el;
                  }}
                  d={arcPath(i)}
                  fill="none"
                  stroke={`url(#dial-${i})`}
                  strokeWidth="9"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1"
                  style={{ strokeDashoffset: 0 }}
                />
              ))}
              <g ref={tip} transform={`translate(${end.x.toFixed(2)} ${end.y.toFixed(2)})`}>
                <circle r="16" fill="url(#dial-glow)" />
                <circle r="4" fill="#fff" stroke="var(--color-cyan)" strokeWidth="1.5" />
              </g>
            </svg>

            {/* Centre: número i nom de la fase. */}
            <div className="absolute inset-[24%] grid place-items-center text-center">
              {phases.map((phase, i) => (
                <div
                  key={phase.title}
                  ref={(el) => {
                    centers.current[i] = el;
                  }}
                  data-active={i === PHASES - 1 ? "" : undefined}
                  className="col-start-1 row-start-1 scale-95 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] data-[active]:scale-100 data-[active]:opacity-100"
                >
                  <span className="num display gradient-text block text-[clamp(2.5rem,7vw,5rem)] leading-none">0{i + 1}</span>
                  <span className="display mt-2 block text-[clamp(0.95rem,1.8vw,1.5rem)]">{phase.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Texts. */}
          <div>
            <p className="eyebrow text-sky-light">{t.method.eyebrow}</p>
            <h2 id="metodo-title" className="display mt-3 text-[clamp(1.5rem,3.6vw,3rem)]">
              {t.method.title}
            </h2>
            <p className="mt-4 hidden max-w-lg text-slate md:block md:text-lg">{t.method.lead}</p>
            <ol className="mt-5 grid gap-1 md:mt-8">
              {phases.map((phase, i) => (
                <li
                  key={phase.title}
                  ref={(el) => {
                    steps.current[i] = el;
                  }}
                  data-active={i === PHASES - 1 ? "" : undefined}
                  data-done={i < PHASES - 1 ? "" : undefined}
                  className="cycle-step group grid grid-cols-[2.25rem_1fr] gap-x-3 border-t border-line py-2.5 md:py-3"
                >
                  <span className="num display pt-0.5 text-sm text-slate transition-colors group-data-[active]:text-cyan group-data-[done]:text-snow/60">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="display text-base text-slate transition-colors group-data-[active]:text-snow md:text-xl">{phase.title}</h3>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] group-data-[active]:grid-rows-[1fr]">
                      <p className="overflow-hidden text-sm text-snow/80 md:text-base">
                        <span className="block pt-1.5">{phase.text}</span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
