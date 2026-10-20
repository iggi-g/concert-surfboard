# Architecture
- Latest-update freshness is shared by filters and badges and uses the latest Copenhagen calendar day across the full dataset; timestamps do not identify explicit scraper batch boundaries.
- Fetch upcoming concerts in stable date/id-ordered pages of at most 1,000 rows; larger requested ranges still hit PostgREST's per-response cap.
- Vite must deduplicate React and prebundle the React runtime and app providers together to prevent mixed dependency instances during preview updates.
- Visitor event submissions use a separate insert-only review table with concert-compatible fields; public input must not overwrite trusted scraped listings.
- Event submission validation uses a shared client schema and a database validation trigger so direct requests are validated too.