REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.event_submissions FROM anon, authenticated;
GRANT INSERT ON public.event_submissions TO anon, authenticated;