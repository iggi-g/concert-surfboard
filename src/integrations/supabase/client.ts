// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cmnsnmhlbsnegwdbwzxj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbnNubWhsYnNuZWd3ZGJ3enhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzU3NjAsImV4cCI6MjA0NzUxMTc2MH0.UHu7DKYCaUYNDGCOUJouYYNcLnLtdjJsnVlaaZiZMBk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);