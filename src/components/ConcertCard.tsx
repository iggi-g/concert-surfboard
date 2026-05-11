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

  const handleImageError = useCallback(() => setError(true), []);

  const handleClick = useCallback(async () => {
    try {
      await supabase.from('concert_analytics').insert({
        concert_title: artist, concert_date: date, venue,
      });
    } catch (e) { console.error('Error tracking concert click:', e); }
    window.open(ticketUrl, '_blank');
  }, [artist, date, venue, ticketUrl]);

  const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await supabase.from('favorite_analytics').insert({
        concert_title: artist, concert_date: date, venue,
        action: isFavorite ? 'remove' : 'add',
      });
    } catch (err) { console.error('Error tracking favorite click:', err); }
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
      location: venue,
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  }, [artist, date, venue, ticketUrl]);

  const handleVenueClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try { await supabase.from('venue_filter_analytics').insert({ venue }); }
    catch (err) { console.error(err); }
    onVenueClick?.(venue);
  }, [venue, onVenueClick]);

  const handleDateClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try { await supabase.from('date_filter_analytics').insert({ date }); }
    catch (err) { console.error(err); }
    onDateClick?.(date);
  }, [date, onDateClick]);

  const placeholderImage = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=75";
  const displayImage = error || !imageUrl ? placeholderImage : imageUrl;

  let formattedDate = date;
  try {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  } catch {}

  return (
    <article
      className="group w-full max-w-[420px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-muted ring-1 ring-border transition-all duration-300 group-hover:ring-primary/60 group-hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.55)]">
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

        {/* Subtle gradient for chip legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

        {/* Top: date + venue chips */}
        <div className="absolute top-3 inset-x-0 flex justify-between items-start gap-2 px-3">
          <button
            onClick={handleDateClick}
            className="text-text-primary text-xs font-semibold bg-card/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            aria-label={`Filter by date ${formattedDate}`}
          >
            {formattedDate}
          </button>
          <button
            onClick={handleVenueClick}
            className="text-text-primary text-xs font-semibold bg-card/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all truncate max-w-[60%]"
            aria-label={`Filter by venue ${venue}`}
          >
            {venue}
          </button>
        </div>

        {/* Bottom: artist + actions */}
        <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pt-10">
          <h2 className="text-lg md:text-xl font-bold text-text-primary uppercase tracking-tight leading-tight line-clamp-2 mb-3 drop-shadow-md">
            {artist}
          </h2>
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-card/70 backdrop-blur-md border border-border/60 text-text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary"
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
                    className="h-10 w-10 rounded-full bg-card/70 backdrop-blur-md border border-border/60 text-text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`h-4 w-4 transition-colors ${isFavorite || isInFavoritesView ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </article>
  );
});

ConcertCard.displayName = 'ConcertCard';
