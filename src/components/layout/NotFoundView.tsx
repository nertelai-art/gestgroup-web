import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { GMark } from "./Logo";

export function NotFoundView({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="container-x grid min-h-svh place-items-center py-32 text-center">
      <div>
        <GMark className="mx-auto size-24 animate-[ring-idle_20s_linear_infinite]" />
        <p className="display gradient-text mt-8 text-7xl">404</p>
        <h1 className="display mt-4 text-3xl">{t.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-slate">{t.notFound.text}</p>
        <Link href={`/${locale}`} className="btn btn-primary mt-8">
          {t.notFound.back}
        </Link>
      </div>
    </section>
  );
}
