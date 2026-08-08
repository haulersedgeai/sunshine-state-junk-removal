#!/usr/bin/env node
/**
 * Pricing integrity gate — runs as `prebuild`, so `next build` cannot proceed
 * past a mismatch.
 *
 * project-data/services.json is the canonical source for every price on the
 * site. Two consumers cannot derive from it at runtime and therefore restate
 * prices as literal prose:
 *
 *   - project-data/faqs.json  (answer copy, rendered into FAQPage schema)
 *   - public/llms.txt         (static file served verbatim to AI crawlers)
 *
 * Those are the files this script polices. Everything under src/ derives from
 * services.json through @/data helpers and needs no checking.
 *
 * Three rules, all hard failures:
 *
 *   1. NO STALE PRICES — every "$N" appearing in faqs.json or llms.txt must be
 *      a price that exists in services.json. Change 495 -> 550 in services.json
 *      and every un-updated "$495" in prose becomes non-canonical and fails.
 *
 *   2. NO SILENT DROPS — every structured price in services.json must appear at
 *      least once in llms.txt, which is the public pricing sheet AI crawlers
 *      read. A new price that never makes it into llms.txt fails.
 *
 *      This rule is deliberately NOT applied to faqs.json: the FAQ answers
 *      document the pricing a customer asks about, not the full price list.
 *      The prohibited-items surcharge, for one, has no FAQ entry today.
 *
 *   3. NO HARDCODED PRICES IN src/ — ANY "$N" in a .ts/.tsx file fails,
 *      regardless of its value. Not "any price services.json doesn't define" —
 *      any price literal at all.
 *
 *      The stricter form is the point. A literal that AGREES with
 *      services.json is not safe, it is unenforced: agreement is not
 *      derivation. That is precisely the pre-refactor state of
 *      CityDumpsterPage.tsx, which carried a retyped "$100" surcharge and the
 *      18yd/21yd rates that happened to match services.json exactly — and
 *      would have gone silently stale across 12 live city pages the moment a
 *      price moved, with no gate to catch it (see DECISIONS.md). A rule that
 *      only checks values cannot distinguish a correct literal from a derived
 *      one, so it would have passed that code unchanged.
 *
 *      Components have no legitimate need for a price literal: every price
 *      reaches the page through the @/data helpers (prohibitedItemsSurcharge,
 *      dumpsterRentalNotes, resolvePriceTemplate, formatUsd). There are zero
 *      such literals in src/ today, so this rule costs nothing to hold and
 *      fails loudly the first time someone reintroduces one.
 *
 *      Comments are excluded — the helper docblocks in src/data/index.ts cite
 *      example values like "$100" and are documentation, not rendered output.
 *      Strings are NOT excluded: `Price is $495` in a template literal is
 *      exactly the hardcoded price this rule exists to catch.
 *
 * On false positives: this scans for "$" followed by digits, so phone numbers
 * (954-247-1399), dates, review counts (159), dimensions (14 ft), and yardage
 * ("18 Yard") cannot match — none carry a dollar sign. Template interpolation
 * is also safe: `${x}` and `$${x}` have no digit after the "$". If a genuine
 * non-price "$N" ever does appear, REPORT IT rather than adding an allowlist
 * entry — an allowlist here would reopen the hole this rule closes.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SERVICES = path.join(ROOT, 'project-data/services.json');
const FAQS = path.join(ROOT, 'project-data/faqs.json');
const LLMS = path.join(ROOT, 'public/llms.txt');
const SRC = path.join(ROOT, 'src');

const rel = (p) => path.relative(ROOT, p);

/**
 * Prices that legitimately live only in services.json prose because no
 * structured field exists for them.
 *
 * This list is EMPTY, and should stay that way. Every price in services.json
 * now has a discrete numeric field, and every sentence that quotes one is a
 * template with a {token} placeholder resolved at render time. An entry here
 * is a number rule 1 cannot protect from drifting out of sync — so the fix for
 * a new prose-only price is a new structured field, not a new allowlist entry.
 */
const PROSE_ONLY = new Map([]);

const PRICE_RE = /\$\s?(\d[\d,]*)/g;

/** Every "$N" in a string, as integers. */
function pricesIn(text) {
  const out = [];
  for (const m of text.matchAll(PRICE_RE)) {
    out.push(Number(m[1].replace(/,/g, '')));
  }
  return out;
}

/** Every "$N" in a file, with 1-indexed line numbers and context. */
function pricesInFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const hits = [];
  lines.forEach((line, i) => {
    for (const value of pricesIn(line)) {
      hits.push({ value, line: i + 1, text: line.trim() });
    }
  });
  return hits;
}

