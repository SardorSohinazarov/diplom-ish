// Renders PDF pages to PNG images with pdf.js in headless Chrome (for visual checks).
// Usage: node tools/pdf-pages.mjs <file.pdf> <outDir> [firstPage] [lastPage] [scale]
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

export const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const [pdfPath, outDir, first = '1', last = '999', scale = '0.9'] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setContent('<html><body></body></html>');
await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js' });

const data = fs.readFileSync(pdfPath).toString('base64');
const images = await page.evaluate(
  async (b64, from, to, s) => {
    const lib = window.pdfjsLib;
    lib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const pdf = await lib.getDocument({ data: bytes }).promise;
    const result = [];
    for (let n = from; n <= Math.min(to, pdf.numPages); n++) {
      const pg = await pdf.getPage(n);
      const viewport = pg.getViewport({ scale: s });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await pg.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      result.push([n, canvas.toDataURL('image/png')]);
    }
    return { pages: pdf.numPages, result };
  },
  data,
  Number(first),
  Number(last),
  Number(scale),
);

for (const [n, url] of images.result) {
  fs.writeFileSync(path.join(outDir, `page-${String(n).padStart(3, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'));
}
console.log(`pages=${images.pages} rendered=${images.result.length}`);
await browser.close();
