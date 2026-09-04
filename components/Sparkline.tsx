/**
 * Fourteen days of commits, drawn as a column of bars in the style of a
 * financial page. Pure SVG on numbers the caller already has.
 */
export default function Sparkline({ days }: { days: number[] }) {
  const total = days.reduce((a, b) => a + b, 0);
  const peak = Math.max(...days, 1);
  const w = 100;
  const h = 26;
  const slot = w / days.length;
  const bar = slot * 0.62;

  return (
    <div>
      <div className="dept flex items-baseline justify-between gap-4 border-b border-ink/60 pb-2">
        <h3>Volume · 14 days</h3>
        <span className="text-soft">{total} commits</span>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="mt-3 block h-12 w-full"
        role="img"
        aria-label={`${total} commits over the last fourteen days, ${
          days.at(-1) ?? 0
        } of them today.`}
      >
        {days.map((n, i) => (
          <rect
            key={i}
            x={i * slot + (slot - bar) / 2}
            /* A zero day still gets a hairline, so the axis reads as a run
               of days rather than a gap in the record. */
            y={h - Math.max(0.6, (n / peak) * h)}
            width={bar}
            height={Math.max(0.6, (n / peak) * h)}
            fill="currentColor"
            className={n === 0 ? "text-rule" : i === days.length - 1 ? "text-accent" : "text-ink"}
          />
        ))}
      </svg>
      <p className="dept mt-1 flex justify-between text-soft">
        <span>14d ago</span>
        <span>Today</span>
      </p>
    </div>
  );
}
