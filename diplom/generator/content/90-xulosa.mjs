import { bullets, h1, p, ps } from '../lib.mjs';

export const conclusion = () => [
  h1('Xulosa'),
  p(
    'Ishning natijasi — foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan va real vaqtda xabar almashish imkonini beruvchi, bulutda ishlab turgan “Milliy chat” dasturi. Kirishda qo‘yilgan har bir vazifa bo‘yicha quyidagi natijalar olindi:',
  ),
  ...bullets([
    'Telegram, WhatsApp, Signal va WeChat solishtirilganda ularning birortasi ham ma’lumotlarni O‘zbekistonda saqlamasligi va o‘zbek tilining ikki yozuvini hisobga olmasligi aniqlandi. Serverdan brauzerga ma’lumot yetkazish usullari orasidan WebSocket tezligini beradigan va u ishlamasa boshqa usulga o‘zi o‘tadigan SignalR tanlandi.',
    'Server to‘rt qatlamga ajratildi, shu tufayli biznes-qoidalar ma’lumotlar bazasi va freymvorkdan mustaqil qoldi. Ma’lumotlar bazasi 36 ta jadvaldan iborat bo‘lib, ularning bir qismi kanallar va qo‘ng‘iroqlar kabi kelajakdagi imkoniyatlar uchun oldindan tayyorlangan.',
    'Kirish tizimi parolsiz qurildi: kod bazada ochiq holda emas, faqat xesh ko‘rinishida saqlanadi, access token 15 daqiqa yashaydi, refresh token esa har foydalanishda almashadi. Foydalanuvchi o‘z qurilmalarini ko‘ra oladi va begona qurilmani chiqarib yubora oladi.',
    '73 ta API endpoint va SignalR habi orqali shaxsiy va guruh chatlari, fayllar, hikoyalar, “yozmoqda” va o‘qilganlik belgilari hamda onlayn holat ishlaydi. Interfeys telefonda ham, kompyuterda ham qulay, yorug‘ va qorong‘i mavzuga ega.',
    'Uchta o‘ziga xos imkoniyat amalga oshirildi. Kirillda yozilgan xabarni lotinda o‘qish mumkin va aksincha, qidiruv esa ikkala yozuvda ham topadi. Tashkilot pochtasi bilan kirgan foydalanuvchi o‘z tashkilotining yopiq guruhiga avtomatik qo‘shiladi. Maxfiy chatda xabar faqat ikki qurilmada ochiladi, serverda esa ma’nosiz shifrlangan baytlar turadi.',
    'Dastur Docker konteynerida bulutga joylashtirildi. Uning to‘g‘ri ishlashi 307 ta server va 229 ta klient testi, 43 ta integratsion tekshiruv va qo‘lda o‘tkazilgan sinovlar bilan tasdiqlandi.',
    'Hayot faoliyati xavfsizligi bo‘limida 6 × 6 m xona uchun ish joylari, yoritish va shamollatish hisoblandi, 45 kishilik qavat taxminan 0,83 daqiqada evakuatsiya qilinishi ko‘rsatildi.',
  ]),
  ...ps(
    'Dasturning asosiy afzalligi shundaki, uni istalgan tashkilot o‘z serverida ishga tushirib, yozishmalar ustidan to‘liq nazoratni o‘zida saqlab qolishi mumkin. Ish davomida real vaqt tizimini loyihalash, xavfsiz autentifikatsiya va uchdan-uchgacha shifrlashni amalda qo‘llash tajribasi orttirildi.',
    'Dasturni rivojlantirishning keyingi qadamlari — kanallar va botlar, ovozli va video qo‘ng‘iroqlar, OneID orqali shaxsni tasdiqlash, maxfiy chatlarni bir necha qurilmada ishlatish, push-bildirishnomalar va mobil ilovalar.',
  ),
];
