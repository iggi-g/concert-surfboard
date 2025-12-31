import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, ArrowUpDown, Heart, Sparkles, X, SlidersHorizontal } from "lucide-react";
import { DateRange } from "react-day-picker";
import { VenueDropdownFilter } from "../VenueDropdownFilter";
import { DateRangeSelector } from "./DateRangeSelector";
import { SortDropdown } from "./SortDropdown";
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

  const handleSurprise = () => {
    if (filteredEvents.length === 0) return;
    const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
    window.open(randomEvent.link, '_blank');
  };

  const activeFilterCount = [
    selectedVenues.length > 0,
    dateRange?.from,
    showFavoritesOnly,
  ].filter(Boolean).length;

  return (
    <div className="flex items-center gap-2">
      {/* Search Input - Flexible */}
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
        <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-left">Filters</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-4 pb-6">
            {/* Venues */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Venues</label>
              <VenueDropdownFilter
                venues={availableVenues}
                selectedVenues={selectedVenues}
                onVenueChange={setSelectedVenues}
                className="w-full"
              />
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Custom Date Range</label>
              <DateRangeSelector
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Sort By</label>
              <SortDropdown
                setSortOrder={setSortOrder}
                setSortBy={setSortBy}
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="flex-1"
              >
                <Heart className={cn("h-4 w-4 mr-2", showFavoritesOnly && "fill-current")} />
                Favorites
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSurprise}
                className="flex-1"
                disabled={filteredEvents.length === 0}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Surprise Me
              </Button>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => {
                  clearFilters();
                  setIsOpen(false);
                }}
                className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
