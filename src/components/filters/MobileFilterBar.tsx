import { Button } from "@/components/ui/button";
import { Search, Heart, Sparkles, SlidersHorizontal } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Event } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangeSelector } from "./DateRangeSelector";
import { Checkbox } from "@/components/ui/checkbox";

interface MobileFilterBarProps {
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

type SortOption = "date-asc" | "date-desc" | "title-asc" | "venue-asc";

export const MobileFilterBar = ({
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
}: MobileFilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortOption>("date-asc");

  const handleSurprise = () => {
    if (filteredEvents.length === 0) return;
    const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
    window.open(randomEvent.link, '_blank');
  };

  const handleSortChange = (value: SortOption) => {
    setCurrentSort(value);
    switch (value) {
      case "date-asc":
        setSortBy("date");
        setSortOrder("asc");
        break;
      case "date-desc":
        setSortBy("date");
        setSortOrder("desc");
        break;
      case "title-asc":
        setSortBy("title");
        setSortOrder("asc");
        break;
      case "venue-asc":
        setSortBy("venue");
        setSortOrder("asc");
        break;
    }
  };

  const handleVenueToggle = (venue: string) => {
    if (selectedVenues.includes(venue)) {
      setSelectedVenues(selectedVenues.filter(v => v !== venue));
    } else {
      setSelectedVenues([...selectedVenues, venue]);
    }
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const activeFilterCount = [
    selectedVenues.length > 0,
    dateRange?.from,
    showFavoritesOnly,
  ].filter(Boolean).length;

  return (
    <div className="flex items-center gap-2">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 bg-muted/50 border-muted-foreground/20 text-sm placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Filter Sheet Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-9 px-3 text-muted-foreground relative",
              hasActiveFilters && "text-primary"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto max-h-[80vh] rounded-t-xl px-4 pb-8">
          <SheetHeader className="pb-2 border-b border-border mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-left text-lg">Filters</SheetTitle>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </SheetHeader>
          
          <div className="space-y-5">
            {/* Venues */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Venues</label>
              <div className="max-h-[140px] overflow-y-auto space-y-1 bg-muted/30 rounded-md p-2">
                {availableVenues.map((venue) => (
                  <div
                    key={venue}
                    className="flex items-center space-x-2 py-1.5 px-1 hover:bg-muted/50 rounded cursor-pointer"
                    onClick={() => handleVenueToggle(venue)}
                  >
                    <Checkbox
                      checked={selectedVenues.includes(venue)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span className="text-sm text-foreground">{venue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <DateRangeSelector
                dateRange={dateRange}
                setDateRange={setDateRange}
                mobile
              />
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sort</label>
              <Select value={currentSort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full bg-muted/50 border-muted-foreground/20">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="date-asc">Date (soonest first)</SelectItem>
                  <SelectItem value="date-desc">Date (latest first)</SelectItem>
                  <SelectItem value="title-asc">Name A-Z</SelectItem>
                  <SelectItem value="venue-asc">Venue A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Toggles */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md border text-sm font-medium transition-all",
                  showFavoritesOnly
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted/30 border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground/40"
                )}
              >
                <Heart className={cn("h-4 w-4", showFavoritesOnly && "fill-primary")} />
                Favorites
              </button>
              
              <button
                onClick={handleSurprise}
                disabled={filteredEvents.length === 0}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md border bg-muted/30 border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground/40 text-sm font-medium transition-all disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                Surprise
              </button>
            </div>

            {/* Apply Button */}
            <Button
              onClick={handleApply}
              className="w-full h-11 mt-2"
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
