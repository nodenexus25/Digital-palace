// Shared helpers for the plain-text translation patch format.
//
//   @@ <dataset> <lang> <path>
//   text (any number of lines, blank lines kept)
//
//   @@ battles en battles.haldighati.tactics[]
//   first list item
//   ~~
//   second list item
//
// <path> is collection.id.field, with [n] for array elements and a trailing
// [] meaning "the whole array, items separated by ~~ lines".
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '../..');
export const contentFile = (ds, lang) => path.join(ROOT, 'src/content', ds, `${lang}.json`);

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

/** "battles.haldighati.stories[2].title" -> ['battles','haldighati','stories',2,'title'] */
export function parsePath(p) {
  const [coll, id, ...rest] = p.split('.');
  const out = [coll, id];
  for (const seg of rest) {
    const m = seg.match(/^([^[]*)((?:\[\d*\])*)$/);
    if (m[1]) out.push(m[1]);
    for (const idx of m[2].matchAll(/\[(\d*)\]/g)) out.push(idx[1] === '' ? '[]' : Number(idx[1]));
  }
  return out;
}

export function getAt(obj, segs) {
  return segs.reduce((o, s) => (o == null ? undefined : o[s]), obj);
}

export function setAt(obj, segs, value) {
  let o = obj;
  for (let i = 0; i < segs.length - 1; i++) {
    const s = segs[i];
    if (o[s] == null) o[s] = typeof segs[i + 1] === 'number' ? [] : {};
    o = o[s];
  }
  o[segs[segs.length - 1]] = value;
}

export function parsePatch(text) {
  const entries = [];
  let cur = null;
  for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
    const head = line.match(/^@@\s+(\S+)\s+(en|hi)\s+(\S+)\s*$/);
    if (head) {
      if (cur) entries.push(cur);
      cur = { ds: head[1], lang: head[2], path: head[3], lines: [] };
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) entries.push(cur);
  return entries.map((e) => {
    const body = e.lines.join('\n').replace(/^\n+|\s+$/g, '');
    const isList = e.path.endsWith('[]');
    return {
      ...e,
      path: isList ? e.path.slice(0, -2) : e.path,
      value: isList ? body.split(/\n~~\n/).map((s) => s.trim()).filter(Boolean) : body,
    };
  });
}

export function formatEntry(ds, lang, p, value) {
  if (Array.isArray(value)) return `@@ ${ds} ${lang} ${p}[]\n${value.join('\n~~\n')}\n`;
  return `@@ ${ds} ${lang} ${p}\n${value ?? ''}\n`;
}
