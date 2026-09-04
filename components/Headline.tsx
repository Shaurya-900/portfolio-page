"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

/* The word starts fully below its clip line; observation happens on the
   heading itself (a clipped child never intersects the viewport). */
const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Headlines typeset themselves: each word rises out of the baseline as
 * if being set in a composing stick. Falls back to static text under
 * reduced motion.
 */
export default function Headline({
  text,
  as: Tag = "h2",
  id,
  className,
}: {
  text: string;
  as?: "h2" | "h3";
  id?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }
  const MotionTag = Tag === "h2" ? motion.h2 : motion.h3;
  const words = text.split(" ");
  return (
    <MotionTag
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      variants={container}
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] align-top"
        >
          <motion.span className="inline-block" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}
