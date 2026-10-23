import type { Dictionary } from "@/i18n/dictionaries";
import { Words } from "./Words";

const icons: Record<string, React.ReactNode> = {
  // Gràfic que baixa: el cost controlat.
  global: <path d="M4 6v14h16M8 10l4 4 3-3 5 5" />,
  // Auriculars: el helpdesk.
  help: <path d="M4 15v-3a8 8 0 0116 0v3M4 15a2 2 0 002 2h1v-5H6a2 2 0 00-2 2zm16 0a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2zm-3 2v1a3 3 0 01-3 3h-2" />,
  // Engranatge amb guspira: la innovació.
  innova: <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.4-6.4l-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0l-2.1-2.1M7.7 7.7L5.6 5.6M12 9a3 3 0 110 6 3 3 0 010-6z" />,
};

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="band relative py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="eyebrow reveal text-ocean dark:text-sky-light">{t.services.eyebrow}</p>
            <h2 id="servicios-title" className="display reveal-words mt-4 text-[clamp(2rem,5vw,3.75rem)]">
              <Words text={t.services.title} />
            </h2>
          </div>
          <p className="reveal text-lg text-[var(--band-ink-soft)] md:pb-2">{t.services.lead}</p>
        </div>

        <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {t.services.items.map((item, i) => (
            <li key={item.id} className="glow-card reveal flex flex-col p-7 md:p-8" style={{ "--i": i } as React.CSSProperties}>
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-[image:var(--brand-gradient)] text-white shadow-lg">
                  <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {icons[item.id]}
                  </svg>
                </span>
                <span className="num display text-5xl text-[var(--band-line)] [-webkit-text-stroke:1px_var(--band-ink-soft)] opacity-30">0{i + 1}</span>
              </div>
              <p className="eyebrow mt-8 text-magenta dark:text-pink-light">{item.tag}</p>
              <h3 className="display mt-2 text-2xl">{item.title}</h3>
              <p className="mt-3 text-[var(--band-ink-soft)]">{item.text}</p>
              <ul className="mt-6 grid gap-2.5 border-t border-[var(--band-line)] pt-6 text-sm">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden>
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
