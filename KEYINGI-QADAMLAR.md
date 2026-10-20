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
4. **Hajm.** Rahbar ~100 bet so'ragan, hozir 91 bet. Kerak bo'lsa, III bobni yangi imkoniyatlar bilan to'ldirish mumkin: sekin internetga moslashuv (rasm siqish, 360p video, outbox), delta sync, kesh.
5. **Nofunksional talablar** (taklif qilingan, hali qo'shilmagan): moslik (brauzerlar, 375 px), mavjudlik va zaxira nusxa, sekin internet (3G'da ochilish vaqti), foydalanish qulayligi (kontrast, klaviatura), qonunga moslik, monitoring, OWASP Top 10. Yuklama bo'yicha raqamlarni faqat haqiqiy sinovdan keyin yozish kerak (RTM taqrizida ham yuklama sinovlari tavsiya qilingan).
6. **Klient interfeysida “Hikoya” → “Lavha”.** Diplomda “Lavhalar” deyilgan, interfeysda hali “Hikoya” turibdi. Skrinshotlar ko'rsatiladigan bo'lsa, buni moslash kerak.
7. **Eski taqdimotlar.** `diplom/Milliy chat — BMI himoyasi*.pptx` qo'lda tayyorlangan eski fayllar, ularda HFX hisoblari va eski ma'lumotlar qolgan. Asosiy taqdimot — `Taqdimot_Sohinazarov_Sardor.pptx`.
8. **Humo ma'lumotlari** faqat Kun.uz (2023) maqolasiga asoslangan. Rahbar yangiroq manba so'rasa, uni yangilash kerak.
