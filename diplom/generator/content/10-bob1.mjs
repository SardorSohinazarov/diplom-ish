import { bullets, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter1 = () => [
  h1('I-bob. Zamonaviy messenjerlar va milliy messenjer yaratish zaruriyati'),

  // ───────────────────────────────── 1.1
  h2('1.1. Messenjerlarning rivojlanishi va mavjud messenjerlar tahlili'),
  ...ps(
    'Messenjer (ingl. instant messenger) — Internet orqali matn, ovoz, video va fayllarni deyarli bir zumda yetkazadigan dastur. Elektron pochtadan farqi shundaki, messenjerda muloqot jonli suhbatga o‘xshaydi: xabar darhol yetib boradi, yozgan odam esa suhbatdoshi onlayn ekanini, xabarni o‘qiganini yoki javob yozayotganini ko‘rib turadi.',
    'Birinchi ommaviy chat tizimi 1988-yilda paydo bo‘lgan IRC edi. 1996-yilda chiqqan ICQ “kontaktlar ro‘yxati” va “onlayn” tushunchalarini ommalashtirdi. 1999-yilda boshlangan Jabber loyihasi esa XMPP nomli ochiq standartga asos bo‘ldi. Smartfonlar tarqalgach, 2009-yilda WhatsApp foydalanuvchini telefon raqami orqali tanishni joriy qildi va messenjerni SMS’ning bepul o‘rinbosariga aylantirdi. 2013-yilda chiqqan Telegram yozishmalarni serverda saqlab, ularni istalgan qurilmadan ochish imkonini berdi. 2014-yilda paydo bo‘lgan Signal esa kuchli shifrlash usulini taklif qildi, keyinchalik bu usulni WhatsApp ham qabul qildi [26, 47].',
    'Bugungi messenjerlar to‘rt yo‘nalishda rivojlanmoqda. Birinchisi — xavfsizlik: yozishmalarni shifrlash, qaysi qurilmalardan kirilganini nazorat qilish, o‘z-o‘zidan o‘chadigan xabarlar. Ikkinchisi — ko‘p qurilmalilik: bitta hisobdan telefon, kompyuter va brauzerda bir vaqtda foydalanish. Uchinchisi — ommaviy muloqot: katta guruhlar, kanallar, ochiq lentalar va 24 soatdan keyin o‘chadigan lavhalar (stories). To‘rtinchisi — messenjerning platformaga aylanishi: botlar, mini-ilovalar va to‘lovlar. Xitoydagi WeChat bunga yaxshi misol bo‘lib, uni “super-ilova” deb atashadi.',
    'WhatsApp’dan 2 milliarddan ortiq, Telegram’dan esa har oy 1 milliarddan ortiq kishi foydalanadi. Shunga qaramay, ayrim davlatlarda mahalliy messenjerlar yetakchi: Janubiy Koreyada KakaoTalk, Yaponiyada LINE, Vyetnamda Zalo, Xitoyda WeChat. Bu misollar shuni ko‘rsatadiki, o‘z foydalanuvchisining ehtiyojini yaxshi biladigan milliy messenjer xalqaro gigantlar bilan raqobatlasha oladi.',
  ),

  h3('Mavjud messenjerlar tahlili.'),
  p(
    '“Milliy” xabarchiga qo‘yiladigan talablarni aniqlash uchun beshta messenjer o‘rganildi: O‘zbekistonda eng ko‘p ishlatiladigan Telegram va WhatsApp, maxfiylik bo‘yicha namuna hisoblangan Signal, “super-ilova” WeChat hamda mahalliy Humo messenjeri.',
  ),
  h3('Telegram.'),
  p(
    'Telegram o‘zi ishlab chiqqan MTProto 2.0 protokolidan foydalanadi [46]. Oddiy chatlarda xabarlar yo‘lda shifrlanadi, lekin serverda saqlanadi. Shuning uchun yozishmalarni istalgan qurilmadan ochish mumkin. Faqat suhbatdoshlar o‘qiy oladigan to‘liq shifrlash esa alohida “maxfiy chat”larda ishlaydi. Telegram 200 ming kishilik guruhlar, kanallar, botlar va 2 GB gacha fayllarni qo‘llaydi. Uning kuchli tomonlari — tezligi, barcha qurilmalarda bir xil ishlashi va imkoniyatlarining ko‘pligi. Zaif tomonlari — server kodi yopiq, serverlari esa chet elda.',
  ),
  h3('WhatsApp.'),
  p(
    'WhatsApp Meta kompaniyasiga tegishli. 2016-yildan beri barcha yozishmalar Signal protokoli bilan shifrlanadi, ya’ni ularni faqat suhbatdoshlar o‘qiy oladi. Xabar serverda faqat yetkazilgunga qadar turadi [47]. Guruhga 1024 kishigacha qo‘shish mumkin. Kamchiligi shundaki, dastur kodi yopiq, kim kim bilan qachon yozishgani haqidagi ma’lumotlar esa kompaniyada qoladi.',
  ),
  h3('Signal va WeChat.'),
  p(
    'Signal’ning kodi to‘liq ochiq: uni istalgan mutaxassis tekshira oladi. Barcha yozishmalar shifrlanadi, foydalanuvchi haqida juda kam ma’lumot saqlanadi. Ammo imkoniyatlari kamroq: kanallar, botlar va katta guruhlar yo‘q. Tencent kompaniyasiga tegishli WeChat esa messenjer, to‘lov tizimi va mini-ilovalarni bitta ilovaga jamlagan. Biroq unda yozishmalar to‘liq shifrlanmaydi.',
  ),
  h3('Humo.'),
  p(
    'Humo — davlat tashkilotlari xodimlari uchun yaratilgan mahalliy messenjer. Uni UNICON-SOFT kompaniyasi ishlab chiqqan, kompaniya ulushining bir qismi Raqamli texnologiyalar vazirligi tizimidagi korxonaga tegishli. Humo Telegram’ning ochiq kodi asosida qilingan, shuning uchun tashqi ko‘rinishi va sozlamalari Telegram’nikiga juda o‘xshaydi. Ishlab chiquvchilarning aytishicha, bu xodimlar yangi dasturga tezroq o‘rganishi uchun qilingan. Messenjer 2023-yil yanvarida ishga tushirilgan [53]. Ilovalar do‘konidagi tavsifga ko‘ra, unda 200 ming kishilik guruhlar va 2 GB gacha fayllar qo‘llab-quvvatlanadi [54]. Messenjer pullik: har bir xodim uchun oyiga 25 200 so‘m obuna to‘lovi belgilangan. 2023-yil boshida uning 22 mingdan ortiq rasmiy foydalanuvchisi bo‘lgan. Vazirlik talabiga ko‘ra, serverlari O‘zbekistonda joylashishi kerak [52].',
  ),
  p(
    'Humo ma’lumotlarni mamlakat ichida saqlash masalasini qisman hal qiladi. Ammo u yopiq, pullik va faqat davlat xodimlari uchun mo‘ljallangan. Universitet, xususiy kompaniya yoki oddiy fuqaro undan foydalana olmaydi. Messenjerlarning taqqoslanishi 1.1-jadvalda keltirilgan.',
  ),
  ...table(
    '1.1',
    'Messenjerlarning qiyosiy tahlili',
    ['Mezon', 'Telegram', 'WhatsApp', 'Signal', 'WeChat', 'Humo', '“Milliy” xabarchi'],
    [
      ['Egasi (davlat)', 'Telegram (BAA)', 'Meta (AQSh)', 'Signal Foundation (AQSh)', 'Tencent (Xitoy)', 'UNICON-SOFT (O‘zbekiston)', 'Mahalliy ishlab chiquvchi'],
      ['Kimlar uchun', 'Hamma', 'Hamma', 'Hamma', 'Hamma', 'Davlat xodimlari', 'Hamma, tashkilotlar'],
      ['Narxi', 'Bepul', 'Bepul', 'Bepul', 'Bepul', 'Oyiga 25 200 so‘m', 'Bepul'],
      ['Ro‘yxatdan o‘tish', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', '—', 'E-pochta kodi, Google'],
      ['To‘liq shifrlash', 'Faqat maxfiy chatlarda', 'Hamma chatlarda', 'Hamma chatlarda', 'Yo‘q', 'Bor (ishlab chiquvchi ma’lumoti)', 'Maxfiy chatlarda'],
      ['Guruh hajmi', '200 000', '1024', '1000', '500', '200 000', '200'],
      ['Kanallar, botlar', 'Bor', 'Kanallar bor', 'Yo‘q', 'Bor', '—', 'Kelajakda'],
      ['Lavhalar (stories)', 'Bor', 'Bor (Status)', 'Bor', 'Bor', '—', 'Bor'],
      ['Ochiq lenta (postlar)', 'Kanallar orqali', 'Kanallar orqali', 'Yo‘q', 'Bor (Moments)', '—', 'Forum'],
      ['Xabarga reaksiya', 'Bor', 'Bor', 'Bor', 'Yo‘q', '—', 'Bor'],
      ['Dastur kodi', 'Server kodi yopiq', 'Yopiq', 'Ochiq', 'Yopiq', 'Telegram klienti asosida', 'O‘zimizda, to‘liq nazoratda'],
      ['Ma’lumotlar qayerda', 'Chet elda', 'Chet elda', 'Chet elda', 'Xitoyda', 'O‘zbekistonda', 'Istalgan serverda, jumladan O‘zbekistonda'],
      ['Lotin/kirill yozuvida ko‘rsatish', 'Yo‘q', 'Yo‘q', 'Yo‘q', 'Yo‘q', '—', 'Bor (qidiruv ham)'],
      ['Tashkilotga a’zolikni tasdiqlash', 'Yo‘q', 'Yo‘q', 'Yo‘q', 'Yo‘q', '—', 'Ish e-pochtasi orqali'],
    ],
    [2.9, 2.3, 2.2, 2.3, 2.2, 2.5, 2.8],
  ),
  p('Izoh: “—” belgisi ochiq manbalarda ma’lumot topilmaganini bildiradi.', { noIndent: true }),
  p(
    'Taqqoslash shuni ko‘rsatdiki, xorijiy messenjerlar imkoniyat va qulaylik jihatidan juda kuchli, lekin ma’lumotlarni chet elda saqlaydi. Mahalliy Humo esa faqat davlat xodimlari uchun ochiq. Imkoniyat va qulaylik o‘rtasidagi muvozanat eng yaxshi bo‘lgani uchun “Milliy” xabarchining ko‘rinishi va ishlash tartibida Telegram namuna qilib olindi. Ro‘yxatdan o‘tish esa pullik SMS xizmati o‘rniga elektron pochta va Google hisobi orqali qilinadi.',
  ),

  h3('“Milliy” xabarchining ustunliklari.'),
  p(
    'Tabiiy savol tug‘iladi: mahalliy Humo messenjeri ishlab turgan bir paytda yana bitta messenjer nega kerak? Javob shundaki, “Milliy” xabarchi boshqa maqsad va boshqa foydalanuvchilar uchun yaratilgan. Uning ustunliklarini ikki guruhga ajratish mumkin: foydalanuvchiga beradigan imkoniyatlari (funksional ustunliklar) va tizimning sifati (nofunksional ustunliklar).',
  ),
  p('Funksional ustunliklar:', { keepNext: true }),
  ...bullets([
    'sun’iy intellekt yordamchisi. Hozir ishlab chiqilmoqda va keyingi bosqichda qo‘shiladi. U uzun yozishma yoki guruh muhokamasining qisqacha mazmunini chiqarib beradi, xabarga javob variantlarini taklif qiladi, ovozli xabarni matnga aylantiradi, xabarni o‘zbek, rus va ingliz tillari o‘rtasida tarjima qiladi, o‘zbekcha matndagi imlo xatolarini tuzatadi, spam va haqoratli xabarlarni avtomatik aniqlaydi. Bunday imkoniyatlar yirik messenjerlarda endigina paydo bo‘lmoqda, o‘zbek tiliga moslangani esa hali yo‘q;',
    'o‘zbek tilining ikki yozuvi. Har kim xabarni o‘zi o‘rgangan yozuvda — lotin yoki kirillda o‘qiydi, qidiruv esa ikkala yozuvda ham ishlaydi;',
    'tashkilot rejimi. Ish e-pochtasi bilan kirgan xodim avtomatik ravishda o‘z tashkilotining yopiq guruhiga qo‘shiladi, ismi yonida esa tashkilot belgisi chiqadi;',
    'maxfiy chatlar. Ularda xabarni faqat ikki suhbatdosh o‘qiy oladi, server ham o‘qiy olmaydi;',
    'forum. Messenjer ichida ochiq muhokama, obunalar va eng mashhur postlar lentasi bor. Humo’da bunday bo‘lim yo‘q, Telegram’da esa bu faqat kanallar orqali bo‘ladi;',
    'parolsiz kirish. Telefon raqami va pullik SMS kerak emas, e-pochtaga keladigan kod yoki Google hisobi yetarli;',
    'boshqa tizimlarga qo‘shib bo‘ladi. Chat alohida modul sifatida boshqa saytlar va portallarga ulanadi. Buning amaliy isboti — Elektron kooperatsiya portalida kompaniyalar o‘rtasidagi chat aynan shu texnologiya asosida yaratilgan;',
    'bozor va tenderlar (keyingi bosqich). Xabarchi ichida do‘kon ochish, savdo qilish, kompaniyalar o‘rtasida auksion va tenderlar o‘tkazish rejalashtirilgan. Tender natijalarining shaffofligi blokcheyn texnologiyasi bilan ta’minlanadi.',
  ]),
  p('Nofunksional ustunliklar:', { keepNext: true }),
  ...bullets([
    'o‘z kodi va mustaqillik. Humo Telegram’ning kodi asosida qilingan, “Milliy” xabarchi esa noldan yozilgan. Uning har bir qismi ishlab chiquvchi nazoratida, uni istalgan vaqtda o‘zgartirish va rivojlantirish mumkin;',
    'hamma uchun ochiq va bepul. Humo faqat davlat xodimlari uchun va pullik. “Milliy” xabarchidan talaba, o‘qituvchi, kompaniya xodimi yoki oddiy fuqaro bepul foydalana oladi;',
    'ma’lumotlar mamlakat ichida. Universitet yoki kompaniya tizimni o‘z serveriga o‘rnatadi. Yozishmalar hech qaysi tashqi kompaniyaga, hatto mahalliy kompaniyaga ham berilmaydi. Bu “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonun talabiga to‘liq mos keladi;',
    'o‘rnatishni talab qilmaydi. Xabarchi brauzerda ishlaydi, shuning uchun uni kompyuterda ham, telefonda ham darhol ochish mumkin;',
    'sekin internetda ham ishlaydi. Rasmlar yuborishdan oldin siqiladi, videolar yengil nusxada beriladi, internet uzilganda yozilgan xabarlar navbatda turadi va aloqa tiklanishi bilan yuboriladi;',
    'xavfsizlik. Foydalanuvchi qaysi qurilmalardan kirilganini ko‘radi va begonasini chiqarib yuboradi, keraksiz odamni bloklaydi, yuklangan fayllar antivirus bilan tekshiriladi, kodlar va tokenlar bazada ochiq holda saqlanmaydi;',
    'kengaytirish oson. Foydalanuvchilar ko‘paysa, bir vaqtda bir nechta server ishga tushirish mumkin. Docker tufayli tizimni istalgan serverga tez ko‘chirish mumkin;',
    'ishonchlilik. Tizim 700 dan ortiq avtomatik test va qo‘lda o‘tkazilgan sinovlar bilan tekshirilgan.',
  ]),

  // ───────────────────────────────── 1.2
  h2('1.2. Axborot xavfsizligi va real vaqtda aloqa texnologiyalari'),
  h3('Ma’lumotlar lokalizatsiyasi.'),
  ...ps(
    'Messenjer odam haqidagi eng shaxsiy ma’lumotlarni saqlaydi: yozishmalar, fayllar, kontaktlar, kim bilan qachon gaplashgani, qaysi qurilma va qaysi manzildan kirgani. Xorijiy messenjerdan foydalanganda bu ma’lumotlar bir necha xavf ostida qoladi.',
    'Birinchidan, ma’lumotlar boshqa davlat qonunlariga bo‘ysunadi va o‘sha davlat idoralari ularni talab qilishi mumkin. Ikkinchidan, xabar mazmuni shifrlangan bo‘lsa ham, kim kim bilan qachon yozishgani xizmat egasiga ma’lum bo‘lib qoladi. Uchinchidan, xizmat shartlari o‘zgarishi, hisob bloklanishi yoki mintaqaviy cheklov tufayli foydalanuvchi bir kunda aloqasiz qolishi mumkin. To‘rtinchidan, server kodi yopiq bo‘lgani uchun ma’lumotlar qanday ishlatilayotganini tekshirib bo‘lmaydi.',
    '“Shaxsga doir ma’lumotlar to‘g‘risida”gi O‘RQ-547-son Qonun (2019) shaxsga doir ma’lumotlarni yig‘ish, saqlash va himoya qilish tartibini belgilaydi. 2021-yilgi o‘zgartishga ko‘ra, fuqarolarning ma’lumotlarini Internet orqali qayta ishlaydigan tashkilotlar ularni respublika hududidagi serverlarda saqlashi shart [1, 2]. Milliy messenjer bu talabga o‘z-o‘zidan javob beradi: uning serverlari mamlakat ichida turadi, kodi esa mahalliy mutaxassislar qo‘lida bo‘ladi.',
    'Milliy messenjer mahalliy ehtiyojlarni ham hisobga oladi. O‘zbekistonda lotin yozuvi rasmiy bo‘lsa-da [8], kirill yozuvi hali ham keng ishlatiladi: katta avlod ko‘pincha kirillda, yoshlar esa lotinda yozadi. Xorijiy messenjerlarda bu ikki yozuv bir-biri bilan bog‘lanmagan, shuning uchun lotincha qidiruv kirillcha xabarni topmaydi. Bundan tashqari, universitet va tashkilotlar uchun a’zoning haqiqatan ham shu tashkilotda o‘qishi yoki ishlashini tasdiqlash muhim. Telefon raqami buni ko‘rsatmaydi, tashkilotning e-pochta manzili esa ko‘rsatadi.',
  ),

  h3('Real vaqtda aloqa texnologiyalari.'),
  ...ps(
    'Messenjerning asosiy vazifasi — yangi xabarni qabul qiluvchiga imkon qadar tez yetkazish. Muammo shundaki, saytlar ishlaydigan HTTP protokoli “so‘rov–javob” tartibida ishlaydi: brauzer so‘ramaguncha server unga hech narsa yubora olmaydi. Xabarni o‘z vaqtida yetkazish uchun bir necha usul o‘ylab topilgan.',
    'Eng oddiy usul — short polling. Bunda brauzer har bir necha soniyada serverdan “yangi xabar bormi?” deb so‘raydi. So‘rovlarning ko‘pi bo‘sh qaytadi, xabar esa keyingi so‘rovgacha kechikadi. Long polling usulida server yangi xabar paydo bo‘lguncha javob bermay kutib turadi. Kechikish kamayadi, lekin har bir xabar uchun yangi so‘rov kerak bo‘ladi. Server-Sent Events (SSE) usulida bitta ulanish orqali server xabarlarni uzluksiz yuborib turadi, ammo faqat bir tomonga — serverdan brauzerga.',
    'WebSocket (RFC 6455) usulida ulanish oddiy so‘rov bilan boshlanadi, so‘ng doimiy ikki tomonlama kanalga aylanadi [25, 28]. Shundan keyin brauzer ham, server ham istalgan paytda bir-biriga kichik xabarlar yubora oladi. Uni telefon qo‘ng‘irog‘iga o‘xshatish mumkin: aloqa bir marta o‘rnatiladi va ikki tomon ham xohlagan paytda gapiradi. Kechikish va ortiqcha trafik eng kam bo‘lgani uchun WebSocket zamonaviy veb-messenjerlarning asosiy aloqa usuli hisoblanadi.',
    'SignalR — Microsoft kompaniyasining kutubxonasi bo‘lib, yuqoridagi usullardan eng mosini o‘zi tanlaydi. U avval WebSocket orqali ulanishga harakat qiladi. Agar tarmoq bunga yo‘l qo‘ymasa, avtomatik ravishda SSE yoki long polling’ga o‘tadi. Dasturchi esa bu tafsilotlar haqida o‘ylamaydi: server brauzerdagi funksiyani, brauzer esa serverdagi funksiyani to‘g‘ridan-to‘g‘ri chaqiradi. Ma’lum bir foydalanuvchiga yoki guruhga xabar yuborish, foydalanuvchini tekshirish va uzilgan aloqani qayta tiklash tayyor holda beriladi [23, 40]. Usullar 1.2-jadvalda solishtirilgan.',
  ),
  ...table(
    '1.2',
    'Real vaqtda aloqa texnologiyalarining taqqoslanishi',
    ['Texnologiya', 'Yo‘nalish', 'Kechikish', 'Server yuklamasi', 'Brauzerlarda ishlashi'],
    [
      ['Short polling', 'Brauzer → server', 'Yuqori', 'Yuqori', 'Barcha brauzerlar'],
      ['Long polling', 'Brauzer → server', 'O‘rtacha', 'O‘rtacha', 'Barcha brauzerlar'],
      ['Server-Sent Events', 'Server → brauzer', 'Past', 'Past', 'Zamonaviy brauzerlar'],
      ['WebSocket', 'Ikki tomonlama', 'Juda past', 'Past', 'Zamonaviy brauzerlar'],
      ['SignalR', 'Ikki tomonlama (eng mos usulni o‘zi tanlaydi)', 'Juda past', 'Past', 'Barcha brauzerlar'],
    ],
    [3, 3, 2.5, 2.5, 3.5],
  ),
  p(
    'Shu tahlil asosida “Milliy” xabarchida real vaqtda aloqa uchun SignalR tanlandi. U WebSocket tezligini saqlaydi, cheklangan tarmoqlarda ham ishlaydi, .NET muhitidagi server bilan oson birlashadi, brauzer uchun esa rasmiy kutubxonasi bor.',
  ),

  // ───────────────────────────────── 1.3
  h2('1.3. Masalaning qo‘yilishi'),
  p(
    'Tahlil natijasida quyidagi vazifa qo‘yildi: Telegram namunasida brauzerda ishlaydigan, ma’lumotlarni o‘z serverida saqlaydigan va xabarlarni real vaqtda yetkazadigan “Milliy” xabarchini yaratish. Tizimdan uch toifadagi foydalanuvchi foydalanadi: hali tizimga kirmagan **mehmon**, ro‘yxatdan o‘tgan **foydalanuvchi** va guruhni boshqaradigan **guruh administratori**.',
  ),
  h3('Funksional talablar. Tizim quyidagi imkoniyatlarni berishi kerak:'),
  ...numbered([
    'e-pochtaga keladigan 6 xonali bir martalik kod yoki Google hisobi orqali ro‘yxatdan o‘tish va kirish;',
    'profilni (ism, foydalanuvchi nomi, o‘zi haqida ma’lumot, rasm) tahrirlash;',
    'qaysi qurilmalardan kirilganini ko‘rish va keraksiz qurilmani chiqarib yuborish;',
    'foydalanuvchilarni ismi yoki foydalanuvchi nomi bo‘yicha qidirish;',
    'shaxsiy chat ochish, chatlar ro‘yxatida oxirgi xabar va o‘qilmagan xabarlar sonini ko‘rish;',
    'guruh yaratish, a’zolar va administratorlarni boshqarish, guruh ma’lumotlarini o‘zgartirish;',
    'xabar yuborish, xabarga javob berish, uni tahrirlash, o‘chirish va chat tarixini tozalash;',
    'xabarga emoji bilan munosabat bildirish va bu munosabatlarni darhol ko‘rsatish;',
    'keraksiz foydalanuvchini bloklash: bloklangan foydalanuvchi xabar yoza olmaydi;',
    'rasm, video va fayllar yuborish, chatdagi barcha media fayllarni ko‘rish;',
    'chat ichida xabarlarni so‘z bo‘yicha qidirish;',
    'yangi xabarlar, “yozmoqda” holati, xabar o‘qilgani va suhbatdosh onlayn ekanini darhol ko‘rsatish;',
    '24 soatlik lavhalar joylash va obuna bo‘lingan odamlarning lavhalarini ko‘rish;',
    'forum: qisqa post yozish, javob berish, ulashish, iqtibos keltirish, yoqtirish, obuna bo‘lish, eng mashhur postlar lentasi va forum bildirishnomalari;',
    'ilova boshqa oynada turganda yangi xabar haqida kompyuter ekranida bildirishnoma ko‘rsatish;',
    'yorug‘ va qorong‘i ko‘rinish, telefon ekraniga moslashadigan interfeys;',
    'xabarlarni tanlangan yozuvda (asl holida, lotin yoki kirill) ko‘rsatish va yozuvdan qat’i nazar qidirish;',
    'ish e-pochtasi orqali tashkilotga a’zolikni tasdiqlash, tashkilotning yopiq guruhlari va taklif havolalari;',
    'maxfiy chat: suhbatdosh kalitini tekshirish, xabarni belgilangan vaqtdan keyin o‘chirish, shifrlangan fayllar.',
  ]),
  h3('Nofunksional talablar.'),
  p(
    'Tizim tez ishlashi kerak: xabarlar ro‘yxati qismlab yuklanadi, ma’lumotlar bazasidagi so‘rovlar tezlashtiriladi, yangi xabar qabul qiluvchiga 1 soniyadan kam vaqtda yetib boradi. Xavfsizlik uchun barcha aloqa shifrlangan HTTPS orqali o‘tadi, kirish kodlari va tokenlar bazada ochiq holda saqlanmaydi, bir manzildan keladigan so‘rovlar soni cheklanadi. Tizim ishonchli bo‘lishi kerak: xatolar bir joyda ushlanadi, uzilgan aloqa avtomatik tiklanadi, kod esa keyin kengaytirish oson bo‘ladigan qatlamlarga ajratiladi [10, 11]. Tizimni istalgan serverga oson ko‘chirish uchun konteynerlash texnologiyalaridan biri — Docker’dan foydalaniladi.',
  ),
  p(
    'Bundan tashqari, tizim quyidagi talablarga javob beradi. Moslik va qulaylik: ilova zamonaviy brauzerlarda va kengligi 375 pikseldan boshlab barcha ekranlarda ishlaydi, matn va fon o‘rtasida yetarli kontrast bo‘ladi, yorug‘ va qorong‘i ko‘rinish tanlanadi. Sekin internet: ilova 3G va uzilib turadigan aloqada ham ishlaydi, internetsiz yozilgan xabarlar yo‘qolmaydi, rasm va videolar yengil ko‘rinishda uzatiladi. Qonunga moslik: shaxsga doir ma’lumotlar O‘zbekiston hududidagi serverda saqlanadi, foydalanuvchidan faqat zarur ma’lumot so‘raladi [1]. Kuzatuv: har bir xato vaqti va so‘rov raqami bilan jurnalga yoziladi, sahifa ochilish tezligi o‘lchab boriladi. Himoya OWASP Top 10 ro‘yxatidagi asosiy xavflarni hisobga oladi [39].',
  ),

  h3('Keyingi bosqich talablari.'),
  p(
    'Yuqoridagi talablar diplom loyihasi doirasida to‘liq bajarildi. Bundan tashqari, xabarchini rivojlantirishning keyingi bosqichi uchun qo‘shimcha talablar belgilandi. Ular hozirgi tizimga qo‘shiladigan alohida modullar sifatida rejalashtirilgan.',
  ),
  p('Sun’iy intellekt yordamchisi:', { keepNext: true }),
  ...bullets([
    'uzun yozishma yoki guruh muhokamasining qisqacha mazmunini chiqarish;',
    'xabarga 2–3 ta javob variantini taklif qilish;',
    'ovozli xabarni o‘zbek tilida matnga aylantirish;',
    'xabarni o‘zbek, rus va ingliz tillari o‘rtasida tarjima qilish;',
    'o‘zbekcha matndagi imlo xatolarini tuzatish;',
    'spam, haqorat va firibgarlik xabarlarini avtomatik aniqlash;',
    'forumda postlarni foydalanuvchining qiziqishiga qarab tavsiya qilish.',
  ]),
  p('Muloqot imkoniyatlari:', { keepNext: true }),
  ...bullets([
    'ovozli xabarlar, ovozli va video qo‘ng‘iroqlar;',
    'kanallar va botlar (ular uchun bazada jadvallar tayyor);',
    'so‘rovnomalar (bazada jadvali bor);',
    'xabarni boshqa chatga uzatish va chat tepasiga mahkamlash;',
    'belgilangan vaqtda yuboriladigan xabarlar;',
    '@ belgisi bilan suhbatdoshni eslatish;',
    'chatlarni papkalarga ajratish va “Saqlangan xabarlar”.',
  ]),
  p('Bozor, auksion va tenderlar:', { keepNext: true }),
  ...bullets([
    'foydalanuvchi xabarchi ichida o‘z do‘konini ochib, mahsulot va xizmatlarini joylashtiradi;',
    'xaridor sotuvchi bilan to‘g‘ridan-to‘g‘ri chat orqali gaplashadi va buyurtma beradi;',
    'to‘lovlar mahalliy to‘lov tizimlari orqali amalga oshiriladi;',
    'kompaniyalar uchun alohida bo‘lim: ular o‘rtasida auksion va tenderlar o‘tkaziladi.',
  ]),
  p('Blokcheyn texnologiyalari:', { keepNext: true }),
  ...bullets([
    'tender takliflari va natijalarini blokcheynga yozib, ularni o‘zgartirib bo‘lmaydigan qilish;',
    'aqlli shartnomalar: pul shartnoma shartlari bajarilguncha kafolat hisobida turadi va shu shartlar bajarilgach avtomatik o‘tkaziladi;',
    'shartnoma va hujjatlarning izini blokcheynga yozib, ularning haqiqiyligini tasdiqlash;',
    'qonunchilik ruxsat bergan doirada raqamli to‘lov vositalari bilan bog‘lanish.',
  ]),

  h2('1-bob bo‘yicha xulosa', { toc: false }),
  p(
    'Birinchi bobda beshta messenjer solishtirildi. Xorijiy messenjerlar ma’lumotlarni chet elda saqlaydi, mahalliy Humo esa pullik va faqat davlat xodimlari uchun. Demak, hamma uchun ochiq va ma’lumotlarni mamlakat ichida saqlaydigan messenjer kerak. “Milliy” xabarchining ustunliklari va keyingi bosqich rejalari bayon qilindi: sun’iy intellekt, bozor va tenderlar, blokcheyn. Real vaqtda aloqa uchun SignalR tanlandi, 19 ta funksional va asosiy nofunksional talablar aniqlandi.',
  ),
];
