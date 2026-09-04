"use client";

import { useEffect, useState } from "react";
import { TICKER_FALLBACK, PAPER } from "@/lib/content";
import { eventBrief, fetchEvents } from "@/lib/github";

/**
 * The wire: a thin band of live briefs from the GitHub events feed,
 * streaming under the masthead the way agency copy crosses a newsroom.
 */
export default function WireTicker() {
  const [briefs, setBriefs] = useState<string[]>(TICKER_FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchEvents(PAPER.githubUser).then((events) => {
      if (cancelled || !events) return;
      // The feed repeats itself on a busy day; the wire only runs a brief once.
      const live = [...new Set(events.map(eventBrief).filter((b): b is string => Boolean(b)))].slice(
        0,
        10
      );
      if (live.length > 0) setBriefs(live);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // The loop scrolls one copy's width and restarts, so a copy narrower than
  // the screen leaves a bald patch. Three fallback briefs do not fill a
  // desktop; repeat them until they do, then duplicate for the seam.
  const strip = Array.from({ length: Math.ceil(9 / Math.max(1, briefs.length)) }, () => briefs).flat();
  const row = [...strip, ...strip];

  return (
    <div
      aria-label="Recent activity wire"
      className="overflow-hidden border-y border-ink bg-ink text-paper"
    >
      <div className="ticker-track flex w-max items-center gap-10 py-1.5 font-mono text-[11px] tracking-wide">
        {row.map((b, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap" aria-hidden={i >= briefs.length}>
            {b}
            <span className="text-accent">■</span>
          </span>
        ))}
      </div>
    </div>
  );
}
