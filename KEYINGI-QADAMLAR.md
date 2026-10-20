# Keyingi qadamlar (2026-10-19 holati)

> Boshqa kompyuterda davom ettirish uchun. Asosiy branch: `master`.
> Avvalgi rejalar: [REJA-RTM-taqriz.md](REJA-RTM-taqriz.md), umumiy yo'riqnoma: [DAVOM-ETTIRISH.md](DAVOM-ETTIRISH.md).

## Boshqa kompyuterda boshlash

```bash
git pull
git submodule update --init --recursive
cd diplom/generator && npm ci
```

- Diplom: `node build.mjs`, keyin PDF uchun `powershell -File tools/export-pdf.ps1 ..\Diplom_ishi_Sohinazarov_Sardor.docx ..\Diplom_ishi_Sohinazarov_Sardor.pdf`.
- Rahbar xulosasi: `node hujjatlar.mjs`, keyin `export-pdf.ps1` bilan PDF.
- Taqdimot: `node slides.mjs`, keyin `powershell -File tools/export-slides.ps1 ../Taqdimot_Sohinazarov_Sardor.pptx <png-papka> ../Taqdimot_Sohinazarov_Sardor.pdf`.
- Betlarni ko'z bilan tekshirish: `node tools/pdf-pages.mjs ../Diplom_ishi_Sohinazarov_Sardor.pdf <papka> 1 99 0.35`, so'ng `node tools/contact-sheet.mjs <papka> <out.png> 8 <dan> <gacha>`.
- `export-pdf.ps1` Bash'dan ishlamaydi (execution policy), uni PowerShell orqali ishga tushiring.

## Bu safar nima qilindi

- **Butun matn sodda tilga o'tkazildi:** kirish, I–IV boblar, xulosa, annotatsiya (uch tilda), topshiriq varag'i. Rasmlar, jadvallar va raqamlar o'zgarmadi.
- **Humo** messenjeri I bobga qo'shildi: alohida paragraf, 1.1-jadvalda ustun, [52] manba (Kun.uz, 2023-yil 1-fevral).
- **“Milliy” xabarchining ustunliklari:** 8 ta funksional (shu jumladan AI va bozor/tenderlar) va 8 ta nofunksional band.
- **1.3 → “Keyingi bosqich talablari”:** sun'iy intellekt (7 band), muloqot (7 band), bozor/auksion/tenderlar, blokcheyn.
- **3.3 → “Amaliy joriy etish”** (Elektron kooperatsiya portali) va **“Rivojlantirish istiqbollari”** (AI, muloqot, bozor, blokcheyn batafsil).
- **Texnologiyalar soddalashtirildi:** “.NET muhitida, Entity Framework asosida”, “konteynerlash texnologiyalaridan biri — Docker”. 2.1-jadval esa versiyalari bilan qoldi.
- **Taqriz:** `diplom/Taqriz_Sohinazarov_Sardor.docx` endi taqrizchining o'z fayli (`RTM.docx`, J. Narzullaev), **o'zgartirilmaydi**. `hujjatlar.mjs` endi faqat rahbar xulosasini yaratadi (1 bet).
- **Taqdimot:** 26 slayd. Humo ustuni, yangi “Nega yana bitta messenjer kerak?” slaydi qo'shildi, istiqbollar (AI, bozor, tender, blokcheyn) yangilandi, slayd raqamlari endi avtomatik qo'yiladi.

## Qolgan ishlar

1–3. ✅ **Bajarildi (2026-10-20):** Xulosa qisqartirildi va oxirgi betga sig'di. Kirishda hajm 91 bet deb yozildi. 91 betning hammasi ko'z bilan tekshirildi.
4–5. ✅ **Bajarildi (2026-10-20):** III bobga (3.2) “Sekin internetga moslashuv” bo'limi qo'shildi. Unda kodda haqiqatda bor narsalar yozildi: service worker, IndexedDB kesh, outbox, delta sync, rasm siqish, xira nusxa, 360p video, MessagePack, ishlash tezligini o'lchash. 1.3'ga qo'shimcha nofunksional talablar qo'shildi. Diplom 94 bet bo'ldi. Diqqat: rahbarning 5-izohida nofunksional talablarni qisqartirish so'ralgan edi, endi esa ular biroz ko'paydi.
8. ✅ **Humo manbalari** to'ldirildi: Kursiv Media (ishga tushirish sanasi — 2023-yil yanvar) va App Store tavsifi (200 ming kishilik guruh, 2 GB gacha fayl). Adabiyotlar 54 ta. 2024–2026-yillar bo'yicha yangi xabar topilmadi.
9. **Joylashtirish to'g'risidagi ma'lumot eskirgan.** Diplomda (3.3 va taqdimotda) dastur Render'da ishlaydi deb yozilgan. Kodda esa endi VPS'ga deploy qilinadi: Docker Compose, Caddy, GitHub Actions (qales.uz). Matnni moslash kerak.
10. **Testlar soni eskirgan bo'lishi mumkin.** Diplomda 425 ta server va 295 ta klient testi deyilgan, lekin keyin yangi testlar qo'shilgan (outbox, delta sync, 360p, MessagePack). `dotnet test` va `ng test` bilan qayta sanab, 3.6-jadval, 3.21-rasm, xulosa va taqdimotni yangilash kerak.
6. **Klient interfeysida “Hikoya” → “Lavha”.** Diplomda “Lavhalar” deyilgan, interfeysda hali “Hikoya” turibdi. Skrinshotlar ko'rsatiladigan bo'lsa, buni moslash kerak.
7. **Eski taqdimotlar.** `diplom/Milliy chat — BMI himoyasi*.pptx` qo'lda tayyorlangan eski fayllar, ularda HFX hisoblari va eski ma'lumotlar qolgan. Asosiy taqdimot — `Taqdimot_Sohinazarov_Sardor.pptx`.
