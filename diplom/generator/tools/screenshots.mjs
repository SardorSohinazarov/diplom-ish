// Captures the diploma screenshots from the local test environment (after tools/seed.mjs).
// Usage: API_LOG=<path to api.log> node tools/screenshots.mjs [name-filter]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import puppeteer from 'puppeteer-core';
import { ROOT } from '../lib.mjs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const APP = process.env.APP_URL ?? 'http://localhost:4200';
const API = process.env.API_URL ?? 'http://localhost:5043';
const OUT = path.join(ROOT, 'rasmlar');
const filter = process.argv[2] ?? '';
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'seed.json'), 'utf8'));
const signalR = createRequire(path.join(ROOT, '..', '..', 'NationalChatClient', 'package.json'))('@microsoft/signalr');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--lang=uz-UZ'] });

async function newPage({ token, theme = 'light', mobile = false } = {}) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${APP}/auth`, { waitUntil: 'networkidle2' });
  await page.evaluate((t, th) => {
    localStorage.setItem('milliy-chat-theme', th);
    if (t) localStorage.setItem('milliy-chat-access-token', t);
  }, token, theme);
  if (token) await page.goto(`${APP}/chat`, { waitUntil: 'networkidle2' });
  else await page.reload({ waitUntil: 'networkidle2' });
  await sleep(800);
  return page;
}

async function shot(page, name) {
  if (!name.includes(filter)) return;
  await sleep(500);
  await page.screenshot({ path: path.join(OUT, `${name}.jpg`), type: 'jpeg', quality: 88 });
  console.log('ok  ', name);
}

const click = (page, selector, text) =>
  page.evaluate((sel, txt) => {
    const el = [...document.querySelectorAll(sel)].find((e) => !txt || e.textContent.includes(txt));
    if (!el) throw new Error(`not found: ${sel} ${txt ?? ''}`);
    el.click();
  }, selector, text);

async function openChat(page, title) {
  await click(page, '.chat-list .chat-list-item', title);
  await page.waitForNetworkIdle({ idleTime: 400 });
  await page.evaluate(() => document.querySelectorAll('.load-photo').forEach((b) => b.click()));
  await page.waitForNetworkIdle({ idleTime: 400 });
  await scrollToBottom(page);
}

async function scrollToBottom(page) {
  await sleep(400);
  await page.evaluate(() => {
    const list = document.querySelector('.messages');
    if (list) list.scrollTop = list.scrollHeight;
  });
  await sleep(500);
}

async function typeInto(page, selector, text) {
  await page.focus(selector);
  await page.keyboard.type(text, { delay: 20 });
}

/** Another user "typing…" over SignalR while a screenshot is taken. */
async function startTyping(token, chatId) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${API}/hubs/chat`, { accessTokenFactory: () => token })
    .configureLogging(signalR.LogLevel.Error)
    .build();
  await connection.start();
  await connection.invoke('JoinChat', chatId);
  const timer = setInterval(() => connection.send('SetTyping', chatId, true).catch(() => {}), 800);
  await connection.send('SetTyping', chatId, true);
  return async () => {
    clearInterval(timer);
    await connection.stop();
  };
}

const sardor = seed.tokens.sardor;

