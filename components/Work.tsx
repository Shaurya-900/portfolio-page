import Headline from "./Headline";
import PressPhoto from "./PressPhoto";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { PROJECTS } from "@/lib/content";

/** The work, four to a page. Photograph, headline, one short story. */
export default function Work() {
  return (
    <section aria-label="The work">
      <SectionHead id="work" title="The Work" note="Four shipped · every one deployed and running" />

      <div className="grid gap-x-10 gap-y-14 pt-10 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={(i % 2) * 0.08}
            className={i % 2 === 0 ? "md:border-r md:border-rule/60 md:pr-10" : undefined}
          >
            <article aria-labelledby={`work-${p.slug}`}>
              <PressPhoto
                src={p.photo.src}
                alt={`${p.headline} — press photograph`}
                caption={p.photo.caption}
              />

              <p className="dept mt-5 text-accent">{p.kicker}</p>
              <Headline
                as="h3"
                id={`work-${p.slug}`}
                text={p.headline}
                className="mt-1.5 font-display text-[28px] font-black leading-[1.04] tracking-tight sm:text-[34px]"
              />
              <p className="copy mt-3 font-serif text-[15.5px] leading-[1.7]">{p.blurb}</p>

              <div className="dept mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule/60 pt-3 text-soft">
                <span>{p.stack.join(" · ")}</span>
                <span className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
                  {p.live && (
                    <a
                      href={p.live.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent"
                    >
                      <span className="proof">Visit</span> <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-ink">
                    <span className="proof">Source</span> <span aria-hidden="true">→</span>
                  </a>
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
