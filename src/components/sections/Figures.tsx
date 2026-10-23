import type { Dictionary } from "@/i18n/dictionaries";
import { Counter } from "./Counter";

export function Figures({ t }: { t: Dictionary }) {
  return (
    <section id="cifras" aria-labelledby="cifras-title" className="relative overflow-hidden bg-[linear-gradient(100deg,#0a6fb0,#4d46c0_45%,#8d1fb0_75%,#b00080)] py-16 text-white md:py-20">
      <div aria-hidden className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="container-x relative">
        <h2 id="cifras-title" className="sr-only">
          {t.figures.title}
        </h2>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {t.figures.items.map((item, i) => (
            <li key={item.label} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} className="display block text-[clamp(3rem,7vw,5.5rem)] leading-none" />
              <p className="mt-3 max-w-[14rem] text-sm font-semibold text-white/85 md:text-base">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
