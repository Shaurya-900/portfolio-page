"use client";

import useInView from "./useInView";

/**
 * A double rule that inks itself across the page as it enters view.
 * The observer watches the wrapper, not the rule: the rule starts at
 * scaleX(0), and a zero-width box never reports as intersecting.
 */
export default function RuleDraw({ flipped = false }: { flipped?: boolean }) {
  const { ref, cls } = useInView<HTMLDivElement>("-40px");
  return (
    <div ref={ref} className={cls} aria-hidden="true">
      <div className={`${flipped ? "double-rule-flip" : "double-rule"} rule-draw`} />
    </div>
  );
}
