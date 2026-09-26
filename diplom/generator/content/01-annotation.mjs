// Annotation in Uzbek, Russian and English (not part of the table of contents).
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
    'Ushbu bitiruv malakaviy ishi “Milliy chat” nomli, Telegramga o‘xshash milliy messenjer dasturini ishlab chiqishga bag‘ishlangan. Ishda zamonaviy messenjerlar va real vaqtda aloqa texnologiyalari tahlil qilingan, tizimning arxitekturasi, ma’lumotlar bazasi va UML modellari loyihalangan. Dasturning server qismi .NET 8 platformasida ASP.NET Core, Entity Framework Core, PostgreSQL va SignalR texnologiyalari asosida Clean Architecture tamoyillari bo‘yicha, klient qismi esa Angular freymvorkida ishlab chiqilgan. Tizim elektron pochta orqali bir martalik kod va Google hisobi yordamida autentifikatsiya, shaxsiy va guruh chatlari, real vaqtda xabar almashish, “yozmoqda” va o‘qilganlik belgilari, rasm, video va fayllar yuborish, hikoyalar (stories) hamda onlayn holatni kuzatish imkoniyatlarini taqdim etadi. Ilova Docker konteyneri ko‘rinishida bulutli serverga joylashtirilgan.',
  ),
  title('АННОТАЦИЯ', false),
  p(
    'Выпускная квалификационная работа посвящена разработке национального мессенджера «Milliy chat», аналогичного Telegram. В работе проанализированы современные мессенджеры и технологии обмена данными в реальном времени, спроектированы архитектура системы, база данных и UML-модели. Серверная часть разработана на платформе .NET 8 с использованием ASP.NET Core, Entity Framework Core, PostgreSQL и SignalR в соответствии с принципами Clean Architecture, клиентская часть — на фреймворке Angular. Система поддерживает аутентификацию по одноразовому коду, отправляемому на электронную почту, и через аккаунт Google, личные и групповые чаты, обмен сообщениями в реальном времени, индикаторы набора текста и прочтения, отправку изображений, видео и файлов, истории (stories), а также отслеживание статуса «в сети». Приложение развёрнуто в облаке в виде Docker-контейнера.',
  ),
  title('ANNOTATION', false),
  p(
    'This graduation qualification work is devoted to the development of “Milliy chat”, a national messenger similar to Telegram. The work analyses modern messengers and real-time communication technologies and designs the system architecture, the database and the UML models. The server side is built on .NET 8 with ASP.NET Core, Entity Framework Core, PostgreSQL and SignalR following Clean Architecture principles, and the client side is built with the Angular framework. The system provides sign-in with a one-time code sent by e-mail or with a Google account, private and group chats, real-time messaging, typing and read indicators, sending images, videos and files, stories, and online presence tracking. The application is deployed to the cloud as a Docker container.',
  ),
];
