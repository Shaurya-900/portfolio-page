import type { Metadata } from "next";
import { Playfair_Display, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { PAPER } from "@/lib/content";
import "./globals.css";

/* Playfair over Fraunces: Fraunces' capital J curls back under the baseline,
   which reads as a squiggle in a nameplate. Playfair's sits on it. */
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "variable",
});

/* Only the weights the paper actually sets. Every extra weight and style
   is another font file on the wire for type nobody sees. */
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

/* Absolute base for the share card and canonical URL. Vercel supplies the
   production host at build; locally it is just the dev server. */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shaurya Jain: full-stack developer",
  description:
    "The work of Shaurya Jain, printed as a broadsheet: a self-writing news aggregator, a club-fair game, an audio transcriber and a computer-vision lost & found. All deployed and running.",
  keywords: [
    "Shaurya Jain",
    "full-stack developer",
    "portfolio",
    "Next.js",
    "Shiv Nadar University",
  ],
  authors: [{ name: PAPER.publisher, url: PAPER.github }],
  openGraph: {
    title: "Shaurya Jain: all the code that's fit to ship",
    description:
      "Four shipped web applications, typeset as a newspaper.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaurya Jain: all the code that's fit to ship",
    description: "Four shipped web applications, typeset as a newspaper.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PAPER.publisher,
  email: `mailto:${PAPER.email}`,
  url: PAPER.github,
  jobTitle: "Full-stack developer",
  affiliation: { "@type": "CollegeOrUniversity", name: PAPER.university },
};

/* Sets the Late Edition class before first paint so the paper never flashes. */
const editionScript = `(function(){try{var e=localStorage.getItem("edition");if(e==="late"||(!e&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("late")}catch(_){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: editionScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* The entrance animations start hidden and are released by an
            observer. With no JavaScript there is no observer, so the paper
            prints flat rather than blank. */}
        <noscript>
          <style>{`.reveal,.rule-draw,.develop,.set-word{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${display.variable} ${serif.variable} ${mono.variable} grain font-serif`}
      >
        {children}
      </body>
    </html>
  );
}
