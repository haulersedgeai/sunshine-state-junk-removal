#!/usr/bin/env node
/* eslint-disable */
// Create Sunshine-Logo-White.svg by wrapping the existing raster-in-SVG mark
// in an SVG <filter> that inverts luminance (dark artwork → white, transparent
// stays transparent). This keeps the footer logo visually consistent with the
// header without maintaining two copies of the artwork.

const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public/images/Sunshine-Logo.svg');
const dst = path.join(__dirname, '..', 'public/images/Sunshine-Logo-White.svg');

let svg = fs.readFileSync(src, 'utf8');

// Inject an <filter> definition and wrap the visible <rect> with filter="url(#invert)".
// feColorMatrix with 'matrix' inverts RGB while leaving alpha channel untouched.
const filterDef = `<filter id="ss-invert" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0"/></filter>`;

svg = svg.replace(
  /<defs>/,
  `<defs>${filterDef}`
);
svg = svg.replace(
  /<rect width="180" height="168" fill="url\(#pattern0_1_423\)"><\/rect>/,
  `<rect width="180" height="168" fill="url(#pattern0_1_423)" filter="url(#ss-invert)"></rect>`
);

fs.writeFileSync(dst, svg);
console.log('Wrote', path.relative(process.cwd(), dst), '(' + Math.round(svg.length / 1024) + 'KB)');
