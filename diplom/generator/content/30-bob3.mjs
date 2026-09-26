import { bullets, code, figure, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter3 = () => [
  h1('III-bob. “Milliy chat” dasturini ishlab chiqish'),
  p(
    'Ushbu bobda ikkinchi bobda loyihalangan tizimning dasturiy amalga oshirilishi yoritiladi. Server qismi 193 ta C# faylidan (migratsiyalarsiz 6,7 mingga yaqin qator) iborat. Klient qismi 27 ta Angular komponenti va 9 mingdan ortiq TypeScript, HTML va SCSS qatoridan tashkil topgan. Ishlab chiqish jarayonida server repozitoriysida 65 ta, klient repozitoriysida 24 ta commit qilindi. Quyida keltirilgan kod parchalari loyihaning haqiqiy manba kodidan olingan. Ayrim joylarda ular qisqartirilgan va bunday joylar “…” belgisi bilan ko‘rsatilgan.',
  ),

  // ───────────────────────────────── 3.1
  h2('3.1. Server qismini ishlab chiqish'),
  h3('Loyiha tuzilmasi va ilovani ishga tushirish.'),
  ...ps(
    'Server yechimi (NationalChat.sln) ikkinchi bobda tavsiflangan to‘rtta loyihadan (Domain, Application, Infrastructure, API) va unit testlar loyihasidan (tests/NationalChat.Tests) iborat. Ilovaning kirish nuqtasi — API loyihasidagi Program.cs fayli (3.1-listing). U faqat ilovani yig‘ish va so‘rovlarni qayta ishlash konveyerini (middleware pipeline) sozlash bilan shug‘ullanadi. Barcha servislarni ro‘yxatdan o‘tkazish esa ServiceCollectionExtensions sinfidagi mavzuli metodlarga ajratilgan: API transporti, autentifikatsiya, ma’lumotlar bazasi, repozitoriylar, Application servislari, xavfsizlik va elektron pochta.',
  ),
  ...code(
    `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddServices(builder.Configuration, builder.Environment);

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors("Client");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");

app.Run();`,
    '3.1-listing. Program.cs — so‘rovlarni qayta ishlash konveyeri',
  ),
  p(
    'Konveyerdagi tartib muhim. Xatolarni ushlovchi middleware eng birinchi turadi, shuning uchun u keyingi bosqichlarda yuz bergan har qanday istisnoni ushlay oladi. Autentifikatsiya avtorizatsiyadan oldin bajariladi. REST controllerlar va SignalR habi eng oxirida ulanadi.',
  ),
  h3('REST API.'),
  p(
    'Server 9 ta controller orqali jami 56 ta HTTP endpointni taqdim etadi (3.1-jadval). Endpointlar resurslarga yo‘naltirilgan (RESTful) tamoyil asosida nomlangan: resurslar ko‘plik shaklida (chats, messages, groups), amal esa HTTP metodi (GET, POST, PUT, DELETE) orqali ifodalanadi. Masalan, “POST /api/chats/{chatId}/messages” chatga xabar qo‘shadi, “PUT /api/groups/{chatId}/members/{userId}/role” esa guruh a’zosining rolini o‘zgartiradi.',
  ),
  ...table(
    '3.1',
    'Server API controllerlari va endpointlari',
    ['Controller', 'Asosiy yo‘l', 'Soni', 'Vazifasi'],
    [
      ['AuthController', '/api/auth', '11', 'Kod so‘rash va tasdiqlash, Google, ro‘yxatdan o‘tish, tokenni yangilash, chiqish, sessiyalar'],
      ['ProfileController', '/api/users/me', '5', 'Profilni olish va tahrirlash, profil rasmi'],
      ['UserController', '/api/users', '1', 'Foydalanuvchilarni qidirish'],
      ['ContactController', '/api/contacts', '3', 'Kontaktlar ro‘yxati, qo‘shish, o‘chirish'],
      ['ChatController', '/api/chats', '3', 'Chatlar ro‘yxati, shaxsiy chat, chatni o‘chirish'],
      ['GroupController', '/api/groups', '8', 'Guruh yaratish, tahrirlash, rasm, a’zolar va rollar, chiqish'],
      ['MessageController', '/api/chats/{id}/messages', '7', 'Xabarlar tarixi, yuborish, tahrirlash, o‘chirish, qidiruv, kontekst'],
      ['MessageAttachmentController', '/api/chats/…, /api/media/…', '10', 'Rasm, video, fayl yuklash va berish, ulashilgan media'],
      ['StoryController', '/api/stories', '8', 'Hikoyalar lentasi, yaratish, media, ko‘rishlar'],
      ['Jami', '', '56', ''],
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
    'Kiruvchi ma’lumotlar FluentValidation kutubxonasi yordamida tekshiriladi. Application qatlamida har bir so‘rov DTOsi uchun alohida validator sinfi yozilgan (masalan, CreateGroupRequestValidator, SendMessageRequestValidator). Validator ikki joyda ishlaydi: ASP.NET Core’ning avtomatik validatsiyasi so‘rov controllerga yetib kelishidan oldin, servis esa biznes-qoidalarni qo‘llashdan oldin tekshiradi. Kutilmagan istisnolar ExceptionHandlingMiddleware tomonidan ushlanadi. U xatoni so‘rov metodi, yo‘li va TraceId bilan logga yozadi va mijozga 500 status kodli, ichki tafsilotlarsiz standart javob qaytaradi.',
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
    'Real vaqt aloqasi ChatHub SignalR habi va IChatRealtimeNotifier interfeysining SignalR orqali ishlaydigan amalga oshirilishi yordamida quriladi. Hab mijoz chaqira oladigan to‘rtta metodni taqdim etadi. Server esa mijozlarga o‘nta turdagi hodisa yuboradi (3.2-jadval).',
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
    'Klient tomonida ChatRealtimeService servisi SignalR ulanishini boshqaradi. Ulanish avtomatik qayta ulanish siyosati (0, 2, 5 va 10 soniyadan keyin urinish) bilan yaratiladi. Qayta ulanilgach, ochiq turgan chatga JoinChat avtomatik qayta chaqiriladi. Kiruvchi hodisalar RxJS Subject’lari orqali ChatApiService’ga uzatiladi va u ilova holatini (chatlar ro‘yxati, xabarlar, “yozmoqda” holati) yangilaydi. 3.2-rasmda suhbatdosh javob yozayotgan paytdagi shaxsiy chat ko‘rsatilgan: sarlavhada “yozmoqda…” yozuvi, jo‘natilgan xabarlar yonida esa o‘qilganlik belgisi ko‘rinib turibdi.',
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
    'Xizmat xabarlarining matni klient tomonida xabar turi (ServiceAction) va unda saqlangan ism yoki nom asosida yig‘iladi. Masalan, “Jasur Karimov guruhga qo‘shdi: Aziz Nazarov”, “Sardor Sohinazarov guruh rasmini yangiladi”. Bunday xabarlar chat markazida kulrang yozuv ko‘rinishida chiqadi va ularni tahrirlab, o‘chirib yoki ularga javob berib bo‘lmaydi. Guruhda boshqa a’zolarning xabarlari ustida jo‘natuvchining ismi va avatari ko‘rsatiladi. Sarlavhada a’zolar va onlayn a’zolar soni, kimdir yozayotgan bo‘lsa esa uning ismi chiqadi. Ma’lumot panelida guruh rasmi, tavsifi va a’zolar ro‘yxati rollari bilan ko‘rsatiladi. Guruh egasi va administratorlarga esa a’zolarni boshqarish menyusi ochiladi (3.5-rasm).',
  ),
  ...figure('3-13-group-chat.jpg', '3.5', 'Guruh chati va guruh haqidagi ma’lumot paneli', 15.5),
  ...ps(
    'Hikoyalar (stories) StoryService servisida amalga oshirilgan. Hikoya rasm yoki video (MP4, WebM, MOV, 50 MB gacha) va qisqa izohdan iborat. U joylangan paytdan boshlab 24 soat davomida ko‘rinadi (ExpiresAt = CreatedAt + 24 soat). Hikoyalar lentasi foydalanuvchining o‘zi va u bilan chati bor foydalanuvchilarning amaldagi hikoyalarini qaytaradi. Chatlar ro‘yxati ustidagi hikoyalar panelida ko‘rilmagan hikoyasi bor foydalanuvchilar rangli halqa bilan ajratiladi. Hikoya ochilganda story_views jadvaliga yozuv qo‘shiladi. Hikoya muallifi esa uni kim va qachon ko‘rganini bilishi mumkin. Hikoya ko‘ruvchi oynasi 3.6-rasmda keltirilgan: yuqorida progress chiziqlari, muallif va vaqt, pastda esa izoh joylashgan.',
  ),
  ...figure('3-11-story-viewer.jpg', '3.6', 'Hikoyani ko‘rish oynasi', 15.5),

  // ───────────────────────────────── 3.5
  h2('3.5. Klient qismini ishlab chiqish'),
  ...ps(
    'Klient ilovasi Angular 22 ning mustaqil (standalone) komponentlaridan tashkil topgan. Ilova konfiguratsiyasida (app.config.ts) marshrutizator, SSR sahifasini brauzerda “jonlantirish” (hydration) va HTTP klient ulanadi. HTTP klientga authInterceptor ham qo‘shiladi. Ikkita marshrut mavjud: /auth (kirish va ro‘yxatdan o‘tish) va /chat (asosiy messenjer sahifasi). /chat sahifasi authGuard bilan himoyalangan. Har ikkala sahifa ham kerak bo‘lganda yuklanadi (lazy loading), bu esa boshlang‘ich yuklanish hajmini kamaytiradi.',
    'Ilova holati Angular signals mexanizmi orqali boshqariladi. ChatApiService’da chatlar ro‘yxati, ochiq chat xabarlari, joriy guruh ma’lumotlari va “yozmoqda” holati signal ko‘rinishida saqlanadi. Komponentlar ulardan computed() yordamida hosila qiymatlar oladi, masalan sarlavhadagi “6 a’zo, 2 onlayn” yoki “Jasur yozmoqda…” matni. Signal o‘zgarganda Angular faqat unga bog‘liq qismlarni qayta chizadi. Holat bitta servisda to‘plangani uchun REST javoblari ham, SignalR hodisalari ham bir xil yo‘l bilan qo‘llanadi.',
    'authInterceptor har bir API so‘roviga access tokenni qo‘shadi. Server 401 status kodini qaytarsa, interceptor tokenni avtomatik yangilab, so‘rovni qayta yuboradi (3.5-listing). Bir vaqtda bir nechta so‘rov muvaffaqiyatsiz bo‘lsa ham, AuthService ular uchun bitta umumiy refresh so‘rovini ishlatadi. Yangilash imkonsiz bo‘lsa, foydalanuvchi kirish sahifasiga yo‘naltiriladi.',
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
    '3.5-listing. authInterceptor: muddati o‘tgan tokenni avtomatik yangilash (TypeScript)',
  ),
  ...ps(
    'Interfeys loyiha uchun ishlab chiqilgan dizayn tizimiga asoslangan. Umumiy UI komponentlar (tugma, ikonkali tugma, matn maydoni, checkbox, banner, tasdiqlash oynasi, ikonkalar to‘plami) shared/ui papkasida joylashgan. Ranglar, soyalar va radiuslar CSS o‘zgaruvchilari (design tokens) orqali berilgan. Qorong‘i mavzu shu o‘zgaruvchilarning muqobil qiymatlari yordamida amalga oshirilgan (3.7-rasm). Foydalanuvchi tanlagan mavzu brauzer xotirasida saqlanadi.',
    'Interfeys moslashuvchan (responsive) qilib yaratilgan. Katta ekranda uch ustunli joylashuv (chatlar ro‘yxati, suhbat, ma’lumot paneli) ishlatiladi. Planshetda chatlar ro‘yxati yig‘iladi. Telefonda esa bir vaqtda bitta ekran ko‘rsatiladi: chatlar ro‘yxati yoki suhbat (3.8-rasm).',
  ),
  ...figure('3-16-dark-theme.jpg', '3.7', 'Qorong‘i mavzudagi interfeys', 15.5),
  ...figure('3-17-mobile.jpg', '3.8', 'Mobil qurilmadagi ko‘rinish: chatlar ro‘yxati va guruh chati', 12),

  // ───────────────────────────────── 3.6
  h2('3.6. Joylashtirish va testlash'),
  h3('Joylashtirish.'),
  p(
    'Server ilovasi Docker konteyneri ko‘rinishida joylashtiriladi (3.6-listing). Birinchi bosqichda .NET SDK obrazida bog‘liqliklar tiklanadi va loyiha Release rejimida nashr qilinadi. Loyiha fayllari manba kodidan oldin nusxalanadi, shuning uchun Docker kodi o‘zgarganda ham bog‘liqliklar qatlamini keshdan qayta ishlatadi. Ikkinchi bosqichda faqat nashr natijasi kichik hajmli ASP.NET runtime obraziga ko‘chiriladi. Shu tufayli yakuniy obrazda kompilyator va manba kodi bo‘lmaydi.',
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
    '3.6-listing. Server ilovasining Dockerfile fayli',
  ),
  p(
    'Konteyner Render bulut platformasida “Web Service” sifatida ishga tushiriladi. Platforma GitHub repozitoriysidagi o‘zgarishlardan so‘ng obrazni avtomatik qayta yig‘adi. Maxfiy sozlamalar (ma’lumotlar bazasiga ulanish satri, JWT va HMAC kalitlari, SMTP va Google sozlamalari) kodda saqlanmaydi. Ular muhit o‘zgaruvchilari orqali beriladi, appsettings fayllari esa Git’dan chiqarib tashlangan. Klient ilovasining ishlab chiqarish konfiguratsiyasi (environment.prod.ts) bulutdagi API manziliga yo‘naltirilgan.',
  ),
  h3('Unit testlar.'),
  ...ps(
    'Biznes-mantiqning to‘g‘riligini tekshirish uchun xUnit freymvorkida NationalChat.Tests test loyihasi yaratildi. Tashqi bog‘liqliklar (real vaqt xabarnomasi, fayl servisi, repozitoriylar) NSubstitute kutubxonasi yordamida soxtalashtirildi (mock). Guruh servisi uchun esa IGroupRepository interfeysining xotirada ishlaydigan soxta amalga oshirilishi yozildi. Kursorli sahifalash EF Core InMemory provayderida sinaldi. Vaqtga bog‘liq mantiq qat’iy vaqt qaytaradigan TimeProvider yordamida tekshirildi. Testlarni bajarish natijasi 3.9-rasmda, ularning tarkibi esa 3.3-jadvalda keltirilgan.',
  ),
  ...figure('3-19-unit-tests.png', '3.9', 'Unit testlarni bajarish natijasi (dotnet test)', 10.5),
  ...table(
    '3.3',
    'Unit testlar tarkibi va natijalari',
    ['Test sinfi', 'Soni', 'Tekshiriladigan holatlar', 'Natija'],
    [
      ['GroupServiceTests', '15', 'Guruh yaratish va xizmat xabari; noma’lum foydalanuvchini rad etish; a’zo va admin ruxsatlari; admin egani chiqara olmasligi; rolni faqat ega o‘zgartirishi; egalikning eng eski admin’ga o‘tishi; oxirgi a’zo chiqqanda guruhning o‘chishi; a’zolar limiti', 'O‘tdi'],
      ['ChatPermissionTests', '4', 'Guruhni faqat ega o‘chira olishi, shaxsiy chatni ishtirokchi o‘chira olishi, tarixni oddiy a’zo tozalay olmasligi', 'O‘tdi'],
      ['Pbkdf2OneTimeCodeHasherTests', '4', 'To‘g‘ri va noto‘g‘ri kod, har safar yangi tuz, buzilgan xesh', 'O‘tdi'],
      ['HmacRefreshTokenHasherTests', '3', 'Determinizm, kalitga bog‘liqlik, qisqa kalitni rad etish', 'O‘tdi'],
      ['CursorPaginationTests', '3', 'Birinchi sahifa, beforeId bo‘yicha oldingi yozuvlar, oxirgi sahifa', 'O‘tdi'],
      ['ValidatorTests', '10', 'Sahifalash chegaralari, guruh nomi uzunligi, a’zolar ro‘yxati, ruxsat etilgan rollar', 'O‘tdi'],
      ['Jami', '39', '', '39 / 39'],
    ],
    [4, 1.2, 7.5, 1.6],
  ),
  p(
    'Barcha 39 ta test muvaffaqiyatli o‘tdi, umumiy bajarilish vaqti taxminan 1,3 soniyani tashkil etdi. Eng uzoq davom etgan testlar PBKDF2 xeshlash testlari bo‘ldi (har biri ~230 ms). Bu 210 000 iteratsiyali xeshlash kodni tanlab topishni qanchalik qimmatlashtirishini amalda ko‘rsatadi.',
  ),
  h3('Integratsion va qo‘lda sinovlar.'),
  p(
    'Unit testlardan tashqari, tizim lokal muhitda PostgreSQL ma’lumotlar bazasi bilan birgalikda sinovdan o‘tkazildi. Guruh chatlari funksiyasi uchun API darajasida 43 ta tekshiruvdan iborat avtomatik ssenariy yozildi. U bir nechta foydalanuvchini ro‘yxatdan o‘tkazib, guruh yaratish, ruxsatlar, xizmat xabarlari, tarixni tozalash, egalikni o‘tkazish va guruhni o‘chirish holatlarini HTTP so‘rovlari orqali tekshiradi. Barcha 43 ta tekshiruv muvaffaqiyatli o‘tdi. Foydalanuvchi interfeysi brauzerda bir nechta akkaunt bilan qo‘lda sinaldi. Asosiy ssenariylar 3.4-jadvalda keltirilgan.',
  ),
  ...table(
    '3.4',
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
      ['9', 'Boshqa qurilma sessiyasini yakunlash', 'Qurilma ro‘yxatdan o‘chadi, uning tokeni yangilanmaydi', 'Mos'],
      ['10', 'Telefon o‘lchamida (375 px) foydalanish', 'Gorizontal aylantirish yo‘q, barcha amallar mavjud', 'Mos'],
    ],
    [0.8, 5, 6.5, 1.4],
  ),
  p(
    'Sinovlar davomida ikkita kamchilik aniqlandi va tuzatildi. Uzun guruh nomi mobil ekranda sarlavhani ekran chegarasidan chiqarib yuborayotgan edi. Guruh tarixi tozalanganda esa klient xizmat xabarlarini ham ekrandan olib tashlab, server bilan nomuvofiqlik yuzaga kelayotgan edi.',
  ),

  // ───────────────────────────────── 3.7
  h2('3.7. Foydalanish yo‘riqnomasi'),
  h3('Tizimga kirish va ro‘yxatdan o‘tish.'),
  p(
    'Ilova ochilganda kirish sahifasi ko‘rsatiladi (3.10-rasm). Foydalanuvchi elektron pochta manzilini kiritib, “Davom etish” tugmasini bosadi yoki Google hisobi orqali kiradi. Shundan so‘ng pochtaga 6 xonali tasdiqlash kodi yuboriladi va kodni kiritish oynasi ochiladi (3.11-rasm). Manzil tizimda birinchi marta ishlatilayotgan bo‘lsa, kod tasdiqlangach profil yaratish oynasi chiqadi. Unda ism, familiya va noyob username kiritiladi (3.12-rasm).',
  ),
  ...figure('3-01-login.jpg', '3.10', 'Tizimga kirish sahifasi', 15),
  ...figure('3-02-otp.jpg', '3.11', 'Tasdiqlash kodini kiritish oynasi', 15),
  ...figure('3-03-register.jpg', '3.12', 'Profil yaratish (ro‘yxatdan o‘tish) oynasi', 15),
  h3('Suhbat boshlash va xabar almashish.'),
  ...ps(
    'Asosiy sahifaning chap qismida qidiruv maydoni, hikoyalar paneli va chatlar ro‘yxati joylashgan. Ro‘yxatda har bir chatning oxirgi xabari, vaqti va o‘qilmagan xabarlar soni ko‘rsatiladi. Yangi suhbat boshlash uchun qidiruv maydoniga foydalanuvchining ismi yoki username’i yoziladi va natijalardan kerakli shaxs tanlanadi (3.13-rasm).',
    'Xabar pastdagi maydonga yoziladi va Enter tugmasi yoki yuborish tugmasi bilan jo‘natiladi. Qisqich (📎) tugmasi orqali rasm, video yoki fayl biriktiriladi. Sichqoncha xabar ustiga olib borilganda amallar paneli chiqadi: javob berish, o‘z xabarini tahrirlash va o‘chirish. Javob berish tanlanganda yozish maydoni ustida asl xabar ko‘rsatiladi (3.14-rasm). Suhbat sarlavhasidagi qidiruv tugmasi chat ichida matn bo‘yicha qidirish imkonini beradi. Topilgan natija bosilganda chat o‘sha xabarga aylantiriladi va xabar ajratib ko‘rsatiladi (3.15-rasm).',
  ),
  ...figure('3-10-user-search.jpg', '3.13', 'Foydalanuvchilarni qidirish', 15),
  ...figure('3-06-reply.jpg', '3.14', 'Xabarga javob yozish', 15),
  ...figure('3-09-message-search.jpg', '3.15', 'Chat ichida xabarlarni qidirish', 15),
  h3('Profil va qurilmalar.'),
  p(
    'Sidebar’ning yuqori qismidagi profil tugmasi orqali profil oynasi ochiladi. U yerda ism, familiya, username va o‘zi haqidagi ma’lumotni tahrirlash, profil rasmini yuklash, yorug‘ va qorong‘i mavzu o‘rtasida almashish mumkin. “Qurilmalar” bo‘limida hisobga ulangan barcha qurilmalar ro‘yxati turadi. Joriy qurilma alohida belgilanadi, boshqa qurilmalarni esa “Chiqarish” tugmasi bilan hisobdan chiqarish mumkin (3.16-rasm).',
  ),
  ...figure('3-12-profile-editor.jpg', '3.16', 'Profilni tahrirlash va qurilmalarni boshqarish', 15),
  h3('Guruh yaratish va boshqarish.'),
  ...ps(
    'Guruh yaratish uchun chatlar ro‘yxati ustidagi “Yangi guruh” tugmasi bosiladi. Birinchi qadamda qidiruv orqali a’zolar tanlanadi. Tanlangan foydalanuvchilar yuqorida belgilar (chip) ko‘rinishida ko‘rsatiladi (3.17-rasm). “Keyingi” tugmasi bosilgach, guruh nomi, tavsifi va ixtiyoriy rasmi kiritiladi va “Yaratish” tugmasi bosiladi (3.18-rasm). Yangi guruh barcha a’zolarning chatlar ro‘yxatida darhol paydo bo‘ladi.',
    'Guruh sarlavhasi bosilganda ma’lumot paneli ochiladi (3.5-rasm). Guruh egasi va administratorlar bu yerdan guruhni tahrirlashi, yangi a’zo qo‘shishi va a’zo yonidagi menyu orqali uni guruhdan chiqarishi mumkin. Guruh egasi qo‘shimcha ravishda administrator tayinlashi va guruhni butunlay o‘chirishi mumkin. Istalgan a’zo “Guruhdan chiqish” tugmasi orqali guruhni tark eta oladi.',
  ),
  ...figure('3-14-group-create-members.jpg', '3.17', 'Guruh yaratish: a’zolarni tanlash', 15),
  ...figure('3-15-group-create-details.jpg', '3.18', 'Guruh yaratish: nom va tavsifni kiritish', 15),

  h2('3-bob bo‘yicha xulosa'),
  ...ps(
    'Uchinchi bobda “Milliy chat” tizimining dasturiy amalga oshirilishi ko‘rib chiqildi. Server qismida 56 ta endpointdan iborat REST API, yagona javob formati, FluentValidation va markazlashgan xatolarni qayta ishlash, kursorli sahifalash, to‘rt metodli va o‘n hodisali SignalR habi, onlayn holatni kuzatish, media fayllarni xavfsiz qayta ishlash konveyeri, guruh chatlari va hikoyalar amalga oshirildi. Klient qismida Angular signals asosidagi holat boshqaruvi, tokenni avtomatik yangilovchi interceptor, dizayn tizimi, qorong‘i mavzu va moslashuvchan interfeys yaratildi.',
    'Tizim Docker konteyneri ko‘rinishida bulutli serverga joylashtirildi. Uning to‘g‘ri ishlashi 39 ta unit test, API darajasidagi 43 ta integratsion tekshiruv va qo‘lda o‘tkazilgan sinov ssenariylari bilan tasdiqlandi. Bob yakunida skrinshotlar bilan foydalanish yo‘riqnomasi keltirildi.',
  ),
];
