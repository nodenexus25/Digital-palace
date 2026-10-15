#!/usr/bin/env node
// Fetch every page of a running site in both languages and report visible
// text in the wrong script: Latin words on /hi pages, Devanagari on /en
// pages. Scripts, styles, JSON payloads and URLs are ignored.
//
// Usage: node scripts/i18n/audit-pages.mjs [baseUrl] [--verbose]
const BASE = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:3100';
const VERBOSE = process.argv.includes('--verbose');
const ROUTES = ['', '/dynasties', '/forts', '/stories', '/battles', '/weapons', '/festivals', '/folklore', '/blogs', '/privacy', '/terms', '/site-map'];

function visibleText(html, lang) {
  const other = lang === 'en' ? 'hi' : 'en';
  return html
    // Elements explicitly marked as the other language (e.g. the language toggle).
    .replace(new RegExp(`<(a|span|button)\\b[^>]*\\slang="${other}"[^>]*>[\\s\\S]*?</\\1>`, 'gi'), ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+?\s(?:alt|title|aria-label|placeholder)="([^"]*)"[^>]*>/gi, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

let failures = 0;
for (const lang of ['en', 'hi']) {
  for (const route of ROUTES) {
    const url = `${BASE}/${lang}${route}`;
    const res = await fetch(url);
    const html = await res.text();
    const htmlLang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
    const text = visibleText(html, lang);
    const wrong =
      lang === 'hi'
        ? [...new Set(text.match(/[A-Za-z][A-Za-z'’.-]+/g) || [])]
        : [...new Set(text.match(/[ऀ-ॿ][ऀ-ॿ\s]*/g) || [])].map((s) => s.trim());
    // The toggle legitimately names the other language in its own script.
    const allowed = new Set(['EN', 'English', 'हिं', 'हिंदी']);
    const bad = wrong.filter((w) => !allowed.has(w));
    const ok = res.ok && htmlLang === lang && bad.length === 0;
    if (!ok) failures++;
    console.log(`${ok ? '✓' : '✗'} ${res.status} lang=${htmlLang} ${url}${bad.length ? `  — ${bad.length} wrong-script word(s): ${bad.slice(0, VERBOSE ? 200 : 12).join(' | ')}` : ''}`);
  }
}
console.log(failures ? `\n${failures} page(s) with problems` : '\nAll pages pure.');
process.exitCode = failures ? 1 : 0;
