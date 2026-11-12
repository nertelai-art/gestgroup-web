import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { legacyRedirects } from "./redirects";

const root = join(import.meta.dirname, "..");
const pages = readdirSync(join(root, "app/[lang]"), { recursive: true, encoding: "utf8" })
  .filter((file) => file.replace(/\\/g, "/").endsWith("page.tsx"))
  .map((file) => `/es/${file.replace(/\\/g, "/").replace(/\/?page\.tsx$/, "")}`.replace(/\/$/, ""));
const sectionIds = readdirSync(join(root, "components/sections"))
  .filter((file) => file.endsWith(".tsx"))
  .flatMap((file) => [...readFileSync(join(root, "components/sections", file), "utf8").matchAll(/<section[^>]*\sid="([^"]+)"/g)].map((m) => m[1]));

describe("redireccions de la web vella", () => {
  it("cobreixen totes les pàgines que tenia gestgroup.es", () => {
    const sources = legacyRedirects.map((r) => r.source);
    for (const old of ["/index.php", "/quienes-somos.php", "/gestcost.php", "/gestinnova.php", "/gesthelp.php", "/clientes.php", "/blog.php", "/contactar.php", "/nota-legal.php"]) {
      expect(sources, old).toContain(old);
    }
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("porten a pàgines i seccions que existeixen", () => {
    for (const { destination } of legacyRedirects) {
      const [path = "", anchor] = destination.split("#");
      // Les rutes són les mateixes en tots dos idiomes.
      expect(pages, destination).toContain(path.replace(/^\/ca(?=\/|$)/, "/es"));
      if (anchor) expect(sectionIds, destination).toContain(anchor);
    }
  });
});
