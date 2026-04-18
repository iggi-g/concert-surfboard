import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { generateEventSlug } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

const slugify = (v: string) =>
  v.toLowerCase().replace(/[æ]/g, "ae").replace(/[ø]/g, "o").replace(/[å]/g, "a")
    .replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

const VenuePage = () => {
  const { venueSlug } = useParams<{ venueSlug: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["venue", venueSlug],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("date", today)
        .order("date", { ascending: true });
      if (error) throw error;
      const events = (data || []).filter(
        (e: any) => e.venue && slugify(e.venue) === venueSlug
      );
      return { events, venueName: events[0]?.venue || null };
    },
    enabled: !!venueSlug,
  });

  const events = data?.events || [];
  const venueName = data?.venueName;

  if (!isLoading && !venueName) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-text-primary">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Venue not found</h1>
          <Button onClick={() => navigate("/venues")}>See all venues</Button>
        </div>
      </div>
    );
  }

  const venueSchema = venueName
    ? {
        "@context": "https://schema.org",
        "@type": "MusicVenue",
        "name": venueName,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Copenhagen",
          "addressCountry": "DK",
        },
        "url": `https://cphconcerts.com/venues/${venueSlug}`,
      }
    : null;

  return (
    <>
      <SEO
        title={venueName ? `${venueName} Concerts - Upcoming Shows in Copenhagen` : "Venue"}
        description={
          venueName
            ? `See all upcoming concerts at ${venueName} in Copenhagen. ${events.length} live music events with tickets, dates and details.`
            : "Concert venue in Copenhagen"
        }
        canonicalUrl={`/venues/${venueSlug}`}
      />
      {venueName && (
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Venues", url: "/venues" },
            { name: venueName, url: `/venues/${venueSlug}` },
          ]}
        />
      )}
      {venueSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(venueSchema)}</script>
        </Helmet>
      )}

      <div className="min-h-screen bg-background text-text-primary">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <Link to="/venues" className="inline-flex items-center text-text-secondary hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> All venues
          </Link>

          <div className="flex items-start gap-3 mb-2">
            <MapPin className="w-7 h-7 text-primary mt-1" />
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
              Concerts at {venueName}
            </h1>
          </div>
          <p className="text-text-secondary mb-8 max-w-2xl">
            {events.length} upcoming live music {events.length === 1 ? "event" : "events"} at{" "}
            {venueName} in Copenhagen. Browse the full schedule and book tickets directly.
          </p>

          {isLoading ? (
            <p className="text-text-secondary">Loading concerts…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map((e: any) => (
                <Link
                  key={`${e.title}-${e.date}`}
                  to={`/event/${generateEventSlug(e.title, e.venue || "", e.date)}`}
                  className="bg-ui-surface border border-ui-border hover:border-primary rounded-xl p-4 transition-colors group"
                >
                  <h2 className="font-bold text-text-primary group-hover:text-primary transition-colors uppercase">
                    {e.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-text-secondary mt-2">
                    <Calendar className="w-4 h-4" />
                    {(() => {
                      try { return format(parseISO(e.date), "EEE, MMM d, yyyy"); }
                      catch { return e.date; }
                    })()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VenuePage;
