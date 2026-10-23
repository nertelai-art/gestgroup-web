"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * «Qué hacemos»: una foto i una frase per servei. A escriptori, la foto queda fixa a l'esquerra i, quan
 * es llegeix un altre servei, la nova s'obre com una cortina de baix a dalt amb un zoom suau. A mòbil,
 * cada servei porta la seva foto. Sense JS es veu tot, sense cortina.
 */
export function Services({ t }: { t: Dictionary }) {
  const s = t.services;
  const items = useRef<(HTMLElement | null)[]>([]);
  const frames = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const active = items.current.indexOf(entry.target as HTMLElement);
          items.current.forEach((item, i) => item?.toggleAttribute("data-active", i === active));
          // La foto activa i les d'abans queden obertes (la nova tapa l'anterior); les de després, tancades.
          frames.current.forEach((frame, i) => frame?.toggleAttribute("data-open", i <= active));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <p className="eyebrow reveal text-sky-light">{s.eyebrow}</p>
        <h2 id="servicios-title" className="display reveal mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)]">
          {s.title}
        </h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
          {/* Marc fix amb les tres fotos, una sobre l'altra (només a escriptori). */}
          <div className="hidden md:block">
            <div className="sticky top-0 flex h-svh items-center pt-[var(--header-h)]">
              <div className="relative aspect-[6/5] w-full overflow-hidden rounded-[2rem] bg-night-3 shadow-[0_40px_90px_-40px_rgba(10,14,28,0.55)]">
                {s.items.map((item, i) => (
                  <div
                    key={item.id}
                    ref={(el) => {
                      frames.current[i] = el;
                    }}
                    data-open={i === 0 ? "" : undefined}
                    className="svc-frame absolute inset-0"
                  >
                    {/* eager: retallades a zero, el navegador les creu invisibles i la càrrega diferida no les demanaria. */}
                    <Image src={item.image} alt={item.alt} fill loading="eager" sizes="(min-width: 768px) 55vw, 100vw" className="svc-photo object-cover" />
                  </div>
                ))}
                {/* Vora de degradat de la marca, molt fina. */}
                <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>

          {/* Els tres serveis. */}
          <ol className="grid gap-14 md:gap-0 md:pb-[20svh]">
            {s.items.map((item, i) => (
              <li
                key={item.id}
                ref={(el) => {
                  items.current[i] = el;
                }}
                data-active={i === 0 ? "" : undefined}
                className="svc-item md:flex md:min-h-[70svh] md:flex-col md:justify-center"
              >
                <div className="relative mb-6 aspect-[6/5] overflow-hidden rounded-[1.5rem] md:hidden">
                  <Image src={item.image} alt={item.alt} fill sizes="100vw" className="object-cover" />
                </div>
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
