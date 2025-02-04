import { Beer, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface PageHeaderProps {
  filteredEventsCount: number;
  showFavoritesOnly: boolean;
}

export const PageHeader = ({ filteredEventsCount, showFavoritesOnly }: PageHeaderProps) => {
  // State to control the visibility of the right navigation elements.
  const [isNavVisible, setIsNavVisible] = useState(true);
  // State to control the visibility of the left logo.
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Build the concert counter text with proper pluralization and favorites handling.
  const concertCountText = showFavoritesOnly
    ? `${filteredEventsCount} favorite ${filteredEventsCount === 1 ? 'concert' : 'concerts'} available`
    : `${filteredEventsCount} ${filteredEventsCount === 1 ? 'concert' : 'concerts'} available`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Right navigation: show if scrolling up or near the top.
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
      lastScrollY.current = currentScrollY;

      // Left logo: hide as soon as the user scrolls away from the top.
      if (currentScrollY > 0) {
        setIsLogoVisible(false);
      } else {
        setIsLogoVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="space-y-2 mb-8">
      {/* Left logo: fixed at top-left, only showing text, and disappears on scroll */}
      <div
        className={`fixed top-4 left-4 z-50 transition-all duration-300 ${
          isLogoVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <Link
          to="/"
          className="text-orange-500 hover:text-orange-400 transition-colors"
          aria-label="ConcertsCPH Homepage"
        >
          <span className="font-bold text-lg">ConcertsCPH</span>
        </Link>
      </div>

      {/* Main SEO heading */}
      <h1 className="text-4xl font-bold text-white animate-fade-in">
        Concerts in Copenhagen
      </h1>
      <p className="text-xl font-bold text-orange-500 animate-fade-in">
        {concertCountText}
      </p>

      {/* Right-side navigation that shows/hides based on scrolling */}
      <nav
        className={`fixed top-4 right-4 z-50 flex items-center gap-4 transition-all duration-300 ${
          isNavVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
        aria-label="Additional Navigation"
      >
        <Link to="/about" className="group" aria-label="About Page">
          <Info className="h-8 w-8 text-orange-500 transition-transform group-hover:scale-110" />
        </Link>
        <a
          href="https://buymeacoffee.com/cphconcerts"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="Buy Me a Coffee"
        >
          <Beer className="h-8 w-8 text-orange-500 transition-transform group-hover:scale-110" />
        </a>
      </nav>
    </header>
  );
};
