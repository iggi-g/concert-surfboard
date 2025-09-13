
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
}

export const ConcertCard = ({
  artist,
  date,
  venue,
  imageUrl,
  ticketUrl,
  venueLink,
  isFavorite = false,
  onToggleFavorite,
  isInFavoritesView = false
}: ConcertCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isIntersecting || loaded) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setLoaded(true);
      setError(false);
    };
    img.onerror = () => {
      setError(true);
      setLoaded(true);
    };
  }, [imageUrl, isIntersecting, loaded]);

  const handleClick = () => {
    window.open(ticketUrl, '_blank');
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(artist);
    }
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const eventDate = new Date(date);
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 3);

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: artist,
      details: `Concert at ${venue}. Get tickets: ${ticketUrl}`,
      dates: `${eventDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}`,
      location: venue
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  };

  const placeholderImage = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=400&q=75";

  return (
    <Card 
      className="overflow-visible w-full max-w-[350px] md:max-w-[350px] transition-all duration-300 hover:scale-[1.01] hover:shadow-elevated animate-fade-in cursor-pointer bg-ui-surface backdrop-blur-sm border-ui-border relative shadow-card"
      onClick={handleClick}
    >
      <div className="relative aspect-[16/9] w-full">
        {!loaded && (
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
        )}
        <img 
          ref={imageRef}
          src={error ? placeholderImage : (isIntersecting ? imageUrl : placeholderImage)}
          alt={`${artist} concert at ${venue} in Copenhagen`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          width="400"
          height="225"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute top-3 inset-x-0 flex justify-between items-start px-5">
          <span className="text-text-secondary text-xs font-medium bg-ui-surface/80 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-ui-border shadow-card">
            {date}
          </span>
          {venueLink ? (
            <a 
              href={venueLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-text-secondary text-xs font-medium bg-ui-surface/80 px-3 py-1.5 rounded-xl backdrop-blur-sm hover:bg-ui-surface border border-ui-border shadow-card transition-colors"
              aria-label={`Visit ${venue} website`}
            >
              {venue}
            </a>
          ) : (
            <span className="text-text-secondary text-xs font-medium bg-ui-surface/80 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-ui-border shadow-card">
              {venue}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 inset-x-0 flex justify-between items-center px-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl bg-ui-surface/80 hover:bg-ui-surface group backdrop-blur-sm h-10 w-10 border border-ui-border shadow-card hover:border-primary/50"
                  onClick={handleCalendarClick}
                  aria-label="Add to calendar"
                >
                  <Calendar className="h-4 w-4 text-text-primary group-hover:text-primary transition-colors" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5}
                className="bg-ui-surface text-text-primary border-ui-border z-[100] whitespace-nowrap px-3 py-1.5 text-xs font-medium shadow-card"
                align="start"
              >
                <p>Add to calendar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl bg-ui-surface/80 hover:bg-ui-surface group backdrop-blur-sm h-10 w-10 border border-ui-border shadow-card hover:border-primary/50"
                  onClick={handleFavoriteClick}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors group-hover:text-primary ${
                      isFavorite ? 'fill-current text-primary' : isInFavoritesView ? 'text-primary' : 'text-text-primary'
                    }`} 
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5}
                className="bg-ui-surface text-text-primary border-ui-border z-[100] whitespace-nowrap px-3 py-1.5 text-xs font-medium shadow-card"
                align="end"
              >
                <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-lg md:text-xl font-bold text-text-primary uppercase tracking-wide leading-tight">{artist}</h2>
      </div>
    </Card>
  );
};
