"use client";

import { useEffect, useState } from "react";

/**
 * Morning ↔ Late Edition switch. Dark mode framed in the paper's own
 * vocabulary: the same broadsheet, printed for the night desk.
 */
export default function EditionToggle() {
  const [late, setLate] = useState<boolean | null>(null);

  useEffect(() => {
    setLate(document.documentElement.classList.contains("late"));
  }, []);

  function toggle() {
    const next = !late;
    document.documentElement.classList.toggle("late", next);
    try {
      localStorage.setItem("edition", next ? "late" : "morning");
    } catch {
      /* private browsing — the edition simply won't persist */
    }
    setLate(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={late === true}
      className="dept edition-toggle border border-ink/40 px-2.5 py-1.5 transition-colors hover:border-accent hover:text-accent"
      title="Switch edition"
    >
      {/* CSS picks the label off the <html> class, which the inline script
          sets before first paint, so the button never prints the wrong
          edition while it waits to hydrate. */}
      <span className="dark:hidden">Late Edition</span>
      <span className="hidden dark:inline">Morning Edition</span>
    </button>
  );
}
