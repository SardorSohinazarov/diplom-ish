// Fills the local TEST API with realistic demo data for the diploma screenshots.
// Usage: API_LOG=<path to api.log> [API_URL=http://localhost:5043] node tools/seed.mjs
// Uses only the public REST API; sign-in codes are read from the Development e-mail sender log.
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { ROOT } from '../lib.mjs';

const API = process.env.API_URL ?? 'http://localhost:5043';
const LOG = process.env.API_LOG;
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = path.join(ROOT, 'data');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(method, url, token, body, isForm = false) {
  const res = await fetch(API + url, {
    method,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body && !isForm ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`${method} ${url} → ${res.status} ${text.slice(0, 200)}`);
  return json?.data;
}

async function signIn(email, device, profile) {
  await call('POST', '/api/auth/request-code', null, { email });
  await sleep(300);
  const line = fs.readFileSync(LOG, 'utf8').split('\n').filter((l) => l.includes(`sign-in code for ${email}`)).pop();
  const code = line.match(/: (\d{6});/)[1];
  const verified = await call('POST', '/api/auth/verify-code', null, { email, code, deviceName: device.name, systemVersion: device.os, appVersion: '1.0' });
  if (verified.accessToken) return verified.accessToken;
  const registered = await call('POST', '/api/auth/register', null, {
    registrationToken: verified.registrationToken,
    username: profile.username,
    firstName: profile.firstName,
    lastName: profile.lastName,
    deviceName: device.name,
    systemVersion: device.os,
    appVersion: '1.0',
  });
  return registered.accessToken;
}

const form = (field, file, fileName, type, text) => {
  const data = new FormData();
  data.append(field, new Blob([fs.readFileSync(file)], { type }), fileName);
  if (text) data.append('textContent', text);
  return data;
};

// ── Generated images (story backgrounds, group photo, avatars) ──────────────────────────
async function renderImages() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  const shot = async (name, w, h, html) => {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.setContent(`<html><body style="margin:0">${html}</body></html>`);
    await page.screenshot({ path: path.join(OUT, name), type: 'jpeg', quality: 90 });
  };
  const story = (bg, title, sub) => `<div style="width:1080px;height:1920px;background:${bg};display:flex;flex-direction:column;justify-content:flex-end;padding:120px;box-sizing:border-box;font-family:Segoe UI,Arial;color:#fff">
    <div style="font-size:110px;font-weight:700;line-height:1.1">${title}</div><div style="font-size:56px;opacity:.85;margin-top:30px">${sub}</div></div>`;
  await shot('story-1.jpg', 1080, 1920, story('linear-gradient(160deg,#4f46e5,#0ea5e9)', 'Diplom himoyasiga 30 kun qoldi', 'TATU · Dasturiy injiniring'));
  await shot('story-2.jpg', 1080, 1920, story('linear-gradient(160deg,#0f766e,#84cc16)', 'Toshkent, kuz', 'Kutubxonadan keyin sayr'));
  await shot('story-3.jpg', 1080, 1920, story('linear-gradient(160deg,#be185d,#f59e0b)', 'Yangi loyiha boshlandi!', '“Milliy chat” — v1.0'));
  await shot('group.jpg', 512, 512, `<div style="width:512px;height:512px;background:linear-gradient(135deg,#6366f1,#22d3ee);display:grid;place-items:center;font:700 150px Segoe UI,Arial;color:#fff">315</div>`);
  const avatar = (bg, initials) => `<div style="width:512px;height:512px;background:${bg};display:grid;place-items:center;font:600 190px Segoe UI,Arial;color:#fff">${initials}</div>`;
  await shot('avatar-sardor.jpg', 512, 512, avatar('linear-gradient(135deg,#1e3a8a,#6366f1)', 'SS'));
  await shot('avatar-dilnoza.jpg', 512, 512, avatar('linear-gradient(135deg,#be185d,#fb7185)', 'DR'));
  await shot('avatar-jasur.jpg', 512, 512, avatar('linear-gradient(135deg,#065f46,#34d399)', 'JK'));
  await browser.close();
}

// Four people share the tuit.uz domain (organization badge and the automatic "tuit.uz" group, Sardor signs in
// first and becomes its admin); Bekzod and Aziz use public mail services and get neither.
// ── Seed ────────────────────────────────────────────────────────────────────────────────
const people = {
  sardor: { email: 'sardor.sohinazarov@tuit.uz', username: 'sardor_s', firstName: 'Sardor', lastName: 'Sohinazarov', bio: 'TATU, Dasturiy injiniring. “Milliy chat” muallifi.' },
  jasur: { email: 'jasur.karimov@tuit.uz', username: 'jasur_karimov', firstName: 'Jasur', lastName: 'Karimov', bio: 'Backend dasturchi' },
  dilnoza: { email: 'dilnoza.rahimova@tuit.uz', username: 'dilnoza_r', firstName: 'Dilnoza', lastName: 'Rahimova', bio: 'UI/UX dizayner' },
  bekzod: { email: 'bekzod.tursunov@gmail.com', username: 'bekzod_t', firstName: 'Bekzod', lastName: 'Tursunov', bio: '' },
  malika: { email: 'malika.yusupova@tuit.uz', username: 'malika_yu', firstName: 'Malika', lastName: 'Yusupova', bio: 'QA muhandisi' },
  aziz: { email: 'aziz.nazarov@gmail.com', username: 'aziz_nazarov', firstName: 'Aziz', lastName: 'Nazarov', bio: '' },
};

