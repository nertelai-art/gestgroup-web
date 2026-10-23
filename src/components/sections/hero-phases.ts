import { easeInOutCubic, easeOutCubic, segment } from "../../lib/math";

// Coreografia de la primera pantalla: una pila desordenada de factures (les àrees que Gestgroup revisa)
// que, en baixar, l'auditor marca, s'ordenen en una sola pila i reben el segell «Bajo control».

export type SheetPose = { x: number; y: number; z: number; rx: number; ry: number; rz: number };

/** On és cada factura quan la pila està desordenada (px i graus, respecte del centre de l'escenari). */
export const chaos: readonly SheetPose[] = [
  { x: -150, y: -125, z: 40, rx: 5, ry: -9, rz: -13 },
  { x: 145, y: -150, z: -40, rx: -4, ry: 8, rz: 11 },
  { x: -165, y: 95, z: -110, rx: 6, ry: 7, rz: 9 },
  { x: 160, y: 110, z: 90, rx: -6, ry: -7, rz: -10 },
  { x: -15, y: -25, z: 170, rx: 3, ry: 4, rz: -5 },
  { x: 30, y: 175, z: -170, rx: -3, ry: -5, rz: 15 },
]

export const SHEETS = chaos.length;

/** On és cada factura quan ja està ordenada: una pila neta, una mica esglaonada i més a prop de qui mira. */
export function stacked(index: number): SheetPose {
  return { x: index * 3, y: 0 - index * 4, z: 260 + index * 3, rx: 0, ry: 0, rz: (index - (SHEETS - 1) / 2) * 0.8 };
}

function mix(a: number, b: number, t: number) {
  // Així, i no a + (b - a) * t, els extrems són exactes: la pila ordenada queda al píxel.
  return a * (1 - t) + b * t;
}

export type HeroState = {
  sheets: SheetPose[];
  /** 0-1 per factura: el cercle magenta que marca el que sobra. */
  marks: number[];
  /** 0-1: el segell. */
  stamp: number;
  /** 0-1: el text de l'esquerra s'esvaeix al final. */
  fade: number;
};

export function heroState(progress: number): HeroState {
  const sheets = chaos.map((from, i) => {
    const t = easeInOutCubic(segment(progress, 0.32 + i * 0.03, 0.62 + i * 0.03));
    const to = stacked(i);
    return {
      x: mix(from.x, to.x, t),
      y: mix(from.y, to.y, t),
      z: mix(from.z, to.z, t),
      rx: mix(from.rx, to.rx, t),
      ry: mix(from.ry, to.ry, t),
      rz: mix(from.rz, to.rz, t),
    };
  });
  return {
    sheets,
    marks: chaos.map((_, i) => easeOutCubic(segment(progress, 0.06 + i * 0.03, 0.16 + i * 0.03))),
    stamp: easeOutCubic(segment(progress, 0.8, 0.88)),
    fade: segment(progress, 0.9, 1),
  };
}
