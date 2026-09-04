/**
 * Every word printed in the paper lives here.
 * Keep it short — the layout is a broadsheet, not a book.
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

export const DECK =
  "Full-stack developer, second-year computer science at Shiv Nadar University. I build web applications end to end, from database schema to letter-spacing, and I ship them.";

export const INDEX = [
  { label: "The Work", href: "#work" },
  { label: "Markets", href: "#markets" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* The work — four shipped projects, one short story each              */
/* ------------------------------------------------------------------ */

export interface Project {
  slug: string;
  kicker: string;
  headline: string;
  blurb: string;
  photo: { src: string; caption: string };
  stack: string[];
  live?: { href: string; label: string };
  repo: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "news-aggregator",
    kicker: "Automation",
    headline: "The Newspaper That Writes Itself",
    blurb:
      "Every midnight it reads fifteen startup wires in parallel, throws out the noise, files what survives under eight desks and serves it to a campus that never has to open a feed. Sign-in, bookmarks, student submissions and a human moderation desk sit around the pipeline.",
    photo: { src: "/ecell-gazette.webp", caption: "The Gazette, mid-run. Photograph: staff." },
    stack: ["Next.js", "Turso libSQL", "Clerk", "Vercel Cron"],
    live: { href: "https://ecellgazette.vercel.app", label: "ecellgazette.vercel.app" },
    repo: "https://github.com/Shaurya-900/news-aggregator",
  },
  {
    slug: "perry-game",
    kicker: "Games",
    headline: "A Booth Game That Collects Its Own Leads",
    blurb:
      "A one-thumb comic-book runner for the E-Cell stall at the club fair. Scan the QR, run for thirty seconds, watch your score land on the monitor, and the club leaves the fair with a database of named, contactable visitors. Signed run tokens keep the leaderboard honest.",
    photo: { src: "/agent-run.webp", caption: "Agent Run, at the stall. Photograph: staff." },
    stack: ["Next.js", "Canvas", "Supabase", "TypeScript"],
    live: { href: "https://ecellinator.vercel.app", label: "ecellinator.vercel.app" },
    repo: "https://github.com/Shaurya-900/perry-game",
  },
  {
    slug: "audio-transcriber",
    kicker: "Technology",
    headline: "Machine Takes Dictation",
    blurb:
      "Hand it an audio file and it returns a clean, readable transcript in seconds: Groq-hosted Whisper behind a Flask front desk. Live, and handling real lectures and voice notes.",
    photo: { src: "/audio-transcriber.webp", caption: "Receiving evidence. Photograph: staff." },
    stack: ["Flask", "Groq Whisper", "Python"],
    live: {
      href: "https://audio-transcriber-sa9l.onrender.com/transcribe",
      label: "audio-transcriber.onrender.com",
    },
    repo: "https://github.com/Shaurya-900/audio-transcriber",
  },
  {
    slug: "campus-lost-found",
    kicker: "City Desk",
    headline: "Lost Things, Found by Sight",
    blurb:
      "The lost-and-found notice is an old and mostly failed genre. This one replaces prose with pixels: photographs of lost and found items are matched by Gemini Vision, so claims surface without anyone scrolling a feed.",
    photo: { src: "/campus-lost-found.webp", caption: "Reunions, arranged by machine. Photograph: staff." },
    stack: ["React", "Node", "Gemini Vision"],
    live: {
      href: "https://campus-lost-found-serverless.vercel.app",
      label: "campus-lost-found.vercel.app",
    },
    repo: "https://github.com/Shaurya-900/campus-lost-found",
  },
];

/* ------------------------------------------------------------------ */
/* The back page                                                       */
/* ------------------------------------------------------------------ */

export const EDITOR_NOTE =
  "This paper has a staff of one. I like problems with a whole pipeline in them (fetching, cleaning, deciding, serving), and I like shipping, which is why everything above is deployed and running rather than mocked up. I take freelance work: landing pages, internal tools, and the odd jobs of the internet.";

/* Fallback wire briefs shown while live GitHub data loads (or if the  */
/* exchange rate-limits us).                                           */
export const TICKER_FALLBACK = [
  "WIRE · perry-game · booth build shipped, leaderboard live",
  "WIRE · news-aggregator · ingestion pipeline on schedule, presses ran at 00:00",
  "WIRE · exchange (api.github.com) dialing in · live quotations to follow",
];
