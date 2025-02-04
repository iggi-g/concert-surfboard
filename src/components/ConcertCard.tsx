import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
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
}

export const ConcertCard = ({
  artist,
  date,
  venue,
  imageUrl,
  ticketUrl,
  venueLink,
  isFavorite = false,
  onToggleFavorite
}: ConcertCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
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
  }, [imageUrl]);

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

  return (
    <Card 
      className="overflow-hidden w-full max-w-[350px] md:max-w-[350px] transition-transform hover:scale-105 animate-fade-in cursor-pointer bg-black/20 backdrop-blur-sm border-white/10 relative"
      onClick={handleClick}
    >
      <div className="relative aspect-[16/9] w-full">
        {!loaded && (
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
        )}
        <img 
          src={error ? "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3" : imageUrl}
          alt={`${artist} concert at ${venue} in Copenhagen`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 inset-x-0 flex justify-between items-start px-4">
          <span className="text-white text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            {date}
          </span>
          {venueLink ? (
            <a 
              href={venueLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-white text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm hover:bg-black/60"
              aria-label={`Visit ${venue} website`}
            >
              {venue}
            </a>
          ) : (
            <span className="text-white text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
              {venue}
            </span>
          )}
        </div>
        <div className="absolute bottom-2 inset-x-0 flex justify-between items-center px-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/40 hover:bg-black/60 group"
                  onClick={handleCalendarClick}
                  aria-label="Add to calendar"
                >
                  <Calendar className="h-5 w-5 text-white group-hover:text-orange-500 transition-colors" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                className="bg-black/90 text-white border-white/10 z-[100]"
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
                  className="rounded-full bg-black/40 hover:bg-black/60 group"
                  onClick={handleFavoriteClick}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors group-hover:text-orange-500 ${
                      isFavorite ? 'fill-current text-orange-500' : 'text-white'
                    }`} 
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                className="bg-black/90 text-white border-white/10 z-[100]"
              >
                <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-xl font-bold text-white">{artist}</h2>
      </div>
    </Card>
  );
};