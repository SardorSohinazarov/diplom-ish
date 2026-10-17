# "Milliy chat" — keyingi yaxshilanishlar rejasi

> Bu reja alohida suhbatda bajarilishi uchun yozilgan va o'zi yetarli. Bajaruvchi har bir banddan oldin tegishli
> fayllarni o'qib, reja hali ham kodga mos ekanini tekshirsin. `NationalChat/AGENTS.md` qoidalari majburiy.

## 0. Hozirgi holat (2026-10-17)

Sekin internet uchun quyidagilar qilingan va `qales.uz`ga deploy qilingan:

| Qilingan | Qayerda |
|---|---|
| SignalR cheksiz qayta ulanish, "Ulanmoqda…" yozuvi, GET so'rovlarga timeout va qayta urinish | `core/connection-retry.ts`, `core/network-retry.interceptor.ts` |
| Token yangilash tarmoq xatosida foydalanuvchini chiqarib yubormaydi | `core/auth.service.ts` (`isRefreshRefused`) |
| Media `Cache-Control: immutable` | API `Filters/ImmutableMediaAttribute.cs` |
| Ochilishda avval chatlar ro'yxati, qolgani keyin | `chat-api.service.ts` (`firstChatsSettled`) |
| Service worker (oflayn ochilish) + PWA manifest | `ngsw-config.json`, `public/manifest.webmanifest` |
| Chatlar, profil, oxirgi xabarlar IndexedDB keshi | `chat-cache.service.ts` |
| Avatar/rasmlarni ko'ringanda yuklash, "Rasmlarni yuklash" sozlamasi | `shared/visible`, `core/media-autoload.service.ts` |
| Ishlash ko'rsatkichlari: `GET https://api.qales.uz/api/performance/summary?days=30` | `core/performance.service.ts`, API `Features/Performance` |
| SignalR MessagePack (realtime trafigi ~32% kam) | `core/hub-protocol.ts` |
| Rasm/video xira nusxalari (~200 B) | API `Storage/ImagePlaceholder.cs`, `PlaceholderBackfill` |
| Outbox: internetsiz yozilgan xabar navbatda, takrorsiz qayta yuborish | `outbox.service.ts`, `Message.ClientMessageId` |
| Delta sync: chat ochilganda/qayta ulanganda faqat o'zgarishlar | `GET /messages/sync`, `message-sync.util.ts` |

