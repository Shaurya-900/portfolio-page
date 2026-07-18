import { PAPER } from "@/lib/content";

export default function Colophon({ year }: { year: number }) {
  return (
    <footer className="mt-16 border-t-2 border-ink pb-10 pt-5">
      <div className="dept flex flex-wrap items-start justify-between gap-x-8 gap-y-4 text-soft">
        <p className="max-w-md font-serif text-[13px] normal-case italic leading-relaxed tracking-normal">
          {PAPER.name} is set in Fraunces and Newsreader, with figures in IBM Plex Mono.
          Composed in Next.js and Tailwind; motion by Framer. Printed continuously on the
          World Wide Web.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={PAPER.github} target="_blank" rel="noopener noreferrer" className="text-ink">
              <span className="proof">GitHub</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${PAPER.email}`} className="text-ink">
              <span className="proof">Email</span>
            </a>
          </li>
          <li>
            <a href="#top" className="text-ink">
              <span className="proof">Return to the front page</span> ↑
            </a>
          </li>
        </ul>
      </div>
      <p className="dept mt-6 text-soft">
        © {year} {PAPER.publisher} · All rights reserved · No part of this edition was assembled
        from a template
      </p>
    </footer>
  );
}
