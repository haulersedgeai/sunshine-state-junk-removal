# DECISIONS

Autonomous decisions made during this rebuild. All small enough to fit the brief; the two flagged conflicts are surfaced below for the client.

## Tech stack
- Next.js 16 App Router + React 19 + TypeScript.
- Tailwind CSS 3.4 with a custom brand palette (`sun` for sunshine orange, `navy` for deep navy).
- Self-hosted Google Fonts via `next/font`: **Sora** (display) + **Inter** (body).
- No CMS. All content lives in `/project-data` and is imported through typed helpers in `/src/data`.
- Vercel as the deploy target; static-first via App Router (all marketing/city pages are statically rendered by default).

## URL / SEO
- `trailingSlash: true` — mandatory to match the legacy WordPress URLs.
- Every legacy path in `redirects.json > mustPreserveExactly` is preserved verbatim (including the intentional inconsistency: `coral-spring` singular on the dumpster page, and `ft-lauderdale`).
- **2026-07-24 update:** `/coral-springs-florida/`, `/tamarac-florida/`, and `/sunrise/` are no longer in `mustPreserveExactly` — they were operator-approved 301 redirects (2026-07-23) into the new data-driven `/junk-removal/[city]/` system (`/junk-removal/coral-springs/`, `/junk-removal/tamarac/`, `/junk-removal/sunrise/`). This is an intentional exception to "preserve every legacy path verbatim": the 3 old routes were retired rather than kept live, so future audits should expect a 301 at those slugs, not a 200. See `redirects.json > explicit301Redirects` for the notes on each. No redirect chains exist — nothing else in the codebase points at the old slugs as a destination.
- Explicit 301s from `explicit301Redirects` are wired in `next.config.js` (`/home`, `/index.php` → `/`).
- Google Search Console verification meta tag and GTM container are kept in the root layout, exactly as instructed.
- `metadataBase` derived from `NEXT_PUBLIC_SITE_URL` (defaults to the domain in `site.json`).

## Data / content
- `/project-data/*.json` is the source of truth. No business facts invented.
- Per-city copy in `src/data/city-content.ts` is city-specific (unique intros, neighborhoods, landmarks, focus, closers, and optional FAQ variants) so every city page is genuinely distinct and matches or exceeds the guidance in `service-areas.json > localPageContentGuidance`.
- Reviews mentioning a city are rotated onto matching city pages when present; general reviews fill the gap otherwise.

## Design
- Sunshine orange (`#F58A0A`) is the primary CTA color; deep navy (`#0F1F3A`) is the trust/header color.
- Soft "sky" tint used as an alternating section background for rhythm without visual noise.
- Rounded 1.25rem cards, soft shadow, generous whitespace, subtle hover lifts.
- Accessibility: skip link, focus states, reduced-motion support, semantic landmarks, aria labels on nav/dialog/accordion.
- Real job photos used everywhere (from `images.json`) — no stock photography.

## AEO / AI-search
- JSON-LD graph on every relevant page: LocalBusiness (`HomeAndConstructionBusiness`) with full NAP, hours (24/7), areaServed, sameAs, aggregateRating (5.0 / 159), and OfferCatalog.
- Per-page Service, FAQPage, BreadcrumbList, and Speakable schema.
- Answer-first phrasing on H1 + `.speakable-answer` block on Home and every city page.
- `/llms.txt` at `public/llms.txt` with a concise, structured business summary + all key page URLs.
- Consistent NAP string everywhere to match the Google Business Profile entity.

## Assets
- All 32 legacy image URLs pulled and stored in `/public/images/` with exact original `localFilename` — preserving image-search equity.
- Alt text taken from `images.json` and enriched contextually where the same image is reused on multiple pages.

## Quote form
- Server route at `POST /api/quote`. Multipart/form-data support (photo attachments read as `File` names).
- Honeypot field `company` silently rejects bots.
- Resend integration ready — reads `RESEND_API_KEY` / `QUOTE_TO_EMAIL` from env; if `RESEND_API_KEY` is missing, the endpoint logs the lead and returns success (so the UX still works pre-launch). `TODO(client): add RESEND_API_KEY` in Vercel to enable email delivery.

## Legal pages
- `/terms-and-condition/` and `/privacy-policy/` written as clean, standard, service-business templates. Client should review and swap in attorney-reviewed copy if/when available.

## Previously flagged data conflicts — both now resolved
1. **Hours (`site.json > hours`)** — **CONFIRMED: Open 24/7.** Matches Google Business Profile and the after-hours evidence in the reviews. The old website's Mon–Sat 7am–8pm hours are not used anywhere on the site or in schema.
2. **Public street address (`site.json > address`)** — **CONFIRMED: display the full address publicly.** The site now shows **3700 NW 104th Ave, Coral Springs, FL 33065** in the footer NAP block and on the Contact page, matching the Google Business Profile.
   - The exact same string is emitted by the LocalBusiness JSON-LD, the footer, the Contact page, and `/llms.txt`. All four are built from `site.json > address` via a single `formattedAddress` helper (`src/data/index.ts`), so any future change to the address updates everywhere at once and keeps NAP byte-for-byte consistent.

