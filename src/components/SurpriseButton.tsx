import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";

export const SurpriseButton = () => {
  const { toast } = useToast();
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  const handleSurprise = () => {
    if (events.length === 0) {
      toast({
        title: "No events available",
        description: "Sorry, there are no events to choose from at the moment.",
        variant: "destructive",
      });
      return;
    }

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    window.open(randomEvent.link, '_blank');
    
    toast({
      title: "Opening event page",
      description: `Taking you to ${randomEvent.title}!`,
    });
  };

  return (
    <Button
      onClick={handleSurprise}
      variant="outline"
      className="group relative overflow-hidden border-accent hover:border-accent/80"
    >
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Surprise Me
      </span>
      <div className="absolute inset-0 bg-accent/10 transform translate-y-full transition-transform group-hover:translate-y-0" />
    </Button>
  );
};