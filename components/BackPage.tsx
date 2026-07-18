import Reveal from "./Reveal";
import { SectionHead } from "./Reporting";
import { CLASSIFIEDS, CORRECTION, EDITOR_LETTER, PAPER } from "@/lib/content";

/** Page 4: the editor's letter, the classifieds, and the corrections box. */
export default function BackPage() {
  return (
    <section aria-label="The editor and classifieds">
      <SectionHead id="editor" title="The Back Page" note="Page 4 · correspondence welcomed" />

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* Editor's letter */}
        <Reveal className="lg:col-span-7 lg:border-r lg:border-rule/60 lg:pr-10">
          <p className="dept text-accent">{EDITOR_LETTER.heading}</p>
          <div className="copy mt-4 space-y-4 font-serif text-[16px] leading-[1.75]">
            {EDITOR_LETTER.paragraphs.map((para, i) => (
              <p key={i} className={i === 0 ? "dropcap" : undefined}>
                {para}
              </p>
            ))}
          </div>
          <p className="mt-5 font-display text-xl font-semibold italic">{EDITOR_LETTER.signoff}</p>
          <p className="mt-6 text-center text-2xl text-rule" aria-hidden="true">
            ❦
          </p>
        </Reveal>

        {/* Classifieds + corrections */}
        <div id="classifieds" className="scroll-mt-6 lg:col-span-5">
          <Reveal>
            <p className="dept text-accent">Classified Advertisements</p>
            <div className="mt-4 grid gap-px border border-ink/60 bg-rule/60 sm:grid-cols-2">
              {CLASSIFIEDS.map((ad) => (
                <div key={ad.heading} className="bg-paper p-4">
                  <p className="dept text-ink">{ad.heading}</p>
                  <p className="mt-2 font-serif text-[13.5px] leading-relaxed text-soft">
                    {ad.body}
                    {ad.link && (
                      <>
                        {" "}
                        <a
                          href={ad.link.href}
                          {...(ad.link.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="proof font-mono text-[12px] font-medium text-ink"
                        >
                          {ad.link.label}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-6">
            <div className="border-y-2 border-ink py-3">
              <p className="dept text-ink">{CORRECTION.heading}</p>
              <p className="mt-1.5 font-serif text-[13.5px] italic leading-relaxed text-soft">
                {CORRECTION.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-6">
            <a
              href={`mailto:${PAPER.email}`}
              className="block border-2 border-ink bg-ink p-5 text-paper transition-colors hover:bg-accent hover:text-paper"
            >
              <span className="dept">Letters to the Editor</span>
              <span className="mt-1 block font-display text-2xl font-black tracking-tight">
                {PAPER.email}
              </span>
              <span className="dept mt-2 block opacity-80">We answer our mail →</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
