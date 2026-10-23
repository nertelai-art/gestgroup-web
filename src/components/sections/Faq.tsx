import type { Dictionary } from "@/i18n/dictionaries";

/** Preguntes freqüents amb <details>: funcionen sense JS i els cercadors les llegeixen. */
export function Faq({ t }: { t: Dictionary }) {
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="relative py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow reveal text-sky-light">{t.faq.eyebrow}</p>
          <h2 id="preguntas-title" className="display reveal mt-4 text-[clamp(2rem,4.5vw,3.25rem)]">
            {t.faq.title}
          </h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {t.faq.items.map((item, i) => (
            <details key={item.q} className="faq group reveal" style={{ "--i": i } as React.CSSProperties}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold transition-colors hover:text-sky-light md:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:border-transparent group-open:bg-[image:var(--brand-gradient)]"
                >
                  <svg viewBox="0 0 16 16" className="size-4">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-slate">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
