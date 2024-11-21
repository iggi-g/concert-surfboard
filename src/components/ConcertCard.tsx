import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Music, X, Ticket, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleVenueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (venueLink) {
      window.open(venueLink, '_blank');
    }
  };

  const handleTicketClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(ticketUrl, '_blank');
  };

  return (
    <>
      <Card 
        className="overflow-hidden w-full max-w-[350px] transition-transform hover:scale-105 animate-fade-in cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative aspect-[16/9] w-full">
          <img 
            src={imageUrl} 
            alt={artist} 
            className="absolute inset-0 w-full h-full object-cover"
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
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] animate-scale-in max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{artist}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full mb-4">
            <img 
              src={imageUrl} 
              alt={artist} 
              className="absolute inset-0 w-full h-full object-cover rounded-md"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3";
              }}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg hover:text-accent cursor-pointer" onClick={handleVenueClick}>
                {venue}, {location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-lg">{minutesListened.toLocaleString()} minutes listened</span>
            </div>
            {similarTo && (
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                <span className="text-lg">Similar to {similarTo}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              <a 
                href={venueLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg text-accent hover:underline"
              >
                View Venue Website
              </a>
            </div>
            <Button 
              className="w-full text-lg py-6 mt-4" 
              onClick={handleTicketClick}
            >
              <Ticket className="w-5 h-5 mr-2" />
              Purchase Tickets
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};