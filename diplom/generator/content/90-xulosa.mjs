import { bullets, h1, p, ps } from '../lib.mjs';

export const conclusion = () => [
  h1('Xulosa'),
  p(
    'Diplom loyihasi natijasi — foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan va xabarlarni real vaqtda yetkazadigan “Milliy” xabarchi. U hozir bulut serverida ishlab turibdi. Kirishda qo‘yilgan vazifalar bo‘yicha quyidagi natijalarga erishildi:',
  ),
  ...bullets([
    'Telegram, WhatsApp, Signal, WeChat va mahalliy Humo messenjerlari solishtirildi. Xorijiy messenjerlar ma’lumotlarni chet elda saqlaydi, Humo esa pullik va faqat davlat xodimlari uchun. Hech biri o‘zbek tilining ikki yozuvini hisobga olmaydi. Xabarlarni jonli yetkazish uchun SignalR tanlandi: u eng tez usul bilan ishlaydi, u ishlamasa esa boshqa usulga o‘zi o‘tadi.',
    '“Milliy” xabarchining funksional va nofunksional ustunliklari aniqlandi: o‘z kodi, hamma uchun ochiq va bepulligi, ma’lumotlarning mamlakat ichida saqlanishi, boshqa tizimlarga qo‘shilishi, sekin internetda ham ishlashi va boshqalar. Keyingi bosqichda sun’iy intellekt yordamchisini qo‘shish rejasi tuzildi.',
    'Server .NET muhitida, Entity Framework asosida yozildi va to‘rt qismga bo‘lindi. Shuning uchun dasturning asosiy qoidalari baza yoki texnologiya almashganda o‘zgarmaydi. Ma’lumotlar bazasida o‘n bitta guruhga ajratilgan 43 ta jadval bor, ularning bir qismi kanallar va qo‘ng‘iroqlar kabi kelgusidagi imkoniyatlar uchun tayyorlab qo‘yilgan.',
    'Tizimga kirish parolsiz: e-pochtaga kod keladi yoki Google hisobi ishlatiladi. Kodlar bazada ochiq holda emas, xesh ko‘rinishida saqlanadi. Foydalanuvchi qaysi qurilmalardan kirilganini ko‘radi va begona qurilmani chiqarib yubora oladi.',
    'Shaxsiy va guruh chatlari, fayl almashish, xabarlarga reaksiyalar, lavhalar, “yozmoqda” va “o‘qildi” belgilari hamda onlayn holat ishlaydi. Keraksiz odamni bloklash mumkin, ilova boshqa oynada turganda esa yangi xabar haqida kompyuter ekranida bildirishnoma chiqadi. Interfeys telefonda ham, kompyuterda ham qulay, yorug‘ va qorong‘i ko‘rinishga ega.',
    'Ochiq fikr almashish uchun forum yaratildi. Unda qisqa postlar, javoblar, ulashish, iqtibos, layk, obunalar va jonli bildirishnomalar bor. Top lentada postlar mashhurligi va yoshiga qarab tartiblanadi, spamga qarshi esa cheklovlar va shikoyatlar qo‘llanadi.',
    'Uchta o‘ziga xos imkoniyat amalga oshirildi. Kirillda yozilgan xabarni lotinda o‘qish mumkin va aksincha, qidiruv esa ikkala yozuvda ham topadi. Tashkilot pochtasi bilan kirgan odam o‘z tashkilotining yopiq guruhiga avtomatik qo‘shiladi. Maxfiy chatda xabarni faqat ikki suhbatdosh o‘qiy oladi, server esa uning mazmunini bilmaydi.',
    'Dasturni joylashtirish uchun konteynerlash texnologiyalaridan biri — Docker’dan foydalanildi. Dastur to‘g‘ri ishlashi 720 ta avtomatik test, 43 ta qo‘shimcha tekshiruv va qo‘lda o‘tkazilgan sinovlar bilan tasdiqlandi.',
    'Diplom loyihasida yaratilgan chat texnologiyasi amaliyotda qo‘llanildi: uning asosida Elektron kooperatsiya portalida kompaniyalar o‘rtasidagi chat moduli ishlab chiqildi.',
    'Hayot faoliyati xavfsizligi bo‘limida dasturchining ish joyiga qo‘yiladigan talablar keltirildi, ofis qavati uchun evakuatsiya reja-sxemasi tuzildi va avariyalarda xodimlar nima qilishi kerakligi belgilandi.',
  ]),
  ...ps(
    'Dasturning asosiy afzalligi shundaki, uni istalgan tashkilot o‘z serverida ishga tushirib, yozishmalarini to‘liq o‘z nazoratida saqlay oladi. Diplom loyihasi davomida real vaqtda ishlaydigan tizimni loyihalash, xavfsiz kirish va uchdan-uchgacha shifrlashni amalda qo‘llash tajribasi orttirildi.',
    'Dasturni rivojlantirishning keyingi bosqichi rejalashtirildi. Birinchi navbatda sun’iy intellekt yordamchisi qo‘shiladi: u yozishmaning qisqacha mazmunini chiqaradi, javob variantlarini taklif qiladi, ovozli xabarni matnga aylantiradi, tarjima qiladi, imloni tuzatadi va spamni aniqlaydi. Xabarchi ichida bozor yaratiladi: foydalanuvchilar do‘kon ochib savdo qiladi, kompaniyalar o‘rtasida esa auksion va tenderlar o‘tkaziladi. Tenderlarning shaffofligi va shartnomalarning ishonchliligi blokcheyn texnologiyasi bilan ta’minlanadi. Shuningdek, ovozli xabarlar va qo‘ng‘iroqlar, kanallar va botlar, OneID orqali shaxsni tasdiqlash hamda mobil ilovalar rejaga kiritilgan.',
  ),
];
