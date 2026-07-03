# Sunshine State Junk Removal — Claude Code build package

Drop this folder into an empty project directory, open **Claude Code** in it, and paste the kickoff prompt below. Claude Code reads `CLAUDE.md` automatically and uses `/project-data` as the source of truth, then builds and deploys the whole site.

## What's in here
```
CLAUDE.md                 ← master build brief (Claude Code reads this)
README.md                 ← you are here
.gitignore
project-data/
  site.json               ← NAP, hours, brand, tracking IDs, discounts (source of truth)
  services.json           ← services, what-we-take, process, pricing model
  service-areas.json      ← all towns + exact legacy slugs for city pages
  faqs.json               ← FAQ content for pages + FAQPage schema
  reviews.json            ← curated Google/Facebook/Yelp reviews + aggregate 5.0/159
  images.json             ← every legacy image (source URL → local filename → alt)
  redirects.json          ← URL parity + 301 map for SEO preservation
```

## Prerequisites (so Claude Code can deploy on its own)
- Node 18+ and npm.
- `gh` CLI authenticated (`gh auth login`) — lets Claude Code create + push the GitHub repo.
- `vercel` CLI authenticated (`vercel login`) — lets Claude Code deploy.
- Internet access enabled in the Claude Code session (to download the legacy images).

If any of those aren't set up, Claude Code will still build everything and print the exact manual commands for the missing step.

## Kickoff prompt (paste into Claude Code)
> Read CLAUDE.md and build the entire Sunshine State Junk Removal website end-to-end per that brief. Use /project-data as the source of truth. Scaffold Next.js (App Router, TypeScript, Tailwind), download the legacy images, build the full design system and all pages (home, about, what-we-take, pricing, dumpster hub, service-areas hub, contact, faqs, terms, privacy, all 10 city service pages, all 12 city dumpster pages, 404), add the full SEO layer (trailingSlash, per-page metadata, JSON-LD, sitemap, robots, llms.txt, keep the GSC tag + GTM), and the AEO/AI-search layer. Keep every legacy URL identical. Wire the quote form. Run `next build`, fix all errors, then git init, create a GitHub repo, push, and deploy to Vercel. Keep a BUILD_PLAN.md and DECISIONS.md. When done, print the live URL and any open TODO(client) items. Work autonomously — only stop for the two flagged conflicts in site.json (hours + public address) if you truly can't proceed.

## After the build (your review)
1. Open the Vercel preview URL Claude Code prints. Review design, copy, city pages.
2. Resolve the **two flagged conflicts** (hours 24/7 vs Mon–Sat; whether to show the street address).
3. Add `RESEND_API_KEY` in Vercel if you want the quote form to email leads.
4. Only when you're happy: point `sunshineremoval.com` DNS at Vercel. **Don't change the domain** — keeping it is what preserves your rankings. Then resubmit `/sitemap.xml` in Google Search Console.

## Notes on SEO safety
- Domain and every URL slug stay identical, so ranking equity carries over. The package preserves the Google Search Console verification tag and the GTM container so you don't lose verification or analytics history.
- Before DNS cutover, crawl the current live site (Screaming Frog / `wget --spider`) and confirm every indexed URL still resolves 200 on the new build — the checklist is in `project-data/redirects.json`.