/** Every .ts/.tsx file under src/, recursively. */
function listSourceFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listSourceFiles(full));
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out.sort();
}

/**
 * Blank out comments in TS/TSX source, preserving length so match offsets still
 * map to the right line, and preserving string contents so a hardcoded price
 * inside a string is still caught.
 *
 * This tracks strings and regex literals rather than naively stripping from
 * "//", because both appear in this codebase and would break a naive stripper:
 * layout.tsx embeds 'https://www.googletagmanager.com/...' inside a string, and
 * src/data/index.ts contains the regex /^https?:\/\/sunshineremoval\.com/i.
 * Treating either "//" as a comment would blank the rest of the line and hide
 * whatever followed.
 *
 * Not handled: code inside `${...}` within a template literal is treated as
 * string content, so a comment there is not blanked. That only risks a false
 * positive from a commented-out price inside an interpolation — vanishingly
 * rare, and it would surface as a reported finding rather than a silent pass.
 */
function maskComments(source) {
  const out = source.split('');
  const blank = (i) => {
    if (out[i] !== '\n') out[i] = ' ';
  };
  // Whether a "/" here begins a regex literal rather than division, judged by
  // the previous significant character.
  const regexCanStart = (i) => {
    for (let j = i - 1; j >= 0; j--) {
      const c = source[j];
      if (/\s/.test(c)) continue;
      return '(,=:[!&|?{};+-*%~^'.includes(c);
    }
    return true;
  };

  let i = 0;
  while (i < source.length) {
    const c = source[i];
    const next = source[i + 1];

    if (c === '/' && next === '/') {
      while (i < source.length && source[i] !== '\n') blank(i++);
      continue;
    }
    if (c === '/' && next === '*') {
      blank(i++);
      blank(i++);
      while (i < source.length && !(source[i] === '*' && source[i + 1] === '/')) blank(i++);
      if (i < source.length) {
        blank(i++);
        blank(i++);
      }
      continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      const quote = c;
      i++;
      while (i < source.length) {
        if (source[i] === '\\') { i += 2; continue; }
        if (source[i] === quote) { i++; break; }
        // An unterminated single/double quote ends at the newline.
        if (quote !== '`' && source[i] === '\n') break;
        i++;
      }
      continue;
    }
    if (c === '/' && regexCanStart(i)) {
      i++;
      while (i < source.length) {
        if (source[i] === '\\') { i += 2; continue; }
        if (source[i] === '/' || source[i] === '\n') { i++; break; }
        i++;
      }
      continue;
    }
    i++;
  }
  return out.join('');
}

/** Every "$N" in a source file, ignoring comments, with line numbers. */
function pricesInSourceFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const masked = maskComments(raw);
  const lines = raw.split('\n');
  const lineStarts = [];
  let pos = 0;
  for (const line of lines) {
    lineStarts.push(pos);
    pos += line.length + 1;
  }
  const hits = [];
  for (const m of masked.matchAll(PRICE_RE)) {
    let lineNo = lineStarts.findIndex((start, idx) =>
      m.index >= start && (idx === lineStarts.length - 1 || m.index < lineStarts[idx + 1])
    );
    if (lineNo < 0) lineNo = 0;
    hits.push({
      value: Number(m[1].replace(/,/g, '')),
      line: lineNo + 1,
      text: lines[lineNo].trim(),
    });
  }
  return hits;
}

/** Walk every string value in a parsed JSON tree. */
function strings(node, out = []) {
  if (typeof node === 'string') out.push(node);
  else if (Array.isArray(node)) node.forEach((n) => strings(n, out));
  else if (node && typeof node === 'object') Object.values(node).forEach((n) => strings(n, out));
  return out;
}

const services = JSON.parse(fs.readFileSync(SERVICES, 'utf8'));
const { junkRemoval, dumpsterRental } = services.pricing;

// The structured prices — the actual source of truth. Each carries a label so
// a failure names the field, not just a number.
const structured = new Map();
const put = (value, label) => {
  if (typeof value !== 'number') {
    console.error(`\n  services.json: expected a number for ${label}, got ${JSON.stringify(value)}`);
    process.exit(1);
  }
  if (!structured.has(value)) structured.set(value, []);
  structured.get(value).push(label);
};

