import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PAPER, DECK } from "@/lib/content";

/**
 * The share card: the paper's own front page, so a pasted link arrives
 * looking like a newspaper rather than a URL. Generated once at build.
 */
export const alt = `${PAPER.name} — ${PAPER.publisher}, full-stack developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER_RGB = "rgb(244, 239, 228)";
const INK = "rgb(26, 22, 16)";
const SOFT = "rgb(94, 86, 74)";
const ACCENT = "rgb(158, 42, 26)";

const font = (name: string) => readFile(join(process.cwd(), "app/fonts", name));

export default async function OpengraphImage() {
  const [playfair900, playfair400, mono] = await Promise.all([
    font("playfair-900.ttf"),
    font("playfair-400.ttf"),
    font("plexmono-400.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER_RGB,
          color: INK,
          padding: "48px 56px",
          fontFamily: "Mono",
        }}
      >
        {/* Folio line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 19,
            letterSpacing: 4,
            color: SOFT,
            borderBottom: `1px solid ${INK}`,
            paddingBottom: 14,
          }}
        >
          <span>{PAPER.name.toUpperCase()}</span>
          <span>{PAPER.place.toUpperCase()}</span>
        </div>

        {/* Nameplate */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 19, letterSpacing: 6, color: SOFT }}>
            {PAPER.motto.toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: "Display",
              fontWeight: 900,
              fontSize: 148,
              lineHeight: 1,
              letterSpacing: -2,
              marginTop: 14,
            }}
          >
            {PAPER.publisher.toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: "Serif",
              fontSize: 27,
              lineHeight: 1.45,
              color: SOFT,
              textAlign: "center",
              maxWidth: 880,
              marginTop: 22,
            }}
          >
            {DECK}
          </div>
        </div>

        {/* Closing double rule and the standing line */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* The broadsheet double rule, drawn as bars: the renderer has no
              `double` border style. */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ height: 3, background: INK }} />
            <div style={{ height: 3 }} />
            <div style={{ height: 1, background: INK }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 19,
              letterSpacing: 4,
              color: SOFT,
              paddingTop: 16,
            }}
          >
            <span>FOUR SHIPPED · EVERY ONE DEPLOYED AND RUNNING</span>
            <span style={{ color: ACCENT }}>GITHUB.COM/{PAPER.githubUser.toUpperCase()}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Display", data: playfair900, weight: 900, style: "normal" },
        { name: "Serif", data: playfair400, weight: 400, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}
