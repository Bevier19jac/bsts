import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../out');
mkdirSync(OUT, { recursive: true });

const TRIM_W = 11.0, TRIM_H = 8.5, BLEED = 0.125;

const JOBS = [
  { src: 'client.html',  base: 'BSTS_Client_Capabilities_Brochure', label: 'CLIENT'  },
  { src: 'advisor.html', base: 'BSTS_Advisor_Referral_Field_Guide', label: 'ADVISOR' },
];

/** Write a variant of the HTML with bleed baked in, so paths stay relative. */
function materialize(srcFile, bleed) {
  const css = readFileSync(resolve(HERE, 'brochure.css'), 'utf8')
    .replace('__BLEED__', `${bleed}in`)
    .replace('__PAGE_W__', `${TRIM_W + bleed * 2}in`)
    .replace('__PAGE_H__', `${TRIM_H + bleed * 2}in`);
  const tag = bleed ? 'bleed' : 'trim';
  const cssName = `.build-${tag}.css`;
  writeFileSync(resolve(HERE, cssName), css);
  const html = readFileSync(resolve(HERE, srcFile), 'utf8')
    .replace('href="brochure.css"', `href="${cssName}"`);
  const htmlName = `.build-${tag}-${srcFile}`;
  writeFileSync(resolve(HERE, htmlName), html);
  return htmlName;
}

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const results = [];

for (const job of JOBS) {
  for (const bleed of [BLEED, 0]) {
    const pageW = TRIM_W + bleed * 2;
    const pageH = TRIM_H + bleed * 2;
    const file = materialize(job.src, bleed);

    const ctx = await browser.newContext({
      viewport: { width: Math.round(pageW * 96), height: Math.round(pageH * 96) },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('requestfailed', r => errs.push(`FAILED ${r.url()}`));

    await page.goto('file://' + resolve(HERE, file), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);

    const suffix = bleed ? '_PRINT_BLEED' : '';
    const pdfPath = `${OUT}/${job.base}${suffix}.pdf`;
    await page.pdf({
      path: pdfPath,
      width: `${pageW}in`,
      height: `${pageH}in`,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
    });

    // Preview PNGs are made from the TRIM version — that is what the reader
    // actually holds, so panel order is judged against the trimmed sheet.
    if (!bleed) {
      const sheets = await page.$$('.sheet');
      const names = ['OUTSIDE', 'INSIDE'];
      for (let i = 0; i < sheets.length; i++) {
        await sheets[i].screenshot({
          path: `${OUT}/${job.label}_BROCHURE_${names[i]}_PREVIEW.png`,
        });
      }
    }

    if (errs.length) console.log(`  !! ${job.base} ${suffix || 'trim'}:`, errs.slice(0, 4));
    results.push({ job: job.base, bleed, pdfPath, pageW, pageH });
    await ctx.close();
  }
}

await browser.close();
for (const r of results) {
  console.log(`${r.pdfPath.split('/').pop().padEnd(48)} ${r.pageW}in x ${r.pageH}in`);
}
console.log('render complete');
