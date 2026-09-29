// IV bob — Hayot faoliyati xavfsizligi.
// Topics given by the HFX consultant (S. Abdullayeva):
//   1) Dasturchining ergonomik ish joyini tashkil etish;
//   2) Evakuatsiya tadbirlarini rejalashtirish hamda avariya va yong‘inlar sodir bo‘lganda xodimlarning harakatlari.
import { bullets, figure, formula, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter4 = () => [
  h1('IV-bob. Hayot faoliyati xavfsizligi'),
  p(
    'Hayot faoliyati xavfsizligi inson faoliyatidagi xavfli va zararli omillarni aniqlash, ularning ta’sirini kamaytirish hamda favqulodda vaziyatlarda odamlar hayoti va sog‘lig‘ini saqlashga qaratilgan chora-tadbirlar tizimidir [21]. “Milliy chat” kabi dasturiy mahsulotni ishlab chiqish jamoasi ish vaqtining asosiy qismini kompyuter qarshisida o‘tkazgani uchun bobda ikki masala ko‘rib chiqiladi: dasturchining ergonomik ish joyini tashkil etish hamda IT-ofisda evakuatsiyani rejalashtirish va avariya yoki yong‘inda xodimlarning harakatlari.',
  ),

  // ───────────────────────────────── 4.1
  h2('4.1. Dasturchining ergonomik ish joyini tashkil etish'),
  ...ps(
    'Ergonomika (yunoncha ~ergon~ — ish va ~nomos~ — qonun) inson, mehnat vositalari va ish muhitining o‘zaro moslashuvini o‘rganadi: ergonomik ish joyida jihozlar insonning antropometrik va fiziologik xususiyatlariga moslashtiriladi. Dasturchi mehnati aqliy mehnat bo‘lib, unda diqqatni uzoq jamlash va ko‘rish organlariga yuqori yuklama ustunlik qiladi, jismoniy yuklama esa kam va asosan statik bo‘ladi.',
    'Dasturchining ish joyidagi asosiy xavfli va zararli omillar quyidagilar:',
  ),
  ...bullets([
    '**ko‘rish analizatoriga yuklama** — ekranga uzoq tikilish ko‘zning quruqlashishi va charchashiga (“kompyuter ko‘rish sindromi”) olib keladi;',
    '**statik yuklama va gipodinamiya** — noto‘g‘ri o‘tirish bo‘yin, yelka va bel og‘riqlarini keltirib chiqaradi;',
    '**takroriy harakatlar** — klaviatura va sichqoncha bilan uzoq ishlash bilak (tunnel) sindromiga sabab bo‘lishi mumkin;',
    '**noqulay mikroiqlim, yoritish va shovqin** — jihozlarning issiqligi, quruq havo, ekrandagi yaltirash, ventilyator va suhbatlar shovqini;',
    '**elektr toki urish xavfi** — shikastlangan kabellar va yerga ulanmagan jihozlar;',
    '**psixoemotsional zo‘riqish** — muddatlar bosimi, tungi navbatchiliklar va tizim avariyalarini bartaraf etish.',
  ]),
  p(
    'Ish joyiga qo‘yiladigan talablar Mehnat kodeksi, “Mehnatni muhofaza qilish to‘g‘risida”gi Qonun, sanitariya qoidalari hamda ISO 9241-5, GOST 12.2.032-78, GOST 12.1.005-88 va KMK 2.01.05-98 standartlari bilan belgilanadi [3, 4, 34, 36, 37, 39].',
  ),

  h3('Ish xonasiga qo‘yiladigan talablar.'),
  p(
    'Bitta kompyuterli ish joyiga kamida 6 m² maydon va 20 m³ hajm to‘g‘ri kelishi kerak. Monitorlar derazaga nisbatan yon tomondan, yorug‘lik chapdan tushadigan qilib joylashtiriladi: deraza ekran orqasida bo‘lsa ko‘z doimo moslashishga majbur bo‘ladi, xodim orqasida bo‘lsa ekranda yaltirash hosil bo‘ladi. Monitorlar orasidagi masofa oldi-orqa bo‘yicha kamida 2 m, yonma-yon kamida 1,2 m bo‘ladi. Devor va shift matli materiallar bilan pardozlanadi, xona har kuni nam usulda tozalanadi va shamollatiladi.',
  ),

  h3('Ish joyi jihozlarining ergonomik parametrlari.'),
  p(
    'Dasturchining ish joyi ish stoli, sozlanadigan stul, monitor, klaviatura, sichqoncha va zarur bo‘lsa oyoq tayanchidan iborat. Ularning tavsiya etiladigan o‘lchamlari 4.1-jadvalda, xodimning to‘g‘ri gavda holati esa 4.1-rasmda keltirilgan.',
  ),
  ...table(
    '4.1',
    'Ish joyi elementlarining ergonomik parametrlari',
    ['Element', 'Parametr', 'Tavsiya etiladigan qiymat'],
    [
      ['Ish stoli', 'Ish yuzasining balandligi', '680–800 mm (sozlanmaydigan stol uchun 725 mm)'],
      ['', 'Ish yuzasining o‘lchamlari', 'eni 800–1400 mm, chuqurligi 800–1000 mm'],
      ['', 'Oyoqlar uchun bo‘shliq', 'balandligi ≥ 600 mm, eni ≥ 500 mm, chuqurligi tizza sathida ≥ 450 mm, oyoq sathida ≥ 650 mm'],
      ['Stul', 'O‘rindiq balandligi', '400–550 mm, sozlanadigan'],
      ['', 'O‘rindiqning eni va chuqurligi', 'kamida 400 mm, old qirrasi yumaloqlangan'],
      ['', 'Suyanchiq', 'balandligi 300 ± 20 mm, eni ≥ 380 mm, qiyalik burchagi 0…30° oralig‘ida sozlanadi'],
      ['', 'Qo‘l tayanchlari', 'uzunligi ≥ 250 mm, eni 50–70 mm, balandligi sozlanadi'],
      ['Monitor', 'Ko‘zdan ekrangacha masofa', '500–700 mm'],
      ['', 'Joylashuv balandligi', 'ekranning yuqori cheti ko‘z sathida yoki undan pastroq, nigoh ekran markaziga 15–20° pastga yo‘naladi'],
      ['Klaviatura', 'Stol chetidan masofa', '100–300 mm, bilak uchun tayanch joy qoldiriladi'],
      ['Oyoq tayanchi', 'O‘lchamlari', 'eni ≥ 300 mm, chuqurligi ≥ 400 mm, qiyaligi 0…20°'],
    ],
    [2.2, 3.6, 6],
  ),
  ...figure('4-1-workstation.png', '4.1', 'Kompyuterda ishlovchi xodimning to‘g‘ri gavda holati va ish joyining asosiy o‘lchamlari', 15.5),
  p(
    'To‘g‘ri gavda holatining asosiy qoidasi — “to‘g‘ri burchaklar”: tirsaklar 90–100°, son-chanoq bo‘g‘imlari 90–110° va tizzalar taxminan 90° bukiladi, oyoqlar polga to‘liq tiraladi, bel suyanchiqqa tayanadi, bilaklar klaviatura ustida to‘g‘ri tutiladi. Ikki monitor bilan ishlaganda asosiysi ro‘parada, ikkinchisi yonida bir xil masofada joylashtiriladi, noutbuk ekrani esa tagliklar bilan ko‘z sathiga ko‘tariladi. Dasturiy interfeys ham ergonomik bo‘lishi kerak (ISO 9241-110): “Milliy chat”dagi yetarli kontrast, qorong‘i mavzu va moslashuvchan maket foydalanuvchilarning ko‘z charchog‘ini kamaytiradi.',
  ),

  h3('Mikroiqlim, yoritish va shovqin.'),
  p(
    'Dasturchi mehnati energiya sarfi bo‘yicha Ia toifadagi yengil ishlarga kiradi [37] (energiya sarfi 139 W gacha). Bunday ishlar uchun ish zonasi mikroiqlimining maqbul ko‘rsatkichlari, yoritilganlik va shovqin me’yorlari 4.2-jadvalda keltirilgan.',
  ),
  ...table(
    '4.2',
    'Dasturchi ish joyi uchun mikroiqlim, yoritilganlik va shovqin me’yorlari',
    ['Ko‘rsatkich', 'Yilning sovuq davri', 'Yilning iliq davri'],
    [
      ['Havo harorati, °C', '22–24', '23–25'],
      ['Nisbiy namlik, %', '40–60', '40–60'],
      ['Havo harakatining tezligi, m/s', '≤ 0,1', '≤ 0,1'],
      ['Stol yuzasining yoritilganligi, lk', '300–500', '300–500'],
      ['Ekran yuzasining yoritilganligi, lk', '≤ 300', '≤ 300'],
      ['Yoritilganlik pulsatsiyasi koeffitsiyenti, %', '≤ 5', '≤ 5'],
      ['Shovqin darajasi, dBA', '≤ 50', '≤ 50'],
    ],
    [5, 3, 3],
  ),
  p(
    'Umumiy yoritish uchun miltillamaydigan, 4000–5000 K rang haroratli diffuzorli LED yoritgichlar monitorlar bilan parallel qatorlarda joylashtiriladi. Shovqinni kamaytirish uchun printerlar alohida joyga chiqariladi, ochiq ofisda tovush yutuvchi panellar o‘rnatiladi, server uskunalari esa alohida xonada joylashtiriladi.',
  ),

  h3('Ish xonasining sun’iy yoritilishini hisoblash.'),
  ...ps(
    'Misol sifatida dasturchilar bo‘limi uchun o‘lchamlari A × B × H = 6 × 6 × 3 m bo‘lgan xonani ko‘rib chiqamiz. Xonaning maydoni S = 36 m², hajmi V = 108 m³. Bitta ish joyiga kamida 6 m² maydon va 20 m³ hajm to‘g‘ri kelishi kerakligidan xonaga joylashtirish mumkin bo‘lgan ish joylari soni:',
  ),
  formula('~n~_{max} = min(~S~ / 6; ~V~ / 20) = min(36 / 6; 108 / 20) = min(6; 5,4) = 5', '4.1'),
  p(
    'Demak, xonada 5 ta ish joyi tashkil etiladi. Umumiy sun’iy yoritish yorug‘lik oqimidan foydalanish koeffitsiyenti usuli bilan hisoblanadi [39]. Avval xona indeksi aniqlanadi:',
  ),
  formula('~i~ = ~A~·~B~ / (~h~·(~A~ + ~B~)),', '4.2'),
  p(
    'bu yerda ~h~ — yoritgichlarning ish yuzasidan balandligi. Yoritgichlar shiftga o‘rnatiladi, ish yuzasi poldan 0,8 m balandlikda joylashgan: ~h~ = 3,0 − 0,8 = 2,2 m. U holda ~i~ = 36 / (2,2 · 12) ≈ 1,36. Shift, devor va polning yorug‘lik qaytarish koeffitsiyentlari mos ravishda 70, 50 va 30 % bo‘lganda LED panellar uchun bu indeksga yorug‘lik oqimidan foydalanish koeffitsiyenti η ≈ 0,54 to‘g‘ri keladi. Kerakli yoritgichlar soni quyidagi formula bilan topiladi:',
    { noIndent: true },
  ),
  formula('~N~ = ~E~_{n}·~S~·~K~_{z}·~z~ / (Φ·η),', '4.3'),
  p(
    'bu yerda ~E~_{n} = 400 lk — me’yoriy yoritilganlik; ~K~_{z} = 1,4 — zaxira koeffitsiyenti (yoritgichlarning ifloslanishi va eskirishini hisobga oladi); ~z~ = 1,1 — yoritilganlikning notekislik koeffitsiyenti; Φ = 3600 lm — bitta yoritgichning yorug‘lik oqimi (600 × 600 mm o‘lchamli, 36 W quvvatli LED panel). Hisoblash natijasi:',
    { noIndent: true },
  ),
  formula('~N~ = 400 · 36 · 1,4 · 1,1 / (3600 · 0,54) = 22 176 / 1944 ≈ 11,4', '4.4'),
  p(
    'Yoritgichlar soni butun songa yaxlitlanadi va simmetrik joylashuv uchun ~N~ = 12 qabul qilinadi (4 ta ustun × 3 ta qator). Haqiqiy o‘rtacha yoritilganlik quyidagiga teng:',
  ),
  formula('~E~_{h} = ~N~·Φ·η / (~S~·~K~_{z}·~z~) = 12 · 3600 · 0,54 / (36 · 1,4 · 1,1) ≈ 421 lk', '4.5'),
  p(
    'Haqiqiy yoritilganlik me’yordan 5 % ga yuqori. Bu ruxsat etilgan −10…+20 % oralig‘ida. Yoritish tizimining umumiy quvvati 12 · 36 = 432 W, solishtirma quvvati 12 W/m². Yoritgichlar va ish joylarining joylashuvi 4.2-rasmda ko‘rsatilgan.',
  ),
  ...figure('4-2-lighting-plan.png', '4.2', 'Dasturchilar xonasida yoritgichlar va ish joylarining joylashuv sxemasi', 14),
  p(
    'Xonani shamollatish uchun zarur havo miqdori bitta xodimga to‘g‘ri keladigan hajmga bog‘liq. Bu hajm 20–40 m³ bo‘lganda (bizda 108 / 5 = 21,6 m³) har bir xodimga soatiga kamida 30 m³ toza havo berilishi kerak:',
  ),
  formula('~L~ = ~n~·~L~_{1} = 5 · 30 = 150 m³/soat;   ~K~ = ~L~ / ~V~ = 150 / 108 ≈ 1,4 soat^{−1}', '4.6'),
  p(
    'Demak, xonada havo soatiga kamida 1,4 marta almashishi kerak. Buni tabiiy shamollatish yetarli bo‘lmaganda kichik quvvatli so‘ruvchi-beruvchi ventilyatsiya yoki rekuperatorli konditsioner ta’minlaydi.',
  ),

  h3('Mehnat va dam olish rejimi, elektr xavfsizligi.'),
  ...ps(
    'Kompyuterda uzluksiz ish 2 soatdan oshmasligi, har 45–60 daqiqada 5–10 daqiqalik tanaffus qilinishi tavsiya etiladi; tanaffusda ekrandan uzoqlashib, yengil mashqlar bajariladi. Ko‘z charchog‘ini kamaytirish uchun “20-20-20” qoidasi qo‘llanadi: har 20 daqiqada 20 soniya davomida 6 m uzoqlikdagi narsaga qaraladi. Ish beruvchi xodimlarni davriy tibbiy ko‘rik va yo‘riqnomadan o‘tkazadi, bu talablar masofadan ishlaganda ham amal qiladi.',
    'Barcha jihozlar yerga ulash kontaktli rozetkalarga ulanadi, kabellar kanallarda yotqiziladi. Uzaytirgichlarni ketma-ket ulash, shikastlangan kabellardan foydalanish va jihoz korpusini ochish taqiqlanadi, server uskunalari esa UPS orqali ulanadi.',
  ),

  // ───────────────────────────────── 4.2
  h2('4.2. Evakuatsiya tadbirlarini rejalashtirish hamda avariya va yong‘inlar sodir bo‘lganda xodimlarning harakatlari'),
  ...ps(
    'Favqulodda vaziyat — avariya, halokat, tabiiy ofat yoki boshqa hodisa natijasida odamlar hayoti, sog‘lig‘i va atrof-muhitga zarar yetishi mumkin bo‘lgan holat. IT-ofis uchun eng ehtimoliy vaziyatlar yong‘in, zilzila (Toshkent yuqori seysmik faollik zonasida joylashgan), elektr ta’minotidagi avariya, quvurlarning yorilishi va gaz sizishidir. Bunday vaziyatlarda xodimlar hayotini saqlashning asosiy usuli o‘z vaqtida va tartibli evakuatsiyadir.',
    'Asosiy talablar “Favqulodda vaziyatlarda aholini va hududlarni muhofaza qilish to‘g‘risida”gi, “Yong‘in xavfsizligi to‘g‘risida”gi qonunlar va GOST 12.1.004-91 standarti bilan belgilanadi [5, 6, 38].',
  ),

  h3('IT-ofisda yong‘in chiqish sabablari va o‘t o‘chirish vositalari.'),
  ...ps(
    'Ofis yong‘inlarining aksariyati elektr tarmog‘i bilan bog‘liq: tarmoqning ortiqcha yuklanishi, eskirgan izolyatsiya tufayli qisqa tutashuv, noutbuk va powerbanklarning litiy-ion akkumulyatorlari qizib ketishi, UPS nosozligi va qarovsiz qoldirilgan maishiy jihozlar. Ofis materiallari yonganda ko‘p zaharli tutun ajraladi va qurbonlarning aksariyati aynan tutundan jabrlanadi, shuning uchun tutunni erta aniqlash va tezkor evakuatsiya hal qiluvchi ahamiyatga ega.',
    'Bino avtomatik yong‘in signalizatsiyasi, xabardor qilish tizimi va birlamchi o‘t o‘chirish vositalari bilan jihozlanadi, server xonasida esa avtomatik gazli o‘t o‘chirish tizimi o‘rnatiladi. Yong‘in sinflari va o‘chirish vositalari 4.3-jadvalda keltirilgan.',
  ),
  ...table(
    '4.3',
    'Yong‘in sinflari va o‘t o‘chirish vositalari',
    ['Sinf', 'Yonuvchi material', 'Qo‘llaniladigan vositalar'],
    [
      ['A', 'Qattiq materiallar: qog‘oz, yog‘och, mato, plastmassa', 'suv, ko‘pikli va kukunli (ABCE) o‘t o‘chirgichlar, ichki yong‘in krani'],
      ['B', 'Yonuvchi suyuqliklar: erituvchilar, bo‘yoqlar, yoqilg‘i', 'ko‘pikli, kukunli va karbonat angidridli o‘t o‘chirgichlar'],
      ['C', 'Yonuvchi gazlar: tabiiy gaz, propan', 'kukunli o‘t o‘chirgichlar; avvalo gaz berilishi to‘xtatiladi'],
      ['D', 'Metallar: magniy, natriy, alyuminiy kukuni', 'maxsus kukunli o‘t o‘chirgichlar'],
      ['E', 'Kuchlanish ostidagi elektr jihozlari', 'karbonat angidridli (OU) va kukunli o‘t o‘chirgichlar; suv va ko‘pik ishlatilmaydi'],
    ],
    [1, 5, 6],
  ),
  p(
    'Kompyuter xonalarida elektr o‘tkazmaydigan va qoldiq qoldirmaydigan karbonat angidridli o‘t o‘chirgichlar (OU-3, OU-5) ishlatiladi; ularning karnayi −70 °C gacha sovigani uchun qo‘l bilan ushlanmaydi. O‘t o‘chirgichlar poldan 1,5 m dan baland bo‘lmagan ko‘rinadigan joyga, bir-biridan 20 m dan uzoq bo‘lmagan masofada osiladi.',
  ),

  h3('Evakuatsiya tadbirlarini rejalashtirish.'),
  p(
    'Evakuatsiya — odamlarni xavfli omillar ta’sir qila boshlashidan oldin binodan xavfsiz hududga uyushgan holda chiqarish jarayoni. Uni rejalashtirish texnik va tashkiliy tadbirlardan iborat. Texnik tadbirlar:',
  ),
  ...bullets([
    'har bir qavatda kamida ikkita, bir-biridan uzoqda joylashgan evakuatsiya chiqishi;',
    'yo‘laklar kengligi kamida 1–1,2 m, eshiklar kamida 0,8 m; eshiklar chiqish tomonga va ichkaridan kalitsiz ochiladi; yo‘l va zinalarni to‘sib qo‘yish taqiqlanadi;',
    'avariya yoritishi, ISO 7010 bo‘yicha yashil “Favqulodda chiqish” belgilari [35], yong‘in signalizatsiyasi va ovozli xabardor qilish tizimi;',
    'har bir qavatda fotolyuminessent materialdan tayyorlangan evakuatsiya reja-sxemalari.',
  ]),
  p(
    'Reja-sxemada qavat rejasi, “Siz shu yerdasiz” belgisi, asosiy (yashil yaxlit) va zaxira (yashil punktir) yo‘llar, chiqishlar, o‘t o‘chirgichlar va xabarlagichlar ko‘rsatiladi. Namunaviy IT-ofis 3-qavatining reja-sxemasi 4.3-rasmda keltirilgan.',
  ),
  ...figure('4-3-evacuation-plan.png', '4.3', 'IT-kompaniya ofisi 3-qavatining evakuatsiya reja-sxemasi (namuna)', 16),
  p('Tashkiliy tadbirlar:'),
  ...bullets([
    'rahbar buyrug‘i bilan yong‘in xavfsizligi uchun mas’ul shaxs va har bir qavat bo‘yicha evakuatsiya mas’ullari tayinlanadi;',
    'binodan tashqarida xodimlar yig‘iladigan joy belgilanadi va ro‘yxatlar tayyorlanadi;',
    'xodimlar kirish va davriy yo‘riqnomadan o‘tkaziladi, yarim yilda kamida bir marta amaliy mashg‘ulot o‘tkaziladi;',
    'o‘t o‘chirish vositalari, signalizatsiya va avariya yoritishining sozligi muntazam tekshiriladi.',
  ]),

  h3('Evakuatsiya vaqtini hisoblash.'),
  ...ps(
    'Evakuatsiya yo‘llarining yetarliligini baholash uchun hisobiy evakuatsiya vaqti aniqlanadi. Hisoblash GOST 12.1.004-91 standartida keltirilgan odamlar oqimining harakat parametrlari asosida soddalashtirilgan usulda bajariladi [38]. Evakuatsiya yo‘li o‘lchamlari va odamlar soni bir xil bo‘lgan uchastkalarga ajratiladi. Har bir uchastkadagi odamlar oqimining zichligi quyidagicha aniqlanadi:',
  ),
  formula('~D~_{i} = ~N~_{i}·~f~ / (~l~_{i}·δ_{i}),', '4.7'),
  p(
    'bu yerda ~N~_{i} — uchastkadagi odamlar soni; ~f~ = 0,1 m² — yozgi kiyimdagi katta yoshli odamning gorizontal proyeksiya maydoni; ~l~_{i} va δ_{i} — uchastkaning uzunligi va kengligi, m. Zichlikka qarab 4.4-jadvaldan harakat tezligi ~v~_{i} va oqim intensivligi ~q~_{i} olinadi. Uchastkadan o‘tish vaqti va umumiy hisobiy evakuatsiya vaqti:',
    { noIndent: true },
  ),
  formula('~t~_{i} = ~l~_{i} / ~v~_{i};   ~t~_{h} = ~t~_{1} + ~t~_{2} + … + ~t~_{n}', '4.8'),
  p(
    'Eshiklar va yo‘l torayadigan joylarda tirbandlik bor-yo‘qligi oqim intensivligi orqali tekshiriladi:',
  ),
  formula('~q~_{e} = ~q~_{i}·δ_{i} / δ_{e} ≤ ~q~_{max},', '4.9'),
  p(
    'bu yerda δ_{e} — eshik kengligi; ~q~_{max} = 19,6 m/min — eshikdan o‘tishdagi oqim intensivligining eng katta qiymati. Bu shart bajarilsa, eshik oldida odamlar to‘planib qolmaydi.',
    { noIndent: true },
  ),
  ...table(
    '4.4',
    'Odamlar oqimining harakat parametrlari (GOST 12.1.004-91 bo‘yicha, parcha)',
    ['Oqim zichligi D, m²/m²', 'Gorizontal yo‘l: v, m/min', 'Gorizontal yo‘l: q, m/min', 'Eshik: q, m/min', 'Zinadan pastga: v, m/min', 'Zinadan pastga: q, m/min'],
    [
      ['0,01', '100', '1,0', '1,0', '100', '1,0'],
      ['0,05', '100', '5,0', '5,0', '100', '5,0'],
      ['0,10', '80', '8,0', '8,7', '95', '9,5'],
      ['0,20', '60', '12,0', '13,4', '68', '13,6'],
      ['0,30', '47', '14,1', '16,5', '52', '15,6'],
      ['0,40', '40', '16,0', '18,4', '40', '16,0'],
      ['0,50', '33', '16,5', '19,6', '31', '15,5'],
    ],
    [2.2, 2, 2, 1.7, 2, 2],
  ),
  ...ps(
    '4.3-rasmdagi qavat uchun hisoblashni bajaramiz. Qavatda 45 nafar xodim ishlaydi. Eng og‘ir holat ko‘rib chiqiladi: 2-zina yong‘in tufayli to‘sib qo‘yilgan va barcha xodimlar asosiy (1-) zina orqali chiqadi. Hisobiy yo‘l dasturchilar bo‘limining eng uzoq ish joyidan boshlanadi va to‘rtta uchastkadan iborat:',
  ),
  ...numbered([
    'dasturchilar bo‘limi ichidagi o‘tish joyi: ~l~_{1} = 12 m, δ_{1} = 1,5 m, ~N~_{1} = 20 kishi;',
    'yo‘lak: bo‘lim eshigidan zinagacha ~l~_{2} = 17 m, δ_{2} = 2,0 m, ~N~_{2} = 45 kishi;',
    '3-qavatdan 1-qavatgacha zina marshlari va maydonchalari: ~l~_{3} = 2 · 10 = 20 m, δ_{3} = 1,35 m, ~N~_{3} = 45 kishi;',
    '1-qavat vestibyulidan tashqi chiqishgacha: ~l~_{4} = 15 m, δ_{4} = 3,0 m, ~N~_{4} = 45 kishi.',
  ]),
  p(
    'Masalan, birinchi uchastka uchun ~D~_{1} = 20 · 0,1 / (12 · 1,5) ≈ 0,11. 4.4-jadvaldagi qiymatlar orasida chiziqli interpolyatsiya qilib ~v~_{1} ≈ 78 m/min va ~q~_{1} ≈ 8,4 m/min topiladi, ~t~_{1} = 12 / 78 ≈ 0,15 min. Qolgan uchastkalar ham xuddi shunday hisoblanadi. Natijalar 4.5-jadvalda keltirilgan.',
  ),
  ...table(
    '4.5',
    'Evakuatsiya vaqtini hisoblash natijalari',
    ['Uchastka', 'l, m', 'δ, m', 'N, kishi', 'D, m²/m²', 'v, m/min', 't, min'],
    [
      ['1. Bo‘lim ichidagi o‘tish joyi', '12', '1,5', '20', '0,11', '78', '0,15'],
      ['2. Yo‘lak', '17', '2,0', '45', '0,13', '74', '0,23'],
      ['3. Zina (pastga)', '20', '1,35', '45', '0,17', '77', '0,26'],
      ['4. Vestibyul', '15', '3,0', '45', '0,10', '80', '0,19'],
      ['Jami hisobiy evakuatsiya vaqti t_{h}', '', '', '', '', '', '**0,83**'],
    ],
    [4.4, 1, 1, 1.2, 1.5, 1.4, 1.2],
  ),
  ...ps(
    'Eshiklarda tirbandlik yo‘qligini (4.9) formula bilan tekshiramiz. Bo‘lim eshigi (δ = 1,2 m): ~q~ = 8,4 · 1,5 / 1,2 ≈ 10,5 m/min. Zinaga kirish eshigi (δ = 1,2 m): ~q~ = 9,3 · 2,0 / 1,2 ≈ 15,5 m/min. Tashqi eshik (δ = 1,5 m): ~q~ = 8,0 · 3,0 / 1,5 = 16,0 m/min. Barcha qiymatlar ~q~_{max} = 19,6 m/min dan kichik, ya’ni odamlar oqimi to‘xtovsiz harakatlanadi.',
    'Demak, hisobiy evakuatsiya vaqti ~t~_{h} ≈ 0,83 min (taxminan 50 soniya), evakuatsiya boshlanishidagi 1 daqiqalik kechikish bilan esa qavatdan to‘liq chiqish taxminan 2 daqiqa oladi. Bu vaqt yong‘in xavfli omillari evakuatsiya yo‘llarida kritik qiymatga yetish vaqtidan kichik bo‘lishi shart. Eng tor joy zina bo‘lgani uchun zinaga olib boradigan eshiklar o‘zi yopiladigan, lekin qulflanmagan bo‘lishi, zina maydonchalarida esa buyum saqlanmasligi kerak.',
  ),

  h3('Yong‘in sodir bo‘lganda xodimlarning harakatlari.'),
  p(
    'Yong‘in chiqqanda vahimaga tushmasdan, oldindan o‘rgatilgan tartibda harakat qilish kerak (4.4-rasm):',
  ),
  ...numbered([
    'Yong‘in yoki tutunni sezgan xodim xabarlagichni bosadi va 101 (yoki 112) raqamiga manzil, qavat, nima yonayotgani va odamlar bor-yo‘qligini aytadi, so‘ng mas’ul shaxsga xabar beradi.',
    'Yong‘in endi boshlangan va bu xavfsiz bo‘lsa, jihozlar tarmoqdan uziladi va birlamchi vositalar bilan o‘chiriladi; kuchlanish ostidagi jihozga suv sepilmaydi.',
    'Yong‘inni 1–2 daqiqada o‘chirib bo‘lmasa, reja-sxemadagi eng yaqin chiqish orqali evakuatsiya boshlanadi; liftdan foydalanish taqiqlanadi.',
    'Xonadan chiqqanda eshik yopiladi, lekin qulflanmaydi; derazalar ochilmaydi.',
    'Tutunli yo‘lakda engashib harakatlaniladi, burun va og‘iz ho‘l mato bilan to‘siladi.',
    'Yig‘ilish joyida qavat mas’uli xodimlarni ro‘yxat bo‘yicha sanaydi va yetib kelmaganlar haqida o‘t o‘chiruvchilarga xabar beradi; ruxsatsiz binoga qaytilmaydi.',
  ]),
  ...figure('4-4-fire-actions.png', '4.4', 'Yong‘in sodir bo‘lganda xodimlarning harakatlar algoritmi', 11, 17),
  p(
    'Mas’ul shaxs evakuatsiyani boshqaradi, ventilyatsiya va konditsionerlarni o‘chirishni tashkil etadi (ular tutunni tarqatadi) va o‘t o‘chirish bo‘linmasini kutib oladi. Kiyimga olov tushsa, yugurmasdan yerga yotib dumalash yoki qalin mato bilan o‘rab o‘chirish kerak; kuygan joy 10–20 daqiqa salqin oqar suvda sovutiladi, zaharlangan odam toza havoga olib chiqiladi va 103 chaqiriladi.',
  ),

  h3('Boshqa avariyalarda xodimlarning harakatlari.'),
  ...bullets([
    '**Zilzila** — zina va liftga yugurilmaydi; mustahkam stol ostiga yoki kapital devor burchagiga yashirinib, derazalar va shkaflardan uzoqlashiladi; silkinish tugagach bino tark etiladi.',
    '**Server xonasida gazli o‘t o‘chirish** — ogohlantiruvchi signalda xona darhol tark etiladi, shamollatilmaguncha unga kirilmaydi.',
    '**Elektr toki urishi** — jabrlanuvchiga yalang qo‘l tegizilmaydi, avval tok manbai o‘chiriladi, so‘ng 103 chaqirilib, zarur bo‘lsa reanimatsiya boshlanadi.',
    '**Gaz sizishi** — olov yoqilmaydi va elektr kalitlariga tegilmaydi, derazalar ochilib, odamlar chiqariladi va 104 ga xabar beriladi.',
  ]),
  p(
    'Xodimlarni tezkor xabardor qilish uchun korporativ aloqa vositalaridan ham foydalanish mumkin. Masalan, “Milliy chat”dagi tashkilotning domen guruhi orqali evakuatsiya haqidagi xabar va yig‘ilish joyi bir necha soniyada barcha xodimlarning telefon va kompyuterlariga yetkaziladi, xodimlar esa xavfsiz joyga yetib kelganini javob bilan tasdiqlaydi. Bu vosita signalizatsiya va ovozli xabardor qilish tizimini to‘ldiradi va ayniqsa masofadan ishlayotgan xodimlar uchun foydali.',
  ),

  h2('4-bob bo‘yicha xulosa'),
  p(
    'To‘rtinchi bobda kompyuter bilan ishlashdagi xavfli va zararli omillar aniqlanib, ish xonasi, jihozlar, mikroiqlim, yoritish va mehnat rejimiga qo‘yiladigan ergonomik talablar keltirildi. 6 × 6 m o‘lchamli xona uchun ish joylari soni (5 ta), sun’iy yoritish (12 ta 36 W li LED yoritgich, 421 lk) va havo almashinuvi (150 m³/soat) hisoblandi. Ikkinchi bo‘limda IT-ofisda yong‘in sabablari, o‘t o‘chirish vositalari va evakuatsiyani rejalashtirish tadbirlari ko‘rib chiqildi, namunaviy qavat uchun reja-sxema ishlab chiqildi. 45 kishilik qavat uchun hisobiy evakuatsiya vaqti 0,83 daqiqa ekani va eshiklarda tirbandlik bo‘lmasligi hisoblab ko‘rsatildi, yong‘in va boshqa avariyalarda xodimlarning harakatlar tartibi berildi.',
  ),
];
