
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
  };

  return (
    <Button
      onClick={handleToggle}
      variant="outline"
      className={cn(
        "w-full md:w-auto rounded-full h-10 border-border/50 dark:bg-white/5 text-foreground transition-all duration-150",
        showFavoritesOnly && "bg-accent-1/10 border-accent-1/30 text-accent-1"
      )}
    >
      <Heart className={cn("mr-2 h-4 w-4", showFavoritesOnly && "fill-accent-1")} />
      Favorites
    </Button>
  );
};
