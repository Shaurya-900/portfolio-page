"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import { SectionHead } from "./Reporting";
import { PAPER } from "@/lib/content";
import {
  eventBrief,
  fetchEvents,
  fetchRepos,
  timeAgo,
  type GhEvent,
  type Repo,
} from "@/lib/github";

type Quotes =
  | { state: "loading" }
  | { state: "delayed" }
  | { state: "live"; repos: Repo[]; events: GhEvent[] };

/**
 * Page 3 — Markets & Commits. GitHub rendered as the paper's financial
 * page: repositories as listings on the board, languages as holdings,
 * recent events as the trade log. Live quotations from api.github.com,
 * with an honest notice when the exchange rate-limits us.
 */
export default function Markets() {
  const [quotes, setQuotes] = useState<Quotes>({ state: "loading" });

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchRepos(PAPER.githubUser), fetchEvents(PAPER.githubUser)]).then(
      ([repos, events]) => {
        if (cancelled) return;
        if (repos) setQuotes({ state: "live", repos, events: events ?? [] });
        else setQuotes({ state: "delayed" });
      }
    );
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
            .slice(0, 8)
        : [],
    [quotes]
  );

  const holdings = useMemo(() => {
    if (quotes.state !== "live") return [];
    const counts = new Map<string, number>();
    for (const r of quotes.repos) {
      if (!r.fork && r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }
    const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, n]) => ({ lang, n, share: Math.round((n / total) * 100) }));
  }, [quotes]);

  const log = useMemo(
    () =>
      quotes.state === "live"
        ? quotes.events.map(eventBrief).filter((b): b is string => Boolean(b)).slice(0, 8)
        : [],
    [quotes]
  );

  return (
    <section aria-label="Markets and commits">
      <SectionHead
        id="markets"
        title="Markets &amp; Commits"
        note="Page 3 · live quotations from the exchange at github.com"
      />

      {quotes.state === "loading" && (
        <p className="dept mt-8 flex items-center gap-2 text-soft" role="status">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
          Dialing the exchange…
        </p>
      )}

      {quotes.state === "delayed" && (
        <div className="mt-8 border border-ink/60 p-5">
          <p className="dept text-accent">Quotations Delayed</p>
          <p className="mt-2 max-w-xl font-serif text-[15px] leading-relaxed">
            The exchange at api.github.com is rate-limiting this desk. The board resumes on
            refresh; in the meantime the full record remains open at{" "}
            <a
              href={PAPER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="proof font-medium"
            >
              github.com/{PAPER.githubUser}
            </a>
            .
          </p>
        </div>
      )}

      {quotes.state === "live" && (
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          {/* The board */}
          <Reveal className="lg:col-span-7">
            <h3 className="dept border-b border-ink/60 pb-2">The Board · public listings</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse font-mono text-[12.5px]">
                <thead>
                  <tr className="dept text-left text-soft">
                    <th scope="col" className="border-b border-rule/60 py-2 pr-4 font-normal">Symbol</th>
                    <th scope="col" className="border-b border-rule/60 py-2 pr-4 font-normal">Language</th>
                    <th scope="col" className="border-b border-rule/60 py-2 pr-4 text-right font-normal">Stars</th>
                    <th scope="col" className="border-b border-rule/60 py-2 text-right font-normal">Last trade</th>
                  </tr>
                </thead>
                <tbody>
                  {board.map((r) => (
                    <tr key={r.name} className="group">
                      <td className="border-b border-rule/40 py-2.5 pr-4">
                        <a
                          href={r.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium uppercase tracking-wide"
                          title={r.description ?? undefined}
                        >
                          <span className="proof">{r.name}</span>
                        </a>
                      </td>
                      <td className="border-b border-rule/40 py-2.5 pr-4 text-soft">{r.language ?? "—"}</td>
                      <td className="border-b border-rule/40 py-2.5 pr-4 text-right">
                        {r.stargazers_count > 0 ? `▲ ${r.stargazers_count}` : "—"}
                      </td>
                      <td className="border-b border-rule/40 py-2.5 text-right text-soft">
                        {timeAgo(r.pushed_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="space-y-10 lg:col-span-5">
            {/* Language holdings — proportional ink bars, every value printed */}
            <Reveal>
              <h3 className="dept border-b border-ink/60 pb-2">Holdings · by language</h3>
              <ul className="mt-3 space-y-2.5">
                {holdings.map((h) => (
                  <li key={h.lang} className="font-mono text-[12.5px]">
                    <div className="flex items-baseline justify-between gap-4">
                      <span>{h.lang}</span>
                      <span className="text-soft">
                        {h.share}% · {h.n} {h.n === 1 ? "listing" : "listings"}
                      </span>
                    </div>
                    <div className="mt-1 h-2 w-full bg-rule/30" aria-hidden="true">
                      <div className="h-full bg-ink" style={{ width: `${h.share}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Trade log */}
            <Reveal delay={0.05}>
              <h3 className="dept border-b border-ink/60 pb-2">The Trade Log</h3>
              <ul className="mt-3 space-y-2 font-mono text-[11.5px] leading-relaxed text-soft">
                {log.length > 0 ? (
                  log.map((line, i) => (
                    <li key={i} className="border-b border-rule/40 pb-2 last:border-b-0">
                      {line}
                    </li>
                  ))
                ) : (
                  <li>No trades reported this session.</li>
                )}
              </ul>
            </Reveal>
          </div>
        </div>
      )}
    </section>
  );
}
