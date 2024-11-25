import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchEvents } from "@/lib/supabase-client";
import { FilterControls } from "@/components/FilterControls";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { VideoBackground } from "@/components/VideoBackground";
import { EventsList } from "@/components/EventsList";

const Index = () => {
  const { toast } = useToast();
  const [venueFilter, setVenueFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"date" | "title" | "venue">("date");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events', sortOrder, sortBy],
    queryFn: () => fetchEvents(sortOrder)
  });

  const clearFilters = () => {
    setVenueFilter("");
    setDateRange(undefined);
    setSortOrder("asc");
    setSortBy("date");
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset to default values",
    });
  };

  const hasActiveFilters = Boolean(
    venueFilter || dateRange?.from || dateRange?.to || sortOrder !== "asc" || sortBy !== "date"
  );

  const filteredEvents = events.filter((event) => {
    let matchesVenue = true;
    let matchesDateRange = true;

    if (venueFilter) {
      matchesVenue = event.venue.toLowerCase().includes(venueFilter.toLowerCase());
    }

    if (dateRange?.from && dateRange?.to) {
      const eventDate = parseISO(event.date);
      matchesDateRange = isWithinInterval(eventDate, {
        start: dateRange.from,
        end: dateRange.to,
      });
    }

    return matchesVenue && matchesDateRange;
  }).sort((a, b) => {
    if (sortBy === "title") {
      return sortOrder === "asc" 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortBy === "venue") {
      return sortOrder === "asc"
        ? a.venue.localeCompare(b.venue)
        : b.venue.localeCompare(a.venue);
    }
    return sortOrder === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (error) {
    toast({
      title: "Error loading events",
      description: "Could not load events from the database",
      variant: "destructive",
    });
  }

  return (
    <div className="relative min-h-screen w-full">
      <VideoBackground />
      <div className={cn("relative z-20 py-8 mx-auto text-center flex flex-col min-h-screen w-full px-4 md:px-8")}>
        <img 
          src="/logo.svg" 
          alt="Logo" 
          className="absolute left-4 top-4 w-12 h-12 md:w-16 md:h-16 logo"
        />
        
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in flex-grow-0">
          Discover Your Next Concert in Copenhagen
        </h1>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
          {/* Desktop Filters */}
          <div className="hidden md:block w-full max-w-[1920px] mx-auto">
            <FilterControls
              venueFilter={venueFilter}
              setVenueFilter={setVenueFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortBy={sortBy}
              setSortBy={setSortBy}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden w-full space-y-4">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-white/10 border-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition-colors"
            >
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {showMobileFilters && (
              <div className="animate-fade-in">
                <FilterControls
                  venueFilter={venueFilter}
                  setVenueFilter={setVenueFilter}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  hasActiveFilters={hasActiveFilters}
                  clearFilters={clearFilters}
                />
              </div>
            )}
          </div>

          <EventsList events={filteredEvents} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;