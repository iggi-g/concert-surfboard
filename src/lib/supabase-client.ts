
import { createClient } from '@supabase/supabase-js';
import { startOfDay } from 'date-fns';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/\/$/, '').replace(/:$/, '') || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables:', { supabaseUrl, supabaseKey });
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
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

export const fetchEvents = async (sortOrder: "asc" | "desc" = "asc"): Promise<EventsResponse> => {
  try {
    console.log('Fetching all events from database');
    
    // First, let's get a count of all events
    const { count, error: countError } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error getting event count:', countError);
      throw countError;
    }
    
    console.log('Total events available in database:', count);
    
    // Use range to fetch all records without limit
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .range(0, 2999) // Use range instead of limit to fetch all events
      .order('date', { ascending: sortOrder === 'asc' });
    
    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }

    // Log the first few events to verify the date filtering
    if (data && data.length > 0) {
      console.log('First few events:', data.slice(0, 3).map(e => ({ title: e.title, date: e.date })));
    }

    console.log('Fetched events count:', data?.length);
    console.log('Expected vs actual:', { expected: count, actual: data?.length });
    
    const hasMore = false; // Since we're fetching all events, there are no more to load
    
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
