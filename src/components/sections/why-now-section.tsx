import { TrendingUp } from "lucide-react";
import type { TranslationValues } from "next-intl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface WhyNowSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

export function WhyNowSection({ t }: WhyNowSectionProps) {
  const points = t.raw("points") as string[];

  return (
    <section className="relative overflow-hidden bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[600px] glow-orange" />
      <div className="relative mx-auto max-w-[1200px]">
        <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text mb-6">
          {t("badge")}
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none tracking-tight text-ink max-w-3xl">
          {t("headline")}
        </h2>
        <p className="mt-6 font-body text-base text-body-text max-w-xl leading-relaxed">
          {t("body")}
        </p>
        <ul className="mt-10 grid sm:grid-cols-2 gap-px bg-hairline rounded-ds-lg overflow-hidden border border-hairline-strong">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-4 bg-surface-card p-6">
              <TrendingUp size={16} className="mt-0.5 shrink-0 text-accent-orange" />
              <span className="font-body text-sm text-body-text">{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-ds-lg border border-hairline-strong bg-surface-elevated p-8">
          <p className="font-body text-base text-body-text leading-relaxed">{t("closing")}</p>
          <p className="mt-4 font-display text-xl text-ink">{t("emphasis")}</p>
        </div>
      </div>
    </section>
  );
}
