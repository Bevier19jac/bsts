import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Renders og-src.html to public/og.png at 1200x630.
 * Run after any change to the identity lockup so the share card and the
 * homepage hero never drift apart.
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file://' + resolve(ROOT, 'og-src.html'), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
await page.screenshot({ path: resolve(ROOT, 'public/og.png') });
await browser.close();
console.log('wrote public/og.png');
