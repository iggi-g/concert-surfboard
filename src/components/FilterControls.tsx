import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { VenueDropdownFilter } from "./VenueDropdownFilter";
import { SurpriseButton } from "./SurpriseButton";
import { SearchInput } from "./filters/SearchInput";
import { FavoritesToggle } from "./filters/FavoritesToggle";
import { DateRangeSelector } from "./filters/DateRangeSelector";
import { SortDropdown } from "./filters/SortDropdown";
import { TimeFilterTabs } from "./filters/TimeFilterTabs";
import { UtilityTools } from "./filters/UtilityTools";
import { Event } from "@/lib/supabase-client";
import { useState } from "react";

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
  onPopularEventClick,
}: FilterControlsProps) => {
  const [showMobileTools, setShowMobileTools] = useState(false);

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

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="w-full space-y-3">
        {/* Time Filter Tabs - Scrollable */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <TimeFilterTabs dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        {/* Search Input */}
        <SearchInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Filter Toggle Button */}
        <Button
          variant="outline"
          onClick={() => setShowMobileTools(!showMobileTools)}
          className="w-full h-9 text-sm text-muted-foreground border-muted-foreground/20"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showMobileTools ? "Hide Filters" : "More Filters"}
          {hasActiveFilters && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
              Active
            </span>
          )}
        </Button>

        {/* Collapsible Tools */}
        {showMobileTools && (
          <div className="flex flex-col gap-2 animate-fade-in">
            <div className="flex gap-2">
              <FavoritesToggle
                showFavoritesOnly={showFavoritesOnly}
                setShowFavoritesOnly={setShowFavoritesOnly}
              />
              <SurpriseButton filteredEvents={filteredEvents} className="flex-1" />
            </div>
            
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
                className="w-full h-9 text-sm text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            )}
          </div>
        )}
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
