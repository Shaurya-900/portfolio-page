"use client";

import useInView from "./useInView";

/**
 * Headlines typeset themselves: each word rises out of the baseline as
 * if being set in a composing stick. Under reduced motion the CSS holds
 * every word in place and the text simply prints.
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
  const { ref, cls } = useInView<HTMLHeadingElement>("-40px");
  const words = text.split(" ");
  return (
    <Tag ref={ref} id={id} className={`${className ?? ""} ${cls}`} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] align-top"
        >
          <span className="set-word" style={{ animationDelay: `${i * 0.045}s` }}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
