"use client";

import { ShieldCheck, Lock, FileText, Settings, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";

const CARD_META = [
  { Icon: ShieldCheck,   accent: "#11ff99", glow: "rgba(17,255,153,0.18)",  bg: "rgba(17,255,153,0.06)"  },
  { Icon: Lock,          accent: "#3b9eff", glow: "rgba(59,158,255,0.18)",  bg: "rgba(59,158,255,0.06)"  },
  { Icon: FileText,      accent: "#ffc53d", glow: "rgba(255,197,61,0.18)",  bg: "rgba(255,197,61,0.06)"  },
  { Icon: Settings,      accent: "#ff801f", glow: "rgba(255,128,31,0.18)",  bg: "rgba(255,128,31,0.06)"  },
  { Icon: AlertTriangle, accent: "#ff2047", glow: "rgba(255,32,71,0.18)",   bg: "rgba(255,32,71,0.06)"   },
];

function GovernanceCard({ point, meta }: { point: string; meta: typeof CARD_META[number] }) {
  const { Icon, accent, glow, bg } = meta;
  return (
    <div
      className="group relative flex flex-col gap-5 rounded-ds-lg border p-6 h-full overflow-hidden transition-all duration-300 cursor-default"
      style={{
        borderColor: `${accent}22`,
        background: "var(--ds-surface-card)",
        // CSS custom props for hover — toggled via group-hover in style tag below
      }}
    >
      {/* Hover overlay — opacity transitions via CSS */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-ds-lg"
        style={{ background: bg, boxShadow: `inset 0 0 40px ${glow}` }}
      />
      {/* Outer glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-ds-lg"
        style={{ boxShadow: `0 0 28px ${glow}` }}
      />

      {/* top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-ds-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: accent }}
      />

      {/* icon */}
      <div
        className="relative w-10 h-10 rounded-ds-md flex items-center justify-center border transition-all duration-300"
        style={{
          color: accent,
          background: bg,
          borderColor: `${accent}33`,
          boxShadow: `0 0 10px ${glow}`,
        }}
      >
        <Icon size={18} />
      </div>

      {/* label */}
      <p className="relative font-body text-sm font-medium text-ink leading-snug">
        {point}
      </p>
    </div>
  );
}

export function GovernanceSection() {
  const t = useTranslations("governance");
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
          {points.map((point, i) => (
            <AnimatedSection key={i} variant="fade-up" delay={i * 0.07}>
              <GovernanceCard point={point} meta={CARD_META[i] ?? CARD_META[0]} />
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
