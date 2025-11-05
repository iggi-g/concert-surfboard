-- Create table for tracking favorite button clicks
CREATE TABLE IF NOT EXISTS public.favorite_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concert_title TEXT NOT NULL,
  concert_date TEXT NOT NULL,
  venue TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('add', 'remove')),
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.favorite_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public insert for favorite analytics"
ON public.favorite_analytics
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public read for favorite analytics"
ON public.favorite_analytics
FOR SELECT
TO public
USING (true);