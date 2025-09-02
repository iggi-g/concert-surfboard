import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

interface ConcertCardProps {
  artist: string;
  date: string;
  venue: string;
  location?: string;
  image: string;
  link: string;
  similarTo?: string;
  venue_link?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (artist: string) => void;
  isInFavoritesView?: boolean;
}

export const ConcertCard = ({
  artist,
  date,
  venue,
  location,
  image,
  link,
  similarTo,
  venue_link,
  isFavorite = false,
  onToggleFavorite,
  isInFavoritesView = false
}: ConcertCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

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

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(artist);
    }
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const eventDate = new Date(date);
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 3);

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: artist,
      details: `Concert at ${venue}. Get tickets: ${link}`,
      dates: `${eventDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}`,
      location: venue
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  };

  const eventSlug = artist.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + format(parseISO(date), 'yyyy-MM-dd');

  return (
    <Link to={`/event/${eventSlug}`} className="block group">
      <Card className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer text-white group-hover:shadow-lg group-hover:shadow-primary/20">
        <div className="relative aspect-video">
          {!loaded && !error && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
          )}
          
          {isIntersecting && (
            <img
              ref={imgRef}
              src={image}
              alt={`${artist} concert poster`}
              className={`w-full h-full object-cover transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              loading="lazy"
            />
          )}
          
          {error && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="text-center text-white/70">
                <div className="w-12 h-12 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="text-sm">Concert Image</p>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{artist}</h3>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-white/90 mb-1">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm truncate">{format(parseISO(date), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm truncate">{venue}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                        onClick={handleCalendarClick}
                        aria-label="Add to calendar"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to calendar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            isFavorite ? 'fill-current text-red-400' : 'text-white'
                          }`} 
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {similarTo && (
                <p className="text-xs text-white/60 mb-1">Similar to {similarTo}</p>
              )}
              {location && (
                <p className="text-sm text-white/80 truncate">{location}</p>
              )}
            </div>
            
            <div className="ml-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(link, '_blank');
                }}
              >
                Get Tickets
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};