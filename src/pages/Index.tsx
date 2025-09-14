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
      
      {/* Mobile Hero Section */}
      <div className="min-h-[65vh] md:min-h-[48vh] lg:min-h-[56vh] flex flex-col relative">
        <PageHeader 
          filteredEventsCount={filteredEvents.length}
          showFavoritesOnly={showFavoritesOnly}
          hasMoreEvents={hasMoreEvents}
          totalEvents={totalEvents}
          hasActiveFilters={hasActiveFilters}
        />
        
        {/* Hero Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-1 pt-1 md:pt-2">
          <div className="text-center space-y-1">
            <h1 className="text-text-primary font-black text-[34px] md:text-[44px] lg:text-[48px] leading-[1.0] tracking-[-0.8px] uppercase animate-fade-in">
              Concerts in Copenhagen
            </h1>
            <p className="text-[15px] md:text-lg leading-[1.2] tracking-[-0.3px] font-semibold text-primary animate-fade-in">
              {(() => {
                if (showFavoritesOnly) {
                  return `${filteredEvents.length} favorite ${filteredEvents.length === 1 ? 'concert' : 'concerts'} available`;
                }
                
                if (hasActiveFilters) {
                  return `${filteredEvents.length} ${filteredEvents.length === 1 ? 'concert' : 'concerts'} available`;
                }
                
                if (hasMoreEvents && totalEvents > 1000) {
                  return `More than 1000 concerts available`;
                }
                
                return `${filteredEvents.length} ${filteredEvents.length === 1 ? 'concert' : 'concerts'} available`;
              })()}
            </p>
          </div>
        </div>
        
        {/* Search and Controls - Anchored at bottom of hero */}
        <div className="px-6 pb-6 mt-2 space-y-3 relative z-10">
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
        </div>
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block px-6 mb-4">
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
      </div>

      {/* Events List - With peek effect on mobile */}
      <div className="relative" style={{ marginTop: '-16px' }}>
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
          className="fixed bottom-20 right-4 rounded-full bg-ui-surface/80 border-ui-border text-primary hover:bg-ui-surface hover:text-primary-glow hover:border-primary/50 hover:shadow-glow backdrop-blur-sm shadow-elevated z-50"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </PageContainer>
  );
};

export default Index;
