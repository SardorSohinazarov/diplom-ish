// Builds the deposited material (deponentlangan material) for registering the program at im.adliya.uz:
// a title page followed by an appendix with selected source files of the server and the web client.
// Usage: node deponent.mjs  →  ../Deponentlangan_material_Milliy.docx
import fs from 'node:fs';
import path from 'node:path';
import { AlignmentType, Document, Footer, Packer, PageBreak, PageNumber, Paragraph, TextRun } from 'docx';

import { FONT, ROOT, SIZE } from './lib.mjs';

const REPOS = path.join(ROOT, '..', '..');
const PROGRAM = '“Milliy” – real vaqtda xabar almashish imkonini beruvchi veb-messenjer';
const HOLDER = 'Sohinazarov Sardorbek O‘rinboy o‘g‘li';
const AUTHORS = [
  'Sohinazarov Sardorbek O‘rinboy o‘g‘li',
  'Abduvaliyeva Zebiniso Abdulxamidovna',
  'Nurdullayev Alisher Niyatilla o‘g‘li',
  'Bo‘riyev Yusuf Absamat o‘g‘li',
  'Muxsinov Shamil Shavkatovich',
  'Raxmanov Askar Tajibayevich',
];

// Main files of the program: server (C#, .NET) and web client (TypeScript, Angular).
const FILES = [
  'NationalChat/src/API/Program.cs',
  'NationalChat/src/API/Hubs/ChatHub.cs',
  'NationalChat/src/Domain/Entities/Enums.cs',
  'NationalChat/src/Domain/Entities/Chats/ChatModels.cs',
  'NationalChat/src/Domain/Entities/Messaging/MessagingModels.cs',
  'NationalChat/src/Application/Features/Chats/Services/ChatService.cs',
  'NationalChat/src/Application/Features/Messages/Services/MessageService.cs',
  'NationalChat/src/Application/Features/Messages/Services/MessageReactionService.cs',
  'NationalChat/src/Application/Features/Authentication/Services/AuthService.cs',
  'NationalChat/src/Infrastructure/Persistence/Repositories/MessageRepository.cs',
  'NationalChat/src/Domain/Text/UzbekTransliterator.cs',
  'NationalChatClient/src/app/core/auth.service.ts',
  'NationalChatClient/src/app/features/chat/data-access/chat-realtime.service.ts',
  'NationalChatClient/src/app/features/chat/data-access/outbox.service.ts',
  'NationalChatClient/src/app/features/chat/data-access/chat-cache.service.ts',
  'NationalChatClient/src/app/features/chat/message-composer/message-composer.component.ts',
  'NationalChatClient/src/app/shared/text/uzbek-transliterator.ts',
];

const CODE_FONT = 'Consolas';
const CODE_SIZE = 16; // 8pt

const text = (t, opts = {}) =>
  new Paragraph({
    alignment: opts.align ?? AlignmentType.CENTER,
    spacing: { line: 360, before: opts.before ?? 0, after: opts.after ?? 0 },
    children: [new TextRun({ text: t, font: FONT, size: opts.size ?? SIZE, bold: opts.bold })],
  });

function titlePage() {
  return [
    text('O‘ZBEKISTON RESPUBLIKASI ADLIYA VAZIRLIGI', { bold: true }),
    text('Intellektual mulk ob’yektlarini ro‘yxatdan o‘tkazish', { after: 1600 }),
    text('EHM UCHUN DASTURNI RO‘YXATDAN O‘TKAZISH UCHUN', { bold: true }),
    text('DEPONENTLANGAN MATERIAL', { bold: true, after: 600 }),
    text('Dastur nomi:', { bold: true }),
    text(PROGRAM, { after: 600 }),
    text('Huquq egasi:', { bold: true, align: AlignmentType.LEFT }),
    text(HOLDER, { align: AlignmentType.LEFT, after: 240 }),
    text('Mualliflar:', { bold: true, align: AlignmentType.LEFT }),
    ...AUTHORS.map((a, i) => text(`${i + 1}. ${a}`, { align: AlignmentType.LEFT })),
    text('Dasturlash tillari: C#, TypeScript', { align: AlignmentType.LEFT, before: 240 }),
    text('Yaratilgan sanasi: 14.11.2026', { align: AlignmentType.LEFT, after: 1200 }),
    text('Toshkent – 2026', { bold: true }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function codeLines(file) {
  const source = fs.readFileSync(path.join(REPOS, file), 'utf8').replace(/^﻿/, '').replace(/\t/g, '    ');
  return source
    .replace(/\s+$/, '')
    .split(/\r?\n/)
    .map(
      (l) =>
        new Paragraph({
          spacing: { line: 240, before: 0, after: 0 },
          children: [new TextRun({ text: l || ' ', font: CODE_FONT, size: CODE_SIZE })],
        }),
    );
}

function appendix() {
  const out = [text('ILOVA. DASTUR KODI', { bold: true, after: 240 })];
  for (const file of FILES) {
    out.push(
      new Paragraph({
        spacing: { before: 240, after: 120 },
        keepNext: true,
        children: [new TextRun({ text: file.replace(/^[^/]+\//, ''), font: FONT, size: 24, bold: true })],
      }),
      ...codeLines(file),
    );
  }
  return out;
}

const footer = new Footer({
  children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 22 })],
    }),
  ],
});

const doc = new Document({
  creator: HOLDER,
  title: 'Deponentlangan material',
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1134, bottom: 1134, left: 1701, right: 851, header: 709, footer: 709 },
        },
        titlePage: true,
      },
      footers: { default: footer, first: new Footer({ children: [] }) },
      children: [...titlePage(), ...appendix()],
    },
  ],
});

const out = path.join(ROOT, '..', 'Deponentlangan_material_Milliy.docx');
fs.writeFileSync(out, await Packer.toBuffer(doc));
console.log(out);
