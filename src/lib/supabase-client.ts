
import { createClient } from '@supabase/supabase-js';

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
    const today = new Date().toISOString().split('T')[0];
    console.log('Fetching events from date:', today);
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }

    console.log('Fetched events count:', data?.length);
    return data as Event[];
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};
