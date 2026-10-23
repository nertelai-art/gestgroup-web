import type { Dictionary } from "@/i18n/dictionaries";

// Icones de línia per a les sis àrees que revisa Gestor Global.
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

/** «Gestor Global»: les sis àrees que analitzen, totes visibles d'un cop d'ull. */
export function Areas({ t }: { t: Dictionary }) {
  const a = t.areas;
  return (
    <section id="gestor-global" aria-labelledby="areas-title" className="band relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="eyebrow reveal text-pink-light">{a.eyebrow}</p>
            <h2 id="areas-title" className="display reveal mt-4 text-[clamp(2rem,5vw,3.75rem)]">
              {a.title}
            </h2>
          </div>
          <p className="reveal text-lg text-[var(--band-ink-soft)] md:pb-2">{a.text}</p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.items.map((item, i) => (
            <li
              key={item.id}
              className="glow-card reveal flex flex-col p-6 md:p-7"
              style={{ "--i": i % 3 } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-4">
                <svg viewBox="0 0 24 24" className="size-9 text-sky-light" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {icons[item.id]}
                </svg>
                <span className="num display text-sm text-[var(--band-ink-soft)]">0{i + 1}</span>
              </div>
              <h3 className="display mt-6 text-2xl">{item.name}</h3>
              <p className="mt-2 text-[var(--band-ink-soft)]">{item.text}</p>
            </li>
          ))}
        </ul>

        <a href="#factura" className="reveal mt-10 inline-flex items-center gap-2 font-bold text-sky-light hover:underline">
          {a.cta} <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}
