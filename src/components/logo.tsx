"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 140, height = 32 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div style={{ width, height }} className={cn("shrink-0", className)} />;
  }

  const src = resolvedTheme === "light" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <Image
      src={src}
      alt="Solven Syntrix"
      width={width}
      height={height}
      className={cn("shrink-0", className)}
      priority
    />
  );
}
