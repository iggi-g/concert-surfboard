import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Event } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";

interface SurpriseButtonProps {
  className?: string;
  filteredEvents: Event[];
}

export const SurpriseButton = ({ className, filteredEvents }: SurpriseButtonProps) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleSurprise = () => {
    if (filteredEvents.length === 0) {
      toast({
        title: "No events available",
        description: "Sorry, there are no events to choose from at the moment.",
        variant: "destructive",
      });
      return;
    }

    const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
    window.open(randomEvent.link, '_blank');
  };

  return (
    <Button
      onClick={handleSurprise}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant="outline"
      className={cn(
        "w-full md:w-auto bg-white/10 border-white/10 text-white hover:bg-white/20",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Star className={`w-4 h-4 ${isHovered ? 'text-orange-500 fill-orange-500' : 'text-white'}`} />
        Surprise Me
      </span>
    </Button>
  );
};