// Rasterizes Lucide icons to transparent PNGs (cached) so PowerPoint shows them without SVG support.
// Usage: const png = await renderIcons([['mail', 'FFFFFF'], ...]); png('mail', 'FFFFFF') -> file path
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { ROOT } from '../lib.mjs';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const SRC = path.join(ROOT, 'node_modules', 'lucide-static', 'icons');
const OUT = path.join(ROOT, 'slides-cache', 'icons');
const PX = 256;

const file = (name, color) => path.join(OUT, `${name}-${color}.png`);

export async function renderIcons(list) {
  fs.mkdirSync(OUT, { recursive: true });
  const missing = list.filter(([name, color]) => !fs.existsSync(file(name, color)));
  if (missing.length) {
    const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: PX, height: PX });
      for (const [name, color] of missing) {
        const svg = fs
          .readFileSync(path.join(SRC, `${name}.svg`), 'utf8')
          .replace(/currentColor/g, `#${color}`)
          .replace(/width="24"/, `width="${PX}"`)
          .replace(/height="24"/, `height="${PX}"`);
        await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
        const el = await page.$('svg');
        await el.screenshot({ path: file(name, color), omitBackground: true });
      }
    } finally {
      await browser.close();
    }
  }
  return (name, color) => file(name, color);
}
