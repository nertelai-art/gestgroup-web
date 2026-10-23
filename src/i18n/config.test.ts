import { describe, expect, it } from "vitest";
import { isLocale, pickLocale } from "./config";

describe("pickLocale", () => {
  it("tria el català quan el navegador el prefereix", () => {
    expect(pickLocale("ca-ES,ca;q=0.9,es;q=0.8")).toBe("ca");
  });

  it("respecta els pesos q encara que l'ordre sigui un altre", () => {
    expect(pickLocale("es;q=0.5,ca;q=0.9")).toBe("ca");
  });

  it("torna el castellà si no hi ha cap idioma suportat o no hi ha capçalera", () => {
    expect(pickLocale("en-GB,fr;q=0.8")).toBe("es");
    expect(pickLocale(null)).toBe("es");
    expect(pickLocale("")).toBe("es");
  });
});

describe("isLocale", () => {
  it("només accepta els idiomes del web", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("ca")).toBe(true);
    expect(isLocale("en")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});
