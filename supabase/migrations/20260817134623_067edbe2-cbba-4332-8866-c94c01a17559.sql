CREATE OR REPLACE FUNCTION public.event_key(_title text, _date text, _venue text, _link text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN _link IS NOT NULL AND btrim(_link) <> '' THEN 'l:' || lower(btrim(_link))
    ELSE 't:' || lower(btrim(coalesce(_venue,''))) || '|' || coalesce(_date,'') || '|' ||
      btrim(regexp_replace(
        regexp_replace(
          lower(btrim(coalesce(_title,''))),
          '\s*[-–—:(]*\s*(få billetter|faa billetter|sidste billetter|few tickets|last tickets|udsolgt|sold out|ekstra billetter)\s*[)]*\s*$',
          '', 'g'),
        '\s+', ' ', 'g'))
  END;
$$;

ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_pkey;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS id uuid NOT NULL DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS first_seen_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS last_seen_at timestamptz NOT NULL DEFAULT now();

DELETE FROM public.events e
USING (
  SELECT id,
         row_number() OVER (PARTITION BY public.event_key(title, date, venue, link) ORDER BY id) AS rn
  FROM public.events
) d
WHERE e.id = d.id AND d.rn > 1;

ALTER TABLE public.events ADD CONSTRAINT events_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX events_key_uidx ON public.events (public.event_key(title, date, venue, link));
CREATE INDEX events_first_seen_at_idx ON public.events (first_seen_at DESC);

UPDATE public.events SET first_seen_at = now() - interval '30 days', last_seen_at = now();

CREATE OR REPLACE FUNCTION public.events_dedup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_id uuid;
BEGIN
  SELECT e.id INTO existing_id
  FROM public.events e
  WHERE public.event_key(e.title, e.date, e.venue, e.link)
      = public.event_key(NEW.title, NEW.date, NEW.venue, NEW.link)
  LIMIT 1;

  IF existing_id IS NOT NULL THEN
    UPDATE public.events
       SET title = COALESCE(NEW.title, title),
           date = COALESCE(NEW.date, date),
           image = COALESCE(NEW.image, image),
           link = COALESCE(NEW.link, link),
           venue = COALESCE(NEW.venue, venue),
           venue_link = COALESCE(NEW.venue_link, venue_link),
           last_seen_at = now()
     WHERE id = existing_id;
    RETURN NULL;
  END IF;

  NEW.first_seen_at := now();
  NEW.last_seen_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS events_dedup_trg ON public.events;
CREATE TRIGGER events_dedup_trg
BEFORE INSERT ON public.events
FOR EACH ROW EXECUTE FUNCTION public.events_dedup();