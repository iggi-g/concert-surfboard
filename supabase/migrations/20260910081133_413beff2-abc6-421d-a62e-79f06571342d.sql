CREATE OR REPLACE FUNCTION public.events_dedup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  existing_id uuid;
BEGIN
  SELECT e.id INTO existing_id
  FROM public.events e
  WHERE (
      NULLIF(lower(btrim(NEW.link)), '') IS NOT NULL
      AND lower(btrim(e.link)) = lower(btrim(NEW.link))
      AND e.date = NEW.date
    )
    OR public.event_key(e.title, e.date, e.venue, e.link)
       = public.event_key(NEW.title, NEW.date, NEW.venue, NEW.link)
  ORDER BY e.first_seen_at ASC
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
$function$;