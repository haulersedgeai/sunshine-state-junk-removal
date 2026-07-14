# CLAUDE.md — Build Brief: Sunshine State Junk Removal website

You are building a complete, production-ready website for **Sunshine State Junk Removal & Dumpster Rental**, a family- and veteran-owned junk removal + dump-trailer rental company serving Broward County, FL (with select Miami-Dade / Palm Beach service). This is a **rebuild** of their existing WordPress site (`sunshineremoval.com`) — better UX, better design, stronger local + AI/answer-engine search, and **zero loss of SEO history**.

## ⚠️ Deploy policy — READ FIRST

**This is a LIVE CLIENT SITE on a real public domain: `https://www.sunshineremoval.com`.** Real visitors hit it. Any bad deploy is visible to the client and to the world immediately.

**Rules (non-negotiable):**

1. **Never deploy to production.** Production promotion is a human decision, performed manually by the operator. Full stop.
2. **Never run `vercel --prod`, `vercel deploy --prod`, `vercel promote`, or `vercel deploy` from the CLI at all** while on the `main` branch or in a linked directory whose Production Branch is `main`. The CLI happily ships to prod from a linked project — treat `vercel deploy` as a production command and do not use it.
3. The assistant may merge branches into main when the operator explicitly instructs it to do so in-session. Merging without explicit instruction remains prohibited.
4. **Do not merge to `main`.** Opening a PR is fine (it also produces a preview). Merging is the operator's call, and merging = production deploy.
5. **Any earlier language in this file that says "deploy to Vercel," "print the live URL," or otherwise implies autonomous production deploys is superseded by this section.** That language was written before the site went live.
6. **Rollback (operator use, for reference)**: `vercel rollback <deployment-url>` — or use the Vercel dashboard's "Instant Rollback" on the previous production deployment. Do not run rollback yourself unless explicitly told to.

**How to know you're safe:** if the deployment URL you're about to report contains a random hash slug like `sunshine-state-junk-removal-abc123xyz.vercel.app` AND `vercel inspect` shows `target: preview` AND `www.sunshineremoval.com` is NOT in its Aliases list, you're on a preview. If any of those aren't true, stop and flag it.

---

## How to work (autonomy directive)

Build the entire site end-to-end. Do not stop to ask small questions — make reasonable decisions, note them inline in a `DECISIONS.md`, and keep moving. Only surface **blockers** (missing credentials, or the two flagged data conflicts in `site.json`). Work in this order and check off `BUILD_PLAN` as you go. When finished: push to a feature branch, let Vercel build the **preview** deployment, and print the preview URL + a short "what I built / what needs your input" summary. **Do not deploy to production** — see Deploy policy above.

Everything factual about the business lives in `/project-data/*.json`. **Treat those files as the source of truth. Do not invent NAP, hours, services, prices, or reviews.** If it's not in the data and you need it, add a clearly-labeled `TODO(client)` rather than guessing.

Before writing any UI, read the `frontend-design` skill and follow it for tokens, type, spacing, and component polish.

---

## Tech stack (required)

- **Next.js (App Router)**, latest stable, **TypeScript**.
- **Tailwind CSS** for styling. shadcn/ui optional for primitives (buttons, accordion, dialog).
- **next/image** for all imagery. **next/font** for fonts (self-hosted, no layout shift).
- Static-first: use SSG (`generateStaticParams`) for all marketing + city pages so crawlers and AI bots get fully-rendered HTML.
- **`trailingSlash: true`** in `next.config.js` — this is mandatory to match the legacy WordPress URLs exactly (see SEO section).
- Deploy target: **Vercel**. Repo: **GitHub**.
- No CMS required for v1 (content is in `/project-data` + typed content modules). Structure it so a headless CMS could be added later.

---

## BUILD_PLAN (work top to bottom)

