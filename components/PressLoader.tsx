"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STEPS = ["composing masthead", "setting columns", "inking plates", "press run"];

/**
 * A short press-run before the front page: the paper is "typeset" for
 * about a second, then feeds upward off the platen. Shown once per
 * session; skipped entirely under reduced motion.
 */
export default function PressLoader({ edition }: { edition: number }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState<boolean | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("pressed") === "1";
    } catch {
      /* ignore */
    }
    if (seen || reduce) {
      setVisible(false);
      return;
    }
    setVisible(true);
    try {
      sessionStorage.setItem("pressed", "1");
    } catch {
      /* ignore */
    }
    const stepTimer = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 320);
    const done = setTimeout(() => setVisible(false), 1500);
    return () => {
      clearInterval(stepTimer);
      clearTimeout(done);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-paper text-ink"
          exit={{ y: "-100%", transition: { duration: 0.55, ease: [0.7, 0, 0.3, 1] } }}
        >
          <p className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
            The Daily Build
          </p>
          <div className="dept mt-6 flex items-center gap-3 text-soft">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-accent" />
            {STEPS[step]}
            {step === STEPS.length - 1 ? ` no. ${edition}` : "…"}
          </div>
          <div className="mt-5 h-px w-40 overflow-hidden bg-rule">
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.35, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
