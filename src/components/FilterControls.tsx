import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { VenueCheckboxFilter } from "./VenueCheckboxFilter";
import { SurpriseButton } from "./SurpriseButton";
import { SearchInput } from "./filters/SearchInput";
import { FavoritesToggle } from "./filters/FavoritesToggle";
import { DateRangeSelector } from "./filters/DateRangeSelector";
import { SortDropdown } from "./filters/SortDropdown";

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
}: FilterControlsProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center justify-end gap-2 sm:gap-3">
        <SearchInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="w-full sm:w-auto"
        />

        <FavoritesToggle
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          className="w-full sm:w-auto"
        />

        <SurpriseButton className="w-full sm:w-auto" />

        <VenueCheckboxFilter
          venues={availableVenues}
          selectedVenues={selectedVenues}
          onVenueChange={setSelectedVenues}
          className="w-full sm:w-auto"
        />
        
        <DateRangeSelector
          dateRange={dateRange}
          setDateRange={setDateRange}
          className="w-full sm:w-auto"
        />

        <SortDropdown
          setSortOrder={setSortOrder}
          setSortBy={setSortBy}
          className="w-full sm:w-auto"
        />

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full sm:w-auto bg-white/10 border-white/10 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};