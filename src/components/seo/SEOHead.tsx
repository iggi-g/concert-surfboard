import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export const SEOHead = ({
  title = "Copenhagen Concerts 2024 | Live Music Events Tonight | ConcertsCPH",
  description = "Find the best live concerts in Copenhagen tonight, this weekend & beyond. 1000+ events from Vega, KB Hallen, DR Koncerthuset & more venues. Your #1 guide to Copenhagen's music scene.",
  keywords = "concerts Copenhagen, live music Copenhagen tonight, Copenhagen concerts today, music events Copenhagen, live shows Copenhagen, concert tickets Copenhagen, Vega concerts, KB Hallen events, DR Koncerthuset shows, Copenhagen music scene, Danish concerts, live entertainment Copenhagen",
  image = "https://cphconcerts.com/og-image.svg",
  url = "https://cphconcerts.com",
  type = "website",
  structuredData
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="CPH Concerts" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};