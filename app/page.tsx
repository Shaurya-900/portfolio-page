import Masthead from "@/components/Masthead";
import WireTicker from "@/components/WireTicker";
import Work from "@/components/Work";
import Markets from "@/components/Markets";
import Contact from "@/components/Contact";
import Colophon from "@/components/Colophon";

/* Re-print the edition every hour so the dateline stays current. */
export const revalidate = 3600;

export default function FrontPage() {
  const now = new Date();

  return (
    <>
      <a
        href="#work"
        className="dept sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to the work
      </a>

      <div id="top" className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-8 sm:pt-6">
        <Masthead now={now} />
      </div>

      <WireTicker />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <Work />
        <Markets />
        <Contact />
        <Colophon year={now.getFullYear()} />
      </main>
    </>
  );
}
