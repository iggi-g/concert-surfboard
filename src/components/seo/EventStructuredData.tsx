import { format, parseISO } from 'date-fns';

interface Event {
  title: string;
  date: string;
  venue: string;
  location?: string;
  image: string;
  link: string;
  venue_link: string;
}

interface EventStructuredDataProps {
  event: Event;
}

export const EventStructuredData = ({ event }: EventStructuredDataProps) => {
  const eventDate = parseISO(event.date);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": event.title,
    "startDate": event.date,
    "description": `Live concert by ${event.title} at ${event.venue} in Copenhagen`,
    "image": event.image,
    "url": event.link,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.location || "",
        "addressLocality": "Copenhagen",
        "addressCountry": "Denmark"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": event.venue,
      "url": event.venue_link || "https://cphconcerts.com"
    },
    "performer": {
      "@type": "MusicGroup",
      "name": event.title
    },
    "offers": {
      "@type": "Offer",
      "url": event.link,
      "availability": "https://schema.org/InStock",
      "priceCurrency": "DKK"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};

export const generateEventListStructuredData = (events: Event[]) => {
  const eventList = events.slice(0, 20).map(event => ({
    "@type": "MusicEvent",
    "name": event.title,
    "startDate": event.date,
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Copenhagen",
        "addressCountry": "Denmark"
      }
    },
    "url": event.link
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Copenhagen Concerts",
    "description": "Live music events and concerts in Copenhagen",
    "itemListElement": eventList.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": event
    }))
  };
};