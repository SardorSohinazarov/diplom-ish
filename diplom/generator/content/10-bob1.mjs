import { bullets, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter1 = () => [
  h1('I-bob. Zamonaviy messenjerlar va milliy messenjer yaratish zaruriyati'),

  // ───────────────────────────────── 1.1
  h2('1.1. Messenjerlarning rivojlanishi va hozirgi holati'),
  ...ps(
    'Messenjer (ingl. instant messenger) — foydalanuvchilar o‘rtasida matnli, ovozli, video va boshqa xabarlarni Internet orqali deyarli bir zumda yetkazadigan dasturiy ta’minot. Elektron pochtadan farqli ravishda messenjerda muloqot dialog ko‘rinishida kechadi: xabar darhol yetkaziladi, jo‘natuvchi esa suhbatdosh onlayn ekanini, xabarni o‘qiganini yoki javob yozayotganini ko‘radi.',
    'Birinchi ommaviy chat tizimi 1988-yilda yaratilgan IRC protokoli edi. 1996-yilda chiqqan ICQ kontaktlar ro‘yxati va onlayn holat tushunchalarini ommalashtirdi, 1999-yilda boshlangan Jabber loyihasi esa IETF standarti XMPP’ga asos bo‘ldi. Smartfonlar paydo bo‘lgach, 2009-yilda WhatsApp foydalanuvchini telefon raqami orqali identifikatsiya qilishni joriy etdi va messenjerni SMS’ning bepul muqobiliga aylantirdi. 2013-yilda ishga tushirilgan Telegram yozishmalarni serverda saqlaydigan “bulutli” yondashuvni, 2014-yilda chiqqan Signal esa keyinchalik WhatsApp’da ham qo‘llangan uchdan-uchgacha shifrlash protokolini taklif etdi.',
    'Hozirgi messenjerlar quyidagi yo‘nalishlarda rivojlanmoqda:',
  ),
  ...bullets([
    '**xavfsizlik** — uchdan-uchgacha shifrlash, faol sessiyalarni boshqarish, o‘z-o‘zidan o‘chadigan xabarlar;',
    '**ko‘p qurilmalilik** — bitta hisobdan telefon, kompyuter va brauzerda bir vaqtda foydalanish;',
    '**ommaviy kommunikatsiya** — katta guruhlar, kanallar va 24 soatlik hikoyalar (stories);',
    '**platformaga aylanish** — botlar, mini-ilovalar va to‘lov tizimlari (WeChat kabi “super-ilova”lar).',
  ]),
  p(
    'WhatsApp foydalanuvchilari soni 2 milliarddan, Telegramning oylik faol foydalanuvchilari 1 milliarddan oshgan. Shu bilan birga, ayrim davlatlarda mahalliy messenjerlar ustunlik qiladi: Janubiy Koreyada KakaoTalk, Yaponiyada LINE, Vyetnamda Zalo, Xitoyda WeChat. Bu misollar mahalliy ehtiyojlarni yaxshi hisobga olgan milliy messenjer xalqaro raqobatchilar bilan muvaffaqiyatli raqobatlasha olishini ko‘rsatadi.',
  ),

  // ───────────────────────────────── 1.2
  h2('1.2. Mavjud messenjerlar tahlili'),
  p(
    'Tizimga qo‘yiladigan talablarni aniqlash uchun O‘zbekistonda keng qo‘llaniladigan Telegram va WhatsApp, maxfiylik bo‘yicha etalon hisoblangan Signal hamda WeChat tahlil qilindi.',
  ),
  h3('Telegram.'),
  p(
    'Telegram o‘zining MTProto 2.0 protokolidan foydalanadi. Oddiy chatlarda xabarlar mijoz va server o‘rtasida shifrlanib, serverda saqlanadi, shu tufayli yozishmalar har qanday qurilmadan ochiladi. Uchdan-uchgacha shifrlash faqat alohida “maxfiy chat”larda qo‘llanadi. 200 000 a’zoli guruhlar, kanallar, botlar va 2 GB gacha fayllar qo‘llab-quvvatlanadi. Kuchli tomonlari — tezlik, bulutli sinxronizatsiya va boy funksionallik; kamchiliklari — server kodining yopiqligi va serverlarning xorijda joylashgani.',
  ),
  h3('WhatsApp.'),
  p(
    'WhatsApp Meta kompaniyasiga tegishli. 2016-yildan barcha yozishmalar Signal Protocol asosida uchdan-uchgacha shifrlanadi va serverda faqat yetkazilgunga qadar turadi. Guruhlar 1024 a’zogacha bo‘ladi. Kamchiliklari — kodi yopiq, metama’lumotlar (kim, kim bilan, qachon yozishgani) esa kompaniya ixtiyorida qoladi.',
  ),
  h3('Signal va WeChat.'),
  p(
    'Signal’ning klient va server kodlari to‘liq ochiq, barcha yozishmalar sukut bo‘yicha shifrlanadi, metama’lumotlar minimal saqlanadi. Biroq u funksional jihatdan kambag‘alroq: kanallar, botlar va katta guruhlar yo‘q. Tencent’ga tegishli WeChat esa messenjer, to‘lov tizimi va mini-ilovalarni birlashtirgan “super-ilova” bo‘lib, uchdan-uchgacha shifrlashni qo‘llamaydi. Messenjerlarning taqqoslanishi 1.1-jadvalda keltirilgan.',
  ),
  ...table(
    '1.1',
    'Messenjerlarning qiyosiy tahlili',
    ['Mezon', 'Telegram', 'WhatsApp', 'Signal', 'WeChat', 'Milliy chat'],
    [
      ['Egasi (davlat)', 'Telegram (BAA)', 'Meta (AQSh)', 'Signal Foundation (AQSh)', 'Tencent (Xitoy)', 'Mahalliy ishlab chiquvchi'],
      ['Ro‘yxatdan o‘tish', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', 'E-pochta kodi, Google'],
      ['E2E shifrlash', 'Faqat maxfiy chatlarda', 'Sukut bo‘yicha', 'Sukut bo‘yicha', 'Yo‘q', 'Maxfiy chatlarda (X25519, AES-GCM)'],
      ['Yozishmalar saqlanishi', 'Bulutda (serverda)', 'Qurilmada', 'Qurilmada', 'Serverda', 'O‘z serverida (bulutli)'],
      ['Guruh hajmi', '200 000', '1024', '1000', '500', '200'],
      ['Kanallar, botlar', 'Bor', 'Kanallar bor', 'Yo‘q', 'Bor', 'Kelajakda (sxemasi tayyor)'],
      ['Hikoyalar', 'Bor', 'Bor (Status)', 'Bor', 'Bor', 'Bor'],
      ['Server kodi', 'Yopiq', 'Yopiq', 'Ochiq', 'Yopiq', 'Mahalliy nazoratda'],
      ['Ma’lumotlar joylashuvi', 'Xorijda', 'Xorijda', 'Xorijda', 'Xitoyda', 'Istalgan serverda, jumladan O‘zbekistonda'],
      ['Lotin/kirill yozuvida ko‘rsatish', 'Yo‘q', 'Yo‘q', 'Yo‘q', 'Yo‘q', 'Bor (qidiruv ham)'],
      ['Tashkilot tomonidan tasdiqlash', 'Yo‘q', 'Yo‘q', 'Yo‘q', 'Yo‘q', 'E-pochta domeni orqali'],
    ],
    [3, 3, 3, 3, 3, 3.4],
  ),
  p(
    'Mavjud messenjerlar funksionallik va qulaylik bo‘yicha yuqori darajada, ammo barchasi xorijiy kompaniyalar tomonidan boshqariladi va ma’lumotlarni mamlakatdan tashqarida saqlaydi. Funksionallik va qulaylik muvozanati eng yaxshi bo‘lgani uchun foydalanuvchi tajribasi bo‘yicha namuna sifatida Telegram tanlandi. Ro‘yxatdan o‘tish esa pullik SMS-shlyuz o‘rniga elektron pochta va Google hisobi orqali amalga oshiriladi.',
  ),

  // ───────────────────────────────── 1.3
  h2('1.3. Axborot xavfsizligi va ma’lumotlar lokalizatsiyasi'),
  p(
    'Messenjer foydalanuvchi haqidagi eng shaxsiy ma’lumotlarni — yozishmalar, fayllar, kontaktlar, kim bilan qachon muloqot qilingani, IP-manzillar va qurilmalarni saqlaydi. Xorijiy messenjerlardan foydalanishda quyidagi xavflar mavjud:',
  ),
  ...bullets([
    '**yurisdiksiya xavfi** — ma’lumotlar boshqa davlat qonunlariga bo‘ysunadi va ularni o‘sha davlat organlari talab qilishi mumkin;',
    '**metama’lumotlar xavfi** — xabar mazmuni shifrlangan bo‘lsa ham, muloqot grafigi xizmat egasida qoladi;',
    '**xizmatning uzilishi** — shartlar o‘zgarishi, hisob bloklanishi yoki mintaqaviy cheklov foydalanuvchini aloqadan mahrum qiladi;',
    '**nazorat qilib bo‘lmaslik** — yopiq server kodi ma’lumotlar qanday qayta ishlanishini tekshirishga imkon bermaydi.',
  ]),
  ...ps(
    '“Shaxsga doir ma’lumotlar to‘g‘risida”gi O‘RQ-547-son Qonun (2019) shaxsga doir ma’lumotlarni yig‘ish, saqlash va himoya qilish tartibini belgilaydi. 2021-yilgi qo‘shimchalarga ko‘ra fuqarolarning shaxsga doir ma’lumotlarini Internet orqali qayta ishlovchi operatorlar ularni respublika hududidagi ma’lumotlar bazalarida saqlashi shart. Milliy messenjer bu talabga tabiiy ravishda javob beradi: uning serverlari mamlakat ichidagi data-markazda joylashadi, kodi mahalliy mutaxassislar nazoratida bo‘ladi.',
    'Milliy messenjer mahalliy ehtiyojlarni ham hisobga oladi. O‘zbekistonda lotin yozuvi rasmiy bo‘lsa-da, kirill yozuvi hanuz keng qo‘llanadi: katta avlod kirillda, yoshlar lotinda yozadi. Xorijiy messenjerlarda bu yozuvlar o‘rtasida bog‘lanish yo‘q — lotincha qidiruv kirillcha xabarni topmaydi. Shuningdek, ta’lim muassasalari va tashkilotlar uchun a’zoning haqiqatan shu tashkilotga tegishli ekanini tasdiqlash muhim. Telefon raqamiga asoslangan messenjerlar buni ta’minlay olmaydi, tashkilotning e-pochta domeni esa bunday tasdiq uchun tabiiy vositadir.',
  ),

  // ───────────────────────────────── 1.4
  h2('1.4. Real vaqtda aloqa texnologiyalari'),
  ...ps(
    'Messenjerning asosiy texnik vazifasi — yangi xabarni qabul qiluvchiga imkon qadar tez yetkazish. HTTP protokoli “so‘rov–javob” modeliga asoslangan va server o‘z tashabbusi bilan mijozga ma’lumot yubora olmaydi. Shu sababli serverdan mijozga ma’lumot “itarish” (push) uchun bir necha usul ishlab chiqilgan.',
    '**Short polling** usulida mijoz har bir necha soniyada “yangi xabar bormi?” deb so‘raydi: so‘rovlarning aksariyati bo‘sh qaytadi, xabar esa interval qadar kechikadi. **Long polling**’da server yangi ma’lumot paydo bo‘lguncha javobni ushlab turadi; kechikish kamayadi, lekin har bir xabar uchun yangi HTTP so‘rovi kerak. **Server-Sent Events** (SSE) bitta HTTP ulanish orqali hodisalarni uzluksiz yuboradi, ammo faqat serverdan mijozga yo‘nalishda ishlaydi.',
    '**WebSocket** (RFC 6455) ulanishi oddiy HTTP so‘rovi bilan boshlanib, “101 Switching Protocols” javobidan so‘ng ikki tomonlama (full-duplex) kanalga aylanadi. Shundan keyin mijoz ham, server ham istalgan vaqtda kichik freymlar yuboradi. Minimal kechikish va qo‘shimcha trafik tufayli WebSocket zamonaviy veb-messenjerlarning asosiy transporti hisoblanadi.',
    '**ASP.NET Core SignalR** — Microsoft kutubxonasi bo‘lib, transport darajasini abstraksiya qiladi: avval WebSocket orqali ulanadi, u ishlamasa avtomatik ravishda SSE yoki long polling’ga o‘tadi. Dasturchi “hab” (Hub) abstraksiyasi bilan ishlaydi: mijoz server metodlarini, server esa mijoz funksiyalarini masofadan chaqiradi. Ulanishlarni guruhlash, ma’lum foydalanuvchiga xabar yuborish, JWT autentifikatsiyasi va qayta ulanish tayyor holda beriladi. Texnologiyalar 1.2-jadvalda taqqoslangan.',
  ),
  ...table(
    '1.2',
    'Real vaqtda aloqa texnologiyalarining taqqoslanishi',
    ['Texnologiya', 'Yo‘nalish', 'Kechikish', 'Server yuklamasi', 'Brauzerda qo‘llab-quvvatlash'],
    [
      ['Short polling', 'Mijoz → server', 'Yuqori (interval)', 'Yuqori', 'Barcha brauzerlar'],
      ['Long polling', 'Mijoz → server', 'O‘rtacha', 'O‘rtacha', 'Barcha brauzerlar'],
      ['Server-Sent Events', 'Server → mijoz', 'Past', 'Past', 'Zamonaviy brauzerlar'],
      ['WebSocket', 'Ikki tomonlama', 'Juda past', 'Past', 'Zamonaviy brauzerlar'],
      ['SignalR', 'Ikki tomonlama (WebSocket, SSE yoki long polling)', 'Juda past', 'Past', 'Barcha brauzerlar (fallback hisobiga)'],
    ],
    [3, 3, 2.5, 2.5, 3.5],
  ),
  p(
    'Tahlil asosida “Milliy chat”da real vaqt aloqasi uchun SignalR tanlandi: u WebSocket samaradorligini saqlagan holda cheklangan tarmoqlarda ham ishlaydi, .NET server bilan tabiiy integratsiyalashadi, brauzer uchun esa rasmiy @microsoft/signalr kutubxonasi mavjud.',
  ),

  // ───────────────────────────────── 1.5
  h2('1.5. Masalaning qo‘yilishi'),
  p(
    'Tahlil natijalariga ko‘ra, Telegram namunasi asosida veb-brauzerda ishlaydigan, ma’lumotlarni o‘z serverida saqlaydigan va real vaqtda xabar almashish imkonini beruvchi “Milliy chat” dasturini ishlab chiqish talab etiladi. Tizimda uch turdagi aktor bor: tizimga hali kirmagan **mehmon**, ro‘yxatdan o‘tgan **foydalanuvchi** va **guruh administratori (egasi)**.',
  ),
  h3('Funksional talablar. Tizim quyidagi imkoniyatlarni ta’minlashi kerak:'),
  ...numbered([
    'elektron pochtaga yuboriladigan 6 xonali bir martalik kod yoki Google hisobi orqali ro‘yxatdan o‘tish va kirish;',
    'profilni (ism, username, bio, rasm) tahrirlash;',
    'faol sessiyalar (qurilmalar) ro‘yxatini ko‘rish va ularni yakunlash;',
    'foydalanuvchilarni ism yoki username bo‘yicha qidirish;',
    'shaxsiy chat yaratish, chatlar ro‘yxatini oxirgi xabar va o‘qilmaganlar soni bilan ko‘rish;',
    'guruh yaratish, a’zolar va administratorlarni boshqarish, guruh ma’lumotlarini o‘zgartirish;',
    'xabar yuborish, javob berish (reply), tahrirlash, o‘chirish va chat tarixini tozalash;',
    'rasm, video va fayllar yuborish, chatdagi media fayllarni ko‘rish;',
    'chat ichida xabarlarni matn bo‘yicha qidirish;',
    'yangi xabarlar, “yozmoqda” holati, o‘qilganlik belgilari va onlayn holatni real vaqtda ko‘rsatish;',
    '24 soatlik hikoyalar (stories) joylash va ko‘rish;',
    'yorug‘ va qorong‘i mavzular, mobil qurilmalarga moslashuvchan interfeys;',
    'xabarlarni tanlangan yozuvda (asl holida, lotin yoki kirill) ko‘rsatish va yozuvdan qat’i nazar qidirish;',
    'e-pochta domeni orqali tashkilot a’zoligini tasdiqlash, yopiq tashkilot guruhlari va taklif havolalari;',
    'uchdan-uchgacha shifrlangan maxfiy chat: kalitni tekshirish, o‘z-o‘zini o‘chirish taymeri, shifrlangan fayllar.',
  ]),
  h3('Nofunksional talablar:'),
  ...bullets([
    '**unumdorlik** — ro‘yxatlarni kursorli sahifalash, real vaqt xabarlarini 1 soniyadan kam kechikish bilan yetkazish;',
    '**xavfsizlik** — HTTPS, qisqa muddatli access token, xavfsiz cookie’dagi refresh token, kod va tokenlarni xesh ko‘rinishida saqlash, fayllarni antivirus orqali tekshirish;',
    '**ishonchlilik** — xatolarni markazlashgan qayta ishlash, ulanish uzilganda avtomatik qayta ulanish;',
    '**kengaytiriluvchanlik** — holatsiz API, yangi funksiyani boshqa qismlarga ta’sir qilmasdan qo‘shish;',
    '**qo‘llab-quvvatlanuvchanlik** — Clean Architecture qatlamlari, yagona kod uslubi, versiyalar nazorati;',
    '**ko‘chiriluvchanlik** — Docker konteynerida istalgan serverga joylashtirish;',
    '**qulaylik** — o‘zbek tilidagi, Telegram foydalanuvchilariga tanish interfeys.',
  ]),

  h2('1-bob bo‘yicha xulosa'),
  p(
    'Birinchi bobda messenjerlarning rivojlanishi ko‘rib chiqildi va mavjud messenjerlar funksionallik, xavfsizlik hamda ma’lumotlarni saqlash joyi bo‘yicha taqqoslandi. Ularning barchasi ma’lumotlarni mamlakatdan tashqarida saqlashi aniqlandi, bu esa lokalizatsiya talablari nuqtai nazaridan milliy messenjer yaratish zaruriyatini asoslaydi. Real vaqt aloqasi uchun WebSocket va zaxira transportlarni avtomatik tanlaydigan SignalR tanlandi. Bob yakunida 15 ta funksional va 7 guruh nofunksional talab aniqlanib, masala qo‘yildi.',
  ),
];
