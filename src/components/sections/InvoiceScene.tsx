"use client";

import { useMemo, useRef } from "react";
import { invoiceLines, invoiceTotals } from "@/data/invoice";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GMark } from "../layout/Logo";
import { useReducedMotion, useScrollProgress } from "../scroll/scroll";
import { invoiceState } from "./invoice-phases";

const intlLocale: Record<Locale, string> = { es: "es-ES", ca: "ca-ES" };

/**
 * «Cada línia, revisada». La factura entra, l'escàner la recorre i marca el que sobra, els imports
 * baixen i el total cau un 30%. Tot l'estat surt de `invoiceState(progrés)`; aquí només es pinta.
 * L'HTML porta l'estat final (es veu sencer sense JS o amb moviment reduït).
 */
export function InvoiceScene({ locale, t }: { locale: Locale; t: Dictionary }) {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const amounts = useRef<(HTMLSpanElement | null)[]>([]);
  const total = useRef<HTMLSpanElement>(null);
  const saving = useRef<HTMLSpanElement>(null);
  const scanner = useRef<HTMLDivElement>(null);
  const stamp = useRef<HTMLDivElement>(null);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const lastStep = useRef(-1);

  const money = useMemo(
    () => new Intl.NumberFormat(intlLocale[locale], { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" }),
    [locale],
  );
  const final = invoiceState(1);

  useScrollProgress(section, (progress) => {
    if (reduced) return;
    const state = invoiceState(progress);
    state.lines.forEach((line, i) => {
      const row = rows.current[i];
      if (row) {
        row.style.setProperty("--enter", line.enter.toFixed(3));
        row.style.setProperty("--scan", line.scan.toFixed(3));
        row.style.setProperty("--cut", line.cut.toFixed(3));
      }
      const amount = amounts.current[i];
      if (amount) amount.textContent = money.format(line.amount);
    });
    if (total.current) total.current.textContent = money.format(state.total);
    if (saving.current) saving.current.textContent = `−${Math.round(state.saving * 100)}%`;
    if (scanner.current) {
      scanner.current.style.setProperty("--y", state.scanner.toFixed(4));
      scanner.current.style.opacity = state.scanner > 0 && state.scanner < 1 ? "1" : "0";
    }
    stamp.current?.style.setProperty("--stamp", state.stamp.toFixed(3));
    bar.current?.style.setProperty("--p", progress.toFixed(4));
    if (state.step !== lastStep.current) {
      lastStep.current = state.step;
      steps.current.forEach((step, i) => step?.toggleAttribute("data-active", i === state.step));
    }
  });

  return (
    <section ref={section} id="factura" aria-labelledby="factura-title" className="relative h-[460svh] max-md:h-[400svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-[var(--header-h)]">
        <div aria-hidden className="absolute left-[-20vw] top-1/3 size-[60vw] rounded-full bg-indigo/20 blur-[140px]" />
        <div className="container-x relative grid items-center gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          {/* Text: quatre passos; el de l'acte actual s'encén. */}
          <div className="max-md:order-2">
            <p className="eyebrow text-sky-light">{t.invoice.eyebrow}</p>
            <h2 id="factura-title" className="display mt-3 text-[clamp(1.6rem,4.2vw,3.4rem)] max-md:sr-only">
              {t.invoice.title}
            </h2>
            <ol className="mt-3 grid gap-1 md:mt-10 md:gap-3">
              {t.invoice.steps.map((step, i) => (
                <li
                  key={step.title}
                  ref={(el) => {
                    steps.current[i] = el;
                  }}
                  data-active={reduced || i === final.step ? "" : undefined}
                  className="group grid grid-cols-[2rem_1fr] gap-x-3 rounded-2xl px-3 py-2 transition-[background-color,opacity] duration-500 data-[active]:bg-white/[0.04] max-md:hidden max-md:data-[active]:grid md:opacity-45 md:data-[active]:opacity-100"
                >
                  <span className="num display grid size-8 place-items-center rounded-full border border-line text-sm text-slate transition-colors group-data-[active]:border-transparent group-data-[active]:bg-[image:var(--brand-gradient)] group-data-[active]:text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="display text-lg md:text-xl">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate md:text-base">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div ref={bar} className="mt-6 hidden h-1 overflow-hidden rounded-full bg-line md:block" style={{ "--p": 1 } as React.CSSProperties}>
              <div className="h-full origin-left rounded-full bg-[image:var(--brand-gradient)]" style={{ transform: "scaleX(var(--p))" }} />
            </div>
          </div>

          {/* La factura. */}
          <div className="relative max-md:order-1">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-night-2/90 p-4 shadow-[0_40px_120px_-40px_rgba(0,189,237,0.35)] backdrop-blur md:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-line pb-3 md:pb-5">
                <div>
                  <p className="eyebrow text-[0.65rem] text-slate">{t.invoice.card.label}</p>
                  <p className="display mt-1 text-base md:text-lg">{t.invoice.card.company}</p>
                </div>
                <GMark className="size-8 md:size-10" />
              </div>

              <div className="relative">
                <ul className="divide-y divide-line">
                  {invoiceLines.map((line, i) => {
                    const copy = t.invoice.lines[line.id];
                    return (
                      <li
                        key={line.id}
                        ref={(el) => {
                          rows.current[i] = el;
                        }}
                        className="invoice-row grid grid-cols-[1fr_auto] items-center gap-x-4 py-1.5 md:py-3"
                        style={{ "--enter": 1, "--scan": 1, "--cut": 1 } as React.CSSProperties}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold md:text-base">{copy.name}</p>
                          <p className="hidden text-xs text-slate sm:block">{copy.detail}</p>
                          <p className="invoice-finding mt-1 flex items-center gap-1.5 text-[0.7rem] font-semibold text-pink-light md:text-xs">
                            <span className="size-1.5 shrink-0 rounded-full bg-magenta" aria-hidden />
                            <span className="truncate">{copy.finding}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="invoice-before num text-[0.7rem] text-slate line-through md:text-xs">{money.format(line.before)}</p>
                          <span
                            ref={(el) => {
                              amounts.current[i] = el;
                            }}
                            className="num display text-base md:text-xl"
                          >
                            {money.format(line.after)}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {/* L'escàner: una línia de llum que baixa per les partides. */}
                <div
                  ref={scanner}
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[-1rem] h-16 opacity-0 transition-opacity duration-300 md:inset-x-[-1.75rem]"
                  style={{ top: "calc(var(--y) * 100% - 2rem)", "--y": 0 } as React.CSSProperties}
                >
                  <div className="h-full bg-gradient-to-b from-transparent via-cyan/15 to-transparent" />
                  <div className="absolute inset-x-0 top-1/2 h-px bg-cyan shadow-[0_0_18px_4px_rgba(0,189,237,0.7)]" />
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between gap-4 border-t border-line pt-3 md:mt-4 md:pt-5">
                <div>
                  <p className="eyebrow text-[0.65rem] text-slate">{t.invoice.card.total}</p>
                  <p className="num mt-1 text-xs text-slate line-through">{money.format(invoiceTotals.before)}</p>
                </div>
                <div className="text-right">
                  <span ref={total} className="num display block text-3xl md:text-5xl">
                    {money.format(final.total)}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-cyan/10 px-2.5 py-1 text-xs font-bold text-cyan">
                    <span ref={saving} className="num">
                      −{Math.round(final.saving * 100)}%
                    </span>
                    {t.invoice.card.saving}
                  </span>
                </div>
              </div>
            </div>

            {/* Segell final. */}
            <div
              ref={stamp}
              aria-hidden
              className="invoice-stamp pointer-events-none absolute -right-3 -top-8 grid size-24 place-items-center md:-right-10 md:-top-6 md:size-28"
              style={{ "--stamp": 1 } as React.CSSProperties}
            >
              <div className="absolute inset-0 rounded-full bg-[image:var(--brand-conic)] p-[3px] shadow-[0_20px_60px_-10px_rgba(176,0,128,0.6)]">
                <div className="size-full rounded-full bg-night" />
              </div>
              <div className="relative text-center">
                <span className="gradient-text display block text-2xl md:text-3xl">−30%</span>
              </div>
            </div>

            <p className="mt-3 text-center text-[0.7rem] text-slate md:text-xs">{t.invoice.card.example}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
