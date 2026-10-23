import { describe, expect, it } from "vitest";
import { parseContact, validateContact, type ContactInput } from "./contact";

const valid: ContactInput = {
  name: "Marta",
  company: "Exemple, S.L.",
  email: "marta@exemple.cat",
  phone: "+34 972 000 000",
  interests: ["costs"],
  message: "",
  privacy: true,
};

describe("validateContact", () => {
  it("accepta una sol·licitud completa, i el telèfon és opcional", () => {
    expect(validateContact(valid)).toEqual({});
    expect(validateContact({ ...valid, phone: "" })).toEqual({});
  });

  it("marca cada camp que falla", () => {
    expect(validateContact({ ...valid, name: "  ", company: "", email: "marta@", phone: "abc", privacy: false })).toEqual({
      name: true,
      company: true,
      email: true,
      phone: true,
      privacy: true,
    });
  });

  it("rebutja textos massa llargs", () => {
    expect(validateContact({ ...valid, name: "a".repeat(121) }).name).toBe(true);
  });
});

describe("parseContact", () => {
  it("rebutja el que no és un objecte", () => {
    expect(parseContact(null)).toBeNull();
    expect(parseContact("hola")).toBeNull();
  });

  it("descarta interessos desconeguts i repetits, i només accepta privacy === true", () => {
    const parsed = parseContact({ ...valid, interests: ["costs", "costs", "hack"], privacy: "true" });
    expect(parsed?.interests).toEqual(["costs"]);
    expect(parsed?.privacy).toBe(false);
  });

  it("omple amb text buit els camps que no són text", () => {
    expect(parseContact({ name: 3 })?.name).toBe("");
  });
});
