import { NextRequest, type NextFetchEvent } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEMO_ACCESS_COOKIE, DEMO_LEAD_COOKIE } from "./demo-kit/names";
import { signDemoToken } from "./demo-kit/token";
import { config, proxy } from "./proxy";

const secret = "un-secret-de-proves-prou-llarg";
const site = "gestgroup";
const now = Date.UTC(2026, 9, 23, 10, 0, 0);
const event = { waitUntil: () => {} } as unknown as NextFetchEvent;
const request = (url: string, headers: Record<string, string> = {}) => new NextRequest(url, { headers });
const link = () => signDemoToken(secret, { site, name: "Gestgroup", days: 15, now });

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(now);
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe("proxy sense la porta de la demo", () => {
  it("l'arrel porta a l'idioma del navegador", async () => {
    const response = await proxy(request("https://gestgroup.test/", { "accept-language": "ca-ES,ca;q=0.9" }), event);
    expect(response?.headers.get("location")).toBe("https://gestgroup.test/ca");
  });

  it("la resta de pàgines passen", async () => {
    expect(await proxy(request("https://gestgroup.test/es"), event)).toBeUndefined();
  });
});

describe("proxy amb la porta de la demo", () => {
  beforeEach(() => {
    vi.stubEnv("DEMO_SECRET", secret);
    vi.stubEnv("DEMO_SITE", site);
  });

  it("sense enllaç, ni l'arrel redirigeix ni el formulari respon: ensenya la pàgina de bloqueig", async () => {
    expect((await proxy(request("https://gestgroup.test/"), event))?.status).toBe(403);
    expect((await proxy(request("https://gestgroup.test/es"), event))?.status).toBe(403);
    expect((await proxy(request("https://gestgroup.test/api/contact"), event))?.status).toBe(403);
  });

  it("amb l'enllaç a l'arrel, porta a l'idioma i s'emporta les galetes, sense el codi a l'adreça", async () => {
    const token = await link();
    const response = await proxy(request(`https://gestgroup.test/?d=${token}`, { "accept-language": "ca" }), event);
    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("https://gestgroup.test/ca");
    const cookies = response?.headers.getSetCookie() ?? [];
    expect(cookies.some((cookie) => cookie.startsWith(`${DEMO_ACCESS_COOKIE}=${token};`))).toBe(true);
    expect(cookies.some((cookie) => cookie.startsWith(`${DEMO_LEAD_COOKIE}=`))).toBe(true);
  });

  it("amb l'enllaç a una pàgina d'idioma, la deixa veure i el recorda", async () => {
    const response = await proxy(request(`https://gestgroup.test/es?d=${await link()}`), event);
    expect(response?.headers.get("x-middleware-next")).toBe("1");
    expect(response?.headers.getSetCookie()).toHaveLength(2);
  });

  it("amb la galeta, l'arrel porta a l'idioma i la resta passa", async () => {
    const cookie = `${DEMO_ACCESS_COOKIE}=${await link()}`;
    const root = await proxy(request("https://gestgroup.test/", { cookie, "accept-language": "en" }), event);
    expect(root?.headers.get("location")).toBe("https://gestgroup.test/es");
    expect(await proxy(request("https://gestgroup.test/ca", { cookie }), event)).toBeUndefined();
  });
});

describe("matcher", () => {
  const matcher = new RegExp(`^${[config.matcher].flat()[0]}$`);

  it("deixa fora de la porta el que ha de veure qui no té l'enllaç", () => {
    for (const path of ["/icon.svg", "/robots.txt", "/_next/static/chunks/a.js"]) expect(matcher.test(path), path).toBe(false);
  });

  it("passa per la porta les pàgines, el formulari i els logos de clients", () => {
    for (const path of ["/", "/es", "/ca", "/api/contact", "/clients/noatum_logo.png"]) expect(matcher.test(path), path).toBe(true);
  });
});
