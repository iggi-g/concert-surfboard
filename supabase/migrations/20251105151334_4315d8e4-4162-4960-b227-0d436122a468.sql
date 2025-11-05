-- Create table for tracking date filter clicks
CREATE TABLE IF NOT EXISTS public.date_filter_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  filtered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.date_filter_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public insert for date filter analytics"
ON public.date_filter_analytics
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public read for date filter analytics"
ON public.date_filter_analytics
FOR SELECT
TO public
USING (true);