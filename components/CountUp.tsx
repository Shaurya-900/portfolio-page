"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * A figure that counts up when it enters view, like a press counter.
 * Handles values with a unit suffix ("15s") and non-numeric values,
 * which render as-is.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || reduce || target === null || target === 0) return;
    const started = performance.now();
    const duration = 700;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - started) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  if (target === null || reduce) {
    return (
      <p ref={ref} className={className}>
        {value}
      </p>
    );
  }
  return (
    <p ref={ref} className={className}>
      {inView ? shown : 0}
      {suffix}
    </p>
  );
}
