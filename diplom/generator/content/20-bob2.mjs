import { bullets, figure, h1, h2, h3, p, ps, table } from '../lib.mjs';

export const chapter2 = () => [
  h1('II-bob. “Milliy” xabarchini loyihalash'),

  // ───────────────────────────────── 2.1
  h2('2.1. Texnologiyalar tanlovi va tizim arxitekturasi'),
  h3('Texnologiyalarni tanlash.'),
  ...ps(
    'Texnologiyalarni tanlashda bir necha talab qo‘yildi. Ular server va brauzer o‘rtasida ikki tomonlama jonli aloqani qo‘llashi, tez ishlashi va tayyor xavfsizlik vositalariga ega bo‘lishi kerak edi. Shuningdek, ular ommabop, ochiq litsenziyali va serverga oson joylashtiriladigan bo‘lishi lozim edi.',
    'Server qismi .NET muhitida yozildi [15, 17, 22]. U Windows’da ham, Linux’da ham ishlaydi va mustaqil sinovlarda eng tez veb-platformalar qatoriga kiradi. Muqobil sifatida Node.js va Spring Boot ham ko‘rib chiqildi. Hal qiluvchi omil SignalR kutubxonasi bo‘ldi: u .NET tarkibiga kiradi va jonli aloqa uchun kerak bo‘lgan hamma narsani qo‘shimcha kutubxonalarsiz beradi. Ma’lumotlar PostgreSQL bazasida saqlanadi. Bu ishonchli, bepul va murakkab so‘rovlarni yaxshi bajaradigan baza. Dastur u bilan Entity Framework orqali ishlaydi: jadvallar bilan oddiy C# obyektlari kabi ishlash mumkin, SQL so‘rovlarini qo‘lda yozish shart emas [16, 18].',
    'Brauzerdagi qism Angular’da yozildi [24, 43]. Angular sahifalar orasida o‘tish, formalar va server bilan aloqa uchun hamma vositani bitta to‘plamda beradi. U TypeScript tilida yoziladi. Bu til C# ga o‘xshash bo‘lgani uchun server va brauzer kodi bir xil uslubda yozildi. Dasturni serverga joylashtirish uchun konteynerlash texnologiyalaridan biri — Docker’dan foydalanildi, dastur Render bulut xizmatida ishga tushirildi. Tanlangan texnologiyalar 2.1-jadvalda keltirilgan.',
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

  h3('Tizim arxitekturasi.'),
  ...ps(
    '“Milliy” xabarchi ikki qismdan iborat: foydalanuvchi brauzerida ishlaydigan ilova va server (2.1-rasm). Ular ikki xil yo‘l bilan aloqa qiladi. Foydalanuvchi biror amal bajarganda, masalan, xabar yuborganda, profilini o‘zgartirganda yoki guruh yaratganda, brauzer serverga oddiy so‘rov yuboradi (REST API). Server esa yangi xabar, “o‘qildi” belgisi, “yozmoqda” holati kabi hodisalarni doimiy ochiq SignalR ulanishi orqali darhol yetkazadi. Tizim uchta tashqi xizmatdan ham foydalanadi: pochta serveri kirish kodlarini yuboradi, Google hisob orqali kirishni tasdiqlaydi, ClamAV antivirusi esa yuklangan fayllarni tekshiradi.',
    'Server foydalanuvchi haqidagi vaqtinchalik ma’lumotni o‘z xotirasida saqlamaydi. Kirishlar haqidagi yozuvlar bazada, foydalanuvchining kimligi esa har bir so‘rov bilan keladigan tokenda turadi. Shu sababli kerak bo‘lganda bir vaqtda bir nechta server ishga tushirish mumkin. Bunda faqat onlayn holat va jonli ulanishlarni Redis orqali umumlashtirish kifoya [12].',
  ),
  ...figure('2-2-deployment.png', '2.1', 'Tizimning umumiy arxitekturasi va joylashtirish sxemasi', 16.5),
  ...ps(
    'Server kodi Robert Martin taklif qilgan Clean Architecture (“toza arxitektura”) tamoyillari asosida to‘rt qismga bo‘lingan (2.2-rasm). Asosiy qoida oddiy: ichki qismlar tashqi qismlar haqida hech narsa bilmaydi. Natijada dasturning asosiy qoidalari bazani yoki boshqa texnologiyani almashtirganda o‘zgarmaydi va ularni alohida sinash mumkin [10].',
  ),
  ...figure('2-1-clean-architecture.png', '2.2', 'Server qismining Clean Architecture qatlamlari', 15.5),
  ...ps(
    'Eng ichki qism — Domain. Unda dasturning asosiy tushunchalari tasvirlangan: foydalanuvchi, chat, xabar, reaksiya, lavha, post, tashkilot, maxfiy chat va boshqalar. Lotin–kirill o‘girish algoritmi ham shu yerda. Bu qism boshqa hech qaysi qismga bog‘liq emas [14].',
    'Ikkinchi qism — Application. U foydalanuvchi bajaradigan amallarni bajaradi: xabar yuborish, guruh yaratish, forumda post yozish va hokazo. Kod vazifalar bo‘yicha guruhlangan: chatlar, guruhlar, xabarlar, bloklash, forum, tashkilotlar, maxfiy chatlar. Bu qism ma’lumot bazaga qanday yozilishini yoki xat qanday yuborilishini bilmaydi, faqat “saqla”, “xat yubor” kabi buyruqlarni beradi.',
    'Uchinchi qism — Infrastructure. U bu buyruqlarni amalda bajaradi: ma’lumotlar bazasi bilan ishlaydi [13], kodlar va tokenlarni xeshlaydi, pochta yuboradi, fayllarni antivirusda tekshiradi, rasm va videolarni qayta ishlaydi, fonda ishlaydigan vazifalarni bajaradi.',
    'To‘rtinchi, eng tashqi qism — API. U brauzerdan keladigan so‘rovlarni qabul qiladi va ikkita jonli aloqa markazini boshqaradi: biri chatlar uchun (ChatHub), ikkinchisi forum uchun (ForumHub).',
    'Bu bo‘linishning foydasini bitta misolda ko‘rish mumkin. Xabar saqlangach, Application qismi faqat “chat a’zolariga xabar ber” buyrug‘ini beradi. Xabar SignalR orqali qanday yetkazilishini esa API qismi hal qiladi. Bundan tashqari, bildirishnoma xabar bazaga muvaffaqiyatli yozilgandan keyingina yuboriladi. Shuning uchun foydalanuvchi hech qachon saqlanmay qolgan xabar haqida bildirishnoma olmaydi.',
    'Brauzerdagi Angular ilovasi ham qismlarga bo‘lingan. core papkasida tizimga kirish, tokenni yangilash va sahifalarga ruxsat berish bilan bog‘liq kod joylashgan. features/chat papkasida chat bilan ishlaydigan kod bor: bir xizmat serverga so‘rov yuboradi, ikkinchisi jonli ulanishni boshqaradi. Maxfiy chatlarning shifrlash kodi alohida modulga ajratilgan. shared papkasida esa lotin–kirill o‘girish va interfeysning umumiy elementlari turadi. Barcha ranglar bir joyda belgilangani uchun yorug‘ va qorong‘i ko‘rinish o‘rtasida o‘tish oson.',
  ),

  // ───────────────────────────────── 2.2
  h2('2.2. Ma’lumotlar bazasi va UML modellari'),
  h3('Ma’lumotlar bazasini loyihalash.'),
  p(
    'Ma’lumotlar bazasi “avval kod” (code-first) usulida loyihalandi. Ya’ni avval dasturda obyektlar yoziladi, bazadagi jadvallar esa ular asosida avtomatik yaratiladi. Baza tuzilishidagi har bir o‘zgarish alohida qadam (migratsiya) sifatida saqlanadi, shuning uchun bazani istalgan paytda kerakli holatga keltirish mumkin [41]. Bazada 43 ta jadval bor, ular vazifasiga qarab o‘n bitta guruhga (sxemaga) ajratilgan [44] (2.2-jadval). Jadvallarning bir qismi kelgusidagi imkoniyatlar uchun oldindan tayyorlab qo‘yilgan: kanallar, qo‘ng‘iroqlar, stikerlar, botlar va so‘rovnomalar.',
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
      ['story', 'stories, story_views', 'Lavhalar va ularni ko‘rishlar'],
      ['forum', 'posts, post_media, post_likes, post_views, post_reports, follows, forum_notifications', 'Forum postlari va media, layk, ko‘rish, shikoyatlar, obunalar va bildirishnomalar'],
      ['personal', 'folders, folder_chats, saved_messages, subscriptions', 'Shaxsiy papkalar, saqlangan xabarlar, obunalar'],
      ['call', 'calls, call_participants', 'Ovozli va video qo‘ng‘iroqlar (kelajak uchun)'],
      ['bot', 'bots', 'Botlar platformasi (kelajak uchun)'],
    ],
    [2, 6, 5],
  ),
  p(
    'Foydalanuvchiga oid jadvallar 2.3-rasmda ko‘rsatilgan. users jadvalida har bir e-pochta va foydalanuvchi nomi faqat bir marta uchraydi, shuning uchun bitta pochta bilan ikkita hisob ochib bo‘lmaydi. Har bir kirish sessions jadvalida alohida yozuv sifatida saqlanadi: qaysi qurilmadan, qaysi manzildan kirilgani va tokenning xeshi. email_verification_codes jadvalida bir martalik kodlar saqlanadi, lekin ochiq holda emas, xesh ko‘rinishida. Shu yerda urinishlar soni va kodning amal qilish muddati ham turadi. contacts va blocked_users jadvallari foydalanuvchilar o‘rtasidagi munosabatlarni saqlaydi.',
  ),
  ...figure('2-4a-er-users-sessions.png', '2.3', 'ER-diagramma: foydalanuvchilar va sessiyalar', 15.5, 12),
  ...ps(
    'Bazaning markazida chats jadvali turadi (2.4-rasm). Shaxsiy chat ham, guruh ham shu jadvalda saqlanadi, ular faqat turi bilan farqlanadi. Chat ishtirokchilari chat_members jadvalida roli bilan saqlanadi: oddiy a’zo, administrator yoki ega. Guruhga xos ma’lumotlar, masalan nomi va tavsifi, alohida groups jadvalida. Bu yechimning afzalligi shundaki, xabar yuborish, fayl biriktirish, qidiruv va jonli bildirishnomalar shaxsiy chat va guruh uchun bitta kod bilan ishlaydi. messages jadvalidagi har bir xabar boshqa xabarga javob bo‘lishi mumkin. Guruhdagi “a’zo qo‘shildi”, “nom o‘zgartirildi” kabi xizmat xabarlari ham shu jadvalda, alohida belgi bilan saqlanadi.',
  ),
  ...figure('2-4b-er-chats-groups.png', '2.4', 'ER-diagramma: chatlar va guruhlar', 14, 12),
  p(
    'Xabarlar va ularga bog‘liq jadvallar 2.5-rasmda ko‘rsatilgan. reactions jadvali bitta foydalanuvchiga bitta xabarga faqat bitta reaksiya qoldirishga ruxsat beradi: yangi reaksiya eskisining o‘rnini egallaydi. Bloklangan foydalanuvchilar blocked_users jadvalida saqlanadi. Shaxsiy chatga xabar yuborishdan oldin server shu jadvalni tekshiradi.',
  ),
  ...figure('2-5a-er-messages.png', '2.5', 'ER-diagramma: xabarlar, reaksiyalar va o‘qilganlik', 11, 12),
  h3('Loyihalash qarorlari.'),
  ...ps(
    'Bazani loyihalashda bir nechta muhim qaror qabul qilindi. Barcha vaqtlar yagona jahon vaqtida (UTC) saqlanadi va faqat foydalanuvchi ekranida uning mahalliy vaqtiga o‘giriladi. O‘chirilgan chat va xabarlar bazadan darhol yo‘qolmaydi, balki “o‘chirilgan” deb belgilanadi va so‘rovlarda avtomatik ravishda chiqarib tashlanadi. Guruhda har bir a’zo nechta xabarni o‘qimagani alohida hisoblanadi. Fayllarning o‘zi diskda, bazada esa faqat ular haqidagi ma’lumot saqlanadi. Bitta fayl xabarga biriktirma, profil rasmi, lavha yoki forum posti sifatida qayta ishlatilishi mumkin. Tez-tez qidiriladigan ustunlar, masalan e-pochta va foydalanuvchi nomi uchun indekslar qo‘yilgan.',
    'Chatlar ro‘yxati va xabarlar tarixini yuklash uchun kursorli sahifalash tanlandi. Oddiy usulda dastur “51-xabardan boshlab 50 tasini ber” deb so‘raydi. Lekin bu orada yangi xabar kelsa, ro‘yxat siljiydi va bitta xabar ikki marta ko‘rinadi. Bundan tashqari, tarix uzaygan sari bunday so‘rov sekinlashadi. Kursorli usulda esa dastur “shu xabardan oldingi 50 tasini ber” deb so‘raydi. Server bitta ortiqcha xabar o‘qib, yana xabar bor-yo‘qligini ham aytadi. Bu usulda so‘rov tezligi tarix qanchalik uzunligiga bog‘liq emas [12].',
  ),
  p(
    'Forum jadvallari alohida forum sxemasida joylashgan (2.6-rasm). Post, unga javob, repost va iqtibos bitta posts jadvalida saqlanadi va qaysi postga bog‘langani bilan farqlanadi. Har bir javobda muhokama boshlangan birinchi postga havola bor, shuning uchun butun muhokamani bitta so‘rov bilan o‘qish mumkin. Layklar, javoblar, repostlar va ko‘rishlar soni postning o‘zida saqlanadi. Shu tufayli lentani ko‘rsatishda har bir post uchun bu sonlarni qayta sanash shart emas. Postning “mashhurlik bahosi” ham shu yerda saqlanadi va top lentadagi tartibni belgilaydi.',
  ),
  ...figure('2-15-er-forum.png', '2.6', 'ER-diagramma: forum jadvallari', 15.5, 12),
  p(
    'Tashkilot rejimi, maxfiy chatlar va transliteratsiya uchun qo‘shilgan jadval va ustunlar 2.7-rasmda ko‘rsatilgan.',
  ),
  ...figure('2-11-er-new-tables.png', '2.7', 'ER-diagramma: tashkilotlar, maxfiy chatlar va transliteratsiya uchun qo‘shilgan jadval va ustunlar', 16.5, 12),
  ...ps(
    'organizations jadvalida har bir tashkilot bitta e-pochta domeni bilan ifodalanadi, organization_members jadvali esa kim qaysi tashkilotga a’zo ekanini va uning rolini saqlaydi. Guruh biror tashkilotga bog‘lansa, u shu tashkilotning yopiq guruhiga aylanadi. secret_chats jadvalida shifrlash kaliti saqlanmaydi, faqat ikki tomonning ochiq kalitlari saqlanadi. secret_messages va secret_files jadvallari esa hali yetkazilmagan shifrlangan xabar va fayllarni vaqtincha ushlab turadi. Lotin–kirill o‘girish uchun foydalanuvchi qaysi yozuvni afzal ko‘rishi haqidagi sozlama qo‘shildi. Har bir xabarning esa qidiruv uchun lotinga o‘girilgan nusxasi saqlanadi.',
  ),
  h3('Tizimning UML modellari.'),
  p(
    'Tizim nimalar qila olishi va asosiy jarayonlar UML diagrammalari bilan tasvirlandi [20]. Tizimdan uch toifadagi foydalanuvchi foydalanadi. Mehmon faqat ro‘yxatdan o‘tishi yoki tizimga kirishi mumkin. Foydalanuvchi profilini boshqaradi, yozishadi, fayl va lavhalar almashadi, xabarlarga munosabat bildiradi, forumda yozadi, guruh va maxfiy chat ochadi, keraksiz odamni bloklaydi. Guruh administratori yoki egasi bularning hammasini qila oladi, bundan tashqari guruh a’zolari, sozlamalari va taklif havolasini boshqaradi (2.8-rasm). Guruhdagi huquqlar 2.3-jadvalda keltirilgan. Huquqlar serverda tekshiriladi, interfeys esa foydalanuvchiga ruxsat berilmagan tugmalarni umuman ko‘rsatmaydi.',
  ),
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
  ...figure('2-6-use-case.png', '2.8', 'Foydalanish holatlari (use-case) diagrammasi', 15.5, 17),
  h3('Elektron pochta orqali kirish jarayoni.'),
  p(
    'Tizimga kirish uchun parol kerak emas. Foydalanuvchi e-pochta manzilini yozadi, pochtasiga 6 xonali kod keladi va u shu kodni kiritadi (2.9-rasm). Kodni taxminlab topishning oldini olish uchun cheklovlar qo‘yilgan: bitta manzilga daqiqasiga bittadan ortiq kod yuborilmaydi, 15 daqiqada bitta manzil yoki kompyuterdan beshtadan ortiq so‘rov qabul qilinmaydi. Kod tasodifiy yaratiladi va bazada ochiq holda emas, xesh ko‘rinishida saqlanadi. Kod 10 daqiqa amal qiladi, uni kiritish uchun beshta urinish beriladi. Agar foydalanuvchi yangi bo‘lsa, u ro‘yxatdan o‘tishni yakunlaydi, avval ro‘yxatdan o‘tgan bo‘lsa, darhol tizimga kiradi.',
  ),
  ...figure('2-7-otp-sequence.png', '2.9', 'Elektron pochtaga yuborilgan kod orqali kirish ketma-ketlik diagrammasi', 16),
  h3('Real vaqtda xabar yuborish jarayoni.'),
  p(
    'Foydalanuvchi tizimga kirgach, uning brauzeri server bilan doimiy SignalR ulanishini o‘rnatadi (2.10-rasm). Agar foydalanuvchi bir nechta qurilmadan kirgan bo‘lsa, hodisalar uning barcha qurilmalariga bir vaqtda keladi. Xabarning o‘zi oddiy so‘rov bilan yuboriladi: server uni tekshiradi va bazaga yozadi. Shundan keyin chatning barcha a’zolariga “yangi xabar” hodisasi yuboriladi. Qabul qiluvchi chatni ochib turgan bo‘lsa, uning brauzeri serverga “o‘qildi” deb xabar beradi va jo‘natuvchining ekranida bitta belgi ikkita belgiga (✓✓) almashadi. Guruh yaratilgani yoki unga yangi a’zo qo‘shilgani haqida ham barcha a’zolar xuddi shu yo‘l bilan darhol xabardor bo‘ladi.',
  ),
  ...figure('2-8-message-sequence.png', '2.10', 'Real vaqtda xabar yuborish va o‘qilganlik belgisi ketma-ketlik diagrammasi', 16.5),
  h3('Tashkilotga avtomatik qo‘shilish jarayoni.'),
  ...ps(
    'Tashkilot rejimida tashkilotni oldindan ro‘yxatdan o‘tkazish shart emas, chunki tashkilot — bu e-pochta domenining o‘zi. Masalan, “ali@tuit.uz” manzili bilan kirgan odam “tuit.uz” tashkilotiga tegishli deb hisoblanadi. Domen to‘liq mos kelishi kerak: “student.tuit.uz” alohida tashkilot, “evil-tuit.uz” kabi soxta domen esa hech qachon “tuit.uz” bilan mos kelmaydi. gmail.com, mail.ru, umail.uz kabi 40 ga yaqin ommaviy pochta xizmati tashkilot hisoblanmaydi.',
    'Domendan birinchi bo‘lib kirgan odam tashkilot administratori va uning yopiq guruhi egasi bo‘ladi, keyingilari esa guruhga avtomatik qo‘shiladi (2.11-rasm). Bunday guruh qidiruvda ko‘rinmaydi. Tashqaridan unga faqat administrator qo‘shsa yoki maxsus taklif havolasi orqali kirish mumkin, bu havolani taxminlab topish esa amalda imkonsiz. Bunday guruhga butun fakultet kirishi mumkin, shuning uchun a’zolar chegarasi oddiy guruhdagi 200 o‘rniga 5000 qilib belgilangan.',
  ),
  ...figure('2-14-organization-join.png', '2.11', 'Foydalanuvchini tashkilotga va uning domen guruhiga qo‘shish algoritmi', 16, 8),

  // ───────────────────────────────── 2.3
  h2('2.3. Xavfsizlik va maxfiy chatlar protokoli'),
  h3('Xavfsizlikni loyihalash.'),
  ...ps(
    'Tizimda parol yo‘q, shuning uchun parolni o‘g‘irlash yoki taxmin qilish xavfi ham yo‘q. Bir martalik kodlar bazada kuchli xeshlash usuli (PBKDF2) bilan saqlanadi [30, 31]. Google orqali kirishda server Google bergan tasdiqning haqiqiyligini va muddatini tekshiradi.',
    'Tizimga kirgandan keyin foydalanuvchiga ikkita token beriladi. Birinchisi 15 daqiqa amal qiladi va har bir so‘rov bilan yuboriladi [29]. Ikkinchisi 30 kun amal qiladi va faqat birinchisining muddati tugaganda uni yangilash uchun ishlatiladi. Ikkinchi token brauzerning himoyalangan joyida saqlanadi, u yerdan saytdagi skriptlar uni o‘qiy olmaydi. Bazaga uning faqat xeshi yoziladi va u har safar ishlatilganda yangisiga almashtiriladi. Har bir kirish alohida sessiya hisoblanadi, shuning uchun foydalanuvchi begona qurilmani masofadan chiqarib yuborishi mumkin. Biror chat bilan bog‘liq har bir so‘rovda server foydalanuvchi haqiqatan shu chat a’zosi ekanini tekshiradi. Asosiy xavflar va ulardan himoya choralari 2.4-jadvalda keltirilgan [39].',
  ),
  ...table(
    '2.4',
    'Asosiy tahdidlar va himoya choralari',
    ['Tahdid', 'Himoya choralari'],
    [
      ['Kodni tanlab topish (brute-force)', 'Kod 10 daqiqa amal qiladi, 5 tagacha urinish; kod so‘rash chastotasi e-pochta va IP bo‘yicha cheklangan'],
      ['Ma’lumotlar bazasining sizib chiqishi', 'Kodlar PBKDF2, refresh tokenlar HMAC-SHA256 xeshi ko‘rinishida saqlanadi; parollar yo‘q'],
      ['Tokenning o‘g‘irlanishi', 'Access token 15 daqiqa; refresh token HttpOnly cookie’da va rotatsiya qilinadi; sessiyani yakunlash mumkin'],
      ['XSS va CSRF', 'Angular ma’lumotlarni ekranlaydi; qat’iy CSP [37]; refresh cookie SameSite=Strict'],
      ['Begona chatga kirish', 'Har bir REST va hab chaqiruvida a’zolik tekshiruvi; guruhda rolga asoslangan ruxsatlar'],
      ['Zararli fayl, spam', 'Tarkib bo‘yicha format tekshiruvi, rasmni qayta kodlash, ClamAV; forumda chastota cheklovi, shikoyat va bloklash'],
      ['Server yoki baza buzilishi', 'Maxfiy chatlarda uchdan-uchgacha shifrlash: serverda faqat ochiq kalitlar va shifrlangan bloblar'],
    ],
    [4, 9],
  ),

  h3('Maxfiy chatlar kriptografik protokoli.'),
  ...ps(
    'Oddiy chatlarda xabarlar serverga shifrlangan kanal orqali keladi, lekin serverda ochiq saqlanadi. Bu yozishmalarni barcha qurilmalarda ko‘rish, qidirish va lotin–kirillga o‘girish imkonini beradi. Ammo ba’zi yozishmalarni hatto server buzilsa yoki baza o‘g‘irlansa ham hech kim o‘qiy olmasligi kerak. Shu maqsadda maxfiy chatlar loyihalandi. Ularda xabar jo‘natuvchining brauzerida shifrlanadi va faqat qabul qiluvchining brauzerida ochiladi. Bu uchdan-uchgacha shifrlash deyiladi. Server xabarni yetkazadi, lekin uning mazmunini bilmaydi. U faqat kim kimga, qachon va qancha hajmda yozganini ko‘radi [19].',
    'Signal va WhatsApp’da maxfiy yozishma foydalanuvchining barcha qurilmalarida ishlaydi, lekin buning uchun har bir qurilma kalitlarini alohida boshqarish kerak. Bu ancha murakkab, shuning uchun Telegram’dagi kabi oddiyroq yo‘l tanlandi: maxfiy chat ikki aniq qurilma o‘rtasida ochiladi. Shifrlash algoritmlarini o‘zi yozish xavfli, chunki eng kichik xato ham himoyani yo‘qqa chiqaradi. Shuning uchun faqat brauzerning o‘ziga o‘rnatilgan, sinovdan o‘tgan Web Crypto API vositalaridan foydalanildi [36] (2.5-jadval). Yopiq kalitlar shunday yaratiladiki, sahifadagi kod ular bilan shifrlay oladi, lekin kalitning o‘zini o‘qib ololmaydi.',
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
    '**Kalit almashish.** Maxfiy chatni boshlagan odamning brauzeri o‘zaro bog‘langan ikkita kalit yaratadi: yopiq va ochiq [32]. Serverga faqat ochiq kalit yuboriladi (2.12-rasm). Suhbatdosh taklifni qaysi qurilmada qabul qilsa, chat o‘sha qurilmaga bog‘lanadi va u ham o‘z ochiq kalitini yuboradi. Shundan keyin ikkala brauzer bir-biriga hech narsa yubormasdan bir xil umumiy maxfiy kalitni hisoblab chiqadi. Serverda faqat ikkita ochiq kalit bo‘ladi, ulardan umumiy kalitni topish esa amalda imkonsiz.',
    '**Har bir xabar uchun yangi kalit.** Umumiy kalitdan har bir yo‘nalish uchun alohida kalitlar zanjiri hosil qilinadi [33] (2.13-rasm). Har bir xabar o‘zining alohida kaliti bilan shifrlanadi: MK = HMAC(CK, 0x01), keyingi zanjir kaliti esa CK′ = HMAC(CK, 0x02) [31]. Ishlatilgan kalit darhol o‘chiriladi. Shu tufayli joriy kalit o‘g‘irlansa ham, oldingi xabarlarni ochib bo‘lmaydi. Xabar AES-256-GCM algoritmi bilan shifrlanadi [34]. Shifrlashda chat raqami, yo‘nalish va xabarning tartib raqami ham hisobga olinadi. Shuning uchun kimdir xabarni boshqa chatga ko‘chirsa yoki xabarlar o‘rnini almashtirsa, bu darhol aniqlanadi.',
  ),
  ...figure('2-12-secret-handshake.png', '2.12', 'Maxfiy chatni ochish va shifrlangan xabar yetkazish ketma-ketlik diagrammasi', 13, 15),
  ...ps(
    '**Yetkazish.** Server shifrlangan xabarni faqat vaqtincha saqlab, qabul qiluvchiga yetkazadi. Qabul qiluvchi “oldim” deb javob bergach, server xabarni o‘chiradi. Yetkazilmagan xabarlar 7 kundan keyin o‘chiriladi. Har bir xabarning tartib raqami bor, shuning uchun eski xabarni qayta yuborib aldab bo‘lmaydi. Xabarlar tartibsiz kelsa, 200 tagacha o‘tkazib yuborilgan kalit vaqtincha saqlab turiladi. Xabarni belgilangan vaqtdan keyin o‘chirish va tarixni tozalash buyruqlari ham shifrlangan holda yuboriladi.',
  ),
  ...figure('2-13-ratchet.png', '2.13', 'Maxfiy chatda kalitlarni chiqarish va xabar kalitlari zanjiri', 13, 16),
  ...ps(
    '**Fayllar va kalit izi.** Fayl brauzerning o‘zida alohida tasodifiy kalit bilan shifrlanib, so‘ng serverga yuklanadi. Bu kalit va fayl nomi esa maxfiy xabar ichida yuboriladi. Ikkala tomonning ekranida “kalit izi” ko‘rsatiladi: ochiq kalitlardan hisoblangan 8 ta emoji va raqamlar [35]. Suhbatdoshlar bu belgilarni, masalan, yuzma-yuz uchrashganda solishtirishi mumkin. Agar server o‘rtada turib kalitlarni almashtirgan bo‘lsa, ikki tomondagi belgilar farq qiladi.',
    '**Cheklovlar.** Bu protokol Signal’dagi to‘liq protokol emas [27, 38]. Suhbat davomida kalitlar qaytadan kelishilmaydi, shuning uchun qurilma bir marta buzilsa, keyingi xabarlar ham xavf ostida qoladi. Kim kimga yozgani serverga ko‘rinadi. Maxfiy chat faqat bitta qurilmada ishlaydi. Shifrlash kodini brauzerga serverning o‘zi yuboradi. Bu xavf qat’iy xavfsizlik sozlamalari bilan kamaytirilgan, uni butunlay yo‘qotish uchun esa alohida mobil ilova kerak bo‘ladi.',
  ),

  h2('2-bob bo‘yicha xulosa', { toc: false }),
  p(
    'Ikkinchi bobda “Milliy” xabarchi loyihalandi. Server .NET muhitida, Entity Framework asosida, brauzer qismi esa Angular’da ishlaydigan qilib loyihalandi. Server kodi to‘rt qismga bo‘lindi, bazada 43 ta jadval loyihalandi. UML diagrammalarida kirish, xabar yuborish va tashkilotga qo‘shilish jarayonlari tasvirlandi. Tizimda parol yo‘q, kodlar va tokenlar xeshlangan holda saqlanadi. Maxfiy chatlar uchun brauzerning o‘z shifrlash vositalari asosida protokol ishlab chiqildi.',
  ),
];
