import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TranslationValues } from "next-intl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface HeroSectionProps {
  t: TFn;
  locale: string;
}

export function HeroSection({ t, locale }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-canvas px-6 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 500px at 50% 0%, rgba(252,253,255,0.04) 0%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        <p className="mb-6 font-body text-sm uppercase tracking-widest text-charcoal">
          Solven Syntrix
        </p>
        <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-none tracking-tight text-ink max-w-4xl">
          {t("headline")}
        </h1>
        <p className="mt-8 font-body text-lg text-body-text max-w-2xl leading-relaxed">
          {t("body")}
        </p>
        <p className="mt-6 font-body text-base text-charcoal">{t("tagline")}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/${locale}/#contact`}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-ds-md bg-ink text-canvas font-sans text-sm font-medium transition-colors hover:bg-surface-light"
          >
            {t("ctaPrimary")}
            <ArrowRight size={15} />
          </Link>
          <Link
            href={`/${locale}/#what-we-build`}
            className="inline-flex items-center h-9 px-4 rounded-ds-md border border-hairline-strong bg-surface-elevated text-ink font-sans text-sm font-medium transition-colors hover:bg-surface-card"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
