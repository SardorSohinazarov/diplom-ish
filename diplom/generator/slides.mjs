// Builds ../Taqdimot_Sohinazarov_Sardor.pptx — the defence presentation — from the same figures as the diploma.
// Usage: node slides.mjs
import fs from 'node:fs';
import path from 'node:path';
import pptxgen from 'pptxgenjs';

import { ROOT } from './lib.mjs';
import { renderIcons } from './tools/icons.mjs';

const OUT = path.join(ROOT, '..', 'Taqdimot_Sohinazarov_Sardor.pptx');
const TOPIC = '“Milliy chat” dasturini ishlab chiqish';
const TOTAL = 20;

// Palette taken from the application itself (indigo accent of the chat UI).
const C = {
  ink: '1E1B4B', // dark indigo: title/closing backgrounds, headings
  pri: '4F46E5', // accent
  tint: 'EEF2FF',
  tint2: 'E0E7FF',
  tint3: 'C7D2FE',
  tint4: 'A5B4FC',
  text: '1F2937',
  muted: '6B7280',
  line: 'E5E7EB',
  white: 'FFFFFF',
  ok: '059669',
};
const F = 'Arial';
const W = 13.333;
const M = 0.6; // side margin
const CW = W - 2 * M; // content width

// ───────────────────────────────────────── helpers

const ICONS = [
  ...['landmark', 'database', 'globe', 'target', 'shield-check', 'mail', 'key-round', 'lock-keyhole', 'monitor-smartphone', 'server', 'monitor', 'container', 'users', 'crown', 'shield', 'user', 'search', 'circle-play', 'user-pen', 'phone', 'lock', 'bot', 'bell', 'smartphone', 'trending-up', 'armchair', 'lightbulb', 'wind', 'door-open', 'zap', 'check']
    .map((n) => [n, C.white]),
  ['check', C.ok],
  ['arrow-right', C.pri],
];
const icon = await renderIcons(ICONS);

/** Pixel size of a PNG/JPEG, used to fit screenshots and diagrams without distortion. */
function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  let i = 2;
  while (i < b.length) {
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
    i += 2 + len;
  }
  throw new Error(`size not found: ${file}`);
}

const pic = (name) => path.join(ROOT, 'rasmlar', name);

/** Largest box with the image's aspect ratio (or of its crop, given as [x, y, w, h] fractions) that fits in w × h. */
function fit(name, w, h, crop = [0, 0, 1, 1]) {
  const { w: pw, h: ph } = imageSize(pic(name));
  const r = (pw * crop[2]) / (ph * crop[3]);
  return w / h > r ? { w: h * r, h } : { w, h: w / r };
}

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Sohinazarov Sardor';
pres.title = TOPIC;
pres.theme = { headFontFace: F, bodyFontFace: F };

const text = (slide, value, opts) => slide.addText(value, { fontFace: F, color: C.text, margin: 0, isTextBox: true, ...opts });

/** Content slide: white background, title, footer with topic and slide number. */
function contentSlide(n, title) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  text(s, title, { x: M, y: 0.4, w: CW, h: 0.8, fontSize: 30, bold: true, color: C.ink, valign: 'middle' });
  text(s, TOPIC, { x: M, y: 6.98, w: 8, h: 0.3, fontSize: 10, color: C.muted });
  text(s, `${n} / ${TOTAL}`, { x: W - M - 2, y: 6.98, w: 2, h: 0.3, fontSize: 10, color: C.muted, align: 'right' });
  return s;
}

/** Icon inside a filled circle — the deck's recurring motif. */
function badge(s, name, x, y, d = 0.6, fill = C.pri) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: 'none' } });
  const p = d * 0.25;
  s.addImage({ path: icon(name, C.white), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p });
}

/** Numbered circle. */
function num(s, n, x, y, d = 0.5, fill = C.pri) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: 'none' } });
  text(s, String(n), { x, y, w: d, h: d, fontSize: d * 30, bold: true, color: C.white, align: 'center', valign: 'middle' });
}

/** Screenshot/diagram in a thin frame with a soft shadow, fitted inside the given box and aligned in it. */
function framed(s, name, x, y, w, h, { align = 'center', valign = 'top', crop } = {}) {
  const f = fit(name, w, h, crop);
  const fx = align === 'center' ? x + (w - f.w) / 2 : align === 'right' ? x + w - f.w : x;
  const fy = valign === 'middle' ? y + (h - f.h) / 2 : valign === 'bottom' ? y + h - f.h : y;
  s.addShape(pres.shapes.RECTANGLE, {
    x: fx, y: fy, w: f.w, h: f.h,
    fill: { color: C.white },
    line: { color: C.line, width: 0.75 },
    shadow: { type: 'outer', color: '000000', opacity: 0.12, blur: 8, offset: 2, angle: 90 },
  });
  if (crop) {
    // pptxgenjs crop: w/h is the full image size, sizing is the visible window inside it (inches).
    const fullW = f.w / crop[2], fullH = f.h / crop[3];
    s.addImage({ path: pic(name), x: fx, y: fy, w: fullW, h: fullH, sizing: { type: 'crop', x: crop[0] * fullW, y: crop[1] * fullH, w: f.w, h: f.h } });
  } else {
    s.addImage({ path: pic(name), x: fx, y: fy, w: f.w, h: f.h });
  }
  return { x: fx, y: fy, w: f.w, h: f.h };
}

/** Caption pill laid over the bottom-left (or top-left) corner of a screenshot. */
function pill(s, label, box, width, { top = false } = {}) {
  const w = width ?? Math.min(box.w - 0.3, 0.2 + label.length * 0.095);
  const y = top ? box.y + 0.14 : box.y + box.h - 0.5;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: box.x + 0.15, y, w, h: 0.36, rectRadius: 0.18,
    fill: { color: C.ink }, line: { type: 'none' },
  });
  text(s, label, { x: box.x + 0.15, y, w, h: 0.36, fontSize: 12, bold: true, color: C.white, align: 'center', valign: 'middle' });
}

/** Rounded card with a light tint. */
const card = (s, x, y, w, h, fill = C.tint) =>
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { type: 'none' } });

/** Icon row: badge, bold heading, muted description. */
function iconRow(s, name, head, desc, x, y, w, { d = 0.6, headSize = 17, descSize = 14, fill } = {}) {
  badge(s, name, x, y, d, fill);
  text(s, head, { x: x + d + 0.25, y: y - 0.02, w: w - d - 0.25, h: 0.36, fontSize: headSize, bold: true, color: C.ink });
  if (desc) text(s, desc, { x: x + d + 0.25, y: y + 0.36, w: w - d - 0.25, h: 0.62, fontSize: descSize, color: C.muted, valign: 'top' });
}

const cell = (t, o = {}) => ({ text: t, options: { fontFace: F, fontSize: 13, color: C.text, valign: 'middle', margin: [0.04, 0.08, 0.04, 0.08], ...o } });

