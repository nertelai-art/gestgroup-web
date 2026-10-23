import type { Dictionary } from "@/i18n/dictionaries";
import { Counter } from "./Counter";

const COLS = 25;
const ROWS = 8;

/**
 * El desplegament de 800 mòbils (cas real del blog de Gestgroup, maig 2025). Cada rectangle són quatre
 * terminals; quan la secció entra a la pantalla, s'encenen en onada, com si es configuressin.
 */
export function Case({ t }: { t: Dictionary }) {
  const devices = Array.from({ length: COLS * ROWS }, (_, i) => ({ col: i % COLS, row: Math.floor(i / COLS) }));
  return (
    <section id="caso" aria-labelledby="caso-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="eyebrow reveal text-sky-light">{t.case.eyebrow}</p>
          <h2 id="caso-title" className="display reveal mt-4 text-[clamp(2rem,5vw,3.75rem)]">
            {t.case.title}
          </h2>
          <p className="reveal mt-6 text-lg text-slate">{t.case.text}</p>
          <ul className="reveal mt-7 flex flex-wrap gap-2">
            {t.case.tech.map((tech) => (
              <li key={tech} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-snow/85">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <div className="fleet rounded-[1.75rem] border border-line bg-night-2 p-5 md:p-8">
            <svg viewBox={`0 0 ${COLS * 10} ${ROWS * 16}`} className="w-full" aria-hidden>
              <defs>
                <linearGradient id="fleet-gradient" x1="0" y1="0" x2={COLS * 10} y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#00bded" />
                  <stop offset="0.35" stopColor="#3593cb" />
                  <stop offset="0.6" stopColor="#4d46c0" />
                  <stop offset="0.85" stopColor="#9c25b6" />
                  <stop offset="1" stopColor="#b00080" />
                </linearGradient>
              </defs>
              {devices.map(({ col, row }) => (
                <g key={`${col}-${row}`}>
                  <rect x={col * 10 + 2} y={row * 16 + 2} width="6" height="12" rx="1.5" className="fill-white/[0.07]" />
                  <rect
                    x={col * 10 + 2}
                    y={row * 16 + 2}
                    width="6"
                    height="12"
                    rx="1.5"
                    fill="url(#fleet-gradient)"
                    className="fleet-on"
                    style={{ "--d": col + row * 1.5 } as React.CSSProperties}
                  />
                </g>
              ))}
            </svg>
            <ul className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
              {t.case.stats.map((stat) => (
                <li key={stat.label}>
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} className="display gradient-text block text-4xl md:text-5xl" />
                  <p className="mt-2 text-sm text-slate">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
