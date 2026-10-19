// IV bob — Hayot faoliyati xavfsizligi.
// Topics given by the HFX consultant (S. Abdullayeva):
//   1) Dasturchining ergonomik ish joyini tashkil etish;
//   2) Evakuatsiya tadbirlarini rejalashtirish hamda avariya va yong‘inlar sodir bo‘lganda xodimlarning harakatlari.
import { bullets, figure, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter4 = () => [
  h1('IV-bob. Hayot faoliyati xavfsizligi'),
  p(
    'Ushbu bobda “Milliy” xabarchini yaratgan dasturchilar jamoasining mehnat sharoitlari hayot faoliyati xavfsizligi [21] nuqtai nazaridan tahlil qilinadi. Loyihadagi ishning deyarli barchasi — server va klient kodini yozish, testlarni ishga tushirish, xabar almashishni bir nechta brauzerda sinash — kompyuter oldida bajariladi, shu bois birinchi navbatda ish joyining ergonomikasi ko‘rib chiqiladi. Ikkinchi masala — jamoa joylashgan ofisda yong‘in yoki boshqa avariya yuz berganda odamlarni xavfsiz chiqarib yuborish rejasini tuzish.',
  ),

  // ───────────────────────────────── 4.1
  h2('4.1. Dasturchining ergonomik ish joyini tashkil etish'),
  ...ps(
    'Ergonomika talablarining mohiyati shundaki, xodim jihozga moslashmasligi, aksincha, stol, stul va monitor xodimning bo‘yi va tana tuzilishiga qarab sozlanishi kerak. Dasturchi uchun bu ayniqsa muhim: uning ishi jismonan yengil ko‘rinsa-da, soatlab bir holatda qimirlamay o‘tirish va ekrandagi mayda matnga diqqatni jamlashni talab qiladi. Bunday yuklama bir kunda sezilmaydi, lekin oylar davomida to‘planib, sog‘liqqa ta’sir qiladi.',
    'Messenjer ishlab chiqish jarayonining xususiyatlaridan kelib chiqib, quyidagi xavfli va zararli omillarni ajratish mumkin:',
  ),
  ...bullets([
    '**ko‘z charchashi** — nigoh kod, log va chat oynalari o‘rtasida doimo ko‘chib turadi, ekranga tikilganda esa ko‘z kamroq qirpiladi; natijada ko‘z quriydi va ko‘rish o‘tkirligi vaqtincha pasayadi;',
    '**bir xil holatda uzoq o‘tirish** — xatoni qidirish yoki kod yozishda xodim soatlab o‘rnidan turmaydi, bu bo‘yin, yelka va belda og‘riq keltirib chiqaradi;',
    '**qo‘l va bilakning takroriy harakatlari** — kun davomida minglab tugma bosish va sichqoncha harakati bilak nervining siqilishiga (tunnel sindromi) olib kelishi mumkin;',
    '**ish muhiti omillari** — kompyuterlardan chiqadigan issiqlik, konditsioner quritgan havo, ekrandagi aks va ochiq ofisdagi suhbatlar;',
    '**elektr xavfi** — bir stolga ko‘plab qurilma (noutbuk, monitorlar, zaryadlovchilar) ulanganda rozetka va uzaytirgichlar ortiqcha yuklanadi;',
    '**asabiy zo‘riqish** — reliz muddatlari, server ishdan chiqqanda uni tezda tiklash zarurati va tungi navbatchiliklar.',
  ]),
  p(
    'Ish joyiga qo‘yiladigan talablar Mehnat kodeksi, “Mehnatni muhofaza qilish to‘g‘risida”gi Qonun, sanitariya qoidalari hamda ISO 9241-5, GOST 12.2.032-78, GOST 12.1.005-88 va KMK 2.01.05-98 standartlari bilan belgilanadi [3, 4].',
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
    'To‘g‘ri gavda holatining asosiy qoidasi — “to‘g‘ri burchaklar”: tirsaklar 90–100°, son-chanoq bo‘g‘imlari 90–110° va tizzalar taxminan 90° bukiladi, oyoqlar polga to‘liq tiraladi, bel suyanchiqqa tayanadi, bilaklar klaviatura ustida to‘g‘ri tutiladi. Ikki monitor bilan ishlaganda asosiysi ro‘parada, ikkinchisi yonida bir xil masofada joylashtiriladi, noutbuk ekrani esa tagliklar bilan ko‘z sathiga ko‘tariladi. Dasturiy interfeys ham ergonomik bo‘lishi kerak (ISO 9241-110): “Milliy” xabarchidagi yetarli kontrast, qorong‘i mavzu va moslashuvchan maket foydalanuvchilarning ko‘z charchog‘ini kamaytiradi.',
  ),

  h3('Mikroiqlim, yoritish va shovqin.'),
  p(
    'Energiya sarfi bo‘yicha dasturchi ishi o‘tirib bajariladigan yengil ishlar qatoriga — Ia toifasiga kiradi: bunda organizm 139 W dan ko‘p energiya sarflamaydi. Shu toifa uchun belgilangan harorat, namlik, yoritilganlik va shovqin chegaralari 4.2-jadvalda jamlangan.',
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

  // ───────────────────────────────── 4.2
  h2('4.2. Evakuatsiya tadbirlarini rejalashtirish hamda avariya va yong‘inlar sodir bo‘lganda xodimlarning harakatlari'),
  ...ps(
    'Ofis uchun favqulodda vaziyat — odamlar hayoti yoki sog‘lig‘iga xavf tug‘diradigan va odatiy ish tartibini buzadigan har qanday hodisa. Dasturchilar ofisida bular, avvalo, yong‘in va zilzila (Toshkent seysmik faol hududda joylashgan), shuningdek elektr ta’minotidagi avariya, quvur yorilishi va gaz sizishidir. Bu vaziyatlarning deyarli barchasida odamlarni saqlab qolishning eng ishonchli yo‘li ularni binodan tez va tartib bilan chiqarishdir.',
    'Asosiy talablar “Favqulodda vaziyatlarda aholini va hududlarni muhofaza qilish to‘g‘risida”gi, “Yong‘in xavfsizligi to‘g‘risida”gi qonunlar va GOST 12.1.004-91 standarti bilan belgilanadi [5, 6].',
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
    'Evakuatsiya deganda tutun, olov yoki qulash xavfi odamlarga yetib kelmasidan oldin ularni belgilangan yo‘llar orqali bino tashqarisidagi xavfsiz joyga chiqarish tushuniladi. U bir necha daqiqada tugashi uchun oldindan tayyorgarlik ko‘riladi: bino mos jihozlanadi (texnik tadbirlar), odamlar esa nima qilishni oldindan biladi (tashkiliy tadbirlar). Texnik tadbirlar:',
  ),
  ...bullets([
    'har bir qavatda kamida ikkita, bir-biridan uzoqda joylashgan evakuatsiya chiqishi;',
    'yo‘laklar kengligi kamida 1–1,2 m, eshiklar kamida 0,8 m; eshiklar chiqish tomonga va ichkaridan kalitsiz ochiladi; yo‘l va zinalarni to‘sib qo‘yish taqiqlanadi;',
    'avariya yoritishi, ISO 7010 bo‘yicha yashil “Favqulodda chiqish” belgilari, yong‘in signalizatsiyasi va ovozli xabardor qilish tizimi;',
    'har bir qavatda fotolyuminessent materialdan tayyorlangan evakuatsiya reja-sxemalari.',
  ]),
  p(
    'Reja-sxemada qavat rejasi, “Siz shu yerdasiz” belgisi, asosiy (yashil yaxlit) va zaxira (yashil punktir) yo‘llar, chiqishlar, o‘t o‘chirgichlar va xabarlagichlar ko‘rsatiladi. Namunaviy IT-ofis 3-qavatining reja-sxemasi 4.2-rasmda keltirilgan.',
  ),
  ...figure('4-3-evacuation-plan.png', '4.2', 'IT-kompaniya ofisi 3-qavatining evakuatsiya reja-sxemasi (namuna)', 16),
  p('Tashkiliy tadbirlar:'),
  ...bullets([
    'rahbar buyrug‘i bilan yong‘in xavfsizligi uchun mas’ul shaxs va har bir qavat bo‘yicha evakuatsiya mas’ullari tayinlanadi;',
    'binodan tashqarida xodimlar yig‘iladigan joy belgilanadi va ro‘yxatlar tayyorlanadi;',
    'xodimlar kirish va davriy yo‘riqnomadan o‘tkaziladi, yarim yilda kamida bir marta amaliy mashg‘ulot o‘tkaziladi;',
    'o‘t o‘chirish vositalari, signalizatsiya va avariya yoritishining sozligi muntazam tekshiriladi.',
  ]),

  h3('Yong‘in sodir bo‘lganda xodimlarning harakatlari.'),
  p(
    'Yong‘in paytida eng katta xavf — vahima va noto‘g‘ri harakatlar. Shu sababli har bir xodim quyidagi tartibni oldindan bilishi kerak (4.3-rasm):',
  ),
  ...numbered([
    'Olov, tutun yoki kuyish hidini birinchi sezgan xodim xabarlagich tugmasini bosadi va 101 (yoki 112) raqamiga qo‘ng‘iroq qilib, bino manzili, qavati, nima yonayotgani va ichkarida odamlar borligini aytadi. Shundan so‘ng qavat mas’uliga xabar beriladi.',
    'Olov endigina paydo bo‘lgan va o‘chirishga urinish xavfli bo‘lmasa, avval jihozlarning toki uziladi, so‘ng eng yaqin o‘t o‘chirgich ishlatiladi. Tok ostidagi jihozga suv sepish qat’iyan man etiladi.',
    'Olovni bir-ikki daqiqada o‘chirishning iloji bo‘lmasa, urinish to‘xtatiladi va reja-sxemadagi eng yaqin chiqish tomon yuriladi. Liftga chiqilmaydi: u yo‘lda to‘xtab qolishi yoki tutun bosgan qavatda ochilishi mumkin.',
    'Xonani tark etayotganda eshik yopib ketiladi (qulflanmaydi), derazalar ochilmaydi, chunki ochiq eshik va deraza olovga havo beradi va tutunni tarqatadi.',
    'Yo‘lakni tutun qoplagan bo‘lsa, pastroq engashib yuriladi, chunki toza havo pol yaqinida qoladi; nafas ho‘l mato orqali olinadi.',
    'Bino tashqarisidagi yig‘ilish joyida qavat mas’uli xodimlarni ro‘yxat bo‘yicha tekshiradi va yetib kelmaganlar haqida darhol o‘t o‘chiruvchilarga aytadi. Ular ruxsat bermaguncha hech kim binoga qaytmaydi.',
  ]),
  p(
    'Qavat mas’uli odamlarni chiqarishni boshqaradi, ventilyatsiya va konditsionerlarni o‘chirtiradi, chunki ular tutunni boshqa xonalarga haydaydi, va yetib kelgan o‘t o‘chirish bo‘linmasiga vaziyatni tushuntiradi. Kimningdir kiyimi yonib ketsa, u yugurmasligi kerak — harakat olovni kuchaytiradi; yerga yotib dumalash yoki ustiga qalin mato yopish kerak. Kuygan joy 10–20 daqiqa salqin oqar suv ostida ushlanadi, tutundan zaharlangan odam toza havoga chiqariladi va 103 raqamiga qo‘ng‘iroq qilinadi.',
  ),

  ...figure('4-4-fire-actions.png', '4.3', 'Yong‘in sodir bo‘lganda xodimlarning harakatlar algoritmi', 11, 14),

  h3('Boshqa avariyalarda xodimlarning harakatlari.'),
  ...bullets([
    '**Zilzila** — silkinish davomida zinaga yoki liftga yugurish xavfli; mustahkam stol ostiga kirib yoki kapital devor burchagida turib, oynali derazalar va baland shkaflardan uzoqlashiladi. Silkinish to‘xtagach, bino evakuatsiya yo‘llari bo‘yicha tark etiladi.',
    '**Server xonasida gazli o‘t o‘chirish tizimi ishga tushsa** — ovozli va yorug‘lik signali berilishi bilan xona tark etiladi, chunki o‘chiruvchi gaz havodagi kislorodni kamaytiradi; xona shamollatilmaguncha ichkariga kirilmaydi.',
    '**Kimnidir tok ursa** — unga yalang qo‘l bilan tegilmaydi; avval avtomat o‘chiriladi yoki jabrlanuvchi quruq yog‘och bilan simdan ajratiladi, keyin 103 chaqiriladi, nafas olmayotgan bo‘lsa reanimatsiya boshlanadi.',
    '**Gaz hidi sezilsa** — chiroq va boshqa elektr kalitlari yoqilmaydi ham, o‘chirilmaydi ham (uchqun portlashga sabab bo‘lishi mumkin), olov yoqilmaydi; derazalar ochiladi, odamlar chiqariladi va 104 ga xabar beriladi.',
  ]),
  p(
    'Xodimlarni tezkor xabardor qilish uchun korporativ aloqa vositalaridan ham foydalanish mumkin. Masalan, “Milliy” xabarchidagi tashkilotning domen guruhi orqali evakuatsiya haqidagi xabar va yig‘ilish joyi bir necha soniyada barcha xodimlarning telefon va kompyuterlariga yetkaziladi, xodimlar esa xavfsiz joyga yetib kelganini javob bilan tasdiqlaydi. Bu vosita signalizatsiya va ovozli xabardor qilish tizimini to‘ldiradi va ayniqsa masofadan ishlayotgan xodimlar uchun foydali.',
  ),

  h2('4-bob bo‘yicha xulosa', { toc: false }),
  p(
    'Bobda “Milliy” xabarchi jamoasi misolida dasturchi mehnatining asosiy xavfli omillari — ko‘z charchashi, uzoq o‘tirish, takroriy harakatlar va asabiy zo‘riqish aniqlandi va ularni kamaytiradigan ergonomik talablar keltirildi. Ish xonasiga, mikroiqlim, yoritilganlik va shovqinga qo‘yiladigan me’yorlar jamlandi. Ikkinchi bo‘limda ofisda yong‘in chiqish sabablari va o‘chirish vositalari tahlil qilinib, namunaviy qavat uchun evakuatsiya reja-sxemasi tuzildi. Yong‘in, zilzila va boshqa avariyalarda xodimlarning harakatlari aniq tartib sifatida berildi.',
  ),
];
