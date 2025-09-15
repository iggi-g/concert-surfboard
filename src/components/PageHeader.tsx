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
  return;
};