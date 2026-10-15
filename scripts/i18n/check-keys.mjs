#!/usr/bin/env node
// Every translation key referenced in code must exist in both dictionaries.
// Finds t('k'), tr('k'), translate(lang, 'k'), <TransText k="k" />, altKey="k",
// and keys listed in `key: 'k'` / translationKey: 'k' tables. Dynamic keys
// (template literals) are expanded from DYNAMIC below.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/app/i18n/en.json'), 'utf8'));
const hi = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/app/i18n/hi.json'), 'utf8'));

const CLANS = ['Sisodia', 'Kachwaha', 'Rathore', 'Bhati', 'Chauhan', 'Doda', 'Jadaun', 'Jat', 'Hada', 'Shekhawat', 'Royal'];
const DYNAMIC = [
  ...['religious', 'cultural', 'commemoration'].map((g) => `festivals.groups.${g}`),
  ...CLANS.map((c) => `forts.clans.${c}`),
];

const PATTERNS = [
  /\b(?:t|tr)\(\s*['"]([\w.]+)['"]/g,
  /\btranslate\(\s*\w+\s*,\s*['"]([\w.]+)['"]/g,
  /\bk=["']([\w.]+)["']/g,
  /\baltKey=["']([\w.]+)["']/g,
  /\b(?:key|translationKey|eraKey|dateKey|textKey|title|name|motif|description|text):\s*["']((?:home|nav|common|footer|forts|battles|dynasties|legends|folklore|festivals|weapons|stories|audio|gallery|concepts|meta|blogs|sitemap|privacy|terms|error|notFound)\.[\w.]+)["']/g,
  /\[\s*['"]((?:forts|dynasties)\.[\w.]+)['"]\s*,/g,
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx?|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

const used = new Map();
for (const file of walk(path.join(ROOT, 'src'))) {
  const src = fs.readFileSync(file, 'utf8');
  for (const re of PATTERNS) for (const m of src.matchAll(re)) {
    if (!used.has(m[1])) used.set(m[1], path.relative(ROOT, file));
  }
}
for (const k of DYNAMIC) used.set(k, '(dynamic)');

let missing = 0;
for (const [key, where] of [...used].sort()) {
  const gaps = [!(key in en) && 'en', !(key in hi) && 'hi'].filter(Boolean);
  if (gaps.length) {
    missing++;
    console.log(`missing in ${gaps.join('+').padEnd(5)} ${key.padEnd(44)} ${where}`);
  }
}
const unused = Object.keys(en).filter((k) => !used.has(k));
if (process.argv.includes('--unused')) unused.forEach((k) => console.log(`unused ${k}`));
console.log(`\n${used.size} keys used, ${missing} missing, ${unused.length} defined but not referenced statically`);
process.exitCode = missing ? 1 : 0;
