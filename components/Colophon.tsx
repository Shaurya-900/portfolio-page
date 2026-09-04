import { PAPER } from "@/lib/content";

export default function Colophon({ year }: { year: number }) {
  return (
    <footer className="dept mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t-2 border-ink py-5 text-soft">
      <p>
        © {year} {PAPER.publisher} · Set in Playfair and Newsreader · Built with Next.js
      </p>
      <a href="#top" className="text-ink">
        <span className="proof">Back to the front page</span> ↑
      </a>
    </footer>
  );
}
