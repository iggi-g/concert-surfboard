import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritesToggleProps {
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
}

export const FavoritesToggle = ({
  showFavoritesOnly,
  setShowFavoritesOnly,
}: FavoritesToggleProps) => {
  // When the toggle is clicked, update the state immediately.
  const handleToggle = () => {
    // Flip the boolean state.
    setShowFavoritesOnly(!showFavoritesOnly);
    // If you’re fetching favorites asynchronously, you can trigger that logic here
    // so that any new favorites are loaded immediately.
    // e.g. loadFavorites();
  };

  return (
    <Button
      variant={showFavoritesOnly ? "active" : "outline"}
      onClick={handleToggle}
      className="w-full md:w-auto"
    >
      <Heart className={cn("mr-2 h-4 w-4 flex-shrink-0", showFavoritesOnly && "fill-current")} />
      <span>Favorites</span>
    </Button>
  );
};