// ───────────────────────────────────────── 1. Titul
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  text(s, [
    { text: 'O‘ZBEKISTON RESPUBLIKASI RAQAMLI TEXNOLOGIYALAR VAZIRLIGI', options: { breakLine: true } },
    { text: 'MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI', options: { breakLine: true } },
    { text: '“Tizimli va amaliy dasturlash” kafedrasi' },
  ], { x: M, y: 0.35, w: CW, h: 0.95, fontSize: 13, color: C.tint3, align: 'center', lineSpacingMultiple: 1.15 });

  text(s, 'BITIRUV MALAKAVIY ISHI', { x: M, y: 1.95, w: 6.6, h: 0.4, fontSize: 16, bold: true, color: C.tint4, charSpacing: 3 });
  text(s, TOPIC, { x: M, y: 2.4, w: 6.6, h: 1.7, fontSize: 40, bold: true, color: C.white, valign: 'top' });
  text(s, 'Telegramga o‘xshash milliy veb-messenjer', { x: M, y: 4.15, w: 6.6, h: 0.45, fontSize: 20, color: C.tint3 });

  text(s, [
    { text: 'Bajardi:  ', options: { color: C.tint4 } },
    { text: 'S.O. Sohinazarov', options: { bold: true, breakLine: true } },
    { text: 'Ilmiy rahbar:  ', options: { color: C.tint4 } },
    { text: '________________', options: { bold: true } },
  ], { x: M, y: 5.05, w: 6.6, h: 0.9, fontSize: 16, color: C.white, lineSpacingMultiple: 1.4 });

  const shot = fit('3-05-private-chat.jpg', 5.3, 3.4);
  s.addImage({ path: pic('3-05-private-chat.jpg'), x: W - M - shot.w, y: 1.95, w: shot.w, h: shot.h,
    shadow: { type: 'outer', color: '000000', opacity: 0.35, blur: 14, offset: 4, angle: 90 } });

  text(s, 'Toshkent – 2026', { x: M, y: 6.75, w: CW, h: 0.4, fontSize: 14, bold: true, color: C.tint3, align: 'center' });
  s.addNotes(
    'Assalomu alaykum, hurmatli komissiya a’zolari! Mening ismim Sohinazarov Sardor. Bitiruv malakaviy ishimning mavzusi — “Milliy chat” dasturini ishlab chiqish. Ish doirasida Telegramga o‘xshash, foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan veb-messenjer loyihalandi va to‘liq ishlaydigan holatga keltirildi. Ekranning o‘ng tomonida dasturning haqiqiy interfeysi ko‘rsatilgan.',
  );
}

// ───────────────────────────────────────── 2. Dolzarbligi
{
  const s = contentSlide(2, 'Mavzuning dolzarbligi');
  const rows = [
    ['landmark', '“Raqamli O‘zbekiston – 2030” strategiyasi', 'PF-6079-son Farmon: mahalliy dasturiy mahsulotlar va axborot xavfsizligi ustuvor vazifa'],
    ['database', 'Ma’lumotlarni lokalizatsiya qilish talabi', '“Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonun: fuqarolar ma’lumotlari respublika hududida saqlanishi kerak'],
    ['globe', 'Xorijiy messenjerlarga bog‘liqlik', 'Telegram, WhatsApp, Signal, WeChat — barchasi xorijiy yurisdiksiyada, ma’lumotlar mamlakatdan tashqarida'],
  ];
  rows.forEach(([ic, h, d], i) => iconRow(s, ic, h, d, M, 1.65 + i * 1.6, 7.0, { d: 0.7 }));

  card(s, 8.2, 1.55, W - M - 8.2, 4.95, C.tint);
  text(s, 'Yechim — “Milliy chat”', { x: 8.55, y: 1.85, w: 4.0, h: 0.45, fontSize: 20, bold: true, color: C.ink });
  const pros = ['Ma’lumotlar O‘zbekistondagi serverda saqlanadi', 'O‘zbek tilidagi tanish interfeys', 'Kod va arxitektura mahalliy nazoratda', 'Tashkilotlar uchun ichki aloqa vositasi'];
  pros.forEach((t, i) => {
    s.addImage({ path: icon('check', C.ok), x: 8.55, y: 2.72 + i * 0.9, w: 0.34, h: 0.34 });
    text(s, t, { x: 9.05, y: 2.65 + i * 0.9, w: 3.5, h: 0.7, fontSize: 15, color: C.text, valign: 'top' });
  });
  s.addNotes(
    'Mavzuning dolzarbligi uchta omilga asoslanadi. Birinchidan, “Raqamli O‘zbekiston – 2030” strategiyasi mahalliy dasturiy mahsulotlarni rivojlantirishni ustuvor vazifa qilib belgilagan. Ikkinchidan, “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunga ko‘ra fuqarolarimizning ma’lumotlari respublika hududida saqlanishi kerak. Uchinchidan, bugun keng qo‘llanayotgan messenjerlarning barchasi xorijiy kompaniyalarga tegishli va ma’lumotlarni chet elda saqlaydi. “Milliy chat” aynan shu muammoga yechim: ma’lumotlar o‘z serverida, interfeys o‘zbek tilida, kod esa mahalliy nazoratda.',
  );
}

// ───────────────────────────────────────── 3. Maqsad va vazifalar
{
  const s = contentSlide(3, 'Ishning maqsadi va vazifalari');
  card(s, M, 1.45, CW, 1.1, C.ink);
  badge(s, 'target', M + 0.3, 1.7, 0.6, C.pri);
  text(s, 'Maqsad: foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, shaxsiy va guruh yozishmalarini real vaqtda ta’minlaydigan “Milliy chat” veb-messenjerini loyihalash va ishlab chiqish.', {
    x: M + 1.15, y: 1.5, w: CW - 1.4, h: 1.0, fontSize: 16, color: C.white, valign: 'middle',
  });

  const tasks = [
    'Mavjud messenjerlar va real vaqt texnologiyalarini tahlil qilish',
    'Tizimga funksional va nofunksional talablarni aniqlash',
    'Arxitektura, ma’lumotlar bazasi va UML modellarini loyihalash',
    'Xavfsiz autentifikatsiya va sessiyalar tizimini yaratish',
    'Server (.NET 8) va klient (Angular) qismlarini ishlab chiqish',
    'Bulutga joylashtirish, sinash va HFX talablarini ishlab chiqish',
  ];
  const cw = (CW - 2 * 0.3) / 3;
  tasks.forEach((t, i) => {
    const x = M + (i % 3) * (cw + 0.3);
    const y = 2.85 + Math.floor(i / 3) * 1.95;
    card(s, x, y, cw, 1.7, C.tint);
    text(s, String(i + 1).padStart(2, '0'), { x: x + 0.3, y: y + 0.2, w: 1, h: 0.5, fontSize: 26, bold: true, color: C.pri });
    text(s, t, { x: x + 0.3, y: y + 0.75, w: cw - 0.6, h: 0.8, fontSize: 15, color: C.text, valign: 'top' });
  });
  s.addNotes(
    'Ishning maqsadi — ma’lumotlarni o‘z serverida saqlaydigan va real vaqtda ishlaydigan veb-messenjer yaratish. Bunga erishish uchun oltita vazifa qo‘yildi: mavjud yechimlar va texnologiyalarni tahlil qilish, talablarni aniqlash, tizimni loyihalash, xavfsiz autentifikatsiyani yaratish, server va klient qismlarini ishlab chiqish va nihoyat, dasturni bulutga joylashtirib sinash hamda hayot faoliyati xavfsizligi talablarini ishlab chiqish.',
  );
}

