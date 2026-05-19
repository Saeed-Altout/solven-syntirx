import { Star } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface VisionSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

export function VisionSection({ t }: VisionSectionProps) {
  const points = t.raw("points") as string[];

  return (
    <section id="vision" className="relative overflow-hidden bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-150 glow-blue" />
      <div className="relative mx-auto max-w-300">
        <AnimatedSection variant="fade-up">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text mb-6 shadow-[0_0_10px_rgba(59,158,255,0.18)]">
            {t("badge")}
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.8rem)] leading-none tracking-tight text-ink max-w-3xl">
            {t("headline")}
          </h2>
          <p className="mt-8 font-body text-base text-body-text max-w-lg leading-relaxed">
            {t("body")}
          </p>
        </AnimatedSection>
        <ul className="mt-10 grid sm:grid-cols-2 gap-4">
          {points.map((point, i) => (
            <AnimatedSection key={i} variant="scale-up" delay={i * 0.08}>
              <li className="flex items-start gap-3 rounded-ds-lg border border-hairline-strong bg-surface-card p-5 h-full">
                <Star size={14} className="mt-0.5 shrink-0 text-accent-blue" />
                <span className="font-body text-sm text-body-text">{point}</span>
              </li>
            </AnimatedSection>
          ))}
        </ul>
        <AnimatedSection variant="fade-up" delay={0.2}>
          <p className="mt-10 font-body text-base text-charcoal max-w-xl leading-relaxed">
            {t("closing")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
