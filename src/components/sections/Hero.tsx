"use client";

import { useRef } from "react";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { GMark } from "../layout/Logo";
import { useScrollProgress } from "../scroll/scroll";
import { Words } from "./Words";

/**
 * Primera pantalla. La secció és més alta que la pantalla i el contingut hi queda enganxat: mentre es
 * baixa, l'anell del logotip gira i creix, les xifres s'escampen i el text puja i s'esvaeix.
 * Tot es fa amb variables CSS escrites des del scroll; l'estat inicial és el de l'HTML.
 */
export function Hero({ t }: { t: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  useScrollProgress(section, (p) => section.current?.style.setProperty("--p", p.toFixed(4)));
  const startWords = t.hero.titleStart.split(" ").length;
  const highlightWords = t.hero.titleHighlight.split(" ").length;

  return (
    <section ref={section} id="top" className="relative h-[150svh]" style={{ "--p": 0 } as React.CSSProperties}>
      <div className="sticky top-0 flex h-svh min-h-[40rem] items-center overflow-hidden">
        {/* Fons: resplendor del degradat del logotip i quadrícula fina, com un full de càlcul. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_45%,#000_10%,transparent_70%)]" />
          <div className="absolute right-[-20vmin] top-1/2 size-[110vmin] -translate-y-1/2 rounded-full bg-[image:var(--brand-conic)] opacity-25 blur-[120px]" />
        </div>

        {/* L'anell. Gira sol a poc a poc i, a més, amb el scroll. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10vmin] top-1/2 size-[min(74vmin,50rem)] max-md:right-[-30vw] max-md:top-[24%] max-md:size-[85vw] max-md:opacity-40"
          style={{
            transform: "translateY(calc(-50% + var(--p) * -12vh)) rotate(calc(var(--p) * 160deg)) scale(calc(1 + var(--p) * 0.35))",
          }}
        >
          <div className="size-full animate-[ring-idle_80s_linear_infinite]">
            <GMark className="size-full drop-shadow-[0_40px_80px_rgba(77,70,192,0.45)]" />
          </div>
        </div>

        {/* Xifres que suren al voltant de l'anell i s'escampen en baixar. */}
        <FloatChip className="right-[min(50vmin,34rem)] top-[24%]" dx={-60} dy={-80} delay="0s">
          <span className="gradient-text display text-3xl">−30%</span>
          <span className="text-xs text-slate">{t.hero.proof[1]}</span>
        </FloatChip>
        <FloatChip className="right-[4vmin] top-[70%]" dx={80} dy={60} delay="-2s">
          <span className="display text-3xl text-sky-light">24/7</span>
          <span className="text-xs text-slate">365</span>
        </FloatChip>
        <FloatChip className="right-[min(46vmin,31rem)] top-[66%]" dx={-90} dy={90} delay="-4s">
          <span className="display text-3xl text-pink-light">+25</span>
          <span className="text-xs text-slate">{t.hero.proof[0]?.replace("+25 ", "")}</span>
        </FloatChip>

        <div
          className="container-x relative"
          style={{ transform: "translateY(calc(var(--p) * -14vh))", opacity: "calc(1 - var(--p) * 1.4)" }}
        >
          <div className="max-w-[46rem] pt-[var(--header-h)]">
            <p className="eyebrow reveal flex items-center gap-3 text-sky-light">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-[pulse-dot_2s_ease-out_infinite] rounded-full bg-cyan" />
                <span className="relative size-2 rounded-full bg-cyan" />
              </span>
              {t.hero.eyebrow}
            </p>
            <h1 className="display reveal-words mt-6 text-[clamp(2.75rem,8vw,6.25rem)]">
              <Words text={t.hero.titleStart} />
              <Words text={t.hero.titleHighlight} offset={startWords} className="gradient-text pb-[0.08em]" />
              <Words text={t.hero.titleEnd} offset={startWords + highlightWords} />
            </h1>
            <p className="reveal mt-7 max-w-[36rem] text-lg text-slate md:text-xl" style={{ "--i": 3 } as React.CSSProperties}>
              {t.hero.lead}
            </p>
            <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ "--i": 4 } as React.CSSProperties}>
              <a href="#contacto" className="btn btn-primary">
                {t.hero.cta} <span className="arrow" aria-hidden>→</span>
              </a>
              <a href={site.phoneHref} className="btn btn-ghost">
                {t.hero.call} · <span className="num">{site.phone}</span>
              </a>
            </div>
            <ul className="reveal mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate" style={{ "--i": 5 } as React.CSSProperties}>
              {t.hero.proof.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg viewBox="0 0 16 16" className="size-4 text-cyan" aria-hidden>
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="#clientes"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-slate md:flex [@media(max-height:820px)]:!hidden"
          style={{ opacity: "calc(1 - var(--p) * 4)" }}
        >
          {t.hero.scroll}
          <span className="block h-10 w-px overflow-hidden bg-line">
            <span className="block h-1/2 w-px animate-[float-y_1.6s_ease-in-out_infinite] bg-cyan" />
          </span>
        </a>
      </div>
    </section>
  );
}

function FloatChip({
  className,
  dx,
  dy,
  delay,
  children,
}: {
  className: string;
  dx: number;
  dy: number;
  delay: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute hidden md:block ${className}`}
      style={{ transform: `translate(calc(var(--p) * ${dx}px), calc(var(--p) * ${dy}px))`, opacity: "calc(1 - var(--p) * 1.6)" }}
    >
      <div
        className="flex flex-col rounded-2xl border border-line bg-night-2/70 px-5 py-3 shadow-2xl backdrop-blur-md animate-[float-y_6s_ease-in-out_infinite]"
        style={{ animationDelay: delay }}
      >
        {children}
      </div>
    </div>
  );
}
