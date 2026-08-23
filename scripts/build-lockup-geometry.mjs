/**
 * Derives the canonical BSTS trademark lockup's corner geometry and tight
 * viewBox, and writes them back into src/components/brand/bsts-lockup.json.
 *
 * Why this is a script and not hand-typed numbers: the two cyan corners are
 * specified proportionally, against the BSTS capital height, and they must
 * frame specific letters (lower-left frames the B, upper-right frames the
 * final S). Those anchors are measured from the approved glyph outlines in a
 * real renderer rather than assumed from font-unit constants — an earlier
 * hand-maintained viewBox (`0 0 5481.12 1528`) turned out not to fit the
 * artwork at all: the B's left edge sits at x = -95.98 and the S's overshoot
 * reaches y = 1546, so the box both clipped and mis-centred the mark.
 *
 * Run after any change to the approved glyph paths:
 *   node scripts/build-lockup-geometry.mjs && node scripts/build-og-src.mjs
 *
 * The corners are emitted as FILLED path outlines (not strokes) so they hold
 * their weight when the lockup is reduced to header size, and they live
 * inside the same SVG as the letters so the spacing between corners and
 * lettering can never drift between placements.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const JSON_PATH = resolve(ROOT, "src/components/brand/bsts-lockup.json");
const doc = JSON.parse(readFileSync(JSON_PATH, "utf8"));

// --- Approved proportions, as fractions of the BSTS capital height ---------
//
// These are MEASURED from the approved visual reference (the PNG signed off on
// 23 August 2026), not chosen. The reference was analysed by isolating its cyan
// pixels and its letter pixels and expressing every corner dimension against
// the capital height of its B:
//
//   cap height              230 px
//   horizontal arm          200 px  -> 86.96 %
//   vertical arm            148 px  -> 64.35 %
//   stroke thickness          8 px  ->  3.48 %
//   outer offset, x          ~28 px -> 12.20 %   (beyond the B / final S edge)
//   outer offset, y          ~32 px -> 13.90 %
//
// The arms are deliberately unequal — wider than tall — which is what stops the
// pair reading as a box around a wide wordmark. An earlier written spec called
// for ~19 % arms; the approved artwork supersedes it.
//
// The PNG itself is a visual reference only. The letterforms below come from
// the approved vector outlines, never from the raster.
const ARM_H_PCT = 0.8696;
const ARM_V_PCT = 0.6435;
const THICK_PCT = 0.0348;
const OFF_X_PCT = 0.122;
const OFF_Y_PCT = 0.139;

const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

// --- Measure the approved artwork in a real renderer -----------------------
const symbols = Object.entries(doc.glyphs)
  .map(
    ([id, layers]) =>
      `<symbol id="g-${id}" overflow="visible">` +
      layers.map((p) => `<path d="${p.d}" fill="${p.fill}"/>`).join("") +
      `</symbol>`,
  )
  .join("");

const uses = doc.letters
  .map((id, i) => `<use id="u${i}" href="#g-${id}" x="${doc.letterX[i]}"/>`)
  .join("");

// Measured in a deliberately generous provisional box; the real one is the
// output of this script.
const PROV = { x: -1000, y: -1000, w: 8000, h: 4000 };
const PX_W = 4000;

const html = `<!doctype html><html><body style="margin:0">
<svg id="root" width="${PX_W}" viewBox="${PROV.x} ${PROV.y} ${PROV.w} ${PROV.h}">
<defs>${symbols}</defs>
<g id="grp">${uses}</g>
</svg></body></html>`;

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.setContent(html, { waitUntil: "networkidle" });

const measured = await page.evaluate(
  ({ PROV, count }) => {
    const root = document.getElementById("root");
    const rect = root.getBoundingClientRect();
    const scale = rect.width / PROV.w; // px per user unit
    const toU = (r) => ({
      left: (r.left - rect.left) / scale + PROV.x,
      top: (r.top - rect.top) / scale + PROV.y,
      right: (r.right - rect.left) / scale + PROV.x,
      bottom: (r.bottom - rect.top) / scale + PROV.y,
    });
    const out = { letters: [] };
    for (let i = 0; i < count; i++) {
      out.letters.push(toU(document.getElementById("u" + i).getBoundingClientRect()));
    }
    out.group = toU(document.getElementById("grp").getBoundingClientRect());
    return out;
  },
  { PROV, count: doc.letters.length },
);
await browser.close();

const r = (n) => Math.round(n * 100) / 100;
const first = measured.letters[0]; // the B
const last = measured.letters[measured.letters.length - 1]; // the final S
const grp = measured.group;

// Capital height: the flat-topped, flat-bottomed B. The round S overshoots
// past it and must not be used as the reference.
const CAP = first.bottom - first.top;

const armH = CAP * ARM_H_PCT;
const armV = CAP * ARM_V_PCT;
const th = CAP * THICK_PCT;
const offX = CAP * OFF_X_PCT;
const offY = CAP * OFF_Y_PCT;

// --- Lower-left corner: frames the B --------------------------------------
// Built from its OUTER corner point, which is where the reference measures
// cleanly. The L runs right along the bottom and up the left.
const llOx = first.left - offX;
const llOy = first.bottom + offY;
const llIx = llOx + th; // inner edge of the vertical arm
const llIy = llOy - th; // inner edge of the horizontal arm

const lowerLeft =
  `M${r(llOx)},${r(llOy - armV)}` +
  `L${r(llIx)},${r(llOy - armV)}` +
  `L${r(llIx)},${r(llIy)}` +
  `L${r(llOx + armH)},${r(llIy)}` +
  `L${r(llOx + armH)},${r(llOy)}` +
  `L${r(llOx)},${r(llOy)}Z`;

// --- Upper-right corner: frames the final S -------------------------------
const urOx = last.right + offX;
const urOy = last.top - offY;
const urIx = urOx - th;
const urIy = urOy + th;

const upperRight =
  `M${r(urOx)},${r(urOy + armV)}` +
  `L${r(urIx)},${r(urOy + armV)}` +
  `L${r(urIx)},${r(urIy)}` +
  `L${r(urOx - armH)},${r(urIy)}` +
  `L${r(urOx - armH)},${r(urOy)}` +
  `L${r(urOx)},${r(urOy)}Z`;

// --- Tight viewBox over letters + corners ---------------------------------
// Every corner extremity is included explicitly so neither cyan corner can be
// cropped by the viewBox at any size.
const minX = Math.min(grp.left, llOx, urOx - armH);
const maxX = Math.max(grp.right, urOx, llOx + armH);
const minY = Math.min(grp.top, urOy, llOy - armV);
const maxY = Math.max(grp.bottom, llOy, urOy + armV);
const vbW = maxX - minX;
const vbH = maxY - minY;

doc.geometry = {
  capHeight: r(CAP),
  armH: r(armH),
  armV: r(armV),
  thickness: r(th),
  offsetX: r(offX),
  offsetY: r(offY),
  pctOfCapHeight: {
    armH: ARM_H_PCT,
    armV: ARM_V_PCT,
    thickness: THICK_PCT,
    offsetX: OFF_X_PCT,
    offsetY: OFF_Y_PCT,
  },
  source: "measured from the approved visual reference, 23 August 2026",
  letterBounds: {
    b: { left: r(first.left), top: r(first.top), right: r(first.right), bottom: r(first.bottom) },
    finalS: { left: r(last.left), top: r(last.top), right: r(last.right), bottom: r(last.bottom) },
    all: { left: r(grp.left), top: r(grp.top), right: r(grp.right), bottom: r(grp.bottom) },
  },
};
doc.corners = { lowerLeft, upperRight };
doc.viewBox = `${r(minX)} ${r(minY)} ${r(vbW)} ${r(vbH)}`;
doc.aspect = Math.round((vbW / vbH) * 1e6) / 1e6;

writeFileSync(JSON_PATH, JSON.stringify(doc, null, 2) + "\n");

console.log("cap height        ", r(CAP));
console.log(
  `armH ${r(armH)} (${(ARM_H_PCT * 100).toFixed(2)}%)  armV ${r(armV)} (${(ARM_V_PCT * 100).toFixed(2)}%)  ` +
    `thickness ${r(th)} (${(THICK_PCT * 100).toFixed(2)}%)  offset ${r(offX)}/${r(offY)}`,
);
console.log("B      ", JSON.stringify(doc.geometry.letterBounds.b));
console.log("final S", JSON.stringify(doc.geometry.letterBounds.finalS));
console.log("viewBox", doc.viewBox, " aspect", doc.aspect);
console.log("wrote", JSON_PATH);
