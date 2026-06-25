# Project screenshots

The portfolio shows two screenshots, each wrapped in a browser-chrome mockup
(dark top bar + window dots). Save your images in this `public/` folder with
these exact names:

| File name                 | Capture this screen                                                   |
| ------------------------- | --------------------------------------------------------------------- |
| `audio-transcriber.png`   | A finished **transcript result** — the app showing real transcribed text, not the empty upload form. |
| `campus-lost-found.png`   | The **matches view** showing a real match with its confidence score — not the red/green "I lost / I found" landing buttons. This makes the vision-AI feature visible. |

Why these screens: recruiters scan for "is this real?" A result/matches view
proves the product works; a blank form or a landing menu doesn't.

Tips:
- A roughly 16:9 (landscape) crop looks best; images are cropped to fit from
  the top inside the mockup.
- PNG or JPG both work. If you use `.jpg`, update the `image:` paths in
  `src/App.jsx` (the `PROJECTS` array) to match.
- Until a file exists, that card shows a dashed "screenshot" placeholder.
