#!/usr/bin/env node
// Bilingual integrity check for src/content/** and the UI dictionaries.
//
//  1. Parity    - every en.json / hi.json pair has the same shape (keys,
//                 array lengths) and no null (untranslated) values.
//  2. Purity    - English text contains no Devanagari; Hindi text contains no
//                 Latin letters (except an explicit allow-list of tokens).
//
// Usage:
//   node scripts/i18n/check-content.mjs              summary per dataset/field
//   node scripts/i18n/check-content.mjs --list       every problem path
//   node scripts/i18n/check-content.mjs --ds battles --field story --list
// Exit code is non-zero while any problem remains.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const CONTENT = path.join(ROOT, 'src/content');
const DICTS = path.join(ROOT, 'src/app/i18n');

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const LIST = args.includes('--list');
const ONLY_DS = opt('--ds');
const ONLY_FIELD = opt('--field');

const DEVANAGARI = /[ऀ-ॿ]/;
// Latin tokens tolerated inside Hindi text: none by default. Units and
// abbreviations must be written in Devanagari (ई., किमी, आदि).
const HI_LATIN_ALLOW = [];

function latinIn(text) {
  // {placeholders} are interpolation slots, not visible text.
  const words = text.replace(/\{\w+\}/g, '').match(/[A-Za-z][A-Za-z'.-]*/g) || [];
  return words.filter((w) => !HI_LATIN_ALLOW.includes(w));
}

const problems = [];
const _push = problems.push.bind(problems);
problems.push = (p) => (ONLY_FIELD && !fieldOf(p.path).startsWith(ONLY_FIELD) && p.ds !== 'ui' ? 0 : _push(p));
const stats = {}; // ds -> field -> {missingEn, missingHi, impureEn, impureHi}

function bump(ds, field, key) {
  if (ONLY_FIELD && !field.startsWith(ONLY_FIELD)) return;
  stats[ds] ??= {};
  stats[ds][field] ??= { missingEn: 0, missingHi: 0, impureEn: 0, impureHi: 0, shape: 0 };
  stats[ds][field][key]++;
}

// Field name used for grouping: `forts.chittorgarh.stories[2].title` -> `stories.title`
function fieldOf(p) {
  return p
    .split('.')
    .slice(2)
    .map((s) => s.replace(/\[\d+\]/g, ''))
    .join('.') || p;
}

function compare(ds, p, en, hi) {
  const field = fieldOf(p);
  if (en === null || hi === null) {
    if (en === null) { bump(ds, field, 'missingEn'); problems.push({ ds, path: p, kind: 'missing-en' }); }
    if (hi === null) { bump(ds, field, 'missingHi'); problems.push({ ds, path: p, kind: 'missing-hi' }); }
    // Still check purity of the side that exists.
    if (typeof en === 'string' && DEVANAGARI.test(en)) { bump(ds, field, 'impureEn'); problems.push({ ds, path: p, kind: 'devanagari-in-en' }); }
    if (typeof hi === 'string' && latinIn(hi).length) { bump(ds, field, 'impureHi'); problems.push({ ds, path: p, kind: 'latin-in-hi', sample: latinIn(hi).slice(0, 6).join(' ') }); }
    if (Array.isArray(en) || Array.isArray(hi)) {
      const a = Array.isArray(en) ? en : hi;
      a.forEach((v, i) => compare(ds, `${p}[${i}]`, Array.isArray(en) ? v : null, Array.isArray(hi) ? v : null));
    } else if (en && typeof en === 'object' || hi && typeof hi === 'object') {
      const o = (en && typeof en === 'object') ? en : hi;
      for (const k of Object.keys(o)) compare(ds, `${p}.${k}`, en?.[k] ?? null, hi?.[k] ?? null);
    }
    return;
  }
  if (typeof en === 'string' || typeof hi === 'string') {
    if (typeof en !== 'string' || typeof hi !== 'string') {
      bump(ds, field, 'shape'); problems.push({ ds, path: p, kind: 'shape' }); return;
    }
    if (DEVANAGARI.test(en)) { bump(ds, field, 'impureEn'); problems.push({ ds, path: p, kind: 'devanagari-in-en', sample: en.match(/[ऀ-ॿ][ऀ-ॿ\s]*/)?.[0].slice(0, 40) }); }
    const lat = latinIn(hi);
    if (lat.length) { bump(ds, field, 'impureHi'); problems.push({ ds, path: p, kind: 'latin-in-hi', sample: lat.slice(0, 6).join(' ') }); }
    return;
  }
  if (Array.isArray(en) || Array.isArray(hi)) {
    if (!Array.isArray(en) || !Array.isArray(hi) || en.length !== hi.length) {
      bump(ds, field, 'shape');
      problems.push({ ds, path: p, kind: 'shape', sample: `en ${Array.isArray(en) ? en.length : typeof en} / hi ${Array.isArray(hi) ? hi.length : typeof hi}` });
      return;
    }
    en.forEach((v, i) => compare(ds, `${p}[${i}]`, v, hi[i]));
    return;
  }
  if (en && typeof en === 'object' && hi && typeof hi === 'object') {
    const keys = new Set([...Object.keys(en), ...Object.keys(hi)]);
    for (const k of keys) {
      if (!(k in en) || !(k in hi)) { bump(ds, fieldOf(`${p}.${k}`), 'shape'); problems.push({ ds, path: `${p}.${k}`, kind: 'shape', sample: !(k in en) ? 'only in hi' : 'only in en' }); continue; }
      compare(ds, `${p}.${k}`, en[k], hi[k]);
    }
  }
}

// ---- content datasets
for (const ds of fs.readdirSync(CONTENT)) {
  if (ONLY_DS && ds !== ONLY_DS) continue;
  const dir = path.join(CONTENT, ds);
  if (!fs.statSync(dir).isDirectory()) continue;
  const enPath = path.join(dir, 'en.json');
  const hiPath = path.join(dir, 'hi.json');
  if (!fs.existsSync(enPath) || !fs.existsSync(hiPath)) continue;
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
  for (const coll of new Set([...Object.keys(en), ...Object.keys(hi)])) {
    for (const id of new Set([...Object.keys(en[coll] || {}), ...Object.keys(hi[coll] || {})])) {
      compare(ds, `${coll}.${id}`, en[coll]?.[id] ?? null, hi[coll]?.[id] ?? null);
    }
  }
}

// ---- UI dictionaries (flat key -> string)
if (!ONLY_DS || ONLY_DS === 'ui') {
  const en = JSON.parse(fs.readFileSync(path.join(DICTS, 'en.json'), 'utf8'));
  const hi = JSON.parse(fs.readFileSync(path.join(DICTS, 'hi.json'), 'utf8'));
  for (const key of new Set([...Object.keys(en), ...Object.keys(hi)])) {
    const field = key.split('.')[0];
    if (ONLY_FIELD && !key.startsWith(ONLY_FIELD)) continue;
    if (!(key in en)) { bump('ui', field, 'missingEn'); problems.push({ ds: 'ui', path: key, kind: 'missing-en' }); continue; }
    if (!(key in hi)) { bump('ui', field, 'missingHi'); problems.push({ ds: 'ui', path: key, kind: 'missing-hi' }); continue; }
    if (DEVANAGARI.test(en[key])) { bump('ui', field, 'impureEn'); problems.push({ ds: 'ui', path: key, kind: 'devanagari-in-en', sample: en[key].slice(0, 50) }); }
    const lat = latinIn(hi[key]);
    if (lat.length) { bump('ui', field, 'impureHi'); problems.push({ ds: 'ui', path: key, kind: 'latin-in-hi', sample: lat.slice(0, 6).join(' ') }); }
  }
}

if (LIST) {
  for (const p of problems) console.log(`${p.kind.padEnd(17)} ${p.ds}:${p.path}${p.sample ? `   «${p.sample}»` : ''}`);
  console.log('');
}

let total = 0;
for (const [ds, fields] of Object.entries(stats)) {
  const rows = Object.entries(fields).filter(([, s]) => Object.values(s).some(Boolean));
  if (!rows.length) continue;
  console.log(`\n${ds}`);
  for (const [field, s] of rows.sort()) {
    const parts = Object.entries(s).filter(([, n]) => n).map(([k, n]) => `${k} ${n}`);
    total += Object.values(s).reduce((a, b) => a + b, 0);
    console.log(`  ${field.padEnd(34)} ${parts.join('  ')}`);
  }
}
console.log(total ? `\n✗ ${total} bilingual problem(s)` : '\n✓ Fully bilingual: every string exists in both languages, in the right script.');
process.exitCode = total ? 1 : 0;
