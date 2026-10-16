// Fix relative imports in [lang] pages to use @/ alias
import fs from 'node:fs';
import path from 'node:path';

const root = 'b:/Rajputana/src/app/[lang]';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const replacements = [
  [/from '\.\.\/components\//g, "from '@/app/components/"],
  [/from '\.\.\/utils\//g, "from '@/app/utils/"],
  [/from '\.\.\/types\//g, "from '@/types/"],
  [/from '\.\.\/services\//g, "from '@/app/services/"],
  [/from '\.\/components\//g, "from '@/app/components/"],
  [/from '\.\.\/\.\.\/components\//g, "from '@/app/components/"],
  [/from '\.\.\/\.\.\/utils\//g, "from '@/app/utils/"],
  [/from '\.\.\/\.\.\/types\//g, "from '@/types/"],
  [/from '\.\.\/\.\.\/services\//g, "from '@/app/services/"],
];

const files = walk(root);
let changed = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  for (const [re, rep] of replacements) {
    const next = content.replace(re, rep);
    if (next !== content) {
      content = next;
      modified = true;
    }
  }
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('fixed:', file);
    changed++;
  }
}
console.log(`\nUpdated ${changed} files.`);
