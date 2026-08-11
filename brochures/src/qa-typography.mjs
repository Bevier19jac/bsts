import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Typographic and compositional QA.
 *
 * qa-brochures.mjs proves the piece is geometrically legal. This file asks
 * whether it actually looks designed: orphans, widows, dead vertical gaps,
 * ragged panel bottoms, inconsistent baselines, and text colliding with
 * artwork. These are the defects that make a layout read as cheap even when
 * every hard constraint passes.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const out = [];
const t = (n, ok, x = '') => out.push(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' — ' + x : ''}`);
const DPI = 96;

const DOCS = [
  { file: '.build-trim-client.html', name: 'CLIENT' },
  { file: '.build-trim-advisor.html', name: 'ADVISOR' },
];

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const doc of DOCS) {
  const ctx = await browser.newContext({
    viewport: { width: 11 * DPI, height: 8.5 * DPI }, deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto('file://' + resolve(HERE, doc.file), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  // ---- 1. Orphans: a multi-line block whose last line is one short word --
  const orphans = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('p, li, h2, h3').forEach(el => {
      const txt = el.textContent.trim();
      if (!txt || txt.split(/\s+/).length < 4) return;
      const r = document.createRange();
      r.selectNodeContents(el);
      const rects = [...r.getClientRects()].filter(q => q.width > 1 && q.height > 1);
      if (rects.length < 2) return;
      // group rects into visual lines by top coordinate
      const lines = [];
      for (const q of rects) {
        const hit = lines.find(L => Math.abs(L.top - q.top) < 2);
        if (hit) { hit.w += q.width; hit.right = Math.max(hit.right, q.right); }
        else lines.push({ top: q.top, w: q.width, left: q.left, right: q.right });
      }
      if (lines.length < 2) return;
      const last = lines[lines.length - 1];
      const typical = Math.max(...lines.slice(0, -1).map(L => L.w));
      // last line under 18% of the widest line = orphan
      if (last.w / typical < 0.18) {
        bad.push(`${el.className || el.tagName}: "…${txt.slice(-34)}"`);
      }
    });
    return bad;
  });
  t(`${doc.name}: no orphaned last lines`, orphans.length === 0, orphans.slice(0, 4).join(' | '));

  // ---- 2. Dead vertical gaps inside a panel -----------------------------
  const gaps = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('.panel').forEach(p => {
      const pr = p.getBoundingClientRect();
      const cs = getComputedStyle(p);
      const padB = parseFloat(cs.paddingBottom);
      // direct children only — these are the layout blocks
      const kids = [...p.children]
        .map(k => k.getBoundingClientRect())
        .filter(r => r.height > 2 && r.width > 2)
        .sort((a, b) => a.top - b.top);
      for (let i = 1; i < kids.length; i++) {
        const gap = (kids[i].top - kids[i - 1].bottom) / 96;
        if (gap > 0.62) {
          bad.push(`${p.className.trim()} gap ${gap.toFixed(2)}in`);
        }
      }
      // ragged bottom: content ending well above the content box
      if (kids.length) {
        const tail = (pr.bottom - padB - kids[kids.length - 1].bottom) / 96;
        if (tail > 0.55) bad.push(`${p.className.trim()} tail ${tail.toFixed(2)}in`);
      }
    });
    return bad;
  });
  t(`${doc.name}: no dead gaps or ragged panel bottoms`, gaps.length === 0, gaps.slice(0, 5).join(' | '));

  // ---- 3. Panel tops align across a face --------------------------------
  const tops = await page.evaluate(() =>
    [...document.querySelectorAll('.sheet')].map(s =>
      [...s.querySelectorAll('.panel')].map(p => {
        const pr = p.getBoundingClientRect();
        const first = [...p.children].map(k => k.getBoundingClientRect())
          .filter(r => r.height > 2)[0];
        return first ? +((first.top - pr.top) / 96).toFixed(3) : null;
      })));
  tops.forEach((face, i) => {
    const vals = face.filter(v => v !== null);
    const spread = Math.max(...vals) - Math.min(...vals);
    t(`${doc.name}/${i ? 'inside' : 'outside'}: panel content starts on a common line`,
      spread < 0.02, `spread ${spread.toFixed(3)}in [${vals.join(', ')}]`);
  });

  // ---- 4. Text never sits on top of artwork -----------------------------
  const collisions = await page.evaluate(() => {
    const bad = [];
    const art = [...document.querySelectorAll('img.tank, img[src*="blast"], img[src*="firing"]')]
      .map(i => i.getBoundingClientRect());
    document.querySelectorAll('p, li, h2, h3').forEach(el => {
      const txt = el.textContent.trim();
      if (!txt) return;
      if (getComputedStyle(el).opacity < 0.5) return;
      const r = el.getBoundingClientRect();
      if (r.height < 2) return;
      for (const a of art) {
        const ox = Math.min(r.right, a.right) - Math.max(r.left, a.left);
        const oy = Math.min(r.bottom, a.bottom) - Math.max(r.top, a.top);
        if (ox > 6 && oy > 6) bad.push(`"${txt.slice(0, 34)}" over artwork`);
      }
    });
    return [...new Set(bad)];
  });
  t(`${doc.name}: no text overlapping the tank or blast`, collisions.length === 0,
    collisions.slice(0, 3).join(' | '));

  // ---- 5. Heading hierarchy is consistent per face ----------------------
  const hier = await page.evaluate(() => {
    const sizes = {};
    document.querySelectorAll('.eyebrow').forEach(el => {
      const pt = (parseFloat(getComputedStyle(el).fontSize) * 72 / 96).toFixed(1);
      sizes[pt] = (sizes[pt] || 0) + 1;
    });
    return sizes;
  });
  t(`${doc.name}: eyebrows use one consistent size`, Object.keys(hier).length <= 2,
    JSON.stringify(hier));

  await ctx.close();
}

await browser.close();
console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`\n${out.length - fails}/${out.length} passed`);
if (fails) process.exitCode = 1;