// ── Logged-out screens ───────────────────────────────────────────────────────────────────
{
  const page = await newPage();
  await shot(page, '3-01-login');
  const email = 'yangi.talaba@example.com';
  await typeInto(page, 'input[type="email"]', email);
  await click(page, '.submit-action button');
  await page.waitForSelector('input[inputmode="numeric"]');
  await sleep(500);
  await shot(page, '3-02-otp');
  await sleep(500);
  const line = fs.readFileSync(process.env.API_LOG, 'utf8').split('\n').filter((l) => l.includes(`sign-in code for ${email}`)).pop();
  await typeInto(page, 'input[inputmode="numeric"]', line.match(/: (\d{6});/)[1]);
  await click(page, '.submit-action button');
  await sleep(1500);
  const inputs = await page.$$('form input[type="text"]');
  const values = ['Nodira', 'Qodirova', 'nodira_q'];
  for (let i = 0; i < Math.min(inputs.length, values.length); i++) {
    await inputs[i].evaluate((el) => { el.value = ''; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await inputs[i].type(values[i], { delay: 15 });
  }
  await shot(page, '3-03-register');
  await page.browserContext().close();
}

// ── Swagger ──────────────────────────────────────────────────────────────────────────────
{
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${API}/swagger/index.html`, { waitUntil: 'networkidle2' });
  await sleep(1000);
  await shot(page, '3-04-swagger');
  await context.close();
}

// ── Private chat, typing, reply ─────────────────────────────────────────────────────────
{
  const page = await newPage({ token: sardor });
  await openChat(page, 'Jasur Karimov');
  const stop = await startTyping(seed.tokens.jasur, seed.chats.jasur);
  await sleep(1500);
  await shot(page, '3-05-private-chat');
  await stop();

  // Reply to Jasur's question and start typing an answer.
  const bubble = await page.evaluateHandle(() =>
    [...document.querySelectorAll('article.message')].find((a) => a.textContent.includes('Juda tushunarli')),
  );
  await bubble.hover();
  await sleep(300);
  await page.evaluate((el) => el.querySelector('[aria-label="Javob yozish"] button, button[aria-label="Javob yozish"]')?.click(), bubble);
  await page.evaluate((el) => {
    const button = el.querySelector('button[aria-label="Javob yozish"]') ?? el.querySelector('.message-actions ui-icon-button button');
    button?.click();
  }, bubble);
  await sleep(300);
  await typeInto(page, 'input[placeholder="Xabar yozing..."]', 'Ha, rahbar bilan ertaga soat 10:00 da uchrashamiz');
  await scrollToBottom(page);
  await bubble.hover();
  await shot(page, '3-06-reply');
  await page.browserContext().close();
}

// ── Image viewer, shared media, message search ──────────────────────────────────────────
{
  const page = await newPage({ token: sardor });
  await openChat(page, 'Jasur Karimov');
  await page.waitForSelector('.loaded-photo img');
  await click(page, '.loaded-photo');
  await page.waitForSelector('app-attachment-viewer img');
  await sleep(800);
  await shot(page, '3-07-image-viewer');
  await page.keyboard.press('Escape');
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(800);

  await openChat(page, 'Dilnoza Rahimova');
  await click(page, '.contact-trigger');
  await sleep(800);
  await click(page, '.media-category', 'Rasmlar');
  await page.waitForNetworkIdle({ idleTime: 500 });
  await sleep(800);
  await shot(page, '3-08-shared-media');

  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(800);
  await openChat(page, 'Jasur Karimov');
  await click(page, 'button[aria-label="Xabarlarni qidirish"]');
  await sleep(300);
  await typeInto(page, '.message-search-panel input', 'diagramma');
  await page.keyboard.press('Enter');
  await page.waitForNetworkIdle({ idleTime: 400 });
  await sleep(600);
  await shot(page, '3-09-message-search');
  await page.browserContext().close();
}

// ── User search, stories, profile ───────────────────────────────────────────────────────
{
  const page = await newPage({ token: sardor });
  await openChat(page, 'Malika Yusupova');
  await typeInto(page, '.search-box input', 'ma');
  await page.waitForNetworkIdle({ idleTime: 500 });
  await sleep(600);
  await shot(page, '3-10-user-search');
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1000);

  await click(page, '.story-tile', 'Jasur');
  await page.waitForSelector('app-story-viewer img, app-story-viewer video', { timeout: 10000 }).catch(() => {});
  await sleep(1500);
  await shot(page, '3-11-story-viewer');
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1000);

  await click(page, 'button[aria-label="Profil"]');
  await sleep(1000);
  await click(page, 'button[aria-label="Profilni tahrirlash"]');
  await page.waitForNetworkIdle({ idleTime: 500 });
  await sleep(800);
  await page.evaluate(() => document.querySelector('.profile-editor')?.scrollTo(0, 260));
  await sleep(300);
  await shot(page, '3-12-profile-editor');
  await page.browserContext().close();
}

// ── Group chat, group info, group creation ──────────────────────────────────────────────
{
  const page = await newPage({ token: sardor });
  await openChat(page, '315-21 guruh');
  await click(page, '.contact-trigger');
  await page.waitForNetworkIdle({ idleTime: 500 });
  await sleep(1000);
  await shot(page, '3-13-group-chat');
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1000);

  await click(page, '.new-group-button');
  await sleep(500);
  for (const [query, name] of [['ma', 'Malika'], ['be', 'Bekzod']]) {
    const input = 'app-member-picker .ui-text-field input, app-member-picker input';
    await page.$eval(input, (el) => { el.value = ''; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await typeInto(page, input, query);
    await page.waitForNetworkIdle({ idleTime: 500 });
    await sleep(500);
    await click(page, '.result-row', name);
  }
  await sleep(400);
  await shot(page, '3-14-group-create-members');
  await click(page, '.drawer-footer button', 'Keyingi');
  await sleep(500);
  await typeInto(page, '.group-drawer input[type="text"]', 'Diplom jamoasi');
  await page.focus('.group-drawer textarea');
  await page.keyboard.type('Himoyaga tayyorgarlik bo‘yicha muhokamalar', { delay: 10 });
  await shot(page, '3-15-group-create-details');
  await page.browserContext().close();
}

// ── Dark theme ───────────────────────────────────────────────────────────────────────────
{
  const page = await newPage({ token: sardor, theme: 'dark' });
  await openChat(page, '315-21 guruh');
  await shot(page, '3-16-dark-theme');
  await page.browserContext().close();
}

// ── Mobile ───────────────────────────────────────────────────────────────────────────────
{
  const page = await newPage({ token: sardor, mobile: true });
  await shot(page, '3-17-mobile-list');
  await openChat(page, '315-21 guruh');
  await sleep(800);
  await shot(page, '3-18-mobile-chat');
  await page.browserContext().close();
}

// ── Latin ↔ Cyrillic: Aziz writes in Cyrillic, Sardor in Latin ─────────────────────────────
const setScript = (token, value) =>
  fetch(`${API}/api/users/me/script-preference`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ scriptPreference: value }),
  });
if ('3-20-script'.includes(filter) || filter.startsWith('3-20')) {
  for (const [value, name] of [[1, '3-20-script-original'], [2, '3-20-script-latin'], [3, '3-20-script-cyrillic']]) {
    await setScript(sardor, value);
    const page = await newPage({ token: sardor });
    await openChat(page, 'Aziz Nazarov');
    await shot(page, name);
    if (value === 2) {
      await click(page, 'button[aria-label="Profil"]');
      await sleep(1000);
      await click(page, 'button[aria-label="Profilni tahrirlash"]');
      await page.waitForNetworkIdle({ idleTime: 500 });
      await page.evaluate(() => document.querySelector('.script-section')?.scrollIntoView({ block: 'center' }));
      await sleep(600);
      await shot(page, '3-21-script-setting');
    }
    await page.browserContext().close();
  }
  await setScript(sardor, 1);
}

// ── Organization: the automatic "tuit.uz" group and its invite link ──────────────────────
{
  const page = await newPage({ token: sardor });
  await openChat(page, 'tuit.uz');
  await click(page, '.contact-trigger');
  await page.waitForNetworkIdle({ idleTime: 500 });
  await sleep(1000);
  await shot(page, '3-22-organization-group');
  await page.browserContext().close();

  const guest = await newPage({ token: seed.tokens.aziz });
  await guest.goto(`${APP}/join/${seed.inviteToken}`, { waitUntil: 'networkidle2' });
  await sleep(1200);
  await shot(guest, '3-23-join-invite');
  await guest.browserContext().close();
}

// ── Secret chat between Sardor and Jasur (two browsers, real E2E) ────────────────────────
if ('3-24-secret'.includes(filter) || filter.startsWith('3-2')) {
  const a = await newPage({ token: sardor });
  const b = await newPage({ token: seed.tokens.jasur });
  const composer = 'textarea[aria-label="Maxfiy xabar"]';
  const say = async (page, text) => {
    await page.waitForSelector(composer);
    await page.focus(composer);
    await page.keyboard.type(text, { delay: 10 });
    await page.keyboard.press('Enter');
    await sleep(1500);
  };

  await openChat(a, 'Jasur Karimov');
  await click(a, 'button[aria-label="Ko‘proq amallar"]');
  await sleep(300);
  await click(a, 'button', 'Maxfiy chat boshlash');
  await sleep(2500);
  await shot(a, '3-24-secret-pending');

  await b.waitForSelector('.secret-chat-list .chat-list-item', { timeout: 20000 });
  await click(b, '.secret-chat-list .chat-list-item');
  await sleep(1000);
  await shot(b, '3-25-secret-request');
  await click(b, 'ui-button button', 'Qabul qilish');
  await sleep(4000);

  await say(a, 'Salom! Bu chat uchdan-uchgacha shifrlangan: server xabarlarimizni o‘qiy olmaydi.');
  await say(b, 'Zo‘r! Keling, avval kalitlarni tekshirib olamiz.');
  const input = await a.$('input.file-input');
  await input.uploadFile(path.join(ROOT, 'data', 'story-2.jpg'));
  await sleep(5000);
  await click(a, 'button[aria-label="O‘z-o‘zini o‘chirish taymeri"]');
  await sleep(300);
  await click(a, '.header-menu button', '1 daqiqa');
  await sleep(1500);
  await say(a, 'Bu xabar o‘qilgandan 1 daqiqa o‘tib ikkala qurilmadan ham o‘chadi.');
  await sleep(2500);
  await shot(b, '3-26-secret-chat');

  await click(b, 'button[aria-label="Shifrlash kalitini tekshirish"]');
  await sleep(1000);
  await shot(b, '3-27-secret-fingerprint');

  // Jasur goes offline; the next message waits on the server, encrypted (for the database screenshot).
  await b.browserContext().close();
  await say(a, 'Ertaga kafedrada ko‘rishamiz, taqriz faylini olib kelaman.');
  await sleep(1000);
  await a.browserContext().close();
}

await browser.close();
