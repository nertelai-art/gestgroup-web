"use client";

import { useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { GMark } from "../layout/Logo";
import { useReducedMotion, useScrollProgress } from "../scroll/scroll";
import { cycleState, nodePosition } from "./cycle-phases";

/**
 * Mètode LeanIT + Kaizen. L'anell del logotip es dibuixa amb el scroll (una màscara cònica) i, quan
 * arriba a cada fase, n'encén el node i en canvia el text. L'HTML porta l'anell tancat i l'última fase.
 */
export function CycleScene({ t }: { t: Dictionary }) {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLLIElement | null)[]>([]);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const last = useRef(-1);
  const phases = t.method.phases;

  useScrollProgress(section, (progress) => {
    if (reduced) return;
    const state = cycleState(progress);
    stage.current?.style.setProperty("--draw", state.draw.toFixed(4));
    stage.current?.style.setProperty("--spin", `${state.spin.toFixed(2)}deg`);
    state.lit.forEach((lit, i) => nodes.current[i]?.style.setProperty("--lit", lit.toFixed(3)));
    if (state.active !== last.current) {
      last.current = state.active;
      panels.current.forEach((panel, i) => panel?.toggleAttribute("data-active", i === state.active));
      nodes.current.forEach((node, i) => node?.toggleAttribute("data-active", i === state.active));
    }
  });

  return (
    <section ref={section} id="metodo" aria-labelledby="metodo-title" className="relative h-[360svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-[var(--header-h)]">
        <div aria-hidden className="absolute right-[-10vw] top-1/4 size-[50vw] rounded-full bg-magenta/15 blur-[140px]" />
        <div className="container-x relative grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="md:order-2">
            <p className="eyebrow text-sky-light">{t.method.eyebrow}</p>
            <h2 id="metodo-title" className="display mt-3 text-[clamp(1.6rem,4.2vw,3.4rem)]">
              {t.method.title}
            </h2>
            <p className="mt-4 hidden max-w-lg text-slate md:block md:text-lg">{t.method.lead}</p>

            <div className="relative mt-6 grid md:mt-10">
              {phases.map((phase, i) => (
                <div
                  key={phase.title}
                  ref={(el) => {
                    panels.current[i] = el;
                  }}
                  data-active={i === phases.length - 1 ? "" : undefined}
                  className="col-start-1 row-start-1 translate-y-4 opacity-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] data-[active]:translate-y-0 data-[active]:opacity-100"
                >
                  <p className="num display text-sm text-slate">
                    0{i + 1} <span className="opacity-50">/ 0{phases.length}</span>
                  </p>
                  <h3 className="display gradient-text mt-2 w-fit text-4xl md:text-6xl">{phase.title}</h3>
                  <p className="mt-4 max-w-md text-lg text-snow/85">{phase.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={stage}
            className="relative mx-auto aspect-square w-[min(78vw,46svh)] md:order-1 md:w-[min(40vw,70svh)]"
            style={{ "--draw": 1, "--spin": "0deg" } as React.CSSProperties}
            role="img"
            aria-label={`${t.method.cycle}: ${phases.map((p) => p.title).join(" → ")}`}
          >
            {/* Pista i anell dibuixat. */}
            <div
              className="absolute inset-[8%] rounded-full bg-white/10"
              style={{
                maskImage: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                WebkitMaskImage: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              }}
            />
            <div
              className="absolute inset-[8%] rounded-full [mask-composite:intersect] [-webkit-mask-composite:source-in]"
              style={{
                // Comença a dalt en cian i acaba en magenta: el degradat del logotip fent la volta.
                backgroundImage: "conic-gradient(#00bded, #3593cb 25%, #4d46c0 50%, #9c25b6 75%, #b00080)",
                maskImage:
                  "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px)), conic-gradient(#000 calc(var(--draw) * 360deg), transparent 0)",
                WebkitMaskImage:
                  "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px)), conic-gradient(#000 calc(var(--draw) * 360deg), transparent 0)",
              }}
            />
            {/* Al mig, la G, que gira un quart de volta al llarg de la secció. */}
            <div className="absolute inset-[30%]" style={{ transform: "rotate(var(--spin))" }}>
              <GMark className="size-full drop-shadow-[0_20px_50px_rgba(77,70,192,0.5)]" />
            </div>
            <ol>
              {phases.map((phase, i) => {
                const { x, y } = nodePosition(i);
                return (
                  <li
                    key={phase.title}
                    ref={(el) => {
                      nodes.current[i] = el;
                    }}
                    data-active={i === phases.length - 1 ? "" : undefined}
                    className="cycle-node group absolute flex flex-col items-center gap-2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span className="dot grid size-11 place-items-center rounded-full border border-white/20 bg-[image:var(--brand-gradient)] text-sm font-bold text-white shadow-lg transition-shadow group-data-[active]:shadow-[0_0_0_6px_rgba(0,189,237,0.18),0_0_30px_rgba(0,189,237,0.6)] md:size-14">
                      <span className="num display">{i + 1}</span>
                    </span>
                    <span className="display whitespace-nowrap rounded-full bg-night/80 px-2.5 py-1 text-[0.7rem] backdrop-blur md:text-xs">
                      {phase.title}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
