import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

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
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('events')
    .select('title, date, link, image, venue, venue_link, location')
    .gte('date', today)
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data as Event[];
};