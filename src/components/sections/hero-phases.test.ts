import { describe, expect, it } from "vitest";
import { chaos, heroState, SHEETS, stacked } from "./hero-phases";

describe("heroState", () => {
  it("comença amb la pila desordenada, sense marques ni segell", () => {
    const state = heroState(0);
    expect(state.sheets).toEqual(chaos);
    expect(state.marks.every((mark) => mark === 0)).toBe(true);
    expect(state.stamp).toBe(0);
  });

  it("acaba amb la pila ordenada, totes les factures marcades i el segell posat", () => {
    const state = heroState(1);
    state.sheets.forEach((sheet, i) => expect(sheet).toEqual(stacked(i)));
    expect(state.marks.every((mark) => mark === 1)).toBe(true);
    expect(state.stamp).toBe(1);
  });

  it("marca totes les factures abans que comencin a ordenar-se", () => {
    const state = heroState(0.32);
    expect(state.marks.every((mark) => mark === 1)).toBe(true);
    expect(state.sheets[0]).toEqual(chaos[0]);
  });

  it("no posa el segell fins que la pila és ordenada", () => {
    const beforeStamp = heroState(0.8);
    expect(beforeStamp.stamp).toBe(0);
    beforeStamp.sheets.forEach((sheet, i) => expect(sheet).toEqual(stacked(i)));
  });

  it("té una pose desordenada per a cada factura", () => {
    expect(SHEETS).toBe(6);
  });
});
