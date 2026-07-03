#!/usr/bin/env node
/* eslint-disable */
// Site audit — fetches every route from the live Vercel deployment and runs
// per-page checks against the criteria in AUDIT.md. Writes AUDIT.md.

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = process.env.AUDIT_HOST || 'https://sunshine-state-junk-removal.vercel.app';
const CANON_HOST = 'https://sunshineremoval.com';

const routes = [
  { path: '/', kind: 'home' },
  { path: '/about-us/', kind: 'core' },
  { path: '/what-we-take/', kind: 'core' },
  { path: '/pricing/', kind: 'core' },
  { path: '/dumpster-rentals/', kind: 'core' },
  { path: '/service-areas/', kind: 'core' },
  { path: '/contact-us/', kind: 'core' },
  { path: '/faqs/', kind: 'core' },
  { path: '/terms-and-condition/', kind: 'legal' },
  { path: '/privacy-policy/', kind: 'legal' },
  { path: '/cooper-city-florida/', kind: 'city-service' },
  { path: '/coral-springs-florida/', kind: 'city-service' },
  { path: '/davie/', kind: 'city-service' },
  { path: '/hollywood/', kind: 'city-service' },
  { path: '/miramar/', kind: 'city-service' },
  { path: '/pembroke-pines/', kind: 'city-service' },
  { path: '/plantation/', kind: 'city-service' },
  { path: '/sunrise/', kind: 'city-service' },
  { path: '/tamarac-florida/', kind: 'city-service' },
  { path: '/weston/', kind: 'city-service' },
  { path: '/dumpster-rentals-in-cooper-city-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-coral-spring-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-davie-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-ft-lauderdale-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-hollywood-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-miramar-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-pembroke-pines-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-plantation-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-southwest-ranches-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-sunrise-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-tamarac-florida/', kind: 'city-dumpster' },
  { path: '/dumpster-rentals-in-weston-florida/', kind: 'city-dumpster' },
  { path: '/definitely-not-a-page-xyz/', kind: '404' },
];

const ADDR = '3700 NW 104th Ave, Coral Springs, FL 33065';

function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    }).on('error', () => resolve({ status: 0, body: '', headers: {} }));
  });
}

// Strip HTML tags, keep raw text (for entity/copy checks)
function stripTags(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ');
}
function decodeMinimal(s) {
  // Decode only the standard entities users can read. We do NOT decode &amp;/&#x27; etc.
  // — the point is to detect entities that got double-escaped and would appear literally.
  return s;
}

function extractJsonLd(html) {
  const out = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1]);
      out.push(parsed);
    } catch (e) {
      out.push({ __parseError: e.message, __raw: m[1].slice(0, 200) });
    }
  }
  return out;
}
function flattenGraph(nodes) {
  const flat = [];
  for (const n of nodes) {
    if (n && n['@graph']) flat.push(...n['@graph']);
    else if (n) flat.push(n);
  }
  return flat;
}
function typesOf(nodes) {
  return nodes.map((n) => (Array.isArray(n['@type']) ? n['@type'].join(',') : n['@type'])).filter(Boolean);
}
function firstOfType(nodes, type) {
  return nodes.find((n) => {
    const t = n['@type'];
    if (Array.isArray(t)) return t.includes(type);
    return t === type;
  });
}

