"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has scrolled into view, and true forever after.
 * The observer disconnects on first sight, so nothing keeps running behind
 * the page. Callers add the `in` class; the animation itself lives in CSS.
 */
export default function useInView<T extends HTMLElement>(rootMargin = "-60px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    // Already scrolled past on first paint (a reload restores the scroll
    // position): nothing will ever intersect, so just print it.
    if (el.getBoundingClientRect().bottom < 0) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, seen]);

  return { ref, cls: seen ? "in" : "" };
}
