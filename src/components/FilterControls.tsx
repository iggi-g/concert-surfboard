
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { VenueDropdownFilter } from "./VenueDropdownFilter";
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
  isMobile?: boolean;
  showOnlyAdvancedFilters?: boolean;
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
  isMobile,
  showOnlyAdvancedFilters,
}: FilterControlsProps) => {
  if (showOnlyAdvancedFilters) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col gap-2">
          <VenueDropdownFilter
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
              className="bg-ui-surface border border-ui-border text-text-primary hover:bg-ui-surface/80 hover:border-primary/50 shadow-card font-medium"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full space-y-2">
        <SearchInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex gap-2">
          <FavoritesToggle
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
          />

          <SurpriseButton filteredEvents={filteredEvents} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-2xl">
          <SearchInput 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="flex items-center gap-2">
          <FavoritesToggle
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
          />

          <SurpriseButton filteredEvents={filteredEvents} />
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <VenueDropdownFilter
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
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="bg-ui-surface border border-ui-border text-text-primary hover:bg-ui-surface/80 hover:border-primary/50 shadow-card font-medium"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
