// Builds the public site diplom.qales.uz into ../sayt (static HTML, no JavaScript):
//   /            — the diploma in Uzbek (main page)
//   /en/, /ru/   — short versions in English and Russian
//   /yoriqnoma/  — README.md as a step-by-step guide for students
//   /llms.txt, /llms-full.txt — plain-text summaries for AI assistants (llmstxt.org)
//   robots.txt, sitemap.xml, 404.html, files/ (diploma PDF, defence slides), img/
// Facts and numbers come from the final PDF (Diplom_ishi_Sohinazarov_Sardor.pdf).
// llms-full.txt needs `pdftotext` (poppler) on PATH.
// Usage: node site.mjs
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { marked } from 'marked';
import { ROOT } from './lib.mjs';

const require = createRequire(import.meta.url);
const sizeOf = require('image-size').imageSize ?? require('image-size');

const SITE = 'https://diplom.qales.uz';
const REPO = path.join(ROOT, '..', '..');
const DIPLOM = path.join(ROOT, '..');
const OUT = path.join(DIPLOM, 'sayt');
const GITHUB = 'https://github.com/SardorSohinazarov/diplom-ish';
const APP = 'https://qales.uz';
const UPDATED = new Date().toISOString().slice(0, 10);

const FILES = {
  pdf: { src: 'Diplom_ishi_Sohinazarov_Sardor.pdf', out: 'files/Milliy-diplom-Sohinazarov.pdf' },
  pptx: { src: 'Himoya_taqdimoti_Sohinazarov_Sardor.pptx', out: 'files/Milliy-himoya-taqdimoti.pptx' },
};

// ───────────────────────────────────────── facts (from the final PDF)

const F = {
  topic: 'Real vaqtda xabar almashish imkonini beruvchi “Milliy” xabarchi ishlab chiqish',
  author: 'Sohinazarov Sardorbek O‘rinboy o‘g‘li',
  authorShort: 'Sardor Sohinazarov',
  authorEn: 'Sardorbek Sohinazarov',
  supervisor: 'Y.Sh. Yuldoshev',
  university: 'Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti',
  universityEn: 'Tashkent University of Information Technologies named after Muhammad al-Khwarizmi',
  universityRu: 'Ташкентский университет информационных технологий имени Мухаммада аль-Хорезми',
  faculty: 'Dasturiy injiniring',
  department: 'Tizimli va amaliy dasturlashtirish',
  major: '60610600 – Dasturiy injiniring',
  year: 2026,
  score: 92,
  pages: 94,
  figures: 41,
  tables: 17,
  refs: 31,
  appendices: 5,
  tests: 810,
  serverTests: 457,
  clientTests: 353,
  dbTables: 43,
};

const ANNOTATION = {
  uz: 'Bitiruv malakaviy ishi foydalanuvchi ma’lumotlarini O‘zbekistondagi serverda saqlaydigan “Milliy” xabarchini ishlab chiqishga bag‘ishlangan. Server .NET muhitida, Entity Framework asosida, brauzer qismi Angular’da yozildi, xabarlar SignalR orqali real vaqtda yetkaziladi. Dasturda shaxsiy va guruh chatlari, fayl almashish, reaksiyalar, lavhalar va forum, lotin–kirill o‘girish, ish e-pochtasi orqali tashkilot guruhlari hamda maxfiy chatlar bor. Chat texnologiyasi Elektron kooperatsiya portalida qo‘llanildi.',
  ru: 'Выпускная квалификационная работа посвящена разработке мессенджера «Milliy», хранящего данные пользователей на серверах в Узбекистане. Сервер написан на платформе .NET с использованием Entity Framework, клиент — на Angular, сообщения доставляются в реальном времени через SignalR. Реализованы личные и групповые чаты, обмен файлами, реакции, истории и форум, перевод между латиницей и кириллицей, группы организаций по рабочей почте и секретные чаты. Технология чата применена на портале «Электронная кооперация».',
  en: 'The graduation thesis develops “Milliy”, a messenger that keeps user data on servers inside Uzbekistan. The server is written on the .NET platform with Entity Framework, the client in Angular, and messages are delivered in real time via SignalR. The application provides private and group chats, file sharing, reactions, stories and a forum, Latin–Cyrillic conversion, organization groups based on work e-mail and secret chats. The chat technology is used in the “Electronic Cooperation” portal.',
};

const TOC = [
  ['Kirish', []],
  ['I bob. Zamonaviy messenjerlar va milliy messenjer yaratish zaruriyati', [
    '1.1. Messenjerlarning rivojlanishi va mavjud messenjerlar tahlili',
    '1.2. Axborot xavfsizligi va real vaqtda aloqa texnologiyalari',
    '1.3. Masalaning qo‘yilishi',
  ]],
  ['II bob. “Milliy” xabarchini loyihalash', [
    '2.1. Texnologiyalar tanlovi va tizim arxitekturasi',
    '2.2. Ma’lumotlar bazasi va UML modellari',
    '2.3. Xavfsizlik va maxfiy chatlar protokoli',
  ]],
  ['III bob. “Milliy” xabarchini ishlab chiqish', [
    '3.1. Server qismini ishlab chiqish',
    '3.2. Klient qismi va foydalanuvchi imkoniyatlari',
    '3.3. Joylashtirish, testlash va foydalanish yo‘riqnomasi',
    '3.4. Amaliy joriy etish va rivojlantirish istiqbollari',
  ]],
  ['IV bob. Hayot faoliyati xavfsizligi', [
    '4.1. Dasturchining ergonomik ish joyini tashkil etish',
    '4.2. Evakuatsiya tadbirlarini rejalashtirish hamda avariya va yong‘inlar sodir bo‘lganda xodimlarning harakatlari',
  ]],
  ['Xulosa', []],
  ['Foydalanilgan adabiyotlar (31 ta)', []],
  ['Ilovalar (5 ta)', []],
];

