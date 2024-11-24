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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mx-auto">
      {events.map((event: Event, index: number) => (
        <div key={index} className="flex justify-center">
          <ConcertCard
            artist={event.title}
            date={event.date}
            venue={event.venue}
            location={event.location || ""}
            imageUrl={event.image}
            ticketUrl={event.link}
            minutesListened={0}
          />
        </div>
      ))}
    </div>
  );
};