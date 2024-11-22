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
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: sortOrder === "asc" });
  
  if (error) throw error;
  return data as Event[];
};

export const fetchUniqueVenues = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('venue')
    .distinct();

  if (error) throw error;
  return data.map(item => item.venue);
};