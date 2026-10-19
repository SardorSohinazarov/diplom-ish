# Diplom — ilmiy rahbar izohlari (2026-10-17)

> Bu fayl boshqa kompyuterda / yangi suhbatda davom etish uchun yozilgan.
> **Holati:** bajarildi (`2eb7206`). Hozirgi holat va qolgan ishlar: [DAVOM-ETTIRISH.md](DAVOM-ETTIRISH.md).
> Foydalanuvchi "boshla" demaguncha `diplom/` ga tegilmaydi. Boshlashdan oldin batafsil reja ko'rsatilib, tasdiq olinadi.
> Hammasi bir martada qo'llanadi: izohlar + kodning yangi imkoniyatlari + yangi sonlar.

## Izohlar

1. **Annotatsiya** qisqaroq bo'lsin, faqat shu diplomdagi ma'lumotlar haqida yozilsin. 3 tildagi annotatsiya (o'zbek, rus, ingliz) **bitta varaqqa** sig'sin.
2. "Bitiruv malakaviy ishi" o'rniga **hamma joyda "Diplom loyihasi"** yozilsin: titul, annotatsiya, hujjatlar (rahbar xulosasi, taqriz), taqdimot.
3. Mundarijada har bir bo'lim ostidagi **kichik bo'limlar 3 tadan oshmasin**.
4. **ILOVALAR** ostidagi kichik bo'limlar mundarijadan olib tashlansin.
5. **Nofunksional talablar** qisqartirilsin.
6. **Rasmlar sahifaga sig'sin.** Rasm katta bo'lib keyingi sahifaga o'tib ketsa, oldingi sahifada katta bo'sh joy qolmasin.
7. **Rasmlar faqat tik** sahifada bo'lsin, albom sahifa ishlatilmasin. `landscapeFigure()` bo'limlari olib tashlanadi. 2.3-rasmdagi ER-diagramma ikkiga bo'linadi: "foydalanuvchilar va sessiyalar", "chatlar va guruhlar".
8. **2.5. Xavfsizlikni loyihalash** qisqartirilsin.
9. III-BOB sarlavhasidan keyingi kirish matni olib tashlansin: "Ushbu bobda loyihalangan tizimning dasturiy amalga oshirilishi yoritiladi. Server qismi 236 ta C# faylidan …"
10. Stories uchun "Hikoyalar" emas, **"Lavhalar"** yozilsin. Birinchi uchragan joyda "Lavhalar (Stories)" deb beriladi. Yakuniy atamani boshlashdan oldin foydalanuvchi bilan tasdiqlash kerak.
11. **Adabiyotlar** ro'yxatidan standartlar (GOST, ISO va h.k.) olib tashlansin. O'rniga messenjerlar, .NET va Angular haqidagi adabiyotlar kiritilsin.
12. Boblar ichidagi **kod parchalari kamaytirilsin**: faqat eng muhimlari qolsin yoki umuman olib tashlansin, ilovadagisi yetadi.
13. **3-bob hajmi 50–55 bet** bo'lsin. Hozir butun hujjat 84 bet, maqsad taxminan 100 bet. Kod olib tashlangach, bo'shagan joy yangi imkoniyatlarning tavsifi bilan to'ldiriladi: forum, reaksiyalar, bloklash, lavhalar lentasi, desktop bildirishnomalar. Tavsif skrinshot va jadvallar bilan beriladi.
14. "Ishning natijasi" emas, **"Diplom loyihasi natijasi"** yozilsin.

## Generatsiya bo'yicha kelishuv (kam resurs, kam vaqt)

- Boblar alohida modul (`diplom/generator/content/*.mjs`). Ular bob-bob yangilanadi, `node build.mjs` esa bir necha soniyada bitta `.docx` ga yig'adi.
- Tayyor `.docx` yoki `.pdf` fayllar keyin birlashtirilmaydi: mundarija, sahifa va rasm raqamlari buziladi.
- Rejadagi yaxshilanishlar:
  - `build.mjs --only bob2` bayrog'i: bitta bobni tez ko'rib chiqish uchun;
  - diagrammalarni faqat o'zgarganda qayta chizish;
  - `rasmlar/` ni siqish (hozir 13 MB).
- Word orqali PDF eksport (`tools/export-pdf.ps1`) faqat eng oxirida bir marta qilinadi. Undan keyin `slides.mjs` va `hujjatlar.mjs` ishga tushiriladi.
