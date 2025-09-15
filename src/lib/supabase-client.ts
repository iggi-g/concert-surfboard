import { createClient } from '@supabase/supabase-js';
import { startOfDay } from 'date-fns';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim().replace(/\/$/, '').replace(/:$/, '') || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables:', { supabaseUrl, supabaseKey });
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: true, persistSession: true }
});

export interface Event {
  title: string;
  date: string;
  link: string;
  image: string;
  venue: string;
  venue_link: string;
  location?: string;
}

export interface EventsResponse {
  events: Event[];
  hasMore: boolean;
  total: number;
}

/**
 * Fetch all events in deterministic date order, paginating to overcome the API row limit.
 * Set `onlyUpcoming` to true if you want to exclude past events (kept optional here).
 */
export const fetchEvents = async (
  sortOrder: 'asc' | 'desc' = 'asc',
  { onlyUpcoming = false }: { onlyUpcoming?: boolean } = {}
): Promise<EventsResponse> => {
  try {
    console.log('Fetching events with pagination…');

    // Optional filter for upcoming events only
    const todayISO = startOfDay(new Date()).toISOString();

    // First, get an exact count to know how many pages to fetch
    const baseSelect = supabase
      .from('events')
      .select('title,date,link,image,venue,venue_link,location', { count: 'exact', head: true });

    const { count, error: countError } = onlyUpcoming
      ? await baseSelect.gte('date', todayISO)
      : await baseSelect;

    if (countError) {
      console.error('Error getting event count:', countError);
      throw countError;
    }

    const total = count ?? 0;
    console.log('Total events available in database:', total);

    // Page through results to bypass the per-request row cap
    const pageSize = 1000; // safe for PostgREST default limits
    const pages = Math.ceil(total / pageSize) || 1;

    const all: Event[] = [];

    for (let i = 0; i < pages; i++) {
      const from = i * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('events')
        .select('title,date,link,image,venue,venue_link,location')
        .order('date', { ascending: sortOrder === 'asc' })
        .range(from, to);

      if (onlyUpcoming) query = query.gte('date', todayISO);

      const { data, error } = await query;

      if (error) {
        console.error(`Error fetching page ${i + 1}/${pages}:`, error);
        throw error;
      }

      if (data && data.length) {
        all.push(...(data as Event[]));
      }

      // Defensive: break if API returns fewer rows than requested early
      if (!data || data.length < pageSize) {
        break;
      }
    }

    // Final sanity logs
    if (all.length) {
      console.log('First few events:', all.slice(0, 3).map(e => ({ title: e.title, date: e.date })));
    }
    console.log('Fetched events count:', all.length);
    console.log('Expected vs actual:', { expected: total, actual: all.length });

    // Since we fetched all pages, there’s no "hasMore"
    return {
      events: all,
      hasMore: false,
      total: total
    };
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};
