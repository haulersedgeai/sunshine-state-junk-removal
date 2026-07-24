# AUDIT.md

Live host audited: `https://sunshine-state-junk-removal.vercel.app`
Canonical host: `https://sunshineremoval.com`
Total routes audited: 33
Total issues found: **0**

## Migration note (2026-07-24)
This audit predates two later sessions that changed routing:
- `/coral-springs-florida/`, `/tamarac-florida/`, and `/sunrise/` were retired and now 301-redirect into the new `/junk-removal/[city]/` system (operator-approved, 2026-07-23). Their rows below are updated to reflect redirect status — they are **no longer live HTTP 200 pages**, so don't restore them.
- 6 new pages now exist at `/junk-removal/coral-springs/`, `/junk-removal/coconut-creek/`, `/junk-removal/margate/`, `/junk-removal/parkland/`, `/junk-removal/tamarac/`, `/junk-removal/sunrise/`. Entries for these are appended at the end, verified against the current route/component code and local build, not a fresh production crawl — a full re-crawl (matching the rigor of the original audit) is still recommended before the next promotion.
- The cross-route stats above (`33 routes`, `0 issues`) reflect the original crawl only and have not been recomputed; treat them as historical, not current.

## Cross-route issues
- Titles unique across routes ✓
- Descriptions unique across routes ✓
- All 24 referenced local images resolve 200 ✓

## Per-route findings

### ✅ `/` (home, HTTP 200)
- **Title:** Sunshine State Junk Removal | Fast Junk Removal
- **Canonical:** https://sunshineremoval.com/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 7 local images_

### ✅ `/about-us/` (core, HTTP 200)
- **Title:** About Sunshine State Junk Removal | Trusted Junk Removal
- **Canonical:** https://sunshineremoval.com/about-us/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 5
- _note: refs 13 local images_

### ✅ `/what-we-take/` (core, HTTP 200)
- **Title:** What We Take | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/what-we-take/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 6
- _note: refs 8 local images_

### ✅ `/pricing/` (core, HTTP 200)
- **Title:** Junk Removal Pricing | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/pricing/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service
- **<details> FAQ blocks:** 8
- _note: refs 1 local images_

### ✅ `/dumpster-rentals/` (core, HTTP 200)
- **Title:** Dump Trailer Rentals in Broward County | Sunshine State
- **Canonical:** https://sunshineremoval.com/dumpster-rentals/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service
- **<details> FAQ blocks:** 3
- _note: refs 1 local images_

### ✅ `/service-areas/` (core, HTTP 200)
- **Title:** Service Areas | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/service-areas/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 0
- _note: refs 0 local images_

### ✅ `/contact-us/` (core, HTTP 200)
- **Title:** Contact Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/contact-us/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 0
- _note: refs 0 local images_

### ✅ `/faqs/` (core, HTTP 200)
- **Title:** FAQs | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/faqs/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 25
- _note: refs 0 local images_

### ✅ `/terms-and-condition/` (legal, HTTP 200)
- **Title:** Terms &amp; Conditions | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/terms-and-condition/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 0
- _note: refs 0 local images_

### ✅ `/privacy-policy/` (legal, HTTP 200)
- **Title:** Privacy Policy | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/privacy-policy/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, HomeAndConstructionBusiness
- **<details> FAQ blocks:** 0
- _note: refs 0 local images_

### ✅ `/cooper-city-florida/` (city-service, HTTP 200)
- **Title:** Junk Removal in Cooper City FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/cooper-city-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 2 local images_

### ➡️ `/coral-springs-florida/` (retired, 301 → `/junk-removal/coral-springs/`)
- **Status as of 2026-07-23:** No longer a live page. Permanently redirects to `/junk-removal/coral-springs/` (see `redirects.json > explicit301Redirects`). Single-hop, verified.

### ✅ `/davie/` (city-service, HTTP 200)
- **Title:** Junk Removal in Davie FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/davie/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 2 local images_

### ✅ `/hollywood/` (city-service, HTTP 200)
- **Title:** Junk Removal in Hollywood FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/hollywood/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 2 local images_

### ✅ `/miramar/` (city-service, HTTP 200)
- **Title:** Junk Removal in Miramar FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/miramar/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 2 local images_

