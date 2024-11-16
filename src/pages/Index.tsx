import { useState, useEffect } from "react";
import { SpotifyLogin } from "@/components/SpotifyLogin";
import { LocationPicker } from "@/components/LocationPicker";
import { ConcertCard } from "@/components/ConcertCard";
import { SurpriseButton } from "@/components/SurpriseButton";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

// Sample concert data with minutes listened
const SAMPLE_CONCERTS = [
  {
    artist: "Taylor Swift",
    date: "March 15, 2024",
    venue: "Madison Square Garden",
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    ticketUrl: "#",
    minutesListened: 12000
  },
  {
    artist: "Ed Sheeran",
    date: "April 20, 2024",
    venue: "Staples Center",
    location: "Los Angeles, CA",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    ticketUrl: "#",
    minutesListened: 8000
  },
  // Add more sample concerts as needed
];

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleSurprise = () => {
    toast({
      title: "Finding a surprise concert...",
      description: "We're looking for something special just for you!",
    });
  };

  const handleTestLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Test Mode Activated",
      description: "You're now viewing the interface as a logged-in user",
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

  // Sort concerts by minutes listened
  const sortedConcerts = [...SAMPLE_CONCERTS].sort((a, b) => b.minutesListened - a.minutesListened);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="container relative z-20 py-8 mx-auto text-center flex flex-col min-h-screen">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in flex-grow-0">
          Discover Your Next Concert
        </h1>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
          {!isAuthenticated ? (
            <div className="space-y-4">
              <SpotifyLogin />
              <div className="mt-4">
                <Button 
                  variant="secondary"
                  onClick={handleTestLogin}
                  className="text-sm"
                >
                  View Demo Interface
                </Button>
              </div>
            </div>
          ) : (
            <>
              <LocationPicker />
              <div className="flex justify-center mb-8 w-full">
                <SurpriseButton onClick={handleSurprise} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {sortedConcerts.map((concert, index) => (
                  <div key={index} className="flex justify-center">
                    <ConcertCard {...concert} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
