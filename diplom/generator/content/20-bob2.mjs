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
      ['Klient', 'Web Crypto API (X25519, HKDF, HMAC, AES-GCM)', 'brauzer', 'Maxfiy chatlarda uchdan-uchgacha shifrlash'],
      ['Klient', 'IndexedDB', 'brauzer', 'Maxfiy chat kalitlari va tarixini faqat qurilmada saqlash'],
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
    '**Domain** — tizimning biznes obyektlari (entity): User, Session, Chat, ChatMember, Group, Message, Attachment, File, Photo, Story, Organization, OrganizationMember, SecretChat, SecretMessage, SecretFile va boshqalar, shuningdek ChatType, ChatMemberRole, MessageServiceAction, ScriptPreference, SecretChatStatus kabi sanab o‘tiladigan turlar. Tashqi bog‘liqligi yo‘q biznes-qoida sifatida o‘zbek yozuvlari o‘rtasidagi transliteratsiya (UzbekTransliterator) ham shu qatlamda joylashgan. Bu qatlam boshqa hech bir loyihaga bog‘liq emas;',
    '**Application** — foydalanish holatlari (use-case) amalga oshiriladigan qatlam. Unda servislar (AuthService, ChatService, GroupService, MessageService, StoryService, OrganizationMembershipService, SecretChatService…), ma’lumot uzatish obyektlari (DTO), FluentValidation validatorlari, entity’larni DTOga o‘giruvchi Mapper va yangi obyektlarni yaratuvchi Factory sinflari hamda tashqi dunyo bilan aloqa uchun “portlar” — interfeyslar (IMessageRepository, IChatRealtimeNotifier, IEmailSender, IFileStorage, ISecretChatRepository, ISecretFileStorage…) joylashgan. Application faqat Domain’ga bog‘liq;',
    '**Infrastructure** — Application interfeyslarining texnik amalga oshirilishi: EF Core ma’lumotlar konteksti (ChatDb) va repozitoriylar, JWT tokenlar chiqaruvchisi, PBKDF2 va HMAC xeshlovchilari, Google token tekshiruvchisi, SMTP orqali xat yuboruvchi, ClamAV skaneri, ImageSharp va FFmpeg asosidagi media ishlov beruvchilar, onlayn holat kuzatuvchilari, shifrlangan fayllar ombori (LocalSecretFileStorage) va fon ishlari (SearchTextBackfill, SecretChatCleanup);',
    '**API** — kompozitsiya ildizi va HTTP transport qatlami: REST controllerlar, SignalR habi (ChatHub), xatolarni markazlashgan holda qayta ishlovchi va xavfsizlik sarlavhalarini qo‘shuvchi middleware’lar hamda barcha bog‘liqliklarni ro‘yxatga oluvchi kengaytma metodlar.',
  ]),
  ...ps(
    'Application qatlami ma’lumotlar bazasi yoki SignalR haqida hech narsa bilmaydi. Masalan, xabar yuborilgandan so‘ng MessageService faqat IChatRealtimeNotifier interfeysining MessageCreatedAsync metodini chaqiradi. Bu interfeysning SignalR orqali ishlaydigan amalga oshirilishi (SignalRChatRealtimeNotifier) API qatlamida joylashgan va bog‘liqliklar konteynerida ro‘yxatdan o‘tkazilgan. Bu yondashuv “bog‘liqliklarni teskari aylantirish” (Dependency Inversion) tamoyilining amaliy ko‘rinishidir.',
    'Application qatlami ichida kod texnik vazifalar bo‘yicha emas, **funksiyalar (feature) bo‘yicha** guruhlangan: Authentication, Chats, Groups, Messages, Contacts, Profiles, Stories, Users, Files, Organizations, SecretChats. Har bir funksiya papkasi o‘z servislari, DTOlari, interfeyslari, validatorlari, mapper va factory sinflarini o‘z ichiga oladi. Bu tuzilma yangi funksiyani qo‘shishda o‘zgarishlarni bitta joyda to‘plash va kodni tushunishni osonlashtiradi. Loyihada qabul qilingan qoidalar (qatlam chegaralari, UTC vaqt, sahifalash, validatsiya, nomlash) repozitoriydagi AGENTS.md hujjatida qayd etilgan.',
    'HTTP so‘rov qatlamlar bo‘ylab qanday o‘tishi xabar yuborish misolida 2.3-rasmda ko‘rsatilgan. Controller so‘rovni qabul qilib, foydalanuvchi identifikatorini JWT tokendan oladi va servisni chaqiradi. Servis ma’lumotlarni validatsiya qiladi, foydalanuvchining chat a’zosi ekanligini tekshiradi, Factory yordamida yangi Message obyektini yaratadi va repozitoriy orqali saqlaydi. Tranzaksiya muvaffaqiyatli yakunlangach, real vaqt xabarnomasi chat a’zolariga yuboriladi. Bu tartib mijozlar hech qachon bazaga yozilmagan xabar haqida bildirishnoma olmasligini kafolatlaydi.',
  ),
  ...figure('2-3-request-flow.png', '2.3', 'Xabar yuborish so‘rovining qatlamlar bo‘ylab o‘tishi', 13.5),
  h3('Klient qismining arxitekturasi.'),
  ...ps(
    'Angular ilovasi ham qatlamlarga ajratilgan. **core** papkasida butun ilova uchun umumiy xizmatlar joylashgan: autentifikatsiya servisi (AuthService), har bir so‘rovga token qo‘shuvchi va muddati o‘tgan tokenni avtomatik yangilovchi HTTP interceptor, himoyalangan sahifalarni qo‘riqlovchi guard, mavzuni (yorug‘ va qorong‘i) boshqaruvchi servis. **features** papkasida funksional modullar joylashgan: kirish sahifasi (auth), taklif havolasi sahifasi (invite) va chat moduli. Chat modulining data-access qatlamida ChatApiService (REST so‘rovlar va ilova holati signallari) hamda ChatRealtimeService (SignalR ulanishi va hodisalar oqimi) servislari bor. Komponentlar faqat shu servislar bilan ishlaydi. Maxfiy chatlar alohida **secret** papkasida joylashgan: kriptografik qism (secret-crypto.ts) Angular’ga umuman bog‘liq emas, kalitlar va tarixni IndexedDB’da saqlovchi ombor, protokol holatini boshqaruvchi servis va suhbat komponenti esa uning ustiga quriladi.',
    '**shared/text** papkasida serverdagi transliteratorning TypeScript’dagi aynan nusxasi va xabarlarni foydalanuvchi tanlagan yozuvda ko‘rsatuvchi uzScript pipe’i joylashgan. **shared/ui** papkasida loyihaning dizayn tizimi (design system) komponentlari joylashgan: tugma, ikonkali tugma, matn maydoni, checkbox, banner, tasdiqlash oynasi, tashkilot belgisi (org-badge) va boshqalar. Barcha ranglar CSS o‘zgaruvchilari (design token) orqali berilgan. Shu sababli yorug‘ va qorong‘i mavzular o‘rtasida o‘tish faqat o‘zgaruvchilar qiymatini almashtirish orqali amalga oshadi.',
  ),

  // ───────────────────────────────── 2.3
  h2('2.3. Ma’lumotlar bazasini loyihalash'),
  ...ps(
    'Ma’lumotlar bazasi “kod birinchi” (code-first) yondashuvida loyihalandi: jadvallar tuzilmasi Domain qatlamidagi entity sinflari va Infrastructure qatlamidagi IEntityTypeConfiguration konfiguratsiyalari asosida EF Core tomonidan yaratiladi. Sxemadagi har bir o‘zgarish migratsiya ko‘rinishida saqlanadi va versiyalar nazorati tizimida kuzatiladi.',
    'Jadvallar mantiqiy vazifasiga ko‘ra PostgreSQL’ning o‘nta sxemasiga (schema) ajratilgan. Bu yondashuv katta bazada yo‘nalishni osonlashtiradi, kelajakda esa turli xizmatlarga faqat kerakli sxemalarga kirish huquqini berish imkonini yaratadi. Jami 36 ta jadval loyihalangan. Ularning bir qismi (kanallar, qo‘ng‘iroqlar, stikerlar, botlar, papkalar, so‘rovnomalar, reaksiyalar) kelajakdagi funksiyalar uchun oldindan tayyorlangan. Sxemalar tarkibi 2.2-jadvalda keltirilgan.',
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
    'Tizimning joriy funksiyalarini ta’minlovchi asosiy jadvallar va ular o‘rtasidagi bog‘lanishlar uchta ER-diagrammada ko‘rsatilgan. 2.4-rasmda foydalanuvchilar, sessiyalar, chatlar va guruhlar, 2.5-rasmda xabarlar, fayllar va hikoyalar, 2.6-rasmda esa tizimning o‘ziga xos imkoniyatlari — transliteratsiya, tashkilotlar va maxfiy chatlar uchun qo‘shilgan jadval va ustunlar tasvirlangan.',
  ),
  ...ps(
    'Modelning markazida **chats** jadvali turadi. Shaxsiy chat ham, guruh ham bitta chats yozuvi bilan ifodalanadi va ular Type maydoni (1 — shaxsiy, 2 — guruh) bilan farqlanadi. Chat ishtirokchilari **chat_members** jadvalida saqlanadi. Bu jadval users va chats o‘rtasidagi “ko‘pdan-ko‘pga” bog‘lanishni amalga oshiradi va har bir a’zoning rolini (1 — a’zo, 2 — administrator, 3 — ega) hamda qo‘shilgan vaqtini saqlaydi. Guruhga xos ma’lumotlar (nomi, tavsifi, rasmi, yaratuvchisi) alohida **groups** jadvaliga chiqarilgan va chats bilan “birga-bir” bog‘langan. Buni ChatId ustunidagi unique indeks ta’minlaydi. Bu yechim tufayli xabarlar, biriktirmalar, qidiruv va real vaqt mexanizmlari shaxsiy chatlar va guruhlar uchun bir xil ishlaydi.',
    '**users** jadvalida Email va Username ustunlari unique indekslar bilan himoyalangan. Foydalanuvchi sessiyalari **sessions** jadvalida saqlanadi: qurilma nomi, IP-manzil, oxirgi faollik vaqti, amal qilish muddati, bekor qilingan vaqti (RevokedAt) va refresh tokenning xeshi. Refresh token xeshi ustunida ham unique indeks bor, bu token bo‘yicha sessiyani tez topish imkonini beradi. Bir martalik kodlar **email_verification_codes** jadvalida faqat xesh ko‘rinishida, urinishlar soni va amal qilish muddati bilan birga saqlanadi.',
  ),
  landscapeFigure('2-4-er-users-chats.png', '2.4', 'ER-diagramma: foydalanuvchilar, sessiyalar, chatlar va guruhlar'),
  landscapeFigure('2-5-er-messages.png', '2.5', 'ER-diagramma: xabarlar, fayllar va hikoyalar'),
  ...ps(
    '**organizations** jadvalida har bir tashkilot bitta e-pochta domeni bilan ifodalanadi (Domain ustuni unique). **organization_members** jadvali foydalanuvchining tashkilotga a’zoligini va rolini (1 — a’zo, 2 — admin) saqlaydi. UserId ustunidagi unique indeks bitta foydalanuvchi faqat bitta tashkilotga tegishli bo‘lishini kafolatlaydi: e-pochta manzili bitta, demak domen ham bitta. **groups** jadvaliga OrganizationId ustuni qo‘shildi: u to‘ldirilgan guruh shu tashkilotning yopiq domen guruhi hisoblanadi. InviteLink ustunida esa taklif havolasining maxfiy tokeni saqlanadi.',
    'Maxfiy chatlar uchun **secret_chats** jadvali qayta loyihalandi. Avvalgi loyihada unda shifrlash kalitining o‘zi (EncryptionKey) saqlanishi ko‘zda tutilgan edi. Bu uchdan-uchgacha shifrlash tamoyiliga zid: kalit serverda bo‘lsa, server yozishmani o‘qiy oladi. Yangi loyihada jadvalda faqat ikkala tomonning **ochiq** kalitlari, chat bog‘langan qurilmalar (sessiyalar), holat va har bir tomon yuborgan oxirgi xabar tartib raqami saqlanadi. **secret_messages** va **secret_files** jadvallari esa faqat hali yetkazilmagan shifrlangan bloblarni vaqtincha saqlaydi: qabul qiluvchi qurilma ularni olganini tasdiqlashi bilan yozuvlar o‘chiriladi. (SecretChatId, SenderSessionId, Seq) ustunlaridagi unique indeks bitta xabarning ikki marta saqlanishiga yo‘l qo‘ymaydi.',
    'Transliteratsiya uchun **users** jadvaliga ScriptPreference (1 — asl holida, 2 — lotin, 3 — kirill), **messages** jadvaliga esa SearchText ustuni qo‘shildi. SearchText xabar matnining lotin yozuviga o‘girilgan, kichik harfli va tutuq belgilari birxillashtirilgan nusxasi bo‘lib, faqat qidiruv uchun ishlatiladi.',
  ),
  ...figure('2-11-er-new-tables.png', '2.6', 'ER-diagramma: tashkilotlar, maxfiy chatlar va transliteratsiya uchun qo‘shilgan jadval va ustunlar', 16.5),
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
      ['SearchText', 'text, NULL', 'Qidiruv kaliti: matnning lotin, kichik harfli, tutuq belgilari birxillashtirilgan nusxasi'],
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
    '**Indekslar.** Tez-tez bajariladigan so‘rovlar uchun indekslar yaratilgan: users(Email), users(Username), sessions(RefreshTokenHash) — unique; sessions(UserId, RevokedAt, ExpiresAt), email_verification_codes(Email, Purpose, ExpiresAt) — tarkibiy; groups(ChatId), organizations(Domain), organization_members(UserId), secret_messages(SecretChatId, SenderSessionId, Seq) — unique.',
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
    'Tizimda uchta aktor mavjud. **Mehmon** — hali tizimga kirmagan shaxs: u faqat ro‘yxatdan o‘tishi yoki kirishi mumkin. **Foydalanuvchi** — autentifikatsiyadan o‘tgan shaxs: u profilini boshqaradi, boshqa foydalanuvchilar bilan yozishadi, fayl va hikoyalar almashadi, guruh yaratadi. Bundan tashqari, u xabarlarni o‘zi tanlagan yozuvda (lotin yoki kirill) ko‘radi, boshqa foydalanuvchi bilan maxfiy chat ochadi va taklif havolasi orqali yopiq guruhga qo‘shiladi. **Guruh administratori yoki egasi** foydalanuvchining barcha imkoniyatlariga ega, qo‘shimcha ravishda esa guruh a’zolari, sozlamalari va taklif havolasini boshqaradi. Foydalanish holatlari diagrammasi 2.7-rasmda keltirilgan.',
  ),
  ...figure('2-6-use-case.png', '2.7', 'Foydalanish holatlari (use-case) diagrammasi', 12, 22),
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
      ['Taklif havolasini yaratish, yangilash, bekor qilish', '—', '✓', '✓'],
      ['Chat tarixini tozalash', '—', '✓', '✓'],
      ['Guruhni butunlay o‘chirish', '—', '—', '✓'],
      ['Guruhdan chiqish', '✓', '✓', '✓ (egalik boshqa a’zoga o‘tadi)'],
    ],
    [6, 2, 3, 3.5],
  ),
  h3('Elektron pochta orqali kirish jarayoni.'),
  ...ps(
    'Tizimga kirish parolsiz amalga oshiriladi: foydalanuvchi elektron pochta manzilini kiritadi va unga yuborilgan 6 xonali kodni tasdiqlaydi (2.8-rasm). Server avval so‘rovlar chastotasini tekshiradi: bitta manzilga daqiqada bir martadan ko‘p kod yuborilmaydi, 15 daqiqalik oynada esa bitta manzil yoki bitta IP-manzildan beshtadan ortiq so‘rov qabul qilinmaydi. Kod kriptografik tasodifiy sonlar generatori yordamida yaratiladi va bazaga faqat PBKDF2 xeshi ko‘rinishida yoziladi. Kod 10 daqiqa amal qiladi, uni kiritishga esa beshtagacha urinish beriladi.',
    'Agar bu manzil bilan birinchi marta kirilayotgan bo‘lsa, server HMAC bilan imzolangan vaqtinchalik ro‘yxatdan o‘tish tokenini qaytaradi. Foydalanuvchi username va ismini kiritib, ro‘yxatdan o‘tishni yakunlaydi. Mavjud foydalanuvchi uchun esa darhol yangi sessiya yaratiladi. Har ikki holatda ham mijoz javob tanasida qisqa muddatli access tokenni, HttpOnly cookie’da esa refresh tokenni oladi.',
  ),
  ...figure('2-7-otp-sequence.png', '2.8', 'Elektron pochtaga yuborilgan kod orqali kirish ketma-ketlik diagrammasi', 16),
  h3('Real vaqtda xabar yuborish jarayoni.'),
  ...ps(
    'Xabar almashish jarayoni 2.9-rasmda ko‘rsatilgan. Brauzer tizimga kirgach, JWT token bilan SignalR habiga WebSocket ulanishini o‘rnatadi. Server har bir ulanishni “user:{id}” nomli guruhga qo‘shadi. Shu tufayli foydalanuvchining barcha qurilmalari va brauzer oynalari hodisalarni bir vaqtda oladi. Foydalanuvchi chatni ochganda ulanish qo‘shimcha ravishda “chat:{id}” guruhiga qo‘shiladi. Bu guruh faqat “yozmoqda” kabi tez-tez keladigan va faqat chatni ochib turganlar uchun dolzarb bo‘lgan hodisalar uchun ishlatiladi.',
    'Xabarning o‘zi REST so‘rovi orqali yuboriladi. Bu yondashuv xabarni saqlash va validatsiya qilishni oddiy HTTP semantikasi bilan (status kodlar, xatolar) bajarish imkonini beradi. Xabar bazaga yozilgach, u chat a’zolarining “user:{id}” guruhlariga MessageReceived hodisasi sifatida yuboriladi. Qabul qiluvchining brauzeri chat ochiq bo‘lsa, darhol MarkMessagesRead hab metodini chaqiradi. Server message_views jadvaliga yozuv qo‘shadi va jo‘natuvchiga MessagesRead hodisasini yuboradi. Natijada jo‘natuvchida xabar yonidagi bitta belgi ikki belgiga (✓✓) almashadi.',
  ),
  ...figure('2-8-message-sequence.png', '2.9', 'Real vaqtda xabar yuborish va o‘qilganlik belgisi ketma-ketlik diagrammasi', 16.5),
  h3('Guruh yaratish jarayoni.'),
  p(
    'Guruh yaratilganda chats, groups, chat_members jadvallariga yozuvlar va birinchi xizmat xabari (“… guruhini yaratdi”) bitta tranzaksiyada saqlanadi (2.10-rasm). Xizmat xabari muhim vazifani bajaradi: u barcha a’zolarga MessageReceived hodisasi sifatida yetib boradi va mijoz noma’lum chatdan xabar kelganda chatlar ro‘yxatini qayta yuklaydi. Shunday qilib, yangi guruh alohida hodisa turisiz, barcha a’zolarda bir zumda paydo bo‘ladi. A’zo qo‘shish, chiqarish, nom yoki rasmni o‘zgartirish ham xizmat xabarlari bilan qayd etiladi. Guruh ma’lumotlari o‘zgarganda esa qo‘shimcha GroupUpdated hodisasi yuboriladi.',
  ),
  ...figure('2-9-group-sequence.png', '2.10', 'Guruh yaratish va a’zo qo‘shish ketma-ketlik diagrammasi', 16.5),
  h3('Tashkilotga avtomatik qo‘shilish jarayoni.'),
  ...ps(
    'Tashkilot rejimi alohida ro‘yxat yoki sozlamalarni talab qilmaydi: **tashkilot — bu e-pochta domenining o‘zi**. Foydalanuvchi tasdiqlangan pochta bilan (bir martalik kod yoki Google hisobi orqali) kirganda server manzilning oxirgi “@” belgisidan keyingi qismini ajratib oladi va uni normallashtiradi: kichik harflarga o‘tkazadi, oxiridagi nuqtani olib tashlaydi, domen formatini tekshiradi. “tuit.uz” va “student.tuit.uz” ikki alohida tashkilot hisoblanadi, “evil-tuit.uz” kabi o‘xshash domenlar esa hech qachon “tuit.uz” bilan mos kelmaydi, chunki domenlar faqat to‘liq tengligi bo‘yicha solishtiriladi.',
    'Hamma ro‘yxatdan o‘ta oladigan umumiy pochta xizmatlari (gmail.com, mail.ru, yandex.ru, umail.uz, vaqtinchalik pochta xizmatlari va boshqalar — jami 40 ga yaqin domen) tashkilot hisoblanmaydi. Ularning foydalanuvchilari tashkilot belgisini olmaydi va domen guruhlariga avtomatik qo‘shilmaydi. Jarayon 2.11-rasmda ko‘rsatilgan: domendan birinchi bo‘lib kirgan foydalanuvchi tashkilotning admini va uning yopiq guruhining egasi bo‘ladi, keyingilar esa a’zo sifatida guruhga avtomatik qo‘shiladi. Har bir qo‘shilish guruhda “… @tuit.uz pochtasi bilan guruhga qo‘shildi” xizmat xabari bilan qayd etiladi.',
    'Domen guruhi **yopiq**: uni qidiruv orqali topib bo‘lmaydi. Tashqaridan (masalan, gmail.com foydalanuvchisi) unga faqat admin qo‘shganda yoki taklif havolasi orqali kirish mumkin. Havola tokeni 128 bitli kriptografik tasodifiy son bo‘lib, uni taxmin qilib topish amalda imkonsiz. Admin havolani istalgan vaqtda yangilashi yoki bekor qilishi mumkin, shunda eski havola darhol ishlamay qoladi. Tashkilot guruhlari uchun a’zolar chegarasi oddiy guruhlardagi 200 o‘rniga 5000 qilib belgilangan, chunki bunday guruhga butun fakultet yoki kompaniya kirishi mumkin.',
  ),
  ...figure('2-14-organization-join.png', '2.11', 'Foydalanuvchini tashkilotga va uning domen guruhiga qo‘shish algoritmi', 9.5, 21),

  // ───────────────────────────────── 2.5
  h2('2.5. Xavfsizlikni loyihalash'),
  ...ps(
    'Messenjer shaxsiy yozishmalarni saqlagani uchun xavfsizlik loyihalashning boshidan hisobga olindi. Himoya bir necha darajada tashkil etilgan: autentifikatsiya, sessiyalarni boshqarish, avtorizatsiya, kiruvchi ma’lumotlar va fayllarni tekshirish, veb-ilovaning o‘zini himoyalash. Serverning o‘zidan ham himoyalanishi kerak bo‘lgan yozishmalar uchun esa maxfiy chatlar protokoli loyihalandi (2.6-bo‘lim).',
  ),
  h3('Autentifikatsiya va tokenlar.'),
  ...ps(
    'Tizim parollardan foydalanmaydi, shuning uchun parollar bazasining o‘g‘irlanishi yoki zaif parollar muammosi yo‘q. Bir martalik kodlar PBKDF2 algoritmi (HMAC-SHA256, 210 000 iteratsiya, 16 baytli tasodifiy tuz) bilan xeshlanadi. Kodni tekshirishda vaqtga bog‘liq bo‘lmagan (constant-time) taqqoslash qo‘llanadi. Google orqali kirishda server brauzerdan kelgan ID tokenning imzosini, muddatini va auditoriyasini (loyihaning Client ID’si) Google.Apis.Auth kutubxonasi yordamida tekshiradi.',
    'Muvaffaqiyatli kirishdan so‘ng ikki turdagi token beriladi. **Access token** — HS256 algoritmi bilan imzolangan JWT. U foydalanuvchi identifikatori va sessiya identifikatorini (sid) o‘z ichiga oladi va 15 daqiqa amal qiladi. U har bir API so‘rovining Authorization sarlavhasida, SignalR ulanishida va media oqimlarida (video) esa access_token parametrida yuboriladi. **Refresh token** — 30 kun amal qiladigan kriptografik tasodifiy qator. U JavaScript’dan o‘qib bo‘lmaydigan cookie’da (HttpOnly, ishlab chiqarish muhitida Secure, SameSite=Strict, faqat /api/auth yo‘li uchun) saqlanadi. Ma’lumotlar bazasiga refresh tokenning o‘zi emas, faqat HMAC-SHA256 xeshi yoziladi.',
    'Access token muddati tugaganda klientdagi HTTP interceptor 401 javobini ushlaydi, /api/auth/refresh so‘rovini yuboradi va asl so‘rovni yangi token bilan takrorlaydi (2.12-rasm). Bir vaqtda bir nechta so‘rov 401 olsa, ular bitta refresh so‘rovini baham ko‘radi. Har bir yangilashda refresh token almashtiriladi (rotatsiya). Shu sababli o‘g‘irlangan eski token qayta ishlatilsa, u endi hech qanday sessiyaga mos kelmaydi.',
  ),
  ...figure('2-10-token-lifecycle.png', '2.12', 'Access va refresh tokenlarning hayotiy sikli', 15.5),
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
  ),
  h3('Veb-ilovani himoyalash.'),
  ...ps(
    'Brauzerda ishlaydigan ilovaning eng xavfli zaifligi — begona skriptning sahifaga kirib olishi (XSS). Maxfiy chatlarda bu ayniqsa muhim: sahifada ishlayotgan har qanday skript shifrlash kalitlaridan foydalana oladi. Shu sababli klient ilovasi qat’iy **Content Security Policy** (CSP) bilan himoyalangan. Skriptlar faqat ilovaning o‘z manzilidan va Google Identity xizmatidan yuklanadi, sahifa ichidagi skriptlarga esa faqat SHA-256 xeshi oldindan ro‘yxatga olinganlari ruxsat etiladi. Tarmoq so‘rovlari faqat ilova serveriga yuboriladi, plaginlar (object-src) taqiqlangan, sahifani boshqa sayt ichiga joylashtirish (frame-ancestors) man etilgan.',
    'API javoblariga ham xavfsizlik sarlavhalari qo‘shiladi: X-Content-Type-Options: nosniff (brauzer javob turini “taxmin qilib”, uni sahifa sifatida bajarmasligi uchun), Content-Security-Policy: default-src none (API javobi hech qachon sahifa sifatida ishlamasligi uchun) va Referrer-Policy: no-referrer. Refresh token cookie’si boshqa saytdan faqat ruxsat etilgan manzillar (Cors:AllowedOrigins) ro‘yxati sozlangandagina yuboriladi.',
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
      ['XSS (skript kiritish)', 'Angular shablonlari ma’lumotlarni avtomatik ekranlaydi; qat’iy CSP; refresh token JavaScript’ga ko‘rinmaydi; access token qisqa muddatli'],
      ['Begona chatga kirish', 'Har bir REST va hab chaqiruvida a’zolik tekshiruvi; guruhda rolga asoslangan ruxsatlar'],
      ['Zararli yoki soxta fayl', 'Hajm cheklovlari, tarkib bo‘yicha format tekshiruvi, rasmni qayta kodlash, ClamAV skaneri'],
      ['Tinglab olish (MITM)', 'Barcha trafik HTTPS/WSS orqali; ishlab chiqarish muhitida cookie faqat Secure rejimida'],
      ['Server yoki ma’lumotlar bazasi buzilishi', 'Maxfiy chatlarda uchdan-uchgacha shifrlash: serverda faqat ochiq kalitlar va vaqtincha shifrlangan bloblar'],
      ['Xabarni takrorlash (replay) yoki almashtirish', 'Maxfiy chatda har xabar tartib raqami (seq) bilan: takrori 409 bilan rad etiladi; AES-GCM AAD maydoni xabarni chat, yo‘nalish va raqamga bog‘laydi'],
      ['Yopiq guruhga ruxsatsiz kirish', 'Guruh qidiruvda ko‘rinmaydi; 128 bitli taklif tokeni; havolani yangilash yoki bekor qilish mumkin'],
      ['Begona domen bilan tashkilotga kirish', 'Domen faqat tasdiqlangan pochtadan olinadi va to‘liq tengligi bo‘yicha solishtiriladi; umumiy pochta domenlari chiqarib tashlangan'],
    ],
    [4, 9],
  ),
  p(
    'Kelajakda xavfsizlikni kuchaytirish uchun ikki bosqichli autentifikatsiya (bazada two_factor_auth jadvali tayyor), foydalanuvchilarni bloklash (blocked_users jadvali) va OneID tizimi orqali shaxsni davlat darajasida tasdiqlash imkoniyatlarini qo‘shish rejalashtirilgan.',
  ),

  // ───────────────────────────────── 2.6
  h2('2.6. Maxfiy chatlar kriptografik protokolini loyihalash'),
  ...ps(
    'Oddiy chatlarda xabarlar serverga TLS orqali shifrlangan holda yetib keladi, lekin serverda ochiq matn ko‘rinishida saqlanadi. Bu Telegram’ning bulutli chatlari modeliga mos keladi va barcha qurilmalarda sinxronizatsiya, qidiruv, transliteratsiya kabi imkoniyatlarni beradi. Ammo ayrim yozishmalar serverning o‘zidan ham himoyalanishi kerak: server buzilganda, ma’lumotlar bazasi sizib chiqqanda yoki administrator ruxsatsiz kirganda ham ularni o‘qib bo‘lmasligi lozim. Buning uchun **maxfiy chatlar** — uchdan-uchgacha (end-to-end, E2E) shifrlangan suhbatlar loyihalandi.',
  ),
  h3('Tahdid modeli va model tanlovi.'),
  ...ps(
    'Protokolda server “halol, lekin qiziquvchan” ishtirokchi deb qaraladi: u xabarlarni to‘g‘ri yetkazadi, lekin o‘zidan o‘tgan har qanday ma’lumotni o‘qishga urinishi mumkin. Maqsad — server faqat quyidagilarni bilishi: kim kimga, qachon va qancha hajmdagi xabar yubordi. Xabarlarning mazmuni, fayllar, ularning nomi va turi, taymer sozlamalari esa serverga ko‘rinmasligi kerak.',
    'Ikki model ko‘rib chiqildi. **Qurilmaga bog‘langan model** (Telegram maxfiy chatlari) — chat ikki aniq qurilma o‘rtasida ochiladi va boshqa qurilmalarda ko‘rinmaydi. **Ko‘p qurilmali model** (Signal, WhatsApp) — har bir xabar foydalanuvchining barcha qurilmalari uchun alohida shifrlanadi. Ikkinchi model ancha murakkab: har bir qurilmaning kalitlarini boshqarish va yangi qurilmani xavfsiz qo‘shish mexanizmi kerak bo‘ladi. Shu sababli birinchi versiya uchun qurilmaga bog‘langan model tanlandi: oddiy chatlar bulutda qoladi, maxfiy chatlar esa faqat qurilmada yashaydi.',
  ),
  h3('Kriptografik primitivlar.'),
  ...ps(
    'Kriptografiyani noldan yozish xavfli, shuning uchun protokol faqat brauzerga o‘rnatilgan, standartlashtirilgan **Web Crypto API** primitivlaridan quriladi. Uchinchi tomon kutubxonalari ishlatilmaydi. Barcha maxfiy kalitlar “extractable: false” rejimida yaratiladi: sahifadagi skript ular yordamida shifrlashi mumkin, lekin kalitning baytlarini o‘qiy olmaydi. Qo‘llanilgan primitivlar 2.6-jadvalda keltirilgan.',
  ),
  ...table(
    '2.6',
    'Maxfiy chatlarda qo‘llanilgan kriptografik primitivlar',
    ['Primitiv', 'Standart', 'Vazifasi'],
    [
      ['X25519', 'RFC 7748', 'Diffi-Xellman kalit kelishuvi: har bir qurilma har bir chat uchun yangi kalit jufti yaratadi, umumiy sir hech qachon tarmoq orqali uzatilmaydi'],
      ['HKDF-SHA-256', 'RFC 5869', 'Umumiy sirdan ikki yo‘nalish uchun ikkita zanjir kalitini chiqarish'],
      ['HMAC-SHA-256', 'RFC 2104', 'Zanjir kalitidan har bir xabar kaliti va keyingi zanjir kalitini hosil qilish (ratchet)'],
      ['AES-256-GCM', 'NIST SP 800-38D', 'Xabar va fayllarni shifrlash va butunligini tekshirish; AAD maydoni xabarni chatga, yo‘nalishga va tartib raqamiga bog‘laydi'],
      ['SHA-256', 'FIPS 180-4', 'Kalit izi (fingerprint): ikkala ochiq kalitdan emoji va raqamlar ko‘rinishida'],
    ],
    [2.6, 2.6, 8],
  ),
  h3('Kalit almashish (handshake).'),
  ...ps(
    'Maxfiy chat ochish jarayoni 2.13-rasmda ko‘rsatilgan. Tashabbuskorning brauzeri shu chat uchun X25519 kalit juftini yaratadi va serverga faqat 32 baytli ochiq kalitni yuboradi. Server Pending holatidagi chatni yaratadi, uni tashabbuskorning joriy sessiyasiga bog‘laydi va suhbatdoshning barcha onlayn qurilmalariga SecretChatRequested hodisasini yuboradi. Suhbatdosh qaysi qurilmada taklifni qabul qilsa, chat o‘sha qurilmaga bog‘lanadi: u ham o‘z kalit juftini yaratadi va ochiq kalitini qaytaradi. Server chatni Active holatiga o‘tkazadi va tashabbuskorga SecretChatAccepted hodisasi orqali suhbatdosh ochiq kalitini yetkazadi.',
    'Shundan so‘ng ikkala tomon mustaqil ravishda bir xil umumiy sirni hisoblaydi: X25519(o‘z yopiq kaliti, suhbatdosh ochiq kaliti). Serverda faqat ikkita ochiq kalit bor, ulardan umumiy sirni hisoblash esa diskret logarifm masalasini yechishni talab qiladi, ya’ni amalda imkonsiz.',
  ),
  ...figure('2-12-secret-handshake.png', '2.13', 'Maxfiy chatni ochish va shifrlangan xabar yetkazish ketma-ketlik diagrammasi', 13, 22),
  h3('Xabar kalitlari zanjiri (ratchet).'),
  ...ps(
    'Umumiy sir HKDF funksiyasi yordamida ikkita zanjir kalitiga kengaytiriladi: biri tashabbuskordan qabul qiluvchiga, ikkinchisi teskari yo‘nalishdagi xabarlar uchun (2.14-rasm). HKDF’ning info parametriga protokol versiyasi, chat identifikatori va ikkala ochiq kalit kiritiladi. Shu sababli har bir chatning kalitlari boshqa chatlarnikidan kriptografik jihatdan ajratilgan.',
    'Har bir xabar uchun zanjir bir qadam oldinga suriladi: xabar kaliti MK = HMAC(CK, 0x01), keyingi zanjir kaliti CK′ = HMAC(CK, 0x02). Eski zanjir kaliti darhol unutiladi, oraliq baytlar esa xotirada nollanadi. Bu usul **oldinga maxfiylikni** (forward secrecy) ta’minlaydi: agar qurilma keyinroq buzilib, joriy zanjir kaliti o‘g‘irlansa ham, HMAC bir tomonlama funksiya bo‘lgani uchun undan avvalgi xabarlarning kalitlarini tiklab bo‘lmaydi.',
    'Xabar AES-256-GCM bilan tasodifiy 12 baytli IV yordamida shifrlanadi. Qo‘shimcha autentifikatsiyalangan ma’lumot (AAD) sifatida “chatId | yo‘nalish | tartib raqami” qatori ishlatiladi. U shifrlanmaydi, lekin GCM tegi unga bog‘lanadi. Natijada serverdagi xabarni boshqa chatga ko‘chirish, uni yuboruvchining o‘ziga qaytarish yoki xabarlar o‘rnini almashtirish mumkin bo‘lmaydi: har qanday bunday urinishda teg tekshiruvdan o‘tmaydi va xabar rad etiladi. Tarmoq orqali uzatiladigan blob quyidagi tuzilishga ega: versiya bayti, IV, shifrlangan matn va 16 baytli teg. Ochiq matn ichida esa xabar turi, matn, javob berilgan xabar raqami, yuborilgan vaqt, taymer va fayl ma’lumotlari JSON ko‘rinishida saqlanadi.',
  ),
  ...figure('2-13-ratchet.png', '2.14', 'Maxfiy chatda kalitlarni chiqarish va xabar kalitlari zanjiri', 13, 20),
  h3('Yetkazish, tartib va taymerlar.'),
  ...ps(
    'Server maxfiy xabarlar uchun faqat **saqlab-uzatish** (store-and-forward) vazifasini bajaradi. Shifrlangan blob qabul qiluvchi qurilmaga SignalR orqali (faqat shu qurilmaning “session:{sid}” guruhiga) yuboriladi. Qurilma xabarni ochib, o‘z xotirasiga (IndexedDB) yozgach, serverga tasdiq (ack) yuboradi va server blobni o‘chiradi. Yetkazilmagan bloblar 7 kundan keyin fon ishi tomonidan tozalanadi. Shunday qilib, serverda maxfiy yozishmalar tarixi umuman saqlanmaydi.',
    'Har bir tomon o‘z xabarlariga 1 dan boshlab o‘suvchi tartib raqami (seq) beradi. Server kichik yoki takroriy raqamli xabarni 409 Conflict javobi bilan rad etadi: bu qayta yuborish (replay) hujumidan himoyalaydi. Javobi yo‘qolgan so‘rovni qayta yuborgan klient esa shu javobdan xabar allaqachon serverda ekanini biladi. Xabarlar turli sabablarga ko‘ra tartibsiz kelishi mumkin. Shuning uchun qabul qiluvchi 200 tagacha o‘tkazib yuborilgan xabarning kalitini vaqtincha saqlaydi va har birini faqat bir marta ishlatadi. Zanjir holati faqat xabar muvaffaqiyatli ochilgandan keyin yangilanadi, shuning uchun soxta xabar zanjirni buza olmaydi.',
    'Maxfiy chatda **o‘z-o‘zini o‘chirish taymeri** (10 soniyadan 1 haftagacha) va **tarixni tozalash** buyrug‘i bor. Ular ham oddiy xabar kabi shifrlanadi, shuning uchun server ularni oddiy xabardan ajrata olmaydi. Qabul qiluvchida xabarning muddati u ekranda birinchi marta ko‘ringan paytdan boshlab hisoblanadi, muddati o‘tgan xabar esa IndexedDB’dan butunlay o‘chiriladi. Foydalanuvchi logout qilsa yoki sessiya yakunlansa, shu qurilmadagi barcha maxfiy chatlar serverda avtomatik yopiladi, qurilmadagi kalitlar va tarix esa o‘chiriladi.',
  ),
  h3('Shifrlangan fayllar va kalit izi.'),
  ...ps(
    'Fayl brauzerda har bir fayl uchun alohida tasodifiy AES-256-GCM kalit bilan shifrlanadi. Keyin serverga faqat shifrlangan baytlar yuklanadi (20 MB gacha). Fayl kaliti, IV, nomi, turi va hajmi esa E2E shifrlangan xabar ichida suhbatdoshga yuboriladi. Server fayl mazmunini ko‘rmagani uchun unga ClamAV tekshiruvi va rasmni qayta kodlash qo‘llanmaydi. Buning o‘rniga klient xavfsizlik qoidasiga amal qiladi: faqat PNG, JPEG, WebP va GIF rasmlar sahifada ko‘rsatiladi, boshqa har qanday fayl (HTML, SVG va boshqalar) faqat yuklab olinadi. Chunki sahifada ochilgan begona fayl ilova nomidan skript bajarishi mumkin edi.',
    'Kalit izi (fingerprint) ikkala ochiq kalitning SHA-256 xeshidan hisoblanadi va 8 ta emoji hamda 6 guruh besh xonali raqam ko‘rinishida ko‘rsatiladi. Foydalanuvchilar uni yuzma-yuz yoki telefon orqali solishtiradi. Agar server o‘rtada turib o‘z kalitlarini almashtirgan bo‘lsa (MITM hujumi), ikki tomondagi belgilar farq qiladi.',
  ),
  h3('Protokol cheklovlari.'),
  ...bullets([
    'protokol Signal’dagi to‘liq Double Ratchet emas: oldinga maxfiylik bor, lekin buzilgandan keyin tiklanish (post-compromise security) yo‘q, chunki suhbat davomida yangi Diffi-Xellman almashinuvi bajarilmaydi;',
    'metama’lumotlar (kim, kimga, qachon, qancha hajmda yozgani) serverga ko‘rinadi;',
    'veb-ilovada shifrlash kodini ham server yuboradi: server buzilsa, u zararli skript yuborishi mumkin. Bu xavf qat’iy CSP va kriptografik kodni alohida modulga ajratish bilan kamaytirilgan, to‘liq bartaraf etish esa alohida mobil yoki desktop ilova yaratishni talab qiladi;',
    'maxfiy chat faqat bitta qurilmada ishlaydi va boshqa qurilmaga ko‘chirilmaydi. Vebda skrinshot olishni taqiqlash yoki aniqlash imkoni yo‘q.',
  ]),

  h2('2-bob bo‘yicha xulosa'),
  ...ps(
    'Ikkinchi bobda “Milliy chat” tizimi loyihalandi. Server qismi uchun .NET 8, ASP.NET Core, SignalR, Entity Framework Core va PostgreSQL, klient qismi uchun Angular 22 texnologiyalari tanlandi va asoslandi. Server kodi Domain, Application, Infrastructure va API qatlamlaridan iborat Clean Architecture asosida tashkil etildi. Bu biznes-mantiqni texnik tafsilotlardan ajratish va tizimni kengaytirishni osonlashtirish imkonini berdi.',
    'Ma’lumotlar bazasi o‘nta sxemaga ajratilgan 36 ta jadvaldan iborat qilib loyihalandi. Shaxsiy va guruh chatlari yagona chats modeli orqali ifodalandi, katta hajmli ma’lumotlar uchun kursorli sahifalash tanlandi. Use-case va ketma-ketlik diagrammalari yordamida tizimga kirish, real vaqtda xabar almashish, guruh yaratish, tashkilotga qo‘shilish va tokenlarni yangilash jarayonlari modellashtirildi. Xavfsizlik tizimi parolsiz autentifikatsiya, xeshlangan kod va tokenlar, qisqa muddatli JWT va rotatsiya qilinadigan refresh token, a’zolik va rolga asoslangan avtorizatsiya, fayllarni ko‘p bosqichli tekshirish hamda qat’iy CSP asosida qurildi.',
    'Tizimning o‘ziga xos imkoniyatlari ham loyihalandi. Tashkilot rejimi e-pochta domenini tashkilot sifatida qabul qiladi va shu domen egalari uchun yopiq guruhni avtomatik shakllantiradi. Maxfiy chatlar uchun Web Crypto API’dagi standart primitivlar (X25519, HKDF, HMAC, AES-256-GCM) asosida oldinga maxfiylikka ega uchdan-uchgacha shifrlash protokoli ishlab chiqildi, uning xavfsizlik kafolatlari va cheklovlari aniqlandi. Keyingi bobda ushbu loyihaning dasturiy amalga oshirilishi ko‘rib chiqiladi.',
  ),
];
