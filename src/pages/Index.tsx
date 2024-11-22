import { useState, useEffect } from "react";
import { SpotifyLogin } from "@/components/SpotifyLogin";
import { ConcertCard } from "@/components/ConcertCard";
import { SurpriseButton } from "@/components/SurpriseButton";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { fetchEvents, Event } from "@/lib/supabase-client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const [selectedVenue, setSelectedVenue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const { data: events = [], isLoading, error, refetch } = useQuery({
    queryKey: ['events', sortOrder],
    queryFn: () => fetchEvents(sortOrder)
  });

  const handleTestLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Test Mode Activated",
      description: "You're now viewing the interface as a logged-in user",
    });
  };

  const uniqueVenues = Array.from(new Set(events.map((event: Event) => event.venue))).sort();

  const filteredEvents = events.filter((event: Event) => {
    const matchesVenue = !selectedVenue || event.venue === selectedVenue;
    const matchesDate = !selectedDate || format(new Date(event.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    return matchesVenue && matchesDate;
  });

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      new YT.Player('video-background', {
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
      <div className="container relative z-20 py-8 mx-auto text-center flex flex-col min-h-screen">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in flex-grow-0">
          Discover Your Next Concert
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
              <div className="w-full max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-end gap-4">
                  <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                    <SelectTrigger className="w-[200px] bg-white/10 border-white/10 text-white">
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All venues</SelectItem>
                      {uniqueVenues.map((venue) => (
                        <SelectItem key={venue} value={venue}>
                          {venue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="bg-white/10 border-white/10 text-white hover:bg-white/20">
                        {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-white/10 border-white/10 text-white hover:bg-white/20">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                        Earliest First
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOrder("desc")}>
                        Latest First
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <SurpriseButton />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
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
                        venueLink={event.venueLink}
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