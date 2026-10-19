# Davom ettirish uchun holat (2026-10-19)

> Boshqa kompyuterda yoki yangi suhbatda ishni davom ettirish uchun yozildi.
> Asosiy repo: `diplom-rahbar-izohlari` branch'i. Submodullar: `NationalChat` (`master`), `NationalChatClient` (`main`).

## Boshqa kompyuterda boshlash

```bash
git clone --recurse-submodules https://github.com/SardorSohinazarov/diplom-ish.git
cd diplom-ish
git checkout diplom-rahbar-izohlari
git submodule update --init --recursive
cd diplom/generator && npm ci
```

- Diplom: `node build.mjs` → `diplom/Diplom_ishi_Sohinazarov_Sardor.docx`.
- PDF (Word kerak, Windows): `powershell -File tools/export-pdf.ps1 ..\Diplom_ishi_Sohinazarov_Sardor.docx ..\Diplom_ishi_Sohinazarov_Sardor.pdf`. Skript mundarijani ham yangilaydi.
- Taqdimot: `node slides.mjs`, keyin `powershell -File tools/export-slides.ps1 ../Taqdimot_Sohinazarov_Sardor.pptx <png-papka> ../Taqdimot_Sohinazarov_Sardor.pdf`.
- Rahbar xulosasi va taqriz: `node hujjatlar.mjs`.
- `tools/icons.mjs` va skrinshot skriptlari Chrome'ni `C:/Program Files/Google/Chrome/Application/chrome.exe` dan qidiradi.

## Bajarilgan ishlar

### Diplom (asosiy repo)

| Commit | Nima qilindi |
|---|---|
| `2eb7206` | Rahbarning 14 ta izohi bo'yicha diplom qayta generatsiya qilindi ([REJA-rahbar-izohlari.md](REJA-rahbar-izohlari.md), [REJA-qayta-generatsiya.md](REJA-qayta-generatsiya.md)) |
| `ff9666f` | IV bobdan (HFX) rahbar qizil bilan belgilagan qismlar olib tashlandi: sun'iy yoritish hisobi, shamollatish, mehnat rejimi va elektr xavfsizligi, evakuatsiya vaqti hisobi (4.1–4.9 formulalar, 4.2-rasm, 4.4–4.5-jadvallar). Rasmlar qayta raqamlandi (evakuatsiya reja-sxemasi 4.2, yong'in algoritmi 4.3), bob xulosasi va umumiy xulosa moslashtirildi. Taqdimotning HFX slaydida hisob natijalari o'rniga me'yorlar qo'yildi. `.docx`, `.pdf`, taqdimot `.pptx` va `.pdf` qayta yaratildi |
| `890c1f0` | `NationalChatClient` submoduli `c64cc84` ga yangilandi |

Rahbar yuborgan faylda (`Downloads/Telegram Desktop/Diplom_ishi_Sohinazarov_Sardor.docx`) qizil qismdan boshqa matn farqi yo'q edi. Qolgan farqlar faqat Word qayta saqlaganidan kelib chiqqan: mundarija maydoni, qo'shtirnoqlarning yozilishi.

### Klient (`NationalChatClient`, `c64cc84`, push qilingan va qales.uz'ga deploy qilingan)

- Lavha ko'rish oynasidagi progress chizig'i endi media ochilgandan keyin boshlanadi:
  - rasmda 5 soniyalik taymer va animatsiya `<img>` ning `load`/`error` hodisasidan keyin ishga tushadi;
  - videoda chiziq `timeupdate` bo'yicha o'ynalgan qismiga qarab to'ladi, yuklanguncha bo'sh turadi.
- Fayllar: `src/app/features/chat/stories/story-viewer/story-viewer.component.{ts,html,scss}` va yangi `story-viewer.component.spec.ts` (2 ta test).
- 353 ta test, `npm run build` va CSP tekshiruvi o'tdi. Serverdagi bundle yangi build bilan bir xil ekani tekshirildi. Brauzerda qo'lda sinab ko'rilmagan.

## Hujjatning hozirgi holati

- 84 bet, 14 535 so'z.
- Boblar: Kirish 6 · I bob 9–16 · II bob 17–34 · III bob 35–62 · IV bob 63–71 · Xulosa 72 · Adabiyotlar 74 · Ilovalar 78.

## Tugallanmagan / tekshirilishi kerak

1. **Hajm (rahbar izohi 13).** Maqsad: butun hujjat ~100 bet, III bob 50–55 bet. Hozir hujjat 84 bet, III bob ~28 bet. HFX hisoblari olib tashlangani uchun hajm yana biroz kamaydi. Rahbar shu talabda turibdimi, aniqlash kerak. Turgan bo'lsa, III bob yangi imkoniyatlar tavsifi, skrinshotlar va jadvallar bilan to'ldiriladi: forum, reaksiyalar, bloklash, lavhalar lentasi, desktop bildirishnomalar, 360p video nusxa, rasm outbox'i, delta sync.
2. **Atama "Lavhalar".** Diplomda "Lavhalar (Stories)" ishlatilgan. Klient interfeysida esa hali "Hikoya" yozilgan, masalan lavha ko'rish oynasida: `aria-label="Hikoya ko‘rish oynasi"`, "Hikoyani o‘chirish". Himoyada skrinshot ko'rsatiladigan bo'lsa, interfeysni ham "Lavha"ga o'tkazish kerak bo'ladi.
3. **`diplom/Milliy chat — BMI himoyasi.pptx`** — generatordan yaratilmagan, qo'lda tayyorlangan eski taqdimot (2026-10-03). Unda olib tashlangan HFX hisob natijalari (421 lk, evakuatsiya vaqti) qolgan bo'lishi mumkin. Ishlatilsa, tekshirilsin. Asosiy taqdimot — `Taqdimot_Sohinazarov_Sardor.pptx`.
4. Rahbar xulosasi va taqriz bu safar qayta yaratilmadi: ularda IV bob haqida faqat "ergonomika va evakuatsiya tadbirlari" deyilgan, bu hozir ham to'g'ri.
5. `diplom-rahbar-izohlari` branch'i hali `master`ga birlashtirilmagan.
