// Title page and assignment ("Topshiriq") pages, following the TATU template used by the department.
import {
  AlignmentType,
  BorderStyle,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { FONT, TEXT_WIDTH, blank, center, line, pageBreak, runs } from '../lib.mjs';

export const TOPIC = '“Milliy chat” dasturini ishlab chiqish';
const BLANK = '__________________';

const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
const thin = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const thinBorders = { top: thin, bottom: thin, left: thin, right: thin };

/** Borderless two/three column layout row used for signature blocks. */
function layoutTable(rows, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  const widths = weights.map((w) => Math.floor((TEXT_WIDTH * w) / total));
  return new Table({
    width: { size: TEXT_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    borders: noBorders,
    rows: rows.map(
      (cells) =>
        new TableRow({
          children: cells.map(
            (text, i) =>
              new TableCell({
                width: { size: widths[i], type: WidthType.DXA },
                borders: { top: none, bottom: none, left: none, right: none },
                children: String(text)
                  .split('\n')
                  .map(
                    (t) =>
                      new Paragraph({
                        alignment: i === 1 ? AlignmentType.CENTER : AlignmentType.LEFT,
                        spacing: { line: 276, after: 0 },
                        children: runs(t, t.startsWith('(') ? { size: 20, italics: true } : {}),
                      }),
                  ),
              }),
          ),
        }),
    ),
  });
}

/** Bordered table with small text (consultants, calendar schedule). */
function gridTable(headers, rows, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  const widths = weights.map((w) => Math.floor((TEXT_WIDTH * w) / total));
  const cell = (text, i, bold) =>
    new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      borders: thinBorders,
      margins: { top: 30, bottom: 30, left: 70, right: 70 },
      children: [
        new Paragraph({
          alignment: bold || i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { line: 240, after: 0 },
          children: [new TextRun({ text: String(text), bold, size: 24, font: FONT })],
        }),
      ],
    });
  return new Table({
    width: { size: TEXT_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, i, true)) }),
      ...rows.map((r) => new TableRow({ children: r.map((c, i) => cell(c, i, false)) })),
    ],
  });
}

const header = () => [
  center('O‘ZBEKISTON RESPUBLIKASI RAQAMLI TEXNOLOGIYALAR VAZIRLIGI', { bold: true }),
  center('MUHAMMAD AL-XORAZMIY NOMIDAGI', { bold: true }),
  center('TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI', { bold: true }),
];

export const titlePage = () => [
  ...header(),
  ...blank(2),
  line('Himoyaga ruxsat', { align: AlignmentType.RIGHT, bold: true }),
  line('“Tizimli va amaliy dasturlash”', { align: AlignmentType.RIGHT }),
  line('kafedrasi mudiri', { align: AlignmentType.RIGHT }),
  line('___________ K.F. Kerimov', { align: AlignmentType.RIGHT }),
  line('«____» ______________ 2026-yil', { align: AlignmentType.RIGHT }),
  ...blank(3),
  center('BITIRUV MALAKAVIY ISHI', { bold: true, size: 36 }),
  ...blank(1),
  center(`Mavzu: ${TOPIC}`, { bold: true, size: 32 }),
  center('(Telegramga o‘xshash milliy messenjer)', { size: 28 }),
  ...blank(4),
  layoutTable(
    [
      ['Bitiruvchi', `${BLANK}\n(imzo)`, 'S.O. Sohinazarov'],
      ['', '', ''],
      ['Ilmiy rahbar', `${BLANK}\n(imzo)`, BLANK],
      ['', '', ''],
      ['Taqrizchi', `${BLANK}\n(imzo)`, BLANK],
      ['', '', ''],
      ['HFX bo‘yicha maslahatchi', `${BLANK}\n(imzo)`, 'S. Abdullayeva'],
    ],
    [4, 4, 3],
  ),
  ...blank(5),
  center('Toshkent – 2026', { bold: true }),
];

