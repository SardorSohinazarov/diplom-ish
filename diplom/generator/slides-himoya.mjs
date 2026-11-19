// Builds ../Himoya_taqdimoti_Sohinazarov_Sardor.pptx — the short (≈9 min) defence deck built as a story.
// Usage: node slides-himoya.mjs
import fs from 'node:fs';
import path from 'node:path';
import pptxgen from 'pptxgenjs';

import { ROOT } from './lib.mjs';
import { renderIcons } from './tools/icons.mjs';

const OUT = path.join(ROOT, '..', 'Himoya_taqdimoti_Sohinazarov_Sardor.pptx');
const TOPIC = 'Real vaqtda xabar almashish imkonini beruvchi “Milliy” xabarchi ishlab chiqish';
const TOTAL = 18;

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
  ...['landmark', 'database', 'globe', 'target', 'shield-check', 'mail', 'key-round', 'lock-keyhole', 'monitor-smartphone', 'server', 'monitor', 'container', 'users', 'crown', 'shield', 'user', 'search', 'circle-play', 'user-pen', 'phone', 'lock', 'bot', 'bell', 'smartphone', 'trending-up', 'sparkles', 'store', 'gavel', 'blocks', 'armchair', 'lightbulb', 'wind', 'door-open', 'flame', 'zap', 'check', 'languages', 'building-2', 'badge-check', 'link', 'fingerprint', 'timer', 'file-lock', 'mail-check', 'smile-plus', 'ban']
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
pres.author = 'Sohinazarov Sardorbek';
pres.title = TOPIC;
pres.theme = { headFontFace: F, bodyFontFace: F };

const text = (slide, value, opts) => slide.addText(value, { fontFace: F, color: C.text, margin: 0, isTextBox: true, ...opts });

/** Content slide: white background, title, footer with topic and slide number (counted automatically). */
function contentSlide(_, title) {
  const s = pres.addSlide();
  const n = pres.slides.length;
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

/** Dark console card with monospace lines; each line is [text, colour]. */
function terminal(s, lines, x, y, w, h, fontSize = 12) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: '1E1E1E' }, line: { type: 'none' } });
  text(s, lines.map(([t, color], i) => ({ text: t, options: { color, breakLine: i < lines.length - 1 } })), {
    x: x + 0.25, y: y + 0.15, w: w - 0.5, h: h - 0.3, fontFace: 'Consolas', fontSize, valign: 'top', lineSpacingMultiple: 1.15,
  });
}

const cell = (t, o = {}) => ({ text: t, options: { fontFace: F, fontSize: 13, color: C.text, valign: 'middle', margin: [0.04, 0.08, 0.04, 0.08], ...o } });

/** Big stat card: number on top, label under it. */
function stat(s, big, label, x, y, w, h, dark = false) {
  card(s, x, y, w, h, dark ? C.ink : C.tint);
  text(s, big, { x: x + 0.25, y: y + 0.12, w: w - 0.5, h: h * 0.55, fontSize: big.length > 4 ? 28 : 40, bold: true, color: dark ? C.white : C.pri, valign: 'middle' });
  text(s, label, { x: x + 0.25, y: y + h * 0.6, w: w - 0.5, h: h * 0.35, fontSize: 13, color: dark ? C.tint2 : C.ink, valign: 'top' });
}

const bulletList = (items) => items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } }));

// ───────────────────────────────────────── 1. Titul  (≈15 s)
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  text(s, [
    { text: 'O‘ZBEKISTON RESPUBLIKASI RAQAMLI TEXNOLOGIYALAR VAZIRLIGI', options: { breakLine: true } },
    { text: 'MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI', options: { breakLine: true } },
    { text: '“Tizimli va amaliy dasturlashtirish” kafedrasi' },
  ], { x: M, y: 0.35, w: CW, h: 0.95, fontSize: 13, color: C.tint3, align: 'center', lineSpacingMultiple: 1.15 });
  text(s, 'BITIRUV MALAKAVIY ISHI', { x: M, y: 1.95, w: 6.6, h: 0.4, fontSize: 16, bold: true, color: C.tint4, charSpacing: 3 });
  text(s, TOPIC, { x: M, y: 2.4, w: 6.6, h: 1.7, fontSize: 26, bold: true, color: C.white, valign: 'top' });
  text(s, 'Ma’lumotlari O‘zbekistonda saqlanadigan veb-messenjer', { x: M, y: 4.15, w: 6.6, h: 0.45, fontSize: 18, color: C.tint3 });
  text(s, [
    { text: 'Bajardi:  ', options: { color: C.tint4 } },
    { text: 'S.O. Sohinazarov', options: { bold: true, breakLine: true } },
    { text: 'Ilmiy rahbar:  ', options: { color: C.tint4 } },
    { text: 'dots. Y.Sh. Yuldoshev', options: { bold: true } },
  ], { x: M, y: 5.05, w: 6.6, h: 0.9, fontSize: 16, color: C.white, lineSpacingMultiple: 1.4 });
  const shot = fit('3-05-private-chat.jpg', 5.3, 3.4);
  s.addImage({ path: pic('3-05-private-chat.jpg'), x: W - M - shot.w, y: 1.95, w: shot.w, h: shot.h,
    shadow: { type: 'outer', color: '000000', opacity: 0.35, blur: 14, offset: 4, angle: 90 } });
  text(s, 'Toshkent – 2026', { x: M, y: 6.75, w: CW, h: 0.4, fontSize: 14, bold: true, color: C.tint3, align: 'center' });
  s.addNotes(
    '[≈15 soniya] Assalomu alaykum, hurmatli komissiya a’zolari! Men Sohinazarov Sardorbekman. Bitiruv malakaviy ishimning mavzusi — real vaqtda xabar almashish imkonini beruvchi “Milliy” xabarchini ishlab chiqish.',
  );
}

// ───────────────────────────────────────── 2. Muammo  (≈45 s)
{
  const s = contentSlide(2, 'Muammo: yozishmalarimiz kimning serverida?');
  const rows = [
    ['globe', 'Asosiy messenjerlar — xorijiy', 'Telegram va WhatsApp’dagi millionlab fuqarolar yozishmalari chet eldagi serverlarda turadi'],
    ['zap', 'Xorijiy xizmatga bog‘liqlik xavfli', '2021-yil oktabr: WhatsApp butun dunyoda ~6 soat ishlamadi — tashkilotlar aloqasiz qoldi'],
    ['landmark', 'Davlat talabi', '“Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonun (2021): fuqarolar ma’lumotlari respublika hududida saqlanadi'],
  ];
  rows.forEach(([ic, h, d], i) => iconRow(s, ic, h, d, M, 1.55 + i * 1.4, 7.2, { d: 0.7, descSize: 15 }));
  const px = 8.3, pw = W - M - px;
  card(s, px, 1.5, pw, 4.25, C.ink);
  text(s, 'Mahalliy Humo bor, lekin…', { x: px + 0.35, y: 1.7, w: pw - 0.7, h: 0.5, fontSize: 19, bold: true, color: C.white });
  text(s, bulletList(['pullik — har bir xodim uchun oylik obuna', 'faqat davlat tashkilotlari uchun', 'Telegram ochiq kodi asosida qilingan']), {
    x: px + 0.35, y: 2.25, w: pw - 0.7, h: 1.6, fontSize: 15, color: C.tint2, paraSpaceAfter: 8, valign: 'top',
  });
  s.addShape(pres.shapes.LINE, { x: px + 0.35, y: 3.95, w: pw - 0.7, h: 0, line: { color: C.tint4, width: 0.75 } });
  text(s, 'Universitet, kompaniya va oddiy fuqaro uchun bepul, o‘z serverida ishlaydigan messenjer yo‘q.', {
    x: px + 0.35, y: 4.05, w: pw - 0.7, h: 1.6, fontSize: 17, bold: true, color: C.white, valign: 'top',
  });
  card(s, M, 5.95, CW, 0.8, C.pri);
  badge(s, 'target', M + 0.25, 6.07, 0.56, C.ink);
  text(s, [
    { text: 'Maqsad: ', options: { bold: true } },
    { text: 'ma’lumotlari o‘z serverida saqlanadigan, o‘zbek foydalanuvchisiga moslashgan real vaqtli “Milliy” messenjerini yaratish.' },
  ], { x: M + 1.0, y: 5.95, w: CW - 1.25, h: 0.8, fontSize: 16, color: C.white, valign: 'middle' });
  s.addNotes(
    '[≈45 soniya] Bugun hammamiz — talabalar ham, o‘qituvchilar ham, idoralar ham — kundalik ishni messenjerda yuritamiz. Lekin Telegram va WhatsApp xorijiy kompaniyalarniki, ya’ni yozishmalarimiz chet eldagi serverlarda turadi va ularga O‘zbekiston qonunlari ta’sir qila olmaydi. Bu bog‘liqlik xavfli: 2021-yil oktabrda WhatsApp butun dunyoda olti soatga yaqin ishlamadi. Davlat ham bu muammoni tan olgan: qonunga ko‘ra fuqarolar ma’lumotlari respublika hududida saqlanishi kerak. Mahalliy Humo messenjeri bor, lekin u pullik va faqat davlat xodimlari uchun. Universitet, kompaniya yoki oddiy fuqaro uchun esa bepul va o‘z serverida ishlaydigan messenjer hanuz yo‘q. Shuning uchun ishimning maqsadi — ma’lumotlari o‘z serverida saqlanadigan, o‘zbek foydalanuvchisiga moslashgan real vaqtli messenjer yaratish.',
  );
}

