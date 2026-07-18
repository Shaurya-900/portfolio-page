/**
 * Every word printed in the paper lives here.
 * Edit this file to change copy; the layout composes itself.
 */

export const PAPER = {
  name: "The Daily Build",
  motto: "All the code that's fit to ship.",
  publisher: "Shaurya Jain",
  email: "shauryajm2818@gmail.com",
  github: "https://github.com/Shaurya-900",
  githubUser: "Shaurya-900",
  place: "Greater Noida · Delhi NCR",
  university: "Shiv Nadar University",
  // Edition numbering starts the day the publisher enrolled.
  foundedISO: "2024-08-01",
};

export function editionNumber(now: Date): number {
  const founded = new Date(PAPER.foundedISO).getTime();
  return Math.max(1, Math.floor((now.getTime() - founded) / 86_400_000));
}

/* ------------------------------------------------------------------ */
/* Front page — lead story: the E-Cell Gazette news aggregator         */
/* ------------------------------------------------------------------ */

export const LEAD = {
  kicker: "Special Report · Automation",
  headline: "The Newspaper That Writes Itself",
  deck: "Fifteen wire services, eight desks, one database and no editors: inside the E-Cell Gazette, a student-built machine that reads the startup press so a campus doesn’t have to.",
  byline: "By Shaurya Jain",
  dateline: "Filed from Shiv Nadar University",
  repo: "https://github.com/Shaurya-900/news-aggregator",
  live: "https://ecellgazette.vercel.app",
  liveLabel: "ecellgazette.vercel.app",
  body: [
    "Every night at midnight, while its author sleeps, a small program wakes up and reads the news. It calls fifteen RSS wires in parallel — TechCrunch, VentureBeat, The Next Web, Entrackr, Mint, the Economic Times’ startup desk and others — giving each one fifteen seconds to answer before moving on without it. What comes back is raw wire copy: HTML entities, tracking cruft, syndicated duplicates, and the occasional recipe column that has no business on a startup page.",
    "The machine is unsentimental about all of it. A relevance gate throws out anything without a startup signal. A cleaning pass strips markup and straightens the typography. A classifier reads each survivor and assigns it to one or more of eight desks — AI, Funding, Web3, IPO, Policy, M&A, Leadership, General — by scoring keyword evidence, with a typesetter’s eye for detail: acronyms of three letters or fewer only match on word boundaries, so “email” never wakes the AI desk. Duplicates are spiked on sight, keyed by URL. Whatever remains is upserted into a Turso database and served to readers of the Shiv Nadar University Entrepreneurship Cell.",
    "Around the pipeline stands a full newsroom: sign-in at the door (Clerk), bookmarks for regulars, a submissions window where students file their own stories with cover art (Vercel Blob), and a moderation desk where pending copy is approved, rejected or restored by human hands — the one part of the operation that still requires judgment. The presses run on Vercel Cron: news at midnight, LinkedIn dispatches at six.",
  ],
  numbers: [
    { value: "15", label: "wire services, fetched in parallel" },
    { value: "8", label: "desks for auto-classification" },
    { value: "15s", label: "timeout per feed — one slow wire never stalls the run" },
    { value: "2", label: "cron schedules: news at 00:00, LinkedIn at 06:00" },
    { value: "1", label: "database — Turso libSQL, deduped by URL" },
    { value: "0", label: "editors required, one moderation desk optional" },
  ],
  stack: ["Next.js 16", "TypeScript", "Turso libSQL", "Clerk", "Vercel Blob", "Vercel Cron", "rss-parser", "Tailwind v4"],
};

/* The Wire Desk demonstration. Each item passes through the real       */
/* pipeline's stages: gate → clean → classify → dedupe → publish.       */

export type WireVerdict = "publish" | "spike";

export interface WireItem {
  id: string;
  source: string;
  raw: string;
  clean: string;
  desks: { name: string; evidence: string }[];
  verdict: WireVerdict;
  spikeReason?: string;
  note?: string;
}

export const WIRE_ITEMS: WireItem[] = [
  {
    id: "w1",
    source: "TechWire Daily",
    raw: "Acme Robotics raises $40M Series B to automate warehouse picking",
    clean: "Acme Robotics raises $40M Series B to automate warehouse picking",
    desks: [{ name: "Funding", evidence: "raises · Series B · $40M" }],
    verdict: "publish",
  },
  {
    id: "w2",
    source: "Campus Business Post",
    raw: "&#8216;We were three kids in a dorm&#8217; &#8212; campus startup acquired by logistics giant",
    clean: "‘We were three kids in a dorm’ — campus startup acquired by logistics giant",
    desks: [{ name: "M&A", evidence: "acquired by" }],
    verdict: "publish",
    note: "entities repaired in the cleaning pass",
  },
  {
    id: "w3",
    source: "Weekend Supplement",
    raw: "Ten monsoon recipes to try before the rains end",
    clean: "Ten monsoon recipes to try before the rains end",
    desks: [],
    verdict: "spike",
    spikeReason: "no startup signal — fails the relevance gate",
  },
  {
    id: "w4",
    source: "Policy Wire",
    raw: "RBI floats new compliance rules for fintech startups",
    clean: "RBI floats new compliance rules for fintech startups",
    desks: [{ name: "Policy", evidence: "RBI · compliance" }],
    verdict: "publish",
  },
  {
    id: "w5",
    source: "Syndicated repost",
    raw: "Acme Robotics raises $40M Series B to automate warehouse picking",
    clean: "Acme Robotics raises $40M Series B to automate warehouse picking",
    desks: [],
    verdict: "spike",
    spikeReason: "duplicate — this URL is already on file",
  },
  {
    id: "w6",
    source: "Enterprise Ledger",
    raw: "Retail email platform Mailhaul ships AI copilot for support desks",
    clean: "Retail email platform Mailhaul ships AI copilot for support desks",
    desks: [{ name: "AI", evidence: "AI — word-boundary match" }],
    verdict: "publish",
    note: "“email” and “retail” do not wake the AI desk; the bare acronym does",
  },
];

