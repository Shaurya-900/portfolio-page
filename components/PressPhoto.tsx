"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A press photograph that "develops" as it enters view: it arrives
 * over-exposed and out of focus, then settles into the printed page.
 */
export default function PressPhoto({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const reduce = useReducedMotion();
  const img = (
    <div className="press-photo">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={720}
        className="aspect-[16/9] object-cover object-top"
      />
    </div>
  );
  return (
    <figure className="border border-ink/60">
      {reduce ? (
        img
      ) : (
        <motion.div
          initial={{ opacity: 0.4, filter: "blur(10px) brightness(1.6) contrast(0.7)" }}
          whileInView={{ opacity: 1, filter: "blur(0px) brightness(1) contrast(1)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {img}
        </motion.div>
      )}
      <figcaption className="dept border-t border-ink/60 px-2.5 py-2 text-soft">{caption}</figcaption>
    </figure>
  );
}