// ───────────────────────────────────────── 3. Taqqoslash  (≈40 s)
{
  const s = contentSlide(3, 'Mavjud messenjerlar nega yetarli emas');
  const head = ['Mezon', 'Telegram', 'WhatsApp', 'Signal', 'Humo', '“Milliy” xabarchi'];
  const body = [
    ['Ma’lumotlar joyi', 'Chet elda', 'Chet elda', 'Chet elda', 'O‘zbekistonda', 'O‘z serveringizda'],
    ['Kimlar uchun, narxi', 'Hamma, bepul', 'Hamma, bepul', 'Hamma, bepul', 'Davlat xodimlari, pullik', 'Hamma, bepul'],
    ['Ro‘yxatdan o‘tish', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', '—', 'E-pochta kodi, Google'],
    ['Lotin ↔ kirill', '✗', '✗', '✗', '—', '✓ (qidiruv ham)'],
    ['Tashkilot tasdig‘i', '✗', '✗', '✗', '—', '✓ ish e-pochtasi'],
  ];
  const last = head.length - 1;
  s.addTable([
    head.map((h, i) => cell(h, { bold: true, color: C.white, fontSize: 15, fill: { color: i === last ? C.pri : C.ink }, align: i ? 'center' : 'left' })),
    ...body.map((r, ri) => r.map((t, i) => cell(t, {
      fontSize: 15, bold: i === 0 || i === last, align: i ? 'center' : 'left',
      color: t === '✗' ? 'DC2626' : i === last ? C.ink : C.text,
      fill: { color: i === last ? C.tint2 : ri % 2 ? 'F9FAFB' : C.white },
    }))),
  ], { x: M, y: 1.5, w: CW, colW: [2.4, 1.85, 1.85, 1.85, 2.0, 2.18], rowH: 0.68, border: { type: 'solid', color: C.line, pt: 0.75 } });
  card(s, M, 5.85, CW, 0.85, C.tint);
  badge(s, 'languages', M + 0.25, 5.98, 0.58);
  text(s, 'Hech bir messenjer o‘zbek tilining ikki yozuvini va tashkilotga a’zolikni hisobga olmaydi.', {
    x: M + 1.05, y: 5.85, w: CW - 1.3, h: 0.85, fontSize: 16, bold: true, color: C.ink, valign: 'middle',
  });
  s.addNotes(
    '[≈40 soniya] Birinchi bobda beshta messenjer solishtirildi, bu yerda asosiylari. Xorijiylar ma’lumotni chet elda saqlaydi. Humo O‘zbekistonda saqlaydi, lekin yopiq va pullik. Eng muhimi — oxirgi ikki qator: hech bir messenjer o‘zbek tilining ikki yozuvini hisobga olmaydi. Bir kishi kirillda, boshqasi lotinda yozadi, lotincha qidiruv esa kirillcha xabarni topmaydi. Telefon raqami ham odamning qaysi universitet yoki kompaniyada ishlashini ko‘rsatmaydi. “Milliy” xabarchi aynan shu ikki muammoni hal qiladi.',
  );
}

// ───────────────────────────────────────── 5. Yangilik  (≈40 s)
{
  const s = contentSlide(5, 'Ishning yangiligi: uchta o‘ziga xos imkoniyat');
  const cards = [
    ['languages', 'Lotin ↔ Kirill', 'Har kim xabarni o‘zi o‘rgangan yozuvda o‘qiydi. Qidiruv ikkala yozuvda topadi.'],
    ['building-2', 'Tashkilot rejimi', 'Universitet pochtasi bilan kirgan odam o‘z tashkilotining yopiq guruhiga o‘zi tushadi.'],
    ['lock-keyhole', 'Maxfiy chat', 'Xabarni faqat ikki suhbatdosh o‘qiydi. Server mazmunini bilmaydi.'],
  ];
  const cw = (CW - 2 * 0.4) / 3;
  cards.forEach(([ic, head, d], i) => {
    const x = M + i * (cw + 0.4);
    card(s, x, 1.55, cw, 4.25, i === 1 ? C.ink : C.tint);
    badge(s, ic, x + cw / 2 - 0.6, 1.9, 1.2, C.pri);
    text(s, head, { x: x + 0.3, y: 3.3, w: cw - 0.6, h: 0.6, fontSize: 24, bold: true, color: i === 1 ? C.white : C.ink, align: 'center' });
    text(s, d, { x: x + 0.35, y: 4.0, w: cw - 0.7, h: 1.6, fontSize: 16, color: i === 1 ? C.tint2 : C.text, align: 'center', valign: 'top' });
  });
  card(s, M, 6.0, CW, 0.7, C.tint2);
  s.addImage({ path: icon('check', C.ok), x: M + 0.3, y: 6.17, w: 0.36, h: 0.36 });
  text(s, 'Birinchi ikkisi ko‘rib chiqilgan messenjerlarning birortasida yo‘q.', { x: M + 0.85, y: 6.0, w: CW - 1.1, h: 0.7, fontSize: 16, color: C.ink, valign: 'middle' });
  s.addNotes(
    '[≈40 soniya] Ishimning yangiligi — uchta imkoniyat. Birinchisi — lotin va kirill o‘rtasida avtomatik o‘girish: har kim xabarni o‘zi o‘rgangan yozuvda o‘qiydi. Ikkinchisi — tashkilot rejimi: universitet pochtasi bilan kirgan odam o‘z tashkilotining yopiq guruhiga avtomatik tushadi, hech kimni qo‘lda qo‘shish shart emas. Uchinchisi — maxfiy chat: uni serverning o‘zi ham o‘qiy olmaydi. Birinchi ikkisi tahlil qilingan messenjerlarning birortasida yo‘q. Har biriga qisqa to‘xtalaman.',
  );
}

// ───────────────────────────────────────── 6. Lotin ↔ Kirill  (≈40 s)
{
  const s = contentSlide(6, 'Lotin ↔ Kirill: har kim o‘z yozuvida o‘qiydi');
  const crop = [0.225, 0, 0.775, 0.6];
  const w = (CW - 0.35) / 2;
  const a = framed(s, '3-20-script-original.jpg', M, 1.45, w, 3.6, { crop, align: 'left' });
  const b = framed(s, '3-20-script-latin.jpg', M + w + 0.35, 1.45, w, 3.6, { crop, align: 'right' });
  pill(s, 'Asl holida', a, 1.5);
  pill(s, '“Lotin” sozlamasi', b, 2.2);
  const y = 4.85;
  const facts = [
    ['database', 'Bazada asl holida', 'o‘girish faqat ekranda'],
    ['languages', 'Imlo qoidalari', 'е → ye/e,  ў → o‘,  ц → ts'],
    ['search', 'Qidiruv', '“rahmat” → “Раҳмат” ham topiladi'],
  ];
  const fw = (CW - 2 * 0.3) / 3;
  facts.forEach(([ic, h, d], i) => {
    const x = M + i * (fw + 0.3);
    card(s, x, y, fw, 1.35, C.tint);
    iconRow(s, ic, h, d, x + 0.25, y + 0.3, fw - 0.4, { d: 0.6, headSize: 18, descSize: 15 });
  });
  s.addNotes(
    '[≈40 soniya] Chapda suhbat asl holida: bir kishi kirillda, boshqasi lotinda yozgan. O‘ngda xuddi shu suhbat “Lotin” sozlamasida — hamma xabar lotinda. Muhimi: xabar bazada asl holida qoladi, o‘girish faqat ekranda bajariladi, shuning uchun har kim o‘z yozuvini tanlaydi. Algoritm imlo qoidalarini hisobga oladi: masalan, “е” harfi so‘z boshida “ye”, o‘rtasida “e” bo‘ladi. Qidiruv ham ikkala yozuvda ishlaydi: “rahmat” deb qidirsangiz, kirillda yozilgan “Раҳмат” ham topiladi. Algoritm 80 ta juft misol bilan server va brauzerda bir xil tekshirilgan.',
  );
}

// ───────────────────────────────────────── 7. Tashkilot rejimi  (≈35 s)
{
  const s = contentSlide(7, 'Tashkilot rejimi: ish e-pochtasi orqali a’zolik');
  const steps = [
    ['mail-check', 'ali@tuit.uz bilan kirildi', 'Tashkilot — bu pochta domeni: “tuit.uz”'],
    ['badge-check', 'Birinchi kirgan — admin', 'Tashkilotning yopiq guruhi o‘zi yaratiladi'],
    ['users', 'Keyingilar — avtomatik a’zo', 'Ism yonida “tuit.uz ✓” belgisi chiqadi'],
    ['link', 'Gmail va boshqalar', 'Faqat admin qo‘shsa yoki taklif havolasi bilan'],
  ];
  steps.forEach(([ic, h, d], i) => iconRow(s, ic, h, d, M, 1.6 + i * 1.22, 4.7, { d: 0.62, headSize: 17, descSize: 14 }));
  const shot = framed(s, '3-22-organization-group.jpg', M + 5.0, 1.5, CW - 5.0, 5.1, { align: 'right' });
  pill(s, 'Domen guruhi va taklif havolasi', shot, 3.1);
  s.addNotes(
    '[≈35 soniya] Universitetlarda har bir guruh va kafedra uchun chat ochiladi, a’zolarni esa qo‘lda qo‘shish kerak bo‘ladi va kim kirgani nazorat qilinmaydi. Tashkilot rejimida buning hojati yo‘q: tashkilot — bu pochta domeni. tuit.uz pochtasi bilan birinchi kirgan odam admin bo‘ladi va yopiq guruh o‘zi yaratiladi. Keyingi har bir xodim ism yonida “tuit.uz” belgisini oladi va guruhga avtomatik tushadi. Gmail kabi umumiy pochta egalari esa faqat taklif bilan kira oladi. Tashkilotni oldindan ro‘yxatdan o‘tkazish shart emas.',
  );
}

// ───────────────────────────────────────── 8. Maxfiy chat  (≈35 s)
{
  const s = contentSlide(8, 'Maxfiy chat: server ham o‘qiy olmaydi');
  const shot = framed(s, '3-26-secret-chat.jpg', M, 1.5, 6.4, 5.1, { align: 'left', crop: [0.225, 0, 0.775, 0.93] });
  const rx = shot.x + shot.w + 0.45, rw = W - M - rx;
  const steps = [
    ['Kalitlar faqat qurilmada', 'Serverga faqat ochiq kalit yuboriladi'],
    ['Har xabarga yangi kalit', 'Eski kalit o‘chadi — eski xabarlar ham himoyada'],
    ['Kalit izini solishtirish', 'O‘rtada begona yo‘qligini ikkala tomon tekshiradi'],
  ];
  steps.forEach(([h, d], i) => {
    const y = 1.55 + i * 1.0;
    num(s, i + 1, rx, y, 0.5);
    text(s, h, { x: rx + 0.7, y: y - 0.04, w: rw - 0.7, h: 0.36, fontSize: 17, bold: true, color: C.ink });
    text(s, d, { x: rx + 0.7, y: y + 0.34, w: rw - 0.7, h: 0.5, fontSize: 14, color: C.muted, valign: 'top' });
  });
  text(s, 'Bazada qolgan yagona iz — ma’nosiz shifr matn:', { x: rx, y: 4.65, w: rw, h: 0.35, fontSize: 13, bold: true, color: C.ink });
  terminal(s, [
    ['Id | Seq | bytes | Ciphertext', 'D4D4D4'],
    [' 6 |   5 |   183 | AdBp3POJtrxqSydreRLgRu…', '4ADE80'],
  ], rx, 5.05, rw, 0.85, 12);
  text(s, 'X25519 · HKDF-SHA-256 · AES-256-GCM (Web Crypto API)', { x: rx, y: 6.1, w: rw, h: 0.35, fontSize: 11, italic: true, color: C.muted });
  s.addNotes(
    '[≈35 soniya] Maxfiy chatda xabar qurilmaning o‘zida shifrlanadi. Kalitlar faqat ikki suhbatdoshning qurilmasida turadi, serverga faqat ochiq kalit boradi. Har bir xabar yangi kalit bilan shifrlanadi, eskisi o‘chiriladi. Shuning uchun kalit qo‘lga tushsa ham, eski xabarlarni ochib bo‘lmaydi. Pastda ma’lumotlar bazasining o‘zi: u yerda xabar o‘rniga faqat ma’nosiz shifr matn qolgan. (Komissiya so‘rasa: X25519 kalit kelishuvi, HKDF, AES-256-GCM, brauzerning Web Crypto API’si.)',
  );
}

// ───────────────────────────────────────── Maxfiy chat qanday ishlaydi  (≈45 s)
{
  const s = contentSlide(0, 'Maxfiy chat qanday ishlaydi');
  const lanes = [
    ['Ali qurilmasi', 2.1, C.ink, C.white],
    ['Server', 6.65, C.tint3, C.ink],
    ['Vali qurilmasi', 11.2, C.ink, C.white],
  ];
  const sw = 2.8, mw = 2.5;
  lanes.forEach(([t, cx, fill, color]) => {
    s.addShape(pres.shapes.LINE, { x: cx, y: 1.95, w: 0, h: 3.9, line: { color: C.tint4, width: 1, dashType: 'dash' } });
    node(s, cx - (cx === 6.65 ? mw : sw) / 2, 1.4, cx === 6.65 ? mw : sw, 0.55, t, null, { fill, color, size: 15 });
  });
  const A = 2.1, S = 6.65, V = 11.2;
  const side = (cx, y, title, sub, h = 0.55) => node(s, cx - sw / 2, y, sw, h, title, sub, { fill: C.tint2, size: 12 });
  const mid = (y, title, sub, h = 0.55) => node(s, S - mw / 2, y, mw, h, title, sub, { fill: C.white, size: 12 });
  const msg = (x1, x2, y, label, color = C.pri) => {
    arrow(s, x1, y, x2, y, color);
    text(s, label, { x: Math.min(x1, x2), y: y - 0.27, w: Math.abs(x2 - x1), h: 0.25, fontSize: 10, bold: true, color, align: 'center' });
  };

  // 1. key pairs
  side(A, 2.15, 'Kalit jufti yaratadi', 'X25519: yopiq + ochiq');
  side(V, 2.15, 'Kalit jufti yaratadi', 'X25519: yopiq + ochiq');
  // 2. public keys only
  mid(2.85, 'Faqat ochiq kalitlar', 'A va B saqlanadi', 0.62);
  msg(A + sw / 2, S - mw / 2, 3.03, 'ochiq kalit A');
  msg(S + mw / 2, V - sw / 2, 3.03, 'A');
  msg(V - sw / 2, S + mw / 2, 3.33, 'ochiq kalit B');
  msg(S - mw / 2, A + sw / 2, 3.33, 'B');
  // 3. shared secret
  side(A, 3.7, 'Umumiy sir → 2 zanjir kaliti', 'DH + HKDF, tarmoqdan o‘tmaydi');
  side(V, 3.7, 'Umumiy sir → 2 zanjir kaliti', 'DH + HKDF, tarmoqdan o‘tmaydi');
  // 4. message
  side(A, 4.45, 'Har xabarga yangi kalit', 'HMAC zanjiri + AES-256-GCM');
  mid(4.45, 'Vaqtincha ushlab turadi', 'mazmunni bilmaydi');
  msg(A + sw / 2, S - mw / 2, 4.73, 'shifr matn + seq');
  msg(S + mw / 2, V - sw / 2, 4.73, 'shifr matn');
  side(V, 4.45, 'Ochadi, kalitni o‘chiradi', 'takroriy seq — rad etiladi');
  // 5. ack
  mid(5.2, 'Shifr matnni o‘chiradi', null, 0.45);
  msg(V - sw / 2, S + mw / 2, 5.42, 'qabul qilindi (ack)', C.ok);

  card(s, M, 6.0, CW, 0.7, C.ink);
  badge(s, 'fingerprint', M + 0.25, 6.08, 0.54, C.pri);
  text(s, [
    { text: 'Kalit izi: ', options: { bold: true, color: C.white } },
    { text: 'SHA-256(A, B) → 8 ta emoji va raqam. Ikkalasi solishtiradi: server kalitni almashtirgan bo‘lsa, belgilar farq qiladi.', options: { color: C.tint2 } },
  ], { x: M + 1.0, y: 6.0, w: CW - 1.25, h: 0.7, fontSize: 14, valign: 'middle' });
  s.addNotes(
    '[≈45 soniya] Maxfiy chat qanday ishlashini ko‘rsataman. 1) Ali va Valining brauzerlari har biri o‘z kalit juftini yaratadi — yopiq va ochiq. 2) Serverga faqat ochiq kalitlar boradi, server ularni bir-biriga uzatadi. 3) Har bir tomon o‘z yopiq kaliti va suhbatdoshning ochiq kalitidan bir xil umumiy sirni hisoblaydi — bu Diffi–Xellman usuli. Umumiy sir tarmoq orqali hech qachon o‘tmaydi, undan har bir yo‘nalish uchun kalitlar zanjiri olinadi. 4) Har bir xabar uchun zanjirdan yangi kalit olinadi, ishlatilgan kalit o‘chiriladi — shuning uchun kalit o‘g‘irlansa ham eski xabarlarni ochib bo‘lmaydi. Xabar AES-256-GCM bilan shifrlanadi, unga chat, yo‘nalish va tartib raqami bog‘lanadi: xabarni ko‘chirib yoki takrorlab yuborib bo‘lmaydi. Server shifr matnni faqat vaqtincha ushlab turadi va Vali qabul qilgach o‘chiradi. 5) Va nihoyat, o‘rtada begona yo‘qligini tekshirish uchun ikkala tomonda ochiq kalitlardan hisoblangan kalit izi — 8 ta emoji — ko‘rsatiladi, ularni solishtirish kifoya.',
  );
}

// ───────────────────────────────────────── 9. Arxitektura  (≈45 s)
{
  const s = contentSlide(9, 'Qanday qurilgan: arxitektura va texnologiyalar');
  const dw = 7.2;
  const layers = [
    ['Brauzer — Angular', 'REST so‘rovlari + SignalR ulanishi (WebSocket)', C.tint, C.ink],
    ['API qatlami', 'Controllerlar, ChatHub, ForumHub', C.tint2, C.ink],
    ['Application', 'Servislar, tekshiruv qoidalari', C.tint3, C.ink],
    ['Domain', 'Foydalanuvchi, Chat, Xabar, Guruh…', C.tint4, C.ink],
    ['Infrastructure', 'PostgreSQL · Redis · pochta · antivirus', C.pri, C.white],
  ];
  layers.forEach(([name, desc, fill, color], i) => {
    const y = 1.5 + i * 0.82;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y, w: dw, h: 0.7, rectRadius: 0.1, fill: { color: fill }, line: { type: 'none' } });
    text(s, [
      { text: name + '   ', options: { bold: true, fontSize: 16 } },
      { text: desc, options: { fontSize: 13 } },
    ], { x: M + 0.25, y, w: dw - 0.5, h: 0.7, color, valign: 'middle' });
  });
  const groups = [
    ['Server', '.NET, Entity Framework, PostgreSQL, Redis'],
    ['Brauzer', 'Angular, TypeScript'],
    ['Joylashtirish', 'Docker, VPS, GitHub Actions'],
  ];
  groups.forEach(([h, d], i) => {
    const x = M + i * (dw / 3);
    text(s, [{ text: h, options: { bold: true, color: C.ink, breakLine: true } }, { text: d, options: { color: C.muted } }], {
      x, y: 5.75, w: dw / 3 - 0.15, h: 0.9, fontSize: 13, valign: 'top',
    });
  });
  const px = M + dw + 0.4, pw = W - M - px;
  card(s, px, 1.5, pw, 5.15, C.tint);
  badge(s, 'zap', px + 0.3, 1.75, 0.6);
  text(s, 'Nega SignalR?', { x: px + 1.1, y: 1.8, w: pw - 1.3, h: 0.5, fontSize: 20, bold: true, color: C.ink });
  const chain = ['WebSocket', 'SSE', 'Long polling'];
  const cwid = [1.15, 0.62, 1.25];
  let cx = px + 0.3;
  chain.forEach((t, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 2.65, w: cwid[i], h: 0.42, rectRadius: 0.21, fill: { color: C.white }, line: { color: C.pri, width: 1 } });
    text(s, t, { x: cx, y: 2.65, w: cwid[i], h: 0.42, fontSize: 11, bold: true, color: C.pri, align: 'center', valign: 'middle' });
    cx += cwid[i];
    if (i < chain.length - 1) {
      s.addImage({ path: icon('arrow-right', C.pri), x: cx + 0.05, y: 2.75, w: 0.22, h: 0.22 });
      cx += 0.32;
    }
  });
  text(s, bulletList([
    'Eng tez usul — WebSocket; ishlamasa o‘zi boshqasiga o‘tadi',
    'Guruhlar, kirish tekshiruvi va qayta ulanish tayyor',
    'Server 4 qatlamga bo‘lingan: baza almashsa ham asosiy qoidalar o‘zgarmaydi',
  ]), { x: px + 0.3, y: 3.3, w: pw - 0.6, h: 3.2, fontSize: 14, color: C.text, paraSpaceAfter: 10, valign: 'top' });
  s.addNotes(
    '[≈45 soniya] Tizim ikki qismdan iborat. Brauzer qismi Angular’da, server .NET’da yozilgan, ma’lumotlar PostgreSQL’da, onlayn holat Redis’da saqlanadi. Xabarlarni jonli yetkazish uchun beshta texnologiya solishtirilib, SignalR tanlandi: u eng tez usul — WebSocket bilan ishlaydi, u ishlamaydigan tarmoqda esa o‘zi boshqa usulga o‘tadi. Server to‘rt qatlamga bo‘lingan — Clean Architecture, shuning uchun baza yoki texnologiya almashsa ham dasturning asosiy qoidalari o‘zgarmaydi. Bazada 11 guruhga ajratilgan 43 ta jadval bor.',
  );
}

