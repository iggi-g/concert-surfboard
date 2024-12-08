import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { VenueCheckboxFilter } from "./VenueCheckboxFilter";
import { SurpriseButton } from "./SurpriseButton";
import { SearchInput } from "./filters/SearchInput";
import { FavoritesToggle } from "./filters/FavoritesToggle";
import { DateRangeSelector } from "./filters/DateRangeSelector";
import { SortDropdown } from "./filters/SortDropdown";
import { Event } from "@/lib/supabase-client";

interface FilterControlsProps {
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
  hasActiveFilters: boolean;
  clearFilters: () => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  filteredEvents: Event[];
  favoriteEvents: Event[];
}

export const FilterControls = ({
  searchQuery,
  setSearchQuery,
  selectedVenues,
  setSelectedVenues,
  availableVenues,
  dateRange,
  setDateRange,
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy,
  hasActiveFilters,
  clearFilters,
  showFavoritesOnly,
  setShowFavoritesOnly,
  filteredEvents,
  favoriteEvents,
}: FilterControlsProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-nowrap items-center justify-end gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        <SearchInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="min-w-[200px] sm:min-w-[300px]"
        />

        <FavoritesToggle
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
        />

        <SurpriseButton 
          filteredEvents={showFavoritesOnly ? favoriteEvents : filteredEvents} 
        />

        <VenueCheckboxFilter
          venues={availableVenues}
          selectedVenues={selectedVenues}
          onVenueChange={setSelectedVenues}
        />
        
        <DateRangeSelector
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <SortDropdown
          setSortOrder={setSortOrder}
          setSortBy={setSortBy}
        />

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="bg-white/10 border-white/10 text-white hover:bg-white/20 whitespace-nowrap"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};