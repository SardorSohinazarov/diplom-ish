import { bullets, h1, h3, p, ps } from '../lib.mjs';

export const introduction = () => [
  h1('Kirish'),
  p(
    'Bugungi kunda odamlar o‘rtasidagi muloqotning katta qismi telefon qo‘ng‘iroqlari va elektron pochtadan messenjerlarga ko‘chdi. Messenjerlarda o‘quv guruhlari va ish jamoalari tashkil etiladi, yangiliklar tarqatiladi, davlat va tijorat xizmatlari ko‘rsatiladi. O‘zbekistonda aholining asosiy qismi xorijiy kompaniyalarga tegishli Telegram va WhatsApp ilovalaridan foydalanadi. Natijada fuqarolarning yozishmalari va shaxsga doir ma’lumotlari mamlakatdan tashqaridagi, milliy nazoratga bo‘ysunmaydigan serverlarda saqlanadi.',
  ),
  h3('Mavzuning dolzarbligi.'),
  ...ps(
    '“Raqamli O‘zbekiston – 2030” strategiyasi (PF-6079-son Farmon, 2020-yil 5-oktabr) mahalliy dasturiy mahsulotlarni rivojlantirish va axborot xavfsizligini ta’minlashni ustuvor vazifa sifatida belgilaydi. “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunga 2021-yilda kiritilgan o‘zgartishlarga ko‘ra fuqarolarning shaxsga doir ma’lumotlari respublika hududidagi texnik vositalarda saqlanishi lozim. Bu talablar ma’lumotlarni o‘z serverida saqlaydigan milliy messenjer yaratishni dolzarb qiladi.',
    'Texnik jihatdan ham masala murakkab: xabar, “yozmoqda” belgisi va onlayn holat real vaqtda, sahifani yangilamasdan yetkazilishi, katta yozishmalar tarixi tez yuklanishi, autentifikatsiya esa ishonchli bo‘lishi kerak. Bularni hal etish qatlamli arxitektura, real vaqt protokollari va ma’lumotlar bazasini optimallashtirishni amalda qo‘llashni talab qiladi.',
  ),
  h3('Bitiruv malakaviy ishining maqsadi'),
  p(
    'Ishning maqsadi — foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, shaxsiy va guruh yozishmalarida real vaqtda xabar almashish imkonini beruvchi “Milliy chat” dasturini loyihalash va ishlab chiqishdir.',
  ),
  h3('Qo‘yilgan maqsadga erishish uchun quyidagi vazifalar belgilandi:'),
  ...bullets([
    'mavjud messenjerlarni va real vaqtda ma’lumot almashish texnologiyalarini tahlil qilib, tizim uchun eng maqbul yechimni tanlash;',
    'funksional va nofunksional talablarni aniqlash, Clean Architecture asosida tizim arxitekturasini, ma’lumotlar bazasini va UML modellarini loyihalash;',
    'bir martalik kod, Google hisobi, JWT va refresh token asosida xavfsiz autentifikatsiyani ishlab chiqish;',
    '.NET 8 va SignalR asosida shaxsiy va guruh chatlari, media fayllar, hikoyalar va onlayn holatni amalga oshirish, Angular’da moslashuvchan interfeys yaratish;',
    'lotin–kirill transliteratsiyasi, e-pochta domeni orqali tashkilot rejimi va uchdan-uchgacha shifrlangan maxfiy chatlarni ishlab chiqish;',
    'dasturni Docker konteynerida bulutli serverga joylashtirish va sinovdan o‘tkazish;',
    'dasturchi ish joyining ergonomikasi va favqulodda vaziyatlarda evakuatsiya tadbirlarini ishlab chiqish.',
  ]),
  h3('Tadqiqot obyekti va predmeti.'),
  p(
    'Tadqiqot obyekti — foydalanuvchilar o‘rtasida matnli va multimedia xabarlar almashishni ta’minlaydigan onlayn muloqot tizimlari. Tadqiqot predmeti — real vaqtda ishlaydigan messenjerning arxitekturasi, ma’lumotlar modeli va xabarlarni yetkazish mexanizmlarini .NET va Angular texnologiyalari yordamida amalga oshirish usullari.',
  ),
  h3('Tadqiqot usullari.'),
  p(
    'Ishda qiyosiy tahlil, obyektga yo‘naltirilgan loyihalash, UML yordamida modellashtirish, relatsion ma’lumotlar bazasini normallashtirish hamda iterativ ishlab chiqish va avtomatlashtirilgan testlash usullaridan foydalanildi.',
  ),
  h3('Ishning ilmiy-amaliy yangiligi.'),
  ...bullets([
    'o‘zbek tilining lotin va kirill yozuvlari o‘rtasida kontekstga bog‘liq qoidalarni hisobga oluvchi transliteratsiya algoritmi ishlab chiqildi. Uning asosida har bir foydalanuvchi xabarlarni o‘zi tanlagan yozuvda ko‘radi, qidiruv esa yozuvga bog‘liq bo‘lmagan kalit bo‘yicha ishlaydi;',
    'tashkilotni oldindan ro‘yxatga olmasdan, tasdiqlangan e-pochta domeni orqali a’zolikni tasdiqlash va yopiq tashkilot guruhlarini avtomatik shakllantirish usuli taklif etildi;',
    'faqat brauzerning standart kriptografik primitivlari (X25519, HKDF, HMAC, AES-256-GCM) asosida oldinga maxfiylikka ega maxfiy chat protokoli ishlab chiqildi; server xabar mazmunini bilmasligi ma’lumotlar bazasi darajasida ko‘rsatib berildi.',
  ]),
  h3('Ishning amaliy ahamiyati.'),
  p(
    '“Milliy chat” to‘liq ishlaydigan veb-ilova bo‘lib, uni tashkilotlar, ta’lim muassasalari va davlat idoralari o‘z serverlarida ichki muloqot vositasi sifatida qo‘llashi mumkin. Xodimlar korporativ pochtasi bilan kirishi bilanoq tashkilotning yopiq guruhiga qo‘shiladi, maxfiy chatlar esa nozik yozishmalarni serverdan ham himoya qiladi.',
  ),
  h3('Bitiruv malakaviy ishining tuzilishi.'),
  p(
    'Ish kirish, to‘rt bob, xulosa, foydalanilgan adabiyotlar ro‘yxati va ilovalardan iborat. Birinchi bobda mavjud messenjerlar va real vaqtda aloqa texnologiyalari tahlil qilinib, masala qo‘yilgan. Ikkinchi bobda tizim arxitekturasi, ma’lumotlar bazasi, UML modellari, xavfsizlik va maxfiy chat protokoli loyihalangan. Uchinchi bobda dasturni ishlab chiqish, joylashtirish, sinash va foydalanish yo‘riqnomasi keltirilgan. To‘rtinchi bob hayot faoliyati xavfsizligiga bag‘ishlangan. Ish 29 ta rasm, 17 ta jadval, 5 ta kod listingi va 4 ta ilovani o‘z ichiga oladi.',
  ),
];