// ───────────────────────────────────────── 10. Jonli namoyish  (≈1.5–2 min)
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  badge(s, 'circle-play', M, 0.55, 0.8, C.pri);
  text(s, 'Jonli namoyish', { x: M + 1.05, y: 0.5, w: 8, h: 0.9, fontSize: 34, bold: true, color: C.white, valign: 'middle' });
  const steps = [
    'Ikki oynada ikki foydalanuvchi: xabar shu zahoti yetib boradi',
    '“yozmoqda…”, o‘qildi ✓✓ va onlayn holat',
    'Sozlamada yozuvni almashtirish: kirill ↔ lotin',
    'Lotincha qidiruv kirillcha xabarni topadi',
    'Maxfiy chat va forum (vaqt bo‘lsa)',
  ];
  steps.forEach((t, i) => {
    const y = 1.85 + i * 0.95;
    num(s, i + 1, M, y, 0.55, C.pri);
    text(s, t, { x: M + 0.8, y, w: 6.0, h: 0.55, fontSize: 18, color: C.white, valign: 'middle' });
  });
  const shot = fit('3-16-dark-theme.jpg', 5.2, 4.6);
  s.addImage({ path: pic('3-16-dark-theme.jpg'), x: W - M - shot.w, y: 1.85, w: shot.w, h: shot.h,
    shadow: { type: 'outer', color: '000000', opacity: 0.35, blur: 14, offset: 4, angle: 90 } });
  text(s, `${pres.slides.length} / ${TOTAL}`, { x: W - M - 2, y: 6.98, w: 2, h: 0.3, fontSize: 10, color: C.tint4, align: 'right' });
  s.addNotes(
    '[1,5–2 daqiqa] Endi dasturni jonli ko‘rsataman. (Oldindan ikki brauzer oynasida ikki xil foydalanuvchi bilan kirib qo‘ying.) 1) Bir oynadan xabar yozaman — ikkinchisida shu zahoti chiqadi, yozayotganda “yozmoqda” ko‘rinadi, o‘qilganda ikki belgi chiqadi. 2) Sozlamada yozuvni lotinga almashtiraman — kirillcha xabarlar lotinda ko‘rinadi. 3) Lotincha so‘z bilan qidiraman — kirillcha xabar topiladi. 4) Vaqt bo‘lsa, maxfiy chat va forumni ko‘rsataman. ZAXIRA: internet uzilsa, oldindan yozib olingan videoni qo‘ying.',
  );
}

/** Straight arrow from (x1, y1) to (x2, y2). */
function arrow(s, x1, y1, x2, y2, color = C.pri) {
  s.addShape(pres.shapes.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color, width: 1.75, endArrowType: 'triangle' },
  });
}

