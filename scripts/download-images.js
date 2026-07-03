#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const https = require('https');

const data = require('../project-data/images.json');
const all = [
  ...(data.brand || []),
  ...(data.sections || []),
  ...(data.gallery || []),
];

const outDir = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.warn('SKIP', res.statusCode, url);
        res.resume();
        return resolve(false);
      }
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => f.close(() => resolve(true)));
      f.on('error', () => resolve(false));
    });
    req.on('error', (e) => {
      console.warn('ERR', url, e.message);
      resolve(false);
    });
    req.setTimeout(15000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

(async () => {
  let ok = 0, fail = 0;
  for (const img of all) {
    const dest = path.join(outDir, img.localFilename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 100) { ok++; continue; }
    const success = await download(img.sourceUrl, dest);
    if (success) ok++; else fail++;
  }
  console.log(`done — ok:${ok} fail:${fail}`);
})();
