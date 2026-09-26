import { bullets, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter1 = () => [
  h1('I-bob. Zamonaviy messenjerlar va milliy messenjer yaratish zaruriyati'),

  // ───────────────────────────────── 1.1
  h2('1.1. Messenjerlarning rivojlanishi va hozirgi holati'),
  ...ps(
    'Messenjer (ingl. instant messenger — tezkor xabar almashish dasturi) — foydalanuvchilar o‘rtasida matnli, ovozli, video va boshqa turdagi xabarlarni Internet orqali deyarli bir zumda yetkazib beradigan dasturiy ta’minot. Elektron pochtadan farqli ravishda messenjerda muloqot suhbat (dialog) ko‘rinishida kechadi. Xabar qabul qiluvchiga darhol yetkaziladi, jo‘natuvchi esa suhbatdoshning onlayn ekanligi, xabarni o‘qigani yoki javob yozayotgani haqida ma’lumot oladi.',
    'Tezkor xabar almashishning ildizlari 1970-yillardagi ko‘p foydalanuvchili operatsion tizimlarga borib taqaladi. O‘sha davrda bitta katta kompyuterga ulangan terminallar foydalanuvchilari bir-biriga qisqa xabar yubora olardi. 1988-yilda finlyandiyalik dasturchi Yarkko Oykarinen IRC (Internet Relay Chat) protokolini yaratdi. IRC Internetdagi birinchi ommaviy chat tizimi bo‘lib, unda foydalanuvchilar mavzuli kanallarga birlashib suhbatlashgan.',
    'Shaxsiy kompyuterlar va Internetning ommalashuvi bilan 1990-yillarning ikkinchi yarmida birinchi ommaviy messenjerlar paydo bo‘ldi. 1996-yilda isroillik Mirabilis kompaniyasi ICQ (“I seek you” — “seni izlayapman”) dasturini chiqardi. ICQ har bir foydalanuvchiga raqamli identifikator berdi, kontaktlar ro‘yxati va onlayn holat tushunchalarini ommalashtirdi. Keyingi yillarda AOL Instant Messenger (1997), Yahoo! Messenger (1998) va MSN Messenger (1999) kabi raqobatchilar paydo bo‘ldi. 1999-yilda ochiq Jabber loyihasi boshlandi. Uning asosida keyinchalik IETF tomonidan standartlashtirilgan XMPP (Extensible Messaging and Presence Protocol) protokoli ishlab chiqildi. 2003-yilda chiqarilgan Skype esa matnli chatni ovozli va video qo‘ng‘iroqlar bilan birlashtirdi.',
    'Messenjerlar rivojidagi keyingi burilish nuqtasi smartfonlar bilan bog‘liq. 2007–2008-yillarda iPhone va mobil ilovalar do‘konlarining paydo bo‘lishi doimiy Internetga ulangan qurilmani har bir foydalanuvchining cho‘ntagiga olib kirdi. 2009-yilda Yan Kum va Brayan Ekton tomonidan asos solingan WhatsApp foydalanuvchini login va parol o‘rniga telefon raqami orqali identifikatsiya qildi va kontaktlarni telefon kitobidan avtomatik oldi. Bu yondashuv messenjerni SMS xabarlarining bepul muqobiliga aylantirdi. 2014-yilda WhatsApp Facebook (hozirgi Meta) kompaniyasi tomonidan sotib olindi. Shu davrda Viber (2010), WeChat (2011), LINE (2011) va KakaoTalk (2010) kabi ilovalar ham paydo bo‘ldi.',
    '2013-yilda Pavel va Nikolay Durovlar Telegram messenjerini ishga tushirdi. Telegram “bulutli” yondashuvni tanladi: yozishmalar serverda saqlanadi va foydalanuvchining barcha qurilmalarida bir vaqtda mavjud bo‘ladi. Telegram minglab a’zoli guruhlar, cheksiz obunachili kanallar, botlar platformasi va katta hajmdagi fayllarni yuborish imkoniyati bilan tezda ommalashdi. 2014–2015-yillarda maxfiylikka urg‘u bergan Signal messenjeri chiqdi. Uning Signal Protocol deb nomlangan uchdan-uchgacha (end-to-end) shifrlash protokoli keyinchalik WhatsApp va boshqa ilovalarda ham qo‘llanila boshlandi.',
    'Hozirgi bosqichda messenjerlar quyidagi yo‘nalishlarda rivojlanmoqda:',
  ),
  ...bullets([
    '**xavfsizlik va maxfiylik** — uchdan-uchgacha shifrlash, ikki bosqichli autentifikatsiya, faol sessiyalarni boshqarish, o‘z-o‘zidan o‘chadigan xabarlar;',
    '**ko‘p qurilmalilik** — bitta hisobdan telefon, kompyuter va brauzerda bir vaqtda foydalanish;',
    '**ommaviy kommunikatsiya** — katta guruhlar, kanallar, hamjamiyatlar;',
    '**qisqa muddatli kontent** — 24 soatdan keyin o‘chadigan hikoyalar (stories);',
    '**platformaga aylanish** — botlar, mini-ilovalar, to‘lov tizimlari. Bunday “super-ilova”ning yorqin namunasi xitoyning WeChat ilovasidir;',
    '**media imkoniyatlar** — ovozli va video xabarlar, guruhli video qo‘ng‘iroqlar, katta fayllar almashish.',
  ]),
  ...ps(
    'Messenjerlar auditoriyasi juda katta. Meta kompaniyasi 2020-yilda WhatsApp foydalanuvchilari soni 2 milliarddan oshganini, Telegram asoschisi esa 2025-yilda Telegramning oylik faol foydalanuvchilari 1 milliardga yetganini e’lon qildi. Bu raqamlar messenjerlar bugungi kunda elektron pochta va ijtimoiy tarmoqlar bilan bir qatorda asosiy aloqa kanaliga aylanganini ko‘rsatadi.',
    'Mamlakatlar kesimida qaralganda, ayrim davlatlarda xalqaro ilovalar emas, mahalliy messenjerlar ustunlik qiladi. Janubiy Koreyada KakaoTalk, Yaponiyada LINE, Vyetnamda Zalo, Xitoyda esa WeChat eng ommabop messenjer hisoblanadi. Bu misollar milliy messenjer xalqaro raqobatchilar bilan muvaffaqiyatli raqobatlasha olishini ko‘rsatadi. Buning uchun u mahalliy foydalanuvchilar ehtiyojlarini yaxshi hisobga olishi va sifatli texnik yechimga ega bo‘lishi kerak.',
  ),

  // ───────────────────────────────── 1.2
  h2('1.2. Mavjud messenjerlar tahlili'),
  p(
    'Ishlab chiqiladigan tizimga qo‘yiladigan talablarni aniqlash uchun eng ko‘p tarqalgan messenjerlarning funksional imkoniyatlari, xavfsizlik modeli va arxitekturasi tahlil qilindi. Tahlil uchun O‘zbekistonda keng qo‘llaniladigan Telegram va WhatsApp, maxfiylik bo‘yicha etalon hisoblangan Signal, shuningdek Viber va WeChat tanlandi.',
  ),
  h3('Telegram.'),
  ...ps(
    'Telegram — BAAda ro‘yxatdan o‘tgan kompaniya tomonidan ishlab chiqilayotgan bulutli messenjer. U o‘zining MTProto 2.0 protokolidan foydalanadi. Oddiy (bulutli) chatlarda xabarlar mijoz va server o‘rtasida shifrlanadi va serverda saqlanadi. Shu tufayli foydalanuvchi har qanday qurilmadan o‘z yozishmalariga kira oladi. Uchdan-uchgacha shifrlash faqat alohida yaratiladigan “maxfiy chat”larda (secret chats) qo‘llanadi. Telegram 200 000 a’zogacha bo‘lgan guruhlarni, cheksiz obunachili kanallarni, Bot API orqali botlarni va 2 GB gacha bo‘lgan fayllarni yuborishni qo‘llab-quvvatlaydi. Klient ilovalarining manba kodi ochiq, server qismi esa yopiq.',
    'Telegramning kuchli tomonlari — tezligi, bulutli sinxronizatsiya, boy funksionallik va ochiq API. Kamchiliklari — standart chatlarning uchdan-uchgacha shifrlanmagani, serverlarning xorijda joylashgani va server kodining yopiqligi. Foydalanuvchi ma’lumotlari qaysi yurisdiksiyada saqlanishi va ularga kim kira olishini tashqaridan nazorat qilib bo‘lmaydi.',
  ),
  h3('WhatsApp.'),
  p(
    'WhatsApp Meta kompaniyasiga tegishli. Foydalanuvchi telefon raqami orqali ro‘yxatdan o‘tadi. 2016-yildan boshlab barcha shaxsiy va guruh yozishmalari Signal Protocol asosida uchdan-uchgacha shifrlanadi. Xabarlar serverda saqlanmaydi, faqat yetkazilgunga qadar vaqtincha turadi. WhatsApp guruhlari 1024 a’zogacha bo‘lishi mumkin. Bundan tashqari hamjamiyatlar, kanallar va “Status” (hikoyalar) funksiyalari mavjud. Kamchiliklari: kodi yopiq, xabar mazmuni shifrlangan bo‘lsa-da, metama’lumotlar (kim, kim bilan, qachon yozishgani) kompaniya ixtiyorida qoladi, biznes-modeli esa Meta ekotizimi bilan bog‘liq.',
  ),
  h3('Signal.'),
  p(
    'Signal notijorat Signal Foundation tashkiloti tomonidan ishlab chiqiladi. Uning klient va server kodlari to‘liq ochiq. Barcha yozishmalar sukut bo‘yicha uchdan-uchgacha shifrlanadi, serverda saqlanadigan metama’lumotlar esa minimal darajaga keltirilgan. “Sealed sender” texnologiyasi hatto serverdan ham xabar jo‘natuvchisini yashiradi. Signal maxfiylik bo‘yicha etalon hisoblanadi, lekin funksional jihatdan Telegramdan kambag‘alroq: kanallar, botlar va katta ommaviy guruhlar yo‘q.',
  ),
  h3('Viber va WeChat.'),
  p(
    'Viber yapon Rakuten kompaniyasiga tegishli bo‘lib, shaxsiy va guruh chatlarida uchdan-uchgacha shifrlashni qo‘llaydi. U ayniqsa ovozli qo‘ng‘iroqlar uchun Sharqiy Yevropa va MDH mamlakatlarida ommalashgan. Xitoyning Tencent kompaniyasiga tegishli WeChat esa messenjer, ijtimoiy tarmoq, to‘lov tizimi va mini-ilovalar platformasini birlashtirgan “super-ilova” hisoblanadi. U uchdan-uchgacha shifrlashni qo‘llamaydi va Xitoy qonunchiligiga to‘liq bo‘ysunadi.',
  ),
  p(
    'Ko‘rib chiqilgan messenjerlarning asosiy xususiyatlari va ishlab chiqilayotgan “Milliy chat” tizimi bilan taqqoslanishi 1.1-jadvalda keltirilgan.',
  ),
  ...table(
    '1.1',
    'Messenjerlarning qiyosiy tahlili',
    ['Mezon', 'Telegram', 'WhatsApp', 'Signal', 'WeChat', 'Milliy chat'],
    [
      ['Egasi (davlat)', 'Telegram (BAA)', 'Meta (AQSh)', 'Signal Foundation (AQSh)', 'Tencent (Xitoy)', 'Mahalliy ishlab chiquvchi'],
      ['Ro‘yxatdan o‘tish', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', 'Telefon raqami', 'E-pochta kodi, Google'],
      ['E2E shifrlash', 'Faqat maxfiy chatlarda', 'Sukut bo‘yicha', 'Sukut bo‘yicha', 'Yo‘q', 'Rejalashtirilgan (TLS mavjud)'],
      ['Yozishmalar saqlanishi', 'Bulutda (serverda)', 'Qurilmada', 'Qurilmada', 'Serverda', 'O‘z serverida (bulutli)'],
      ['Guruh hajmi', '200 000', '1024', '1000', '500', '200'],
      ['Kanallar, botlar', 'Bor', 'Kanallar bor', 'Yo‘q', 'Bor', 'Kelajakda (sxemasi tayyor)'],
      ['Hikoyalar', 'Bor', 'Bor (Status)', 'Bor', 'Bor', 'Bor'],
      ['Server kodi', 'Yopiq', 'Yopiq', 'Ochiq', 'Yopiq', 'Mahalliy nazoratda'],
      ['Ma’lumotlar joylashuvi', 'Xorijda', 'Xorijda', 'Xorijda', 'Xitoyda', 'Istalgan serverda, jumladan O‘zbekistonda'],
    ],
    [3, 3, 3, 3, 3, 3.4],
  ),
  ...ps(
    'Tahlil natijalari shuni ko‘rsatadiki, mavjud messenjerlar funksionallik va qulaylik bo‘yicha yuqori darajada. Ammo ularning barchasi xorijiy kompaniyalar tomonidan boshqariladi va ma’lumotlarni mamlakatdan tashqarida saqlaydi. Telegram funksionallik, bulutli sinxronizatsiya va foydalanish qulayligi bo‘yicha eng yaxshi muvozanatni taklif etadi. Shu sababli “Milliy chat” tizimi uchun foydalanuvchi tajribasi (UX) bo‘yicha asosiy namuna sifatida Telegram tanlandi.',
    'Shu bilan birga, Telegramning ayrim yechimlari bitiruv malakaviy ishi doirasida soddalashtirildi yoki o‘zgartirildi. Masalan, ro‘yxatdan o‘tish SMS o‘rniga elektron pochta orqali amalga oshiriladi, chunki SMS-shlyuzlar pullik va operatorlar bilan shartnoma talab qiladi. Google hisobi orqali kirish esa foydalanuvchiga qo‘shimcha qulaylik beradi.',
  ),

  // ───────────────────────────────── 1.3
  h2('1.3. Axborot xavfsizligi va ma’lumotlar lokalizatsiyasi'),
  ...ps(
    'Messenjer foydalanuvchi haqidagi eng shaxsiy ma’lumotlarni o‘z ichiga oladi. Bular yozishmalar mazmuni, yuborilgan fotosuratlar va hujjatlar, kontaktlar ro‘yxati, qaysi vaqtda kim bilan muloqot qilingani, IP-manzillar va qurilmalar haqidagi ma’lumotlar. Bu ma’lumotlarning to‘planishi ularni saqlovchi tashkilot uchun katta mas’uliyat va jiddiy xavf manbaidir.',
    'Xorijiy messenjerlardan foydalanishda quyidagi xavflar mavjud:',
  ),
  ...bullets([
    '**yurisdiksiya xavfi** — ma’lumotlar boshqa davlat qonunlariga bo‘ysunadi va ularni o‘sha davlat organlari talab qilishi mumkin;',
    '**metama’lumotlar xavfi** — xabar mazmuni shifrlangan bo‘lsa ham, muloqot grafigi (kim kim bilan qancha yozishgani) xizmat egasida qoladi va tahlil qilinishi mumkin;',
    '**xizmatning uzilishi xavfi** — xizmat ko‘rsatish shartlari o‘zgarishi, hisob bloklanishi yoki xizmatning mintaqada cheklanishi foydalanuvchini aloqa vositasidan bir zumda mahrum qiladi;',
    '**nazorat qilib bo‘lmaslik** — yopiq server kodi ma’lumotlar qanday qayta ishlanishini mustaqil tekshirishga imkon bermaydi;',
    '**axborot xurujlari** — firibgarlik, fishing va zararli fayllar tarqatish ko‘pincha ommaviy messenjerlar orqali amalga oshiriladi, ularga qarshi kurash esa xorijiy platforma siyosatiga bog‘liq.',
  ]),
  ...ps(
    'O‘zbekiston qonunchiligi bu masalalarni tartibga soladi. 2019-yil 2-iyulda qabul qilingan “Shaxsga doir ma’lumotlar to‘g‘risida”gi O‘RQ-547-son Qonun shaxsga doir ma’lumotlarni yig‘ish, saqlash, qayta ishlash va himoya qilish tartibini belgilaydi. Qonunga 2021-yilda kiritilgan qo‘shimchalarga muvofiq, O‘zbekiston fuqarolarining shaxsga doir ma’lumotlarini Internet orqali qayta ishlovchi mulkdorlar va operatorlar ularni respublika hududida joylashgan va davlat ro‘yxatidan o‘tgan ma’lumotlar bazalarida saqlashi shart. “Raqamli O‘zbekiston – 2030” strategiyasi esa milliy dasturiy mahsulotlar va xizmatlarni rivojlantirishni ustuvor yo‘nalish sifatida belgilaydi.',
    'Milliy messenjer bu talablarga tabiiy ravishda javob beradi. Uning serverlari mamlakat ichidagi data-markazda joylashtirilishi mumkin. Dastur kodi mahalliy mutaxassislar nazoratida bo‘ladi. Xavfsizlik siyosatini esa milliy qonunchilik va ehtiyojlarga moslashtirish mumkin. Masalan, “Milliy chat” tizimida yuklanayotgan fayllar ClamAV antivirusi orqali tekshiriladi. Foydalanuvchi o‘z hisobiga ulangan barcha qurilmalarni ko‘rishi va begona qurilmani masofadan chiqarib yuborishi mumkin. Bir martalik kodlar va refresh tokenlar ma’lumotlar bazasida ochiq holda emas, faqat xesh ko‘rinishida saqlanadi.',
    'Axborot xavfsizligining asosiy uch talabi — maxfiylik, yaxlitlik va foydalanish imkoniyati (CIA triadasi) — “Milliy chat” loyihasida quyidagicha ta’minlanadi. Maxfiylik barcha trafikni HTTPS/TLS orqali shifrlash, qisqa muddatli JWT tokenlar va chatga kirish huquqini har bir so‘rovda tekshirish orqali ta’minlanadi. Yaxlitlik ma’lumotlar bazasi darajasidagi cheklovlar, tranzaksiyalar va kiruvchi ma’lumotlarni validatsiya qilish orqali, foydalanish imkoniyati esa holatsiz (stateless) server, konteynerlash va avtomatik qayta ulanadigan real vaqt aloqasi orqali ta’minlanadi.',
  ),

  // ───────────────────────────────── 1.4
  h2('1.4. Real vaqtda aloqa texnologiyalari'),
  ...ps(
    'Messenjerning asosiy texnik vazifasi — yangi xabarni qabul qiluvchiga imkon qadar tez yetkazish. Klassik HTTP protokoli “so‘rov–javob” modeliga asoslangan: faqat mijoz so‘rov yuborishi va server unga javob qaytarishi mumkin. Server o‘z tashabbusi bilan mijozga ma’lumot yubora olmaydi. Shu sababli veb-ilovalarda serverdan mijozga ma’lumot “itarish” (push) uchun bir necha texnologiya ishlab chiqilgan.',
  ),
  h3('Qisqa so‘rovlar (short polling).'),
  p(
    'Eng oddiy usulda mijoz serverga har bir necha soniyada “yangi xabar bormi?” degan so‘rov yuboradi. Usulni amalga oshirish oson, lekin u samarasiz: so‘rovlarning aksariyati bo‘sh javob qaytaradi, server va tarmoq ortiqcha yuklanadi, xabarlar esa so‘rovlar orasidagi interval qadar kechikib yetkaziladi.',
  ),
  h3('Uzun so‘rovlar (long polling).'),
  p(
    'Bu usulda server so‘rovga darhol javob bermaydi. U yangi ma’lumot paydo bo‘lguncha yoki belgilangan vaqt tugaguncha ulanishni ochiq ushlab turadi. Javob kelgach, mijoz darhol yangi so‘rov yuboradi. Kechikish sezilarli kamayadi, lekin har bir xabar uchun yangi HTTP so‘rovi va sarlavhalar yuborish kerak bo‘ladi. Server esa ko‘p sonli ochiq so‘rovlarni ushlab turishga majbur bo‘ladi.',
  ),
  h3('Server-Sent Events (SSE).'),
  p(
    'SSE — HTML standartiga kiritilgan texnologiya. Unda mijoz bitta HTTP ulanishini ochadi, server esa shu ulanish orqali text/event-stream formatida hodisalarni uzluksiz yuboradi. Brauzerdagi EventSource obyekti ulanish uzilganda avtomatik qayta ulanadi. SSE oddiy va samarali, lekin u bir yo‘nalishli: mijozdan serverga ma’lumot yuborish uchun alohida HTTP so‘rovlari kerak.',
  ),
  h3('WebSocket.'),
  p(
    'WebSocket protokoli 2011-yilda IETF tomonidan RFC 6455 standarti sifatida qabul qilingan. Ulanish oddiy HTTP so‘rovi bilan boshlanadi (Upgrade: websocket sarlavhasi). Server 101 Switching Protocols javobini qaytargach, shu TCP ulanish ikki tomonlama (full-duplex) kanalga aylanadi. Shundan so‘ng mijoz ham, server ham istalgan vaqtda kichik hajmli freymlar ko‘rinishida xabar yuborishi mumkin. WebSocket minimal kechikish va minimal qo‘shimcha trafikni ta’minlaydi, shuning uchun u zamonaviy veb-messenjerlar uchun asosiy transport hisoblanadi.',
  ),
  h3('SignalR.'),
  ...ps(
    'ASP.NET Core SignalR — Microsoft tomonidan ishlab chiqilgan, real vaqtda ishlaydigan veb-ilovalar yaratish uchun mo‘ljallangan kutubxona. SignalR transport darajasini abstraksiya qiladi. U avval WebSocket orqali ulanishga harakat qiladi. Agar brauzer yoki tarmoq infratuzilmasi WebSocketni qo‘llab-quvvatlamasa, avtomatik ravishda Server-Sent Events yoki long polling usuliga o‘tadi. Dasturchi transport tafsilotlari bilan emas, “hab” (Hub) deb ataluvchi yuqori darajadagi abstraksiya bilan ishlaydi.',
    'Habda server metodlari e’lon qilinadi va ularni mijoz masofadan chaqira oladi (RPC). Server esa mijozlardagi funksiyalarni chaqiradi. SignalR ulanishlarni guruhlarga birlashtirish, ma’lum foydalanuvchiga yoki guruhga xabar yuborish, JWT orqali autentifikatsiya va avtomatik qayta ulanish kabi messenjer uchun zarur imkoniyatlarni tayyor holda beradi. Tizimni bir nechta serverga kengaytirish uchun esa Redis backplane yoki Azure SignalR Service qo‘llaniladi.',
    'Messenjerlarda boshqa protokollar ham qo‘llanadi. Masalan, XMPP ochiq standart sifatida ko‘plab korporativ chatlarda ishlatiladi. MQTT esa kam resursli qurilmalar va mobil tarmoqlar uchun mo‘ljallangan yengil publish/subscribe protokoli. Ko‘rib chiqilgan texnologiyalar 1.2-jadvalda taqqoslangan.',
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
    'Tahlil asosida “Milliy chat” tizimida real vaqtda aloqa uchun SignalR tanlandi. U WebSocketning samaradorligini saqlagan holda eski yoki cheklangan tarmoqlarda ham ishlashni kafolatlaydi. Server tomoni .NET platformasida yozilgani uchun SignalR tabiiy integratsiyani ta’minlaydi, brauzer uchun esa rasmiy @microsoft/signalr kutubxonasi mavjud.',
  ),

  // ───────────────────────────────── 1.5
  h2('1.5. Masalaning qo‘yilishi'),
  ...ps(
    'Yuqoridagi tahlil natijalariga ko‘ra, Telegram namunasi asosida veb-brauzerda ishlaydigan, foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan “Milliy chat” messenjerini ishlab chiqish talab etiladi. Tizimda uch turdagi foydalanuvchi (aktor) mavjud: tizimga hali kirmagan **mehmon**, ro‘yxatdan o‘tgan **foydalanuvchi** va guruhni boshqaruvchi **guruh administratori (egasi)**.',
  ),
  h3('Funksional talablar. Tizim quyidagi imkoniyatlarni ta’minlashi kerak:'),
  ...numbered([
    'elektron pochtaga yuboriladigan 6 xonali bir martalik kod yoki Google hisobi orqali ro‘yxatdan o‘tish va tizimga kirish;',
    'profilni (ism, familiya, username, bio) tahrirlash va profil rasmini yuklash;',
    'faol sessiyalar (qurilmalar) ro‘yxatini ko‘rish, alohida sessiyani yoki boshqa barcha sessiyalarni yakunlash;',
    'foydalanuvchilarni ism yoki username bo‘yicha qidirish va kontaktlar ro‘yxatini yuritish;',
    'shaxsiy (ikki kishilik) chat yaratish, chatlar ro‘yxatini oxirgi xabar va o‘qilmagan xabarlar soni bilan ko‘rish;',
    'guruh chatlarini yaratish, a’zolarni qo‘shish va chiqarish, administratorlar tayinlash, guruh nomi, tavsifi va rasmini o‘zgartirish, guruhdan chiqish;',
    'matnli xabar yuborish, xabarga javob berish (reply), o‘z xabarini tahrirlash va o‘chirish, chat tarixini tozalash;',
    'rasm, video va ixtiyoriy fayllarni yuborish, chatdagi media fayllarni turlari bo‘yicha ko‘rish;',
    'chat ichida xabarlarni matn bo‘yicha qidirish va topilgan xabar kontekstiga o‘tish;',
    'yangi xabarlarni, “yozmoqda” holatini, o‘qilganlik belgilarini va suhbatdoshning onlayn holatini sahifani yangilamasdan real vaqtda ko‘rsatish;',
    '24 soat davomida ko‘rinadigan hikoyalar (stories) joylash, ko‘rish va ularni kim ko‘rganini bilish;',
    'yorug‘ va qorong‘i mavzular hamda mobil qurilmalarga moslashuvchan interfeys.',
  ]),
  h3('Nofunksional talablar:'),
  ...bullets([
    '**unumdorlik** — xabarlar va chatlar ro‘yxati sahifalab (cursor pagination) yuklanishi, real vaqt xabarlari 1 soniyadan kam kechikish bilan yetkazilishi;',
    '**xavfsizlik** — HTTPS, qisqa muddatli access token va xavfsiz cookie’dagi refresh token, kodlar va tokenlarni xesh ko‘rinishida saqlash, har bir so‘rovda chatga kirish huquqini tekshirish, yuklanayotgan fayllarni antivirus orqali tekshirish;',
    '**ishonchlilik** — xatolarni markazlashgan holda qayta ishlash, real vaqt ulanishi uzilganda avtomatik qayta ulanish;',
    '**kengaytiriluvchanlik** — holatsiz API, onlayn holatni Redis orqali saqlash imkoniyati, yangi funksiyalarni boshqa qismlarga ta’sir qilmasdan qo‘shish mumkinligi;',
    '**qo‘llab-quvvatlanuvchanlik** — Clean Architecture qatlamlari, yagona kod uslubi, versiyalar nazorati;',
    '**ko‘chiriluvchanlik** — tizim Docker konteynerida ishga tushirilishi va istalgan serverga joylashtirilishi;',
    '**foydalanish qulayligi** — o‘zbek tilidagi interfeys, Telegram foydalanuvchilariga tanish bo‘lgan joylashuv va boshqaruv elementlari.',
  ]),
  p(
    'Masalani yechish uchun zamonaviy texnologiyalarni tanlash, tizim arxitekturasi va ma’lumotlar bazasini loyihalash, so‘ngra server va klient qismlarini ishlab chiqish, joylashtirish va sinash talab etiladi. Bu vazifalar keyingi boblarda ketma-ket yoritiladi.',
  ),

  h2('1-bob bo‘yicha xulosa'),
  ...ps(
    'Birinchi bobda messenjerlarning IRC va ICQ dan boshlab bugungi Telegram, WhatsApp va Signal kabi ilovalargacha bo‘lgan rivojlanish yo‘li ko‘rib chiqildi. Mavjud messenjerlar funksionallik, xavfsizlik modeli va ma’lumotlarni saqlash joyi bo‘yicha taqqoslandi. Ularning barchasi xorijiy kompaniyalar tomonidan boshqarilishi va foydalanuvchi ma’lumotlarini mamlakatdan tashqarida saqlashi aniqlandi. Bu holat “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunning lokalizatsiya talablari va “Raqamli O‘zbekiston – 2030” strategiyasi maqsadlari nuqtai nazaridan milliy messenjer yaratish zaruriyatini asoslaydi.',
    'Real vaqtda aloqa texnologiyalari tahlili asosida WebSocket va unga zaxira transportlarni avtomatik tanlaydigan SignalR kutubxonasi eng maqbul yechim sifatida tanlandi. Bob yakunida tizimning aktorlari, funksional va nofunksional talablari aniqlanib, masala qo‘yildi.',
  ),
];
