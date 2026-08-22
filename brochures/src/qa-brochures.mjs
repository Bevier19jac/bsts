import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const out = [];
const t = (n, ok, x = '') => out.push(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' — ' + x : ''}`);

const TRIM_W = 11.0, TRIM_H = 8.5, SAFE = 0.25;
const DPI = 96;
const inches = px => px / DPI;

// Fold x-positions in TRIM space, per face.
const FOLDS = {
  outside: [3.625, 7.3125],
  inside: [3.6875, 7.375],
};

const DOCS = [
  { file: '.build-trim-client.html', name: 'CLIENT' },
  { file: '.build-trim-advisor.html', name: 'ADVISOR' },
];

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const doc of DOCS) {
  const ctx = await browser.newContext({
    viewport: { width: TRIM_W * DPI, height: TRIM_H * DPI },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const failures = [];
  page.on('pageerror', e => failures.push(String(e)));
  page.on('requestfailed', r => failures.push(`asset failed: ${r.url()}`));
  await page.goto('file://' + resolve(HERE, doc.file), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  t(`${doc.name}: all assets loaded, no page errors`, failures.length === 0, failures[0]);

  // ---- 1. Sheet count & dimensions -------------------------------------
  const sheets = await page.evaluate(() =>
    [...document.querySelectorAll('.sheet')].map(s => {
      const r = s.getBoundingClientRect();
      return { w: r.width, h: r.height };
    }));
  t(`${doc.name}: exactly 2 sheets (outside + inside)`, sheets.length === 2, `got ${sheets.length}`);
  t(`${doc.name}: sheets are 11.000in x 8.500in at trim`,
    sheets.every(s => Math.abs(inches(s.w) - TRIM_W) < 0.002 && Math.abs(inches(s.h) - TRIM_H) < 0.002),
    sheets.map(s => `${inches(s.w).toFixed(3)}x${inches(s.h).toFixed(3)}`).join(' '));

  // ---- 2. Panel geometry: 6 panels, widths sum to trim width -----------
  const panels = await page.evaluate(() =>
    [...document.querySelectorAll('.sheet')].map((s, si) =>
      [...s.querySelectorAll('.panel')].map(p => {
        const sr = s.getBoundingClientRect();
        const r = p.getBoundingClientRect();
        // scrollHeight omits bottom padding in Blink, so it silently
        // under-reports. Measure the real ink instead: the lowest rendered
        // descendant edge versus the panel's content-box bottom.
        const cs = getComputedStyle(p);
        const padB = parseFloat(cs.paddingBottom);
        let lowest = r.top;
        p.querySelectorAll('*').forEach(el => {
          const q = el.getBoundingClientRect();
          if (q.height > 0 && q.width > 0) lowest = Math.max(lowest, q.bottom);
        });
        return {
          sheet: si, cls: p.className,
          left: r.left - sr.left, right: r.right - sr.left, width: r.width,
          overflow: lowest - (r.bottom - padB),
        };
      })));

  const allPanels = panels.flat();
  t(`${doc.name}: 6 panels total`, allPanels.length === 6, `got ${allPanels.length}`);

  for (const [si, set] of panels.entries()) {
    const face = si === 0 ? 'outside' : 'inside';
    const sum = set.reduce((a, p) => a + inches(p.width), 0);
    t(`${doc.name}/${face}: panel widths sum to 11.000in`, Math.abs(sum - TRIM_W) < 0.005, sum.toFixed(4));
    const widths = set.map(p => inches(p.width).toFixed(4)).join(' / ');
    const expect = face === 'outside' ? '3.6250 / 3.6875 / 3.6875' : '3.6875 / 3.6875 / 3.6250';
    t(`${doc.name}/${face}: roll-fold panel widths correct`, widths === expect, `${widths} (want ${expect})`);
  }

  // ---- 3. Content overflow (the killer defect) -------------------------
  const over = allPanels.filter(p => p.overflow > 1);
  t(`${doc.name}: no panel content overflow`, over.length === 0,
    over.map(p => `${p.cls.trim()} +${inches(p.overflow).toFixed(2)}in`).join(', '));

  // ---- 4. Fold-safe & trim-safe zones ----------------------------------
  // No text element may straddle a fold or sit inside the 0.25in trim margin.
  const violations = await page.evaluate(({ FOLDS, SAFE, TRIM_W, TRIM_H, DPI }) => {
    const bad = [];
    const sheets = [...document.querySelectorAll('.sheet')];
    sheets.forEach((s, si) => {
      const face = si === 0 ? 'outside' : 'inside';
      const folds = FOLDS[face];
      const sr = s.getBoundingClientRect();
      const walker = document.createTreeWalker(s, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        const txt = n.textContent.trim();
        if (!txt) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        const rects = [...range.getClientRects()];
        for (const r of rects) {
          if (r.width < 1 || r.height < 1) continue;
          const L = (r.left - sr.left) / DPI, R = (r.right - sr.left) / DPI;
          const T = (r.top - sr.top) / DPI, B = (r.bottom - sr.top) / DPI;
          for (const f of folds) {
            if (L < f && R > f) {
              bad.push({ kind: 'straddles fold', face, fold: f, text: txt.slice(0, 46) });
            }
          }
          if (L < SAFE - 0.005 || R > TRIM_W - SAFE + 0.005 ||
              T < SAFE - 0.005 || B > TRIM_H - SAFE + 0.005) {
            bad.push({ kind: 'outside safe area', face,
                       box: [L.toFixed(2), T.toFixed(2), R.toFixed(2), B.toFixed(2)],
                       text: txt.slice(0, 46) });
          }
        }
      }
    });
    return bad;
  }, { FOLDS, SAFE, TRIM_W, TRIM_H, DPI });

  const straddle = violations.filter(v => v.kind === 'straddles fold');
  const unsafe = violations.filter(v => v.kind === 'outside safe area');
  t(`${doc.name}: no text straddles a fold`, straddle.length === 0,
    straddle.slice(0, 3).map(v => `"${v.text}" @${v.fold}`).join(' | '));
  t(`${doc.name}: no text inside the 0.25in safe margin`, unsafe.length === 0,
    unsafe.slice(0, 3).map(v => `"${v.text}" ${v.box}`).join(' | '));

  // ---- 5. Type sizes ---------------------------------------------------
  const type = await page.evaluate(() => {
    const seen = {};
    document.querySelectorAll('p, li, div, span, h2, h3').forEach(el => {
      const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      if (!hasText) return;
      const pt = parseFloat(getComputedStyle(el).fontSize) * 72 / 96;
      const k = pt.toFixed(1);
      seen[k] = (seen[k] || 0) + 1;
    });
    return seen;
  });
  const sizes = Object.keys(type).map(Number).sort((a, b) => a - b);
  const smallest = sizes[0];
  t(`${doc.name}: no type below 7pt`, smallest >= 7.0, `smallest ${smallest}pt`);
  const legalOnly = await page.evaluate(() => {
    // Everything under 8pt must be a disclaimer/label, never running body copy.
    const bad = [];
    document.querySelectorAll('p, li').forEach(el => {
      const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      if (!hasText) return;
      const pt = parseFloat(getComputedStyle(el).fontSize) * 72 / 96;
      const words = el.textContent.trim().split(/\s+/).length;
      if (pt < 8.0 && words > 34 && !el.classList.contains('legal')) {
        bad.push(`${pt.toFixed(1)}pt/${words}w: ${el.textContent.trim().slice(0, 40)}`);
      }
    });
    return bad;
  });
  t(`${doc.name}: long-form copy is never set below 8pt`, legalOnly.length === 0, legalOnly[0]);

  // ---- 6. Required claims language -------------------------------------
  const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' '));
  t(`${doc.name}: SOC 2 CPA boundary present`,
    /BSTS does not issue SOC.?2 reports\. SOC.?2 examinations and attestation reports are performed by qualified independent CPA firms/i.test(text));
  t(`${doc.name}: veteran wording is owned & operated`,
    /Service-Disabled Veteran-Owned & Operated/i.test(text));
  t(`${doc.name}: VetCert stated as planned, not certified/in process`,
    /VetCert application planned/i.test(text) &&
    !/SBA-certified SDVOSB\b(?!\.)/i.test(text.replace(/is not currently an SBA-certified SDVOSB/gi, '')) &&
    !/certification in (process|progress)/i.test(text));
  t(`${doc.name}: no endorsement implied`, /Nothing here implies endorsement/i.test(text));
  t(`${doc.name}: no prohibited certification claims`,
    !/(SOC.?2 certified|SOC.?2 compliant|NIST certified|ISO certified|HIPAA compliant|CMMC certified|FedRAMP certified)/i.test(text));
  // Only required where the concept is actually raised — the advisor guide
  // deliberately does not pitch the future platform.
  const mentionsCA = /continuous assurance/i.test(text);
  t(`${doc.name}: continuous assurance flagged as not-yet-available`,
    !mentionsCA || /not a product available today/i.test(text),
    mentionsCA ? 'mentioned' : 'not mentioned — n/a');
  t(`${doc.name}: no invented proof points`,
    !/(case study|testimonial|our clients say|award-winning|trusted by \d)/i.test(text));
  t(`${doc.name}: no buzzword soup`,
    !/(revolutionary|cutting.edge|world.class|next.generation|synerg|unlock exponential)/i.test(text));
  t(`${doc.name}: no placeholder text`,
    !/(lorem ipsum|TBD|\[insert|XXXX|placeholder)/i.test(text));

  // ---- 7. Brand system present on both faces ---------------------------
  // One intact, fin-stabilized dart (firing-effects.svg) rides the tracer
  // next to the muzzle flash (blast-envelope.png, a separate raster) — the
  // same division used on the website hero. Nothing here should ever read
  // as a discarded petal or debris; that concept was removed.
  const brand = await page.evaluate(() =>
    [...document.querySelectorAll('.sheet')].map(s => ({
      tanks: s.querySelectorAll('img.tank').length,
      tracers: s.querySelectorAll('.tracer').length,
      flash: s.querySelectorAll('img[src*="blast"]').length,
      dart: s.querySelectorAll('img.dart, img[src*="firing-effects"]').length,
      petals: s.querySelectorAll('.petal, [class*="petal"], [class*="sabot"], [class*="discard"]').length,
      qr: s.querySelectorAll('.qr img').length,
    })));
  t(`${doc.name}: tank + muzzle flash + intact dart + tracer on the cover face`,
    brand[0].tanks >= 1 && brand[0].flash >= 1 && brand[0].dart >= 1 && brand[0].tracers >= 2,
    JSON.stringify(brand[0]));
  t(`${doc.name}: no discarded-petal, sabot, or debris geometry anywhere in the document`,
    brand[0].petals === 0 && brand[1].petals === 0,
    JSON.stringify({ outside: brand[0].petals, inside: brand[1].petals }));
  t(`${doc.name}: tracer carries through the inside spread`,
    brand[1].tracers >= 3, JSON.stringify(brand[1]));
  t(`${doc.name}: QR present on the outside face`, brand[0].qr >= 1);

  // ---- 8. Tracer weight survives print ---------------------------------
  const thin = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('.tracer').forEach(el => {
      const h = el.getBoundingClientRect().height * 72 / 96;
      if (h < 2.0) bad.push(h.toFixed(2));
    });
    return bad;
  });
  t(`${doc.name}: every tracer >= 2.0pt`, thin.length === 0, thin.join(','));

  // ---- 9. The brand promise appears on the cover -----------------------
  t(`${doc.name}: three-line promise on the front cover`,
    /Secure the data\.\s*Enable the AI\.\s*Prove the controls\./i.test(
      await page.evaluate(() => document.querySelector('.o3 .promise').innerText.replace(/\s+/g, ' '))));

  await ctx.close();
}

await browser.close();

// ---- 10. abandoned sabot-petal concept is fully gone from active source --
// A static text scan, not just a DOM check — this catches the concept
// reappearing in CSS, SVG source, or markup even before it would ever be
// instantiated as an element. Only active source that the brochures depend
// on today is scanned; historical CHANGELOG entries are exempt on purpose.
const ACTIVE_SOURCE = [
  resolve(HERE, 'brochure.css'),
  resolve(HERE, 'client.html'),
  resolve(HERE, 'advisor.html'),
  resolve(HERE, '../assets/firing-effects.svg'),
];
for (const f of ACTIVE_SOURCE) {
  const text = readFileSync(f, 'utf8');
  t(`${f.split('/').pop()}: no sabot/petal/discard language in active source`,
    !/sabot|petal|discard/i.test(text));
}

console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`\n${out.length - fails}/${out.length} passed`);
if (fails) process.exitCode = 1;
