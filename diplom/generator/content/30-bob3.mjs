import { bullets, figure, figurePair, formula, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter3 = () => [
  h1('III-bob. “Milliy” xabarchini ishlab chiqish'),

  // ───────────────────────────────── 3.1
  h2('3.1. Server qismini ishlab chiqish'),
  h3('Server tuzilmasi va REST API.'),
  ...ps(
    'Server dasturi to‘rt qismdan (Domain, Application, Infrastructure, API) va testlar loyihasidan iborat. Dastur ishga tushadigan asosiy fayl — Program.cs juda qisqa [42]. U faqat har bir so‘rov qanday tartibda ishlanishini belgilaydi: avval xatolar ushlanadi, so‘ng xavfsizlik sozlamalari qo‘llanadi, foydalanuvchi kimligi va huquqi tekshiriladi, keyin so‘rov kerakli joyga yo‘naltiriladi. Har bir imkoniyatning sozlamalari alohida faylga ajratilgan. Shuning uchun yangi imkoniyat qo‘shilganda bu fayl o‘zgarmaydi: forum, reaksiyalar va bloklash ham mavjud kodga tegmasdan qo‘shildi.',
    'Server 17 ta controller orqali 104 ta API manzilni (endpoint) taqdim etadi (3.1-jadval). Manzillar REST qoidalariga ko‘ra nomlangan: manzil nima bilan ishlanayotganini, so‘rov turi esa nima qilinayotganini bildiradi. Masalan, xabarga reaksiya qo‘yish uchun “PUT /api/chats/{chatId}/messages/{messageId}/reaction” manziliga so‘rov yuboriladi, uni olib tashlash uchun esa xuddi shu manzilga “DELETE” so‘rovi yuboriladi. Bu yerda PUT tanlangani bejiz emas. Bitta foydalanuvchi bitta xabarga faqat bitta reaksiya qo‘ya oladi, shuning uchun so‘rov yangi yozuv qo‘shmaydi, balki holatni o‘rnatadi. U ikki marta yuborilsa ham natija o‘zgarmaydi.',
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
    'API’ning hujjatlari Swagger yordamida avtomatik yaratiladi. Unda har bir manzilni brauzerning o‘zidan sinab ko‘rish mumkin (3.1-rasm). Server barcha javoblarni bir xil ko‘rinishda qaytaradi, xato xabarlari esa o‘zbek tilida yozilgan. Brauzerdan kelgan ma’lumotlar qayta ishlanishidan oldin tekshiriladi [48]. Kutilmagan xato yuz bersa, uning tafsilotlari jurnalga yoziladi, foydalanuvchiga esa ichki ma’lumotlarsiz qisqa xabar qaytariladi.',
    'Ro‘yxat qaytaradigan barcha manzillarda kursorli sahifalash ishlatiladi. Chatda minglab xabar bo‘lishi mumkin, ularni bir yo‘la yuklash sahifani sekinlashtiradi. Shuning uchun xabarlar qismlab yuklanadi: avval eng oxirgilari, foydalanuvchi yuqoriga aylantirganda esa undan oldingilari. Server har safar qaysi xabarda to‘xtaganini eslab qoladi va keyingi qismni o‘sha joydan beradi. Bu usulning afzalligi shundaki, ro‘yxat qanchalik uzun bo‘lmasin, har bir qism bir xil tezlikda yuklanadi. Bazadan faqat kerakli ustunlar o‘qiladi [16, 41]. Bu usul barcha ro‘yxatlar uchun bitta umumiy funksiya sifatida yozilgan. Forumning top lentasida postlar vaqt bo‘yicha emas, mashhurlik bo‘yicha tartiblangani uchun u yerda to‘xtalgan joy ikki qiymat bilan eslab qolinadi: oxirgi postning mashhurlik bahosi va raqami.',
  ),
  ...figure('3-04-swagger.jpg', '3.1', 'Swagger UI: server API hujjatlari', 14),

  h3('Real vaqtda xabar almashish.'),
  p(
    'Jonli aloqa ikkita SignalR markazi (hab) orqali ishlaydi [40]. ChatHub chatlar uchun mo‘ljallangan: brauzer unda to‘rtta funksiyani chaqira oladi, server esa brauzerga o‘n besh xil hodisa yuboradi. ForumHub esa forumdagi yangiliklarni yetkazadi (3.2-jadval). Ular ikkiga ajratilgan, chunki forumni ochmagan foydalanuvchiga forum yangiliklarini yuborish ortiqcha. ChatHub’ga ulangan har bir qurilma ikki guruhga qo‘shiladi. Birinchi guruh foydalanuvchining barcha qurilmalarini birlashtiradi. Ikkinchi guruhda faqat shu qurilma bo‘ladi, u maxfiy chat hodisalarini faqat chat ochilgan qurilmaga yetkazish uchun kerak.',
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
    'Hab funksiyalari ham oddiy API kabi himoyalangan: har bir chaqiruvda foydalanuvchi shu chat a’zosi ekani tekshiriladi. Aks holda chat raqamini taxmin qilib, begona chatdagi hodisalarni kuzatish mumkin bo‘lardi. ForumHub ham postni kuzatishga ruxsat berishdan oldin post shu foydalanuvchiga ko‘rinishini tekshiradi: masalan, bloklangan muallifning postini kuzatib bo‘lmaydi.',
    'Jonli bildirishnoma faqat ma’lumot bazaga muvaffaqiyatli yozilgandan keyin yuboriladi. Bildirishnomani yuborishda xato bo‘lsa ham, asosiy amal bekor qilinmaydi: xabar bazada saqlangan bo‘lsa, foydalanuvchi uni keyingi yuklashda baribir oladi.',
    'Foydalanuvchining onlayn ekanini kuzatish uchun faol ulanishlar hisobi yuritiladi. Bitta server bo‘lsa, bu hisob server xotirasida, bir nechta server bo‘lsa, Redis’da saqlanadi. Oxirgi ulanish uzilgandan keyin server 8 soniya kutadi. Shuning uchun foydalanuvchi sahifani yangilaganda yoki internet qisqa uzilganda suhbatdoshlari uni “oflayn” deb ko‘rmaydi. Ulanish uzilsa, brauzer uni 0, 2, 5 va 10 soniyadan keyin avtomatik qayta tiklaydi va ochiq chatga qayta qo‘shiladi. 3.2-rasmda chat sarlavhasida “yozmoqda…” holati, xabarlar yonida o‘qilganlik belgilari, ro‘yxatda esa tashkilot a’zolari yonidagi “tuit.uz ✓” belgisi ko‘rinib turibdi.',
  ),
  ...figure('3-05-private-chat.jpg', '3.2', 'Shaxsiy chat: real vaqtda “yozmoqda” holati va o‘qilganlik belgilari', 13.5),

  h3('Media fayllar, guruhlar va lavhalar.'),
  ...ps(
    'Rasm, video va fayllar bir xil yo‘ldan o‘tadi. Avval hajmi tekshiriladi: rasm 10 MB gacha, fayl 50 MB gacha, video 200 MB gacha bo‘lishi mumkin. So‘ng fayl antivirus bilan tekshiriladi. Rasmning haqiqatan rasm ekani uning ichki tuzilishiga qarab aniqlanadi, keyin u qaytadan saqlanadi va 256 piksellik kichik nusxasi yaratiladi. Video uchun muqova rasmi olinadi. Fayl diskka tasodifiy nom bilan yoziladi, bazaga u haqidagi ma’lumot va xabar qo‘shiladi, chat a’zolariga esa yangi xabar haqida hodisa yuboriladi. Videolar qismlab beriladi, shuning uchun foydalanuvchi videoni to‘liq yuklanishini kutmasdan ko‘ra boshlaydi. Chatdagi barcha media ma’lumot panelida turlari bo‘yicha guruhlangan holda ko‘rsatiladi (3.3-rasm).',
  ),
  ...figure('3-08-shared-media.jpg', '3.3', 'Chatdagi ulashilgan media paneli', 12.5),
  p(
    'Guruh chatlarida har bir amaldan oldin foydalanuvchining roli aniqlanadi va 2.3-jadvaldagi huquqlar tekshiriladi. Har bir o‘zgarish haqida guruhda xizmat xabari paydo bo‘ladi. Guruh egasi guruhdan chiqib ketsa, egalik eng oldin tayinlangan administratorga, u bo‘lmasa eng oldin qo‘shilgan a’zoga o‘tadi. Guruhda hech kim qolmasa, u o‘chiriladi. Guruhga qo‘shilayotganlar orasida qo‘shayotgan odam bilan bir-birini bloklagan kishi bo‘lsa, so‘rov rad etiladi. Taklif havolasi uchun taxminlab bo‘lmaydigan tasodifiy kod yaratiladi. Havola yangilanganda eskisi darhol ishlamay qoladi. Guruh chati va ma’lumot paneli 3.4-rasmda ko‘rsatilgan.',
  ),
  ...figure('3-13-group-chat.jpg', '3.4', 'Guruh chati va guruh haqidagi ma’lumot paneli', 12.5),
  ...ps(
    'Lavha — rasm yoki video (50 MB gacha) va qisqa izohdan iborat bo‘lib, 24 soat ko‘rinadi, keyin lentadan avtomatik chiqadi. Dastlab lentada foydalanuvchi bilan yozishgan barcha odamlarning lavhalari chiqardi. Forum qo‘shilgach, lenta forumdagi obunalarga bog‘landi: endi unda faqat foydalanuvchining o‘zi va u obuna bo‘lgan odamlarning lavhalari ko‘rinadi. Shunday qilib, kimning lavhalarini ko‘rishni foydalanuvchining o‘zi tanlaydi. Obuna bekor qilinsa yoki kimdir ikkinchisini bloklasa, lavhalar lentadan darhol yo‘qoladi.',
    'Ko‘rilmagan lavhalar rangli halqa bilan ajratiladi, muallif esa lavhasini kim ko‘rganini biladi (3.5-rasm). Lavha videosi ham qismlab beriladi. Brauzerning video elementi so‘rovga token qo‘sha olmagani uchun bu so‘rovda token manzilning o‘zida yuboriladi.',
  ),
  ...figure('3-11-story-viewer.jpg', '3.5', 'Lavhani ko‘rish oynasi', 13.5),

  h3('Xabarlarga reaksiya va foydalanuvchini bloklash.'),
  ...ps(
    'Reaksiya — xabarga alohida javob yozmasdan munosabat bildirish usuli. Unga bir nechta qoida qo‘yilgan. Reaksiyani faqat chat a’zosi qo‘ya oladi va faqat oddiy xabarga, xizmat xabariga emas. Faqat oltita emoji ruxsat etilgan: 👍, ❤️, 😂, 😮, 😢, 🙏. Foydalanuvchi boshqa emoji tanlasa, eskisi almashadi, xuddi shu emojini qayta bossa, hech narsa o‘zgarmaydi. Har bir o‘zgarishdan keyin server xabardagi reaksiyalarni qayta sanaydi va natijani chat a’zolariga darhol yuboradi.',
    'Xabarlar ro‘yxati yuklanganda har bir xabarning reaksiyalari alohida so‘ralmaydi. Butun sahifa uchun ikkitagina so‘rov bajariladi: biri har bir emoji necha marta bosilganini, ikkinchisi foydalanuvchining o‘zi qaysi reaksiyalarni qo‘yganini o‘qiydi. Ekranda reaksiyalar xabar ostida “emoji va son” ko‘rinishidagi tugmalar sifatida chiqadi, foydalanuvchining o‘z reaksiyasi ramka bilan ajratiladi (3.6-rasm). O‘z reaksiyasini bossa, u olib tashlanadi.',
  ),
  ...figure('3-30-reactions.jpg', '3.6', 'Xabarga reaksiya bildirish: emoji paneli va xabar ostidagi reaksiyalar', 13.5),
  p(
    'Bloklash keraksiz yoki bezovta qiluvchi odamdan himoyalanish uchun kerak. Bazada kim kimni bloklagani yoziladi, lekin uning ta’siri ikki tomonga ham tegadi: bloklangan odam ham, bloklagan odam ham bir-biriga yoza olmaydi. Bu tekshiruv bitta joyda emas, bloklash ta’sir qiladigan barcha qismlarda bajariladi (3.3-jadval).',
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
    'Chat menyusida “Bloklash” tanlangach, xabar yozish maydoni o‘rnida “Siz bu foydalanuvchini blokladingiz” yozuvi va “Blokdan chiqarish” tugmasi paydo bo‘ladi (3.7-rasm). Bloklanganlar ro‘yxati profil oynasida ham ko‘rsatiladi va ularni u yerdan blokdan chiqarish mumkin. Ikkinchi tomon xabar yozmoqchi bo‘lsa, “bu foydalanuvchi bilan yozishib bo‘lmaydi” degan xabarni ko‘radi. Unda kim kimni bloklagani aytilmaydi.',
  ),
  ...figure('3-31-blocked-user.jpg', '3.7', 'Bloklangan foydalanuvchi bilan chat', 13.5),

  h3('Forumni amalga oshirish.'),
  ...ps(
    'Forum — foydalanuvchilar ochiq fikr almashadigan bo‘lim. Chatdan farqi shundaki, post bitta odamga emas, muallifga obuna bo‘lgan hammaga ko‘rinadi. Post 280 belgigacha matn va 4 tagacha rasm yoki bitta videodan (50 MB gacha) iborat bo‘lishi mumkin. Postga javob yozish, uni boshqalarga ulashish (repost), o‘z fikri bilan iqtibos keltirish, yoqtirish (layk) va shikoyat qilish mumkin.',
    'Javoblar daraxt ko‘rinishida saqlanadi: har bir javob o‘zi javob bergan postga va muhokama boshlangan birinchi postga bog‘langan. Muhokama ochilganda server tanlangan postni, uning ustidagi 30 tagacha oldingi postni va unga yozilgan javoblarni qaytaradi. O‘chirilgan post bazadan yo‘qolmaydi, uning o‘rnida “Bu post o‘chirilgan” deb yoziladi. Shunda unga yozilgan javoblar ma’nosini yo‘qotmaydi.',
    'Forumda uch xil lenta bor. “Obunalar” lentasida foydalanuvchi obuna bo‘lgan mualliflarning yangi postlari chiqadi. “Yangi” lentasida barcha postlar vaqt bo‘yicha chiqadi. “Top” lentasida esa eng ko‘p muhokama qilinayotgan postlar chiqadi. Top lenta uchun har bir postning mashhurlik bahosi quyidagi formula bilan hisoblanadi:',
  ),
  formula('S = (L + 2R + 3P + 0,01V) / (t + 2)^{1,5}', '3.1'),
  ...ps(
    'bu yerda L — layklar, R — javoblar, P — repostlar, V — ko‘rishlar soni, t — postning soatlarda o‘lchangan yoshi. Javob yozish yoki postni ulashish layk bosishdan ko‘ra ko‘proq harakat talab qiladi, shuning uchun ular kattaroq vazn bilan hisoblanadi. Maxrajdagi daraja vaqt o‘tishi bilan bahoni pasaytiradi, shuning uchun kechagi mashhur post bugungi postga joy bo‘shatadi. Maxrajdagi 2 soni esa endigina joylangan postning birinchi laykdanoq hammadan yuqoriga chiqib ketishiga yo‘l qo‘ymaydi. Bahoni har safar hisoblash ko‘p vaqt oladi, shuning uchun u har 5 daqiqada fonda, oxirgi 72 soat ichidagi postlar uchun yangilanadi. Lentaning bitta sahifasida bitta muallifning ikkitadan ortiq posti chiqmaydi, aks holda faol muallif butun lentani egallab olardi.',
    'Har bir foydalanuvchi postni necha marta ochmasin, u bir marta ko‘rgan deb hisoblanadi. Layk va ko‘rishlar soni postning o‘zida saqlanadi va bazaning o‘zida oshiriladi. Shuning uchun bir vaqtda kelgan ko‘plab layklar bir-birini o‘chirib yubormaydi.',
    'Spam va suiiste’moldan himoyalanish uchun forumda bir nechta cheklov qo‘yilgan (3.4-jadval). Muallif o‘z postiga shikoyat qila olmaydi, bitta foydalanuvchi bitta postga faqat bir marta shikoyat qila oladi.',
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
    'Forum bildirishnomalari besh holatda yuboriladi: postga javob yozilganda, layk bosilganda, post ulashilganda, iqtibos keltirilganda va yangi obunachi paydo bo‘lganda. Foydalanuvchining o‘z amali haqida bildirishnoma yuborilmaydi. Layk, repost yoki obuna bekor qilinib, qayta bosilsa, bildirishnoma takrorlanmaydi. Aks holda kimdir laykni bosib-qaytarib, muallifni bildirishnomalarga ko‘mib tashlashi mumkin edi. Bildirishnoma bazaga yozilgach, darhol muallifga yuboriladi va ekrandagi hisoblagich oshadi.',
    'Obuna bo‘lingan muallif yangi post joylaganda obunachilar bu haqda darhol xabar oladi. Lekin yangi post lentaga to‘satdan qo‘shilmaydi. Buning o‘rniga lenta tepasida “N ta yangi post — ko‘rsatish” tugmasi chiqadi. Shunda foydalanuvchi o‘qiyotgan post ko‘z oldidan siljib ketmaydi.',
  ),

  h3('Lotin–kirill transliteratsiyasi va qidiruv.'),
  ...ps(
    'Xabar bazada doim qanday yozilgan bo‘lsa, shunday saqlanadi. Boshqa yozuvga o‘girish faqat ekranga chiqarishda, foydalanuvchining brauzerida bajariladi. Shu tufayli bitta xabarni bir kishi lotinda, boshqasi kirillda o‘qiydi. Foydalanuvchining yozuv sozlamasi serverda saqlanadi va uning barcha qurilmalarida amal qiladi. Yozuv almashtirilganda xabarlar sahifani yangilamasdan qayta chiziladi. Bu sozlama forum postlariga ham ta’sir qiladi.',
    'O‘girish algoritmi o‘zbek lotin alifbosi va imlo qoidalariga asoslangan [8, 9]. U serverda C# tilida yozilgan, brauzerda esa uning TypeScript’dagi aynan nusxasi ishlaydi. Ikkalasi bir xil ishlashini tekshirish uchun 80 ta kirill–lotin juftlikdan iborat umumiy test to‘plami tuzilgan. Kirilldan lotinga o‘girish ancha oson, chunki deyarli har bir harfning bitta mosi bor. Teskari yo‘nalishda esa harf so‘zning qayerida turganiga qarab har xil o‘giriladi (3.5-jadval). Algoritm matnni bir marta boshidan oxirigacha o‘qib chiqadi. Har bir harf uchun avval maxsus qoidalar tekshiriladi, masalan, harf so‘z boshidami yoki unlidan keyinmi. Mos qoida bo‘lmasa, oddiy moslik jadvali ishlatiladi. Shuning uchun matn qancha uzun bo‘lsa, o‘girish vaqti ham shunga mutanosib oshadi.',
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
    'Natija 3.8-rasmda ko‘rsatilgan. “Asl holida” sozlamasida suhbatdosh kirillda, foydalanuvchi esa lotinda yozgan xabarlar aralash chiqadi. “Lotin” sozlamasida esa butun suhbat lotin yozuvida ko‘rinadi.',
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
    'Qidiruv ham yozuvga bog‘liq emas: “rahmat” deb qidirilsa, “Раҳмат” deb yozilgan xabar ham topiladi. Buning uchun har bir xabar yozilganda yoki tahrirlanganda uning qidiruv uchun nusxasi saqlanadi: lotinga o‘girilgan, kichik harflarga keltirilgan, tutuq belgilari bir xil ko‘rinishga keltirilgan matn. Qidiruv so‘zi ham xuddi shu tarzda o‘zgartiriladi va shu nusxalar orasidan qidiriladi [44]. Bu imkoniyat qo‘shilishidan oldin yozilgan eski xabarlarning nusxalari fonda, 500 tadan to‘ldirib chiqildi. Bazadagi natija 3.9-rasmda ko‘rsatilgan.',
  ),
  ...figure('3-29-db-search-text.png', '3.9', 'messages jadvali: asl matn (TextContent) va qidiruv kaliti (SearchText)', 16),

  h3('Tashkilot rejimi.'),
  ...ps(
    'E-pochtadan domenni ajratib olish va uni ommaviy pochta xizmatlari ro‘yxati bilan solishtirish uchun alohida kichik modul yozilgan. U boshqa hech narsaga bog‘liq emas va 22 ta test bilan tekshirilgan. Foydalanuvchi tasdiqlangan pochta bilan har safar tizimga kirganda quyidagi qadamlar bajariladi:',
  ),
  ...numbered([
    'foydalanuvchi allaqachon biror tashkilot a’zosi bo‘lsa, hech narsa qilinmaydi, chunki uning pochtasi o‘zgarmagan;',
    'pochtadan tashkilot domeni ajratiladi. Agar bu ommaviy pochta xizmati bo‘lsa, jarayon to‘xtaydi;',
    'shu domenli tashkilot qidiriladi. Topilmasa, u yaratiladi va foydalanuvchi uning administratori bo‘ladi;',
    'foydalanuvchi tashkilot a’zolari ro‘yxatiga qo‘shiladi;',
    'tashkilotning yopiq guruhi hali bo‘lmasa, u yaratiladi. Bo‘lsa, foydalanuvchi unga qo‘shiladi va guruhda bu haqda xizmat xabari chiqadi.',
  ]),
  p(
    'Agar bir vaqtda ikki kishi bir xil yangi domen bilan kirsa, baza faqat bittasiga tashkilot yaratishga ruxsat beradi. Birinchisi administrator bo‘ladi, ikkinchisi esa mavjud tashkilotga oddiy a’zo sifatida qo‘shiladi. Tashkilotga a’zolik foydalanuvchi haqidagi barcha ma’lumotlarda ko‘rsatiladi va ekranda ism yonida “tuit.uz ✓” ko‘rinishida chiqadi. Tashkilotdan tashqaridagi odam yopiq guruhga faqat taklif havolasi orqali kiradi (3.10-rasm).',
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
    'Maxfiy chat bilan bog‘liq har bir so‘rov qaysi qurilmadan kelgani aniqlanadi. Server bu qurilmaning sessiyasi hali faol ekanini har safar tekshiradi. Chat ochilmagan boshqa qurilmadan kelgan so‘rovga server “topilmadi” deb javob beradi.',
    'Shifrlangan xabar kelganda server uni ochmaydi, faqat ko‘rinishi to‘g‘riligini va hajmi 32 KB dan oshmasligini tekshiradi. Keyin xabarning tartib raqami tekshiriladi: u shu tomondan kelgan oxirgi xabar raqamidan katta bo‘lishi kerak. Kichik yoki teng raqamli xabar takroriy deb rad etiladi. Bir xil xabar bir vaqtda ikki marta kelsa, uni baza ham qabul qilmaydi. Shundan keyingina xabar saqlanadi va faqat qabul qiluvchining chat ochilgan qurilmasiga yuboriladi. Qabul qiluvchi “oldim” deb javob bergach, server xabarni o‘chiradi. Har soatda fonda muddati o‘tgan so‘rovlar, xabarlar va fayllar tozalanadi.',
    'Brauzerdagi shifrlash kodi alohida modulga ajratilgan va Angular’ga bog‘liq emas [50], uning asosiy qismi ilovalarda keltirilgan. Har bir xabar yuborilishidan oldin yangi kalit holati xabar bilan birga brauzer xotirasiga yoziladi. Shu sababli sahifa to‘satdan yopilsa ham bitta kalit ikki marta ishlatilmaydi. Xabarlar qurilmadagi navbat orqali qat’iy tartibda yuboriladi.',
    'Keyinchalik maxfiy chatlarga ham “o‘qildi” belgisi (✓✓) qo‘shildi. Oddiy chatdagi usul bu yerda ishlamaydi, chunki server xabarlarni ko‘rmaydi. Shuning uchun “o‘qildi” xabari ham oddiy xabar kabi shifrlanadi va ichida “shu raqamgacha o‘qildi” degan ma’lumotni olib boradi. Bu xabarni brauzer faqat chat ekranda ochiq turganda yuboradi. Server uni boshqa xabarlardan ajrata olmaydi va kim nimani qachon o‘qiganini bilmaydi. Shuning uchun bu imkoniyat uchun serverda hech narsa o‘zgartirilmadi. Maxfiy chat oynasida qulf belgisi, taymer va kalit izini tekshirish tugmalari bor (3.11-rasm).',
    'Server xabar mazmunini bilmasligi amalda ham tekshirildi. Suhbatdosh oflayn bo‘lgan paytda yuborilgan xabar bazada faqat ma’nosiz belgilar ko‘rinishida turadi, yetkazilgan xabarlar esa serverdan butunlay o‘chirilgan (3.12-rasm).',
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
    'Brauzerdagi ilova Angular komponentlaridan tashkil topgan [43]. Unda 41 ta komponent va 92 ta TypeScript fayl bor. Ilovada to‘rtta asosiy sahifa bor: kirish (/auth), chatlar (/chat), forum (/forum) va taklif havolasi orqali qo‘shilish (/join). Forum ichida lenta, post muhokamasi, foydalanuvchi profili va bildirishnomalar sahifalari joylashgan. Chat va forum sahifalarini faqat tizimga kirgan odam ochadi, kirish sahifasini esa faqat hali kirmagan odam ko‘radi. Har bir sahifaning kodi faqat kerak bo‘lganda yuklanadi. Masalan, forumga kirmagan foydalanuvchining brauzeriga forum kodi umuman yuklanmaydi.',
    'Ilovadagi ma’lumotlar, ya’ni chatlar ro‘yxati, xabarlar, reaksiyalar va “yozmoqda” holati Angular signallari yordamida saqlanadi. Signal o‘zgarganda ekranning unga bog‘liq qismi avtomatik yangilanadi. “6 a’zo, 2 onlayn” kabi qiymatlar ham shu ma’lumotlardan avtomatik hisoblanadi. Serverdan javob kelganda ham, jonli hodisa kelganda ham ma’lumot bir xil yo‘l bilan yangilanadi. Masalan, reaksiya o‘zgargani haqida hodisa kelsa, ilova kerakli xabarni topib, reaksiyalarini serverdan kelgan yangi ma’lumot bilan almashtiradi. Bu funksiya alohida testlar bilan tekshirilgan.',
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
    'Har bir so‘rovga avtomatik ravishda token qo‘shiladi. Token muddati tugagan bo‘lsa, ilova uni yangilaydi va so‘rovni qaytadan yuboradi. Bir vaqtda bir nechta so‘rov xato bersa ham, token faqat bir marta yangilanadi. Interfeys yagona dizayn tizimiga asoslangan: barcha ranglar bir joyda belgilangan, qorong‘i ko‘rinish esa ularning boshqa qiymatlari bilan hosil qilinadi. Interfeys ekran o‘lchamiga moslashadi: katta ekranda uch ustun, telefonda esa bir vaqtda bitta ekran ko‘rsatiladi (3.13-rasm).',
  ),

  h3('Forum interfeysi.'),
  ...ps(
    'Forumga chatlar ro‘yxati tepasidagi “Forum” tugmasi orqali o‘tiladi. Tugmadagi raqam o‘qilmagan forum bildirishnomalari sonini ko‘rsatadi. Forum sahifasi uch ustundan iborat. Chapda menyu (Lenta, Bildirishnomalar, Profilim) va chatlarga qaytish havolasi, o‘rtada lenta, o‘ngda esa “Kimni kuzatish kerak” tavsiyalari joylashgan. Tor ekranda o‘ng ustun yashiriladi, menyu esa faqat belgilardan iborat ixcham panelga aylanadi. Telefonda menyu ekranning pastki qismiga tushadi.',
    'Lenta tepasida uchta yorliq — “Obunalar”, “Top” va “Yangi” — hamda post yozish maydoni turadi (3.14-rasm). Yorliq almashtirilganda ro‘yxat boshidan yuklanadi. Postlar qismlab yuklanadi: foydalanuvchi pastga aylantirganda keyingi qism avtomatik so‘raladi, butun lentani birdaniga yuklash shart emas.',
    'Har bir post kartasida muallifning rasmi, ismi, foydalanuvchi nomi, post joylanganidan beri o‘tgan vaqt (“3 daq”, “2 soat”), matn, rasm yoki video va to‘rtta tugma bor: javob, repost, layk va ko‘rishlar soni. Matn foydalanuvchi tanlagan yozuvda ko‘rsatiladi, ya’ni kirillda yozilgan postni lotinda o‘qish mumkin. Postdagi rasm va videolar himoyalangan, shuning uchun ular token bilan yuklab olinadi. Bir marta yuklangan rasm brauzer xotirasida saqlanadi va qayta yuklanmaydi.',
  ),
  ...figure('3-33-forum-feed.jpg', '3.14', 'Forum: “Obunalar” lentasi va obuna tavsiyalari', 12.5),
  ...ps(
    '“Top” lentasida postlar (3.1) formula bo‘yicha hisoblangan mashhurlik tartibida chiqadi (3.15-rasm). Rasmda Aziz Nazarovning iqtibos keltirilgan posti ko‘rinib turibdi: iqtibos qilingan post muallif matni ostida alohida ramkada ko‘rsatiladi, uni bosib asl muhokamaga o‘tish mumkin. Iqtibos keltirish uchun “Repost” tugmasi menyusidan “Iqtibos keltirish” tanlanadi. Shunda alohida oyna ochiladi va unda iqtibos qilinayotgan post ham ko‘rinib turadi.',
    'Ulashilgan (repost qilingan) post tepasida “… repost qildi” yozuvi bilan chiqadi. Bunday postdagi barcha tugmalar — layk, javob, yana repost — asl postga tegishli bo‘ladi. Shuning uchun bitta post bir necha marta ulashilsa ham, uning layk va javoblari bitta joyda yig‘iladi. Layk yoki repost bosilganda server postning yangilangan holatini qaytaradi va karta shu holat bilan qayta chiziladi.',
  ),
  ...figure('3-34-forum-top.jpg', '3.15', 'Forum: “Top” lentasi va iqtibos keltirilgan post', 12.5),
  ...ps(
    'Post bosilganda uning muhokama sahifasi ochiladi (3.16-rasm). Agar ochilgan post kimgadir javob bo‘lsa, uning tepasida muhokama boshlangan postgacha bo‘lgan barcha oldingi postlar vertikal chiziq bilan bog‘langan holda ko‘rsatiladi. Ochilgan postning o‘zi kattaroq shriftda chiqadi. Uning ostida javob yozish maydoni va javoblar ro‘yxati joylashgan.',
    'Sahifa ochilishi bilan brauzer shu postdagi yangiliklarni kuzatishni boshlaydi. Boshqa foydalanuvchi layk bossa yoki postni ulashsa, sonlar sahifani yangilamasdan o‘zgaradi. Yangi javoblar esa ro‘yxatga darhol qo‘shilmaydi: o‘qilayotgan matn siljib ketmasligi uchun ro‘yxat tepasida “N ta yangi javob — ko‘rsatish” tugmasi chiqadi. Sahifadan chiqilganda kuzatish to‘xtatiladi. Jonli yangilanish qo‘shimcha qulaylik sifatida qaralgan: jonli ulanish bo‘lmasa ham sahifa oddiy so‘rovlar orqali to‘liq ishlaydi.',
  ),
  ...figure('3-35-forum-thread.jpg', '3.16', 'Forum: post muhokamasi va javoblar', 12.5),
  ...ps(
    'Post yozish maydonida yana nechta belgi yozish mumkinligi ko‘rsatib turiladi. 20 tadan kam belgi qolganda raqam boshqa rangga kiradi, chegaradan oshganda esa “Joylash” tugmasi o‘chadi. Rasm yoki video tanlanganda ilova avval uning turini va hajmini tekshiradi, so‘ng faylni darhol serverga yuklaydi va post yozish maydonida ko‘rsatadi (3.17-rasm). Bu fayl ko‘rsatish uchun serverdan qaytadan yuklab olinmaydi, brauzerdagi nusxasidan foydalaniladi.',
    'Post joylanganda serverga matn va oldindan yuklangan fayllarning raqamlari yuboriladi. Shu tufayli katta video yuklanayotganda foydalanuvchi matn yozishda davom etaveradi. Postga biriktirilmay qolgan fayllar keyinchalik fonda o‘chiriladi, shuning uchun tashlab ketilgan yuklashlar diskni band qilib qolmaydi. Foydalanuvchining o‘zi yozgan post lenta tepasiga darhol qo‘shiladi.',
  ),
  ...figure('3-36-forum-composer.jpg', '3.17', 'Forum: rasm biriktirilgan yangi post yozish', 12.5),
  ...ps(
    '“Bildirishnomalar” sahifasida kim qaysi postga javob yozgani, layk bosgani, postni ulashgani, iqtibos keltirgani yoki obuna bo‘lgani ko‘rsatiladi (3.18-rasm). Har bir qatorda hodisa turi belgisi, foydalanuvchining rasmi va ismi hamda postning qisqa matni chiqadi. Qator bosilganda tegishli post yoki foydalanuvchi profili ochiladi.',
    'Sahifa ochilganda barcha bildirishnomalar o‘qilgan deb belgilanadi va menyudagi hisoblagich nolga tushadi. Forum sahifasi yopiq bo‘lsa ham jonli ulanish saqlanib turadi. Shuning uchun yangi bildirishnoma kelganda chatlar ro‘yxatidagi “Forum” tugmasidagi raqam darhol oshadi.',
  ),
  ...figure('3-37-forum-notifications.jpg', '3.18', 'Forum bildirishnomalari', 12.5),
  ...ps(
    'Forum profilida foydalanuvchining ismi, foydalanuvchi nomi, o‘zi haqidagi ma’lumot, obunachilar va obunalar soni hamda uchta yorliq — “Postlar”, “Obunachilar” va “Obunalar” ko‘rsatiladi (3.19-rasm). Boshqa odamning profilida “Obuna bo‘lish” yoki “Obunani bekor qilish” tugmasi chiqadi. Obunachilar va obunalar ro‘yxati ham qismlab yuklanadi.',
    'Obuna faqat forum lentasiga emas, lavhalarga ham ta’sir qiladi: foydalanuvchi kimga obuna bo‘lsa, chatlar ro‘yxati tepasidagi lavhalar qatorida o‘sha odamning lavhalari chiqadi. Bir-birini bloklagan odamlar bir-birining profilini ocha olmaydi.',
  ),
  ...figure('3-38-forum-profile.jpg', '3.19', 'Forum profili', 12.5),

  h3('Desktop bildirishnomalar.'),
  ...ps(
    'Messenjer odatda boshqa oynalar bilan birga ochiq turadi, foydalanuvchi esa yangi xabarni o‘tkazib yubormasligi kerak. Buning uchun brauzer orqali kompyuter ekranida chiqadigan bildirishnomalar qo‘shildi. Yangi xabar kelganda bildirishnoma quyidagi shartlarda chiqadi: xabarni foydalanuvchining o‘zi yubormagan, u bildirishnomalarni yoqqan va brauzer ruxsat bergan, ilova boshqa oynada turibdi yoki xabar kelgan chat ochiq emas. Bildirishnomada jo‘natuvchining ismi va xabar matni foydalanuvchi tanlagan yozuvda chiqadi. U bosilganda ilova oynasi ochilib, kerakli chat ko‘rsatiladi. Bundan tashqari, brauzer yorlig‘ida o‘qilmagan xabarlar soni ko‘rinib turadi.',
    'Bitta chatdan kelgan bildirishnomalar bir-birining o‘rnini egallaydi. Shuning uchun ketma-ket kelgan o‘nta xabar ekranda o‘nta oyna emas, bitta yangilanib turuvchi bildirishnoma bo‘lib chiqadi. Bildirishnomalar profil oynasidagi alohida tugma bilan yoqiladi (3.20-rasm). Birinchi marta yoqilganda brauzer foydalanuvchidan ruxsat so‘raydi. Bildirishnoma faqat ilova brauzerda ochiq turganda keladi. Bu cheklov interfeysda ham yozib qo‘yilgan.',
  ),
  ...figure('3-32-notification-setting.jpg', '3.20', 'Profil oynasi: bildirishnomalar va bloklanganlar ro‘yxati', 13.5),

  // ───────────────────────────────── 3.3
  h2('3.3. Joylashtirish, testlash va foydalanish yo‘riqnomasi'),
  h3('Joylashtirish.'),
  p(
    'Dasturni serverga joylashtirish uchun konteynerlash texnologiyalaridan biri — Docker’dan foydalanildi [45]. Konteyner dasturni unga kerak bo‘lgan hamma narsa bilan birga bitta paketga joylaydi, shuning uchun dastur istalgan serverda bir xil ishlaydi. Tayyor konteynerda faqat ishlaydigan dastur bo‘ladi, uning manba kodi bo‘lmaydi. Konteyner Render bulut xizmatida ishga tushirilgan va GitHub’ga yangi kod yuklanganda avtomatik yangilanadi. Bazaga ulanish ma’lumotlari va maxfiy kalitlar kodda emas, server sozlamalarida saqlanadi. Dasturni yangi kompyuterda ishga tushirish uchun namunaviy sozlamalar fayli bor: uni nusxalab, ma’lumotlar bazasini tayyorlash kifoya.',
  ),
  h3('Testlash.'),
  ...ps(
    'Dasturning asosiy mantig‘i avtomatik testlar bilan tekshirildi [49]. Testlarda baza va pochta kabi tashqi qismlar o‘rniga ularning soxta nusxalari ishlatildi. Vaqtga bog‘liq qismlar, masalan lavhalarning 24 soati, top lenta bahosi va forum cheklovlari, “to‘xtatilgan soat” bilan sinaldi. Serverda 425 ta, brauzer qismida 20 ta faylda 295 ta test yozildi [51]. Brauzer testlari lotin–kirill o‘girish server bilan bir xil ishlashini, shifrlash va kalitlar zanjirini, soxta xabarlar rad etilishini, reaksiyalar to‘g‘ri yangilanishini va bildirishnoma qachon chiqishini tekshiradi. Barcha testlar muvaffaqiyatli o‘tdi (3.21-rasm). Server testlarining tarkibi 3.6-jadvalda keltirilgan.',
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
    'Bundan tashqari, guruh chatlari uchun 43 ta tekshiruvdan iborat avtomatik ssenariy yozildi va barchasi muvaffaqiyatli o‘tdi. Maxfiy chatlar ikki alohida brauzerda, haqiqiy server bilan sinaldi. Diplom loyihasidagi barcha skrinshotlar ham haqiqiy tizimdan avtomatik olingan: bir skript sinov bazasini namunaviy ma’lumotlar bilan to‘ldiradi, ikkinchisi brauzerni boshqarib, kerakli ekranlarni suratga oladi. Qo‘lda o‘tkazilgan asosiy sinovlar 3.7-jadvalda keltirilgan.',
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
    '**Tizimga kirish.** Kirish sahifasida e-pochta manzili yoziladi yoki Google hisobi tanlanadi, so‘ng pochtaga kelgan 6 xonali kod kiritiladi (3.22-rasm). Manzil birinchi marta ishlatilayotgan bo‘lsa, ism, familiya va foydalanuvchi nomi kiritilib, profil yaratiladi. Tashkilot pochtasi bilan kirilganda foydalanuvchi tashkilotning yopiq guruhiga avtomatik qo‘shiladi.',
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
    '**Xabar almashish.** Chap paneldagi qidiruv maydoniga ism yoki foydalanuvchi nomi yozilib, suhbatdosh tanlanadi. Xabar pastdagi maydonga yoziladi va Enter tugmasi bilan yuboriladi, qisqich tugmasi orqali fayl biriktiriladi. Sichqoncha xabar ustiga olib borilganda reaksiya qo‘yish, javob berish, tahrirlash va o‘chirish tugmalari chiqadi. Sarlavhadagi qidiruv tugmasi chat ichidan xabar qidiradi. Topilgan xabar bosilganda chat o‘sha joyga aylantiriladi (3.23-rasm). Keraksiz suhbatdoshni chat menyusidagi “Bloklash” bandi orqali bloklash mumkin.',
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
    '**Profil va sozlamalar.** Profil oynasida ism, foydalanuvchi nomi va rasm o‘zgartiriladi, yorug‘ yoki qorong‘i ko‘rinish tanlanadi. “Yozuv” bo‘limida xabarlar qaysi yozuvda ko‘rsatilishi tanlanadi: “Asl holida”, “Lotin” yoki “Кирилл” (3.24-rasm). Shu oynada kompyuter bildirishnomalari yoqiladi, bloklanganlar ro‘yxati ko‘riladi, “Qurilmalar” bo‘limida esa begona qurilmani hisobdan chiqarish mumkin.',
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
    '**Guruh yaratish.** Chatlar ro‘yxati tepasidagi “Yangi guruh” tugmasi bosiladi va qidiruv orqali a’zolar tanlanadi. So‘ng “Keyingi” tugmasi bosilib, guruh nomi, tavsifi va rasmi kiritiladi (3.25-rasm). Guruh sarlavhasi bosilganda ma’lumot paneli ochiladi (3.4-rasm). Ega va administratorlar shu yerda a’zolarni boshqaradi va taklif havolasini yaratadi.',
  ),
  ...figurePair(
    [
      ['3-14-group-create-members.jpg', 'a’zolarni tanlash'],
      ['3-15-group-create-details.jpg', 'guruh ma’lumotlari'],
    ],
    '3.25',
    'Yangi guruh yaratish',
  ),
  ...ps(
    '**Forum.** Forumga “Forum” tugmasi orqali o‘tiladi. Post yozish uchun lenta tepasidagi maydonga matn yoziladi, rasm tugmasi orqali rasm yoki video qo‘shiladi va “Joylash” bosiladi. Muallif ismi bosilganda uning profili ochiladi, u yerda “Obuna bo‘lish” tugmasi bor. “Repost” tugmasi bosilganda postni shunchaki ulashish yoki unga iqtibos keltirish mumkin.',
    '**Lavhalar.** Lavha joylash uchun chatlar ro‘yxati tepasidagi o‘z rasmi bosiladi va rasm yoki video tanlanadi. Obuna bo‘lingan odamlarning lavhalari shu qatorda chiqadi, ko‘rilmaganlari rangli halqa bilan belgilanadi.',
    '**Maxfiy chat.** Shaxsiy chat menyusidan “Maxfiy chat boshlash” tanlanadi. Suhbatdosh taklifni qabul qilgach, kalit izini yuzma-yuz solishtirish, xabarlarni o‘chirish taymerini o‘rnatish va shifrlangan fayl yuborish mumkin. Maxfiy chat faqat u ochilgan qurilmada ishlaydi.',
  ),

  h3('Amaliy joriy etish.'),
  ...ps(
    'Diplom loyihasida yaratilgan chat texnologiyasi real loyihada ham qo‘llanildi. Uning asosida Elektron kooperatsiya portali uchun chat moduli ishlab chiqildi. Bu portal kompaniyalarning o‘zaro hamkorligi uchun mo‘ljallangan, chat moduli esa kompaniyalarga portalning o‘zida bir-biri bilan yozishish imkonini beradi.',
    'Modulda “Milliy” xabarchining asosiy qismlari qayta ishlatildi: xabarlarni jonli yetkazish, xabarlar va chatlar bilan ishlash qoidalari, fayl yuborish va o‘qilganlik belgilari. Portalga moslashtirish uchun suhbat ishtirokchisi sifatida alohida odam emas, kompaniya olindi, tizimga kirish esa portalning o‘z hisoblari orqali amalga oshirildi. Bu tajriba “Milliy” xabarchining yadrosini boshqa axborot tizimlariga alohida modul sifatida qo‘shish mumkinligini amalda ko‘rsatdi.',
  ),

  h3('Rivojlantirish istiqbollari.'),
  ...ps(
    'Xabarchi keyingi bosqichda bir necha yo‘nalishda rivojlantiriladi. Tizim qismlarga bo‘lingani uchun har bir yangi imkoniyat mavjud kodni buzmasdan, alohida modul sifatida qo‘shiladi. Xabarlarni jonli yetkazish, foydalanuvchilar, chatlar va tashkilotlar kabi asosiy qismlar barcha yangi modullar uchun umumiy bo‘lib qoladi.',
    '**Sun’iy intellekt yordamchisi.** Eng muhim yo‘nalish — sun’iy intellekt. Faol guruhda bir kunda yuzlab xabar to‘planadi, ularni o‘qib chiqishga vaqt yetmaydi. Yordamchi “nimani o‘tkazib yubordim?” degan savolga bir necha jumlada javob beradi, ya’ni muhokamaning qisqacha mazmunini chiqaradi. U xabarga mos javob variantlarini taklif qiladi, ovozli xabarni matnga aylantiradi, xabarni o‘zbek, rus va ingliz tillari o‘rtasida tarjima qiladi va o‘zbekcha matndagi imlo xatolarini tuzatadi. Bu imkoniyatlar lotin–kirill o‘girish bilan birga ishlaydi: tarjima va qisqacha mazmun ham foydalanuvchi tanlagan yozuvda chiqadi. Sun’iy intellekt xavfsizlik uchun ham ishlatiladi. U spam, haqorat va firibgarlik xabarlarini avtomatik aniqlaydi, forumda esa postlarni foydalanuvchining qiziqishiga qarab tavsiya qiladi.',
    'Sun’iy intellektni qo‘shishda ma’lumotlar maxfiyligiga alohida e’tibor beriladi. Yozishmalar tashqi xizmatga faqat foydalanuvchi o‘zi so‘raganda yuboriladi, imkon qadar esa tashkilotning o‘z serverida ishlaydigan modellardan foydalaniladi. Maxfiy chatlarda sun’iy intellekt ishlatilmaydi, chunki server ularning mazmunini ko‘rmaydi.',
    '**Muloqot imkoniyatlari.** Ovozli xabarlar, ovozli va video qo‘ng‘iroqlar, kanallar, botlar va so‘rovnomalar qo‘shiladi. Kanallar, botlar, qo‘ng‘iroqlar va so‘rovnomalar uchun ma’lumotlar bazasida jadvallar oldindan tayyorlab qo‘yilgan (2.2-jadval), shuning uchun ularni qo‘shish bazani qayta loyihalashni talab qilmaydi. Shuningdek, xabarni boshqa chatga uzatish, chat tepasiga mahkamlash, belgilangan vaqtda yuborish, @ belgisi bilan suhbatdoshni eslatish, chatlarni papkalarga ajratish va “Saqlangan xabarlar” bo‘limi rejalashtirilgan.',
    '**Bozor, auksion va tenderlar.** Xabarchi ichida savdo maydoni (bozor) yaratish rejalashtirilgan. Unda foydalanuvchi o‘z do‘konini ochadi va mahsulot yoki xizmatlarini joylaydi. Xaridor sotuvchi bilan mavjud chat orqali gaplashadi, savollar beradi va buyurtma qiladi. To‘lovlar mahalliy to‘lov tizimlari orqali amalga oshiriladi. Keyingi qadamda bozorga kompaniyalar ham qo‘shiladi. Ular o‘rtasida auksion va tenderlar o‘tkaziladi: buyurtmachi e’lon joylaydi, kompaniyalar o‘z takliflarini beradi, g‘olib esa oldindan belgilangan mezonlar bo‘yicha aniqlanadi. Bu yo‘nalish Elektron kooperatsiya portalidagi tajribaning tabiiy davomi bo‘ladi, chunki u yerda kompaniyalar o‘rtasidagi chat allaqachon ishlab turibdi.',
    '**Blokcheyn texnologiyalari.** Savdo va tenderlarda eng muhim narsa — ishonch. Tender natijasi keyin o‘zgartirilmaganiga va takliflar halol ko‘rib chiqilganiga ishonch bo‘lishi kerak. Buning uchun blokcheyn texnologiyasidan foydalanish rejalashtirilgan. Blokcheyn — ma’lumotlar ketma-ket bloklarda saqlanadigan va har bir blok oldingisiga bog‘langan reyestr, unga yozilgan ma’lumotni keyin hech kim sezdirmasdan o‘zgartira olmaydi. Har bir tender taklifi, uning vaqti va tender natijasi blokcheynga yoziladi, shuning uchun ularni keyin o‘zgartirib bo‘lmaydi.',
    'Ikkinchi qo‘llanish — aqlli shartnomalar (smart contract). Bunda xaridor to‘lagan pul shartnoma shartlari bajarilguncha kafolat hisobida turadi va sotuvchi mahsulotni yetkazib bergach avtomatik o‘tkaziladi. Bu ikki tomonni ham aldovdan himoya qiladi. Uchinchi qo‘llanish — shartnoma va hujjatlarning izini (xeshini) blokcheynga yozish. Shunda hujjat keyin o‘zgartirilmaganini istalgan paytda tekshirish mumkin. Raqamli to‘lov vositalari bilan bog‘lanish esa faqat O‘zbekiston qonunchiligi ruxsat bergan doirada amalga oshiriladi.',
    '**Boshqa yo‘nalishlar.** OneID orqali shaxsni davlat darajasida tasdiqlash, ilova yopiq bo‘lganda ham keladigan bildirishnomalar, maxfiy chatlarni bir nechta qurilmada ishlatish, forum uchun moderatorlar paneli hamda Android va iOS uchun mobil ilovalar ham rejaga kiritilgan.',
  ),

  h2('3-bob bo‘yicha xulosa', { toc: false }),
  p(
    'Uchinchi bobda “Milliy” xabarchining dasturi yaratildi. Serverda 17 ta controller va 104 ta API manzil, xabarlarni qismlab yuklash, chat va forum uchun ikkita jonli aloqa markazi, onlayn holatni kuzatish, fayllarni xavfsiz qabul qilish, guruhlar va lavhalar amalga oshirildi. Keyingi bosqichda xabarlarga reaksiya, foydalanuvchini bloklash, top lentaga ega forum va kompyuter bildirishnomalari qo‘shildi. Ular mavjud tuzilmani o‘zgartirmasdan qo‘shildi. Tizimning uchta o‘ziga xos imkoniyati amalga oshirildi: lotin–kirill o‘girish va ikkala yozuvda qidiruv, ish e-pochtasi orqali tashkilot rejimi hamda “o‘qildi” belgisi bor maxfiy chatlar. Dasturni joylashtirish uchun konteynerlash texnologiyalaridan biri — Docker’dan foydalanildi. Tizim 425 ta server, 295 ta brauzer testi, 43 ta avtomatik tekshiruv va qo‘lda o‘tkazilgan sinovlar bilan tekshirildi. Chat texnologiyasi Elektron kooperatsiya portalida kompaniyalar o‘rtasidagi chat modulini yaratishda qo‘llanildi. Keyingi bosqich uchun sun’iy intellekt, bozor va tenderlar hamda blokcheyn yo‘nalishlari belgilandi.',
  ),
];
