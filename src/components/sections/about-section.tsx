import { Check } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface AboutSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

export function AboutSection({ t }: AboutSectionProps) {
  const points = t.raw("points") as string[];

  return (
    <section id="about" className="relative bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection variant="fade-right">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text mb-6">
            {t("badge")}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-ink">
            {t("headline")}
          </h2>
          <p className="mt-6 font-body text-base text-body-text leading-relaxed">
            {t("body")}
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 font-body text-base text-body-text">
                <Check size={16} className="mt-0.5 shrink-0 text-accent-green" />
                {point}
              </li>
            ))}
          </ul>
        </AnimatedSection>
        <AnimatedSection variant="fade-left" delay={0.15}>
          <div className="rounded-ds-lg border border-hairline-strong bg-surface-card p-8">
            <p className="font-body text-lg text-ink leading-relaxed">{t("closing")}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
