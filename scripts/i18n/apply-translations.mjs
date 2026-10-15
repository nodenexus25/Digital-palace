#!/usr/bin/env node
// Apply translation patch files (see translation-format.mjs) to src/content.
// Refuses to overwrite an existing translation unless --force is given, and
// refuses values in the wrong script (Latin in Hindi, Devanagari in English).
//
// Usage: node scripts/i18n/apply-translations.mjs <patch.txt>... [--force]
import fs from 'node:fs';
import { contentFile, getAt, parsePatch, parsePath, readJson, setAt, writeJson } from './translation-format.mjs';

const force = process.argv.includes('--force');
const files = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const docs = new Map();
const load = (ds, lang) => {
  const key = `${ds}/${lang}`;
  if (!docs.has(key)) docs.set(key, { file: contentFile(ds, lang), data: readJson(contentFile(ds, lang)), changed: 0 });
  return docs.get(key);
};

const wrongScript = (lang, v) => {
  const s = (Array.isArray(v) ? v.join(' ') : v).replace(/\{\w+\}/g, '');
  return lang === 'hi' ? /[A-Za-z]/.test(s) : /[ऀ-ॿ]/.test(s);
};

let errors = 0;
for (const file of files) {
  for (const e of parsePatch(fs.readFileSync(file, 'utf8'))) {
    const doc = load(e.ds, e.lang);
    const other = load(e.ds, e.lang === 'en' ? 'hi' : 'en');
    const segs = parsePath(e.path);
    const existing = getAt(doc.data, segs);
    const counterpart = getAt(other.data, segs);
    const where = `${file}: ${e.ds} ${e.lang} ${e.path}`;
    if (counterpart === undefined) { console.error(`✗ no such path in the other language — ${where}`); errors++; continue; }
    if (Array.isArray(counterpart) !== Array.isArray(e.value)) { console.error(`✗ list/text mismatch — ${where}`); errors++; continue; }
    if (Array.isArray(e.value) && e.value.length !== counterpart.length) {
      console.error(`✗ ${e.value.length} items but the other language has ${counterpart.length} — ${where}`); errors++; continue;
    }
    if (!e.value || (Array.isArray(e.value) && !e.value.length)) { console.error(`✗ empty value — ${where}`); errors++; continue; }
    if (wrongScript(e.lang, e.value)) { console.error(`✗ wrong script in ${e.lang} text — ${where}`); errors++; continue; }
    if (existing != null && !force && JSON.stringify(existing) !== JSON.stringify(e.value)) {
      console.error(`· skipped (already translated; use --force) — ${where}`); continue;
    }
    setAt(doc.data, segs, e.value);
    doc.changed++;
  }
}
for (const doc of docs.values()) if (doc.changed) { writeJson(doc.file, doc.data); console.log(`✓ ${doc.changed} value(s) → ${doc.file}`); }
process.exitCode = errors ? 1 : 0;
