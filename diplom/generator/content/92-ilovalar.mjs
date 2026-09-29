// Appendices: real source files read straight from the repositories at build time,
// so the listings always match the code.
import fs from 'node:fs';
import path from 'node:path';
import { code, h1, h2, p, ROOT } from '../lib.mjs';

const REPOS = path.join(ROOT, '..', '..');
const read = (...parts) => fs.readFileSync(path.join(REPOS, ...parts), 'utf8');

/** Lines from the first line containing `from` up to (but not including) the first following line containing `before`. */
function slice(source, from, before) {
  const lines = source.replace(/\r/g, '').split('\n');
  const start = lines.findIndex((l) => l.includes(from));
  const end = lines.findIndex((l, i) => i > start && l.includes(before));
  if (start < 0 || end < 0) throw new Error(`slice not found: ${from} … ${before}`);
  return lines.slice(start, end).join('\n');
}

const listing = (title, file, source) => [h2(title), p(`Fayl: ${file}`, { noIndent: true }), ...code(source.trimEnd())];

export const appendix = () => [
  h1('Ilovalar'),
  ...listing('1-ilova. SignalR habi (ChatHub)', 'NationalChat/src/API/Hubs/ChatHub.cs', read('NationalChat', 'src', 'API', 'Hubs', 'ChatHub.cs')),
  ...listing(
    '2-ilova. Lotin matnini kirillga o‘girish (UzbekTransliterator, parcha)',
    'NationalChat/src/Domain/Text/UzbekTransliterator.cs',
    slice(read('NationalChat', 'src', 'Domain', 'Text', 'UzbekTransliterator.cs'), '    private static string ToCyrillicSegment(', '    private static HashSet<int> FindExceptionTsPositions('),
  ),
  ...listing(
    '3-ilova. Maxfiy chatlar kriptografiyasi: kalitlarni chiqarish, shifrlash va ochish (secret-crypto.ts, parcha)',
    'NationalChatClient/src/app/features/chat/secret/secret-crypto.ts',
    slice(read('NationalChatClient', 'src', 'app', 'features', 'chat', 'secret', 'secret-crypto.ts'), 'export async function deriveChains(', 'export interface SecretFingerprint'),
  ),
  ...testsAppendix(),
];

/** The tests live on the feature/unit-tests branch; skip the appendix if that branch is not checked out. */
function testsAppendix() {
  const file = path.join(REPOS, 'NationalChat', 'tests', 'NationalChat.Tests', 'Groups', 'GroupServiceTests.cs');
  if (!fs.existsSync(file)) {
    console.warn('4-ilova tashlab ketildi: GroupServiceTests.cs topilmadi (feature/unit-tests branch tanlanmagan).');
    return [];
  }
  const source = slice(fs.readFileSync(file, 'utf8'), '    [Fact]', '    public async Task AddMembers_ByRegularMember_IsForbidden()')
    .replace(/\n\s*\[Fact\]\s*$/, '');
  return listing('4-ilova. Guruh chatlari uchun unit testlar (parcha)', 'NationalChat/tests/NationalChat.Tests/Groups/GroupServiceTests.cs', source);
}
