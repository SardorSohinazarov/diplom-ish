// Builds ../Diplom_ishi_Sohinazarov_Sardor.docx from the chapter modules in ./content.
// Usage: node build.mjs              — the whole document
//        node build.mjs --only bob3  — one part for a quick look (preview/<name>.docx)
import fs from 'node:fs';
import path from 'node:path';
import {
  AlignmentType,
  Document,
  Footer,
  Packer,
  PageNumber,
  Paragraph,
  TableOfContents,
  TextRun,
} from 'docx';

import { FONT, LINE, ROOT, SIZE, h1, layout, numberingConfig } from './lib.mjs';
import { titlePage, assignmentPages } from './content/00-front.mjs';
import { annotation } from './content/01-annotation.mjs';
import { introduction } from './content/02-kirish.mjs';
import { chapter1 } from './content/10-bob1.mjs';

const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;

const load = async (file, name) => (await import(`./content/${file}`))[name]();

// The "MUNDARIJA" title itself must not appear in the table of contents, so it is not a heading.
const contents = () => [
  new Paragraph({
    pageBreakBefore: true,
    alignment: AlignmentType.CENTER,
    spacing: { line: LINE, after: 240 },
    children: [new TextRun({ text: 'MUNDARIJA', bold: true })],
  }),
  new TableOfContents('Mundarija', { hyperlink: true, headingStyleRange: '1-2' }),
];

// Parts of the main flow in order; `--only <key>` builds just one of them.
const parts = [
  ['annotatsiya', annotation],
  ['mundarija', contents],
  ['kirish', introduction],
  ['bob1', chapter1],
  ['bob2', () => load('20-bob2.mjs', 'chapter2')],
  ['bob3', () => load('30-bob3.mjs', 'chapter3')],
  ['bob4', () => load('40-bob4-hfx.mjs', 'chapter4')],
  ['xulosa', () => load('90-xulosa.mjs', 'conclusion')],
  ['adabiyotlar', () => load('91-adabiyotlar.mjs', 'references')],
  ['ilovalar', () => load('92-ilovalar.mjs', 'appendix')],
];
if (only && !parts.some(([key]) => key === only)) {
  console.error(`Noma'lum qism: ${only}. Mavjudlari: ${parts.map(([key]) => key).join(', ')}`);
  process.exit(1);
}

const main = [];
for (const [key, build] of parts) if (!only || key === only) main.push(...(await build()));
moveParagraphsAboveFigures(main);
if (process.env.FIGURE_REPORT) fs.writeFileSync(process.env.FIGURE_REPORT, JSON.stringify(figureReport(main)));

/** For every figure: how many body paragraphs directly follow it (what `after` can still move). */
function figureReport(items) {
  const report = {};
  items.forEach((item, i) => {
    if (!item?.__figureEnd) return;
    let count = 0;
    while (items[i + 1 + count]?.__body) count++;
    report[item.__figureEnd] = { following: count };
  });
  return report;
}

/**
 * A figure that does not fit on the page jumps to the next one and leaves the rest of the page empty.
 * For figures listed in data/layout.json with `after: n`, the n body paragraphs that follow the figure
 * are placed before it instead, so their text fills that space (tools/fit-pages.mjs picks the figures).
 */
function moveParagraphsAboveFigures(items) {
  for (const [number, { after = 0 }] of Object.entries(layout)) {
    if (!after) continue;
    const start = items.findIndex((item) => item?.__figure === number);
    const end = items.findIndex((item) => item?.__figureEnd === number);
    if (start < 0 || end < start) continue;
    let count = 0;
    while (count < after && items[end + 1 + count]?.__body) count++;
    const moved = items.splice(end + 1, count);
    items.splice(start, 0, ...moved);
  }
}

const page = {
  size: { width: 11906, height: 16838 },
  margin: { top: 1134, bottom: 1134, left: 1701, right: 851, header: 709, footer: 709 },
};

const footers = {
  default: new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 24 })],
      }),
    ],
  }),
};

const doc = new Document({
  creator: 'Sohinazarov Sardorbek',
  title: 'Real vaqtda xabar almashish imkonini beruvchi “Milliy” xabarchi ishlab chiqish',
  description: 'Diplom loyihasi',
  features: { updateFields: true },
  styles: {
    default: {
      document: { run: { font: FONT, size: SIZE }, paragraph: { spacing: { line: LINE } } },
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { font: FONT, size: SIZE, bold: true, color: '000000' },
        paragraph: { outlineLevel: 0, alignment: AlignmentType.CENTER },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { font: FONT, size: SIZE, bold: true, color: '000000' },
        paragraph: { outlineLevel: 1 },
      },
    ],
  },
  numbering: numberingConfig,
  sections: [
    // Title and assignment pages: counted, but no visible page number.
    ...(only ? [] : [{ properties: { page }, children: [...titlePage(), ...assignmentPages()] }]),
    { properties: { page }, footers, children: main },
  ],
});

// DIPLOM_OUT lets tools/fit-pages.mjs build into a scratch file while the real one is open in an editor.
const out = only ? path.join(ROOT, 'preview', `${only}.docx`) : process.env.DIPLOM_OUT ?? path.join(ROOT, '..', 'Diplom_ishi_Sohinazarov_Sardor.docx');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, await Packer.toBuffer(doc));
console.log('Yozildi:', out);
