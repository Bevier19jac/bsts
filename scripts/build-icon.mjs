/**
 * Generates src/app/icon.svg from the canonical lockup source.
 *
 * The app icon is the same trademark lockup as everywhere else — the approved
 * red-and-white BSTS lettering with both cyan corners. No compact alternate,
 * no circle, no badge, no standalone symbol: the previous icon was the retired
 * two-arc-and-gold-dot monogram, and it outlived the mark it belonged to.
 *
 * The lockup is 3.09:1, so a square icon pads it vertically on the brand
 * ground rather than cropping it — cropping would cut a cyan corner, which is
 * the one thing the mark may never do.
 *
 * Run: node scripts/build-icon.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const L = JSON.parse(readFileSync(resolve(ROOT, "src/components/brand/bsts-lockup.json"), "utf8"));

const [vx, vy, vw, vh] = L.viewBox.split(" ").map(Number);
const SIZE = 512;
const PAD = 0.10;                       // breathing room on the long axis
const scale = (SIZE * (1 - PAD * 2)) / vw;
const w = vw * scale;
const h = vh * scale;
const tx = (SIZE - w) / 2 - vx * scale;
const ty = (SIZE - h) / 2 - vy * scale;

const glyphs = L.letters
  .map((id, i) => {
    const layers = L.glyphs[id]
      .map((p) => `<path d="${p.d}" fill="${p.fill}"/>`)
      .join("");
    return `<g transform="translate(${L.letterX[i]},0)">${layers}</g>`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${Math.round(SIZE * 0.195)}" fill="#0b0e13"/>
  <g transform="translate(${tx.toFixed(3)},${ty.toFixed(3)}) scale(${scale.toFixed(6)})">
    ${glyphs}
    <path d="${L.corners.lowerLeft}" fill="${L.colors.cyan}"/>
    <path d="${L.corners.upperRight}" fill="${L.colors.cyan}"/>
  </g>
</svg>
`;

writeFileSync(resolve(ROOT, "src/app/icon.svg"), svg);
console.log("wrote src/app/icon.svg from the canonical lockup");