### ✅ `/pembroke-pines/` (city-service, HTTP 200)
- **Title:** Junk Removal in Pembroke Pines FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/pembroke-pines/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 2 local images_

### ✅ `/plantation/` (city-service, HTTP 200)
- **Title:** Junk Removal in Plantation FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/plantation/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 5
- _note: refs 2 local images_

### ➡️ `/sunrise/` (retired, 301 → `/junk-removal/sunrise/`)
- **Status as of 2026-07-23:** No longer a live page. Permanently redirects to `/junk-removal/sunrise/` (see `redirects.json > explicit301Redirects`). Single-hop, verified.

### ➡️ `/tamarac-florida/` (retired, 301 → `/junk-removal/tamarac/`)
- **Status as of 2026-07-23:** No longer a live page. Permanently redirects to `/junk-removal/tamarac/` (see `redirects.json > explicit301Redirects`). Single-hop, verified.

### ✅ `/weston/` (city-service, HTTP 200)
- **Title:** Junk Removal in Weston FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/weston/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-cooper-city-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Cooper City FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-cooper-city-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-coral-spring-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Coral Springs FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-coral-spring-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-davie-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Davie FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-davie-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-ft-lauderdale-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Ft. Lauderdale FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-ft-lauderdale-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-hollywood-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Hollywood FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-hollywood-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-miramar-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Miramar FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-miramar-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-pembroke-pines-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Pembroke Pines FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-pembroke-pines-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-plantation-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Plantation FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-plantation-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-southwest-ranches-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Southwest Ranches FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-southwest-ranches-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-sunrise-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Sunrise FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-sunrise-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-tamarac-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Tamarac FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-tamarac-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/dumpster-rentals-in-weston-florida/` (city-dumpster, HTTP 200)
- **Title:** Dumpster Rental in Weston FL | Sunshine State Junk Removal
- **Canonical:** https://sunshineremoval.com/dumpster-rentals-in-weston-florida/
- **OG image:** https://sunshine-state-junk-removal.vercel.app/images/Sunshine-About-Us.webp
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

## New routes: `/junk-removal/[city]/` first wave (added 2026-07-23, content refreshed 2026-07-24)
Verified against route/component code (`src/app/junk-removal/[city]/page.tsx`, `src/components/JunkRemovalCityPage.tsx`) and a local production build — all 6 prerender statically and returned HTTP 200 in local `next start` checks. Not yet re-crawled against the live production host; recommend a fresh pass alongside the rest of this audit before the next promotion.

### ✅ `/junk-removal/coral-springs/` (city-service, HQ)
- **Title:** Junk Removal in Coral Springs, FL | Sunshine State
- **Canonical:** https://sunshineremoval.com/junk-removal/coral-springs/
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/junk-removal/coconut-creek/` (city-service)
- **Title:** Junk Removal in Coconut Creek, FL | Sunshine State
- **Canonical:** https://sunshineremoval.com/junk-removal/coconut-creek/
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/junk-removal/margate/` (city-service)
- **Title:** Junk Removal in Margate, FL | Sunshine State
- **Canonical:** https://sunshineremoval.com/junk-removal/margate/
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/junk-removal/parkland/` (city-service)
- **Title:** Junk Removal in Parkland, FL | Sunshine State
- **Canonical:** https://sunshineremoval.com/junk-removal/parkland/
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/junk-removal/tamarac/` (city-service)
- **Title:** Junk Removal in Tamarac, FL | Sunshine State
- **Canonical:** https://sunshineremoval.com/junk-removal/tamarac/
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/junk-removal/sunrise/` (city-service)
- **Title:** Junk Removal in Sunrise, FL | Sunshine State
- **Canonical:** https://sunshineremoval.com/junk-removal/sunrise/
- **JSON-LD types:** BreadcrumbList, FAQPage, HomeAndConstructionBusiness, Service, WebPage
- **<details> FAQ blocks:** 6
- _note: refs 2 local images_

### ✅ `/definitely-not-a-page-xyz/` (404, HTTP 404)
- **<details> FAQ blocks:** 0
- _note: 404 correctly returned_
