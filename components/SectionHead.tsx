import RuleDraw from "./RuleDraw";

/** Opens a section with a drawn rule and a small-caps department line. */
export default function SectionHead({
  id,
  title,
  note,
}: {
  id?: string;
  title: string;
  note: string;
}) {
  return (
    <div id={id} className="scroll-mt-6 pt-16">
      <RuleDraw />
      <div className="dept flex items-baseline justify-between gap-4 py-2">
        <h2 className="text-ink">{title}</h2>
        <p className="hidden text-soft sm:block">{note}</p>
      </div>
      <div className="border-t border-ink/60" aria-hidden="true" />
    </div>
  );
}