/** Diagram node: rounded box with a bold title and an optional small subtitle. */
function node(s, x, y, w, h, title, sub, { fill = C.tint, color = C.ink, subColor = C.muted, size = 14 } = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: fill === C.white ? C.tint4 : fill, width: 1 } });
  const runs = [{ text: title, options: { bold: true, fontSize: size, color, breakLine: !!sub } }];
  if (sub) runs.push({ text: sub, options: { fontSize: size - 3, color: subColor } });
  text(s, runs, { x: x + 0.08, y, w: w - 0.16, h, align: 'center', valign: 'middle' });
}

// ───────────────────────────────────────── 11. Kengayish  (≈30 s)
{
  const s = contentSlide(0, 'Kengayish va ishonchlilik: WhatsApp tajribasidan');
  const lx = M, lw = 5.8;
  node(s, lx, 1.55, lw, 0.6, 'Foydalanuvchilar (brauzerlar)', null, { fill: C.tint });
  arrow(s, lx + lw / 2, 2.15, lx + lw / 2, 2.5);
  node(s, lx, 2.5, lw, 0.6, 'Yuk taqsimlovchi (load balancer)', null, { fill: C.tint2 });
  const sw = 1.7, gap = (lw - 3 * sw) / 2;
  ['Server 1', 'Server 2', 'Server N'].forEach((t, i) => {
    const x = lx + i * (sw + gap);
    arrow(s, lx + lw / 2, 3.1, x + sw / 2, 3.45);
    node(s, x, 3.45, sw, 0.8, t, '.NET + SignalR', { fill: C.ink, color: C.white, subColor: C.tint3 });
    s.addShape(pres.shapes.LINE, { x: x + sw / 2, y: 4.25, w: 0, h: 0.22, line: { color: C.pri, width: 1.75 } });
  });
  s.addShape(pres.shapes.LINE, { x: lx + sw / 2, y: 4.47, w: lw - sw, h: 0, line: { color: C.pri, width: 1.75 } });
  arrow(s, lx + 1.4, 4.47, lx + 1.4, 4.75);
  arrow(s, lx + lw - 1.4, 4.47, lx + lw - 1.4, 4.75);
  node(s, lx, 4.75, 2.8, 0.8, 'Redis', 'onlayn holat, ulanishlar', { fill: C.pri, color: C.white, subColor: C.tint2 });
  node(s, lx + lw - 2.8, 4.75, 2.8, 0.8, 'PostgreSQL', 'xabarlar va chatlar', { fill: C.pri, color: C.white, subColor: C.tint2 });

  const rx = lx + lw + 0.45, rw = W - M - rx;
  const rows = [
    ['Server holat saqlamaydi', 'kimlik JWT tokenda — server qo‘shish oson'],
    ['Gorizontal kengayish', 'serverlar Redis orqali bog‘lanadi'],
    ['Xabar yo‘qolmaydi', 'avval bazaga yoziladi, keyin yetkaziladi'],
    ['Katta chatda tezlik', 'kursorli sahifalash (beforeId), indeks'],
    ['Uzilishga chidamlilik', 'qayta ulanish 0–2–5–10 s, oflayn 8 s kutish'],
    ['Yuklamadan himoya', 'so‘rovlar chastotasi cheklangan'],
  ];
  s.addTable([
    [cell('Tamoyil', { bold: true, color: C.white, fill: { color: C.ink }, fontSize: 14 }), cell('Loyihada', { bold: true, color: C.white, fill: { color: C.ink }, fontSize: 14 })],
    ...rows.map(([a, b], i) => [
      cell(a, { bold: true, color: C.ink, fontSize: 13, fill: { color: i % 2 ? C.white : C.tint } }),
      cell(b, { fontSize: 13, fill: { color: i % 2 ? C.white : C.tint } }),
    ]),
  ], { x: rx, y: 1.55, w: rw, colW: [2.35, rw - 2.35], rowH: 0.57, border: { type: 'solid', color: C.line, pt: 0.75 } });

  card(s, M, 5.95, CW, 0.75, C.tint2);
  badge(s, 'lightbulb', M + 0.25, 6.05, 0.55);
  text(s, 'Yondashuvlar 42.uz “Tizim dizayni” kursidagi “WhatsApp arxitekturasi: 1 million connection” darsi asosida qo‘llanildi [28].', {
    x: M + 1.0, y: 5.95, w: CW - 1.25, h: 0.75, fontSize: 15, color: C.ink, valign: 'middle',
  });
  s.addNotes(
    '[≈30 soniya] Loyihalashda faqat bitta server uchun emas, kengayish uchun ham o‘yladim. Buning uchun 42.uz’dagi “Tizim dizayni” kursida WhatsApp arxitekturasini o‘rgandim: u yerda ulanishlar yuk taqsimlovchi orqali ko‘plab serverlarga bo‘linadi. Mening serverim ham holat saqlamaydi — foydalanuvchining kimligi tokenda. Shuning uchun foydalanuvchi ko‘paysa, yangi server qo‘shiladi, serverlar esa Redis orqali onlayn holat va ulanishlarni bo‘lishadi. Xabar avval bazaga yoziladi, shuning uchun ulanish uzilsa ham yo‘qolmaydi. (Ehtiyot bo‘ling: “1 million ulanishga chidaydi” demang — “arxitektura gorizontal kengayishga tayyor” deng.)',
  );
}

// ───────────────────────────────────────── 12. Keyingi bosqich: broker + push  (≈40 s)
{
  const s = contentSlide(0, 'Keyingi bosqich: xabar navbat orqali yetkaziladi');
  text(s, [
    { text: 'Hozir: ', options: { bold: true, color: C.ink } },
    { text: 'baza → SignalR.   ', options: { color: C.muted } },
    { text: 'Reja: ', options: { bold: true, color: C.pri } },
    { text: 'baza → message broker → workerlar → WebSocket yoki push', options: { color: C.text } },
  ], { x: M, y: 1.3, w: CW, h: 0.4, fontSize: 15 });

  const cy = 2.55, bh = 0.95; // main row
  node(s, M, cy, 1.55, bh, 'Jo‘natuvchi', 'xabar yozadi');
  arrow(s, M + 1.55, cy + bh / 2, 2.5, cy + bh / 2);
  node(s, 2.5, cy, 1.75, bh, 'API server', 'tekshiradi', { fill: C.ink, color: C.white, subColor: C.tint3 });
  // 1. save
  arrow(s, 2.5 + 1.75 / 2, cy + bh, 2.5 + 1.75 / 2, 4.25);
  text(s, '1. saqlash', { x: 3.45, y: 3.65, w: 1.2, h: 0.3, fontSize: 11, bold: true, color: C.pri });
  node(s, 2.5, 4.25, 1.75, 0.75, 'PostgreSQL', 'xabar tarixi', { fill: C.tint2 });
  // 2. queue
  arrow(s, 4.25, cy + bh / 2, 4.85, cy + bh / 2);
  text(s, '2. navbatga', { x: 4.05, y: cy - 0.35, w: 1.3, h: 0.3, fontSize: 11, bold: true, color: C.pri, align: 'center' });
  node(s, 4.85, cy, 2.1, bh, 'Message broker', 'RabbitMQ / Kafka', { fill: C.pri, color: C.white, subColor: C.tint2 });
  arrow(s, 6.95, cy + bh / 2, 7.45, cy + bh / 2);
  // workers: stacked look
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.61, y: cy - 0.16, w: 1.75, h: bh, rectRadius: 0.1, fill: { color: C.tint3 }, line: { type: 'none' } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.53, y: cy - 0.08, w: 1.75, h: bh, rectRadius: 0.1, fill: { color: C.tint2 }, line: { type: 'none' } });
  node(s, 7.45, cy, 1.75, bh, 'Workerlar × N', '3. navbatdan oladi', { fill: C.ink, color: C.white, subColor: C.tint3 });
  arrow(s, 9.2, cy + bh / 2, 9.55, cy + bh / 2);
  // decision
  const dx = 9.55, dw = 1.55, dh = 1.25, dy = cy + bh / 2 - dh / 2;
  s.addShape(pres.shapes.DIAMOND, { x: dx, y: dy, w: dw, h: dh, fill: { color: C.white }, line: { color: C.pri, width: 1.5 } });
  text(s, 'Onlaynmi?', { x: dx + 0.2, y: dy, w: dw - 0.4, h: dh, fontSize: 11, bold: true, color: C.ink, align: 'center', valign: 'middle' });
  const ox = 11.35, ow = W - M - ox;
  // yes → websocket
  s.addShape(pres.shapes.LINE, { x: dx + dw / 2, y: 2.15, w: 0, h: dy - 2.15, line: { color: C.pri, width: 1.75 } });
  arrow(s, dx + dw / 2, 2.15, ox, 2.15);
  text(s, 'Ha', { x: dx + dw / 2 + 0.1, y: 1.8, w: 0.5, h: 0.3, fontSize: 12, bold: true, color: C.ok });
  node(s, ox, 1.75, ow, 0.8, 'WebSocket', 'SignalR — darhol', { fill: C.tint2, size: 13 });
  // no → push
  s.addShape(pres.shapes.LINE, { x: dx + dw / 2, y: dy + dh, w: 0, h: 4.6 - (dy + dh), line: { color: C.pri, width: 1.75 } });
  arrow(s, dx + dw / 2, 4.6, ox, 4.6);
  text(s, 'Yo‘q', { x: dx + dw / 2 + 0.1, y: 4.25, w: 0.6, h: 0.3, fontSize: 12, bold: true, color: 'DC2626' });
  node(s, ox, 4.2, ow, 0.8, 'Push', 'FCM / APNs', { fill: C.tint2, size: 13 });

  const benefits = [
    ['zap', 'Tez javob', 'API kutmaydi, yetkazish fonda'],
    ['server', 'Oson kengayish', 'yuklama oshsa — worker qo‘shiladi'],
    ['shield-check', 'Yo‘qolmaydi', 'navbatda turadi, qayta uriniladi'],
    ['smartphone', 'Oflayn ham oladi', 'qurilmasiga push bildirishnoma'],
  ];
  const cw = (CW - 3 * 0.25) / 4;
  benefits.forEach(([ic, h, d], i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 5.4, cw, 1.25, C.tint);
    iconRow(s, ic, h, d, x + 0.2, 5.6, cw - 0.3, { d: 0.5, headSize: 15, descSize: 12 });
  });
  s.addNotes(
    '[≈40 soniya] Hozir xabar bazaga yoziladi va darhol SignalR orqali yuboriladi. Bu ishlaydi, lekin foydalanuvchilar millionlab bo‘lsa, yetkazishni alohida qismga ajratish kerak. Keyingi bosqichda xabar bazaga yozilgach, message broker — masalan RabbitMQ yoki Kafka — navbatiga tashlanadi. Navbatdan esa workerlar oladi. Worker qabul qiluvchi onlaynmi yoki yo‘qligini tekshiradi: onlayn bo‘lsa, xabar WebSocket orqali darhol boradi; onlayn bo‘lmasa, qurilmasiga qarab Firebase (FCM), Apple (APNs) yoki brauzer Web Push xizmati orqali bildirishnoma yuboriladi. Buning afzalligi: API darhol javob beradi, yuklama oshsa worker qo‘shiladi, xabar navbatda turgani uchun yo‘qolmaydi va xato bo‘lsa qayta yuboriladi. Bu ham WhatsApp kabi katta messenjerlar tajribasidan olingan.',
  );
}

