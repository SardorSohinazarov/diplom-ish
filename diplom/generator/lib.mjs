// Formatting helpers for the diploma document (TATU BMI format):
// A4, Times New Roman 14pt, 1.5 line spacing, 1.25 cm first-line indent, justified text.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  PageBreak,
  Paragraph,
  ShadingType,
  Tab,
  TabStopType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';

export const ROOT = path.dirname(fileURLToPath(import.meta.url));
export const FONT = 'Times New Roman';
export const SIZE = 28; // half-points → 14pt
export const LINE = 360; // 1.5 line spacing
export const INDENT = 709; // 1.25 cm
/** Usable text width: A4 (11906) − left 1701 − right 851 twips. */
export const TEXT_WIDTH = 11906 - 1701 - 851;

/**
 * Parses **bold**, ~italic~, _{subscript} and ^{superscript} inline markup into TextRuns.
 * (Not "_italic_": underscores are used for blank signature lines.)
 */
export function runs(text, base = {}) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|~[^~]+~|_\{[^}]+\}|\^\{[^}]+\})/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) parts.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const token = m[0];
    if (token.startsWith('**')) parts.push(new TextRun({ text: token.slice(2, -2), bold: true, ...base }));
    else if (token.startsWith('_{')) parts.push(new TextRun({ text: token.slice(2, -1), subScript: true, ...base }));
    else if (token.startsWith('^{')) parts.push(new TextRun({ text: token.slice(2, -1), superScript: true, ...base }));
    else parts.push(new TextRun({ text: token.slice(1, -1), italics: true, ...base }));
    last = m.index + token.length;
  }
  if (last < text.length) parts.push(new TextRun({ text: text.slice(last), ...base }));
  return parts;
}

/** Body paragraph. */
export const p = (text, opts = {}) =>
  new Paragraph({
    children: runs(text),
    alignment: opts.align ?? AlignmentType.JUSTIFIED,
    indent: { firstLine: opts.noIndent ? 0 : INDENT },
    spacing: { line: LINE, after: 0 },
    keepNext: opts.keepNext,
  });

/** Centered formula with its number "(4.1)" at the right margin. */
export const formula = (text, number) =>
  new Paragraph({
    tabStops: [
      { type: TabStopType.CENTER, position: Math.round(TEXT_WIDTH / 2) },
      { type: TabStopType.RIGHT, position: TEXT_WIDTH },
    ],
    spacing: { line: LINE, before: 60, after: 60 },
    children: [new TextRun({ children: [new Tab()] }), ...runs(text), new TextRun({ children: [new Tab(), `(${number})`] })],
  });

/** Several body paragraphs at once. */
export const ps = (...texts) => texts.map((t) => p(t));

/** Chapter-level heading (KIRISH, I-BOB …): new page, centered, bold, caps. */
export const h1 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: true,
    alignment: AlignmentType.CENTER,
    spacing: { line: LINE, before: 0, after: 240 },
    children: [new TextRun({ text: text.toUpperCase(), bold: true })],
  });

/** Section heading (1.1 …). */
export const h2 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.CENTER,
    keepNext: true,
    spacing: { line: LINE, before: 240, after: 120 },
    children: [new TextRun({ text, bold: true })],
  });

/** Small run-in subheading inside a section (not in TOC). */
export const h3 = (text) =>
  new Paragraph({
    keepNext: true,
    indent: { firstLine: INDENT },
    spacing: { line: LINE, before: 120, after: 0 },
    children: [new TextRun({ text, bold: true })],
  });

export const numberingConfig = {
  config: [
    {
      reference: 'dash',
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: '–',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: INDENT + 360, hanging: 360 } } },
        },
      ],
    },
    ...['refs', ...Array.from({ length: 40 }, (_, i) => `num${i}`)].map((reference) => ({
      reference,
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: '%1.',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: INDENT + 360, hanging: 360 } } },
        },
      ],
    })),
  ],
};

/** Dash list. */
export const bullets = (items) =>
  items.map(
    (t) =>
      new Paragraph({
        numbering: { reference: 'dash', level: 0 },
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: LINE, after: 0 },
        children: runs(t),
      }),
  );