export const assignmentPages = () => [
  pageBreak(),
  ...header(),
  ...blank(1),
  line('Fakultet: Dasturiy injiniring'),
  line('Kafedra: Tizimli va amaliy dasturlash'),
  line('Ta’lim yo‘nalishi: 60610600 – Dasturiy injiniring'),
  ...blank(1),
  line('TASDIQLAYMAN', { align: AlignmentType.RIGHT, bold: true }),
  line('“TAD” kafedrasi mudiri', { align: AlignmentType.RIGHT }),
  line('___________ K.F. Kerimov', { align: AlignmentType.RIGHT }),
  line('«____» ______________ 2026-yil', { align: AlignmentType.RIGHT }),
  ...blank(1),
  center('Sohinazarov Sardor O‘rinboy o‘g‘lining', { bold: true }),
  center('bitiruv malakaviy ishiga', {}),
  center('T O P S H I R I Q', { bold: true, size: 32, before: 120, after: 120 }),
  line(`1. BMI mavzusi: ${TOPIC}.`, { line: 320 }),
  line('2. BMI tasdiqlangan buyruq: «____» __________ 2026-yil № __________.', { line: 320 }),
  line('3. BMIni himoyaga topshirish muddati: __________________.', { line: 320 }),
  line(
    '4. BMIning boshlang‘ich ma’lumotlari: mavjud messenjerlar (Telegram, WhatsApp, Signal) tahlili, real vaqtda xabar almashish texnologiyalari, .NET 8, ASP.NET Core, PostgreSQL, SignalR va Angular texnologiyalariga oid adabiyotlar hamda amaliyot materiallari.',
    { line: 320, align: AlignmentType.JUSTIFIED },
  ),
  line(
    '5. Hisob-tushuntirish yozuvining mazmuni: sohaning tahlili va masalaning qo‘yilishi, tizim arxitekturasi va ma’lumotlar bazasini loyihalash, server va klient qismlarini ishlab chiqish, xavfsizlik choralari, foydalanish yo‘riqnomasi, hayot faoliyati xavfsizligi, xulosa.',
    { line: 320, align: AlignmentType.JUSTIFIED },
  ),
  line(
    '6. Grafik materiallar ro‘yxati: tizim arxitekturasi, ER-diagramma, UML (use-case, sequence) diagrammalari, dastur interfeysi skrinshotlari va PowerPoint taqdimoti.',
    { line: 320, align: AlignmentType.JUSTIFIED },
  ),
  line('7. Topshiriq berilgan sana: __________________.', { line: 320, after: 200 }),
  layoutTable(
    [
      ['Rahbar:', `${BLANK}\n(imzo)`, ''],
      ['Topshiriqni oldim:', `${BLANK}\n(imzo)`, ''],
    ],
    [4, 4, 3],
  ),
  pageBreak(),
  line('8. BMIning alohida bo‘limlari bo‘yicha maslahatchilar:', { line: 360, after: 120 }),
  gridTable(
    ['№', 'Bo‘lim nomi', 'Maslahatchi', 'Topshiriq berdi', 'Topshiriq oldi'],
    [
      ['1', 'Asosiy qism', BLANK, '', ''],
      ['2', 'Hayot faoliyati xavfsizligi', 'S. Abdullayeva', '', ''],
    ],
    [1, 5, 4, 3, 3],
  ),
  ...blank(1),
  line('9. BMIni bajarish bo‘yicha kalendar grafik:', { line: 360, after: 120 }),
  gridTable(
    ['№', 'Malakaviy ish bo‘limlari', 'Bajarish muddati', 'Rahbar imzosi'],
    [
      ['1', 'Kirish, masalaning qo‘yilishi', '', ''],
      ['2', 'Soha tahlili, mavjud messenjerlarni o‘rganish', '', ''],
      ['3', 'Tizimni loyihalash (arxitektura, ma’lumotlar bazasi, UML)', '', ''],
      ['4', 'Dasturning server va klient qismlarini ishlab chiqish', '', ''],
      ['5', 'Hayot faoliyati xavfsizligi', '', ''],
      ['6', 'Xulosa, adabiyotlar ro‘yxati, ilovalar', '', ''],
      ['7', 'Taqdimot slaydlarini tayyorlash', '', ''],
      ['8', 'Dastlabki himoya', '', ''],
    ],
    [1, 8, 3, 3],
  ),
  ...blank(2),
  layoutTable(
    [
      ['Bitiruv malakaviy ish rahbari:', `${BLANK}\n(imzo)`, ''],
      ['Bitiruvchi:', `${BLANK}\n(imzo)`, ''],
    ],
    [4, 4, 3],
  ),
];
