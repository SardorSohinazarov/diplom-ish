import { bullets, h1, p, ps } from '../lib.mjs';

export const conclusion = () => [
  h1('Xulosa'),
  ...ps(
    'Bitiruv malakaviy ishida foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, Telegramga o‘xshash “Milliy chat” veb-messenjeri loyihalandi va ishlab chiqildi. Ishning kirish qismida qo‘yilgan vazifalar quyidagicha hal etildi.',
  ),
  ...bullets([
    'Telegram, WhatsApp, Signal, Viber va WeChat messenjerlari funksional imkoniyatlari, xavfsizlik modeli va ma’lumotlarni saqlash joyi bo‘yicha taqqoslandi. Ularning barchasi xorijiy yurisdiksiyada ekani va bu “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunning lokalizatsiya talablari nuqtai nazaridan milliy yechim zarurligini asoslashi ko‘rsatildi.',
    'Real vaqtda aloqa texnologiyalari (short va long polling, Server-Sent Events, WebSocket, SignalR) tahlil qilindi. WebSocket samaradorligini saqlagan holda zaxira transportlarga avtomatik o‘tadigan SignalR tanlandi.',
    'Tizimning aktorlari, 12 ta funksional va 7 guruh nofunksional talablari aniqlandi.',
    'Server qismi Clean Architecture tamoyillari asosida Domain, Application, Infrastructure va API qatlamlariga ajratildi. PostgreSQL ma’lumotlar bazasi 9 ta sxemadagi 32 ta jadvaldan iborat qilib loyihalandi. Tizim ER, use-case va ketma-ketlik diagrammalari bilan modellashtirildi.',
    'Parolsiz autentifikatsiya tizimi ishlab chiqildi. U elektron pochtaga yuboriladigan va PBKDF2 bilan xeshlanadigan bir martalik kod, Google hisobi, 15 daqiqalik JWT access token, HMAC xeshi saqlanadigan va har safar almashtiriladigan refresh token hamda qurilmalar bo‘yicha sessiyalarni boshqarishni o‘z ichiga oladi.',
    '.NET 8 platformasida 56 ta endpointli REST API va SignalR habi amalga oshirildi. Ular shaxsiy va guruh chatlari, xabarlarni yuborish, tahrirlash, o‘chirish, javob berish va qidirish, rasm, video va fayllar almashish, “yozmoqda” va o‘qilganlik belgilari, onlayn holat hamda 24 soatlik hikoyalarni ta’minlaydi. Guruhlar uchun egasi, administrator va a’zo rollariga asoslangan ruxsatlar tizimi va xizmat xabarlari yaratildi.',
    'Angular 22 freymvorkida signals asosidagi holat boshqaruvi, o‘z dizayn tizimi, yorug‘ va qorong‘i mavzular va mobil qurilmalarga moslashuvchan o‘zbek tilidagi interfeys ishlab chiqildi.',
    'Server ilovasi Docker konteyneri ko‘rinishida bulutli platformaga joylashtirildi. Tizimning to‘g‘riligi 39 ta unit test, API darajasidagi 43 ta integratsion tekshiruv va qo‘lda o‘tkazilgan sinov ssenariylari bilan tasdiqlandi.',
    'Hayot faoliyati xavfsizligi bo‘limida dasturchining ish joyiga qo‘yiladigan ergonomik talablar tizimlashtirildi, dasturchilar xonasi uchun ish joylari soni, sun’iy yoritish va havo almashinuvi hisoblandi. IT-ofis uchun evakuatsiya reja-sxemasi ishlab chiqildi, hisobiy evakuatsiya vaqti aniqlandi, yong‘in va boshqa avariyalarda xodimlarning harakatlar tartibi belgilandi.',
  ]),
  ...ps(
    'Ishning amaliy ahamiyati shundaki, “Milliy chat” to‘liq ishlaydigan dasturiy mahsulot bo‘lib, uni ta’lim muassasalari, tashkilotlar yoki davlat idoralari o‘z serverlarida, jumladan respublika hududidagi data-markazlarda joylashtirib, ichki muloqot vositasi sifatida qo‘llashi mumkin. Bunda foydalanuvchi ma’lumotlari ustidan to‘liq nazorat mamlakat ichida qoladi. Qatlamli arxitektura va oldindan loyihalangan ma’lumotlar bazasi sxemasi tizimni bosqichma-bosqich kengaytirish imkonini beradi.',
    'Kelajakda tizimni quyidagi yo‘nalishlarda rivojlantirish rejalashtirilgan: kanallar va botlar platformasi; WebRTC asosidagi ovozli va video qo‘ng‘iroqlar; maxfiy chatlar uchun uchdan-uchgacha shifrlash; ikki bosqichli autentifikatsiya va foydalanuvchilarni bloklash; xabarlarga reaksiyalar, so‘rovnomalar va stikerlar; push-bildirishnomalar; mobil ilovalar (Android, iOS); Redis va bir nechta server nusxasi yordamida gorizontal kengaytirish.',
  ),
];