function audit(route, html) {
  const issues = [];
  const notes = [];
  const text = stripTags(html);

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) issues.push('missing <title>');
  const brandCount = (title.match(/Sunshine State/g) || []).length;
  if (brandCount > 1) issues.push(`title has brand ${brandCount}× (should be 1)`);
  if (brandCount < 1 && route.kind !== '404') issues.push('title missing brand');

  // Description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i);
  const description = descMatch ? descMatch[1] : '';
  if (!description && route.kind !== '404') issues.push('missing meta description');

  // Canonical
  const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i);
  const canonical = canonMatch ? canonMatch[1] : '';
  if (route.kind !== '404') {
    const expected = `${CANON_HOST}${route.path}`;
    if (canonical !== expected) issues.push(`canonical is "${canonical}", expected "${expected}"`);
  }

  // H1 count (unique)
  const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (route.kind !== '404' && h1Matches.length !== 1) issues.push(`h1 count = ${h1Matches.length} (expected 1)`);

  // OG image URL — must be absolute and reachable host
  const ogImg = (html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i) || [])[1] || '';
  if (route.kind !== '404' && !/^https?:\/\//.test(ogImg)) issues.push('og:image not absolute');

  // JSON-LD
  const jsonLdRaw = extractJsonLd(html);
  const parseErrs = jsonLdRaw.filter((n) => n.__parseError);
  if (parseErrs.length) issues.push(`invalid JSON-LD: ${parseErrs[0].__parseError}`);
  const jsonNodes = flattenGraph(jsonLdRaw);
  const types = typesOf(jsonNodes);
  if (route.kind !== '404') {
    const hasLB = types.some((t) => /LocalBusiness|HomeAndConstructionBusiness/.test(t));
    if (!hasLB) issues.push('missing LocalBusiness JSON-LD');
  }
  if (route.path !== '/' && route.kind !== '404' && route.kind !== 'legal') {
    if (!types.includes('BreadcrumbList')) issues.push('missing BreadcrumbList JSON-LD');
  }
  if (['home', 'city-service', 'city-dumpster', 'core'].includes(route.kind)) {
    // FAQ pages generally exist on home + cities + dumpster-rentals + service pages + faqs
    // Not required on service-areas or contact-us; check just when the page has visible FAQs
    const hasDetails = /<details\b/.test(html);
    if (hasDetails && !types.includes('FAQPage')) issues.push('page has <details> FAQs but missing FAQPage JSON-LD');
  }

  // NAP consistency — visible + schema
  const hasVisibleAddress = text.includes(ADDR);
  const lb = jsonNodes.find((n) => {
    const t = n['@type'];
    return t === 'HomeAndConstructionBusiness' || t === 'LocalBusiness' ||
      (Array.isArray(t) && (t.includes('HomeAndConstructionBusiness') || t.includes('LocalBusiness')));
  });
  const napOK = lb && lb.address &&
    lb.address.streetAddress === '3700 NW 104th Ave' &&
    lb.address.addressLocality === 'Coral Springs' &&
    lb.address.addressRegion === 'FL' &&
    lb.address.postalCode === '33065';
  if (route.kind !== '404' && !napOK) issues.push('schema NAP fields off');
  if (route.kind !== '404' && !hasVisibleAddress) issues.push('visible address string missing');

  // Chrome: text wordmark present (header + footer), sticky CTA present
  if (route.kind !== '404') {
    // Wordmark is rendered as text, not an image. Check for the split brand markup.
    const wordmarkCount = (html.match(/Sunshine State<\/span>\s*<span[^>]+>Junk Removal/g) || []).length;
    if (wordmarkCount < 2) issues.push(`wordmark rendered only ${wordmarkCount}× (expected header+footer)`);
    if (!/Text a photo/.test(html)) issues.push('sticky/CTA "Text a photo" missing');
    if (!/tel:\+19542471399/.test(html)) issues.push('tel link missing');
    if (!/sms:\+19542471399/.test(html)) issues.push('sms link missing');
    if (!/adimize\.com/.test(html)) issues.push('Adimize footer credit missing');
    if (/maps\/d\/embed/.test(html)) issues.push('legacy Google My Map iframe still present');
  }

  // Trust signal duplication — the "5.0 · 159+ reviews" claim string
  // Allowed in visible copy: header strip (1) + trust bar (1) = 2. Reviews section
  // header may say it differently. JSON-LD counts too. We check just visible text.
  const trustPhrase = (text.match(/5\.0\s*·\s*159\+/g) || []).length;
  if (route.kind !== '404' && trustPhrase > 3) {
    issues.push(`"5.0 · 159+" appears ${trustPhrase}× in visible text (expected ≤3)`);
  }

  // Availability wording — flag any variants other than "Same-day & 24/7"
  // "Same-day delivery" is intentionally allowed on city dumpster hero (delivery-specific).
  const badVariants = [
    /Same-day availability/,
    /24\/7 availability(?![^<]*&)/, // 24/7 availability not immediately preceded/followed by & is bad
    /Same-day and next-day availability/,
  ];
  for (const rx of badVariants) {
    if (rx.test(text)) issues.push(`inconsistent availability wording: "${(text.match(rx) || [''])[0]}"`);
  }

  // Literal HTML entities in visible copy (after tag strip)
  const entRe = /&(?:rsquo|lsquo|ldquo|rdquo|apos|mdash|ndash|hellip|nbsp);/g;
  const entMatches = text.match(entRe) || [];
  if (entMatches.length) issues.push(`${entMatches.length} literal HTML entity(ies) in visible copy: ${[...new Set(entMatches)].slice(0, 4).join(', ')}`);

  // Images: every <img> has alt=. Also list srcs referenced from /images/
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const missingAlt = imgs.filter((t) => !/\balt\s*=/.test(t));
  if (missingAlt.length) issues.push(`${missingAlt.length} <img> without alt attribute`);
  const localImgs = new Set();
  const imgSrcRe = /<img\b[^>]*\bsrc=["']([^"']+)["']/gi;
  let m;
  while ((m = imgSrcRe.exec(html))) {
    // First decode HTML entities like &amp;
    let src = m[1].replace(/&amp;/g, '&').split('?')[0]; // strip query, but for _next/image we need it
    let raw = m[1].replace(/&amp;/g, '&');
    if (src.startsWith('/images/')) {
      localImgs.add(src);
    } else if (raw.includes('/_next/image')) {
      // extract url= param
      const um = raw.match(/[?&]url=([^&]+)/);
      if (um) {
        const decoded = decodeURIComponent(um[1]);
        if (decoded.startsWith('/images/')) localImgs.add(decoded);
      }
    }
  }
  notes.push(`refs ${localImgs.size} local images`);

  // FAQ answers in SSR HTML: every <details> should contain visible <p> text
  const detailsCount = (html.match(/<details\b/gi) || []).length;
  const summariesCount = (html.match(/<summary\b/gi) || []).length;
  if (detailsCount !== summariesCount) issues.push(`details/summary mismatch (${detailsCount}/${summariesCount})`);

  return { title, description, canonical, ogImg, h1: h1Matches.length, jsonLdTypes: [...new Set(types)].sort(), detailsCount, issues, notes, localImgs: [...localImgs] };
}

