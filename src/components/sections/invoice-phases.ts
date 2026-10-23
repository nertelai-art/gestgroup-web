import { invoiceLines, invoiceTotals } from "../../data/invoice";
import { easeInOutCubic, segment } from "../../lib/math";

// Coreografia de l'escena de la factura, en funció del progrés del scroll (0-1) dins de la secció.
// Quatre actes, un per pas del text: les línies entren, l'escàner les revisa, es retallen i queda el segell.

/** On comença cada pas del text. */
export const stepStarts = [0, 0.22, 0.5, 0.8] as const;

export type LineState = {
  /** 0-1: la línia entra a la factura. */
  enter: number;
  /** 0-1: l'escàner hi passa i en surt la troballa. */
  scan: number;
  /** 0-1: l'import baixa del d'abans al de després. */
  cut: number;
  /** Import que es pinta ara mateix. */
  amount: number;
};

export type InvoiceState = {
  step: number;
  lines: LineState[];
  total: number;
  /** Estalvi d'ara mateix, de 0 a 1. */
  saving: number;
  /** 0-1: posició vertical de l'escàner sobre la llista de línies. */
  scanner: number;
  /** 0-1: el segell final («-30%») apareix. */
  stamp: number;
};

export function stepAt(progress: number) {
  let step = 0;
  stepStarts.forEach((start, index) => {
    if (progress >= start) step = index;
  });
  return step;
}

export function invoiceState(progress: number): InvoiceState {
  const count = invoiceLines.length;
  const lines = invoiceLines.map((line, i) => {
    const enter = easeInOutCubic(segment(progress, 0.02 + i * 0.018, 0.12 + i * 0.018));
    const scan = segment(progress, 0.24 + i * 0.035, 0.3 + i * 0.035);
    const cut = easeInOutCubic(segment(progress, 0.52 + i * 0.03, 0.6 + i * 0.03));
    // A desenes: mentre baixa, l'import no fa soroll amb unitats que no diuen res.
    return { enter, scan, cut, amount: Math.round((line.before - (line.before - line.after) * cut) / 10) * 10 };
  });
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return {
    step: stepAt(progress),
    lines,
    total,
    saving: 1 - total / invoiceTotals.before,
    scanner: segment(progress, 0.22, 0.24 + (count - 1) * 0.035 + 0.06),
    stamp: easeInOutCubic(segment(progress, 0.8, 0.88)),
  };
}
