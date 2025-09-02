import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/supabase-client";
import { isToday, parseISO } from "date-fns";
import { VideoBackground } from "@/components/VideoBackground";
import { EventsList } from "@/components/EventsList";
import { PageContainer } from "@/components/layout/PageContainer";
import { SEOHead } from "@/components/seo/SEOHead";
import { generateEventListStructuredData } from "@/components/seo/EventStructuredData";
import { LocalBusinessStructuredData } from "@/components/seo/LocalBusinessStructuredData";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TonightsConcerts = () => {
  const { data: eventsResponse, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents('asc'),
  });

  const events = eventsResponse?.events || [];
  const tonightsEvents = events.filter(event => isToday(parseISO(event.date)));
  
  const seoTitle = tonightsEvents.length > 0 
    ? `${tonightsEvents.length} Concerts Tonight in Copenhagen | Live Music Today`
    : "Concerts Tonight in Copenhagen | Live Music Events Today";
  
  const seoDescription = tonightsEvents.length > 0
    ? `Find ${tonightsEvents.length} amazing concerts happening tonight in Copenhagen. Live music events at Vega, KB Hallen, DR Koncerthuset and more venues. Get tickets now!`
    : "Discover live concerts happening tonight in Copenhagen. Check back daily for the latest music events at Copenhagen's best venues.";

  const structuredData = tonightsEvents.length > 0 
    ? generateEventListStructuredData(tonightsEvents)
    : null;

  return (
    <PageContainer>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords="concerts tonight Copenhagen, live music Copenhagen today, Copenhagen concerts today, music events tonight, live shows Copenhagen tonight"
        url="https://cphconcerts.com/tonight"
        structuredData={structuredData}
      />
      <LocalBusinessStructuredData />
      <VideoBackground />
      
      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
        <div className="w-full max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to all concerts
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Tonight's Concerts
            </h1>
            <p className="text-xl text-white/80 mb-2">
              {tonightsEvents.length > 0 
                ? `${tonightsEvents.length} live music event${tonightsEvents.length === 1 ? '' : 's'} happening tonight in Copenhagen`
                : "No concerts scheduled for tonight"}
            </p>
            <p className="text-white/60">
              Copenhagen's live music scene today
            </p>
          </div>
        </div>

        <EventsList 
          events={tonightsEvents} 
          isLoading={isLoading}
          showFavoritesOnly={false}
        />
        
        {tonightsEvents.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-white/80 text-lg mb-4">
              No concerts scheduled for tonight, but check back tomorrow!
            </p>
            <Link 
              to="/" 
              className="text-primary hover:text-primary/80 underline text-lg"
            >
              View all upcoming concerts
            </Link>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default TonightsConcerts;