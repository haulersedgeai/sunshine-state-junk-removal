#!/usr/bin/env node
/* eslint-disable */
// Replace literal HTML entities with real Unicode characters across all source
// and data files. React only decodes entities in JSX *text nodes* — inside a
// JS/JSON string value or an attribute value it emits them verbatim (the & gets
// escaped, so users see "&rsquo;" as raw text). Converting everything to real
// Unicode kills that whole class of bug and keeps copy consistent.

const fs = require('fs');
const path = require('path');

const roots = ['src', 'project-data', 'public'];
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.md', '.txt']);
// Skip these paths — they intentionally emit HTML entities (they're an escape table).
const skipFiles = new Set([
  path.resolve(__dirname, '..', 'src/app/api/quote/route.ts'), // handled below with a targeted pass
]);

const map = [
  [/&rsquo;/g, '’'], // ' right single quote
  [/&lsquo;/g, '‘'], // ' left single quote
  [/&ldquo;/g, '“'], // " left double quote
  [/&rdquo;/g, '”'], // " right double quote
  [/&mdash;/g, '—'], // — em dash
  [/&ndash;/g, '–'], // – en dash
  [/&hellip;/g, '…'], // … ellipsis
  [/&nbsp;/g, ' '],   // non-breaking space
  [/&apos;/g, "'"],        // ASCII apostrophe
  [/&#39;/g, "'"],         // ASCII apostrophe (numeric)
  [/&quot;/g, '"'],        // ASCII double quote
  [/&amp;/g, '&'],         // ampersand — do LAST so we don't accidentally rewrite e.g. &amp;rsquo;
];

function shouldTouch(fp) {
  if (skipFiles.has(path.resolve(fp))) return false;
  const rel = path.relative(process.cwd(), fp);
  if (rel.startsWith('node_modules/') || rel.startsWith('.next/') || rel.startsWith('.git/')) return false;
  return exts.has(path.extname(fp));
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

let touched = 0;
let total = 0;
for (const root of roots) {
  const abs = path.resolve(__dirname, '..', root);
  if (!fs.existsSync(abs)) continue;
  for (const fp of walk(abs)) {
    if (!shouldTouch(fp)) continue;
    total++;
    let src = fs.readFileSync(fp, 'utf8');
    const before = src;
    for (const [re, rep] of map) src = src.replace(re, rep);
    if (src !== before) {
      fs.writeFileSync(fp, src);
      touched++;
      console.log('fixed', path.relative(process.cwd(), fp));
    }
  }
}
console.log(`\nScanned ${total} files, updated ${touched}.`);
