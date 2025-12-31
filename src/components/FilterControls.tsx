import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { VenueDropdownFilter } from "./VenueDropdownFilter";
import { DateRangeSelector } from "./filters/DateRangeSelector";
import { SortDropdown } from "./filters/SortDropdown";
import { TimeFilterTabs } from "./filters/TimeFilterTabs";
import { UtilityTools } from "./filters/UtilityTools";
import { MobileFilterBar } from "./filters/MobileFilterBar";
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
  onPopularEventClick?: (title: string, date: string, venue: string) => void;
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
      <div className="w-full max-w-6xl mx-auto space-y-xs">
        <div className="flex flex-col gap-xs">
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

  // Mobile Layout - Compact
  if (isMobile) {
    return (
      <div className="w-full space-y-2">
        {/* Time Filter Tabs - Scrollable */}
        <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
          <TimeFilterTabs dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        {/* Search + Filter Button Row */}
        <MobileFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedVenues={selectedVenues}
          setSelectedVenues={setSelectedVenues}
          availableVenues={availableVenues}
          dateRange={dateRange}
          setDateRange={setDateRange}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          filteredEvents={filteredEvents}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />
      </div>
    );
  }

  // Desktop Layout - Two rows
  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Row 1: Time Filter Tabs */}
      <div className="flex justify-start">
        <TimeFilterTabs dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      {/* Row 2: Utility Tools */}
      <UtilityTools
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedVenues={selectedVenues}
        setSelectedVenues={setSelectedVenues}
        availableVenues={availableVenues}
        dateRange={dateRange}
        setDateRange={setDateRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        filteredEvents={filteredEvents}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />
    </div>
  );
};
