# Diplom loyihasini qayta generatsiya qilish — reja (2026-10-17)

> Manba: [REJA-rahbar-izohlari.md](REJA-rahbar-izohlari.md) dagi 14 ta izoh va `NationalChat` / `NationalChatClient` dagi yangi commitlar.
> **Holati:** bajarildi (`2eb7206`). Hozirgi holat va qolgan ishlar: [DAVOM-ETTIRISH.md](DAVOM-ETTIRISH.md).

## 0. Hozirgi holat

- Hujjat 84 bet, maqsad **~100 bet**. 3-bob **50–55 bet** bo'lishi kerak.
- Diplom matni oxirgi marta 2026-09-29 da yangilangan. Undan keyin kodga qo'shilganlar:
  - **Server:** xabar reaksiyalari, foydalanuvchini bloklash, forum (postlar, javoblar, obunalar, layk, repost, iqtibos, ko'rishlar soni, top lenta, obuna tavsiyalari, real vaqt yangilanishlari, bildirishnomalar, rate limit, shikoyatlar, postlarda rasm va video), lavhalar lentasi (faqat obuna bo'lingan odamlarnikini ko'rsatadi), maxfiy chatlarda ✓✓, unread-count tuzatishi.
  - **Klient:** desktop bildirishnomalar, reaksiyalar, bloklash, forum sahifasi, maxfiy chatda ✓✓, kirish sahifasining yangi dizayni.
- Yangi sonlar (`obj/bin/Migrations` hisobga olinmagan): **338 ta C# fayl** (matnda 236), **92 ta TS fayl**, **41 ta komponent**, **203 ta unit test**. Generatsiyadan oldin aniq qayta sanaladi.
- Mahalliy, commit qilinmagan o'zgarish: `hujjatlar.mjs` dagi rahbar imzosi ("dotsenti, t.f.f.d."). U saqlanadi.

## 1. Mundarijaning yangi tuzilmasi (izoh 3, 4, 14)

Har bir bobda TOC ga chiqadigan bo'lim (h2) **3 tadan oshmaydi**. Qolganlari h3 bo'ladi: ular matnda raqamli sarlavha bo'lib turadi, lekin mundarijaga chiqmaydi (`headingStyleRange: '1-2'`).
"Bob bo'yicha xulosa" sarlavhalari ham TOC dan olinadi: ular mundarijada ortiqcha 4-qator bo'lib chiqyapti.

| Bob | Hozir | Yangi h2 bo'limlar |
|---|---|---|
| I | 5 + xulosa | 1.1. Messenjerlarning rivojlanishi va mavjud messenjerlar tahlili · 1.2. Axborot xavfsizligi va real vaqtda aloqa texnologiyalari · 1.3. Masalaning qo'yilishi |
| II | 6 + xulosa | 2.1. Texnologiyalar tanlovi va tizim arxitekturasi · 2.2. Ma'lumotlar bazasi va UML modellari · 2.3. Xavfsizlik va maxfiy chatlar protokoli |
| III | 9 + xulosa | 3.1. Server qismini ishlab chiqish · 3.2. Klient qismi va foydalanuvchi imkoniyatlari · 3.3. Joylashtirish, testlash va foydalanish yo'riqnomasi |
| IV | 2 + xulosa | o'zgarmaydi (4.1, 4.2) |
| Ilovalar | 4 ta h2 | 1–4-ilova sarlavhalari TOC dan olinadi (izoh 4) |

"Ishning natijasi" → **"Diplom loyihasi natijasi"** (izoh 14). Bu Kirish, Xulosa va slaydlarda qidirib almashtiriladi.

## 2. Bob-bob o'zgarishlar

### Old qism (`00-front`, `01-annotation`, `02-kirish`)
- **Izoh 2:** "Bitiruv malakaviy ishi" / "BMI" → **"Diplom loyihasi"**. Bu `00-front` (8 joy), `01-annotation`, `02-kirish`, `build.mjs` metama'lumoti, `lib.mjs`, `hujjatlar.mjs` (5 joy) va `slides.mjs` da qilinadi.
- **Izoh 1:** annotatsiya qayta yoziladi, har tilda ~70–80 so'z. Unda faqat shu diplomdagi narsalar bo'ladi: muammo, yechim (ASP.NET Core + SignalR + Angular), asosiy imkoniyatlar, natija. Uchala til **bitta varaqqa** sig'adi; kerak bo'lsa annotatsiya sahifasida qator oralig'i 1.0 qilinadi. Natija PDF da tekshiriladi.
- Kirishdagi vazifalar ro'yxati va sonlar yangilanadi.

### I-bob (`10-bob1`)
- 5 bo'lim 3 taga birlashtiriladi (1-jadvaldagidek). Matn faqat ko'chiriladi, qayta yozilmaydi.
- **Izoh 5:** nofunksional talablar 7 banddan **4 ta qisqa bandga** tushiriladi: unumdorlik, xavfsizlik, ishonchlilik/kengaytiriluvchanlik, ko'chiriluvchanlik.
- Funksional talablarga reaksiyalar, bloklash, forum va desktop bildirishnomalar qo'shiladi.

### II-bob (`20-bob2`)
- 6 bo'lim 3 taga birlashtiriladi.
- **Izoh 7:** `landscapeFigure` olib tashlanadi. ER-diagramma (2.3) ikkita tik rasmga bo'linadi: **"foydalanuvchilar va sessiyalar"** hamda **"chatlar va guruhlar"**. Buning uchun `2-4-er-users-chats.mmd` ikkita `.mmd` faylga ajratiladi.
- Yangi jadvallar uchun ER-diagramma qo'shiladi: forum, reaksiyalar, bloklash. Ular `2-11-er-new-tables.mmd` ga qo'shiladi yoki alohida rasm qilinadi, tik sahifaga sig'ishiga qarab.
- **Izoh 8:** 2.5 Xavfsizlikni loyihalash taxminan **yarmiga** qisqartiriladi. Token hayot sikli diagrammasi va asosiy tamoyillar qoladi, takrorlanuvchi tafsilotlar olinadi.
- Rasm raqamlari qayta tartiblanadi.

### III-bob (`30-bob3`) — asosiy ish
- **Izoh 9:** bob boshidagi kirish matni ("Ushbu bobda … 236 ta C# faylidan …") olib tashlanadi.
- **Izoh 12:** 5 ta kod parchasining **barchasi** olib tashlanadi, o'rniga "1-ilovaga qarang" kabi havola qo'yiladi. Muqobil variant: transliteratsiya parchasi qoldiriladi (pastdagi savolga qarang).
- **Izoh 10:** "Hikoyalar" → **"Lavhalar"** (14 joyda), birinchi uchragan joyda "Lavhalar (Stories)".
- Yangi h3 bo'limlar (izoh 13). Har biriga tavsif, skrinshot va kerak bo'lsa jadval beriladi:
  - **3.1 ostida (server):** reaksiyalar va bloklash; forum (postlar, obunalar, top lenta, rate limit, shikoyatlar, media); lavhalar lentasi; maxfiy chatda o'qilganlik belgisi.
  - **3.2 ostida (klient):** yangi kirish sahifasi; reaksiyalar UI; bloklash; forum sahifasi (lenta, post yozish, media, javoblar); desktop bildirishnomalar; ✓✓.
  - **3.3 ostida:** yangilangan joylashtirish, test natijalari (203 test), yo'riqnoma (forum va bloklash qo'shilgan holda).
