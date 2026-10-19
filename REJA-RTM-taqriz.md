# Reja: diplomni taqriz va yangi izohlar bo'yicha yangilash

> Asos: tashqi taqriz (`RTM.docx`, J. Narzullaev) va 2026-10-19 dagi izohlar.
> Holat: hozircha faqat reja, diplomga tegilmagan.

## Asosiy tamoyil: butun matn odam tiliga yaqinlashtiriladi

Bu faqat texnologiya nomlariga emas, **diplomning butun matniga** tegishli: kirish, to'rtta bob, xulosa, annotatsiya (uch tilda) va taqdimot. Hozirgi matn texnik hisobotga o'xshaydi, unda kod nomlari, ichma-ich jumlalar va qalin sarlavhali ro'yxatlar ko'p. Matn shunday bo'lishi kerakki, komissiyadagi dasturchi bo'lmagan o'qituvchi ham uni tushunsin.

**Qoidalar:**

- **Avval “nima uchun”, keyin “qanday”.** Har bir yechimdan oldin u qaysi muammoni hal qilishi aytiladi.
- **Bitta jumla — bitta fikr.** Ikki nuqta va qavslar bilan ulangan uzun jumlalar bo'linadi.
- **Kod nomlari kamayadi.** IQueryable, DTO, middleware, kengaytma metodi kabi nomlar matndan chiqariladi yoki birinchi uchraganda oddiy so'z bilan izohlanadi. Aniq nomlar jadvallarda va ilovalarda qoladi.
- **Inglizcha atamaning o'zbekchasi** bor bo'lsa, o'shanisi ishlatiladi.
- **“Qalin so'z — izoh” ko'rinishidagi ro'yxatlar** kamaytiriladi, ko'pi oddiy paragrafga aylantiriladi.
- **Saqlanadigan narsalar:** barcha raqamlar, jadvallar, rasmlar, adabiyotlarga havolalar [n] va mazmun.
- **Hajm kamaymaydi.** Rahbar 100 betga yaqin hajm so'ragan. Tushuntirishlar qo'shilgani uchun hajm hatto biroz oshadi.

