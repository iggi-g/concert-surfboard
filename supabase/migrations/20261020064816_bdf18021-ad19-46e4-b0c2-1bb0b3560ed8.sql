CREATE OR REPLACE FUNCTION public.require_event_submission_links() RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
 IF nullif(btrim(NEW.link), '') IS NULL THEN
  RAISE EXCEPTION 'A ticket or event link is required' USING ERRCODE = '22023';
 END IF;
 IF nullif(btrim(NEW.image), '') IS NULL THEN
  RAISE EXCEPTION 'A poster image link is required' USING ERRCODE = '22023';
 END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER require_event_submission_links_before_write BEFORE INSERT OR UPDATE ON public.event_submissions FOR EACH ROW EXECUTE FUNCTION public.require_event_submission_links();
REVOKE ALL ON FUNCTION public.require_event_submission_links() FROM PUBLIC, anon, authenticated;