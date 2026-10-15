#!/usr/bin/env node
// Clean typographic noise in src/content/**/{en,hi}.json:
//   - decode stray HTML entities (&quot; &amp; &#39; &nbsp; …)
//   - Hindi: use the danda (।) rather than a Latin full stop at sentence end
//   - collapse runs of spaces, trim each value
// Usage: node scripts/i18n/normalize-content.mjs [--dry]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readJson, writeJson } from './translation-format.mjs';

const DRY = process.argv.includes('--dry');
const ENTITIES = { '&quot;': '"', '&amp;': '&', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ', '&lt;': '<', '&gt;': '>' };

function clean(s, lang) {
  let out = s.replace(/&(quot|amp|#39|apos|nbsp|lt|gt);/g, (m) => ENTITIES[m]);
  if (lang === 'hi') {
    // "…शब्द." -> "…शब्द।" (only after Devanagari, never inside abbreviations like ई.)
    out = out.replace(/([ऀ-ॣ०-ॿ])\.(?=\s|$|["”’)])/g, (m, ch, offset, str) => {
      const before = str.slice(Math.max(0, offset - 3), offset + 1);
      return /(^|\s|\()(ई|ई\.पू|डॉ|श्री|सं)$/.test(before) ? m : `${ch}।`;
    });
  }
  return out.replace(/[ \t]{2,}/g, ' ').replace(/[ \t]+\n/g, '\n').trim();
}

function walk(v, lang, stats) {
  if (typeof v === 'string') {
    const c = clean(v, lang);
    if (c !== v) stats.changed++;
    return c;
  }
  if (Array.isArray(v)) return v.map((x) => walk(x, lang, stats));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, lang, stats)]));
  return v;
}

const dir = path.join(ROOT, 'src/content');
for (const ds of fs.readdirSync(dir)) {
  for (const lang of ['en', 'hi']) {
    const file = path.join(dir, ds, `${lang}.json`);
    if (!fs.existsSync(file)) continue;
    const stats = { changed: 0 };
    const data = walk(readJson(file), lang, stats);
    if (stats.changed) {
      if (!DRY) writeJson(file, data);
      console.log(`${DRY ? '(dry) ' : ''}${ds}/${lang}: ${stats.changed} value(s) normalized`);
    }
  }
}
