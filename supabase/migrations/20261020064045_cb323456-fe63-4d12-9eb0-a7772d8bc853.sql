CREATE TABLE public.event_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 title text NOT NULL,
 date text NOT NULL,
 venue text NOT NULL,
 link text,
 image text,
 venue_link text,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.event_submissions TO anon, authenticated;
GRANT ALL ON public.event_submissions TO service_role;
ALTER TABLE public.event_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit events" ON public.event_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE OR REPLACE FUNCTION public.validate_event_submission() RETURNS trigger
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE field_value text; parsed_date date;
BEGIN
 NEW.title := btrim(NEW.title); NEW.venue := btrim(NEW.venue);
 IF length(NEW.title) NOT BETWEEN 1 AND 200 OR length(NEW.venue) NOT BETWEEN 1 AND 200 THEN
  RAISE EXCEPTION 'Event title and venue must contain 1 to 200 characters' USING ERRCODE = '22023';
 END IF;
 IF NEW.date !~ '^\d{4}-\d{2}-\d{2}$' THEN RAISE EXCEPTION 'Use a valid YYYY-MM-DD date' USING ERRCODE = '22023'; END IF;
 BEGIN parsed_date := NEW.date::date; EXCEPTION WHEN OTHERS THEN RAISE EXCEPTION 'Use a valid event date' USING ERRCODE = '22023'; END;
 NEW.link := nullif(btrim(NEW.link), ''); NEW.image := nullif(btrim(NEW.image), ''); NEW.venue_link := nullif(btrim(NEW.venue_link), '');
 FOREACH field_value IN ARRAY ARRAY[NEW.link, NEW.image, NEW.venue_link] LOOP
  IF field_value IS NOT NULL AND (length(field_value) > 2000 OR field_value !~* '^https?://[a-z0-9]([a-z0-9.-]*[a-z0-9])?(:[0-9]{1,5})?([/?#][^[:space:]]*)?$' OR field_value ~ '[[:cntrl:]]') THEN
   RAISE EXCEPTION 'Links must be valid HTTP or HTTPS URLs of at most 2000 characters' USING ERRCODE = '22023';
  END IF;
 END LOOP;
 NEW.created_at := now(); NEW.updated_at := now();
 RETURN NEW;
END; $$;
CREATE TRIGGER validate_event_submission_before_write BEFORE INSERT OR UPDATE ON public.event_submissions FOR EACH ROW EXECUTE FUNCTION public.validate_event_submission();
REVOKE ALL ON FUNCTION public.validate_event_submission() FROM PUBLIC, anon, authenticated;