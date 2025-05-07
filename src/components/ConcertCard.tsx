
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
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '100px',
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
      className="overflow-hidden w-full max-w-[350px] card-hover aspect-[3/4] bg-card/80 dark:bg-card/60 shadow-sm hover:shadow-md rounded-xl cursor-pointer relative border-border/30"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-3/4 w-full">
        {!loaded && (
          <div className="absolute inset-0 skeleton rounded-t-xl" />
        )}
        <img 
          ref={imageRef}
          src={error ? placeholderImage : (isIntersecting ? imageUrl : placeholderImage)}
          alt={`${artist} concert at ${venue} in Copenhagen`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 rounded-t-xl ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-xl" />
        
        {/* Date and venue info */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <span className="glass text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-lg font-medium">
            {date}
          </span>
          {venueLink ? (
            <a 
              href={venueLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="glass text-white text-xs px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors duration-150"
              aria-label={`Visit ${venue} website`}
            >
              {venue}
            </a>
          ) : (
            <span className="glass text-white text-xs px-3 py-1.5 rounded-full">
              {venue}
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute bottom-4 inset-x-4 flex justify-end items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full glass hover:bg-white/30 transition-colors duration-150 h-9 w-9"
                  onClick={handleCalendarClick}
                  aria-label="Add to calendar"
                >
                  <Calendar className={`h-5 w-5 ${isHovered ? 'text-[#FF5C25]' : 'text-white'} transition-colors duration-150`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5}
                className="bg-black/90 text-white border-white/10 z-[100]"
              >
                <p className="text-xs">Add to calendar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full glass hover:bg-white/30 transition-colors duration-150 h-9 w-9"
                  onClick={handleFavoriteClick}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors duration-150 ${
                      isFavorite ? 'fill-[#FF5C25] text-[#FF5C25]' : isHovered ? 'text-[#FF5C25]' : 'text-white'
                    }`} 
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5}
                className="bg-black/90 text-white border-white/10 z-[100]"
              >
                <p className="text-xs">{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Artist name */}
      <div className="p-4 h-1/4 flex items-center">
        <h2 className="text-base font-semibold text-foreground line-clamp-2">{artist}</h2>
      </div>
    </Card>
  );
};