fs.mkdirSync(OUT, { recursive: true });
await renderImages();

const tokens = {};
const ids = {};
for (const [key, person] of Object.entries(people)) {
  tokens[key] = await signIn(person.email, { name: 'Chrome · Windows 11', os: 'Windows 11' }, person);
  await call('PUT', '/api/users/me', tokens[key], { username: person.username, firstName: person.firstName, lastName: person.lastName, bio: person.bio });
  ids[key] = (await call('GET', '/api/users/me', tokens[key])).id;
}
// Extra devices for Sardor so the "Qurilmalar" list is not empty.
await signIn(people.sardor.email, { name: 'iPhone 15', os: 'iOS 18' }, people.sardor);
await signIn(people.sardor.email, { name: 'Firefox · Ubuntu', os: 'Ubuntu 24.04' }, people.sardor);

for (const [key, file] of [['sardor', 'avatar-sardor.jpg'], ['dilnoza', 'photo-dilnoza.jpg'], ['jasur', 'avatar-jasur.jpg']]) {
  await call('POST', '/api/users/me/photo', tokens[key], form('photo', path.join(OUT, file), file, 'image/jpeg'), true);
}

const send = (who, chatId, text, reply) =>
  call('POST', `/api/chats/${chatId}/messages`, tokens[who], { textContent: text, replyToMessageId: reply ?? null });
const privateChat = async (a, b) => (await call('POST', '/api/chats/private', tokens[a], { userId: ids[b] })).id;
const readAll = (who, chatId) => call('GET', `/api/chats/${chatId}/messages?limit=50`, tokens[who]);

// Older conversations first so the most important chats end up on top of the list.
const aziz = await privateChat('sardor', 'aziz');
// Aziz writes in Cyrillic: the transliteration screenshots show this chat in both scripts.
await send('aziz', aziz, 'Ассалому алайкум, Сардор. Эртанги семинар соат нечида?');
await send('sardor', aziz, 'Va alaykum assalom! Soat 14:00 da, 312-xonada.');
await send('aziz', aziz, 'Раҳмат! Ўзбек тилидаги китобларни ҳам олиб келаман, қўшимча машғулот учун керак бўлади.');
await send('sardor', aziz, 'Zo‘r, men esa taqdimot slaydlarini tayyorlab qo‘yaman.');
await readAll('aziz', aziz);

const malika = await privateChat('sardor', 'malika');
await send('malika', malika, 'Guruh chatlarini sinab chiqdim: a’zo qo‘shish, chiqarish va adminlik ishlayapti 👍');
await send('sardor', malika, 'Rahmat! Xatolik topsangiz, yozib qoldiring.');
await send('malika', malika, 'Albatta. Mobil ko‘rinishni ham tekshirib ko‘raman.');
await readAll('sardor', malika);

const bekzod = await privateChat('sardor', 'bekzod');
await send('bekzod', bekzod, 'Sardor, Docker faylni Render’da qanday ishga tushirding?');
await send('sardor', bekzod, 'Render’da “Web Service” yaratib, repozitoriyni ulayman. Dockerfile’ni o‘zi topadi va yig‘adi.');
await send('bekzod', bekzod, 'Tushunarli, bugun o‘zim ham urinib ko‘raman.');

const dilnoza = await privateChat('sardor', 'dilnoza');
await send('dilnoza', dilnoza, 'Salom! Qorong‘i mavzu uchun ranglarni yangiladim, ko‘rib chiqasanmi?');
await send('sardor', dilnoza, 'Salom! Ha, hozir qarayman.');
await call('POST', `/api/chats/${dilnoza}/attachments/images`, tokens['dilnoza'], form('image', path.join(ROOT, 'rasmlar', '2-1-clean-architecture.png'), 'arxitektura.png', 'image/png', 'Aytgancha, arxitektura sxemasini ham chizib qo‘ydim'), true);
await send('sardor', dilnoza, 'Zo‘r chiqibdi, diplomning II bobiga qo‘shaman 🙏');
await readAll('sardor', dilnoza);
await readAll('dilnoza', dilnoza);

