// Renders every diagrams/*.mmd (Mermaid) file to rasmlar/<name>.png using the installed Chrome.
// Usage: node tools/render-diagrams.mjs [name-filter]
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { ROOT } from '../lib.mjs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const filter = process.argv[2] ?? '';
const dir = path.join(ROOT, 'diagrams');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mmd') && f.includes(filter));

// Print-friendly monochrome theme with a single accent colour.
const config = {
  startOnLoad: false,
  theme: 'base',
  fontFamily: 'Times New Roman, serif',
  themeVariables: {
    fontFamily: 'Times New Roman, serif',
    fontSize: '26px',
    primaryColor: '#ffffff',
    primaryBorderColor: '#222222',
    primaryTextColor: '#111111',
    secondaryColor: '#f2f2f2',
    tertiaryColor: '#f7f7f7',
    lineColor: '#333333',
    clusterBkg: '#f7f7f7',
    clusterBorder: '#777777',
    actorBkg: '#ffffff',
    actorBorder: '#222222',
    noteBkgColor: '#f2f2f2',
    noteBorderColor: '#777777',
    signalColor: '#222222',
    signalTextColor: '#111111',
    labelBoxBkgColor: '#f2f2f2',
    activationBkgColor: '#e8e8e8',
  },
  flowchart: { htmlLabels: true, curve: 'basis', padding: 14, nodeSpacing: 40, rankSpacing: 55 },
  sequence: { mirrorActors: false, actorMargin: 50, width: 190, height: 60, messageMargin: 44, boxMargin: 10, noteMargin: 12, wrap: true, actorFontSize: 26, messageFontSize: 26, noteFontSize: 24 },
  er: { layoutDirection: 'TB', entityPadding: 10, minEntityWidth: 100, fontSize: 26 },
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 4000, height: 1200, deviceScaleFactor: 2 });
await page.setContent('<html><body style="margin:0;background:#fff"><div id="out"></div></body></html>');
await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js' });
await page.evaluate((cfg) => window.mermaid.initialize(cfg), config);

for (const file of files) {
  const source = fs.readFileSync(path.join(dir, file), 'utf8');
  const name = path.basename(file, '.mmd');
  try {
    await page.evaluate(async (id, src) => {
      const { svg } = await window.mermaid.render(id, src);
      const out = document.getElementById('out');
      out.innerHTML = svg;
      const el = out.querySelector('svg');
      // Mermaid emits width="100%"; pin the natural size so the PNG keeps real proportions.
      const vb = el.viewBox.baseVal;
      el.setAttribute('width', String(Math.ceil(vb.width)));
      el.setAttribute('height', String(Math.ceil(vb.height)));
      el.style.maxWidth = 'none';
      el.style.background = '#fff';
      el.style.padding = '16px';
    }, `d_${name.replace(/\W/g, '_')}`, source);
    const svg = await page.$('#out svg');
    await svg.screenshot({ path: path.join(ROOT, 'rasmlar', `${name}.png`), omitBackground: false });
    console.log('ok  ', name);
  } catch (error) {
    console.log('FAIL', name, String(error.message ?? error).split('\n')[0]);
  }
}
await browser.close();