- Jadvallar: forum API endpointlari, rate limit qoidalari, reaksiya/bloklash qoidalari.
- Hajm 50–55 betdan oshmasligi PDF da sahifa raqamlari bo'yicha tekshiriladi.

### IV-bob (`40-bob4-hfx`)
- Mazmun o'zgarmaydi. Faqat standartlarga havolalar ([n]) adabiyotlardan olinishi sababli matn ichida qayta raqamlanadi yoki olib tashlanadi (izoh 11).

### Xulosa, Adabiyotlar, Ilovalar
- Xulosa: yangi imkoniyatlar va sonlar bilan yangilanadi, "Diplom loyihasi natijasi".
- **Izoh 11:** ISO 9241-5, ISO 7010 va GOST 12.x (5 ta) olib tashlanadi. O'rniga messenjerlar, .NET (ASP.NET Core, SignalR, EF Core) va Angular bo'yicha 5–7 ta kitob yoki rasmiy hujjat qo'shiladi. Matndagi barcha [n] havolalar qayta raqamlanadi.
- **Izoh 4:** ilova sarlavhalari TOC dan chiqariladi. Listinglar o'zgarmaydi; kerak bo'lsa reaksiya/forum servisidan bitta yangi listing qo'shiladi.

## 3. Rasmlar (izoh 6, 7)

- `lib.mjs`: `figure()` uchun `maxHeightCm` 20 → **~16 sm**. Shunda rasm, sarlavha va oldingi qator bitta sahifaga sig'adi. Rasm va uning sarlavhasiga `keepNext` qo'yiladi.
- `landscapeFigure()` va `splitSections()` dagi albom mantiqi olib tashlanadi. Hamma sahifa tik bo'ladi.
- Tekshiruv: PDF sahifalari `tools/pdf-pages.mjs` bilan rasm qilib ko'riladi. Sahifaning yarmidan ko'p qismi bo'sh qolsa, rasm kichraytiriladi yoki matn bilan joyi almashtiriladi.

