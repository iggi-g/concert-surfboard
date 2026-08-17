# Recently Added tab

Add a "Recently added" filter tab that shows concerts that appeared in the database within the last 7 days — while making the scraper's re-inserts stop creating duplicates and stop resetting a concert's "added" date when its title changes (e.g. a `– FÅ BILLETTER` suffix appears).

## The problem today

The `events` table has no identity and no timestamps — only title, date, link, image, venue, venue_link. The scraper plain-inserts every row on every run, so:

- The same concert is re-inserted whenever anything in its title changes (ticket-status suffixes like `– FÅ BILLETTER`), creating what looks like a "new" concert.
- Unchanged concerts are re-inserted as exact duplicates or silently pile up.
- There is no way to know when a concert first showed up, so "recently added" is impossible to compute.

Current data: 1082 rows, 1073 distinct links (9 rows have no link). The event URL is effectively a unique identity and is stable when the title changes — so it is the right dedup key.

## Approach

Identity = `link` when present, otherwise `venue + date + normalized title`. A database trigger absorbs the scraper's plain INSERTs: if the concert already exists, it refreshes the existing row's fields and drops the insert; otherwise it inserts a fresh row with `first_seen_at = now()`. No scraper changes needed.

All existing rows get backfilled with a `first_seen_at` in the past, so the tab starts empty and fills up naturally over the next scrape runs.

## Database changes (one migration)

1. Add to `public.events`:
   - `id uuid primary key default gen_random_uuid()`
   - `first_seen_at timestamptz not null default now()`
   - `last_seen_at timestamptz not null default now()`
2. Add a normalization helper `public.event_key(title, date, venue, link)` — immutable, returns `lower(link)` when link is present, else `lower(venue)|date|` plus the title stripped of ticket-status noise (`få billetter`, `few tickets`, `udsolgt`, `sold out`, `sidste billetter`, trailing dashes/parens) and collapsed whitespace.
3. Unique index on `event_key(...)`.
4. `BEFORE INSERT` trigger `events_dedup`:
   - Look up an existing row with the same key.
   - If found: update its `title`, `image`, `venue_link`, `link`, `date`, and `last_seen_at = now()`; leave `first_seen_at` untouched; `RETURN NULL` (insert skipped).
   - If not found: set `first_seen_at`/`last_seen_at` to `now()` and insert.
5. Collapse existing duplicates (keep one row per key, earliest) and backfill `first_seen_at = now() - interval '30 days'` for all current rows.
6. Index on `first_seen_at` for the new query.

RLS on `events` stays as-is (public read only).

## Frontend changes

- `src/lib/supabase-client.ts`: select `first_seen_at` in `fetchEvents` and add it to the `Event` type.
- `src/pages/Index.tsx`: add a `recentlyAdded` filter state; when active, keep only events with `first_seen_at >= now() - 7 days` and sort by `first_seen_at` descending (newest first). Include it in `hasActiveFilters` / `clearFilters`.
- `src/components/filters/TimeFilterTabs.tsx`: add a "Recently added" tab alongside the existing time tabs; selecting it clears the date range, and picking a date tab clears it.
- `src/components/ConcertCard.tsx`: small "NEW" chip on cards whose `first_seen_at` is within 7 days (shown in all views, not just the tab).
- Empty state copy for the tab: "No new concerts added in the last 7 days."

## Notes

- Because the backfill dates existing rows 30 days back, the tab will show nothing until the next scrape adds genuinely new concerts — that is intended, not a bug.
- Concerts whose title only gained a ticket-status suffix will update in place and will not reappear as new.
