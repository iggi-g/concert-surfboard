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
      onClick={handleToggle}
      className={cn(
        "w-full md:w-auto bg-ui-surface border border-ui-border text-text-primary hover:bg-ui-surface/80 hover:border-primary/50 shadow-card font-medium",
        showFavoritesOnly && "bg-ui-surface border-primary/50 text-primary"
      )}
    >
      <Heart className="mr-2 h-4 w-4" />
      Favorites
    </Button>
  );
};
