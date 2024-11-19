import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Music } from "lucide-react";

interface ConcertCardProps {
  artist: string;
  date: string;
  venue: string;
  venueLink?: string;
  location: string;
  imageUrl: string;
  ticketUrl: string;
  minutesListened: number;
  similarTo?: string;
}

export const ConcertCard = ({
  artist,
  date,
  venue,
  venueLink,
  location,
  imageUrl,
  ticketUrl,
  minutesListened,
  similarTo
}: ConcertCardProps) => {
  const handleVenueClick = () => {
    if (venueLink) {
      window.open(venueLink, '_blank');
    }
  };

  return (
    <Card className="overflow-hidden w-full max-w-[350px] transition-transform hover:scale-105 animate-fade-in">
      <div className="relative h-[200px] w-full">
        <img 
          src={imageUrl} 
          alt={artist} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3";
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{artist}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span 
            className={venueLink ? "cursor-pointer hover:text-accent" : ""}
            onClick={handleVenueClick}
          >
            {venue}, {location}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Clock className="w-4 h-4" />
          <span>{minutesListened.toLocaleString()} minutes listened</span>
        </div>
        {similarTo && (
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Music className="w-4 h-4" />
            <span>Similar to {similarTo}</span>
          </div>
        )}
        <Button className="w-full" onClick={() => window.open(ticketUrl, '_blank')}>
          Get Tickets
        </Button>
      </div>
    </Card>
  );
};