import { segment } from "../../lib/math";

// Coreografia del cicle Kaizen: un dial de quatre segments que s'omple amb el scroll, un per fase.

export const PHASES = 4;

export type CycleState = {
  /** 0-1: tros d'anell dibuixat. */
  draw: number;
  /** Fase que s'explica ara (0-3). */
  active: number;
};

export function cycleState(progress: number): CycleState {
  // Lineal: amb una corba, la primera i l'última fase s'emportaven molt més scroll que les del mig.
  const draw = segment(progress, 0.05, 0.85);
  // La fase activa surt del que hi ha dibuixat, no del scroll: així el seu segment ja s'està omplint.
  const active = Math.min(PHASES - 1, Math.floor(draw * PHASES));
  return { draw, active };
}

/** Graus que se separen els quatre segments del dial. */
export const GAP = 10;
const SPAN = 360 / PHASES - GAP;

/** Angle (graus, 0 = a dalt, sentit horari) on comença el segment de cada fase. */
export function segmentStart(index: number) {
  return index * (360 / PHASES) + GAP / 2;
}

/** 0-1: quant hi ha omplert del segment de cada fase. */
export function segmentFill(draw: number, index: number) {
  return Math.min(1, Math.max(0, draw * PHASES - index));
}

/** Angle de la punta que dibuixa: salta els buits entre segments. */
export function tipAngle(draw: number) {
  const index = Math.min(PHASES - 1, Math.floor(draw * PHASES));
  return segmentStart(index) + segmentFill(draw, index) * SPAN;
}

/** Punt (en unitats del viewBox de 200 × 200) d'un angle sobre el dial. */
export function pointAt(angle: number, radius = 84) {
  const radians = ((angle - 90) * Math.PI) / 180;
  // A mil·lèsimes: Node i el navegador no sempre coincideixen a l'últim decimal de sin/cos, i l'SVG
  // pintat al servidor no quadraria amb el del client (error d'hidratació).
  const round = (value: number) => Math.round(value * 1000) / 1000;
  return { x: round(100 + radius * Math.cos(radians)), y: round(100 + radius * Math.sin(radians)) };
}
