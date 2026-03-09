import { Event } from "@/lib/supabase-client";
import { ConcertCard } from "./ConcertCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { EventSkeleton } from "./EventSkeleton";
import { useMemo, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

interface EventsListProps {
  events: Event[];
  isLoading: boolean;
  showFavoritesOnly?: boolean;
  onVenueClick?: (venue: string) => void;
  onDateClick?: (date: string) => void;
}

export const EventsList = ({ events, isLoading, showFavoritesOnly = false, onVenueClick, onDateClick }: EventsListProps) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const { toast } = useToast();

  const filteredEvents = useMemo(() => {
    return events.filter(event => !showFavoritesOnly || favorites.includes(event.title));
  }, [events, showFavoritesOnly, favorites]);

  const handleToggleFavorite = useCallback((artist: string) => {
    const isFavorite = favorites.includes(artist);
    setFavorites(currentFavorites => {
      return isFavorite
        ? currentFavorites.filter(a => a !== artist)
        : [...currentFavorites, artist];
    });
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${artist} has been ${isFavorite ? "removed from" : "added to"} your favorites`,
    });
  }, [favorites, setFavorites, toast]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 w-full max-w-[1920px] mx-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex justify-center">
            <EventSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 w-full max-w-[1920px] mx-auto">
      {filteredEvents.map((event: Event) => (
        <div key={`${event.title}-${event.date}`} className="flex justify-center" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 280px' }}>
          <ConcertCard
            artist={event.title}
            date={event.date}
            venue={event.venue}
            location={event.location || ""}
            imageUrl={event.image}
            ticketUrl={event.link}
            venueLink={getVenueLink(event.venue)}
            isFavorite={favorites.includes(event.title)}
            onToggleFavorite={handleToggleFavorite}
            isInFavoritesView={showFavoritesOnly}
            onVenueClick={onVenueClick}
            onDateClick={onDateClick}
          />
        </div>
      ))}
    </div>
  );
};
const getVenueLink = (venue: string): string => {
  const venueLinks: { [key: string]: string } = {
    'VEGA': 'https://vega.dk/',
    'Store VEGA': 'https://vega.dk/',
    'STORE VEGA': 'https://vega.dk/',
    'Lille VEGA': 'https://vega.dk/',
    'LILLE VEGA': 'https://vega.dk/',
    'Ideal Bar': 'https://vega.dk/',
    'IDEAL BAR': 'https://vega.dk/',
    'DR Koncerthuset': 'https://www.drkoncerthuset.dk/en',
    'Royal Arena': 'https://www.royalarena.dk/',
    'Rust': 'https://rust.dk/',
    'Pumpehuset': 'https://pumpehuset.dk/en',
    'Den Grå Hal': 'https://www.christiania.org/den-graa-hal',
    'Amager Bio': 'https://amagerbio.dk/en',
    'Hotel Cecil': 'https://www.hotelcecil.dk/',
    'Loppen': 'https://loppen.dk/en',
    'Bremen Teater': 'https://www.brementeater.dk/'
  };
  return venueLinks[venue] || '';
};
