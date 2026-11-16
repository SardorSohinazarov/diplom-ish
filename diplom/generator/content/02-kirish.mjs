import { bullets, h1, h3, p, ps } from '../lib.mjs';

// The six numbered parts of the introduction follow the department's required order.
export const introduction = () => [
  h1('Kirish'),
  ...ps(
    'Axborot texnologiyalari bugun hayotning barcha sohalariga kirib bormoqda. Ta’lim, davlat boshqaruvi, tibbiyot va savdoda ishlar tobora ko‘proq internet orqali bajariladi. Bu jarayonda odamlar o‘rtasidagi tezkor muloqot alohida o‘rin tutadi: savol berish, hujjat yuborish yoki jamoa bilan kelishib olish uchun endi bir necha soniya yetarli. Bunday muloqotni ta’minlaydigan dasturlar — messenjerlar — kundalik ishning ajralmas vositasiga aylandi.',
    'Shu bilan birga, messenjer orqali juda ko‘p shaxsiy va xizmat ma’lumotlari o‘tadi. Shuning uchun bu dasturlar qayerda ishlashi, ma’lumotlar kimning serverida saqlanishi va ular qanchalik himoyalangani muhim savolga aylandi. Ushbu bitiruv malakaviy ishi shu savollarga javob beradigan, O‘zbekiston foydalanuvchilari uchun mo‘ljallangan “Milliy” xabarchini ishlab chiqishga bag‘ishlangan.',
  ),
  h3('1. Bitiruv malakaviy ishining dolzarbligi.'),
  ...ps(
    'Bugun muloqotning katta qismi messenjerda kechadi: talabalar guruhidagi e’lonlar, kafedra bilan yozishmalar, ish jamoasidagi kundalik muhokamalar. O‘zbekistonda bu vazifani asosan Telegram va WhatsApp bajaradi. Ikkalasi ham xorijiy kompaniyaniki. Shu sababli millionlab fuqarolarning yozishmalari va kontaktlari, kim bilan qachon gaplashgani haqidagi ma’lumotlar chet eldagi serverlarda turadi. Bu ma’lumotlarga O‘zbekiston qonunlari ta’sir qila olmaydi.',
    'Messenjerlarning ahamiyati yildan yilga ortib bormoqda. Ular endi faqat do‘stlar bilan suhbatlashish vositasi emas: ularda o‘quv guruhlari tuziladi, buyurtmalar qabul qilinadi, idoralar fuqarolar bilan bog‘lanadi. Ko‘plab tashkilotlarda kundalik ish to‘liq messenjer orqali yuritiladi. Demak, messenjer ishlamay qolsa yoki undagi ma’lumotlar begona qo‘lga o‘tsa, bu bir kishiga emas, butun tashkilotga zarar yetkazadi.',
    'Xorijiy xizmatga bog‘liqlikning bir necha xavfi bor. Birinchidan, xizmat egasi o‘z qoidalarini istalgan paytda o‘zgartirishi mumkin va foydalanuvchi bunga ta’sir qila olmaydi. Ikkinchidan, xizmat texnik sabab bilan to‘xtab qolishi mumkin: masalan, 2021-yil oktabrda WhatsApp butun dunyo bo‘yicha qariyb olti soat ishlamadi. Bu vaqtda millionlab odamlar va kompaniyalar aloqasiz qoldi. Uchinchidan, ayrim davlatlarda xorijiy messenjerlar bloklangan yoki cheklangan. Bunday holatda shu messenjerga tayangan tashkilot bir kunda asosiy aloqa vositasidan ayriladi. O‘z serverida ishlaydigan messenjer bu xavflarni ancha kamaytiradi.',
    'Davlat bu muammoni qonun darajasida tan olgan. “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunga 2021-yilda kiritilgan o‘zgartishga ko‘ra, fuqarolar haqidagi ma’lumotlar respublika hududidagi serverlarda saqlanishi kerak [1]. “Raqamli O‘zbekiston – 2030” strategiyasi esa mahalliy dasturiy mahsulotlarni rivojlantirishni ustuvor vazifa deb belgilagan [4]. Xorijiy messenjerlar bu talablarga javob bermaydi.',
    'Ma’lumotlarni mamlakat ichida saqlash faqat qonun talabi emas, bu xavfsizlik masalasi hamdir. Davlat idorasi, universitet yoki bank xodimlari ish yozishmalarida xizmat ma’lumotlarini ham yuboradi. Agar bu yozishmalar xorijdagi serverda tursa, tashkilot ularni kim o‘qiyotganini va qancha vaqt saqlanishini nazorat qila olmaydi. O‘z serverida ishlaydigan tizimda esa ma’lumotlarni kim ko‘rishi, qachon o‘chirilishi va qanday himoyalanishini tashkilotning o‘zi belgilaydi.',
    'Mahalliy muqobil ham bor: davlat xodimlari uchun Humo messenjeri yaratilgan. Ammo u Telegram’ning ochiq kodi asosida qilingan, pullik va faqat davlat tashkilotlari uchun mo‘ljallangan [41]. Universitet, xususiy kompaniya yoki oddiy fuqaro uchun ma’lumotlarni o‘z serverida saqlaydigan, bepul va mustaqil messenjer hanuz yo‘q.',
    'Bu muammo ta’lim sohasida ayniqsa sezilarli. Universitetlarda har bir guruh, kafedra va fakultet uchun alohida chatlar ochiladi. Ularda dars jadvali, topshiriqlar, baholar va shaxsiy hujjatlar almashiladi. Bugun bunday chatlar xorijiy messenjerlarda yaratiladi va ularni universitetning o‘zi emas, alohida o‘qituvchi yoki talaba boshqaradi. Har bir yangi a’zoni qo‘lda qo‘shish kerak bo‘ladi, chatga kim kirgani esa nazorat qilinmaydi. Ish e-pochtasi orqali avtomatik a’zolik bu jarayonni tartibga soladi: universitet pochtasi bilan kirgan odam o‘z tashkilotining guruhiga o‘zi tushadi.',
    'Iqtisodiy tomoni ham muhim. Korporativ messenjerlarning ko‘pi pullik va narx har bir foydalanuvchi uchun hisoblanadi. Humo ham har bir xodim uchun oylik obuna asosida ishlaydi [41]. Minglab xodimi bor tashkilot uchun bu katta xarajat. Ochiq kodli texnologiyalarda yaratilgan va tashkilotning o‘z serverida ishlaydigan messenjer uchun esa litsenziya to‘lovi kerak emas: tashkilot faqat server uchun haq to‘laydi.',
    'Bundan tashqari, mavjud messenjerlar o‘zbek foydalanuvchisiga xos ikki ehtiyojni hisobga olmaydi. Birinchisi — ikki yozuv. Bir kishi kirillda, boshqasi lotinda yozadi, lotincha qidiruv esa kirillcha xabarni topmaydi. Ikkinchisi — tashkilotga a’zolikni tasdiqlash. Telefon raqami odamning qaysi universitet yoki kompaniyada ishlashini ko‘rsatmaydi. Bitiruv malakaviy ishida bu muammolarga quyidagi yechimlar taklif etildi:',
  ),
  ...bullets([
    'lotin va kirill yozuvlari o‘rtasida avtomatik o‘girish. Har bir foydalanuvchi xabarni o‘zi o‘rgangan yozuvda o‘qiydi, qidiruv esa ikkala yozuvda ham ishlaydi. Algoritm o‘zbek imlosining murakkab joylarini hisobga oladi: masalan, “е” harfi so‘z boshida “ye”, o‘rtasida “e” bo‘ladi;',
    'ish e-pochtasi orqali tashkilotga qo‘shilish. Tashkilotni oldindan ro‘yxatdan o‘tkazish shart emas: masalan, universitet pochtasi bilan kirgan har bir kishi avtomatik ravishda universitetning yopiq guruhiga tushadi;',
    'maxfiy chatlar. Xabarlar foydalanuvchining brauzerida shifrlanadi va faqat suhbatdoshning brauzerida ochiladi. Server xabar mazmunini ko‘rmaydi va saqlamaydi.',
  ]),
  ...ps(
    'Ishning dolzarbligi texnik tomondan ham asoslanadi. Real vaqtda xabar almashish texnologiyalari bugun yetarlicha rivojlangan va ochiq kodli vositalar sifatida bepul taqdim etiladi [17, 29]. Ilgari bunday tizimni faqat yirik kompaniyalar qura olgan bo‘lsa, endi uni kichik jamoa ham ishlab chiqishi mumkin. Bu ishda yaratilgan dastur shuning amaliy isbotidir: u faqat ochiq kodli va bepul texnologiyalar asosida qurilgan.',
    'Yana bir muhim jihat — internet sifati. Respublikaning hamma hududida ham internet bir xil tez emas, mobil aloqa esa ba’zan uzilib qoladi. Shuning uchun messenjer sekin aloqada ham qulay ishlashi kerak. “Milliy” xabarchi rasmlarni yuborishdan oldin siqadi, videoning yengil nusxasini beradi, aloqa uzilganda yozilgan xabarlarni navbatda saqlab turadi va aloqa tiklanishi bilan yuboradi. Bu imkoniyatlar uchinchi bobda batafsil yoritilgan.',
    'Yuqorida aytilganlar O‘zbekiston foydalanuvchilari uchun ma’lumotlarni o‘z mamlakatida saqlaydigan, mustaqil, bepul va mahalliy ehtiyojlarni hisobga oladigan messenjer yaratish dolzarb vazifa ekanini ko‘rsatadi. Bitiruv malakaviy ishining mavzusi aynan shu vazifaga bag‘ishlangan.',
  ),
  h3('2. Bitiruv malakaviy ishining maqsadi.'),
  ...ps(
    'Loyihaning maqsadi — foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan, shaxsiy va guruh suhbatlarida xabarlarni real vaqtda yetkazadigan “Milliy” xabarchini loyihalash va ishlab chiqish.',
    'Bunday xabarchini universitet, kompaniya yoki davlat idorasi o‘z serveriga o‘rnatib, ichki aloqa vositasi sifatida ishlatishi mumkin. Uni boshqa axborot tizimlariga ham qo‘shsa bo‘ladi. Buning amaliy isboti bor: bitiruv malakaviy ishida yaratilgan chat texnologiyasi asosida Elektron kooperatsiya portalida kompaniyalar o‘rtasida yozishish uchun chat moduli ishlab chiqildi.',
  ),
  h3('3. Bitiruv malakaviy ishining vazifalari.'),
  p('Maqsadga erishish uchun quyidagi vazifalar belgilandi:'),
  ...bullets([
    'mashhur messenjerlarni hamda serverdan brauzerga xabar yetkazish usullarini solishtirib, loyiha uchun texnologiyalarni tanlash;',
    'tizimga qo‘yiladigan talablarni aniqlash, uning tuzilishi, ma’lumotlar bazasi va UML modellarini loyihalash;',
    'parolsiz, ya’ni e-pochtaga keladigan bir martalik kod yoki Google hisobi orqali xavfsiz kirishni yaratish;',
    '.NET muhitida va Angular’da shaxsiy va guruh chatlari, fayl almashish, reaksiyalar, lavhalar va onlayn holatni amalga oshirish;',
    'foydalanuvchilar ochiq fikr almashadigan forum bo‘limini yaratish;',
    'o‘zbek foydalanuvchisi uchun uchta o‘ziga xos imkoniyatni ishlab chiqish: lotin–kirill o‘girish, tashkilot rejimi va maxfiy chatlar;',
    'dasturni serverga joylashtirish va avtomatik testlar bilan tekshirish;',
    'dasturchi ish joyining xavfsizligi va ofisdan evakuatsiya qilish tartibini ishlab chiqish.',
  ]),
  h3('4. Bitiruv malakaviy ishining obyekti.'),
  p(
    'Bitiruv malakaviy ishining obyekti — Internet orqali matn va fayllar almashishga mo‘ljallangan messenjerlar.',
  ),
  h3('5. Bitiruv malakaviy ishining predmeti.'),
  p(
    'Bitiruv malakaviy ishining predmeti — messenjerda xabarni real vaqtda yetkazish, ma’lumotlarni saqlash va himoyalash usullari hamda ularni .NET va Angular yordamida amalga oshirish. Avval mavjud yechimlar solishtirildi, keyin tizim UML diagrammalari bilan modellashtirildi. Dastur bosqichma-bosqich yozildi va har bir bosqich avtomatik testlar bilan tekshirib borildi.',
  ),
  h3('6. Bitiruv malakaviy ishining tuzilishi va hajmi.'),
  p(
    'Bitiruv malakaviy ishi kirish, to‘rt bob, xulosa, foydalanilgan adabiyotlar ro‘yxati va ilovalardan iborat. I bobda mavjud messenjerlar va real vaqtda aloqa texnologiyalari tahlil qilinib, vazifa qo‘yilgan. II bob tizimni loyihalashga, III bob dasturni yaratish, sinash va undan foydalanishga, IV bob hayot faoliyati xavfsizligiga bag‘ishlangan. Bitiruv malakaviy ishi 95 betdan iborat bo‘lib, unda 41 ta rasm, 17 ta jadval, 1 ta formula, 43 ta adabiyot va 5 ta ilova bor.',
  ),
];
