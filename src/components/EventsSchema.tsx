import { Helmet } from "react-helmet-async";

interface Event {
  title: string;
  date: string;
  venue: string;
  link?: string | null;
  image?: string | null;
}

interface EventsSchemaProps {
  events: Event[];
}

export const EventsSchema = ({ events }: EventsSchemaProps) => {
  // Generate MusicEvent schema for each event
  const eventSchemas = events.slice(0, 50).map((event, index) => ({
    "@type": "MusicEvent",
    "name": event.title,
    "startDate": event.date,
    "location": {
      "@type": "Place",
      "name": event.venue || "Copenhagen Venue",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Copenhagen",
        "addressCountry": "DK"
      }
    },
    ...(event.image && { "image": event.image }),
    ...(event.link && {
      "offers": {
        "@type": "Offer",
        "url": event.link,
        "availability": "https://schema.org/InStock"
      }
    }),
    "performer": {
      "@type": "PerformingGroup",
      "name": event.title.split(" - ")[0] || event.title
    }
  }));

  // Generate ItemList schema for the event listing
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Upcoming Concerts in Copenhagen",
    "description": "List of upcoming live music events and concerts in Copenhagen, Denmark",
    "numberOfItems": events.length,
    "itemListElement": events.slice(0, 50).map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "MusicEvent",
        "name": event.title,
        "startDate": event.date,
        "location": {
          "@type": "Place",
          "name": event.venue || "Copenhagen Venue"
        },
        ...(event.link && { "url": event.link })
      }
    }))
  };

  // Main organization/website schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CPH Concerts",
    "url": "https://cphconcerts.com",
    "logo": "https://cphconcerts.com/lovable-uploads/052e7cca-6bd9-4ed3-a921-c2466fa924e7.png",
    "description": "Your guide to live concerts and music events in Copenhagen",
    "areaServed": {
      "@type": "City",
      "name": "Copenhagen",
      "containedInPlace": {
        "@type": "Country",
        "name": "Denmark"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(itemListSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

// Single event schema for individual event pages (future use)
export const SingleEventSchema = ({ event }: { event: Event }) => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": event.title,
    "startDate": event.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.venue || "Copenhagen Venue",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Copenhagen",
        "addressRegion": "Capital Region of Denmark",
        "addressCountry": "DK"
      }
    },
    ...(event.image && { "image": [event.image] }),
    ...(event.link && {
      "offers": {
        "@type": "Offer",
        "url": event.link,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      }
    }),
    "performer": {
      "@type": "PerformingGroup",
      "name": event.title.split(" - ")[0] || event.title
    },
    "organizer": {
      "@type": "Organization",
      "name": "CPH Concerts",
      "url": "https://cphconcerts.com"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
    </Helmet>
  );
};
