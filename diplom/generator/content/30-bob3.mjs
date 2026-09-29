import { code, figure, figurePair, h1, h2, h3, p, ps, table } from '../lib.mjs';

export const chapter3 = () => [
  h1('III-bob. “Milliy chat” dasturini ishlab chiqish'),
  p(
    'Ushbu bobda loyihalangan tizimning dasturiy amalga oshirilishi yoritiladi. Server qismi 236 ta C# faylidan (migratsiyalarsiz 9 mingga yaqin qator), klient qismi esa 30 ta Angular komponenti va 13 mingdan ortiq qatordan iborat. Keltirilgan kod parchalari loyihaning haqiqiy manba kodidan olingan, qisqartirilgan joylar “…” bilan belgilangan.',
  ),

  // ───────────────────────────────── 3.1
  h2('3.1. Server qismini ishlab chiqish'),
  ...ps(
    'Server yechimi to‘rtta loyihadan (Domain, Application, Infrastructure, API) va unit testlar loyihasidan iborat. Kirish nuqtasi — Program.cs fayli faqat so‘rovlarni qayta ishlash konveyerini sozlaydi [42]: eng birinchi xatolarni ushlovchi middleware, so‘ng xavfsizlik sarlavhalari, autentifikatsiya, avtorizatsiya, controllerlar va SignalR habi. Servislarni ro‘yxatdan o‘tkazish esa mavzuli kengaytma metodlariga ajratilgan.',
    'Server 11 ta controller orqali 73 ta HTTP endpointni taqdim etadi (3.1-jadval). Endpointlar RESTful tamoyil asosida nomlangan: resurslar ko‘plik shaklida, amal esa HTTP metodi orqali ifodalanadi, masalan “POST /api/chats/{chatId}/messages”.',
  ),
  ...table(
    '3.1',
    'Server API controllerlari va endpointlari',
    ['Controller', 'Asosiy yo‘l', 'Soni', 'Vazifasi'],
    [
      ['AuthController', '/api/auth', '11', 'Kod so‘rash va tasdiqlash, Google, ro‘yxatdan o‘tish, tokenni yangilash, sessiyalar'],
      ['ProfileController', '/api/users/me', '6', 'Profilni olish va tahrirlash, profil rasmi, yozuv sozlamasi'],
      ['UserController, ContactController', '/api/users, /api/contacts', '4', 'Foydalanuvchilarni qidirish, kontaktlar'],
      ['ChatController', '/api/chats', '3', 'Chatlar ro‘yxati, shaxsiy chat, chatni o‘chirish'],
      ['GroupController', '/api/groups', '12', 'Guruh yaratish, tahrirlash, a’zolar va rollar, taklif havolalari'],
      ['MessageController', '/api/chats/{id}/messages', '7', 'Xabarlar tarixi, yuborish, tahrirlash, o‘chirish, qidiruv'],
      ['MessageAttachmentController', '/api/chats/…, /api/media/…', '10', 'Rasm, video, fayl yuklash va berish, ulashilgan media'],
      ['StoryController', '/api/stories', '8', 'Hikoyalar lentasi, yaratish, ko‘rishlar'],
      ['OrganizationController', '/api/organizations', '1', 'Foydalanuvchining tashkiloti va roli'],
      ['SecretChatController', '/api/secret-chats', '11', 'Maxfiy chat so‘rovi, qabul qilish, shifrlangan xabar va fayllar, ack'],
      ['Jami', '', '73', ''],
    ],
    [3.6, 3.8, 1.2, 6.5],
  ),
  ...ps(
    'API OpenAPI (Swagger) orqali avtomatik hujjatlashtiriladi: barcha endpointlarni JWT token bilan to‘g‘ridan-to‘g‘ri sinab ko‘rish mumkin (3.1-rasm). Barcha javoblar yagona formatda (succeeded, message, data) qaytadi, xato xabarlari o‘zbek tilida yozilgan. Kiruvchi DTO’lar FluentValidation validatorlari bilan tekshiriladi [48], kutilmagan istisnolar esa logga TraceId bilan yoziladi va mijozga ichki tafsilotlarsiz qaytariladi.',
  ),
  ...figure('3-04-swagger.jpg', '3.1', 'Swagger UI: server API hujjatlari', 13),
  p(
    'Kursorli sahifalash barcha repozitoriylar uchun umumiy IQueryable kengaytma metodi sifatida yozilgan (3.1-listing). Metod “Id < beforeId” shartini ifodalar daraxti orqali dinamik quradi va limitdan bittaga ko‘p yozuv o‘qiydi: qo‘shimcha yozuv borligi hasMore qiymatini beradi, alohida COUNT so‘roviga hojat qolmaydi. Natija to‘g‘ridan-to‘g‘ri DTO’ga proyeksiya qilinadi, shuning uchun bazadan faqat kerakli ustunlar o‘qiladi [16, 41].',
  ),
  ...code(
    `public static async Task<CursorPagedResponse<TResult>> ToCursorPagedResponseAsync<TEntity, TResult>(
    this IQueryable<TEntity> query, CursorPaginationRequest pagination,
    Expression<Func<TEntity, int>> idSelector, Expression<Func<TEntity, TResult>> resultSelector,
    Func<TResult, int> cursorSelector, CancellationToken cancellationToken = default)
{
    if (pagination.BeforeId is not null)
    {
        var beforeId = Expression.Lambda<Func<TEntity, bool>>(
            Expression.LessThan(idSelector.Body, Expression.Constant(pagination.BeforeId.Value)),
            idSelector.Parameters);
        query = query.Where(beforeId);
    }

    var results = await query.OrderByDescending(idSelector)
        .Take(pagination.Limit + 1)
        .Select(resultSelector)
        .ToListAsync(cancellationToken);

    var hasMore = results.Count > pagination.Limit;
    IReadOnlyList<TResult> items = hasMore ? results.Take(pagination.Limit).ToArray() : results;
    int? nextCursor = hasMore ? cursorSelector(items[^1]) : null;
    return new(items, nextCursor, hasMore);
}`,
    '3.1-listing. Kursorli sahifalash (QueryableExtensions)',
  ),

  // ───────────────────────────────── 3.2
  h2('3.2. Real vaqtda xabar almashishni amalga oshirish'),
  p(
    'Real vaqt aloqasi ChatHub SignalR habi orqali quriladi [40]. Hab mijoz chaqira oladigan to‘rtta metodni taqdim etadi, server esa mijozlarga o‘n to‘rt turdagi hodisa yuboradi (3.2-jadval). Har bir ulanish ikki guruhga qo‘shiladi: foydalanuvchining barcha qurilmalari uchun “user:{id}” va aynan shu qurilma uchun “session:{sid}”; ikkinchisi maxfiy chat hodisalarini faqat bog‘langan qurilmaga yetkazadi.',
  ),
  ...table(
    '3.2',
    'SignalR habi metodlari va hodisalari',
    ['Nomi', 'Yo‘nalish', 'Vazifasi'],
    [
      ['JoinChat / LeaveChat', 'Mijoz → server', 'Ochilgan chatning “chat:{id}” guruhiga qo‘shilish yoki chiqish'],
      ['SetTyping(chatId, isTyping)', 'Mijoz → server', '“Yozmoqda” holatini chatdagi boshqalarga uzatish'],
      ['MarkMessagesRead(chatId, ids)', 'Mijoz → server', 'Xabarlarni o‘qilgan deb belgilash (100 tagacha)'],
      ['MessageReceived / Updated / Deleted', 'Server → mijoz', 'Yangi, tahrirlangan yoki o‘chirilgan xabar'],
      ['MessagesRead, TypingChanged', 'Server → mijoz', 'O‘qilganlik (✓✓) va “yozmoqda” holati'],
      ['ChatCleared / ChatDeleted, GroupUpdated', 'Server → mijoz', 'Chat tarixi tozalandi, chat o‘chirildi, guruh o‘zgardi'],
      ['UserPresenceChanged, ProfilePhotoUpdated', 'Server → mijoz', 'Onlayn holat va profil rasmi o‘zgardi'],
      ['SecretChatRequested / Accepted / Closed', 'Server → mijoz', 'Maxfiy chat taklifi, qabul qilinishi yoki yopilishi'],
      ['SecretMessageReceived', 'Server → mijoz', 'Shifrlangan xabar (faqat bog‘langan qurilmaga)'],
    ],
    [4.4, 2.8, 6.3],
  ),
  p(
    'Hab metodlari ham REST kabi himoyalangan: har bir chaqiruvda foydalanuvchining chat a’zosi ekani tekshiriladi (3.2-listing). Aks holda chat identifikatorini taxmin qilib, begona chatdagi hodisalarni tinglash mumkin bo‘lardi.',
  ),
  ...code(
    `public async Task MarkMessagesRead(int chatId, IReadOnlyCollection<int> messageIds)
{
    await EnsureChatMembershipAsync(chatId);
    var ids = messageIds.Where(id => id > 0).Distinct().Take(100).ToArray();
    if (ids.Length == 0) return;

    var readerUserId = GetCurrentUserId();
    await messageRepository.MarkAsReadAsync(chatId, readerUserId, ids,
        timeProvider.GetUtcNow().UtcDateTime, Context.ConnectionAborted);
    await realtimeNotifier.MessagesReadAsync(chatId, readerUserId, ids,
        await messageRepository.GetMemberUserIdsAsync(chatId, Context.ConnectionAborted),
        Context.ConnectionAborted);
}

private async Task EnsureChatMembershipAsync(int chatId)
{
    if (!await messageRepository.IsChatMemberAsync(chatId, GetCurrentUserId(), Context.ConnectionAborted))
        throw new HubException("Bu chatga kirish huquqi yo'q.");
}`,
    '3.2-listing. ChatHub: o‘qilganlik belgisini qayd etish va a’zolikni tekshirish',
  ),
  ...ps(
    'Onlayn holat IPresenceTracker interfeysi orqali kuzatiladi: bitta serverda faol ulanishlar xotirada, bir necha serverda esa Redis’da saqlanadi. Oxirgi ulanish uzilganda server 8 soniya kutadi, shuning uchun sahifani yangilash yoki qisqa uzilishda suhbatdoshlarda “oflayn” holati ko‘rinmaydi.',
    'Klientdagi ChatRealtimeService ulanishni avtomatik qayta ulanish siyosati (0, 2, 5, 10 soniya) bilan yaratadi va qayta ulangach ochiq chatga yana qo‘shiladi. Kiruvchi hodisalar RxJS orqali ChatApiService’ga uzatiladi va u ilova holatini yangilaydi. 3.2-rasmda sarlavhada “yozmoqda…” holati, xabarlar yonida o‘qilganlik belgilari, ro‘yxatda esa tashkilot a’zolari yonidagi “tuit.uz ✓” belgisi ko‘rinib turibdi.',
  ),
  ...figure('3-05-private-chat.jpg', '3.2', 'Shaxsiy chat: real vaqtda “yozmoqda” holati va o‘qilganlik belgilari', 14),

  // ───────────────────────────────── 3.3
  h2('3.3. Media fayllar, guruhlar va hikoyalar'),
  ...ps(
    'Rasm, video va fayllar bitta konveyerdan o‘tadi: hajm tekshiriladi (rasm 10 MB, fayl 50 MB, video 200 MB gacha), fayl ClamAV bilan skanerlanadi, rasm formati tarkibi bo‘yicha aniqlanib qayta kodlanadi va 256 pikselli kichik nusxasi yaratiladi, video uchun esa ffmpeg yordamida muqova olinadi. Fayl diskka GUID nom bilan yoziladi, bazaga metama’lumotlar va xabar qo‘shiladi, a’zolarga esa MessageReceived hodisasi yuboriladi. Videolar HTTP Range so‘rovlari orqali oqim ko‘rinishida beriladi. Chatdagi barcha media ma’lumot panelida turlari bo‘yicha guruhlanadi (3.3-rasm).',
  ),
  ...figure('3-08-shared-media.jpg', '3.3', 'Chatdagi ulashilgan media paneli', 13),
  ...ps(
    'Guruh chatlari GroupService servisida amalga oshirilgan: har bir amaldan oldin foydalanuvchi roli aniqlanadi va 2.3-jadvaldagi ruxsatlar qo‘llanadi, o‘zgarishlar esa xizmat xabarlari bilan birga saqlanadi. Guruh egasi chiqib ketsa, egalik eng oldin tayinlangan administratorga, u bo‘lmasa eng oldin qo‘shilgan a’zoga o‘tadi; guruhda hech kim qolmasa, u yumshoq o‘chiriladi. Taklif havolasi uchun 16 baytli kriptografik tasodifiy token yaratiladi, havola yangilanganda eski token darhol ishlamay qoladi. Guruh chati va ma’lumot paneli 3.4-rasmda ko‘rsatilgan.',
  ),
  ...figure('3-13-group-chat.jpg', '3.4', 'Guruh chati va guruh haqidagi ma’lumot paneli', 14),
  p(
    'Hikoyalar StoryService servisida amalga oshirilgan: rasm yoki video (50 MB gacha) va izohdan iborat hikoya 24 soat ko‘rinadi. Lentada foydalanuvchi va u bilan chati bor foydalanuvchilarning hikoyalari chiqadi, ko‘rilmaganlari rangli halqa bilan ajratiladi, muallif esa kim ko‘rganini biladi (3.5-rasm).',
  ),
  ...figure('3-11-story-viewer.jpg', '3.5', 'Hikoyani ko‘rish oynasi', 12),

  // ───────────────────────────────── 3.4
  h2('3.4. Lotin–kirill transliteratsiyasi va yozuvdan qat’i nazar qidiruv'),
  ...ps(
    'Xabar bazada doimo **asl holida** saqlanadi, o‘girish esa faqat ko‘rsatish paytida klientda bajariladi. Shu sababli bitta xabarni bir foydalanuvchi lotinda, boshqasi kirillda ko‘radi. Foydalanuvchi sozlamasi (ScriptPreference) serverda saqlanadi va barcha qurilmalarida amal qiladi, yozuv almashtirilganda esa xabarlar sahifani yangilamasdan qayta chiziladi.',
    'Algoritm o‘zbek lotin alifbosi va imlo qoidalariga asoslanadi [8, 9] va Domain qatlamidagi UzbekTransliterator sinfida amalga oshirilgan; klientda uning TypeScript’dagi aynan nusxasi ishlaydi. Ikkalasi bitta umumiy test to‘plami (80 ta kirill–lotin juftligi) bo‘yicha tekshiriladi. Kirilldan lotinga o‘girish deyarli bir ma’noli, teskari yo‘nalishda esa kontekstga bog‘liq qoidalar talab etiladi (3.3-jadval).',
  ),
  ...table(
    '3.3',
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
    'Kirilldan lotinga o‘girishning asosiy qismi 3.3-listingda keltirilgan: har bir harf uchun avval kontekstga bog‘liq qoidalar, keyin oddiy moslik lug‘ati tekshiriladi.',
  ),
  ...code(
    `private static string ToLatinSegment(string text)
{
    var builder = new StringBuilder(text.Length + 8);
    for (var i = 0; i < text.Length; i++)
    {
        var ch = text[i];
        var lower = char.ToLowerInvariant(ch);
        var previous = i > 0 ? char.ToLowerInvariant(text[i - 1]) : '\\0';

        string latin;
        if (lower == 'е')
        {
            var soundsYe = !IsWordChar(text, i - 1) || CyrillicVowels.Contains(previous) || previous is 'ъ' or 'ь';
            latin = soundsYe ? "ye" : "e";
        }
        else if (lower == 'ц')
            latin = CyrillicVowels.Contains(previous) ? "ts" : "s";
        else if (lower == 'ҳ' && previous == 'с')
            latin = TutuqMark + "h";   // "сҳ" is written with a tutuq so that it is not read as "ш"
        else if (!CyrillicToLatinMap.TryGetValue(lower, out latin!))
        {
            builder.Append(ch);
            continue;
        }

        builder.Append(ch == lower ? latin : ApplyUpperCase(latin, IsUpperCaseWord(text, i)));
    }
    return builder.ToString();
}`,
    '3.3-listing. UzbekTransliterator: kirill matnini lotinga o‘girish (C#)',
  ),
  p(
    'Natija 3.6-rasmda ko‘rsatilgan: “Asl holida” sozlamasida suhbatdosh kirillda, foydalanuvchi lotinda yozgan xabarlar aralash chiqadi, “Lotin” sozlamasida esa butun suhbat lotin yozuvida ko‘rinadi.',
  ),
  ...figurePair(
    [
      ['3-20-script-original.jpg', '“Asl holida”'],
      ['3-20-script-latin.jpg', '“Lotin” sozlamasi'],
    ],
    '3.6',
    'Bitta suhbatning turli yozuv sozlamalarida ko‘rinishi',
  ),
  ...ps(
    'Qidiruv ham yozuvga bog‘liq emas: “rahmat” so‘rovi “Раҳмат”ni ham topadi. Buning uchun xabar yaratilganda va tahrirlanganda uning **qidiruv kaliti** — lotinga o‘girilgan, kichik harfli, tutuq belgilari birxillashtirilgan nusxasi SearchText ustuniga yoziladi. Qidiruv so‘rovi ham xuddi shu funksiyadan o‘tkazilib, ILIKE bilan qidiriladi [44]. Ustun qo‘shilishidan oldingi xabarlar uchun kalitlar SearchTextBackfill fon ishi tomonidan 500 tadan to‘ldiriladi. Bazadagi natija 3.7-rasmda ko‘rsatilgan.',
  ),
  ...figure('3-29-db-search-text.png', '3.7', 'messages jadvali: asl matn (TextContent) va qidiruv kaliti (SearchText)', 16),

  // ───────────────────────────────── 3.5
  h2('3.5. Tashkilot rejimini amalga oshirish'),
  ...ps(
    'OrganizationEmailMatcher sinfi e-pochtadan domenni ajratadi, normallashtiradi va umumiy pochta xizmatlari ro‘yxati bilan solishtiradi; u tashqi bog‘liqliksiz va 22 ta unit test bilan tekshirilgan. OrganizationMembershipService.EnsureMembershipAsync metodi foydalanuvchi tasdiqlangan pochta bilan kirgan har safar chaqiriladi (3.4-listing). Bir vaqtda ikki foydalanuvchi yangi domen bilan kirsa, unique indeks tufayli faqat bittasi tashkilotni yaratib admin bo‘ladi, ikkinchisi a’zo sifatida qo‘shiladi.',
  ),
  ...code(
    `public async Task EnsureMembershipAsync(User user, CancellationToken cancellationToken = default)
{
    // An e-mail never changes, so an existing membership is final.
    if (await repository.GetMembershipAsync(user.Id, cancellationToken) is not null) return;

    var domain = OrganizationEmailMatcher.OrganizationDomainOf(user.Email);
    if (domain is null) return;

    var now = timeProvider.GetUtcNow().UtcDateTime;
    var organization = await repository.FindByDomainAsync(domain, cancellationToken);
    var isFounder = false;
    if (organization is null)
    {
        var created = OrganizationFactory.Create(domain, now);
        isFounder = await repository.TryAddOrganizationAsync(created, cancellationToken);
        organization = isFounder ? created : await repository.FindByDomainAsync(domain, cancellationToken);
        if (organization is null) return;
    }

    // The first person from a domain becomes its admin.
    var role = isFounder ? OrganizationRole.Admin : OrganizationRole.Member;
    var member = OrganizationFactory.CreateMember(organization.Id, user.Id, role, now);
    if (!await repository.TryAddMemberAsync(member, cancellationToken)) return;

    var groupChatIds = await repository.GetOrganizationGroupChatIdsAsync(organization.Id, cancellationToken);
    if (groupChatIds.Count == 0)
    {
        await groupService.CreateOrganizationGroupAsync(user.Id, cancellationToken);
        return;
    }

    foreach (var chatId in groupChatIds)
        await groupService.JoinViaOrganizationAsync(chatId, user.Id, cancellationToken);
}`,
    '3.4-listing. OrganizationMembershipService: foydalanuvchini tashkilotga va domen guruhiga qo‘shish',
  ),
  p(
    'Tashkilot a’zoligi foydalanuvchi haqidagi barcha DTO’larga qo‘shilgan va klientda ismlar yonida “tuit.uz ✓” ko‘rinishida chiqadi. Domen guruhida har bir qo‘shilish xizmat xabari bilan qayd etiladi, tashqaridagi foydalanuvchi esa guruhga taklif havolasi orqali kiradi (3.8-rasm).',
  ),
  ...figurePair(
    [
      ['3-22-organization-group.jpg', 'yopiq domen guruhi'],
      ['3-23-join-invite.jpg', 'taklif havolasi sahifasi'],
    ],
    '3.8',
    'Tashkilot rejimi',
  ),

  // ───────────────────────────────── 3.6
  h2('3.6. Maxfiy chatlarni amalga oshirish'),
  ...ps(
    'Server tomonida maxfiy chatlar SecretChatService va SecretChatController orqali amalga oshirilgan. Barcha endpointlar joriy qurilma nomidan ishlaydi: qurilma access tokendagi sessiya identifikatori bo‘yicha aniqlanadi va har bir so‘rovda sessiyaning faolligi bazadan qayta tekshiriladi. Chat bog‘lanmagan qurilmadan kelgan so‘rov “topilmadi” javobini oladi.',
    'Shifrlangan xabarni qabul qilish 3.5-listingda ko‘rsatilgan. Server blobni ochmaydi, faqat formati va hajmini (32 KB gacha) tekshiradi. Tartib raqami oxirgisidan katta bo‘lishi shart, bir vaqtda kelgan takroriy so‘rovlar uchun esa unique indeks ikkinchi himoya chizig‘ini beradi. Qabul qiluvchi xabarni olgach, ack so‘rovi yuboradi va server uni o‘chiradi; SecretChatCleanup fon ishi esa har soatda eskirgan so‘rov, xabar va fayllarni tozalaydi.',
  ),
  ...code(
    `var chat = await repository.GetAsync(secretChatId, cancellationToken);
var side = chat is null ? SecretChatAccess.Side.None : SecretChatAccess.SideOf(chat, userId, sessionId);
if (chat is null || side == SecretChatAccess.Side.None) return new(null, NotFoundError);
if (chat.Status != SecretChatStatus.Active) return new(null, "Maxfiy chat faol emas.");

var lastSeq = side == SecretChatAccess.Side.Initiator ? chat.InitiatorLastSeq : chat.ParticipantLastSeq;
if (request.Seq <= lastSeq) return new(null, DuplicateSeqError, Duplicate: true);

if (side == SecretChatAccess.Side.Initiator) chat.InitiatorLastSeq = request.Seq;
else chat.ParticipantLastSeq = request.Seq;

var ciphertext = SecretChatBase64.TryDecode(request.Ciphertext)!;
var message = SecretChatFactory.CreateMessage(chat.Id, sessionId, request.Seq, ciphertext, Now());
if (!await repository.TryAddMessageAsync(message, cancellationToken))
    return new(null, DuplicateSeqError, Duplicate: true);

var recipientSessionId = side == SecretChatAccess.Side.Initiator
    ? chat.ParticipantSessionId!.Value : chat.InitiatorSessionId;
await realtimeNotifier.MessageReceivedAsync(SecretChatMapper.ToDto(message), recipientSessionId, cancellationToken);`,
    '3.5-listing. SecretChatService.SendAsync: shifrlangan xabarni qabul qilish (qisqartirilgan)',
  ),
  ...ps(
    'Klientdagi kriptografik kod secret-crypto.ts modulida joylashgan va Angular’ga bog‘liq emas [50]; uning asosiy qismi ilovalarda keltirilgan. Yangi zanjir holati xabar yuborilishidan oldin IndexedDB’ga xabar bilan bitta tranzaksiyada yoziladi, shuning uchun sahifa to‘satdan yopilsa ham bitta xabar kaliti ikki marta ishlatilmaydi. Xabarlar qurilmadagi navbat (outbox) orqali qat’iy tartibda yuboriladi. Maxfiy chat oynasida qulf belgisi, taymer va kalit izini tekshirish tugmalari bor (3.9-rasm).',
    'Server xabar mazmunini bilmasligi amalda ham tekshirildi: suhbatdosh oflayn bo‘lgan paytda yuborilgan xabar bazada faqat 183 baytli ma’nosiz blob ko‘rinishida turadi, yetkazilgan xabarlar esa serverdan butunlay o‘chirilgan (3.10-rasm).',
  ),
  ...figurePair(
    [
      ['3-26-secret-chat.jpg', 'shifrlangan rasm va taymer'],
      ['3-27-secret-fingerprint.jpg', 'kalit izini tekshirish'],
    ],
    '3.9',
    'Maxfiy chat',
  ),
  ...figure('3-28-db-secret-messages.png', '3.10', 'secret_messages jadvali: serverda faqat yetkazilmagan shifrlangan blob saqlanadi', 16),

  // ───────────────────────────────── 3.7
  h2('3.7. Klient qismini ishlab chiqish'),
  ...ps(
    'Klient ilovasi Angular 22 ning mustaqil (standalone) komponentlaridan tashkil topgan [43] va uchta marshrutga ega: /auth, /chat va /join/:token. /chat sahifasi authGuard, /auth esa guestGuard bilan himoyalangan, barcha sahifalar kerak bo‘lganda yuklanadi (lazy loading). Ilova holati Angular signals orqali boshqariladi: chatlar ro‘yxati, xabarlar va “yozmoqda” holati ChatApiService’da signal ko‘rinishida saqlanadi, komponentlar esa computed() yordamida “6 a’zo, 2 onlayn” kabi hosila qiymatlar oladi. REST javoblari ham, SignalR hodisalari ham holatga bir xil yo‘l bilan qo‘llanadi.',
    'authInterceptor har bir so‘rovga access tokenni qo‘shadi, 401 javobida esa tokenni yangilab so‘rovni takrorlaydi; bir vaqtda bir nechta so‘rov muvaffaqiyatsiz bo‘lsa ham bitta refresh so‘rovi ishlatiladi. Interfeys loyihaning dizayn tizimiga asoslangan: ranglar CSS o‘zgaruvchilari orqali berilgani uchun qorong‘i mavzu ularning muqobil qiymatlari bilan amalga oshiriladi. Interfeys moslashuvchan: katta ekranda uch ustunli joylashuv, telefonda esa bir vaqtda bitta ekran ko‘rsatiladi (3.11-rasm).',
  ),
  ...figurePair(
    [
      ['3-16-dark-theme.jpg', 'qorong‘i mavzu'],
      ['3-17-mobile.jpg', 'mobil qurilmada'],
    ],
    '3.11',
    'Qorong‘i mavzu va mobil ko‘rinish',
  ),

  // ───────────────────────────────── 3.8
  h2('3.8. Joylashtirish va testlash'),
  ...ps(
    'Server ilovasi ko‘p bosqichli Dockerfile yordamida yig‘iladi [45]: birinchi bosqichda .NET SDK obrazida loyiha nashr qilinadi, ikkinchisida faqat natija yengil ASP.NET runtime obraziga ko‘chiriladi, shuning uchun yakuniy obrazda kompilyator va manba kodi bo‘lmaydi. Konteyner Render platformasida ishga tushiriladi va GitHub’dagi o‘zgarishlardan so‘ng avtomatik qayta yig‘iladi. Maxfiy sozlamalar (bazaga ulanish, JWT va HMAC kalitlari, SMTP) kodda emas, muhit o‘zgaruvchilarida saqlanadi.',
    'Biznes-mantiq xUnit freymvorkida NationalChat.Tests loyihasi bilan tekshirildi [49]. Tashqi bog‘liqliklar NSubstitute yordamida soxtalashtirildi, vaqtga bog‘liq mantiq esa qat’iy TimeProvider bilan sinaldi. Serverda 307 ta, klientda Vitest freymvorkida 229 ta test yozildi [51]; klient testlari transliteratsiyaning server bilan bir xil ishlashini, shifrlash, kalit zanjiri va soxta xabarlarni rad etishni tekshiradi. Natija 3.12-rasmda, server testlari tarkibi 3.4-jadvalda keltirilgan.',
  ),
  ...figure('3-19-unit-tests.png', '3.12', 'Server (dotnet test) va klient (ng test) testlarini bajarish natijasi', 15),
  ...table(
    '3.4',
    'Server unit testlari tarkibi va natijalari',
    ['Test sinfi', 'Soni', 'Tekshiriladigan holatlar', 'Natija'],
    [
      ['UzbekTransliteratorTests, MessageSearchTextTests', '167', 'Umumiy to‘plamdagi 80 ta juftlik ikkala yo‘nalishda, kontekst qoidalari, registr, himoyalangan qismlar, qidiruv kaliti', 'O‘tdi'],
      ['Organization… (3 ta sinf)', '44', 'Domenni ajratish, o‘xshash va umumiy domenlar, birinchi foydalanuvchi — admin, taklif havolalari', 'O‘tdi'],
      ['SecretChatServiceTests, AuthServiceSecretChatTests', '39', 'Qurilmaga bog‘lash, takroriy seq’ni rad etish, boshqa qurilmadan yuborish, ack, logout’da yopilish', 'O‘tdi'],
      ['GroupServiceTests, ChatPermissionTests', '19', 'Rollar va ruxsatlar, egalikni o‘tkazish, a’zolar limiti', 'O‘tdi'],
      ['Xeshlash, ClientOrigin, sahifalash, validatorlar', '38', 'PBKDF2 va HMAC, ruxsat etilgan manzillar, kursorli sahifalash, validatsiya chegaralari', 'O‘tdi'],
      ['Jami', '307', '', '307 / 307'],
    ],
    [4.2, 1.1, 7.4, 1.6],
  ),
  p(
    'Bundan tashqari, guruh chatlari uchun API darajasida 43 ta tekshiruvdan iborat avtomatik ssenariy yozildi va barchasi muvaffaqiyatli o‘tdi. Maxfiy chatlar ikki alohida brauzerda haqiqiy server bilan sinaldi, diplomdagi barcha skrinshotlar ham haqiqiy tizimdan avtomatik olindi. Qo‘lda o‘tkazilgan asosiy sinovlar 3.5-jadvalda keltirilgan.',
  ),
  ...table(
    '3.5',
    'Qo‘lda o‘tkazilgan asosiy sinov ssenariylari',
    ['№', 'Ssenariy', 'Kutilgan natija', 'Natija'],
    [
      ['1', 'Yangi e-pochta bilan kirish va ro‘yxatdan o‘tish', 'Kod keladi, profil yaratiladi, chat sahifasi ochiladi', 'Mos'],
      ['2', 'Noto‘g‘ri kodni 5 marta kiritish', 'Kod bekor qilinadi, keyin to‘g‘ri kod ham qabul qilinmaydi', 'Mos'],
      ['3', 'Ikki brauzerda xabar almashish', 'Xabar sahifani yangilamasdan keladi, ✓✓ belgisi paydo bo‘ladi', 'Mos'],
      ['4', 'Guruh yaratish va a’zo qo‘shish', 'Guruh barcha a’zolarda darhol paydo bo‘ladi, xizmat xabari chiqadi', 'Mos'],
      ['5', 'Oddiy a’zo guruhni boshqarishga urinadi', 'Boshqaruv tugmalari ko‘rinmaydi, API rad etadi', 'Mos'],
      ['6', 'Boshqa qurilma sessiyasini yakunlash', 'Qurilma chiqadi, tokeni yangilanmaydi, undagi maxfiy chatlar yopiladi', 'Mos'],
      ['7', 'Telefon o‘lchamida (375 px) foydalanish', 'Gorizontal aylantirish yo‘q, barcha amallar mavjud', 'Mos'],
      ['8', 'Kirillcha xabarni “Lotin” sozlamasida ko‘rish va qidirish', 'Xabar lotinda ko‘rinadi, lotincha so‘rov uni topadi', 'Mos'],
      ['9', '@tuit.uz va @gmail.com bilan ro‘yxatdan o‘tish', 'Birinchisi belgi oladi va domen guruhiga qo‘shiladi, ikkinchisi yo‘q', 'Mos'],
      ['10', 'Ikki brauzerda maxfiy chat, rasm va taymer', 'Kalit izlari bir xil, xabar ochiladi, muddati o‘tgani ikkala tomonda o‘chadi', 'Mos'],
    ],
    [0.8, 5, 6.5, 1.4],
  ),

  // ───────────────────────────────── 3.9
  h2('3.9. Foydalanish yo‘riqnomasi'),
  h3('Tizimga kirish.'),
  p(
    'Kirish sahifasida e-pochta manzili kiritiladi yoki Google hisobi tanlanadi, so‘ng pochtaga kelgan 6 xonali kod kiritiladi (3.13-rasm). Manzil birinchi marta ishlatilayotgan bo‘lsa, ism, familiya va username kiritilib profil yaratiladi. Tashkilot pochtasi bilan kirilganda foydalanuvchi tashkilotning domen guruhiga avtomatik qo‘shiladi.',
  ),
  ...figurePair(
    [
      ['3-01-login.jpg', 'kirish sahifasi'],
      ['3-02-otp.jpg', 'tasdiqlash kodi'],
    ],
    '3.13',
    'Tizimga kirish',
  ),
  h3('Xabar almashish.'),
  p(
    'Chap paneldagi qidiruv maydoniga ism yoki username yozilib, suhbatdosh tanlanadi. Xabar pastdagi maydonga yoziladi va Enter bilan yuboriladi, qisqich tugmasi orqali fayl biriktiriladi. Xabar ustiga olib borilganda javob berish, tahrirlash va o‘chirish amallari chiqadi. Sarlavhadagi qidiruv tugmasi chat ichida qidiradi, topilgan xabar bosilganda chat o‘sha joyga aylantiriladi (3.14-rasm).',
  ),
  ...figurePair(
    [
      ['3-06-reply.jpg', 'xabarga javob yozish'],
      ['3-09-message-search.jpg', 'chat ichida qidirish'],
    ],
    '3.14',
    'Xabar almashish',
  ),
  h3('Profil va yozuv sozlamasi.'),
  p(
    'Profil oynasida ism, username va profil rasmi tahrirlanadi, mavzu almashtiriladi, “Qurilmalar” bo‘limida esa begona qurilmani hisobdan chiqarish mumkin. “Yozuv” bo‘limida xabarlar qaysi yozuvda ko‘rsatilishi tanlanadi: “Asl holida”, “Lotin” yoki “Кирилл” (3.15-rasm).',
  ),
  ...figurePair(
    [
      ['3-12-profile-editor.jpg', 'profilni tahrirlash'],
      ['3-21-script-setting.jpg', '“Yozuv” sozlamasi'],
    ],
    '3.15',
    'Profil oynasi',
  ),
  h3('Guruh va maxfiy chat.'),
  ...ps(
    'Guruh yaratish uchun “Yangi guruh” tugmasi bosiladi, a’zolar tanlanadi, so‘ng nom, tavsif va rasm kiritiladi. Guruh sarlavhasi bosilganda ma’lumot paneli ochiladi (3.4-rasm): ega va administratorlar bu yerda a’zolarni boshqaradi va taklif havolasini yaratadi.',
    'Maxfiy chat shaxsiy chat menyusidagi “Maxfiy chat boshlash” bandi orqali ochiladi. Suhbatdosh taklifni qabul qilgach, kalit izini yuzma-yuz solishtirish, taymer o‘rnatish va shifrlangan fayl yuborish mumkin. Maxfiy chat faqat u ochilgan qurilmada ishlaydi.',
  ),

  h2('3-bob bo‘yicha xulosa'),
  p(
    'Uchinchi bobda “Milliy chat” tizimining dasturiy amalga oshirilishi ko‘rib chiqildi. Server qismida 73 ta endpointli REST API, kursorli sahifalash, to‘rt metodli va o‘n to‘rt hodisali SignalR habi, onlayn holatni kuzatish, media fayllarni xavfsiz qayta ishlash, guruhlar va hikoyalar, klient qismida esa signals asosidagi holat boshqaruvi, tokenni avtomatik yangilash, qorong‘i mavzu va moslashuvchan interfeys yaratildi. Tizimning o‘ziga xos uchta imkoniyati — lotin–kirill transliteratsiyasi va yozuvdan qat’i nazar qidiruv, e-pochta domeni orqali tashkilot rejimi hamda E2E shifrlangan maxfiy chatlar amalga oshirildi. Tizim Docker konteynerida bulutga joylashtirildi va 307 ta server, 229 ta klient testi, 43 ta integratsion tekshiruv hamda qo‘lda o‘tkazilgan sinovlar bilan tasdiqlandi.',
  ),
];