// ───────────────────────────────────────── Forum: lenta va mashhurlik muammosi  (≈45 s)
{
  const s = contentSlide(0, 'Forum: lenta va “mashhurlik muammosi”');
  text(s, 'Twitter arxitekturasidan o‘rganilgan yondashuvlar', { x: M, y: 1.2, w: CW, h: 0.35, fontSize: 15, color: C.muted });
  const dot = (x, y, d, fill) => s.addShape(pres.shapes.OVAL, { x: x - d / 2, y: y - d / 2, w: d, h: d, fill: { color: fill }, line: { type: 'none' } });
  const lw = 7.5, ch = 1.3;
  const cards = [
    ['search', 'Fan-out on read', 'HOZIR', 'Lenta ochilganda obunalar postlari bitta so‘rov bilan yig‘iladi. Oddiy va ishonchli, lekin obuna juda ko‘p bo‘lsa o‘qish sekinlashadi.', C.tint, 'read'],
    ['users', 'Fan-out on write', '', 'Post yozilganda har bir obunachining tayyor lentasiga (Redis) qo‘shiladi. O‘qish tez, lekin 10 mln obunachili muallif = 10 mln yozuv.', C.tint, 'write'],
    ['sparkles', 'Gibrid — Twitter yechimi', 'REJA', 'Oddiy mualliflar posti oldindan tarqatiladi, mashhurlarniki esa o‘qish paytida qo‘shiladi. Ikkala usulning yaxshi tomoni olinadi.', C.ink, 'hybrid'],
  ];
  cards.forEach(([ic, head, tag, desc, fill, kind], i) => {
    const y = 1.65 + i * (ch + 0.15);
    const dark = fill === C.ink;
    card(s, M, y, lw, ch, fill);
    badge(s, ic, M + 0.2, y + 0.22, 0.55);
    text(s, head, { x: M + 0.95, y: y + 0.12, w: 3.2, h: 0.4, fontSize: 17, bold: true, color: dark ? C.white : C.ink, valign: 'middle' });
    if (tag) {
      const tw = 0.85;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 4.0, y: y + 0.16, w: tw, h: 0.32, rectRadius: 0.16, fill: { color: tag === 'HOZIR' ? C.ok : C.pri }, line: { type: 'none' } });
      text(s, tag, { x: M + 4.0, y: y + 0.16, w: tw, h: 0.32, fontSize: 10, bold: true, color: C.white, align: 'center', valign: 'middle' });
    }
    text(s, desc, { x: M + 0.95, y: y + 0.52, w: lw - 0.95 - 2.0, h: 0.75, fontSize: 12, color: dark ? C.tint2 : C.text, valign: 'top' });
    // mini fan-out drawing on the right of the card
    const gx = M + lw - 1.85, cy = y + ch / 2;
    const many = [-0.42, -0.21, 0, 0.21, 0.42];
    const lc = dark ? C.tint4 : C.pri;
    const ln = (x1, y1, x2, y2) => s.addShape(pres.shapes.LINE, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), flipV: y2 < y1, line: { color: lc, width: 1 } });
    if (kind === 'read') {
      [-0.35, 0, 0.35].forEach((dy) => { ln(gx + 0.2, cy + dy, gx + 1.35, cy); dot(gx + 0.2, cy + dy, 0.2, C.tint4); });
      dot(gx + 1.4, cy, 0.34, C.pri);
      text(s, 'o‘quvchi', { x: gx + 0.9, y: cy + 0.2, w: 1.0, h: 0.25, fontSize: 9, color: C.muted, align: 'center' });
    } else if (kind === 'write') {
      many.forEach((dy) => { ln(gx + 0.25, cy, gx + 1.35, cy + dy); dot(gx + 1.4, cy + dy, 0.16, C.tint4); });
      dot(gx + 0.2, cy, 0.4, 'DC2626');
      text(s, 'mashhur', { x: gx - 0.3, y: cy + 0.22, w: 1.0, h: 0.25, fontSize: 9, color: 'DC2626', align: 'center' });
    } else {
      [-0.3, 0.3].forEach((dy) => { ln(gx + 0.2, cy + dy, gx + 1.35, cy); });
      dot(gx + 0.2, cy - 0.3, 0.2, C.tint4);
      dot(gx + 0.2, cy + 0.3, 0.3, 'F87171');
      dot(gx + 1.4, cy, 0.34, C.pri);
    }
  });

  const rx = M + lw + 0.35, rw = W - M - rx;
  card(s, rx, 1.65, rw, 4.2, C.tint);
  badge(s, 'trending-up', rx + 0.25, 1.85, 0.55);
  text(s, 'Top lenta: mashhurlik bahosi', { x: rx + 0.95, y: 1.85, w: rw - 1.1, h: 0.55, fontSize: 16, bold: true, color: C.ink, valign: 'middle' });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx + 0.25, y: 2.6, w: rw - 0.5, h: 0.6, rectRadius: 0.08, fill: { color: C.ink }, line: { type: 'none' } });
  text(s, 'S = (L + 2R + 3P + 0,01V) / (t + 2)^1,5', { x: rx + 0.25, y: 2.6, w: rw - 0.5, h: 0.6, fontSize: 14, bold: true, color: C.white, align: 'center', valign: 'middle' });
  text(s, bulletList([
    'Javob va repost laykdan og‘ir; vaqt o‘tsa baho pasayadi',
    'Fonda har 5 daqiqada, faqat oxirgi 72 soat postlari',
    'Hisoblagichlar postning o‘zida — qayta sanalmaydi',
    'Bitta muallifdan sahifada ≤ 2 post',
  ]), { x: rx + 0.25, y: 3.35, w: rw - 0.5, h: 2.4, fontSize: 13, color: C.text, paraSpaceAfter: 6, valign: 'top' });

  card(s, M, 6.05, CW, 0.65, C.tint2);
  badge(s, 'lightbulb', M + 0.25, 6.12, 0.5);
  text(s, 'Lenta va mashhurlik muammosi 42.uz “Tizim dizayni” kursidagi Twitter arxitekturasi darsidan o‘rganildi.', {
    x: M + 0.95, y: 6.05, w: CW - 1.2, h: 0.65, fontSize: 14, color: C.ink, valign: 'middle',
  });
  s.addNotes(
    '[≈45 soniya] Forum — bu messenjer ichidagi kichik Twitter. Uni loyihalashda 42.uz’dagi “Tizim dizayni” kursida Twitter arxitekturasini o‘rgandim. Asosiy savol — lentani qanday yig‘ish. Birinchi usul — fan-out on read: lenta ochilganda obunalar postlari so‘rov bilan yig‘iladi. Hozir loyihada shu usul ishlaydi: u oddiy va ishonchli. Ikkinchi usul — fan-out on write: post yozilganda u har bir obunachining tayyor lentasiga qo‘shiladi, o‘qish juda tez bo‘ladi. Lekin bu yerda “mashhurlik muammosi” bor: 10 million obunachisi bor odam bitta post yozsa, 10 million yozuv qilish kerak. Twitter buni gibrid usul bilan hal qiladi: oddiy mualliflar posti oldindan tarqatiladi, mashhurlarniki esa o‘qish paytida qo‘shiladi. Bu bizning keyingi bosqich rejamiz. Top lentada esa mashhurlik bahosi formula bilan hisoblanadi: javob va repost laykdan og‘irroq, vaqt o‘tishi bilan baho pasayadi. Baho har so‘rovda emas, fonda har 5 daqiqada hisoblanadi, hisoblagichlar postning o‘zida saqlanadi — shuning uchun lenta tez ochiladi.',
  );
}

// ───────────────────────────────────────── 11. Sifat va joylashtirish  (≈30 s)
{
  const s = contentSlide(11, 'Dastur ishlab turibdi va sinovdan o‘tgan');
  const stats = [
    ['810', 'avtomatik test: 457 server + 353 brauzer', true],
    ['0', 'muvaffaqiyatsiz test'],
    ['104', 'API manzil'],
    ['43', 'qo‘shimcha API tekshiruvi'],
  ];
  const cw = (CW - 3 * 0.3) / 4;
  stats.forEach(([big, label, dark], i) => stat(s, big, label, M + i * (cw + 0.3), 1.5, cw, 1.6, dark));
  const box = { x: M + CW - 4.8, y: 3.45, w: 4.8, h: 2.9 };
  terminal(s, [
    ['PS> dotnet test', '9CDCFE'],
    ['Passed!  Failed: 0', '4ADE80'],
    ['Passed: 457, Total: 457', '4ADE80'],
    ['', 'D4D4D4'],
    ['PS> ng test --watch=false', '9CDCFE'],
    ['Test Files  35 passed', '4ADE80'],
    ['Tests      353 passed', '4ADE80'],
  ], box.x, box.y, box.w, box.h, 15);
  const rows = [
    ['container', 'Docker konteynerlarida', 'istalgan serverga bir buyruq bilan ko‘chadi'],
    ['server', 'VPS serverda ishlab turibdi', 'HTTPS, fayllar antivirusdan o‘tadi'],
    ['check', 'GitHub Actions', 'testlardan o‘tgan kod serverga o‘zi yangilanadi'],
  ];
  rows.forEach(([ic, h, d], i) => iconRow(s, ic, h, d, M, 3.55 + i * 1.0, box.x - M - 0.4, { d: 0.55, headSize: 16, descSize: 14 }));
  s.addNotes(
    '[≈30 soniya] Dastur hozir VPS serverda ishlab turibdi. U Docker konteynerlarida joylashtirilgan, shuning uchun istalgan tashkilot uni o‘z serveriga oson o‘rnatadi. Sifat 810 ta avtomatik test bilan tekshirilgan: serverda 457 ta, brauzer qismida 353 ta, birortasi ham xato bermagan. Bundan tashqari 43 ta qo‘shimcha API tekshiruvi va qo‘lda sinovlar o‘tkazildi. Yangi kod faqat testlardan o‘tgandan keyin serverga chiqadi.',
  );
}

