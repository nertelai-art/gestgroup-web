import { describe, expect, it } from "vitest";
import { cycleState, GAP, PHASES, pointAt, segmentFill, segmentStart, tipAngle } from "./cycle-phases";

describe("cycleState", () => {
  it("comença sense anell, amb la primera fase", () => {
    const state = cycleState(0);
    expect(state.draw).toBe(0);
    expect(state.active).toBe(0);
  });

  it("acaba amb el dial ple i l'última fase activa", () => {
    const state = cycleState(1);
    expect(state.draw).toBe(1);
    expect(state.active).toBe(PHASES - 1);
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

});

describe("dial", () => {
  it("omple els segments un darrere l'altre", () => {
    expect([0, 1, 2, 3].map((i) => segmentFill(0.375, i))).toEqual([1, 0.5, 0, 0]);
    expect([0, 1, 2, 3].map((i) => segmentFill(1, i))).toEqual([1, 1, 1, 1]);
  });

  it("la punta comença a dalt (després del mig buit) i acaba abans de tancar el cercle", () => {
    expect(tipAngle(0)).toBe(GAP / 2);
    expect(tipAngle(1)).toBe(360 - GAP / 2);
  });

  it("la punta salta el buit entre fases: mai no s'hi atura", () => {
    for (let draw = 0; draw <= 1; draw += 0.001) {
      const angle = tipAngle(draw);
      const inGap = [1, 2, 3].some((i) => angle > segmentStart(i) - GAP && angle < segmentStart(i));
      expect(inGap, `draw ${draw}`).toBe(false);
    }
  });

  it("arrodoneix els punts a mil·lèsimes: servidor i navegador han de pintar el mateix SVG", () => {
    for (let angle = 0; angle < 360; angle += 7.5) {
      const { x, y } = pointAt(angle, 70);
      expect(Math.round(x * 1000) / 1000).toBe(x);
      expect(Math.round(y * 1000) / 1000).toBe(y);
    }
  });

  it("posa el zero a dalt del dial", () => {
    expect(pointAt(0).x).toBeCloseTo(100);
    expect(pointAt(0).y).toBeCloseTo(16);
    expect(pointAt(90).x).toBeCloseTo(184);
  });
});

describe("fase activa", () => {
  it("és sempre la del segment que s'està omplint", () => {
    for (let p = 0.06; p <= 1; p += 0.01) {
      const { draw, active } = cycleState(p);
      expect(segmentFill(draw, active)).toBeGreaterThan(0);
    }
  });
});
