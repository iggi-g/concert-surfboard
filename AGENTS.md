# Architecture
- Vite must deduplicate React and prebundle the React runtime and app providers together to prevent mixed dependency instances during preview updates.
- Visitor event submissions use a separate insert-only review table with concert-compatible fields; public input must not overwrite trusted scraped listings.
- Event submission validation uses a shared client schema and a database validation trigger so direct requests are validated too.