**Misol** (III bob, ro'yxatlarni qismlab yuklash):

> **Hozir:** “Ro'yxat qaytaruvchi barcha endpointlarda kursorli sahifalash ishlatiladi. U barcha repozitoriylar uchun umumiy IQueryable kengaytma metodi sifatida yozilgan: metod “Id < beforeId” shartini ifodalar daraxti orqali dinamik quradi va limitdan bittaga ko'p yozuv o'qiydi…”
>
> **Bo'ladi:** “Chatda minglab xabar bo'lishi mumkin, ularni bir yo'la yuklash sahifani sekinlashtiradi. Shuning uchun xabarlar qismlab yuklanadi: avval eng oxirgilari, foydalanuvchi yuqoriga aylantirganda esa undan oldingilari. Server har safar qaysi xabarda to'xtaganini eslab qoladi va keyingi qismni o'sha joydan beradi. Bu usul kursorli sahifalash deyiladi [16, 41]. Uning afzalligi shundaki, ro'yxat qanchalik uzun bo'lmasin, har bir qism bir xil tezlikda yuklanadi.”

**Ish tartibi:** avval namuna sifatida **Kirish va I bob** qayta yoziladi. Siz uslubni ko'rib, ma'qullaganingizdan keyin qolgan boblar ham shu uslubda yoziladi.

## Nimalar o'zgaradi

### 1. Messenjerlar ro'yxatiga “Humo” qo'shiladi

Birinchi bobda Telegram, WhatsApp, Signal va WeChat qatoriga **Humo Messenger** qo'shiladi. Internetdan topilgan ma'lumotlar:

- **Kim qilgan:** UNICON-SOFT MChJ. Uning 25 foizi Raqamli texnologiyalar vazirligiga qarashli “UNICON.UZ” DUKga tegishli.
- **Kim uchun:** davlat tashkilotlari xodimlari. 2023-yil boshida 22 mingdan ortiq rasmiy foydalanuvchisi bo'lgan.
- **Asosi:** Telegram'ning ochiq kodli klienti (GPL v2.0). Ko'rinishi va sozlamalari Telegram bilan deyarli bir xil.
- **Narxi:** pullik obuna, har bir xodim uchun oyiga 25 200 so'm.
- **Ma'lumotlar:** vazirlik talabiga ko'ra serverlar O'zbekistonda bo'lishi kerak. Ishlab chiquvchi yangi versiyalarda uchdan-uchgacha shifrlash borligini aytadi.
- **Tanqid:** tendersiz tanlangan, Telegram'dan ko'chirilgan, xodimlar uchun pullik.

Manbalar: Kun.uz (2023-yil 1-fevral) maqolasi; ishlab chiquvchining rasmiy kanali (o'zi haqidagi da'volari shundayligicha keltiriladi).

Diplomda Humo uchun xolis, qisqa tavsif yoziladi, solishtirish jadvaliga Humo ustuni qo'shiladi. Aniqlanmagan katakchalarga (masalan, guruh hajmi) “Ma'lumot yo'q” deb yoziladi, taxmin qilinmaydi. Xulosa va taqdimotda ham Humo eslatiladi.

“Birorta messenjer ma'lumotni O'zbekistonda saqlamaydi” degan gap endi to'g'ri emas. U shunday qayta yoziladi: “mahalliy muqobil bor, lekin u yopiq, pullik va faqat davlat xizmatchilari uchun”.

### 2. Elektron kooperatsiya portali alohida ta'kidlanadi

Diplomda yaratilgan chat asosida **Elektron kooperatsiya portali**da kompaniyalar o'rtasidagi chat ishlab chiqilgani yoziladi:

- kirishda — loyihaning amaliy ahamiyati sifatida;
- uchinchi bobda — alohida kichik bo'lim: nima olindi va portalga qanday moslashtirildi;
- xulosada va taqdimotda — bittadan jumla.

Diplomda portal manzili emas, “Elektron kooperatsiya portali” nomi ishlatiladi. Skrinshot qo'yilmaydi.

### 3. Texnologiyalar soddaroq aytiladi

“.NET 8, ASP.NET Core, Entity Framework Core va PostgreSQL” o'rniga “**.NET muhitida, Entity Framework asosida**” deyiladi. Bu annotatsiya, kirish, bob xulosalari, umumiy xulosa, rahbar xulosasi va taqdimotga taalluqli.

### 4. Docker soddaroq aytiladi

“Ko'p bosqichli Dockerfile bilan konteynerga yig'ildi” o'rniga “**konteynerlash texnologiyalaridan biri — Docker’dan foydalanildi**” deyiladi.

### 5. “Humo bor ekan, yana bitta messenjer nega kerak?” savoliga javob

Birinchi bobga yangi kichik bo'lim qo'shiladi: **“Milliy” xabarchining ustunliklari**. Himoyada beriladigan savollarga oldindan javob bo'ladi:

- **Mustaqil, o'z kodi.** Humo Telegram'ning nusxasi, “Milliy” esa noldan yozilgan, uning har bir qismi nazorat ostida.
- **Bepul va har kim uchun.** Humo pullik va faqat davlat xodimlari uchun. “Milliy” istalgan tashkilot yoki fuqaro uchun ochiq.
- **O'z serveringizda ishlaydi.** Tashkilot yoki idora tizimni o'z serveriga o'rnatadi. Yozishmalar hech kimga, hatto mahalliy kompaniyaga ham berilmaydi.
- **Boshqa tizimlarga qo'shib bo'ladi.** Chat alohida qism sifatida boshqa saytlarga ulanadi. Buning isboti — Elektron kooperatsiya portali.
- **Tashkilot rejimi.** Xodimlar ish e-pochtasi orqali tasdiqlanadi.
- **Lotin va kirill.** Har kim xabarni o'zi o'rgangan yozuvda o'qiydi, qidiruv ikkalasida ham ishlaydi.
- **Maxfiy chatlar.** Xabarni faqat ikki suhbatdosh o'qiy oladi, server ham o'qiy olmaydi.
- **Forum** va **brauzerda o'rnatmasdan ishlash**.
- **Sun'iy intellekt.** Hozir dasturda AI yo'q, shuning uchun “keyingi bosqichda qo'shiladi” deb yoziladi. Rejadagi imkoniyatlar: uzun yozishmani qisqacha bayon qilish, javob variantlarini taklif qilish, ovozli xabarni matnga aylantirish, spam va haqoratli xabarlarni filtrlash, imloni tuzatish.

Taqdimotga ham “Nega yana bitta messenjer?” degan slayd qo'shiladi.

### 6. Taqriz — tayyor, o'zgartirilmaydi

Taqriz yozib bo'lingan: bu `RTM.docx` (taqrizchi J. Narzullaev). U **o'zgartirilmasdan** ishlatiladi:

- `RTM.docx` diplom papkasiga `Taqriz_Sohinazarov_Sardor.docx` nomi bilan, PDF nusxasi bilan birga qo'yiladi;
- generator endi taqrizni yaratmaydi, faqat rahbar xulosasini yaratadi, aks holda taqrizchi matni ustidan yozib yuboriladi;
- diplomdagi o'zgarishlar taqrizda yozilganlarga mos bo'lishi tekshiriladi (Telegram, WhatsApp, Signal, WeChat tahlili, SignalR tanlovi, Elektron kooperatsiya portali).

### 7. Oxirida

Diplom, rahbar xulosasi va taqdimot qayta yaratiladi. Betlar va rasmlar sig'ishi ko'z bilan tekshiriladi. Hammasi bitta commitda saqlanadi, push qilinmaydi.

## Qabul qilingan qarorlar

1. **Humo** — ma'lumotlar internetdan topildi (yuqorida, 1-bo'lim).
2. **Portal nomi** — “Elektron kooperatsiya portali”, skrinshotsiz.
3. **Ikkinchi bobdagi texnologiyalar jadvali** versiyalari bilan qoladi, chunki bu bob texnik loyihalashga bag'ishlangan. Atrofidagi matn esa soddalashtiriladi. Agar jadval ham soddalashtirilishi kerak bo'lsa, ayting.
