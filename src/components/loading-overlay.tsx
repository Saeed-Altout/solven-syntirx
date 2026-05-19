"use client";

import { useUIStore } from "@/store/ui-store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LoadingOverlay() {
  const isLangSwitching = useUIStore((s) => s.isLangSwitching);
  const setLangSwitching = useUIStore((s) => s.setLangSwitching);
  const pathname = usePathname();

  useEffect(() => {
    if (isLangSwitching) {
      setLangSwitching(false);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLangSwitching) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-canvas">
      <div className="flex flex-col items-center gap-6">
        <div className="h-10 w-10 rounded-full border-2 border-hairline-strong border-t-ink animate-spin" />
        <span className="font-body text-charcoal text-sm tracking-wider uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
