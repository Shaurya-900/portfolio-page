# Shaurya Jain — Portfolio

A single-page personal portfolio. React + Vite + Tailwind CSS, deploy-ready for Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Deploy to Vercel

The repo works with Vercel's zero-config Vite detection — no `vercel.json` needed.

- **Dashboard:** import the repo at [vercel.com/new](https://vercel.com/new). Framework preset is detected as **Vite**; build command `npm run build`, output directory `dist`.
- **CLI:** `npm i -g vercel` then `vercel` (preview) or `vercel --prod`.

## Editing content

Everything lives in [`src/App.jsx`](src/App.jsx):

- `PROFILE` — name, identity line, email, GitHub URL.
- `PROJECTS` — one object per project card.
- To add a real screenshot, replace the dashed-border placeholder `<div>` inside `ProjectCard` with an `<img>` (e.g. put images in `public/` and reference `/shot.png`).
