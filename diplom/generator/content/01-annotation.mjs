// Annotation in Uzbek, Russian and English on one page (not part of the table of contents).
import { AlignmentType, Paragraph, TextRun } from 'docx';
import { LINE, p } from '../lib.mjs';

const title = (text, newPage) =>
  new Paragraph({
    pageBreakBefore: newPage,
    alignment: AlignmentType.CENTER,
    spacing: { line: LINE, before: newPage ? 0 : 360, after: 120 },
    children: [new TextRun({ text, bold: true })],
  });

export const annotation = () => [
  title('ANNOTATSIYA', true),
  p(
    'Diplom loyihasi foydalanuvchi ma’lumotlarini O‘zbekistondagi serverda saqlaydigan “Milliy” xabarchini ishlab chiqishga bag‘ishlangan. Server .NET muhitida, Entity Framework asosida, brauzer qismi Angular’da yozildi, xabarlar SignalR orqali real vaqtda yetkaziladi. Dasturda shaxsiy va guruh chatlari, fayl almashish, reaksiyalar, lavhalar va forum, lotin–kirill o‘girish, ish e-pochtasi orqali tashkilot guruhlari hamda maxfiy chatlar bor. Chat texnologiyasi Elektron kooperatsiya portalida qo‘llanildi.',
  ),
  title('АННОТАЦИЯ', false),
  p(
    'Дипломный проект посвящён разработке мессенджера «Milliy», хранящего данные пользователей на серверах в Узбекистане. Сервер написан на платформе .NET с использованием Entity Framework, клиент — на Angular, сообщения доставляются в реальном времени через SignalR. Реализованы личные и групповые чаты, обмен файлами, реакции, истории и форум, перевод между латиницей и кириллицей, группы организаций по рабочей почте и секретные чаты. Технология чата применена на портале «Электронная кооперация».',
  ),
  title('ANNOTATION', false),
  p(
    'The diploma project develops “Milliy”, a messenger that keeps user data on servers inside Uzbekistan. The server is written on the .NET platform with Entity Framework, the client in Angular, and messages are delivered in real time via SignalR. The application provides private and group chats, file sharing, reactions, stories and a forum, Latin–Cyrillic conversion, organization groups based on work e-mail and secret chats. The chat technology is used in the “Electronic Cooperation” portal.',
  ),
];
