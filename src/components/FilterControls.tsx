import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Filter, Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
  venueFilter: string;
  setVenueFilter: (value: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  sortBy: "date" | "title" | "venue";
  setSortBy: (by: "date" | "title" | "venue") => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export const FilterControls = ({
  venueFilter,
  setVenueFilter,
  dateRange,
  setDateRange,
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy,
  hasActiveFilters,
  clearFilters,
}: FilterControlsProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
        <Input
          placeholder="Filter by venue..."
          value={venueFilter}
          onChange={(e) => setVenueFilter(e.target.value)}
          className="max-w-[200px] bg-white/10 border-white/10 text-white placeholder:text-white/50"
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
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
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