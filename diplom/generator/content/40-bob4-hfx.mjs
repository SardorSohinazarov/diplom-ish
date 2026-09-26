// IV bob — Hayot faoliyati xavfsizligi.
// Topics given by the HFX consultant (S. Abdullayeva):
//   1) Dasturchining ergonomik ish joyini tashkil etish;
//   2) Evakuatsiya tadbirlarini rejalashtirish hamda avariya va yong‘inlar sodir bo‘lganda xodimlarning harakatlari.
import { bullets, figure, formula, h1, h2, h3, numbered, p, ps, table } from '../lib.mjs';

export const chapter4 = () => [
  h1('IV-bob. Hayot faoliyati xavfsizligi'),
  p(
    'Hayot faoliyati xavfsizligi inson faoliyati jarayonida yuzaga keladigan xavfli va zararli omillarni aniqlash, ularning ta’sirini kamaytirish hamda favqulodda vaziyatlarda odamlar hayoti va sog‘lig‘ini saqlashga qaratilgan bilimlar va chora-tadbirlar tizimidir. “Milliy chat” kabi dasturiy mahsulotni ishlab chiqish va unga xizmat ko‘rsatish jamoasi ish vaqtining asosiy qismini kompyuter qarshisida o‘tkazadi. Shu sababli ushbu bobda ikki masala ko‘rib chiqiladi: dasturchining ish joyini ergonomik talablar asosida tashkil etish hamda IT-kompaniya ofisida evakuatsiya tadbirlarini rejalashtirish va avariya yoki yong‘in sodir bo‘lganda xodimlarning harakatlari.',
  ),

  // ───────────────────────────────── 4.1
  h2('4.1. Dasturchining ergonomik ish joyini tashkil etish'),
  ...ps(
    'Ergonomika (yunoncha ~ergon~ — ish va ~nomos~ — qonun) inson, mehnat vositalari va ish muhitining o‘zaro moslashuvini o‘rganadigan fan. Uning maqsadi mehnatni xavfsiz, qulay va samarali qilishdir. Ergonomik ish joyida jihozlar insonning antropometrik va fiziologik xususiyatlariga moslashtiriladi, aksincha emas.',
    'Dasturchi mehnati aqliy mehnat turiga kiradi. Unda axborotni qabul qilish va qayta ishlash, diqqatni uzoq vaqt jamlash va ko‘rish organlariga yuqori yuklama ustunlik qiladi. Jismoniy yuklama esa kam va asosan statik bo‘ladi: xodim soatlab bir xil holatda o‘tiradi, faqat barmoqlar va ko‘zlar faol ishlaydi. Ish joyi noto‘g‘ri tashkil etilganda bu omillar surunkali charchoq va kasb kasalliklariga olib keladi.',
  ),
  h3('Kompyuter bilan ishlashdagi xavfli va zararli omillar.'),
  p('Dasturchining ish joyida quyidagi asosiy xavfli va zararli ishlab chiqarish omillari mavjud:'),
  ...bullets([
    '**ko‘rish analizatoriga yuklama** — ekranga uzoq tikilish, kam ko‘z qirpish, yorqinlik kontrasti va aks etishlar ko‘zning quruqlashishi, charchashi va ko‘rishning pasayishiga (“kompyuter ko‘rish sindromi”) olib keladi;',
    '**statik yuklama va gipodinamiya** — noto‘g‘ri o‘tirish bo‘yin, yelka va bel og‘riqlarini, qon aylanishining sustlashishini keltirib chiqaradi;',
    '**qo‘l va bilakdagi takroriy harakatlar** — klaviatura va sichqoncha bilan uzoq ishlash bilak (tunnel) sindromi va paylarning yallig‘lanishiga sabab bo‘lishi mumkin;',
    '**noqulay mikroiqlim** — kompyuterlar va monitorlar issiqlik chiqaradi, konditsionerlar esa havoni quritadi va sovuq havo oqimlarini hosil qiladi;',
    '**yoritilganlikning yetarli emasligi yoki ortiqchaligi**, ekrandagi yaltirash va aks etishlar;',
    '**shovqin** — sovutish ventilyatorlari, printerlar, ochiq ofisdagi suhbatlar diqqatni chalg‘itadi;',
    '**elektr toki urish xavfi** — shikastlangan kabellar, yerga ulanmagan jihozlar va ortiqcha yuklangan uzaytirgichlar;',
    '**psixoemotsional zo‘riqish** — muddatlar bosimi, uzoq vaqt diqqatni jamlash, tungi navbatchiliklar va tizim avariyalarini bartaraf etish.',
  ]),
  p(
    'Ish joyini tashkil etishga qo‘yiladigan talablar O‘zbekiston Respublikasining Mehnat kodeksi va “Mehnatni muhofaza qilish to‘g‘risida”gi Qonuni, sanitariya qoidalari va normalari hamda ISO 9241-5 (ish joyini joylashtirish va gavda holatiga talablar), GOST 12.2.032-78 (o‘tirib bajariladigan ishlarda ish joyi), GOST 12.1.005-88 (ish zonasi havosi) va KMK 2.01.05-98 (tabiiy va sun’iy yoritish) standartlari bilan belgilanadi.',
  ),

  h3('Ish xonasiga qo‘yiladigan talablar.'),
  ...ps(
    'Kompyuterli ish joylari joylashgan xonada bitta ish joyiga to‘g‘ri keladigan maydon kamida 6 m², hajm esa kamida 20 m³ bo‘lishi tavsiya etiladi. Xonada tabiiy va sun’iy yoritish bo‘lishi lozim. Derazalar shimol yoki shimoli-sharq tomonga qaragani ma’qul. Ular jalyuzi yoki pardalar bilan jihozlanadi.',
    'Monitorlar derazaga nisbatan yon tomondan joylashtiriladi: yorug‘lik chap tomondan tushishi kerak. Deraza ekran orqasida bo‘lsa, ko‘z yorqin fon va nisbatan qorong‘i ekran o‘rtasida doimo moslashishga majbur bo‘ladi. Deraza xodimning orqasida bo‘lsa, ekranda yaltirash hosil bo‘ladi. Bir monitorning ekrani bilan ikkinchisining orqa tomoni orasidagi masofa kamida 2 m, yon tomonlari orasidagi masofa esa kamida 1,2 m bo‘lishi kerak.',
    'Xona devorlari va shifti yaltiramaydigan (matli) materiallar bilan pardozlanadi. Yorug‘likni qaytarish koeffitsiyentlari shift uchun 0,7–0,8, devorlar uchun 0,5–0,6, pol uchun 0,3–0,5 bo‘lishi tavsiya etiladi. Xona har kuni nam usulda tozalanadi va har bir ish soatidan so‘ng shamollatiladi.',
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
  ...ps(
    'To‘g‘ri gavda holatining asosiy qoidasi “to‘g‘ri burchaklar” qoidasi deb ataladi: tirsaklar 90–100°, son-chanoq bo‘g‘imlari 90–110° va tizzalar taxminan 90° burchak ostida bukiladi. Oyoq kaftlari polga yoki oyoq tayanchiga to‘liq tiraladi. Bel suyanchiqqa tayanadi, yelkalar bo‘shashgan holatda bo‘ladi. Bilaklar klaviatura ustida to‘g‘ri tutiladi, yuqoriga yoki yon tomonga bukilmaydi. Sichqoncha klaviatura bilan bir sathda va tanaga yaqin joylashtiriladi.',
    'Dasturchilar ko‘pincha ikki monitor bilan ishlaydi. Bunda asosiy monitor to‘g‘ridan qarshida, ikkinchisi esa yonida, ko‘zdan bir xil masofada va xodimga qaratib joylashtiriladi. Ikkala monitor teng ishlatilsa, ularning tutashgan joyi xodim ro‘parasida bo‘ladi. Noutbuk bilan uzoq ishlaganda uning ekrani ko‘z sathiga maxsus tagliklar bilan ko‘tariladi, alohida klaviatura va sichqoncha ulanadi. Aks holda boshni doimo pastga egib o‘tirishga to‘g‘ri keladi.',
    'Ish joyi faqat jismoniy jihozlardan iborat emas. Dasturiy interfeys ham ergonomik talablarga javob berishi kerak (ISO 9241-110). Ishlab chiqilgan “Milliy chat” interfeysida matn va fon o‘rtasida yetarli kontrast, qorong‘i mavzu, tizim shrift o‘lchamini hisobga oladigan maketlar va mobil qurilmalarga moslashuv ko‘zda tutilgani foydalanuvchilarning ko‘z charchog‘ini kamaytirishga xizmat qiladi. Dasturchining o‘z ish vositalarida (kod muharriri, terminal) ham qorong‘i mavzu, katta shrift va yaxshi o‘qiladigan monoshirinli shriftlardan foydalanish tavsiya etiladi.',
  ),

  h3('Mikroiqlim, yoritish va shovqin.'),
  p(
    'Dasturchi mehnati energiya sarfi bo‘yicha Ia toifadagi yengil ishlarga kiradi (energiya sarfi 139 W gacha). Bunday ishlar uchun ish zonasi mikroiqlimining maqbul ko‘rsatkichlari, yoritilganlik va shovqin me’yorlari 4.2-jadvalda keltirilgan.',
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
  ...ps(
    'Umumiy yoritish uchun diffuzorli (sochuvchi) LED yoritgichlardan foydalaniladi. Ular yorug‘likni bir tekis taqsimlaydi va miltillamaydi. Rang harorati 4000–5000 K bo‘lgan neytral oq yorug‘lik ko‘zni kamroq charchatadi. Yoritgichlar monitorlar bilan parallel qatorlarda joylashtiriladi, ularning yorug‘ligi ekranda aks etmasligi kerak. Zarur bo‘lsa, hujjatlar bilan ishlash uchun yaltiramaydigan mahalliy yoritgich qo‘shiladi.',
    'Shovqinni kamaytirish uchun printerlar va boshqa shovqinli jihozlar alohida joyga chiqariladi, ochiq ofislarda tovush yutuvchi panellar va to‘siqlar o‘rnatiladi, qo‘ng‘iroqlar va muhokamalar uchun alohida xonalar ajratiladi. Server uskunalari ish xonalarida emas, alohida server xonasida joylashtiriladi.',
  ),

  h3('Ish xonasining sun’iy yoritilishini hisoblash.'),
  ...ps(
    'Misol sifatida dasturchilar bo‘limi uchun o‘lchamlari A × B × H = 6 × 6 × 3 m bo‘lgan xonani ko‘rib chiqamiz. Xonaning maydoni S = 36 m², hajmi V = 108 m³. Bitta ish joyiga kamida 6 m² maydon va 20 m³ hajm to‘g‘ri kelishi kerakligidan xonaga joylashtirish mumkin bo‘lgan ish joylari soni:',
  ),
  formula('~n~_{max} = min(~S~ / 6; ~V~ / 20) = min(36 / 6; 108 / 20) = min(6; 5,4) = 5', '4.1'),
  p(
    'Demak, xonada 5 ta ish joyi tashkil etiladi. Umumiy sun’iy yoritish yorug‘lik oqimidan foydalanish koeffitsiyenti usuli bilan hisoblanadi. Avval xona indeksi aniqlanadi:',
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
    'Haqiqiy yoritilganlik me’yordan 5 % ga yuqori. Bu ruxsat etilgan −10…+20 % oralig‘ida. Yoritish tizimining umumiy quvvati 12 · 36 = 432 W, solishtirma quvvati 12 W/m². Hisoblash natijalari 4.3-jadvalda umumlashtirilgan, yoritgichlar va ish joylarining joylashuvi 4.2-rasmda ko‘rsatilgan.',
  ),
  ...table(
    '4.3',
    'Ish xonasining sun’iy yoritilishini hisoblash natijalari',
    ['Parametr', 'Belgilanishi', 'Qiymati'],
    [
      ['Xona o‘lchamlari', '~A~ × ~B~ × ~H~', '6 × 6 × 3 m'],
      ['Yoritgichlarning ish yuzasidan balandligi', '~h~', '2,2 m'],
      ['Xona indeksi', '~i~', '1,36'],
      ['Yorug‘lik oqimidan foydalanish koeffitsiyenti', 'η', '0,54'],
      ['Me’yoriy yoritilganlik', '~E~_{n}', '400 lk'],
      ['Zaxira va notekislik koeffitsiyentlari', '~K~_{z}, ~z~', '1,4; 1,1'],
      ['Bitta yoritgichning yorug‘lik oqimi', 'Φ', '3600 lm'],
      ['Yoritgichlar soni', '~N~', '12 ta'],
      ['Haqiqiy yoritilganlik', '~E~_{h}', '421 lk'],
      ['Umumiy / solishtirma quvvat', '~P~, ~p~', '432 W; 12 W/m²'],
    ],
    [6, 2.5, 3],
  ),
  ...figure('4-2-lighting-plan.png', '4.2', 'Dasturchilar xonasida yoritgichlar va ish joylarining joylashuv sxemasi', 14),
  p(
    'Xonani shamollatish uchun zarur havo miqdori bitta xodimga to‘g‘ri keladigan hajmga bog‘liq. Bu hajm 20–40 m³ bo‘lganda (bizda 108 / 5 = 21,6 m³) har bir xodimga soatiga kamida 30 m³ toza havo berilishi kerak:',
  ),
  formula('~L~ = ~n~·~L~_{1} = 5 · 30 = 150 m³/soat;   ~K~ = ~L~ / ~V~ = 150 / 108 ≈ 1,4 soat^{−1}', '4.6'),
  p(
    'Demak, xonada havo soatiga kamida 1,4 marta almashishi kerak. Buni tabiiy shamollatish yetarli bo‘lmaganda kichik quvvatli so‘ruvchi-beruvchi ventilyatsiya yoki rekuperatorli konditsioner ta’minlaydi.',
  ),

  h3('Mehnat va dam olish rejimi.'),
  ...ps(
    'Kompyuter bilan ishlashda uzluksiz ish vaqti 2 soatdan oshmasligi kerak. Har 45–60 daqiqada 5–10 daqiqalik yoki har 2 soatda 15 daqiqalik tanaffus qilish tavsiya etiladi. Tanaffus vaqtida ekrandan uzoqlashish, yurish va yengil jismoniy mashqlar bajarish lozim. Dasturchilar orasida keng tarqalgan “Pomodoro” usuli (25 daqiqa ish va 5 daqiqa dam olish) ham bu talabga mos keladi.',
    'Ko‘z charchog‘ini kamaytirish uchun “20-20-20” qoidasi qo‘llaniladi: har 20 daqiqada 20 soniya davomida kamida 20 fut (6 m) uzoqlikdagi narsaga qarash. Ko‘z uchun mashqlar (ko‘zni yumib-ochish, nigohni uzoq va yaqin nuqtalarga ko‘chirish) ham foydali. Bo‘yin, yelka, bel va bilaklar uchun qisqa mashqlar kun davomida bir necha marta bajariladi.',
    'Ish beruvchi kompyuterda ishlovchi xodimlarni dastlabki va davriy tibbiy ko‘riklardan o‘tkazishi, ularga mehnatni muhofaza qilish bo‘yicha yo‘l-yo‘riq berishi kerak. Masofadan (uydan) ishlaganda ham xuddi shu talablar amal qiladi. Shu sababli masofaviy ishlaydigan dasturchilarga ergonomik stul va monitor bilan ta’minlash yoki ish joyini o‘zi tashkil etishi uchun tavsiyalar berish maqsadga muvofiq.',
  ),

  h3('Elektr xavfsizligi.'),
  p(
    'Ish joyidagi barcha jihozlar 220 V kuchlanishli tarmoqqa ulanadi. Shu sababli rozetkalar yerga ulash kontakti bilan jihozlanadi, kabellar maxsus kanallarda yoki stol ostidagi tokchalarda yotqiziladi va oyoq ostida qolmaydi. Uzaytirgichlarni bir-biriga ketma-ket ulash, shikastlangan kabel va vilkalardan foydalanish, jihozlar korpusini ochish taqiqlanadi. Server va tarmoq uskunalari uzluksiz quvvat manbalari (UPS) orqali ulanadi. Elektr jihozlarini ta’mirlash faqat tegishli ruxsatga ega mutaxassis tomonidan bajariladi.',
  ),

  // ───────────────────────────────── 4.2
  h2('4.2. Evakuatsiya tadbirlarini rejalashtirish hamda avariya va yong‘inlar sodir bo‘lganda xodimlarning harakatlari'),
  ...ps(
    'Favqulodda vaziyat deganda odamlar qurbon bo‘lishiga, ularning sog‘lig‘iga yoki atrof-muhitga zarar yetishiga, katta moddiy yo‘qotishlarga va hayot faoliyati sharoitlarining buzilishiga olib kelgan yoki olib kelishi mumkin bo‘lgan avariya, halokat, tabiiy ofat yoki boshqa hodisa natijasida muayyan hududda yuzaga kelgan holat tushuniladi. Kelib chiqishiga ko‘ra favqulodda vaziyatlar texnogen, tabiiy va ekologik turlarga bo‘linadi.',
    'IT-kompaniya ofisi uchun eng ehtimoliy favqulodda vaziyatlar yong‘in, zilzila (Toshkent shahri yuqori seysmik faollik zonasida joylashgan), elektr ta’minotidagi avariya, isitish yoki suv quvurlarining yorilishi va gaz sizishidir. Bunday vaziyatlarda xodimlar hayotini saqlashning asosiy usuli ularni o‘z vaqtida va tartibli evakuatsiya qilishdir.',
    'Bu sohadagi asosiy talablar “Favqulodda vaziyatlarda aholini va hududlarni muhofaza qilish to‘g‘risida”gi, “Fuqaro muhofazasi to‘g‘risida”gi va “Yong‘in xavfsizligi to‘g‘risida”gi qonunlar hamda GOST 12.1.004-91 “Yong‘in xavfsizligi. Umumiy talablar” standarti bilan belgilanadi.',
  ),

  h3('IT-ofisda yong‘in chiqish sabablari va o‘t o‘chirish vositalari.'),
  p('Ofis binolarida yong‘inlarning aksariyati elektr tarmog‘i va jihozlar bilan bog‘liq. Asosiy sabablar:'),
  ...bullets([
    'elektr tarmog‘ining ortiqcha yuklanishi: bitta rozetkaga ko‘p jihoz ulash, uzaytirgichlarni ketma-ket ulash;',
    'eskirgan yoki shikastlangan izolyatsiya tufayli qisqa tutashuv, rozetka va vilkalardagi bo‘sh kontaktlar;',
    'noutbuk va powerbanklarning litiy-ion akkumulyatorlari shikastlanishi yoki qizib ketishi, sifatsiz zaryadlovchi qurilmalar;',
    'UPS akkumulyatorlarining nosozligi, server xonasida sovutish tizimining ishdan chiqishi;',
    'qarovsiz qoldirilgan isitish asboblari, elektr choynaklar va boshqa maishiy jihozlar;',
    'chekish qoidalarini buzish va ochiq olovdan ehtiyotsiz foydalanish.',
  ]),
  ...ps(
    'Ofisdagi yonuvchi materiallar (qog‘oz, mebel, plastik korpuslar, kabel izolyatsiyasi) yonganda ko‘p miqdorda zaharli tutun ajraladi. Yong‘inlarda halok bo‘lganlarning aksariyati olovdan emas, aynan tutun va is gazidan zaharlanishdan jabrlanadi. Shu sababli tutunni erta aniqlash va odamlarni tezkor evakuatsiya qilish hal qiluvchi ahamiyatga ega.',
    'Bino avtomatik yong‘in signalizatsiyasi (tutun va issiqlik datchiklari), odamlarni xabardor qilish va evakuatsiyani boshqarish tizimi hamda birlamchi o‘t o‘chirish vositalari bilan jihozlanadi. Server xonasida suv bilan o‘chirish uskunalarga zarar yetkazgani uchun avtomatik gazli o‘t o‘chirish tizimi o‘rnatiladi. Yong‘in sinflari va ularni o‘chirish vositalari 4.4-jadvalda keltirilgan.',
  ),
  ...table(
    '4.4',
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
    'Kompyuterlar o‘rnatilgan xonalarda asosan karbonat angidridli o‘t o‘chirgichlar (OU-3, OU-5) ishlatiladi. Ular elektr o‘tkazmaydi va uskunalarda qoldiq qoldirmaydi. Bunday o‘t o‘chirgich bilan ishlaganda uning karnayini qo‘l bilan ushlab bo‘lmaydi: gaz kengayganda karnay −70 °C gacha soviydi va terini sovuq urishi mumkin. O‘t o‘chirgichlar ko‘rinadigan joylarda, poldan 1,5 m dan baland bo‘lmagan joyda osiladi. Yong‘in chiqishi mumkin bo‘lgan joydan eng yaqin o‘t o‘chirgichgacha masofa 20 m dan oshmasligi kerak.',
  ),

  h3('Evakuatsiya tadbirlarini rejalashtirish.'),
  ...ps(
    'Evakuatsiya — odamlarni xavfli omillar ta’sir qila boshlashidan oldin binodan yoki uning qismidan xavfsiz hududga uyushgan holda chiqarish jarayoni. Evakuatsiya yo‘li — evakuatsiya chiqishiga olib boradigan, yong‘in xavfli omillaridan himoyalangan yo‘l. Evakuatsiya chiqishi esa to‘g‘ridan-to‘g‘ri tashqariga, xavfsiz zinapoyaga yoki qo‘shni yong‘inga qarshi bo‘linmaga olib boradigan chiqishdir.',
    'Evakuatsiyani rejalashtirish tashkiliy va texnik tadbirlardan iborat. Texnik tadbirlarga quyidagilar kiradi:',
  ),
  ...bullets([
    'har bir qavatda kamida ikkita, bir-biridan uzoqda joylashgan evakuatsiya chiqishi;',
    'evakuatsiya yo‘llari va eshiklarning me’yoriy kengligi (yo‘laklar kamida 1–1,2 m, eshiklar kamida 0,8 m); eshiklar chiqish yo‘nalishida ochiladi va ichkaridan kalitsiz ochiladi;',
    'yo‘laklar va zinapoyalarni mebel, jihozlar va qutilar bilan to‘sib qo‘yishni taqiqlash;',
    'avariya (evakuatsiya) yoritishi va ISO 7010 standartiga mos yashil rangli “Favqulodda chiqish” belgilari;',
    'yong‘in signalizatsiyasi, odamlarni ovozli xabardor qilish tizimi va qo‘lda ishga tushiriladigan xabarlagichlar;',
    'har bir qavatda evakuatsiya reja-sxemalari.',
  ]),
  ...ps(
    'Evakuatsiya reja-sxemasi grafik va matnli qismlardan iborat. Grafik qismda qavatning rejasi, “Siz shu yerdasiz” belgisi, asosiy (yashil yaxlit strelkalar) va zaxira (yashil punktir strelkalar) evakuatsiya yo‘llari, evakuatsiya chiqishlari, o‘t o‘chirgichlar, ichki yong‘in kranlari va xabarlagichlarning joylashuvi ko‘rsatiladi. Matnli qismda xodimlarning harakatlar tartibi va mas’ul shaxslar ro‘yxati beriladi. Reja-sxemalar ko‘zga yaxshi ko‘rinadigan joylarda, zinapoyalar va chiqishlar yonida, qorong‘ida ko‘rinadigan (fotolyuminessent) materialdan tayyorlanib osiladi. Namunaviy IT-kompaniya ofisining uchinchi qavati uchun evakuatsiya reja-sxemasi 4.3-rasmda keltirilgan.',
  ),
  ...figure('4-3-evacuation-plan.png', '4.3', 'IT-kompaniya ofisi 3-qavatining evakuatsiya reja-sxemasi (namuna)', 16),
  p('Tashkiliy tadbirlar quyidagilarni o‘z ichiga oladi:'),
  ...bullets([
    'tashkilot rahbarining buyrug‘i bilan yong‘in xavfsizligi uchun mas’ul shaxs, har bir qavat bo‘yicha evakuatsiya mas’ullari va birinchi yordam ko‘rsatuvchi xodimlar tayinlanadi;',
    'binodan tashqarida xavfsiz masofada xodimlar yig‘iladigan joy belgilanadi va xodimlar ro‘yxatlari tayyorlanadi;',
    'barcha xodimlar ishga qabul qilinganda kirish yo‘riqnomasidan, keyinchalik esa davriy yo‘riqnomadan o‘tkaziladi, yong‘in-texnik minimum bo‘yicha o‘qitiladi;',
    'evakuatsiya bo‘yicha amaliy mashg‘ulotlar muntazam, odatda yarim yilda kamida bir marta o‘tkaziladi;',
    'o‘t o‘chirish vositalari, signalizatsiya va avariya yoritishining sozligi belgilangan muddatlarda tekshiriladi;',
    'yangi xodimlar va mehmonlar evakuatsiya yo‘llari va yig‘ilish joyi bilan tanishtiriladi.',
  ]),

  h3('Evakuatsiya vaqtini hisoblash.'),
  ...ps(
    'Evakuatsiya yo‘llarining yetarliligini baholash uchun hisobiy evakuatsiya vaqti aniqlanadi. Hisoblash GOST 12.1.004-91 standartida keltirilgan odamlar oqimining harakat parametrlari asosida soddalashtirilgan usulda bajariladi. Evakuatsiya yo‘li o‘lchamlari va odamlar soni bir xil bo‘lgan uchastkalarga ajratiladi. Har bir uchastkadagi odamlar oqimining zichligi quyidagicha aniqlanadi:',
  ),
  formula('~D~_{i} = ~N~_{i}·~f~ / (~l~_{i}·δ_{i}),', '4.7'),
  p(
    'bu yerda ~N~_{i} — uchastkadagi odamlar soni; ~f~ = 0,1 m² — yozgi kiyimdagi katta yoshli odamning gorizontal proyeksiya maydoni; ~l~_{i} va δ_{i} — uchastkaning uzunligi va kengligi, m. Zichlikka qarab 4.5-jadvaldan harakat tezligi ~v~_{i} va oqim intensivligi ~q~_{i} olinadi. Uchastkadan o‘tish vaqti va umumiy hisobiy evakuatsiya vaqti:',
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
    '4.5',
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
    'Masalan, birinchi uchastka uchun ~D~_{1} = 20 · 0,1 / (12 · 1,5) ≈ 0,11. 4.5-jadvaldagi qiymatlar orasida chiziqli interpolyatsiya qilib ~v~_{1} ≈ 78 m/min va ~q~_{1} ≈ 8,4 m/min topiladi, ~t~_{1} = 12 / 78 ≈ 0,15 min. Qolgan uchastkalar ham xuddi shunday hisoblanadi. Natijalar 4.6-jadvalda keltirilgan.',
  ),
  ...table(
    '4.6',
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
    'Demak, hisobiy evakuatsiya vaqti ~t~_{h} ≈ 0,83 min (taxminan 50 soniya). Xabardor qilish tizimi ishga tushgandan so‘ng evakuatsiya boshlanishidagi kechikishni taxminan 1 daqiqa deb olsak, qavatdan to‘liq chiqish uchun taxminan 2 daqiqa kerak bo‘ladi. Bu vaqt yong‘in xavfli omillari (tutun, harorat, kislorod kamayishi) evakuatsiya yo‘llarida kritik qiymatga yetish vaqtidan kichik bo‘lishi shart. Bu vaqt binoning yong‘in xavfini baholash hujjatlarida aniqlanadi. Hisob ko‘rsatadiki, eng tor joy zina hisoblanadi. Shu sababli zinaga olib boradigan eshiklar doimo yopiq holatda (o‘zi yopiladigan qurilma bilan), lekin qulflanmagan bo‘lishi, zina maydonchalarida esa hech qanday buyum saqlanmasligi kerak.',
  ),

  h3('Yong‘in sodir bo‘lganda xodimlarning harakatlari.'),
  p(
    'Yong‘in chiqqanda vahimaga tushmaslik va oldindan o‘rgatilgan tartibda harakat qilish muhim. Xodimlarning harakatlar algoritmi 4.4-rasmda ko‘rsatilgan va quyidagi qoidalarga asoslanadi:',
  ),
  ...numbered([
    'Yong‘in, tutun yoki kuyish hidini sezgan xodim darhol qo‘lda ishga tushiriladigan xabarlagichni bosadi va 101 raqamiga (yoki yagona 112 raqamiga) qo‘ng‘iroq qiladi. Bunda binoning manzili, qavati, nima yonayotgani, odamlar bor-yo‘qligi va o‘z ismi aytiladi. So‘ngra bo‘lim rahbari va yong‘in xavfsizligi uchun mas’ul shaxsga xabar beriladi.',
    'Yong‘in endi boshlangan bo‘lsa va bu xavfsiz bo‘lsa, elektr jihozlari tarmoqdan uziladi (xona yoki qavat avtomat o‘chirgichi o‘chiriladi) va birlamchi vositalar bilan o‘chirishga harakat qilinadi. Kuchlanish ostidagi jihozlarni suv bilan o‘chirish mumkin emas.',
    'Yong‘inni 1–2 daqiqada o‘chirib bo‘lmasa yoki tutun ko‘paysa, darhol evakuatsiya boshlanadi. Evakuatsiya reja-sxemasida ko‘rsatilgan eng yaqin xavfsiz chiqishdan foydalaniladi. Liftdan foydalanish taqiqlanadi, chunki u to‘xtab qolishi va tutunli qavatda ochilishi mumkin.',
    'Xonadan chiqqanda eshik yopiladi, lekin qulflanmaydi. Bu tutun va olovning tarqalishini sekinlashtiradi. Derazalarni ochish mumkin emas, chunki havo oqimi yonishni kuchaytiradi.',
    'Tutunli yo‘lakda engashib yoki kerak bo‘lsa emaklab harakatlaniladi, chunki pastda havo tozaroq bo‘ladi. Burun va og‘iz ho‘l mato bilan to‘siladi, yo‘nalishni yo‘qotmaslik uchun bir qo‘l bilan devorni ushlab boriladi.',
    'Qo‘ldan kelsa, mehmonlarga va harakatlanishi cheklangan hamkasblarga yordam beriladi. Shaxsiy buyumlarni olish uchun ortga qaytilmaydi.',
    'Yig‘ilish joyida qavat mas’uli xodimlarni ro‘yxat bo‘yicha sanaydi. Yetib kelmagan xodimlar va ular bo‘lishi mumkin bo‘lgan joy haqida yetib kelgan o‘t o‘chirish bo‘linmasiga darhol xabar beriladi. O‘t o‘chiruvchilar ruxsat bermaguncha binoga qaytilmaydi.',
  ]),
  ...figure('4-4-fire-actions.png', '4.4', 'Yong‘in sodir bo‘lganda xodimlarning harakatlar algoritmi', 11, 17),
  ...ps(
    'Yong‘in xavfsizligi uchun mas’ul shaxs o‘t o‘chirish xizmati chaqirilganini tekshiradi, evakuatsiyani boshqaradi, ventilyatsiya va konditsionerlarni o‘chirishni tashkil etadi (ular tutunni tarqatadi), o‘t o‘chirish bo‘linmasini kutib oladi va unga yong‘in joyi, odamlar va server xonasidagi gazli o‘t o‘chirish tizimi haqida ma’lumot beradi.',
    'Agar kiyimga olov tushsa, yugurish mumkin emas, chunki havo oqimi olovni kuchaytiradi. Yerga yotib, dumalab yoki qalin mato bilan o‘rab olovni o‘chirish kerak. Kuyish jarohatida kuygan joy 10–20 daqiqa davomida salqin oqar suv ostida sovutiladi va toza bog‘lam qo‘yiladi. Tutundan zaharlangan odam toza havoga olib chiqiladi va 103 raqami orqali tez tibbiy yordam chaqiriladi.',
  ),

  h3('Boshqa avariyalarda xodimlarning harakatlari.'),
  ...bullets([
    '**Zilzila.** Silkinish paytida zinapoya va liftga yugurish xavfli. Mustahkam stol ostiga yashirinish yoki ichki kapital devor burchagida, eshik o‘rnida turish, derazalar, shkaflar va osma jihozlardan uzoqlashish kerak. Silkinish tugagach, bino evakuatsiya yo‘llari bo‘ylab tark etiladi, yig‘ilish joyi elektr uzatish liniyalari va binolardan uzoqda tanlanadi.',
    '**Server xonasida gazli o‘t o‘chirish tizimining ishga tushishi.** Ogohlantiruvchi ovozli va yorug‘lik signali berilganda xona darhol tark etiladi va eshik yopiladi. O‘t o‘chiruvchi gaz xonadagi kislorod miqdorini kamaytiradi, shuning uchun xona shamollatilmaguncha unga kirish taqiqlanadi.',
    '**Elektr toki urishi.** Jabrlanuvchiga yalang qo‘l bilan tegish mumkin emas. Avval tok manbai o‘chiriladi yoki jabrlanuvchi quruq yog‘och kabi dielektrik buyum yordamida tokdan ajratiladi. So‘ngra 103 raqami chaqiriladi va zarur bo‘lsa yurak-o‘pka reanimatsiyasi boshlanadi.',
    '**Gaz sizishi.** Olov yoqish, elektr kalitlari va qurilmalarni yoqish yoki o‘chirish mumkin emas, chunki uchqun portlashga sabab bo‘lishi mumkin. Derazalar ochiladi, xonadagilar chiqariladi va 104 raqamiga xabar beriladi.',
    '**Suv quvurlarining yorilishi.** Suv bosishi mumkin bo‘lgan xonalardagi elektr ta’minoti o‘chiriladi, uskunalar balandroq joyga ko‘chiriladi va xo‘jalik xizmatiga xabar beriladi.',
  ]),
  ...ps(
    'Favqulodda vaziyatlarda xodimlarni tezkor xabardor qilish uchun asosiy ovozli xabar berish tizimidan tashqari korporativ aloqa vositalaridan ham foydalanish mumkin. Masalan, ishlab chiqilgan “Milliy chat” tizimida tashkilotning barcha xodimlari a’zo bo‘lgan guruh (200 nafargacha a’zo) yaratilib, unda faqat administratorlar xabar e’lon qiladi. Bunday guruh orqali evakuatsiya haqida xabar, yig‘ilish joyi va keyingi ko‘rsatmalar bir necha soniyada barcha xodimlarning telefon va kompyuterlariga yetkaziladi. Xodimlar esa xabarga javob yozib, xavfsiz joyga yetib kelganini tasdiqlaydi. Bu vosita yong‘in signalizatsiyasi va ovozli xabar berish tizimining o‘rnini bosmaydi, balki ularni to‘ldiradi. U ayniqsa masofadan ishlayotgan va binoda bo‘lmagan xodimlarni xabardor qilishda foydali. Tizim serverlari mamlakat ichida joylashgani favqulodda vaziyatlarda aloqaning mustaqilligini oshiradi.',
  ),

  h2('4-bob bo‘yicha xulosa'),
  ...ps(
    'To‘rtinchi bobda hayot faoliyati xavfsizligining dasturiy ta’minot ishlab chiquvchilar uchun muhim bo‘lgan ikki masalasi ko‘rib chiqildi. Birinchi bo‘limda kompyuter bilan ishlashdagi xavfli va zararli omillar aniqlandi. Ish xonasi, ish stoli, stul va monitorga qo‘yiladigan ergonomik talablar, mikroiqlim, yoritish va shovqin me’yorlari hamda mehnat va dam olish rejimi keltirildi. 6 × 6 m o‘lchamli dasturchilar xonasi uchun joylashtirish mumkin bo‘lgan ish joylari soni (5 ta), sun’iy yoritish (12 ta 36 W li LED yoritgich, haqiqiy yoritilganlik 421 lk) va zarur havo almashinuvi (150 m³/soat) hisoblandi.',
    'Ikkinchi bo‘limda IT-ofisda yong‘in chiqish sabablari, yong‘in sinflari va o‘t o‘chirish vositalari, evakuatsiyani rejalashtirishning texnik va tashkiliy tadbirlari ko‘rib chiqildi hamda namunaviy qavat uchun evakuatsiya reja-sxemasi ishlab chiqildi. 45 kishilik qavat uchun hisobiy evakuatsiya vaqti taxminan 0,83 daqiqani tashkil etishi va eshiklarda tirbandlik yuzaga kelmasligi hisoblab ko‘rsatildi. Yong‘in, zilzila va boshqa avariyalarda xodimlarning harakatlar tartibi berildi. Bundan tashqari, “Milliy chat” tizimidan favqulodda vaziyatlarda xodimlarni qo‘shimcha xabardor qilish vositasi sifatida foydalanish imkoniyati ko‘rsatildi.',
  ),
];