// ───────────────────────────────────────── 12. Amaliyotga joriy etish  (≈30 s)
{
  const s = contentSlide(12, 'Amaliyotga joriy etildi: Elektron kooperatsiya portali');
  const lx = M, lw = 4.6;
  card(s, lx, 1.6, lw, 3.7, C.ink);
  badge(s, 'sparkles', lx + 0.35, 1.9, 0.65, C.pri);
  text(s, '“Milliy” yadrosi', { x: lx + 1.2, y: 1.92, w: lw - 1.4, h: 0.6, fontSize: 20, bold: true, color: C.white, valign: 'middle' });
  text(s, bulletList(['Xabarlarni jonli yetkazish', 'Chat va xabar qoidalari', 'Fayl yuborish', 'O‘qilganlik belgilari']), {
    x: lx + 0.35, y: 2.85, w: lw - 0.7, h: 2.3, fontSize: 19, color: C.tint2, paraSpaceAfter: 10, valign: 'top',
  });
  s.addShape(pres.shapes.RIGHT_ARROW, { x: lx + lw + 0.25, y: 3.05, w: 1.0, h: 0.8, fill: { color: C.pri }, line: { type: 'none' } });
  const rx = lx + lw + 1.5, rw = W - M - rx;
  card(s, rx, 1.6, rw, 3.7, C.tint);
  badge(s, 'building-2', rx + 0.35, 1.9, 0.65, C.pri);
  text(s, 'Elektron kooperatsiya portali', { x: rx + 1.2, y: 1.92, w: rw - 1.4, h: 0.6, fontSize: 20, bold: true, color: C.ink, valign: 'middle' });
  text(s, bulletList([
    'Kompaniyalar portalning o‘zida bir-biri bilan yozishadi',
    'Suhbat ishtirokchisi — odam emas, kompaniya',
    'Kirish — portalning o‘z hisoblari orqali',
  ]), { x: rx + 0.35, y: 2.85, w: rw - 0.7, h: 2.3, fontSize: 19, color: C.text, paraSpaceAfter: 10, valign: 'top' });
  card(s, M, 5.6, CW, 0.9, C.tint2);
  s.addImage({ path: icon('check', C.ok), x: M + 0.3, y: 5.87, w: 0.36, h: 0.36 });
  text(s, 'Natija: “Milliy” yadrosini boshqa axborot tizimlariga alohida modul sifatida qo‘shish mumkinligi amalda isbotlandi.', {
    x: M + 0.85, y: 5.6, w: CW - 1.1, h: 0.9, fontSize: 17, bold: true, color: C.ink, valign: 'middle',
  });
  s.addNotes(
    '[≈30 soniya] Ish faqat nazariy emas — u amaliyotga joriy etildi. “Milliy” xabarchining yadrosi — jonli yetkazish, chat qoidalari, fayl yuborish va o‘qilganlik belgilari — Elektron kooperatsiya portalida kompaniyalar o‘rtasidagi chat modulini yaratishda qayta ishlatildi. Bu yerda suhbat ishtirokchisi alohida odam emas, kompaniya, kirish esa portalning o‘z hisoblari orqali. Bu tajriba “Milliy” yadrosini istalgan axborot tizimiga modul sifatida qo‘shish mumkinligini ko‘rsatdi. (Joriy etish dalolatnomasi bo‘lsa, shu yerda tilga oling.)',
  );
}

// ───────────────────────────────────────── 13. HFX  (≈20 s)
{
  const s = contentSlide(13, 'Hayot faoliyati xavfsizligi');
  const a = framed(s, '4-1-workstation.png', M, 1.45, 5.4, 3.4, { align: 'left' });
  const b = framed(s, '4-3-evacuation-plan.png', a.x + a.w + 0.4, 1.45, W - M - (a.x + a.w + 0.4), 3.4, { align: 'right' });
  for (const [box, label] of [[a, 'Ergonomik ish joyi'], [b, 'IT-ofis qavatining evakuatsiya reja-sxemasi']]) {
    text(s, label, { x: box.x, y: box.y + box.h + 0.08, w: box.w, h: 0.3, fontSize: 12, italic: true, color: C.muted, align: 'center' });
  }
  const stats = [
    ['armchair', '6 m² / 20 m³', 'bitta ish joyiga eng kam'],
    ['lightbulb', '300–500 lk', 'stol yuzasi yoritilganligi'],
    ['door-open', '≥ 2 chiqish', 'har bir qavatda'],
    ['flame', 'OU-3 / OU-5', 'o‘t o‘chirgich turi'],
  ];
  const cw = (CW - 3 * 0.3) / 4;
  stats.forEach(([ic, big, label], i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 5.35, cw, 1.2, C.tint);
    badge(s, ic, x + 0.2, 5.55, 0.5);
    text(s, big, { x: x + 0.85, y: 5.47, w: cw - 0.95, h: 0.5, fontSize: 20, bold: true, color: C.ink, valign: 'middle' });
    text(s, label, { x: x + 0.85, y: 5.97, w: cw - 0.95, h: 0.5, fontSize: 12, color: C.muted, valign: 'top' });
  });
  s.addNotes(
    '[≈20 soniya] Hayot faoliyati xavfsizligi bo‘limida dasturchining ish joyiga qo‘yiladigan talablar keltirildi: bitta ish joyiga kamida 6 kvadrat metr maydon, stolda 300–500 lyuks yorug‘lik. IT-ofis qavati uchun evakuatsiya reja-sxemasi tuzildi va yong‘inda xodimlar nima qilishi belgilandi.',
  );
}

// ───────────────────────────────────────── 14. Xulosa  (≈40 s)
{
  const s = contentSlide(14, 'Xulosa va istiqbollar');
  const results = [
    'Messenjerlar va real vaqt texnologiyalari tahlil qilindi, SignalR tanlandi',
    'Talablar, arxitektura va 43 jadvalli baza loyihalandi',
    'Parolsiz xavfsiz kirish va maxfiy chat yaratildi',
    'Lotin↔kirill, tashkilot rejimi va forum ishlab chiqildi',
    'VPS’ga joylashtirildi, 810 test, portalga joriy etildi',
  ];
  text(s, 'Vazifalar bajarildi', { x: M, y: 1.45, w: 6.5, h: 0.45, fontSize: 20, bold: true, color: C.ink });
  results.forEach((t, i) => {
    const y = 2.1 + i * 0.88;
    s.addImage({ path: icon('check', C.ok), x: M, y: y + 0.02, w: 0.4, h: 0.4 });
    text(s, t, { x: M + 0.6, y, w: 6.3, h: 0.8, fontSize: 16, color: C.text, valign: 'top' });
  });
  const px = 7.7, pw = W - M - px;
  card(s, px, 1.45, pw, 5.2, C.ink);
  text(s, 'Keyingi bosqich', { x: px + 0.35, y: 1.65, w: pw - 0.7, h: 0.45, fontSize: 20, bold: true, color: C.white });
  const future = [
    ['bot', 'Sun’iy intellekt yordamchisi: qisqa mazmun, tarjima, spam'],
    ['phone', 'Ovozli xabar va qo‘ng‘iroqlar, kanallar, botlar'],
    ['fingerprint', 'OneID orqali shaxsni tasdiqlash'],
    ['smartphone', 'Message broker, workerlar va mobil push (FCM)'],
    ['store', 'Bozor, auksion va tenderlar'],
  ];
  future.forEach(([ic, t], i) => {
    const y = 2.35 + i * 0.85;
    badge(s, ic, px + 0.35, y, 0.52);
    text(s, t, { x: px + 1.05, y: y - 0.08, w: pw - 1.25, h: 0.7, fontSize: 15, color: C.tint2, valign: 'middle' });
  });
  s.addNotes(
    '[≈40 soniya] Xulosa qilib aytganda, qo‘yilgan beshta vazifaning barchasi bajarildi: tahlil, loyihalash, xavfsizlik, o‘zbekcha imkoniyatlar va forum, joylashtirish va joriy etish. Ma’lumotlari o‘z serverida saqlanadigan, real vaqtda ishlaydigan messenjer yaratildi va hozir serverda ishlab turibdi. Unda boshqa messenjerlarda yo‘q imkoniyatlar bor: lotin va kirill, tashkilot rejimi va maxfiy chat. Dastur 810 ta test bilan tekshirilgan va Elektron kooperatsiya portaliga joriy etilgan. Istalgan universitet yoki kompaniya uni o‘z serverida ishga tushirib, yozishmalarini to‘liq o‘z nazoratida saqlay oladi. Keyingi bosqichda xabarlar message broker va workerlar orqali yetkaziladi, oflayn foydalanuvchiga push bildirishnoma boradi; shuningdek sun’iy intellekt yordamchisi, qo‘ng‘iroqlar, OneID va mobil ilovalar qo‘shiladi.',
  );
}

// ───────────────────────────────────────── 15. Rahmat
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  const lw = 7.6;
  badge(s, 'check', M, 1.7, 1.0, C.pri);
  text(s, 'E’tiboringiz uchun rahmat!', { x: M, y: 2.9, w: lw, h: 1.0, fontSize: 42, bold: true, color: C.white, valign: 'middle' });
  text(s, 'Savollaringizga javob berishga tayyorman', { x: M, y: 3.95, w: lw, h: 0.5, fontSize: 20, color: C.tint3 });
  text(s, 'S.O. Sohinazarov', { x: M, y: 5.3, w: lw, h: 0.4, fontSize: 16, bold: true, color: C.white });
  text(s, 'Toshkent – 2026', { x: M, y: 5.75, w: lw, h: 0.4, fontSize: 14, color: C.tint4 });
  // QR to the running app, on a white card so phones can scan it from the projector.
  const qrFile = path.join(ROOT, 'slides-cache', 'qr-qales.png');
  const { default: QRCode } = await import('qrcode');
  await QRCode.toFile(qrFile, 'https://www.qales.uz', { width: 600, margin: 1, color: { dark: '#1E1B4B', light: '#FFFFFF' } });
  const qd = 3.4, qx = W - M - qd - 0.3, qy = 1.55;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: qx - 0.3, y: qy - 0.3, w: qd + 0.6, h: qd + 1.25, rectRadius: 0.15, fill: { color: C.white }, line: { type: 'none' } });
  s.addImage({ path: qrFile, x: qx, y: qy, w: qd, h: qd });
  text(s, [
    { text: 'www.qales.uz', options: { bold: true, fontSize: 20, color: C.ink, breakLine: true } },
    { text: 'dastur ishlab turibdi — sinab ko‘ring', options: { fontSize: 12, color: C.muted } },
  ], { x: qx - 0.3, y: qy + qd + 0.05, w: qd + 0.6, h: 0.85, align: 'center', valign: 'middle' });
  s.addNotes('E’tiboringiz uchun rahmat! Dastur www.qales.uz manzilida ishlab turibdi — QR-kod orqali telefoningizda ochib ko‘rishingiz mumkin. Savollaringiz bo‘lsa, javob berishga tayyorman.');
}

// ═════════════════════════════════════════ ZAXIRA SLAYDLAR — shown only when the commission asks
const BACKUP_TOTAL = 11;
let backupN = 0;
/** Backup slide: same look as content slides, but tagged “ZAXIRA” and numbered separately. */
function backupSlide(title) {
  const s = pres.addSlide();
  backupN += 1;
  s.background = { color: C.white };
  text(s, title, { x: M, y: 0.4, w: CW - 1.6, h: 0.8, fontSize: 28, bold: true, color: C.ink, valign: 'middle' });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: W - M - 1.4, y: 0.62, w: 1.4, h: 0.36, rectRadius: 0.18, fill: { color: C.tint2 }, line: { type: 'none' } });
  text(s, 'ZAXIRA', { x: W - M - 1.4, y: 0.62, w: 1.4, h: 0.36, fontSize: 12, bold: true, color: C.pri, align: 'center', valign: 'middle', charSpacing: 2 });
  text(s, TOPIC, { x: M, y: 6.98, w: 8, h: 0.3, fontSize: 10, color: C.muted });
  text(s, `Zaxira ${backupN} / ${BACKUP_TOTAL}`, { x: W - M - 2, y: 6.98, w: 2, h: 0.3, fontSize: 10, color: C.muted, align: 'right' });
  return s;
}
const headRow = (cols, size = 13) => cols.map((h) => cell(h, { bold: true, color: C.white, fill: { color: C.ink }, fontSize: size }));
const zebra = (i) => ({ color: i % 2 ? C.white : 'F9FAFB' });