// ───────────────────────────────────────── 4. Messenjerlar tahlili
{
  const s = contentSlide(4, 'Mavjud messenjerlar tahlili');
  const head = ['Mezon', 'Telegram', 'WhatsApp', 'Signal', 'WeChat', 'Milliy chat'];
  const body = [
    ['Egasi (davlat)', 'BAA', 'Meta (AQSh)', 'AQSh', 'Tencent (Xitoy)', 'Mahalliy'],
    ['Ro‘yxatdan o‘tish', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', 'E-pochta kodi, Google'],
    ['E2E shifrlash', 'Faqat maxfiy chatlarda', 'Sukut bo‘yicha', 'Sukut bo‘yicha', 'Yo‘q', 'Rejalashtirilgan (TLS bor)'],
    ['Yozishmalar', 'Bulutda', 'Qurilmada', 'Qurilmada', 'Serverda', 'O‘z serverida'],
    ['Server kodi', 'Yopiq', 'Yopiq', 'Ochiq', 'Yopiq', 'Mahalliy nazoratda'],
    ['Ma’lumotlar joyi', 'Xorijda', 'Xorijda', 'Xorijda', 'Xitoyda', 'O‘zbekistonda ham mumkin'],
  ];
  const last = head.length - 1;
  const rows = [
    head.map((h, i) => cell(h, { bold: true, color: C.white, fill: { color: i === last ? C.pri : C.ink }, align: i ? 'center' : 'left' })),
    ...body.map((r, ri) =>
      r.map((t, i) =>
        cell(t, {
          bold: i === 0 || i === last,
          color: i === last ? C.ink : C.text,
          align: i ? 'center' : 'left',
          fill: { color: i === last ? C.tint2 : ri % 2 ? 'F9FAFB' : C.white },
        }),
      ),
    ),
  ];
  s.addTable(rows, {
    x: M, y: 1.5, w: CW, colW: [2.2, 1.9, 1.9, 1.9, 1.9, 2.33], rowH: 0.56,
    border: { type: 'solid', color: C.line, pt: 0.75 },
  });
  card(s, M, 5.7, CW, 0.95, C.tint);
  badge(s, 'globe', M + 0.25, 5.87, 0.6);
  text(s, 'Barcha mashhur messenjerlar ma’lumotlarni xorijda saqlaydi. Foydalanish qulayligi bo‘yicha namuna sifatida Telegram tanlandi.', {
    x: M + 1.1, y: 5.72, w: CW - 1.35, h: 0.9, fontSize: 15, color: C.ink, valign: 'middle',
  });
  s.addNotes(
    'Ishning birinchi bobida mashhur messenjerlar besh mezon bo‘yicha taqqoslandi. Jadvaldan ko‘rinib turibdiki, ularning barchasi xorijiy kompaniyalarga tegishli va ma’lumotlarni mamlakatdan tashqarida saqlaydi. “Milliy chat” esa istalgan serverga, jumladan O‘zbekistondagi data-markazga joylashtirilishi mumkin. Ro‘yxatdan o‘tish SMS o‘rniga elektron pochta va Google orqali amalga oshiriladi. Foydalanish qulayligi va funksionallik bo‘yicha eng yaxshi muvozanatga ega bo‘lgani uchun interfeys namunasi sifatida Telegram tanlandi.',
  );
}

// ───────────────────────────────────────── 5. Real vaqt texnologiyalari
{
  const s = contentSlide(5, 'Real vaqtda aloqa texnologiyalari');
  const head = ['Texnologiya', 'Yo‘nalish', 'Kechikish', 'Brauzerlar'];
  const body = [
    ['Short polling', 'Mijoz → server', 'Yuqori', 'Barchasi'],
    ['Long polling', 'Mijoz → server', 'O‘rtacha', 'Barchasi'],
    ['Server-Sent Events', 'Server → mijoz', 'Past', 'Zamonaviy'],
    ['WebSocket', 'Ikki tomonlama', 'Juda past', 'Zamonaviy'],
    ['SignalR', 'Ikki tomonlama', 'Juda past', 'Barchasi (fallback)'],
  ];
  const sig = body.length - 1;
  s.addTable([
    head.map((h, i) => cell(h, { bold: true, color: C.white, fill: { color: C.ink }, align: i ? 'center' : 'left', fontSize: 14 })),
    ...body.map((r, ri) => r.map((t, i) => cell(t, {
      fontSize: 14, bold: ri === sig, color: ri === sig ? C.ink : C.text, align: i ? 'center' : 'left',
      fill: { color: ri === sig ? C.tint2 : ri % 2 ? 'F9FAFB' : C.white },
    }))),
  ], { x: M, y: 1.55, w: 7.4, colW: [2.2, 2.0, 1.4, 1.8], rowH: 0.8, border: { type: 'solid', color: C.line, pt: 0.75 } });

  const px = 8.4, pw = W - M - px;
  card(s, px, 1.55, pw, 4.8, C.tint);
  badge(s, 'zap', px + 0.3, 1.8, 0.6);
  text(s, 'Nega SignalR?', { x: px + 1.1, y: 1.85, w: pw - 1.3, h: 0.5, fontSize: 20, bold: true, color: C.ink });
  const chain = ['WebSocket', 'SSE', 'Long polling'];
  const cwid = [1.15, 0.62, 1.25];
  let cx = px + 0.3;
  chain.forEach((t, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 2.75, w: cwid[i], h: 0.42, rectRadius: 0.21, fill: { color: C.white }, line: { color: C.pri, width: 1 } });
    text(s, t, { x: cx, y: 2.75, w: cwid[i], h: 0.42, fontSize: 11, bold: true, color: C.pri, align: 'center', valign: 'middle' });
    cx += cwid[i];
    if (i < chain.length - 1) {
      s.addImage({ path: icon('arrow-right', C.pri), x: cx + 0.05, y: 2.85, w: 0.22, h: 0.22 });
      cx += 0.32;
    }
  });
  text(s, 'transport avtomatik tanlanadi', { x: px + 0.3, y: 3.25, w: pw - 0.6, h: 0.3, fontSize: 12, italic: true, color: C.muted });
  text(s, [
    { text: 'Hab (Hub) abstraksiyasi: server va mijoz bir-birining metodlarini chaqiradi', options: { bullet: true, breakLine: true } },
    { text: 'Guruhlar, JWT autentifikatsiyasi va qayta ulanish tayyor holda', options: { bullet: true, breakLine: true } },
    { text: '.NET tarkibiy qismi; brauzer uchun rasmiy @microsoft/signalr', options: { bullet: true } },
  ], { x: px + 0.3, y: 3.75, w: pw - 0.6, h: 2.4, fontSize: 14, color: C.text, paraSpaceAfter: 10, valign: 'top' });
  s.addNotes(
    'Messenjer uchun eng muhim talab — xabarlarni kechikishsiz yetkazish. Shu sababli real vaqtda aloqa texnologiyalari taqqoslandi: short polling, long polling, Server-Sent Events, WebSocket va SignalR. Tanlov SignalR’ga tushdi. U WebSocket tezligini beradi, WebSocket ishlamaydigan tarmoqlarda esa avtomatik ravishda SSE yoki long polling’ga o‘tadi. Bundan tashqari, guruhlar, JWT orqali autentifikatsiya va qayta ulanish kabi messenjerga kerakli imkoniyatlar SignalR’da tayyor holda mavjud.',
  );
}

