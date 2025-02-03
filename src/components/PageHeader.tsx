import { Beer, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  filteredEventsCount: number;
  showFavoritesOnly: boolean;
}

export const PageHeader = ({ filteredEventsCount, showFavoritesOnly }: PageHeaderProps) => {
  const concertCountText = filteredEventsCount > 1000 
    ? "More than 1000 concerts to choose from"
    : `${filteredEventsCount} ${showFavoritesOnly ? 'favorite' : ''} ${filteredEventsCount === 1 ? 'concert' : 'concerts'} to choose from`;

  return (
    <div className="space-y-2 mb-8 relative w-full">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/2d4710a1-37ee-4016-838c-f68c2640559b.png" 
            alt="ConcertsCPH Logo" 
            className="h-16 w-auto"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            to="/about"
            className="group"
          >
            <Info className="h-8 w-8 text-orange-500 transition-transform group-hover:scale-110" />
          </Link>
          <a 
            href="https://buymeacoffee.com/cphconcerts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <Beer className="h-8 w-8 text-orange-500 transition-transform group-hover:scale-110" />
          </a>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white animate-fade-in flex-grow-0">
        Concerts in Copenhagen
      </h1>
      <p className="text-xl font-bold text-orange-500 animate-fade-in">
        {concertCountText}
      </p>
    </div>
  );
};