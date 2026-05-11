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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1600px] mx-auto px-0 sm:px-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex justify-center">
            <EventSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="snap-y snap-mandatory h-[100dvh] overflow-y-auto sm:h-auto sm:overflow-visible sm:snap-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 sm:gap-6 md:gap-8 w-full max-w-[1600px] mx-auto px-0 sm:px-6">
      {filteredEvents.map((event: Event) => (
        <div
          key={`${event.title}-${event.date}`}
          className="snap-start snap-always h-[100dvh] sm:h-auto flex justify-center items-stretch sm:items-center"
          style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}
        >
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
