import { Button } from "@/components/ui/button";
import { Search, Heart, Sparkles, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { VenueDropdownFilter } from "../VenueDropdownFilter";
import { DateRangeSelector } from "./DateRangeSelector";
import { SortDropdown } from "./SortDropdown";
import { Event } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UtilityToolsProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedVenues: string[];
  setSelectedVenues: (venues: string[]) => void;
  availableVenues: string[];
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  sortBy: "date" | "title" | "venue";
  setSortBy: (by: "date" | "title" | "venue") => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  filteredEvents: Event[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export const UtilityTools = ({
  searchQuery,
  setSearchQuery,
  selectedVenues,
  setSelectedVenues,
  availableVenues,
  dateRange,
  setDateRange,
  setSortOrder,
  setSortBy,
  showFavoritesOnly,
  setShowFavoritesOnly,
  filteredEvents,
  hasActiveFilters,
  clearFilters,
}: UtilityToolsProps) => {
  const handleSurprise = () => {
    if (filteredEvents.length === 0) return;
    const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
    window.open(randomEvent.link, '_blank');
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-muted/50 border-muted-foreground/20 text-sm placeholder:text-muted-foreground/60 focus:border-primary/50"
          />
        </div>

        {/* Venues Dropdown */}
        <VenueDropdownFilter
          venues={availableVenues}
          selectedVenues={selectedVenues}
          onVenueChange={setSelectedVenues}
          compact
        />

        {/* Date Range */}
        <DateRangeSelector
          dateRange={dateRange}
          setDateRange={setDateRange}
          compact
        />

        {/* Sort */}
        <SortDropdown
          setSortOrder={setSortOrder}
          setSortBy={setSortBy}
          compact
        />

        {/* Favorites */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={cn(
                "h-9 px-3 text-muted-foreground hover:text-foreground",
                showFavoritesOnly && "text-primary bg-primary/10"
              )}
            >
              <Heart className={cn("h-4 w-4", showFavoritesOnly && "fill-primary")} />
              <span className="ml-1.5 hidden sm:inline text-sm">Favorites</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Show favorites only</p>
          </TooltipContent>
        </Tooltip>

        {/* Surprise Me */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSurprise}
              className="h-9 px-3 text-muted-foreground hover:text-foreground hover:text-primary"
              disabled={filteredEvents.length === 0}
            >
              <Sparkles className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline text-sm">Surprise</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Random event</p>
          </TooltipContent>
        </Tooltip>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 px-3 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
                <span className="ml-1.5 hidden sm:inline text-sm">Clear</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all filters</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};
