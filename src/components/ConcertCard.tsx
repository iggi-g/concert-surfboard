import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";
import { useState, memo, useCallback } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";

interface ConcertCardProps {
  artist: string;
  date: string;
  venue: string;
  location: string;
  imageUrl: string;
  ticketUrl: string;
  similarTo?: string;
  venueLink?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (artist: string) => void;
  isInFavoritesView?: boolean;
  onVenueClick?: (venue: string) => void;
  onDateClick?: (date: string) => void;
}

export const ConcertCard = memo(({
  artist,
  date,
  venue,
  imageUrl,
  ticketUrl,
  isFavorite = false,
  onToggleFavorite,
  isInFavoritesView = false,
  onVenueClick,
  onDateClick
}: ConcertCardProps) => {
  const [error, setError] = useState(false);

  const handleImageError = useCallback(() => {
    setError(true);
  }, []);

  const handleClick = useCallback(async () => {
    try {
      await supabase.from('concert_analytics').insert({
        concert_title: artist,
        concert_date: date,
        venue: venue
      });
    } catch (error) {
      console.error('Error tracking concert click:', error);
    }
    window.open(ticketUrl, '_blank');
  }, [artist, date, venue, ticketUrl]);

  const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await supabase.from('favorite_analytics').insert({
        concert_title: artist,
        concert_date: date,
        venue: venue,
        action: isFavorite ? 'remove' : 'add'
      });
    } catch (error) {
      console.error('Error tracking favorite click:', error);
    }
    onToggleFavorite?.(artist);
  }, [artist, date, venue, isFavorite, onToggleFavorite]);

  const handleCalendarClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const eventDate = new Date(date);
    const dateString = eventDate.toISOString().slice(0, 10).replace(/-/g, '');
    const nextDay = new Date(eventDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const endDateString = nextDay.toISOString().slice(0, 10).replace(/-/g, '');
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: artist,
      details: `Concert at ${venue}. Get tickets: ${ticketUrl}`,
      dates: `${dateString}/${endDateString}`,
      location: venue
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  }, [artist, date, venue, ticketUrl]);

  const handleVenueClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await supabase.from('venue_filter_analytics').insert({ venue });
    } catch (error) {
      console.error('Error tracking venue filter click:', error);
    }
    onVenueClick?.(venue);
  }, [venue, onVenueClick]);

  const handleDateClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await supabase.from('date_filter_analytics').insert({ date });
    } catch (error) {
      console.error('Error tracking date filter click:', error);
    }
    onDateClick?.(date);
  }, [date, onDateClick]);

  const placeholderImage = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=75";
  const displayImage = error || !imageUrl ? placeholderImage : imageUrl;

  // Format date as e.g. "Fri, May 15"
  let formattedDate = date;
  try {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  } catch {}

  return (
    <article
      className="group w-full max-w-[320px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border transition-all duration-300 group-hover:ring-primary/60 group-hover:shadow-[0_0_32px_-8px_hsl(var(--primary)/0.6)]">
        <img
          src={displayImage}
          alt={`${artist} concert at ${venue} in Copenhagen`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          width="600"
          height="800"
          onError={handleImageError}
        />
      </div>

      <div className="pt-3 px-0.5 space-y-1.5">
        <h2 className="text-base md:text-lg font-bold text-text-primary uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {artist}
        </h2>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <button
            onClick={handleDateClick}
            className="hover:text-primary transition-colors font-medium"
            aria-label={`Filter by date ${formattedDate}`}
          >
            {formattedDate}
          </button>
          <span className="text-border">·</span>
          <button
            onClick={handleVenueClick}
            className="hover:text-primary transition-colors font-medium truncate"
            aria-label={`Filter by venue ${venue}`}
          >
            {venue}
          </button>
        </div>

        <div className="flex items-center gap-1 pt-1 -ml-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-text-secondary hover:text-primary hover:bg-primary/10"
                  onClick={handleCalendarClick}
                  aria-label="Add to calendar"
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">Add to calendar</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-text-secondary hover:text-primary hover:bg-primary/10"
                  onClick={handleFavoriteClick}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`h-4 w-4 transition-colors ${isFavorite || isInFavoritesView ? 'fill-current text-primary' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </article>
  );
});

ConcertCard.displayName = 'ConcertCard';
