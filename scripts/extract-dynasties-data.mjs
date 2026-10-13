// One-off script: extract dynastiesData array from page.tsx.orig into data.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pagePath = join(__dirname, '..', 'src', 'app', 'dynasties', 'page.tsx.orig');
const outPath = join(__dirname, '..', 'src', 'app', 'dynasties', 'data.ts');

const src = readFileSync(pagePath, 'utf8');
const lines = src.split('\n');

const startMarker = 'const dynastiesData: Dynasty[] = [';
let startLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(startMarker)) { startLine = i; break; }
}
if (startLine === -1) throw new Error('start marker not found');

// The array closes with a line that is exactly '];' (only one such line in the file).
let endLine = -1;
for (let i = startLine; i < lines.length; i++) {
  if (lines[i].trim() === '];') { endLine = i; break; }
}
if (endLine === -1) throw new Error('array close ]; not found');

// Reconstruct the array literal (from the '[' of the declaration to the closing '];').
const blockLines = lines.slice(startLine, endLine + 1);
const block = blockLines.join('\n');
const bracketIdx = block.indexOf('[');
const arrayLiteral = block.slice(bracketIdx);

const out = `import 'server-only';
import type { Dynasty } from '../../types/frontend';

export const dynastiesData: Dynasty[] = ${arrayLiteral}
`;

writeFileSync(outPath, out, 'utf8');
console.log('Wrote', outPath, 'bytes=', Buffer.byteLength(out, 'utf8'), 'lines=', endLine - startLine + 1);