put(junkRemoval.priceFrom, 'pricing.junkRemoval.priceFrom');
put(junkRemoval.priceTo, 'pricing.junkRemoval.priceTo');
junkRemoval.tiers.forEach((t, i) => put(t.price, `pricing.junkRemoval.tiers[${i}] (${t.label})`));
put(dumpsterRental.priceFrom, 'pricing.dumpsterRental.priceFrom');
put(dumpsterRental.priceTo, 'pricing.dumpsterRental.priceTo');
put(dumpsterRental.overagePerTon, 'pricing.dumpsterRental.overagePerTon');
put(dumpsterRental.extendedRentalUsd, 'pricing.dumpsterRental.extendedRentalUsd');
put(dumpsterRental.lateFeePerDayUsd, 'pricing.dumpsterRental.lateFeePerDayUsd');
dumpsterRental.sizes.forEach((s, i) => put(s.price, `pricing.dumpsterRental.sizes[${i}] (${s.size})`));
put(dumpsterRental.prohibitedItems.surchargeUsd, 'pricing.dumpsterRental.prohibitedItems.surchargeUsd');

// Canonical = structured prices plus the allowlisted prose-only values.
const canonical = new Set([...structured.keys(), ...PROSE_ONLY.keys()]);

const errors = [];

// Rule 0 — services.json must not contradict itself. Its own prose (the notes
// arrays, the prohibited-items template) quotes prices too; if a structured
// field moves and a note doesn't, that is the same bug one file earlier.
for (const hit of pricesInFile(SERVICES)) {
  if (!canonical.has(hit.value)) {
    errors.push({
      file: rel(SERVICES),
      line: hit.line,
      value: hit.value,
      text: hit.text,
      why: 'prose in services.json quotes a price that no structured field in services.json defines',
    });
  }
}

// Rule 1 — no stale prices in the two prose consumers.
for (const file of [FAQS, LLMS]) {
  for (const hit of pricesInFile(file)) {
    if (!canonical.has(hit.value)) {
      errors.push({
        file: rel(file),
        line: hit.line,
        value: hit.value,
        text: hit.text,
        why: 'not a price defined in services.json',
      });
    }
  }
}

// Rule 3 — no hardcoded prices in src/. Components derive through @/data; a
// literal that matches services.json today drifts the moment a price changes.
//
// Note there is no canonical-value check here, unlike rules 0 and 1. Whether
// the literal matches services.json is irrelevant: a matching literal is an
// unenforced coincidence, not a derivation, and it goes stale the moment the
// price moves. Every "$N" fails.
const sourceFiles = listSourceFiles(SRC);
for (const file of sourceFiles) {
  for (const hit of pricesInSourceFile(file)) {
    const matches = canonical.has(hit.value);
    errors.push({
      file: rel(file),
      line: hit.line,
      value: hit.value,
      text: hit.text,
      why: matches
        ? 'hardcoded price literal in src/. It agrees with services.json today, which is not the same as deriving from it — nothing keeps it in sync once the price moves. Derive it through the @/data helpers (prohibitedItemsSurcharge, dumpsterRentalNotes, resolvePriceTemplate)'
        : 'hardcoded price literal in src/, and services.json does not even define this value. Derive it through the @/data helpers (prohibitedItemsSurcharge, dumpsterRentalNotes, resolvePriceTemplate)',
    });
  }
}

// Rule 2 — no structured price missing from llms.txt.
const inLlms = new Set(pricesInFile(LLMS).map((h) => h.value));
for (const [value, labels] of structured) {
  if (!inLlms.has(value)) {
    errors.push({
      file: rel(LLMS),
      line: null,
      value,
      text: null,
      why: `defined in services.json as ${labels.join(', ')} but never stated in llms.txt`,
    });
  }
}

if (errors.length) {
  const listCanonical = [...canonical].sort((a, b) => a - b).map((v) => `$${v}`).join(', ');
  console.error('\n' + '='.repeat(72));
  console.error('  PRICING INTEGRITY CHECK FAILED — build stopped');
  console.error('='.repeat(72));
  console.error(`\n  ${errors.length} mismatch${errors.length === 1 ? '' : 'es'} against project-data/services.json:\n`);
  for (const e of errors) {
    const where = e.line === null ? e.file : `${e.file}:${e.line}`;
    console.error(`  ✗ $${e.value}  ${where}`);
    console.error(`      ${e.why}`);
    if (e.text) {
      const snippet = e.text.length > 140 ? e.text.slice(0, 137) + '...' : e.text;
      console.error(`      ${snippet}`);
    }
    console.error('');
  }
  console.error(`  Prices currently defined in services.json: ${listCanonical}\n`);
  console.error('  Pricing has three sources that must stay in sync:');
  console.error('    project-data/services.json  (canonical)');
  console.error('    project-data/faqs.json');
  console.error('    public/llms.txt');
  console.error('  Update all three in the same commit. See CLAUDE.md > Pricing integrity.\n');
  process.exit(1);
}

const checked = structured.size + PROSE_ONLY.size;
console.log(
  `✓ pricing integrity: ${checked} prices consistent across services.json, faqs.json, llms.txt` +
    ` — no hardcoded prices in ${sourceFiles.length} src/ files`
);
