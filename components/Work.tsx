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

      <div className="gutter-rule grid gap-x-14 gap-y-16 pt-10 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className="flex">
            <article aria-labelledby={`work-${p.slug}`} className="flex w-full flex-col">
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
              <p className="copy mb-6 mt-3 font-serif text-[15.5px] leading-[1.7]">{p.blurb}</p>

              <div className="dept mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule/60 pt-3 text-soft">
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
