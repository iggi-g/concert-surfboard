import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

interface ConcertCardProps {
  artist: string;
  date: string;
  venue: string;
  location: string;
  imageUrl: string;
  ticketUrl: string;
  minutesListened: number;
}

export const ConcertCard = ({
  artist,
  date,
  venue,
  location,
  imageUrl,
  ticketUrl,
  minutesListened
}: ConcertCardProps) => {
  return (
    <Card className="overflow-hidden w-full max-w-[350px] transition-transform hover:scale-105 animate-fade-in">
      <div className="relative h-[200px]">
        <img src={imageUrl} alt={artist} className="w-full h-full object-cover" />
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
          <span>{venue}, {location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Clock className="w-4 h-4" />
          <span>{minutesListened.toLocaleString()} minutes listened</span>
        </div>
        <Button className="w-full" onClick={() => window.open(ticketUrl, '_blank')}>
          Get Tickets
        </Button>
      </div>
    </Card>
  );
};