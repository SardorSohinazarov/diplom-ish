import { bullets, code, figure, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter3 = () => [
  h1('III-bob. “Milliy chat” dasturini ishlab chiqish'),
  p(
    'Ushbu bobda ikkinchi bobda loyihalangan tizimning dasturiy amalga oshirilishi yoritiladi. Server qismi 236 ta C# faylidan (migratsiyalarsiz 9 mingga yaqin qator) iborat, unit testlar esa yana 2,1 ming qatorni tashkil etadi. Klient qismi 30 ta Angular komponenti va 13 mingdan ortiq TypeScript, HTML va SCSS qatoridan tashkil topgan. Ishlab chiqish jarayonida server repozitoriysida 89 ta, klient repozitoriysida 44 ta commit qilindi. Quyida keltirilgan kod parchalari loyihaning haqiqiy manba kodidan olingan. Ayrim joylarda ular qisqartirilgan va bunday joylar “…” belgisi bilan ko‘rsatilgan.',
  ),

  // ───────────────────────────────── 3.1
  h2('3.1. Server qismini ishlab chiqish'),
  h3('Loyiha tuzilmasi va ilovani ishga tushirish.'),
  ...ps(
    'Server yechimi (NationalChat.sln) ikkinchi bobda tavsiflangan to‘rtta loyihadan (Domain, Application, Infrastructure, API) va unit testlar loyihasidan (tests/NationalChat.Tests) iborat. Ilovaning kirish nuqtasi — API loyihasidagi Program.cs fayli (3.1-listing). U faqat ilovani yig‘ish va so‘rovlarni qayta ishlash konveyerini (middleware pipeline) sozlash bilan shug‘ullanadi. Barcha servislarni ro‘yxatdan o‘tkazish esa ServiceCollectionExtensions sinfidagi mavzuli metodlarga ajratilgan: API transporti, autentifikatsiya, ma’lumotlar bazasi, repozitoriylar, Application servislari, xavfsizlik, elektron pochta va fon ishlari.',
  ),
  ...code(
    `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddServices(builder.Configuration, builder.Environment);

var app = builder.Build();
…
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseMiddleware<SecurityHeadersMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("Client");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");

app.Run();`,
    '3.1-listing. Program.cs — so‘rovlarni qayta ishlash konveyeri (qisqartirilgan)',
  ),
  p(
    'Konveyerdagi tartib muhim. Xatolarni ushlovchi middleware eng birinchi turadi, shuning uchun u keyingi bosqichlarda yuz bergan har qanday istisnoni ushlay oladi. Undan keyin har bir javobga xavfsizlik sarlavhalarini qo‘shuvchi SecurityHeadersMiddleware keladi. Autentifikatsiya avtorizatsiyadan oldin bajariladi. REST controllerlar va SignalR habi eng oxirida ulanadi.',
  ),
  h3('REST API.'),
  p(
    'Server 11 ta controller orqali jami 73 ta HTTP endpointni taqdim etadi (3.1-jadval). Endpointlar resurslarga yo‘naltirilgan (RESTful) tamoyil asosida nomlangan: resurslar ko‘plik shaklida (chats, messages, groups), amal esa HTTP metodi (GET, POST, PUT, DELETE) orqali ifodalanadi. Masalan, “POST /api/chats/{chatId}/messages” chatga xabar qo‘shadi, “PUT /api/groups/{chatId}/members/{userId}/role” esa guruh a’zosining rolini o‘zgartiradi.',
  ),
  ...table(
    '3.1',
    'Server API controllerlari va endpointlari',
    ['Controller', 'Asosiy yo‘l', 'Soni', 'Vazifasi'],
    [
      ['AuthController', '/api/auth', '11', 'Kod so‘rash va tasdiqlash, Google, ro‘yxatdan o‘tish, tokenni yangilash, chiqish, sessiyalar'],
      ['ProfileController', '/api/users/me', '6', 'Profilni olish va tahrirlash, profil rasmi, yozuv sozlamasi'],
      ['UserController', '/api/users', '1', 'Foydalanuvchilarni qidirish'],
      ['ContactController', '/api/contacts', '3', 'Kontaktlar ro‘yxati, qo‘shish, o‘chirish'],
      ['ChatController', '/api/chats', '3', 'Chatlar ro‘yxati, shaxsiy chat, chatni o‘chirish'],
      ['GroupController', '/api/groups', '12', 'Guruh yaratish, tahrirlash, rasm, a’zolar va rollar, chiqish, taklif havolalari'],
      ['MessageController', '/api/chats/{id}/messages', '7', 'Xabarlar tarixi, yuborish, tahrirlash, o‘chirish, qidiruv, kontekst'],
      ['MessageAttachmentController', '/api/chats/…, /api/media/…', '10', 'Rasm, video, fayl yuklash va berish, ulashilgan media'],
      ['StoryController', '/api/stories', '8', 'Hikoyalar lentasi, yaratish, media, ko‘rishlar'],
      ['OrganizationController', '/api/organizations', '1', 'Foydalanuvchining tashkiloti va roli'],
      ['SecretChatController', '/api/secret-chats', '11', 'Maxfiy chat so‘rovi, qabul qilish, yopish, shifrlangan xabar va fayllar, tasdiqlash (ack)'],
      ['Jami', '', '73', ''],
    ],
    [3.6, 3.8, 1.2, 6.5],
  ),
  ...ps(
    'API avtomatik ravishda OpenAPI (Swagger) spetsifikatsiyasi bilan hujjatlashtiriladi. Swagger UI interfeysida barcha endpointlar, ularning parametrlari va javob sxemalarini ko‘rish hamda JWT token bilan to‘g‘ridan-to‘g‘ri sinab ko‘rish mumkin (3.1-rasm). Bu imkoniyat klient va server qismlarini parallel ishlab chiqishda qo‘l keldi.',
  ),
  ...figure('3-04-swagger.jpg', '3.1', 'Swagger UI: server API hujjatlari', 15.5),
  h3('Javob formati, validatsiya va xatolar.'),
  ...ps(
    'Barcha endpointlar yagona formatdagi javob qaytaradi: succeeded (muvaffaqiyat belgisi), message (xabar) va data (natija). Buning uchun API qatlamidagi Result va Result<T> sinflaridan foydalaniladi. Mijoz tomonida javoblarni qayta ishlash bitta ApiResponse<T> interfeysi orqali amalga oshiriladi. Xato holatlarida foydalanuvchiga ko‘rsatiladigan xabarlar o‘zbek tilida va ayblovchi bo‘lmagan uslubda yozilgan, masalan: “Bu amal uchun ruxsat yo‘q.”, “Rasm hajmi 10 MB dan oshmasligi kerak.”.',
    'Kiruvchi ma’lumotlar FluentValidation kutubxonasi yordamida tekshiriladi. Application qatlamida har bir so‘rov DTOsi uchun alohida validator sinfi yozilgan (masalan, CreateGroupRequestValidator, SendMessageRequestValidator, SendSecretMessageRequestValidator). Validator ikki joyda ishlaydi: ASP.NET Core’ning avtomatik validatsiyasi so‘rov controllerga yetib kelishidan oldin, servis esa biznes-qoidalarni qo‘llashdan oldin tekshiradi. Kutilmagan istisnolar ExceptionHandlingMiddleware tomonidan ushlanadi. U xatoni so‘rov metodi, yo‘li va TraceId bilan logga yozadi va mijozga 500 status kodli, ichki tafsilotlarsiz standart javob qaytaradi.',
  ),
  h3('Kursorli sahifalashni amalga oshirish.'),
  p(
    'Kursorli sahifalash barcha repozitoriylar uchun umumiy bo‘lgan IQueryable kengaytma metodi sifatida yozilgan (3.2-listing). Metod identifikatorni tanlovchi ifodani (Expression) qabul qiladi, “Id < beforeId” shartini ifodalar daraxti orqali dinamik quradi va limitdan bittaga ko‘p yozuv o‘qiydi. Qo‘shimcha yozuv mavjudligi hasMore qiymatini aniqlaydi, alohida COUNT so‘roviga esa hojat qolmaydi.',
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
    '3.2-listing. Kursorli sahifalash (QueryableExtensions)',
  ),
  p(
    'Natija to‘g‘ridan-to‘g‘ri DTOga proyeksiya qilinadi (Select). Shu sababli EF Core ma’lumotlar bazasidan faqat kerakli ustunlarni o‘qiydi va entity obyektlarini kuzatishga resurs sarflamaydi. Proyeksiya ifodalari Application qatlamidagi Mapper sinflarida (ChatListMapper.Projection, MessageMapper.Projection) saqlanadi. Masalan, chatlar ro‘yxati so‘rovi bitta SQL so‘rovida har bir chat uchun oxirgi xabarni, suhbatdosh ma’lumotlarini, guruh nomi va a’zolar sonini hamda o‘qilmagan xabarlar sonini hisoblaydi.',
  ),

  // ───────────────────────────────── 3.2
  h2('3.2. Real vaqtda xabar almashishni amalga oshirish'),
  ...ps(
    'Real vaqt aloqasi ChatHub SignalR habi hamda IChatRealtimeNotifier va ISecretChatRealtimeNotifier interfeyslarining SignalR orqali ishlaydigan amalga oshirilishlari yordamida quriladi. Hab mijoz chaqira oladigan to‘rtta metodni taqdim etadi. Server esa mijozlarga oddiy va maxfiy chatlar bo‘yicha jami o‘n to‘rt turdagi hodisa yuboradi (3.2-jadval). Har bir ulanish ulanish paytida ikkita guruhga qo‘shiladi: foydalanuvchining barcha qurilmalari uchun umumiy “user:{id}” va aynan shu qurilma (sessiya) uchun “session:{sid}”. Ikkinchi guruh maxfiy chat hodisalarini faqat chat bog‘langan qurilmaga yetkazish uchun ishlatiladi.',
  ),
  ...table(
    '3.2',
    'SignalR habi metodlari va hodisalari',
    ['Nomi', 'Yo‘nalish', 'Vazifasi'],
    [
      ['JoinChat(chatId)', 'Mijoz → server', 'Ochilgan chatning “chat:{id}” guruhiga qo‘shilish (a’zolik tekshiriladi)'],
      ['LeaveChat(chatId)', 'Mijoz → server', 'Chat guruhidan chiqish'],
      ['SetTyping(chatId, isTyping)', 'Mijoz → server', '“Yozmoqda” holatini chatdagi boshqalarga uzatish'],
      ['MarkMessagesRead(chatId, ids)', 'Mijoz → server', 'Xabarlarni o‘qilgan deb belgilash (100 tagacha)'],
      ['MessageReceived', 'Server → mijoz', 'Yangi xabar yoki xizmat xabari'],
      ['MessageUpdated / MessageDeleted', 'Server → mijoz', 'Xabar tahrirlandi yoki o‘chirildi'],
      ['MessagesRead', 'Server → mijoz', 'Jo‘natuvchiga xabarlar o‘qilgani haqida (✓✓)'],
      ['TypingChanged', 'Server → mijoz', 'Suhbatdosh yozmoqda yoki to‘xtadi'],
      ['ChatCleared / ChatDeleted', 'Server → mijoz', 'Chat tarixi tozalandi yoki chat o‘chirildi (a’zolikdan chiqarilganda ham)'],
      ['GroupUpdated', 'Server → mijoz', 'Guruh nomi, rasmi, a’zolari yoki rollari o‘zgardi'],
      ['UserPresenceChanged', 'Server → mijoz', 'Foydalanuvchi onlayn bo‘ldi yoki oflayn holatga o‘tdi'],
      ['ProfilePhotoUpdated', 'Server → mijoz', 'Foydalanuvchi profil rasmini yangiladi'],
      ['SecretChatRequested / SecretChatAccepted', 'Server → mijoz', 'Maxfiy chat taklifi keldi yoki qabul qilindi (suhbatdosh ochiq kaliti bilan)'],
      ['SecretMessageReceived / SecretChatClosed', 'Server → mijoz', 'Shifrlangan xabar (faqat bog‘langan qurilmaga) yoki maxfiy chat yopildi'],
    ],
    [4.2, 2.8, 6.5],
  ),
  ...ps(
    'Hab metodlari ham REST endpointlari kabi himoyalangan: har bir chaqiruvda foydalanuvchining shu chat a’zosi ekanligi tekshiriladi (3.3-listing). Bu tekshiruv bo‘lmasa, xabarni boshqa foydalanuvchi chat identifikatorini taxmin qilib, begona chatdagi “yozmoqda” hodisalarini tinglashi yoki xabarlarni o‘qilgan deb belgilashi mumkin bo‘lardi.',
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
    '3.3-listing. ChatHub: o‘qilganlik belgisini qayd etish va a’zolikni tekshirish',
  ),
  ...ps(
    'Onlayn holatni kuzatish IPresenceTracker interfeysi orqali abstraksiyalangan. InMemoryPresenceTracker har bir foydalanuvchi uchun faol ulanishlar to‘plamini ConcurrentDictionary’da saqlaydi. RedisPresenceTracker esa xuddi shu ma’lumotni Redis to‘plamlarida (SET) saqlaydi va bir nechta server nusxasi ishlaganda qo‘llanadi. Foydalanuvchining birinchi ulanishi paydo bo‘lganda u bilan umumiy chati bor foydalanuvchilarga “onlayn” hodisasi yuboriladi. Oxirgi ulanish uzilganda esa server 8 soniya kutadi (grace period). Sahifani yangilash yoki qisqa tarmoq uzilishida foydalanuvchi qayta ulanib ulguradi, natijada suhbatdoshlarda “oflayn” holati bir zumga ham ko‘rinmaydi. Shundan so‘ng sessiyaning oxirgi faollik vaqti yangilanadi va “oxirgi marta … onlayn edi” ma’lumoti hisoblanadi.',
    'Klient tomonida ChatRealtimeService servisi SignalR ulanishini boshqaradi. Ulanish avtomatik qayta ulanish siyosati (0, 2, 5 va 10 soniyadan keyin urinish) bilan yaratiladi. Qayta ulanilgach, ochiq turgan chatga JoinChat avtomatik qayta chaqiriladi. Kiruvchi hodisalar RxJS Subject’lari orqali ChatApiService’ga uzatiladi va u ilova holatini (chatlar ro‘yxati, xabarlar, “yozmoqda” holati) yangilaydi. 3.2-rasmda suhbatdosh javob yozayotgan paytdagi shaxsiy chat ko‘rsatilgan: sarlavhada “yozmoqda…” yozuvi, jo‘natilgan xabarlar yonida esa o‘qilganlik belgisi ko‘rinib turibdi. Chatlar ro‘yxatida tasdiqlangan tashkilot a’zolarining ismi yonida “tuit.uz ✓” belgisi ham ko‘rinadi.',
  ),
  ...figure('3-05-private-chat.jpg', '3.2', 'Shaxsiy chat: real vaqtda “yozmoqda” holati va o‘qilganlik belgilari', 15.5),

  // ───────────────────────────────── 3.3
  h2('3.3. Media fayllar bilan ishlash'),
  ...ps(
    'Rasm, video va ixtiyoriy fayllar multipart/form-data formatida yuklanadi. Barcha turdagi fayllar bir xil konveyerdan o‘tadi. Umumiy qadamlar Application qatlamidagi FileService servisida, texnik amallar esa Infrastructure qatlamidagi LocalImageStorage sinfida amalga oshirilgan:',
  ),
  ...numbered([
    'fayl tanlangani va hajmi tekshiriladi (rasm — 10 MB, fayl — 50 MB, xabardagi video — 200 MB gacha);',
    'fayl ClamAV antivirusi bilan tekshiriladi (sozlamalarda yoqilgan bo‘lsa);',
    'rasm formati kengaytma bo‘yicha emas, tarkib bo‘yicha aniqlanadi (JPEG, PNG, WebP), rasm 90% sifat bilan qayta kodlanadi va 256 pikselli kichik nusxa (thumbnail) yaratiladi. Video uchun esa ffprobe yordamida o‘lchamlar aniqlanadi va ffmpeg yordamida birinchi kadrdan muqova rasm olinadi;',
    'fayl diskka yil/oy bo‘yicha ajratilgan papkaga GUID nom bilan yoziladi;',
    'ma’lumotlar bazasiga files va photos yozuvlari, xabar va biriktirma (attachment) qo‘shiladi;',
    'chat a’zolariga MessageReceived hodisasi yuboriladi.',
  ]),
  ...ps(
    'Trafikni tejash uchun chatda avval faqat rasmning o‘lchamlari va hajmi ko‘rsatiladi. Rasmning kichik nusxasi foydalanuvchi so‘raganda yuklanadi, to‘liq o‘lchamdagi asl nusxa esa ko‘rish oynasida ochiladi (3.3-rasm). Videolar HTTP Range so‘rovlari orqali oqim (streaming) ko‘rinishida beriladi, shuning uchun videoni to‘liq yuklamasdan ham istalgan joyidan ko‘rish mumkin. Chatdagi barcha media fayllar ma’lumot panelida turlari bo‘yicha (rasmlar, videolar, fayllar) guruhlab ko‘rsatiladi (3.4-rasm).',
  ),
  ...figure('3-07-image-viewer.jpg', '3.3', 'Rasmni to‘liq o‘lchamda ko‘rish oynasi', 15.5),
  ...figure('3-08-shared-media.jpg', '3.4', 'Chatdagi ulashilgan media paneli', 15.5),

  // ───────────────────────────────── 3.4
  h2('3.4. Guruh chatlari va hikoyalar'),
  ...ps(
    'Guruh chatlari GroupService servisida amalga oshirilgan. Servis har bir amaldan oldin foydalanuvchining guruhdagi rolini aniqlaydi va 2.4-jadvaldagi ruxsatlarni qo‘llaydi. O‘zgarishlar esa xizmat xabarlari va real vaqt hodisalari bilan birga saqlanadi. Eng murakkab holatlardan biri — guruh egasining guruhdan chiqishi (3.4-listing). Bu holatda guruh egasiz qolmasligi uchun egalik eng oldin tayinlangan administratorga, administratorlar bo‘lmasa esa guruhga eng oldin qo‘shilgan a’zoga o‘tadi. Guruhda hech kim qolmasa, u yumshoq o‘chiriladi.',
  ),
  ...code(
    `var now = timeProvider.GetUtcNow().UtcDateTime;
RemoveMember(group, leaver);

if (group.Chat.Members.Count == 0)
{
    group.Chat.DeletedAt = now;
    await repository.SaveChangesAsync(cancellationToken);
    await realtimeNotifier.ChatDeletedAsync(chatId, [currentUserId], cancellationToken);
    return new(true, null);
}

if (leaver.Role == ChatMemberRole.Creator)
{
    // Ownership passes to the longest-serving admin, or to the longest-serving member.
    var successor = group.Chat.Members
        .OrderByDescending(member => member.Role == ChatMemberRole.Admin)
        .ThenBy(member => member.JoinedAt)
        .ThenBy(member => member.Id)
        .First();
    successor.Role = ChatMemberRole.Creator;
    group.CreatorId = successor.UserId;
}

var serviceMessage = AddServiceMessage(group, leaver.User, MessageServiceAction.MemberLeft, …);
await repository.SaveChangesAsync(cancellationToken);`,
    '3.4-listing. GroupService.LeaveAsync: guruhdan chiqish va egalikni o‘tkazish (qisqartirilgan)',
  ),
  ...ps(
    'Xizmat xabarlarining matni klient tomonida xabar turi (ServiceAction) va unda saqlangan ism yoki nom asosida yig‘iladi. Masalan, “Jasur Karimov guruhga qo‘shdi: Aziz Nazarov”, “Sardor Sohinazarov guruh rasmini yangiladi”. Bunday xabarlar chat markazida kulrang yozuv ko‘rinishida chiqadi va ularni tahrirlab, o‘chirib yoki ularga javob berib bo‘lmaydi. Guruhda boshqa a’zolarning xabarlari ustida jo‘natuvchining ismi, tashkilot belgisi va avatari ko‘rsatiladi. Sarlavhada a’zolar va onlayn a’zolar soni, kimdir yozayotgan bo‘lsa esa uning ismi chiqadi. Ma’lumot panelida guruh rasmi, tavsifi, taklif havolasi va a’zolar ro‘yxati rollari bilan ko‘rsatiladi. Guruh egasi va administratorlarga esa a’zolarni boshqarish menyusi ochiladi (3.5-rasm).',
    'Taklif havolasi ixtiyoriy guruh uchun yaratilishi mumkin. Admin “Havola yaratish” tugmasini bosganda server GroupInviteTokens yordamida 16 baytli kriptografik tasodifiy tokenni base64url ko‘rinishida (22 belgi) yaratadi va groups jadvaliga yozadi. Havolani ochgan foydalanuvchi guruh nomi, tavsifi va a’zolar sonini ko‘radi, lekin a’zolar ro‘yxatini ko‘rmaydi. Guruhga qo‘shilganda chatda xizmat xabari paydo bo‘ladi. Havola yangilanganda yoki bekor qilinganda eski token darhol ishlamay qoladi.',
  ),
  ...figure('3-13-group-chat.jpg', '3.5', 'Guruh chati va guruh haqidagi ma’lumot paneli', 15.5),
  ...ps(
    'Hikoyalar (stories) StoryService servisida amalga oshirilgan. Hikoya rasm yoki video (MP4, WebM, MOV, 50 MB gacha) va qisqa izohdan iborat. U joylangan paytdan boshlab 24 soat davomida ko‘rinadi (ExpiresAt = CreatedAt + 24 soat). Hikoyalar lentasi foydalanuvchining o‘zi va u bilan chati bor foydalanuvchilarning amaldagi hikoyalarini qaytaradi. Chatlar ro‘yxati ustidagi hikoyalar panelida ko‘rilmagan hikoyasi bor foydalanuvchilar rangli halqa bilan ajratiladi. Hikoya ochilganda story_views jadvaliga yozuv qo‘shiladi. Hikoya muallifi esa uni kim va qachon ko‘rganini bilishi mumkin. Hikoya ko‘ruvchi oynasi 3.6-rasmda keltirilgan: yuqorida progress chiziqlari, muallif va vaqt, pastda esa izoh joylashgan.',
  ),
  ...figure('3-11-story-viewer.jpg', '3.6', 'Hikoyani ko‘rish oynasi', 15.5),

  // ───────────────────────────────── 3.5
  h2('3.5. Lotin–kirill transliteratsiyasi va yozuvdan qat’i nazar qidiruv'),
  ...ps(
    'O‘zbekistonda ikki yozuv parallel qo‘llanadi: rasmiy lotin alifbosi va hanuzgacha keng ishlatiladigan kirill alifbosi. Katta avlod vakillari va ko‘plab rasmiy matnlar kirillda, yoshlar esa asosan lotinda yozadi. Mavjud messenjerlar xabarni qanday yozilgan bo‘lsa, shunday ko‘rsatadi: kirillni o‘qishga qiynaladigan foydalanuvchi uchun lotin yozuvi, yoki aksincha, noqulay bo‘ladi. “Milliy chat”da bu muammo hal etilgan: har bir foydalanuvchi xabarlarni o‘zi tanlagan yozuvda ko‘radi. Ushbu imkoniyat faqat o‘zbek tiliga xos va ko‘rib chiqilgan xorijiy messenjerlarning birortasida mavjud emas.',
    'Xabar ma’lumotlar bazasida doimo **asl holida** saqlanadi, o‘girish esa faqat ko‘rsatish paytida klientda bajariladi. Shu sababli bitta xabarni bir foydalanuvchi lotinda, boshqasi kirillda ko‘radi, jo‘natuvchi esa uni qanday yozgan bo‘lsa, shunday ko‘radi. Foydalanuvchi sozlamasi (ScriptPreference) serverda saqlanadi va uning barcha qurilmalarida amal qiladi. Yozuv almashtirilganda sahifani qayta yuklash talab etilmaydi: uzScript pipe’i Angular signaliga bog‘langan, shuning uchun barcha xabarlar darhol qayta chiziladi.',
  ),
  h3('Transliteratsiya algoritmi.'),
  ...ps(
    'Algoritm 1995-yilda tasdiqlangan o‘zbek lotin alifbosi va imlo qoidalariga asoslanadi. U Domain qatlamidagi UzbekTransliterator statik sinfida amalga oshirilgan, klientda esa uning TypeScript’dagi aynan nusxasi ishlaydi. Ikkala tomondagi algoritm bir-biridan farq qilib qolmasligi uchun ular bitta umumiy test to‘plami (transliteration-cases.json, 80 ta kirill–lotin juftligi) bo‘yicha tekshiriladi. Kirilldan lotinga o‘girish deyarli bir ma’noli, teskari yo‘nalishda esa kontekstga bog‘liq qoidalar talab etiladi (3.3-jadval).',
  ),
  ...table(
    '3.3',
    'Kontekstga bog‘liq transliteratsiya qoidalari',
    ['Holat', 'Qoida', 'Misol'],
    [
      ['Kirill “е”', 'So‘z boshida, unli harfdan yoki ъ, ь dan keyin “ye”, qolgan hollarda “e”', 'ер → yer; биринчи → birinchi; келди → keldi'],
      ['Kirill “ц”', 'Unli harfdan keyin “ts”, qolgan hollarda “s”', 'лицей → litsey; цирк → sirk'],
      ['ў, ғ va tutuq', 'ў → o‘, ғ → g‘, ъ → ’; “сҳ” tutuq bilan yoziladi, “ш” bilan adashmasligi uchun', 'Ўзбек → O‘zbek; Исҳоқ → Is’hoq'],
      ['Lotin digraflari', 'sh → ш, ch → ч, o‘ → ў, g‘ → ғ, yo → ё, yu → ю, ya → я, ye → е', 'shahar → шаҳар; yo‘l → йўл'],
      ['Lotin “e”', 'So‘z boshida yoki unlidan keyin “э”, qolgan hollarda “е”', 'eshik → эшик; kecha → кеча'],
      ['Lotin “ts”', 'Istisnolar lug‘atidagi o‘zlashma so‘zlarda “ц”, qolgan hollarda “тс”', 'litsey → лицей; eritsa → эритса'],
      ['Registr', 'Bosh harf saqlanadi; butun so‘z katta harfda bo‘lsa, digraf ham katta', 'ШАҲАР → SHAHAR; Шаҳар → Shahar'],
      ['Tutuq belgisi variantlari', '\', ‘, ’, `, ʻ, ʼ belgilarining barchasi bir xil tushuniladi', 'o\'zbek = o‘zbek = oʻzbek'],
      ['Himoyalangan qismlar', 'URL, e-pochta, @username, #teg va `kod` o‘girilmaydi', '@sardor_s, https://tuit.uz o‘zgarmaydi'],
    ],
    [3, 6.5, 5],
  ),
  ...ps(
    'Kirilldan lotinga o‘girish funksiyasining asosiy qismi 3.5-listingda keltirilgan. Har bir harf uchun avval kontekstga bog‘liq qoidalar tekshiriladi, keyin esa oddiy moslik lug‘atidan foydalaniladi. Registr alohida qayta ishlanadi: “Ш” so‘z boshida “Sh”, butunlay katta harflardan iborat so‘zda esa “SH” ko‘rinishiga keladi.',
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
        {
            latin = CyrillicVowels.Contains(previous) ? "ts" : "s";
        }
        else if (lower == 'ҳ' && previous == 'с')
        {
            // "сҳ" (Исҳоқ) is written with a tutuq in Latin so that it is not read as "ш".
            latin = TutuqMark + "h";
        }
        else if (!CyrillicToLatinMap.TryGetValue(lower, out latin!))
        {
            builder.Append(ch);
            continue;
        }

        builder.Append(ch == lower ? latin : ApplyUpperCase(latin, IsUpperCaseWord(text, i)));
    }
    return builder.ToString();
}`,
    '3.5-listing. UzbekTransliterator: kirill matnini lotinga o‘girish (C#)',
  ),
  ...ps(
    'Sozlama “Asl holida” bo‘lsa, xabarlar yozilganidek ko‘rsatiladi (3.7-rasm). “Lotin” tanlanganda esa xuddi shu suhbatdagi kirillda yozilgan xabarlar lotin yozuvida chiqadi (3.8-rasm). Ma’lum cheklov sifatida shuni ta’kidlash kerakki, kirill sozlamasida inglizcha so‘zlar ham kirill harflariga o‘giriladi. Shuning uchun URL va username kabi qismlar himoyalangan, foydalanuvchi esa istalgan vaqtda asl holiga qaytishi mumkin.',
  ),
  ...figure('3-20-script-original.jpg', '3.7', 'Suhbat asl holida: suhbatdosh kirillda, foydalanuvchi lotinda yozgan', 15.5),
  ...figure('3-20-script-latin.jpg', '3.8', 'Xuddi shu suhbat “Lotin” sozlamasida', 15.5),
  h3('Yozuvdan qat’i nazar qidiruv.'),
  ...ps(
    'Chat ichidagi qidiruv ham yozuvga bog‘liq bo‘lmasligi kerak: foydalanuvchi “rahmat” deb qidirganda “Раҳмат” ham topilishi lozim. Buning uchun har bir xabar yaratilganda va tahrirlanganda MessageFactory uning **qidiruv kalitini** hisoblaydi va SearchText ustuniga yozadi. Kalit NormalizeForSearch funksiyasi yordamida olinadi: matn lotinga o‘giriladi, kichik harflarga o‘tkaziladi, tutuq belgisining barcha shakllari bitta “\'” belgisiga keltiriladi va ortiqcha bo‘shliqlar olib tashlanadi. Qidiruv so‘rovi ham xuddi shu funksiyadan o‘tkaziladi, keyin esa SearchText ustunida ILIKE bilan qidiriladi. Natijada “o\'zbek”, “o‘zbek”, “oʻzbek” va “ўзбек” so‘rovlari bir xil natija beradi.',
    'Yangi ustun qo‘shilishidan oldin yozilgan xabarlar uchun SearchText bo‘sh bo‘ladi. Ularni to‘ldirish uchun SearchTextBackfill fon ishi yozildi: server ishga tushganda u bunday xabarlarni 500 tadan qayta ishlaydi. Qayta ishga tushirilganda u faqat hali to‘ldirilmagan yozuvlarni oladi, shuning uchun bir necha marta bajarilishi xavfsiz. Ma’lumotlar bazasidagi natija 3.9-rasmda ko‘rsatilgan: TextContent ustunida xabar asl holida (kirill yoki lotin), SearchText ustunida esa uning yagona lotin ko‘rinishi saqlanadi.',
  ),
  ...figure('3-29-db-search-text.png', '3.9', 'messages jadvali: asl matn (TextContent) va qidiruv kaliti (SearchText)', 16),

  // ───────────────────────────────── 3.6
  h2('3.6. Tashkilot rejimini amalga oshirish'),
  ...ps(
    'Tashkilot rejimi Application qatlamidagi OrganizationEmailMatcher yordamchi sinfi va OrganizationMembershipService servisida amalga oshirilgan. OrganizationEmailMatcher e-pochta manzilidan domenni ajratadi, uni normallashtiradi va umumiy pochta xizmatlari ro‘yxati (PublicEmailDomains — gmail.com, mail.ru, yandex.ru, umail.uz, vaqtinchalik pochta xizmatlari va boshqalar) bilan solishtiradi. Bu sinf tashqi bog‘liqlikka ega emas va 22 ta unit test bilan tekshirilgan: subdomen alohida tashkilot ekanligi, “evil-tuit.uz” kabi domenlar mos kelmasligi, registr va noto‘g‘ri formatdagi manzillar.',
    'OrganizationMembershipService.EnsureMembershipAsync metodi foydalanuvchi tasdiqlangan pochta bilan kirgan har safar chaqiriladi (3.6-listing). A’zolik yozuvi allaqachon bo‘lsa, metod darhol qaytadi, chunki e-pochta manzili o‘zgarmaydi. Aks holda tashkilot topiladi yoki yaratiladi. Bir vaqtda ikki foydalanuvchi bir xil yangi domen bilan kirgan holat ham hisobga olingan: unique indeks tufayli faqat bittasi tashkilotni yarata oladi va u admin bo‘ladi, ikkinchisi esa oddiy a’zo sifatida qo‘shiladi.',
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
    '3.6-listing. OrganizationMembershipService: foydalanuvchini tashkilotga va domen guruhiga qo‘shish',
  ),
  ...ps(
    'Tashkilot a’zoligi foydalanuvchi haqidagi barcha DTO’larga (ProfileDto, UserSearchDto, MessageSenderDto, GroupMemberDto) OrganizationBadgeDto sifatida qo‘shilgan. Klientdagi org-badge komponenti uni ismlar yonida “tuit.uz ✓” ko‘rinishida chiqaradi. Domen guruhi 3.10-rasmda ko‘rsatilgan: tuit.uz pochtasi bilan kirgan har bir foydalanuvchi guruhga o‘zi qo‘shilgan va bu xizmat xabarlari bilan qayd etilgan. Ma’lumot panelida guruhning yopiqligi haqida izoh va faqat adminlarga ko‘rinadigan taklif havolasi bor. Tashkilotdan tashqaridagi foydalanuvchi havolani ochganda 3.11-rasmdagi sahifani ko‘radi.',
  ),
  ...figure('3-22-organization-group.jpg', '3.10', 'Tashkilotning yopiq domen guruhi va taklif havolasi', 15.5),
  ...figure('3-23-join-invite.jpg', '3.11', 'Taklif havolasi orqali yopiq guruhga qo‘shilish sahifasi', 13),

  // ───────────────────────────────── 3.7
  h2('3.7. Maxfiy chatlarni amalga oshirish'),
  h3('Server qismi.'),
  ...ps(
    'Server tomonida maxfiy chatlar SecretChatService servisi va SecretChatController orqali amalga oshirilgan. Barcha endpointlar joriy qurilma nomidan ishlaydi: qurilma access token ichidagi sid (sessiya identifikatori) bo‘yicha aniqlanadi. JWT logoutdan keyin ham bir necha daqiqa yaroqli bo‘lib qolishi mumkin, shuning uchun har bir so‘rovda sessiyaning faolligi ma’lumotlar bazasidan qayta tekshiriladi. SecretChatAccess yordamchi sinfi so‘rov qaysi tomondan (tashabbuskor yoki qabul qiluvchi) va aynan chat bog‘langan qurilmadan kelayotganini aniqlaydi. Boshqa qurilmadan kelgan so‘rov “topilmadi” javobini oladi.',
    'Shifrlangan xabarni qabul qilish 3.7-listingda ko‘rsatilgan. Server blobni ochmaydi va uning tuzilishiga qaramaydi: faqat Base64 formati va hajmi (32 KB gacha) tekshiriladi. Tartib raqami yuboruvchi tomonning oxirgi raqamidan katta bo‘lishi shart, aks holda so‘rov takroriy deb rad etiladi. Bir vaqtda kelgan ikki bir xil so‘rov uchun (SecretChatId, SenderSessionId, Seq) unique indeksi ikkinchi himoya chizig‘ini beradi. Xabar faqat qabul qiluvchi qurilmaning “session:{sid}” guruhiga yuboriladi.',
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
    '3.7-listing. SecretChatService.SendAsync: shifrlangan xabarni qabul qilish (qisqartirilgan)',
  ),
  ...ps(
    'Qabul qiluvchi qurilma xabarni olgach, POST /api/secret-chats/{id}/ack so‘rovi bilan tasdiqlaydi va server shu raqamgacha bo‘lgan xabarlarni o‘chiradi. Logout, boshqa qurilmalarni chiqarish yoki bitta qurilmani chiqarish AuthService’da shu qurilmalarga bog‘langan maxfiy chatlarni darhol yopadi. SecretChatCleanup fon ishi esa har soatda muddati tugagan sessiyalarning chatlarini, 7 kundan beri javob kutayotgan so‘rovlarni hamda 7 kundan eski yetkazilmagan xabar va fayllarni tozalaydi. Shifrlangan fayllar LocalSecretFileStorage tomonidan veb-ildizdan tashqaridagi App_Data/secret-files papkasida GUID nom bilan saqlanadi. Bitta chatda yetkazilmagan fayllar soni 20 ta bilan cheklangan, bu esa bir qurilmaning server diskini to‘ldirib yuborishiga yo‘l qo‘ymaydi.',
  ),
  h3('Klient qismi.'),
  ...ps(
    'Klientdagi kriptografik kod secret-crypto.ts modulida joylashgan va Angular’ga umuman bog‘liq emas. Shu sababli uni alohida sinash va kerak bo‘lsa Web Worker’ga ko‘chirish oson. Xabarni shifrlash funksiyasi va zanjirni bir qadam oldinga surish 3.8-listingda keltirilgan. Yangi zanjir holati xabar yuborilishidan oldin IndexedDB’ga xabar bilan bitta tranzaksiyada yoziladi. Shu tufayli sahifa to‘satdan yopilsa ham bitta xabar kaliti hech qachon ikki marta ishlatilmaydi.',
  ),
  ...code(
    `export async function encryptMessage(chain: ChainState, secretChatId: number,
  direction: SecretDirection, payload: SecretPayload) {
  const seq = chain.seq + 1;
  const { messageKey, nextChainKey } = await step(chain.chainKey);
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const plaintext = encoder.encode(JSON.stringify({ v: PROTOCOL_VERSION, ...payload }));
  const sealed = new Uint8Array(await subtle().encrypt(
    { name: 'AES-GCM', iv, additionalData: associatedData(secretChatId, direction, seq) },
    messageKey, plaintext));

  const envelope = new Uint8Array(1 + IV_BYTES + sealed.length);
  envelope[0] = PROTOCOL_VERSION;
  envelope.set(iv, 1);
  envelope.set(sealed, 1 + IV_BYTES);
  return { chain: { chainKey: nextChainKey, seq }, seq, ciphertext: toBase64(envelope) };
}

async function step(chainKey: CryptoKey) {
  const messageBytes = new Uint8Array(await subtle().sign('HMAC', chainKey, MESSAGE_KEY_INPUT));
  const chainBytes = new Uint8Array(await subtle().sign('HMAC', chainKey, CHAIN_KEY_INPUT));
  try {
    const messageKey = await subtle().importKey('raw', messageBytes, { name: 'AES-GCM' },
      false, ['encrypt', 'decrypt']);
    return { messageKey, nextChainKey: await importChainKey(chainBytes) };
  } finally {
    messageBytes.fill(0);   // raw key bytes live only for a moment
    chainBytes.fill(0);
  }
}`,
    '3.8-listing. secret-crypto.ts: xabarni shifrlash va ratchet qadami (TypeScript, qisqartirilgan)',
  ),
  ...ps(
    'Xabarlar avval qurilmadagi navbatga (outbox) yoziladi va qat’iy tartibda yuboriladi. Tarmoq uzilsa, qayta ulanishda yuborish davom ettiriladi. Qabul qilishda xabar faqat muvaffaqiyatli ochilgandan yoki tashlab yuborilgandan keyin tasdiqlanadi. Maxfiy chat oynasi (SecretConversationComponent) oddiy suhbat oynasidan farq qiladi: sarlavhada qulf belgisi va “faqat shu qurilmada” yozuvi, taymer va kalit tekshirish tugmalari bor, chatlar ro‘yxatida esa maxfiy chatlar alohida bo‘limda ko‘rsatiladi (3.12-rasm). Rasmda suhbatdoshga yuborilgan shifrlangan rasm va taymer o‘rnatilgandan keyingi xabar ko‘rinib turibdi, xabar yonida qolgan vaqt hisoblanmoqda. Kalit izini tekshirish oynasi 3.13-rasmda keltirilgan.',
    'Protokolning asosiy xususiyati — server xabar mazmunini bilmasligi — amalda ham tekshirildi. Suhbatdosh oflayn bo‘lgan paytda yuborilgan xabar serverda yetkazilishini kutib turadi. Uning ma’lumotlar bazasidagi ko‘rinishi 3.14-rasmda keltirilgan: jadvalda faqat 183 baytli ma’nosiz shifrlangan blob bor. Ilgari yuborilgan va yetkazilgan xabarlar esa tasdiqdan keyin serverdan butunlay o‘chirilgan.',
  ),
  ...figure('3-26-secret-chat.jpg', '3.12', 'Maxfiy chat: shifrlangan rasm va o‘z-o‘zini o‘chirish taymeri', 15.5),
  ...figure('3-27-secret-fingerprint.jpg', '3.13', 'Shifrlash kaliti izini tekshirish oynasi', 15.5),
  ...figure('3-28-db-secret-messages.png', '3.14', 'secret_messages jadvali: serverda faqat yetkazilmagan shifrlangan blob saqlanadi', 16),

  // ───────────────────────────────── 3.8
  h2('3.8. Klient qismini ishlab chiqish'),
  ...ps(
    'Klient ilovasi Angular 22 ning mustaqil (standalone) komponentlaridan tashkil topgan. Ilova konfiguratsiyasida (app.config.ts) marshrutizator, SSR sahifasini brauzerda “jonlantirish” (hydration) va HTTP klient ulanadi. HTTP klientga authInterceptor ham qo‘shiladi. Uchta marshrut mavjud: /auth (kirish va ro‘yxatdan o‘tish), /chat (asosiy messenjer sahifasi) va /join/:token (taklif havolasi). /chat sahifasi authGuard bilan, /auth sahifasi esa guestGuard bilan himoyalangan: tizimga kirgan foydalanuvchi kirish sahifasini ko‘rmaydi. Taklif havolasini tizimga kirmagan odam ochsa, havola eslab qolinadi va kirishdan keyin sahifa avtomatik ochiladi. Barcha sahifalar kerak bo‘lganda yuklanadi (lazy loading), bu esa boshlang‘ich yuklanish hajmini kamaytiradi.',
    'Ilova holati Angular signals mexanizmi orqali boshqariladi. ChatApiService’da chatlar ro‘yxati, ochiq chat xabarlari, joriy guruh ma’lumotlari va “yozmoqda” holati signal ko‘rinishida saqlanadi. Komponentlar ulardan computed() yordamida hosila qiymatlar oladi, masalan sarlavhadagi “6 a’zo, 2 onlayn” yoki “Jasur yozmoqda…” matni. Signal o‘zgarganda Angular faqat unga bog‘liq qismlarni qayta chizadi. Holat bitta servisda to‘plangani uchun REST javoblari ham, SignalR hodisalari ham bir xil yo‘l bilan qo‘llanadi. Maxfiy chatlar holati esa alohida SecretChatService’da saqlanadi, chunki uning manbai server emas, balki qurilmadagi IndexedDB.',
    'authInterceptor har bir API so‘roviga access tokenni qo‘shadi. Server 401 status kodini qaytarsa, interceptor tokenni avtomatik yangilab, so‘rovni qayta yuboradi (3.9-listing). Bir vaqtda bir nechta so‘rov muvaffaqiyatsiz bo‘lsa ham, AuthService ular uchun bitta umumiy refresh so‘rovini ishlatadi. Yangilash imkonsiz bo‘lsa, foydalanuvchi kirish sahifasiga yo‘naltiriladi.',
  ),
  ...code(
    `return next(authenticatedRequest).pipe(
  catchError((error: HttpErrorResponse) => {
    if (error.status !== 401 || !isApiRequest || isRefreshRequest || isAnonymous || !auth.accessToken())
      return throwError(() => error);
    return auth.refreshAccessToken().pipe(
      switchMap((token) =>
        next(request.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } })),
      ),
      catchError((refreshError) => {
        auth.clearToken();
        router.navigateByUrl('/auth');
        return throwError(() => refreshError);
      }),
    );
  }),
);`,
    '3.9-listing. authInterceptor: muddati o‘tgan tokenni avtomatik yangilash (TypeScript)',
  ),
  ...ps(
    'Interfeys loyiha uchun ishlab chiqilgan dizayn tizimiga asoslangan. Umumiy UI komponentlar (tugma, ikonkali tugma, matn maydoni, checkbox, banner, tasdiqlash oynasi, tashkilot belgisi, ikonkalar to‘plami) shared/ui papkasida joylashgan. Ranglar, soyalar va radiuslar CSS o‘zgaruvchilari (design tokens) orqali berilgan. Qorong‘i mavzu shu o‘zgaruvchilarning muqobil qiymatlari yordamida amalga oshirilgan (3.15-rasm). Foydalanuvchi tanlagan mavzu brauzer xotirasida saqlanadi.',
    'Interfeys moslashuvchan (responsive) qilib yaratilgan. Katta ekranda uch ustunli joylashuv (chatlar ro‘yxati, suhbat, ma’lumot paneli) ishlatiladi. Planshetda chatlar ro‘yxati yig‘iladi. Telefonda esa bir vaqtda bitta ekran ko‘rsatiladi: chatlar ro‘yxati yoki suhbat (3.16-rasm). Profil va guruh muharrirlari ekran markazidagi dialog oynasida ochiladi.',
    'Ilova qat’iy Content Security Policy bilan ishlaydi (2.5-bo‘lim). Asosiy siyosat index.html faylida meta-teg sifatida beriladi: skriptlar faqat ilovaning o‘z manzilidan va Google Identity xizmatidan, sahifa ichidagi skriptlar esa faqat oldindan hisoblangan SHA-256 xeshlari bo‘yicha ruxsat etiladi. Meta-teg orqali berib bo‘lmaydigan frame-ancestors sarlavhasi SSR serveri (server.ts) tomonidan qo‘shiladi.',
  ),
  ...figure('3-16-dark-theme.jpg', '3.15', 'Qorong‘i mavzudagi interfeys', 15.5),
  ...figure('3-17-mobile.jpg', '3.16', 'Mobil qurilmadagi ko‘rinish: chatlar ro‘yxati va guruh chati', 12),

  // ───────────────────────────────── 3.9
  h2('3.9. Joylashtirish va testlash'),
  h3('Joylashtirish.'),
  p(
    'Server ilovasi Docker konteyneri ko‘rinishida joylashtiriladi (3.10-listing). Birinchi bosqichda .NET SDK obrazida bog‘liqliklar tiklanadi va loyiha Release rejimida nashr qilinadi. Loyiha fayllari manba kodidan oldin nusxalanadi, shuning uchun Docker kodi o‘zgarganda ham bog‘liqliklar qatlamini keshdan qayta ishlatadi. Ikkinchi bosqichda faqat nashr natijasi kichik hajmli ASP.NET runtime obraziga ko‘chiriladi. Shu tufayli yakuniy obrazda kompilyator va manba kodi bo‘lmaydi.',
  ),
  ...code(
    `FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY src/API/API.csproj src/API/
