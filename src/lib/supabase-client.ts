
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

const supabaseUrl = 'https://cmnsnmhlbsnegwdbwzxj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbnNubWhsYnNuZWd3ZGJ3enhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzU3NjAsImV4cCI6MjA0NzUxMTc2MH0.UHu7DKYCaUYNDGCOUJouYYNcLnLtdjJsnVlaaZiZMBk';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

export interface Event {
  id: string;
  title: string;
  date: string;
  link: string;
  image: string;
  venue: string;
  venue_link: string;
  location?: string;
  first_seen_at?: string;
  last_seen_at?: string;
}

export interface EventsResponse {
  events: Event[];
  hasMore: boolean;
  total: number;
}

export const fetchEvents = async (sortOrder: "asc" | "desc" = "asc"): Promise<EventsResponse> => {
  try {
    // Use startOfDay to ensure we get the start of the current day in the local timezone
    const today = format(new Date(), 'yyyy-MM-dd');
    console.log('Fetching events from date:', today);
    
    // First, let's get a count of all events to see what we're working with
    const { count, error: countError } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .gte('date', today);
    
    if (countError) {
      console.error('Error getting event count:', countError);
      throw countError;
    }
    
    console.log('Total events available in database:', count);
    
    // PostgREST caps each response at 1,000 rows even for a larger requested range.
    const data: Event[] = [];
    const pageSize = 1000;
    for (let offset = 0; offset < (count || 0); offset += pageSize) {
      const { data: page, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', today)
        .order('date', { ascending: sortOrder === 'asc' })
        .order('id', { ascending: true })
        .range(offset, offset + pageSize - 1);
      if (error) throw error;
      data.push(...(page || []) as Event[]);
      if (!page?.length) break;
    }

    // Log the first few events to verify the date filtering
    if (data && data.length > 0) {
      console.log('First few events:', data.slice(0, 3).map(e => ({ title: e.title, date: e.date })));
    }

    console.log('Fetched events count:', data?.length);
    console.log('Expected vs actual:', { expected: count, actual: data?.length });
    
    const hasMore = (count || 0) > (data?.length || 0);
    
    return {
      events: data as Event[],
      hasMore,
      total: count || 0
    };
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};
