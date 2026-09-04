import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { EDITOR_NOTE, PAPER } from "@/lib/content";

/** The back page: a short note, and one very large way to get in touch. */
export default function Contact() {
  return (
    <section aria-label="Contact">
      <SectionHead id="contact" title="Contact" note="Correspondence welcomed" />

      <div className="grid gap-10 pt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="dept text-accent">From the Editor</p>
          <p className="copy dropcap mt-4 font-serif text-[16px] leading-[1.75]">{EDITOR_NOTE}</p>
          <p className="mt-4 font-serif text-xl italic">Shaurya</p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <a
            href={`mailto:${PAPER.email}`}
            className="block border-2 border-ink bg-ink p-6 text-paper transition-colors hover:bg-accent sm:p-8"
          >
            <span className="dept opacity-80">Letters to the Editor</span>
            <span className="mt-2 block break-all font-display text-[19px] font-black tracking-tight sm:text-3xl lg:text-4xl">
              {PAPER.email}
            </span>
            <span className="dept mt-3 block opacity-80">We answer our mail →</span>
          </a>
          <div className="dept mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule/60 pt-3 text-soft">
            <span>Available for freelance work · {PAPER.place}</span>
            <a href={PAPER.github} target="_blank" rel="noopener noreferrer" className="text-ink">
              <span className="proof">github.com/{PAPER.githubUser}</span>{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
