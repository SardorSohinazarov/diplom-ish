// Removes half-empty pages left by figures that did not fit and jumped to the next page.
// Each round: build → Word PDF → find pages whose content ends early while the next page starts
// with a figure → for that figure first move the paragraph after it above it (more text fills the
// gap), then shrink it a little. Overrides go to data/layout.json, which lib.mjs and build.mjs read.
// Usage: node tools/fit-pages.mjs [--rounds 8] [--reset]
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { ROOT } from '../lib.mjs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const LAYOUT = path.join(ROOT, 'data', 'layout.json');
// Rounds work on scratch copies, so the real document may stay open in Word or WPS meanwhile.
const DOCX = path.join(os.tmpdir(), 'diplom-fit.docx');
const PDF = path.join(os.tmpdir(), 'diplom-fit.pdf');
const REPORT = path.join(os.tmpdir(), 'diplom-figures.json');

const args = process.argv.slice(2);
const rounds = Number(args[args.indexOf('--rounds') + 1]) || 8;
/** Content must reach at least this share of the page height (the page number band excluded). */
const MIN_FILL = 0.75;
const MAX_AFTER = 2; // paragraphs moved above one figure
const MIN_SCALE = 0.75; // never shrink a figure below 75 % of its size

if (args.includes('--reset')) fs.rmSync(LAYOUT, { force: true });
const layout = fs.existsSync(LAYOUT) ? JSON.parse(fs.readFileSync(LAYOUT, 'utf8')) : {};

function buildAndExport() {
  execFileSync('node', ['build.mjs'], { cwd: ROOT, env: { ...process.env, FIGURE_REPORT: REPORT, DIPLOM_OUT: DOCX }, stdio: 'ignore' });
  const out = execFileSync(
    'powershell',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.join(ROOT, 'tools', 'export-pdf.ps1'), DOCX, PDF],
    { encoding: 'utf8' },
  );
  return out.trim();
}

/** Per page: how far down the content reaches (0..1) and the first text lines from the top. */
async function analyse(browser) {
  const page = await browser.newPage();
  await page.setContent('<html><body></body></html>');
  await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js' });
  const data = fs.readFileSync(PDF).toString('base64');
  const pages = await page.evaluate(async (b64) => {
    const lib = window.pdfjsLib;
    lib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    const doc = await lib.getDocument({ data: Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)) }).promise;
    const result = [];
    for (let n = 1; n <= doc.numPages; n++) {
      const pg = await doc.getPage(n);
      const viewport = pg.getViewport({ scale: 0.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await pg.render({ canvasContext: ctx, viewport }).promise;
      const { width, height } = canvas;
      const pixels = ctx.getImageData(0, 0, width, height).data;
      let bottom = 0;
      for (let y = Math.floor(height * 0.9) - 1; y > 0 && !bottom; y--) {
        for (let x = Math.floor(width * 0.1); x < width * 0.95; x += 2) {
          const i = (y * width + x) * 4;
          if (pixels[i] < 200 || pixels[i + 1] < 200 || pixels[i + 2] < 200) { bottom = y; break; }
        }
      }
      // Text lines from the top, without the page number at the bottom.
      const text = await pg.getTextContent();
      const pageHeight = pg.view[3];
      const lines = new Map();
      for (const item of text.items) {
        if (!item.str.trim()) continue;
        const top = Math.round((1 - item.transform[5] / pageHeight) * 200) / 200;
        if (top > 0.9) continue;
        lines.set(top, (lines.get(top) ?? '') + item.str);
      }
      const ordered = [...lines.entries()].sort((a, b) => a[0] - b[0]).map(([, t]) => t.trim());
      result.push({ fill: bottom / height, lines: ordered.slice(0, 6) });
    }
    return result;
  }, data);
  await page.close();
  return pages;
}

/** The figure a page starts with: only sub-labels "a) …" may stand above its caption. */
function leadingFigure(lines) {
  for (const line of lines) {
    const m = line.match(/^(\d+\.\d+)-rasm\./);
    if (m) return m[1];
    if (/^[ab]\) /.test(line)) continue;
    return null;
  }
  return null;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
let pending = false; // layout.json changed after the last checked build
try {
  for (let round = 1; round <= rounds; round++) {
    const stats = buildAndExport();
    pending = false;
    const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
    const pages = await analyse(browser);
    const gaps = [];
    for (let i = 0; i + 1 < pages.length; i++) {
      if (pages[i].fill >= MIN_FILL) continue;
      const figure = leadingFigure(pages[i + 1].lines);
      if (figure) gaps.push({ page: i + 1, fill: pages[i].fill, figure });
    }
    console.log(`${round}-bosqich: ${stats}; bo‘sh joy qolgan sahifalar: ${gaps.map((g) => `${g.page} (${g.figure}-rasm oldidan)`).join(', ') || 'yo‘q'}`);
    let changed = false;
    for (const { figure } of gaps) {
      const entry = (layout[figure] ??= {});
      const available = (report[figure]?.following ?? 0) + (entry.after ?? 0);
      if ((entry.after ?? 0) < Math.min(MAX_AFTER, available)) {
        entry.after = (entry.after ?? 0) + 1;
        changed = true;
      } else if ((entry.scale ?? 1) > MIN_SCALE + 0.001) {
        entry.scale = Math.round(((entry.scale ?? 1) - 0.1) * 100) / 100;
        if (entry.scale < MIN_SCALE) entry.scale = MIN_SCALE;
        changed = true;
      }
    }
    fs.writeFileSync(LAYOUT, JSON.stringify(layout, null, 2) + '\n');
    if (!gaps.length || !changed) {
      if (gaps.length) console.log('Qolgan holatlarni qo‘lda ko‘rish kerak: rasm eng kichik o‘lchamda, ko‘chiriladigan paragraf yo‘q.');
      break;
    }
  }
  if (pending) console.log('layout.json oxirgi bosqichdan keyin yana o‘zgardi; uni tekshirish uchun skriptni qayta ishga tushiring.');
  console.log('Endi asosiy faylni yig‘ing: node build.mjs, so‘ng tools/export-pdf.ps1.');
} finally {
  await browser.close();
}
