// Renders a console log as a terminal-style PNG: node tools/terminal.mjs <log.txt> <out.png> <command>
import fs from 'node:fs';
import puppeteer from 'puppeteer-core';
const [file, out, command] = process.argv.slice(2);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const lines = fs.readFileSync(file, 'utf8').replace(/\r/g, '').split('\n')
  .filter((l) => l.trim() && !l.includes('warning'))
  .map((l) => l.replace(/NationalChat\.Tests\.(?=[A-Z])/g, ''))
  .map((l) => {
    const e = esc(l);
    if (/^\s*Passed /.test(l)) return e.replace('Passed', '<span style="color:#4ade80">Passed</span>');
    if (/Passed: \d+/.test(l)) return `<span style="color:#4ade80">${e}</span>`;
    return e;
  });
const html = `<html><body style="margin:0;background:#1e1e1e"><pre style="display:inline-block;margin:0;padding:18px 22px;font:15px/1.45 Consolas,monospace;color:#d4d4d4;white-space:pre">` +
  `<span style="color:#9cdcfe">PS&gt;</span> ${esc(command)}\n${lines.join('\n')}</pre></body></html>`;
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 400, deviceScaleFactor: 2 });
await page.setContent(html);
const pre = await page.$('pre');
await pre.screenshot({ path: out });
await browser.close();
