// Grid overview of arbitrary images: node tools/image-sheet.mjs <out.png> <columns> <cellWidth> <img...>
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
const [out, columns, cell, ...files] = process.argv.slice(2);
const html = `<html><body style="margin:0;background:#666;font:13px sans-serif"><div style="display:grid;grid-template-columns:repeat(${columns},${cell}px);gap:6px;padding:6px">${files
  .map((f) => `<figure style="margin:0;background:#fff"><img style="width:100%;display:block" src="data:image/${f.endsWith('png') ? 'png' : 'jpeg'};base64,${fs.readFileSync(f).toString('base64')}"><figcaption style="background:#222;color:#fff;padding:2px 4px">${path.basename(f)}</figcaption></figure>`)
  .join('')}</div></body></html>`;
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(columns) * (Number(cell) + 6) + 6, height: 600 });
await page.setContent(html);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
