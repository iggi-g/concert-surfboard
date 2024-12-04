import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";

interface CardImageProps {
  imageUrl: string;
  artist: string;
  date: string;
  venue: string;
  venueLink?: string;
  onCalendarClick: (e: React.MouseEvent) => void;
  onFavoriteClick: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

export const CardImage = ({
  imageUrl,
  artist,
  date,
  venue,
  venueLink,
  onCalendarClick,
  onFavoriteClick,
  isFavorite
}: CardImageProps) => {
  return (
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
      <div className="absolute bottom-2 inset-x-0 flex justify-between items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/40 hover:bg-black/60"
          onClick={onCalendarClick}
        >
          <Calendar className="h-5 w-5 text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/40 hover:bg-black/60"
          onClick={onFavoriteClick}
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-current text-red-500' : 'text-white'}`} 
          />
        </Button>
      </div>
    </div>
  );
};