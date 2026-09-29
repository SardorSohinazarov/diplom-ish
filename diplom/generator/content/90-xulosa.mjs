import { bullets, h1, p, ps } from '../lib.mjs';

export const conclusion = () => [
  h1('Xulosa'),
  p(
    'Bitiruv malakaviy ishida foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, real vaqtda xabar almashish imkonini beruvchi “Milliy chat” dasturi loyihalandi va ishlab chiqildi. Kirishda qo‘yilgan vazifalar quyidagicha hal etildi:',
  ),
  ...bullets([
    'mavjud messenjerlar taqqoslanib, ularning barchasi ma’lumotlarni xorijda saqlashi va bu lokalizatsiya talablari nuqtai nazaridan milliy yechim zarurligini asoslashi ko‘rsatildi; real vaqt aloqasi uchun SignalR tanlandi;',
    'server qismi Clean Architecture asosida to‘rt qatlamga ajratildi, PostgreSQL bazasi 10 ta sxemadagi 36 ta jadvaldan iborat qilib loyihalandi, tizim UML diagrammalari bilan modellashtirildi;',
    'bir martalik kod, Google hisobi, qisqa muddatli JWT va rotatsiya qilinadigan refresh token asosidagi parolsiz autentifikatsiya hamda qurilmalar bo‘yicha sessiyalarni boshqarish ishlab chiqildi;',
    '.NET 8 va SignalR asosida 73 ta endpointli REST API va real vaqt habi amalga oshirildi: shaxsiy va guruh chatlari, media fayllar, “yozmoqda” va o‘qilganlik belgilari, onlayn holat va hikoyalar; Angular 22 da moslashuvchan, qorong‘i mavzuli interfeys yaratildi;',
    'lotin–kirill transliteratsiyasi va yozuvdan qat’i nazar qidiruv, e-pochta domeni orqali tashkilot rejimi hamda Web Crypto API asosidagi oldinga maxfiylikka ega E2E shifrlangan maxfiy chatlar ishlab chiqildi;',
    'tizim Docker konteynerida bulutga joylashtirildi va 307 ta server, 229 ta klient testi, 43 ta integratsion tekshiruv hamda qo‘lda o‘tkazilgan sinovlar bilan tasdiqlandi;',
    'hayot faoliyati xavfsizligi bo‘limida dasturchi ish joyining ergonomik talablari tizimlashtirildi, yoritish va shamollatish hisoblandi, IT-ofis uchun evakuatsiya reja-sxemasi va hisobiy evakuatsiya vaqti aniqlandi.',
  ]),
  ...ps(
    '“Milliy chat”ni ta’lim muassasalari, tashkilotlar va davlat idoralari respublika hududidagi serverlarda ichki muloqot vositasi sifatida qo‘llashi mumkin, bunda ma’lumotlar ustidan nazorat mamlakat ichida qoladi. Tashkilot rejimi xodimlarni korporativ pochta orqali avtomatik birlashtiradi, transliteratsiya turli yozuvda yozadigan foydalanuvchilarning bir-birini tushunishini osonlashtiradi, maxfiy chatlar esa nozik yozishmalarni serverdan ham himoya qiladi.',
    'Kelajakda kanallar va botlar, WebRTC asosidagi qo‘ng‘iroqlar, OneID orqali shaxsni tasdiqlash, maxfiy chatlarni ko‘p qurilmali modelga o‘tkazish, push-bildirishnomalar va mobil ilovalarni qo‘shish rejalashtirilgan.',
  ),
];
