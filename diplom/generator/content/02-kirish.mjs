import { bullets, h1, h3, p, ps } from '../lib.mjs';

// The six numbered parts of the introduction follow the department's required order.
export const introduction = () => [
  h1('Kirish'),
  h3('1. Diplom loyihaning dolzarbligi.'),
  ...ps(
    'Talabalar guruhining e’lonlari, kafedra bilan yozishmalar, ish jamoasidagi kundalik muhokamalar — bularning barchasi bugun messenjerda kechadi. O‘zbekistonda bu vazifani asosan Telegram va WhatsApp bajaradi. Ikkalasi ham xorijiy kompaniyaga tegishli, shuning uchun millionlab fuqarolarning yozishmalari, kontaktlari va kim bilan qachon muloqot qilgani haqidagi ma’lumotlar mamlakat tashqarisidagi serverlarda saqlanadi va ularga milliy qonunchilik ta’sir o‘tkaza olmaydi.',
    'Davlat bu muammoni qonun darajasida tan olgan. “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonunga 2021-yilda kiritilgan o‘zgartishlar fuqarolar haqidagi ma’lumotlarni respublika hududidagi serverlarda saqlashni talab qiladi [1], “Raqamli O‘zbekiston – 2030” strategiyasi esa mahalliy dasturiy mahsulotlarni rivojlantirishni ustuvor yo‘nalish deb belgilaydi [7]. Xorijiy messenjerlar bu talablarga javob bermaydi, demak ma’lumotlarni o‘z serverida saqlaydigan milliy muqobil kerak.',
    'Bundan tashqari, xorijiy ilovalar o‘zbek foydalanuvchisiga xos ikki ehtiyojni hisobga olmaydi. Birinchisi — ikki yozuv: bir foydalanuvchi kirillda, ikkinchisi lotinda yozadi va lotincha qidiruv kirillcha xabarni topmaydi. Ikkinchisi — tashkilot a’zoligini tasdiqlash: telefon raqami odamning qaysi universitet yoki kompaniyaga tegishli ekanini ko‘rsatmaydi. Diplom loyihasida bu ehtiyojlar uchun quyidagi yechimlar taklif etildi:',
  ),
  ...bullets([
    'o‘zbek tilining lotin va kirill yozuvlari o‘rtasida so‘zdagi o‘rniga qarab o‘zgaradigan qoidalarni (“е” → “ye”/“e”, “ц” → “ts”/“s” va boshqalar) hisobga oluvchi transliteratsiya algoritmi: har bir foydalanuvchi xabarni o‘zi tanlagan yozuvda o‘qiydi, qidiruv esa yozuvdan qat’i nazar ishlaydi;',
    'tashkilotni oldindan ro‘yxatga olishni talab qilmaydigan yondashuv: tasdiqlangan e-pochta domeni tashkilot a’zoligining isboti sifatida qabul qilinadi va shu domen egalari uchun yopiq guruh avtomatik tuziladi;',
    'uchinchi tomon kutubxonalarisiz, faqat brauzerga o‘rnatilgan kriptografik vositalar (X25519, HKDF, HMAC, AES-256-GCM) asosidagi maxfiy chat protokoli: serverda xabar mazmuni saqlanmaydi.',
  ]),
  h3('2. Diplom loyihaning maqsadi.'),
  ...ps(
    'Loyihaning maqsadi — foydalanuvchi ma’lumotlarini o‘z serverida saqlaydigan va shaxsiy hamda guruh yozishmalarida real vaqtda xabar almashish imkonini beruvchi “Milliy” xabarchini loyihalash va ishlab chiqishdir.',
    'Bunday xabarchini universitet, kompaniya yoki davlat idorasi o‘z serveriga o‘rnatib, ichki aloqa vositasi sifatida ishlatishi mumkin. Masalan, universitet pochtasi bilan kirgan talaba yoki o‘qituvchi hech qanday qo‘shimcha sozlamasiz universitetning yopiq guruhiga tushadi.',
  ),
  h3('3. Diplom loyihaning vazifalari.'),
  p('Qo‘yilgan maqsadga erishish uchun quyidagi vazifalar belgilandi:'),
  ...bullets([
    'mashhur messenjerlarni va serverdan brauzerga ma’lumot yetkazish usullarini solishtirib, loyiha uchun texnologiya tanlash;',
    'tizimga qo‘yiladigan talablarni aniqlab, uning arxitekturasi, ma’lumotlar bazasi va UML modellarini loyihalash;',
    'parolsiz, bir martalik kod va Google hisobiga asoslangan xavfsiz kirish tizimini yaratish;',
    '.NET 8, SignalR va Angular yordamida shaxsiy va guruh chatlari, fayl almashish, reaksiyalar, lavhalar (stories) va onlayn holatni amalga oshirish;',
    'foydalanuvchilar ochiq fikr almashadigan forum bo‘limini (postlar, javoblar, obunalar, top lenta) yaratish;',
    'o‘zbek foydalanuvchisiga xos uchta imkoniyatni — lotin–kirill transliteratsiyasi, tashkilot rejimi va shifrlangan maxfiy chatlarni ishlab chiqish;',
    'dasturni bulutli serverga joylashtirib, avtomatik testlar bilan tekshirish;',
    'dasturchi ish joyining xavfsizligi va ofisdan evakuatsiya qilish tartibini ishlab chiqish.',
  ]),
  h3('4. Diplom loyihaning obyekti.'),
  p(
    'Diplom loyihaning obyekti — Internet orqali matn va fayllar almashishga mo‘ljallangan messenjerlar.',
  ),
  h3('5. Diplom loyihaning predmeti.'),
  p(
    'Diplom loyihaning predmeti — messenjerda xabarni real vaqtda yetkazish, ma’lumotlarni saqlash va himoyalash usullari hamda ularning .NET va Angular platformalarida amalga oshirilishi. Mavjud yechimlar qiyosiy tahlil orqali o‘rganildi, tizim UML diagrammalari bilan modellashtirildi, dastur esa bosqichma-bosqich ishlab chiqilib, har bir bosqichda avtomatik testlar bilan tekshirib borildi.',
  ),
  h3('6. Diplom loyiha tuzilishi va hajmi.'),
  p(
    'Diplom loyihasi kirish, to‘rt bob, xulosa, foydalanilgan adabiyotlar ro‘yxati va ilovalardan tashkil topgan. I bobda mavjud messenjerlar va real vaqt texnologiyalari tahlil qilinib, vazifa aniq qo‘yilgan. II bob tizimni loyihalashga, III bob dasturni yaratish, sinash va undan foydalanishga, IV bob hayot faoliyati xavfsizligiga bag‘ishlangan. Diplom loyihasi 89 betdan iborat bo‘lib, unda 42 ta rasm, 19 ta jadval, 10 ta formula, 51 ta adabiyot va 5 ta ilova bor.',
  ),
];
