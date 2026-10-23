import { easeInOutCubic, segment } from "../../lib/math";

// «Qué hacemos»: la secció queda fixa i els panells de servei llisquen en horitzontal amb el scroll.
// Cada panell s'atura una estona (per llegir-lo) abans de passar al següent.

/** Tros del recorregut que cada panell es queda quiet, en proporció al tram que li toca. */
const HOLD = 0.45;

/**
 * Posició del carril, en panells (0 = el primer centrat, panels - 1 = l'últim). Entre parada i parada
 * el moviment és suau (entra i surt a poc a poc).
 */
export function trackPosition(progress: number, panels: number) {
  if (panels <= 1) return 0;
  const moves = panels - 1;
  const span = 1 / moves;
  const p = Math.min(1, Math.max(0, progress));
  const index = Math.min(moves - 1, Math.floor(p / span));
  const local = (p - index * span) / span;
  // Mitja parada al principi i mitja al final de cada tram: així el primer i l'últim panell també reposen.
  const t = easeInOutCubic(segment(local, HOLD / 2, 1 - HOLD / 2));
  return index + t;
}

/** El panell que es llegeix ara: el més proper a la posició del carril. */
export function activePanel(progress: number, panels: number) {
  return Math.round(trackPosition(progress, panels));
}