COPY src/Application/Application.csproj src/Application/
COPY src/Domain/Domain.csproj src/Domain/
COPY src/Infrastructure/Infrastructure.csproj src/Infrastructure/
RUN dotnet restore src/API/API.csproj
COPY src/ src/
RUN dotnet publish src/API/API.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "API.dll"]`,
    '3.10-listing. Server ilovasining Dockerfile fayli',
  ),
  p(
    'Konteyner Render bulut platformasida “Web Service” sifatida ishga tushiriladi. Platforma GitHub repozitoriysidagi o‘zgarishlardan so‘ng obrazni avtomatik qayta yig‘adi. Maxfiy sozlamalar (ma’lumotlar bazasiga ulanish satri, JWT va HMAC kalitlari, SMTP va Google sozlamalari, ruxsat etilgan klient manzillari) kodda saqlanmaydi. Ular muhit o‘zgaruvchilari orqali beriladi, appsettings fayllari esa Git’dan chiqarib tashlangan. Ma’lumotlar bazasi sxemasi yettita EF Core migratsiyasi orqali bosqichma-bosqich yangilanadi. Klient ilovasining ishlab chiqarish konfiguratsiyasi (environment.prod.ts) bulutdagi API manziliga yo‘naltirilgan.',
  ),
  h3('Unit testlar.'),
  ...ps(
    'Biznes-mantiqning to‘g‘riligini tekshirish uchun xUnit freymvorkida NationalChat.Tests test loyihasi yaratildi. Tashqi bog‘liqliklar (real vaqt xabarnomasi, fayl servisi, repozitoriylar) NSubstitute kutubxonasi yordamida soxtalashtirildi (mock). Guruh va maxfiy chat servislari uchun esa repozitoriy va fayl omborining xotirada ishlaydigan soxta amalga oshirilishlari yozildi. Kursorli sahifalash EF Core InMemory provayderida sinaldi. Vaqtga bog‘liq mantiq (taymerlar, muddatlar, tozalash) qat’iy vaqt qaytaradigan TimeProvider yordamida tekshirildi.',
    'Server testlari soni 307 taga yetdi. Klient qismi uchun esa Vitest freymvorkida 12 ta test faylida 229 ta test yozildi. Ular transliteratsiyaning server bilan bir xil ishlashini (o‘sha JSON to‘plami bo‘yicha), shifrlash va ochish, kalit zanjiri, tartibsiz kelgan va soxta xabarlar, taymerlar, maxfiy chat oynasi, taklif sahifasi va boshqa komponentlarni tekshiradi. Testlarni bajarish natijasi 3.17-rasmda, server testlari tarkibi esa 3.4-jadvalda keltirilgan.',
  ),
  ...figure('3-19-unit-tests.png', '3.17', 'Server (dotnet test) va klient (ng test) testlarini bajarish natijasi', 15),
  ...table(
    '3.4',
    'Server unit testlari tarkibi va natijalari',
    ['Test sinfi', 'Soni', 'Tekshiriladigan holatlar', 'Natija'],
    [
      ['UzbekTransliteratorTests', '160', 'Umumiy to‘plamdagi 80 ta juftlik ikkala yo‘nalishda; kontekst qoidalari, registr, tutuq belgilari, himoyalangan qismlar, qidiruv kaliti', 'O‘tdi'],
      ['MessageSearchTextTests', '7', 'Xabar yaratilganda va tahrirlanganda SearchText hisoblanishi, qidiruv so‘rovining normallashtirilishi', 'O‘tdi'],
      ['OrganizationEmailMatcherTests', '22', 'Domenni ajratish va normallashtirish, subdomenlar, o‘xshash domenlar, umumiy pochta xizmatlari', 'O‘tdi'],
      ['OrganizationMembershipServiceTests', '9', 'Birinchi foydalanuvchi — admin va guruh egasi; keyingilar a’zo; gmail foydalanuvchisi hech narsa olmasligi; qayta kirishda takror qo‘shilmaslik', 'O‘tdi'],
      ['OrganizationGroupTests', '13', 'Domen guruhi, taklif havolasi (yaratish, yangilash, bekor qilish, noto‘g‘ri token), tashqi foydalanuvchining kira olmasligi', 'O‘tdi'],
      ['SecretChatServiceTests', '31', 'Qurilmaga bog‘lash, qabul qilish, takroriy seq’ni rad etish, boshqa qurilmadan yuborish, ack, fayllar, yopish va tozalash', 'O‘tdi'],
      ['AuthServiceSecretChatTests, AuthServiceSessionReplacementTests', '8', 'Logout va sessiyani yakunlashda maxfiy chatlarning yopilishi; shu brauzerdagi eski sessiyaning almashtirilishi', 'O‘tdi'],
      ['ClientOriginOptionsTests', '13', 'Ruxsat etilgan klient manzillari va boshqa manzillarni rad etish', 'O‘tdi'],
      ['GroupServiceTests, ChatPermissionTests', '19', 'Guruh yaratish va xizmat xabari, rollar va ruxsatlar, egalikni o‘tkazish, a’zolar limiti, chat o‘chirish huquqlari', 'O‘tdi'],
      ['Pbkdf2 va HmacRefreshTokenHasherTests', '7', 'To‘g‘ri va noto‘g‘ri kod, har safar yangi tuz, kalitga bog‘liqlik', 'O‘tdi'],
      ['CursorPaginationTests, ValidatorTests', '18', 'Sahifalash, validatorlar (nom uzunligi, a’zolar ro‘yxati, rollar, sahifalash chegaralari)', 'O‘tdi'],
      ['Jami', '307', '', '307 / 307'],
    ],
    [4.2, 1.1, 7.4, 1.6],
  ),
  p(
    'Barcha testlar muvaffaqiyatli o‘tdi. Eng uzoq davom etgan testlar PBKDF2 xeshlash testlari bo‘ldi (har biri ~230 ms). Bu 210 000 iteratsiyali xeshlash kodni tanlab topishni qanchalik qimmatlashtirishini amalda ko‘rsatadi.',
  ),
  h3('Integratsion va qo‘lda sinovlar.'),
  p(
    'Unit testlardan tashqari, tizim lokal muhitda PostgreSQL ma’lumotlar bazasi bilan birgalikda sinovdan o‘tkazildi. Guruh chatlari funksiyasi uchun API darajasida 43 ta tekshiruvdan iborat avtomatik ssenariy yozildi. U bir nechta foydalanuvchini ro‘yxatdan o‘tkazib, guruh yaratish, ruxsatlar, xizmat xabarlari, tarixni tozalash, egalikni o‘tkazish va guruhni o‘chirish holatlarini HTTP so‘rovlari orqali tekshiradi. Barcha 43 ta tekshiruv muvaffaqiyatli o‘tdi. Maxfiy chatlar ikki alohida brauzerda, haqiqiy server bilan sinaldi. Diplom ishidagi barcha skrinshotlar ham avtomatik ssenariy yordamida haqiqiy tizimdan olindi. Foydalanuvchi interfeysi brauzerda bir nechta akkaunt bilan qo‘lda sinaldi. Asosiy ssenariylar 3.5-jadvalda keltirilgan.',
  ),
  ...table(
    '3.5',
    'Qo‘lda o‘tkazilgan asosiy sinov ssenariylari',
    ['№', 'Ssenariy', 'Kutilgan natija', 'Natija'],
    [
      ['1', 'Yangi e-pochta bilan kirish va ro‘yxatdan o‘tish', 'Kod keladi, profil yaratiladi, chat sahifasi ochiladi', 'Mos'],
      ['2', 'Noto‘g‘ri kodni 5 marta kiritish', 'Kod bekor qilinadi, shundan keyin to‘g‘ri kod ham qabul qilinmaydi', 'Mos'],
      ['3', 'Ikki brauzerda xabar almashish', 'Xabar sahifani yangilamasdan keladi, ✓✓ belgisi paydo bo‘ladi', 'Mos'],
      ['4', 'Suhbatdosh matn yozmoqda', 'Sarlavhada “yozmoqda…” ko‘rinadi, 3 soniyada yo‘qoladi', 'Mos'],
      ['5', 'Rasm va PDF fayl yuborish', 'Fayllar yuklanadi, ulashilgan media panelida ko‘rinadi', 'Mos'],
      ['6', 'Guruh yaratish va a’zo qo‘shish', 'Guruh barcha a’zolarda darhol paydo bo‘ladi, xizmat xabari chiqadi', 'Mos'],
      ['7', 'Oddiy a’zo guruhni boshqarishga urinadi', 'Boshqaruv tugmalari ko‘rinmaydi, API 400 qaytaradi', 'Mos'],
      ['8', 'Guruhdan chiqarilgan a’zo', 'Chat uning ro‘yxatidan real vaqtda yo‘qoladi, kirish huquqi yo‘qoladi', 'Mos'],
      ['9', 'Boshqa qurilma sessiyasini yakunlash', 'Qurilma ro‘yxatdan o‘chadi, uning tokeni yangilanmaydi, undagi maxfiy chatlar yopiladi', 'Mos'],
      ['10', 'Telefon o‘lchamida (375 px) foydalanish', 'Gorizontal aylantirish yo‘q, barcha amallar mavjud', 'Mos'],
      ['11', 'Kirillda yozilgan xabarni “Lotin” sozlamasida ko‘rish va lotincha qidirish', 'Xabar lotinda ko‘rinadi, lotincha so‘rov kirillcha xabarni topadi', 'Mos'],
      ['12', '@tuit.uz va @gmail.com pochtalari bilan ro‘yxatdan o‘tish', 'Birinchisi belgi oladi va domen guruhiga qo‘shiladi, ikkinchisi yo‘q', 'Mos'],
      ['13', 'Taklif havolasini yangilash', 'Eski havola “yaroqsiz”, yangisi ishlaydi', 'Mos'],
      ['14', 'Ikki brauzerda maxfiy chat, rasm va taymer', 'Kalit izlari bir xil, xabar va rasm ochiladi, muddati o‘tgan xabar ikkala tomonda o‘chadi', 'Mos'],
    ],
    [0.8, 5, 6.5, 1.4],
  ),
  p(
    'Sinovlar davomida ikkita kamchilik aniqlandi va tuzatildi. Uzun guruh nomi mobil ekranda sarlavhani ekran chegarasidan chiqarib yuborayotgan edi. Guruh tarixi tozalanganda esa klient xizmat xabarlarini ham ekrandan olib tashlab, server bilan nomuvofiqlik yuzaga kelayotgan edi.',
  ),

  // ───────────────────────────────── 3.10
  h2('3.10. Foydalanish yo‘riqnomasi'),
  h3('Tizimga kirish va ro‘yxatdan o‘tish.'),
  p(
    'Ilova ochilganda kirish sahifasi ko‘rsatiladi (3.18-rasm). Foydalanuvchi elektron pochta manzilini kiritib, “Davom etish” tugmasini bosadi yoki Google hisobi orqali kiradi. Shundan so‘ng pochtaga 6 xonali tasdiqlash kodi yuboriladi va kodni kiritish oynasi ochiladi (3.19-rasm). Manzil tizimda birinchi marta ishlatilayotgan bo‘lsa, kod tasdiqlangach profil yaratish oynasi chiqadi. Unda ism, familiya va noyob username kiritiladi (3.20-rasm). Tashkilot pochtasi (masalan, @tuit.uz) bilan kirilganda foydalanuvchi tashkilotning domen guruhiga avtomatik qo‘shiladi.',
  ),
  ...figure('3-01-login.jpg', '3.18', 'Tizimga kirish sahifasi', 15),
  ...figure('3-02-otp.jpg', '3.19', 'Tasdiqlash kodini kiritish oynasi', 15),
  ...figure('3-03-register.jpg', '3.20', 'Profil yaratish (ro‘yxatdan o‘tish) oynasi', 15),
  h3('Suhbat boshlash va xabar almashish.'),
  ...ps(
    'Asosiy sahifaning chap qismida qidiruv maydoni, hikoyalar paneli va chatlar ro‘yxati joylashgan. Ro‘yxatda har bir chatning oxirgi xabari, vaqti va o‘qilmagan xabarlar soni ko‘rsatiladi. Yangi suhbat boshlash uchun qidiruv maydoniga foydalanuvchining ismi yoki username’i yoziladi va natijalardan kerakli shaxs tanlanadi (3.21-rasm).',
    'Xabar pastdagi maydonga yoziladi va Enter tugmasi yoki yuborish tugmasi bilan jo‘natiladi. Qisqich (📎) tugmasi orqali rasm, video yoki fayl biriktiriladi. Sichqoncha xabar ustiga olib borilganda amallar paneli chiqadi: javob berish, o‘z xabarini tahrirlash va o‘chirish. Javob berish tanlanganda yozish maydoni ustida asl xabar ko‘rsatiladi (3.22-rasm). Suhbat sarlavhasidagi qidiruv tugmasi chat ichida matn bo‘yicha qidirish imkonini beradi. Qidiruv yozuvga bog‘liq emas: lotincha so‘rov kirillda yozilgan xabarni ham topadi. Topilgan natija bosilganda chat o‘sha xabarga aylantiriladi va xabar ajratib ko‘rsatiladi (3.23-rasm).',
  ),
  ...figure('3-10-user-search.jpg', '3.21', 'Foydalanuvchilarni qidirish', 15),
  ...figure('3-06-reply.jpg', '3.22', 'Xabarga javob yozish', 15),
  ...figure('3-09-message-search.jpg', '3.23', 'Chat ichida xabarlarni qidirish', 15),
  h3('Profil, yozuv va qurilmalar.'),
  ...ps(
    'Sidebar’ning yuqori qismidagi profil tugmasi orqali profil oynasi ochiladi. U yerda ism, familiya, username va o‘zi haqidagi ma’lumotni tahrirlash, profil rasmini yuklash, yorug‘ va qorong‘i mavzu o‘rtasida almashish mumkin (3.24-rasm). “Qurilmalar” bo‘limida hisobga ulangan barcha qurilmalar ro‘yxati turadi. Joriy qurilma alohida belgilanadi, boshqa qurilmalarni esa “Chiqarish” tugmasi bilan hisobdan chiqarish mumkin.',
    'Profil oynasidagi “Yozuv” bo‘limida xabarlar qaysi yozuvda ko‘rsatilishi tanlanadi: “Asl holida”, “Lotin” yoki “Кирилл” (3.25-rasm). Tanlov darhol barcha suhbatlarga qo‘llanadi, serverda saqlanadi va foydalanuvchining boshqa qurilmalarida ham amal qiladi. Bo‘lim ostida tanlangan yozuvdagi namuna matn ko‘rsatiladi.',
  ),
  ...figure('3-12-profile-editor.jpg', '3.24', 'Profilni tahrirlash oynasi', 15),
  ...figure('3-21-script-setting.jpg', '3.25', 'Profil oynasidagi “Yozuv” sozlamasi', 15),
  h3('Guruh yaratish va boshqarish.'),
  ...ps(
    'Guruh yaratish uchun chatlar ro‘yxati ustidagi “Yangi guruh” tugmasi bosiladi. Birinchi qadamda qidiruv orqali a’zolar tanlanadi. Tanlangan foydalanuvchilar yuqorida belgilar (chip) ko‘rinishida ko‘rsatiladi (3.26-rasm). “Keyingi” tugmasi bosilgach, guruh nomi, tavsifi va ixtiyoriy rasmi kiritiladi va “Yaratish” tugmasi bosiladi (3.27-rasm). Yangi guruh barcha a’zolarning chatlar ro‘yxatida darhol paydo bo‘ladi.',
    'Guruh sarlavhasi bosilganda ma’lumot paneli ochiladi (3.5-rasm). Guruh egasi va administratorlar bu yerdan guruhni tahrirlashi, yangi a’zo qo‘shishi va a’zo yonidagi menyu orqali uni guruhdan chiqarishi mumkin. “Taklif havolasi” bo‘limida havolani yaratish, nusxalash, yangilash va o‘chirish mumkin (3.10-rasm). Havolani olgan odam uni brauzerda ochib, “Guruhga qo‘shilish” tugmasini bosadi (3.11-rasm). Guruh egasi qo‘shimcha ravishda administrator tayinlashi va guruhni butunlay o‘chirishi mumkin. Istalgan a’zo “Guruhdan chiqish” tugmasi orqali guruhni tark eta oladi.',
  ),
  ...figure('3-14-group-create-members.jpg', '3.26', 'Guruh yaratish: a’zolarni tanlash', 15),
  ...figure('3-15-group-create-details.jpg', '3.27', 'Guruh yaratish: nom va tavsifni kiritish', 15),
  h3('Maxfiy chat.'),
  ...ps(
    'Maxfiy chat boshlash uchun shaxsiy chat sarlavhasidagi “…” menyusidan yoki suhbatdosh ma’lumot panelidan “Maxfiy chat boshlash” tanlanadi. Suhbatdoshga taklif boradi va u chatlar ro‘yxatining “Maxfiy chatlar” bo‘limida qulf belgisi bilan paydo bo‘ladi (3.28-rasm). Suhbatdosh “Qabul qilish” tugmasini bosgach, ikki qurilma kalitlarni almashadi va chat ochiladi. Xavfsizlikni tekshirish uchun sarlavhadagi kalit tugmasi bosiladi va ikkala tomonda ko‘rsatilgan emoji hamda raqamlar yuzma-yuz yoki qo‘ng‘iroq orqali solishtiriladi (3.13-rasm).',
    'Soat tugmasi orqali o‘z-o‘zini o‘chirish taymeri tanlanadi (o‘chiq, 10 soniya, 1 daqiqa, 1 soat, 1 kun, 1 hafta). Qisqich tugmasi orqali shifrlangan fayl yuboriladi. “…” menyusidan tarixni tozalash yoki chatni yopish mumkin. Maxfiy chat faqat u ochilgan qurilmada ishlaydi. Foydalanuvchi shu qurilmada tizimdan chiqsa, chat va uning tarixi o‘chiriladi.',
  ),
  ...figure('3-25-secret-request.jpg', '3.28', 'Maxfiy chat taklifi chatlar ro‘yxatida', 15),

  h2('3-bob bo‘yicha xulosa'),
  ...ps(
    'Uchinchi bobda “Milliy chat” tizimining dasturiy amalga oshirilishi ko‘rib chiqildi. Server qismida 11 ta controller va 73 ta endpointdan iborat REST API, yagona javob formati, FluentValidation va markazlashgan xatolarni qayta ishlash, kursorli sahifalash, to‘rt metodli va o‘n to‘rt hodisali SignalR habi, onlayn holatni kuzatish, media fayllarni xavfsiz qayta ishlash konveyeri, guruh chatlari, taklif havolalari va hikoyalar amalga oshirildi. Klient qismida Angular signals asosidagi holat boshqaruvi, tokenni avtomatik yangilovchi interceptor, dizayn tizimi, qorong‘i mavzu, moslashuvchan interfeys va qat’iy Content Security Policy yaratildi.',
    'Tizimning o‘ziga xos uchta imkoniyati amalga oshirildi. Lotin–kirill transliteratsiyasi server va klientda bitta test to‘plami bo‘yicha tekshiriladigan yagona algoritm asosida ishlaydi va yozuvdan qat’i nazar qidiruvni ta’minlaydi. Tashkilot rejimi e-pochta domeni orqali foydalanuvchini tasdiqlaydi va yopiq domen guruhlarini avtomatik shakllantiradi. Maxfiy chatlar Web Crypto API asosida uchdan-uchgacha shifrlangan bo‘lib, server xabar mazmunini bilmasligi ma’lumotlar bazasi darajasida ko‘rsatib berildi.',
    'Tizim Docker konteyneri ko‘rinishida bulutli serverga joylashtirildi. Uning to‘g‘ri ishlashi serverdagi 307 ta va klientdagi 229 ta unit test, API darajasidagi 43 ta integratsion tekshiruv va qo‘lda o‘tkazilgan sinov ssenariylari bilan tasdiqlandi. Bob yakunida skrinshotlar bilan foydalanish yo‘riqnomasi keltirildi.',
  ),
];
