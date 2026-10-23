import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GMark } from "../layout/Logo";

export function Founder({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="filosofia" aria-labelledby="filosofia-title" className="band relative overflow-hidden py-24 md:py-36">
      <GMark className="pointer-events-none absolute -right-24 -top-24 size-[28rem] opacity-[0.07] md:size-[40rem]" />
      <div className="container-x relative grid gap-12 md:grid-cols-[0.35fr_1fr]">
        <p id="filosofia-title" className="eyebrow reveal text-sky-light">
          {t.founder.eyebrow}
        </p>
        <figure>
          <blockquote className="display reveal relative text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.15] tracking-[-0.025em]">
            <span aria-hidden className="gradient-text absolute -left-2 -top-10 font-serif text-[6rem] leading-none md:-left-12 md:-top-6">
              “
            </span>
            {t.founder.quote}
          </blockquote>
          <figcaption className="reveal mt-10 flex items-center gap-4">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-white p-0.5 ring-2 ring-magenta/60">
              <Image src={site.ceo.photo} alt="" width={64} height={64} className="size-full rounded-full object-cover object-[50%_18%]" />
            </span>
            <span>
              <span className="display block text-lg">{t.founder.name}</span>
              <span className="text-sm text-[var(--band-ink-soft)]">{t.founder.role}</span>
            </span>
          </figcaption>
          <p className="reveal mt-10 max-w-2xl border-l-2 border-magenta pl-5 text-[var(--band-ink-soft)]">{t.founder.text}</p>
          <Link href={`/${locale}/empresa`} className="reveal mt-6 inline-flex items-center gap-2 font-bold text-sky-light hover:underline">
            {t.founder.more} <span aria-hidden>→</span>
          </Link>
        </figure>
      </div>
    </section>
  );
}