const FEATURES = [
  {
    img: '3-20-script-latin.jpg',
    title: 'Lotin ↔ kirill avtomatik o‘girish',
    text: 'Har kim xabarni o‘zi o‘rgangan yozuvda o‘qiydi. Qidiruv ikkala yozuvda ham topadi: lotincha so‘z kirillcha xabarni ham chiqaradi. Algoritm o‘zbek imlosining murakkab joylarini hisobga oladi (masalan, “е” so‘z boshida “ye”).',
  },
  {
    img: '3-26-secret-chat.jpg',
    title: 'Maxfiy chatlar (uchdan-uchgacha shifrlash)',
    text: 'Xabar foydalanuvchi brauzerida shifrlanadi va faqat suhbatdosh brauzerida ochiladi. Server xabar mazmunini ko‘rmaydi va saqlamaydi.',
  },
  {
    img: '3-22-organization-group.jpg',
    title: 'Tashkilot rejimi',
    text: 'Ish e-pochtasi bilan kirgan odam o‘z tashkilotining yopiq guruhiga avtomatik qo‘shiladi. Tashkilotni oldindan ro‘yxatdan o‘tkazish shart emas.',
  },
  {
    img: '3-05-private-chat.jpg',
    title: 'Shaxsiy va guruh chatlari',
    text: 'Xabarlar real vaqtda yetkaziladi, “yozmoqda” va “o‘qildi” belgilari, fayl almashish, javob berish, qidiruv va onlayn holat bor.',
  },
  {
    img: '3-33-forum-feed.jpg',
    title: 'Forum',
    text: 'Ochiq fikr almashish uchun qisqa postlar, javoblar, iqtibos, layk, obunalar va jonli bildirishnomalar. Top lenta mashhurlik va yoshga qarab tartiblanadi.',
  },
  {
    img: '3-30-reactions.jpg',
    title: 'Reaksiyalar, lavhalar, bloklash',
    text: 'Xabarlarga reaksiya qo‘yish, lavhalar (stories), keraksiz odamni bloklash va kompyuter ekranidagi bildirishnomalar.',
  },
];

const TECH = [
  ['Server', '.NET 8, ASP.NET Core, Entity Framework Core, Clean Architecture (4 qatlam)'],
  ['Ma’lumotlar bazasi', `PostgreSQL — o‘n bitta guruhga ajratilgan ${F.dbTables} ta jadval`],
  ['Real vaqt', 'SignalR (WebSocket; ishlamasa boshqa usulga o‘zi o‘tadi)'],
  ['Brauzer qismi', 'Angular, PWA (service worker, IndexedDB kesh)'],
  ['Kirish', 'Parolsiz: e-pochtaga bir martalik kod yoki Google hisobi; kodlar xesh ko‘rinishida saqlanadi'],
  ['Testlar', `${F.tests} ta avtomatik test: server ${F.serverTests} (xUnit), brauzer ${F.clientTests} (Vitest)`],
  ['Joylashtirish', 'VPS, Docker Compose, Caddy (HTTPS), GitHub Actions'],
];

const RESULTS = [
  'Telegram, WhatsApp, Signal, WeChat va mahalliy Humo messenjerlari solishtirildi. Xorijiy messenjerlar ma’lumotni chet elda saqlaydi, Humo esa pullik va faqat davlat xodimlari uchun; hech biri o‘zbek tilining ikki yozuvini hisobga olmaydi.',
  'Server .NET muhitida, Entity Framework asosida yozildi va to‘rt qatlamga bo‘lindi: baza yoki texnologiya almashganda asosiy qoidalar o‘zgarmaydi.',
  'Parolsiz kirish: e-pochta kodi yoki Google hisobi. Foydalanuvchi qaysi qurilmalardan kirilganini ko‘radi va begona qurilmani chiqarib yubora oladi.',
  'Shaxsiy va guruh chatlari, fayl almashish, reaksiyalar, lavhalar, forum, bloklash va bildirishnomalar ishlaydi; interfeys telefon va kompyuterda qulay, yorug‘ va qorong‘i rejimli.',
  'Uchta o‘ziga xos imkoniyat: lotin–kirill o‘girish, tashkilot rejimi va maxfiy chatlar.',
  'Sekin internetga moslashuv: rasmlar yuborishdan oldin siqiladi, videoning 360p nusxasi beriladi, aloqa uzilganda xabarlar navbatda saqlanib, tiklanganda yuboriladi.',
  `Dastur VPS serverda Docker yordamida ishlaydi va ${F.tests} ta avtomatik test bilan tekshirilgan.`,
  'Chat texnologiyasi amaliyotda qo‘llanildi: uning asosida Elektron kooperatsiya portalida kompaniyalar o‘rtasidagi chat moduli ishlab chiqildi.',
];

const FUTURE = [
  'Sun’iy intellekt yordamchisi: yozishmaning qisqacha mazmuni, javob variantlari, ovozli xabarni matnga aylantirish, tarjima, imlo tuzatish, spamni aniqlash.',
  'Xabarchi ichida bozor: do‘konlar, kompaniyalar o‘rtasida auksion va tenderlar; shaffoflik blokcheyn bilan ta’minlanadi.',
  'Ovozli xabarlar va qo‘ng‘iroqlar, kanallar va botlar, OneID orqali shaxsni tasdiqlash, mobil ilovalar.',
];

