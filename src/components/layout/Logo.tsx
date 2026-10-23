import { useId } from "react";

/**
 * L'anell en «G» del logotip, redibuixat en vectorial a partir del PNG de 59 px de gestgroup.es
 * (colors mostrejats del fitxer). PROVISIONAL fins que Gestgroup ens passi l'original.
 * Tres peces: l'arc de dalt (cian → cel), el de baix (oceà → indi → violeta) i la falca magenta.
 */
export function GMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00bded" />
          <stop offset="0.3" stopColor="#14a9df" />
          <stop offset="0.55" stopColor="#3593cb" />
          <stop offset="1" stopColor="#3593cb" />
        </linearGradient>
        <linearGradient id={`${id}-bottom`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0099d0" />
          <stop offset="0.2" stopColor="#006fad" />
          <stop offset="0.45" stopColor="#4d46c0" />
          <stop offset="0.65" stopColor="#7135b8" />
          <stop offset="0.85" stopColor="#9c25b6" />
          <stop offset="1" stopColor="#aa006b" />
        </linearGradient>
        <linearGradient id={`${id}-wedge`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#e01aa2" />
          <stop offset="0.5" stopColor="#aa006c" />
          <stop offset="1" stopColor="#9f005c" />
        </linearGradient>
      </defs>
      {/* Mateixos traços que src/app/icon.svg, resseguits del PNG a quadrícula (docs/direccio-visual.md). */}
      <path d="M2.2 56 A48.3 48.3 0 0 1 93.8 28.8 C84 20 70 15 57 17 C42 19 30 26 24 34 C21 40 20 45 21.5 50.5 Z" fill={`url(#${id}-top)`} />
      <path d="M2.2 56 A48.3 48.3 0 0 0 97.1 60 L76 64 C67 70 58 76 49 77.5 C40 72 30 62 21.5 50.5 Z" fill={`url(#${id}-bottom)`} />
      <path
        d="M56 41.4 C62 35 70 31 80 30.5 C86 30.5 91 32 96.2 35 A48.3 48.3 0 0 1 83.5 84 C80 76 80 68 77 61 C72 52 64 46 56 41.4 Z"
        fill={`url(#${id}-wedge)`}
      />
    </svg>
  );
}

/** Logotip complet: anell + «Gest» (cel) «group» (magenta) en Ubuntu, la lletra més propera a la del seu logotip. */
export function Logo({ className, title = "Gestgroup", onDark = true }: { className?: string; title?: string; onDark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <GMark className="h-[1.9em] w-[1.9em] shrink-0" />
      <span className="font-[family-name:var(--font-ubuntu)] text-[1.35em] font-medium leading-none tracking-[-0.01em]" aria-label={title}>
        <span style={{ color: onDark ? "#4aa6dc" : "#3593cb" }}>Gest</span>
        <span style={{ color: onDark ? "#d62a9c" : "#b00080" }}>group</span>
      </span>
    </span>
  );
}
