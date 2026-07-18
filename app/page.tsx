import Masthead from "@/components/Masthead";
import WireTicker from "@/components/WireTicker";
import PressLoader from "@/components/PressLoader";
import LeadStory from "@/components/LeadStory";
import Reporting from "@/components/Reporting";
import Markets from "@/components/Markets";
import BackPage from "@/components/BackPage";
import Colophon from "@/components/Colophon";
import { editionNumber } from "@/lib/content";

/* Re-print the edition every hour so the dateline stays current. */
export const revalidate = 3600;

export default function FrontPage() {
  const now = new Date();

  return (
    <>
      <PressLoader edition={editionNumber(now)} />
      <a
        href="#wire"
        className="dept sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to the front page
      </a>

      <div id="top" className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-8 sm:pt-6">
        <Masthead now={now} />
      </div>

      <WireTicker />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <LeadStory />
        <Reporting />
        <Markets />
        <BackPage />
        <Colophon year={now.getFullYear()} />
      </main>
    </>
  );
}
