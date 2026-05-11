## Design Refresh: Midnight Neon + Tall Posters

A focused visual overhaul. No business-logic changes — same data, same filters, same routes. Just a new look and a quieter card.

### 1. New color palette — "Deep midnight + neon"

Replace the current charcoal/orange system with a deep blue-purple base and a single electric accent.

- Background: deep midnight navy (`#0A0B14`)
- Surface (cards/inputs): elevated indigo (`#13152099`)
- Border: subtle violet-tinted line (`#1F2238`)
- Text primary: near-white (`#F2F3F8`)
- Text secondary: cool muted (`#8A8FB0`)
- Accent (single): electric cyan (`#00E5FF`) — used sparingly for active filters, hover, focus ring, and "X concerts available" count
- Remove the warm orange entirely

All values defined in `src/index.css` as HSL tokens; `tailwind.config.ts` already maps them. Components keep using semantic tokens (`bg-background`, `text-primary`, etc.) so most files don't need touching.

### 2. Cards — tall portrait posters

Rework `ConcertCard` to a gallery-style 3:4 portrait:

- Aspect ratio `3/4` (was 16/9), image fills the frame
- Wider max-width (~280px mobile, ~320px desktop) so cards feel bigger
- Remove the dark gradient overlay on top of the image
- Below the image: large artist name (one line, truncate), small date · venue line beneath
- Date and venue stay clickable for filtering, but as plain underlined text — no chip pills on top of the image
- Heart and calendar buttons stay, moved to a small row under the meta line, ghost style (icon only, no surface)
- Grid: 2 cols mobile, 3 tablet, 4 desktop, 5 on 2xl (was 1/2/3/4/5) — bigger feel because each card is taller

### 3. Sticky minimal pill filter bar

Replace the current two-row filter block with a single sticky pill bar at the top:

- Search input (icon only when collapsed, expands on focus)
- Date pill (opens calendar popover)
- Venue pill (opens existing checkbox sheet)
- Sort pill
- Favorites toggle (heart pill)
- "Clear" only appears when filters are active
- Advanced/extra controls move into a "More" sheet on mobile
- Bar is rounded-full, floats with subtle border, sticks to top on scroll, hides on scroll-down past 150px (existing behavior preserved)

Desktop and mobile use the same pill bar — no separate `DesktopFilters` vs `MobileFilters` markup divergence for the primary controls. Existing filter components are reused inside; only the chrome changes.

### 4. Hero — quieter

- Smaller H1 (keep dynamic text logic intact)
- Remove the bottom gradient fade
- Tighter vertical spacing so the first row of cards is visible above the fold

### 5. Out of scope

- No changes to data fetching, analytics tracking, calendar export, favorites logic, SEO/schema components, routes, or edge functions
- No changes to `EventPage`, `Favorites`, `About`
- Memory rules around 8px grid, 44px control height, scroll-hide nav, and card click behavior are preserved

### Files to touch

- `src/index.css` — new color tokens
- `tailwind.config.ts` — only if a new shadow/radius is needed
- `src/components/ConcertCard.tsx` — full visual rework
- `src/components/EventsList.tsx` — grid columns + intrinsic size
- `src/components/filters/DesktopFilters.tsx` + `MobileFilters.tsx` — collapse into shared pill bar (or new `StickyPillBar.tsx` that both render)
- `src/pages/Index.tsx` — hero spacing, swap filter bar
- `src/pages/Favorites.tsx` — pick up new tokens (no structural change)
- `mem://design/unified-design-system` — update palette + card notes after build

### Validation

After implementation: visual check at mobile (375), tablet (768), desktop (1280); confirm filter clicks still update results; confirm calendar/heart still work; confirm no orange remains.