// ───────────────────────────────────────── 6. Talablar
{
  const s = contentSlide(6, 'Tizimga qo‘yilgan talablar');
  const col = (x, w, big, label, items) => {
    const bw = 0.2 + big.length * 0.62;
    text(s, big, { x, y: 1.45, w: bw, h: 0.95, fontSize: 54, bold: true, color: C.pri, valign: 'middle' });
    text(s, label, { x: x + bw, y: 1.55, w: w - bw, h: 0.8, fontSize: 18, bold: true, color: C.ink, valign: 'middle' });
    text(s, items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })), {
      x, y: 2.6, w, h: 4.0, fontSize: 14, color: C.text, paraSpaceAfter: 7, valign: 'top',
    });
  };
  col(M, 4.3, '12', 'funksional talab', [
    'Kirish: e-pochta kodi yoki Google',
    'Profil va faol sessiyalar',
    'Shaxsiy va guruh chatlari',
    'Javob, tahrirlash, o‘chirish, qidiruv',
    'Rasm, video va fayllar',
    '“Yozmoqda”, o‘qildi, onlayn holat',
    '24 soatlik hikoyalar',
    'Yorug‘ / qorong‘i mavzu, mobil ko‘rinish',
  ]);
  col(5.2, 4.1, '7', 'nofunksional talab', [
    'Unumdorlik: xabar < 1 soniyada',
    'Xavfsizlik: HTTPS, xeshlar, huquqlar',
    'Ishonchlilik: avtomatik qayta ulanish',
    'Kengaytiriluvchanlik: holatsiz API',
    'Qo‘llab-quvvatlanuvchanlik',
    'Ko‘chiriluvchanlik: Docker',
    'Qulaylik: o‘zbek tilidagi interfeys',
  ]);
  const ax = 9.5, aw = W - M - ax;
  card(s, ax, 1.5, aw, 5.1, C.ink);
  text(s, 'Tizim aktorlari', { x: ax + 0.3, y: 1.75, w: aw - 0.6, h: 0.45, fontSize: 18, bold: true, color: C.white });
  const actors = [
    ['user', 'Mehmon', 'kirish, ro‘yxatdan o‘tish'],
    ['users', 'Foydalanuvchi', 'chatlar, xabarlar, hikoyalar'],
    ['crown', 'Guruh egasi', 'a’zolar va rollarni boshqarish'],
  ];
  actors.forEach(([ic, h, d], i) => {
    const y = 2.5 + i * 1.3;
    badge(s, ic, ax + 0.3, y, 0.6);
    text(s, h, { x: ax + 1.1, y: y - 0.04, w: aw - 1.3, h: 0.36, fontSize: 16, bold: true, color: C.white });
    text(s, d, { x: ax + 1.1, y: y + 0.32, w: aw - 1.3, h: 0.6, fontSize: 13, color: C.tint3, valign: 'top' });
  });
  s.addNotes(
    'Tahlil asosida tizimga 12 ta funksional va 7 guruh nofunksional talab qo‘yildi. Funksional talablar — bu foydalanuvchi ko‘radigan imkoniyatlar: kirish, chatlar, xabarlar, media fayllar, real vaqt belgilari va hikoyalar. Nofunksional talablar esa tizim sifatini belgilaydi: masalan, xabar bir soniyadan kam vaqtda yetib borishi, barcha kodlar va tokenlar xesh ko‘rinishida saqlanishi, tizim Docker’da istalgan serverga ko‘chirilishi. Tizimda uchta aktor bor: mehmon, ro‘yxatdan o‘tgan foydalanuvchi va guruh egasi. Ularning to‘liq use-case diagrammasi diplom ishining ikkinchi bobida keltirilgan.',
  );
}

// ───────────────────────────────────────── 7. Texnologiyalar
{
  const s = contentSlide(7, 'Texnologiyalar steki');
  const cols = [
    ['server', 'Server qismi', ['.NET 8, ASP.NET Core', 'SignalR — real vaqt', 'Entity Framework Core 8', 'PostgreSQL 16', 'FluentValidation, JWT', 'Redis — onlayn holat']],
    ['monitor', 'Klient qismi', ['Angular 22 (standalone, signals)', 'TypeScript, RxJS', '@microsoft/signalr', 'Google Identity Services', 'O‘z dizayn tizimi (SCSS)', 'Server tomonida render (SSR)']],
    ['container', 'Infratuzilma', ['Docker (multi-stage)', 'Render bulut platformasi', 'SMTP — kodlar yuborish', 'ClamAV — antivirus', 'ImageSharp, FFmpeg — media', 'Git va GitHub']],
  ];
  const cw = (CW - 2 * 0.35) / 3;
  cols.forEach(([ic, head, items], i) => {
    const x = M + i * (cw + 0.35);
    card(s, x, 1.5, cw, 4.45, i === 0 ? C.ink : C.tint);
    badge(s, ic, x + 0.35, 1.8, 0.7, C.pri);
    text(s, head, { x: x + 1.25, y: 1.85, w: cw - 1.4, h: 0.6, fontSize: 20, bold: true, color: i === 0 ? C.white : C.ink, valign: 'middle' });
    text(s, items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < items.length - 1 } })), {
      x: x + 0.35, y: 2.75, w: cw - 0.6, h: 3.0, fontSize: 15, color: i === 0 ? C.tint2 : C.text, paraSpaceAfter: 8, valign: 'top',
    });
  });
  s.addImage({ path: icon('check', C.ok), x: M, y: 6.23, w: 0.34, h: 0.34 });
  text(s, 'Barcha texnologiyalar ochiq kodli va bepul — litsenziya xarajati yo‘q.', { x: M + 0.5, y: 6.15, w: CW - 0.5, h: 0.5, fontSize: 15, color: C.ink, valign: 'middle' });
  s.addNotes(
    'Server qismi .NET 8 platformasida, ASP.NET Core freymvorkida yozilgan. Real vaqt aloqasi SignalR orqali, ma’lumotlar bazasi bilan ishlash Entity Framework Core orqali amalga oshiriladi. Ma’lumotlar bazasi — PostgreSQL. Klient qismi Angular 22 freymvorkida, holatni boshqarish uchun signals mexanizmidan foydalanilgan. Infratuzilmada Docker, Render bulut platformasi, kodlarni yuborish uchun SMTP, yuklanayotgan fayllarni tekshirish uchun ClamAV antivirusi ishlatilgan. Barcha texnologiyalar ochiq kodli va bepul.',
  );
}

