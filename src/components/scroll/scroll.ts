"use client";

import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";

// Peces comunes de les escenes guiades pel scroll (les mateixes que a la resta de webs de Nertel).

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (callback: () => void) => {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => false);
}

/**
 * Progrés (0-1) del scroll dins d'una secció alta amb contingut sticky. Es guarda en una ref i no en
 * estat: canvia a cada píxel i no volem re-renderitzar React. `onChange` toca el DOM directament.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, onChange?: (progress: number) => void) {
  const progress = useRef(0);
  const callback = useRef(onChange);
  useEffect(() => {
    callback.current = onChange;
  });
  useEffect(() => {
    // Directament a l'esdeveniment, sense requestAnimationFrame: el navegador ja n'envia un per
    // fotograma, i així l'estat no es queda enrere en una pestanya que no pinta.
    const update = () => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      progress.current = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 1;
      callback.current?.(progress.current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
  return progress;
}
