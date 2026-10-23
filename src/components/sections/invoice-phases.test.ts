import { describe, expect, it } from "vitest";
import { invoiceTotals } from "../../data/invoice";
import { invoiceState, stepAt, stepStarts } from "./invoice-phases";

describe("invoiceState", () => {
  it("comença amb la factura buida i el total d'abans", () => {
    const state = invoiceState(0);
    expect(state.step).toBe(0);
    expect(state.lines.every((line) => line.enter === 0 && line.cut === 0)).toBe(true);
    expect(state.total).toBe(invoiceTotals.before);
    expect(state.stamp).toBe(0);
  });

  it("acaba amb totes les línies retallades, el 30% i el segell", () => {
    const state = invoiceState(1);
    expect(state.step).toBe(3);
    expect(state.total).toBe(invoiceTotals.after);
    expect(state.saving).toBeCloseTo(0.3, 5);
    expect(state.stamp).toBe(1);
  });

  it("totes les línies han entrat abans que comenci l'escàner", () => {
    expect(invoiceState(stepStarts[1]).lines.every((line) => line.enter === 1)).toBe(true);
  });

  it("l'escàner ha revisat totes les línies abans de retallar-ne cap", () => {
    const state = invoiceState(stepStarts[2]);
    expect(state.lines.every((line) => line.scan === 1 && line.cut === 0)).toBe(true);
    expect(state.scanner).toBe(1);
  });

  it("el total només baixa quan es fa scroll avall", () => {
    let previous = Infinity;
    for (let p = 0; p <= 1; p += 0.01) {
      const { total } = invoiceState(p);
      expect(total).toBeLessThanOrEqual(previous);
      previous = total;
    }
  });

  it("aguanta progressos fora de rang", () => {
    expect(invoiceState(-1).total).toBe(invoiceTotals.before);
    expect(invoiceState(2).total).toBe(invoiceTotals.after);
  });
});

describe("stepAt", () => {
  it("canvia de pas just a cada inici", () => {
    stepStarts.forEach((start, index) => expect(stepAt(start)).toBe(index));
    expect(stepAt(stepStarts[1] - 0.001)).toBe(0);
  });
});
