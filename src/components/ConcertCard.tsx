import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Music, Ticket } from "lucide-react";
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
  location: string;
  imageUrl: string;
  ticketUrl: string;
  similarTo?: string;
  venueLink?: string;
}

export const ConcertCard = ({
  artist,
  date,
  venue,
  location,
  imageUrl,
  ticketUrl,
  similarTo,
  venueLink
}: ConcertCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if the venue is Rust or Royal Arena
  const isRestrictedVenue = venue === 'Rust' || venue === 'Royal Arena';

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card 
        className="overflow-hidden w-full max-w-[350px] md:max-w-[350px] transition-transform hover:scale-105 animate-fade-in cursor-pointer bg-black/20 backdrop-blur-sm border-white/10"
        onClick={handleClick}
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
        <div className="p-2 md:p-4">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{artist}</h3>
          <div className="flex flex-wrap items-center gap-2 text-white/70 mb-2 text-sm md:text-base">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{date}</span>
            <span className="text-white/50">•</span>
            {venueLink ? (
              <a 
                href={venueLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-white transition-colors"
              >
                {venue}
              </a>
            ) : (
              <span>{venue}</span>
            )}
            <span className="text-white/50">•</span>
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold">{artist}</DialogTitle>
          </DialogHeader>
          
          <div className="p-6">
            <div className="space-y-6">
              {isRestrictedVenue ? (
                <div className="space-y-6">
                  <div className="h-[400px] w-full rounded-md overflow-hidden border">
                    <img
                      src={imageUrl}
                      alt={artist}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3";
                      }}
                    />
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-md">
                    <p className="text-lg mb-4">
                      Sorry, we are not able to show you the venue website here. Please click the button below to visit the website for the event.
                    </p>
                    <Button 
                      className="w-full text-lg py-6 bg-accent hover:bg-accent/90 backdrop-blur-sm text-white border-white/10 shadow-[0_0_15px_rgba(155,135,245,0.3)] transition-all hover:shadow-[0_0_20px_rgba(155,135,245,0.5)]" 
                      onClick={() => window.open(ticketUrl, '_blank')}
                    >
                      <Ticket className="w-5 h-5 mr-2" />
                      Visit Event Website
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-[600px] w-full rounded-md overflow-hidden border">
                  <iframe
                    src={ticketUrl}
                    className="w-full h-full"
                    title="Event Website"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">{date} {venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {venueLink ? (
                      <a 
                        href={venueLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg hover:text-white/80 transition-colors"
                      >
                        {location}
                      </a>
                    ) : (
                      <span className="text-lg">{location}</span>
                    )}
                  </div>
                  {similarTo && (
                    <div className="flex items-center gap-2">
                      <Music className="w-5 h-5" />
                      <span className="text-lg">Similar to {similarTo}</span>
                    </div>
                  )}
                </div>

                {!isRestrictedVenue && (
                  <Button 
                    className="w-full text-lg py-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/10" 
                    onClick={() => window.open(ticketUrl, '_blank')}
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    Purchase Tickets
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};