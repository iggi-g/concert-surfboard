import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Music } from "lucide-react";
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
          <div className="absolute top-2 inset-x-0 flex justify-between items-start px-4">
            <span className="text-white text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
              {date}
            </span>
            {venueLink ? (
              <a 
                href={venueLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm hover:bg-black/60"
              >
                {venue}
              </a>
            ) : (
              <span className="text-white text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                {venue}
              </span>
            )}
          </div>
        </div>
        <div className="p-2 md:p-4">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{artist}</h3>
          <div className="flex flex-wrap items-center gap-2 text-white/70 mb-2 text-sm md:text-base">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 bg-black/40 backdrop-blur-sm border-white/10">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-white">{artist}</DialogTitle>
          </DialogHeader>
          
          <div className="p-6">
            <div className="space-y-6">
              {isRestrictedVenue ? (
                <div className="space-y-6">
                  <div className="h-[400px] w-full rounded-md overflow-hidden border border-white/10">
                    <img
                      src={imageUrl}
                      alt={artist}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3";
                      }}
                    />
                  </div>
                  <div className="text-center p-4 bg-black/20 backdrop-blur-sm rounded-md border border-white/10">
                    <p className="text-lg mb-4 text-white">
                      Sorry, we are not able to show you the venue website here. Please click the button below to visit the website for the event.
                    </p>
                    <Button 
                      className="w-full text-lg py-6 bg-accent hover:bg-accent/90 backdrop-blur-sm text-white border-white/10 shadow-[0_0_15px_rgba(155,135,245,0.3)] transition-all hover:shadow-[0_0_20px_rgba(155,135,245,0.5)]" 
                      onClick={() => window.open(ticketUrl, '_blank')}
                    >
                      Go to event
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-[600px] w-full rounded-md overflow-hidden border border-white/10">
                  <iframe
                    src={ticketUrl}
                    className="w-full h-full"
                    title="Event Website"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3 text-white">
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
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};