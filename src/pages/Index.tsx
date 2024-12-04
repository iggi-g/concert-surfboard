import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchEvents } from "@/lib/supabase-client";
import { FilterControls } from "@/components/FilterControls";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { VideoBackground } from "@/components/VideoBackground";
import { EventsList } from "@/components/EventsList";
import { ContactButton } from "@/components/ContactButton";

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"date" | "title" | "venue">("date");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events', sortOrder, sortBy],
    queryFn: () => fetchEvents(sortOrder),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const availableVenues = useMemo(() => 
    Array.from(new Set(events.map(event => event.venue))).sort(),
    [events]
  );

  const getHeadlineText = (filteredCount: number) => {
    if (dateRange?.from && dateRange?.to) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextWeekStart = new Date(today);
      nextWeekStart.setDate(today.getDate() + 7);
      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekStart.getDate() + 7);
      const monthEnd = new Date(today);
      monthEnd.setMonth(today.getMonth() + 1);

      if (dateRange.from.getTime() === today.getTime() && dateRange.to.getTime() === today.getTime()) {
        return `Copenhagen Concerts - there are ${filteredCount} to choose from today!`;
      } else if (
        dateRange.from.getTime() === nextWeekStart.getTime() && 
        dateRange.to.getTime() === nextWeekEnd.getTime()
      ) {
        return `Copenhagen Concerts - there are ${filteredCount} to choose from next week!`;
      } else if (
        dateRange.from.getTime() === today.getTime() && 
        dateRange.to.getTime() === monthEnd.getTime()
      ) {
        return `Copenhagen Concerts - there are ${filteredCount} to choose from this month!`;
      } else {
        return `Copenhagen Concerts - there are ${filteredCount} to choose from in your selected dates!`;
      }
    }
    return `Copenhagen Concerts - there are ${filteredCount} to choose from!`;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedVenues([]);
    setDateRange(undefined);
    setSortOrder("asc");
    setSortBy("date");
    setShowFavoritesOnly(false);
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset to default values",
    });
  };

  const hasActiveFilters = Boolean(
    searchQuery || selectedVenues.length > 0 || dateRange?.from || dateRange?.to || sortOrder !== "asc" || sortBy !== "date" || showFavoritesOnly
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      let matchesSearch = true;
      let matchesVenue = true;
      let matchesDateRange = true;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        matchesSearch = 
          event.title.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query) ||
          event.date.toLowerCase().includes(query);
      }

      if (selectedVenues.length > 0) {
        matchesVenue = selectedVenues.includes(event.venue);
      }

      if (dateRange?.from && dateRange?.to) {
        const eventDate = parseISO(event.date);
        matchesDateRange = isWithinInterval(eventDate, {
          start: dateRange.from,
          end: dateRange.to,
        });
      }

      return matchesSearch && matchesVenue && matchesDateRange;
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
  }, [events, searchQuery, selectedVenues, dateRange, sortOrder, sortBy]);

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
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in flex-grow-0">
          {getHeadlineText(filteredEvents.length).replace(/(\d+)/, '<span class="text-[#F97316]">$1</span>')}
        </h1>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
          <div className="hidden md:block w-full max-w-[1920px] mx-auto">
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
            />
          </div>

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
                />
              </div>
            )}
          </div>

          <EventsList 
            events={filteredEvents} 
            isLoading={isLoading}
            showFavoritesOnly={showFavoritesOnly}
          />
        </div>
      </div>
      <ContactButton />
    </div>
  );
};

export default Index;