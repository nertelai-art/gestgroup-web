import { describe, expect, it } from "vitest";
import { activePanel, trackPosition } from "./services-phases";

describe("trackPosition", () => {
  it("comença al primer panell i acaba a l'últim", () => {
    expect(trackPosition(0, 3)).toBe(0);
    expect(trackPosition(1, 3)).toBe(2);
  });

  it("es queda quiet una estona a cada panell", () => {
    expect(trackPosition(0.05, 3)).toBe(0);
    expect(trackPosition(0.5, 3)).toBe(1);
    expect(trackPosition(0.95, 3)).toBe(2);
  });

  it("només avança, mai no tira enrere", () => {
    let previous = -1;
    for (let p = 0; p <= 1; p += 0.005) {
      const position = trackPosition(p, 3);
      expect(position).toBeGreaterThanOrEqual(previous);
      previous = position;
    }
  });

  it("amb un sol panell no es mou", () => {
    expect(trackPosition(0.7, 1)).toBe(0);
  });
});

describe("activePanel", () => {
  it("passa pels tres panells en ordre", () => {
    const seen: number[] = [];
    for (let p = 0; p <= 1; p += 0.01) {
      const panel = activePanel(p, 3);
      if (seen.at(-1) !== panel) seen.push(panel);
    }
    expect(seen).toEqual([0, 1, 2]);
  });
});
