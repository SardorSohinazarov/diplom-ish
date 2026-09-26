// Builds ../Diplom_ishi_Sohinazarov_Sardor.docx from the chapter modules in ./content.
// Usage: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import {
  AlignmentType,
  Document,
  Footer,
  Packer,
  PageNumber,
  PageOrientation,
  Paragraph,
  TableOfContents,
  TextRun,
} from 'docx';

import { FONT, LINE, ROOT, SIZE, h1, numberingConfig } from './lib.mjs';
import { titlePage, assignmentPages } from './content/00-front.mjs';
import { annotation } from './content/01-annotation.mjs';
import { introduction } from './content/02-kirish.mjs';
import { chapter1 } from './content/10-bob1.mjs';

// Chapters are added here as they are written.
const optional = async (file, name) => {
  const full = path.join(ROOT, 'content', file);
  return fs.existsSync(full) ? (await import(`./content/${file}`))[name]() : [];
};

// The "MUNDARIJA" title itself must not appear in the table of contents, so it is not a heading.
const contents = [
  new Paragraph({
    pageBreakBefore: true,
    alignment: AlignmentType.CENTER,
    spacing: { line: LINE, after: 240 },
    children: [new TextRun({ text: 'MUNDARIJA', bold: true })],
  }),
  new TableOfContents('Mundarija', { hyperlink: true, headingStyleRange: '1-2' }),
];

const main = [
  ...annotation(),
  ...contents,
  ...introduction(),
  ...chapter1(),
  ...(await optional('20-bob2.mjs', 'chapter2')),
  ...(await optional('30-bob3.mjs', 'chapter3')),
  ...(await optional('40-bob4-hfx.mjs', 'chapter4')),
  ...(await optional('90-xulosa.mjs', 'conclusion')),
  ...(await optional('91-adabiyotlar.mjs', 'references')),
  ...(await optional('92-ilovalar.mjs', 'appendix')),
];

const page = {
  size: { width: 11906, height: 16838 },
  margin: { top: 1134, bottom: 1134, left: 1701, right: 851, header: 709, footer: 709 },
};

const doc = new Document({
  creator: 'Sohinazarov Sardor',
  title: '"Milliy chat" dasturini ishlab chiqish',
  description: 'Bitiruv malakaviy ishi',
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
    { properties: { page }, children: [...titlePage(), ...assignmentPages()] },
    ...splitSections(main),
  ],
});

/**
 * Splits the main flow into portrait sections, turning every landscapeFigure() marker
 * into its own landscape section. Page numbering continues across sections.
 */
function splitSections(items) {
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
  const landscapePage = { ...page, size: { ...page.size, orientation: PageOrientation.LANDSCAPE } };
  const sections = [];
  let current = [];
  const flush = () => {
    if (current.length) sections.push({ properties: { page }, footers, children: current });
    current = [];
  };
  for (const item of items) {
    if (item?.__landscape) {
      flush();
      sections.push({ properties: { page: landscapePage }, footers, children: item.children });
    } else {
      current.push(item);
    }
  }
  flush();
  return sections;
}

const out = path.join(ROOT, '..', 'Diplom_ishi_Sohinazarov_Sardor.docx');
fs.writeFileSync(out, await Packer.toBuffer(doc));
console.log('Yozildi:', out);
