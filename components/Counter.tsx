"use client";

import {
    animate,
    motion,
    useInView,
    useMotionValue,
    useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  target?: number;
  value?: string; // String value like "92%", "<3s", "150+"
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

// Parse numeric value from string (e.g., "92%" -> 92, "<3s" -> 3)
function parseValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([<>≈~]?)(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    return {
      prefix: match[1] || "",
      num: parseFloat(match[2]),
      suffix: match[3] || "",
    };
  }
  return { num: 0, prefix: "", suffix: value };
}

export default function Counter({
  target,
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  // Parse the value if provided as string
  const parsed = value ? parseValue(value) : null;
  const actualTarget = target ?? parsed?.num ?? 0;
  const actualPrefix = prefix || parsed?.prefix || "";
  const actualSuffix = suffix || parsed?.suffix || "";

  useEffect(() => {
    if (isInView) {
      animate(motionValue, actualTarget, {
        duration,
        ease: [0.22, 0.9, 0.3, 1],
      });
    }
  }, [isInView, motionValue, actualTarget, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${actualPrefix}${v}${actualSuffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, actualPrefix, actualSuffix]);

  return (
    <motion.span ref={ref} className={className}>
      {actualPrefix}0{actualSuffix}
    </motion.span>
  );
}
