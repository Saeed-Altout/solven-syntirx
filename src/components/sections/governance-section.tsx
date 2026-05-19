import { ShieldCheck, Lock, FileText, Settings, AlertTriangle } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface GovernanceSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

const ICONS = [ShieldCheck, Lock, FileText, Settings, AlertTriangle];

export function GovernanceSection({ t }: GovernanceSectionProps) {
  const points = t.raw("points") as string[];

  return (
    <section className="bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-300">
        <AnimatedSection variant="fade-up">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text mb-6 shadow-[0_0_10px_rgba(255,197,61,0.15)]">
            {t("badge")}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-ink max-w-2xl">
            {t("headline")}
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {points.map((point, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <AnimatedSection key={i} variant="scale-up" delay={i * 0.07}>
                <div className="flex items-start gap-4 rounded-ds-lg border border-hairline-strong bg-surface-card p-6 h-full">
                  <Icon size={16} className="mt-0.5 shrink-0 text-accent-yellow" />
                  <span className="font-body text-sm text-body-text">{point}</span>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