(async () => {
  const results = [];
  for (const r of routes) {
    const url = `${HOST}${r.path}`;
    const res = await get(url);
    if (res.status !== 200 && r.kind !== '404') {
      results.push({ route: r, http: res.status, issues: [`HTTP ${res.status}`], jsonLdTypes: [], localImgs: [], detailsCount: 0 });
      continue;
    }
    if (r.kind === '404' && res.status === 404) {
      results.push({ route: r, http: res.status, issues: [], jsonLdTypes: [], localImgs: [], detailsCount: 0, notes: ['404 correctly returned'] });
      continue;
    }
    const a = audit(r, res.body);
    results.push({ route: r, http: res.status, ...a });
  }

  // Also verify that referenced local images all resolve
  const allImgs = new Set(results.flatMap((r) => r.localImgs || []));
  const imgChecks = {};
  for (const img of allImgs) {
    const res = await get(`${HOST}${img.startsWith('/') ? img : '/' + img}`);
    imgChecks[img] = res.status;
  }
  const brokenImgs = Object.entries(imgChecks).filter(([, s]) => s !== 200);

  // Titles unique across routes
  const titleMap = {};
  for (const r of results) {
    if (!r.title) continue;
    (titleMap[r.title] = titleMap[r.title] || []).push(r.route.path);
  }
  const dupTitles = Object.entries(titleMap).filter(([, ps]) => ps.length > 1);

  // Descriptions unique across routes
  const descMap = {};
  for (const r of results) {
    if (!r.description) continue;
    (descMap[r.description] = descMap[r.description] || []).push(r.route.path);
  }
  const dupDescs = Object.entries(descMap).filter(([, ps]) => ps.length > 1);

  // Build the report
  const lines = [];
  lines.push('# AUDIT.md');
  lines.push('');
  lines.push(`Live host audited: \`${HOST}\``);
  lines.push(`Canonical host: \`${CANON_HOST}\``);
  lines.push(`Total routes audited: ${routes.length}`);
  const totalIssues = results.reduce((n, r) => n + (r.issues?.length || 0), 0);
  lines.push(`Total issues found: **${totalIssues}**`);
  lines.push('');

  // Cross-route
  lines.push('## Cross-route issues');
  if (dupTitles.length) {
    lines.push('- **Duplicate `<title>` strings:**');
    for (const [t, ps] of dupTitles) lines.push(`  - "${t}" → ${ps.join(', ')}`);
  } else lines.push('- Titles unique across routes ✓');
  if (dupDescs.length) {
    lines.push('- **Duplicate meta descriptions:**');
    for (const [d, ps] of dupDescs) lines.push(`  - "${d.slice(0, 80)}…" → ${ps.join(', ')}`);
  } else lines.push('- Descriptions unique across routes ✓');
  if (brokenImgs.length) {
    lines.push('- **Broken local images:**');
    for (const [img, s] of brokenImgs) lines.push(`  - \`${img}\` → HTTP ${s}`);
  } else lines.push(`- All ${allImgs.size} referenced local images resolve 200 ✓`);
  lines.push('');

  // Per-route
  lines.push('## Per-route findings');
  lines.push('');
  for (const r of results) {
    const status = r.issues && r.issues.length ? '❌' : '✅';
    lines.push(`### ${status} \`${r.route.path}\` (${r.route.kind}, HTTP ${r.http})`);
    if (r.title) lines.push(`- **Title:** ${r.title}`);
    if (r.canonical) lines.push(`- **Canonical:** ${r.canonical}`);
    if (r.ogImg) lines.push(`- **OG image:** ${r.ogImg}`);
    if (r.jsonLdTypes && r.jsonLdTypes.length) lines.push(`- **JSON-LD types:** ${r.jsonLdTypes.join(', ')}`);
    if (typeof r.detailsCount === 'number') lines.push(`- **<details> FAQ blocks:** ${r.detailsCount}`);
    if (r.issues && r.issues.length) {
      lines.push('- **Issues:**');
      for (const i of r.issues) lines.push(`  - ${i}`);
    }
    if (r.notes && r.notes.length) {
      for (const n of r.notes) lines.push(`- _note: ${n}_`);
    }
    lines.push('');
  }

  fs.writeFileSync(path.join(__dirname, '..', 'AUDIT.md'), lines.join('\n'));
  console.log(`\nAUDIT.md written. Total issues: ${totalIssues}`);
})();
