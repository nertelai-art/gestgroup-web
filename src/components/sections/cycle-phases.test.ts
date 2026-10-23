import { describe, expect, it } from "vitest";
import { cycleState, nodePosition, PHASES } from "./cycle-phases";

describe("cycleState", () => {
  it("comença sense anell, amb la primera fase", () => {
    const state = cycleState(0);
    expect(state.draw).toBe(0);
    expect(state.active).toBe(0);
  });

  it("acaba amb l'anell tancat, totes les fases enceses i l'última activa", () => {
    const state = cycleState(1);
    expect(state.draw).toBe(1);
    expect(state.active).toBe(PHASES - 1);
    expect(state.lit.every((value) => value === 1)).toBe(true);
  });

  it("passa per totes les fases en ordre", () => {
    const seen: number[] = [];
    for (let p = 0; p <= 1; p += 0.005) {
      const { active } = cycleState(p);
      if (seen.at(-1) !== active) seen.push(active);
    }
    expect(seen).toEqual([0, 1, 2, 3]);
  });

  it("dona a cada fase el mateix tram de scroll", () => {
    const share = Array.from({ length: PHASES }, () => 0);
    const steps = 2000;
    for (let i = 0; i <= steps; i++) {
      const p = 0.05 + (0.8 * i) / steps;
      share[cycleState(p).active]! += 1 / steps;
    }
    for (const value of share) expect(value).toBeCloseTo(1 / PHASES, 2);
  });

  it("encén el node de la fase quan aquesta s'explica", () => {
    for (let p = 0.1; p <= 1; p += 0.01) {
      const { active, lit } = cycleState(p);
      expect(lit[active]).toBeGreaterThan(0);
    }
  });
});

describe("nodePosition", () => {
  it("posa la primera fase a dalt i la segona a la dreta", () => {
    expect(nodePosition(0).x).toBeCloseTo(50);
    expect(nodePosition(0).y).toBeCloseTo(8);
    expect(nodePosition(1).x).toBeCloseTo(92);
  });
});
