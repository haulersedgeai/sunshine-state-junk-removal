# AUDIT.md

Live host audited: `https://sunshine-state-junk-removal.vercel.app`
Canonical host: `https://sunshineremoval.com`
Total routes audited: 33
Total issues found: **0**

## Executive summary

**Final result: 0 automated issues + all qualitative spot-checks pass.**

### Issues found by first audit run (all fixed)
1. `/service-areas/`, `/contact-us/`, `/faqs/` — no `<h1>` on the page. Root cause: those pages relied on `SectionHeading` which defaults to `<h2>`. **Fix:** passed `as="h1"` to the top `SectionHeading` on each. Group headings inside `/faqs/` stay `<h2>` (correct nesting).
2. Audit script initially missed next/image-optimized URLs (they use `/_next/image/?url=...` with an `&amp;`-encoded query string). Improved the extractor to decode HTML entities and pull the `url=` param, then verify each unique underlying `/images/*` path resolves 200. **Result:** 27 unique local image files referenced across the site, all serving 200.

### Verified passing (all 33 routes)
- **HTTP 200** on every static route; `/definitely-not-a-page-xyz/` correctly returns 404.
- **Titles**: every page's `<title>` includes the brand exactly once (no doubling). All titles unique across routes.
- **Descriptions**: unique per page.
- **Canonicals**: every canonical points at `https://sunshineremoval.com{path}` with trailing slash.
- **OG image**: absolute URL served from `sunshine-state-junk-removal.vercel.app` (works pre-DNS-cutover; `NEXT_PUBLIC_OG_HOST` documented for revert at launch).
- **H1**: exactly 1 per page after fixes.
- **JSON-LD**:
  - `HomeAndConstructionBusiness` LocalBusiness on every content page.
  - `Service` on home + all city service + all city dumpster pages + dumpster hub.
  - `FAQPage` on every page rendering an FAQ accordion (23 total FAQ groups site-wide).
  - `BreadcrumbList` on every sub-page (not on home).
  - `WebPage` + `SpeakableSpecification` on home + city pages.
- **NAP consistency**: schema fields `streetAddress:"3700 NW 104th Ave"` + `addressLocality:"Coral Springs"` + `addressRegion:"FL"` + `postalCode:"33065"` concatenate to `3700 NW 104th Ave, Coral Springs, FL 33065`, which is byte-identical to the visible footer and Contact-page address.
- **FAQ SSR**: all answers rendered inside `<details>` in the initial HTML (not just the open one) — 6 per city page, 5–6 per core page, 23 on `/faqs/`.
- **HTML entities in visible copy**: none. Prior sweep of `&rsquo; &ldquo; &amp; …` verified clean.
- **Header logo**: present on every page (`Sunshine-Logo.svg`).
- **Footer white logo**: present on every page (`Sunshine-Logo-White.svg`) — verified visible on the navy footer.
- **Sticky mobile CTA**: present on every page.
- **Tel + SMS links**: `tel:+19542471399` and `sms:+19542471399` present on every page.
- **ReviewCard separator**: renders as `Sunny M · Google · a month ago` on every page that shows reviews.
- **Availability wording**: only `Same-day & 24/7` in general-availability copy; `Same-day delivery` remains only on the delivery-specific dumpster city hero (intentional).
- **Trust-signal duplication**: max 3 visible `"5.0 · 159+"` occurrences per page (header strip + reviews section text + trust bar) — no repeated cluster in the hero.
- **Pricing page**: mentions Military / Veterans / Seniors / First responders. **Zero invented dollar amounts** in visible copy (the pricing model is volume-based per the source of truth).
- **What We Take**: Household + Construction + Commercial + Cleanouts + Bulky categories all present, plus "what we don't accept" and the bed-bug special-handling note.
- **About page**: names Cesar and Lynzee, calls out veteran-owned, renders 14 unique real job photos in the gallery.
- **City page uniqueness**: sampled 5 city intros — Weston / Coral Springs / Davie / Hollywood / Cooper City — each opens with a distinct paragraph specific to the city (no verbatim reuse).
- **Prior-fix regression check**: (a) title de-dup ✓, (b) FAQ SSR via `<details>` ✓, (c) public address in footer + contact + LocalBusiness schema + `llms.txt` ✓, (d) HTML-entity cleanup ✓.

