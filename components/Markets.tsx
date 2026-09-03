"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { PAPER } from "@/lib/content";
import { fetchRepos, timeAgo, type Repo } from "@/lib/github";

type Quotes =
  | { state: "loading" }
  | { state: "delayed" }
  | { state: "live"; repos: Repo[] };

/**
 * The financial page: every public repository as a listing on the board,
 * languages as holdings. Live from api.github.com, with an honest notice
 * when the exchange rate-limits us.
 */
export default function Markets() {
  const [quotes, setQuotes] = useState<Quotes>({ state: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetchRepos(PAPER.githubUser).then((repos) => {
      if (cancelled) return;
      setQuotes(repos ? { state: "live", repos } : { state: "delayed" });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const board = useMemo(
    () =>
      quotes.state === "live"
        ? quotes.repos
            .filter((r) => !r.fork)
            .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
        : [],
    [quotes]
  );

  const holdings = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of board) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([lang, n]) => ({ lang, share: Math.round((n / total) * 100) }));
  }, [board]);

  return (
    <section aria-label="Markets">
      <SectionHead id="markets" title="Markets" note="Live from the exchange at github.com" />

      {quotes.state === "loading" && (
        <p className="dept flex items-center gap-2 pt-10 text-soft" role="status">
          <span
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
            aria-hidden="true"
          />
          Dialing the exchange…
        </p>
      )}

      {quotes.state === "delayed" && (
        <p className="pt-10 font-serif text-[15px] leading-relaxed text-soft">
          The exchange is rate-limiting this desk. The full record stays open at{" "}
          <a href={PAPER.github} target="_blank" rel="noopener noreferrer" className="proof text-ink">
            github.com/{PAPER.githubUser}
          </a>
          .
        </p>
      )}

      {quotes.state === "live" && (
        <div className="grid gap-10 pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <table className="w-full border-collapse font-mono text-[12.5px]">
              <thead>
                <tr className="dept text-left text-soft">
                  <th scope="col" className="border-b border-ink/60 py-2 pr-4 font-normal">
                    Listing
                  </th>
                  <th scope="col" className="border-b border-ink/60 py-2 pr-4 font-normal">
                    Language
                  </th>
                  <th scope="col" className="border-b border-ink/60 py-2 text-right font-normal">
                    Last trade
                  </th>
                </tr>
              </thead>
              <tbody>
                {board.map((r) => (
                  <tr key={r.name}>
                    <td className="border-b border-rule/40 py-2.5 pr-4">
                      <a
                        href={r.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium uppercase tracking-wide"
                      >
                        <span className="proof">{r.name}</span>
                      </a>
                    </td>
                    <td className="border-b border-rule/40 py-2.5 pr-4 text-soft">
                      {r.language ?? "—"}
                    </td>
                    <td className="border-b border-rule/40 py-2.5 text-right text-soft">
                      {timeAgo(r.pushed_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-4">
            <h3 className="dept border-b border-ink/60 pb-2">Holdings · by language</h3>
            <ul className="mt-3 space-y-2.5">
              {holdings.map((h) => (
                <li key={h.lang} className="font-mono text-[12.5px]">
                  <div className="flex items-baseline justify-between gap-4">
                    <span>{h.lang}</span>
                    <span className="text-soft">{h.share}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-rule/30" aria-hidden="true">
                    <div className="h-full bg-ink" style={{ width: `${h.share}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      )}
    </section>
  );
}
