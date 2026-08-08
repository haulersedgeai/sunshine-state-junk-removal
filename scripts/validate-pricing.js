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
 * Two rules, both hard failures:
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
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SERVICES = path.join(ROOT, 'project-data/services.json');
const FAQS = path.join(ROOT, 'project-data/faqs.json');
const LLMS = path.join(ROOT, 'public/llms.txt');

const rel = (p) => path.relative(ROOT, p);

/**
 * Prices that legitimately live only in services.json prose because no
 * structured field exists for them yet. Keep this list empty if you can — each
 * entry is a number that rule 1 cannot protect from drifting out of sync with
 * a structured field.
 *
 * TODO(followup): promote these to discrete fields
 *   (extendedRentalUsd, lateFeePerDayUsd) the way surchargeUsd was, then delete
 *   this allowlist.
 */
const PROSE_ONLY = new Map([
  [125, 'dumpsterRental.notes — 14-day rental period upcharge'],
  [25, 'dumpsterRental.notes — per-day fee past day 14'],
]);

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
console.log(`✓ pricing integrity: ${checked} prices consistent across services.json, faqs.json, llms.txt`);
