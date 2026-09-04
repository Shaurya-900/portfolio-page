"use client";

import useInView from "./useInView";

/** Quiet rise-and-settle used to bring sections onto the page. */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, cls } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${cls} ${className ?? ""}`}
      style={delay ? ({ "--delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
