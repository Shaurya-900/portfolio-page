# The Daily Build — Shaurya Jain

A portfolio typeset as a broadsheet newspaper.

The conceit: the centerpiece project is a [news aggregator that writes a newspaper](https://github.com/Shaurya-900/news-aggregator), so the portfolio *is* a newspaper. The lead story covers the aggregator and includes **The Wire Desk** — a live, animated demonstration of its real pipeline (relevance gate → cleaning → desk classification → dedupe → publish). GitHub activity runs as the markets page, contact is the classifieds, and dark mode is the Late Edition.

## Stack

- **Next.js (App Router) + TypeScript** — static, server components everywhere except the interactive desks
- **Tailwind CSS** — design tokens as CSS variables (`--paper`, `--ink`, `--accent`) so the Late Edition is a palette swap
- **Framer Motion** — the press-run loader, wire-desk choreography, and section reveals; everything honors `prefers-reduced-motion`
- **Typography** — Fraunces (display), Newsreader (text), IBM Plex Mono (figures), via `next/font`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy

Zero-config on Vercel (framework preset: Next.js). The front page is static with hourly revalidation so the dateline stays current.

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts) — masthead, lead story, wire-desk demonstration items, articles, classifieds, corrections. Live GitHub data (ticker, markets page) is fetched client-side from the public API in [`lib/github.ts`](lib/github.ts) and degrades gracefully when rate-limited.
