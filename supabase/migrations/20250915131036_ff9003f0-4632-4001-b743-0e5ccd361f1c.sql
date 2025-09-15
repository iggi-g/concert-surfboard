-- Fix Security Definer View issue by replacing the view with a function
-- Views with ORDER BY random() can cause security issues, so we'll use a function instead

-- Drop the problematic view
DROP VIEW IF EXISTS public.random_concert;

-- Create a function to get a random concert instead
CREATE OR REPLACE FUNCTION public.get_random_concert()
RETURNS TABLE(
    title text,
    date text,
    link text,
    image text,
    venue text,
    venue_link text
)
LANGUAGE sql
SECURITY INVOKER
STABLE
SET search_path = public
AS $$
    SELECT 
        e.title,
        e.date,
        e.link,
        e.image,
        e.venue,
        e.venue_link
    FROM public.events e
    ORDER BY random()
    LIMIT 1;
$$;