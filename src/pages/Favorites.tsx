
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { EventsList } from "@/components/EventsList";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/supabase-client";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Favorites = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
    staleTime: 0, // Set staleTime to 0 to always get fresh data
    refetchOnWindowFocus: true,
  });

  return (
    <PageContainer>
      <div className="w-full max-w-[1920px] mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-white hover:text-orange-500 transition-colors inline-flex items-center gap-2 text-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to All Concerts
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Your Favorite Concerts</h1>
        </div>
        <EventsList events={events} isLoading={isLoading} showFavoritesOnly={true} />
      </div>
    </PageContainer>
  );
};

export default Favorites;
