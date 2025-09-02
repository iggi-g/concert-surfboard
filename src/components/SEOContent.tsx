import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Music, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const SEOContent = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Content */}
      <section className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Copenhagen's Premier Concert Discovery Platform
        </h2>
        <p className="text-lg text-white/80 mb-6 max-w-3xl mx-auto">
          Discover the best live music events in Copenhagen tonight, this weekend, and beyond. 
          From intimate jazz clubs to massive arena shows, find your next unforgettable concert experience 
          in Denmark's vibrant capital city.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/tonight">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Calendar className="h-4 w-4 mr-2" />
              Tonight's Shows
            </Button>
          </Link>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <MapPin className="h-4 w-4 mr-2" />
            All Venues
          </Button>
        </div>
      </section>

      {/* Popular Venues */}
      <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Music className="h-6 w-6" />
          Popular Concert Venues in Copenhagen
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Vega", description: "Iconic music venue in Vesterbro hosting international and Danish artists" },
            { name: "KB Hallen", description: "Large concert hall perfect for major touring acts and festivals" },
            { name: "DR Koncerthuset", description: "Home of the Danish National Symphony Orchestra" },
            { name: "Store Vega", description: "Historic venue for major concerts and cultural events" },
            { name: "Loppen", description: "Alternative venue in Christiania for indie and experimental music" },
            { name: "Pumpehuset", description: "Intimate venue for rock, metal, and electronic music" }
          ].map((venue) => (
            <Card key={venue.name} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2">{venue.name}</h3>
                <p className="text-sm text-white/70">{venue.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Music Scene Guide */}
      <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="h-6 w-6" />
          Copenhagen Music Scene Guide
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Best Neighborhoods for Live Music</h3>
            <ul className="space-y-2 text-white/80">
              <li><strong>Vesterbro:</strong> Home to Vega and numerous intimate venues</li>
              <li><strong>Nørrebro:</strong> Alternative scene with diverse music styles</li>
              <li><strong>City Center:</strong> Major venues and concert halls</li>
              <li><strong>Christiania:</strong> Unique venues with experimental music</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Concert Types & Genres</h3>
            <ul className="space-y-2 text-white/80">
              <li><strong>Rock & Pop:</strong> International touring acts and Danish bands</li>
              <li><strong>Electronic:</strong> Techno, house, and experimental electronic</li>
              <li><strong>Jazz:</strong> Traditional and contemporary jazz performances</li>
              <li><strong>Classical:</strong> Symphonic and chamber music concerts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Concert Tips for Copenhagen</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-2">Best Times to Attend</h3>
            <p className="text-sm text-white/70">Weekend shows are popular, but weeknight concerts offer intimate experiences</p>
          </div>
          <div className="text-center">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-2">Getting There</h3>
            <p className="text-sm text-white/70">Most venues are accessible by Metro, bus, or bike. Parking can be limited.</p>
          </div>
          <div className="text-center">
            <Music className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-2">Ticket Tips</h3>
            <p className="text-sm text-white/70">Book early for popular acts. Many venues offer last-minute deals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};