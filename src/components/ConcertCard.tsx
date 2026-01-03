import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";
import { useState, useEffect, useRef, memo, useCallback } from "react";
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

// Concert card component for displaying event information - memoized for performance
export const ConcertCard = memo(({
  artist,
  date,
  venue,
  imageUrl,
  ticketUrl,
  venueLink,
  isFavorite = false,
  onToggleFavorite,
  isInFavoritesView = false,
  onVenueClick,
  onDateClick
}: ConcertCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lazy load image when card enters viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          const img = new window.Image();
          img.src = imageUrl;
          img.onload = () => {
            setLoaded(true);
            setError(false);
          };
          img.onerror = () => {
            setError(true);
            setLoaded(true);
          };
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );
    
    observer.observe(container);
    return () => observer.disconnect();
  }, [imageUrl, loaded]);

  const handleClick = useCallback(async () => {
    // Track concert card click
    try {
      await supabase.from('concert_analytics').insert({
        concert_title: artist,
        concert_date: date,
        venue: venue
      });
    } catch (error) {
      console.error('Error tracking concert click:', error);
    }
    
    // Open ticket URL directly
    window.open(ticketUrl, '_blank');
  }, [artist, date, venue, ticketUrl]);

  const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Track favorite button click
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
    
    if (onToggleFavorite) {
      onToggleFavorite(artist);
    }
  }, [artist, date, venue, isFavorite, onToggleFavorite]);

  const handleCalendarClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const eventDate = new Date(date);
    // Format date as YYYYMMDD for all-day event
    const dateString = eventDate.toISOString().slice(0, 10).replace(/-/g, '');
    // For all-day events, we need to add one day to the end date
    const nextDay = new Date(eventDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const endDateString = nextDay.toISOString().slice(0, 10).replace(/-/g, '');
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: artist,
      details: `Concert at ${venue}. Get tickets: ${ticketUrl}`,
      dates: `${dateString}/${endDateString}`,
      // All-day event: start date to next day
      location: venue
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  }, [artist, date, venue, ticketUrl]);

  const handleVenueClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Track venue filter click
    try {
      await supabase.from('venue_filter_analytics').insert({
        venue: venue
      });
    } catch (error) {
      console.error('Error tracking venue filter click:', error);
    }
    
    if (onVenueClick) {
      onVenueClick(venue);
    }
  }, [venue, onVenueClick]);

  const handleDateClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Track date filter click
    try {
      await supabase.from('date_filter_analytics').insert({
        date: date
      });
    } catch (error) {
      console.error('Error tracking date filter click:', error);
    }
    
    if (onDateClick) {
      onDateClick(date);
    }
  }, [date, onDateClick]);

  const placeholderImage = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=400&q=75";
  const displayImage = error ? placeholderImage : (loaded ? imageUrl : placeholderImage);

  return (
    <Card 
      ref={containerRef}
      className="overflow-visible w-full max-w-[350px] md:max-w-[350px] transition-transform duration-200 hover:scale-[1.01] cursor-pointer bg-ui-surface backdrop-blur-sm border-ui-border relative shadow-card" 
      onClick={handleClick}
    >
      <div className="relative aspect-[16/9] w-full bg-muted">
        <img 
          src={displayImage} 
          alt={`${artist} concert at ${venue} in Copenhagen`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`} 
          loading="lazy" 
          decoding="async" 
          width="400" 
          height="225" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute top-3 inset-x-0 flex justify-between items-start px-5">
          <button
            onClick={handleDateClick}
            className="text-text-secondary text-xs font-medium bg-ui-surface/80 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-ui-border shadow-card hover:bg-ui-surface hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
            aria-label={`Filter by date ${date}`}
          >
            {date}
          </button>
          <button
            onClick={handleVenueClick}
            className="text-text-secondary text-xs font-medium bg-ui-surface/80 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-ui-border shadow-card hover:bg-ui-surface hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
            aria-label={`Filter by venue ${venue}`}
          >
            {venue}
          </button>
        </div>
        <div className="absolute bottom-3 inset-x-0 flex justify-between items-center px-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl bg-ui-surface/80 hover:bg-ui-surface group backdrop-blur-sm h-10 w-10 border border-ui-border shadow-card hover:border-primary/50" onClick={handleCalendarClick} aria-label="Add to calendar">
                  <Calendar className="h-4 w-4 text-text-primary group-hover:text-primary transition-colors" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={5} className="bg-ui-surface text-text-primary border-ui-border z-[100] whitespace-nowrap px-3 py-1.5 text-xs font-medium shadow-card" align="start">
                <p>Add to calendar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl bg-ui-surface/80 hover:bg-ui-surface group backdrop-blur-sm h-10 w-10 border border-ui-border shadow-card hover:border-primary/50" onClick={handleFavoriteClick} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                  <Heart className={`h-4 w-4 transition-colors group-hover:text-primary ${isFavorite ? 'fill-current text-primary' : isInFavoritesView ? 'text-primary' : 'text-text-primary'}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={5} className="bg-ui-surface text-text-primary border-ui-border z-[100] whitespace-nowrap px-3 py-1.5 text-xs font-medium shadow-card" align="end">
                <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-lg md:text-lg font-bold text-text-primary uppercase tracking-wide leading-tight">{artist}</h2>
      </div>
    </Card>
  );
});

ConcertCard.displayName = 'ConcertCard';