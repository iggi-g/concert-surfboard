
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
        "w-full md:w-auto rounded-full h-10 border-border/50 dark:bg-white/5 text-foreground hover:bg-accent-1/10 hover:border-accent-1/30 hover:text-accent-1 transition-all duration-150",
        className
      )}
    >
      <span className="flex items-center gap-2">
        <Star className={`w-4 h-4 ${isHovered ? 'text-accent-1 fill-accent-1' : ''}`} />
        Surprise Me
      </span>
    </Button>
  );
};
