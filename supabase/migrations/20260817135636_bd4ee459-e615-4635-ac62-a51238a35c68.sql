DROP INDEX IF EXISTS public.events_key_uidx;

CREATE OR REPLACE FUNCTION public.event_key(_title text, _date text, _venue text, _link text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $function$
  SELECT 't:' || lower(btrim(coalesce(_venue,''))) || '|' || coalesce(_date,'') || '|' ||
    btrim(regexp_replace(
      regexp_replace(
        lower(btrim(coalesce(_title,''))),
        '\s*[-–—:(]*\s*(få billetter|faa billetter|sidste billetter|few tickets|last tickets|udsolgt|sold out|ekstra billetter)\s*[)]*\s*$',
        '', 'g'),
      '\s+', ' ', 'g'));
$function$;

WITH ranked AS (
  SELECT id,
         public.event_key(title, date, venue, link) AS k,
         row_number() OVER (
           PARTITION BY public.event_key(title, date, venue, link)
           ORDER BY first_seen_at ASC, created_or_id
         ) AS rn,
         min(first_seen_at) OVER (PARTITION BY public.event_key(title, date, venue, link)) AS oldest
  FROM (SELECT *, id::text AS created_or_id FROM public.events) e
)
UPDATE public.events ev
SET first_seen_at = r.oldest
FROM ranked r
WHERE ev.id = r.id AND r.rn = 1 AND ev.first_seen_at <> r.oldest;

WITH ranked AS (
  SELECT id,
         row_number() OVER (
           PARTITION BY public.event_key(title, date, venue, link)
           ORDER BY first_seen_at ASC, id
         ) AS rn
  FROM public.events
)
DELETE FROM public.events ev
USING ranked r
WHERE ev.id = r.id AND r.rn > 1;

CREATE UNIQUE INDEX events_key_uidx ON public.events (public.event_key(title, date, venue, link));