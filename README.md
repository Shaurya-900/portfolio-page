# Shaurya Jain — portfolio

A portfolio typeset as a broadsheet newspaper.

The nameplate is the hero: an SVG headline that sets itself to the exact width of the
page at any viewport. Below it, four shipped projects run four to a page as press
photographs and short articles. GitHub activity runs live as the wire and the markets
page, and dark mode is the Late Edition.

## Stack

- **Next.js (App Router) + TypeScript** — server components everywhere except the live GitHub desks
- **Tailwind CSS** — design tokens as CSS variables (`--paper`, `--ink`, `--accent`) so the Late Edition is a palette swap
- **Framer Motion** — section reveals, drawn rules, developing press photographs; everything honors `prefers-reduced-motion`
- **Typography** — Fraunces (display), Newsreader (text), IBM Plex Mono (figures), via `next/font`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy

Zero-config on Vercel (framework preset: Next.js). The front page is static with hourly
revalidation so the dateline stays current.

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts) — nameplate, deck, the four projects,
the editor's note. Press photographs live in `public/`. Live GitHub data (the wire and the
markets page) is fetched client-side from the public API in [`lib/github.ts`](lib/github.ts)
and degrades gracefully when rate-limited.
