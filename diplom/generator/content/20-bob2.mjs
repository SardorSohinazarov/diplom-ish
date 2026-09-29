import { bullets, figure, h1, h2, h3, landscapeFigure, p, ps, table } from '../lib.mjs';

export const chapter2 = () => [
  h1('II-bob. “Milliy chat” tizimini loyihalash'),

  // ───────────────────────────────── 2.1
  h2('2.1. Texnologiyalarni tanlash va asoslash'),
  ...ps(
    'Texnologiyalarni tanlashda quyidagi mezonlar qo‘yildi: real vaqtda ikki tomonlama aloqa, yuqori unumdorlik, tayyor va ishonchli xavfsizlik vositalari, ekotizimning yetukligi, ochiq kodli litsenziya va konteynerlarda joylashtirish qulayligi.',
    'Server qismi uchun **.NET 8** (LTS) platformasi va **ASP.NET Core** freymvorki tanlandi [15, 17]. Ular kross-platformali, Linux konteynerlarida ishlaydi va mustaqil sinovlarda eng tezkor veb-freymvorklar qatorida turadi. Muqobil sifatida Node.js va Spring Boot ko‘rib chiqildi, ammo hal qiluvchi omil **SignalR** kutubxonasining platforma tarkibiga kirishi bo‘ldi: WebSocket va zaxira transportlar, hablar, guruhlar va JWT autentifikatsiyasi qo‘shimcha kutubxonalarsiz ishlaydi. Ma’lumotlar bazasi sifatida ACID tranzaksiyalar, sxemalar va murakkab indekslarni qo‘llab-quvvatlaydigan **PostgreSQL** tanlandi, u bilan **Entity Framework Core 8** ORM orqali ishlanadi [16, 18].',
    'Klient qismi **Angular 22** freymvorkida yozildi [43]: u marshrutlash, formalar, HTTP klient va DI’ni bitta ekotizimda beradi, TypeScript’ning qat’iy tiplanishi esa server qismidagi C# bilan uslubiy uyg‘unlikni ta’minlaydi. Server ilovasi **Docker** konteyneriga yig‘ilib, **Render** bulutli platformasida ishga tushirilgan. Tanlangan texnologiyalar 2.1-jadvalda keltirilgan.',
  ),
  ...table(
    '2.1',
    'Tizimda qo‘llanilgan texnologiyalar',
    ['Qatlam', 'Texnologiya', 'Versiya', 'Vazifasi'],
    [
      ['Server', '.NET, ASP.NET Core', '8.0 (LTS)', 'Web API, middleware, DI, konfiguratsiya'],
      ['Server', 'ASP.NET Core SignalR', '8.0', 'Real vaqtda ikki tomonlama aloqa (hab)'],
      ['Server', 'Entity Framework Core, Npgsql', '8.0.8', 'ORM, LINQ so‘rovlari, migratsiyalar'],
      ['Server', 'FluentValidation', '11.11', 'Kiruvchi ma’lumotlarni validatsiya qilish'],
      ['Server', 'System.IdentityModel.Tokens.Jwt', '8.3.1', 'JWT access tokenlarni yaratish va tekshirish'],
      ['Server', 'Google.Apis.Auth', '1.68', 'Google ID tokenini tekshirish'],
      ['Server', 'SixLabors.ImageSharp', '3.1.12', 'Rasmlarni tekshirish va thumbnail yaratish'],
      ['Server', 'StackExchange.Redis', '2.8.16', 'Onlayn holatni taqsimlangan saqlash'],
      ['Ma’lumotlar', 'PostgreSQL', '16+', 'Relatsion ma’lumotlar bazasi'],
      ['Klient', 'Angular, TypeScript, RxJS', '22, 6.0, 7.8', 'SPA freymvork, tiplashtirilgan til, reaktiv oqimlar'],
      ['Klient', '@microsoft/signalr', '10.0', 'Brauzerdagi SignalR klienti'],
      ['Klient', 'Web Crypto API, IndexedDB', 'brauzer', 'Maxfiy chatlarda shifrlash va kalitlarni qurilmada saqlash'],
      ['Infratuzilma', 'Docker, Render, Git/GitHub', '—', 'Konteynerlash, joylashtirish, versiyalar nazorati'],
    ],
    [2.2, 4, 1.8, 5],
  ),

  // ───────────────────────────────── 2.2
  h2('2.2. Tizim arxitekturasi'),
  ...ps(
    '“Milliy chat” klient-server arxitekturasi asosida qurilgan (2.1-rasm). Brauzerdagi Angular ilovasi server bilan ikki kanal orqali aloqa qiladi: holatni o‘zgartiruvchi barcha amallar (xabar yuborish, profilni tahrirlash, guruh yaratish) uchun HTTPS ustidagi **REST API**, serverdan mijozga hodisalarni (yangi xabar, o‘qilganlik, “yozmoqda”, onlayn holat) tezkor yetkazish uchun esa WebSocket ustidagi **SignalR** ulanishi. Tashqi xizmatlardan SMTP server bir martalik kodlarni yetkazadi, Google Identity kirish uchun ID token beradi, ClamAV esa yuklanayotgan fayllarni tekshiradi.',
    'Server holatsiz (stateless) loyihalangan: sessiyalar ma’lumotlar bazasida, autentifikatsiya har bir so‘rovdagi JWT tokenda saqlanadi. Shu sababli bir necha server nusxasini ishga tushirish mumkin, bunda faqat onlayn holat va SignalR ulanishlarini Redis’da umumlashtirish talab etiladi [12].',
  ),
  ...figure('2-2-deployment.png', '2.1', 'Tizimning umumiy arxitekturasi va joylashtirish sxemasi', 16.5),
  ...ps(
    'Server kodi Robert Martin taklif etgan **Clean Architecture** tamoyillari asosida to‘rtta loyihaga ajratilgan (2.2-rasm). Asosiy qoida — bog‘liqliklar faqat tashqi qatlamlardan ichki qatlamlarga yo‘naladi, shuning uchun biznes-qoidalar ma’lumotlar bazasi yoki freymvork almashtirilganda o‘zgarmaydi va alohida sinalishi mumkin [10].',
  ),
  ...figure('2-1-clean-architecture.png', '2.2', 'Server qismining Clean Architecture qatlamlari', 15.5),
  ...bullets([
    '**Domain** — biznes obyektlari (User, Chat, ChatMember, Message, Story, Organization, SecretChat va boshqalar), sanab o‘tiladigan turlar va o‘zbek yozuvlari transliteratori. Hech bir loyihaga bog‘liq emas [14];',
    '**Application** — foydalanish holatlarini amalga oshiruvchi servislar, DTO’lar, validatorlar hamda tashqi dunyo bilan aloqa uchun interfeyslar (IMessageRepository, IChatRealtimeNotifier, IEmailSender, IFileStorage). Kod funksiyalar (Chats, Groups, Messages, Organizations, SecretChats…) bo‘yicha guruhlangan;',
    '**Infrastructure** — interfeyslarning texnik amalga oshirilishi: EF Core konteksti va repozitoriylar [13], JWT, PBKDF2 va HMAC xeshlovchilari, SMTP, ClamAV, ImageSharp va FFmpeg ishlov beruvchilari, fon ishlari;',
    '**API** — REST controllerlar, SignalR habi (ChatHub), middleware’lar va bog‘liqliklarni ro‘yxatga olish.',
  ]),
  ...ps(
    'Application qatlami SignalR haqida hech narsa bilmaydi: xabar saqlangach, MessageService faqat IChatRealtimeNotifier interfeysini chaqiradi, uning SignalR’dagi amalga oshirilishi esa API qatlamida joylashgan (Dependency Inversion tamoyili). Real vaqt xabarnomasi tranzaksiya muvaffaqiyatli yakunlangandan keyingina yuboriladi, shuning uchun mijoz bazaga yozilmagan xabar haqida bildirishnoma olmaydi.',
    'Angular ilovasi ham qatlamlarga ajratilgan. **core** papkasida autentifikatsiya servisi, tokenni qo‘shuvchi va muddati o‘tganda yangilovchi HTTP interceptor, guard va mavzu servisi joylashgan. **features/chat** modulida REST so‘rovlari va holat signallarini boshqaruvchi ChatApiService hamda SignalR ulanishini boshqaruvchi ChatRealtimeService bor. Maxfiy chatlarning kriptografik qismi Angular’ga bog‘liq bo‘lmagan alohida modulda, **shared** papkasida esa transliterator va dizayn tizimi komponentlari joylashgan. Barcha ranglar CSS o‘zgaruvchilari orqali berilgani uchun yorug‘ va qorong‘i mavzular faqat o‘zgaruvchilar qiymatini almashtirish bilan o‘tadi.',
  ),

  // ───────────────────────────────── 2.3
  h2('2.3. Ma’lumotlar bazasini loyihalash'),
  p(
    'Ma’lumotlar bazasi “kod birinchi” (code-first) yondashuvida loyihalandi: jadvallar Domain’dagi entity sinflari va EF Core konfiguratsiyalari asosida yaratiladi, sxemaning har bir o‘zgarishi migratsiya sifatida saqlanadi [41]. 36 ta jadval vazifasiga ko‘ra PostgreSQL’ning o‘nta sxemasiga ajratilgan [44] (2.2-jadval). Ularning bir qismi (kanallar, qo‘ng‘iroqlar, stikerlar, botlar, so‘rovnomalar) kelajakdagi funksiyalar uchun oldindan tayyorlangan.',
  ),
  ...table(
    '2.2',
    'Ma’lumotlar bazasi sxemalari va jadvallari',
    ['Sxema', 'Jadvallar', 'Vazifasi'],
    [
      ['identity', 'users, contacts, blocked_users', 'Foydalanuvchilar va ular o‘rtasidagi aloqalar'],
      ['security', 'sessions, email_verification_codes, two_factor_auth', 'Sessiyalar, bir martalik kodlar, qo‘shimcha himoya'],
      ['chat', 'chats, chat_members, groups, channels, channel_subscribers, secret_chats', 'Chatlar, a’zolik va rollar, guruh va kanallar, maxfiy chatlar'],
      ['messaging', 'messages, attachments, message_views, reactions, polls, poll_options, poll_votes, secret_messages, secret_files', 'Xabarlar, biriktirmalar, o‘qilganlik, reaksiya va so‘rovnomalar, yetkazilmagan shifrlangan xabar va fayllar'],
      ['organizations', 'organizations, organization_members', 'Tashkilotlar (e-pochta domenlari) va tasdiqlangan a’zolik'],
      ['storage', 'files, photos, stickers, sticker_sets', 'Fayllar metama’lumotlari, rasmlar, stikerlar'],
      ['story', 'stories, story_views', 'Hikoyalar va ularni ko‘rishlar'],
      ['personal', 'folders, folder_chats, saved_messages, subscriptions', 'Shaxsiy papkalar, saqlangan xabarlar, obunalar'],
      ['call', 'calls, call_participants', 'Ovozli va video qo‘ng‘iroqlar (kelajak uchun)'],
      ['bot', 'bots', 'Botlar platformasi (kelajak uchun)'],
    ],
    [2, 6, 5],
  ),
  ...ps(
    'Modelning markazida **chats** jadvali turadi (2.3-rasm): shaxsiy chat ham, guruh ham bitta chats yozuvi bilan ifodalanadi va Type maydoni bilan farqlanadi. Ishtirokchilar **chat_members** jadvalida rollari (a’zo, administrator, ega) bilan saqlanadi, guruhga xos ma’lumotlar esa chats bilan “birga-bir” bog‘langan **groups** jadvaliga chiqarilgan. Shu tufayli xabarlar, biriktirmalar, qidiruv va real vaqt mexanizmlari shaxsiy chatlar va guruhlar uchun bir xil ishlaydi. **messages** jadvali o‘ziga o‘zi ReplyToMessageId orqali bog‘langan (javob xabarlar), ServiceAction maydoni esa guruhdagi xizmat xabarlarini (“a’zo qo‘shildi”, “nom o‘zgartirildi”) farqlaydi.',
  ),
  h3('Loyihalash qarorlari.'),
  ...bullets([
    '**Vaqt** — barcha vaqtlar UTC’da, “timestamp with time zone” turida saqlanadi; mahalliy vaqtga faqat brauzerda o‘giriladi;',
    '**Yumshoq o‘chirish** — o‘chirilgan chat va xabarlar DeletedAt maydoni bilan belgilanadi, EF Core global filtrlari ularni so‘rovlardan avtomatik chiqaradi;',
    '**O‘qilganlik** — message_views jadvali guruhda har bir a’zo uchun o‘qilmaganlar sonini alohida hisoblash imkonini beradi;',
    '**Fayllar** — diskda saqlanadi, bazada faqat metama’lumotlari yoziladi; bitta fayl biriktirma, profil rasmi yoki hikoya sifatida qayta ishlatiladi;',
    '**Indekslar** — users(Email, Username), sessions(RefreshTokenHash), organizations(Domain) kabi unique va tez-tez bajariladigan so‘rovlar uchun tarkibiy indekslar.',
  ]),
  p(
    'Chatlar ro‘yxati va xabarlar tarixi uchun **kursorli (keyset) sahifalash** tanlandi. OFFSET/LIMIT usulida yangi xabar qo‘shilganda sahifalar siljiydi va katta OFFSET’da so‘rov sekinlashadi. Kursorli usulda mijoz “beforeId” va “limit” yuboradi, server esa birlamchi kalit indeksi bo‘yicha limit+1 ta yozuvni o‘qib, items, nextCursor va hasMore maydonlarini qaytaradi. So‘rov tezligi tarix hajmiga bog‘liq emas [12].',
  ),

  landscapeFigure('2-4-er-users-chats.png', '2.3', 'ER-diagramma: foydalanuvchilar, sessiyalar, chatlar va guruhlar'),
  ...ps(
    'Tizimning o‘ziga xos imkoniyatlari uchun qo‘shilgan jadval va ustunlar 2.4-rasmda ko‘rsatilgan. **organizations** jadvalida har bir tashkilot bitta e-pochta domeni bilan ifodalanadi, **organization_members** esa a’zolik va rolni saqlaydi; groups jadvalidagi OrganizationId ustuni guruhni tashkilotning yopiq guruhiga aylantiradi. **secret_chats** jadvalida shifrlash kalitining o‘zi emas, faqat ikkala tomonning **ochiq** kalitlari va chat bog‘langan sessiyalar saqlanadi, **secret_messages** va **secret_files** esa faqat hali yetkazilmagan shifrlangan bloblarni vaqtincha saqlaydi. Transliteratsiya uchun users jadvaliga ScriptPreference, messages jadvaliga esa matnning lotinga o‘girilgan, kichik harfli nusxasi — SearchText ustuni qo‘shildi.',
  ),
  ...figure('2-11-er-new-tables.png', '2.4', 'ER-diagramma: tashkilotlar, maxfiy chatlar va transliteratsiya uchun qo‘shilgan jadval va ustunlar', 16.5),
  // ───────────────────────────────── 2.4
  h2('2.4. Tizimning UML modellari'),
  p(
    'Tizimning funksional imkoniyatlari va jarayonlari UML tilida modellashtirildi [20]. Tizimda uchta aktor mavjud. **Mehmon** faqat ro‘yxatdan o‘tishi yoki kirishi mumkin. **Foydalanuvchi** profilini boshqaradi, yozishadi, fayl va hikoyalar almashadi, guruh va maxfiy chat ochadi, xabarlarni o‘zi tanlagan yozuvda ko‘radi. **Guruh administratori yoki egasi** qo‘shimcha ravishda guruh a’zolari, sozlamalari va taklif havolasini boshqaradi (2.5-rasm). Guruhdagi ruxsatlar 2.3-jadvalda keltirilgan; ular server servislarida tekshiriladi, interfeys esa ruxsat berilmagan tugmalarni ko‘rsatmaydi.',
  ),
  ...figure('2-6-use-case.png', '2.5', 'Foydalanish holatlari (use-case) diagrammasi', 12, 22),
  ...table(
    '2.3',
    'Guruh chatidagi rollar va ruxsatlar',
    ['Amal', 'A’zo', 'Administrator', 'Ega'],
    [
      ['Xabar yozish, o‘qish, fayl yuborish', '✓', '✓', '✓'],
      ['A’zo qo‘shish', '—', '✓', '✓'],
      ['A’zoni guruhdan chiqarish', '—', 'Faqat oddiy a’zoni', '✓ (hammani)'],
      ['Administrator tayinlash yoki olib tashlash', '—', '—', '✓'],
      ['Guruh nomi, tavsifi va rasmini o‘zgartirish', '—', '✓', '✓'],
      ['Taklif havolasini boshqarish', '—', '✓', '✓'],
      ['Guruhni butunlay o‘chirish', '—', '—', '✓'],
      ['Guruhdan chiqish', '✓', '✓', '✓ (egalik boshqa a’zoga o‘tadi)'],
    ],
    [6, 2, 3, 3.5],
  ),
  h3('Elektron pochta orqali kirish jarayoni.'),
  p(
    'Kirish parolsiz: foydalanuvchi e-pochta manzilini kiritadi va unga yuborilgan 6 xonali kodni tasdiqlaydi (2.6-rasm). Server so‘rovlar chastotasini cheklaydi (manzilga daqiqada bitta kod, 15 daqiqada manzil yoki IP’dan beshtadan ortiq emas), kodni kriptografik generator bilan yaratadi va bazaga faqat PBKDF2 xeshini yozadi. Kod 10 daqiqa amal qiladi, beshtagacha urinish beriladi. Yangi foydalanuvchi uchun server imzolangan vaqtinchalik token qaytaradi va ro‘yxatdan o‘tish yakunlanadi; mavjud foydalanuvchi uchun darhol sessiya yaratiladi.',
  ),
  ...figure('2-7-otp-sequence.png', '2.6', 'Elektron pochtaga yuborilgan kod orqali kirish ketma-ketlik diagrammasi', 16),
  h3('Real vaqtda xabar yuborish jarayoni.'),
  p(
    'Brauzer tizimga kirgach, JWT token bilan SignalR habiga ulanadi va server ulanishni “user:{id}” guruhiga qo‘shadi — shu tufayli foydalanuvchining barcha qurilmalari hodisalarni bir vaqtda oladi (2.7-rasm). Xabarning o‘zi REST so‘rovi orqali yuboriladi: bu saqlash va validatsiyani oddiy HTTP semantikasi bilan bajarish imkonini beradi. Xabar bazaga yozilgach, chat a’zolariga MessageReceived hodisasi yuboriladi. Qabul qiluvchi chatni ochib turgan bo‘lsa, MarkMessagesRead metodini chaqiradi va jo‘natuvchida belgi ikki belgiga (✓✓) almashadi. Guruh yaratish va a’zo qo‘shish ham xizmat xabarlari orqali xuddi shu mexanizm bilan barcha a’zolarga bir zumda yetkaziladi.',
  ),
  ...figure('2-8-message-sequence.png', '2.7', 'Real vaqtda xabar yuborish va o‘qilganlik belgisi ketma-ketlik diagrammasi', 16.5),
  h3('Tashkilotga avtomatik qo‘shilish jarayoni.'),
  ...ps(
    'Tashkilot rejimi oldindan ro‘yxatni talab qilmaydi: **tashkilot — bu e-pochta domenining o‘zi**. Foydalanuvchi tasdiqlangan pochta bilan kirganda server “@” belgisidan keyingi domenni ajratib, normallashtiradi va faqat to‘liq tengligi bo‘yicha solishtiradi: “student.tuit.uz” alohida tashkilot, “evil-tuit.uz” esa hech qachon “tuit.uz” bilan mos kelmaydi. Umumiy pochta xizmatlari (gmail.com, mail.ru, umail.uz va 40 ga yaqin boshqa domen) tashkilot hisoblanmaydi.',
    'Domendan birinchi kirgan foydalanuvchi tashkilot admini va uning yopiq guruhi egasi bo‘ladi, keyingilar esa guruhga avtomatik qo‘shiladi (2.8-rasm). Domen guruhi qidiruvda ko‘rinmaydi; tashqaridan unga faqat admin qo‘shganda yoki 128 bitli tasodifiy tokenli taklif havolasi orqali kirish mumkin. Bunday guruhga butun fakultet kirishi mumkinligi uchun a’zolar chegarasi 200 o‘rniga 5000 qilib belgilangan.',
  ),
  ...figure('2-14-organization-join.png', '2.8', 'Foydalanuvchini tashkilotga va uning domen guruhiga qo‘shish algoritmi', 9.5, 21),

  // ───────────────────────────────── 2.5
  h2('2.5. Xavfsizlikni loyihalash'),
  ...ps(
    'Tizim parollardan foydalanmaydi, shuning uchun parollar bazasining sizib chiqishi yoki zaif parollar muammosi yo‘q. Bir martalik kodlar PBKDF2 (HMAC-SHA256, 210 000 iteratsiya, tasodifiy tuz) bilan xeshlanadi [24, 25] va vaqtga bog‘liq bo‘lmagan usulda solishtiriladi. Google orqali kirishda ID tokenning imzosi, muddati va auditoriyasi tekshiriladi.',
    'Kirishdan so‘ng ikki token beriladi. **Access token** — 15 daqiqa amal qiladigan, foydalanuvchi va sessiya identifikatorini saqlovchi JWT (HS256) [23]; u API so‘rovlarida va SignalR ulanishida yuboriladi. **Refresh token** — 30 kunlik tasodifiy qator bo‘lib, JavaScript o‘qiy olmaydigan HttpOnly, SameSite=Strict cookie’da saqlanadi, bazaga esa faqat HMAC xeshi yoziladi. Access token muddati tugaganda klient interceptori uni avtomatik yangilaydi, refresh token esa har safar almashtiriladi (rotatsiya), shuning uchun o‘g‘irlangan eski token ishlamaydi.',
    'Har bir kirish alohida sessiya yaratadi: foydalanuvchi barcha faol qurilmalarini ko‘radi va begona qurilmani chiqarib yuborishi mumkin. Avtorizatsiyada tokenning o‘zi yetarli emas — har bir chat bilan bog‘liq REST va hab chaqiruvida server foydalanuvchining shu chat a’zosi ekanini bazadan tekshiradi. Kiruvchi ma’lumotlar FluentValidation bilan tekshiriladi, kutilmagan xatolar esa mijozga ichki tafsilotlarsiz qaytariladi.',
    'Yuklanadigan rasm kengaytmasi bo‘yicha emas, tarkibi bo‘yicha tekshiriladi va qayta kodlanadi, ya’ni yashirin metama’lumot va zararli qo‘shimchalar olib tashlanadi. Fayllar tasodifiy nom bilan saqlanadi, faqat chat a’zolariga beriladi va ClamAV bilan tekshiriladi. Klient ilovasi qat’iy **Content Security Policy** bilan himoyalangan [31]: skriptlar faqat ilovaning o‘z manzilidan yuklanadi. Bu XSS’ga qarshi, ayniqsa maxfiy chat kalitlarini himoya qilish uchun muhim. Asosiy tahdidlar va himoya choralari 2.4-jadvalda umumlashtirilgan [33].',
  ),
  ...table(
    '2.4',
    'Asosiy tahdidlar va himoya choralari',
    ['Tahdid', 'Himoya choralari'],
    [
      ['Kodni tanlab topish (brute-force)', 'Kod 10 daqiqa amal qiladi, 5 tagacha urinish; kod so‘rash chastotasi e-pochta va IP bo‘yicha cheklangan'],
      ['Ma’lumotlar bazasining sizib chiqishi', 'Kodlar PBKDF2, refresh tokenlar HMAC-SHA256 xeshi ko‘rinishida saqlanadi; parollar yo‘q'],
      ['Tokenning o‘g‘irlanishi', 'Access token 15 daqiqa; refresh token HttpOnly cookie’da va har safar rotatsiya qilinadi; sessiyani masofadan yakunlash mumkin'],
      ['CSRF (so‘rovni soxtalashtirish)', 'Refresh cookie SameSite=Strict va faqat /api/auth yo‘li uchun; boshqa so‘rovlar Authorization sarlavhasini talab qiladi'],
      ['XSS (skript kiritish)', 'Angular shablonlari ma’lumotlarni avtomatik ekranlaydi; qat’iy CSP; refresh token JavaScript’ga ko‘rinmaydi'],
      ['Begona chatga kirish', 'Har bir REST va hab chaqiruvida a’zolik tekshiruvi; guruhda rolga asoslangan ruxsatlar'],
      ['Zararli yoki soxta fayl', 'Hajm cheklovlari, tarkib bo‘yicha format tekshiruvi, rasmni qayta kodlash, ClamAV skaneri'],
      ['Tinglab olish (MITM)', 'Barcha trafik HTTPS/WSS orqali; ishlab chiqarish muhitida cookie faqat Secure rejimida'],
      ['Server yoki ma’lumotlar bazasi buzilishi', 'Maxfiy chatlarda uchdan-uchgacha shifrlash: serverda faqat ochiq kalitlar va vaqtincha shifrlangan bloblar'],
      ['Xabarni takrorlash (replay)', 'Maxfiy chatda har xabar tartib raqami bilan: takrori rad etiladi; AES-GCM AAD xabarni chat, yo‘nalish va raqamga bog‘laydi'],
      ['Yopiq guruhga ruxsatsiz kirish', 'Guruh qidiruvda ko‘rinmaydi; 128 bitli taklif tokeni; havolani yangilash yoki bekor qilish mumkin'],
    ],
    [4, 9],
  ),

  // ───────────────────────────────── 2.6
  h2('2.6. Maxfiy chatlar kriptografik protokolini loyihalash'),
  ...ps(
    'Oddiy chatlarda xabarlar serverga TLS orqali yetib keladi, lekin serverda ochiq saqlanadi — bu barcha qurilmalarda sinxronizatsiya, qidiruv va transliteratsiyani ta’minlaydi. Ammo ayrim yozishmalar server buzilganda yoki baza sizib chiqqanda ham o‘qilmasligi kerak. Buning uchun uchdan-uchgacha (E2E) shifrlangan **maxfiy chatlar** loyihalandi. Protokolda server “halol, lekin qiziquvchan” deb qaraladi [19]: u xabarlarni yetkazadi, lekin faqat kim kimga, qachon va qancha hajmda yozganini biladi.',
    'Signal va WhatsApp’dagi ko‘p qurilmali model har bir qurilma kalitlarini boshqarishni talab qiladi, shuning uchun Telegram’dagi kabi **qurilmaga bog‘langan model** tanlandi: maxfiy chat ikki aniq qurilma o‘rtasida ochiladi. Kriptografiyani noldan yozish xavfli bo‘lgani uchun protokol faqat brauzerning standart **Web Crypto API** primitivlaridan quriladi [30] (2.5-jadval), barcha yopiq kalitlar esa “extractable: false” rejimida yaratiladi — skript ular bilan shifrlay oladi, lekin kalit baytlarini o‘qiy olmaydi.',
  ),
  ...table(
    '2.5',
    'Maxfiy chatlarda qo‘llanilgan kriptografik primitivlar',
    ['Primitiv', 'Standart', 'Vazifasi'],
    [
      ['X25519', 'RFC 7748', 'Diffi-Xellman kalit kelishuvi: har bir qurilma har bir chat uchun yangi kalit jufti yaratadi, umumiy sir tarmoq orqali uzatilmaydi'],
      ['HKDF-SHA-256', 'RFC 5869', 'Umumiy sirdan ikki yo‘nalish uchun ikkita zanjir kalitini chiqarish'],
      ['HMAC-SHA-256', 'RFC 2104', 'Zanjir kalitidan har bir xabar kaliti va keyingi zanjir kalitini hosil qilish (ratchet)'],
      ['AES-256-GCM', 'NIST SP 800-38D', 'Xabar va fayllarni shifrlash va butunligini tekshirish'],
      ['SHA-256', 'FIPS 180-4', 'Kalit izi (fingerprint): ikkala ochiq kalitdan emoji va raqamlar ko‘rinishida'],
    ],
    [2.6, 2.6, 8],
  ),
  ...ps(
    '**Kalit almashish.** Tashabbuskorning brauzeri X25519 [26] kalit juftini yaratib, serverga faqat ochiq kalitni yuboradi (2.9-rasm). Suhbatdosh taklifni qaysi qurilmada qabul qilsa, chat o‘sha qurilmaga bog‘lanadi va u ham o‘z ochiq kalitini qaytaradi. Shundan so‘ng ikkala tomon mustaqil ravishda bir xil umumiy sirni hisoblaydi. Serverdagi ikki ochiq kalitdan bu sirni topish diskret logarifm masalasini yechishni talab qiladi.',
  ),
  ...figure('2-12-secret-handshake.png', '2.9', 'Maxfiy chatni ochish va shifrlangan xabar yetkazish ketma-ketlik diagrammasi', 13, 22),
  ...ps(
    '**Xabar kalitlari zanjiri.** Umumiy sir HKDF [27] yordamida har bir yo‘nalish uchun alohida zanjir kalitiga kengaytiriladi (2.10-rasm). Har bir xabarda zanjir bir qadam suriladi: MK = HMAC(CK, 0x01), CK′ = HMAC(CK, 0x02) [25], eski kalit esa darhol unutiladi. Bu **oldinga maxfiylikni** ta’minlaydi: joriy kalit o‘g‘irlansa ham, avvalgi xabarlarni ochib bo‘lmaydi. Xabar AES-256-GCM bilan shifrlanadi [28], AAD sifatida esa “chatId | yo‘nalish | tartib raqami” ishlatiladi, shuning uchun xabarni boshqa chatga ko‘chirish yoki o‘rnini almashtirish teg tekshiruvida aniqlanadi.',
  ),
  ...figure('2-13-ratchet.png', '2.10', 'Maxfiy chatda kalitlarni chiqarish va xabar kalitlari zanjiri', 13, 20),
  ...ps(
    '**Yetkazish.** Server faqat saqlab-uzatish vazifasini bajaradi: shifrlangan blob qabul qiluvchi qurilmaga yuboriladi, u tasdiq (ack) qaytargach server blobni o‘chiradi, yetkazilmaganlari 7 kundan keyin tozalanadi. Har bir xabarning o‘suvchi tartib raqami takroriy yuborish (replay) hujumidan himoyalaydi, tartibsiz kelgan xabarlar uchun esa 200 tagacha o‘tkazib yuborilgan kalit vaqtincha saqlanadi. O‘z-o‘zini o‘chirish taymeri va tarixni tozalash buyrug‘i ham shifrlangan xabar sifatida yuboriladi.',
    '**Fayllar va kalit izi.** Fayl brauzerda alohida tasodifiy AES kalit bilan shifrlanib yuklanadi, kalit va fayl nomi esa E2E xabar ichida yuboriladi. Kalit izi ikkala ochiq kalitning SHA-256 [29] xeshidan 8 ta emoji va raqamlar ko‘rinishida hisoblanadi: server o‘rtada turib kalitlarni almashtirsa (MITM), ikki tomondagi belgilar farq qiladi.',
    '**Cheklovlar.** Protokol Signal’dagi to‘liq Double Ratchet emas [32]: suhbat davomida yangi Diffi-Xellman almashinuvi bajarilmagani uchun buzilgandan keyin tiklanish xususiyati yo‘q. Metama’lumotlar serverga ko‘rinadi, maxfiy chat esa faqat bitta qurilmada ishlaydi. Veb-ilovada shifrlash kodini ham server yuborgani sababli bu xavf qat’iy CSP bilan kamaytirilgan, to‘liq bartaraf etish esa alohida mobil ilova talab qiladi.',
  ),

  h2('2-bob bo‘yicha xulosa'),
  p(
    'Ikkinchi bobda “Milliy chat” tizimi loyihalandi. .NET 8, ASP.NET Core, SignalR, EF Core, PostgreSQL va Angular texnologiyalari tanlandi, server kodi Clean Architecture asosida to‘rt qatlamga ajratildi. O‘nta sxemadagi 36 ta jadvaldan iborat ma’lumotlar bazasi loyihalandi, katta ro‘yxatlar uchun kursorli sahifalash tanlandi. UML diagrammalari yordamida kirish, real vaqtda xabar almashish va tashkilotga qo‘shilish jarayonlari modellashtirildi. Xavfsizlik parolsiz autentifikatsiya, xeshlangan kod va tokenlar, rotatsiya qilinadigan refresh token, a’zolikka asoslangan avtorizatsiya va qat’iy CSP asosida qurildi. Maxfiy chatlar uchun Web Crypto API primitivlari asosida oldinga maxfiylikka ega E2E shifrlash protokoli ishlab chiqildi va uning cheklovlari aniqlandi.',
  ),
];
