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
}

export const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*');
  
  if (error) throw error;
  return data as Event[];
};