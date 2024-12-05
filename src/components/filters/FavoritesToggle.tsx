import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritesToggleProps {
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  className?: string;
}

export const FavoritesToggle = ({ showFavoritesOnly, setShowFavoritesOnly, className }: FavoritesToggleProps) => {
  return (
    <Button
      variant="outline"
      onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
      className={cn(
        "bg-white/10 border-white/10 text-white hover:bg-white/20",
        showFavoritesOnly && "bg-white/20",
        className
      )}
    >
      <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? 'fill-current text-red-500' : ''}`} />
      Favorites
    </Button>
  );
};