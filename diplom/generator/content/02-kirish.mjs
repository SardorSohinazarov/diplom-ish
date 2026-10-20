import { bullets, h1, h3, p, ps } from '../lib.mjs';

// The six numbered parts of the introduction follow the department's required order.
export const introduction = () => [
  h1('Kirish'),
  h3('1. Diplom loyihaning dolzarbligi.'),
  ...ps(
    'Bugun muloqotning katta qismi messenjerda kechadi: talabalar guruhidagi e’lonlar, kafedra bilan yozishmalar, ish jamoasidagi kundalik muhokamalar. O‘zbekistonda bu vazifani asosan Telegram va WhatsApp bajaradi. Ikkalasi ham xorijiy kompaniyaniki. Shu sababli millionlab fuqarolarning yozishmalari va kontaktlari, kim bilan qachon gaplashgani haqidagi ma’lumotlar chet eldagi serverlarda turadi. Bu ma’lumotlarga O‘zbekiston qonunlari ta’sir qila olmaydi.',
    'Davlat bu muammoni qonun darajasida tan olgan. “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunga 2021-yilda kiritilgan o‘zgartishga ko‘ra, fuqarolar haqidagi ma’lumotlar respublika hududidagi serverlarda saqlanishi kerak [1]. “Raqamli O‘zbekiston – 2030” strategiyasi esa mahalliy dasturiy mahsulotlarni rivojlantirishni ustuvor vazifa deb belgilagan [7]. Xorijiy messenjerlar bu talablarga javob bermaydi.',
    'Mahalliy muqobil ham bor: davlat xodimlari uchun Humo messenjeri yaratilgan. Ammo u Telegram’ning ochiq kodi asosida qilingan, pullik va faqat davlat tashkilotlari uchun mo‘ljallangan [52]. Universitet, xususiy kompaniya yoki oddiy fuqaro uchun ma’lumotlarni o‘z serverida saqlaydigan, bepul va mustaqil messenjer hanuz yo‘q.',
    'Bundan tashqari, mavjud messenjerlar o‘zbek foydalanuvchisiga xos ikki ehtiyojni hisobga olmaydi. Birinchisi — ikki yozuv. Bir kishi kirillda, boshqasi lotinda yozadi, lotincha qidiruv esa kirillcha xabarni topmaydi. Ikkinchisi — tashkilotga a’zolikni tasdiqlash. Telefon raqami odamning qaysi universitet yoki kompaniyada ishlashini ko‘rsatmaydi. Diplom loyihasida bu muammolarga quyidagi yechimlar taklif etildi:',
  ),
  ...bullets([
    'lotin va kirill yozuvlari o‘rtasida avtomatik o‘girish. Har bir foydalanuvchi xabarni o‘zi o‘rgangan yozuvda o‘qiydi, qidiruv esa ikkala yozuvda ham ishlaydi. Algoritm o‘zbek imlosining murakkab joylarini hisobga oladi: masalan, “е” harfi so‘z boshida “ye”, o‘rtasida “e” bo‘ladi;',
    'ish e-pochtasi orqali tashkilotga qo‘shilish. Tashkilotni oldindan ro‘yxatdan o‘tkazish shart emas: masalan, universitet pochtasi bilan kirgan har bir kishi avtomatik ravishda universitetning yopiq guruhiga tushadi;',
    'maxfiy chatlar. Xabarlar foydalanuvchining brauzerida shifrlanadi va faqat suhbatdoshning brauzerida ochiladi. Server xabar mazmunini ko‘rmaydi va saqlamaydi.',
  ]),
  h3('2. Diplom loyihaning maqsadi.'),
  ...ps(
    'Loyihaning maqsadi — foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, shaxsiy va guruh suhbatlarida xabarlarni real vaqtda yetkazadigan “Milliy” xabarchini loyihalash va ishlab chiqish.',
    'Bunday xabarchini universitet, kompaniya yoki davlat idorasi o‘z serveriga o‘rnatib, ichki aloqa vositasi sifatida ishlatishi mumkin. Uni boshqa axborot tizimlariga ham qo‘shsa bo‘ladi. Buning amaliy isboti bor: diplom loyihasida yaratilgan chat texnologiyasi asosida Elektron kooperatsiya portalida kompaniyalar o‘rtasida yozishish uchun chat moduli ishlab chiqildi.',
  ),
  h3('3. Diplom loyihaning vazifalari.'),
  p('Maqsadga erishish uchun quyidagi vazifalar belgilandi:'),
  ...bullets([
    'mashhur messenjerlarni hamda serverdan brauzerga xabar yetkazish usullarini solishtirib, loyiha uchun texnologiyalarni tanlash;',
    'tizimga qo‘yiladigan talablarni aniqlash, uning tuzilishi, ma’lumotlar bazasi va UML modellarini loyihalash;',
    'parolsiz, ya’ni e-pochtaga keladigan bir martalik kod yoki Google hisobi orqali xavfsiz kirishni yaratish;',
    '.NET muhitida va Angular’da shaxsiy va guruh chatlari, fayl almashish, reaksiyalar, lavhalar va onlayn holatni amalga oshirish;',
    'foydalanuvchilar ochiq fikr almashadigan forum bo‘limini yaratish;',
    'o‘zbek foydalanuvchisi uchun uchta o‘ziga xos imkoniyatni ishlab chiqish: lotin–kirill o‘girish, tashkilot rejimi va maxfiy chatlar;',
    'dasturni serverga joylashtirish va avtomatik testlar bilan tekshirish;',
    'dasturchi ish joyining xavfsizligi va ofisdan evakuatsiya qilish tartibini ishlab chiqish.',
  ]),
  h3('4. Diplom loyihaning obyekti.'),
  p(
    'Diplom loyihaning obyekti — Internet orqali matn va fayllar almashishga mo‘ljallangan messenjerlar.',
  ),
  h3('5. Diplom loyihaning predmeti.'),
  p(
    'Diplom loyihaning predmeti — messenjerda xabarni real vaqtda yetkazish, ma’lumotlarni saqlash va himoyalash usullari hamda ularni .NET va Angular yordamida amalga oshirish. Avval mavjud yechimlar solishtirildi, keyin tizim UML diagrammalari bilan modellashtirildi. Dastur bosqichma-bosqich yozildi va har bir bosqich avtomatik testlar bilan tekshirib borildi.',
  ),
  h3('6. Diplom loyiha tuzilishi va hajmi.'),
  p(
    'Diplom loyihasi kirish, to‘rt bob, xulosa, foydalanilgan adabiyotlar ro‘yxati va ilovalardan iborat. I bobda mavjud messenjerlar va real vaqtda aloqa texnologiyalari tahlil qilinib, vazifa qo‘yilgan. II bob tizimni loyihalashga, III bob dasturni yaratish, sinash va undan foydalanishga, IV bob hayot faoliyati xavfsizligiga bag‘ishlangan. Diplom loyihasi 94 betdan iborat bo‘lib, unda 41 ta rasm, 17 ta jadval, 1 ta formula, 54 ta adabiyot va 5 ta ilova bor.',
  ),
];