// ───────────────────────────────────────── 8. Arxitektura
{
  const s = contentSlide(8, 'Tizim arxitekturasi');
  const layers = [
    ['API', 'Controllerlar, ChatHub (SignalR), middleware', C.tint2, C.ink],
    ['Infrastructure', 'EF Core, JWT, PBKDF2 / HMAC, SMTP, ClamAV, Redis', C.tint3, C.ink],
    ['Application', 'Servislar, DTO, FluentValidation, portlar', C.tint4, C.ink],
    ['Domain', 'User, Chat, Message, Group, Story …', C.pri, C.white],
  ];
  text(s, 'Clean Architecture — server qatlamlari', { x: M, y: 1.45, w: 6, h: 0.4, fontSize: 15, bold: true, color: C.muted });
  layers.forEach(([name, desc, fill, color], i) => {
    const y = 1.95 + i * 1.18;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 0.7, y, w: 5.3, h: 1.0, rectRadius: 0.1, fill: { color: fill }, line: { type: 'none' } });
    text(s, [
      { text: name, options: { bold: true, fontSize: 17, breakLine: true } },
      { text: desc, options: { fontSize: 13 } },
    ], { x: M + 0.95, y, w: 4.9, h: 1.0, color, valign: 'middle' });
  });
  s.addShape(pres.shapes.DOWN_ARROW, { x: M, y: 2.0, w: 0.45, h: 4.5, fill: { color: C.tint2 }, line: { type: 'none' } });
  text(s, 'bog‘liqlik ichkariga', { x: M - 1.95, y: 4.05, w: 4.35, h: 0.35, fontSize: 11, color: C.ink, align: 'center', rotate: 270 });

  const rx = 7.1, rw = W - M - rx;
  text(s, 'Joylashtirish diagrammasi', { x: rx, y: 1.45, w: rw, h: 0.4, fontSize: 15, bold: true, color: C.muted });
  framed(s, '2-2-deployment.png', rx, 1.95, rw, 2.7);
  text(s, 'Klient (Angular) tuzilmasi', { x: rx, y: 4.85, w: rw, h: 0.4, fontSize: 15, bold: true, color: C.muted });
  text(s, [
    { text: 'features/* — har bir bo‘lim alohida: auth, chat, groups, stories', options: { bullet: true, breakLine: true } },
    { text: 'data-access — HTTP va SignalR servislari', options: { bullet: true, breakLine: true } },
    { text: 'signals asosida holat, SSR bilan tez ochilish', options: { bullet: true } },
  ], { x: rx, y: 5.3, w: rw, h: 1.4, fontSize: 14, color: C.text, paraSpaceAfter: 6, valign: 'top' });
  s.addNotes(
    'Server qismi Clean Architecture tamoyillari asosida to‘rtta qatlamga ajratilgan. Markazda Domain qatlami — biznes obyektlari. Uning atrofida Application — biznes-mantiq va servislar. Infrastructure qatlamida ma’lumotlar bazasi, kriptografiya, pochta va antivirus kabi texnik adapterlar joylashgan. Tashqi qatlam — API: controllerlar va SignalR habi. Bog‘liqliklar faqat ichkariga yo‘nalgan, shuning uchun, masalan, ma’lumotlar bazasini almashtirish biznes-mantiqqa ta’sir qilmaydi. O‘ng tomonda joylashtirish diagrammasi: brauzer REST va WebSocket orqali Docker konteyneridagi serverga ulanadi, server esa PostgreSQL, fayl ombori va tashqi xizmatlar bilan ishlaydi.',
  );
}

// ───────────────────────────────────────── 9. Ma'lumotlar bazasi
{
  const s = contentSlide(9, 'Ma’lumotlar bazasini loyihalash');
  framed(s, '2-4-er-users-chats.png', M, 1.5, 8.5, 5.1, { valign: 'top', align: 'left' });
  const sx = 9.5, sw = W - M - sx;
  const stats = [
    ['9', 'sxema', 'identity, messaging, groups, stories …'],
    ['32', 'jadval', 'kelajakdagi kanallar va botlar uchun ham'],
    ['Keyset', 'kursorli sahifalash', 'beforeId + limit (1–100), totalCount siz'],
  ];
  stats.forEach(([big, label, desc], i) => {
    const y = 1.5 + i * 1.75;
    card(s, sx, y, sw, 1.55, C.tint);
    text(s, big, { x: sx + 0.25, y: y + 0.15, w: sw - 0.5, h: 0.65, fontSize: 32, bold: true, color: C.pri });
    text(s, label, { x: sx + 0.25, y: y + 0.78, w: sw - 0.5, h: 0.3, fontSize: 14, bold: true, color: C.ink });
    text(s, desc, { x: sx + 0.25, y: y + 1.08, w: sw - 0.5, h: 0.35, fontSize: 11, color: C.muted });
  });
  s.addNotes(
    'Ma’lumotlar bazasi PostgreSQL’da 9 ta sxemaga guruhlangan 32 ta jadvaldan iborat. Ekranda foydalanuvchilar, sessiyalar, chatlar va guruhlar qismining ER-diagrammasi ko‘rsatilgan. Barcha vaqt qiymatlari UTC’da saqlanadi. Xabarlar va chatlar ro‘yxati uchun sahifa raqamli emas, kursorli sahifalash qo‘llanilgan: klient oxirgi ko‘rgan xabar identifikatorini yuboradi va server undan oldingi xabarlarni indeks bo‘yicha tez qaytaradi. Bu usul chatga yangi xabarlar qo‘shilayotganda ham xabarlar takrorlanmasligini yoki tushib qolmasligini ta’minlaydi.',
  );
}

// ───────────────────────────────────────── 10. Xavfsizlik
{
  const s = contentSlide(10, 'Xavfsizlik va autentifikatsiya');
  const steps = [
    ['Elektron pochtaga 6 xonali kod', 'Bazada faqat PBKDF2 xeshi saqlanadi, parol umuman yo‘q'],
    ['Yoki Google hisobi orqali', 'Google ID tokeni serverda tekshiriladi'],
    ['JWT access token — 15 daqiqa', 'Har bir API so‘rovi va SignalR ulanishida tekshiriladi'],
    ['Refresh token — 30 kun, rotatsiya', 'HttpOnly cookie’da, bazada HMAC xeshi; har safar almashadi'],
    ['Qurilmalar bo‘yicha sessiyalar', 'Bitta yoki boshqa barcha sessiyalarni yakunlash mumkin'],
  ];
  steps.forEach(([h, d], i) => {
    const y = 1.55 + i * 1.0;
    num(s, i + 1, M, y, 0.5);
    text(s, h, { x: M + 0.7, y: y - 0.04, w: 5.6, h: 0.35, fontSize: 16, bold: true, color: C.ink });
    text(s, d, { x: M + 0.7, y: y + 0.32, w: 5.6, h: 0.5, fontSize: 13, color: C.muted, valign: 'top' });
  });
  const rx = 7.3, rw = W - M - rx;
  framed(s, '2-10-token-lifecycle.png', rx, 1.5, rw, 3.95);
  const chips = [['shield-check', 'Har so‘rovda chat a’zoligi tekshiriladi'], ['lock-keyhole', 'Fayllar ClamAV antivirusidan o‘tadi']];
  chips.forEach(([ic, t], i) => {
    const y = 5.65 + i * 0.55;
    badge(s, ic, rx, y, 0.42);
    text(s, t, { x: rx + 0.55, y, w: rw - 0.55, h: 0.42, fontSize: 13, color: C.text, valign: 'middle' });
  });
  s.addNotes(
    'Tizimda parolsiz autentifikatsiya qo‘llanilgan. Foydalanuvchi elektron pochtasiga 6 xonali bir martalik kod oladi, bazada esa bu kodning faqat PBKDF2 xeshi saqlanadi. Google hisobi orqali kirish ham mumkin. Kirgandan so‘ng 15 daqiqalik JWT access token va 30 kunlik refresh token beriladi. Refresh token HttpOnly cookie’da saqlanadi, bazada uning HMAC xeshi turadi va har yangilanishda yangisiga almashtiriladi. O‘ng tomondagi diagrammada token muddati tugaganda uni avtomatik yangilash jarayoni ko‘rsatilgan. Bundan tashqari, har bir so‘rovda foydalanuvchining chat a’zosi ekanligi tekshiriladi, yuklangan fayllar esa antivirusdan o‘tkaziladi.',
  );
}

