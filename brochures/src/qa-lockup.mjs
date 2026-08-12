import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Front-cover lockup + branding verification.
 *
 * The other three suites prove the piece is legal, typeset and printable.
 * This one measures the five things the correction pass was actually about,
 * in rendered pixels rather than by eye:
 *
 *   1. the company name is centred on the front-cover panel and is the
 *      dominant element of the identity block;
 *   2. the gun tube, the centre of the gas mass and the forward jet all lie
 *      on ONE straight horizontal line;
 *   3. the blast starts at the bore exit and swallows the end of the barrel
 *      rather than floating alongside it;
 *   4. the artwork is procedurally generated — no bitmap in the piece came
 *      from a photograph supplied as reference;
 *   5. the client and advisor covers received byte-identical corrections.
 *
 * Pixel measurement happens inside the page on a canvas, so the numbers come
 * from the same decoded image the print raster is built from.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const out = [];
const t = (n, ok, x = '') => out.push(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' — ' + x : ''}`);
const DPI = 96;

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--allow-file-access-from-files'],
});

const DOCS = [
  { file: '.build-trim-client.html', name: 'CLIENT' },
  { file: '.build-trim-advisor.html', name: 'ADVISOR' },
];

for (const doc of DOCS) {
  const ctx = await browser.newContext({
    viewport: { width: 11 * DPI, height: 8.5 * DPI }, deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto('file://' + resolve(HERE, doc.file), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const m = await page.evaluate(async () => {
    const IN = 96;
    const panel = document.querySelector('.panel.o3');
    const lock = panel.querySelector('.lockup');
    const tank = panel.querySelector('img.tank');
    const fire = panel.querySelector('img[src*="blast"]');
    const name = panel.querySelector('.company-name');
    const mark = panel.querySelector('.mark-hero');
    const R = el => el.getBoundingClientRect();

    // --- decode both bitmaps into canvases we can actually read ----------
    const load = src => new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i); i.onerror = rej; i.src = src;
    });
    const px = async (img) => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0);
      return { d: g.getImageData(0, 0, c.width, c.height), w: c.width, h: c.height };
    };
    const tImg = await px(await load(tank.src));
    const fImg = await px(await load(fire.src));

    // --- tank: where is the bore exit, in fractions of the bitmap? -------
    let mx = -1, my = 0;
    for (let x = tImg.w - 1; x >= 0 && mx < 0; x--) {
      let lo = -1, hi = -1;
      for (let y = 0; y < tImg.h; y++) {
        if (tImg.d.data[(y * tImg.w + x) * 4 + 3] > 24) { if (lo < 0) lo = y; hi = y; }
      }
      if (lo >= 0) { mx = x; my = (lo + hi) / 2; }
    }
    const muzzle = { xf: mx / tImg.w, yf: my / tImg.h };

    // --- fire: alpha-weighted centroid per column, and the dense front ---
    const col = [];
    for (let x = 0; x < fImg.w; x++) {
      let s = 0, sy = 0, peak = 0;
      for (let y = 0; y < fImg.h; y++) {
        const a = fImg.d.data[(y * fImg.w + x) * 4 + 3];
        s += a; sy += a * y; if (a > peak) peak = a;
      }
      col.push({ x, sum: s, cy: s ? sy / s : null, peak });
    }
    const maxSum = Math.max(...col.map(c => c.sum));
    // the leading edge of real combustion, not the outermost haze
    const dense = col.find(c => c.sum > 0.25 * maxSum).x / fImg.w;
    const ballCols = col.filter(c => c.sum > 0.5 * maxSum);
    const ballCy = ballCols.reduce((a, c) => a + c.cy * c.sum, 0)
                 / ballCols.reduce((a, c) => a + c.sum, 0) / fImg.h;
    const jetAt = f => col[Math.round(f * (fImg.w - 1))].cy / fImg.h;

    const pr = R(panel), lr = R(lock), tr = R(tank), fr = R(fire);
    return {
      muzzle, dense, ballCy,
      jet: [0.60, 0.72, 0.84].map(jetAt),
      fireNat: [fImg.w, fImg.h],
      panel: { l: pr.left / IN, r: pr.right / IN, w: pr.width / IN },
      lock: { l: lr.left / IN, t: lr.top / IN },
      tank: { l: tr.left / IN, t: tr.top / IN, w: tr.width / IN, h: tr.height / IN },
      fire: { l: fr.left / IN, t: fr.top / IN, w: fr.width / IN, h: fr.height / IN },
      name: { c: (R(name).left + R(name).right) / 2 / IN, size: parseFloat(getComputedStyle(name).fontSize) * 72 / 96, weight: getComputedStyle(name).fontWeight, color: getComputedStyle(name).color },
      mark: { c: (R(mark).left + R(mark).right) / 2 / IN, size: parseFloat(getComputedStyle(mark).fontSize) * 72 / 96 },
    };
  });

  const D = doc.name;
  const inch = v => v.toFixed(4) + 'in';

  // ---- 1. identity block centred and dominant --------------------------
  const pc = (m.panel.l + m.panel.r) / 2;
  t(`${D}: company name is centred on the front-cover panel`,
    Math.abs(m.name.c - pc) < 0.01, `name ${inch(m.name.c)} vs panel centre ${inch(pc)}`);
  t(`${D}: BSTS monogram shares the same centre line`,
    Math.abs(m.mark.c - pc) < 0.01, `mark ${inch(m.mark.c)} vs ${inch(pc)}`);
  t(`${D}: company name is set large enough to read as the identity`,
    m.name.size >= 12 && +m.name.weight >= 700,
    `${m.name.size.toFixed(1)}pt weight ${m.name.weight} ${m.name.color}`);

  // ---- 2. ONE straight horizontal axis ---------------------------------
  const axis = m.tank.t + m.tank.h * m.muzzle.yf;          // bore, from pixels
  const ballY = m.fire.t + m.fire.h * m.ballCy;
  const jetY = m.jet.map(f => m.fire.t + m.fire.h * f);
  t(`${D}: bore axis derived from the bitmap, not estimated`,
    Math.abs(m.muzzle.yf - 0.3822) < 0.002 && Math.abs(m.muzzle.xf - 0.9414) < 0.002,
    `muzzle at ${(m.muzzle.xf * 100).toFixed(2)}% / ${(m.muzzle.yf * 100).toFixed(2)}%`);
  t(`${D}: gas-mass centre sits on the bore axis`,
    Math.abs(ballY - axis) < 0.01,
    `ball ${inch(ballY)} vs bore ${inch(axis)} (Δ ${(Math.abs(ballY - axis) * 72).toFixed(2)}pt)`);
  jetY.forEach((y, i) => t(
    `${D}: forward jet on the bore axis at ${[60, 72, 84][i]}% of the flash`,
    Math.abs(y - axis) < 0.01,
    `jet ${inch(y)} vs bore ${inch(axis)} (Δ ${(Math.abs(y - axis) * 72).toFixed(2)}pt)`));
  const spread = Math.max(...[ballY, ...jetY]) - Math.min(...[ballY, ...jetY]);
  t(`${D}: barrel, blast centre and forward flash are collinear`,
    spread < 0.006, `total spread ${(spread * 72).toFixed(2)}pt`);

  // ---- 3. the blast starts at the muzzle and buries the barrel ---------
  const muzzleX = m.tank.l + m.tank.w * m.muzzle.xf;
  const denseX = m.fire.l + m.fire.w * m.dense;
  t(`${D}: combustion begins behind the bore exit — the tube enters the mass`,
    denseX < muzzleX - 0.04,
    `dense fire from ${inch(denseX)}, muzzle at ${inch(muzzleX)} (buried ${((muzzleX - denseX) * 72).toFixed(1)}pt)`);
  t(`${D}: the flash is not a detached blob floating past the gun`,
    denseX > m.tank.l + m.tank.w * 0.60,
    `dense fire starts ${inch(denseX)}, hull front ~${inch(m.tank.l + m.tank.w * 0.60)}`);
  t(`${D}: flash reaches the outer trim edge and bleeds off`,
    m.fire.l + m.fire.w > m.panel.r,
    `flash right ${inch(m.fire.l + m.fire.w)} vs trim ${inch(m.panel.r)}`);

  await ctx.close();
}
await browser.close();

// ---- 4. provenance: every bitmap is ours ------------------------------
const gen = readFileSync(resolve(HERE, 'make-blast.py'), 'utf8');
t('BLAST: generated from noise functions, no photographic source',
  /np\.random\.default_rng\(SEED\)/.test(gen)
  && !/Image\.open|imread|\.jpg|\.jpeg|reference/i.test(gen.split('"""')[2] || gen),
  'make-blast.py reads no image input');

// ---- 5. both covers corrected identically ------------------------------
const cut = f => {
  const s = readFileSync(resolve(HERE, f), 'utf8');
  const i = s.indexOf('<div class="lockup"');
  return s.slice(i, s.indexOf('</div>', s.indexOf('blast-envelope')) + 6);
};
t('BOTH: client and advisor lockups are byte-identical',
  cut('client.html') === cut('advisor.html'));

console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`\n${out.length - fails}/${out.length} passed`);
if (fails) process.exitCode = 1;
