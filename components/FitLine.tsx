/**
 * A line of display type set to the exact width of its container.
 *
 * SVG does the fitting: the viewBox scales to 100% width and `textLength`
 * pins the line to the full 1000-unit box, so the nameplate fills the page
 * at every size without media queries — or a flash while the font loads.
 */
export default function FitLine({
  text,
  height = 96,
  fontSize = 108,
  className,
}: {
  text: string;
  /** viewBox height; raise it if the face has deep descenders. */
  height?: number;
  /** Set below the natural width so `textLength` tracks out, never crushes. */
  fontSize?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 1000 ${height}`}
      className={`block w-full ${className ?? ""}`}
      role="img"
      aria-label={text}
    >
      <text
        x="0"
        y={height - 12}
        textLength="1000"
        lengthAdjust="spacing"
        fill="currentColor"
        fontSize={fontSize}
        style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
      >
        {text}
      </text>
    </svg>
  );
}
