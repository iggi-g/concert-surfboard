
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

export const fetchEvents = async (sortOrder: "asc" | "desc" = "asc") => {
  try {
    // Use startOfDay to ensure we get the start of the current day in the local timezone
    const today = startOfDay(new Date()).toISOString().split('T')[0];
    console.log('Fetching events from date:', today);
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', today)
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
    return data as Event[];
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};
