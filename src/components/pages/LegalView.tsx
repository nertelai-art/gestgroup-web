import Link from "next/link";
import { legalPages, parseLinks, type LegalSlug } from "@/data/legal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

function Rich({ text, lang }: { text: string; lang: Locale }) {
  return (
    <>
      {parseLinks(text, lang).map((part, i) =>
        "href" in part ? (
          part.href.startsWith("/") ? (
            <Link key={i} href={part.href} className="font-semibold text-sky-light underline underline-offset-4">
              {part.text}
            </Link>
          ) : (
            <a
              key={i}
              href={part.href}
              className="font-semibold text-sky-light underline underline-offset-4"
              {...(part.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {part.text}
            </a>
          )
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

/** Pàgina legal: el text és en castellà en tots dos idiomes (com a la web de Gestgroup). */
export function LegalView({ slug, locale, t }: { slug: LegalSlug; locale: Locale; t: Dictionary }) {
  const page = legalPages[slug];
  const others = (Object.keys(legalPages) as LegalSlug[]).filter((other) => other !== slug);
  return (
    <article className="container-x pb-24 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
      <p className="eyebrow text-sky-light">{t.legal.note}</p>
      <h1 className="display mt-4 text-[clamp(2.25rem,6vw,4.5rem)]">{t.legal[page.key]}</h1>
      <div lang="es" className="legal-body mt-12 max-w-3xl">
        {page.blocks.map((block, i) => {
          switch (block.kind) {
            case "h2":
              return <h2 key={i}>{block.text}</h2>;
            case "h3":
              return <h3 key={i}>{block.text}</h3>;
            case "p":
              return (
                <p key={i}>
                  <Rich text={block.text} lang={locale} />
                </p>
              );
            case "ul":
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>
                      <Rich text={item} lang={locale} />
                    </li>
                  ))}
                </ul>
              );
            case "table":
              return (
                <div key={i} className="legal-table">
                  <table>
                    {block.caption ? <caption>{block.caption}</caption> : null}
                    <thead>
                      <tr>
                        {block.head.map((cell) => (
                          <th key={cell} scope="col">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td key={c}>
                              <Rich text={cell} lang={locale} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
          }
        })}
      </div>
      <p className="mt-12 text-sm text-slate">{t.legal.updated}</p>
      <nav aria-label={t.footer.legal} className="mt-8 flex flex-wrap gap-3">
        {others.map((other) => (
          <Link key={other} href={`/${locale}/${other}`} className="btn btn-ghost">
            {t.legal[legalPages[other].key]}
          </Link>
        ))}
      </nav>
    </article>
  );
}