const FAQ = [
  ['“Milliy” messenjeri nima?', `“Milliy” — foydalanuvchi ma’lumotlarini O‘zbekistondagi serverda saqlaydigan, xabarlarni real vaqtda yetkazadigan veb-messenjer. U ${F.authorShort}ning bitiruv malakaviy ishi (diplom loyihasi) sifatida yaratilgan va ${APP.replace('https://', '')} manzilida ishlab turibdi.`],
  ['Diplom ishini kim yozgan va qayerda himoya qilingan?', `Muallif — ${F.author}. Ish ${F.university}, “${F.faculty}” fakulteti, “${F.department}” kafedrasida ${F.year}-yilda bajarilgan. Ilmiy rahbar — ${F.supervisor}. Diplom ${F.score} ball bilan himoya qilingan.`],
  ['Qanday texnologiyalar ishlatilgan?', 'Server .NET 8 (ASP.NET Core, Entity Framework Core) va PostgreSQL’da, brauzer qismi Angular’da yozilgan. Xabarlar SignalR orqali real vaqtda yetkaziladi. Dastur Docker Compose, Caddy va GitHub Actions yordamida VPS serverga joylashtirilgan.'],
  ['Humo yoki Telegram’dan farqi nimada?', 'Telegram va WhatsApp ma’lumotlarni chet elda saqlaydi. Humo Telegram’ning ochiq kodi asosida qilingan, pullik va faqat davlat xodimlari uchun. “Milliy” esa noldan yozilgan, bepul, istalgan tashkilot o‘z serveriga o‘rnata oladi, lotin–kirill o‘girish, tashkilot rejimi va maxfiy chatlarga ega.'],
  ['Maxfiy chat qanday ishlaydi?', 'Ikki foydalanuvchi brauzeri kalitlar juftini yaratadi va faqat ochiq kalitlarni almashadi. Ulardan umumiy maxfiy kalit hosil qilinadi va xabar brauzerning o‘zida shifrlanadi. Server faqat shifrlangan ma’lumotni uzatadi va mazmunini bilmaydi.'],
  ['Diplom ishini qayerdan yuklab olsa bo‘ladi?', `To‘liq matn (PDF, ${F.pages} bet) va himoya taqdimoti shu saytning “Yuklab olish” bo‘limida. Diplom qanday tayyorlangani haqidagi yo‘riqnoma esa /yoriqnoma/ sahifasida.`],
];

// ───────────────────────────────────────── helpers

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (rel, content) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const copy = (src, rel) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.copyFileSync(src, file);
};
const mb = (file) => `${(fs.statSync(file).size / 1024 / 1024).toFixed(1)} MB`;

