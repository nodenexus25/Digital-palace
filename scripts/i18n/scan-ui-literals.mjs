#!/usr/bin/env node
// Lists user-visible text that is hard-coded in components instead of coming
// from the i18n dictionaries or the localized content layer.
//
// Flags:
//   - JSX text nodes containing letters (Latin or Devanagari)
//   - literal strings in user-visible attributes (alt, title, placeholder,
//     aria-label, aria-roledescription)
//
// Usage: node scripts/i18n/scan-ui-literals.mjs [--json]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SCAN_DIRS = ['src/app', 'src/components'];
const SKIP = [/[\\/]\(studio\)[\\/]/, /[\\/]api[\\/]/, /[\\/]content[\\/]/];
const MAX_BYTES = 400_000; // data-only files are handled by check-content

const LETTERS = /[A-Za-zऀ-ॿ]{2,}/;
const ATTR_RE = /\b(alt|title|placeholder|aria-label|aria-roledescription)\s*=\s*"([^"]*)"/g;
// Text between a closing `>` and the next `<` / `{`, on JSX lines.
const TEXT_RE = />([^<>{}]*?)(?=<|\{)/g;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (SKIP.some((re) => re.test(p))) continue;
    if (entry.isDirectory()) walk(p, out);
    else if (p.endsWith('.tsx')) out.push(p);
  }
  return out;
}

const findings = [];
for (const d of SCAN_DIRS) {
  const abs = path.join(ROOT, d);
  if (!fs.existsSync(abs)) continue;
  for (const file of walk(abs)) {
    if (fs.statSync(file).size > MAX_BYTES) continue;
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('{/*')) return;
      // Skip lines that are clearly TS code (type annotations, imports, generics)
      if (/^(import|export type|type |interface )/.test(trimmed)) return;
      for (const m of line.matchAll(ATTR_RE)) {
        if (LETTERS.test(m[2])) findings.push({ file, line: i + 1, kind: m[1], text: m[2] });
      }
      if (!/[<>]/.test(line)) return;
      for (const m of line.matchAll(TEXT_RE)) {
        const text = m[1].trim();
        // Ignore TS generics / comparison operators that look like text runs
        if (!text || !LETTERS.test(text)) continue;
        if (/^[\w.]+\s*(=>|&&|\|\||\?|:|\(|=)/.test(text)) continue;
        if (/[;=]$/.test(text) || /^(const|let|return|if|else)\b/.test(text)) continue;
        findings.push({ file, line: i + 1, kind: 'text', text });
      }
    });
  }
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(findings, null, 2));
} else {
  for (const f of findings) {
    console.log(`${path.relative(ROOT, f.file)}:${f.line}  [${f.kind}]  ${f.text}`);
  }
  console.log(`\n${findings.length} hard-coded UI string(s)`);
}
process.exitCode = findings.length ? 1 : 0;
