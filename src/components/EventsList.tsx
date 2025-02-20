
import { Event } from "@/lib/supabase-client";
import { ConcertCard } from "./ConcertCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { isAfter, startOfDay, parseISO, isSameDay } from "date-fns";
import { EventSkeleton } from "./EventSkeleton";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

interface EventsListProps {
  events: Event[];
  isLoading: boolean;
  showFavoritesOnly?: boolean;
}

export const EventsList = ({ events, isLoading, showFavoritesOnly = false }: EventsListProps) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [page, setPage] = useState(1);
  const eventsPerPage = 12;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const today = startOfDay(new Date());

  // Memoize filtered events
  const filteredEvents = useMemo(() => {
    console.log('Recalculating filtered events. Current favorites:', favorites);
    return events
      .filter(event => {
        const eventDate = parseISO(event.date);
        return isAfter(eventDate, today) || isSameDay(eventDate, today);
      })
      .filter(event => !showFavoritesOnly || favorites.includes(event.title));
  }, [events, showFavoritesOnly, favorites, today]);

  // Memoize visible events
  const visibleEvents = useMemo(() => {
    return filteredEvents.slice(0, page * eventsPerPage);
  }, [filteredEvents, page]);

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
      setPage(prev => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle favorite toggling
  const handleToggleFavorite = useCallback((artist: string) => {
    const isFavorite = favorites.includes(artist);
    console.log('Toggling favorite for:', artist, 'Current state:', isFavorite);
    
    setFavorites(currentFavorites => {
      const newFavorites = isFavorite
        ? currentFavorites.filter(a => a !== artist)
        : [...currentFavorites, artist];
      console.log('New favorites:', newFavorites);
      return newFavorites;
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
      {visibleEvents.map((event: Event, index: number) => (
        <div key={`${event.title}-${event.date}`} className="flex justify-center">
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