## 4. Yangi skrinshotlar

`tools/seed.mjs` + `tools/screenshots.mjs` orqali olinadi. Server (`https://localhost:7122`) va klient lokal ishga tushirilishi kerak.
- Qayta olinadi: `3-01-login` (yangi dizayn), `3-26-secret-chat` (✓✓).
- Yangi: reaksiyalar, bloklash, forum lentasi, post yozish (media bilan), post javoblari, top lenta/tavsiyalar, lavhalar lentasi, desktop bildirishnoma. Taxminan 8–10 ta rasm.
- Seed ma'lumotlariga forum postlari, reaksiyalar va obunalar qo'shiladi.
- `rasmlar/` siqiladi (hozir 13 MB).

## 5. Generator yaxshilanishlari (kelishilganidek)

1. `build.mjs --only bob3`: bitta bobni tez ko'rish uchun.
2. Diagrammalarni faqat `.mmd` o'zgarganda qayta chizish (`render-diagrams.mjs` da mtime solishtiriladi).
3. Rasmlarni siqish.

## 6. Bajarish tartibi

1. Generator yaxshilanishlari (5-bo'lim) va `lib.mjs` dagi rasm o'zgarishlari.
2. Yangi skrinshotlar va diagrammalar (seed → server/klient → screenshots → render-diagrams).
3. Matn: old qism → I → II → III → Xulosa → Adabiyotlar → Ilovalar. Har bobdan keyin `--only` bilan tekshiriladi.
4. To'liq `node build.mjs` → Word orqali `tools/export-pdf.ps1` (bir marta). Keyin bet soni, mundarija, rasmlar va bo'sh joylar tekshiriladi.
5. `slides.mjs` (Diplom loyihasi, yangi imkoniyatlar slaydi) va `hujjatlar.mjs` (rahbar xulosasi, taqriz) qayta ishga tushiriladi.
6. Alohida branchda commit qilinadi, PR ochiladi.

## 7. Boshlashdan oldin tasdiq kerak

1. **Atama:** "Lavhalar (Stories)" — tasdiqlaysizmi?
2. **Kod parchalari:** 3-bobdan hammasini olib tashlaymizmi yoki bitta (transliteratsiya) qoladimi?
3. **Skrinshotlar:** server va klientni shu kompyuterda (PostgreSQL bilan) ishga tushirib bo'ladimi?
4. **Taqdimot fayllari:** nomida "BMI himoyasi" bo'lgan ikkita `.pptx` "Diplom loyihasi himoyasi" deb qayta nomlansinmi? Commit qilinmagan `Milliy chat — BMI himoyasi.pptx` nima qilinadi?

## 8. Sahifalash va topshiriladigan fayl (2026-10-17 qo'shildi)

- **Asosiy fayl — PDF** (`diplom/Diplom_ishi_Sohinazarov_Sardor.pdf`, Word orqali eksport qilinadi). Rahbarga, antiplagiatga va chop etishga shu fayl beriladi. `.docx` faqat tahrirlash uchun: WPS va boshqa dasturlar shrift va qatorlarni Word'dan boshqacha hisoblaydi, shuning uchun ularda sahifalar boshqacha bo'linishi va rasm oldida bo'sh joy chiqishi mumkin.
- **Bo'sh joylarni avtomatik tuzatish:** `node tools/fit-pages.mjs --reset` matn yoki rasmlar o'zgargandan keyin ishga tushiriladi. U vaqtinchalik faylga yig'ib, Word PDF'ini tekshiradi va sahifaning pastki chorak qismidan ko'prog'i bo'sh qolib, keyingi bet rasm bilan boshlansa, o'sha rasm uchun `data/layout.json`ga yozadi: avval undan keyingi 1–2 paragrafni rasm oldiga ko'chiradi (`after`), so'ng rasmni 75% gacha kichraytiradi (`scale`). Oxirida `node build.mjs` va `tools/export-pdf.ps1` bilan asosiy fayl yig'iladi.
- Avtomatik tuzatib bo'lmaydigan holat (rasmdan keyin paragraf yo'q va kichraytirish yetmaydi) skript chiqishida alohida aytiladi. Bunday rasmni qayta chizish kerak, masalan 2.11 blok-sxemasi gorizontal qilib qayta chizildi.
