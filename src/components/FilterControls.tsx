import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Filter, Calendar as CalendarIcon, X, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { VenueCheckboxFilter } from "./VenueCheckboxFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

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
  const today = new Date();
  
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
        <div className="relative flex-grow max-w-md">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/50 pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={cn(
            "bg-white/10 border-white/10 text-white hover:bg-white/20",
            showFavoritesOnly && "bg-white/20"
          )}
        >
          <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? 'fill-current text-red-500' : ''}`} />
          Favorites
        </Button>

        <VenueCheckboxFilter
          venues={availableVenues}
          selectedVenues={selectedVenues}
          onVenueChange={setSelectedVenues}
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-white/10 border-white/10 text-white hover:bg-white/20",
                dateRange?.from && "text-white"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={today}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              fromDate={today}
            />
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white/10 border-white/10 text-white hover:bg-white/20">
              <Filter className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("asc"); }}>
              Date (Earliest First)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("desc"); }}>
              Date (Latest First)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("asc"); }}>
              Artist Name (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("desc"); }}>
              Artist Name (Z-A)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("asc"); }}>
              Venue Name (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSortBy("venue"); setSortOrder("desc"); }}>
              Venue Name (Z-A)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="bg-white/10 border-white/10 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
