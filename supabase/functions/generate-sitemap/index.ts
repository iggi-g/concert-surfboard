import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = 'https://cphconcerts.com';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'o')
    .replace(/[å]/g, 'a')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateEventSlug(title: string, venue: string, date: string): string {
  return slugify(`${title}-${venue}-${date}`);
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const today = new Date().toISOString().split('T')[0];

    const { data: events, error } = await supabase
      .from('events')
      .select('title, venue, date, image')
      .gte('date', today)
      .order('date', { ascending: true });

    if (error) throw error;

    // Static pages
    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/about', priority: '0.7', changefreq: 'monthly' },
      { loc: '/venues', priority: '0.9', changefreq: 'daily' },
    ];

    // Unique venues -> per-venue landing pages
    const venueSet = new Set<string>();
    (events || []).forEach((e: any) => {
      if (e.venue) venueSet.add(e.venue);
    });
    const venuePages = Array.from(venueSet).map((venue) => ({
      loc: `/venues/${slugify(venue)}`,
      priority: '0.8',
      changefreq: 'daily',
      lastmod: today,
    }));

    // Event pages with image annotations
    const eventEntries = (events || []).map((event: any) => {
      const slug = generateEventSlug(event.title, event.venue || '', event.date);
      const imageBlock = event.image
        ? `\n    <image:image>\n      <image:loc>${escapeXml(event.image)}</image:loc>\n      <image:title>${escapeXml(event.title)}</image:title>\n    </image:image>`
        : '';
      return `  <url>
    <loc>${SITE_URL}/event/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>${imageBlock}
  </url>`;
    });

    const staticEntries = [...staticPages, ...venuePages].map(
      (p) => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${(p as any).lastmod || today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    );

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemaps-image/1.1">
${[...staticEntries, ...eventEntries].join('\n')}
</urlset>`;

    console.log(`Generated sitemap with ${staticEntries.length + eventEntries.length} URLs (${venuePages.length} venues)`);

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error generating sitemap:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
