import { Event } from "@/lib/supabase-client";
import { ConcertCard } from "./ConcertCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { EventSkeleton } from "./EventSkeleton";
import { useState, useMemo, useCallback, CSSProperties, ReactElement } from "react";
import { useToast } from "@/components/ui/use-toast";
import { List } from "react-window";

interface EventsListProps {
  events: Event[];
  isLoading: boolean;
  showFavoritesOnly?: boolean;
  onVenueClick?: (venue: string) => void;
  onDateClick?: (date: string) => void;
}

const getColumnCount = (width: number): number => {
  if (width >= 1536) return 5;
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

const ROW_HEIGHT = 370;

interface RowProps {
  filteredEvents: Event[];
  columnCount: number;
  favorites: string[];
  onToggleFavorite: (artist: string) => void;
  showFavoritesOnly: boolean;
  onVenueClick?: (venue: string) => void;
  onDateClick?: (date: string) => void;
}

const RowComponent = ({
  index,
  style,
  filteredEvents,
  columnCount,
  favorites,
  onToggleFavorite,
  showFavoritesOnly,
  onVenueClick,
  onDateClick,
}: {
  ariaAttributes: { "aria-posinset": number; "aria-setsize": number; role: "listitem" };
  index: number;
  style: CSSProperties;
} & RowProps): ReactElement | null => {
  const startIndex = index * columnCount;
  const rowEvents = filteredEvents.slice(startIndex, startIndex + columnCount);

  return (
    <div style={style} className="flex gap-4 md:gap-6 justify-center px-0 pb-4 md:pb-6">
      {rowEvents.map((event: Event) => (
        <div key={`${event.title}-${event.date}`} className="flex justify-center" style={{ width: `${100 / columnCount}%`, maxWidth: 350 }}>
          <ConcertCard
            artist={event.title}
            date={event.date}
            venue={event.venue}
            location={event.location || ""}
            imageUrl={event.image}
            ticketUrl={event.link}
            venueLink={getVenueLink(event.venue)}
            isFavorite={favorites.includes(event.title)}
            onToggleFavorite={onToggleFavorite}
            isInFavoritesView={showFavoritesOnly}
            onVenueClick={onVenueClick}
            onDateClick={onDateClick}
          />
        </div>
      ))}
    </div>
  );
};

export const EventsList = ({ events, isLoading, showFavoritesOnly = false, onVenueClick, onDateClick }: EventsListProps) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const { toast } = useToast();
  const [columnCount, setColumnCount] = useState(() => getColumnCount(window.innerWidth));

  const filteredEvents = useMemo(() => {
    return events.filter(event => !showFavoritesOnly || favorites.includes(event.title));
  }, [events, showFavoritesOnly, favorites]);

  const rowCount = Math.ceil(filteredEvents.length / columnCount);

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

  const handleResize = useCallback(() => {
    setColumnCount(getColumnCount(window.innerWidth));
  }, []);

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
    <div className="w-full max-w-[1920px] mx-auto">
      <List
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        overscanCount={3}
        onResize={handleResize}
        rowComponent={RowComponent}
        rowProps={{
          filteredEvents,
          columnCount,
          favorites,
          onToggleFavorite: handleToggleFavorite,
          showFavoritesOnly,
          onVenueClick,
          onDateClick,
        }}
        style={{ height: 'calc(100vh - 200px)' }}
      />
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
