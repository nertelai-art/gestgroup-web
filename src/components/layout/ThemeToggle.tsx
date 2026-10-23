"use client";

import { useSyncExternalStore } from "react";

export const THEME_KEY = "gg-theme";
type Theme = "light" | "dark";

/**
 * Script que va al <head>: posa el tema desat abans de pintar, perquè no hi hagi un instant del tema
 * equivocat. Sense res desat, mana el sistema (el CSS ja ho resol amb prefers-color-scheme).
 */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const listeners = new Set<() => void>();
const media = () => window.matchMedia("(prefers-color-scheme: light)");

function current(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return media().matches ? "light" : "dark";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const query = media();
  query.addEventListener("change", callback);
  return () => {
    listeners.delete(callback);
    query.removeEventListener("change", callback);
  };
}

function choose(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Sense emmagatzematge (navegació privada): el canvi val fins que es tanqui la pàgina.
  }
  listeners.forEach((listener) => listener());
}

export function ThemeToggle({ labels, className }: { labels: { light: string; dark: string }; className?: string }) {
  // Al servidor no se sap: es pinta com a fosc i s'ajusta en hidratar.
  const theme = useSyncExternalStore(subscribe, current, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => choose(next)}
      aria-label={labels[next]}
      title={labels[next]}
      className={`grid size-10 place-items-center rounded-full border border-line text-snow transition-colors hover:bg-snow/10 ${className ?? ""}`}
    >
      {theme === "dark" ? (
        // Sol: passar a clar.
        <svg viewBox="0 0 24 24" className="size-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // Lluna: passar a fosc.
        <svg viewBox="0 0 24 24" className="size-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
