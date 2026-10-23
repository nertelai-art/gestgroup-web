import { describe, expect, it } from "vitest";
import { cookiePolicy, legalNotice, parseLinks, privacyPolicy } from "./legal";
import { site } from "./site";

const allText = (blocks: typeof privacyPolicy) =>
  blocks.flatMap((block) => ("text" in block ? [block.text] : "items" in block ? block.items : [...block.head, ...block.rows.flat()])).join("\n");

describe("textos legals", () => {
  it("porten les dades exactes del titular de la seva Nota legal", () => {
    for (const blocks of [legalNotice, privacyPolicy]) {
      const text = allText(blocks);
      expect(text).toContain("GESTGROUP IT SERVICES S.L.");
      expect(text).toContain("B56762339");
      expect(text).toContain("C/ Manuel Cazurro Ruiz, 3 - 3º 2ª | 17003 Girona");
    }
    expect(allText(privacyPolicy)).toContain(site.legal.email);
  });

  it("la política de galetes conserva les quatre taules de galetes i els enllaços dels navegadors", () => {
    expect(cookiePolicy.filter((block) => block.kind === "table")).toHaveLength(6);
    expect(allText(cookiePolicy)).toContain("support.google.com/chrome");
  });
});

describe("parseLinks", () => {
  it("separa els enllaços i posa l'idioma", () => {
    expect(parseLinks("Vegi la [Política](/{lang}/privacidad).", "ca")).toEqual([
      { text: "Vegi la " },
      { text: "Política", href: "/ca/privacidad" },
      { text: "." },
    ]);
  });

  it("deixa igual un text sense enllaços", () => {
    expect(parseLinks("Res a fer", "es")).toEqual([{ text: "Res a fer" }]);
  });
});
