import type { Dictionary } from "@/i18n/dictionaries";
import { Words } from "./Words";

/** Color de la barra de dalt de cada servei: un tram del degradat del logotip. */
const accents = [
  "linear-gradient(90deg, #00bded, #3593cb)",
  "linear-gradient(90deg, #3593cb, #4d46c0)",
  "linear-gradient(90deg, #9c25b6, #b00080)",
];

/**
 * «Qué hacemos»: només el resum. Tres blocs grans, un per servei, amb una frase que diu què
 * s'obté i un enllaç a la secció que ho explica (Gestor Global i Soporte tenen la seva).
 */
export function Services({ t }: { t: Dictionary }) {
  const s = t.services;
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <p className="eyebrow reveal text-sky-light">{s.eyebrow}</p>
        <h2 id="servicios-title" className="display reveal-words mt-4 max-w-4xl text-[clamp(2rem,5vw,4rem)]">
          <Words text={s.title} />
        </h2>

        <ol className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3">
          {s.items.map((item, i) => (
            <li key={item.id} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <a
                href={item.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-night-2 p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(77,70,192,0.45)] md:p-9"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: accents[i] }} />
                <span className="num display text-sm text-slate">0{i + 1}</span>
                <span className="eyebrow mt-6 text-pink-light">{item.tag}</span>
                <h3 className="display mt-3 text-[clamp(1.5rem,2.4vw,2rem)]">{item.title}</h3>
                <p className="mt-4 text-slate">{item.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 font-bold text-sky-light">
                  {item.id === "innova" ? s.innovaCta : s.more}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    {item.id === "innova" ? "→" : "↓"}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
