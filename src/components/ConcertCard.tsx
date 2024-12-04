import { Card } from "@/components/ui/card";
import { useState } from "react";
import { CardImage } from "./concert/CardImage";
import { CalendarDialog } from "./concert/CalendarDialog";

interface ConcertCardProps {
  artist: string;
  date: string;
  venue: string;
  imageUrl: string;
  ticketUrl: string;
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
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);

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
    setShowCalendarDialog(true);
  };

  const generateGoogleCalendarUrl = () => {
    const eventDate = new Date(date);
    const endDate = new Date(eventDate);
    endDate.setDate(endDate.getDate() + 1);

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: artist,
      details: `Concert at ${venue}. Get tickets: ${ticketUrl}`,
      dates: `${eventDate.toISOString().split('T')[0].replace(/-/g, '')}/${endDate.toISOString().split('T')[0].replace(/-/g, '')}`,
      location: venue
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleAddToCalendar = () => {
    window.open(generateGoogleCalendarUrl(), '_blank');
    setShowCalendarDialog(false);
  };

  return (
    <>
      <Card 
        className="overflow-hidden w-full max-w-[350px] md:max-w-[350px] transition-transform hover:scale-105 animate-fade-in cursor-pointer bg-black/20 backdrop-blur-sm border-white/10 relative"
        onClick={handleClick}
      >
        <CardImage
          imageUrl={imageUrl}
          artist={artist}
          date={date}
          venue={venue}
          venueLink={venueLink}
          onCalendarClick={handleCalendarClick}
          onFavoriteClick={handleFavoriteClick}
          isFavorite={isFavorite}
        />
        <div className="p-2 md:p-4">
          <h3 className="text-lg md:text-xl font-bold text-white">{artist}</h3>
        </div>
      </Card>

      <CalendarDialog
        open={showCalendarDialog}
        onOpenChange={setShowCalendarDialog}
        artist={artist}
        venue={venue}
        onConfirm={handleAddToCalendar}
      />
    </>
  );
};