1. **Scaffold** the Next.js + TS + Tailwind app. Add `next.config.js` with `trailingSlash: true`, image config, redirects (from `project-data/redirects.json` → `explicit301Redirects`), and security headers.
2. **Import data**: create `/src/data` that imports and types all `/project-data/*.json`. Export typed helpers (`getSite()`, `getServices()`, `getServiceAreas()`, `getFaqs()`, `getReviews()`, `getImages()`).
3. **Download assets**: run the image-download script (below) to pull every asset in `images.json` into `/public/images/` with exact filenames.
4. **Design system**: implement tokens (colors/type/spacing/radius/shadow) per the Design section. Build a small component library: `Header`, `Footer`, `Button`, `SectionHeading`, `CTASection`, `ServiceCard`, `ProcessSteps`, `ReviewCard`, `ReviewsSlider`, `FAQAccordion`, `AreasServed`, `StickyMobileCTA`, `QuoteForm`, `PhotoQuoteBadge`, `Breadcrumbs`.
5. **Global chrome**: sticky header with click-to-call + "Text a photo" + "Get a fast quote"; footer with NAP, hours, socials, quick links. Persistent **sticky mobile call/text bar**.
6. **Pages** (see Page specs): Home, About, What We Take, Pricing, Dumpster Rentals (hub), Service Areas (hub), Contact, FAQs, Terms, Privacy, 10 city service pages, 12 city dumpster pages, plus `not-found`.
7. **SEO layer**: per-page `metadata` (title/description/canonical/OG/Twitter), JSON-LD schema graph, `sitemap.ts`, `robots.ts`, GSC verification tag, GTM.
8. **AI / answer-engine layer**: FAQPage + speakable schema, `llms.txt`, entity-consistent copy, answer-first headings (see AEO section).
9. **Quote form**: working form with client + server validation, spam honeypot, file upload for photos, and email delivery (Resend or a Vercel serverless route → `info@sunshineremoval.com`). If no email key is provided, wire it to a no-op that logs + shows success, and leave `TODO(client): add RESEND_API_KEY`.
10. **QA**: run `next build`, fix all type/lint/build errors, check Lighthouse (target 95+ perf/SEO/best-practices/a11y on mobile), verify every legacy URL resolves 200, verify schema with no errors.
11. **Ship**: `git init` → commit → create GitHub repo → push → deploy to Vercel → output the URL.

Maintain a running `BUILD_PLAN.md` checklist and a `DECISIONS.md` in the repo.

---

## Design direction

Goal: a bright, trustworthy, **modern local-service** brand that feels premium and fast — not a generic template, not a dated WP theme. Think "sunshine + clean logistics." Read the `frontend-design` skill first and apply it.

- **Palette**: warm sunshine accents (the brand already uses an orange call button) balanced against a confident deep navy/charcoal and generous white space. Suggested: primary **sunshine orange/amber** for CTAs, secondary **deep navy** for trust/headers, neutral warm-grays for text/background, a soft "sky" tint for section backgrounds. Ensure AA contrast on all CTAs.
- **Type**: one characterful but legible sans for headings (e.g. a geometric/grotesque) + a clean neutral sans for body. Big, confident H1s. Self-host via next/font.
- **Feel**: rounded-but-not-bubbly cards, soft shadows, clear hierarchy, lots of breathing room, strong photography (their real job photos). Subtle motion only (fade/slide on scroll, hover lifts) — never janky.
- **Trust signals everywhere**: 5.0★ / 159 reviews badge, "Veteran-owned," "Family-owned," "Licensed & insured," discount callouts (military/senior/first-responder).
- **Conversion-first**: the photo-quote flow is the hero action. Every page has an obvious "Text a photo → get a fast quote" path and a click-to-call. Sticky mobile CTA bar.
- **Accessibility**: semantic landmarks, focus states, alt text from `images.json`, reduced-motion support, keyboard-navigable accordion/slider.
- Do **not** reproduce the old layout section-for-section. Improve information architecture and visual rhythm while keeping all the substance.

---

## Page specs

