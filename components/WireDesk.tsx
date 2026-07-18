"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { LEAD, WIRE_ITEMS, type WireItem } from "@/lib/content";

/** Raw copy chatters in character by character, like a teletype. */
function Teletype({ text, live }: { text: string; live: boolean }) {
  const [count, setCount] = useState(live ? 0 : text.length);

  useEffect(() => {
    if (!live) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const started = performance.now();
    const duration = 230;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - started) / duration);
      setCount(Math.ceil(p * text.length));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, live]);

  return (
    <>
      {text.slice(0, count)}
      {count < text.length && <span className="text-accent">▍</span>}
    </>
  );
}

/**
 * The Wire Desk: a live demonstration of the E-Cell Gazette's actual
 * pipeline. Six raw wire items arrive and are gated, cleaned, classified
 * and spiked in front of the reader; the survivors are then typeset into
 * tonight's miniature front page.
 *
 * Sub-stages per item: 0 nothing · 1 raw copy in · 2 cleaned · 3 desks
 * stamped · 4 verdict. A single step counter drives everything so the
 * choreography stays deterministic and cheap.
 */

const SUBSTAGES = 4;
const STEP_MS = 260;
const TOTAL_STEPS = WIRE_ITEMS.length * SUBSTAGES + 3;

function stageOf(step: number, index: number): number {
  return Math.max(0, Math.min(SUBSTAGES, step - index * SUBSTAGES));
}

function statusLine(step: number): string {
  if (step === 0) return "Standing by";
  if (step < TOTAL_STEPS - 2) {
    const item = Math.min(WIRE_ITEMS.length, Math.floor(step / SUBSTAGES) + 1);
    return `Receiving wire copy · item ${item} of ${WIRE_ITEMS.length}`;
  }
  return "Gone to press";
}

const stamp = {
  initial: { opacity: 0, scale: 1.5, rotate: -6 },
  animate: { opacity: 1, scale: 1, rotate: -1.5 },
};

function WireRow({ item, stage, animated }: { item: WireItem; stage: number; animated: boolean }) {
  const spiked = stage >= 4 && item.verdict === "spike";
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={
        stage >= 4
          ? { opacity: 1, y: 0, x: [0, -2, 1.5, 0] } // the stamp lands and the copy jolts
          : { opacity: stage > 0 ? 1 : 0, y: stage > 0 ? 0 : 8, x: 0 }
      }
      transition={{ duration: 0.3, ease: "easeOut", x: { duration: 0.22 } }}
      className="border-b border-rule/60 py-3 last:border-b-0"
    >
      <div className="dept flex flex-wrap items-center gap-x-3 gap-y-1 text-soft">
        <span>Incoming · {item.source}</span>
        {stage >= 2 && item.raw !== item.clean && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent">
            cleaned
          </motion.span>
        )}
        <span className="ml-auto flex items-center gap-2">
          <AnimatePresence>
            {stage >= 3 &&
              item.desks.map((d) => (
                <motion.span
                  key={d.name}
                  variants={stamp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.25, ease: [0.2, 1.4, 0.4, 1] }}
                  className="border border-accent px-1.5 py-0.5 text-accent"
                  title={`evidence: ${d.evidence}`}
                >
                  {d.name}
                </motion.span>
              ))}
          </AnimatePresence>
          {stage >= 4 && (
            <motion.span
              variants={stamp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.28, ease: [0.2, 1.4, 0.4, 1] }}
              className={
                item.verdict === "publish"
                  ? "bg-ink px-1.5 py-0.5 text-paper"
                  : "border border-soft px-1.5 py-0.5 text-soft line-through decoration-accent decoration-2"
              }
            >
              {item.verdict === "publish" ? "Published" : "Spiked"}
            </motion.span>
          )}
        </span>
      </div>

      <p
        className={`mt-1.5 text-[15px] leading-snug transition-all duration-300 ${
          stage >= 2 ? "font-serif font-medium" : "font-mono text-[13px] text-soft"
        } ${spiked ? "text-soft line-through decoration-accent/70" : ""}`}
      >
        {stage >= 2 ? item.clean : <Teletype text={item.raw} live={animated && stage === 1} />}
      </p>

      {stage >= 4 && item.spikeReason && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dept mt-1 text-accent">
          {item.spikeReason}
        </motion.p>
      )}
      {stage >= 4 && item.note && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 font-serif text-[13px] italic text-soft"
        >
          {item.note}
        </motion.p>
      )}
      {stage >= 3 && stage < 4 && item.desks.length > 0 && (
        <p className="dept mt-1 text-soft">evidence: {item.desks.map((d) => d.evidence).join(" · ")}</p>
      )}
    </motion.li>
  );
}

