CREATE OR REPLACE FUNCTION public.publish_event_submission()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  LOCK TABLE public.events IN SHARE ROW EXCLUSIVE MODE;
  IF NOT EXISTS (
    SELECT 1 FROM public.events e
    WHERE (NULLIF(lower(btrim(NEW.link)), '') IS NOT NULL AND lower(btrim(e.link)) = lower(btrim(NEW.link)) AND e.date = NEW.date)
       OR public.event_key(e.title, e.date, e.venue, e.link) = public.event_key(NEW.title, NEW.date, NEW.venue, NEW.link)
  ) THEN
    INSERT INTO public.events (title, date, venue, link, image, venue_link)
    VALUES (NEW.title, NEW.date, NEW.venue, NEW.link, NEW.image, NEW.venue_link);
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.publish_event_submission() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER publish_event_submission_after_insert AFTER INSERT ON public.event_submissions FOR EACH ROW EXECUTE FUNCTION public.publish_event_submission();
DO $$
DECLARE submission public.event_submissions%ROWTYPE;
BEGIN
  LOCK TABLE public.events IN SHARE ROW EXCLUSIVE MODE;
  FOR submission IN SELECT * FROM public.event_submissions ORDER BY created_at, id LOOP
    IF nullif(btrim(submission.link),'') IS NOT NULL AND nullif(btrim(submission.image),'') IS NOT NULL AND NOT EXISTS (
      SELECT 1 FROM public.events e
      WHERE (lower(btrim(e.link)) = lower(btrim(submission.link)) AND e.date = submission.date)
         OR public.event_key(e.title,e.date,e.venue,e.link) = public.event_key(submission.title,submission.date,submission.venue,submission.link)
    ) THEN
      INSERT INTO public.events (title,date,venue,link,image,venue_link)
      VALUES (submission.title,submission.date,submission.venue,submission.link,submission.image,submission.venue_link);
    END IF;
  END LOOP;
END;
$$;