/* eslint-disable @next/next/no-img-element -- logos petits (≤ 300 px) ja optimitzats; next/image no hi aporta res */
import { clients } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionaries";

/** Cinta de logos de clients. Es duplica per fer el bucle; la còpia queda amagada als lectors de pantalla. */
export function Clients({ t }: { t: Dictionary }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={hidden || undefined}>
      {clients.map((client) => (
        <li key={client.file} className="flex h-16 w-36 items-center justify-center">
          <img
            src={`/clients/${client.file}`}
            alt={hidden ? "" : client.name}
            loading="lazy"
            decoding="async"
            className="client-logo max-h-14 w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section id="clientes" aria-labelledby="clientes-title" className="band relative z-10 py-14">
      <h2 id="clientes-title" className="eyebrow reveal container-x text-center text-[var(--band-ink-soft)]">
        {t.clients.title}
      </h2>
      <div className="marquee mt-9 overflow-hidden">
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
