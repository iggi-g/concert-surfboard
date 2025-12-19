import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

const defaultTitle = "Copenhagen Concerts - Live Music Events & Shows | CPH Concerts";
const defaultDescription = "Discover the best live concerts and music events in Copenhagen. Find upcoming shows, buy tickets, and experience Denmark's vibrant music scene.";
const siteUrl = "https://cphconcerts.com";

export const SEO = ({
  title = defaultTitle,
  description = defaultDescription,
  canonicalUrl,
  ogImage = "/og-image.svg",
  ogType = "website",
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title === defaultTitle ? title : `${title} | CPH Concerts`;
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:locale" content="en_DK" />
      <meta property="og:site_name" content="CPH Concerts" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};
