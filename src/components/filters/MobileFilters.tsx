import { FilterControls } from "@/components/FilterControls";
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
    <div className="md:hidden w-full space-y-2">
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
      <button 
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="w-full h-[46px] px-4 py-3 bg-ui-surface border border-ui-border text-text-primary hover:bg-ui-surface/80 hover:border-primary/50 transition-all shadow-card font-semibold text-sm rounded-xl flex items-center justify-center"
      >
        <span className="leading-none">{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
      </button>
      
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