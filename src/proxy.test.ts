import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "./proxy";

const request = (url: string, headers: Record<string, string> = {}) => new NextRequest(url, { headers });

describe("proxy", () => {
  it("l'arrel porta a l'idioma del navegador", () => {
    expect(proxy(request("https://gestgroup.test/", { "accept-language": "ca-ES,ca;q=0.9" })).headers.get("location")).toBe("https://gestgroup.test/ca");
  });

  it("sense idioma conegut, porta al castellà", () => {
    expect(proxy(request("https://gestgroup.test/", { "accept-language": "en" })).headers.get("location")).toBe("https://gestgroup.test/es");
  });

  it("només passa per l'arrel: les pàgines, el formulari i els fitxers no hi entren", () => {
    expect(config.matcher).toEqual(["/"]);
  });
});