// Z1. Ma'lumotlar bazasi
{
  const s = backupSlide('Ma’lumotlar bazasi: 11 sxema, 43 jadval');
  const rows = [
    ['identity', 'users, contacts, blocked_users', 'Foydalanuvchilar va aloqalar'],
    ['security', 'sessions, email_verification_codes, two_factor_auth', 'Sessiyalar, bir martalik kodlar'],
    ['chat', 'chats, chat_members, groups, channels, channel_subscribers, secret_chats', 'Chatlar, a’zolik va rollar, maxfiy chatlar'],
    ['messaging', 'messages, attachments, message_views, reactions, polls, poll_options, poll_votes, secret_messages, secret_files', 'Xabarlar, biriktirmalar, o‘qilganlik, reaksiyalar, shifrlangan xabarlar'],
    ['organizations', 'organizations, organization_members', 'Tashkilotlar (e-pochta domenlari)'],
    ['storage', 'files, photos, stickers, sticker_sets', 'Fayllar, rasmlar, stikerlar'],
    ['story', 'stories, story_views', 'Lavhalar va ko‘rishlar'],
    ['forum', 'posts, post_media, post_likes, post_views, post_reports, follows, forum_notifications', 'Postlar, layklar, obunalar, bildirishnomalar'],
    ['personal', 'folders, folder_chats, saved_messages, subscriptions', 'Papkalar, saqlangan xabarlar'],
    ['call', 'calls, call_participants', 'Qo‘ng‘iroqlar (kelajak uchun)'],
    ['bot', 'bots', 'Botlar (kelajak uchun)'],
  ];
  s.addTable([
    headRow(['Sxema', 'Jadvallar', 'Vazifasi']),
    ...rows.map(([a, b, c], i) => [
      cell(a, { bold: true, color: C.pri, fontSize: 12, fill: zebra(i) }),
      cell(b, { fontFace: 'Consolas', fontSize: 10, fill: zebra(i) }),
      cell(c, { fontSize: 11, fill: zebra(i) }),
    ]),
  ], { x: M, y: 1.4, w: CW, colW: [1.7, 6.3, CW - 8.0], rowH: 0.44, border: { type: 'solid', color: C.line, pt: 0.75 } });
  s.addNotes('Baza PostgreSQL’da, 11 sxemaga ajratilgan 43 ta jadval. Kanallar, qo‘ng‘iroqlar va botlar uchun jadvallar kelgusi imkoniyatlar uchun oldindan tayyorlangan. Barcha vaqtlar UTC’da saqlanadi, xabarlar ro‘yxati kursorli sahifalash bilan indeks bo‘yicha o‘qiladi.');
}

// Z2. Token hayot sikli
{
  const s = backupSlide('Kirish va tokenlar hayot sikli');
  const steps = [
    ['E-pochtaga 6 xonali kod', 'Bazada faqat PBKDF2 xeshi; parol umuman yo‘q'],
    ['Yoki Google hisobi', 'Google ID tokeni serverda tekshiriladi'],
    ['JWT access token — 15 daqiqa', 'Har bir API so‘rovi va SignalR ulanishida tekshiriladi'],
    ['Refresh token — 30 kun, rotatsiya', 'HttpOnly cookie’da, bazada HMAC xeshi; har safar almashadi'],
    ['Qurilmalar bo‘yicha sessiyalar', 'Begona qurilmani chiqarib yuborish mumkin'],
  ];
  steps.forEach(([h, d], i) => {
    const y = 1.55 + i * 1.0;
    num(s, i + 1, M, y, 0.5);
    text(s, h, { x: M + 0.7, y: y - 0.04, w: 5.6, h: 0.35, fontSize: 16, bold: true, color: C.ink });
    text(s, d, { x: M + 0.7, y: y + 0.32, w: 5.6, h: 0.5, fontSize: 13, color: C.muted, valign: 'top' });
  });
  framed(s, '2-10-token-lifecycle.png', 7.3, 1.5, W - M - 7.3, 5.1);
  s.addNotes('Kirish parolsiz: pochtaga kod yoki Google. Kirgach 15 daqiqalik access token va 30 kunlik refresh token beriladi. Refresh token HttpOnly cookie’da, bazada esa uning HMAC xeshi saqlanadi va har yangilanishda almashtiriladi — o‘g‘irlangan eski token qayta ishlatilsa, u rad etiladi.');
}

// Z3. Real vaqt texnologiyalari
{
  const s = backupSlide('Real vaqt texnologiyalarini taqqoslash');
  const body = [
    ['Short polling', 'Mijoz → server', 'Yuqori', 'Barchasi'],
    ['Long polling', 'Mijoz → server', 'O‘rtacha', 'Barchasi'],
    ['Server-Sent Events', 'Server → mijoz', 'Past', 'Zamonaviy'],
    ['WebSocket', 'Ikki tomonlama', 'Juda past', 'Zamonaviy'],
    ['SignalR', 'Ikki tomonlama', 'Juda past', 'Barchasi (fallback)'],
  ];
  const sig = body.length - 1;
  s.addTable([
    headRow(['Texnologiya', 'Yo‘nalish', 'Kechikish', 'Brauzerlar'], 15),
    ...body.map((r, ri) => r.map((t, i) => cell(t, {
      fontSize: 15, bold: ri === sig, color: ri === sig ? C.ink : C.text, align: i ? 'center' : 'left',
      fill: { color: ri === sig ? C.tint2 : ri % 2 ? 'F9FAFB' : C.white },
    }))),
  ], { x: M, y: 1.55, w: 7.6, colW: [2.3, 2.0, 1.5, 1.8], rowH: 0.8, border: { type: 'solid', color: C.line, pt: 0.75 } });
  const px = 8.6, pw = W - M - px;
  card(s, px, 1.55, pw, 4.8, C.tint);
  text(s, 'Nega SignalR?', { x: px + 0.3, y: 1.8, w: pw - 0.6, h: 0.5, fontSize: 20, bold: true, color: C.ink });
  text(s, bulletList([
    'WebSocket tezligi; ishlamasa SSE yoki long polling’ga o‘zi o‘tadi',
    'Hub: server va mijoz bir-birining metodlarini chaqiradi',
    'Guruhlar, JWT tekshiruvi va qayta ulanish tayyor',
    '.NET tarkibida; brauzer uchun rasmiy @microsoft/signalr',
  ]), { x: px + 0.3, y: 2.45, w: pw - 0.6, h: 3.7, fontSize: 15, color: C.text, paraSpaceAfter: 10, valign: 'top' });
  s.addNotes('Beshta usul solishtirildi. Polling’lar kechikadi va serverni ortiqcha yuklaydi, SSE faqat bir tomonlama. WebSocket eng tez, lekin ayrim tarmoqlarda bloklanadi. SignalR WebSocket bilan ishlaydi, u ishlamasa o‘zi SSE yoki long polling’ga o‘tadi, guruhlar va qayta ulanish esa tayyor holda bor.');
}

// Z4. Testlar
{
  const s = backupSlide('Avtomatik testlar tarkibi: 810 / 810 o‘tdi');
  const rows = [
    ['Lotin↔kirill va qidiruv kaliti', '167', '80 juftlik ikkala yo‘nalishda, kontekst qoidalari, himoyalangan qismlar'],
    ['Forum (6 sinf)', '79', 'Post, javob, iqtibos, cheklovlar, shikoyat, top lenta, obunalar'],
    ['Tashkilotlar (3 sinf)', '44', 'Domenni ajratish, o‘xshash domenlar, birinchi — admin, taklif havolalari'],
    ['Maxfiy chat', '39', 'Qurilmaga bog‘lash, takroriy seq rad etiladi, ack, chiqishda yopilish'],
    ['Reaksiya, bloklash, lavhalar', '30', 'Ruxsat etilgan emoji, bloklangan chatga yozish, faqat obunalar lavhasi'],
    ['Sekin internetga moslashuv', '32', 'Delta sync, qayta yuborish, xira nusxa, 360p video, kesh'],
    ['Guruhlar va ruxsatlar', '22', 'Rollar, egalikni o‘tkazish, a’zolar limiti'],
    ['Xeshlash, sessiyalar va boshqalar', '44', 'PBKDF2, HMAC, kursorli sahifalash, validatsiya'],
    ['Server jami (xUnit)', '457', ''],
    ['Brauzer jami (Vitest, 35 fayl)', '353', 'Transliteratsiya, maxfiy chat protokoli, servislar, komponentlar'],
  ];
  s.addTable([
    headRow(['Modul', 'Soni', 'Nima tekshiriladi']),
    ...rows.map(([a, b, c], i) => {
      const total = i >= 8;
      const fill = total ? { color: C.tint2 } : zebra(i);
      return [
        cell(a, { bold: true, fontSize: 12, color: C.ink, fill }),
        cell(b, { bold: true, fontSize: 13, color: C.pri, align: 'center', fill }),
        cell(c, { fontSize: 12, fill }),
      ];
    }),
  ], { x: M, y: 1.4, w: CW, colW: [3.6, 1.0, CW - 4.6], rowH: 0.46, border: { type: 'solid', color: C.line, pt: 0.75 } });
  text(s, 'Qo‘shimcha: guruh chatlari uchun 43 ta API tekshiruvi; maxfiy chat ikki brauzerda haqiqiy server bilan sinaldi.', {
    x: M, y: 6.45, w: CW, h: 0.4, fontSize: 13, italic: true, color: C.muted,
  });
  s.addNotes('Serverda 457 ta, brauzerda 353 ta test — hammasi o‘tgan. Eng ko‘p test lotin–kirill o‘girishga yozilgan, chunki bu yerda xato bo‘lsa, foydalanuvchi buni darhol ko‘radi. Baza va pochta testlarda soxta nusxalar bilan almashtirilgan, vaqtga bog‘liq qismlar “to‘xtatilgan soat” bilan sinalgan.');
}

// Z5. Lotin ↔ kirill qoidalari
{
  const s = backupSlide('Lotin ↔ kirill: o‘girish qoidalari misollarda');
  const rows = [
    ['ў, қ, ғ, ҳ', 'Қишлоқ хўжалиги', 'Qishloq xo‘jaligi'],
    ['е so‘z boshida → ye', 'Европа, ер', 'Yevropa, yer'],
    ['е so‘z ichida → e', 'Тошкент', 'Toshkent'],
    ['ё, ю, я', 'Ёшлар, Янги йил', 'Yoshlar, Yangi yil'],
    ['ц unlidan keyin → ts', 'лицей, милиция', 'litsey, militsiya'],
    ['ц boshqa holatda → s', 'цирк, функция', 'sirk, funksiya'],
    ['ъ → tutuq belgisi', 'таълим, объект', 'ta’lim, ob’yekt'],
    ['Katta harflar', 'ЎЗБЕКИСТОН', 'O‘ZBEKISTON'],
    ['O‘girilmaydi: havola, pochta', 'ali.valiyev@tuit.uz', 'ali.valiyev@tuit.uz'],
  ];
  s.addTable([
    headRow(['Qoida', 'Kirill', 'Lotin'], 14),
    ...rows.map(([a, b, c], i) => [
      cell(a, { bold: true, fontSize: 14, color: C.ink, fill: zebra(i) }),
      cell(b, { fontSize: 15, fill: zebra(i) }),
      cell(c, { fontSize: 15, color: C.pri, bold: true, fill: zebra(i) }),
    ]),
  ], { x: M, y: 1.4, w: 8.6, colW: [3.2, 2.7, 2.7], rowH: 0.5, border: { type: 'solid', color: C.line, pt: 0.75 } });
  const px = 9.6, pw = W - M - px;
  card(s, px, 1.4, pw, 5.0, C.ink);
  text(s, 'Qanday ishlaydi', { x: px + 0.3, y: 1.6, w: pw - 0.6, h: 0.45, fontSize: 18, bold: true, color: C.white });
  text(s, bulletList([
    'Xabar bazada asl holida; o‘girish faqat ekranda',
    'Qidiruv uchun har xabarning lotin, kichik harfli nusxasi saqlanadi',
    'Bitta 80 juftlik to‘plam C# va TypeScript testlarida bir xil',
    '1995-yilgi imlo qoidalariga asoslangan',
  ]), { x: px + 0.3, y: 2.2, w: pw - 0.6, h: 4.0, fontSize: 14, color: C.tint2, paraSpaceAfter: 10, valign: 'top' });
  s.addNotes('Algoritm 1995-yilgi lotin yozuvi qoidalariga asoslangan va kontekstni hisobga oladi: “е” so‘z boshida “ye”, ichida “e”; “ц” unlidan keyin “ts”, boshqa holatda “s”; qattiq belgi tutuq belgisiga aylanadi. Havola, e-pochta va @username o‘girilmaydi. Bitta 80 juftlik misollar to‘plami server va brauzer testlarida bir xil ishlatiladi.');
}

