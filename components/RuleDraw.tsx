"use client";

import { motion, useReducedMotion } from "framer-motion";

/** A double rule that inks itself across the page as it enters view. */
export default function RuleDraw({ flipped = false }: { flipped?: boolean }) {
  const reduce = useReducedMotion();
  const cls = flipped ? "double-rule-flip" : "double-rule";
  if (reduce) return <div className={cls} aria-hidden="true" />;
  return (
    <motion.div
      aria-hidden="true"
      className={cls}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
