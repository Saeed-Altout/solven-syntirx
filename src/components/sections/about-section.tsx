import { Cpu, BarChart2, Link2 } from "lucide-react";
import type { TranslationValues } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: any, values?: TranslationValues) => string;

interface AboutSectionProps {
  t: TFn & { raw: (key: string) => unknown };
}

const PILLAR_META = [
  { Icon: Cpu,       accent: "bg-accent-blue",   iconColor: "text-accent-blue"   },
  { Icon: BarChart2, accent: "bg-accent-green",  iconColor: "text-accent-green"  },
  { Icon: Link2,     accent: "bg-accent-orange", iconColor: "text-accent-orange" },
];

export function AboutSection({ t }: AboutSectionProps) {
  const points = t.raw("points") as string[];

  return (
    <section id="about" className="relative bg-canvas px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-[1200px]">

        {/* Badge + headline + body */}
        <AnimatedSection variant="fade-up">
          <span className="inline-flex items-center rounded-ds-full border border-hairline-strong bg-surface-elevated px-3 py-1 font-sans text-xs text-body-text uppercase tracking-widest mb-8 shadow-[0_0_8px_rgba(59,158,255,0.2)]">
            {t("badge")}
          </span>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight text-ink max-w-2xl">
            {t("headline")}
          </h2>
          <p className="mt-6 font-body text-base text-body-text leading-relaxed max-w-xl">
            {t("body")}
          </p>
        </AnimatedSection>

        {/* Pillars */}
        <AnimatedSection variant="fade-up" delay={0.15}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-hairline border border-hairline rounded-ds-lg overflow-hidden">
            {points.map((point, i) => {
              const { Icon, accent, iconColor } = PILLAR_META[i] ?? PILLAR_META[0];
              return (
                <div
                  key={point}
                  className="relative bg-surface-card px-6 py-6 flex flex-col gap-4 hover:bg-surface-elevated transition-colors duration-300"
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] ${accent}`} />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-stone">0{i + 1}</span>
                    <div className={`shrink-0 rounded-ds-md border border-hairline-strong bg-surface-elevated p-2 ${iconColor}`}>
                      <Icon size={16} />
                    </div>
                  </div>
                  <p className="font-body text-sm text-ink">{point}</p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
