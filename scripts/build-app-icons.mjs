/**
 * Generates the home-screen / PWA icons: the canonical BSTS lockup above the
 * approved Abrams tank, on the site's obsidian ground.
 *
 * The browser favicon (src/app/icon.svg) is NOT touched by this script and
 * stays as approved. These are the "Add to Home Screen" icons only, which iOS
 * and Android render much larger.
 *
 * Both elements come from existing approved sources, unaltered:
 *
 *   - the tank is public/abrams-tank.webp, the same file the hero renders
 *   - the lockup is built from src/components/brand/bsts-lockup.json, the same
 *     single source every other placement reads
 *
 * The tank carries the two treatments IdentityLockup.tsx already applies to it
 * on screen — brightness(1.14)/contrast(1.04) and the radial mask. The mask is
 * load-bearing here: roughly a quarter of the bitmap's pixels are a
 * semi-transparent halo whose luminance sits above the page background, so
 * without feathering it reads as a grey smudge on a flat square rather than as
 * ambient light the way it does over the hero's atmospheric backdrop.
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

const tankData =
  "data:image/webp;base64," +
  readFileSync(resolve(ROOT, "public/abrams-tank.webp")).toString("base64");

const TANK_ASPECT = 1280 / 513;

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
 * file, canvas, lockup width fraction, tank width fraction, gap fraction
 * The maskable variant is deliberately tighter — see SAFE AREA above.
 */
const ICONS = [
  { file: "apple-touch-icon.png", size: 180, lock: 0.6, tank: 0.78, gap: 0.05 },
  { file: "icon-192.png", size: 192, lock: 0.6, tank: 0.78, gap: 0.05 },
  { file: "icon-512.png", size: 512, lock: 0.6, tank: 0.78, gap: 0.05 },
  { file: "icon-maskable-512.png", size: 512, lock: 0.46, tank: 0.6, gap: 0.045 },
];

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

for (const { file, size, lock, tank, gap } of ICONS) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<!doctype html><html><body style="margin:0">
      <div style="width:${size}px;height:${size}px;background:${BG};display:flex;flex-direction:column;
                  align-items:center;justify-content:center;gap:${(gap * size).toFixed(2)}px;overflow:hidden">
        <div style="width:${(lock * 100).toFixed(4)}%">${lockupSvg}</div>
        <img src="${tankData}"
             style="width:${(tank * 100).toFixed(4)}%;height:auto;display:block;
                    filter:brightness(1.14) contrast(1.04);
                    -webkit-mask-image:radial-gradient(ellipse 92% 88% at 50% 50%, black 58%, transparent 98%);
                    mask-image:radial-gradient(ellipse 92% 88% at 50% 50%, black 58%, transparent 98%)">
      </div>
    </body></html>`,
    { waitUntil: "load" },
  );
  await page.waitForTimeout(260);
  await page.screenshot({ path: resolve(ROOT, "public", file) });

  // Numeric safe-area report for every icon.
  const lockH = (lock * size) / L.aspect;
  const tankH = (tank * size) / TANK_ASPECT;
  const contentW = Math.max(lock, tank) * size;
  const contentH = lockH + gap * size + tankH;
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
