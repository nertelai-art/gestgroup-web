import { describe, expect, it } from "vitest";
import ca from "./ca";
import es from "./es";

/** Totes les rutes de claus d'un objecte, amb la mida de cada llista (les llistes han de quadrar). */
function shape(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((item, i) => shape(item, `${path}[${i}]`))];
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, child]) => shape(child, path ? `${path}.${key}` : key));
  return [path];
}

/** Tots els textos, menys el prefix i el sufix dels comptadors, que poden ser buits a posta. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([key, child]) => (key === "prefix" || key === "suffix" ? [] : strings(child)));
  return [];
}

describe("diccionaris", () => {
  it("el català té les mateixes claus i llistes que el castellà", () => {
    expect(shape(ca)).toEqual(shape(es));
  });

  it("cap text queda buit", () => {
    for (const text of [...strings(es), ...strings(ca)]) expect(text.trim()).not.toBe("");
  });

  it("les xifres dels comptadors són iguals en els dos idiomes", () => {
    expect(ca.figures.items.map((i) => i.value)).toEqual(es.figures.items.map((i) => i.value));
    expect(ca.case.stats.map((i) => i.value)).toEqual(es.case.stats.map((i) => i.value));
  });
});
