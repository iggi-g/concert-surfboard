-- Create table to track concert clicks
CREATE TABLE public.concert_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concert_title text NOT NULL,
  venue text NOT NULL,
  concert_date text NOT NULL,
  clicked_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for efficient queries
CREATE INDEX idx_concert_analytics_clicked_at ON public.concert_analytics(clicked_at DESC);
CREATE INDEX idx_concert_analytics_venue ON public.concert_analytics(venue);

-- Create table to track venue filter usage
CREATE TABLE public.venue_filter_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue text NOT NULL,
  filtered_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for efficient queries
CREATE INDEX idx_venue_filter_analytics_filtered_at ON public.venue_filter_analytics(filtered_at DESC);
CREATE INDEX idx_venue_filter_analytics_venue ON public.venue_filter_analytics(venue);

-- Enable RLS
ALTER TABLE public.concert_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_filter_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public insert for tracking
CREATE POLICY "Allow public insert for concert analytics" 
ON public.concert_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public insert for venue filter analytics" 
ON public.venue_filter_analytics 
FOR INSERT 
WITH CHECK (true);

-- Allow public read for dashboard
CREATE POLICY "Allow public read for concert analytics" 
ON public.concert_analytics 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read for venue filter analytics" 
ON public.venue_filter_analytics 
FOR SELECT 
USING (true);