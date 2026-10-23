import { easeOutCubic, segment } from "../../lib/math";

// «Gestor Global · CIO as a Service»: la seva empresa al centre i les sis àrees al voltant. Amb el
// scroll es dibuixa una línia del centre a cada àrea, una darrere l'altra, i s'explica la que s'encén.
// Al final, totes connectades: un sol interlocutor.

export const AREAS = 6;
const START = 0.06;
const END = 0.86;
const STEP = (END - START) / AREAS;

export type HubState = {
  /** Àrea que s'explica ara (0-5). */
  active: number;
  /** 0-1 per àrea: la línia del centre fins a l'àrea. */
  lines: number[];
  /** 0-1: tancament (totes enceses i el missatge final). */
  done: number;
};

export function hubState(progress: number): HubState {
  const lines = Array.from({ length: AREAS }, (_, i) => easeOutCubic(segment(progress, START + i * STEP, START + i * STEP + STEP * 0.6)));
  const active = Math.min(AREAS - 1, Math.max(0, Math.floor((progress - START) / STEP)));
  return { active, lines, done: segment(progress, END, END + 0.08) };
}

/** Posició (viewBox 400 × 400) del node de cada àrea: hexàgon, la primera a dalt i en sentit horari. */
export function nodePoint(index: number, radius = 150) {
  const angle = ((index * 360) / AREAS - 90) * (Math.PI / 180);
  const round = (value: number) => Math.round(value * 1000) / 1000;
  return { x: round(200 + radius * Math.cos(angle)), y: round(200 + radius * Math.sin(angle)) };
}
