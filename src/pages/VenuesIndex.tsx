import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const venueSlug = (v: string) => v.toLowerCase().replace(/[æ]/g, "ae").replace(/[ø]/g, "o").replace(/[å]/g, "a").replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

const VenuesIndex = () => {
  const { data: venues = [], isLoading } = useQuery({
    queryKey: ["venues"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("events")
        .select("venue")
        .gte("date", today)
        .not("venue", "is", null);
      if (error) throw error;
      const counts = new Map<string, number>();
      (data || []).forEach((e: any) => {
        if (e.venue) counts.set(e.venue, (counts.get(e.venue) || 0) + 1);
      });
      return Array.from(counts.entries())
        .map(([venue, count]) => ({ venue, count }))
        .sort((a, b) => b.count - a.count);
    },
  });

  return (
    <>
      <SEO
        title="All Concert Venues in Copenhagen"
        description="Browse every live music venue in Copenhagen. See upcoming concerts at Vega, Pumpehuset, DR Koncerthuset, Royal Arena, Amager Bio and dozens more."
        canonicalUrl="/venues"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Venues", url: "/venues" },
        ]}
      />
      <div className="min-h-screen bg-background text-text-primary">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-text-secondary hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all concerts
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            Concert Venues in Copenhagen
          </h1>
          <p className="text-text-secondary mb-8 max-w-2xl">
            Explore every live music venue in Copenhagen with upcoming concerts. From
            arenas to intimate clubs, find your next favourite show.
          </p>

          {isLoading ? (
            <p className="text-text-secondary">Loading venues…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.map(({ venue, count }) => (
                <Link
                  key={venue}
                  to={`/venues/${venueSlug(venue)}`}
                  className="bg-ui-surface border border-ui-border hover:border-primary rounded-xl p-5 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h2 className="font-bold text-text-primary group-hover:text-primary transition-colors">
                        {venue}
                      </h2>
                      <p className="text-sm text-text-secondary mt-1">
                        {count} upcoming {count === 1 ? "concert" : "concerts"}
                      </p>
                    </div>
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

export default VenuesIndex;
