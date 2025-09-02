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
import { SEOHead } from "@/components/seo/SEOHead";
import { generateEventListStructuredData } from "@/components/seo/EventStructuredData";
import { LocalBusinessStructuredData } from "@/components/seo/LocalBusinessStructuredData";

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

  console.log('Index - Total events from database:', events.length);
  console.log('Index - Has more events:', hasMoreEvents);
  console.log('Index - Total in database:', totalEvents);

  // Generate dynamic SEO content based on filters
  const getPageTitle = () => {
    if (showFavoritesOnly) return "Your Favorite Concerts in Copenhagen | CPH Concerts";
    if (searchQuery) return `${searchQuery} Concerts in Copenhagen | Live Music Events`;
    if (selectedVenues.length === 1) return `Concerts at ${selectedVenues[0]} Copenhagen | Live Music Events`;
    return "Copenhagen Concerts 2024 | Live Music Events Tonight | ConcertsCPH";
  };

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

  const getPageDescription = () => {
    const count = filteredEvents.length;
    if (showFavoritesOnly) return `Your ${count} favorite concert${count === 1 ? '' : 's'} in Copenhagen. Never miss your preferred artists and venues.`;
    if (searchQuery) return `Find ${count} concert${count === 1 ? '' : 's'} matching "${searchQuery}" in Copenhagen. Live music events tonight, tomorrow & beyond.`;
    if (selectedVenues.length === 1) return `${count} upcoming concert${count === 1 ? '' : 's'} at ${selectedVenues[0]} in Copenhagen. Book tickets for live music events.`;
    return `Find the best live concerts in Copenhagen tonight, this weekend & beyond. ${hasMoreEvents ? 'More than 1000' : totalEvents}+ events from Vega, KB Hallen, DR Koncerthuset & more venues.`;
  };

  const getPageKeywords = () => {
    let keywords = "concerts Copenhagen, live music Copenhagen tonight, Copenhagen concerts today, music events Copenhagen";
    if (searchQuery) keywords += `, ${searchQuery} concerts Copenhagen, ${searchQuery} live music`;
    if (selectedVenues.length > 0) keywords += `, ${selectedVenues.join(' concerts, ')} concerts`;
    return keywords + ", concert tickets Copenhagen, Danish concerts, live entertainment Copenhagen";
  };

  const structuredData = filteredEvents.length > 0 ? generateEventListStructuredData(filteredEvents) : null;

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


  console.log('Index - Filtered events count:', filteredEvents.length);
  console.log('Index - Search query:', searchQuery);
  console.log('Index - Selected venues:', selectedVenues);
  console.log('Index - Date range:', dateRange);
  console.log('Index - Show favorites only:', showFavoritesOnly);

  return (
    <PageContainer>
      <SEOHead
        title={getPageTitle()}
        description={getPageDescription()}
        keywords={getPageKeywords()}
        structuredData={structuredData}
      />
      <LocalBusinessStructuredData />
      {/* Add SEO content for better search ranking */}
      <div className="sr-only">
        <h1>Copenhagen Concerts 2024 - Live Music Events Tonight</h1>
        <p>Find the best concerts in Copenhagen today, tonight, and this weekend. Over 1000 live music events from top venues like Vega, KB Hallen, and DR Koncerthuset.</p>
      </div>
      <VideoBackground />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
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
          className="fixed bottom-20 right-4 rounded-full bg-white/10 border-white/10 text-orange-500 hover:bg-white/20 z-50"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </PageContainer>
  );
};

export default Index;
