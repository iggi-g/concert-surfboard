import { useState, useEffect } from "react";
import { SpotifyLogin } from "@/components/SpotifyLogin";
import { ConcertCard } from "@/components/ConcertCard";
import { SurpriseButton } from "@/components/SurpriseButton";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { fetchEvents, Event } from "@/lib/supabase-client";
import { useQuery } from "@tanstack/react-query";
import { FilterControls } from "@/components/FilterControls";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const [venueFilter, setVenueFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"date" | "title" | "venue">("date");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data: events = [], isLoading, error, refetch } = useQuery({
    queryKey: ['events', sortOrder, sortBy],
    queryFn: () => fetchEvents(sortOrder)
  });

  const handleTestLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Test Mode Activated",
      description: "You're now viewing the interface as a logged-in user",
    });
  };

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

  const hasActiveFilters = Boolean(venueFilter || dateRange?.from || dateRange?.to || sortOrder !== "asc" || sortBy !== "date");

  const filteredEvents = events.filter((event: Event) => {
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
  }).sort((a: Event, b: Event) => {
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
    // Default sort by date
    return sortOrder === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('video-background', {
        videoId: 'q4xKvHANqjk',
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          mute: 1,
          playlist: 'q4xKvHANqjk',
          start: 40
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          }
        }
      });
    };
  }, []);

  if (error) {
    toast({
      title: "Error loading events",
      description: "Could not load events from the database",
      variant: "destructive",
    });
  }

  return (
    <div className="relative min-h-screen">
      <div className={cn("container relative z-20 py-8 mx-auto text-center flex flex-col min-h-screen")}>
        {/* Logo */}
        <img 
          src="/logo.svg" 
          alt="Logo" 
          className="absolute left-4 top-4 w-12 h-12 md:w-16 md:h-16 logo"
        />
        
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in flex-grow-0">
          Discover Your Next Concert in Copenhagen
        </h1>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
          {!isAuthenticated ? (
            <div className="space-y-4">
              <SpotifyLogin />
              <div className="mt-4">
                <Button 
                  variant="secondary"
                  onClick={handleTestLogin}
                  className="text-sm"
                >
                  View Demo Interface
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Filters */}
              <div className="hidden md:block w-full">
                <FilterControls
                  venueFilter={venueFilter}
                  setVenueFilter={setVenueFilter}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  hasActiveFilters={Boolean(venueFilter || dateRange?.from || dateRange?.to || sortOrder !== "asc" || sortBy !== "date")}
                  clearFilters={clearFilters}
                />
              </div>

              {/* Mobile Filter Button */}
              <div className="md:hidden w-full">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/10 border-white/10 text-white"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter Options
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <FilterControls
                      venueFilter={venueFilter}
                      setVenueFilter={setVenueFilter}
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      sortOrder={sortOrder}
                      setSortOrder={setSortOrder}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      hasActiveFilters={Boolean(venueFilter || dateRange?.from || dateRange?.to || sortOrder !== "asc" || sortBy !== "date")}
                      clearFilters={clearFilters}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mx-auto">
                {isLoading ? (
                  <p className="text-white">Loading events...</p>
                ) : (
                  filteredEvents.map((event: Event, index: number) => (
                    <div key={index} className="flex justify-center">
                      <ConcertCard
                        artist={event.title}
                        date={event.date}
                        venue={event.venue}
                        location={event.location || ""}
                        imageUrl={event.image}
                        ticketUrl={event.link}
                        minutesListened={0}
                      />
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
