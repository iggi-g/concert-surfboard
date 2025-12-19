import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";
import { SingleEventSchema } from "@/components/EventsSchema";
import { supabase } from "@/integrations/supabase/client";
import { generateEventSlug } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { format, parseISO } from "date-fns";

interface Event {
  title: string;
  date: string;
  link: string | null;
  image: string | null;
  venue: string | null;
  venue_link: string | null;
}

const EventPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const { data: event, isLoading, error } = useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*");

      if (error) throw error;

      // Find event by matching generated slug
      const matchedEvent = data?.find((e: Event) => 
        generateEventSlug(e.title, e.venue || "", e.date) === slug
      );

      if (!matchedEvent) throw new Error("Event not found");
      return matchedEvent as Event;
    },
    enabled: !!slug,
  });

  const { data: relatedEvents } = useQuery({
    queryKey: ["relatedEvents", event?.venue],
    queryFn: async () => {
      if (!event?.venue) return [];
      
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("venue", event.venue)
        .neq("title", event.title)
        .gte("date", new Date().toISOString().split("T")[0])
        .order("date", { ascending: true })
        .limit(4);

      if (error) throw error;
      return data as Event[];
    },
    enabled: !!event?.venue,
  });

  const isFavorite = event ? favorites.includes(event.title) : false;

  const handleToggleFavorite = () => {
    if (!event) return;
    if (isFavorite) {
      setFavorites(favorites.filter((f) => f !== event.title));
    } else {
      setFavorites([...favorites, event.title]);
    }
  };

  const handleAddToCalendar = () => {
    if (!event) return;
    const eventDate = new Date(event.date);
    const dateString = eventDate.toISOString().slice(0, 10).replace(/-/g, "");
    const nextDay = new Date(eventDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const endDateString = nextDay.toISOString().slice(0, 10).replace(/-/g, "");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      details: `Concert at ${event.venue}. Get tickets: ${event.link}`,
      dates: `${dateString}/${endDateString}`,
      location: event.venue || "",
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank");
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "EEEE, MMMM d, yyyy");
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="w-full aspect-video rounded-2xl mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Event Not Found</h1>
          <p className="text-text-secondary mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/")} variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const placeholderImage = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80";

  return (
    <>
      <SEO
        title={`${event.title} at ${event.venue} - ${formatDate(event.date)}`}
        description={`Get tickets for ${event.title} live at ${event.venue} in Copenhagen on ${formatDate(event.date)}. Don't miss this amazing concert!`}
        canonicalUrl={`/event/${slug}`}
        ogImage={event.image || placeholderImage}
      />
      <SingleEventSchema
        event={{
          title: event.title,
          date: event.date,
          venue: event.venue || "Copenhagen",
          link: event.link || undefined,
          image: event.image || undefined,
        }}
      />

      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-text-secondary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all events
          </Link>

          {/* Hero Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-elevated">
            <img
              src={event.image || placeholderImage}
              alt={`${event.title} concert at ${event.venue}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Event Details */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 uppercase tracking-wide">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-text-secondary mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-lg">{formatDate(event.date)}</span>
              </div>
              {event.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg">{event.venue}, Copenhagen</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {event.link && (
                <Button
                  size="lg"
                  onClick={() => window.open(event.link!, "_blank")}
                  className="gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buy Tickets
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                onClick={handleAddToCalendar}
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleToggleFavorite}
                className="gap-2"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current text-primary" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
            </div>
          </div>

          {/* Related Events */}
          {relatedEvents && relatedEvents.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-text-primary mb-6">
                More events at {event.venue}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedEvents.map((relatedEvent) => (
                  <Link
                    key={`${relatedEvent.title}-${relatedEvent.date}`}
                    to={`/event/${generateEventSlug(relatedEvent.title, relatedEvent.venue || "", relatedEvent.date)}`}
                  >
                    <Card className="p-4 hover:shadow-elevated transition-shadow cursor-pointer bg-ui-surface border-ui-border">
                      <h3 className="font-semibold text-text-primary truncate">
                        {relatedEvent.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {formatDate(relatedEvent.date)}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default EventPage;
