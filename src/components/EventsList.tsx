import { Event } from "@/lib/supabase-client";
import { ConcertCard } from "./ConcertCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FixedSizeGrid } from 'react-window';
import { useWindowSize } from "@/hooks/useWindowSize";

interface EventsListProps {
  events: Event[];
  isLoading: boolean;
  showFavoritesOnly?: boolean;
}

export const EventsList = ({ events, isLoading, showFavoritesOnly = false }: EventsListProps) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const windowSize = useWindowSize();

  const handleToggleFavorite = (artist: string) => {
    setFavorites(prev => 
      prev.includes(artist) 
        ? prev.filter(a => a !== artist)
        : [...prev, artist]
    );
  };

  const filteredEvents = showFavoritesOnly 
    ? events.filter(event => favorites.includes(event.title))
    : events;

  if (isLoading) {
    return <p className="text-white">Loading events...</p>;
  }

  const getColumnCount = () => {
    if (windowSize.width < 640) return 1;
    if (windowSize.width < 1024) return 2;
    if (windowSize.width < 1280) return 3;
    return 4;
  };

  const columnCount = getColumnCount();
  const rowCount = Math.ceil(filteredEvents.length / columnCount);
  const GRID_PADDING = 32;
  const CARD_GAP = 16;
  
  // Calculate the available width for the grid
  const availableWidth = windowSize.width - (GRID_PADDING * 2);
  // Calculate the width for each column including gaps
  const columnWidth = Math.floor((availableWidth - (CARD_GAP * (columnCount - 1))) / columnCount);
  const rowHeight = 320; // Increased to accommodate the full card height

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= filteredEvents.length) return null;

    const event = filteredEvents[index];
    
    // Calculate the left and right padding to create gaps between cards
    const leftPadding = columnIndex === 0 ? 0 : CARD_GAP / 2;
    const rightPadding = columnIndex === columnCount - 1 ? 0 : CARD_GAP / 2;

    return (
      <div style={{
        ...style,
        left: `${parseFloat(style.left as string) + leftPadding}px`,
        width: `${columnWidth - leftPadding - rightPadding}px`,
        padding: '8px 0',
      }}>
        <ConcertCard
          artist={event.title}
          date={event.date}
          venue={event.venue}
          imageUrl={event.image}
          ticketUrl={event.link}
          venueLink={getVenueLink(event.venue)}
          isFavorite={favorites.includes(event.title)}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-8">
      <FixedSizeGrid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={windowSize.height - 200}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={availableWidth}
      >
        {Cell}
      </FixedSizeGrid>
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