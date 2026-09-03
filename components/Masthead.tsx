import EditionToggle from "./EditionToggle";
import FitLine from "./FitLine";
import Reveal from "./Reveal";
import { DECK, INDEX, PAPER, editionNumber } from "@/lib/content";

/** The nameplate. The publisher is the hero; the paper is the frame. */
export default function Masthead({ now }: { now: Date }) {
  const dateline = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const short = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header>
      <div className="dept flex items-center justify-between gap-4 border-b border-ink/60 py-2 text-soft">
        <span className="hidden sm:inline">{dateline}</span>
        <span className="sm:hidden">{short}</span>
        <span className="hidden md:inline">No. {editionNumber(now)}</span>
        <EditionToggle />
      </div>

      <Reveal className="pt-8 sm:pt-10">
        <p className="dept text-center text-soft">
          {PAPER.name} · {PAPER.motto}
        </p>
        <FitLine text="SHAURYA JAIN" className="mt-3 text-ink" />
        <p className="mx-auto mt-5 max-w-2xl text-center font-serif text-[17px] italic leading-relaxed text-soft sm:text-xl">
          {DECK}
        </p>
      </Reveal>

      <Reveal delay={0.12} className="mt-8">
        <div className="double-rule" aria-hidden="true" />
        <nav aria-label="Sections">
          <ul className="dept flex flex-wrap items-center justify-center gap-x-7 gap-y-1 py-2.5">
            {INDEX.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink">
                  <span className="proof">{item.label}</span>
                </a>
              </li>
            ))}
            <li aria-hidden="true" className="hidden text-rule sm:block">
              ·
            </li>
            <li>
              <a href={`mailto:${PAPER.email}`} className="text-accent">
                <span className="proof">Email</span>
              </a>
            </li>
            <li>
              <a
                href={PAPER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink"
              >
                <span className="proof">GitHub</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="double-rule-flip" aria-hidden="true" />
      </Reveal>
    </header>
  );
}