let numberedListIndex = 0;
/**
 * Numbered list; every call restarts at 1 unless a shared `reference`
 * (e.g. 'refs' for the bibliography) is passed to continue one sequence.
 */
export const numbered = (items, sharedReference) => {
  const reference = sharedReference ?? `num${numberedListIndex++ % 40}`;
  return items.map(
    (t) =>
      new Paragraph({
        numbering: { reference, level: 0 },
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: LINE, after: 0 },
        children: runs(t),
      }),
  );
};

const caption = (text, opts = {}) =>
  new Paragraph({
    alignment: opts.align ?? AlignmentType.CENTER,
    keepNext: opts.keepNext,
    spacing: { line: 276, before: opts.before ?? 60, after: opts.after ?? 200 },
    children: runs(text, { size: 26 }),
  });

/** Reads PNG/JPEG pixel size so images keep their aspect ratio. */
function imageSize(buf) {
  if (buf[0] === 0x89) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  let i = 2;
  while (i < buf.length) {
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error('Unknown image size');
}

/**
 * Figure with caption below: "2.1-rasm. Title".
 * `widthCm` defaults to the full text width; height follows the aspect ratio.
 */
export function figure(file, number, title, widthCm = 15.5, maxHeightCm = 20) {
  const full = path.join(ROOT, 'rasmlar', file);
  if (!fs.existsSync(full)) return placeholder(`${number}-rasm. ${title}`, `Rasm fayli topilmadi: ${file}`);
  const data = fs.readFileSync(full);
  const { w, h } = imageSize(data);
  const pxPerCm = 37.8;
  let width = widthCm * pxPerCm;
  let height = (width * h) / w;
  if (height > maxHeightCm * pxPerCm) {
    height = maxHeightCm * pxPerCm;
    width = (height * w) / h;
  }
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 120, after: 0 },
      children: [
        new ImageRun({
          type: file.endsWith('.png') ? 'png' : 'jpg',
          data,
          transformation: { width: Math.round(width), height: Math.round(height) },
        }),
      ],
    }),
    caption(`${number}-rasm. ${title}`),
  ];
}

/**
 * Wide figure placed on its own landscape page (build.mjs turns the marker into a section).
 * Landscape text area is about 25 × 17 cm.
 */
export const landscapeFigure = (file, number, title, widthCm = 24) => ({
  __landscape: true,
  children: figure(file, number, title, widthCm, 14.5),
});

const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };

/**
 * Two images side by side with "a) …" / "b) …" sub-captions and one shared caption below:
 *   figurePair([['3-01-login.jpg', 'kirish sahifasi'], ['3-02-otp.jpg', 'kodni kiritish']], '3.10', 'Tizimga kirish')
 */
export function figurePair(items, number, title) {
  const half = Math.floor(TEXT_WIDTH / 2);
  const pxPerCm = 37.8;
  const widthCm = 8;
  const cells = items.map(([file, label], i) => {
    const data = fs.readFileSync(path.join(ROOT, 'rasmlar', file));
    const { w, h } = imageSize(data);
    const width = widthCm * pxPerCm;
    return new TableCell({
      width: { size: half, type: WidthType.DXA },
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
      margins: { left: 40, right: 40 },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          keepNext: true,
          spacing: { before: 120, after: 0, line: 240 },
          children: [
            new ImageRun({
              type: file.endsWith('.png') ? 'png' : 'jpg',
              data,
              transformation: { width: Math.round(width), height: Math.round((width * h) / w) },
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          keepNext: true,
          spacing: { before: 40, after: 0, line: 240 },
          children: runs(`${'ab'[i]}) ${label}`, { size: 24 }),
        }),
      ],
    });
  });
  return [
    new Table({
      width: { size: TEXT_WIDTH, type: WidthType.DXA },
      columnWidths: [half, TEXT_WIDTH - half],
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder },
      rows: [new TableRow({ cantSplit: true, children: cells })],
    }),
    caption(`${number}-rasm. ${title}`),
  ];
}

