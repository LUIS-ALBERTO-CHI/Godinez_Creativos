import { readFileSync, writeFileSync } from 'fs';

const file = 'd:/godinez-creativos/src/App.tsx';
let c = readFileSync(file, 'utf8');

// These are mojibake patterns: latin1-read UTF-8 bytes showing up in source
// The pattern is: correct char was UTF-8 encoded, then read as latin1
// á = C3 A1 -> Ã¡ -> after prior fix became Á¡ -> now shows as Á¡
// We need to fix the Á-prefix patterns

const map = [
  // Á + next char patterns (U+00C1 followed by latin1 continuation)
  ['\u00C1\u00BA', 'ú'],   // ú
  ['\u00C1\u00B1', 'ñ'],   // ñ
  ['\u00C1\u00B3', 'ó'],   // ó
  ['\u00C1\u00A9', 'é'],   // é
  ['\u00C1\u00AD', 'í'],   // í
  ['\u00C1\u00A1', 'á'],   // á
  ['\u00C1\u00BC', 'ü'],   // ü
  ['\u00C1\u00B6', 'ö'],   // ö
  // Á‚¿ = ¿
  ['\u00C1\u201A\u00BF', '¿'],
  ['\u00C1\u201A\u00A1', '¡'],
  ['\u00C1\u201A\u00A9', 'é'],
  ['\u00C1\u201A\u00B7', '·'],
  // Á‚© = é (another pattern)
  ['\u00C1\u201A\u00B3', 'ó'],
  // Á¢â‚¬â€ = —  (em dash)
  ['\u00C1\u00A2\u00E2\u20AC\u201C', '—'],
  ['\u00C1\u00A2\u00E2\u20AC\u2022', '–'],
  // Á° = 🚀 prefix mess - just fix the visible text
  ['\u00C1\u00B0\u0141\u00B8\u0141\u00BD\u00E2\u20AC\u00B0', '🚀'],
  ['\u00C1\u00B0\u0141\u00B8\u0161\u201A\u00AC', '🎉'],
  // Ã patterns still remaining
  ['\u00C3\u00E2\u20AC\u02DC', 'ñ'],
  ['\u00C3\u00C5\u00A1', 'Ú'],
  // GodÁ­nez -> Godínez
  ['\u00C1\u00AD', 'í'],
  // © 
  ['\u00C1\u201A\u00A9', 'é'],
  // MÁS -> MÁS is already correct (Á = Á)
  // Fix remaining Á followed by latin1 continuation bytes
  ['\u00C1\u00A3', 'ó'],  // edge case
];

let total = 0;
for (const [bad, good] of map) {
  const before = c;
  c = c.split(bad).join(good);
  if (c !== before) {
    console.log(`Fixed: ${JSON.stringify(bad)} -> ${good}`);
    total++;
  }
}

writeFileSync(file, c, 'utf8');
console.log(`\nDone. ${total} patterns fixed.`);
