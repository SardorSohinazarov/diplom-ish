# "Milliy chat" — o'ziga xos imkoniyatlarni qo'shish rejasi

> Bu reja alohida suhbatda bajarilishi uchun yozilgan. U o'zi yetarli: kontekst, fayl yo'llari, bosqichlar va qabul mezonlari shu yerda.
> Bajaruvchi har bir bosqichdan oldin tegishli fayllarni o'qib, reja hali ham kodga mos ekanini tekshirsin.

## 0. Kontekst

**Maqsad.** Messenjerga Telegram va boshqa messenjerlarda yo'q, "milliy" ekanini oqlaydigan imkoniyatlar qo'shish va ularni diplom hamda himoya taqdimotida ko'rsatish.

| № | Imkoniyat | Holati |
|---|---|---|
| 1 | **Lotin ↔ Kirill avtomatik o'girish** (ko'rsatish va qidiruv) | Amalga oshiriladi |
| 2 | **Tashkilot rejimi** (e-pochta domeni orqali tasdiqlash, faqat tashkilot a'zolari uchun guruhlar) | Amalga oshiriladi |
| 3 | **Maxfiy chatlar — uchdan-uchgacha (E2E) shifrlash** | Amalga oshiriladi (1:1, faqat matn) |
| 4 | **OneID orqali shaxsni tasdiqlash** | Faqat diplom va taqdimotda "istiqbol" sifatida. Kod yozilmaydi |

**Repozitoriylar** (`C:\Users\Sardor\Desktop\diplom ish\`):
- `NationalChat/` — server: .NET 8, ASP.NET Core, EF Core 8 + PostgreSQL, SignalR. Testlar: `tests/NationalChat.Tests` (xUnit + NSubstitute).
- `NationalChatClient/` — klient: Angular 22 (standalone, signals), Vitest.
- `diplom/generator/` — diplom (`node build.mjs`) va taqdimot (`node slides.mjs`) generatori.

**Majburiy qoidalar.** `NationalChat/AGENTS.md` to'liq o'qilsin va unga amal qilinsin. Asosiylari:
- Clean Architecture: `Domain` hech narsaga bog'liq emas, `Application` faqat `Domain`ga, `Infrastructure` → `Application` + `Domain`, `API` — kompozitsiya ildizi.
- Barcha vaqt UTC, `TimeProvider.GetUtcNow().UtcDateTime`. `DateTime.Now` ishlatilmaydi.
- API'ga kiradigan har bir DTO uchun `Application` qatlamida FluentValidation validatori bo'lsin. Service ham buyruqni o'zi validatsiya qiladi.
- Mapping `Features/<X>/Mappers` dagi statik `Mapper` klasslarida, yangi entity'lar `Features/<X>/Factories` dagi `Factory` klasslarida yaratiladi.
- Repozitoriylar `I<X>Repository` (Application) va `Ef<X>Repository` (`Infrastructure/Persistence/Repositories`) nomlanadi. Mavjud kodda nomlar `XRepository` ko'rinishida bo'lsa, mavjud uslubga moslashilsin.
- DI registratsiyalari `Program.cs`da emas, `Extensions` papkasidagi kengaytma metodlarida.
- Primary constructor'lar ishlatiladi.
- Xabarlar va chatlar uchun faqat kursorli sahifalash.

**Branchlar.** Server hozir `feature/unit-tests`da, klient `feature/group-chats`da. Bu branchlar `master`/`main`ga hali birlashtirilmagan (guruh chatlari va testlar ularda).
- **0-qadam:** foydalanuvchidan so'rab, bu branchlar PR orqali `master`/`main`ga birlashtirilsin. Agar foydalanuvchi rozi bo'lmasa, yangi branchlar shu branchlardan ochilsin.
- Har bir imkoniyat alohida branchda qilinadi: `feature/uz-transliteration`, `feature/organizations`, `feature/secret-chats`.

**Migratsiyalar.** Buyruq:
```bash
dotnet ef migrations add <Nom> -p src/Infrastructure -s src/API
```
Nomlash uslubi mavjud migratsiyadagidek bo'lsin: `Add-Story-Type-CreateAt-Columns`.

**Har bosqich oxirida:** `dotnet build`, `dotnet test`, `ng build`, `ng test` yashil bo'lsin. Keyin commit qilinadi. Foydalanuvchi so'ramaguncha push qilinmaydi.

---

## 1-imkoniyat. Lotin ↔ Kirill avtomatik o'girish (taxminan 3–4 kun)

### G'oya
Xabar bazada **asl holida** saqlanadi. Har bir foydalanuvchi profilida "Xabarlarni ko'rsatish: Asl holida / Lotin / Кирилл" sozlamasini tanlaydi. O'girish klientda, ko'rsatish paytida bajariladi. Qidiruv yozuvdan qat'i nazar ishlaydi: "salom" deb qidirilganda "салом" ham topiladi.

### 1.1. Transliteratsiya algoritmi (server va klientda bir xil)
Bu toza funksiya, tashqi bog'liqligi yo'q. Asos — 1995-yilgi o'zbek lotin alifbosi.

**Kirill → Lotin** (deyarli bir ma'noli):
- Harflar:
  - `а→a, б→b, в→v, г→g, ғ→g‘, д→d, ё→yo, ж→j, з→z, и→i, й→y`
  - `к→k, қ→q, л→l, м→m, н→n, о→o, п→p, р→r, с→s, т→t, у→u, ў→o‘`
  - `ф→f, х→x, ҳ→h, ч→ch, ш→sh, ъ→’, ь→(tushib qoladi), э→e, ю→yu, я→ya`
- `е`: so'z boshida, unli harfdan keyin yoki `ъ`/`ь`dan keyin → `ye`, qolgan holatlarda → `e`.
- `ц`: unli harfdan keyin → `ts`, qolgan holatlarda → `s` (цирк → sirk, лицей → litsey).
- Registr saqlanadi: `Ш` so'z boshida → `Sh`, butun so'z katta harfda bo'lsa → `SH`.

**Lotin → Kirill** (ko'p ma'noli holatlar bor):
- Avval digraflar:
  - `sh→ш, ch→ч, o‘→ў, g‘→ғ`
  - `yo→ё, yu→ю, ya→я, ye→е`
  - `ts→ц` — faqat istisnolar lug'atidagi so'zlarda, qolgan holatlarda `тс`.
- Keyin yakka harflar: `q→қ, x→х, h→ҳ` va boshqalar.
- `e`: so'z boshida → `э`, qolgan holatlarda → `е`.
- Tutuq belgisi (`’`) → `ъ`.
- Tutuq belgisining turli yozilishlari (`'`, `‘`, `’`, `` ` ``, `ʻ`, `ʼ`):
  - `o` yoki `g`dan keyin kelsa, harfning bir qismi (`o‘`, `g‘`) deb olinadi;
  - boshqa joyda — tutuq belgisi.
- **O'girilmaydigan qismlar:** URL, e-pochta manzillari, `@username`, `#teg` va `` `kod` `` bloklari o'zgarishsiz qoldiriladi.
- **Ma'lum cheklov:** inglizcha so'zlar ham kirillga o'giriladi. Shuning uchun har bir xabarda "Asl matnni ko'rish" imkoni bo'ladi. Bu diplomda cheklov sifatida yoziladi.

**Qidiruv uchun normallashtirish** (`NormalizeForSearch`):
1. Matn Kirill → Lotin o'giriladi.
2. Hammasi kichik harfga o'tkaziladi.
3. Tutuq belgisining barcha variantlari bitta `'` belgisiga keltiriladi.
4. Ketma-ket probellar bittaga qisqartiriladi.

**Umumiy test ma'lumotlari.** Bitta JSON fayl bo'lsin, u ikkala repoda **bir xil nusxada** saqlanadi:
- Fayl: `transliteration-cases.json`, ichida `{ "cyrillic": "...", "latin": "..." }` juftliklari.
- Kamida 60 ta holat bo'lsin, jumladan: `е`/`ye`, `ц`, `ў`/`ғ`, tutuq belgisi, katta harflar, aralash matn, URL, `@username`, emoji.
- Server ham, klient ham shu fayl bo'yicha test qilinadi. Shunda ikkala tomondagi algoritm bir-biridan farq qilib qolmaydi.

### 1.2. Server
| Qatlam | Fayl | O'zgarish |
|---|---|---|
| Domain | `Domain/Text/UzbekTransliterator.cs` (yangi) | Statik metodlar: `ToLatin`, `ToCyrillic`, `NormalizeForSearch` |
| Domain | `Domain/Entities/Enums.cs` | `enum ScriptPreference { Original = 1, Latin = 2, Cyrillic = 3 }` |
| Domain | `IdentityModels.cs` → `User` | `ScriptPreference ScriptPreference` (standart qiymat `Original`) |
| Domain | `MessagingModels.cs` → `Message` | `string? SearchText` |
| Infrastructure | `MessageConfiguration`, `UserConfiguration` | `SearchText` → `TEXT`. `ScriptPreference` → `HasCommentFromEnum()`. Ixtiyoriy: `pg_trgm` GIN indeksi |
| Application | `Messages/Factories/MessageFactory.cs` | Xabar yaratilganda `SearchText = NormalizeForSearch(TextContent)` |
| Application | `Messages/Services/MessageService.cs` | Xabar tahrirlanganda `SearchText` ham yangilanadi |
| Infrastructure | `MessageRepository.SearchAsync` | `ILIKE` so'rovi `SearchText` ustida, qidiruv so'zi ham `NormalizeForSearch` qilinadi |
| Infrastructure | `SearchTextBackfill` (hosted service, yangi) | Ishga tushganda `SearchText IS NULL AND TextContent IS NOT NULL` qatorlarni 500 tadan to'ldiradi. Qayta ishga tushirilsa ham xavfsiz. Registratsiya `Extensions` orqali |
| Application | `Profiles/...` | `ProfileDto`ga `ScriptPreference` qo'shiladi. Yangi `UpdateScriptPreferenceRequest` va uning validatori (enum qiymati tekshiriladi) |
| API | `ProfileController` | `PUT /api/profile/script-preference` |
| Migratsiya | `Add-Script-Preference-And-Message-Search-Text` | — |

**Ixtiyoriy.** Foydalanuvchi qidiruvi ham yozuvdan qat'i nazar ishlashi uchun `User.SearchName` ustuni qo'shiladi (`NormalizeForSearch(FirstName + " " + LastName + " " + Username)`) va `UserDiscoveryRepository` shu ustun bo'yicha qidiradi.

**Testlar** (`tests/NationalChat.Tests/Text/`):
- `UzbekTransliteratorTests`: JSON'dagi barcha holatlar, ikkala yo'nalishda.
- `NormalizeForSearch`: tutuq belgilari, registr va aralash yozuv.
- Yangi so'rov uchun validator testi.

### 1.3. Klient
| Fayl | O'zgarish |
|---|---|
| `src/app/shared/text/uzbek-transliterator.ts` (yangi) | Server algoritmining TypeScript nusxasi va `.spec.ts` (o'sha JSON fayl bo'yicha) |
| `src/app/core/script-preference.service.ts` (yangi) | `signal<ScriptPreference>`. Qiymat profildan yuklanadi, o'zgartirilganda serverga yoziladi |
| `src/app/shared/text/uz-script.pipe.ts` (yangi) | `{{ text \| uzScript }}` — tanlangan yozuvga o'giradi |
| `features/chat/message-bubble/message-bubble.component.html` | Xabar matni va javob (reply) matniga `uzScript` qo'llanadi. Xabar menyusiga "Asl matnni ko'rish / O'girilganini ko'rish" qo'shiladi (holat komponentning lokal signalida) |
| `features/chat/chat-list-item/...` | Oxirgi xabar ko'rinishiga `uzScript` qo'llanadi |
| `features/chat/profile-editor/...` | "Yozuv" bo'limi: `Asl holida / Lotin / Кирилл` segmentli tanlov |
| `features/chat/data-access/chat.models.ts`, `core/api.models.ts` | `scriptPreference` maydoni |

### 1.4. Qabul mezonlari
- [ ] A foydalanuvchi "Салом, қалайсиз?" deb yozadi. "Lotin" sozlamasidagi B foydalanuvchi uni real vaqtda "Salom, qalaysiz?" ko'rinishida ko'radi.
- [ ] B "Asl matnni ko'rish"ni bossa, xabar kirillda ko'rinadi.
- [ ] Chat ichida "qalay" deb qidirilsa, kirillda yozilgan xabar topiladi. "o'zbek", "o‘zbek" va "oʻzbek" so'rovlari bir xil natija beradi.
- [ ] Sozlama boshqa qurilmada ham saqlanib qoladi (u serverda turadi).
- [ ] URL va `@username` o'girilmaydi.
- [ ] Server va klient testlari bitta JSON bo'yicha o'tadi.

---

## 2-imkoniyat. Tashkilot rejimi (taxminan 5–7 kun)

### G'oya
Tashkilotning e-pochta domeni ro'yxatdan o'tkaziladi, masalan `tuit.uz` → "TATU".
- Shu domendagi pochta bilan kirgan foydalanuvchi **tasdiqlangan a'zo** bo'ladi va ismi yonida "TATU ✓" belgisi ko'rinadi.
- Tashkilot guruhi ikki xil bo'lishi mumkin:
  - **faqat a'zolar uchun:** unga faqat shu tashkilotning tasdiqlangan a'zolarini qo'shish mumkin;
  - **avtomatik qo'shiladigan:** yangi tasdiqlangan a'zo unga o'zi qo'shiladi.
- **Umumiy pochta xizmatlari (gmail.com, mail.ru, yandex.ru va boshqalar) orqali kirganlar tashkilot guruhlariga hech qachon qo'shila olmaydi** — na avtomatik, na qo'lda.

Bu imkoniyat e-pochta orqali kirishni "SMS o'rniga majburiy yechim"dan "tashkilot tasdiqlagan shaxs" degan ustunlikka aylantiradi.

### 2.1. Ma'lumotlar modeli
**Domain** (`Domain/Entities/Organizations/OrganizationModels.cs`, yangi):
```
Organization        { Id, Name, ShortName, LogoPhotoId?, IsActive, CreatedAt }
OrganizationDomain  { Id, OrganizationId, Domain }                    // Domain: kichik harfda, unique
OrganizationMember  { Id, OrganizationId, UserId, Role, VerifiedAt }  // unique(OrganizationId, UserId)
enum OrganizationRole { Member = 1, Admin = 2 }
```
`Group` modeliga ikkita maydon qo'shiladi:
- `int? OrganizationId` — `null` bo'lsa, oddiy guruh;
- `bool AutoJoin`.

`MessageServiceAction` enum'iga `MemberJoinedViaOrganization = 7` qo'shiladi.

**Infrastructure.** `Schemas`ga yangi `organizations` sxemasi, `Tables`ga yangi jadval nomlari, har bir entity uchun konfiguratsiya klassi. Migratsiya nomi: `Add-Organizations`.

### 2.2. Tashkilotlar qayerdan olinadi
Admin paneli yo'q, shuning uchun tashkilotlar **konfiguratsiyadan** olinadi.

`Organizations` sekisiyasi:
```json
"Organizations": [
  { "Name": "Muhammad al-Xorazmiy nomidagi TATU", "ShortName": "TATU",
    "Domains": ["tuit.uz", "student.tuit.uz"], "AdminEmails": ["...@tuit.uz"] }
]
```
- Sozlamalar `OrganizationOptions` klassiga o'qiladi. `OrganizationSync` hosted service ishga tushishda tashkilotlar va domenlarni bazaga upsert qiladi.
- **Himoya:** umumiy pochta domenlari ro'yxati (`gmail.com, googlemail.com, mail.ru, yandex.ru, yandex.com, outlook.com, hotmail.com, yahoo.com, icloud.com, inbox.ru, list.ru, bk.ru`) `Application` qatlamida konstanta sifatida saqlanadi. Bu domenlarni tashkilot domeni qilib ro'yxatga olish rad etiladi va logga yoziladi.

### 2.3. Qoidalar
| № | Qoida | Qayerda |
|---|---|---|
| 1 | Domen mosligi **aniq** tekshiriladi: `@` belgisidan keyingi qism ro'yxatdagi domenga to'liq teng bo'lishi kerak. `evil-tuit.uz` va `tuit.uz.evil.com` mos kelmaydi. Kichik harfga o'tkaziladi, oxirgi nuqta olib tashlanadi | `Application/Features/Organizations/OrganizationEmailMatcher.cs` + testlar |
| 2 | A'zolik foydalanuvchi **tasdiqlangan pochta** bilan kirganda belgilanadi: OTP kodi to'g'ri kiritilganda yoki Google tokenida `email_verified = true` bo'lganda. Ikki joyda chaqiriladi: `AuthService.CompleteRegistrationAsync` va kirish metodlari (tashkilot keyinroq qo'shilgan bo'lsa ham, keyingi kirishda a'zo bo'ladi) | `IOrganizationMembershipService.EnsureMembershipAsync(user)` |
| 3 | `AdminEmails`dagi pochtalar `Admin` roli bilan a'zo bo'ladi | xuddi shu joyda |
| 4 | Yangi a'zo tashkilotning barcha `AutoJoin` guruhlariga `Member` sifatida qo'shiladi. Har bir guruhga xizmat xabari yoziladi va real vaqt hodisalari yuboriladi (mavjud `GroupService` mantiqidan qayta foydalanilsin) | `OrganizationMembershipService` |
| 5 | `OrganizationId` bor guruhga a'zo qo'shishda (`AddMembersAsync`) har bir foydalanuvchi o'sha tashkilot a'zosi bo'lishi kerak. Aks holda xato: "Bu guruhga faqat {ShortName} a'zolarini qo'shish mumkin." | `GroupService` |
| 6 | Tashkilot guruhini **faqat o'sha tashkilot a'zosi** yarata oladi. `AutoJoin = true` qilishni faqat tashkilot `Admin`i qila oladi | `GroupService.CreateAsync` + validator |
| 7 | A'zolar soni chegarasi: oddiy guruhda `GroupLimits.MaxMembers = 200`, tashkilot guruhida `GroupLimits.MaxOrganizationMembers = 5000` | `GroupLimits` |
| 8 | Taklif havolasi (`InviteLink`) orqali qo'shilganda ham 5-qoida amal qiladi | agar shunday oqim bo'lsa |

### 2.4. API va DTO
- `GET /api/organizations/me` → `{ id, name, shortName, role } | null`.
- `CreateGroupRequest`ga ikkita maydon qo'shiladi: `bool OrganizationOnly` va `bool AutoJoin`. Validator: `AutoJoin` faqat `OrganizationOnly = true` bo'lganda ruxsat etiladi.
- `GroupDto`ga `OrganizationBadgeDto? Organization` va `AutoJoin` qo'shiladi.
- Belgi (badge) uchun `OrganizationBadgeDto(int Id, string ShortName)` quyidagi DTO'larga qo'shiladi: `ProfileDto`, `UserSearchDto`, `MessageSenderDto`, guruh a'zosi DTO'si. Mapper'lardagi EF projection'lar ham yangilanadi.
- `MemberPicker` uchun: `GET /api/users/search` so'roviga ixtiyoriy `organizationId` parametri qo'shiladi va natija faqat shu tashkilot a'zolari bilan cheklanadi.

### 2.5. Klient
| Joy | O'zgarish |
|---|---|
| `shared/ui/org-badge/` (yangi) | Kichik "TATU ✓" belgisi, dizayn tizimi ranglarida |
| `message-bubble`, `chat-list-item`, `profile-view`, `group-info`, `member-picker` | Ism yonida belgi ko'rsatiladi |
| `groups/group-create` | Foydalanuvchi tashkilot a'zosi bo'lsa, "Faqat {ShortName} a'zolari uchun" kaliti chiqadi. Admin bo'lsa, qo'shimcha ravishda "Yangi a'zolarni avtomatik qo'shish" kaliti chiqadi |
| `member-picker` | Tashkilot guruhida faqat tashkilot a'zolari qidiriladi. Boshqalar ro'yxatda ko'rinmaydi |
| `group-info` | "{ShortName} a'zolari uchun" yozuvi va ixtiyoriy "Avtomatik qo'shiladi" belgisi |
| `login-page` | Ro'yxatdan o'tgandan keyin xabar: "Siz TATU tashkilotiga qo'shildingiz" |

### 2.6. Testlar
- `OrganizationEmailMatcherTests`: aniq moslik, subdomen faqat ro'yxatda bo'lsa, `evil-tuit.uz`, registr, umumiy pochta domenlari.
- `OrganizationMembershipServiceTests`: a'zolik va admin rolining berilishi; AutoJoin guruhlarga qo'shilish; qayta chaqirilganda takror qo'shmasligi.
- `GroupServiceTests`ga: tashkilotdan tashqari foydalanuvchini qo'shish rad etiladi; `AutoJoin`ni admin bo'lmagan a'zo o'rnata olmaydi.

### 2.7. Qabul mezonlari
- [ ] `ali@tuit.uz` ro'yxatdan o'tadi. Uning ismi yonida "TATU ✓" chiqadi va u "TATU — umumiy" guruhiga avtomatik qo'shiladi (guruhda xizmat xabari ko'rinadi).
- [ ] `ali@gmail.com` ro'yxatdan o'tadi. Uning belgisi yo'q, u tashkilot guruhiga avtomatik qo'shilmaydi, admin uni qo'lda ham qo'sha olmaydi (xato xabari chiqadi).
- [ ] `ali@evil-tuit.uz` tashkilot a'zosi bo'lmaydi.
- [ ] Oddiy (tashkilotga tegishli bo'lmagan) guruhlar avvalgidek ishlaydi.

---

## 3-imkoniyat. Maxfiy chatlar — E2E shifrlash (taxminan 5–6 kun)

### G'oya va chegaralar
Telegram'dagi "Secret chat"ga o'xshaydi:
- Faqat **ikki kishilik** chat.
- Faqat **matnli xabarlar** (fayllar keyingi versiyada).
- Chat **qurilmaga bog'langan**: shifrlash kaliti faqat chat yaratilgan brauzerda bo'ladi.
- Server faqat shifrlangan matnni va ochiq kalitlarni saqlaydi. U xabarni o'qiy olmaydi.

**Muhim:** hozirgi `SecretChat` entity'sida `EncryptionKey` maydoni bor. Kalitni serverda saqlash E2E emas, shuning uchun bu maydon **olib tashlanadi**. Jadval hozircha ishlatilmayapti — bajaruvchi buni tekshirsin.

### 3.1. Kriptografiya (brauzerdagi Web Crypto API)
1. **Kalit juftligi.** Har bir maxfiy chat va har bir qurilma uchun ECDH P-256 kalit juftligi yaratiladi. Yopiq kalit `extractable: false` bo'lgan `CryptoKey` ko'rinishida IndexedDB'da saqlanadi (`milliy-chat-e2e` bazasi, kalit sifatida `chatId`).
2. **Umumiy kalit.** `ECDH(o'z yopiq kaliti, suhbatdoshning ochiq kaliti)` → `HKDF-SHA-256` (salt = `chatId`, info = `"milliy-chat-secret-v1"`) → `AES-GCM-256` kaliti.
3. **Har bir xabar.** Tasodifiy 12 baytli IV olinadi va matn `AES-GCM` bilan shifrlanadi. Serverga `cipherText` (base64) va `iv` (base64) yuboriladi.
4. **Kalit barmoq izi (fingerprint).** `SHA-256(initiatorPublicKey ‖ participantPublicKey)` hisoblanib, 5 raqamdan iborat 4 guruh ko'rinishida ikkala foydalanuvchiga ko'rsatiladi. Ular raqamlarni solishtirib, o'rtada boshqa odam yo'qligiga ishonch hosil qiladi.

**Diplomda halol yoziladigan cheklovlar:**
- Har bir xabar uchun forward secrecy (Signal'dagi Double Ratchet) yo'q. Har chatda alohida kalit bor, xolos.
- Kim, kimga va qachon yozgani (metama'lumotlar) serverga ko'rinadi.
- Veb-klientdagi JS kodining o'zi serverdan yuklanadi. Bu veb-ilovalardagi E2E'ning ma'lum cheklovi.

### 3.2. Server
**Domain:**
- `SecretChat` qayta loyihalanadi:
  ```
  { Id, ChatId, InitiatorId, ParticipantId,
    InitiatorSessionId, ParticipantSessionId?,
    InitiatorPublicKey, ParticipantPublicKey?,
    Status, CreatedAt, AcceptedAt? }
  ```
- `enum SecretChatStatus { Pending = 1, Active = 2, Declined = 3, Closed = 4 }`.
- `EncryptionKey` maydoni olib tashlanadi.
- `Message` modeliga `EncryptedContent?` (base64) va `EncryptionIv?` (base64) qo'shiladi.

**Migratsiya:** `Rework-Secret-Chats-For-E2E`.

**Application** (`Features/SecretChats/`, yangi): servis, repozitoriy interfeysi, DTO'lar, validatorlar, mapper va factory.

**Endpointlar:**
| Metod | Yo'l | Nima qiladi |
|---|---|---|
| `POST` | `/api/secret-chats` | `{ participantUserId, publicKey }` → `Chat(Type = Secret)` va `SecretChat(Pending)` yaratadi. Suhbatdoshga real vaqtda `SecretChatRequested` yuboriladi |
| `POST` | `/api/secret-chats/{chatId}/accept` | `{ publicKey }` → `Active`, `ParticipantSessionId` = joriy sessiya. Tashabbuskorga `SecretChatAccepted` yuboriladi |
| `POST` | `/api/secret-chats/{chatId}/decline` | Taklifni rad etadi |
| `GET` | `/api/secret-chats/{chatId}` | Ochiq kalitlar va holatni qaytaradi (barmoq izi uchun) |

**Xabar yuborish qoidalari.** Xabarlar mavjud xabar endpoint'i orqali yuboriladi, qoidalar kengaytiriladi:
- `Secret` turidagi chatda `TextContent` bo'sh bo'lishi, `EncryptedContent` va `EncryptionIv` esa majburiy bo'lishi kerak. Boshqa chat turlarida — aksincha.
- Maxfiy chatga faqat **bog'langan sessiyadan** yozish mumkin (JWT'dagi `sid` claim `InitiatorSessionId` yoki `ParticipantSessionId`ga teng bo'lishi kerak). Aks holda 403 va "Bu maxfiy chat boshqa qurilmada ochilgan" xabari.
- Chat `Active` holatda bo'lmasa, xabar yuborib bo'lmaydi.
- Maxfiy chatlarda qidiruv o'chiriladi: serverdagi qidiruv bo'sh natija qaytaradi.
- Maxfiy chatlarda fayl biriktirish rad etiladi.
- `EncryptedContent` uchun uzunlik chegarasi: base64 kodlashni hisobga olib, taxminan 4000 × 4 belgi.

**DTO'lar.** `MessageDto`, `MessageReplyDto` va `ChatLastMessageDto`ga `EncryptedContent` va `EncryptionIv` qo'shiladi. `ChatListDto`da maxfiy chat alohida belgilanadi.

**Testlar** (`tests/NationalChat.Tests/SecretChats/`):
- Taklifni faqat suhbatdosh qabul qila oladi.
- Boshqa sessiyadan yozish rad etiladi.
- Maxfiy chatda ochiq matn yuborish rad etiladi.
- Oddiy chatda shifrlangan maydonlarni yuborish rad etiladi.
- `Pending` holatdagi chatga yozib bo'lmaydi.

### 3.3. Klient
| Fayl | O'zgarish |
|---|---|
| `features/chat/secret/e2e-crypto.service.ts` (yangi) | `generateKeyPair`, `deriveChatKey`, `encrypt`, `decrypt`, `fingerprint`. `.spec.ts`da shifrlash va qayta ochish (roundtrip) hamda noto'g'ri kalit bilan ochib bo'lmasligi testlari (Vitest'da `globalThis.crypto.subtle`) |
| `features/chat/secret/e2e-key-store.ts` (yangi) | IndexedDB o'rami. Yopiq kalitlar va olingan chat kalitlari shu yerda |
| `features/chat/secret/secret-chats-api.service.ts` (yangi) | Yuqoridagi endpointlar |
| `chat-realtime.service.ts` | `SecretChatRequested`, `SecretChatAccepted` hodisalari |
| `profile-view` | "🔒 Maxfiy chat boshlash" tugmasi |
| `chat-page` / `message-composer` | Maxfiy chatda yuborishdan oldin matn shifrlanadi, qabul qilingan xabar ochiladi. Fayl biriktirish tugmasi yashiriladi. Kalit bu qurilmada bo'lmasa, "Bu maxfiy chat boshqa qurilmada" degan faqat o'qish uchun holat ko'rsatiladi |
| `chat-list-item` | 🔒 belgisi va yashil sarlavha. Oxirgi xabar kalit bo'lsa ochib ko'rsatiladi, bo'lmasa "Shifrlangan xabar" yoziladi |
| `secret/secret-chat-info` (yangi) | Kalit barmoq izi va "Suhbatdoshingiz bilan solishtiring" izohi |

1-imkoniyatdagi `uzScript` pipe ochilgan matnga ham qo'llanadi. U klientda ishlagani uchun maxfiy chatlarda ham ishlaydi.

### 3.4. Qabul mezonlari
- [ ] A foydalanuvchi B'ga maxfiy chat taklif qiladi, B qabul qiladi. Ikkalasida bir xil barmoq izi ko'rinadi.
- [ ] Xabarlar real vaqtda yetib boradi va ochiladi.
- [ ] Bazadagi `messages` jadvalida maxfiy chat xabarlari uchun `TextContent = NULL` bo'ladi, `EncryptedContent` esa ma'nosiz base64 ko'rinishida saqlanadi. Buning skrinshoti diplom uchun olinadi.
- [ ] B hisobiga boshqa brauzerdan kirilsa, maxfiy chat "boshqa qurilmada" holatida ko'rinadi va u yerdan yozib bo'lmaydi.
- [ ] Oddiy chatlar avvalgidek ishlaydi. Barcha eski testlar yashil.

---

## 4-imkoniyat. OneID (faqat istiqbol)
Kod yozilmaydi. Diplom va taqdimotda quyidagicha yoritiladi:
- **Istiqbollar ro'yxatida:** "OneID (id.egov.uz) orqali shaxsni davlat darajasida tasdiqlash".
- **Arxitektura bo'limida bir abzats:** tashkilot a'zoligini tasdiqlash mantiqi `Application` qatlamidagi port orqali ajratilgan. Kelajakda OneID provayderi shu portni amalga oshiruvchi yangi `Infrastructure` adapteri sifatida qo'shiladi. Bu ish uchun davlat axborot tizimi bilan shartnoma va API'ga ruxsat talab qilinadi.

---

## 5. Diplom va taqdimotni yangilash (taxminan 1–2 kun)
Hamma imkoniyatlar ishlagandan va skrinshotlar olingandan keyin bajariladi. Generator: `diplom/generator/`.

**Diplom** (`content/*.mjs`):
| Joy | O'zgarish |
|---|---|
| `02-kirish.mjs` | Vazifalar ro'yxatiga uchta yangi vazifa. "Ishning ilmiy-amaliy yangiligi" bandi: o'zbek yozuvlariga moslashgan ko'rsatish va qidiruv, domen orqali tashkilot tasdig'i, maxfiy chatlar |
| `10-bob1.mjs`, 1.1-jadval | "Milliy chat" ustuni yangilanadi (E2E: "Maxfiy chatlarda (ECDH + AES-GCM)"). Yangi qatorlar: "Lotin/Kirill o'girish", "Tashkilot tomonidan tasdiqlash" |
| `20-bob2.mjs`, 2.5-bo'lim (xavfsizlik) | Maxfiy chat protokoli va kalit almashish sequence diagrammasi (`diagrams/2-11-secret-chat.mmd`). Tashkilot a'zoligini tasdiqlash diagrammasi (`2-12-organization.mmd`). ER diagrammaga yangi jadvallar |
| `30-bob3.mjs` | Yangi bo'lim: "3.x. Tizimning o'ziga xos imkoniyatlari" — algoritm jadvali, kod listinglari, skrinshotlar. Foydalanish yo'riqnomasi ham yangilanadi |
| `90-xulosa.mjs`, `01-annotation.mjs` | Uchta tilda (o'zbek, rus, ingliz) bir-ikki jumla. Istiqbollardan "E2E" olib tashlanadi, "OneID" qo'shiladi |
| Hamma joyda | Raqamlar yangilanadi: endpointlar soni (hozir 56), testlar soni (hozir 39), jadvallar soni (hozir 32). Ular kodni sanab aniqlanadi, taxmin qilinmaydi |

Yig'ish:
```bash
node build.mjs
```
Keyin `tools/export-pdf.ps1` bilan PDF chiqariladi.

**Taqdimot** (`slides.mjs`):
- **4-slayd:** jadvaldagi "Milliy chat" ustuni yangilanadi.
- **11-slayddan keyin yangi slayd:** "Milliy chatning o'ziga xos imkoniyatlari". Uchta kartochka: Lotin↔Kirill, Tashkilot ✓, Maxfiy chat 🔒. Har birida skrinshot bo'ladi.
- **17-slayd:** raqamlar yangilanadi.
- **19-slayd:** natijalarga uchta imkoniyat qo'shiladi, istiqbollarda "E2E" o'rniga "OneID".
- Umumiy slaydlar soni `TOTAL`da yangilanadi, yangi slaydga nutq matni yoziladi.
- Yig'ish: `node slides.mjs`, keyin `tools/export-slides.ps1` bilan PNG va PDF chiqarilib, har bir slayd ko'zdan kechiriladi.

**Skrinshotlar.** `tools/seed.mjs` va `tools/screenshots.mjs` yangi holatlar bilan kengaytiriladi:
- bitta xabar lotinda va kirillda;
- "TATU ✓" belgisi va tashkilot guruhi;
- maxfiy chat va barmoq izi;
- bazadagi shifrlangan qator.

---

## 6. Tartib va vaqt
| Bosqich | Vaqt | Bog'liqlik |
|---|---|---|
| 0. Branchlarni birlashtirish | 0,5 kun | foydalanuvchi roziligi |
| 1. Lotin ↔ Kirill | 3–4 kun | — |
| 2. Tashkilot rejimi | 5–7 kun | — |
| 3. Maxfiy chatlar (E2E) | 5–6 kun | — |
| 5. Diplom va taqdimot | 1–2 kun | 1–3-bosqichlar |

**Jami taxminan 15–20 kun.**

Vaqt yetmasa, **3-imkoniyat birinchi bo'lib qisqartiriladi**: diplomda faqat loyiha (protokol va diagramma) sifatida qoladi, 1 va 2-imkoniyatlar esa to'liq bajariladi. Bu qaror foydalanuvchi bilan kelishiladi.
