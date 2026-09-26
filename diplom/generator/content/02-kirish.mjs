import { bullets, h1, h3, p, ps } from '../lib.mjs';

export const introduction = () => [
  h1('Kirish'),
  ...ps(
    'Bugungi kunda axborot-kommunikatsiya texnologiyalari jamiyat hayotining barcha sohalariga chuqur kirib borgan. Odamlar o‘rtasidagi muloqotning katta qismi telefon qo‘ng‘iroqlari va elektron pochtadan tezkor xabar almashish dasturlariga, ya’ni messenjerlarga ko‘chdi. Messenjerlar endi faqat do‘stlar va yaqinlar bilan suhbatlashish vositasi emas: ularda o‘quv guruhlari va ish jamoalari tashkil etiladi, yangiliklar tarqatiladi, davlat va tijorat xizmatlari ko‘rsatiladi. Shu sababli messenjer bugungi kunda muhim axborot infratuzilmasining bir qismiga aylangan.',
    'O‘zbekistonda ham messenjerlardan foydalanish keng tarqalgan. Aholining asosiy qismi xorijiy kompaniyalar tomonidan ishlab chiqilgan va boshqariladigan Telegram, WhatsApp kabi ilovalardan foydalanadi. Bu ilovalar qulay bo‘lsa-da, fuqarolarning yozishmalari, aloqalar ro‘yxati va boshqa shaxsga doir ma’lumotlari mamlakat hududidan tashqarida joylashgan serverlarda saqlanadi. Ushbu serverlar ustidan milliy nazorat yo‘q, xizmat ko‘rsatish shartlari esa istalgan vaqtda bir tomonlama o‘zgartirilishi mumkin.',
  ),
  h3('Mavzuning dolzarbligi.'),
  ...ps(
    'O‘zbekiston Respublikasi Prezidentining 2020-yil 5-oktabrdagi PF-6079-son Farmoni bilan tasdiqlangan “Raqamli O‘zbekiston – 2030” strategiyasi raqamli infratuzilmani rivojlantirish, mahalliy dasturiy mahsulotlar ishlab chiqarishni kengaytirish va axborot xavfsizligini ta’minlashni ustuvor vazifalar sifatida belgilaydi. “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunga 2021-yilda kiritilgan o‘zgartishlarga ko‘ra esa O‘zbekiston fuqarolarining shaxsga doir ma’lumotlari respublika hududida joylashgan texnik vositalarda to‘planishi va saqlanishi lozim.',
    'Bu talablar milliy messenjer yaratish masalasini dolzarb qiladi. Milliy messenjerda foydalanuvchi ma’lumotlari mamlakat ichidagi serverlarda saqlanadi, interfeys o‘zbek tilida bo‘ladi, dastur kodi va arxitekturasi esa mahalliy mutaxassislar nazoratida rivojlantiriladi. Bundan tashqari, bunday loyihani ishlab chiqish mahalliy dasturchilarning yuqori yuklamali, real vaqtda ishlaydigan tizimlarni yaratish tajribasini oshiradi.',
    'Messenjer yaratish texnik jihatdan ham murakkab va qiziqarli masala. Xabarlar bir necha millisekund ichida yetkazilishi, foydalanuvchining onlayn holati va “yozmoqda” belgisi darhol ko‘rinishi, katta hajmdagi yozishmalar tarixi tez yuklanishi, media fayllar xavfsiz saqlanishi, autentifikatsiya esa ishonchli bo‘lishi kerak. Bu masalalarni hal etish zamonaviy dasturiy injiniring usullarini, jumladan qatlamli arxitektura, real vaqtda aloqa protokollari va ma’lumotlar bazasini optimallashtirishni amalda qo‘llashni talab qiladi.',
  ),
  h3('Bitiruv malakaviy ishining maqsadi'),
  p(
    'Ishning maqsadi — Telegramga o‘xshash, foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, shaxsiy va guruh yozishmalarini real vaqtda ta’minlaydigan “Milliy chat” veb-messenjerini loyihalash va ishlab chiqishdir.',
  ),
  h3('Qo‘yilgan maqsadga erishish uchun quyidagi vazifalar belgilandi:'),
  ...bullets([
    'mavjud messenjerlarni (Telegram, WhatsApp, Signal, Viber va boshqalar) funksional imkoniyatlari, xavfsizligi va arxitekturasi bo‘yicha tahlil qilish;',
    'real vaqtda ma’lumot almashish texnologiyalarini (long polling, Server-Sent Events, WebSocket, SignalR) o‘rganish va tizim uchun eng maqbulini tanlash;',
    'tizimga qo‘yiladigan funksional va nofunksional talablarni aniqlash;',
    'Clean Architecture tamoyillari asosida tizim arxitekturasini, PostgreSQL ma’lumotlar bazasi sxemasini va UML modellarini loyihalash;',
    'elektron pochtaga yuboriladigan bir martalik kod, Google hisobi, JWT va refresh token asosida xavfsiz autentifikatsiya va sessiyalarni boshqarish tizimini ishlab chiqish;',
    'shaxsiy va guruh chatlari, xabarlarni tahrirlash va o‘chirish, qidirish, media fayllar yuborish, hikoyalar va onlayn holat funksiyalarini .NET 8 platformasida amalga oshirish;',
    'Angular freymvorkida moslashuvchan (responsive), yorug‘ va qorong‘i mavzuni qo‘llab-quvvatlaydigan foydalanuvchi interfeysini yaratish;',
    'xabarlarni lotin yoki kirill yozuvida ko‘rsatish va yozuvdan qat’i nazar qidirish imkonini beruvchi transliteratsiya algoritmini ishlab chiqish;',
    'e-pochta domeni orqali tashkilot a’zolarini tasdiqlash va tashkilotning yopiq guruhlarini avtomatik shakllantirish mexanizmini yaratish;',
    'brauzerdagi Web Crypto API asosida uchdan-uchgacha shifrlangan maxfiy chatlar protokolini loyihalash va amalga oshirish;',
    'dasturni Docker konteyneri ko‘rinishida bulutli serverga joylashtirish va sinovdan o‘tkazish;',
    'dasturchining ish joyini ergonomik talablar asosida tashkil etish, evakuatsiya tadbirlarini rejalashtirish va favqulodda vaziyatlarda xodimlarning harakatlar tartibini ishlab chiqish.',
  ]),
  h3('Tadqiqot obyekti va predmeti.'),
  p(
    'Tadqiqot obyekti — foydalanuvchilar o‘rtasida matnli va multimedia xabarlar almashishni ta’minlaydigan onlayn muloqot tizimlari. Tadqiqot predmeti — real vaqtda ishlaydigan messenjerning arxitekturasi, ma’lumotlar modeli, xabarlarni yetkazish mexanizmlari hamda ularni .NET va Angular texnologiyalari yordamida amalga oshirish usullari.',
  ),
  h3('Tadqiqot usullari.'),
  p(
    'Ishda qiyosiy tahlil, tizimli yondashuv, obyektga yo‘naltirilgan loyihalash, UML yordamida modellashtirish, relatsion ma’lumotlar bazasini normallashtirish hamda dasturiy ta’minotni bosqichma-bosqich (iterativ) ishlab chiqish va sinash usullaridan foydalanildi. Dastur kodi Git versiyalar nazorati tizimida yuritildi. Har bir funksiya alohida tarmoqda (branch) ishlab chiqilib, tekshirilgandan so‘ng asosiy tarmoqqa birlashtirildi.',
  ),
  h3('Ishning ilmiy-amaliy yangiligi.'),
  ...bullets([
    'o‘zbek tilining lotin va kirill yozuvlari o‘rtasida kontekstga bog‘liq qoidalarni hisobga oluvchi transliteratsiya algoritmi ishlab chiqildi. Uning asosida har bir foydalanuvchi xabarlarni o‘zi tanlagan yozuvda ko‘radi, qidiruv esa yozuvga bog‘liq bo‘lmagan normallashtirilgan kalit bo‘yicha ishlaydi. Server va klientdagi amalga oshirishlarning bir xilligi yagona test to‘plami bilan kafolatlanadi;',
    'tashkilotni oldindan ro‘yxatga olishni talab qilmaydigan, tasdiqlangan e-pochta domeniga asoslangan a’zolikni tasdiqlash va yopiq tashkilot guruhlarini avtomatik shakllantirish usuli taklif etildi. Umumiy pochta xizmatlari foydalanuvchilari bu mexanizmdan chetlashtiriladi;',
    'faqat brauzerga o‘rnatilgan standart kriptografik primitivlar (X25519, HKDF, HMAC, AES-256-GCM) asosida, uchinchi tomon kutubxonalarisiz, oldinga maxfiylikka ega uchdan-uchgacha shifrlangan maxfiy chat protokoli ishlab chiqildi. Server xabar mazmunini bilmasligi ma’lumotlar bazasi darajasida ko‘rsatib berildi.',
  ]),
  h3('Ishning amaliy ahamiyati.'),
  p(
    'Ishlab chiqilgan “Milliy chat” tizimi to‘liq ishlaydigan veb-ilova bo‘lib, uni tashkilotlar, ta’lim muassasalari yoki davlat idoralari o‘z serverlarida joylashtirib, ichki muloqot vositasi sifatida qo‘llashi mumkin. Tashkilot rejimi tufayli ta’lim muassasasi yoki kompaniya xodimlari o‘z korporativ pochtasi bilan kirishi bilanoq tashkilotning yopiq guruhiga tushadi, maxfiy chatlar esa eng nozik yozishmalarni serverdan ham himoya qiladi. Tizim modulli tuzilgan. Shu sababli unga kanallar, ovozli va video qo‘ng‘iroqlar, stikerlar, botlar kabi yangi imkoniyatlarni qo‘shish oson. Ma’lumotlar bazasi sxemasida bu imkoniyatlar uchun zarur jadvallar oldindan loyihalangan.',
  ),
  h3('Bitiruv malakaviy ishining tuzilishi.'),
  p(
    'Ish kirish, to‘rt bob, xulosa, foydalanilgan adabiyotlar ro‘yxati va ilovalardan iborat. Birinchi bobda messenjerlarning rivojlanishi, mavjud yechimlar va real vaqtda aloqa texnologiyalari tahlil qilinib, masala qo‘yilgan. Ikkinchi bobda texnologiyalar tanlangan, tizim arxitekturasi, ma’lumotlar bazasi, UML modellari, xavfsizlik mexanizmlari va maxfiy chatlarning kriptografik protokoli loyihalangan. Uchinchi bobda dasturning server va klient qismlarini, shu jumladan transliteratsiya, tashkilot rejimi va maxfiy chatlarni ishlab chiqish, joylashtirish va sinash jarayonlari hamda foydalanish yo‘riqnomasi keltirilgan. To‘rtinchi bobda hayot faoliyati xavfsizligi doirasida dasturchining ergonomik ish joyini tashkil etish hamda evakuatsiya tadbirlarini rejalashtirish va avariya, yong‘inlar sodir bo‘lganda xodimlarning harakatlari ko‘rib chiqilgan. Ish 46 ta rasm, 19 ta jadval, 10 ta kod listingi va 7 ta ilovani o‘z ichiga oladi.',
  ),
];