// ───────────────────────────────────────── 11. Real vaqt xabar
{
  const s = contentSlide(11, 'Real vaqtda xabar yuborish jarayoni');
  framed(s, '2-8-message-sequence.png', M, 1.45, CW, 4.55);
  const flow = ['REST: xabar tekshirilib, bazaga yoziladi', 'ChatHub: chat a’zolariga darhol yuboriladi', 'O‘qildi ✓✓ va “yozmoqda…” belgilari'];
  const fw = (CW - 2 * 0.3) / 3;
  flow.forEach((t, i) => {
    const x = M + i * (fw + 0.3);
    card(s, x, 6.15, fw, 0.62, C.tint);
    num(s, i + 1, x + 0.12, 6.21, 0.5);
    text(s, t, { x: x + 0.75, y: 6.15, w: fw - 0.85, h: 0.62, fontSize: 13, color: C.ink, valign: 'middle' });
  });
  s.addNotes(
    'Bu ketma-ketlik diagrammasi xabar qanday yetkazilishini ko‘rsatadi. Qabul qiluvchi brauzer oldindan JWT bilan SignalR habiga ulanib turadi. Jo‘natuvchi xabarni REST so‘rovi orqali yuboradi. Servis uni tekshiradi, foydalanuvchining chat a’zosi ekanini aniqlaydi va bazaga yozadi. So‘ng ChatHub orqali xabar chatning barcha a’zolariga darhol yuboriladi. Qabul qiluvchi xabarni o‘qiganda jo‘natuvchida ikki belgi paydo bo‘ladi, yozish boshlanganda esa “yozmoqda” holati ko‘rinadi. Xabarni saqlash REST orqali bajarilgani uchun ulanish uzilganda ham xabar yo‘qolmaydi.',
  );
}

// ───────────────────────────────────────── 12. Interfeys: kirish
{
  const s = contentSlide(12, 'Dastur interfeysi: tizimga kirish');
  const shots = [
    ['3-01-login.jpg', 'Kirish', 'E-pochta manzilini kiritish yoki Google orqali kirish'],
    ['3-02-otp.jpg', 'Tasdiqlash kodi', '6 xonali bir martalik kod pochtaga yuboriladi'],
    ['3-03-register.jpg', 'Ro‘yxatdan o‘tish', 'Yangi foydalanuvchi ismi va username’ini kiritadi'],
  ];
  // Only the form half of each screen: the right half is the same decorative hero text on all three.
  const crop = [0.03, 0.04, 0.47, 0.84];
  const w = (CW - 2 * 0.3) / 3;
  shots.forEach(([f, h, d], i) => {
    const x = M + i * (w + 0.3);
    const box = framed(s, f, x, 1.6, w, 3.0, { crop });
    num(s, i + 1, box.x - 0.2, box.y - 0.15, 0.5);
    text(s, h, { x, y: box.y + box.h + 0.15, w, h: 0.35, fontSize: 16, bold: true, color: C.ink, align: 'center' });
    text(s, d, { x, y: box.y + box.h + 0.5, w, h: 0.6, fontSize: 13, color: C.muted, align: 'center', valign: 'top' });
  });
  card(s, M, 5.85, CW, 0.8, C.tint);
  badge(s, 'key-round', M + 0.25, 5.97, 0.56);
  text(s, 'Parolsiz kirish: parol saqlanmaydi va sizib chiqmaydi — foydalanuvchi faqat pochtasiga egaligini tasdiqlaydi.', {
    x: M + 1.05, y: 5.85, w: CW - 1.3, h: 0.8, fontSize: 15, color: C.ink, valign: 'middle',
  });
  s.addNotes(
    'Endi dasturning o‘zini ko‘rsataman. Tizimga kirish uch qadamdan iborat. Foydalanuvchi elektron pochtasini kiritadi yoki Google tugmasini bosadi. Pochtaga 6 xonali kod keladi va u kiritiladi. Agar foydalanuvchi yangi bo‘lsa, ism va username kiritib ro‘yxatdan o‘tadi. Parol umuman ishlatilmagani uchun uni o‘g‘irlash yoki bazadan sizdirib olish xavfi yo‘q.',
  );
}

// ───────────────────────────────────────── 13. Interfeys: shaxsiy chat
{
  const s = contentSlide(13, 'Dastur interfeysi: shaxsiy chat');
  const big = framed(s, '3-05-private-chat.jpg', M, 1.5, 7.8, 4.9, { align: 'left' });
  pill(s, 'Suhbat: “yozmoqda…”, o‘qildi ✓✓, onlayn holat', big, 4.6);
  const rx = big.x + big.w + 0.35, rw = W - M - rx;
  const a = framed(s, '3-06-reply.jpg', rx, 1.5, rw, 2.4);
  pill(s, 'Xabarga javob (reply)', a, 2.3);
  const b = framed(s, '3-07-image-viewer.jpg', rx, a.y + a.h + 0.25, rw, 2.4);
  pill(s, 'Rasmni ko‘rish', b, 1.7);
  s.addNotes(
    'Bu shaxsiy chat oynasi. Chap tomonda chatlar ro‘yxati: oxirgi xabar, vaqt va o‘qilmagan xabarlar soni ko‘rinadi. Tepada hikoyalar paneli joylashgan. Suhbatdosh yozayotganda sarlavhada “yozmoqda” yozuvi chiqadi, o‘qilgan xabarlar ikkita belgi bilan ko‘rsatiladi. Xabarga javob berish, o‘z xabarini tahrirlash va o‘chirish, rasm, video va fayl yuborish mumkin. O‘ng tomonda javob berish va rasmni to‘liq ekranda ko‘rish oynalari ko‘rsatilgan.',
  );
}