export const PIPELINE_STAGES = [
  {
    name: "Ingest",
    detail: "15 feeds fetched in parallel, 15s timeout each. One dead wire never kills the run — the batch reports ok unless every feed fails.",
  },
  {
    name: "Gate",
    detail: "A relevance matcher drops off-topic items. Short acronyms (ai, vc) match on word boundaries; longer stems match loosely, so “raise” still catches “raised”.",
  },
  {
    name: "Clean",
    detail: "Markup stripped, HTML entities repaired, summaries trimmed to 280 characters with a proper ellipsis.",
  },
  {
    name: "Classify",
    detail: "Eight desks score each story on keyword evidence. A story can hold multiple desks; with no evidence at all, it files under General.",
  },
  {
    name: "Store & Serve",
    detail: "Upserted into Turso (libSQL), deduped by URL, with an image found by cascade: enclosure → media tags → first image in the body.",
  },
];

/* ------------------------------------------------------------------ */
/* Page 2 — more reporting                                             */
/* ------------------------------------------------------------------ */

export interface Story {
  slug: string;
  kicker: string;
  headline: string;
  body: string[];
  photo?: { src: string; caption: string };
  filedUnder: string[];
  status: string;
  demo: string;
  demoLabel: string;
}

export const STORIES: Story[] = [
  {
    slug: "audio-transcriber",
    kicker: "Technology",
    headline: "Machine Takes Dictation; Stenographers Unmoved",
    body: [
      "For as long as there have been meetings, there has been the person who must later type up what was said. A new tool retires the practice: hand it an audio file and it returns a clean, readable transcript in seconds, powered by Groq-hosted Whisper behind a Flask front desk.",
      "The service is live and handling real uploads — lectures, voice notes, the long recordings nobody was ever going to replay.",
    ],
    photo: {
      src: "/audio-transcriber.png",
      caption: "The transcriber receiving evidence. Photograph: staff.",
    },
    filedUnder: ["Flask", "Groq Whisper", "Python"],
    status: "Live and handling real audio uploads",
    demo: "https://audio-transcriber-sa9l.onrender.com/transcribe",
    demoLabel: "Inspect the record",
  },
  {
    slug: "campus-lost-found",
    kicker: "City Desk",
    headline: "Lost Things, Found: Campus Turns to Computer Vision",
    body: [
      "The lost-and-found notice is an old and mostly failed genre: posts get buried, descriptions never match, and the umbrella stays lost. A campus service replaces prose with pixels — photographs of lost and found items are matched automatically by Gemini Vision, so claims surface without anyone scrolling a feed.",
      "Deployed and matching, it treats every mislaid water bottle with the seriousness of a missing-persons case.",
    ],
    photo: {
      src: "/campus-lost-found.png",
      caption: "Reunions, arranged by machine. Photograph: staff.",
    },
    filedUnder: ["React", "Node", "Gemini Vision"],
    status: "Deployed with working vision-AI matching",
    demo: "https://campus-lost-found-serverless.vercel.app",
    demoLabel: "Inspect the record",
  },
];

/* ------------------------------------------------------------------ */
/* The Editor's letter (about) and classifieds (contact)               */
/* ------------------------------------------------------------------ */

export const EDITOR_LETTER = {
  heading: "From the Editor",
  paragraphs: [
    "This paper has a staff of one. I am a second-year computer science student at Shiv Nadar University, and I build web applications the way this edition was assembled: end to end, from the database schema to the letter-spacing.",
    "I like problems with a whole pipeline in them — fetching, cleaning, deciding, serving — and I like shipping, which is why everything reported in these pages is deployed and running, not mocked up. When I’m not on deadline for a class, I take freelance work: landing pages, internal tools, and the odd jobs of the internet.",
    "The classifieds below explain how to reach the newsroom. We answer our mail.",
  ],
  signoff: "— The Editor",
};

export const CLASSIFIEDS = [
  {
    heading: "Situations Wanted",
    body: "FULL-STACK developer, second year, ships end to end. Landing pages, web tools, honest work at student rates. Apply within:",
    link: { href: "mailto:shauryajm2818@gmail.com", label: "shauryajm2818@gmail.com" },
  },
  {
    heading: "Public Records",
    body: "The complete works, commit by commit, are held in the public archive and may be inspected at any hour:",
    link: { href: "https://github.com/Shaurya-900", label: "github.com/Shaurya-900" },
  },
  {
    heading: "Wanted",
    body: "INTERESTING problems. Boring ones also accepted, at a premium. Serious inquiries only; all inquiries are serious.",
  },
  {
    heading: "Notice",
    body: "This newspaper was set by hand. No templates were consulted in its manufacture.",
  },
];

export const CORRECTION = {
  heading: "Corrections & Clarifications",
  body: "In an earlier edition, the editor was quoted saying he would “sleep early tonight.” This was printed in error. The Daily Build regrets nothing.",
};

/* Fallback wire briefs shown while live GitHub data loads (or if the  */
/* exchange rate-limits us).                                           */
export const TICKER_FALLBACK = [
  "WIRE · news-aggregator — ingestion pipeline on schedule, presses ran at 00:00",
  "WIRE · portfolio-page — this edition went to print",
  "WIRE · exchange (api.github.com) dialing in — live quotations to follow",
];
