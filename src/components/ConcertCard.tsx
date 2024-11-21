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
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{venue}, {location}</span>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold">{artist}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div className="relative aspect-video w-full">
                <img 
                  src={imageUrl} 
                  alt={artist} 
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3";
                  }}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{venue}, {location}</span>
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
              </div>

              <Button 
                className="w-full text-lg py-6" 
                onClick={() => window.open(ticketUrl, '_blank')}
              >
                <Ticket className="w-5 h-5 mr-2" />
                Purchase Tickets
              </Button>
            </div>

            <div className="h-[600px] w-full rounded-md overflow-hidden border">
              {venueLink ? (
                <iframe
                  src={venueLink}
                  className="w-full h-full"
                  title="Venue Website"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">Venue website not available</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};