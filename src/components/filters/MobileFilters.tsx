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
  return <div className="md:hidden w-full space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="relative flex-grow">
            <FilterControls searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedVenues={selectedVenues} setSelectedVenues={setSelectedVenues} availableVenues={availableVenues} dateRange={dateRange} setDateRange={setDateRange} sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy} hasActiveFilters={hasActiveFilters} clearFilters={clearFilters} showFavoritesOnly={showFavoritesOnly} setShowFavoritesOnly={setShowFavoritesOnly} filteredEvents={filteredEvents} isMobile={true} />
          </div>
        </div>
        <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="w-full bg-white/10 border-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition-colors">
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {showMobileFilters && <div className="animate-fade-in">
            <FilterControls searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedVenues={selectedVenues} setSelectedVenues={setSelectedVenues} availableVenues={availableVenues} dateRange={dateRange} setDateRange={setDateRange} sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy} hasActiveFilters={hasActiveFilters} clearFilters={clearFilters} showFavoritesOnly={showFavoritesOnly} setShowFavoritesOnly={setShowFavoritesOnly} filteredEvents={filteredEvents} showOnlyAdvancedFilters={true} />
          </div>}
      </div>
    </div>;
};