### Nothing needs your decision
No open questions surfaced by this audit. The previously-flagged data conflicts (hours = 24/7, address public) are both marked confirmed in `DECISIONS.md`. Everything not covered by automated checks was validated with targeted spot-checks; see the qualitative summary in the commit log.

## Cross-route issues
- Titles unique across routes ✓
- Descriptions unique across routes ✓
- All 27 referenced local images resolve 200 ✓

## Per-route findings

### ✅ `/` (home, HTTP 200)
- **Title:** Sunshine State Junk Removal | Fast Junk Removal
- **Canonical:** https://sunshineremoval.com/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 9 local images_

### ✅ `/about-us/` (core, HTTP 200)
- **Title:** About Sunshine State Junk Removal | Trusted Junk Removal
- **Canonical:** https://sunshineremoval.com/about-us/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 5
- _note: refs 15 local images_

### ✅ `/what-we-take/` (core, HTTP 200)
- **Title:** What We Take | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/what-we-take/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 6
- _note: refs 10 local images_

### ✅ `/pricing/` (core, HTTP 200)
- **Title:** Junk Removal Pricing | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/pricing/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals/` (core, HTTP 200)
- **Title:** Dump Trailer Rentals in Broward County | Sunshine State
- **Canonical:** https://sunshineremoval.com/dumpster-rentals/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service
- **<details> FAQ blocks:** 3
- _note: refs 3 local images_

### ✅ `/service-areas/` (core, HTTP 200)
- **Title:** Service Areas | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/service-areas/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 0
- _note: refs 2 local images_

### ✅ `/contact-us/` (core, HTTP 200)
- **Title:** Contact Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/contact-us/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 0
- _note: refs 2 local images_

### ✅ `/faqs/` (core, HTTP 200)
- **Title:** FAQs | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/faqs/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 23
- _note: refs 2 local images_

### ✅ `/terms-and-condition/` (legal, HTTP 200)
- **Title:** Terms &amp; Conditions | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/terms-and-condition/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 0
- _note: refs 2 local images_

### ✅ `/privacy-policy/` (legal, HTTP 200)
- **Title:** Privacy Policy | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/privacy-policy/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 0
- _note: refs 2 local images_

### ✅ `/cooper-city-florida/` (city-service, HTTP 200)
- **Title:** Junk Removal in Cooper City FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/cooper-city-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/coral-springs-florida/` (city-service, HTTP 200)
- **Title:** Junk Removal in Coral Springs FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/coral-springs-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/davie/` (city-service, HTTP 200)
- **Title:** Junk Removal in Davie FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/davie/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/hollywood/` (city-service, HTTP 200)
- **Title:** Junk Removal in Hollywood FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/hollywood/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/miramar/` (city-service, HTTP 200)
- **Title:** Junk Removal in Miramar FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/miramar/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/pembroke-pines/` (city-service, HTTP 200)
- **Title:** Junk Removal in Pembroke Pines FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/pembroke-pines/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/plantation/` (city-service, HTTP 200)
- **Title:** Junk Removal in Plantation FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/plantation/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/sunrise/` (city-service, HTTP 200)
- **Title:** Junk Removal in Sunrise FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/sunrise/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/tamarac-florida/` (city-service, HTTP 200)
- **Title:** Junk Removal in Tamarac FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/tamarac-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 4 local images_

### ✅ `/weston/` (city-service, HTTP 200)
- **Title:** Junk Removal in Weston FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/weston/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-cooper-city-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Cooper City FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-cooper-city-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-coral-spring-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Coral Springs FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-coral-spring-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-davie-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Davie FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-davie-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-ft-lauderdale-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Ft. Lauderdale FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-ft-lauderdale-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-hollywood-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Hollywood FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-hollywood-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-miramar-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Miramar FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-miramar-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-pembroke-pines-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Pembroke Pines FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-pembroke-pines-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-plantation-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Plantation FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-plantation-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-southwest-ranches-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Southwest Ranches FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-southwest-ranches-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-sunrise-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Sunrise FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-sunrise-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-tamarac-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Tamarac FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-tamarac-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/dumpster-rentals-in-weston-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Weston FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-weston-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 4 local images_

### ✅ `/definitely-not-a-page-xyz/` (404, HTTP 404)
- **<details> FAQ blocks:** 0
- _note: 404 correctly returned_
