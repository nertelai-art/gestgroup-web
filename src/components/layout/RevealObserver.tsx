"use client";

import { useEffect } from "react";

/**
 * Entrades discretes. Sense JS, o amb moviment reduït, tot es veu des del principi: el CSS només
 * amaga `.reveal`, `.reveal-words` i el contingut de `.reveal-group` quan aquest component posa `data-live` a <html>.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.dataset.live = "";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>(".reveal, .reveal-words, .reveal-group").forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      delete root.dataset.live;
    };
  }, []);
  return null;
}
