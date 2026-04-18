import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "music.event";
  noIndex?: boolean;
  keywords?: string;
  articlePublishedTime?: string;
}

const defaultTitle = "Concerts in Copenhagen 2025 - Live Music & Shows | CPH Concerts";
const defaultDescription = "Find every concert in Copenhagen. Live music, gigs and shows at Vega, Pumpehuset, DR Koncerthuset, Royal Arena and more. Updated daily.";
const defaultKeywords = "concerts Copenhagen, live music Copenhagen, concerts in Copenhagen, Copenhagen gigs, music events Copenhagen, koncerter København";
const siteUrl = "https://cphconcerts.com";
const defaultOgImage = "/og-image.png";

export const SEO = ({
  title = defaultTitle,
  description = defaultDescription,
  canonicalUrl,
  ogImage = defaultOgImage,
  ogType = "website",
  noIndex = false,
  keywords = defaultKeywords,
  articlePublishedTime,
}: SEOProps) => {
  const fullTitle = title === defaultTitle ? title : `${title} | CPH Concerts`;
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;
  const isPng = fullOgImage.endsWith(".png");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content={isPng ? "image/png" : "image/jpeg"} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="CPH Concerts" />
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@cphconcerts" />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}
    </Helmet>
  );
};
