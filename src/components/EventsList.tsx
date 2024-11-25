import { Event } from "@/lib/supabase-client";
import { ConcertCard } from "./ConcertCard";

interface EventsListProps {
  events: Event[];
  isLoading: boolean;
}

export const EventsList = ({ events, isLoading }: EventsListProps) => {
  if (isLoading) {
    return <p className="text-white">Loading events...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 w-full max-w-[1920px] mx-auto">
      {events.map((event: Event, index: number) => (
        <div key={index} className="flex justify-center">
          <ConcertCard
            artist={event.title}
            date={event.date}
            venue={event.venue}
            location={event.location || ""}
            imageUrl={event.image}
            ticketUrl={event.link}
            venueLink={getVenueLink(event.venue)}
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