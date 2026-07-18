import Reveal from "./Reveal";
import WireDesk from "./WireDesk";
import Headline from "./Headline";
import RuleDraw from "./RuleDraw";
import CountUp from "./CountUp";
import { LEAD, PIPELINE_STAGES } from "@/lib/content";

/** Front page, above the fold: the news aggregator as the lead story. */
export default function LeadStory() {
  return (
    <section id="wire" aria-labelledby="lead-headline" className="pt-8 sm:pt-10">
      <Reveal>
        <p className="dept text-accent">{LEAD.kicker}</p>
        <Headline
          as="h2"
          id="lead-headline"
          text={LEAD.headline}
          className="mt-2 max-w-5xl font-display text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
        />
        <p className="mt-4 max-w-3xl font-serif text-lg italic leading-relaxed text-soft sm:text-xl">
          {LEAD.deck}
        </p>
        <div className="dept mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-ink/60 py-2 text-soft">
          <span className="text-ink">{LEAD.byline}</span>
          <span aria-hidden="true">·</span>
          <span>{LEAD.dateline}</span>
          <span className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={LEAD.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              <span className="proof">Read the live Gazette</span> <span aria-hidden="true">↗</span>
            </a>
            <a href={LEAD.repo} target="_blank" rel="noopener noreferrer" className="text-ink">
              <span className="proof">The source</span> <span aria-hidden="true">→</span>
            </a>
          </span>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* Article copy */}
        <Reveal className="lg:col-span-5">
          <div className="copy space-y-4 font-serif text-[15.5px] leading-[1.72]">
            {LEAD.body.map((para, i) => (
              <p key={i} className={i === 0 ? "dropcap" : undefined}>
                {para}
              </p>
            ))}
          </div>
          <p className="dept mt-6 text-soft">
            Filed under{" "}
            {LEAD.stack.map((s, i) => (
              <span key={s} className="text-ink">
                {s}
                {i < LEAD.stack.length - 1 ? <span className="text-soft"> · </span> : ""}
              </span>
            ))}
          </p>
        </Reveal>

        {/* The demonstration */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <WireDesk />
          <p className="mt-2 font-serif text-[13px] italic text-soft">
            Above: six items of raw agency copy pass through the Gazette’s actual pipeline —
            gated, cleaned, classified and, where necessary, spiked.
          </p>
        </Reveal>
      </div>

      {/* Anatomy of the machine */}
      <Reveal className="mt-12">
        <RuleDraw />
        <h3 className="dept py-2 text-center">Anatomy of the Machine</h3>
        <div className="grid border-y border-ink/60 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE_STAGES.map((stage, i) => (
            <div
              key={stage.name}
              className="border-b border-rule/60 p-4 last:border-b-0 sm:border-b-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-l-rule/60"
            >
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-lg font-bold">{stage.name}</p>
              <p className="mt-1.5 font-serif text-[13.5px] leading-relaxed text-soft">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* By the numbers */}
      <Reveal className="mt-8">
        <div className="grid grid-cols-2 gap-px border border-ink/60 bg-rule/60 sm:grid-cols-3 lg:grid-cols-6">
          {LEAD.numbers.map((n) => (
            <div key={n.label} className="bg-paper p-4">
              <CountUp value={n.value} className="font-display text-3xl font-black text-accent" />
              <p className="mt-1 font-serif text-[13px] leading-snug text-soft">{n.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
