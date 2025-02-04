import { Beer, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface PageHeaderProps {
  filteredEventsCount: number;
  showFavoritesOnly: boolean;
}

export const PageHeader = ({ filteredEventsCount, showFavoritesOnly }: PageHeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const concertCountText = `${filteredEventsCount} ${showFavoritesOnly ? 'favorite' : ''} ${filteredEventsCount === 1 ? 'concert' : 'concerts'} to choose from`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="space-y-2 mb-8">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors">
          <Music2 className="h-8 w-8" />
          <span className="font-bold text-lg">ConcertsCPH</span>
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-white animate-fade-in flex-grow-0">
        Concerts in Copenhagen
      </h1>
      <p className="text-xl font-bold text-orange-500 animate-fade-in">
        {concertCountText}
      </p>
      <div 
        className={`fixed top-4 right-4 z-50 flex items-center gap-4 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
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
  );
};