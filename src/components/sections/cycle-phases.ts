import { segment } from "../../lib/math";

// Coreografia del cicle Kaizen: l'anell del logo es dibuixa amb el scroll i encén les quatre fases.

export const PHASES = 4;

export type CycleState = {
  /** 0-1: tros d'anell dibuixat. */
  draw: number;
  /** Fase que s'explica ara (0-3). */
  active: number;
  /** 0-1 per fase: el node s'encén quan l'anell hi arriba. */
  lit: number[];
  /** Graus que gira tot l'anell: un quart de volta al llarg de la secció. */
  spin: number;
};

export function cycleState(progress: number): CycleState {
  // Lineal: amb una corba, la primera i l'última fase s'emportaven molt més scroll que les del mig.
  const draw = segment(progress, 0.05, 0.85);
  const lit = Array.from({ length: PHASES }, (_, i) => segment(draw, i / PHASES - 0.02, i / PHASES + 0.04));
  // La fase activa surt del que hi ha dibuixat, no del scroll: així el seu node ja està encès.
  const active = Math.min(PHASES - 1, Math.floor(draw * PHASES));
  return { draw, active, lit, spin: segment(progress, 0, 1) * 90 };
}

/** Posició (en % del quadrat que conté l'anell) del node de cada fase, començant a dalt i en sentit horari. */
export function nodePosition(index: number, radius = 42) {
  const angle = (index / PHASES) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) };
}
