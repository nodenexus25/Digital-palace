#!/usr/bin/env node
// Export untranslated values as a patch template: each missing value is
// written with the *source* text (from the other language) as its body, ready
// to be replaced with the translation and fed to apply-translations.mjs.
//
// Usage: node scripts/i18n/export-todo.mjs <dataset> <targetLang> [--field name] [--limit N] [--skip N] [--out file]
import fs from 'node:fs';
import { contentFile, formatEntry, readJson } from './translation-format.mjs';

const [ds, target] = process.argv.slice(2);
const opt = (n) => {
  const i = process.argv.indexOf(n);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const field = opt('--field');
const limit = Number(opt('--limit') ?? Infinity);
const skip = Number(opt('--skip') ?? 0);
const out = opt('--out');
if (!ds || !['en', 'hi'].includes(target)) {
  console.error('usage: export-todo.mjs <dataset> <en|hi> [--field f] [--limit n] [--skip n] [--out file]');
  process.exit(2);
}
const source = target === 'en' ? 'hi' : 'en';
const tgt = readJson(contentFile(ds, target));
const src = readJson(contentFile(ds, source));

const todo = [];
function visit(p, t, s, fieldPath) {
  if (t === null || t === undefined) {
    if (s === null || s === undefined) return;
    if (!field || fieldPath.startsWith(field)) todo.push([p, s]);
    return;
  }
  if (Array.isArray(t) && Array.isArray(s)) {
    // A whole list is missing if every item is null.
    t.forEach((v, i) => visit(`${p}[${i}]`, v, s[i], fieldPath));
  } else if (t && typeof t === 'object' && s && typeof s === 'object') {
    for (const k of Object.keys(s)) visit(`${p}.${k}`, t[k], s[k], fieldPath ? `${fieldPath}.${k}` : k);
  }
}
for (const coll of Object.keys(src)) {
  for (const id of Object.keys(src[coll])) {
    const t = tgt[coll]?.[id];
    const s = src[coll][id];
    if (t == null) {
      if (!field) todo.push([`${coll}.${id}`, s]);
      continue;
    }
    for (const k of Object.keys(s)) visit(`${coll}.${id}.${k}`, t[k], s[k], k);
  }
}

const slice = todo.slice(skip, skip + limit);
const text = slice.map(([p, v]) => formatEntry(ds, target, p, v)).join('\n');
if (out) fs.writeFileSync(out, text);
else process.stdout.write(text);
const chars = slice.reduce((n, [, v]) => n + JSON.stringify(v).length, 0);
console.error(`${slice.length} of ${todo.length} untranslated (${ds} -> ${target}), ~${Math.round(chars / 1000)}k chars of source`);
