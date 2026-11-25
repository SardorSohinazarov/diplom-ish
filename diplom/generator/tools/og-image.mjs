// Renders site-assets/og.png (1200×630), the preview picture shown when qales.uz/diplom is shared.
// Usage: node tools/og-image.mjs
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { ROOT } from '../lib.mjs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const shot = fs.readFileSync(path.join(ROOT, 'rasmlar', '3-05-private-chat.jpg')).toString('base64');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body { margin: 0; width: 1200px; height: 630px; font-family: "Segoe UI", Arial, sans-serif;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4f46e5 100%); color: #fff; overflow: hidden; position: relative; }
.text { position: absolute; left: 64px; top: 64px; width: 600px; }
.eyebrow { font-size: 22px; letter-spacing: 2px; text-transform: uppercase; color: #a5b4fc; font-weight: 700; }
h1 { font-size: 58px; line-height: 1.1; margin: 18px 0 20px; }
p { font-size: 25px; line-height: 1.4; color: #e0e7ff; margin: 0; }
.score { display: inline-block; margin-top: 30px; background: #059669; padding: 12px 24px; border-radius: 999px; font-size: 26px; font-weight: 700; }
.foot { position: absolute; left: 64px; bottom: 48px; font-size: 22px; color: #c7d2fe; }
.shot { position: absolute; right: -60px; top: 80px; width: 560px; border-radius: 16px; box-shadow: 0 30px 80px rgba(0,0,0,.45); transform: rotate(-3deg); }
</style></head><body>
<div class="text">
<div class="eyebrow">Diplom loyihasi · TATU 2026</div>
<h1>“Milliy” xabarchi</h1>
<p>Ma’lumotlarni O‘zbekistonda saqlaydigan real vaqtli veb-messenjer</p>
<div class="score">🏆 Himoya: 92 ball</div>
</div>
<div class="foot">Sardor Sohinazarov · qales.uz/diplom</div>
<img class="shot" src="data:image/jpeg;base64,${shot}">
</body></html>`;

const browser = await puppeteer.launch({ executablePath: CHROME });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: path.join(ROOT, 'site-assets', 'og.png') });
await browser.close();
console.log('site-assets/og.png');
