import { bullets, figure, h1, h2, h3, landscapeFigure, p, ps, table } from '../lib.mjs';

export const chapter2 = () => [
  h1('II-bob. “Milliy chat” tizimini loyihalash'),

  // ───────────────────────────────── 2.1
  h2('2.1. Texnologiyalarni tanlash va asoslash'),
  ...ps(
    'Birinchi bobda aniqlangan talablar texnologiyalarni tanlashda quyidagi mezonlarni belgilab berdi: real vaqtda ikki tomonlama aloqani qo‘llab-quvvatlash; yuqori unumdorlik va ko‘p sonli bir vaqtdagi ulanishlarga chidamlilik; xavfsizlik vositalarining (autentifikatsiya, kriptografiya) tayyor va ishonchli bo‘lishi; ekotizimning yetukligi va uzoq muddatli qo‘llab-quvvatlanishi; ochiq kodli va bepul litsenziya; konteynerlarda joylashtirish qulayligi.',
  ),
  h3('Server qismi.'),
  ...ps(
    'Server qismi uchun Microsoft kompaniyasining **.NET 8** platformasi va **ASP.NET Core 8** veb-freymvorki tanlandi. .NET 8 uzoq muddatli qo‘llab-quvvatlanadigan (LTS) versiya bo‘lib, kross-platformali, ochiq kodli va Linux konteynerlarida ishlaydi. ASP.NET Core mustaqil sinovlarda eng tezkor veb-freymvorklar qatorida turadi, unda bog‘liqliklarni kiritish (Dependency Injection), konfiguratsiya, loglash va middleware konveyeri tayyor holda mavjud. C# tilining qat’iy tiplanishi, async/await modeli va LINQ so‘rovlari murakkab biznes-mantiqni ishonchli yozish imkonini beradi.',
    'Muqobil sifatida Node.js (Express, NestJS) va Java (Spring Boot) ko‘rib chiqildi. Node.js real vaqt ilovalari uchun qulay, lekin dinamik tiplash katta loyihada xatolar ehtimolini oshiradi. Spring Boot esa kuchli, ammo ko‘proq resurs talab qiladi va konfiguratsiyasi murakkabroq. .NET tanlovining hal qiluvchi sababi — **SignalR** kutubxonasi platformaning tarkibiy qismi ekanligi: WebSocket, SSE va long polling transportlari, hablar, guruhlar va JWT autentifikatsiyasi qo‘shimcha kutubxonalarsiz ishlaydi.',
    'Ma’lumotlar bazasi sifatida **PostgreSQL** tanlandi. U ochiq kodli, ACID tranzaksiyalarni to‘liq qo‘llab-quvvatlaydigan, sxemalar, izohlar (comment), qisman va murakkab indekslar, matnni registrga bog‘liq bo‘lmagan holda qidirish (ILIKE) kabi imkoniyatlarga ega obyekt-relatsion MBBT. Ma’lumotlar bazasi bilan ishlash **Entity Framework Core 8** ORM va Npgsql provayderi orqali amalga oshiriladi. EF Core LINQ so‘rovlarini SQLga tarjima qiladi, sxema o‘zgarishlarini migratsiyalar ko‘rinishida boshqaradi va obyektlarni kuzatish (change tracking) mexanizmini taqdim etadi.',
  ),
  h3('Klient qismi.'),
  ...ps(
    'Foydalanuvchi interfeysi Google kompaniyasining **Angular 22** freymvorkida ishlab chiqildi. Angular to‘liq freymvork bo‘lib, marshrutlash, formalar, HTTP klient, bog‘liqliklarni kiritish va sinov vositalarini bitta ekotizimda beradi. Loyihada Angularning zamonaviy imkoniyatlari qo‘llanildi: mustaqil (standalone) komponentlar, holatni boshqarish uchun **signals** mexanizmi, shablonlardagi yangi boshqaruv bloklari (@if, @for) va server tomonida render qilish (SSR). Kod **TypeScript 6** tilida yozilgan, asinxron oqimlar **RxJS** orqali boshqariladi, real vaqt aloqasi esa rasmiy **@microsoft/signalr** kutubxonasi yordamida o‘rnatiladi.',
    'React va Vue.js muqobil variantlar sifatida ko‘rib chiqildi. Ular kutubxona sifatida yengilroq, lekin marshrutlash, formalar va holatni boshqarish uchun uchinchi tomon kutubxonalarini tanlash va birlashtirishni talab qiladi. Angularning qat’iy tuzilmasi va TypeScriptni birinchi darajali qo‘llab-quvvatlashi server qismidagi C# kodi bilan uslubiy uyg‘unlikni ta’minlaydi.',
  ),
  h3('Infratuzilma.'),
  p(
    'Server ilovasi **Docker** konteyneriga ko‘p bosqichli (multi-stage) usulda yig‘iladi: birinchi bosqichda .NET SDK obrazida loyiha kompilyatsiya qilinadi, ikkinchi bosqichda esa faqat kompilyatsiya natijasi yengil ASP.NET runtime obraziga ko‘chiriladi. Konteyner **Render** bulutli platformasida ishga tushirilgan. Kod **Git** tizimida, GitHub’dagi ikkita repozitoriyda (server va klient) yuritiladi. Har bir funksiya alohida tarmoqda ishlab chiqilib, Pull Request orqali asosiy tarmoqqa birlashtiriladi. Tanlangan texnologiyalar 2.1-jadvalda umumlashtirilgan.',
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
      ['Server', 'Swashbuckle (Swagger)', '6.6.2', 'API hujjatlari va sinov interfeysi'],
      ['Ma’lumotlar', 'PostgreSQL', '16+', 'Relatsion ma’lumotlar bazasi'],
      ['Klient', 'Angular, Angular SSR', '22', 'SPA freymvork, server tomonida render'],
      ['Klient', 'TypeScript, RxJS', '6.0, 7.8', 'Tiplashtirilgan til, reaktiv oqimlar'],
      ['Klient', '@microsoft/signalr', '10.0', 'Brauzerdagi SignalR klienti'],
      ['Infratuzilma', 'Docker, Render, Git/GitHub', '—', 'Konteynerlash, joylashtirish, versiyalar nazorati'],
    ],
    [2.2, 4, 1.8, 5],
  ),

  // ───────────────────────────────── 2.2
  h2('2.2. Tizim arxitekturasi'),
  h3('Umumiy arxitektura.'),
  ...ps(
    '“Milliy chat” klient-server arxitekturasi asosida qurilgan. Foydalanuvchi brauzerida Angular ilovasi ishlaydi. U server bilan ikki kanal orqali aloqa qiladi: HTTPS ustidagi **REST API** (JSON formatidagi so‘rov va javoblar) va WebSocket ustidagi **SignalR** ulanishi. REST API holatni o‘zgartiruvchi barcha amallar uchun ishlatiladi: xabar yuborish, profilni tahrirlash, guruh yaratish va hokazo. SignalR ulanishi esa serverdan mijozga hodisalarni tezkor yetkazish uchun xizmat qiladi: yangi xabar, o‘qilganlik, “yozmoqda” holati, onlayn holat, guruh o‘zgarishlari.',
    'Server qismi holatsiz (stateless) qilib loyihalangan: foydalanuvchi sessiyasi haqidagi barcha ma’lumotlar ma’lumotlar bazasida, autentifikatsiya esa har bir so‘rovdagi JWT tokenda saqlanadi. Shu sababli bir nechta server nusxasini ishga tushirib, yuklamani ular o‘rtasida taqsimlash mumkin. Bunda faqat SignalR ulanishlari holati va onlayn foydalanuvchilar ro‘yxatini umumiy joyda (Redis) saqlash talab etiladi. Tizimning umumiy arxitekturasi va joylashtirish sxemasi 2.1-rasmda keltirilgan.',
  ),
  ...figure('2-2-deployment.png', '2.1', 'Tizimning umumiy arxitekturasi va joylashtirish sxemasi', 16.5),
  ...ps(
    'Rasmdan ko‘rinib turibdiki, tizim tashqi xizmatlar bilan ham ishlaydi. SMTP server bir martalik kodlarni elektron pochtaga yetkazadi. Google Identity xizmati Google hisobi orqali kirishda ID tokenini beradi, server esa uni Google’ning ochiq kalitlari yordamida tekshiradi. ClamAV antivirusi yuklanayotgan fayllarni tekshiradi. Yuklangan fayllar serverning fayl omborida (wwwroot/uploads katalogi) sana bo‘yicha ajratilgan papkalarda saqlanadi, ma’lumotlar bazasida esa faqat ularning metama’lumotlari va yo‘li yoziladi.',
  ),
  h3('Server qismining qatlamli arxitekturasi.'),
  ...ps(
    'Server kodi Robert Martin tomonidan taklif etilgan **toza arxitektura** (Clean Architecture) tamoyillari asosida tashkil etilgan. Uning asosiy g‘oyasi — biznes-mantiqni texnik tafsilotlardan (ma’lumotlar bazasi, veb-freymvork, tashqi xizmatlar) ajratish. Bog‘liqliklar faqat tashqi qatlamlardan ichki qatlamlarga yo‘nalgan bo‘lishi kerak. Natijada biznes-qoidalar ma’lumotlar bazasi yoki freymvork almashtirilganda o‘zgarmaydi, ularni esa alohida sinash mumkin bo‘ladi.',
    'Yechim (solution) to‘rtta loyihadan iborat. Ularning o‘zaro bog‘liqligi 2.2-rasmda ko‘rsatilgan.',
  ),
  ...figure('2-1-clean-architecture.png', '2.2', 'Server qismining Clean Architecture qatlamlari', 15.5),
  ...bullets([
    '**Domain** — tizimning biznes obyektlari (entity): User, Session, Chat, ChatMember, Group, Message, Attachment, File, Photo, Story va boshqalar, shuningdek ChatType, ChatMemberRole, MessageServiceAction kabi sanab o‘tiladigan turlar. Bu qatlam boshqa hech bir loyihaga bog‘liq emas;',
    '**Application** — foydalanish holatlari (use-case) amalga oshiriladigan qatlam. Unda servislar (AuthService, ChatService, GroupService, MessageService, StoryService…), ma’lumot uzatish obyektlari (DTO), FluentValidation validatorlari, entity’larni DTOga o‘giruvchi Mapper va yangi obyektlarni yaratuvchi Factory sinflari hamda tashqi dunyo bilan aloqa uchun “portlar” — interfeyslar (IMessageRepository, IChatRealtimeNotifier, IEmailSender, IFileStorage…) joylashgan. Application faqat Domain’ga bog‘liq;',
    '**Infrastructure** — Application interfeyslarining texnik amalga oshirilishi: EF Core ma’lumotlar konteksti (ChatDb) va repozitoriylar, JWT tokenlar chiqaruvchisi, PBKDF2 va HMAC xeshlovchilari, Google token tekshiruvchisi, SMTP orqali xat yuboruvchi, ClamAV skaneri, ImageSharp va FFmpeg asosidagi media ishlov beruvchilar, onlayn holat kuzatuvchilari;',
    '**API** — kompozitsiya ildizi va HTTP transport qatlami: REST controllerlar, SignalR habi (ChatHub), xatolarni markazlashgan holda qayta ishlovchi middleware va barcha bog‘liqliklarni ro‘yxatga oluvchi kengaytma metodlar.',
  ]),
  ...ps(
    'Application qatlami ma’lumotlar bazasi yoki SignalR haqida hech narsa bilmaydi. Masalan, xabar yuborilgandan so‘ng MessageService faqat IChatRealtimeNotifier interfeysining MessageCreatedAsync metodini chaqiradi. Bu interfeysning SignalR orqali ishlaydigan amalga oshirilishi (SignalRChatRealtimeNotifier) API qatlamida joylashgan va bog‘liqliklar konteynerida ro‘yxatdan o‘tkazilgan. Bu yondashuv “bog‘liqliklarni teskari aylantirish” (Dependency Inversion) tamoyilining amaliy ko‘rinishidir.',
    'Application qatlami ichida kod texnik vazifalar bo‘yicha emas, **funksiyalar (feature) bo‘yicha** guruhlangan: Authentication, Chats, Groups, Messages, Contacts, Profiles, Stories, Users, Files. Har bir funksiya papkasi o‘z servislari, DTOlari, interfeyslari, validatorlari, mapper va factory sinflarini o‘z ichiga oladi. Bu tuzilma yangi funksiyani qo‘shishda o‘zgarishlarni bitta joyda to‘plash va kodni tushunishni osonlashtiradi. Loyihada qabul qilingan qoidalar (qatlam chegaralari, UTC vaqt, sahifalash, validatsiya, nomlash) repozitoriydagi AGENTS.md hujjatida qayd etilgan.',
    'HTTP so‘rov qatlamlar bo‘ylab qanday o‘tishi xabar yuborish misolida 2.3-rasmda ko‘rsatilgan. Controller so‘rovni qabul qilib, foydalanuvchi identifikatorini JWT tokendan oladi va servisni chaqiradi. Servis ma’lumotlarni validatsiya qiladi, foydalanuvchining chat a’zosi ekanligini tekshiradi, Factory yordamida yangi Message obyektini yaratadi va repozitoriy orqali saqlaydi. Tranzaksiya muvaffaqiyatli yakunlangach, real vaqt xabarnomasi chat a’zolariga yuboriladi. Bu tartib mijozlar hech qachon bazaga yozilmagan xabar haqida bildirishnoma olmasligini kafolatlaydi.',
  ),
  ...figure('2-3-request-flow.png', '2.3', 'Xabar yuborish so‘rovining qatlamlar bo‘ylab o‘tishi', 13.5),
  h3('Klient qismining arxitekturasi.'),
  ...ps(
    'Angular ilovasi ham qatlamlarga ajratilgan. **core** papkasida butun ilova uchun umumiy xizmatlar joylashgan: autentifikatsiya servisi (AuthService), har bir so‘rovga token qo‘shuvchi va muddati o‘tgan tokenni avtomatik yangilovchi HTTP interceptor, himoyalangan sahifalarni qo‘riqlovchi guard, mavzuni (yorug‘ va qorong‘i) boshqaruvchi servis. **features** papkasida funksional modullar joylashgan: kirish sahifasi (auth) va chat moduli. Chat modulining data-access qatlamida ChatApiService (REST so‘rovlar va ilova holati signallari) hamda ChatRealtimeService (SignalR ulanishi va hodisalar oqimi) servislari bor. Komponentlar faqat shu servislar bilan ishlaydi.',
    '**shared/ui** papkasida loyihaning dizayn tizimi (design system) komponentlari joylashgan: tugma, ikonkali tugma, matn maydoni, checkbox, banner, tasdiqlash oynasi va boshqalar. Barcha ranglar CSS o‘zgaruvchilari (design token) orqali berilgan. Shu sababli yorug‘ va qorong‘i mavzular o‘rtasida o‘tish faqat o‘zgaruvchilar qiymatini almashtirish orqali amalga oshadi.',
  ),

  // ───────────────────────────────── 2.3
  h2('2.3. Ma’lumotlar bazasini loyihalash'),
  ...ps(
    'Ma’lumotlar bazasi “kod birinchi” (code-first) yondashuvida loyihalandi: jadvallar tuzilmasi Domain qatlamidagi entity sinflari va Infrastructure qatlamidagi IEntityTypeConfiguration konfiguratsiyalari asosida EF Core tomonidan yaratiladi. Sxemadagi har bir o‘zgarish migratsiya ko‘rinishida saqlanadi va versiyalar nazorati tizimida kuzatiladi.',
    'Jadvallar mantiqiy vazifasiga ko‘ra PostgreSQL’ning to‘qqizta sxemasiga (schema) ajratilgan. Bu yondashuv katta bazada yo‘nalishni osonlashtiradi, kelajakda esa turli xizmatlarga faqat kerakli sxemalarga kirish huquqini berish imkonini yaratadi. Jami 32 ta jadval loyihalangan. Ularning bir qismi (kanallar, qo‘ng‘iroqlar, stikerlar, botlar, papkalar, so‘rovnomalar, reaksiyalar) kelajakdagi funksiyalar uchun oldindan tayyorlangan. Sxemalar tarkibi 2.2-jadvalda keltirilgan.',
  ),
  ...table(
    '2.2',
    'Ma’lumotlar bazasi sxemalari va jadvallari',
    ['Sxema', 'Jadvallar', 'Vazifasi'],
    [
      ['identity', 'users, contacts, blocked_users', 'Foydalanuvchilar va ular o‘rtasidagi aloqalar'],
      ['security', 'sessions, email_verification_codes, two_factor_auth', 'Sessiyalar, bir martalik kodlar, qo‘shimcha himoya'],
      ['chat', 'chats, chat_members, groups, channels, channel_subscribers, secret_chats', 'Chatlar, a’zolik va rollar, guruh va kanallar'],
      ['messaging', 'messages, attachments, message_views, reactions, polls, poll_options, poll_votes', 'Xabarlar, biriktirmalar, o‘qilganlik, reaksiya va so‘rovnomalar'],
      ['storage', 'files, photos, stickers, sticker_sets', 'Fayllar metama’lumotlari, rasmlar, stikerlar'],
      ['story', 'stories, story_views', 'Hikoyalar va ularni ko‘rishlar'],
      ['personal', 'folders, folder_chats, saved_messages, subscriptions', 'Shaxsiy papkalar, saqlangan xabarlar, obunalar'],
      ['call', 'calls, call_participants', 'Ovozli va video qo‘ng‘iroqlar (kelajak uchun)'],
      ['bot', 'bots', 'Botlar platformasi (kelajak uchun)'],
    ],
    [2, 6, 5],
  ),
  ...ps(
    'Tizimning joriy funksiyalarini ta’minlovchi asosiy jadvallar va ular o‘rtasidagi bog‘lanishlar ikkita ER-diagrammada ko‘rsatilgan. 2.4-rasmda foydalanuvchilar, sessiyalar, chatlar va guruhlar, 2.5-rasmda esa xabarlar, fayllar va hikoyalar bilan bog‘liq jadvallar tasvirlangan.',
  ),
  ...ps(
    'Modelning markazida **chats** jadvali turadi. Shaxsiy chat ham, guruh ham bitta chats yozuvi bilan ifodalanadi va ular Type maydoni (1 — shaxsiy, 2 — guruh) bilan farqlanadi. Chat ishtirokchilari **chat_members** jadvalida saqlanadi. Bu jadval users va chats o‘rtasidagi “ko‘pdan-ko‘pga” bog‘lanishni amalga oshiradi va har bir a’zoning rolini (1 — a’zo, 2 — administrator, 3 — ega) hamda qo‘shilgan vaqtini saqlaydi. Guruhga xos ma’lumotlar (nomi, tavsifi, rasmi, yaratuvchisi) alohida **groups** jadvaliga chiqarilgan va chats bilan “birga-bir” bog‘langan. Buni ChatId ustunidagi unique indeks ta’minlaydi. Bu yechim tufayli xabarlar, biriktirmalar, qidiruv va real vaqt mexanizmlari shaxsiy chatlar va guruhlar uchun bir xil ishlaydi.',
    '**users** jadvalida Email va Username ustunlari unique indekslar bilan himoyalangan. Foydalanuvchi sessiyalari **sessions** jadvalida saqlanadi: qurilma nomi, IP-manzil, oxirgi faollik vaqti, amal qilish muddati, bekor qilingan vaqti (RevokedAt) va refresh tokenning xeshi. Refresh token xeshi ustunida ham unique indeks bor, bu token bo‘yicha sessiyani tez topish imkonini beradi. Bir martalik kodlar **email_verification_codes** jadvalida faqat xesh ko‘rinishida, urinishlar soni va amal qilish muddati bilan birga saqlanadi.',
  ),
  landscapeFigure('2-4-er-users-chats.png', '2.4', 'ER-diagramma: foydalanuvchilar, sessiyalar, chatlar va guruhlar'),
  landscapeFigure('2-5-er-messages.png', '2.5', 'ER-diagramma: xabarlar, fayllar va hikoyalar'),
  ...ps(
    '**messages** jadvali tizimdagi eng katta hajmli jadval hisoblanadi, shuning uchun uning tuzilmasiga alohida e’tibor berildi (2.3-jadval). Xabar boshqa xabarga javob bo‘lishi mumkin, buning uchun jadval o‘ziga o‘zi ReplyToMessageId orqali bog‘langan. Asl xabar o‘chirilsa, bu maydon avtomatik NULL qiymatga o‘tadi (ON DELETE SET NULL). ServiceAction maydoni oddiy xabarni guruhdagi xizmat xabaridan (“guruh yaratildi”, “a’zo qo‘shildi”, “nom o‘zgartirildi” va hokazo) farqlaydi.',
  ),
  ...table(
    '2.3',
    '“messaging.messages” jadvalining tuzilmasi',
    ['Ustun', 'Tur', 'Izoh'],
    [
      ['Id', 'integer, PK', 'Avtomatik oshuvchi identifikator, sahifalash kursori'],
      ['ChatId', 'integer, FK → chats', 'Xabar tegishli chat (chat o‘chirilsa, kaskad)'],
      ['SenderId', 'integer, FK → users', 'Jo‘natuvchi (foydalanuvchi o‘chirilishi cheklangan)'],
      ['TextContent', 'text, NULL', 'Xabar matni (faqat fayldan iborat xabarda bo‘sh)'],
      ['ReplyToMessageId', 'integer, FK, NULL', 'Javob berilgan xabar (ON DELETE SET NULL)'],
      ['ServiceAction', 'integer, NULL', 'Xizmat xabari turi: 1 — guruh yaratildi, 2 — a’zolar qo‘shildi, 3 — chiqarildi, 4 — chiqib ketdi, 5 — nom, 6 — rasm o‘zgardi'],
      ['SentAt', 'timestamptz', 'Yuborilgan vaqt (UTC)'],
      ['EditedAt', 'timestamptz, NULL', 'Oxirgi tahrir vaqti'],
      ['DeletedAt', 'timestamptz, NULL', 'Yumshoq o‘chirish belgisi'],
    ],
    [3, 3.2, 7],
  ),
  h3('Loyihalash qarorlari.'),
  ...bullets([
    '**Vaqt.** Barcha vaqt belgilari UTC’da saqlanadi va PostgreSQL’da “timestamp with time zone” turiga ega. Server kodida joriy vaqt TimeProvider abstraksiyasi orqali olinadi, bu esa vaqtga bog‘liq mantiqni sinashni osonlashtiradi. Foydalanuvchining mahalliy vaqtiga o‘girish faqat brauzerda amalga oshiriladi;',
    '**Yumshoq o‘chirish (soft delete).** Chat yoki xabar o‘chirilganda yozuv jismonan o‘chirilmaydi, balki DeletedAt maydoniga vaqt yoziladi. EF Core’ning global so‘rov filtrlari (HasQueryFilter) bunday yozuvlarni barcha so‘rovlardan avtomatik chiqarib tashlaydi;',
    '**O‘qilganlik.** Xabar kim tomonidan va qachon o‘qilgani alohida message_views jadvalida saqlanadi. Bu yechim guruh chatlarida har bir a’zo uchun o‘qilmagan xabarlar sonini alohida hisoblash imkonini beradi;',
    '**Fayllar.** Fayl ma’lumotlar bazasida emas, diskda saqlanadi. files jadvalida faqat nomi, MIME turi, hajmi va saqlash yo‘li yoziladi, rasmlar uchun esa photos jadvalida o‘lchamlari qo‘shimcha saqlanadi. Bitta fayl xabarga biriktirma, profil rasmi, guruh rasmi yoki hikoya sifatida qayta ishlatilishi mumkin;',
    '**Hujjatlashtirilgan enum’lar.** Sanab o‘tiladigan turlar bazada butun son sifatida saqlanadi, har bir qiymatning ma’nosi esa ustun izohiga (masalan, “1 = Member, 2 = Admin, 3 = Creator”) avtomatik yoziladi;',
    '**Indekslar.** Tez-tez bajariladigan so‘rovlar uchun indekslar yaratilgan: users(Email), users(Username), sessions(RefreshTokenHash) — unique; sessions(UserId, RevokedAt, ExpiresAt), email_verification_codes(Email, Purpose, ExpiresAt) — tarkibiy; groups(ChatId) — unique.',
  ]),
  h3('Kursorli sahifalash.'),
  ...ps(
    'Chatlar ro‘yxati va xabarlar tarixi doimiy o‘zgarib turadigan, tartiblangan ma’lumotlardir. Klassik “sahifa raqami” (OFFSET/LIMIT) usulida yangi xabar qo‘shilganda sahifalar siljiydi, natijada foydalanuvchi bir xabarni ikki marta ko‘radi yoki ayrim xabarlarni o‘tkazib yuboradi. Katta OFFSET qiymatlarida esa MBBT o‘tkazib yuboriladigan qatorlarni ham o‘qishga majbur bo‘ladi va so‘rov sekinlashadi.',
    'Shu sababli tizimda **kursorli (keyset) sahifalash** qo‘llanildi. Mijoz “beforeId” (shu identifikatordan oldingi yozuvlar) va “limit” (1 dan 100 gacha) parametrlarini yuboradi. Server yozuvlarni identifikator bo‘yicha kamayish tartibida saralaydi, limit+1 ta yozuvni o‘qiydi va javobda items (yozuvlar), nextCursor (keyingi so‘rov uchun kursor) va hasMore (yana yozuvlar bormi) maydonlarini qaytaradi. Bu so‘rov birlamchi kalit indeksi bo‘yicha bajariladi, shuning uchun uning tezligi tarix hajmiga bog‘liq emas. Chatlar ro‘yxatida kursor sifatida chatdagi oxirgi xabarning identifikatori olinadi. Shu tufayli yangi xabar kelgan chat avtomatik ravishda ro‘yxat boshiga chiqadi.',
  ),

  // ───────────────────────────────── 2.4
  h2('2.4. Tizimning UML modellari'),
  ...ps(
    'Tizimning funksional imkoniyatlari va komponentlar o‘rtasidagi o‘zaro ta’sir UML (Unified Modeling Language) tilida modellashtirildi. Foydalanish holatlari diagrammasi (use-case) tizim nima qilishini, ketma-ketlik diagrammalari (sequence) esa asosiy jarayonlar qanday bajarilishini ko‘rsatadi.',
    'Tizimda uchta aktor mavjud. **Mehmon** — hali tizimga kirmagan shaxs: u faqat ro‘yxatdan o‘tishi yoki kirishi mumkin. **Foydalanuvchi** — autentifikatsiyadan o‘tgan shaxs: u profilini boshqaradi, boshqa foydalanuvchilar bilan yozishadi, fayl va hikoyalar almashadi, guruh yaratadi. **Guruh administratori yoki egasi** foydalanuvchining barcha imkoniyatlariga ega, qo‘shimcha ravishda esa guruh a’zolari va sozlamalarini boshqaradi. Foydalanish holatlari diagrammasi 2.6-rasmda keltirilgan.',
  ),
  ...figure('2-6-use-case.png', '2.6', 'Foydalanish holatlari (use-case) diagrammasi', 13, 22),
  p(
    'Guruh chatlarida harakatlar rolga qarab cheklanadi. Ruxsatlar Telegram’dagi mantiqqa yaqin qilib loyihalangan va 2.4-jadvalda keltirilgan. Barcha ruxsatlar server tomonida GroupService, ChatService va MessageService servislarida tekshiriladi. Klient interfeysi esa ruxsat berilmagan tugmalarni ko‘rsatmaydi.',
  ),
  ...table(
    '2.4',
    'Guruh chatidagi rollar va ruxsatlar',
    ['Amal', 'A’zo', 'Administrator', 'Ega'],
    [
      ['Xabar yozish, o‘qish, fayl yuborish', '✓', '✓', '✓'],
      ['A’zo qo‘shish', '—', '✓', '✓'],
      ['A’zoni guruhdan chiqarish', '—', 'Faqat oddiy a’zoni', '✓ (hammani)'],
      ['Administrator tayinlash yoki olib tashlash', '—', '—', '✓'],
      ['Guruh nomi, tavsifi va rasmini o‘zgartirish', '—', '✓', '✓'],
      ['Chat tarixini tozalash', '—', '✓', '✓'],
      ['Guruhni butunlay o‘chirish', '—', '—', '✓'],
      ['Guruhdan chiqish', '✓', '✓', '✓ (egalik boshqa a’zoga o‘tadi)'],
    ],
    [6, 2, 3, 3.5],
  ),
  h3('Elektron pochta orqali kirish jarayoni.'),
  ...ps(
    'Tizimga kirish parolsiz amalga oshiriladi: foydalanuvchi elektron pochta manzilini kiritadi va unga yuborilgan 6 xonali kodni tasdiqlaydi (2.7-rasm). Server avval so‘rovlar chastotasini tekshiradi: bitta manzilga daqiqada bir martadan ko‘p kod yuborilmaydi, 15 daqiqalik oynada esa bitta manzil yoki bitta IP-manzildan beshtadan ortiq so‘rov qabul qilinmaydi. Kod kriptografik tasodifiy sonlar generatori yordamida yaratiladi va bazaga faqat PBKDF2 xeshi ko‘rinishida yoziladi. Kod 10 daqiqa amal qiladi, uni kiritishga esa beshtagacha urinish beriladi.',
    'Agar bu manzil bilan birinchi marta kirilayotgan bo‘lsa, server HMAC bilan imzolangan vaqtinchalik ro‘yxatdan o‘tish tokenini qaytaradi. Foydalanuvchi username va ismini kiritib, ro‘yxatdan o‘tishni yakunlaydi. Mavjud foydalanuvchi uchun esa darhol yangi sessiya yaratiladi. Har ikki holatda ham mijoz javob tanasida qisqa muddatli access tokenni, HttpOnly cookie’da esa refresh tokenni oladi.',
  ),
  ...figure('2-7-otp-sequence.png', '2.7', 'Elektron pochtaga yuborilgan kod orqali kirish ketma-ketlik diagrammasi', 16),
  h3('Real vaqtda xabar yuborish jarayoni.'),
  ...ps(
    'Xabar almashish jarayoni 2.8-rasmda ko‘rsatilgan. Brauzer tizimga kirgach, JWT token bilan SignalR habiga WebSocket ulanishini o‘rnatadi. Server har bir ulanishni “user:{id}” nomli guruhga qo‘shadi. Shu tufayli foydalanuvchining barcha qurilmalari va brauzer oynalari hodisalarni bir vaqtda oladi. Foydalanuvchi chatni ochganda ulanish qo‘shimcha ravishda “chat:{id}” guruhiga qo‘shiladi. Bu guruh faqat “yozmoqda” kabi tez-tez keladigan va faqat chatni ochib turganlar uchun dolzarb bo‘lgan hodisalar uchun ishlatiladi.',
    'Xabarning o‘zi REST so‘rovi orqali yuboriladi. Bu yondashuv xabarni saqlash va validatsiya qilishni oddiy HTTP semantikasi bilan (status kodlar, xatolar) bajarish imkonini beradi. Xabar bazaga yozilgach, u chat a’zolarining “user:{id}” guruhlariga MessageReceived hodisasi sifatida yuboriladi. Qabul qiluvchining brauzeri chat ochiq bo‘lsa, darhol MarkMessagesRead hab metodini chaqiradi. Server message_views jadvaliga yozuv qo‘shadi va jo‘natuvchiga MessagesRead hodisasini yuboradi. Natijada jo‘natuvchida xabar yonidagi bitta belgi ikki belgiga (✓✓) almashadi.',
  ),
  ...figure('2-8-message-sequence.png', '2.8', 'Real vaqtda xabar yuborish va o‘qilganlik belgisi ketma-ketlik diagrammasi', 16.5),
  h3('Guruh yaratish jarayoni.'),
  p(
    'Guruh yaratilganda chats, groups, chat_members jadvallariga yozuvlar va birinchi xizmat xabari (“… guruhini yaratdi”) bitta tranzaksiyada saqlanadi (2.9-rasm). Xizmat xabari muhim vazifani bajaradi: u barcha a’zolarga MessageReceived hodisasi sifatida yetib boradi va mijoz noma’lum chatdan xabar kelganda chatlar ro‘yxatini qayta yuklaydi. Shunday qilib, yangi guruh alohida hodisa turisiz, barcha a’zolarda bir zumda paydo bo‘ladi. A’zo qo‘shish, chiqarish, nom yoki rasmni o‘zgartirish ham xizmat xabarlari bilan qayd etiladi. Guruh ma’lumotlari o‘zgarganda esa qo‘shimcha GroupUpdated hodisasi yuboriladi.',
  ),
  ...figure('2-9-group-sequence.png', '2.9', 'Guruh yaratish va a’zo qo‘shish ketma-ketlik diagrammasi', 16.5),

  // ───────────────────────────────── 2.5
  h2('2.5. Xavfsizlikni loyihalash'),
  ...ps(
    'Messenjer shaxsiy yozishmalarni saqlagani uchun xavfsizlik loyihalashning boshidan hisobga olindi. Himoya bir necha darajada tashkil etilgan: autentifikatsiya, sessiyalarni boshqarish, avtorizatsiya, kiruvchi ma’lumotlar va fayllarni tekshirish.',
  ),
  h3('Autentifikatsiya va tokenlar.'),
  ...ps(
    'Tizim parollardan foydalanmaydi, shuning uchun parollar bazasining o‘g‘irlanishi yoki zaif parollar muammosi yo‘q. Bir martalik kodlar PBKDF2 algoritmi (HMAC-SHA256, 210 000 iteratsiya, 16 baytli tasodifiy tuz) bilan xeshlanadi. Kodni tekshirishda vaqtga bog‘liq bo‘lmagan (constant-time) taqqoslash qo‘llanadi. Google orqali kirishda server brauzerdan kelgan ID tokenning imzosini, muddatini va auditoriyasini (loyihaning Client ID’si) Google.Apis.Auth kutubxonasi yordamida tekshiradi.',
    'Muvaffaqiyatli kirishdan so‘ng ikki turdagi token beriladi. **Access token** — HS256 algoritmi bilan imzolangan JWT. U foydalanuvchi identifikatori va sessiya identifikatorini (sid) o‘z ichiga oladi va 15 daqiqa amal qiladi. U har bir API so‘rovining Authorization sarlavhasida, SignalR ulanishida va media oqimlarida (video) esa access_token parametrida yuboriladi. **Refresh token** — 30 kun amal qiladigan kriptografik tasodifiy qator. U JavaScript’dan o‘qib bo‘lmaydigan cookie’da (HttpOnly, ishlab chiqarish muhitida Secure, SameSite=Strict, faqat /api/auth yo‘li uchun) saqlanadi. Ma’lumotlar bazasiga refresh tokenning o‘zi emas, faqat HMAC-SHA256 xeshi yoziladi.',
    'Access token muddati tugaganda klientdagi HTTP interceptor 401 javobini ushlaydi, /api/auth/refresh so‘rovini yuboradi va asl so‘rovni yangi token bilan takrorlaydi (2.10-rasm). Bir vaqtda bir nechta so‘rov 401 olsa, ular bitta refresh so‘rovini baham ko‘radi. Har bir yangilashda refresh token almashtiriladi (rotatsiya). Shu sababli o‘g‘irlangan eski token qayta ishlatilsa, u endi hech qanday sessiyaga mos kelmaydi.',
  ),
  ...figure('2-10-token-lifecycle.png', '2.10', 'Access va refresh tokenlarning hayotiy sikli', 15.5),
  h3('Sessiyalarni boshqarish.'),
  p(
    'Har bir kirish alohida sessiya yaratadi. Unda qurilma nomi, tizim versiyasi, IP-manzil, yaratilgan va oxirgi faollik vaqti saqlanadi. Foydalanuvchi profil sozlamalarida barcha faol qurilmalarni ko‘rishi, begona qurilmani chiqarib yuborishi yoki joriy qurilmadan tashqari barcha sessiyalarni bir vaqtda yakunlashi mumkin. Sessiya yakunlanganda uning RevokedAt maydoni to‘ldiriladi va u bilan bog‘liq refresh token darhol yaroqsiz bo‘ladi. Access token esa muddati tugashi bilan, ya’ni ko‘pi bilan 15 daqiqada o‘z kuchini yo‘qotadi.',
  ),
  h3('Avtorizatsiya.'),
  p(
    'Barcha controllerlar va SignalR habi [Authorize] atributi bilan himoyalangan. Ammo tokenning mavjudligi yetarli emas: har bir chat bilan bog‘liq amalda server foydalanuvchining shu chat a’zosi ekanligini ma’lumotlar bazasidan tekshiradi. Masalan, xabarlarni o‘qish, yuborish, qidirish, media yuklash, JoinChat, SetTyping va MarkMessagesRead hab metodlari chaqirilganda shunday tekshiruv bajariladi. Foydalanuvchi faqat o‘z xabarini tahrirlashi yoki o‘chirishi mumkin. Guruhda esa 2.4-jadvaldagi rolga asoslangan qoidalar qo‘llanadi. Guruhdan chiqarilgan foydalanuvchi keyingi so‘rovdayoq chat ma’lumotlariga kirish huquqini yo‘qotadi.',
  ),
  h3('Kiruvchi ma’lumotlar va fayllar.'),
  ...ps(
    'API orqali keladigan har bir DTO uchun FluentValidation validatori yozilgan (matn uzunligi, identifikatorlar, sahifalash chegaralari va hokazo). Validatsiya ikki darajada bajariladi: ASP.NET Core’ning avtomatik tekshiruvi va servis ichidagi qayta tekshiruv. Kutilmagan xatolar ExceptionHandlingMiddleware tomonidan ushlanadi. Mijozga ichki tafsilotlarsiz, bir xil formatdagi javob qaytariladi, to‘liq ma’lumot esa server logiga yoziladi.',
    'Yuklanadigan fayllar hajmi cheklangan: rasm uchun 10 MB, boshqa fayllar uchun 50 MB. Rasm faylning kengaytmasiga emas, uning haqiqiy tarkibiga qarab ImageSharp kutubxonasi yordamida tekshiriladi. Faqat JPEG, PNG va WebP formatlari qabul qilinadi, rasm qayta kodlanadi, ya’ni yashirin metama’lumotlar va zararli qo‘shimchalar olib tashlanadi. Katta rasmlar uchun 256 pikselli kichik nusxa (thumbnail) yaratiladi. Fayllar diskda tasodifiy (GUID) nom bilan saqlanadi. Chatga yuborilgan rasm, video va fayllar faqat shu chat a’zosiga beriladi: server fayl biriktirilgan xabar chatining a’zolari orasida so‘rovchi borligini tekshiradi. Sozlamalarda yoqilgan bo‘lsa, har bir fayl saqlashdan oldin ClamAV antivirusi bilan tekshiriladi.',
    'Loyihalash jarayonida aniqlangan asosiy tahdidlar va ularga qarshi ko‘rilgan choralar 2.5-jadvalda umumlashtirilgan.',
  ),
  ...table(
    '2.5',
    'Asosiy tahdidlar va himoya choralari',
    ['Tahdid', 'Himoya choralari'],
    [
      ['Kodni tanlab topish (brute-force)', 'Kod 10 daqiqa amal qiladi, 5 tagacha urinish; kod so‘rash chastotasi e-pochta va IP bo‘yicha cheklangan'],
      ['Ma’lumotlar bazasining sizib chiqishi', 'Kodlar PBKDF2, refresh tokenlar HMAC-SHA256 xeshi ko‘rinishida saqlanadi; parollar yo‘q'],
      ['Tokenning o‘g‘irlanishi', 'Access token 15 daqiqa; refresh token HttpOnly cookie’da va har safar rotatsiya qilinadi; sessiyani masofadan yakunlash mumkin'],
      ['CSRF (so‘rovni soxtalashtirish)', 'Refresh cookie SameSite=Strict va faqat /api/auth yo‘li uchun; boshqa so‘rovlar Authorization sarlavhasini talab qiladi'],
      ['XSS (skript kiritish)', 'Angular shablonlari ma’lumotlarni avtomatik ekranlaydi; refresh token JavaScript’ga ko‘rinmaydi; access token qisqa muddatli'],
      ['Begona chatga kirish', 'Har bir REST va hab chaqiruvida a’zolik tekshiruvi; guruhda rolga asoslangan ruxsatlar'],
      ['Zararli yoki soxta fayl', 'Hajm cheklovlari, tarkib bo‘yicha format tekshiruvi, rasmni qayta kodlash, ClamAV skaneri'],
      ['Tinglab olish (MITM)', 'Barcha trafik HTTPS/WSS orqali; ishlab chiqarish muhitida cookie faqat Secure rejimida'],
    ],
    [4, 9],
  ),
  p(
    'Kelajakda xavfsizlikni kuchaytirish uchun ikki bosqichli autentifikatsiya (bazada two_factor_auth jadvali tayyor), maxfiy chatlar uchun uchdan-uchgacha shifrlash (secret_chats jadvali) va foydalanuvchilarni bloklash (blocked_users jadvali) funksiyalarini qo‘shish rejalashtirilgan.',
  ),

  h2('2-bob bo‘yicha xulosa'),
  ...ps(
    'Ikkinchi bobda “Milliy chat” tizimi loyihalandi. Server qismi uchun .NET 8, ASP.NET Core, SignalR, Entity Framework Core va PostgreSQL, klient qismi uchun Angular 22 texnologiyalari tanlandi va asoslandi. Server kodi Domain, Application, Infrastructure va API qatlamlaridan iborat Clean Architecture asosida tashkil etildi. Bu biznes-mantiqni texnik tafsilotlardan ajratish va tizimni kengaytirishni osonlashtirish imkonini berdi.',
    'Ma’lumotlar bazasi to‘qqizta sxemaga ajratilgan 32 ta jadvaldan iborat qilib loyihalandi. Shaxsiy va guruh chatlari yagona chats modeli orqali ifodalandi, katta hajmli ma’lumotlar uchun kursorli sahifalash tanlandi. Use-case va ketma-ketlik diagrammalari yordamida tizimga kirish, real vaqtda xabar almashish, guruh yaratish va tokenlarni yangilash jarayonlari modellashtirildi. Xavfsizlik tizimi parolsiz autentifikatsiya, xeshlangan kod va tokenlar, qisqa muddatli JWT va rotatsiya qilinadigan refresh token, a’zolik va rolga asoslangan avtorizatsiya hamda fayllarni ko‘p bosqichli tekshirish asosida qurildi. Keyingi bobda ushbu loyihaning dasturiy amalga oshirilishi ko‘rib chiqiladi.',
  ),
];
