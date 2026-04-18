
## Goal
Make CPH Concerts the #1 result for "concerts in Copenhagen" by upgrading on-page SEO, structured data, content, crawlability, and performance signals.

## Current state
- Good foundation: react-helmet-async SEO component, JSON-LD MusicEvent + ItemList + Organization schemas, dynamic sitemap edge function, individual `/event/:slug` pages.
- Gaps: thin H1/copy on homepage, no prerendering (React SPA = empty HTML for crawlers), missing keyword-rich content, no FAQ/Breadcrumb schema, no per-venue landing pages, weak internal linking, OG image is SVG (Facebook/Twitter prefer PNG/JPG ≥1200×630), `og:locale` `en_DK` is invalid, generic title format, no hreflang, sitemap.xml in /public is stale and conflicts with edge function, robots.txt points to edge function (good) but no host/preferred-domain signals.

## Plan

### 1. Fix critical meta + crawlability issues
- `index.html`: fix `og:locale` to `en_GB` (or `da_DK`), add `theme-color`, `apple-touch-icon`, `manifest`, expanded keywords, geo coordinates, and a richer default JSON-LD (`Organization` + `WebSite` with `SearchAction` sitelinks searchbox).
- Replace `public/og-image.svg` reference with a 1200×630 PNG (`/og-image.png`) — generate it.
- Update `public/robots.txt` to also reference `https://cphconcerts.com/sitemap.xml` and add `Host:` directive.
- Delete stale `public/sitemap.xml` OR replace it with a redirect note; rely on edge function. Add a Vite redirect/rewrite via a simple static `sitemap.xml` that lists static pages as fallback.

### 2. Upgrade SEO component
- `src/components/SEO.tsx`: add support for `keywords`, `articlePublishedTime`, multiple `og:image` sizes, `og:image:width/height`, Twitter `@site`/`@creator`, `application-name`, `format-detection`. Default OG image → PNG.

### 3. Homepage content + structured data (Index.tsx)
- Add an SEO-only content section (visible but compact) below events with: keyword-rich H2s ("Live Concerts in Copenhagen", "Top Music Venues in Copenhagen — Vega, Pumpehuset, DR Koncerthuset…"), FAQ block (8–10 Q&As), and a city overview paragraph. This gives Google indexable text.
- Add `FAQPage` JSON-LD schema (new component `FAQSchema.tsx`).
- Add `BreadcrumbList` schema on subpages.
- Improve dynamic H1 to always include the phrase "Concerts in Copenhagen" when no filter is active.

### 4. Per-venue landing pages (huge SEO win)
- New route `/venues/:venueSlug` rendering all upcoming events at that venue with venue-specific H1, description, MusicVenue schema, breadcrumbs.
- New route `/venues` as an index page listing all venues with internal links.
- Link venues from concert cards and event pages.

### 5. Event page enhancements
- Add `BreadcrumbList` schema (Home → Venue → Event).
- Add internal links to `/venues/:venueSlug`.
- Improve meta description with price/availability cues when present.
- Add `eventStatus`, `previousStartDate` if rescheduled (future-proof), and `Performer` MusicGroup with `sameAs` when Spotify link exists.

### 6. Sitemap improvements (edge function)
- Include venue pages, About, Favorites.
- Add `<image:image>` namespace with event images for Google Image indexing.
- Add proper `lastmod` per event (use `updated_at` if available).
- Set `Cache-Control` to 1h (already done).

### 7. Performance/Core Web Vitals signals
- Preload hero font subset, add `fetchpriority="high"` to hero/LCP image area, lazy-load video background on mobile (already partially done).
- Add `<link rel="dns-prefetch">` for Supabase + image CDN.

### 8. Prerendering note (technical)
React SPAs render empty HTML initially — Google handles JS but social crawlers (Facebook, LinkedIn, Twitter, Slack) don't. Best fix is server-side prerendering. Two viable options inside Lovable:
- **Edge function prerender** for `/event/:slug` and `/venues/:slug` that returns fully-rendered HTML with meta tags when `User-Agent` is a known bot. Implementable as a Supabase edge function + Cloudflare/Vercel-like routing — but Lovable hosts statically so this requires the user to either (a) add a reverse proxy on their custom domain, or (b) accept JS-rendered SEO (Google still indexes).
- **Recommended pragmatic path**: ensure all critical meta tags also exist statically in `index.html` defaults so social previews work for the homepage; rely on Google's JS rendering for event pages.

### 9. Files to create/edit
- Edit: `index.html`, `public/robots.txt`, `public/sitemap.xml`, `src/components/SEO.tsx`, `src/components/EventsSchema.tsx`, `src/pages/Index.tsx`, `src/pages/EventPage.tsx`, `src/App.tsx` (new routes), `supabase/functions/generate-sitemap/index.ts`.
- Create: `src/components/FAQSchema.tsx`, `src/components/BreadcrumbSchema.tsx`, `src/components/SEOContent.tsx` (homepage keyword content + FAQ), `src/pages/VenuePage.tsx`, `src/pages/VenuesIndex.tsx`, `public/og-image.png` (1200×630).

### Out of scope (call out for user)
- Backlink building, Google Search Console submission, Google Business Profile — these are off-platform and the user must do them.
- True SSR/prerendering would require infrastructure changes outside Lovable's static hosting.

<lov-actions>
<lov-suggestion message="Approved — implement the full SEO optimization plan.">Approve full plan</lov-suggestion>
<lov-suggestion message="Just do the high-impact items: fix index.html meta, add FAQ schema + SEO content section on homepage, improve sitemap, and add per-venue landing pages.">Do high-impact only</lov-suggestion>
<lov-suggestion message="Skip per-venue pages for now and focus only on homepage SEO content, FAQ schema, fixed meta tags, and a proper 1200x630 OG image.">Homepage SEO only</lov-suggestion>
<lov-suggestion message="Add a prerendering edge function so social media crawlers (Facebook, LinkedIn, Twitter) get fully rendered HTML for event pages.">Add prerendering</lov-suggestion>
</lov-actions>

