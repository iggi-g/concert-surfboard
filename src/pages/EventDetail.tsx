import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/lib/supabase-client';
import { PageContainer } from '@/components/layout/PageContainer';
import { VideoBackground } from '@/components/VideoBackground';
import { SEOHead } from '@/components/seo/SEOHead';
import { EventStructuredData } from '@/components/seo/EventStructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, ExternalLink, ArrowLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  
  const { data: eventsResponse, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents('asc'),
  });

  const events = eventsResponse?.events || [];
  const event = events.find(e => 
    e.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + 
    format(parseISO(e.date), 'yyyy-MM-dd') === eventId
  );

  if (isLoading) {
    return (
      <PageContainer>
        <VideoBackground />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading event details...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!event) {
    return <Navigate to="/" replace />;
  }

  const eventDate = parseISO(event.date);
  const formattedDate = format(eventDate, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');
  
  const seoTitle = `${event.title} Concert - ${formattedDate} at ${event.venue} | Copenhagen Concerts`;
  const seoDescription = `Experience ${event.title} live at ${event.venue} in Copenhagen on ${formattedDate}. Get tickets now for this amazing concert in Denmark's capital.`;
  const eventUrl = `https://cphconcerts.com/event/${eventId}`;

  return (
    <PageContainer>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={`${event.title} concert, ${event.venue} events, Copenhagen concerts ${format(eventDate, 'yyyy')}, live music Copenhagen, concert tickets Copenhagen`}
        url={eventUrl}
        type="event"
      />
      <EventStructuredData event={event} />
      <VideoBackground />
      
      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto px-4">
        <div className="w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to all concerts
          </Link>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/10 text-white overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={event.image}
                alt={`${event.title} concert poster`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate} at {formattedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Event Details</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-white/90">
                    <div>
                      <p><strong>Artist:</strong> {event.title}</p>
                      <p><strong>Venue:</strong> {event.venue}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                    </div>
                    <div>
                      <p><strong>Date:</strong> {formattedDate}</p>
                      <p><strong>Time:</strong> {formattedTime}</p>
                      <p><strong>City:</strong> Copenhagen, Denmark</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Concert</h2>
                  <p className="text-white/90 leading-relaxed">
                    Join us for an unforgettable evening with {event.title} at {event.venue} in Copenhagen. 
                    This highly anticipated concert promises to deliver an exceptional live music experience 
                    in one of Copenhagen's premier venues. Don't miss this opportunity to see {event.title} 
                    perform live in Denmark's vibrant capital city.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Venue Information</h2>
                  <p className="text-white/90 mb-4">
                    {event.venue} is located at {event.location} in Copenhagen. This venue is known for 
                    hosting world-class musical performances and providing an intimate concert experience 
                    for music lovers in Copenhagen.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    asChild
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <a 
                      href={event.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Buy Tickets
                    </a>
                  </Button>
                  
                  {event.venue_link && (
                    <Button 
                      asChild
                      variant="outline"
                      size="lg"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      <a 
                        href={event.venue_link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        Venue Details
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default EventDetail;