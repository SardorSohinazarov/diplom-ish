import { bullets, figure, figurePair, formula, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter3 = () => [
  h1('III-bob. “Milliy” xabarchini ishlab chiqish'),

  // ───────────────────────────────── 3.1
  h2('3.1. Server qismini ishlab chiqish'),
  h3('Server tuzilmasi va REST API.'),
  ...ps(
    'Server yechimi to‘rtta loyihadan (Domain, Application, Infrastructure, API) va unit testlar loyihasidan iborat. Kirish nuqtasi — Program.cs fayli faqat so‘rovlarni qayta ishlash konveyerini sozlaydi [42]: eng birinchi xatolarni ushlovchi middleware, so‘ng xavfsizlik sarlavhalari, autentifikatsiya, avtorizatsiya, controllerlar va ikkita SignalR habi. Servislarni ro‘yxatdan o‘tkazish mavzuli kengaytma metodlariga ajratilgan, shuning uchun yangi funksiya qo‘shilganda Program.cs o‘zgarmaydi: forum, reaksiyalar va bloklash ham shu tartibda, mavjud kodga tegmasdan qo‘shildi.',
    'Server 17 ta controller orqali 104 ta HTTP endpointni taqdim etadi (3.1-jadval). Endpointlar RESTful tamoyil asosida nomlangan: resurslar ko‘plik shaklida, amal esa HTTP metodi orqali ifodalanadi. Masalan, xabarga reaksiya qo‘yish “PUT /api/chats/{chatId}/messages/{messageId}/reaction”, uni olib tashlash esa xuddi shu manzilga “DELETE” so‘rovi bilan bajariladi. PUT ishlatilgani tasodif emas: bitta foydalanuvchi bitta xabarga faqat bitta reaksiya qo‘ya oladi, shuning uchun so‘rov yangi yozuv qo‘shmaydi, balki holatni o‘rnatadi va takror yuborilsa ham natija o‘zgarmaydi.',
  ),
  ...table(
    '3.1',
    'Server API controllerlari va endpointlari',
    ['Controller', 'Asosiy yo‘l', 'Soni', 'Vazifasi'],
    [
      ['AuthController', '/api/auth', '11', 'Kod so‘rash va tasdiqlash, Google, ro‘yxatdan o‘tish, tokenni yangilash, sessiyalar'],
      ['ProfileController, UserController', '/api/users', '7', 'Profil, profil rasmi, yozuv sozlamasi, foydalanuvchilarni qidirish'],
      ['ContactController, BlockController', '/api/contacts, /api/blocks', '6', 'Kontaktlar; bloklash, blokdan chiqarish va bloklanganlar ro‘yxati'],
      ['ChatController', '/api/chats', '3', 'Chatlar ro‘yxati, shaxsiy chat, chatni o‘chirish'],
      ['GroupController', '/api/groups', '12', 'Guruh yaratish, tahrirlash, a’zolar va rollar, taklif havolalari'],
      ['MessageController, MessageReactionController', '/api/chats/{id}/messages', '9', 'Xabarlar tarixi, yuborish, tahrirlash, o‘chirish, qidiruv, reaksiyalar'],
      ['MessageAttachmentController', '/api/chats/…, /api/media/…', '10', 'Rasm, video, fayl yuklash va berish, ulashilgan media'],
      ['StoryController', '/api/stories', '8', 'Lavhalar lentasi, yaratish, ko‘rishlar'],
      ['PostController, ForumMediaController', '/api/forum', '17', 'Lentalar, post va javoblar, layk, repost, shikoyat, post mediasi'],
      ['FollowController, NotificationController', '/api/forum', '9', 'Obunalar, tavsiyalar, forum profili, forum bildirishnomalari'],
      ['OrganizationController', '/api/organizations', '1', 'Foydalanuvchining tashkiloti va roli'],
      ['SecretChatController', '/api/secret-chats', '11', 'Maxfiy chat so‘rovi, qabul qilish, shifrlangan xabar va fayllar, ack'],
      ['Jami', '', '104', ''],
    ],
    [4.2, 3.6, 1.1, 6.2],
  ),
  ...ps(
    'API OpenAPI (Swagger) orqali avtomatik hujjatlashtiriladi: barcha endpointlarni JWT token bilan to‘g‘ridan-to‘g‘ri sinab ko‘rish mumkin (3.1-rasm). Barcha javoblar yagona formatda (succeeded, message, data) qaytadi, xato xabarlari o‘zbek tilida yozilgan. Kiruvchi DTO’lar FluentValidation validatorlari bilan tekshiriladi [48], kutilmagan istisnolar esa logga TraceId bilan yoziladi va mijozga ichki tafsilotlarsiz qaytariladi.',
    'Ro‘yxat qaytaruvchi barcha endpointlarda kursorli sahifalash ishlatiladi. U barcha repozitoriylar uchun umumiy IQueryable kengaytma metodi sifatida yozilgan: metod “Id < beforeId” shartini ifodalar daraxti orqali dinamik quradi va limitdan bittaga ko‘p yozuv o‘qiydi. Qo‘shimcha yozuv borligi hasMore qiymatini beradi, shuning uchun alohida COUNT so‘roviga hojat qolmaydi. Natija to‘g‘ridan-to‘g‘ri DTO’ga proyeksiya qilinadi va bazadan faqat kerakli ustunlar o‘qiladi [16, 41]. Forumning top lentasida tartib Id bo‘yicha emas, reyting bo‘yicha bo‘lgani uchun kursor ikki qiymatdan — oxirgi ko‘rilgan postning reytingi va identifikatoridan iborat.',
  ),
  ...figure('3-04-swagger.jpg', '3.1', 'Swagger UI: server API hujjatlari', 14),

  h3('Real vaqtda xabar almashish.'),
  p(
    'Real vaqt aloqasi ikkita SignalR habi orqali quriladi [40]. **ChatHub** chatlar uchun to‘rtta metodni taqdim etadi va mijozlarga o‘n beshta turdagi hodisa yuboradi, **ForumHub** esa forumdagi yangiliklarni yetkazadi (3.2-jadval). Habni ikkiga ajratish forum sahifasi ochilmagan foydalanuvchiga ortiqcha trafik yubormaslik imkonini beradi. ChatHub’ga ulangan har bir ulanish ikki guruhga qo‘shiladi: foydalanuvchining barcha qurilmalari uchun “user:{id}” va aynan shu qurilma uchun “session:{sid}”. Ikkinchisi maxfiy chat hodisalarini faqat chat bog‘langan qurilmaga yetkazadi.',
  ),
  ...table(
    '3.2',
    'SignalR hablarining metodlari va hodisalari',
    ['Nomi', 'Yo‘nalish', 'Vazifasi'],
    [
      ['JoinChat / LeaveChat', 'Mijoz → ChatHub', 'Ochilgan chatning “chat:{id}” guruhiga qo‘shilish yoki chiqish'],
      ['SetTyping(chatId, isTyping)', 'Mijoz → ChatHub', '“Yozmoqda” holatini chatdagi boshqalarga uzatish'],
      ['MarkMessagesRead(chatId, ids)', 'Mijoz → ChatHub', 'Xabarlarni o‘qilgan deb belgilash (100 tagacha)'],
      ['MessageReceived / Updated / Deleted', 'ChatHub → mijoz', 'Yangi, tahrirlangan yoki o‘chirilgan xabar'],
      ['MessageReactionChanged', 'ChatHub → mijoz', 'Xabardagi reaksiyalar va ularning soni o‘zgardi'],
      ['MessagesRead, TypingChanged', 'ChatHub → mijoz', 'O‘qilganlik (✓✓) va “yozmoqda” holati'],
      ['ChatCleared / ChatDeleted, GroupUpdated', 'ChatHub → mijoz', 'Chat tarixi tozalandi, chat o‘chirildi, guruh o‘zgardi'],
      ['UserPresenceChanged, ProfilePhotoUpdated', 'ChatHub → mijoz', 'Onlayn holat va profil rasmi o‘zgardi'],
      ['SecretChatRequested / Accepted / Closed, SecretMessageReceived', 'ChatHub → mijoz', 'Maxfiy chat taklifi, qabul qilinishi, yopilishi va shifrlangan xabar'],
      ['JoinPost / LeavePost', 'Mijoz → ForumHub', 'Ochilgan post muhokamasini kuzatishni boshlash yoki to‘xtatish'],
      ['ForumReplyAdded, ForumPostCountsChanged, ForumPostDeleted', 'ForumHub → mijoz', 'Ochiq postga javob qo‘shildi, hisoblagichlar o‘zgardi, post o‘chirildi'],
      ['ForumPostPublished, ForumNotification', 'ForumHub → mijoz', 'Obuna bo‘lingan muallif post joyladi; shaxsiy forum bildirishnomasi'],
    ],
    [5, 2.8, 6.5],
  ),
  ...ps(
    'Hab metodlari ham REST kabi himoyalangan: har bir chaqiruvda foydalanuvchining chat a’zosi ekani bazadan tekshiriladi. Aks holda chat identifikatorini taxmin qilib, begona chatdagi hodisalarni tinglash mumkin bo‘lardi. ForumHub’da JoinPost metodi ham avval postning shu foydalanuvchiga ko‘rinishini tekshiradi: masalan, bloklangan muallifning postini kuzatib bo‘lmaydi.',
    'Real vaqt xabarnomalari Application qatlamidagi IChatRealtimeNotifier va IForumRealtimeNotifier interfeyslari orqali yuboriladi, ularning SignalR’dagi amalga oshirilishi esa API qatlamida joylashgan. Xabarnoma tranzaksiya muvaffaqiyatli yakunlangandan keyingina yuboriladi va yuborishdagi xato asosiy amalni bekor qilmaydi: xabar bazaga yozilgan bo‘lsa, mijoz uni keyingi so‘rovda baribir oladi.',
    'Onlayn holat IPresenceTracker interfeysi orqali kuzatiladi: bitta serverda faol ulanishlar xotirada, bir necha serverda esa Redis’da saqlanadi. Oxirgi ulanish uzilganda server 8 soniya kutadi, shuning uchun sahifani yangilash yoki qisqa uzilishda suhbatdoshlarda “oflayn” holati ko‘rinmaydi. Klientdagi ChatRealtimeService ulanishni avtomatik qayta ulanish siyosati (0, 2, 5, 10 soniya) bilan yaratadi va qayta ulangach ochiq chatga yana qo‘shiladi. 3.2-rasmda sarlavhada “yozmoqda…” holati, xabarlar yonida o‘qilganlik belgilari, ro‘yxatda esa tashkilot a’zolari yonidagi “tuit.uz ✓” belgisi ko‘rinib turibdi.',
  ),
  ...figure('3-05-private-chat.jpg', '3.2', 'Shaxsiy chat: real vaqtda “yozmoqda” holati va o‘qilganlik belgilari', 13.5),

  h3('Media fayllar, guruhlar va lavhalar.'),
  ...ps(
    'Rasm, video va fayllar bitta konveyerdan o‘tadi: hajm tekshiriladi (rasm 10 MB, fayl 50 MB, video 200 MB gacha), fayl ClamAV bilan skanerlanadi, rasm formati tarkibi bo‘yicha aniqlanib qayta kodlanadi va 256 pikselli kichik nusxasi yaratiladi, video uchun esa ffmpeg yordamida muqova olinadi. Fayl diskka GUID nom bilan yoziladi, bazaga metama’lumotlar va xabar qo‘shiladi, a’zolarga esa MessageReceived hodisasi yuboriladi. Videolar HTTP Range so‘rovlari orqali oqim ko‘rinishida beriladi, shuning uchun foydalanuvchi videoni to‘liq yuklanishini kutmasdan ko‘ra boshlaydi. Chatdagi barcha media ma’lumot panelida turlari bo‘yicha guruhlanadi (3.3-rasm).',
  ),
  ...figure('3-08-shared-media.jpg', '3.3', 'Chatdagi ulashilgan media paneli', 12.5),
  p(
    'Guruh chatlari GroupService servisida amalga oshirilgan: har bir amaldan oldin foydalanuvchi roli aniqlanadi va 2.3-jadvaldagi ruxsatlar qo‘llanadi, o‘zgarishlar esa xizmat xabarlari bilan birga saqlanadi. Guruh egasi chiqib ketsa, egalik eng oldin tayinlangan administratorga, u bo‘lmasa eng oldin qo‘shilgan a’zoga o‘tadi; guruhda hech kim qolmasa, u yumshoq o‘chiriladi. Guruhga qo‘shilayotganlar orasida qo‘shayotgan foydalanuvchi bilan bloklash o‘rnatilgan odam bo‘lsa, so‘rov rad etiladi. Taklif havolasi uchun 16 baytli kriptografik tasodifiy token yaratiladi, havola yangilanganda eski token darhol ishlamay qoladi. Guruh chati va ma’lumot paneli 3.4-rasmda ko‘rsatilgan.',
  ),
  ...figure('3-13-group-chat.jpg', '3.4', 'Guruh chati va guruh haqidagi ma’lumot paneli', 12.5),
  ...ps(
    'Lavhalar (stories) StoryService servisida amalga oshirilgan: rasm yoki video (50 MB gacha) va izohdan iborat lavha 24 soat ko‘rinadi, so‘ng lentadan avtomatik chiqadi. Dastlab lentada foydalanuvchi bilan chati bor barcha odamlarning lavhalari chiqardi. Forum qo‘shilgach, lenta forumdagi obunalarga bog‘landi: endi unda faqat foydalanuvchining o‘zi va u obuna bo‘lgan odamlarning lavhalari chiqadi. Shunday qilib, kimning lavhalarini ko‘rishni foydalanuvchining o‘zi tanlaydi. Obuna bekor qilinsa yoki tomonlardan biri ikkinchisini bloklasa, lavhalar lentadan darhol yo‘qoladi.',
    'Ko‘rilmagan lavhalar rangli halqa bilan ajratiladi, muallif esa kim ko‘rganini biladi (3.5-rasm). Lavha media fayli ham HTTP Range orqali beriladi; video teglari Authorization sarlavhasini yubora olmagani uchun bu so‘rovda access token so‘rov parametrida qabul qilinadi.',
  ),
  ...figure('3-11-story-viewer.jpg', '3.5', 'Lavhani ko‘rish oynasi', 13.5),

  h3('Xabarlarga reaksiya va foydalanuvchini bloklash.'),
  ...ps(
    'Reaksiya — xabarga alohida javob yozmasdan munosabat bildirish usuli. MessageReactionService quyidagi qoidalarni bajaradi: reaksiya faqat chat a’zosi tomonidan va faqat oddiy xabarga qo‘yiladi (xizmat xabariga emas); ruxsat etilgan oltita emoji (👍, ❤️, 😂, 😮, 😢, 🙏) dan boshqasi rad etiladi; boshqa emoji tanlansa, eskisi almashtiriladi, xuddi shu emoji qayta yuborilsa esa hech narsa o‘zgarmaydi. O‘zgarishdan keyin server xabardagi reaksiyalarning yangi xulosasini (har bir emoji va uning soni) hisoblab, MessageReactionChanged hodisasi bilan chat a’zolariga yuboradi.',
    'Xabar ro‘yxatini yuklashda har bir xabar uchun reaksiyalar alohida so‘ralmaydi: repozitoriy sahifadagi barcha xabarlar uchun ikkita umumiy so‘rov bajaradi — biri har bir emoji soni bo‘yicha xulosani, ikkinchisi foydalanuvchining o‘z reaksiyalarini o‘qiydi. Klientda reaksiyalar xabar ostida “emoji + son” ko‘rinishidagi tugmalar sifatida chiqadi, foydalanuvchining o‘z reaksiyasi esa ramka bilan ajratiladi (3.6-rasm). O‘z reaksiyasi bosilsa, u olib tashlanadi.',
  ),
  ...figure('3-30-reactions.jpg', '3.6', 'Xabarga reaksiya bildirish: emoji paneli va xabar ostidagi reaksiyalar', 13.5),
  p(
    'Bloklash keraksiz yoki bezovta qiluvchi foydalanuvchidan himoyalanish uchun mo‘ljallangan. Bloklash yozuvi bir tomonlama saqlanadi (kim kimni bloklagan), lekin ta’siri ikki tomonlama: bloklangan foydalanuvchi ham, bloklagan foydalanuvchi ham bir-biriga yoza olmaydi. Bu tekshiruv bitta joyda emas, balki tegishli barcha servislarda bajariladi (3.3-jadval).',
  ),
  ...table(
    '3.3',
    'Bloklashning tizim qismlariga ta’siri',
    ['Tizim qismi', 'Bloklashdan keyingi xatti-harakat'],
    [
      ['Shaxsiy chat', 'Matnli xabar ham, fayl ham yuborilmaydi; fayl diskka yozilishidan oldin rad etiladi'],
      ['Onlayn holat', 'Chatlar ro‘yxatida bir-birining onlayn holati va oxirgi faolligi ko‘rinmaydi'],
      ['Guruhlar', 'Bloklangan foydalanuvchini guruhga qo‘shib bo‘lmaydi'],
      ['Maxfiy chat', 'Yangi maxfiy chat taklifi yuborilmaydi'],
      ['Forum', 'Postlar lentada ko‘rinmaydi, obuna bo‘lib bo‘lmaydi, profil yopiq'],
      ['Lavhalar', 'Obuna bo‘lingan bo‘lsa ham lavhalar lentada chiqmaydi'],
    ],
    [3.5, 10],
  ),
  p(
    'Chat menyusida “Bloklash” bandi tanlangach, xabar yozish maydoni o‘rnida “Siz bu foydalanuvchini blokladingiz” yozuvi va “Blokdan chiqarish” tugmasi chiqadi (3.7-rasm). Bloklanganlar ro‘yxati profil oynasida ham ko‘rsatiladi va u yerdan blokdan chiqarish mumkin. Ikkinchi tomon xabar yuborishga uringanda “bu foydalanuvchi bilan yozishib bo‘lmaydi: bloklash o‘rnatilgan” xatosini oladi; xatoda kim kimni bloklagani aytilmaydi.',
  ),
  ...figure('3-31-blocked-user.jpg', '3.7', 'Bloklangan foydalanuvchi bilan chat', 13.5),

  h3('Forumni amalga oshirish.'),
  ...ps(
    'Forum — foydalanuvchilar ochiq fikr almashadigan qism: chatdan farqli ravishda post ma’lum bir suhbatdoshga emas, muallifga obuna bo‘lgan barcha odamlarga ko‘rinadi. Post 280 belgigacha matn va 4 tagacha rasm yoki bitta videodan (50 MB gacha) iborat bo‘ladi. Postga javob yozish, uni repost qilish, o‘z izohi bilan iqtibos keltirish, layk bosish va shikoyat qilish mumkin. Barcha bu amallar PostService, FollowService va NotificationService servislarida, forum mediasini qayta ishlash esa alohida PostMediaService’da amalga oshirilgan.',
    'Javoblar daraxt ko‘rinishida saqlanadi: har bir javob ParentPostId orqali o‘zi javob bergan postga, RootPostId orqali esa muhokamaning birinchi postiga bog‘lanadi. Muhokama ochilganda server tanlangan post, uning 30 tagacha ajdodi va javoblarini qaytaradi. Post o‘chirilganda u bazadan o‘chmaydi, balki “Bu post o‘chirilgan” deb ko‘rsatiladi, shunda unga yozilgan javoblar ma’nosini yo‘qotmaydi.',
    'Lenta uch xil: **Obunalar** — obuna bo‘lingan mualliflarning yangi postlari, **Yangi** — barcha postlar vaqt bo‘yicha va **Top** — eng ko‘p muhokama qilinayotgan postlar. Top lenta uchun har bir postning “issiqlik” reytingi quyidagi formula bilan hisoblanadi:',
  ),
  formula('S = (L + 2R + 3P + 0,01V) / (t + 2)^{1,5}', '3.1'),
  ...ps(
    'bu yerda L — layklar, R — javoblar, P — repostlar, V — ko‘rishlar soni, t — postning soatlardagi yoshi. Javob va repost laykdan ko‘ra ko‘proq kuch talab qilgani uchun ular katta vazn oladi. Maxrajdagi daraja vaqt o‘tishi bilan reytingni pasaytiradi, shuning uchun kechagi mashhur post bugungisiga joy bo‘shatadi. Qo‘shiluvchi 2 esa endigina joylangan postning birinchi laykdanoq hammadan yuqoriga chiqib ketishiga yo‘l qo‘ymaydi. Reytingni har bir so‘rovda hisoblash qimmat bo‘lgani uchun uni HotScoreRefresh fon ishi har 5 daqiqada oxirgi 72 soat ichidagi postlar uchun yangilaydi. Lentaning bitta sahifasida bitta muallifning 2 tadan ortiq posti chiqmaydi, aks holda faol muallif butun lentani egallab olardi.',
    'Ko‘rishlar soni har bir foydalanuvchi uchun bir marta hisoblanadi: post_views jadvalida (PostId, UserId) juftligi unique. Hisoblagichlar postning o‘zida saqlanadi va atomar UPDATE so‘rovi bilan oshiriladi, shuning uchun bir vaqtda kelgan ko‘plab layklar bir-birining natijasini o‘chirib yubormaydi.',
    'Spam va suiiste’moldan himoyalanish uchun forumda bir nechta cheklov qo‘yilgan (3.4-jadval). Cheklov so‘nggi vaqt oralig‘idagi postlar sonini bazadan sanash orqali tekshiriladi. Muallif o‘z postiga shikoyat qila olmaydi, bitta foydalanuvchining bitta postga shikoyati esa (PostId, ReporterId) unique indeksi tufayli faqat bir marta saqlanadi.',
  ),
  ...table(
    '3.4',
    'Forumdagi cheklovlar',
    ['Cheklov', 'Qiymat'],
    [
      ['Post matni', '280 belgigacha'],
      ['Post mediasi', '4 tagacha rasm yoki 1 ta video (50 MB gacha)'],
      ['Yangi muhokama boshlash', 'Soatiga 10 tagacha'],
      ['Javob yozish', 'Daqiqasiga 5 tagacha'],
      ['Shikoyat sababi', '200 belgigacha'],
      ['Muhokamada ko‘rsatiladigan ajdodlar', '30 tagacha'],
      ['Top lentada bitta muallif', 'Sahifada 2 tagacha post'],
      ['Obuna tavsiyalari', 'Oxirgi 7 kunda eng ko‘p post yozgan 10 tagacha foydalanuvchi'],
    ],
    [5, 9],
  ),
  ...ps(
    'Forum bildirishnomalari besh xil hodisa uchun yaratiladi: postga javob, layk, repost, iqtibos va yangi obunachi. Foydalanuvchining o‘z amali haqida bildirishnoma yaratilmaydi. Layk, repost va obuna bekor qilinib, qayta bajarilganda bildirishnoma takrorlanmaydi — aks holda bir foydalanuvchi laykni bosib-qaytarib, muallifni bildirishnomalar bilan ko‘mib tashlashi mumkin edi. Bildirishnoma bazaga yozilgach, ForumHub orqali real vaqtda yuboriladi va interfeysdagi hisoblagich darhol yangilanadi.',
    'Obuna bo‘lingan muallif yangi post joylaganda server ForumPostPublished hodisasini obunachilarga yuboradi. Klient yangi postni lentaga darhol qo‘shmaydi, balki lenta tepasida “N ta yangi post — ko‘rsatish” tugmasini chiqaradi: shunda foydalanuvchi o‘qiyotgan post ko‘zi oldidan siljib ketmaydi.',
  ),

  h3('Lotin–kirill transliteratsiyasi va qidiruv.'),
  ...ps(
    'Xabar bazada doimo **asl holida** saqlanadi, o‘girish esa faqat ko‘rsatish paytida klientda bajariladi. Shu sababli bitta xabarni bir foydalanuvchi lotinda, boshqasi kirillda ko‘radi. Foydalanuvchi sozlamasi (ScriptPreference) serverda saqlanadi va barcha qurilmalarida amal qiladi, yozuv almashtirilganda esa xabarlar sahifani yangilamasdan qayta chiziladi. Xuddi shu sozlama forum postlariga ham qo‘llanadi.',
    'Algoritm o‘zbek lotin alifbosi va imlo qoidalariga asoslanadi [8, 9] va Domain qatlamidagi UzbekTransliterator sinfida amalga oshirilgan; klientda uning TypeScript’dagi aynan nusxasi ishlaydi. Ikkalasi bitta umumiy test to‘plami (80 ta kirill–lotin juftligi) bo‘yicha tekshiriladi. Kirilldan lotinga o‘girish deyarli bir ma’noli, teskari yo‘nalishda esa kontekstga bog‘liq qoidalar talab etiladi (3.5-jadval). O‘girishda matn har bir harf bo‘yicha bir marta o‘qiladi: harf uchun avval kontekstga bog‘liq qoidalar (oldingi harf unli yoki so‘z boshi ekani), keyin oddiy moslik lug‘ati tekshiriladi, shuning uchun algoritmning murakkabligi matn uzunligiga chiziqli bog‘liq.',
  ),
  ...table(
    '3.5',
    'Kontekstga bog‘liq transliteratsiya qoidalari',
    ['Holat', 'Qoida', 'Misol'],
    [
      ['Kirill “е”', 'So‘z boshida, unlidan yoki ъ, ь dan keyin “ye”, qolgan hollarda “e”', 'ер → yer; келди → keldi'],
      ['Kirill “ц”', 'Unlidan keyin “ts”, qolgan hollarda “s”', 'лицей → litsey; цирк → sirk'],
      ['ў, ғ va tutuq', 'ў → o‘, ғ → g‘, ъ → ’; “сҳ” tutuq bilan yoziladi', 'Ўзбек → O‘zbek; Исҳоқ → Is’hoq'],
      ['Lotin digraflari', 'sh → ш, ch → ч, o‘ → ў, g‘ → ғ, yo → ё, yu → ю, ya → я', 'shahar → шаҳар; yo‘l → йўл'],
      ['Lotin “e”', 'So‘z boshida yoki unlidan keyin “э”, qolgan hollarda “е”', 'eshik → эшик; kecha → кеча'],
      ['Registr', 'Bosh harf saqlanadi; katta harfli so‘zda digraf ham katta', 'ШАҲАР → SHAHAR'],
      ['Tutuq variantlari', '\', ‘, ’, `, ʻ, ʼ belgilari bir xil tushuniladi', 'o\'zbek = o‘zbek = oʻzbek'],
      ['Himoyalangan qismlar', 'URL, e-pochta, @username, #teg va `kod` o‘girilmaydi', 'https://tuit.uz o‘zgarmaydi'],
    ],
    [3, 6.5, 5],
  ),
  p(
    'Natija 3.8-rasmda ko‘rsatilgan: “Asl holida” sozlamasida suhbatdosh kirillda, foydalanuvchi lotinda yozgan xabarlar aralash chiqadi, “Lotin” sozlamasida esa butun suhbat lotin yozuvida ko‘rinadi.',
  ),
  ...figurePair(
    [
      ['3-20-script-original.jpg', '“Asl holida”'],
      ['3-20-script-latin.jpg', '“Lotin” sozlamasi'],
    ],
    '3.8',
    'Bitta suhbatning turli yozuv sozlamalarida ko‘rinishi',
  ),
  ...ps(
    'Qidiruv ham yozuvga bog‘liq emas: “rahmat” so‘rovi “Раҳмат”ni ham topadi. Buning uchun xabar yaratilganda va tahrirlanganda uning **qidiruv kaliti** — lotinga o‘girilgan, kichik harfli, tutuq belgilari birxillashtirilgan nusxasi SearchText ustuniga yoziladi. Qidiruv so‘rovi ham xuddi shu funksiyadan o‘tkazilib, ILIKE bilan qidiriladi [44]. Ustun qo‘shilishidan oldingi xabarlar uchun kalitlar SearchTextBackfill fon ishi tomonidan 500 tadan to‘ldiriladi. Bazadagi natija 3.9-rasmda ko‘rsatilgan.',
  ),
  ...figure('3-29-db-search-text.png', '3.9', 'messages jadvali: asl matn (TextContent) va qidiruv kaliti (SearchText)', 16),

  h3('Tashkilot rejimi.'),
  ...ps(
    'OrganizationEmailMatcher sinfi e-pochtadan domenni ajratadi, normallashtiradi va umumiy pochta xizmatlari ro‘yxati bilan solishtiradi; u tashqi bog‘liqliksiz va 22 ta unit test bilan tekshirilgan. OrganizationMembershipService.EnsureMembershipAsync metodi foydalanuvchi tasdiqlangan pochta bilan kirgan har safar chaqiriladi va quyidagi qadamlarni bajaradi:',
  ),
  ...numbered([
    'foydalanuvchi allaqachon biror tashkilot a’zosi bo‘lsa, hech narsa qilinmaydi: e-pochta o‘zgarmagani uchun a’zolik ham o‘zgarmaydi;',
    'e-pochtadan tashkilot domeni ajratiladi; umumiy pochta xizmati bo‘lsa, jarayon to‘xtaydi;',
    'domen bo‘yicha tashkilot qidiriladi, topilmasa yaratiladi va uni yaratgan foydalanuvchi tashkilot admini bo‘ladi;',
    'foydalanuvchi tashkilot a’zolari jadvaliga qo‘shiladi;',
    'tashkilotning domen guruhi hali bo‘lmasa, u yaratiladi; bo‘lsa, foydalanuvchi unga qo‘shiladi va guruhda xizmat xabari chiqadi.',
  ]),
  p(
    'Bir vaqtda ikki foydalanuvchi yangi domen bilan kirsa, organizations(Domain) ustunidagi unique indeks tufayli faqat bittasi tashkilotni yaratib admin bo‘ladi, ikkinchisining yozish urinishi rad etiladi va u mavjud tashkilotga a’zo sifatida qo‘shiladi. Tashkilot a’zoligi foydalanuvchi haqidagi barcha DTO’larga qo‘shilgan va klientda ismlar yonida “tuit.uz ✓” ko‘rinishida chiqadi. Tashqaridagi foydalanuvchi esa domen guruhiga taklif havolasi orqali kiradi (3.10-rasm).',
  ),
  ...figurePair(
    [
      ['3-22-organization-group.jpg', 'yopiq domen guruhi'],
      ['3-23-join-invite.jpg', 'taklif havolasi sahifasi'],
    ],
    '3.10',
    'Tashkilot rejimi',
  ),

  h3('Maxfiy chatlar.'),
  ...ps(
    'Server tomonida maxfiy chatlar SecretChatService va SecretChatController orqali amalga oshirilgan. Barcha endpointlar joriy qurilma nomidan ishlaydi: qurilma access tokendagi sessiya identifikatori bo‘yicha aniqlanadi va har bir so‘rovda sessiyaning faolligi bazadan qayta tekshiriladi. Chat bog‘lanmagan qurilmadan kelgan so‘rov “topilmadi” javobini oladi.',
    'Shifrlangan xabar kelganda server blobni ochmaydi, faqat uning formati va hajmini (32 KB gacha) tekshiradi. So‘ng xabarning tartib raqami shu tomonning oxirgi raqamidan katta ekani tekshiriladi: kichik yoki teng raqamli xabar takror deb rad etiladi. Bir vaqtda kelgan ikki bir xil so‘rov uchun (SecretChatId, SenderSessionId, Seq) ustunlaridagi unique indeks ikkinchi himoya chizig‘ini beradi. Shundan keyingina blob saqlanadi va faqat qabul qiluvchi qurilmaning “session:{sid}” guruhiga yuboriladi. Qabul qiluvchi xabarni olgach, ack so‘rovi yuboradi va server uni o‘chiradi; SecretChatCleanup fon ishi esa har soatda eskirgan so‘rov, xabar va fayllarni tozalaydi.',
    'Klientdagi kriptografik kod secret-crypto.ts modulida joylashgan va Angular’ga bog‘liq emas [50]; uning asosiy qismi ilovalarda keltirilgan. Yangi zanjir holati xabar yuborilishidan oldin IndexedDB’ga xabar bilan bitta tranzaksiyada yoziladi, shuning uchun sahifa to‘satdan yopilsa ham bitta xabar kaliti ikki marta ishlatilmaydi. Xabarlar qurilmadagi navbat (outbox) orqali qat’iy tartibda yuboriladi.',
    'Keyinchalik maxfiy chatlarga **o‘qilganlik belgisi** (✓✓) qo‘shildi. Oddiy chatdagi mexanizm bu yerda ishlamaydi, chunki server xabarlarni ko‘rmaydi. Shuning uchun “o‘qildi” xabari ham oddiy xabar kabi shifrlanadi va ichida “shu raqamgacha o‘qildi” qiymatini olib boradi. Uni faqat chat ekranda ochiq turganda klient yuboradi. Server bu xabarni boshqalaridan ajrata olmaydi va kim nimani qachon o‘qiganini bilmaydi, shuning uchun bu imkoniyat uchun serverda hech narsa o‘zgartirilmadi. Maxfiy chat oynasida qulf belgisi, taymer va kalit izini tekshirish tugmalari bor (3.11-rasm).',
    'Server xabar mazmunini bilmasligi amalda ham tekshirildi: suhbatdosh oflayn bo‘lgan paytda yuborilgan xabar bazada faqat ma’nosiz blob ko‘rinishida turadi, yetkazilgan xabarlar esa serverdan butunlay o‘chirilgan (3.12-rasm).',
  ),
  ...figurePair(
    [
      ['3-26-secret-chat.jpg', 'shifrlangan rasm, taymer va ✓✓'],
      ['3-27-secret-fingerprint.jpg', 'kalit izini tekshirish'],
    ],
    '3.11',
    'Maxfiy chat',
  ),
  ...figure('3-28-db-secret-messages.png', '3.12', 'secret_messages jadvali: serverda faqat yetkazilmagan shifrlangan blob saqlanadi', 16),

  // ───────────────────────────────── 3.2
  h2('3.2. Klient qismi va foydalanuvchi imkoniyatlari'),
  h3('Klient ilovasining tuzilishi.'),
  ...ps(
    'Klient ilovasi Angular 22 ning mustaqil (standalone) komponentlaridan tashkil topgan [43]. Ilova 41 ta komponent va 92 ta TypeScript faylidan iborat va to‘rtta asosiy marshrutga ega: /auth, /chat, /forum va /join/:token. /forum marshruti ichida lenta, post muhokamasi (/forum/post/:id), forum profili (/forum/user/:id) va bildirishnomalar (/forum/notifications) sahifalari bor. /chat va /forum sahifalari authGuard, /auth esa guestGuard bilan himoyalangan, barcha sahifalar kerak bo‘lganda yuklanadi (lazy loading), shuning uchun forum kodi chatdan foydalanayotgan foydalanuvchining brauzeriga umuman yuklanmaydi.',
    'Ilova holati Angular signals orqali boshqariladi: chatlar ro‘yxati, xabarlar, reaksiyalar va “yozmoqda” holati ChatApiService’da signal ko‘rinishida saqlanadi, komponentlar esa computed() yordamida “6 a’zo, 2 onlayn” kabi hosila qiymatlar oladi. REST javoblari ham, SignalR hodisalari ham holatga bir xil yo‘l bilan qo‘llanadi. Masalan, reaksiya hodisasi kelganda applyReactionEvent funksiyasi xabarni topib, uning reaksiyalar ro‘yxatini serverdan kelgan xulosa bilan almashtiradi; bu funksiya sof (pure) bo‘lgani uchun alohida unit testlar bilan tekshirilgan.',
  ),
  ...figurePair(
    [
      ['3-16-dark-theme.jpg', 'qorong‘i mavzu'],
      ['3-17-mobile.jpg', 'mobil qurilmada'],
    ],
    '3.13',
    'Qorong‘i mavzu va mobil ko‘rinish',
  ),
  p(
    'authInterceptor har bir so‘rovga access tokenni qo‘shadi, 401 javobida esa tokenni yangilab so‘rovni takrorlaydi; bir vaqtda bir nechta so‘rov muvaffaqiyatsiz bo‘lsa ham bitta refresh so‘rovi ishlatiladi. Interfeys loyihaning dizayn tizimiga asoslangan: ranglar CSS o‘zgaruvchilari orqali berilgani uchun qorong‘i mavzu ularning muqobil qiymatlari bilan amalga oshiriladi. Interfeys moslashuvchan: katta ekranda uch ustunli joylashuv, telefonda esa bir vaqtda bitta ekran ko‘rsatiladi (3.13-rasm).',
  ),

  h3('Forum interfeysi.'),
  ...ps(
    'Forumga chatlar ro‘yxati tepasidagi “Forum” tugmasi orqali o‘tiladi; tugmadagi raqam o‘qilmagan forum bildirishnomalari sonini ko‘rsatadi. Forum sahifasi uch ustunli: chapda navigatsiya (Lenta, Bildirishnomalar, Profilim) va chatlarga qaytish havolasi, o‘rtada lenta, o‘ngda esa “Kimni kuzatish kerak” tavsiyalari joylashgan. Tor ekranda o‘ng ustun yashiriladi va navigatsiya faqat belgilardan iborat ixcham panelga, telefonda esa ekranning pastki qismidagi panelga aylanadi.',
    'Lenta tepasida uchta yorliq — “Obunalar”, “Top” va “Yangi” — hamda post yozish maydoni turadi (3.14-rasm). Har bir yorliq uchun alohida yuklovchi yaratiladi, shuning uchun yorliq almashtirilganda ro‘yxat boshidan yuklanadi. Postlar ro‘yxati kursorli sahifalar bilan ishlaydi: foydalanuvchi pastga aylantirganda keyingi sahifa avtomatik so‘raladi, butun lentani birdaniga yuklash talab etilmaydi.',
    'Har bir post kartasida muallifning avatari, ismi, username, post joylanganidan beri o‘tgan vaqt (“3 daq”, “2 soat”), matn, media va to‘rtta amal tugmasi bor: javob, repost, layk va ko‘rishlar soni. Matn foydalanuvchi tanlagan yozuvda ko‘rsatiladi, ya’ni kirillda yozilgan postni lotinda o‘qish mumkin. Postdagi rasm va videolar avtorizatsiya sarlavhasi talab qilingani uchun oddiy havola sifatida emas, blob ko‘rinishida yuklanadi va bir marta yuklangani keshda saqlanadi.',
  ),
  ...figure('3-33-forum-feed.jpg', '3.14', 'Forum: “Obunalar” lentasi va obuna tavsiyalari', 12.5),
  ...ps(
    '“Top” lentasida postlar (3.1) formula bo‘yicha hisoblangan reyting tartibida chiqadi (3.15-rasm). Rasmda Aziz Nazarovning iqtibos keltirilgan posti ko‘rinib turibdi: iqtibos qilingan post muallifning o‘z matni ostida alohida ramkada ko‘rsatiladi va uni bosib asl muhokamaga o‘tish mumkin. Iqtibos “Repost” tugmasi menyusidagi “Iqtibos keltirish” bandi orqali yoziladi: u alohida dialog oynasida ochiladi va unda iqtibos qilinayotgan post oldindan ko‘rsatiladi.',
    'Repost qilingan post kartaning tepasida “… repost qildi” yozuvi bilan chiqadi. Bunday kartadagi barcha amallar — layk, javob, yana repost — asl postga qo‘llanadi, shuning uchun bitta post bir necha marta repost qilinsa ham hisoblagichlar bitta joyda yig‘iladi. Layk yoki repost bosilganda server asl postning yangi hisoblagichlari bilan to‘liq nusxasini qaytaradi va karta shu nusxa bilan qayta chiziladi.',
  ),
  ...figure('3-34-forum-top.jpg', '3.15', 'Forum: “Top” lentasi va iqtibos keltirilgan post', 12.5),
  ...ps(
    'Post bosilganda uning muhokama sahifasi ochiladi (3.16-rasm). Agar ochilgan post javob bo‘lsa, uning tepasida muhokamaning boshlang‘ich postigacha bo‘lgan barcha ajdodlari vertikal chiziq bilan bog‘langan holda ko‘rsatiladi, ochilgan postning o‘zi esa kattaroq shriftda chiqadi. Uning ostida javob yozish maydoni va javoblar ro‘yxati joylashgan.',
    'Sahifa ochilishi bilan klient ForumHub’ning JoinPost metodini chaqiradi va shu post muhokamasini kuzatishni boshlaydi. Boshqa foydalanuvchi layk bossa yoki repost qilsa, hisoblagichlar sahifani yangilamasdan o‘zgaradi. Yangi javoblar esa ro‘yxatga darhol qo‘shilmaydi: o‘qilayotgan matn siljib ketmasligi uchun ro‘yxat tepasida “N ta yangi javob — ko‘rsatish” tugmasi chiqadi. Sahifadan chiqilganda LeavePost chaqiriladi. Real vaqt yangilanishlari qo‘shimcha imkoniyat sifatida qaralgan: hab ulanmagan bo‘lsa ham sahifa REST so‘rovlari orqali to‘liq ishlaydi.',
  ),
  ...figure('3-35-forum-thread.jpg', '3.16', 'Forum: post muhokamasi va javoblar', 12.5),
  ...ps(
    'Post yozish maydonida qolgan belgilar soni ko‘rsatiladi: 20 tadan kam qolganda raqam rang bilan ajratiladi, chegara oshganda esa “Joylash” tugmasi o‘chadi. Rasm yoki video tanlanganda klient avval uning turini va hajmini tekshiradi, so‘ng faylni darhol serverga yuklaydi va post yozish maydonida ko‘rsatadi (3.17-rasm). Yuklangan fayl ko‘rsatish uchun serverdan qayta yuklab olinmaydi, balki brauzerdagi mahalliy nusxadan chiqariladi.',
    'Post joylanganda serverga matn bilan birga faqat yuklangan media identifikatorlari yuboriladi. Bu yondashuv katta videoni yuklash va postni joylashni ajratadi: foydalanuvchi video yuklanayotganda matnni yozishda davom etadi. Postga biriktirilmay qolgan media keyinchalik PostMediaCleanup fon ishi tomonidan tozalanadi, shuning uchun tashlab ketilgan yuklashlar diskni egallab qolmaydi. Foydalanuvchining o‘zi yozgan post lenta tepasiga darhol qo‘shiladi.',
  ),
  ...figure('3-36-forum-composer.jpg', '3.17', 'Forum: rasm biriktirilgan yangi post yozish', 12.5),
  ...ps(
    '“Bildirishnomalar” sahifasida kim qaysi postga javob yozgani, layk bosgani, repost qilgani, iqtibos keltirgani yoki obuna bo‘lgani ko‘rsatiladi (3.18-rasm). Har bir qatorda hodisa turi belgisi, foydalanuvchi avatari va ismi, hodisa bo‘lgan postning qisqa matni chiqadi; qator bosilganda tegishli post yoki foydalanuvchi profili ochiladi. Ro‘yxat ham kursorli sahifalar bilan yuklanadi.',
    'Sahifa ochilganda barcha bildirishnomalar o‘qilgan deb belgilanadi va navigatsiyadagi hisoblagich nolga tushadi. Forum sahifasi yopiq bo‘lsa ham ForumHub ulanishi saqlanib turadi, shuning uchun yangi bildirishnoma kelganda chatlar ro‘yxatidagi “Forum” tugmasidagi raqam darhol oshadi.',
  ),
  ...figure('3-37-forum-notifications.jpg', '3.18', 'Forum bildirishnomalari', 12.5),
  ...ps(
    'Forum profilida foydalanuvchining ismi, username, bio, obunachilar va obunalar soni hamda uchta yorliq — “Postlar”, “Obunachilar” va “Obunalar” ko‘rsatiladi (3.19-rasm). Boshqa foydalanuvchining profilida “Obuna bo‘lish” yoki “Obunani bekor qilish” tugmasi chiqadi. Obunachilar va obunalar ro‘yxati ham kursorli sahifalanadi, kursor sifatida esa obuna yozuvining identifikatori ishlatiladi.',
    'Obuna faqat forum lentasiga emas, lavhalarga ham ta’sir qiladi: foydalanuvchi kimga obuna bo‘lsa, chatlar ro‘yxati tepasidagi lavhalar qatorida o‘sha odamning lavhalari chiqadi. Bloklash o‘rnatilgan foydalanuvchining profili ochilmaydi.',
  ),
  ...figure('3-38-forum-profile.jpg', '3.19', 'Forum profili', 12.5),

  h3('Desktop bildirishnomalar.'),
  ...ps(
    'Messenjer odatda boshqa oynalar bilan bir vaqtda ochiq turadi, shuning uchun foydalanuvchi yangi xabarni o‘tkazib yubormasligi kerak. Buning uchun brauzerning Notification API’si asosida desktop bildirishnomalar qo‘shildi. NotificationService servisi yangi xabar kelganda quyidagi shartlar bajarilsa, operatsion tizim bildirishnomasini ko‘rsatadi: xabarni foydalanuvchining o‘zi yubormagan, foydalanuvchi bildirishnomalarni yoqqan va brauzer ruxsat bergan, shuningdek ilova boshqa oynada turibdi yoki xabar kelgan chat ochiq emas. Bildirishnomada jo‘natuvchi ismi va xabar matni foydalanuvchi tanlagan yozuvda (lotin yoki kirill) chiqadi, u bosilganda ilova oynasi faollashib, kerakli chat ochiladi. Bundan tashqari, brauzer yorlig‘ining sarlavhasida o‘qilmagan xabarlar soni ko‘rsatiladi.',
    'Bitta chatdan kelgan bildirishnomalar bir xil teg bilan yaratiladi, shuning uchun ketma-ket kelgan o‘nta xabar ekranda o‘nta oyna emas, bitta yangilanib turuvchi bildirishnoma bo‘lib chiqadi. Bildirishnomalar profil oynasidagi alohida kalit bilan yoqiladi (3.20-rasm): birinchi yoqilganda brauzer foydalanuvchidan ruxsat so‘raydi. Service worker ishlatilmagani sababli bildirishnoma faqat ilova brauzerda ochiq turganda keladi; bu cheklov interfeysda ham yozib qo‘yilgan.',
  ),
  ...figure('3-32-notification-setting.jpg', '3.20', 'Profil oynasi: bildirishnomalar va bloklanganlar ro‘yxati', 13.5),

  // ───────────────────────────────── 3.3
  h2('3.3. Joylashtirish, testlash va foydalanish yo‘riqnomasi'),
  h3('Joylashtirish.'),
  p(
    'Server ilovasi ko‘p bosqichli Dockerfile yordamida yig‘iladi [45]: birinchi bosqichda .NET SDK obrazida loyiha nashr qilinadi, ikkinchisida faqat natija yengil ASP.NET runtime obraziga ko‘chiriladi, shuning uchun yakuniy obrazda kompilyator va manba kodi bo‘lmaydi. Konteyner Render platformasida ishga tushiriladi va GitHub’dagi o‘zgarishlardan so‘ng avtomatik qayta yig‘iladi. Maxfiy sozlamalar (bazaga ulanish, JWT va HMAC kalitlari, SMTP) kodda emas, muhit o‘zgaruvchilarida saqlanadi. Lokal ishlab chiqish uchun repozitoriyda appsettings.example.json namunasi bor: yangi kompyuterda uni nusxalab, ma’lumotlar bazasi migratsiyalarini qo‘llash kifoya.',
  ),
  h3('Testlash.'),
  ...ps(
    'Biznes-mantiq xUnit freymvorkida NationalChat.Tests loyihasi bilan tekshirildi [49]. Tashqi bog‘liqliklar NSubstitute yordamida soxtalashtirildi, vaqtga bog‘liq mantiq (lavhalarning 24 soati, top lenta reytingi, forum cheklovlari) esa qat’iy TimeProvider bilan sinaldi. Serverda 425 ta, klientda Vitest freymvorkida 20 ta faylda 295 ta test yozildi [51]. Klient testlari transliteratsiyaning server bilan bir xil ishlashini, shifrlash va kalit zanjirini, soxta xabarlarni rad etishni, reaksiya hodisalarini qo‘llashni va bildirishnoma ko‘rsatish shartlarini tekshiradi. Barcha testlar muvaffaqiyatli o‘tdi (3.21-rasm), server testlari tarkibi 3.6-jadvalda keltirilgan.',
  ),
  ...figure('3-19-unit-tests.png', '3.21', 'Server (dotnet test) va klient (ng test) testlarini bajarish natijasi', 15.5),
  ...table(
    '3.6',
    'Server unit testlari tarkibi va natijalari',
    ['Test sinflari', 'Soni', 'Tekshiriladigan holatlar', 'Natija'],
    [
      ['UzbekTransliteratorTests, MessageSearchTextTests', '167', 'Umumiy to‘plamdagi 80 ta juftlik ikkala yo‘nalishda, kontekst qoidalari, registr, himoyalangan qismlar, qidiruv kaliti', 'O‘tdi'],
      ['Forum (6 ta sinf)', '79', 'Post, javob va iqtibos, media, cheklovlar, shikoyat, top lenta reytingi va sahifalash, obunalar, bildirishnomalarni takrorlamaslik', 'O‘tdi'],
      ['Organization… (3 ta sinf)', '44', 'Domenni ajratish, o‘xshash va umumiy domenlar, birinchi foydalanuvchi — admin, taklif havolalari', 'O‘tdi'],
      ['SecretChatServiceTests, AuthServiceSecretChatTests', '39', 'Qurilmaga bog‘lash, takroriy seq’ni rad etish, boshqa qurilmadan yuborish, ack, logout’da yopilish', 'O‘tdi'],
      ['Reaksiya, bloklash, lavhalar lentasi (4 ta sinf)', '30', 'Ruxsat etilgan emoji, reaksiyani almashtirish, bloklangan chatga yozish, lentada faqat obunalar', 'O‘tdi'],
      ['GroupServiceTests, ChatPermissionTests', '22', 'Rollar va ruxsatlar, egalikni o‘tkazish, a’zolar limiti', 'O‘tdi'],
      ['Xeshlash, sessiyalar, sahifalash, validatorlar va boshqalar', '44', 'PBKDF2 va HMAC, ruxsat etilgan manzillar, kursorli sahifalash, validatsiya chegaralari', 'O‘tdi'],
      ['Jami', '425', '', '425 / 425'],
    ],
    [4.2, 1.1, 7.4, 1.6],
  ),
  p(
    'Bundan tashqari, guruh chatlari uchun API darajasida 43 ta tekshiruvdan iborat avtomatik ssenariy yozildi va barchasi muvaffaqiyatli o‘tdi. Maxfiy chatlar ikki alohida brauzerda haqiqiy server bilan sinaldi. Diplom loyihasidagi barcha skrinshotlar ham haqiqiy tizimdan avtomatik olindi: alohida skript sinov bazasini REST API orqali namunaviy ma’lumotlar bilan to‘ldiradi, ikkinchi skript esa brauzerni boshqarib, kerakli ekranlarni suratga oladi. Qo‘lda o‘tkazilgan asosiy sinovlar 3.7-jadvalda keltirilgan.',
  ),
  ...table(
    '3.7',
    'Qo‘lda o‘tkazilgan asosiy sinov ssenariylari',
    ['№', 'Ssenariy', 'Kutilgan natija', 'Natija'],
    [
      ['1', 'Yangi e-pochta bilan kirish va ro‘yxatdan o‘tish', 'Kod keladi, profil yaratiladi, chat sahifasi ochiladi', 'Mos'],
      ['2', 'Noto‘g‘ri kodni 5 marta kiritish', 'Kod bekor qilinadi, keyin to‘g‘ri kod ham qabul qilinmaydi', 'Mos'],
      ['3', 'Ikki brauzerda xabar almashish', 'Xabar sahifani yangilamasdan keladi, ✓✓ belgisi paydo bo‘ladi', 'Mos'],
      ['4', 'Guruhda xabarga reaksiya qo‘yish', 'Reaksiya barcha a’zolarda darhol ko‘rinadi, boshqa emoji tanlansa almashadi', 'Mos'],
      ['5', 'Foydalanuvchini bloklash', 'Ikkala tomon ham yoza olmaydi, onlayn holat yashiriladi', 'Mos'],
      ['6', 'Oddiy a’zo guruhni boshqarishga urinadi', 'Boshqaruv tugmalari ko‘rinmaydi, API rad etadi', 'Mos'],
      ['7', 'Forumda post yozish va unga boshqa brauzerdan javob berish', 'Javob va hisoblagich sahifani yangilamasdan chiqadi, muallif bildirishnoma oladi', 'Mos'],
      ['8', 'Bir daqiqada 6 ta javob yozish', 'Oltinchi javob rad etiladi, yangi muhokama boshlash mumkin', 'Mos'],
      ['9', 'Boshqa oynada turganda yangi xabar kelishi', 'Desktop bildirishnoma chiqadi, bosilganda chat ochiladi', 'Mos'],
      ['10', 'Kirillcha xabarni “Lotin” sozlamasida ko‘rish va qidirish', 'Xabar lotinda ko‘rinadi, lotincha so‘rov uni topadi', 'Mos'],
      ['11', '@tuit.uz va @gmail.com bilan ro‘yxatdan o‘tish', 'Birinchisi belgi oladi va domen guruhiga qo‘shiladi, ikkinchisi yo‘q', 'Mos'],
      ['12', 'Ikki brauzerda maxfiy chat, rasm va taymer', 'Kalit izlari bir xil, ✓✓ chiqadi, muddati o‘tgan xabar ikkala tomonda o‘chadi', 'Mos'],
      ['13', 'Telefon o‘lchamida (375 px) foydalanish', 'Gorizontal aylantirish yo‘q, barcha amallar mavjud', 'Mos'],
    ],
    [0.8, 5, 6.5, 1.4],
  ),

  h3('Foydalanish yo‘riqnomasi.'),
  p(
    '**Tizimga kirish.** Kirish sahifasida e-pochta manzili kiritiladi yoki Google hisobi tanlanadi, so‘ng pochtaga kelgan 6 xonali kod kiritiladi (3.22-rasm). Manzil birinchi marta ishlatilayotgan bo‘lsa, ism, familiya va username kiritilib profil yaratiladi. Tashkilot pochtasi bilan kirilganda foydalanuvchi tashkilotning domen guruhiga avtomatik qo‘shiladi.',
  ),
  ...figurePair(
    [
      ['3-01-login.jpg', 'kirish sahifasi'],
      ['3-02-otp.jpg', 'tasdiqlash kodi'],
    ],
    '3.22',
    'Tizimga kirish',
  ),
  p(
    '**Xabar almashish.** Chap paneldagi qidiruv maydoniga ism yoki username yozilib, suhbatdosh tanlanadi. Xabar pastdagi maydonga yoziladi va Enter bilan yuboriladi, qisqich tugmasi orqali fayl biriktiriladi. Xabar ustiga olib borilganda reaksiya, javob berish, tahrirlash va o‘chirish amallari chiqadi. Sarlavhadagi qidiruv tugmasi chat ichida qidiradi, topilgan xabar bosilganda chat o‘sha joyga aylantiriladi (3.23-rasm). Keraksiz suhbatdosh chat menyusidagi “Bloklash” bandi orqali bloklanadi.',
  ),
  ...figurePair(
    [
      ['3-06-reply.jpg', 'xabarga javob yozish'],
      ['3-09-message-search.jpg', 'chat ichida qidirish'],
    ],
    '3.23',
    'Xabar almashish',
  ),
  p(
    '**Profil va sozlamalar.** Profil oynasida ism, username va profil rasmi tahrirlanadi, mavzu almashtiriladi. “Yozuv” bo‘limida xabarlar qaysi yozuvda ko‘rsatilishi tanlanadi: “Asl holida”, “Lotin” yoki “Кирилл” (3.24-rasm). Shu oynada desktop bildirishnomalar yoqiladi, bloklangan foydalanuvchilar ro‘yxati ko‘riladi va “Qurilmalar” bo‘limida begona qurilma hisobdan chiqariladi.',
  ),
  ...figurePair(
    [
      ['3-12-profile-editor.jpg', 'profilni tahrirlash'],
      ['3-21-script-setting.jpg', '“Yozuv” sozlamasi'],
    ],
    '3.24',
    'Profil oynasi',
  ),
  p(
    '**Guruh yaratish.** Chatlar ro‘yxati tepasidagi “Yangi guruh” tugmasi bosiladi va qidiruv orqali a’zolar tanlanadi, so‘ng “Keyingi” tugmasi bosilib, guruh nomi, tavsifi va rasmi kiritiladi (3.25-rasm). Guruh sarlavhasi bosilganda ma’lumot paneli ochiladi (3.4-rasm): ega va administratorlar bu yerda a’zolarni boshqaradi va taklif havolasini yaratadi.',
  ),
  ...figurePair(
    [
      ['3-14-group-create-members.jpg', 'a’zolarni tanlash'],
      ['3-15-group-create-details.jpg', 'guruh ma’lumotlari'],
    ],
    '3.25',
    'Yangi guruh yaratish',
  ),
  ...bullets([
    '**Forum.** “Forum” tugmasi orqali forumga o‘tiladi. Post yozish uchun lenta tepasidagi maydonga matn kiritiladi, rasm tugmasi orqali media qo‘shiladi va “Joylash” bosiladi. Muallifning ismi bosilganda uning profili ochiladi, u yerda “Obuna bo‘lish” tugmasi bor. Repost tugmasi bosilganda “Repost qilish” yoki “Iqtibos keltirish” tanlanadi.',
    '**Lavhalar.** Chatlar ro‘yxati tepasidagi o‘z avatari bosilib, rasm yoki video tanlanadi. Obuna bo‘lingan odamlarning lavhalari shu qatorda chiqadi, ko‘rilmaganlari rangli halqa bilan belgilanadi.',
    '**Maxfiy chat.** Shaxsiy chat menyusidagi “Maxfiy chat boshlash” bandi tanlanadi. Suhbatdosh taklifni qabul qilgach, kalit izini yuzma-yuz solishtirish, taymer o‘rnatish va shifrlangan fayl yuborish mumkin. Maxfiy chat faqat u ochilgan qurilmada ishlaydi.',
  ]),

  h2('3-bob bo‘yicha xulosa', { toc: false }),
  p(
    'Uchinchi bobda “Milliy” xabarchining dasturiy amalga oshirilishi ko‘rib chiqildi. Server qismida 17 ta controller va 104 ta endpointdan iborat REST API, kursorli sahifalash, ChatHub va ForumHub SignalR hablari, onlayn holatni kuzatish, media fayllarni xavfsiz qayta ishlash, guruhlar va lavhalar yaratildi. Keyingi bosqichda xabarlarga reaksiya, foydalanuvchini bloklash, reytingli top lentaga ega forum va desktop bildirishnomalar qo‘shildi; ular mavjud arxitekturaga uning qatlamlarini o‘zgartirmasdan joylashdi. Tizimning o‘ziga xos uchta imkoniyati — lotin–kirill transliteratsiyasi va yozuvdan qat’i nazar qidiruv, e-pochta domeni orqali tashkilot rejimi hamda o‘qilganlik belgisiga ega E2E shifrlangan maxfiy chatlar amalga oshirildi. Tizim Docker konteynerida bulutga joylashtirildi va 425 ta server, 295 ta klient testi, 43 ta integratsion tekshiruv hamda qo‘lda o‘tkazilgan sinovlar bilan tasdiqlandi.',
  ),
];
