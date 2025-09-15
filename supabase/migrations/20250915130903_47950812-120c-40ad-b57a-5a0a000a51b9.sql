-- Fix security issues: Enable RLS on events table and recreate random_concert view safely

-- First, enable Row Level Security on the events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access to events (since this appears to be a public events listing)
CREATE POLICY "Allow public read access to events" 
ON public.events 
FOR SELECT 
USING (true);

-- Drop and recreate the random_concert view without security definer issues
-- by using a regular view that respects the caller's permissions
DROP VIEW IF EXISTS public.random_concert;

CREATE VIEW public.random_concert AS 
SELECT 
    title,
    date,
    link,
    image,
    venue,
    venue_link
FROM public.events
ORDER BY random()
LIMIT 1;

-- Fix the search_path issue in the existing function
CREATE OR REPLACE FUNCTION public.delete_rows_before_today()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    DELETE FROM "events"
    WHERE date::DATE < CURRENT_DATE;
END;
$function$;