// ───────────────────────────────────────── 14. Interfeys: guruh chatlari
{
  const s = contentSlide(14, 'Dastur interfeysi: guruh chatlari');
  const lw = 4.3;
  const roles = [
    ['crown', 'Egasi', 'Adminlarni tayinlaydi, guruhni o‘chiradi'],
    ['shield', 'Administrator', 'A’zo qo‘shadi va chiqaradi, guruhni tahrirlaydi'],
    ['user', 'A’zo', 'Xabar va fayllar yuboradi, guruhdan chiqadi'],
  ];
  roles.forEach(([ic, h, d], i) => iconRow(s, ic, h, d, M, 1.55 + i * 1.05, lw, { d: 0.55, headSize: 16, descSize: 13 }));
  framed(s, '3-14-group-create-members.jpg', M, 4.75, lw, 1.9, { align: 'left', crop: [0, 0, 0.29, 0.32] });
  const bx = M + lw + 0.4;
  const big = framed(s, '3-13-group-chat.jpg', bx, 1.5, W - M - bx, 5.15, { align: 'right' });
  pill(s, 'Guruh chati va ma’lumot paneli', big, 3.2);
  s.addNotes(
    'Guruh chatlarida uchta rol mavjud: egasi, administrator va oddiy a’zo. Har bir amaldan oldin server foydalanuvchining rolini tekshiradi. Masalan, a’zo qo‘shish faqat administrator va egaga ruxsat etilgan, guruhni o‘chirish esa faqat egaga. Ega guruhdan chiqsa, egalik avtomatik ravishda eng oldin tayinlangan administratorga o‘tadi. Guruhdagi o‘zgarishlar, masalan yangi a’zo qo‘shilgani, xizmat xabarlari ko‘rinishida barcha a’zolarga real vaqtda ko‘rsatiladi.',
  );
}

// ───────────────────────────────────────── 15. Qidiruv, hikoyalar, profil
{
  const s = contentSlide(15, 'Qidiruv, hikoyalar va profil');
  // Same height for all three; the story and profile screens are cropped to their content (the rest is backdrop).
  const ih = 3.9, gap = 0.4;
  const items = [
    ['search', '3-09-message-search.jpg', undefined, 'Xabarlarni qidirish', 'Matn bo‘yicha qidirish va topilgan xabar kontekstiga o‘tish'],
    ['circle-play', '3-11-story-viewer.jpg', [0.335, 0.03, 0.33, 0.95], 'Hikoyalar', '24 soat ko‘rinadi, kim ko‘rgani ma’lum'],
    ['user-pen', '3-12-profile-editor.jpg', [0, 0.012, 0.278, 0.61], 'Profil', 'Ism, username, bio, rasm va faol qurilmalar'],
  ];
  let x = M;
  items.forEach(([ic, f, crop, h, d]) => {
    const w = fit(f, 100, ih, crop).w;
    badge(s, ic, x, 1.5, 0.5);
    text(s, h, { x: x + 0.65, y: 1.5, w: w - 0.65, h: 0.5, fontSize: 17, bold: true, color: C.ink, valign: 'middle' });
    text(s, d, { x, y: 2.08, w, h: 0.55, fontSize: 12, color: C.muted, valign: 'top' });
    framed(s, f, x, 2.72, w, ih, { crop });
    x += w + gap;
  });
  s.addNotes(
    'Dasturda Telegram foydalanuvchilariga tanish bo‘lgan boshqa imkoniyatlar ham bor. Chat ichida xabarlarni matn bo‘yicha qidirish mumkin, topilgan natija bosilganda chat o‘sha xabar atrofiga o‘tadi. Hikoyalar 24 soat davomida ko‘rinadi va muallif ularni kim ko‘rganini biladi. Profil oynasida ism, username, bio va rasmni o‘zgartirish, shuningdek faol qurilmalar ro‘yxatini ko‘rish mumkin.',
  );
}

// ───────────────────────────────────────── 16. Moslashuvchan dizayn
{
  const s = contentSlide(16, 'Qorong‘i mavzu va mobil ko‘rinish');
  const dark = framed(s, '3-16-dark-theme.jpg', M, 1.5, 7.3, 4.6, { align: 'left' });
  pill(s, 'Qorong‘i mavzu', dark, 1.9);
  const pw = (W - M - (dark.x + dark.w + 0.4) - 0.3) / 2;
  const p1 = framed(s, '3-17-mobile-list.jpg', dark.x + dark.w + 0.4, 1.5, pw, 4.6);
  const p2 = framed(s, '3-18-mobile-chat.jpg', p1.x + p1.w + 0.3, 1.5, pw, 4.6);
  pill(s, 'Chatlar', p1, 1.1);
  pill(s, 'Suhbat', p2, 1.05);
  badge(s, 'monitor-smartphone', M, 6.28, 0.45);
  text(s, 'Bitta kod bazasi kompyuter, planshet va telefonda ishlaydi — o‘z dizayn tizimi va moslashuvchan maket.', {
    x: M + 0.6, y: 6.25, w: CW - 0.6, h: 0.5, fontSize: 14, color: C.text, valign: 'middle',
  });
  s.addNotes(
    'Interfeys yorug‘ va qorong‘i mavzularni qo‘llab-quvvatlaydi. Ular o‘z dizayn tizimimizdagi rang o‘zgaruvchilari orqali almashtiriladi. Interfeys moslashuvchan: telefonda chatlar ro‘yxati va suhbat alohida ekranlarda ochiladi. Shunday qilib, bitta veb-ilova kompyuterda ham, telefonda ham qulay ishlaydi.',
  );
}

// ───────────────────────────────────────── 17. Joylashtirish va testlash
{
  const s = contentSlide(17, 'Joylashtirish va testlash');
  const stats = [
    ['56', 'REST API endpointi'],
    ['39', 'unit test — barchasi o‘tdi'],
    ['43', 'API integratsion tekshiruvi'],
    ['Docker', 'Render bulutida ishlaydi'],
  ];
  const cw = (CW - 3 * 0.3) / 4;
  stats.forEach(([big, label], i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 1.5, cw, 1.45, i === 1 ? C.ink : C.tint);
    text(s, big, { x: x + 0.3, y: 1.62, w: cw - 0.6, h: 0.75, fontSize: big.length > 3 ? 30 : 40, bold: true, color: i === 1 ? C.white : C.pri, valign: 'middle' });
    text(s, label, { x: x + 0.3, y: 2.38, w: cw - 0.6, h: 0.4, fontSize: 14, color: i === 1 ? C.tint2 : C.ink });
  });
  const box = framed(s, '3-19-unit-tests.png', M + CW - 4.2, 3.25, 4.2, 3.45, { align: 'right' });
  text(s, [
    { text: 'Ko‘p bosqichli Docker obrazi: SDK’da yig‘ish, yengil ASP.NET runtime’da ishga tushirish', options: { bullet: true, breakLine: true } },
    { text: 'GitHub’ga push qilinganda Render obrazni avtomatik qayta yig‘adi', options: { bullet: true, breakLine: true } },
    { text: 'Maxfiy kalitlar kodda emas, muhit o‘zgaruvchilarida', options: { bullet: true, breakLine: true } },
    { text: 'xUnit + NSubstitute: guruhlar, sahifalash, xavfsizlik va validatsiya testlari', options: { bullet: true, breakLine: true } },
    { text: 'Swagger UI orqali API hujjatlari va qo‘lda sinov', options: { bullet: true } },
  ], { x: M, y: 3.3, w: box.x - M - 0.4, h: 3.4, fontSize: 15, color: C.text, paraSpaceAfter: 9, valign: 'top' });
  s.addNotes(
    'Server 56 ta REST endpoint va SignalR habidan iborat. U ko‘p bosqichli Docker obraziga yig‘iladi va Render bulut platformasida ishlaydi. GitHub’ga yangi kod yuborilganda obraz avtomatik qayta yig‘iladi, maxfiy kalitlar esa muhit o‘zgaruvchilarida saqlanadi. Dasturning to‘g‘riligi 39 ta unit test bilan tekshirildi va ularning barchasi muvaffaqiyatli o‘tdi. Bundan tashqari, API darajasida 43 ta integratsion tekshiruv va qo‘lda sinov ssenariylari o‘tkazildi.',
  );
}

