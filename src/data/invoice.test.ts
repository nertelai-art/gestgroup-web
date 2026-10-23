import { describe, expect, it } from "vitest";
import { invoiceLines, invoiceTotals } from "./invoice";

describe("factura d'exemple", () => {
  it("baixa exactament el 30%, l'estalvi mitjà que declara Gestgroup", () => {
    expect(invoiceTotals.before).toBe(15000);
    expect(1 - invoiceTotals.after / invoiceTotals.before).toBeCloseTo(0.3, 5);
  });

  it("no puja cap partida", () => {
    for (const line of invoiceLines) expect(line.after).toBeLessThanOrEqual(line.before);
  });
});
