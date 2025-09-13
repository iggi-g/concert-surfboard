import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchEvents } from "@/lib/supabase-client";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { VideoBackground } from "@/components/VideoBackground";
import { EventsList } from "@/components/EventsList";
import { ContactButton } from "@/components/ContactButton";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PageContainer } from "@/components/layout/PageContainer";
import { MobileFilters } from "@/components/filters/MobileFilters";
import { DesktopFilters } from "@/components/filters/DesktopFilters";

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"date" | "title" | "venue">("date");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [favorites] = useLocalStorage<string[]>("favorites", []);

  const { data: eventsResponse, isLoading } = useQuery({
    queryKey: ['events', sortOrder, sortBy],
    queryFn: () => fetchEvents(sortOrder),
    staleTime: 0, // Set staleTime to 0 to always get fresh data
    refetchOnWindowFocus: true,
  });

  const events = eventsResponse?.events || [];
  const hasMoreEvents = eventsResponse?.hasMore || false;
  const totalEvents = eventsResponse?.total || 0;

  // Add debugging to see what's happening
  console.log('Index - Total events from database:', events.length);
  console.log('Index - Has more events:', hasMoreEvents);
  console.log('Index - Total in database:', totalEvents);

  const handleScroll = useCallback(() => {
    setShowScrollToTop(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const availableVenues = Array.from(new Set(events.map(event => event.venue))).sort();

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
    searchQuery || 
    selectedVenues.length > 0 || 
    dateRange?.from || 
    dateRange?.to || 
    sortOrder !== "asc" || 
    sortBy !== "date" || 
    showFavoritesOnly
  );

  const filteredEvents = events.filter((event) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!event.title.toLowerCase().includes(query) &&
          !event.venue.toLowerCase().includes(query) &&
          !event.date.toLowerCase().includes(query) &&
          !(event.location || "").toLowerCase().includes(query)) {
        return false;
      }
    }

    if (selectedVenues.length > 0 && !selectedVenues.includes(event.venue)) {
      return false;
    }

    if (dateRange?.from && dateRange?.to) {
      const eventDate = parseISO(event.date);
      if (!isWithinInterval(eventDate, {
        start: dateRange.from,
        end: dateRange.to,
      })) {
        return false;
      }
    }

    if (showFavoritesOnly && !favorites.includes(event.title)) {
      return false;
    }

    return true;
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

  console.log('Index - Filtered events count:', filteredEvents.length);
  console.log('Index - Search query:', searchQuery);
  console.log('Index - Selected venues:', selectedVenues);
  console.log('Index - Date range:', dateRange);
  console.log('Index - Show favorites only:', showFavoritesOnly);

  return (
    <PageContainer>
      <VideoBackground />
      <div className="flex-1 flex flex-col items-center justify-center gap-12 w-full">
        <PageHeader 
          filteredEventsCount={filteredEvents.length}
          showFavoritesOnly={showFavoritesOnly}
          hasMoreEvents={hasMoreEvents}
          totalEvents={totalEvents}
          hasActiveFilters={hasActiveFilters}
        />

        <DesktopFilters
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
        />

        <MobileFilters
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
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />

        <EventsList 
          events={filteredEvents} 
          isLoading={isLoading}
          showFavoritesOnly={showFavoritesOnly}
        />
      </div>

      <ContactButton />
      
      {showScrollToTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-20 right-4 rounded-full bg-surface-elevated/80 border-border/50 text-primary hover:bg-surface-elevated hover:text-primary-glow backdrop-blur-sm shadow-elevated z-50"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </PageContainer>
  );
};

export default Index;
