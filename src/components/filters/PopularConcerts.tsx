import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";
import { startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PopularConcertsProps {
  onEventClick?: (title: string, date: string, venue: string) => void;
  compact?: boolean;
}

interface PopularEvent {
  concert_title: string;
  concert_date: string;
  venue: string;
  click_count: number;
}

export const PopularConcerts = ({ onEventClick, compact }: PopularConcertsProps) => {
  const [open, setOpen] = useState(false);

  const { data: popularEvents = [] } = useQuery({
    queryKey: ["popular-concerts"],
    queryFn: async () => {
      const today = startOfDay(new Date()).toISOString().split("T")[0];
      
      const { data, error } = await supabase
        .from("concert_analytics")
        .select("concert_title, concert_date, venue")
        .gte("concert_date", today);

      if (error) throw error;

      // Count clicks per concert and get top 10
      const counts = new Map<string, PopularEvent>();
      for (const row of data || []) {
        const key = `${row.concert_title}-${row.concert_date}`;
        const existing = counts.get(key);
        if (existing) {
          existing.click_count++;
        } else {
          counts.set(key, {
            concert_title: row.concert_title,
            concert_date: row.concert_date,
            venue: row.venue,
            click_count: 1,
          });
        }
      }

      return Array.from(counts.values())
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 10);
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleClick = (event: PopularEvent) => {
    onEventClick?.(event.concert_title, event.concert_date, event.venue);
    setOpen(false);
  };

  if (popularEvents.length === 0) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 text-muted-foreground hover:text-foreground"
            >
              <TrendingUp className="h-4 w-4" />
              {!compact && <span className="ml-1.5 hidden sm:inline text-sm">Popular</span>}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Most clicked concerts</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-64 p-2 bg-popover border-border"
        align="start"
      >
        <p className="text-xs font-medium text-muted-foreground px-2 pb-2">
          Most Popular
        </p>
        <div className="space-y-0.5 max-h-[240px] overflow-y-auto scrollbar-hide">
          {popularEvents.map((event, i) => (
            <button
              key={`${event.concert_title}-${event.concert_date}`}
              onClick={() => handleClick(event)}
              className="w-full text-left px-2 py-1.5 rounded text-sm text-foreground hover:text-primary hover:bg-muted/50 transition-colors truncate"
            >
              <span className="text-muted-foreground mr-1.5">{i + 1}.</span>
              {event.concert_title}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
