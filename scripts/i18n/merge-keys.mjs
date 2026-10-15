#!/usr/bin/env node
// Merge new UI keys into both dictionaries, keeping keys sorted by section.
// Input: JSON file of { "key": ["english", "hindi"] }. Existing keys are
// overwritten only with --force.
// Usage: node scripts/i18n/merge-keys.mjs path/to/keys.json [--force]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const [input] = process.argv.slice(2);
const force = process.argv.includes('--force');
const additions = JSON.parse(fs.readFileSync(input, 'utf8'));

for (const [index, lang] of [[0, 'en'], [1, 'hi']]) {
  const file = path.join(ROOT, `src/app/i18n/${lang}.json`);
  const dict = JSON.parse(fs.readFileSync(file, 'utf8'));
  let added = 0;
  for (const [key, pair] of Object.entries(additions)) {
    if (key in dict && !force) continue;
    dict[key] = pair[index];
    added++;
  }
  const sorted = Object.fromEntries(Object.entries(dict).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(file, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`${lang}: +${added}`);
}
