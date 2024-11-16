import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/spotify";
import { FaSpotify } from "react-icons/fa";

export const SpotifyLogin = () => {
  return (
    <Button
      onClick={() => window.location.href = loginUrl}
      className="bg-spotify-green hover:bg-spotify-green/90 text-white font-semibold py-4 px-6 rounded-full flex items-center gap-2 animate-fade-in"
    >
      <FaSpotify className="text-xl" />
      Connect with Spotify
    </Button>
  );
};