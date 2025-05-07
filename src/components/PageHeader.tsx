
import { Beer, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface PageHeaderProps {
  filteredEventsCount: number;
  showFavoritesOnly: boolean;
}

export const PageHeader = ({
  filteredEventsCount,
  showFavoritesOnly
}: PageHeaderProps) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const lastScrollY = useRef(0);

  const formatConcertCount = (count: number) => {
    if (count >= 1000) {
      return count.toLocaleString('en-US'); // This will add commas for thousands
    }
    return count;
  };

  const concertCountText = showFavoritesOnly 
    ? `${formatConcertCount(filteredEventsCount)} favorite ${filteredEventsCount === 1 ? 'concert' : 'concerts'} available` 
    : `${formatConcertCount(filteredEventsCount)} ${filteredEventsCount === 1 ? 'concert' : 'concerts'} available`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
      lastScrollY.current = currentScrollY;
      if (currentScrollY > 0) {
        setIsLogoVisible(false);
      } else {
        setIsLogoVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative z-30 pb-6">
      <div className="fixed top-0 left-0 right-0 h-16 glass z-50 backdrop-blur-md px-4 md:px-6 flex items-center justify-between">
        <div className={`transition-all duration-300 ${isLogoVisible ? "opacity-0" : "opacity-100"}`}>
          <Link to="/" className="text-accent-1 hover:text-accent-1/90 transition-colors font-medium" aria-label="ConcertsCPH Homepage">
            <span className="font-semibold text-lg">ConcertsCPH</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/about" className="group" aria-label="About Page">
            <Info className="h-5 w-5 text-foreground opacity-70 transition-all group-hover:opacity-100 group-hover:scale-105" />
          </Link>
          <a href="https://buymeacoffee.com/cphconcerts" target="_blank" rel="noopener noreferrer" className="group" aria-label="Buy Me a Coffee">
            <Beer className="h-5 w-5 text-foreground opacity-70 transition-all group-hover:opacity-100 group-hover:scale-105" />
          </a>
        </div>
      </div>
      
      <div className="pt-20 pb-4 space-y-2 text-center">
        <h1 className="text-foreground animate-fade-in">
          Concerts in Copenhagen
        </h1>
        <p className="text-lg font-medium text-accent-1 animate-fade-in">
          {concertCountText}
        </p>
      </div>
    </header>
  );
};
