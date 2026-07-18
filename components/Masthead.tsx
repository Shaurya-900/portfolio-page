import EditionToggle from "./EditionToggle";
import Reveal from "./Reveal";
import { PAPER, editionNumber } from "@/lib/content";

function romanVolume(now: Date): string {
  const years = Math.floor(
    (now.getTime() - new Date(PAPER.foundedISO).getTime()) / (365.25 * 86_400_000)
  );
  const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  return numerals[Math.min(Math.max(years, 0), numerals.length - 1)];
}

const INDEX = [
  { label: "The Wire", page: "p. 1", href: "#wire" },
  { label: "Reporting", page: "p. 2", href: "#reporting" },
  { label: "Markets", page: "p. 3", href: "#markets" },
  { label: "The Editor", page: "p. 4", href: "#editor" },
  { label: "Classifieds", page: "p. 4", href: "#classifieds" },
];

export default function Masthead({ now }: { now: Date }) {
  const dateline = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header>
      {/* Hairline top row */}
      <Reveal>
      <div className="dept flex items-center justify-between gap-4 border-b border-ink/60 py-2 text-soft">
        <span className="hidden sm:inline">{dateline}</span>
        <span className="sm:hidden">{now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        <span className="hidden md:inline">The collected works of {PAPER.publisher}</span>
        <EditionToggle />
      </div>
      </Reveal>

      {/* Ears + nameplate */}
      <Reveal delay={0.08}>
      <div className="grid grid-cols-1 items-center gap-4 py-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:py-8">
        <div className="dept hidden border border-ink/40 p-3 leading-relaxed text-soft sm:block">
          <span className="text-ink">The Weather</span>
          <br />
          {PAPER.place}.
          <br />
          Ships in all conditions.
        </div>

        <h1 className="text-center font-display text-[13.5vw] font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-[5.6rem]">
          The Daily Build
        </h1>

        <div className="dept hidden border border-ink/40 p-3 text-right leading-relaxed text-soft sm:block">
          <span className="text-ink">The Price</span>
          <br />
          One email. ₹0.
          <br />
          Late edition nightly.
        </div>
      </div>
      </Reveal>

      {/* Folio line */}
      <Reveal delay={0.16}>
      <div className="double-rule" aria-hidden="true" />
      <div className="dept flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-soft">
        <span>
          Vol. {romanVolume(now)} · No. {editionNumber(now)}
        </span>
        <span className="font-serif text-sm normal-case italic tracking-normal text-ink">
          “{PAPER.motto}”
        </span>
        <span>
          Editor, Publisher &amp; Sole Reporter: <span className="text-ink">{PAPER.publisher}</span>
        </span>
      </div>
      <div className="double-rule-flip" aria-hidden="true" />
      </Reveal>

      {/* Inside index — the paper's navigation */}
      <Reveal delay={0.24}>
      <nav aria-label="Sections" className="border-b border-ink/60">
        <ul className="dept flex flex-wrap items-center justify-center gap-x-7 gap-y-1 py-2.5">
          {INDEX.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="group text-ink">
                <span className="proof">{item.label}</span>
                <span className="ml-1.5 text-soft">{item.page}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      </Reveal>
    </header>
  );
}
