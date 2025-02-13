import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
interface FavoritesToggleProps {
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
}
export const FavoritesToggle = ({
  showFavoritesOnly,
  setShowFavoritesOnly
}: FavoritesToggleProps) => {
  // When the toggle is clicked, update the state immediately.
  const handleToggle = () => {
    // Flip the boolean state.
    setShowFavoritesOnly(!showFavoritesOnly);
    // If you’re fetching favorites asynchronously, you can trigger that logic here
    // so that any new favorites are loaded immediately.
    // e.g. loadFavorites();
  };
  return <Button onClick={handleToggle} className="px-[16px] py-0 bg-zinc-950 hover:bg-zinc-800">
      <Heart className="mr-2" />
      Favorites
    </Button>;
};