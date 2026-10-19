// Builds the supervisor's conclusion (rahbar xulosasi) in the same style as the diploma.
// The reviewer's report (taqriz) is written by the reviewer and kept as is in
// ../Taqriz_Sohinazarov_Sardor.docx, so it is not generated here.
// Usage: node hujjatlar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { AlignmentType, BorderStyle, Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from 'docx';

import { FONT, LINE, ROOT, SIZE, TEXT_WIDTH, blank, center, line, p, runs } from './lib.mjs';
import { TOPIC } from './content/00-front.mjs';

const STUDENT = 'Sohinazarov Sardorbek O‘rinboy o‘g‘li';
const STUDENT_GEN = 'Sohinazarov Sardorbek O‘rinboy o‘g‘lining';
const DIRECTION = '60610600 – “Dasturiy injiniring”';
const BLANK = '________________________';

const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };

/** Centered line that keeps **bold** markup (center() overrides it with its own bold option). */
const centerRich = (text) =>
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE }, children: runs(text) });

/** Signature block: position on the left, signature line in the middle, name on the right. */
function signature(left, name) {
  const widths = [0.5, 0.22, 0.28].map((w) => Math.floor(TEXT_WIDTH * w));
  const cell = (text, i, align) =>
    new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      borders: { top: none, bottom: none, left: none, right: none },
      verticalAlign: 'bottom',
      children: text.split('\n').map(
        (t) => new Paragraph({ alignment: align, spacing: { line: 276 }, children: runs(t, { bold: true }) }),
      ),
    });
  return new Table({
    width: { size: TEXT_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
    rows: [
      new TableRow({
        children: [
          cell(left, 0, AlignmentType.LEFT),
          cell('____________', 1, AlignmentType.CENTER),
          cell(name, 2, AlignmentType.RIGHT),
        ],
      }),
    ],
  });
}

const university = [
  center('MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT', { bold: true }),
  center('TEXNOLOGIYALARI UNIVERSITETI', { bold: true }),
];

const supervisor = () => [
  center('O‘ZBEKISTON RESPUBLIKASI', { bold: true }),
  center('RAQAMLI TEXNOLOGIYALAR VAZIRLIGI', { bold: true }),
  ...university,
  p(
    `${DIRECTION} yo‘nalishi 315-21 DIo‘ guruhi talabasi ${STUDENT} tomonidan yozilgan “${TOPIC}” mavzusidagi diplom loyihasiga`,
  ),
  center('Ilmiy rahbar xulosasi', { bold: true, line: LINE, after: 120 }),
  p(
    'Ushbu diplom loyihasi foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, shaxsiy va guruh yozishmalarida xabarlarni real vaqtda yetkazadigan “Milliy” xabarchini ishlab chiqishga bag‘ishlangan. Muallif to‘liq ishlaydigan veb-ilova yaratgan. Uning chat texnologiyasi Elektron kooperatsiya portalida kompaniyalar o‘rtasidagi chat modulini yaratishda qo‘llanilgan.',
  ),
  p(
    'Tizim tuzilishi, ma’lumotlar bazasi va foydalanuvchi rollari UML diagrammalar bilan ifodalangan. Server .NET muhitida, Entity Framework asosida, brauzer qismi esa Angular’da yozilgan, xabarlar SignalR orqali yetkaziladi. Lotin–kirill o‘girish, tashkilot rejimi, maxfiy chatlar, xabarlarga reaksiyalar, bloklash va forum amalga oshirilgan. Dasturni joylashtirish uchun Docker’dan foydalanilgan, dastur testlar bilan sinalgan.',
  ),
  p(
    'Diplom loyihasi to‘rtta bobdan iborat bo‘lib, loyihaning nazariy, texnik va amaliy jihatlari bosqichma-bosqich yoritilgan. Talaba mustaqillik va tashabbuskorlik namoyon etgan, kalendar grafikka rioya qilgan.',
  ),
  p(
    `Mazmun va talablarga mosligi nuqtai nazaridan, muallif **${STUDENT}**, **${DIRECTION}** yo‘nalishi bo‘yicha **bakalavr** darajasini olishga **loyiq** deb hisoblayman.`,
  ),
  ...blank(1),
  signature(`Ilmiy rahbar:\n“Axborot texnologiyalarining dasturiy ta’minoti” kafedrasi dotsenti, t.f.f.d.`, 'Y.Sh. Yuldoshev'),
];

const page = {
  size: { width: 11906, height: 16838 },
  margin: { top: 1134, bottom: 1134, left: 1701, right: 851, header: 709, footer: 709 },
};

async function write(file, title, children) {
  const doc = new Document({
    creator: 'Sohinazarov Sardorbek',
    title,
    styles: { default: { document: { run: { font: FONT, size: SIZE }, paragraph: { spacing: { line: LINE } } } } },
    sections: [{ properties: { page }, children }],
  });
  const out = path.join(ROOT, '..', file);
  fs.writeFileSync(out, await Packer.toBuffer(doc));
  console.log(out);
}

await write('Rahbar_xulosasi_Sohinazarov_Sardor.docx', 'Ilmiy rahbar xulosasi', supervisor());
