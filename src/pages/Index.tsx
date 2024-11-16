import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <div className="container py-8">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">
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