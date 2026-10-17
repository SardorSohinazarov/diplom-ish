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
    'Diplom loyihasi foydalanuvchi ma’lumotlarini O‘zbekiston hududidagi serverda saqlaydigan “Milliy” xabarchini ishlab chiqishga bag‘ishlangan. Server qismi ASP.NET Core 8, PostgreSQL va SignalR, klient qismi Angular asosida yaratildi. Dasturda shaxsiy va guruh chatlari, fayl almashish, reaksiyalar, lavhalar va forum, lotin–kirill transliteratsiyasi, e-pochta domeni bo‘yicha tashkilot guruhlari hamda uchdan-uchgacha shifrlangan maxfiy chatlar amalga oshirildi. Dastur avtomatik testlar bilan tekshirildi.',
  ),
  title('АННОТАЦИЯ', false),
  p(
    'Дипломный проект посвящён разработке мессенджера «Milliy», хранящего данные пользователей на серверах в Узбекистане. Серверная часть создана на ASP.NET Core 8, PostgreSQL и SignalR, клиентская — на Angular. Реализованы личные и групповые чаты, обмен файлами, реакции, истории и форум, транслитерация между латиницей и кириллицей, группы организаций по домену электронной почты и сквозное шифрование секретных чатов. Программа проверена автоматическими тестами.',
  ),
  title('ANNOTATION', false),
  p(
    'The diploma project develops “Milliy”, a messenger that keeps user data on servers inside Uzbekistan. The server is built with ASP.NET Core 8, PostgreSQL and SignalR, the client with Angular. The application provides private and group chats, file sharing, reactions, stories and a forum, Latin–Cyrillic transliteration, organization groups based on the e-mail domain and end-to-end encrypted secret chats. The application is verified with automated tests.',
  ),
];
