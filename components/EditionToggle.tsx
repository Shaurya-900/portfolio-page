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
      className="dept border border-ink/40 px-2.5 py-1.5 transition-colors hover:border-accent hover:text-accent"
      title={late ? "Switch to the Morning Edition" : "Switch to the Late Edition"}
    >
      {/* Render both labels until mounted state is known to avoid hydration drift */}
      {late === null ? "Late Edition" : late ? "Morning Edition" : "Late Edition"}
    </button>
  );
}
