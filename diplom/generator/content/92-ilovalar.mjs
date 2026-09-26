// Appendices: real source files read straight from the repositories at build time,
// so the listings always match the code.
import fs from 'node:fs';
import path from 'node:path';
import { code, h1, h2, p, ROOT } from '../lib.mjs';

const REPOS = path.join(ROOT, '..', '..');
const read = (...parts) => fs.readFileSync(path.join(REPOS, ...parts), 'utf8');

/** Lines from the first line containing `from` up to and including the first following line containing `to`. */
function slice(source, from, to) {
  const lines = source.replace(/\r/g, '').split('\n');
  const start = lines.findIndex((l) => l.includes(from));
  const end = lines.findIndex((l, i) => i > start && l.includes(to));
  if (start < 0 || end < 0) throw new Error(`slice not found: ${from} … ${to}`);
  return lines.slice(start, end + 1).join('\n');
}

const listing = (title, file, source) => [h2(title), p(`Fayl: ${file}`, { noIndent: true }), ...code(source.trimEnd())];

export const appendix = () => [
  h1('Ilovalar'),
  ...listing('1-ilova. SignalR habi (ChatHub)', 'NationalChat/src/API/Hubs/ChatHub.cs', read('NationalChat', 'src', 'API', 'Hubs', 'ChatHub.cs')),
  ...listing(
    '2-ilova. Guruh chatlari servisi (GroupService)',
    'NationalChat/src/Application/Features/Groups/Services/GroupService.cs',
    read('NationalChat', 'src', 'Application', 'Features', 'Groups', 'Services', 'GroupService.cs'),
  ),
  ...listing(
    '3-ilova. Bir martalik kodlarni xeshlash (PBKDF2)',
    'NationalChat/src/Infrastructure/Security/Hashing/Pbkdf2OneTimeCodeHasher.cs',
    read('NationalChat', 'src', 'Infrastructure', 'Security', 'Hashing', 'Pbkdf2OneTimeCodeHasher.cs'),
  ),
  ...listing(
    '4-ilova. Klientdagi real vaqt ulanishi (ChatRealtimeService)',
    'NationalChatClient/src/app/features/chat/data-access/chat-realtime.service.ts',
    slice(read('NationalChatClient', 'src', 'app', 'features', 'chat', 'data-access', 'chat-realtime.service.ts'), '  async connect(): Promise<void> {', '    this.connection.onclose('),
  ),
  ...testsAppendix(),
  ...listing(
    '6-ilova. O‘zbek yozuvlari o‘rtasida transliteratsiya (UzbekTransliterator)',
    'NationalChat/src/Domain/Text/UzbekTransliterator.cs',
    read('NationalChat', 'src', 'Domain', 'Text', 'UzbekTransliterator.cs'),
  ),
  ...listing(
    '7-ilova. Maxfiy chatlar kriptografiyasi: kalitlarni chiqarish, shifrlash va ratchet (secret-crypto.ts, parcha)',
    'NationalChatClient/src/app/features/chat/secret/secret-crypto.ts',
    slice(read('NationalChatClient', 'src', 'app', 'features', 'chat', 'secret', 'secret-crypto.ts'), 'export async function deriveChains(', 'function associatedData('),
  ),
];

/** The tests live on the feature/unit-tests branch; skip the appendix if that branch is not checked out. */
function testsAppendix() {
  const file = path.join(REPOS, 'NationalChat', 'tests', 'NationalChat.Tests', 'Groups', 'GroupServiceTests.cs');
  if (!fs.existsSync(file)) {
    console.warn('5-ilova tashlab ketildi: GroupServiceTests.cs topilmadi (feature/unit-tests branch tanlanmagan).');
    return [];
  }
  const source = slice(fs.readFileSync(file, 'utf8'), '    [Fact]', '    public async Task AddMembers_ByRegularMember_IsForbidden()')
    .replace(/\n\s*\[Fact\]\n\s*public async Task AddMembers_ByRegularMember_IsForbidden\(\)$/, '');
  return listing('5-ilova. Guruh chatlari uchun unit testlar (parcha)', 'NationalChat/tests/NationalChat.Tests/Groups/GroupServiceTests.cs', source);
}
