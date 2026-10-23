import { describe, expect, it } from "vitest";
import { AREAS, hubState, nodePoint } from "./hub-phases";

describe("hubState", () => {
  it("comença sense cap línia i amb la primera àrea", () => {
    const state = hubState(0);
    expect(state.active).toBe(0);
    expect(state.lines.every((line) => line === 0)).toBe(true);
    expect(state.done).toBe(0);
  });

  it("acaba amb les sis línies i el tancament", () => {
    const state = hubState(1);
    expect(state.active).toBe(AREAS - 1);
    expect(state.lines.every((line) => line === 1)).toBe(true);
    expect(state.done).toBe(1);
  });

  it("passa per les sis àrees en ordre", () => {
    const seen: number[] = [];
    for (let p = 0; p <= 1; p += 0.004) {
      const { active } = hubState(p);
      if (seen.at(-1) !== active) seen.push(active);
    }
    expect(seen).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("la línia de l'àrea que s'explica ja s'està dibuixant", () => {
    for (let p = 0.07; p <= 1; p += 0.01) {
      const { active, lines } = hubState(p);
      expect(lines[active]).toBeGreaterThan(0);
    }
  });
});

describe("nodePoint", () => {
  it("posa la primera àrea a dalt i les altres a 60° l'una de l'altra", () => {
    expect(nodePoint(0)).toEqual({ x: 200, y: 50 });
    expect(nodePoint(3)).toEqual({ x: 200, y: 350 });
    expect(nodePoint(1).x).toBeGreaterThan(300);
  });
});
