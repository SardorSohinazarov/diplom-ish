// Builds the reviewer's report (taqriz) and the supervisor's conclusion (rahbar xulosasi)
// in the same style as the diploma, following the samples in ../../examples.
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

const review = () => [
  ...university,
  centerRich(`Talaba ${STUDENT_GEN} **“${TOPIC}”** mavzusidagi bitiruv malakaviy ishiga`),
  center('T A Q R I Z', { bold: true, line: LINE, after: 120 }),
  p(
    'Bugungi kunda muloqotning katta qismi messenjerlarga ko‘chgan. Biroq respublikada eng ko‘p foydalaniladigan Telegram va WhatsApp xorijiy kompaniyalarga tegishli bo‘lib, fuqarolarning yozishmalari va shaxsga doir ma’lumotlari mamlakatdan tashqaridagi serverlarda saqlanadi. “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonun talablari nuqtai nazaridan ma’lumotlarni respublika hududida saqlaydigan milliy messenjer yaratish dolzarb masaladir. Shu jihatdan Sohinazarov Sardorbek tomonidan bajarilgan bitiruv malakaviy ishi dolzarbligi, texnik yechimlari va amaliy ahamiyati bilan ajralib turadi.',
  ),
  p(
    'Bitiruv ishi 82 betdan iborat bo‘lib, **kirish**, to‘rtta **asosiy bob**, **xulosa**, 51 nomdan iborat **foydalanilgan adabiyotlar ro‘yxati** va **ilovalardan** tashkil topgan. Ishda 29 ta rasm, 17 ta jadval va 5 ta kod listingi keltirilgan.',
  ),
  p(
    '**I-bobda** – Telegram, WhatsApp, Signal va WeChat funksionallik, xavfsizlik hamda ma’lumotlarni saqlash joyi bo‘yicha taqqoslangan. Real vaqtda aloqa texnologiyalari (WebSocket, SSE, long polling) tahlil qilinib, **SignalR** kutubxonasi tanlangani asoslangan, tizimga talablar aniqlangan.',
  ),
  p(
    '**II-bobda** – tizim **.NET 8**, **ASP.NET Core**, **Entity Framework Core** va **PostgreSQL** texnologiyalari asosida Clean Architecture tamoyillari bo‘yicha loyihalangan. Ma’lumotlar bazasi, UML modellari, autentifikatsiya hamda maxfiy chatlarning kriptografik protokoli bayon etilgan.',
  ),
  p(
    '**III-bobda** – real vaqtda xabar almashish, guruh chatlari, media fayllar va hikoyalar amalga oshirilgan, klient qismi **Angular**da yaratilgan. O‘ziga xos imkoniyatlar alohida e’tiborga loyiq: xabarlarni **lotin yoki kirill** yozuvida ko‘rsatish va yozuvdan qat’i nazar qidiruv, e-pochta domeni orqali tasdiqlanadigan **tashkilot rejimi** hamda **Web Crypto API** asosida uchdan-uchgacha shifrlangan **maxfiy chatlar**. Dastur **Docker**da joylashtirilgan va testlar bilan sinalgan.',
  ),
  p(
    '**IV-bobda** – hayot faoliyati xavfsizligi: dasturchi ish joyining ergonomikasi va evakuatsiya tadbirlari ko‘rib chiqilgan.',
  ),
  p(
    'Talaba mustaqil fikrlash va zamonaviy texnologiyalardan foydalanish qobiliyatini namoyon qilgan. Tizimni tashkilotlar va davlat idoralari o‘z serverlarida ichki muloqot vositasi sifatida qo‘llashi mumkin.',
  ),
  p('Ishda ayrim kamchiliklar ham mavjud:', { keepNext: true }),
  p('– mobil ilovalar va push-bildirishnomalar mavjud emas;'),
  p('– maxfiy chatlar faqat bitta qurilmada ishlaydi;'),
  p('– tizimning yuqori yuklama ostidagi ishlashi sinovlar bilan yetarlicha asoslanmagan.'),
  p('Bu kamchiliklar ishning umumiy ijobiy bahosiga ta’sir qilmaydi.'),
  p(
    '**Xulosa qilib aytganda**, Sohinazarov Sardorbekning bitiruv malakaviy ishi mavzusi dolzarb, mazmuni boy, texnik yechimlari esa amaliyotga yo‘naltirilgan, qo‘yilgan talablarga javob beradi va himoyaga **tavsiya etiladi**. Ish “a’lo” bahoga loyiq.',
  ),
  ...blank(1),
  signature(`Taqrizchi:\n${BLANK}\n${BLANK}\n${BLANK}`, '________________'),
  line('M.O.', { bold: true, indentLeft: 4300, before: 120 }),
];

const supervisor = () => [
  center('O‘ZBEKISTON RESPUBLIKASI', { bold: true }),
  center('RAQAMLI TEXNOLOGIYALAR VAZIRLIGI', { bold: true }),
  ...university,
  p(
    `${DIRECTION} yo‘nalishi 315-21 DIo‘ guruhi talabasi ${STUDENT} tomonidan yozilgan “${TOPIC}” mavzusidagi bitiruv malakaviy ishiga`,
  ),
  center('Ilmiy rahbar xulosasi', { bold: true, line: LINE, after: 120 }),
  p(
    'Ushbu bitiruv malakaviy ishi foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, shaxsiy va guruh yozishmalarida real vaqtda xabar almashish imkonini beruvchi milliy messenjerni ishlab chiqishga bag‘ishlangan. Muallif to‘liq ishlaydigan veb-ilova yaratgan, u tashkilotlarda ichki muloqot vositasi sifatida amaliy ahamiyatga ega.',
  ),
  p(
    'Tizim arxitekturasi, ma’lumotlar bazasi modeli va foydalanuvchi rollari UML diagrammalar orqali ifodalangan. Dasturiy yechim .NET 8, ASP.NET Core, SignalR, PostgreSQL va Angular texnologiyalari asosida Clean Architecture tamoyillari bo‘yicha ishlab chiqilgan. Lotin–kirill transliteratsiyasi, tashkilot rejimi va uchdan-uchgacha shifrlangan maxfiy chatlar amalga oshirilgan, dastur Docker’da joylashtirilib, testlar bilan sinalgan.',
  ),
  p(
    'Ish to‘rtta bobdan iborat bo‘lib, loyihaning nazariy, texnik va amaliy jihatlari bosqichma-bosqich yoritilgan. Talaba mustaqillik va tashabbuskorlik namoyon etgan, kalendar grafikka rioya qilgan.',
  ),
  p(
    `Mazmun va talablarga mosligi nuqtai nazaridan, muallif **${STUDENT}**, **${DIRECTION}** yo‘nalishi bo‘yicha **bakalavr** darajasini olishga **loyiq** deb hisoblayman.`,
  ),
  ...blank(1),
  signature(`Ilmiy rahbar:\n“Axborot texnologiyalarining dasturiy ta’minoti” kafedrasi ${BLANK}`, 'Y.Sh. Yuldoshev'),
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

await write('Taqriz_Sohinazarov_Sardor.docx', 'Taqriz', review());
await write('Rahbar_xulosasi_Sohinazarov_Sardor.docx', 'Ilmiy rahbar xulosasi', supervisor());