/** Visible placeholder box for content that still has to be supplied. */
export const placeholder = (titleText, note) => [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    border: {
      top: { style: BorderStyle.DASHED, size: 6, color: '999999', space: 6 },
      bottom: { style: BorderStyle.DASHED, size: 6, color: '999999', space: 6 },
      left: { style: BorderStyle.DASHED, size: 6, color: '999999', space: 6 },
      right: { style: BorderStyle.DASHED, size: 6, color: '999999', space: 6 },
    },
    spacing: { before: 240, after: 120, line: LINE },
    children: [new TextRun({ text: note, italics: true, color: '777777' })],
  }),
  caption(titleText),
];

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

/**
 * Table with the standard caption above it:
 *   right-aligned "1.1-jadval", then the centered title.
 * `widths` are relative weights; they are scaled to the text width.
 */
export function table(number, title, headers, rows, widths) {
  const weights = widths ?? headers.map(() => 1);
  const total = weights.reduce((a, b) => a + b, 0);
  const columnWidths = weights.map((w) => Math.floor((TEXT_WIDTH * w) / total));
  columnWidths[columnWidths.length - 1] += TEXT_WIDTH - columnWidths.reduce((a, b) => a + b, 0);

  const cell = (text, i, header) =>
    new TableCell({
      width: { size: columnWidths[i], type: WidthType.DXA },
      borders: cellBorders,
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 40, bottom: 40, left: 80, right: 80 },
      shading: header ? { type: ShadingType.CLEAR, color: 'auto', fill: 'E7E6E6' } : undefined,
      children: String(text)
        .split('\n')
        .map(
          (line) =>
            new Paragraph({
              alignment: header ? AlignmentType.CENTER : AlignmentType.LEFT,
              spacing: { line: 240, after: 0 },
              children: runs(line, { size: 24, bold: header || undefined }),
            }),
        ),
    });

  return [
    caption(`${number}-jadval`, { align: AlignmentType.RIGHT, keepNext: true, before: 200, after: 0 }),
    caption(`**${title}**`, { keepNext: true, before: 0, after: 80 }),
    new Table({
      width: { size: TEXT_WIDTH, type: WidthType.DXA },
      columnWidths,
      rows: [
        new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, i, true)) }),
        ...rows.map((r) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, i, false)) })),
      ],
    }),
    new Paragraph({ spacing: { after: 120 }, children: [] }),
  ];
}

/** Source code listing (Courier New 10pt, single spaced, light background). */
export const code = (source, titleText) => {
  const lines = source.replace(/\t/g, '    ').replace(/\r/g, '').split('\n');
  const out = [];
  if (titleText) out.push(caption(titleText, { align: AlignmentType.LEFT, keepNext: true, before: 160, after: 40 }));
  lines.forEach((line, i) =>
    out.push(
      new Paragraph({
        keepLines: true,
        keepNext: i < lines.length - 1 && lines.length < 25,
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'F2F2F2' },
        spacing: { line: 240, after: 0 },
        children: [new TextRun({ text: line.length ? line : ' ', font: 'Courier New', size: 18 })],
      }),
    ),
  );
  out.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  return out;
};

/** Plain centered line (title page etc.). */
export const center = (text, opts = {}) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    pageBreakBefore: opts.pageBreakBefore,
    spacing: { line: opts.line ?? 276, before: opts.before ?? 0, after: opts.after ?? 0 },
    children: runs(text, { bold: opts.bold, size: opts.size, allCaps: opts.caps }),
  });

/** Plain left-aligned line without indent. */
export const line = (text, opts = {}) =>
  new Paragraph({
    alignment: opts.align ?? AlignmentType.LEFT,
    indent: opts.indentLeft ? { left: opts.indentLeft } : undefined,
    pageBreakBefore: opts.pageBreakBefore,
    spacing: { line: opts.line ?? 276, before: opts.before ?? 0, after: opts.after ?? 0 },
    children: runs(text, { bold: opts.bold, size: opts.size }),
  });

export const pageBreak = () => new Paragraph({ children: [new PageBreak()] });
export const blank = (n = 1) => Array.from({ length: n }, () => new Paragraph({ spacing: { line: 276 }, children: [] }));
