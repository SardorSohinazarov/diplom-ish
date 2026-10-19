// Writes diagrams/2-6-use-case.svg: actors in the middle lane, their use cases on both sides,
// so the diagram stays compact on a portrait page. Render with: node tools/render-svg.mjs 2-6
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const W = 1000;
const ROW = 74; // vertical step between use cases
const RX = 165; // ellipse half-width
const RY = 31;
const LEFT = 200; // ellipse centres
const RIGHT = W - 200;
const MID = W / 2;

// [actor, left-side use cases, right-side use cases]
const groups = [
  ['Mehmon', ['E-pochta kodi yoki|Google orqali kirish'], ['Ro‘yxatdan o‘tish']],
  [
    'Foydalanuvchi',
    [
      'Profil va sessiyalarni|boshqarish',
      'Foydalanuvchi qidirish,|kontaktlar',
      'Shaxsiy chat: yuborish,|tahrirlash, o‘chirish',
      'Rasm, video, fayl|yuborish',
      'Xabarga reaksiya|bildirish',
      'Xabarlarni qidirish',
      'Lotin yoki kirillda|ko‘rish',
    ],
    [
      'Foydalanuvchini|bloklash',
      'Lavha joylash|va ko‘rish',
      'Forumda post, javob,|repost, layk',
      'Obuna bo‘lish,|top lenta',
      'Maxfiy (E2E) chat,|kalitni tekshirish',
      'Guruh yaratish,|guruhdan chiqish',
      'Taklif havolasi orqali|yopiq guruhga qo‘shilish',
    ],
  ],
  [
    'Guruh admini',
    ['A’zo qo‘shish / chiqarish,|guruhni tahrirlash', 'Admin tayinlash, guruhni|o‘chirish (faqat ega)'],
    ['Taklif havolasini|yaratish / bekor qilish'],
  ],
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const text = (x, y, label, size = 22) => {
  const lines = label.split('|');
  const top = y - ((lines.length - 1) * size * 1.1) / 2 + size * 0.35;
  return lines
    .map((l, i) => `<text x="${x}" y="${(top + i * size * 1.1).toFixed(1)}" text-anchor="middle" font-size="${size}">${esc(l)}</text>`)
    .join('');
};
const actor = (x, y, name) =>
  `<g stroke="#111" stroke-width="2.5" fill="none">` +
  `<circle cx="${x}" cy="${y - 38}" r="12" fill="#fff"/><line x1="${x}" y1="${y - 26}" x2="${x}" y2="${y + 6}"/>` +
  `<line x1="${x - 20}" y1="${y - 14}" x2="${x + 20}" y2="${y - 14}"/>` +
  `<line x1="${x}" y1="${y + 6}" x2="${x - 16}" y2="${y + 30}"/><line x1="${x}" y1="${y + 6}" x2="${x + 16}" y2="${y + 30}"/></g>` +
  `<rect x="${x - name.length * 5.6}" y="${y + 36}" width="${name.length * 11.2}" height="30" fill="#fafafa"/>` +
  text(x, y + 50, name, 22).replace('font-size="22"', 'font-size="22" font-weight="bold"');

const parts = [];
const actorsAt = [];
let y = 120;
for (const [name, left, right] of groups) {
  const rows = Math.max(left.length, right.length);
  const top = y;
  const centre = top + ((rows - 1) * ROW) / 2;
  actorsAt.push(centre);
  for (const [items, cx, dir] of [
    [left, LEFT, -1],
    [right, RIGHT, 1],
  ]) {
    const offset = ((rows - items.length) * ROW) / 2;
    items.forEach((label, i) => {
      const cy = top + offset + i * ROW;
      parts.push(`<line x1="${MID + dir * 24}" y1="${centre - 14}" x2="${cx - dir * RX}" y2="${cy}" stroke="#555" stroke-width="1.6"/>`);
      parts.push(`<ellipse cx="${cx}" cy="${cy}" rx="${RX}" ry="${RY}" fill="#fff" stroke="#222" stroke-width="2"/>`);
      parts.push(text(cx, cy, label));
    });
  }
  parts.push(actor(MID, centre, name));
  y += rows * ROW + 70;
}
const H = y - 40;

// Generalisation: the group admin can do everything an ordinary user can.
const [, user, admin] = actorsAt;
const generalisation =
  `<line x1="${MID}" y1="${admin - 54}" x2="${MID}" y2="${user + 76}" stroke="#111" stroke-width="2" stroke-dasharray="7 5" marker-end="url(#g)"/>` +
''; // (no label: the relation is explained in the text)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Times New Roman, serif" fill="#111">
  <defs><marker id="g" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="14" markerHeight="14" orient="auto"><path d="M1,1 L11,6 L1,11 z" fill="#fff" stroke="#111" stroke-width="1.5"/></marker></defs>
  <rect width="${W}" height="${H}" fill="#fff"/>
  <rect x="12" y="12" width="${W - 24}" height="${H - 24}" fill="#fafafa" stroke="#777" stroke-width="2"/>
  <text x="${MID}" y="46" text-anchor="middle" font-size="24" font-weight="bold">“Milliy chat” tizimi</text>
  ${parts.join('\n  ')}
  ${generalisation}
</svg>
`;
fs.writeFileSync(path.join(ROOT, 'diagrams', '2-6-use-case.svg'), svg);
console.log('Yozildi: diagrams/2-6-use-case.svg', W, 'x', H);
