import { FilterControls } from "@/components/FilterControls";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";

interface MobileFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
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
  filteredEvents: any[];
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
}

export const MobileFilters = ({
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
  showMobileFilters,
  setShowMobileFilters
}: MobileFiltersProps) => {
  return (
    <div className="md:hidden w-full space-y-xs">
      {/* Search and Basic Controls */}
      <FilterControls
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
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        filteredEvents={filteredEvents}
        isMobile={true}
      />
      
      {/* Show Filters Button */}
      <Button
        variant="outline"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="w-full"
      >
        {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>
      
      {/* Advanced Filters */}
      {showMobileFilters && (
        <div className="animate-fade-in">
          <FilterControls
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
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
            filteredEvents={filteredEvents}
            showOnlyAdvancedFilters={true}
          />
        </div>
      )}
    </div>
  );
};