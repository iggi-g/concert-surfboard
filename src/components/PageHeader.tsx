import { Beer, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface PageHeaderProps {
  filteredEventsCount: number;
  showFavoritesOnly: boolean;
}

export const PageHeader = ({ filteredEventsCount, showFavoritesOnly }: PageHeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Build the concert counter text with accurate pluralization and favorites handling.
  const concertCountText = showFavoritesOnly
    ? `${filteredEventsCount} favorite ${filteredEventsCount === 1 ? 'concert' : 'concerts'} available`
    : `${filteredEventsCount} ${filteredEventsCount === 1 ? 'concert' : 'concerts'} available`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show the right-side links if scrolling up or near the top.
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-2 mb-8">
      {/* Fixed logo with text only in the top-left corner */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="text-orange-500 hover:text-orange-400 transition-colors">
          <span className="font-bold text-lg">ConcertsCPH</span>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-white animate-fade-in">
        Concerts in Copenhagen
      </h1>
      <p className="text-xl font-bold text-orange-500 animate-fade-in">
        {concertCountText}
      </p>

      {/* Fixed right-side navigation that hides/shows based on scroll */}
      <div
        className={`fixed top-4 right-4 z-50 flex items-center gap-4 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <Link to="/about" className="group">
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
  );
};