## Pricing data — single source of truth
- **Prices live in `project-data/services.json` only. Components read them; they never duplicate them.** Any price, included-days, included-tonnage, or per-ton overage value rendered anywhere on the site must be interpolated from `services.json` — never retyped as a literal in a component, page, metadata string, or JSON-LD generator.
- Rationale: `src/components/CityDumpsterPage.tsx` (which drives all 12 city dumpster pages) had the 18yd/21yd flat rates, included days, included tonnage, and per-ton overage retyped as string literals. They happened to agree with `services.json`, but nothing enforced it — a price change in `services.json` would have silently left 12 live pages advertising stale prices. Same pattern in the `/pricing/` H1 + meta description and the `/dumpster-rentals/` pricing intro.
- Now reading from `services.json`: `CityDumpsterPage.tsx` (rental pricing FAQ), `src/app/pricing/page.tsx` (meta description, H1, intro paragraph), `src/app/dumpster-rentals/page.tsx` (pricing section intro). `PricingTables.tsx` and both JSON-LD generators in `src/lib/schema.tsx` already did.
- **Known remaining duplication, deliberately left alone** (each needs a schema change or a copy change, so neither belongs in a pure refactor):
  - `services.json > pricing.trailerPricing` and the Dump & Return note in `pricing.dumpsterRental.notes[1]` restate `sizes[].price` as prose *inside the same file*.
  - `project-data/faqs.json` restates the junk-removal tiers and the full dumpster rate card as prose.
  - `public/llms.txt` is hand-maintained and restates every price; no generator exists.
  - The `$100` prohibited-items surcharge in `CityDumpsterPage.tsx` is exposed only *inside* the `prohibitedItems.intro` prose string, not as a discrete numeric field.
  - Practical rule until those are addressed: **a price change means editing `services.json`, `faqs.json`, and `llms.txt` together.**

## Second location (2026-08-05) — Southwest Ranches build
- **`/locations/` namespace** chosen for the two location pages (`/locations/coral-springs/`, `/locations/southwest-ranches/`). Verified no collision: no existing route, redirect source, or redirect destination uses `/locations/*`. The namespace is distinct from the city *service-area* pattern (`/junk-removal/{city}/` and legacy slugs), which keeps "where we are" pages separable from "where we serve" pages for the upcoming second Google Business Profile.
- **Two-entity schema structure.** The former sitewide `HomeAndConstructionBusiness` node (`/#localbusiness`, Coral Springs NAP — emitted from the root layout, so it appeared on every page) was retired. In its place: a sitewide `Organization` node (`/#organization`: name, url, logo, sameAs, subOrganization) emitted from the root layout, plus one authoritative `LocalBusiness` node per location, emitted only on that location's page (`…/locations/{id}/#location`, with `parentOrganization` → `#organization`). All `provider`/`brand`/`seller` references in `src/lib/schema.tsx` that pointed at `/#localbusiness` now point at `#organization` so no `@id` reference dangles. Per-city LocalBusiness nodes on city pages (their own `{slug}#localbusiness` @ids) are separate city-scoped entities and were deliberately left untouched. Entity `@id`s are hard-coded to `https://www.sunshineremoval.com` (never env-derived).
- **Location data single source: `project-data/locations.json`.** The Southwest Ranches phone and hours are **null pending client values** — everywhere they would appear (page NAP, footer block, schema `telephone`/`openingHoursSpecification`, llms.txt) the field is omitted entirely while null; no placeholder ships. Coral Springs NAP/phone/hours/geo are merged from `site.json` in `src/data/locations.ts` so the original NAP stays byte-identical sitewide. The Southwest Ranches street address `5011 SW 210 Terrace` is locked verbatim.
- **Location-page meta titles** drop the brand suffix ("| Sunshine State Junk Removal") to keep the full service + geographic phrase within the 60-character limit (51 and 55 chars).
- **Location-page city lists** link only the six Wave 1 `/junk-removal/{city}/` pages per the build brief; cities with live *legacy* pages (e.g. `/davie/`, `/weston/`) render as plain text there. The AreasServed presentation (homepage + `/service-areas/`) keeps its pre-existing behavior of linking every city that has a page.

## Not built (out of scope for v1)
- A CMS layer. Structured so it can be added later without rewriting page components.
- A blog. If posts need to migrate, add during preLaunchChecklist crawl.
- Live chat widget. Kept the site fast and lean.
