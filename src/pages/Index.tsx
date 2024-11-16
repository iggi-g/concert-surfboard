import { useState, useEffect } from "react";
import { SpotifyLogin } from "@/components/SpotifyLogin";
import { LocationPicker } from "@/components/LocationPicker";
import { ConcertCard } from "@/components/ConcertCard";
import { SurpriseButton } from "@/components/SurpriseButton";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleSurprise = () => {
    toast({
      title: "Finding a surprise concert...",
      description: "We're looking for something special just for you!",
    });
  };

  useEffect(() => {
    // Array of concert video IDs
    const videoIds = [
      'JGwWNGJdvx8', // Shape of You - Ed Sheeran Live
      'fJ9rUzIMcZQ', // Bohemian Rhapsody - Queen Live
      'L0MK7qz13bU', // Let It Go - Frozen Live
      '1k8craCGpgs', // Viva La Vida - Coldplay Live
    ];
    
    // Randomly select a video ID
    const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)];
    
    // Create and append the YouTube iframe
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      new YT.Player('video-background', {
        videoId: randomVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          mute: 1,
          playlist: randomVideoId,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
      <div className="container relative z-20 py-8 mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">
          Discover Your Next Concert
        </h1>
        
        <div className="flex flex-col items-center gap-8">
          {!isAuthenticated ? (
            <SpotifyLogin />
          ) : (
            <>
              <LocationPicker />
              <div className="flex justify-center mb-8">
                <SurpriseButton onClick={handleSurprise} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ConcertCard
                  artist="Sample Artist"
                  date="March 15, 2024"
                  venue="Amazing Venue"
                  location="New York, NY"
                  imageUrl="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"
                  ticketUrl="#"
                />
                {/* More concert cards will be added dynamically */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;