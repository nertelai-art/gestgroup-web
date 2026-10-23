import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * «Qué hacemos»: una fila per servei, amb la foto i el text junts i alternant el costat. Quan la fila
 * entra a la pantalla, la foto s'obre (cap al costat del text) amb un zoom suau i després entra el text.
 * L'animació la fa RevealObserver (data-shown); sense JS o amb moviment reduït, tot es veu de cop.
 */
export function Services({ t }: { t: Dictionary }) {
  const s = t.services;
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <p className="eyebrow reveal text-sky-light">{s.eyebrow}</p>
        <h2 id="servicios-title" className="display reveal mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)]">
          {s.title}
        </h2>

        <ol className="mt-14 grid gap-16 md:mt-20 md:gap-28">
          {s.items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <li
                key={item.id}
                className={`svc-row reveal-group grid items-center gap-7 md:grid-cols-2 md:gap-16 ${flip ? "svc-row-flip" : ""}`}
              >
                <div className={`svc-photo-wrap relative aspect-[6/5] overflow-hidden rounded-[1.75rem] bg-night-3 ${flip ? "md:order-2" : ""}`}>
                  {/* eager: retallada a zero fins que la fila entra, la càrrega diferida no la demanaria a temps. */}
                  <Image src={item.image} alt={item.alt} fill loading="eager" sizes="(min-width: 768px) 50vw, 100vw" className="svc-photo object-cover" />
                </div>
                <div className="svc-text">
                  <span className="num display gradient-text block text-5xl md:text-6xl">0{i + 1}</span>
                  <p className="eyebrow mt-4 text-pink-light">{item.tag}</p>
                  <h3 className="display mt-3 text-[clamp(1.6rem,2.8vw,2.5rem)]">{item.title}</h3>
                  <p className="mt-4 max-w-md text-lg text-slate">{item.text}</p>
                  <a href={item.href} className="group mt-6 inline-flex w-fit items-center gap-2 font-bold text-sky-light">
                    {item.id === "innova" ? s.innovaCta : s.more}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      {item.id === "innova" ? "→" : "↓"}
                    </span>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
