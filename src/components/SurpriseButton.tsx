import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, Event } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { SurpriseAnimation } from "./SurpriseAnimation";

interface SurpriseButtonProps {
  className?: string;
  filteredEvents: Event[];
}

export const SurpriseButton = ({ className, filteredEvents }: SurpriseButtonProps) => {
  const { toast } = useToast();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSurprise = () => {
    if (filteredEvents.length === 0) {
      toast({
        title: "No events available",
        description: "Sorry, there are no events to choose from at the moment.",
        variant: "destructive",
      });
      return;
    }

    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
    window.open(randomEvent.link, '_blank');
    
    toast({
      title: "Opening event page",
      description: `Taking you to ${randomEvent.title}!`,
    });
  };

  return (
    <>
      <Button
        onClick={handleSurprise}
        variant="outline"
        className={cn(
          "group relative overflow-hidden border-accent hover:border-accent/80",
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
          Surprise Me
        </span>
        <div className="absolute inset-0 bg-accent/10 transform translate-y-full transition-transform group-hover:translate-y-0" />
      </Button>
      <SurpriseAnimation 
        isOpen={showAnimation}
        onAnimationComplete={handleAnimationComplete}
      />
    </>
  );
};