function MiniFrontPage() {
  const published = WIRE_ITEMS.filter((w) => w.verdict === "publish");
  const [lead, ...rest] = published;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 border-2 border-ink p-4 sm:p-5"
    >
      <p className="dept text-center text-soft">Tonight’s front page · assembled by the machine</p>
      <p className="mt-1 text-center font-display text-xl font-black uppercase tracking-tight">
        The E-Cell Gazette
      </p>
      <div className="mt-3 grid gap-4 border-t border-ink pt-3 sm:grid-cols-2">
        <article>
          <p className="dept text-accent">{lead.desks.map((d) => d.name).join(" · ")}</p>
          <p className="mt-1 font-display text-lg font-bold leading-tight">{lead.clean}</p>
          <p className="dept mt-1.5 text-soft">{lead.source}</p>
        </article>
        <div className="space-y-3 border-rule/60 sm:border-l sm:pl-4">
          {rest.map((w) => (
            <article key={w.id} className="border-b border-rule/60 pb-2.5 last:border-b-0 last:pb-0">
              <p className="dept text-accent">{w.desks.map((d) => d.name).join(" · ")}</p>
              <p className="mt-0.5 font-serif text-[15px] font-semibold leading-snug">{w.clean}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function WireDesk() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);

  const finished = step >= TOTAL_STEPS;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStep(TOTAL_STEPS);
      return;
    }
    setStep(0);
    const t = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= TOTAL_STEPS) clearInterval(t);
        return s + 1;
      });
    }, STEP_MS);
    return () => clearInterval(t);
  }, [inView, reduce, run]);

  return (
    <div ref={ref} className="border-2 border-ink">
      {/* Desk header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-ink px-4 py-2 text-paper">
        <p className="dept">
          The Wire Desk <span className="mx-2 text-accent">■</span> live demonstration of the pipeline
        </p>
        <p className="dept flex items-center gap-2" role="status">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              finished ? "bg-paper" : "animate-pulse bg-accent"
            }`}
            aria-hidden="true"
          />
          {statusLine(step)}
        </p>
      </div>

      <div className="px-4 py-2 sm:px-5">
        <ul>
          {WIRE_ITEMS.map((item, i) => (
            <WireRow key={`${run}-${item.id}`} item={item} stage={stageOf(step, i)} animated={!reduce} />
          ))}
        </ul>

        {finished && <MiniFrontPage />}

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
          <p className="dept text-soft">
            {finished && (
              <>
                {WIRE_ITEMS.filter((w) => w.verdict === "publish").length} published ·{" "}
                {WIRE_ITEMS.filter((w) => w.verdict === "spike").length} spiked · the real
                Gazette prints nightly at{" "}
                <a
                  href={LEAD.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proof text-ink"
                >
                  {LEAD.liveLabel}
                </a>
              </>
            )}
            {!finished && " "}
          </p>
          {finished && !reduce && (
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setRun((r) => r + 1);
              }}
              className="dept border border-ink px-3 py-1.5 transition-colors hover:border-accent hover:bg-accent hover:text-paper"
            >
              Run the presses again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