const usedImages = new Set();
function img(name, alt, { eager = false } = {}) {
  usedImages.add(name);
  const { width, height } = sizeOf(fs.readFileSync(path.join(ROOT, 'rasmlar', name)));
  return `<img src="/img/${name}" alt="${esc(alt)}" width="${width}" height="${height}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
}

const LANGS = { uz: '/', en: '/en/', ru: '/ru/' };
const HREFLANG = { uz: 'uz', en: 'en', ru: 'ru' };

function page({ lang, url, title, description, body, jsonld, nav = true, alternates = true }) {
  const canonical = SITE + url;
  const navLabels = {
    uz: [['#haqida', 'Diplom haqida'], ['#imkoniyatlar', 'Imkoniyatlar'], ['#natijalar', 'Natijalar'], ['/yoriqnoma/', 'Yo‘riqnoma'], ['#yuklab-olish', 'Yuklab olish']],
    en: [['#about', 'About'], ['#features', 'Features'], ['#download', 'Download'], ['/', 'Full version (Uzbek)']],
    ru: [['#about', 'О работе'], ['#features', 'Возможности'], ['#download', 'Скачать'], ['/', 'Полная версия (узб.)']],
  }[lang];
  const navHtml = nav
    ? navLabels.map(([href, label]) => `<a href="${href.startsWith('#') && url !== LANGS[lang] ? LANGS[lang] + href : href}"${href === url ? ' aria-current="page"' : ''}>${label}</a>`).join('')
    : '';
  const langLinks = Object.entries(LANGS)
    .map(([l, u]) => `<a href="${u}" hreflang="${l}"${l === lang && url === u ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`)
    .join('');
  const alt = alternates
    ? Object.entries(LANGS).map(([l, u]) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}${u}">`).join('\n') +
      `\n<link rel="alternate" hreflang="x-default" href="${SITE}/">`
    : '';
  const ogLocale = { uz: 'uz_UZ', en: 'en_US', ru: 'ru_RU' }[lang];
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(F.author)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${canonical}">
${alt}
<meta property="og:type" content="article">
<meta property="og:site_name" content="“Milliy” xabarchi — diplom loyihasi">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#4f46e5">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/style.css">
<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">${{ uz: 'Asosiy matnga o‘tish', en: 'Skip to content', ru: 'К содержимому' }[lang]}</a>
<header class="top"><div class="wrap">
<a class="brand" href="${LANGS[lang]}"><img src="/favicon.svg" alt="" width="26" height="26">Milliy · ${{ uz: 'diplom', en: 'thesis', ru: 'диплом' }[lang]}</a>
<nav class="main" aria-label="${{ uz: 'Bo‘limlar', en: 'Sections', ru: 'Разделы' }[lang]}">${navHtml}</nav>
<div class="langs">${langLinks}</div>
</div></header>
<main id="main">
${body}
</main>
<footer><div class="wrap">
<span>© ${F.year} ${esc(F.author)}. ${{ uz: 'Bitiruv malakaviy ishi', en: 'Graduation thesis', ru: 'Выпускная квалификационная работа' }[lang]}, ${{ uz: 'TATU', en: 'TUIT', ru: 'ТУИТ' }[lang]}.</span>
<span><a href="${APP}">qales.uz</a> · <a href="/yoriqnoma/">${{ uz: 'Yo‘riqnoma', en: 'Guide (Uzbek)', ru: 'Руководство (узб.)' }[lang]}</a> · <a href="/llms.txt">llms.txt</a> · <a href="${GITHUB}">GitHub</a> · ${{ uz: 'Yangilangan', en: 'Updated', ru: 'Обновлено' }[lang]}: ${UPDATED}</span>
</div></footer>
</body>
</html>
`;
}

// ───────────────────────────────────────── structured data (schema.org)

const person = {
  '@type': 'Person',
  '@id': `${SITE}/#author`,
  name: F.author,
  alternateName: [F.authorShort, F.authorEn, 'S.O. Sohinazarov'],
  affiliation: { '@id': `${SITE}/#university` },
  sameAs: ['https://github.com/SardorSohinazarov'],
};
const university = {
  '@type': 'CollegeOrUniversity',
  '@id': `${SITE}/#university`,
  name: F.university,
  alternateName: ['TATU', 'TUIT', F.universityEn],
  address: { '@type': 'PostalAddress', addressLocality: 'Toshkent', addressCountry: 'UZ' },
};
const app = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE}/#app`,
  name: 'Milliy',
  alternateName: ['“Milliy” xabarchi', 'Milliy messenjer', 'Milliy chat', 'NationalChat'],
  url: APP,
  applicationCategory: 'CommunicationApplication',
  operatingSystem: 'Web, PWA',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'UZS' },
  author: { '@id': `${SITE}/#author` },
  description: 'Foydalanuvchi ma’lumotlarini O‘zbekistondagi serverda saqlaydigan real vaqtli veb-messenjer: shaxsiy va guruh chatlari, forum, lotin–kirill o‘girish, tashkilot rejimi, maxfiy chatlar.',
};
const thesis = (lang, abstract) => ({
  '@type': 'Thesis',
  '@id': `${SITE}/#thesis`,
  name: F.topic,
  alternateName: 'Real-time messenger “Milliy” (graduation thesis)',
  inLanguage: 'uz',
  author: { '@id': `${SITE}/#author` },
  contributor: { '@type': 'Person', name: F.supervisor, roleName: 'Ilmiy rahbar' },
  sourceOrganization: { '@id': `${SITE}/#university` },
  datePublished: String(F.year),
  numberOfPages: F.pages,
  abstract,
  about: [{ '@id': `${SITE}/#app` }, 'Messenjer', 'Real vaqtda xabar almashish', 'SignalR', '.NET', 'Angular', 'Uchdan-uchgacha shifrlash'],
  keywords: 'Milliy messenjer, diplom ishi, bitiruv malakaviy ishi, messenjer, SignalR, .NET, Angular, PostgreSQL, maxfiy chat, lotin kirill, TATU',
  encoding: { '@type': 'MediaObject', contentUrl: `${SITE}/${FILES.pdf.out}`, encodingFormat: 'application/pdf' },
  url: SITE + LANGS[lang],
});
const website = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: '“Milliy” xabarchi — diplom loyihasi', inLanguage: ['uz', 'en', 'ru'] };
const faqLd = { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

// ───────────────────────────────────────── pages

function downloads(lang) {
  const pdf = path.join(DIPLOM, FILES.pdf.src);
  const pptx = path.join(DIPLOM, FILES.pptx.src);
  const t = {
    uz: [['Diplom ishi — to‘liq matn', `PDF, ${F.pages} bet, ${mb(pdf)}`], ['Himoya taqdimoti', `PowerPoint, ${mb(pptx)}`], ['Ishlab turgan dastur', 'qales.uz — brauzerda ochiladi'], ['Diplom qanday tayyorlangan', 'Talabalar uchun yo‘riqnoma']],
    en: [['Full thesis (in Uzbek)', `PDF, ${F.pages} pages, ${mb(pdf)}`], ['Defence slides (in Uzbek)', `PowerPoint, ${mb(pptx)}`], ['Live application', 'qales.uz — opens in the browser'], ['How the thesis was prepared', 'Guide for students (in Uzbek)']],
    ru: [['Полный текст работы (на узб.)', `PDF, ${F.pages} стр., ${mb(pdf)}`], ['Презентация защиты (на узб.)', `PowerPoint, ${mb(pptx)}`], ['Работающее приложение', 'qales.uz — открывается в браузере'], ['Как готовился диплом', 'Руководство для студентов (на узб.)']],
  }[lang];
  const hrefs = [`/${FILES.pdf.out}`, `/${FILES.pptx.out}`, APP, '/yoriqnoma/'];
  return `<div class="downloads">${t.map(([b, s], i) => `<a class="dl" href="${hrefs[i]}"${i < 2 ? ' download' : ''}><b>${b}</b><span>${s}</span></a>`).join('')}</div>`;
}

function statsHtml(labels) {
  const values = [F.pages, F.figures, F.tables, F.refs, F.tests, F.dbTables];
  return `<div class="stats">${values.map((v, i) => `<div class="stat"><b>${v}</b><span>${labels[i]}</span></div>`).join('')}</div>`;
}

function uzPage() {
  const body = `
<section class="hero"><div class="wrap">
<div class="eyebrow">Bitiruv malakaviy ishi · Diplom loyihasi · ${F.year}</div>
<h1>${esc(F.topic)}</h1>
<p class="lead">Foydalanuvchi ma’lumotlarini O‘zbekistondagi serverda saqlaydigan, xabarlarni real vaqtda yetkazadigan “Milliy” veb-messenjeri: loyihalash, ishlab chiqish, testlash va joylashtirish.</p>
<div class="score" role="status">🏆 Himoya natijasi: ${F.score} ball</div>
<div class="btns">
<a class="btn primary" href="/${FILES.pdf.out}" download>Diplomni yuklab olish (PDF)</a>
<a class="btn ghost" href="${APP}">Dasturni ochish — qales.uz</a>
<a class="btn ghost" href="/yoriqnoma/">Diplom qanday tayyorlandi</a>
</div>
<dl class="meta">
<div><dt>Muallif</dt><dd>${esc(F.author)}</dd></div>
<div><dt>Ilmiy rahbar</dt><dd>${esc(F.supervisor)}</dd></div>
<div><dt>Universitet</dt><dd>${esc(F.university)}</dd></div>
<div><dt>Fakultet va kafedra</dt><dd>“${F.faculty}” fakulteti, “${F.department}” kafedrasi</dd></div>
<div><dt>Yo‘nalish</dt><dd>${esc(F.major)}</dd></div>
<div><dt>Yil</dt><dd>${F.year}, Toshkent</dd></div>
</dl>
</div></section>

<section id="haqida"><div class="wrap">
<h2>Diplom haqida qisqacha</h2>
${statsHtml(['bet', 'rasm', 'jadval', 'adabiyot', 'avtomatik test', 'bazadagi jadval'])}
<div class="two mt">
<div>
<h3>Muammo</h3>
<p>O‘zbekistonda muloqotning katta qismi Telegram va WhatsApp’da kechadi. Ikkalasi ham xorijiy kompaniyaniki, shuning uchun millionlab fuqarolarning yozishmalari chet eldagi serverlarda turadi. “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunga ko‘ra esa fuqarolar haqidagi ma’lumotlar respublika hududida saqlanishi kerak.</p>
<p>Mahalliy muqobil — Humo — Telegram’ning ochiq kodi asosida qilingan, pullik va faqat davlat tashkilotlari uchun. Universitet, kompaniya yoki oddiy fuqaro uchun ma’lumotlarni o‘z serverida saqlaydigan, bepul va mustaqil messenjer yo‘q edi. Mavjud messenjerlar o‘zbek tilining ikki yozuvini (lotin va kirill) ham hisobga olmaydi.</p>
</div>
<div>
<h3>Maqsad</h3>
<p>Foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, shaxsiy va guruh suhbatlarida xabarlarni real vaqtda yetkazadigan “Milliy” xabarchini loyihalash va ishlab chiqish. Uni universitet, kompaniya yoki davlat idorasi o‘z serveriga o‘rnatib, ichki aloqa vositasi sifatida ishlatishi mumkin.</p>
<h3>Vazifalar</h3>
<ul class="check">
<li>mashhur messenjerlar va real vaqtda xabar yetkazish usullarini solishtirib, texnologiyalarni tanlash;</li>
<li>talablarni aniqlash, arxitektura, ma’lumotlar bazasi va UML modellarini loyihalash;</li>
<li>parolsiz xavfsiz kirish (e-pochta kodi yoki Google hisobi);</li>
<li>chatlar, fayl almashish, reaksiyalar, lavhalar, forum va onlayn holatni yaratish;</li>
<li>lotin–kirill o‘girish, tashkilot rejimi va maxfiy chatlarni ishlab chiqish;</li>
<li>dasturni serverga joylashtirish va avtomatik testlar bilan tekshirish;</li>
<li>dasturchi ish joyi xavfsizligi va evakuatsiya tartibini ishlab chiqish.</li>
</ul>
</div>
</div>
</div></section>

<section class="alt"><div class="wrap">
<h2>Annotatsiya</h2>
<div class="annot">
<article lang="uz"><h3>Mazmunnoma</h3><p>${esc(ANNOTATION.uz)}</p></article>
<article lang="ru"><h3>Аннотация</h3><p>${esc(ANNOTATION.ru)}</p></article>
<article lang="en"><h3>Annotation</h3><p>${esc(ANNOTATION.en)}</p></article>
</div>
</div></section>

<section id="imkoniyatlar"><div class="wrap">
<h2>Dastur imkoniyatlari</h2>
<p class="muted">Birinchi uchtasi — “Milliy”ni boshqa messenjerlardan ajratib turadigan o‘ziga xos imkoniyatlar. Rasmlar diplomdagi skrinshotlardan olingan.</p>
<div class="cards">
${FEATURES.map((f) => `<article class="card">${img(f.img, f.title)}<div class="body"><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div></article>`).join('\n')}
</div>
</div></section>

<section class="alt" id="arxitektura"><div class="wrap">
<h2>Arxitektura va texnologiyalar</h2>
<div class="two">
<div>
<div class="table-scroll"><table><thead><tr><th>Qism</th><th>Texnologiya</th></tr></thead><tbody>
${TECH.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}
</tbody></table></div>
<p>Server to‘rt qatlamga bo‘lingan (Clean Architecture): dasturning asosiy qoidalari ma’lumotlar bazasi yoki texnologiya almashganda o‘zgarmaydi. Sekin internet uchun rasmlar yuborishdan oldin siqiladi, videoning 360p nusxasi beriladi, aloqa uzilganda xabarlar navbatda saqlanadi.</p>
</div>
<div>
<figure>${img('2-1-clean-architecture.png', 'Server arxitekturasi: to‘rt qatlam')}<figcaption>Server qatlamlari (Clean Architecture)</figcaption></figure>
<figure>${img('2-12-secret-handshake.png', 'Maxfiy chatda kalit almashish sxemasi')}<figcaption>Maxfiy chatda kalit almashish</figcaption></figure>
</div>
</div>
</div></section>

<section id="mundarija"><div class="wrap">
<h2>Mundarija</h2>
<ol class="toc">
${TOC.map(([h, subs]) => `<li>${esc(h)}${subs.length ? `<ol>${subs.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}</li>`).join('\n')}
</ol>
</div></section>

<section class="alt" id="natijalar"><div class="wrap">
<h2>Natijalar</h2>
<div class="two">
<div><ul class="check">${RESULTS.map((r) => `<li>${esc(r)}</li>`).join('')}</ul></div>
<div>
<h3 class="first">Amaliy joriy etish</h3>
<p>Diplomda yaratilgan chat texnologiyasi asosida Elektron kooperatsiya portalida kompaniyalar o‘rtasida yozishish uchun chat moduli ishlab chiqildi. Dastur o‘zi esa <a href="${APP}">qales.uz</a> manzilida ishlab turibdi.</p>
<h3>Keyingi bosqich</h3>
<ul>${FUTURE.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
<h3>Himoya</h3>
<p>Diplom loyihasi ${F.year}-yilda himoya qilindi va <b>${F.score} ball</b> bilan baholandi.</p>
</div>
</div>
</div></section>

<section id="savollar"><div class="wrap">
<h2>Ko‘p beriladigan savollar</h2>
${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
</div></section>

<section class="alt" id="yuklab-olish"><div class="wrap">
<h2>Yuklab olish va havolalar</h2>
${downloads('uz')}
</div></section>
`;
  return page({
    lang: 'uz',
    url: '/',
    title: `“Milliy” xabarchi — diplom ishi | ${F.authorShort}, TATU ${F.year}`,
    description: `Bitiruv malakaviy ishi: “Milliy” real vaqtli veb-messenjeri (.NET, Angular, SignalR). Ma’lumotlar O‘zbekistonda saqlanadi; lotin–kirill o‘girish, tashkilot rejimi, maxfiy chatlar. ${F.pages} bet, ${F.tests} test. Himoya: ${F.score} ball.`,
    body,
    jsonld: { '@context': 'https://schema.org', '@graph': [website, thesis('uz', ANNOTATION.uz), person, university, app, faqLd] },
  });
}

function shortPage(lang) {
  const T = {
    en: {
      eyebrow: `Graduation thesis · ${F.year}`,
      h1: 'Development of “Milliy”, a real-time messenger',
      lead: 'A web messenger that keeps user data on servers inside Uzbekistan and delivers messages in real time: analysis, design, implementation, testing and deployment.',
      score: `Defended with ${F.score} points`,
      pdf: 'Download the thesis (PDF, Uzbek)',
      open: 'Open the app — qales.uz',
      meta: [['Author', F.authorEn], ['Supervisor', F.supervisor], ['University', F.universityEn], ['Faculty / department', 'Software Engineering / Systems and Applied Programming'], ['Year', `${F.year}, Tashkent`]],
      about: 'About the thesis',
      stats: ['pages', 'figures', 'tables', 'references', 'automated tests', 'database tables'],
      annotation: 'Annotation',
      features: 'What is special about Milliy',
      list: [
        ['Latin ↔ Cyrillic conversion', 'Every user reads messages in the Uzbek script they prefer, and search finds messages written in either script.'],
        ['Secret chats (end-to-end encryption)', 'Messages are encrypted in the sender’s browser and decrypted only in the recipient’s browser; the server never sees the content.'],
        ['Organization mode', 'Users who sign in with a work e-mail join their organization’s closed group automatically.'],
        ['Data stays in the country', 'Any organization can run Milliy on its own server and keep full control over its correspondence.'],
        ['Messenger features', 'Private and group chats, file sharing, reactions, stories, a forum, blocking, desktop notifications, light and dark themes.'],
        ['Slow-network friendly', 'Images are compressed before upload, videos get a 360p copy, and messages written offline are queued and sent later.'],
      ],
      tech: `Built with .NET 8 (ASP.NET Core, Entity Framework Core), PostgreSQL, SignalR and Angular; ${F.tests} automated tests; deployed with Docker Compose, Caddy and GitHub Actions on a VPS. The chat technology was also used in the “Electronic Cooperation” portal.`,
      download: 'Download',
      title: `“Milliy” real-time messenger — graduation thesis | ${F.authorEn}, TUIT ${F.year}`,
      desc: `Graduation thesis: “Milliy”, a real-time web messenger (.NET, Angular, SignalR) that keeps data in Uzbekistan, with Latin–Cyrillic conversion, organization mode and end-to-end encrypted chats. Defended with ${F.score} points.`,
    },
    ru: {
      eyebrow: `Выпускная квалификационная работа · ${F.year}`,
      h1: 'Разработка мессенджера «Milliy» для обмена сообщениями в реальном времени',
      lead: 'Веб-мессенджер, хранящий данные пользователей на серверах в Узбекистане и доставляющий сообщения в реальном времени: анализ, проектирование, разработка, тестирование и развёртывание.',
      score: `Защищена на ${F.score} баллов`,
      pdf: 'Скачать работу (PDF, на узб.)',
      open: 'Открыть приложение — qales.uz',
      meta: [['Автор', 'Сохиназаров Сардорбек Уринбой угли'], ['Научный руководитель', F.supervisor], ['Университет', F.universityRu], ['Факультет / кафедра', 'Программный инжиниринг / Системное и прикладное программирование'], ['Год', `${F.year}, Ташкент`]],
      about: 'О работе',
      stats: ['страницы', 'рисунок', 'таблиц', 'источник', 'автотестов', 'таблицы в БД'],
      annotation: 'Аннотация',
      features: 'Чем отличается «Milliy»',
      list: [
        ['Латиница ↔ кириллица', 'Каждый читает сообщения в привычной узбекской письменности, а поиск находит текст, написанный в любой из них.'],
        ['Секретные чаты (сквозное шифрование)', 'Сообщение шифруется в браузере отправителя и расшифровывается только у получателя; сервер не видит содержимое.'],
        ['Режим организации', 'Пользователь, вошедший по рабочей почте, автоматически попадает в закрытую группу своей организации.'],
        ['Данные остаются в стране', 'Любая организация может развернуть «Milliy» на своём сервере и полностью контролировать переписку.'],
        ['Функции мессенджера', 'Личные и групповые чаты, файлы, реакции, истории, форум, блокировка, уведомления, светлая и тёмная темы.'],
        ['Работа при слабом интернете', 'Изображения сжимаются перед отправкой, для видео создаётся копия 360p, сообщения без сети ставятся в очередь.'],
      ],
      tech: `Технологии: .NET 8 (ASP.NET Core, Entity Framework Core), PostgreSQL, SignalR и Angular; ${F.tests} автоматических тестов; развёртывание на VPS с Docker Compose, Caddy и GitHub Actions. Технология чата применена на портале «Электронная кооперация».`,
      download: 'Скачать',
      title: `Мессенджер «Milliy» — выпускная работа | Сохиназаров С., ТУИТ ${F.year}`,
      desc: `Выпускная работа: веб-мессенджер «Milliy» (.NET, Angular, SignalR), хранящий данные в Узбекистане; перевод латиница–кириллица, режим организации, секретные чаты. Защищена на ${F.score} баллов.`,
    },
  }[lang];
  const body = `
<section class="hero"><div class="wrap">
<div class="eyebrow">${T.eyebrow}</div>
<h1>${esc(T.h1)}</h1>
<p class="lead">${esc(T.lead)}</p>
<p class="muted" lang="uz">“${esc(F.topic)}”</p>
<div class="score" role="status">🏆 ${T.score}</div>
<div class="btns"><a class="btn primary" href="/${FILES.pdf.out}" download>${T.pdf}</a><a class="btn ghost" href="${APP}">${T.open}</a></div>
<dl class="meta">${T.meta.map(([d, v]) => `<div><dt>${d}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
</div></section>
<section id="about"><div class="wrap">
<h2>${T.about}</h2>
${statsHtml(T.stats)}
<h3 class="mt">${T.annotation}</h3>
<p>${esc(ANNOTATION[lang])}</p>
<p>${esc(T.tech)}</p>
</div></section>
<section class="alt" id="features"><div class="wrap">
<h2>${T.features}</h2>
<div class="cards">${T.list.map(([h, t]) => `<article class="card"><div class="body"><h3>${esc(h)}</h3><p>${esc(t)}</p></div></article>`).join('')}</div>
</div></section>
<section id="download"><div class="wrap"><h2>${T.download}</h2>${downloads(lang)}</div></section>
`;
  return page({
    lang,
    url: LANGS[lang],
    title: T.title,
    description: T.desc,
    body,
    jsonld: { '@context': 'https://schema.org', '@graph': [website, thesis(lang, ANNOTATION[lang]), person, university, app] },
  });
}

function guidePage() {
  let md = fs.readFileSync(path.join(REPO, 'README.md'), 'utf8');
  // The Mermaid roadmap does not render on a static page; the numbered steps below repeat it anyway.
  md = md.replace(/```mermaid[\s\S]*?```\n?/, '');
  // Files the site serves itself; documents written or signed by other people (review, supervisor's
  // conclusion, the deposited material with co-authors) are named but not linked.
  const LOCAL = { [`diplom/${FILES.pdf.src}`]: `/${FILES.pdf.out}`, [`diplom/${FILES.pptx.src}`]: `/${FILES.pptx.out}` };
  const UNLINKED = /^diplom\/(Taqriz|Rahbar_xulosasi|Deponentlangan_material)/;
  const html = marked.parse(md, { gfm: true })
    .replace(/<a href="(?!https?:|#|mailto:)([^"]+)">([\s\S]*?)<\/a>/g, (m, href, text) => {
      if (LOCAL[href]) return `<a href="${LOCAL[href]}">${text}</a>`;
      if (UNLINKED.test(href)) return text;
      // Other repository-relative links point to GitHub.
      return `<a href="${GITHUB}/blob/master/${href.replace(/^\.\//, '')}">${text}</a>`;
    });
  return page({
    lang: 'uz',
    url: '/yoriqnoma/',
    title: 'Diplom ishi qanday tayyorlanadi va topshiriladi — bosqichma-bosqich yo‘riqnoma',
    description: 'Talabalar uchun amaliy yo‘riqnoma: mavzu tanlashdan himoyagacha 12 bosqich, rahbar izohlari, taqriz, antiplagiat, deponentlash, taqdimot va himoya kuni ro‘yxati. “Milliy” diplom loyihasi tajribasi asosida.',
    body: `<article class="prose">${html}</article>`,
    alternates: false,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Diplom ishini tayyorlash va topshirish',
      inLanguage: 'uz',
      author: { '@type': 'Person', name: F.author },
      step: [...md.matchAll(/^### (\d+)\. (.+)$/gm)].map(([, n, name]) => ({ '@type': 'HowToStep', position: Number(n), name })),
    },
  });
}

function notFound() {
  return page({
    lang: 'uz',
    url: '/404',
    title: 'Sahifa topilmadi — “Milliy” diplom loyihasi',
    description: 'Sahifa topilmadi.',
    alternates: false,
    body: `<section class="hero"><div class="wrap"><h1>Sahifa topilmadi</h1><p class="lead">Bunday sahifa yo‘q. <a href="/">Bosh sahifaga</a> qayting.</p></div></section>`,
  }).replace('content="index, follow, max-image-preview:large"', 'content="noindex"');
}

// ───────────────────────────────────────── text files for AI assistants and crawlers

function llmsTxt() {
  return `# “Milliy” xabarchi — bitiruv malakaviy ishi (diplom loyihasi)

> ${F.author}ning (${F.authorEn}) ${F.university} (${F.universityEn}), “${F.faculty}” fakulteti, “${F.department}” kafedrasidagi ${F.year}-yilgi bitiruv malakaviy ishi. Mavzu: “${F.topic}”. Ilmiy rahbar: ${F.supervisor}. Ish ${F.score} ball bilan himoya qilingan. Natija — foydalanuvchi ma’lumotlarini O‘zbekistondagi serverda saqlaydigan “Milliy” real vaqtli veb-messenjeri, ${APP} manzilida ishlaydi.

Key facts (English): graduation thesis “Development of the real-time messenger Milliy”, author ${F.authorEn}, TUIT, ${F.year}, defended with ${F.score} points. Stack: .NET 8 / ASP.NET Core / Entity Framework Core / PostgreSQL / SignalR (server), Angular (web client). ${F.tests} automated tests (${F.serverTests} server, ${F.clientTests} client). Unique features: Latin↔Cyrillic Uzbek script conversion in display and search, organization mode via work e-mail domain, end-to-end encrypted secret chats. Deployed on a VPS with Docker Compose, Caddy and GitHub Actions. The chat technology was reused in the “Electronic Cooperation” (Elektron kooperatsiya) portal.

Hajm: ${F.pages} bet, ${F.figures} rasm, ${F.tables} jadval, ${F.refs} adabiyot, ${F.appendices} ilova. Ma’lumotlar bazasida ${F.dbTables} ta jadval.

## Asosiy sahifalar

- [Diplom haqida (o‘zbekcha)](${SITE}/): maqsad, vazifalar, imkoniyatlar, arxitektura, mundarija, natijalar, savol-javob
- [About the thesis (English)](${SITE}/en/): short English version
- [О работе (русский)](${SITE}/ru/): краткая версия на русском
- [Diplom qanday tayyorlanadi — yo‘riqnoma](${SITE}/yoriqnoma/): mavzu tanlashdan himoyagacha 12 bosqich, talabalar uchun

## Hujjatlar

- [Diplom ishining to‘liq matni (PDF, o‘zbekcha)](${SITE}/${FILES.pdf.out})
- [Himoya taqdimoti (PPTX)](${SITE}/${FILES.pptx.out})
- [Diplomning to‘liq matni, oddiy matn ko‘rinishida](${SITE}/llms-full.txt)

## Dastur

- [Milliy — ishlab turgan veb-messenjer](${APP})
- [Manba kodlari va diplom generatori (GitHub)](${GITHUB})

## Mundarija

${TOC.map(([h, subs]) => `- ${h}${subs.map((s) => `\n  - ${s}`).join('')}`).join('\n')}

## Natijalar

${RESULTS.map((r) => `- ${r}`).join('\n')}

## Ko‘p beriladigan savollar

${FAQ.map(([q, a]) => `### ${q}\n\n${a}`).join('\n\n')}
`;
}

function llmsFullTxt() {
  const pdf = path.join(DIPLOM, FILES.pdf.src);
  let text;
  try {
    text = execFileSync('pdftotext', ['-enc', 'UTF-8', '-nopgbrk', pdf, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (e) {
    throw new Error(`llms-full.txt uchun pdftotext kerak (poppler-utils): ${e.message}`);
  }
  // From the introduction to the appendices: the title and assignment pages only repeat facts given above,
  // and the appendices are source code.
  const lines = text.split(/\r?\n/);
  // pdftotext puts each paragraph on one line; the table of contents is a single long line.
  const toc = lines.findIndex((l) => l.trim() === 'MUNDARIJA');
  const start = lines.findIndex((l, i) => i > toc && l.trim() === 'KIRISH');
  const end = lines.findLastIndex((l) => l.trim() === 'ILOVALAR');
  if (toc < 0 || start < 0 || end <= start) throw new Error('llms-full.txt: PDF’da KIRISH yoki ILOVALAR topilmadi');
  const body = lines
    .slice(start, end)
    .filter((l) => !/^\s*\d{1,3}\s*$/.test(l)) // page numbers
    .join('\n')
    // A sentence cut by a page break continues on the next page with a lowercase letter.
    .replace(/([^.:;!?\n])\n+(?=[a-zа-яўқғҳʻ‘’“(–])/g, '$1 ')
    .split(/\n+/)
    .join('\n\n');
  return `# ${F.topic}

Bitiruv malakaviy ishi (diplom loyihasi), ${F.year}. Muallif: ${F.author}. Ilmiy rahbar: ${F.supervisor}.
${F.university}, “${F.faculty}” fakulteti, “${F.department}” kafedrasi. Himoya natijasi: ${F.score} ball.
Manba: ${SITE}/${FILES.pdf.out} — quyidagi matn shu PDF’dan avtomatik olingan (kirishdan ilovalargacha; rasm va jadvallar tushib qolgan).

## Annotatsiya

${ANNOTATION.uz}

${ANNOTATION.ru}

${ANNOTATION.en}

## To‘liq matn

${body.trim()}
`;
}

const robots = `# diplom.qales.uz — hamma qidiruv tizimlari va AI yordamchilari uchun ochiq
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: YandexBot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

function sitemap() {
  const urls = [
    ['/', '1.0', true],
    ['/en/', '0.8', true],
    ['/ru/', '0.8', true],
    ['/yoriqnoma/', '0.9', false],
    [`/${FILES.pdf.out}`, '0.7', false],
  ];
  const alts = Object.entries(LANGS).map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${u}"/>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(([u, p, alt]) => `  <url>\n    <loc>${SITE}${u}</loc>\n    <lastmod>${UPDATED}</lastmod>\n    <priority>${p}</priority>\n${alt ? alts + '\n' : ''}  </url>`).join('\n')}
</urlset>
`;
}

// ───────────────────────────────────────── build

// Empty the folder instead of deleting it: a local preview server may hold it open.
fs.mkdirSync(OUT, { recursive: true });
for (const entry of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, entry), { recursive: true, force: true });
write('index.html', uzPage());
write('en/index.html', shortPage('en'));
write('ru/index.html', shortPage('ru'));
write('yoriqnoma/index.html', guidePage());
write('404.html', notFound());
write('llms.txt', llmsTxt());
write('llms-full.txt', llmsFullTxt());
write('robots.txt', robots);
write('sitemap.xml', sitemap());

copy(path.join(ROOT, 'site-assets', 'style.css'), 'style.css');
copy(path.join(ROOT, 'site-assets', 'og.png'), 'img/og.png');
for (const f of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) {
  copy(path.join(ROOT, 'site-assets', f), f);
}
for (const name of usedImages) copy(path.join(ROOT, 'rasmlar', name), `img/${name}`);
for (const { src, out } of Object.values(FILES)) copy(path.join(DIPLOM, src), out);

const count = (dir) => fs.readdirSync(dir, { recursive: true }).filter((f) => fs.statSync(path.join(dir, f)).isFile()).length;
console.log(`Sayt tayyor: ${path.relative(process.cwd(), OUT) || OUT} (${count(OUT)} ta fayl)`);
