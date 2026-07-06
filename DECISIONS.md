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
- Every legacy path in `redirects.json > mustPreserveExactly` is preserved verbatim (including the intentional inconsistencies: `tamarac-florida`, `coral-spring` singular, `ft-lauderdale`).
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

## Not built (out of scope for v1)
- A CMS layer. Structured so it can be added later without rewriting page components.
- A blog. If posts need to migrate, add during preLaunchChecklist crawl.
- Live chat widget. Kept the site fast and lean.
