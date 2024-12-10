import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritesToggleProps {
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
}

export const FavoritesToggle = ({ showFavoritesOnly, setShowFavoritesOnly }: FavoritesToggleProps) => {
  return (
    <Button
      variant="outline"
      onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
      className={cn(
        "w-full md:w-auto bg-white/10 border-white/10 text-white hover:bg-white/20",
        showFavoritesOnly && "bg-white/20"
      )}
    >
      <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? 'fill-current text-orange-500' : ''}`} />
      Favorites
    </Button>
  );
};