const jasur = await privateChat('sardor', 'jasur');
const q = await send('jasur', jasur, 'Sardor, diplomning II bobini tugatdingmi?');
await send('sardor', jasur, 'Ha, arxitektura va ma’lumotlar bazasi qismi tayyor. Hozir UML diagrammalarni chizyapman.');
await call('POST', `/api/chats/${jasur}/attachments/images`, tokens['sardor'], form('image', path.join(ROOT, 'rasmlar', '2-4-er-users-chats.png'), 'er-diagramma.png', 'image/png', 'ER-diagrammaning birinchi qismi'), true);
await send('jasur', jasur, 'Juda tushunarli chiqibdi. groups jadvali chats bilan birga-bir bog‘langanmi?');
await send('sardor', jasur, 'Ha, ChatId ustunida unique indeks bor. Shuning uchun har bir guruh chatida faqat bitta groups yozuvi bo‘ladi.', q.id);
const typo = await send('jasur', jasur, 'Ertaga rahbarga ko‘rsatamizmi?');
await call('PUT', `/api/chats/${jasur}/messages/${typo.id}`, tokens['jasur'], { textContent: 'Ertaga ilmiy rahbarga ko‘rsatamizmi?' });
await readAll('sardor', jasur);
await readAll('jasur', jasur);
await send('jasur', jasur, 'Soat 10:00 da kafedrada kutaman 👍');

// Group chat: Sardor creates it, Jasur becomes admin, Aziz is added later.
const group = await call('POST', '/api/groups', tokens['sardor'], {
  title: '315-21 guruh',
  description: 'TATU, Dasturiy injiniring fakulteti. Diplom ishlari bo‘yicha muhokamalar.',
  memberIds: [ids.jasur, ids.dilnoza, ids.bekzod, ids.malika],
});
const g = group.chatId;
await call('POST', `/api/groups/${g}/photo`, tokens['sardor'], form('photo', path.join(OUT, 'group.jpg'), 'group.jpg', 'image/jpeg'), true);
await call('PUT', `/api/groups/${g}/members/${ids.jasur}/role`, tokens['sardor'], { role: 2 });
await send('sardor', g, 'Assalomu alaykum! Diplom ishlari bo‘yicha savollarni shu yerda muhokama qilamiz.');
await send('dilnoza', g, 'Va alaykum assalom! Antiplagiat tekshiruvi qachon bo‘ladi?');
await send('jasur', g, 'Kafedra e’loniga ko‘ra, keyingi haftaning dushanbasida.');
await send('bekzod', g, 'Taqrizchilar ro‘yxati ham chiqdimi?');
await call('POST', `/api/chats/${g}/attachments/files`, tokens['jasur'], form('file', path.join(ROOT, '..', 'Diplom_ishi_Sohinazarov_Sardor.pdf'), 'BMI_rasmiylashtirish_talablari.pdf', 'application/pdf', 'Rasmiylashtirish talablari shu faylda'), true);
await call('POST', `/api/groups/${g}/members`, tokens['jasur'], { userIds: [ids.aziz] });
await send('aziz', g, 'Qo‘shganingiz uchun rahmat!');
await send('malika', g, 'Men “Milliy chat”ni sinab ko‘rdim, guruhlar juda qulay ishlayapti.');
for (const who of ['jasur', 'dilnoza']) await readAll(who, g);

// The organization group "tuit.uz" was created when Sardor (the first tuit.uz user) signed in; Jasur, Dilnoza
// and Malika joined it automatically. Aziz (gmail.com) can only get in through the invite link.
const chatList = await call('GET', '/api/chats?limit=50', tokens['sardor']);
const domain = chatList.items.find((c) => c.group?.title === 'tuit.uz').id;
await send('sardor', domain, 'Hammaga salom! Bu guruhga faqat @tuit.uz pochtasi bilan kirganlar avtomatik qo‘shiladi.');
await send('dilnoza', domain, 'Qulay ekan, kafedradagi hamma shu yerda bo‘ladi 👍');
await send('malika', domain, 'Ertangi yig‘ilish 312-xonada bo‘ladi.');
const inviteToken = (await call('POST', `/api/groups/${domain}/invite-link`, tokens['sardor'])).inviteToken;

// Stories (24 h). Sardor has seen Dilnoza's story, not Jasur's.
const story = (who, file, caption) =>
  call('POST', '/api/stories', tokens[who], (() => { const d = form('media', path.join(OUT, file), file, 'image/jpeg'); d.append('caption', caption); return d; })(), true);
await story('jasur', 'story-1.jpg', 'Himoyaga tayyorgarlik 💪');
const seen = await story('dilnoza', 'story-2.jpg', 'Kuzgi Toshkent');
await story('sardor', 'story-3.jpg', '“Milliy chat” tayyor!');
await call('POST', `/api/stories/${seen.id}/view`, tokens['sardor']);
await call('POST', `/api/stories/${seen.id}/view`, tokens['malika']);

fs.writeFileSync(path.join(OUT, 'seed.json'), JSON.stringify({ tokens, ids, chats: { jasur, dilnoza, bekzod, malika, aziz, group: g, domain }, inviteToken }, null, 2));
console.log('seed ok', { ids, group: g });