// ───────────────────────────────────────── 18. HFX
{
  const s = contentSlide(18, 'Hayot faoliyati xavfsizligi');
  // Both drawings are dense, so they get captions underneath instead of pills over them.
  const a = framed(s, '4-1-workstation.png', M, 1.45, 5.4, 3.25, { align: 'left' });
  const b = framed(s, '4-3-evacuation-plan.png', a.x + a.w + 0.4, 1.45, W - M - (a.x + a.w + 0.4), 3.25, { align: 'right' });
  for (const [box, label] of [[a, 'Ergonomik ish joyi va to‘g‘ri gavda holati'], [b, 'IT-ofis qavatining evakuatsiya reja-sxemasi']]) {
    text(s, label, { x: box.x, y: box.y + box.h + 0.08, w: box.w, h: 0.3, fontSize: 12, italic: true, color: C.muted, align: 'center' });
  }
  const stats = [
    ['armchair', '5 ish joyi', 'xona 6 × 6 × 3 m'],
    ['lightbulb', '421 lk', '12 ta LED panel (me’yor 400 lk)'],
    ['wind', '150 m³/soat', 'toza havo, 5 xodim uchun'],
    ['door-open', '≈ 50 soniya', 'hisobiy evakuatsiya vaqti'],
  ];
  const cw = (CW - 3 * 0.3) / 4;
  stats.forEach(([ic, big, label], i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 5.3, cw, 1.2, C.tint);
    badge(s, ic, x + 0.2, 5.5, 0.5);
    text(s, big, { x: x + 0.85, y: 5.42, w: cw - 0.95, h: 0.5, fontSize: 20, bold: true, color: C.ink, valign: 'middle' });
    text(s, label, { x: x + 0.85, y: 5.92, w: cw - 0.95, h: 0.6, fontSize: 12, color: C.muted, valign: 'top' });
  });
  s.addNotes(
    'Hayot faoliyati xavfsizligi bo‘limida ikki masala ko‘rib chiqildi. Birinchisi — dasturchining ergonomik ish joyi. Stol, stul va monitorning to‘g‘ri o‘lchamlari keltirildi va 6 ga 6 metrli xona uchun hisob-kitob qilindi: xonaga 5 ta ish joyi joylashadi, 12 ta LED panel 421 lyuks yoritilganlik beradi, bu me’yordagi 400 lyuksdan yuqori. Havo almashinuvi soatiga 150 kub metr. Ikkinchi masala — evakuatsiya. IT-ofis qavati uchun evakuatsiya reja-sxemasi ishlab chiqildi, hisobiy evakuatsiya vaqti taxminan 50 soniya chiqdi. Yong‘in sodir bo‘lganda xodimlarning harakatlar tartibi ham belgilandi.',
  );
}

// ───────────────────────────────────────── 19. Xulosa
{
  const s = contentSlide(19, 'Xulosa va istiqbollar');
  const results = [
    'Messenjerlar va real vaqt texnologiyalari tahlil qilindi, SignalR tanlandi',
    'Clean Architecture asosidagi server, 32 jadvalli PostgreSQL bazasi',
    'Parolsiz autentifikatsiya: e-pochta kodi, Google, JWT, sessiyalar',
    'Shaxsiy va guruh chatlari, media fayllar, hikoyalar — real vaqtda',
    'Angular 22 da moslashuvchan, ikki mavzuli o‘zbekcha interfeys',
    'Docker orqali bulutga joylashtirildi, testlar bilan tasdiqlandi',
  ];
  text(s, 'Erishilgan natijalar', { x: M, y: 1.45, w: 6.5, h: 0.45, fontSize: 19, bold: true, color: C.ink });
  results.forEach((t, i) => {
    const y = 2.05 + i * 0.75;
    s.addImage({ path: icon('check', C.ok), x: M, y: y - 0.02, w: 0.34, h: 0.34 });
    text(s, t, { x: M + 0.5, y, w: 6.2, h: 0.65, fontSize: 15, color: C.text, valign: 'top' });
  });

  const px = 7.6, pw = W - M - px;
  card(s, px, 1.45, pw, 5.2, C.ink);
  text(s, 'Istiqbollar', { x: px + 0.35, y: 1.65, w: pw - 0.7, h: 0.45, fontSize: 19, bold: true, color: C.white });
  const future = [
    ['phone', 'WebRTC ovozli va video qo‘ng‘iroqlar'],
    ['lock', 'Uchdan-uchgacha shifrlash (E2E)'],
    ['bot', 'Kanallar va botlar platformasi'],
    ['bell', 'Push-bildirishnomalar'],
    ['smartphone', 'Android va iOS ilovalari'],
    ['trending-up', 'Redis bilan gorizontal kengaytirish'],
  ];
  future.forEach(([ic, t], i) => {
    const y = 2.3 + i * 0.7;
    badge(s, ic, px + 0.35, y, 0.48);
    text(s, t, { x: px + 1.0, y, w: pw - 1.2, h: 0.48, fontSize: 15, color: C.tint2, valign: 'middle' });
  });
  s.addNotes(
    'Xulosa qilib aytganda, ishda qo‘yilgan barcha vazifalar bajarildi. Mavjud yechimlar tahlil qilindi, tizim loyihalandi, parolsiz autentifikatsiyaga ega, real vaqtda ishlaydigan messenjer yaratildi va bulutga joylashtirildi. “Milliy chat”ni tashkilotlar, ta’lim muassasalari va davlat idoralari o‘z serverlarida ichki aloqa vositasi sifatida qo‘llashi mumkin. Kelajakda ovozli va video qo‘ng‘iroqlar, uchdan-uchgacha shifrlash, kanallar va botlar hamda mobil ilovalarni qo‘shish rejalashtirilgan. Ma’lumotlar bazasi sxemasida bu imkoniyatlar uchun joy oldindan ajratilgan.',
  );
}

// ───────────────────────────────────────── 20. Rahmat
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  badge(s, 'check', W / 2 - 0.5, 1.6, 1.0, C.pri);
  text(s, 'E’tiboringiz uchun rahmat!', { x: M, y: 2.9, w: CW, h: 1.0, fontSize: 44, bold: true, color: C.white, align: 'center', valign: 'middle' });
  text(s, TOPIC, { x: M, y: 3.95, w: CW, h: 0.5, fontSize: 20, color: C.tint3, align: 'center' });
  text(s, 'S.O. Sohinazarov', { x: M, y: 5.3, w: CW, h: 0.4, fontSize: 16, bold: true, color: C.white, align: 'center' });
  text(s, 'Toshkent – 2026', { x: M, y: 5.75, w: CW, h: 0.4, fontSize: 14, color: C.tint4, align: 'center' });
  s.addNotes('E’tiboringiz uchun rahmat! Savollaringiz bo‘lsa, javob berishga tayyorman.');
}

await pres.writeFile({ fileName: OUT });
console.log(`Saved ${OUT}`);
