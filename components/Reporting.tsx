import Reveal from "./Reveal";
import Headline from "./Headline";
import RuleDraw from "./RuleDraw";
import PressPhoto from "./PressPhoto";
import { STORIES } from "@/lib/content";

function SectionHead({ id, title, note }: { id?: string; title: string; note: string }) {
  return (
    <div id={id} className="scroll-mt-6 pt-14">
      <RuleDraw />
      <div className="dept flex items-baseline justify-between gap-4 py-2">
        <h2 className="text-ink">{title}</h2>
        <p className="text-soft">{note}</p>
      </div>
      <div className="border-t border-ink/60" aria-hidden="true" />
    </div>
  );
}

/** Page 2: the other shipped works, typeset as proper articles. */
export default function Reporting() {
  return (
    <section aria-label="More reporting">
      <SectionHead id="reporting" title="More From the Newsroom" note="Page 2 · all stories deployed and running" />

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-0">
        {STORIES.map((story, i) => (
          <Reveal
            key={story.slug}
            delay={i * 0.08}
            className={
              i === 0
                ? "md:border-r md:border-rule/60 md:pr-8"
                : "md:pl-8"
            }
          >
            <article aria-labelledby={`story-${story.slug}`}>
              <p className="dept text-accent">{story.kicker}</p>
              <Headline
                as="h3"
                id={`story-${story.slug}`}
                text={story.headline}
                className="mt-2 font-display text-3xl font-black leading-[1.02] tracking-tight sm:text-4xl"
              />

              {story.photo && (
                <PressPhoto
                  src={story.photo.src}
                  alt={`${story.headline} — press photograph`}
                  caption={story.photo.caption}
                />
              )}

              <div className="copy mt-5 space-y-4 font-serif text-[15.5px] leading-[1.72]">
                {story.body.map((para, j) => (
                  <p key={j} className={j === 0 ? "dropcap" : undefined}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="dept mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule/60 pt-3 text-soft">
                <span>
                  Filed under{" "}
                  {story.filedUnder.map((t, j) => (
                    <span key={t} className="text-ink">
                      {t}
                      {j < story.filedUnder.length - 1 ? <span className="text-soft"> · </span> : ""}
                    </span>
                  ))}
                </span>
                <a
                  href={story.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-ink"
                >
                  <span className="proof">{story.demoLabel}</span> <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="dept mt-2 flex items-center gap-2 text-soft">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {story.status}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export { SectionHead };
