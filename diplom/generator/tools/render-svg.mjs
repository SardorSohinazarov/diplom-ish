// Renders every hand-drawn diagrams/*.svg file to rasmlar/<name>.png (2x) using the installed Chrome.
// Usage: node tools/render-svg.mjs [name-filter]
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { ROOT } from '../lib.mjs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const filter = process.argv[2] ?? '';
const dir = path.join(ROOT, 'diagrams');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svg') && f.includes(filter));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 2000, height: 1400, deviceScaleFactor: 2 });

for (const file of files) {
  const name = path.basename(file, '.svg');
  const svg = fs.readFileSync(path.join(dir, file), 'utf8');
  await page.setContent(`<html><body style="margin:0;background:#fff">${svg}</body></html>`);
  const el = await page.$('svg');
  await el.screenshot({ path: path.join(ROOT, 'rasmlar', `${name}.png`), omitBackground: false });
  console.log('ok  ', name);
}
await browser.close();
