"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { useConsentStore } from "@/store/consent-store";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const locale = useLocale();
  const { accepted, setConsent, hydrate } = useConsentStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (accepted !== null) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] border-t border-hairline-strong bg-surface-card px-6 py-4">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
        <p className="font-body text-sm text-body-text max-w-xl">
          {t("message")}{" "}
          <Link
            href={`/${locale}/privacy-policy`}
            className="text-link underline underline-offset-2 hover:text-ink transition-colors"
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setConsent(false)}
            className="inline-flex items-center h-8 px-4 rounded-ds-md border border-hairline-strong bg-surface-elevated text-ink font-sans text-sm font-medium transition-colors hover:bg-surface-card"
          >
            {t("decline")}
          </button>
          <button
            onClick={() => setConsent(true)}
            className="inline-flex items-center h-8 px-4 rounded-ds-md bg-ink text-canvas font-sans text-sm font-medium transition-colors hover:bg-surface-light"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
