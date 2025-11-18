import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TrendingUp, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { parseISO, isAfter, startOfDay, isSameDay } from "date-fns";

interface PopularEvent {
  concert_title: string;
  concert_date: string;
  venue: string;
  click_count: number;
}

interface PopularEventsFilterProps {
  onEventClick?: (title: string, date: string, venue: string) => void;
}

export const PopularEventsFilter = ({ onEventClick }: PopularEventsFilterProps) => {
  const { data: popularEvents, isLoading } = useQuery({
    queryKey: ['popular-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('concert_analytics')
        .select('concert_title, concert_date, venue');

      if (error) throw error;

      // Aggregate click counts
      const eventMap = new Map<string, PopularEvent>();
      const today = startOfDay(new Date());
      
      data?.forEach(item => {
        const key = `${item.concert_title}-${item.concert_date}-${item.venue}`;
        const existing = eventMap.get(key);
        
        if (existing) {
          existing.click_count++;
        } else {
          eventMap.set(key, {
            concert_title: item.concert_title,
            concert_date: item.concert_date,
            venue: item.venue,
            click_count: 1
          });
        }
      });

      // Filter to only future events, sort by click count and get top 10
      return Array.from(eventMap.values())
        .filter(event => {
          const eventDate = parseISO(event.concert_date);
          return isAfter(eventDate, today) || isSameDay(eventDate, today);
        })
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 10);
    },
    staleTime: 60000, // Cache for 1 minute
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-ui-surface border border-ui-border text-text-primary hover:bg-ui-surface/80 hover:border-primary/50 shadow-card font-medium"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Popular Events
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="end">
        <div className="p-3 border-b border-ui-border">
          <h3 className="font-semibold text-sm text-text-primary">Most Clicked Events</h3>
          <p className="text-xs text-muted-foreground">Based on user engagement</p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : !popularEvents || popularEvents.length === 0 ? (
          <div className="p-3 text-center text-sm text-muted-foreground">
            No analytics data yet
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {popularEvents.map((event, index) => (
              <button
                key={`${event.concert_title}-${event.concert_date}-${index}`}
                onClick={() => onEventClick?.(event.concert_title, event.concert_date, event.venue)}
                className="w-full p-2.5 text-left hover:bg-ui-surface/50 transition-colors border-b border-ui-border last:border-0 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                        {event.click_count} {event.click_count === 1 ? 'click' : 'clicks'}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm text-text-primary group-hover:text-primary truncate transition-colors">
                      {event.concert_title}
                    </p>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/80 transition-colors">
                      {event.venue}
                    </p>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/60 transition-colors mt-0.5">
                      {new Date(event.concert_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};