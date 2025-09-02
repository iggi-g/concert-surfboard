import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/supabase-client";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";

export const DynamicSitemap = () => {
  const { data: eventsResponse } = useQuery({
    queryKey: ['events-sitemap'],
    queryFn: () => fetchEvents('asc'),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const events = eventsResponse?.events || [];

  useEffect(() => {
    if (events.length === 0) return;

    // Generate sitemap XML content
    const generateSitemap = () => {
      const baseUrl = 'https://cphconcerts.com';
      const today = new Date().toISOString().split('T')[0];
      
      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/favorites</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/tonight</loc>
    <lastmod>${today}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Individual Event Pages -->`;

      // Add individual event pages
      events.slice(0, 500).forEach(event => { // Limit to 500 events to keep sitemap manageable
        const eventSlug = event.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + format(parseISO(event.date), 'yyyy-MM-dd');
        const eventDate = parseISO(event.date);
        const lastmod = eventDate > new Date() ? today : format(eventDate, 'yyyy-MM-dd');
        
        sitemap += `
  <url>
    <loc>${baseUrl}/event/${eventSlug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });

      sitemap += `
</urlset>`;

      return sitemap;
    };

    // Update the sitemap (in a real implementation, this would update the actual sitemap.xml file)
    const sitemapContent = generateSitemap();
    console.log('Generated sitemap with', events.length, 'events');
    
    // In a production environment, you would send this to your server to update sitemap.xml
    // For now, we'll just log it for demonstration
  }, [events]);

  return null; // This component doesn't render anything
};