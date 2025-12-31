
import { Beer, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface PageHeaderProps {
  filteredEventsCount: number;
  showFavoritesOnly: boolean;
  hasMoreEvents?: boolean;
  totalEvents?: number;
  hasActiveFilters?: boolean;
}

export const PageHeader = ({
  filteredEventsCount,
  showFavoritesOnly,
  hasMoreEvents = false,
  totalEvents = 0,
  hasActiveFilters = false
}: PageHeaderProps) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const lastScrollY = useRef(0);

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
    <header className="pt-6 px-6 relative z-10">
      <div className={`fixed top-4 left-4 z-50 transition-all duration-300 ${isLogoVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
        <Link to="/" className="text-primary hover:text-primary-glow transition-colors" aria-label="ConcertsCPH Homepage">
          <span className="font-bold text-lg uppercase tracking-wide">ConcertsCPH</span>
        </Link>
      </div>

      <nav className={`fixed top-4 right-4 z-50 flex items-center gap-4 transition-all duration-300 ${isNavVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`} aria-label="Additional Navigation">
        <Link to="/about" className="group" aria-label="About Page">
          <Info className="h-8 w-8 text-primary transition-all group-hover:scale-110 group-hover:text-primary-glow" />
        </Link>
        <a href="https://buymeacoffee.com/cphconcerts" target="_blank" rel="noopener noreferrer" className="group" aria-label="Buy Me a Coffee">
          <Beer className="h-8 w-8 text-primary transition-all group-hover:scale-110 group-hover:text-primary-glow" />
        </a>
      </nav>
    </header>
  );
};