Deploy tartibi: avval API (`NationalChat` → `master`, health tekshiruvi o'tishi kutiladi), keyin klient
(`NationalChatClient` → `main`). Migratsiyani lokal PostgreSQL'da sinab, so'ng deploy qilish usuli ishonchli ishladi.

## 1. Darhol: xavfsizlik (serverga kirish kerak)

| № | Ish | Nima uchun |
|---|---|---|
| 1.1 | **root parolini almashtirish**, Telegram guruhidagi pinned xabardan parolni o'chirish | Parol "Vps monitoring" guruhida ochiq turibdi |
| 1.2 | `PermitRootLogin prohibit-password`, `PasswordAuthentication no` (faqat SSH kalit) | Parol bilan kirishni butunlay yopadi |
| 1.3 | Bazaning kunlik zaxira nusxasi (`pg_dump` + boshqa joyga nusxa) va tiklashni bir marta sinash | Migratsiyalar endi tez-tez; hozir zaxira bor-yo'qligi noma'lum |

## 2. Faqat kod bilan (telefondan ham bajarsa bo'ladi), osondan qiyinga

| № | Ish | Qayerda | Hajm | Foyda |
|---|---|---|---|---|
| 2.1 | **Tab nomi "Milliy Chat"**: `<title>NationalChat</title>` va `Title` xizmatidagi nom | Klient `index.html`, `chat-page.component.ts` | kichik | Brend bir xil (manifest va kirish sahifasi "Milliy Chat") |
| 2.2 | **Ko'rsatkichlar sahifasi**: `/performance/summary` ni jadval/grafik bilan ko'rsatuvchi oddiy sahifa (p50/p75/p95, kesh va server farqi) | Klient yangi `features/stats` | kichik | Diplom himoyasida jonli ko'rsatish |
| 2.3 | **Outbox'ni chatlar ro'yxatida ko'rsatish**: yuborilmagan xabari bor chat yonida ⏱ | `chat-list-item`, `outbox.service.ts` | kichik | Foydalanuvchi qaysi chatda kutayotgan xabar borligini ko'radi |
| 2.4 | **Rasm yuborishni ham outbox orqali** (fayl IndexedDB'da Blob sifatida, yuklash foizi, qayta urinish) | `outbox.service.ts`, API `MessageAttachmentController` (ClientMessageId) | o'rtacha | Hozir faqat matn navbatda turadi |
| 2.5 | **Rasm siqish yuborishdan oldin** (canvas/`createImageBitmap` bilan 1600 px, JPEG/WebP 0.8) | Klient `message-composer` | o'rtacha | 4–8 MB telefon rasmi ~300 KB bo'ladi; sekin internetda eng katta yutuq |
| 2.6 | **Chatlar ro'yxatini ham delta qilish** (`GET /chats/sync?since=`) | API `Features/Chats`, klient `loadChats` | o'rtacha | Qayta ulanishdagi oxirgi to'liq yuklash ham qisqaradi. O'chirilgan/tark etilgan chatlar uchun `ChatMember` o'zgarish vaqti kerak |
| 2.7 | **Forum va hikoyalarni keshlash** (IndexedDB, chat keshi kabi) | `forum-api.service.ts`, `stories-api.service.ts` | o'rtacha | Hozir faqat chatlar oflayn ko'rinadi |
| 2.8 | **Video uchun HLS/past sifatli variant** (ffmpeg bilan 360p nusxa, sekin internetda o'sha beriladi) | API `Storage`, `FfmpegVideoProbe` | katta | Video eng og'ir trafik |
| 2.9 | **E2E testlar** (Playwright, lokal API + PostgreSQL): oflayn → onlayn, outbox, delta sync, MessagePack | Yangi `e2e/` papka, GitHub Actions | o'rtacha | Bu suhbatda qo'lda qilingan sinovlar avtomatlashadi |

## 3. Serverga kirish kerak bo'lganlar

| № | Ish | Nima qilinadi | Foyda |
|---|---|---|---|
| 3.1 | **HTTP/3 (QUIC)** | `/opt/proxy` compose'da `443:443/udp`, firewall'da UDP 443 | Mobil internetda ulanish barqarorroq, tezroq tiklanadi |
| 3.2 | **Web Push bildirishnomalari** | VAPID kalitlarini serverdagi `.env`ga qo'shish; kod: obunalar jadvali, yuborish servisi, service worker'da `push` | Sayt yopiq bo'lsa ham xabar keladi |
| 3.3 | **Redis presence** | Redis konteyneri; kodda `InMemoryPresenceTracker` o'rniga Redis (kod tayyorlangan) | Bir nechta API nusxasi va restartdan keyin "onlayn" holati saqlanadi |
| 3.4 | **Monitoring ogohlantirishlari** | Alertagram'ga API `/health` va `performance/summary` p75 chegarasi (masalan, chatList p75 > 5 s) | Sekinlashuvni foydalanuvchidan oldin bilish |

## 4. Diplom uchun

- 0-bo'limdagi ishlarni diplomning "Sekin internet sharoitida ishlash" bo'limiga kiritish: muammo, boshqa messenjerlar
  yechimlari (Telegram, WhatsApp, Signal), qilingan ishlar va o'lchovlar.
- Bu suhbatda lokal o'lchangan raqamlar: MessagePack 1334 B → 903 B (−32%); delta sync 3795 B → 128 B (chatni qayta
  ochish), 3547 B → 956 B (o'zgarishlardan keyin); 40 ta chatdan dastlab 5 ta avatar yuklanadi; xira nusxa 191 B.
- Real foydalanuvchilar raqamlari bir-ikki hafta yig'ilgach `performance/summary?days=30` dan olinadi
  (kesh va server bo'yicha chatlar ro'yxati vaqti — keshning foydasini isbotlaydi).

**Tavsiya etilgan tartib:** 1.1–1.3 (xavfsizlik) → 2.1, 2.2 → 2.5 (rasm siqish, eng katta trafik yutug'i) → 2.4 →
3.1, 3.2 → qolganlari.
