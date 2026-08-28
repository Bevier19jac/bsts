/**
 * Generates the home-screen / PWA icons: the canonical BSTS lockup on the
 * site's obsidian ground. No tank.
 *
 * WHY NO TANK. These icons and the browser favicon (src/app/icon.svg) are the
 * company's *mark* — the thing that has to be recognisably BSTS at any size and
 * in any context. The owner's decision, 28 Aug 2026, is that the mark is the
 * wordmark alone, matching what is uploaded as the Google Business Profile logo
 * and the Google account avatar. One mark everywhere it identifies the company.
 *
 * The tank is not retired. It stays where it is art rather than identity:
 * public/og.png, the share card, which renders at 1200x630 where a detailed
 * composition works and where nothing is trying to recognise a logo.
 *
 * Consistency here is not cosmetic. Google builds an entity from matching
 * signals across the site, the Business Profile and directory listings; a
 * different logo in the structured data than on the profile is exactly the kind
 * of disagreement that leaves an entity unresolved.
 *
 * The lockup is built from src/components/brand/bsts-lockup.json, the same
 * single source every other placement reads, unaltered.
 *
 * SAFE AREA — why the maskable variant is smaller.
 *
 * Android maskable icons may be cropped to any shape inside a circle whose
 * diameter is 80% of the canvas. The limiting case is the corner of the
 * composed content box: for a centred box W wide and H tall it must satisfy
 *
 *     hypot(W/2, H/2) <= 0.4 * canvas
 *
 * The standard icons are only rounded, never mask-cropped, so they carry a
 * larger composition. Both are checked numerically at the end of this script.
 *
 * Run: node scripts/build-app-icons.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BG = "#0b0e13";

// The canonical lockup, from the same JSON the site renders.
const L = JSON.parse(
  readFileSync(resolve(ROOT, "src/components/brand/bsts-lockup.json"), "utf8"),
);
const lockupSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${L.viewBox}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block">
  <defs>${Object.entries(L.glyphs)
    .map(
      ([id, layers]) =>
        `<symbol id="g-${id}" overflow="visible">${layers
          .map((p) => `<path d="${p.d}" fill="${p.fill}"/>`)
          .join("")}</symbol>`,
    )
    .join("")}</defs>
  ${L.letters.map((id, i) => `<use href="#g-${id}" x="${L.letterX[i]}"/>`).join("")}
  <path d="${L.corners.lowerLeft}" fill="${L.colors.cyan}"/>
  <path d="${L.corners.upperRight}" fill="${L.colors.cyan}"/>
</svg>`;

/**
 * file, canvas, lockup width fraction.
 * The maskable variant is deliberately tighter — see SAFE AREA above.
 */
const ICONS = [
  { file: "apple-touch-icon.png", size: 180, lock: 0.78 },
  { file: "icon-192.png", size: 192, lock: 0.78 },
  { file: "icon-512.png", size: 512, lock: 0.78 },
  { file: "icon-maskable-512.png", size: 512, lock: 0.7 },
];

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

for (const { file, size, lock } of ICONS) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<!doctype html><html><body style="margin:0">
      <div style="width:${size}px;height:${size}px;background:${BG};display:flex;
                  align-items:center;justify-content:center;overflow:hidden">
        <div style="width:${(lock * 100).toFixed(4)}%">${lockupSvg}</div>
      </div>
    </body></html>`,
    { waitUntil: "load" },
  );
  await page.waitForTimeout(260);
  await page.screenshot({ path: resolve(ROOT, "public", file) });

  // Numeric safe-area report for every icon.
  const contentW = lock * size;
  const contentH = contentW / L.aspect;
  const corner = Math.hypot(contentW / 2, contentH / 2);
  const safeR = 0.4 * size;
  const verdict = file.includes("maskable")
    ? corner <= safeR
      ? `INSIDE safe circle (${corner.toFixed(1)} <= ${safeR.toFixed(1)})`
      : `OUTSIDE safe circle (${corner.toFixed(1)} > ${safeR.toFixed(1)})`
    : "not mask-cropped";
  console.log(
    `wrote public/${file.padEnd(24)} ${size}x${size}  content ${contentW.toFixed(0)}x${contentH.toFixed(0)}  ${verdict}`,
  );
  await page.close();
}

await browser.close();