// ═════════════════════════════════════════ ZAXIRA: ehtimoliy savollarga javoblar
let qaN = 0;
/** Question slide: the question as title, a one-line short answer, then four supporting points. */
function qaSlide(question, short, points, notes) {
  qaN += 1;
  const s = backupSlide(`Savol ${qaN}: «${question}»`);
  card(s, M, 1.45, CW, 1.0, C.ink);
  badge(s, 'check', M + 0.25, 1.65, 0.6, C.pri);
  text(s, [
    { text: 'Qisqa javob: ', options: { bold: true, color: C.tint4 } },
    { text: short, options: { color: C.white } },
  ], { x: M + 1.05, y: 1.45, w: CW - 1.3, h: 1.0, fontSize: 17, valign: 'middle' });
  const cw = (CW - 0.35) / 2, ch = 1.75;
  points.forEach(([ic, h, d], i) => {
    const x = M + (i % 2) * (cw + 0.35), y = 2.75 + Math.floor(i / 2) * (ch + 0.25);
    card(s, x, y, cw, ch, C.tint);
    badge(s, ic, x + 0.3, y + 0.3, 0.65);
    text(s, h, { x: x + 1.2, y: y + 0.25, w: cw - 1.45, h: 0.45, fontSize: 18, bold: true, color: C.ink, valign: 'middle' });
    text(s, d, { x: x + 1.2, y: y + 0.75, w: cw - 1.45, h: 0.9, fontSize: 14, color: C.text, valign: 'top' });
  });
  s.addNotes(notes);
}

qaSlide('Telegramdan farqi nima?',
  'Telegram — xorijiy xizmat. «Milliy»ni tashkilot o‘z serverida ishga tushiradi va u o‘zbek tiliga moslashgan.',
  [
    ['database', 'Ma’lumotlar o‘z serveringizda', 'Telegram serverlari chet elda. «Milliy»ni universitet yoki kompaniya o‘zi o‘rnatadi va nazorat qiladi.'],
    ['languages', 'Lotin ↔ kirill', 'Telegramda yo‘q: har kim o‘z yozuvida o‘qiydi, qidiruv ikkala yozuvda topadi.'],
    ['building-2', 'Tashkilot rejimi', 'Ish e-pochtasi orqali tashkilotning yopiq guruhiga avtomatik a’zolik.'],
    ['mail', 'Telefon raqami shart emas', 'Kirish e-pochta kodi yoki Google orqali; parol umuman yo‘q.'],
  ],
  'Telegram qulay, lekin u xorijiy kompaniya xizmati: ma’lumotlar chet eldagi serverlarda, qoidalarni ham kompaniya belgilaydi. «Milliy»ni esa istalgan tashkilot o‘z serveriga o‘rnatadi. Bundan tashqari Telegramda o‘zbek tilining ikki yozuvi hisobga olinmaydi va odamning qaysi tashkilotdan ekanini tasdiqlash yo‘q. Agar «Telegramda ham maxfiy chat bor-ku» deyishsa: ha, lekin u faqat mobil ilovalarda, veb va Desktop versiyada yo‘q; bizda esa brauzerning o‘zida ishlaydi.',
);

qaSlide('Nega SignalR?',
  'Eng tez usul — WebSocket bilan ishlaydi, u ishlamaydigan tarmoqda esa o‘zi boshqa usulga o‘tadi.',
  [
    ['zap', 'WebSocket tezligi', 'Ikki tomonlama doimiy ulanish: xabar soniyaning bir qismida yetadi.'],
    ['link', 'Avtomatik zaxira usul', 'WebSocket bloklansa → Server-Sent Events → long polling.'],
    ['users', 'Guruhlar tayyor', 'Xabar chatning barcha a’zolariga bitta chaqiruv bilan yuboriladi.'],
    ['shield-check', 'Xavfsizlik va qayta ulanish', 'Ulanishda JWT tekshiriladi, uzilganda o‘zi qayta ulanadi.'],
  ],
  'Beshta usul solishtirildi (batafsil — Zaxira 3). Toza WebSocket ham tez, lekin uni ishlatsak, zaxira usullarni, guruhlarni, qayta ulanishni va autentifikatsiyani o‘zimiz yozishimiz kerak edi. SignalR bularning hammasini .NET tarkibida tayyor beradi va brauzer uchun rasmiy klienti bor.',
);

qaSlide('Server buzilsa nima bo‘ladi?',
  'Xabarlar bazada saqlanadi, server o‘zi qayta ishga tushadi; buzib kirilsa ham parol va maxfiy xabarlar qo‘lga tushmaydi.',
  [
    ['server', 'Server to‘xtasa', 'Docker konteynerlari o‘zi qayta ishga tushadi (restart, healthcheck).'],
    ['timer', 'Foydalanuvchi uchun', 'Brauzer 0–2–5–10 soniyada qayta ulanadi va o‘tkazib yuborilgan xabarlarni oladi.'],
    ['database', 'Xabar yo‘qolmaydi', 'Avval bazaga yoziladi; yuborilmagan xabar qurilmada navbatda turib qayta yuboriladi.'],
    ['lock', 'Buzib kirilsa', 'Parol yo‘q, kod va tokenlar xesh holida; maxfiy chatlardan faqat shifr matn.'],
  ],
  'Ikki holatni ajrataman. Birinchisi — server ishdan chiqsa: konteynerlar avtomatik qayta ishga tushadi, brauzer esa o‘zi qayta ulanib, o‘tkazib yuborilgan xabarlarni oladi. Xabar avval bazaga yozilgani uchun yo‘qolmaydi, internet bo‘lmagan paytda yozilgan xabar esa qurilmada navbatda turadi va keyin yuboriladi. Ikkinchisi — serverga buzib kirilsa: bazada parollar umuman yo‘q, kirish kodlari va tokenlar faqat xesh ko‘rinishida, maxfiy chatlardan esa faqat ma’nosiz shifr matn qoladi. Kelgusida bir nechta server ishlatilsa, bittasi to‘xtaganda qolganlari ishlashda davom etadi.',
);

qaSlide('Necha foydalanuvchiga chidaydi?',
  'Aniq son yuklama sinovida o‘lchanadi; arxitektura esa server qo‘shib kengayishga tayyor.',
  [
    ['server', 'Holat saqlamaydigan server', 'Foydalanuvchi kimligi tokenda — so‘rovga istalgan server javob beradi.'],
    ['users', 'Bir nechta server', 'Onlayn holat va jonli ulanishlar Redis orqali umumlashtiriladi.'],
    ['trending-up', 'Yuk taqsimlovchi', 'WhatsApp kabi: ulanishlar serverlarga bo‘linadi, har biri yuz minglab ulanish.'],
    ['sparkles', 'Keyingi qadam', 'Message broker va workerlar: yetkazish alohida kengayadi (12-slayd).'],
  ],
  'Halol javob: alohida yuklama sinovi — masalan, million ulanish bilan — hali o‘tkazilmagan, shuning uchun aniq son aytmayman. Lekin arxitektura bunga tayyorlab qurilgan: server foydalanuvchi holatini o‘zida saqlamaydi, shuning uchun foydalanuvchi ko‘paysa yangi server qo‘shiladi, serverlar esa Redis orqali bog‘lanadi. Bu WhatsApp ishlatadigan yo‘l. Keyingi bosqichda xabarlarni yetkazish message broker va workerlarga o‘tkaziladi. (Agar o‘zingiz yuklama sinovini o‘tkazgan bo‘lsangiz, shu yerda haqiqiy raqamni ayting.)',
);

qaSlide('Maxfiy chatda kalit yo‘qolsa nima bo‘ladi?',
  'Kalit faqat qurilmada — u yo‘qolsa, o‘sha maxfiy chat tarixi ham o‘qilmaydi. Bu xato emas, himoyaning o‘zi.',
  [
    ['smartphone', 'Kalit faqat qurilmada', 'Brauzerning IndexedDB’sida, ajratib olinmaydigan CryptoKey sifatida.'],
    ['ban', 'Qurilma yo‘qolsa yoki chiqilsa', 'Maxfiy chat yopiladi, serverda nusxa yo‘q — yangi maxfiy chat ochiladi.'],
    ['shield-check', 'Kalit o‘g‘irlansa', 'Har xabarga yangi kalit: oldingi xabarlarni baribir ochib bo‘lmaydi.'],
    ['fingerprint', 'Server kalitni almashtirsa', 'Kalit izi farq qiladi — foydalanuvchilar buni ko‘radi.'],
  ],
  'Maxfiy chatning ma’nosi shuki, kalit faqat ikki suhbatdoshning qurilmasida turadi. Kalit brauzerda shunday saqlanadiki, uni sahifadagi skript ham o‘qib, nusxalab ololmaydi. Shuning uchun qurilma yo‘qolsa yoki foydalanuvchi tizimdan chiqsa, o‘sha maxfiy chat yopiladi va uning tarixini hech kim — server ham — tiklay olmaydi; yangi maxfiy chat ochiladi. Telegram’ning maxfiy chatlari ham xuddi shunday qurilmaga bog‘langan. Kalit o‘g‘irlangan taqdirda ham har bir xabar alohida kalit bilan shifrlangani uchun eski xabarlar himoyada qoladi.',
);

qaSlide('Nega mobil ilova yo‘q?',
  'Veb-ilova telefonda to‘liq ishlaydi va bosh ekranga o‘rnatiladi; alohida mobil ilovalar — keyingi bosqich.',
  [
    ['monitor-smartphone', 'Moslashuvchan interfeys', 'Telefon, planshet va kompyuter — bitta kod bazasi.'],
    ['smartphone', 'Ilova kabi o‘rnatiladi (PWA)', 'Manifest va service worker: bosh ekranga qo‘shiladi.'],
    ['server', 'API tayyor', '104 ta REST manzil va SignalR — mobil ilova shularga ulanadi.'],
    ['bell', 'Reja', 'Android va iOS ilovalari, FCM / APNs orqali push bildirishnomalar.'],
  ],
  'Diplom doirasida asosiy e’tibor server, xavfsizlik va o‘zbekcha imkoniyatlarga qaratildi. Veb-ilova telefonda ham to‘liq ishlaydi va PWA sifatida bosh ekranga o‘rnatiladi, ya’ni foydalanuvchi uchun oddiy ilovaga o‘xshaydi. Server qismi mobil ilovaga ham tayyor: 104 ta REST manzil va SignalR’ning Android va iOS uchun rasmiy klientlari bor. Keyingi bosqichda alohida mobil ilovalar va oflayn foydalanuvchilarga push bildirishnomalar qo‘shiladi.',
);

await pres.writeFile({ fileName: OUT });
console.log(`Saved ${OUT}`);
