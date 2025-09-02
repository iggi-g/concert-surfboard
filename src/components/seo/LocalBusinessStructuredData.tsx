export const LocalBusinessStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CPH Concerts",
    "description": "Copenhagen's premier destination for discovering live concerts and music events",
    "url": "https://cphconcerts.com",
    "logo": "https://cphconcerts.com/lovable-uploads/052e7cca-6bd9-4ed3-a921-c2466fa924e7.png",
    "image": "https://cphconcerts.com/og-image.svg",
    "telephone": "+45-70-20-02-48",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Copenhagen",
      "addressRegion": "Capital Region",
      "addressCountry": "Denmark",
      "addressCountryCode": "DK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.6761",
      "longitude": "12.5683"
    },
    "areaServed": {
      "@type": "City",
      "name": "Copenhagen",
      "containedInPlace": {
        "@type": "Country",
        "name": "Denmark"
      }
    },
    "serviceType": "Concert and Event Discovery",
    "priceRange": "Free",
    "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
    "sameAs": [
      "https://cphconcerts.com"
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};