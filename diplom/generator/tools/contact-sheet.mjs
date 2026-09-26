// Combines page PNGs into one overview image (grid) for quick visual review.
// Usage: node tools/contact-sheet.mjs <pagesDir> <out.png> [columns] [firstPage] [lastPage]
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [dir, out, columns = '4', first = '1', last = '999'] = process.argv.slice(2);
const files = fs
  .readdirSync(dir)
  .filter((f) => /^page-\d+\.png$/.test(f))
  .map((f) => [Number(f.match(/\d+/)[0]), f])
  .filter(([n]) => n >= Number(first) && n <= Number(last))
  .sort((a, b) => a[0] - b[0]);

const cells = files
  .map(
    ([n, f]) =>
      `<figure><img src="data:image/png;base64,${fs.readFileSync(path.join(dir, f)).toString('base64')}"><figcaption>${n}</figcaption></figure>`,
  )
  .join('');
const html = `<html><body style="margin:0;background:#888;font:14px sans-serif">
<div style="display:grid;grid-template-columns:repeat(${columns},1fr);gap:8px;padding:8px;width:${Number(columns) * 420}px">${cells}</div>
<style>figure{margin:0;background:#fff}img{width:100%;display:block}figcaption{text-align:center;background:#333;color:#fff}</style></body></html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(columns) * 420 + 16, height: 800 });
await page.setContent(html);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('ok', out, files.length, 'pages');