Use `/project-data` content as the backbone; rewrite/expand for quality and uniqueness (don't thin it out — match or exceed legacy depth so rankings hold). Every page ends with a strong CTA section.

- **Home (`/`)** — Hero (H1: junk removal + dump-trailer rentals in Broward County; photo-quote CTA + call). Trust bar (5.0★/159, veteran/family/licensed). Services (Junk Removal, Dump Trailer Rentals — from `services.json`). "Why choose us." 3-step process. Reviews slider. Areas-served block (Broward focus + Miami-Dade/Palm Beach). FAQ (general). Final CTA. Embed the existing Google "Areas We Serve" map (mid `1w206hNLnoiuCFsSI2okpRZHAOnx_Vhw`) or a clean static map.
- **About (`/about-us/`)** — Story ("why we exist"), Meet the Owners (Cesar & Lynzee, veteran-owned), mission & values, before/after gallery (use all `gallery` images), reviews, CTA. Hours + contact.
- **What We Take (`/what-we-take/`)** — Items we remove, construction/renovation debris, commercial, cleanouts, bulky/specialty, "a few things to be aware of" (special handling), what we DON'T accept, 3-step, FAQ (whatWeTake). Use `services.json`.
- **Pricing (`/pricing/`)** — Transparent volume-based model, what affects cost, what's included, photo-quote emphasis, dump-trailer pricing, **discounts** (military/veteran/senior/first-responder), FAQ (pricing).
- **Dumpster Rentals hub (`/dumpster-rentals/`)** — Dump-trailer explainer (driveway-safe, sizing help, delivery/pickup, clear pricing), how it differs from full-service junk removal, links to all 12 city dumpster pages.
- **Service Areas hub (`/service-areas/`)** — Intro + full towns list from `service-areas.json > fullAreasServed`, grid of the 10 city service pages, map.
- **City service pages (10)** — one per `serviceAreaPages` slug. Use the **Weston page** tone as template but write each city UNIQUE per `localPageContentGuidance`. Rotate matching city reviews in. Localize "Areas served near {city}."
- **City dumpster pages (12)** — one per `dumpsterRentalPages` slug (note the preserved `coral-spring` singular + `ft-lauderdale`). Dump-trailer-focused, localized, unique copy, sizing help, CTA.
- **Contact (`/contact-us/`)** — Working quote form (name, phone, email, preferred service [Junk Removal | Dump Trailer Rentals], message, photo upload). Click-to-call, text, email, hours, map. 
- **FAQs (`/faqs/`)** — Combined accordion from all `faqs.json` groups. FAQPage schema.
- **Terms (`/terms-and-condition/`)** and **Privacy (`/privacy-policy/`)** — port existing legal pages; if content unavailable, generate standard templates and mark `TODO(client): confirm legal copy`.
- **404** — on-brand, links back to key pages + call/text.

---

## SEO migration (do not lose history) — HARD REQUIREMENT

The domain is **not** changing and we keep **identical slugs**, so equity should carry over cleanly if you do this right:

1. **`trailingSlash: true`** and preserve every path in `redirects.json > mustPreserveExactly` exactly (including the quirky `tamarac-florida`, `coral-spring`, `ft-lauderdale` slugs). Do not "fix" slugs.
2. Add the `explicit301Redirects` and run the `preLaunchChecklist` in `redirects.json`. Crawl the live site and 301 anything not already covered.
3. **Keep the Google Search Console verification meta tag** (`site.json > tracking.googleSiteVerification`) in `<head>` on all pages. **Keep the GTM container** (`site.json > tracking.gtmId`). Losing either damages history.
4. Per-page **title + meta description** — reuse the legacy ones where good (captured below), improve where weak, keep them unique. Set **canonical** to the self URL. Add OG/Twitter (use `images.json`).
5. Generate **`/sitemap.xml`** (all indexable pages) and **`/robots.txt`** (allow all, point to sitemap). Same sitemap path as before.
6. Preserve image filenames exactly (`images.json`) to keep image-search equity; add descriptive alt text.
7. Keep content depth per page ≥ legacy. Don't drop the FAQ sections — they rank and feed AI answers.

**Legacy titles/descriptions to reuse (improve only if weak):**
- `/` — "Sunshine State Junk Removal | Fast Junk Removal" / "Need fast junk removal in Florida? Sunshine State Junk Removal offers affordable, reliable service. Call now for a free quote!"
- `/about-us/` — "About Sunshine State Junk Removal | Trusted Junk Removal" / "Learn why homeowners trust Sunshine State Junk Removal for professional junk removal. Call today to get started!"
- `/what-we-take/` — "What We Take | Sunshine State Junk Removal" / "From furniture to debris, we handle it all. See what items we accept for junk removal—call Sunshine State Junk Removal today!"
- `/pricing/` — "Junk Removal Pricing | Sunshine State Junk Removal"
- `/weston/` — "Junk Removal in Weston FL | Sunshine State Junk Removal" / "Get dependable junk removal in Weston, FL. Call Sunshine State Junk Removal today for a free quote!"
- City pages pattern: `Junk Removal in {City} FL | Sunshine State Junk Removal`; dumpster pattern: `Dumpster Rental in {City} FL | Sunshine State Junk Removal`.

---

## AI / answer-engine optimization (AEO/GEO) — the "hyper-local AI search" ask

Make this the site AI assistants quote when someone asks "junk removal near me in {Broward city}."

1. **JSON-LD schema graph** on every page (typed, no errors):
   - **LocalBusiness** (subtype `HomeAndConstructionBusiness`): name, url, telephone, email, image/logo, `priceRange` (e.g. `"$$"`), full `address` (from `site.json`, to match GBP), `geo`, `openingHoursSpecification` (resolve the hours conflict per `site.json`), `areaServed` = full towns list, `sameAs` = all socials, and `aggregateRating` (5.0 / 159). Include `hasOfferCatalog` of services.
   - **Service** entities for Junk Removal, Dump Trailer Rental, Estate/Storage/Garage Cleanouts, Construction Debris Removal, Appliance/Hot Tub/Mattress Removal — each with `areaServed` + `provider`.
   - **FAQPage** on every page that shows FAQs.
   - **BreadcrumbList** on all sub-pages.
   - **Review**/aggregate only for reviews actually rendered on the page.
   - City pages: LocalBusiness with `areaServed` scoped to that city + neighbors.
2. **Answer-first content**: each key question answered in the first 1–2 sentences under a question-style heading (H2/H3). Keep the existing conversational FAQ voice — it extracts well.
3. **`/llms.txt`** at web root: concise plain-text business summary — who/what/where, services, service areas, hours, phone, "how to get a quote (text a photo to 954-247-1399)," differentiators (veteran/family-owned, same-day, 5.0/159), and links to key pages. (Also add `/public/llms.txt`.)
4. **Speakable** schema (`SpeakableSpecification`) targeting the H1 + first answer block on Home and city pages.
5. **Entity consistency**: identical NAP + business name string everywhere (matches GBP). Consistent service + area vocabulary. This is what makes the local entity legible to LLMs and Google's AI surfaces.
6. Semantic HTML, fast SSG pages, clean headings, descriptive links (no "click here"), real alt text.

---

## Image download script

Read every entry in `project-data/images.json` and download to `/public/images/` preserving `localFilename`. Skip-and-log on 404; never block the build. Example:

```bash
mkdir -p public/images
node -e '
const data = require("./project-data/images.json");
const all = [...(data.brand||[]), ...(data.sections||[]), ...(data.gallery||[])];
const https = require("https"); const fs = require("fs"); const path = require("path");
(async () => {
  for (const img of all) {
    const dest = path.join("public/images", img.localFilename);
    if (fs.existsSync(dest)) continue;
    await new Promise((res) => {
      https.get(img.sourceUrl, (r) => {
        if (r.statusCode !== 200) { console.warn("SKIP", r.statusCode, img.sourceUrl); r.resume(); return res(); }
        const f = fs.createWriteStream(dest); r.pipe(f); f.on("finish", () => f.close(res));
      }).on("error", (e) => { console.warn("ERR", img.sourceUrl, e.message); res(); });
    });
  }
  console.log("done");
})();
'
```

If the network is blocked in your environment, still create the `/public/images` references and leave a `TODO(client)` note listing any files to add; use tasteful placeholders so the build passes.

---

## Environment variables

Create `.env.example` and read from env (never hardcode secrets):
```
NEXT_PUBLIC_SITE_URL=https://sunshineremoval.com
NEXT_PUBLIC_GTM_ID=GTM-MD7RMZGV
NEXT_PUBLIC_GSC_VERIFICATION=ajUPZbG0UaUl2IT7sfGSqb_zJfxw8zlGPnOBEulK8JY
RESEND_API_KEY=            # TODO(client): for quote-form email delivery
QUOTE_TO_EMAIL=info@sunshineremoval.com
```

---

## Deploy (do this yourself)

> **⚠️ SUPERSEDED by the "Deploy policy" at the top of this file.** The site is now live. Do not run `vercel --prod`, `vercel promote`, or `vercel deploy` from the CLI. The steps below described the initial launch and are kept for historical context only. For any further work: create a feature branch, push, and report the preview URL — production is not yours to promote.

1. ~~`git init`, sensible `.gitignore`, initial commit.~~ (done — repo exists at `github.com/haulersedgeai/sunshine-state-junk-removal`)
2. ~~Create a GitHub repo.~~ (done)
3. ~~Deploy to Vercel (`vercel --prod` if the CLI is authed, or connect the GitHub repo in Vercel). Set the env vars above in Vercel.~~ (done — Vercel is git-linked; Production Branch = `main`. **Do NOT run `vercel --prod`.**)
4. ~~Keep the production **domain unchanged** (`sunshineremoval.com`).~~ (done — DNS is live on the production Vercel deployment)
5. Ongoing: push feature branches → report **preview** URLs. Production promotion is manual/human-only.

---

## Acceptance criteria (definition of done)

- All 30+ routes build statically and resolve **200** at their exact legacy paths (trailing slash).
- Mobile Lighthouse ≥ 95 SEO/Perf/Best-Practices, ≥ 90 A11y.
- Valid JSON-LD (LocalBusiness + Service + FAQPage + Breadcrumb) with no Rich Results errors.
- `sitemap.xml`, `robots.txt`, `llms.txt`, GSC tag, and GTM present.
- Quote form validates and submits (email wired or clearly TODO'd).
- Every city page has unique copy (no duplicate-content across cities).
- All legacy images present in `/public/images` with alt text (or logged as TODO).
- Sticky mobile call/text CTA on every page.
- Deployed to Vercel; GitHub repo pushed; summary printed.

## Two conflicts you must surface (do not silently pick)
1. **Hours** — GBP says *Open 24/7*; old site says *Mon–Sat 7am–8pm*. Default to **24/7** (matches GBP + review evidence), but flag for confirmation. (`site.json > hours`)
2. **Public address** — GBP has a street address; old site hid it. Default: **Service Area Business** (address in schema to match GBP, not shown in footer). Flag for confirmation. (`site.json > address`)
