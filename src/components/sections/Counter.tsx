"use client";

import { useEffect, useRef } from "react";
import { easeOutCubic } from "@/lib/math";

/**
 * Xifra que compta des de zero quan entra a la pantalla. L'HTML ja porta el valor final; amb moviment
 * reduït no es toca.
 */
export function Counter({ value, prefix = "", suffix = "", className }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || value === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          element.textContent = `${prefix}${Math.round(easeOutCubic(t) * value)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        element.textContent = `${prefix}0${suffix}`;
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className={`num ${className ?? ""}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
